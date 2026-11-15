/**
 * Cloudflare Worker in front of the static site.
 *
 * POST /api/submit: verifies the Cloudflare Turnstile token, re-checks the fields, then forwards the
 * submission to HubSpot. Every other request is served from the static export (out/) as before.
 *
 * Secrets (set in Cloudflare, or in .dev.vars for local testing):
 * - TURNSTILE_SECRET_KEY: the widget's secret key.
 */
import { consentCopy, fields, SUBMIT_PATH } from '../lib/hubspot';
import { hubspot, hubspotSubmitUrl } from './hubspot';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  TURNSTILE_SECRET_KEY?: string;
}

/** What the contact form sends to the Worker. */
interface SubmitBody {
  token?: unknown;
  values?: unknown;
  consentToProcess?: unknown;
  communications?: unknown;
  context?: { pageUri?: unknown; pageName?: unknown; hutk?: unknown };
}

const MAX_BODY_BYTES = 32_000;
const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

/** Errors use HubSpot's shape ({ errors: [{ errorType }] }) so the form handles both the same way. */
function fail(status: number, errorType: string) {
  return json(status, { errors: [{ errorType }] });
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function handleSubmit(request: Request, env: Env, url: URL): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
  }
  // Browsers always send Origin on cross-site POSTs; only accept submissions from this site's own pages.
  if (request.headers.get('origin') !== url.origin) return fail(403, 'BAD_ORIGIN');

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail(413, 'INPUT_TOO_LARGE');
  let body: SubmitBody;
  try {
    body = JSON.parse(raw) as SubmitBody;
  } catch {
    return fail(400, 'BAD_REQUEST');
  }

  // 1. Spam check: verify the Turnstile token with Cloudflare.
  if (!env.TURNSTILE_SECRET_KEY) {
    console.error('TURNSTILE_SECRET_KEY is not set');
    return fail(500, 'SERVER_MISCONFIGURED');
  }
  const token = str(body.token, 2048);
  if (!token) return fail(403, 'SPAM_CHECK_FAILED');
  const ip = request.headers.get('cf-connecting-ip') ?? undefined;
  const verifyRes = await fetch(SITEVERIFY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
  });
  const verify = (await verifyRes.json().catch(() => ({}))) as { success?: boolean; 'error-codes'?: string[] };
  if (!verify.success) {
    console.warn('Turnstile rejected a submission', verify['error-codes']);
    return fail(403, 'SPAM_CHECK_FAILED');
  }

  // 2. Re-check the fields here too: the browser checks can be skipped by anyone calling this URL directly.
  const values = (body.values && typeof body.values === 'object' ? body.values : {}) as Record<string, unknown>;
  const hubspotFields: { objectTypeId: string; name: string; value: string }[] = [];
  for (const f of fields) {
    const value = typeof values[f.name] === 'string' ? (values[f.name] as string).trim() : '';
    if (f.required && !value) return fail(400, 'REQUIRED_FIELD');
    // Phone gets the country code added, so allow a little extra length for it.
    if (value.length > f.maxLength + (f.type === 'tel' ? 8 : 0)) return fail(400, 'INPUT_TOO_LARGE');
    if (value) hubspotFields.push({ objectTypeId: f.objectTypeId, name: f.property, value });
  }
  if (body.consentToProcess !== true) return fail(400, 'MISSING_PROCESSING_CONSENT');

  const pageUri = str(body.context?.pageUri, 2000);
  const hutk = str(body.context?.hutk, 200);
  const payload = {
    submittedAt: Date.now(),
    fields: hubspotFields,
    context: {
      pageUri: pageUri.startsWith(url.origin) ? pageUri : url.origin,
      pageName: str(body.context?.pageName, 200) || 'Problem Lab',
      ...(hutk ? { hutk } : {}),
      ...(ip ? { ipAddress: ip } : {}),
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: consentCopy.processingIntro,
        communications: [
          {
            value: body.communications === true,
            subscriptionTypeId: hubspot.communicationSubscriptionTypeId,
            text: consentCopy.communicationsLabel,
          },
        ],
      },
    },
  };

  // 3. Forward to HubSpot and pass its answer back to the form.
  const hsRes = await fetch(hubspotSubmitUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (hsRes.ok) return json(200, { ok: true });

  const hsBody = (await hsRes.json().catch(() => ({}))) as { errors?: { errorType?: string; message?: string }[] };
  console.error('HubSpot rejected a submission', hsRes.status, JSON.stringify(hsBody.errors ?? []));
  return json(hsRes.status >= 500 ? 502 : 400, { errors: (hsBody.errors ?? []).map((e) => ({ errorType: e.errorType })) });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === SUBMIT_PATH) {
      try {
        return await handleSubmit(request, env, url);
      } catch (err) {
        console.error('Submission failed', err);
        return fail(502, 'UPSTREAM_ERROR');
      }
    }
    return env.ASSETS.fetch(request);
  },
};
