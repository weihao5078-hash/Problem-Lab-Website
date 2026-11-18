# Spec + plan: two-path problem submission (Problem Lab website)

Method: `spec-driven-development` (Specify → Plan → Tasks → Implement), from `Codex Vault/.agents/skills/`. GitHub Spec Kit's `specify` CLI is not installed, so the spec lives in this file and is copied into the repo as Task 0.

## Context

The contact form on `redesign/full` (uncommitted, `~/Problem-Lab-Website`) asks every visitor for name, email and organisation. The user wants two paths:
1. **Just share a problem**: no friction and no personal details, only the problem statement.
2. **Work with us**: the problem plus contact details, so Problem Lab can follow up.

The existing HubSpot "Contact us form" (`c6e47c0f…`) requires Email, so it can't take anonymous submissions.

## Spec

### Decisions (from the user)
- Anonymous submissions go to a **new, separate HubSpot form** with only the problem field and no consent block.
- **Toggle at the top of the existing form**: "Just share a problem" / "Work with us". The problem box is shared; the contact fields and consent block show only for "Work with us". One Submit button.
- **Fully anonymous**: no email field, and no IP address or `hubspotutk` cookie forwarded to HubSpot.
- The form **opens on "Just share a problem"**.

### Assumptions (correct these before implementing)
1. HubSpot's Forms Submission API accepts a submission with no email on a form that has no email field. It stores it under form submissions without creating a contact, and notifications still go to problemlab@outlook.com. Task 1 verifies this.
2. Turnstile and the honeypot still protect both paths. The anonymous path needs spam protection more, not less.
3. Anonymous problems may be published on the website, socials or GitHub. The form tells visitors not to include names or contact details in the text.
4. "Work with us" keeps today's fields and consent exactly (phone and job title optional).

### Success criteria
- An anonymous visitor can send a problem by filling in only the problem box and pressing Submit (Turnstile allowing). Nothing else is required or shown.
- The anonymous payload the Worker sends to HubSpot contains only the `message` field, with no `ipAddress`, `hutk` or `legalConsentOptions`. The Turnstile siteverify call for that path omits `remoteip`.
- "Work with us" behaves as now: required name, email and organisation, required processing consent, submitted to the existing form.
- The Worker rejects an anonymous submission that carries contact fields (it ignores them, so personal data can't reach the anonymous form) and rejects an unknown `kind`.
- The toggle is a keyboard- and screen-reader-accessible radio group. Switching it keeps the typed problem text.
- Copy that mentions submitting matches the two paths: Innovation step 1 and the privacy page.

### Boundaries
- Always: re-validate on the Worker, keep Turnstile on both paths, `tsc` clean.
- Ask first: creating the HubSpot form, publishing any HubSpot change (the existing form has an unpublished draft of unknown origin), sending a real test submission to HubSpot, committing.
- Never: forward IP or cookies on the anonymous path; commit HubSpot IDs into browser code (they stay in `worker/hubspot.ts`).

## Plan

**Data:** a submission `kind: 'problem' | 'partner'` travels from the form to the Worker.
- `lib/hubspot.ts`: export `type SubmitKind`. Mark the contact fields so the form and Worker can choose by kind, e.g. `partnerFields = fields`, `problemFields = fields.filter(f => f.name === 'message')`. One shared list keeps the problem field defined once.
- `worker/hubspot.ts`: add `problemFormId` and a submit URL per form, kept server-side like the existing ID.
- `worker/index.ts` (`handleSubmit`): read `body.kind` (default `'partner'` so old cached pages still work, reject anything else). Pick the field list and form URL by kind. For `problem`: skip the consent check and `legalConsentOptions`, leave `hutk` and `ipAddress` out of `context`, and omit `remoteip` in siteverify. Reuse the existing `fail`, `str` and validation loop unchanged.
- `components/ContactForm.tsx`: `const [kind, setKind] = useState<SubmitKind>('problem')`. Render a two-option radio group (native `<input type="radio">` styled as a segmented control) above the fields. Render the problem field always, and the contact fields and consent block only when `kind === 'partner'`. Because hidden fields are not rendered, the existing `form.elements` validation loop needs no change. Send `kind` in the body. Under the problem box on the anonymous path, add one line: don't include names or contact details, as problems we take on may be published. Give each path its own success text.
- Copy: `InnovationSection.tsx` step 1 names both options. `app/privacy/page.tsx` says anonymous submissions collect only the description, with no IP address or cookies forwarded.

**HubSpot (in Chrome, with the user's OK at each publish):** create the form "Problem statement (anonymous)" with one multi-line field mapped to `message`, no email field and no consent block. Turn on notifications to problemlab@outlook.com and turn CAPTCHA off. Record its form ID in `worker/hubspot.ts`. Separately, and still pending from before: make Phone and Job Title optional on the existing form, after the user says what to do about its unpublished draft.

**Order:** HubSpot form → lib + Worker → form UI → copy → verify. The Worker and UI share `lib/hubspot.ts`, so the work stays in one session with no parallel agents.

## Tasks

- [ ] **0. Save the spec** to `docs/specs/two-path-submission.md` in the repo.
- [ ] **1. HubSpot anonymous form**: create, publish (ask first), note its ID. *Verify:* the form exists with one field and no email. One test submission (ask first) appears under its submissions with no contact created; this confirms assumption 1.
- [ ] **2. lib + Worker**: `lib/hubspot.ts`, `worker/hubspot.ts`, `worker/index.ts`. *Verify:* `npx tsc --noEmit`. With `npm run preview` (wrangler dev, `.dev.vars` holding Turnstile's always-pass test secret), curl `/api/submit` with: kind=problem plus message → 200; kind=problem with no message → `REQUIRED_FIELD`; kind=problem plus a smuggled email → the email is not forwarded (check the logged payload); kind=bogus → 400; kind=partner without consent → `MISSING_PROCESSING_CONSENT`.
- [ ] **3. Form UI**: `components/ContactForm.tsx`. *Verify:* headless Chrome at 1440 and 390. Toggle by keyboard (arrow keys move between the radios). The problem text survives a toggle. The anonymous path shows only the problem box, notice and Submit.
- [ ] **4. Copy**: `InnovationSection.tsx`, `app/privacy/page.tsx`. *Verify:* read the rendered text.
- [ ] **5. Existing form**: make Phone and Job Title optional in HubSpot (needs the user's decision on the draft). *Verify:* one partner test submission without phone or job title succeeds (ask first).
- [ ] **6. Record**: entry in the vault's `01-Memory/Log.md`. No commit unless asked.

## Verification (end to end)
`npx tsc --noEmit`, then `npm run preview` on a spare port (never stop the user's servers). Then one real anonymous and one real partner submission through the page, each approved first, and confirm both appear in the right HubSpot form with no IP or contact on the anonymous one.

## Open questions
- What is in the unpublished draft on the existing HubSpot form, and may it be published?
- Should anonymous problems get any acknowledgement beyond the on-page thank-you? (Fully anonymous means none can be sent.)
