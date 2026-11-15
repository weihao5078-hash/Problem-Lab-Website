'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { consentCopy, fields, SUBMIT_PATH, TURNSTILE_SITE_KEY, TURNSTILE_TEST_SITE_KEY } from '@/lib/hubspot';
import { site } from '@/lib/site';
import { countries, DEFAULT_COUNTRY, findCountry, flagEmoji } from '@/lib/countries';

type Status = 'idle' | 'submitting' | 'success' | 'error';

declare global {
  interface Window {
    turnstile?: {
      render(container: HTMLElement, options: Record<string, unknown>): string;
      reset(widgetId?: string): void;
      remove(widgetId: string): void;
    };
  }
}

const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
// Submissions faster than this after the form appears are almost certainly bots.
const MIN_FILL_MS = 3000;

/** Loads Cloudflare's Turnstile script once. */
function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error('Turnstile failed to load')));
  });
}

const isLocalHost = (host: string) => host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
type HubSpotError = { message?: string; errorType?: string };

const inputClass =
  'block w-full rounded-lg border border-[#223d71]/15 bg-white px-4 text-base text-[#223d71] placeholder:text-[#223d71]/40 ' +
  'transition-colors focus:outline-none focus:border-[#7f9af4] focus:ring-2 focus:ring-[#7f9af4]/30 ' +
  'aria-[invalid=true]:border-[#b42318]';

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS_RE = /^[\d\s().-]+$/;

// Singapore first (the default), then everyone else alphabetically.
const defaultCountry = findCountry(DEFAULT_COUNTRY);
const otherCountries = countries.filter((c) => c.iso !== DEFAULT_COUNTRY);

/** Returns an error message for one form control, or '' when it is valid. */
function validateControl(el: HTMLInputElement | HTMLTextAreaElement, countryIso: string): string {
  if (el.name === 'consentToProcess') {
    return (el as HTMLInputElement).checked ? '' : 'Please tick this box so we can process your request.';
  }
  const field = fields.find((f) => f.name === el.name);
  if (!field) return '';

  // Spaces alone don't count as an answer.
  const value = el.value.trim();
  if (!value) return field.required ? 'This field is required.' : '';
  if (value.length > field.maxLength) return `Please keep this under ${field.maxLength.toLocaleString()} characters.`;

  if (field.type === 'email' && !EMAIL_RE.test(value)) {
    return 'Please enter a valid email address, e.g. name@company.com.';
  }
  if (field.type === 'tel') {
    const country = findCountry(countryIso);
    if (value.startsWith('+')) return 'Choose the country code from the list, then enter the rest of the number here.';
    if (!PHONE_CHARS_RE.test(value)) return 'Please use only digits, spaces, brackets or dashes.';
    // Count digits only, so formatting characters can't make up the length. E.164 allows at most 15 in total.
    const digits = value.replace(/\D/g, '').length;
    if (country.nationalLength) {
      const n = country.nationalLength;
      const article = n === 8 || n === 11 || n === 18 ? 'an' : 'a';
      if (digits !== n) return `Please enter ${article} ${n}-digit ${country.name} number.`;
    } else if (digits < 6 || digits + country.dial.replace(/\D/g, '').length > 15) {
      return `Please enter a valid ${country.name} phone number.`;
    }
  }
  return '';
}

