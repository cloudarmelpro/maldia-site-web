import type { Contenu } from './types'

// Traduction fidèle du contenu français porté par fr.ts, avec la typographie
// anglaise : aucune espace avant la ponctuation double. Les noms propres
// (Agence Maldia, Madagascar, Québec, Cal.com, formats de fichier) restent.
export const en: Contenu<'en'> = {
  meta: {
    titre: 'Agence Maldia — Madagascar talent for international teams',
    description:
      'Agence Maldia connects talent based in Madagascar with international companies looking to strengthen their teams remotely.',
    openGraph: {
      titre: 'Agence Maldia — Madagascar talent for international teams',
      description:
        'Agence Maldia connects talent based in Madagascar with international companies — Quebec and French-speaking Canada, France, Belgium, Switzerland, Luxembourg, Monaco — looking to strengthen their teams remotely.',
    },
  },

  enTete: {
    marque: 'Agence Maldia',
    initiale: 'M',
    menu: 'Menu',
    navigation: [
      { ancre: 'talents', libelle: 'Talent' },
      { ancre: 'entreprises', libelle: 'Companies' },
      { ancre: 'profils', libelle: 'Profiles' },
      { ancre: 'a-propos', libelle: 'About' },
      { ancre: 'contact', libelle: 'Contact' },
    ],
    changerDeLangue: 'Change language',
    cta: 'Book a call',
  },

  hero: {
    pastille: {
      avant: 'Talent from ',
      misEnAvant: 'Madagascar',
      apres: ', working remotely for your teams',
    },
    titre: ['Strengthen your team', 'with talent from Madagascar'],
    sousTitre: [
      'Agence Maldia connects talent from Madagascar with international',
      'companies looking to strengthen their teams.',
    ],
    ctaPrincipal: 'Book a call',
    ctaSecondaire: 'Apply now',
    mention: '30 min, via Cal.com',
  },

  marches: {
    titre: 'Our talent works with companies in French-speaking Canada and Europe',
    liste: [
      'Québec',
      'French-speaking Canada',
      'France',
      'Belgium',
      'Switzerland',
      'Luxembourg',
      'Monaco',
    ],
  },

  opportunites: {
    titre: 'Three ways to work with Maldia',
    description:
      'You are based in Madagascar and looking for a remote professional opportunity. Here are the three paths available with Maldia.',
    liste: [
      {
        titre: 'Join the Maldia team',
        description: 'You join the Maldia team directly and work on our internal activities.',
      },
      {
        titre: 'Work on our projects',
        description:
          'You contribute to the projects Maldia carries out for its clients, in your professional field.',
      },
      {
        titre: 'Join a client company',
        description:
          'Through staff augmentation, you join the team of one of Maldia’s client companies remotely.',
      },
    ],
  },

  entreprises: {
    titre: 'Staff augmentation, for companies',
    tuiles: {
      rangee1: ['Web dev', 'Software', 'Design', 'Video', 'CM', 'Marketing'],
      rangee2: ['Admin', 'Customer service', 'Accounting', 'Assistance'],
    },
    titreGauche: 'Professional profiles',
    titreSombre: 'Strengthen your teams with talent based in Madagascar, working remotely',
    ctaSombre: 'Book a call',
  },

  deroulement: {
    titre: 'How the service works',
    description:
      'From your need to the talent joining your team, six steps handled by Maldia.',
    liste: [
      {
        numero: '01',
        cote: 'You',
        titre: 'Your need',
        description:
          'You describe the profile you are looking for, the field and the level of experience expected.',
      },
      {
        numero: '02',
        cote: 'Maldia',
        titre: 'Search',
        description: 'We look for the profile among our talent based in Madagascar.',
      },
      {
        numero: '03',
        cote: 'Maldia',
        titre: 'Shortlisting',
        description: 'We filter by field, experience and level of French and English.',
      },
      {
        numero: '04',
        cote: 'Maldia',
        titre: 'Profile presentation',
        description: 'You only receive the applications that match your need.',
      },
      {
        numero: '05',
        cote: 'You',
        titre: 'Selection',
        description: 'You run the interviews and choose the person who joins your team.',
      },
      {
        numero: '06',
        cote: 'Together',
        titre: 'Onboarding and follow-up',
        description: 'The talent works remotely within your team and Maldia handles the follow-up.',
      },
    ],
    cta: 'Book a call',
    mention: 'A first 30-minute call, no commitment',
  },

  talents: {
    titre: 'For talent in Madagascar',
    description: 'Who Maldia is, what opportunities are available and how recruitment works.',
    cartes: [
      {
        titre: 'Work remotely, from Madagascar',
        description:
          'You stay in Madagascar and work remotely, either on Maldia’s projects or directly within the team of a client company. Maldia follows up throughout the collaboration.',
      },
      {
        titre: 'International companies',
        description:
          'Our client companies are mainly located in Québec and French-speaking Canada, France, Belgium, Switzerland, Luxembourg and Monaco.',
      },
      {
        titre: 'Recruitment, step by step',
        description:
          'You apply online with your CV. If your profile matches a need, we contact you for the next steps.',
        frise: [
          { libelle: 'Application', precision: 'online CV' },
          { libelle: 'Shortlisting', precision: 'by Maldia' },
          { libelle: 'Selection', precision: 'with the client' },
        ],
      },
      {
        titre: 'About Agence Maldia',
        description:
          'Agence Maldia connects talent from Madagascar with international companies looking to strengthen their teams. We recruit, shortlist and support both sides of the collaboration.',
      },
    ],
    criteres: {
      titre: 'What we ask for in the application',
      description:
        'The form is short: your contact details, your field, the role you are looking for, your experience, your availability and your CV in PDF, DOC or DOCX.',
      liste: [
        { libelle: 'Field', precision: 'professional' },
        { libelle: 'Experience', precision: 'years' },
        { libelle: 'French', precision: 'level' },
        { libelle: 'English', precision: 'level' },
        { libelle: 'Availability', precision: 'starting from' },
      ],
    },
  },

  commencer: {
    titre: ['Two ways', 'to get started.'],
    sousTitre: [
      'You are looking for an opportunity, or you are looking for talent.',
      'Either way, there is only one action to take.',
    ],
    offres: [
      {
        intitule: 'Talent in Madagascar',
        prix: 'Application',
        unite: 'online, with your CV',
        description:
          'For people based in Madagascar looking for a remote professional opportunity.',
        inclus: [
          'Short form, fully online',
          'Upload your CV directly',
          'Roles at Maldia or with our clients',
          'Remote work from Madagascar',
          'All professional fields',
          'French and English assessed separately',
        ],
        libelleSupplement: 'Accepted CV formats',
        supplement: 'PDF, DOC, DOCX',
        cta: 'Apply now',
        cta2: 'See the profiles we recruit',
        note: 'You receive a confirmation as soon as your application has been received.',
      },
      {
        intitule: 'Companies',
        prix: 'Call',
        unite: '30 min, via Cal.com',
        description:
          'For companies looking to strengthen their teams with remote professional talent.',
        inclus: [
          'You describe the profile you need',
          'Maldia searches and shortlists',
          'Relevant profiles are presented',
          'You take part in the selection',
          'The talent joins your team remotely',
          'Follow-up handled by Maldia',
        ],
        libelleSupplement: 'Markets served',
        supplement: 'French-speaking Canada and Europe',
        cta: 'Book a call',
        cta2: 'Discuss your needs',
        note: 'The call is booked directly in our calendar, with no email back-and-forth.',
      },
    ],
    promo: {
      titre: 'Not sure which profile to recruit yet?',
      description:
        'Tell us about your need on a first call. We will let you know which profiles are available and how the service can be organized for your team.',
      cta: 'Discuss your needs',
    },
  },

  profils: {
    titre: 'The profiles we recruit',
    liste: [
      {
        description: 'Websites, integrations and maintenance: front-end, back-end and full-stack profiles.',
        nom: 'Web development',
        precision: 'front-end, back-end, full-stack',
      },
      {
        description: 'Business applications and internal tools, from development to production.',
        nom: 'Software development',
        precision: 'applications and tools',
      },
      {
        description: 'Interfaces, visual identity and communication materials.',
        nom: 'Design',
        precision: 'UI/UX and graphic design',
      },
      {
        description: 'Editing, motion graphics and preparation of video content for your channels.',
        nom: 'Video editing',
        precision: 'editing and post-production',
      },
      {
        description: 'Social media management, publishing and community moderation.',
        nom: 'Community management',
        precision: 'social media',
      },
      {
        description: 'Campaigns, content and digital performance tracking.',
        nom: 'Digital marketing',
        precision: 'campaigns and content',
      },
      {
        description: 'Document management, data entry, file tracking and administrative tasks.',
        nom: 'Administration',
        precision: 'management and follow-up',
      },
      {
        description: 'Responding to customers by email, chat or phone.',
        nom: 'Customer service',
        precision: 'customer support',
      },
      {
        description: 'Bookkeeping, reconciliations and preparation of accounting documents.',
        nom: 'Accounting',
        precision: 'bookkeeping',
      },
      {
        description: 'Day-to-day remote support: calendar, email, coordination and follow-ups.',
        nom: 'Virtual assistance',
        precision: 'executive support',
      },
      {
        description: 'Other professional profiles are recruited according to our clients’ needs.',
        nom: 'Other profiles',
        precision: 'on request',
      },
    ],
  },

  faq: {
    titre: 'Frequently asked questions',
    description:
      'Answers to the questions we hear most often, from talent and from companies alike.',
    questions: [
      {
        question: 'Who can apply?',
        reponse:
          'Anyone based in Madagascar who wants to work with Maldia or be considered for a role with a client company.',
      },
      {
        question: 'How does remote work happen?',
        reponse:
          'The talent stays in Madagascar and works remotely, either on Maldia’s projects or embedded in the team of a client company. Maldia handles the follow-up.',
      },
      {
        question: 'What profiles are you looking for?',
        reponse:
          'Web and software development, design, video editing, community management, digital marketing, administration, customer service, accounting, virtual assistance and other professional profiles.',
      },
      {
        question: 'How does a company get started?',
        reponse:
          'The company tells us about the profile they need. Maldia searches for and shortlists candidates, presents the relevant profiles, the client takes part in the selection, then the talent joins their team remotely.',
      },
      {
        question: 'How do I book a call?',
        reponse:
          'Booking is done online via Cal.com, directly from the Book a call buttons on the site.',
      },
      {
        question: 'Is the site available in English?',
        reponse:
          'Yes. The site is available in French and English, and you can switch languages at any time.',
      },
    ],
  },

  cloture: {
    titre: 'Let’s talk about your team or your career',
    description:
      'Companies book a 30-minute call. Talent applies online with their CV.',
    ctaPrincipal: 'Book a call',
    ctaSecondaire: 'Apply now',
    tuiles: [
      'Web dev',
      'Software',
      'Design',
      'Video',
      'CM',
      'Marketing',
      'Admin',
      'Customer service',
      'Accounting',
      'Assistance',
      'Data',
      'Support',
    ],
  },

  retourEnHaut: 'Back to top',

  pied: {
    navigation: [
      { ancre: 'talents', libelle: 'Talent' },
      { ancre: 'entreprises', libelle: 'Staff augmentation' },
      { ancre: 'profils', libelle: 'Profiles' },
      { ancre: 'a-propos', libelle: 'About' },
      { ancre: 'contact', libelle: 'Contact' },
      { ancre: 'faq', libelle: 'FAQ' },
    ],
    ctaSecondaire: 'Apply now',
    copyright: '© Agence Maldia 2026. All rights reserved.',
  },
}
