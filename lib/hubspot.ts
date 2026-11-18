/**
 * Contact form fields and consent wording, shared by the form (browser) and the Worker that forwards
 * submissions to HubSpot. HubSpot account/form IDs live only in worker/hubspot.ts, never in browser code.
 *
 * Requirements on the HubSpot side (Marketing → Forms → this form):
 * - CAPTCHA must be OFF, or every API submission is rejected with FORM_HAS_RECAPTCHA_ENABLED.
 * - Every field below must exist on the form, or it is rejected with FIELD_NOT_IN_FORM_DEFINITION.
 */

/** Cloudflare Turnstile site key (public). Spam check is verified by the Worker with the secret key. */
export const TURNSTILE_SITE_KEY = '0x4AAAAAAGCUzkEFUAPh6N_p';
// Cloudflare's always-pass test key, used on localhost (the real key only works on the widget's hostnames).
export const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';

/** Where the form posts. Handled by the Worker in worker/index.ts. */
export const SUBMIT_PATH = '/api/submit';

// HubSpot object type id for contacts, used in field references.
const CONTACT = '0-1';

/**
 * Form inputs, in display order: the problem first. `name` is the HTML input name; `property` is where HubSpot
 * stores it. Phone and job title are optional, so the HubSpot form must not mark them required either.
 */
export const fields = [
  {
    name: 'message',
    label: 'Describe the problem',
    type: 'textarea',
    required: true,
    placeholder: 'What is the problem, who does it affect, and what have you tried so far?',
    maxLength: 5000,
    objectTypeId: CONTACT,
    property: 'message',
  },
  { name: 'firstname', label: 'Name', type: 'text', required: true, autoComplete: 'name', maxLength: 100, objectTypeId: CONTACT, property: 'firstname' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', maxLength: 254, objectTypeId: CONTACT, property: 'email' },
  { name: 'company', label: 'Organisation Name', type: 'text', required: true, autoComplete: 'organization', maxLength: 200, objectTypeId: CONTACT, property: 'organisation_name' },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: false, autoComplete: 'tel-national', maxLength: 30, objectTypeId: CONTACT, property: 'phone' },
  { name: 'jobtitle', label: 'Job Title', type: 'text', required: false, autoComplete: 'organization-title', maxLength: 100, objectTypeId: CONTACT, property: 'jobtitle' },
] as const;

/**
 * Two ways to submit: 'problem' sends only the problem text, anonymously, to a separate HubSpot form;
 * 'partner' sends the problem plus contact details and consent to the contact form.
 */
export type SubmitKind = 'problem' | 'partner';
export const SUBMIT_KINDS: readonly SubmitKind[] = ['problem', 'partner'];

/** The fields each kind of submission shows and sends. */
export const fieldsFor = (kind: SubmitKind) => (kind === 'problem' ? fields.filter((f) => f.name === 'message') : fields);

export const consentCopy = {
  communicationsIntro:
    'By checking the boxes below, you agree to receive communications from Problem Lab. You can unsubscribe anytime.',
  communicationsLabel: 'I agree to receive other communications from Problem Lab.',
  processingIntro:
    'To process your request, we need your permission to store and process your personal data. Please check the box below to confirm your consent:',
  processingLabel: 'I agree to allow Problem Lab to store and process my personal data.',
};
