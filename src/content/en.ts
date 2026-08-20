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
      menu: 'Open menu',
      fermerMenu: 'Close menu',
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

    pourquoi: {
      intitule: 'Why Maldia',
      titre:
        'You describe the role. We search, shortlist and present French-speaking profiles based in Madagascar.',
      titreSuite: 'No recruitment fees. No change to your tools.',
      etiquette: '#staff augmentation',
      liste: [
        {
          ligne1: 'Recruitment',
          ligne2: 'fees',
          chiffre: '0',
          description: 'Search and shortlisting are not billed.',
          accent: true,
        },
        {
          ligne1: 'Average time',
          ligne2: 'for a profile',
          chiffre: '14 d',
          description: 'From the stated need to candidates presented.',
        },
        {
          ligne1: 'Saving on',
          ligne2: 'the roles entrusted',
          chiffre: '50%',
          description: 'Up to 50% on the roles entrusted to Maldia.',
          accent: true,
        },
        {
          ligne1: 'Saving on',
          ligne2: 'total payroll',
          chiffre: '25%',
          description: 'Up to 25% of your total payroll.',
        },
        {
          ligne1: 'French-speaking',
          ligne2: 'talent',
          chiffre: 'FR',
          description: 'In French, with your teams and your clients.',
        },
        {
          ligne1: 'Your tools,',
          ligne2: 'unchanged',
          chiffre: '100%',
          description: 'We adapt to the tools you already use.',
        },
      ],
      encart: {
        intitule: 'The timeline, honestly',
        texte:
          'Fourteen days is an average, not a guarantee. A rare profile takes longer, and we say so before we start.',
        cta: 'Discuss your needs',
      },
    },

    marches: {
      intitule: 'Our talent works with companies in',
      liste: [
        'Quebec',
        'France',
        'Belgium',
        'Switzerland',
        'Luxembourg',
        'French-speaking Canada',
        'Monaco',
      ],
      resume: 'French-speaking Canada · Europe',
    },

    profils: {
      intitule: 'Profiles',
      titre: 'The profiles our clients entrust to Maldia.',
      cta: 'Discuss a profile',
      liste: [
        {
          nom: 'Web development',
          description:
            'Integration, business applications and maintenance. Your repositories, your code reviews, your environments — the talent joins your workflow as it stands.',
          etiquettes: ['React · Vue · Nuxt', 'Node · Python', 'GitHub · GitLab', 'WordPress · Shopify'],
        },
        {
          nom: 'Design and UI',
          description:
            'Interfaces, identity and variations. The talent works in your Figma files and follows your existing system rather than imposing another one.',
          etiquettes: ['Figma', 'Design system', 'Photoshop · Illustrator', 'Canva'],
        },
        {
          nom: 'Video and editing',
          description:
            'Editing, subtitling and variations for social channels. Delivered in the format you ask for, in your templates and your brand.',
          etiquettes: ['Premiere Pro', 'After Effects', 'CapCut', 'FR subtitling'],
        },
        {
          nom: 'Community management',
          description:
            'Publishing, moderation and community work in French. The talent keeps your editorial calendar and answers in your brand’s voice.',
          etiquettes: ['Meta Business Suite', 'Buffer', 'Canva', 'FR copywriting'],
        },
        {
          nom: 'Support and administration',
          description:
            'Handling requests, data entry and case tracking. On your ticketing tool and your procedures, with a regular check-in.',
          etiquettes: ['FR customer service', 'Notion · Trello', 'HubSpot · Salesforce', 'Google Workspace'],
        },
        {
          nom: 'Accounting and data',
          description:
            'Entry, reconciliation and tracking sheets. The talent feeds your files and your dashboards without changing your habits.',
          etiquettes: ['Bookkeeping', 'Excel · Sheets', 'Google Analytics', 'Reporting'],
        },
      ],
      delaiIntitule: 'Average time',
      delai: '14 days',
      ctaProfil: 'Request this profile',
    },

    methode: {
      intitule: 'Method',
      titre: 'Five steps, and the reinforcement is in place.',
      description: 'You keep the final say at every step. We do not bill for the search.',
      liste: [
        {
          cote: 'client',
          acteur: 'You',
          titre: 'You describe the need',
          description: 'Role, tasks, expected level and the tools already in place.',
        },
        {
          cote: 'maldia',
          acteur: 'Maldia',
          titre: 'We search',
          description: 'Sourcing in Madagascar, interviews and French assessment.',
        },
        {
          cote: 'maldia',
          acteur: 'Maldia',
          titre: 'We shortlist',
          description: 'A few profiles only, with our interview notes.',
        },
        {
          cote: 'client',
          acteur: 'You',
          titre: 'You choose',
          description: 'You meet the candidates and decide on your own.',
        },
        {
          cote: 'maldia',
          acteur: 'Maldia',
          titre: 'We handle follow-up',
          description: 'Regular check-ins, replacement if the profile does not fit.',
        },
      ],
      conclusion: 'The talent joins your working environment. You have nothing to change.',
      ctaPrincipal: 'Book a call',
      ctaSecondaire: 'Apply now',
    },

    parcours: {
      intitule: 'Paths',
      titre: 'Two paths, one action.',
      description: 'A company looking for staff, or a person looking for an opportunity.',
      voies: [
        {
          pour: 'Companies',
          meta: 'A call · 30 min',
          titre: 'You are looking for staff',
          description:
            'You describe the role, we present French-speaking profiles. No recruitment fees, fourteen days on average.',
          points: [
            'No recruitment fees',
            '14 days on average for a profile',
            'You describe the profile you need',
            'Maldia searches and shortlists',
            'The talent works with your tools',
            'Follow-up handled by Maldia',
          ],
          cta: 'Book a call',
        },
        {
          pour: 'Talent',
          meta: 'Online application',
          titre: 'You are looking for an opportunity',
          description:
            'You are in Madagascar and you want to work remotely with French-speaking companies. Upload your résumé.',
          points: [
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
        },
      ],
    },

    base: {
      intitule: 'Database',
      suffixe: '+',
      libelle: 'candidates in our database',
      precision: 'Across every professional field we recruit for, in Madagascar.',
      outilsIntitule: 'Your tools, our way of working',
      mention:
        'These brands are named to situate our talent’s skills. Agence Maldia is not a partner of any of them.',
    },

    contact: {
      intitule: 'Contact',
      titre: 'Let’s talk about your team, or your career.',
      description:
        'Companies book a 30-minute call. Talent uploads their résumé online.',
      cartes: [
        {
          intitule: 'Companies',
          titre: 'Book a call',
          mention: '30 minutes · via Cal.com',
        },
        {
          intitule: 'Talent',
          titre: 'Apply now',
          mention: 'PDF, DOC, DOCX',
        },
      ],
    },

    pied: {
      navigation: [
        { page: 'accueil', libelle: 'Home' },
        { page: 'services', libelle: 'Services' },
        { page: 'talents', libelle: 'Talent' },
        { page: 'a-propos', libelle: 'About' },
        { page: 'blog', libelle: 'Blog' },
        { page: 'contact', libelle: 'Contact' },
      ],
      description:
        'Staff augmentation with French-speaking talent based in Madagascar, for companies in French-speaking Canada and Europe.',
      titrePages: 'Pages',
      titreContact: 'Contact',
      courriel: 'contact@agencemaldia.com',
      lieu: 'Antananarivo, Madagascar',
      reseaux: ['LinkedIn', 'Facebook', 'Instagram'],
      copyright: '© Agence Maldia 2026',
    },

    retourEnHaut: 'Back to top',
  },

  accueil: {
    meta: {
      titre: 'Agence Maldia — French-speaking talent from Madagascar for your teams',
      description:
        'Strengthen your team differently, with French-speaking talent based in Madagascar. No recruitment fees, 14 days on average for a profile.',
      openGraph: {
        titre: 'Strengthen your team differently.',
        description:
          'Agence Maldia connects talent from Madagascar with companies in French-speaking Canada and Europe. No recruitment fees, 14 days on average.',
      },
    },

    hero: {
      lead: 'French-speaking talent based in Madagascar, remote, to strengthen your teams.',
      titre: 'Strengthen your team differently.',
      carteAppel: {
        intitule: 'Let’s talk',
        titre: 'A 30-minute call',
        mention: 'No commitment · via Cal.com',
      },
      carteCandidature: 'Apply now',
      badges: [
        { signe: '0', libelle: 'No recruitment fees' },
        { signe: '14', libelle: 'Days on average' },
      ],
      lecture: {
        pause: 'Pause the image',
        reprendre: 'Resume the image animation',
      },
    },

    questions: {
      intitule: 'Questions',
      titre: 'What we get asked most often.',
      description: 'From companies and from talent alike.',
      filtres: ['All', 'Companies', 'Talent'],
      liste: [
        {
          cote: 'entreprise',
          question: 'Are there any recruitment fees?',
          reponse:
            'No. Searching for and shortlisting candidates is not billed to the company. You only pay for the talent’s work.',
        },
        {
          cote: 'entreprise',
          question: 'How long does it take to find a profile?',
          reponse:
            'Fourteen days on average between the stated need and the presentation of candidates. That is an average, not a guarantee: a rare profile takes longer, and we say so before we start.',
        },
        {
          cote: 'entreprise',
          question: 'Do we have to change our tools?',
          reponse:
            'No. The talent joins your working environment: your messaging, your project management, your access. We adapt to what is already in place.',
        },
        {
          cote: 'entreprise',
          question: 'Does the talent speak French?',
          reponse:
            'Yes. Our talent is French-speaking. French and English levels are assessed separately during shortlisting, and we pass on our interview notes.',
        },
        {
          cote: 'talent',
          question: 'Who can apply?',
          reponse:
            'Anyone based in Madagascar who wants to work with Maldia or be presented to a client company, in any of the professional fields we recruit for.',
        },
        {
          cote: 'talent',
          question: 'How does applying work?',
          reponse:
            'A short form, entirely online, with your résumé uploaded directly in PDF, DOC or DOCX. You receive a confirmation as soon as the application is received.',
        },
      ],
    },
  },

  services: {
    meta: {
      titre: 'Services — Staff augmentation | Agence Maldia',
      description:
        'You describe the role, Maldia searches and shortlists. No recruitment fees, 14 days on average, French-speaking talent, your tools unchanged.',
      openGraph: {
        titre: 'Staff augmentation — Agence Maldia',
        description:
          'Strengthen your teams with French-speaking talent based in Madagascar. No recruitment fees, and we adapt to your tools.',
      },
    },
    entete: {
      intitule: 'Services',
      titre: 'Reinforcement, with no recruitment fees.',
      description:
        'You describe the role. Maldia searches, shortlists and handles follow-up. You keep your tools, your methods and the final say.',
      cta: 'Book a call',
      mention: 'A 30-minute call, no commitment',
    },
  },

  talents: {
    meta: {
      titre: 'Talent — Work with Maldia from Madagascar | Agence Maldia',
      description:
        'You are in Madagascar and looking to work remotely with French-speaking companies. Apply online with your résumé.',
      openGraph: {
        titre: 'Work with Maldia, from Madagascar',
        description:
          'Join the Maldia team, work on our projects, or join a client company’s team remotely in French-speaking Canada or Europe.',
      },
    },
    entete: {
      intitule: 'Talent',
      titre: 'Working remotely, from Madagascar.',
      description:
        'You are looking for a remote professional opportunity. Upload your résumé: if your profile matches a request, we get in touch.',
      cta: 'Apply now',
      mention: 'Short form, entirely online',
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
    entete: {
      intitule: 'About',
      titre: 'An agency between Madagascar and French-speaking markets.',
      description: 'Staff augmentation, not one-off placement.',
    },
    chapeau:
      'Agence Maldia builds remote teams for French-speaking companies, with talent based in Madagascar. We search, shortlist and support; the company chooses and keeps control of how it works.',
    principes: [
      {
        intitule: 'Commitment',
        titre: 'No recruitment fees',
        texte: 'The search is our share of the risk. A company that hires no one pays nothing.',
      },
      {
        intitule: 'Method',
        titre: 'The client’s tools',
        texte:
          'The talent joins the working environment already in place. We impose no tool of our own.',
      },
      {
        intitule: 'Candour',
        titre: 'Limits, stated upfront',
        texte: 'A rare profile takes longer, and we say so before starting the search.',
      },
    ],
    fonctionnement: {
      intitule: 'How it works',
      titre: 'Two sides, one point of contact.',
      description: 'We stay responsible for follow-up on both sides.',
      cotes: [
        {
          lieu: 'Antananarivo',
          titre: 'In Madagascar',
          texte:
            'We recruit, assess and support talent on the ground. More than {nombre} candidates are in our database, across every professional field we cover.',
          valeur: '{nombre}+',
          legende: 'candidates in our database',
        },
        {
          lieu: 'Canada · Europe',
          titre: 'In French-speaking markets',
          texte:
            'Our talent works with companies in French-speaking Canada and Europe, in French, on agreed hours and with the tools already in place at the client.',
          valeur: 'FR',
          legende: 'working language',
        },
      ],
    },
    reperes: {
      intitule: 'Key figures',
      titre: 'What we claim, in numbers.',
      description: 'The same figures as on the Services page.',
    },
  },

  blog: {
    meta: {
      titre: 'Blog — Agence Maldia',
      description:
        'What we learn placing Malagasy talent inside French-speaking teams: remote recruitment, method, tools.',
      openGraph: {
        titre: 'The Agence Maldia blog',
        description:
          'Recruiting in Madagascar, staff augmentation and remote work with French-speaking teams.',
      },
    },
    entete: {
      intitule: 'Blog',
      titre: 'Recruiting and working remotely, no detours.',
      description: 'What we learn placing Malagasy talent inside French-speaking teams.',
      cta: 'Book a call',
      mention: 'Placeholder texts, to be replaced',
    },
    lire: 'Read the article',
    vide: 'The first articles are on their way.',
    retour: 'All articles',
    publieLe: 'Published on',
    deLecture: 'read',
    sommaire: 'Contents',
    auteur: {
      nom: 'The Maldia team',
      lieu: 'Antananarivo',
    },
    appelArticle: {
      titre: 'Want a figure for a specific role?',
      texte: 'We give you a range during the call, with no commitment.',
      cta: 'Book a call',
    },
    serie: {
      intitule: 'Further reading',
      titre: 'In the same series',
    },
    filtreTout: 'All',
    aLaUne: 'Featured',
    suite: {
      titre: 'More articles are coming.',
      texte:
        'We publish at the pace of real cases: remote recruitment, running a mixed team, tools and methods.',
      cta: 'Write to us',
    },
  },

  contact: {
    meta: {
      titre: 'Tell us what you need.',
      description:
        'A thirty-minute call is enough to know if the service fits.',
      openGraph: {
        titre: 'Contact Agence Maldia',
        description: 'A 30-minute call for companies, an online form for talent in Madagascar.',
      },
    },
    entete: {
      intitule: 'Contact',
      titre: 'Tell us what you need.',
      description: 'A thirty-minute call is enough to know if the service fits.',
      cta: 'Book a call',
      mention: '30 minutes · via Cal.com',
    },

    reservation: {
      intitule: 'Booking',
      titre: 'Pick your slot right now.',
      description: 'The calendar is our team’s own. What you book is confirmed.',
      evenement: 'Discovery call · 30 min',
      fuseau: 'Time zone UTC+3',
      emplacement: {
        titre: 'Cal.com calendar goes here',
        texte: 'The embed appears here on the live site',
      },
      mention: 'No payment · No commitment',
      cta: 'Open in Cal.com',
    },

    onglets: ['I am looking for staff', 'I am looking for a role'],

    voies: [
      {
        intitule: 'Companies',
        mention: 'No recruitment fees',
        titre: 'Describe the role to fill',
        champs: [
          { type: 'texte', nom: 'nom', libelle: 'Full name', exemple: 'Marie Tremblay' },
          {
            type: 'courriel',
            nom: 'courriel',
            libelle: 'Work email',
            exemple: 'marie@company.com',
          },
          { type: 'texte', nom: 'entreprise', libelle: 'Company', exemple: 'Company name' },
          {
            type: 'choix',
            nom: 'profil',
            libelle: 'Profile needed',
            options: [
              'Web development',
              'Design and UI',
              'Video and editing',
              'Community management',
              'Support and administration',
              'Accounting and data',
              'Not sure yet',
            ],
          },
          {
            type: 'zone',
            nom: 'besoin',
            libelle: 'Your need, in a few lines',
            exemple: 'Tasks, expected level, tools already in place, target date.',
          },
        ],
        envoyer: 'Send the request',
        note: 'Answer within one working day. No commitment.',
      },
      {
        intitule: 'Talent',
        mention: 'PDF, DOC, DOCX',
        titre: 'Upload your application',
        champs: [
          { type: 'texte', nom: 'nom', libelle: 'Full name', exemple: 'Your name' },
          { type: 'courriel', nom: 'courriel', libelle: 'Email', exemple: 'you@email.com' },
          {
            type: 'choix',
            nom: 'domaine',
            libelle: 'Field',
            options: [
              'Web development',
              'Design and UI',
              'Video and editing',
              'Community management',
              'Support and administration',
              'Accounting and data',
              'Other',
            ],
          },
          {
            type: 'choix',
            nom: 'francais',
            libelle: 'Level of French',
            options: ['Fluent', 'Professional', 'Intermediate'],
          },
          {
            type: 'fichier',
            nom: 'cv',
            libelle: 'Your résumé',
            titre: 'Drop your file here',
            precision: 'PDF, DOC, DOCX · 5 MB maximum',
          },
        ],
        envoyer: 'Send my application',
        note: 'Confirmation as soon as your application is received.',
      },
    ],

    calendrier: {
      intitule: 'Direct booking · Cal.com',
      titre: 'Book a slot in our calendar',
      texte:
        'Thirty minutes, with no email back and forth. The slot lands straight in our calendar.',
      creneaux: ['Mon – Fri', '9am – 5pm', 'UTC+3', 'Cal.com'],
      cta: 'Open the calendar',
    },

    coordonnees: {
      courriel: 'Email',
      bureau: 'Office',
      marches: 'Markets',
    },

    mention:
      'Booking goes through Cal.com and applications through our résumé application: this site stores no data.',
  },
}
