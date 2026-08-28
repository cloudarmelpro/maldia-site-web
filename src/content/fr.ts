import type { Contenu } from './types'

// Contenu français. Les chaînes du design « Hero Maldia v2 » sont reprises au
// mot près ; seule la typographie française leur est appliquée — apostrophe
// courbe, espace insécable étroite (U+202F) avant la ponctuation double,
// espace insécable (U+00A0) avant le signe %. Ce sont les mêmes mots.
export const fr: Contenu<'fr'> = {
  commun: {
    enTete: {
      marque: 'Agence Maldia',
      initiale: 'M',
      menu: 'Ouvrir le menu',
      fermerMenu: 'Fermer le menu',
      // WEB-11 — l'ordre du retour client. Le type le vérifie contre PAGES.
      navigation: [
        { page: 'accueil', libelle: 'Accueil' },
        { page: 'services', libelle: 'Services' },
        { page: 'talents', libelle: 'Talents' },
        { page: 'a-propos', libelle: 'À propos' },
        { page: 'blog', libelle: 'Blog' },
        { page: 'contact', libelle: 'Contact' },
      ],
      changerDeLangue: 'Changer de langue',
      cta: 'Prendre rendez-vous',
    },

    pourquoi: {
      intitule: 'Pourquoi Maldia',
      titre:
        'Vous décrivez le poste. Nous cherchons, présélectionnons et vous présentons des profils francophones basés à Madagascar.',
      titreSuite: 'Aucuns frais de recrutement. Aucun changement dans vos outils.',
      etiquette: '#staff augmentation',
      liste: [
        {
          ligne1: 'Frais de',
          ligne2: 'recrutement',
          chiffre: '0',
          description: 'Recherche et présélection non facturées.',
          accent: true,
        },
        {
          ligne1: 'Délai moyen',
          ligne2: 'pour un profil',
          chiffre: '14 j',
          description: 'Du besoin exprimé aux candidats présentés.',
        },
        {
          ligne1: 'Économie sur',
          ligne2: 'les postes confiés',
          chiffre: '50 %',
          description: 'Jusqu’à 50 % sur les postes confiés à Maldia.',
          accent: true,
        },
        {
          ligne1: 'Économie sur',
          ligne2: 'la masse salariale',
          chiffre: '25 %',
          description: 'Jusqu’à 25 % de votre masse salariale totale.',
        },
        {
          ligne1: 'Talents',
          ligne2: 'francophones',
          chiffre: 'FR',
          description: 'En français, avec vos équipes et vos clients.',
        },
        {
          ligne1: 'Changements dans',
          ligne2: 'vos outils',
          chiffre: '0',
          description: 'Nous nous adaptons à vos outils existants.',
        },
      ],
      encart: {
        intitule: 'Le délai, honnêtement',
        texte:
          'Quatorze jours est une moyenne, pas une garantie. Un profil rare demande plus de temps, et nous le disons avant de commencer.',
        cta: 'Discuter de vos besoins',
      },
    },

    marches: {
      intitule: 'Nos talents travaillent avec des entreprises en',
      liste: ['Québec', 'France', 'Belgique', 'Suisse', 'Luxembourg', 'Canada francophone', 'Monaco'],
      resume: 'Canada francophone · Europe',
    },

    profils: {
      intitule: 'Profils',
      titre: 'Les profils que nos clients confient à Maldia.',
      cta: 'Discuter d’un profil',
      liste: [
        {
          nom: 'Développement web',
          famille: 'Technique',
          resume: 'Intégration, applications métier, maintenance.',
          outils: 'React · Vue · Node · Python',
          description:
            'Intégration, applications métier et maintenance. Vos dépôts, vos revues de code, vos environnements — le talent rejoint votre chaîne de travail telle qu’elle est.',
          etiquettes: ['React · Vue · Nuxt', 'Node · Python', 'GitHub · GitLab', 'WordPress · Shopify'],
        },
        {
          nom: 'Design et UI',
          famille: 'Création',
          resume: 'Interfaces, identité, déclinaisons.',
          outils: 'Figma · Photoshop · Illustrator',
          description:
            'Interfaces, identité et déclinaisons. Le talent travaille dans vos fichiers Figma et suit votre système existant plutôt que d’en imposer un autre.',
          etiquettes: ['Figma', 'Design system', 'Photoshop · Illustrator', 'Canva'],
        },
        {
          nom: 'Vidéo et montage',
          famille: 'Création',
          resume: 'Montage, sous-titrage, formats réseaux.',
          outils: 'Premiere · After Effects · CapCut',
          description:
            'Montage, sous-titrage et déclinaisons pour les réseaux. Livraison au format demandé, dans vos gabarits et votre charte.',
          etiquettes: ['Premiere Pro', 'After Effects', 'CapCut', 'Sous-titrage FR'],
        },
        {
          nom: 'Community management',
          famille: 'Marketing',
          resume: 'Publication, animation, modération en français.',
          outils: 'Meta Business Suite · Buffer',
          description:
            'Publication, animation et modération en français. Le talent tient votre calendrier éditorial et répond avec le ton de votre marque.',
          etiquettes: ['Meta Business Suite', 'Buffer', 'Canva', 'Rédaction FR'],
        },
        {
          nom: 'Support et administration',
          famille: 'Opérations',
          resume: 'Demandes, saisie, suivi de dossiers.',
          outils: 'Notion · Trello · HubSpot',
          description:
            'Traitement des demandes, saisie et suivi de dossiers. Sur votre outil de ticket et vos procédures, avec un point de suivi régulier.',
          etiquettes: ['Service client FR', 'Notion · Trello', 'HubSpot · Salesforce', 'Google Workspace'],
        },
        {
          nom: 'Comptabilité et données',
          famille: 'Opérations',
          resume: 'Saisie, rapprochements, tableaux de suivi.',
          outils: 'Excel · Sheets · Analytics',
          description:
            'Saisie, rapprochements et tableaux de suivi. Le talent alimente vos fichiers et vos tableaux de bord sans changer vos habitudes.',
          etiquettes: ['Saisie comptable', 'Excel · Sheets', 'Google Analytics', 'Reporting'],
        },
      ],
      delaiIntitule: 'Délai moyen',
      delai: '14 jours',
      ctaProfil: 'Demander ce profil',
    },

    methode: {
      intitule: 'Méthode',
      titre: 'Du besoin exprimé au renfort en place.',
      description:
        'Vous gardez la décision finale à chaque étape. Nous ne facturons pas la recherche.',
      liste: [
        {
          cote: 'client',
          acteur: 'Vous',
          titre: 'Vous décrivez le besoin',
          description: 'Poste, missions, niveau attendu et outils déjà en place.',
        },
        {
          cote: 'maldia',
          acteur: 'Maldia',
          titre: 'Nous cherchons',
          description: 'Sourcing à Madagascar, entretiens et évaluation du français.',
        },
        {
          cote: 'maldia',
          acteur: 'Maldia',
          titre: 'Nous présélectionnons',
          description: 'Quelques profils seulement, avec nos notes d’entretien.',
        },
        {
          cote: 'client',
          acteur: 'Vous',
          titre: 'Vous choisissez',
          description: 'Vous rencontrez les candidats et décidez seul.',
        },
        {
          cote: 'maldia',
          acteur: 'Maldia',
          titre: 'Nous assurons le suivi',
          description: 'Point régulier tout au long de la mission.',
        },
      ],
      conclusion: 'Le talent rejoint votre environnement de travail. Vous n’avez rien à changer.',
      ctaPrincipal: 'Prendre rendez-vous',
      ctaSecondaire: 'Déposer ma candidature',
    },

    parcours: {
      intitule: 'Parcours',
      titre: 'Deux parcours, une seule action.',
      description:
        'Une entreprise qui cherche du personnel, ou une personne qui cherche une opportunité.',
      voies: [
        {
          pour: 'Entreprises',
          meta: 'Rendez-vous · 30 min',
          titre: 'Vous cherchez du personnel',
          description:
            'Vous décrivez le poste, nous présentons des profils francophones. Aucuns frais de recrutement, quatorze jours en moyenne.',
          points: [
            'Aucuns frais de recrutement',
            '14 jours en moyenne pour un profil',
            'Vous décrivez le profil recherché',
            'Maldia recherche et présélectionne',
            'Le talent travaille avec vos outils',
            'Suivi assuré par Maldia',
          ],
          cta: 'Prendre rendez-vous',
        },
        {
          pour: 'Talents',
          meta: 'Candidature en ligne',
          titre: 'Vous cherchez une opportunité',
          description:
            'Vous êtes à Madagascar et vous voulez travailler à distance avec des entreprises francophones. Déposez votre CV.',
          points: [
            'Formulaire court, entièrement en ligne',
            'Dépôt direct de votre CV',
            'Postes chez Maldia ou chez nos clients',
            'Travail à distance depuis Madagascar',
            'Tous les domaines professionnels',
            'Français et anglais évalués séparément',
          ],
          libelleSupplement: 'Formats de CV acceptés',
          supplement: 'PDF, DOC, DOCX',
          cta: 'Déposer ma candidature',
        },
      ],
    },

    base: {
      intitule: 'Base',
      suffixe: '+',
      libelle: 'candidats dans notre base de données',
      precision: 'Dans tous les domaines professionnels que nous recrutons, à Madagascar.',
      outilsIntitule: 'Vos outils, notre façon de travailler',
      mention:
        'Ces marques sont citées pour situer les compétences de nos talents. Agence Maldia n’est partenaire d’aucune d’entre elles.',
    },

    contact: {
      intitule: 'Contact',
      titre: 'Parlons de votre équipe, ou de votre carrière.',
      description:
        'Les entreprises réservent un appel de 30 minutes. Les talents déposent leur CV en ligne.',
      cartes: [
        {
          intitule: 'Entreprises',
          titre: 'Prendre rendez-vous',
          mention: '30 minutes · via Cal.com',
        },
        {
          intitule: 'Talents',
          titre: 'Déposer ma candidature',
          mention: 'PDF, DOC, DOCX',
        },
      ],
    },

    pied: {
      navigation: [
        { page: 'accueil', libelle: 'Accueil' },
        { page: 'services', libelle: 'Services' },
        { page: 'talents', libelle: 'Talents' },
        { page: 'a-propos', libelle: 'À propos' },
        { page: 'blog', libelle: 'Blog' },
        { page: 'contact', libelle: 'Contact' },
      ],
      description:
        'Staff augmentation avec des talents francophones basés à Madagascar, pour les entreprises du Canada francophone et d’Europe.',
      titrePages: 'Pages',
      titreContact: 'Contact',
      courriel: 'contact@agencemaldia.com',
      lieu: 'Antananarivo, Madagascar',
      copyright: '© Agence Maldia 2026',
    },

    retourEnHaut: 'Section précédente',
    allerAuContenu: 'Aller au contenu',
    formulaireFerme: 'Le dépôt en ligne n’est pas encore ouvert. Écrivez-nous en attendant.',
    nonTrouve: {
      intitule: 'Erreur 404',
      titre: 'Cette page n’existe pas.',
      texte: 'L’adresse est peut-être incomplète, ou la page a changé de nom.',
      retour: 'Retour à l’accueil',
      metaTitre: 'Page introuvable — Agence Maldia',
      metaDescription: 'Cette adresse ne correspond à aucune page du site.',
    },
  },

  accueil: {
    meta: {
      titre: 'Agence Maldia — Talents francophones de Madagascar pour vos équipes',
      description:
        'Renforcez votre équipe autrement, avec des talents francophones basés à Madagascar. Aucuns frais de recrutement, 14 jours en moyenne pour un profil.',
      openGraph: {
        titre: 'Renforcez votre équipe autrement.',
        description:
          'Agence Maldia connecte les talents de Madagascar avec des entreprises du Canada francophone et d’Europe. Aucuns frais de recrutement, 14 jours en moyenne.',
      },
    },

    hero: {
      intitule: 'Staff augmentation · Madagascar',
      lead: 'Des talents francophones basés à Madagascar, à distance, pour renforcer vos équipes.',
      titre: 'Renforcez votre équipe autrement.',
      carteAppel: {
        intitule: 'Parlons-en',
        titre: 'Appel de 30 minutes',
        mention: 'Sans engagement · via Cal.com',
      },
      carteCandidature: 'Déposer ma candidature',
      badges: [
        { signe: '0', libelle: 'Aucuns frais de recrutement' },
        { signe: '14', libelle: 'Jours en moyenne' },
      ],
      lecture: {
        pause: 'Mettre l’image en pause',
        reprendre: 'Reprendre l’animation de l’image',
      },
    },

    questions: {
      intitule: 'Questions',
      titre: 'Ce qu’on nous demande le plus souvent.',
      description: 'Du côté des entreprises comme du côté des talents.',
      filtres: ['Tout', 'Entreprises', 'Talents'],
      liste: [
        {
          cote: 'entreprise',
          question: 'Y a-t-il des frais de recrutement ?',
          reponse:
            'Non. La recherche et la présélection des candidats ne sont pas facturées à l’entreprise. Vous ne payez que le travail du talent.',
        },
        {
          cote: 'entreprise',
          question: 'Combien de temps pour trouver un profil ?',
          reponse:
            'Quatorze jours en moyenne entre le besoin exprimé et la présentation des candidats. C’est une moyenne, pas une garantie : un profil rare demande plus de temps, et nous le disons avant de commencer.',
        },
        {
          cote: 'entreprise',
          question: 'Faut-il changer nos outils ?',
          reponse:
            'Non. Le talent rejoint votre environnement de travail : votre messagerie, votre gestion de projet, vos accès. Nous nous adaptons à ce qui est déjà en place.',
        },
        {
          cote: 'entreprise',
          question: 'Les talents parlent-ils français ?',
          reponse:
            'Oui. Nos talents sont francophones. Le niveau de français et le niveau d’anglais sont évalués séparément pendant la présélection, et nous vous transmettons nos notes d’entretien.',
        },
        {
          cote: 'talent',
          question: 'Qui peut déposer une candidature ?',
          reponse:
            'Toute personne basée à Madagascar qui souhaite travailler avec Maldia ou être présentée à une entreprise cliente, dans tous les domaines professionnels que nous recrutons.',
        },
        {
          cote: 'talent',
          question: 'Comment se passe la candidature ?',
          reponse:
            'Un formulaire court, entièrement en ligne, avec dépôt direct de votre CV en PDF, DOC ou DOCX.',
        },
      ],
    },
  },

  services: {
    meta: {
      titre: 'Services — Staff augmentation | Agence Maldia',
      description:
        'Vous décrivez le poste, Maldia cherche et présélectionne. Aucuns frais de recrutement, 14 jours en moyenne, talents francophones, vos outils inchangés.',
      openGraph: {
        titre: 'Staff augmentation — Agence Maldia',
        description:
          'Renforcez vos équipes avec des talents francophones basés à Madagascar. Aucuns frais de recrutement, et nous nous adaptons à vos outils.',
      },
    },
    entete: {
      intitule: 'Services',
      titre: 'Le renfort d’équipe, sans frais de recrutement.',
      description: 'Pour les entreprises du Canada francophone et d’Europe.',
      mention: 'Le délai de 14 jours est une moyenne, pas une garantie.',
    },
    /** L'intitulé de la bande des six chiffres. */
    obtenez: 'Ce que vous obtenez',
    engagements: {
      titre: 'Six engagements, chiffrés.',
      description:
        'Ce que nous facturons, ce que nous ne facturons pas, et en combien de temps.',
    },
    postes: {
      intitule: 'Profils',
      titre: 'Les postes que nos clients nous confient.',
      description: 'Six familles de profils, tous francophones.',
      encart: {
        intitule: 'Chiffrage',
        titre: 'Vous voulez chiffrer un poste précis ?',
        texte:
          'Un appel de trente minutes suffit. Nous vous donnons une fourchette, sans engagement.',
        cta: 'Prendre rendez-vous',
      },
    },
  },

  talents: {
    meta: {
      titre: 'Talents — Travailler avec Maldia depuis Madagascar | Agence Maldia',
      description:
        'Vous êtes à Madagascar et vous cherchez à travailler à distance avec des entreprises francophones. Déposez votre candidature en ligne avec votre CV.',
      openGraph: {
        titre: 'Travailler avec Maldia, depuis Madagascar',
        description:
          'Rejoignez l’équipe Maldia, travaillez sur nos projets, ou intégrez à distance l’équipe d’une entreprise cliente au Canada francophone ou en Europe.',
      },
    },
    entete: {
      intitule: 'Talents',
      titre: 'Travaillez à distance avec des entreprises francophones.',
      description: 'Pour les personnes basées à Madagascar, dans tous les domaines.',
      mention: 'PDF, DOC, DOCX',
    },
    principesIntitule: 'Ce que ça veut dire',
    principes: [
      {
        intitule: 'Cadre',
        titre: 'Travail à distance',
        texte: 'Depuis Madagascar, avec des entreprises du Canada francophone et d’Europe.',
      },
      {
        intitule: 'Métiers',
        titre: 'Tous les domaines',
        texte: 'Développement, design, vidéo, community management, support, comptabilité.',
      },
      {
        intitule: 'Base',
        titre: 'Un dossier conservé',
        texte:
          'Votre candidature rejoint notre base de candidats.',
      },
    ],
    encart: {
      intitule: 'Candidature',
      titre: 'Votre candidature, en une fois.',
      texte:
        'Formulaire court avec dépôt direct du CV.',
      cta: 'Déposer ma candidature',
    },
    domaines: {
      intitule: 'Domaines',
      titre: 'Les profils que nous recrutons.',
      description: 'Si votre métier n’est pas listé, déposez tout de même votre CV.',
    },
    deroule: {
      intitule: 'Déroulé',
      titre: 'Quatre étapes, du CV au poste.',
      description: 'Aucun frais n’est demandé aux candidats, à aucun moment.',
      liste: [
        {
          cote: 'client',
          acteur: 'Vous',
          titre: 'Vous déposez votre CV',
          description: 'Formulaire court, entièrement en ligne. PDF, DOC ou DOCX.',
        },
        {
          cote: 'maldia',
          acteur: 'Maldia',
          titre: 'Nous étudions le dossier',
          description: 'Entretien, évaluation du français et de l’anglais séparément.',
        },
        {
          cote: 'maldia',
          acteur: 'Maldia',
          titre: 'Nous vous présentons',
          description: 'À nos clients, pour les postes qui correspondent à votre profil.',
        },
        {
          cote: 'client',
          acteur: 'Vous',
          titre: 'Vous commencez',
          description: 'À distance depuis Madagascar, avec les outils du client.',
        },
      ],
    },
  },

  aPropos: {
    meta: {
      titre: 'À propos — Agence Maldia',
      description:
        'Agence Maldia connecte les talents de Madagascar avec des entreprises internationales qui souhaitent renforcer leurs équipes à distance.',
      openGraph: {
        titre: 'À propos d’Agence Maldia',
        description:
          'Nous recrutons à Madagascar et travaillons avec des entreprises du Canada francophone et d’Europe. Notre rôle : recruter, présélectionner, accompagner.',
      },
    },
    entete: {
      intitule: 'À propos',
      titre: 'Une agence entre Madagascar et les marchés francophones.',
      description: 'Du staff augmentation, pas du placement ponctuel.',
    },
    chapeau:
      'Agence Maldia constitue des équipes à distance pour des entreprises francophones, avec des talents basés à Madagascar.',
    chapeauSuite:
      'Nous cherchons, présélectionnons et accompagnons ; l’entreprise choisit et garde la main sur son organisation.',
    principesIntitule: 'Principes',
    principes: [
      {
        intitule: 'Engagement',
        titre: 'Pas de frais de recrutement',
        texte:
          'La recherche est notre part du risque. Une entreprise qui n’engage personne ne paie rien.',
      },
      {
        intitule: 'Méthode',
        titre: 'Les outils du client',
        texte:
          'Le talent rejoint l’environnement de travail existant. Nous n’imposons aucun outil.',
      },
      {
        intitule: 'Franchise',
        titre: 'Les limites, dites d’avance',
        texte:
          'Un profil rare demande plus de temps, et nous le disons avant de lancer la recherche.',
      },
    ],
    fonctionnement: {
      intitule: 'Fonctionnement',
      titre: 'Deux côtés, un seul interlocuteur.',
      description: 'Nous restons responsables du suivi des deux côtés.',
      cotes: [
        {
          lieu: 'Antananarivo',
          titre: 'À Madagascar',
          texte:
            'Nous recrutons, évaluons et accompagnons les talents sur place. Plus de {nombre} candidats sont présents dans notre base de données, dans tous les domaines professionnels que nous couvrons.',
          valeur: '{nombre}+',
          legende: 'candidats dans notre base de données',
        },
        {
          lieu: 'Canada · Europe',
          titre: 'Sur les marchés francophones',
          texte:
            'Nos talents travaillent avec des entreprises au Canada francophone et en Europe, en français, aux horaires convenus et avec les outils déjà en place chez le client.',
          valeur: 'FR',
          legende: 'langue de travail',
        },
      ],
    },
    reperes: {
      intitule: 'Repères',
      titre: 'Ce que nous annonçons, chiffré.',
      description: 'Les mêmes chiffres que sur la page Services.',
    },
  },

  blog: {
    meta: {
      titre: 'Blog — Recrutement à distance | Agence Maldia',
      description:
        'Ce que nous apprenons en plaçant des talents malgaches dans des équipes francophones : recrutement à distance, méthode, outils.',
      openGraph: {
        titre: 'Le blog d’Agence Maldia',
        description:
          'Recrutement à Madagascar, staff augmentation et travail à distance avec des équipes francophones.',
      },
    },
    entete: {
      intitule: 'Blog',
      titre: 'Recruter et travailler à distance, sans détour.',
      description:
        'Ce que nous apprenons en plaçant des talents malgaches dans des équipes francophones.',
    },
    lire: 'Lire l’article',
    vide: 'Les premiers articles arrivent bientôt.',
    retour: 'Tous les articles',
    publieLe: 'Publié le',
    deLecture: 'de lecture',
    sommaire: 'Sommaire',
    auteur: {
      nom: 'Équipe Maldia',
      lieu: 'Antananarivo',
    },
    appelArticle: {
      titre: 'Vous voulez chiffrer un poste précis ?',
      texte: 'Nous vous donnons une fourchette pendant l’appel, sans engagement.',
      cta: 'Prendre rendez-vous',
    },
    serie: {
      intitule: 'À lire',
      titre: 'Dans la même série',
    },
    filtreTout: 'Tout',
    aLaUne: 'À la une',
    suite: {
      titre: 'D’autres articles arrivent.',
      texte:
        'Nous publions au rythme des dossiers réels : recrutement à distance, gestion d’équipe mixte, outils et méthodes.',
      cta: 'Nous écrire',
    },
  },

  contact: {
    meta: {
      titre: 'Contact — Prendre rendez-vous | Agence Maldia',
      description:
        'Réservez un appel de 30 minutes avec Agence Maldia via Cal.com, ou déposez votre candidature si vous êtes un talent basé à Madagascar.',
      openGraph: {
        titre: 'Contacter Agence Maldia',
        description:
          'Un appel de 30 minutes pour les entreprises, un formulaire en ligne pour les talents à Madagascar.',
      },
    },
    entete: {
      intitule: 'Contact',
      titre: 'Dites-nous ce dont vous avez besoin.',
      description: 'Un appel de 30 minutes suffit à savoir si le service correspond.',
    },

    reservation: {
      intitule: 'Réservation',
      titre: 'Choisissez votre créneau maintenant.',
      description: 'Le calendrier est celui de notre équipe.',
      evenement: 'Appel de découverte · 30 min',
      fuseau: 'Fuseau UTC+3',
      emplacement: {
        titre: 'Calendrier Cal.com',
        texte: 'Réservation en ligne, sans échange de courriels',
      },
      mention: 'Aucun paiement · Aucun engagement',
      cta: 'Ouvrir dans Cal.com',
    },

    onglets: ['Je cherche du personnel', 'Je cherche un poste'],

    voies: [
      {
        intitule: 'Entreprises',
        mention: 'Aucuns frais de recrutement',
        titre: 'Décrivez le poste à pourvoir',
        champs: [
          { type: 'texte', nom: 'nom', libelle: 'Nom et prénom', exemple: 'Marie Tremblay' },
          {
            type: 'courriel',
            nom: 'courriel',
            libelle: 'Courriel professionnel',
            exemple: 'marie@entreprise.com',
          },
          {
            type: 'texte',
            nom: 'entreprise',
            libelle: 'Entreprise',
            exemple: 'Nom de l’entreprise',
          },
          {
            type: 'choix',
            nom: 'profil',
            libelle: 'Profil recherché',
            options: [
              'Développement web',
              'Design et UI',
              'Vidéo et montage',
              'Community management',
              'Support et administration',
              'Comptabilité et données',
              'Je ne sais pas encore',
            ],
          },
          {
            type: 'zone',
            nom: 'besoin',
            libelle: 'Votre besoin, en quelques lignes',
            exemple: 'Missions, niveau attendu, outils déjà en place, échéance souhaitée.',
          },
        ],
        envoyer: 'Envoyer la demande',
        note: 'Aucun engagement.',
      },
      {
        intitule: 'Talents',
        mention: 'PDF, DOC, DOCX',
        titre: 'Déposez votre candidature',
        champs: [
          { type: 'texte', nom: 'nom', libelle: 'Nom et prénom', exemple: 'Votre nom' },
          { type: 'courriel', nom: 'courriel', libelle: 'Courriel', exemple: 'vous@courriel.com' },
          {
            type: 'choix',
            nom: 'domaine',
            libelle: 'Domaine',
            options: [
              'Développement web',
              'Design et UI',
              'Vidéo et montage',
              'Community management',
              'Support et administration',
              'Comptabilité et données',
              'Autre',
            ],
          },
          {
            type: 'choix',
            nom: 'francais',
            libelle: 'Niveau de français',
            options: ['Courant', 'Professionnel', 'Intermédiaire'],
          },
          {
            type: 'fichier',
            nom: 'cv',
            libelle: 'Votre CV',
            titre: 'Glissez votre fichier ici',
            precision: 'PDF, DOC, DOCX · 5 Mo maximum',
          },
        ],
        envoyer: 'Envoyer ma candidature',
        note: 'Formulaire court, entièrement en ligne.',
      },
    ],


    coordonnees: {
      intitule: 'Coordonnées',
      courriel: 'Courriel',
      bureau: 'Bureau',
      marches: 'Marchés',
    },

    mention:
      'Le rendez-vous passe par Cal.com et la candidature par notre application de CV : ce site ne conserve aucune donnée.',
  },
}