/** Turns HubSpot's error list into one sentence a visitor can act on. */
function describeErrors(errors: HubSpotError[]) {
  const types = new Set(errors.map((e) => e.errorType));
  if (types.has('INVALID_EMAIL') || types.has('BLOCKED_EMAIL')) return 'Please check your email address and try again.';
  if (types.has('REQUIRED_FIELD')) return 'Please fill in all required fields.';
  if (types.has('SPAM_CHECK_FAILED')) return "We couldn't confirm you're not a bot. Please try again.";
  return null;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [messageLength, setMessageLength] = useState(0);
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY);
  const country = findCountry(countryIso);
  // Until React has loaded, a click would fall back to a plain browser submit, so keep Submit disabled.
  const [ready, setReady] = useState(false);
  const mountedAt = useRef(0);
  useEffect(() => {
    setReady(true);
    mountedAt.current = Date.now();
  }, []);

  // Cloudflare Turnstile: runs in the background and only shows a check box if it needs the visitor's help.
  const turnstileBox = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef<string | null>(null);
  // True while Cloudflare is showing the "Verify you are human" box and waiting for the visitor to tick it.
  const needsCheck = useRef(false);
  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !turnstileBox.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(turnstileBox.current, {
          sitekey: isLocalHost(window.location.hostname) ? TURNSTILE_TEST_SITE_KEY : TURNSTILE_SITE_KEY,
          action: 'contact',
          appearance: 'interaction-only',
          size: 'flexible',
          theme: 'light',
          callback: (t: string) => (token.current = t),
          'expired-callback': () => (token.current = null),
          'error-callback': () => (token.current = null),
          'before-interactive-callback': () => (needsCheck.current = true),
          'after-interactive-callback': () => (needsCheck.current = false),
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  /**
   * Waits briefly for the Turnstile token, which usually arrives a second or two after the page loads.
   * Stops early if Cloudflare is waiting for the visitor to tick the box, since waiting won't help then.
   */
  async function getToken(timeoutMs = 10000) {
    const started = Date.now();
    while (!token.current && !needsCheck.current && Date.now() - started < timeoutMs) {
      await new Promise((r) => setTimeout(r, 200));
    }
    return token.current;
  }

  /** Explains why there's no token yet, so the visitor knows what to do next. */
  function missingTokenMessage() {
    if (needsCheck.current) return 'Please tick “Verify you are human” above, then press Submit again.';
    if (widgetId.current) return 'The spam check is taking longer than usual. Please wait a moment, then press Submit again.';
    return "We couldn't load the spam check. Please refresh the page and try again.";
  }

  /** Tokens are single-use, so get a fresh one after any attempt that didn't succeed. */
  function resetTurnstile() {
    token.current = null;
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }

  // Once a field shows an error, re-check it as the visitor edits, so the message clears as soon as it's fixed.
  function handleChange(event: FormEvent<HTMLFormElement>) {
    const el = event.target as HTMLInputElement;
    if (el.name === 'message') setMessageLength(el.value.length);
    // Changing the country changes what counts as a valid number, so re-check the number too.
    if (el.name === 'phoneCountry') {
      const phone = event.currentTarget.elements.namedItem('phone') as HTMLInputElement | null;
      if (phone && 'phone' in fieldErrors) {
        const message = validateControl(phone, el.value);
        setFieldErrors(({ phone: _old, ...rest }) => (message ? { ...rest, phone: message } : rest));
      }
      return;
    }
    if (!el.name || !(el.name in fieldErrors)) return;
    const message = validateControl(el, countryIso);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (message) next[el.name] = message;
      else delete next[el.name];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const invalid: Record<string, string> = {};
    for (const el of Array.from(form.elements) as HTMLInputElement[]) {
      const message = el.name ? validateControl(el, countryIso) : '';
      if (message) invalid[el.name] = message;
    }
    setFieldErrors(invalid);
    const firstInvalid = Object.keys(invalid)[0];
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    const data = new FormData(form);

    // Honeypot filled in, or submitted impossibly fast: a bot. Pretend it worked.
    if (data.get('website') || Date.now() - mountedAt.current < MIN_FILL_MS) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    const turnstileToken = await getToken();
    if (!turnstileToken) {
      setErrorMessage(missingTokenMessage());
      setStatus('error');
      return;
    }

    const values = Object.fromEntries(
      fields.map((f) => {
        const value = String(data.get(f.name) ?? '').trim();
        // Send the full international number, e.g. "+65 9123 4567".
        return [f.name, f.type === 'tel' && value ? `+${country.dial} ${value}` : value];
      }),
    );

    try {
      const res = await fetch(SUBMIT_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: turnstileToken,
          values,
          consentToProcess: data.get('consentToProcess') === 'on',
          communications: data.get('communications') === 'on',
          context: { hutk: readCookie('hubspotutk'), pageUri: window.location.href, pageName: document.title },
        }),
      });
      if (res.ok) {
        setStatus('success');
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { errors?: HubSpotError[] };
      setErrorMessage(describeErrors(body.errors ?? []) ?? '');
      setStatus('error');
    } catch {
      setStatus('error');
    }
    resetTurnstile();
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-8">
        <CheckCircle2 className="w-10 h-10 text-[#7f9af4]" aria-hidden="true" />
        <h3 className="text-2xl font-bold text-[#223d71]">Thanks, we&apos;ve got it.</h3>
        <p className="text-base text-[#223d71]/75 leading-relaxed">
          Our team will review your submission and get back to you by email.
        </p>
      </div>
    );
  }

  return (
    <form method="post" onSubmit={handleSubmit} onChange={handleChange} noValidate className="flex flex-col gap-6" aria-busy={status === 'submitting'}>
      {/* Intro: kept a step smaller than the section's "Submit a Problem" heading. */}
      <div className="flex flex-col gap-3 pb-2">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#223d71]">Get to know us</h3>
        <p className="text-base font-semibold text-[#223d71]/85 leading-relaxed">
          Join us at Problem Lab to collaborate with SUTD&apos;s Makers.
        </p>
        <p className="text-base text-[#223d71]/75 leading-relaxed">
          Problem Lab is a student-led research collective that goes into the real world to find, investigate and
          frame problems worth solving.
        </p>
      </div>

      {fields.map((f) => {
        const error = fieldErrors[f.name];
        const errorId = `${f.name}-error`;
        const common = {
          id: f.name,
          name: f.name,
          required: f.required,
          maxLength: f.maxLength,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? errorId : undefined,
        };
        return (
          <div key={f.name} className="flex flex-col gap-2">
            <label htmlFor={f.name} className="text-base font-bold text-[#223d71]">
              {f.label}
              {f.required && <span className="text-[#b42318]" aria-hidden="true">*</span>}
            </label>
            {f.type === 'textarea' ? (
              <>
                <textarea {...common} rows={4} placeholder={f.placeholder} className={`${inputClass} py-3 resize-y`} />
                {/* Counter appears once the answer gets close to the limit. */}
                {messageLength >= f.maxLength * 0.8 && (
                  <p className="text-right text-sm text-[#223d71]/60" aria-live="polite">
                    {messageLength.toLocaleString()} / {f.maxLength.toLocaleString()} characters
                  </p>
                )}
              </>
            ) : f.type === 'tel' ? (
              <div className="flex gap-2">
                {/* Country code: a native select laid invisibly over the flag + code, so it keeps the
                    browser's own keyboard, screen-reader and mobile picker behaviour. */}
                <div className="relative shrink-0 flex items-center gap-2 h-12 rounded-lg border border-[#223d71]/15 bg-white pl-3 pr-2.5 text-base text-[#223d71] transition-colors focus-within:border-[#7f9af4] focus-within:ring-2 focus-within:ring-[#7f9af4]/30">
                  <span aria-hidden="true" className="text-xl leading-none">{flagEmoji(country.iso)}</span>
                  <span aria-hidden="true">+{country.dial}</span>
                  <ChevronDown className="w-4 h-4 text-[#223d71]/50" aria-hidden="true" />
                  <select
                    name="phoneCountry"
                    aria-label="Country code"
                    value={countryIso}
                    onChange={(e) => setCountryIso(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  >
                    <option value={defaultCountry.iso}>
                      {flagEmoji(defaultCountry.iso)} {defaultCountry.name} (+{defaultCountry.dial})
                    </option>
                    <option disabled>──────────</option>
                    {otherCountries.map((c) => (
                      <option key={c.iso} value={c.iso}>
                        {flagEmoji(c.iso)} {c.name} (+{c.dial})
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  {...common}
                  type="tel"
                  inputMode="tel"
                  autoComplete={f.autoComplete}
                  placeholder={country.iso === 'SG' ? '9123 4567' : undefined}
                  className={`${inputClass} h-12 min-w-0`}
                />
              </div>
            ) : (
              <input {...common} type={f.type} autoComplete={f.autoComplete} className={`${inputClass} h-12`} />
            )}
            {error && (
              <p id={errorId} className="text-sm text-[#b42318]">
                {error}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot for spam bots: hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 pt-2 text-sm sm:text-[15px] text-[#223d71]/75 leading-relaxed">
        <p>{consentCopy.communicationsIntro}</p>
        <label className="flex items-start gap-3 text-base text-[#223d71] cursor-pointer">
          <input type="checkbox" name="communications" className="mt-1 h-5 w-5 shrink-0 accent-[#223d71]" />
          <span>{consentCopy.communicationsLabel}</span>
        </label>

        <p>{consentCopy.processingIntro}</p>
        <div className="flex flex-col gap-2">
          <label className="flex items-start gap-3 text-base font-bold text-[#223d71] cursor-pointer">
            <input
              type="checkbox"
              name="consentToProcess"
              required
              aria-invalid={fieldErrors.consentToProcess ? true : undefined}
              aria-describedby={fieldErrors.consentToProcess ? 'consentToProcess-error' : undefined}
              className="mt-1 h-5 w-5 shrink-0 accent-[#223d71]"
            />
            <span>
              {consentCopy.processingLabel}
              <span className="text-[#b42318]" aria-hidden="true">*</span>
            </span>
          </label>
          {fieldErrors.consentToProcess && (
            <p id="consentToProcess-error" className="text-sm text-[#b42318]">
              Please tick this box so we can process your request.
            </p>
          )}
        </div>

        <p>
          We care about your privacy. Learn how we handle your data in our{' '}
          <Link href="/privacy" className="font-bold text-[#223d71] underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* Turnstile mounts here; it stays empty unless Cloudflare needs the visitor to tick a box. */}
      <div ref={turnstileBox} />

      <div aria-live="polite">
        {status === 'error' && (
          <p className="mb-4 rounded-lg border border-[#b42318]/30 bg-[#b42318]/5 px-4 py-3 text-sm text-[#b42318]">
            {errorMessage || (
              <>
                Something went wrong sending your submission. Please try again, or email us at{' '}
                <a href={`mailto:${site.email}`} className="font-bold underline">
                  {site.email}
                </a>
                .
              </>
            )}
          </p>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!ready || status === 'submitting'}
            className="rounded-lg bg-[#223d71] px-12 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#2c4d8e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7f9af4] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-wait"
          >
            {status === 'submitting' ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
}
