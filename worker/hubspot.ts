/** HubSpot form the Worker forwards verified submissions to. Kept out of browser code so bots can't read it. */
export const hubspot = {
  portalId: '248015558',
  formId: 'c6e47c0f-97d9-4f01-907a-8b39cc1716f6',
  // Subscription type for the optional "other communications" checkbox.
  communicationSubscriptionTypeId: 4160644874,
} as const;

export const hubspotSubmitUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspot.portalId}/${hubspot.formId}`;
