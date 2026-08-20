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
          chiffre: '14 j',
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
          ligne1: 'Vos outils,',
          ligne2: 'sans changement',
          chiffre: '100 %',
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
          description:
            'Intégration, applications métier et maintenance. Vos dépôts, vos revues de code, vos environnements — le talent rejoint votre chaîne de travail telle qu’elle est.',
          etiquettes: ['React · Vue · Nuxt', 'Node · Python', 'GitHub · GitLab', 'WordPress · Shopify'],
        },
        {
          nom: 'Design et UI',
          description:
            'Interfaces, identité et déclinaisons. Le talent travaille dans vos fichiers Figma et suit votre système existant plutôt que d’en imposer un autre.',
          etiquettes: ['Figma', 'Design system', 'Photoshop · Illustrator', 'Canva'],
        },
        {
          nom: 'Vidéo et montage',
          description:
            'Montage, sous-titrage et déclinaisons pour les réseaux. Livraison au format demandé, dans vos gabarits et votre charte.',
          etiquettes: ['Premiere Pro', 'After Effects', 'CapCut', 'Sous-titrage FR'],
        },
        {
          nom: 'Community management',
          description:
            'Publication, animation et modération en français. Le talent tient votre calendrier éditorial et répond avec le ton de votre marque.',
          etiquettes: ['Meta Business Suite', 'Buffer', 'Canva', 'Rédaction FR'],
        },
        {
          nom: 'Support et administration',
          description:
            'Traitement des demandes, saisie et suivi de dossiers. Sur votre outil de ticket et vos procédures, avec un point de suivi régulier.',
          etiquettes: ['Service client FR', 'Notion · Trello', 'HubSpot · Salesforce', 'Google Workspace'],
        },
        {
          nom: 'Comptabilité et données',
          description:
            'Saisie, rapprochements et tableaux de suivi. Le talent alimente vos fichiers et vos tableaux de bord sans changer vos habitudes.',
          etiquettes: ['Saisie comptable', 'Excel · Sheets', 'Google Analytics', 'Reporting'],
        },
      ],
      delaiIntitule: 'Délai moyen',
      delai: '14 jours',
      ctaProfil: 'Demander ce profil',
    },

    methode: {
      intitule: 'Méthode',
      titre: 'Cinq étapes, et le renfort est en place.',
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
          description: 'Point régulier, remplacement si le profil ne convient pas.',
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
          meta: 'Rendez-vous · 30 min',
          titre: 'Vous cherchez du personnel',
          description:
            'Vous décrivez le poste, nous présentons des profils francophones. Aucuns frais de recrutement, quatorze jours en moyenne.',
          points: [
            'Aucuns frais de recrutement',
            '14 jours en moyenne pour un profil',
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
        'Les entreprises réservent un appel de 30 minutes. Les talents déposent leur CV en ligne.',
      cartes: [
        {
          intitule: 'Entreprises',
          titre: 'Prendre rendez-vous',
          mention: '30 minutes · via Cal.com',
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
      reseaux: ['LinkedIn', 'Facebook', 'Instagram'],
      copyright: '© Agence Maldia 2026',
    },

    retourEnHaut: 'Retour en haut',
  },

  accueil: {
    meta: {
      titre: 'Agence Maldia — Talents francophones de Madagascar pour vos équipes',
      description:
        'Renforcez votre équipe autrement, avec des talents francophones basés à Madagascar. Aucuns frais de recrutement, 14 jours en moyenne pour un profil.',
      openGraph: {
        titre: 'Renforcez votre équipe autrement.',
        description:
          'Agence Maldia connecte les talents de Madagascar avec des entreprises du Canada francophone et d’Europe. Aucuns frais de recrutement, 14 jours en moyenne.',
      },
    },

    hero: {
      lead: 'Des talents francophones basés à Madagascar, à distance, pour renforcer vos équipes.',
      titre: 'Renforcez votre équipe autrement.',
      carteAppel: {
        intitule: 'Parlons-en',
        titre: 'Appel de 30 minutes',
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
            'Un formulaire court, entièrement en ligne, avec dépôt direct de votre CV en PDF, DOC ou DOCX. Vous recevez une confirmation dès que la candidature est reçue.',
        },
      ],
    },
  },

  services: {
    meta: {
      titre: 'Services — Staff augmentation | Agence Maldia',
      description:
        'Vous décrivez le poste, Maldia cherche et présélectionne. Aucuns frais de recrutement, 14 jours en moyenne, talents francophones, vos outils inchangés.',
      openGraph: {
        titre: 'Staff augmentation — Agence Maldia',
        description:
          'Renforcez vos équipes avec des talents francophones basés à Madagascar. Aucuns frais de recrutement, et nous nous adaptons à vos outils.',
      },
    },
    entete: {
      intitule: 'Services',
      titre: 'Le renfort, sans frais de recrutement.',
      description:
        'Vous décrivez le poste. Maldia cherche, présélectionne et assure le suivi. Vous gardez vos outils, vos méthodes et la décision finale.',
      cta: 'Prendre rendez-vous',
      mention: 'Appel de 30 minutes, sans engagement',
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
      titre: 'Travailler à distance, depuis Madagascar.',
      description:
        'Vous cherchez une opportunité professionnelle à distance. Déposez votre CV : si votre profil correspond à un besoin, nous vous contactons.',
      cta: 'Déposer ma candidature',
      mention: 'Formulaire court, entièrement en ligne',
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
      titre: 'Entre Madagascar et les marchés francophones.',
      description:
        'Agence Maldia connecte les talents de Madagascar avec des entreprises internationales qui souhaitent renforcer leurs équipes.',
      cta: 'Prendre rendez-vous',
      mention: 'Antananarivo, Madagascar',
    },
    paragraphes: [
      'Nous recrutons à Madagascar et nous travaillons avec des entreprises établies au Québec et au Canada francophone, en France, en Belgique, en Suisse, au Luxembourg et à Monaco.',
      'Notre rôle tient en trois gestes. Nous recrutons et présélectionnons les talents. Nous présentons à l’entreprise les profils qui correspondent à son besoin. Puis nous accompagnons la collaboration dans la durée. Le talent reste à Madagascar et travaille à distance, dans l’équipe du client.',
      'Le service s’adresse aux deux côtés. Une personne à Madagascar y trouve une opportunité professionnelle sans quitter le pays. Une entreprise y trouve un renfort francophone, sans frais de recrutement et sans rien changer à ses outils.',
    ],
    reperes: {
      marches: 'marchés desservis',
      domaines: 'domaines de profils',
      langues: 'langues de travail',
    },
  },

  blog: {
    meta: {
      titre: 'Blog — Agence Maldia',
      description:
        'Ce que nous apprenons du recrutement à Madagascar et du travail à distance avec des équipes francophones.',
      openGraph: {
        titre: 'Le blog d’Agence Maldia',
        description:
          'Recrutement à Madagascar, staff augmentation et travail à distance avec des équipes francophones.',
      },
    },
    entete: {
      intitule: 'Blog',
      titre: 'Ce que nous apprenons en chemin.',
      description:
        'Le recrutement à Madagascar et le travail à distance avec des équipes francophones, vus de l’intérieur.',
      cta: 'Prendre rendez-vous',
      mention: 'Textes provisoires, à remplacer',
    },
    lire: 'Lire l’article',
    vide: 'Les premiers articles arrivent bientôt.',
    retour: 'Tous les articles',
    publieLe: 'Publié le',
  },

  contact: {
    meta: {
      titre: 'Contact — Prendre rendez-vous | Agence Maldia',
      description:
        'Réservez un appel de 30 minutes avec Agence Maldia via Cal.com, ou déposez votre candidature si vous êtes un talent basé à Madagascar.',
      openGraph: {
        titre: 'Contacter Agence Maldia',
        description:
          'Un appel de 30 minutes pour les entreprises, un formulaire en ligne pour les talents à Madagascar.',
      },
    },
    entete: {
      intitule: 'Contact',
      titre: 'Parlons-en.',
      description:
        'Pour les entreprises, le rendez-vous est le moyen de contact principal : il se réserve directement dans notre calendrier. Pour les talents, tout passe par la candidature en ligne.',
      cta: 'Prendre rendez-vous',
      mention: '30 minutes · via Cal.com',
    },
    mention:
      'Ce site ne comporte pas de formulaire de contact et ne conserve aucune donnée : le rendez-vous passe par Cal.com, la candidature par notre application de CV.',
  },
}
