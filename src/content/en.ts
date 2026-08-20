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
      titre: 'Between Madagascar and French-speaking markets.',
      description:
        'Agence Maldia connects talent from Madagascar with international companies looking to strengthen their teams.',
      cta: 'Book a call',
      mention: 'Antananarivo, Madagascar',
    },
    paragraphes: [
      'We recruit in Madagascar and work with companies established in Quebec and French-speaking Canada, France, Belgium, Switzerland, Luxembourg and Monaco.',
      'Our role comes down to three things. We recruit and shortlist talent. We present the company with the profiles that match its request. Then we support the collaboration over time. The talent stays in Madagascar and works remotely, within the client’s team.',
      'The service works for both sides. Someone in Madagascar finds a professional opportunity without leaving the country. A company finds French-speaking reinforcement, with no recruitment fees and no change to its tools.',
    ],
    reperes: {
      marches: 'markets served',
      domaines: 'profile fields',
      langues: 'working languages',
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
      titre: 'Contact — Book a call | Agence Maldia',
      description:
        'Book a 30-minute call with Agence Maldia through Cal.com, or apply if you are talent based in Madagascar.',
      openGraph: {
        titre: 'Contact Agence Maldia',
        description: 'A 30-minute call for companies, an online form for talent in Madagascar.',
      },
    },
    entete: {
      intitule: 'Contact',
      titre: 'Let’s talk.',
      description:
        'For companies, booking a call is the main way to reach us: it goes straight into our calendar. For talent, everything goes through the online application.',
      cta: 'Book a call',
      mention: '30 minutes · via Cal.com',
    },
    mention:
      'This site has no contact form and stores no data: booking goes through Cal.com, applications through our résumé application.',
  },
}
