import type { SubmitKind } from '../lib/hubspot';

/** HubSpot forms the Worker forwards verified submissions to. Kept out of browser code so bots can't read them. */
export const hubspot = {
  portalId: '248015558',
  // "Contact us form": problem plus contact details, for partners.
  formId: 'c6e47c0f-97d9-4f01-907a-8b39cc1716f6',
  // "Problem statement (anonymous)": the problem text only, no email or consent.
  problemFormId: 'bb3cf4ca-3326-4714-a41e-a425c1821dc4',
  // Subscription type for the optional "other communications" checkbox.
  communicationSubscriptionTypeId: 4160644874,
} as const;

const submitUrl = (formId: string) =>
  `https://api.hsforms.com/submissions/v3/integration/submit/${hubspot.portalId}/${formId}`;

/** Submit URL for each kind, or null when that form isn't set up yet. */
export const hubspotSubmitUrl = (kind: SubmitKind): string | null => {
  const formId = kind === 'problem' ? hubspot.problemFormId : hubspot.formId;
  return formId ? submitUrl(formId) : null;
};
