/**
 * Contact details and external links shared by the contact section, footer and privacy page.
 * Leave a link empty ('') to hide it until the account or page exists — no dead links.
 */
export const site = {
  name: 'Problem Lab',
  tagline: 'Issue · Idea · Innovation',
  // Set emailVerified to false to show the address as plain text instead of a mailto: link.
  email: 'problemlab@outlook.com',
  emailVerified: true,
  address: {
    org: 'Singapore University of Technology and Design',
    lines: ['8 Somapah Road', 'Singapore 487372'],
  },
  links: {
    github: '',
    previousProjects: '',
  },
} as const;
