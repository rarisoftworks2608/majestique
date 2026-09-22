export const SITE_NAME = 'Majestique Landmarks'
export const SITE_TAGLINE = 'Building Legacies, Crafting Dreams'
export const SITE_PHONE = '+91 74480 99000'
export const SITE_ADDRESS = '9th Floor, Jawaharlal Nehru Rd, opp. Apsara Theatre, Guru Nanak Nagar, Pune – 411037'

/* Inbox routing — each address is monitored by a different team, so route
   every touchpoint to the one that owns it rather than a catch-all. */
export const SITE_EMAIL = 'info@majestiqueproperties.com'          // general support
export const SALES_EMAIL = 'sales@majestiqueproperties.com'        // property sales
export const ENQUIRY_EMAIL = 'getintouch@majestiqueproperties.com' // enquiry forms
export const CAREERS_EMAIL = 'careers@majestiqueproperties.com'    // jobs & applications
export const MARKETING_EMAIL = 'marketing@majestiqueproperties.com' // press, media & partnerships

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  {
    label: 'About',
    path: '/about',
    children: [
      { label: 'Legacy', path: '/about/legacy' },
      { label: 'Leadership', path: '/about/leadership' },
      { label: 'Milestones', path: '/about/milestones' },
      { label: 'Vision & Mission', path: '/about/vision-mission' },
    ],
  },
  {
    label: 'Projects',
    path: '/projects',
    children: [
      { label: 'Ongoing Projects', path: '/projects/ongoing' },
      { label: 'Completed Projects', path: '/projects/completed' },
    ],
  },
  {
    label: 'Media',
    path: '/media',
    children: [
      { label: 'Press Coverage', path: '/media/press-coverage' },
      { label: 'Announcements', path: '/media/announcements' },
      { label: 'Events', path: '/media/events' },
      { label: 'Blogs', path: '/media/blogs' },
      { label: 'Testimonials', path: '/media/testimonials' },
      { label: 'Newsletter', path: '/media/newsletter' },
    ],
  },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
]

/* Order here drives the footer icon row and the Organization schema's sameAs. */
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/majestiquelandmarks/',
  facebook:  'https://www.facebook.com/majestiquelandmark/',
  linkedin:  'https://www.linkedin.com/company/majestique-landmarks/',
  youtube:   'https://www.youtube.com/c/majestiquelandmarks',
  twitter:   'https://x.com/MajestiquePune',
  pinterest: 'https://in.pinterest.com/majestiquelandmarks/',
}

export const PROJECT_STATUS = {
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
}

export const AMENITIES_ICONS = {
  'Swimming Pool': 'pool',
  'Gym': 'fitness',
  'Clubhouse': 'club',
  'Security': 'security',
  'Parking': 'parking',
  'Garden': 'garden',
  'Kids Play Area': 'kids',
  'Jogging Track': 'jogging',
  'Indoor Games': 'games',
  'Power Backup': 'power',
}
