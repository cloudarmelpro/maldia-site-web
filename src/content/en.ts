import type { Contenu } from './types'

// English content. Mirrors `fr.ts` in structure — the tuples in `types.ts` make
// any divergence a compile error.
//
// English typography, not French: no space before colons or percent signs,
// typographic apostrophes (U+2019).
export const en: Contenu<'en'> = {
  commun: {
    enTete: {
      marque: 'Agence Maldia',
      initiale: 'M',
      menu: 'Menu',
      navigation: [
        { page: 'accueil', libelle: 'Home' },
        { page: 'services', libelle: 'Services' },
        { page: 'talents', libelle: 'Talent' },
        { page: 'a-propos', libelle: 'About' },
        { page: 'blog', libelle: 'Blog' },
        { page: 'contact', libelle: 'Contact' },
      ],
      changerDeLangue: 'Change language',
      cta: 'Book a call',
    },

    marches: {
      titre: 'Our talent works with companies in French-speaking Canada and Europe',
      liste: [
        'Quebec',
        'French-speaking Canada',
        'France',
        'Belgium',
        'Switzerland',
        'Luxembourg',
        'Monaco',
      ],
    },

    argumentaire: {
      titre: 'What Maldia changes for your team',
      description:
        'French-speaking reinforcement, with no recruitment fees and no change to your tools.',
      liste: [
        {
          chiffre: '0',
          titre: 'Recruitment fees',
          description: 'No recruitment fees.',
        },
        {
          chiffre: '14 days',
          titre: 'On average',
          description: 'Find your next talent in 14 days on average.',
        },
        {
          chiffre: 'up to 50%',
          titre: 'On the roles you entrust',
          description: 'Cut the cost of the roles you entrust to Maldia by up to 50%.',
        },
        {
          chiffre: 'around 25%',
          titre: 'On total payroll',
          description:
            'Depending on the roles you entrust, cut your total payroll by up to around 25%.',
        },
        {
          titre: 'French-speaking talent',
          description: 'Our talent works in French, with your teams and with your clients.',
        },
        {
          titre: 'Your tools, unchanged',
          description: 'We adapt to the tools the company already uses.',
        },
      ],
      mention: 'The 14-day figure is an average, not a guarantee.',
    },

    compteur: {
      prefixe: 'More than',
      libelle: 'candidates in our database',
      precision: 'Across every professional field we recruit for.',
    },

    outils: {
      titre: 'Your tools, our way of working',
      mention:
        'These brands are named to situate our talent’s skills. Agence Maldia is not a partner of any of them.',
    },

    cloture: {
      titre: 'Let’s talk about your team or your career',
      description:
        'Companies book a 30-minute call. Talent applies online with their résumé.',
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
        { page: 'accueil', libelle: 'Home' },
        { page: 'services', libelle: 'Services' },
        { page: 'talents', libelle: 'Talent' },
        { page: 'a-propos', libelle: 'About' },
        { page: 'blog', libelle: 'Blog' },
        { page: 'contact', libelle: 'Contact' },
      ],
      ctaSecondaire: 'Apply now',
      copyright: '© Agence Maldia 2026. All rights reserved.',
    },
  },

  accueil: {
    meta: {
      titre: 'Agence Maldia — Talent from Madagascar for international teams',
      description:
        'Strengthen your team with French-speaking talent based in Madagascar. No recruitment fees, 14 days on average to find a profile.',
      openGraph: {
        titre: 'Agence Maldia — Talent from Madagascar for international teams',
        description:
          'Agence Maldia connects talent from Madagascar with companies in French-speaking Canada and Europe. No recruitment fees, 14 days on average.',
      },
    },

    hero: {
      pastille: {
        avant: 'Talent from ',
        misEnAvant: 'Madagascar',
        apres: ', remote, for your teams',
      },
      titre: ['Strengthen your team', 'with talent from Madagascar'],
      sousTitre: [
        'You are looking for staff, or you are looking for an opportunity.',
        'Both start here.',
      ],
      ctaPrincipal: 'Find a talent',
      ctaSecondaire: 'Apply now',
      mention: 'No recruitment fees · 14 days on average',
    },

    parcours: {
      titre: ['Two paths,', 'one action.'],
      sousTitre: [
        'A company looking for staff, or a person who wants to work with',
        'Maldia. Each has its own way in.',
      ],
      entrees: [
        {
          intitule: 'Talent in Madagascar',
          action: 'Application',
          unite: 'online, with your résumé',
          description:
            'For people based in Madagascar looking for a remote professional opportunity.',
          inclus: [
            'Short form, entirely online',
            'Upload your résumé directly',
            'Roles at Maldia or with our clients',
            'Remote work from Madagascar',
            'Every professional field',
            'French and English assessed separately',
          ],
          libelleSupplement: 'Accepted résumé formats',
          supplement: 'PDF, DOC, DOCX',
          cta: 'Apply now',
          cta2: 'See the profiles we recruit',
          note: 'You receive a confirmation as soon as your application has been received.',
        },
        {
          intitule: 'Companies',
          action: 'A call',
          unite: '30 min, via Cal.com',
          description:
            'For companies looking to strengthen their teams with remote French-speaking talent.',
          inclus: [
            'No recruitment fees',
            '14 days on average for a profile',
            'You describe the profile you need',
            'Maldia searches and shortlists',
            'The talent works with your tools',
            'Follow-up handled by Maldia',
          ],
          libelleSupplement: 'Markets served',
          supplement: 'French-speaking Canada and Europe',
          cta: 'Find a talent',
          cta2: 'Discuss your needs',
          note: 'The call is booked directly in our calendar, with no email back and forth.',
        },
      ],
      encart: {
        titre: 'Not sure which profile to hire yet?',
        description:
          'Tell us about your need on a first call. We will tell you which profiles are available and how the service can be organised for your team.',
        cta: 'Discuss your needs',
      },
    },

    faq: {
      titre: 'Frequently asked questions',
      description:
        'Answers to the questions we get most often, from companies and from talent alike.',
      questions: [
        {
          question: 'Are there any recruitment fees?',
          reponse:
            'No. There are no recruitment fees: searching for and shortlisting candidates is not billed to the company.',
        },
        {
          question: 'How long does it take to find a talent?',
          reponse:
            'Fourteen days on average between your request and the presentation of profiles. That is an average, not a guarantee: a rare profile takes longer.',
        },
        {
          question: 'Do we have to change our tools?',
          reponse:
            'No. We adapt to the tools the company already uses: messaging, project management, work tracking. The talent joins your environment, not the other way round.',
        },
        {
          question: 'Does the talent speak French?',
          reponse:
            'Yes. Our talent is French-speaking. French and English levels are assessed separately during shortlisting.',
        },
        {
          question: 'Who can apply?',
          reponse:
            'Anyone based in Madagascar who wants to work with Maldia or be considered for a role with a client company.',
        },
        {
          question: 'How do I book a call?',
          reponse:
            'Booking happens online through Cal.com, straight from the “Book a call” buttons on this site. The call lasts 30 minutes and commits you to nothing.',
        },
      ],
    },
  },

  services: {
    meta: {
      titre: 'Services — Staff augmentation | Agence Maldia',
      description:
        'You describe the profile you need, Maldia finds and shortlists it. No recruitment fees, 14 days on average, French-speaking talent, your tools unchanged.',
      openGraph: {
        titre: 'Staff augmentation — Agence Maldia',
        description:
          'Strengthen your teams with French-speaking talent based in Madagascar. No recruitment fees, 14 days on average, and we adapt to your tools.',
      },
    },

    entete: {
      titre: 'Staff augmentation, explained simply',
      description:
        'You describe the profile you need. Maldia finds it, shortlists it and handles the follow-up. You keep your tools, your methods and the final say on the choice.',
      cta: 'Book a call',
      mention: 'A first 30-minute call, with no commitment',
    },

    deroulement: {
      titre: 'How the service works',
      description:
        'From your request to the talent joining your team, six steps followed by Maldia.',
      liste: [
        {
          numero: '01',
          cote: 'You',
          titre: 'Your request',
          description:
            'You describe the profile you are looking for, the field and the level of experience expected.',
        },
        {
          numero: '02',
          cote: 'Maldia',
          titre: 'Search and shortlist',
          description:
            'We look for the profile among our candidates and filter on field, experience and level of French and English.',
        },
        {
          numero: '03',
          cote: 'Maldia',
          titre: 'Profiles presented',
          description: 'You only receive the applications that match your request.',
        },
        {
          numero: '04',
          cote: 'You',
          titre: 'Your choice',
          description: 'You run the interviews and choose the person who suits you.',
        },
        {
          numero: '05',
          cote: 'Together',
          titre: 'Your tools, your methods',
          description:
            'The talent works remotely with the tools and methods already in place at your company.',
        },
        {
          numero: '06',
          cote: 'Maldia',
          titre: 'Support and follow-up',
          description: 'Maldia supports the collaboration and handles follow-up over time.',
        },
      ],
      cta: 'Book a call',
      mention: 'No recruitment fees, and an average of 14 days.',
    },

    domaines: {
      titre: 'The fields we cover',
      tuiles: {
        rangee1: ['Web dev', 'Software', 'Design', 'Video', 'CM', 'Marketing'],
        rangee2: ['Admin', 'Customer service', 'Accounting', 'Assistance'],
      },
      titreGauche: 'Professional profiles',
      titreSombre:
        'Strengthen your teams with French-speaking talent based in Madagascar, working remotely',
      ctaSombre: 'Discuss your needs',
    },
  },

  talents: {
    meta: {
      titre: 'Talent — Work with Maldia from Madagascar | Agence Maldia',
      description:
        'You are based in Madagascar and looking for a remote professional opportunity. Apply online with your résumé.',
      openGraph: {
        titre: 'Work with Maldia, from Madagascar',
        description:
          'Join the Maldia team, work on our projects, or join a client company’s team remotely in French-speaking Canada or Europe.',
      },
    },

    entete: {
      titre: 'Work with Maldia, from Madagascar',
      description:
        'You are based in Madagascar and looking for a remote professional opportunity. Apply with your résumé: if your profile matches a request, we get in touch.',
      cta: 'Apply now',
      mention: 'Short form, entirely online',
    },

    opportunites: {
      titre: 'Three ways to work with Maldia',
      description:
        'You are based in Madagascar and looking for a remote professional opportunity. Here are the three possible paths with Maldia.',
      liste: [
        {
          titre: 'Join the Maldia team',
          description: 'You join the Maldia team directly and work on our internal activities.',
        },
        {
          titre: 'Work on our projects',
          description:
            'You contribute to the projects Maldia runs for its clients, in your professional field.',
        },
        {
          titre: 'Join a client company',
          description:
            'Through staff augmentation, you join the team of one of Maldia’s client companies remotely.',
        },
      ],
    },

    cartes: {
      titre: 'What to know before applying',
      description:
        'How the work happens, which companies are involved, and how recruitment unfolds.',
      liste: [
        {
          titre: 'Working remotely, from Madagascar',
          description:
            'You stay in Madagascar and work remotely, either on Maldia’s projects or directly within a client company’s team. Maldia handles follow-up throughout the collaboration.',
        },
        {
          titre: 'International companies',
          description:
            'Our client companies are mainly in Quebec and French-speaking Canada, France, Belgium, Switzerland, Luxembourg and Monaco.',
        },
        {
          titre: 'Recruitment, step by step',
          description:
            'You apply online with your résumé. If your profile matches a request, we contact you for the next steps.',
          frise: [
            { libelle: 'Application', precision: 'résumé online' },
            { libelle: 'Shortlist', precision: 'by Maldia' },
            { libelle: 'Selection', precision: 'with the client' },
          ],
        },
      ],
    },

    criteres: {
      titre: 'What the application asks for',
      description:
        'The form is short: your contact details, your field, the role you want, your experience, your availability and your résumé in PDF, DOC or DOCX.',
      liste: [
        { libelle: 'Field', precision: 'professional' },
        { libelle: 'Experience', precision: 'years' },
        { libelle: 'French', precision: 'level' },
        { libelle: 'English', precision: 'level' },
        { libelle: 'Availability', precision: 'starting from' },
      ],
    },

    profils: {
      titre: 'The profiles we recruit',
      liste: [
        {
          description:
            'Websites, integrations and maintenance: front-end, back-end and full-stack profiles.',
          nom: 'Web development',
          precision: 'front-end, back-end, full-stack',
        },
        {
          description:
            'Business applications and internal tools, from development to production.',
          nom: 'Software development',
          precision: 'applications and tools',
        },
        {
          description: 'Interfaces, visual identity and communication material.',
          nom: 'Design',
          precision: 'UI/UX and graphic design',
        },
        {
          description: 'Editing, styling and preparation of video content for your channels.',
          nom: 'Video editing',
          precision: 'editing and post-production',
        },
        {
          description: 'Running social accounts, publishing and moderating communities.',
          nom: 'Community management',
          precision: 'social media',
        },
        {
          description: 'Campaigns, content and tracking of digital performance.',
          nom: 'Digital marketing',
          precision: 'campaigns and content',
        },
        {
          description: 'Document handling, data entry, case tracking and administrative tasks.',
          nom: 'Administration',
          precision: 'management and tracking',
        },
        {
          description: 'Answering customers by email, chat or phone.',
          nom: 'Customer service',
          precision: 'customer support',
        },
        {
          description: 'Bookkeeping, reconciliation and preparation of accounting documents.',
          nom: 'Accounting',
          precision: 'bookkeeping',
        },
        {
          description: 'Day-to-day remote support: calendar, email, coordination and follow-up.',
          nom: 'Virtual assistance',
          precision: 'support for executives',
        },
        {
          description: 'Other professional profiles are recruited according to our clients’ needs.',
          nom: 'Other profiles',
          precision: 'on request',
        },
      ],
    },
  },

  aPropos: {
    meta: {
      titre: 'About — Agence Maldia',
      description:
        'Agence Maldia connects talent from Madagascar with international companies looking to strengthen their teams remotely.',
      openGraph: {
        titre: 'About Agence Maldia',
        description:
          'We recruit in Madagascar and work with companies in French-speaking Canada and Europe. Our role: recruit, shortlist, support.',
      },
    },
    titre: 'Between Madagascar and French-speaking markets',
    description:
      'Agence Maldia connects talent from Madagascar with international companies looking to strengthen their teams.',
    paragraphes: [
      'We recruit in Madagascar and work with companies established in Quebec and French-speaking Canada, France, Belgium, Switzerland, Luxembourg and Monaco.',
      'Our role comes down to three things. We recruit and shortlist talent. We present the company with the profiles that match its request. Then we support the collaboration over time. The talent stays in Madagascar and works remotely, within the client’s team.',
      'The service works for both sides. Someone in Madagascar finds a professional opportunity without leaving the country. A company finds French-speaking reinforcement, with no recruitment fees and no change to its tools.',
    ],
    reperes: {
      marches: 'markets served',
      domaines: 'professional fields',
      langues: 'working languages',
    },
    cta: 'Book a call',
  },

  blog: {
    meta: {
      titre: 'Blog — Agence Maldia',
      description:
        'What we learn from recruiting in Madagascar and working remotely with French-speaking teams.',
      openGraph: {
        titre: 'The Agence Maldia blog',
        description:
          'Recruiting in Madagascar, staff augmentation and remote work with French-speaking teams.',
      },
    },
    titre: 'The blog',
    description:
      'What we learn from recruiting in Madagascar and working remotely with French-speaking teams.',
    lire: 'Read the article',
    vide: 'The first articles are on their way.',
    retour: 'All articles',
    publieLe: 'Published on',
    appelArticle: 'Take the next step',
  },

  contact: {
    meta: {
      titre: 'Contact — Book a call | Agence Maldia',
      description:
        'Book a 30-minute call with Agence Maldia through Cal.com, or apply if you are talent based in Madagascar.',
      openGraph: {
        titre: 'Contact Agence Maldia',
        description:
          'A 30-minute call for companies, an online form for talent in Madagascar.',
      },
    },
    titre: 'Let’s talk',
    description:
      'For companies, booking a call is the main way to reach us: it goes straight into our calendar. For talent, everything goes through the online application.',
    voies: [
      {
        intitule: 'Companies',
        titre: 'A 30-minute call',
        description:
          'You tell us about your need. We tell you which profiles are available and how the service can be organised for your team.',
        etapes: [
          'You pick a slot in the calendar',
          'You get the confirmation and the call link',
          'We talk about your need, with no commitment',
        ],
        cta: 'Book a call',
        note: 'The booking goes through Cal.com and lands straight in our calendar.',
      },
      {
        intitule: 'Talent in Madagascar',
        titre: 'Apply with your résumé',
        description:
          'The form is short: your contact details, your field, the role you want, your experience, your availability and your résumé.',
        etapes: [
          'You fill in the online form',
          'You attach your résumé in PDF, DOC or DOCX',
          'We contact you if your profile matches',
        ],
        cta: 'Apply now',
        note: 'You receive a confirmation as soon as your application has been received.',
      },
    ],
    mention:
      'This site has no contact form and stores no data: booking goes through Cal.com, applications through our résumé application.',
  },
}
