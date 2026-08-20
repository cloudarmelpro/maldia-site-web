import type { Contenu } from './types'

// Contenu français. Les phrases chiffrées du retour client sont reprises au mot
// près — c'est de l'argumentaire commercial, pas de la paraphrase.
//
// Typographie française : apostrophe courbe, espace insécable étroite (U+202F)
// avant la ponctuation double, espace insécable (U+00A0) avant le signe %.
export const fr: Contenu<'fr'> = {
  commun: {
    enTete: {
      marque: 'Agence Maldia',
      initiale: 'M',
      menu: 'Menu',
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
      // WEB-7 : le rendez-vous est le moyen de contact principal des
      // entreprises, et la navigation est l'un des emplacements du cahier.
      cta: 'Prendre rendez-vous',
    },

    marches: {
      titre: 'Nos talents travaillent avec des entreprises au Canada francophone et en Europe',
      liste: ['Québec', 'Canada francophone', 'France', 'Belgique', 'Suisse', 'Luxembourg', 'Monaco'],
    },

    argumentaire: {
      titre: 'Ce que Maldia change pour votre équipe',
      description:
        'Un renfort francophone, sans frais de recrutement et sans rien changer à vos outils.',
      liste: [
        {
          chiffre: '0',
          titre: 'Frais de recrutement',
          description: 'Aucuns frais de recrutement.',
        },
        {
          chiffre: '14 jours',
          titre: 'En moyenne',
          description: 'Trouvez votre prochain talent en 14 jours en moyenne.',
        },
        {
          chiffre: 'jusqu’à 50 %',
          titre: 'Sur les postes confiés',
          description: 'Réduisez jusqu’à 50 % le coût des postes confiés à Maldia.',
        },
        {
          chiffre: 'environ 25 %',
          titre: 'Sur la masse salariale',
          description:
            'Selon les postes confiés, réduisez jusqu’à environ 25 % votre masse salariale totale.',
        },
        {
          titre: 'Talents francophones',
          description: 'Nos talents travaillent en français, avec vos équipes et avec vos clients.',
        },
        {
          titre: 'Vos outils, sans changement',
          description: 'Nous nous adaptons aux outils déjà utilisés par l’entreprise.',
        },
      ],
      mention: 'Le délai de 14 jours est une moyenne, pas une garantie.',
    },

    compteur: {
      prefixe: 'Plus de',
      libelle: 'candidats dans notre base de données',
      precision: 'Dans tous les domaines professionnels que nous recrutons.',
    },

    outils: {
      titre: 'Vos outils, notre façon de travailler',
      mention:
        'Ces marques sont citées pour situer les compétences de nos talents. Agence Maldia n’est partenaire d’aucune d’entre elles.',
    },

    cloture: {
      titre: 'Parlons de votre équipe ou de votre carrière',
      description:
        'Les entreprises réservent un rendez-vous de 30 minutes. Les talents déposent leur candidature en ligne avec leur CV.',
      ctaPrincipal: 'Prendre rendez-vous',
      ctaSecondaire: 'Déposer ma candidature',
      tuiles: [
        'Dév web',
        'Logiciel',
        'Design',
        'Vidéo',
        'CM',
        'Marketing',
        'Admin',
        'Service client',
        'Compta',
        'Assistance',
        'Data',
        'Support',
      ],
    },

    retourEnHaut: 'Retour en haut',

    pied: {
      navigation: [
        { page: 'accueil', libelle: 'Accueil' },
        { page: 'services', libelle: 'Services' },
        { page: 'talents', libelle: 'Talents' },
        { page: 'a-propos', libelle: 'À propos' },
        { page: 'blog', libelle: 'Blog' },
        { page: 'contact', libelle: 'Contact' },
      ],
      ctaSecondaire: 'Déposer ma candidature',
      copyright: '© Agence Maldia 2026. Tous droits réservés.',
    },
  },

  accueil: {
    meta: {
      titre: 'Agence Maldia — Talents de Madagascar pour des équipes internationales',
      description:
        'Renforcez votre équipe avec des talents francophones basés à Madagascar. Aucuns frais de recrutement, 14 jours en moyenne pour trouver un profil.',
      openGraph: {
        titre: 'Agence Maldia — Talents de Madagascar pour des équipes internationales',
        description:
          'Agence Maldia connecte les talents de Madagascar avec des entreprises du Canada francophone et d’Europe. Aucuns frais de recrutement, 14 jours en moyenne.',
      },
    },

    hero: {
      pastille: {
        avant: 'Des talents de ',
        misEnAvant: 'Madagascar',
        apres: ', à distance, pour vos équipes',
      },
      titre: ['Renforcez votre équipe', 'avec des talents de Madagascar'],
      sousTitre: [
        'Vous cherchez du personnel, ou vous cherchez une opportunité.',
        'Les deux commencent ici.',
      ],
      ctaPrincipal: 'Trouver un talent',
      ctaSecondaire: 'Déposer ma candidature',
      mention: 'Aucuns frais de recrutement · 14 jours en moyenne',
    },

    parcours: {
      titre: ['Deux parcours,', 'une seule action.'],
      sousTitre: [
        'Une entreprise qui cherche du personnel, ou une personne qui souhaite',
        'travailler avec Maldia. Les deux ont leur porte d’entrée.',
      ],
      entrees: [
        {
          intitule: 'Talents à Madagascar',
          action: 'Candidature',
          unite: 'en ligne, avec votre CV',
          description:
            'Pour les personnes basées à Madagascar qui cherchent une opportunité professionnelle à distance.',
          inclus: [
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
          cta2: 'Voir les profils recherchés',
          note: 'Vous recevez une confirmation dès que votre candidature a bien été reçue.',
        },
        {
          intitule: 'Entreprises',
          action: 'Rendez-vous',
          unite: '30 min, via Cal.com',
          description:
            'Pour les entreprises qui souhaitent renforcer leurs équipes avec des talents francophones à distance.',
          inclus: [
            'Aucuns frais de recrutement',
            '14 jours en moyenne pour un profil',
            'Vous décrivez le profil recherché',
            'Maldia recherche et présélectionne',
            'Le talent travaille avec vos outils',
            'Suivi assuré par Maldia',
          ],
          libelleSupplement: 'Marchés desservis',
          supplement: 'Canada francophone et Europe',
          cta: 'Trouver un talent',
          cta2: 'Discuter de vos besoins',
          note: 'Le rendez-vous se réserve directement dans notre calendrier, sans échange de courriels.',
        },
      ],
      encart: {
        titre: 'Vous ne savez pas encore quel profil recruter ?',
        description:
          'Expliquez-nous votre besoin lors d’un premier appel. Nous vous indiquons quels profils sont disponibles et comment le service peut s’organiser pour votre équipe.',
        cta: 'Discuter de vos besoins',
      },
    },

    faq: {
      titre: 'Questions fréquentes',
      description:
        'Les réponses aux questions que nous recevons le plus souvent, du côté des entreprises comme du côté des talents.',
      questions: [
        {
          question: 'Y a-t-il des frais de recrutement ?',
          reponse:
            'Non. Aucuns frais de recrutement : la recherche et la présélection des candidats ne sont pas facturées à l’entreprise.',
        },
        {
          question: 'Combien de temps faut-il pour trouver un talent ?',
          reponse:
            'Quatorze jours en moyenne entre votre besoin et la présentation des profils. C’est une moyenne, pas une garantie : un profil rare demande plus de temps.',
        },
        {
          question: 'Faut-il changer nos outils ?',
          reponse:
            'Non. Nous nous adaptons aux outils déjà utilisés par l’entreprise : messagerie, gestion de projet, suivi du travail. Le talent rejoint votre environnement, pas l’inverse.',
        },
        {
          question: 'Les talents parlent-ils français ?',
          reponse:
            'Oui. Nos talents sont francophones. Le niveau de français et le niveau d’anglais sont évalués séparément lors de la présélection.',
        },
        {
          question: 'Qui peut déposer une candidature ?',
          reponse:
            'Toute personne basée à Madagascar qui souhaite travailler avec Maldia ou être considérée pour un poste auprès d’une entreprise cliente.',
        },
        {
          question: 'Comment prendre rendez-vous ?',
          reponse:
            'La prise de rendez-vous se fait en ligne via Cal.com, directement depuis les boutons « Prendre rendez-vous » du site. L’appel dure 30 minutes et n’engage à rien.',
        },
      ],
    },
  },

  services: {
    meta: {
      titre: 'Services — Staff augmentation | Agence Maldia',
      description:
        'Vous décrivez le profil recherché, Maldia le trouve et le présélectionne. Aucuns frais de recrutement, 14 jours en moyenne, talents francophones, vos outils inchangés.',
      openGraph: {
        titre: 'Staff augmentation — Agence Maldia',
        description:
          'Renforcez vos équipes avec des talents francophones basés à Madagascar. Aucuns frais de recrutement, 14 jours en moyenne, et nous nous adaptons à vos outils.',
      },
    },

    entete: {
      titre: 'Le staff augmentation, expliqué simplement',
      description:
        'Vous décrivez le profil recherché. Maldia le trouve, le présélectionne et assure le suivi. Vous gardez vos outils, vos méthodes et le dernier mot sur le choix.',
      cta: 'Prendre rendez-vous',
      mention: 'Premier appel de 30 minutes, sans engagement',
    },

    deroulement: {
      titre: 'Comment fonctionne le service',
      description:
        'De votre besoin à l’intégration du talent dans votre équipe, six étapes suivies par Maldia.',
      liste: [
        {
          numero: '01',
          cote: 'Vous',
          titre: 'Votre besoin',
          description:
            'Vous nous décrivez le profil recherché, le domaine et le niveau d’expérience attendu.',
        },
        {
          numero: '02',
          cote: 'Maldia',
          titre: 'Recherche et présélection',
          description:
            'Nous cherchons le profil parmi nos candidats et nous filtrons selon le domaine, l’expérience et le niveau de français et d’anglais.',
        },
        {
          numero: '03',
          cote: 'Maldia',
          titre: 'Présentation des profils',
          description: 'Vous recevez uniquement les candidatures qui correspondent à votre besoin.',
        },
        {
          numero: '04',
          cote: 'Vous',
          titre: 'Votre choix',
          description:
            'Vous menez les entretiens et vous choisissez la personne qui vous convient.',
        },
        {
          numero: '05',
          cote: 'Ensemble',
          titre: 'Vos outils, vos méthodes',
          description:
            'Le talent travaille à distance avec les outils et les méthodes déjà en place chez vous.',
        },
        {
          numero: '06',
          cote: 'Maldia',
          titre: 'Accompagnement et suivi',
          description: 'Maldia accompagne la collaboration et assure le suivi dans la durée.',
        },
      ],
      cta: 'Prendre rendez-vous',
      mention: 'Aucuns frais de recrutement, et un délai moyen de 14 jours.',
    },

    domaines: {
      titre: 'Les domaines que nous couvrons',
      tuiles: {
        rangee1: ['Dév web', 'Logiciel', 'Design', 'Vidéo', 'CM', 'Marketing'],
        rangee2: ['Admin', 'Service client', 'Compta', 'Assistance'],
      },
      titreGauche: 'Des profils professionnels',
      titreSombre:
        'Renforcez vos équipes avec des talents francophones basés à Madagascar, travaillant à distance',
      ctaSombre: 'Discuter de vos besoins',
    },
  },

  talents: {
    meta: {
      titre: 'Talents — Travailler avec Maldia depuis Madagascar | Agence Maldia',
      description:
        'Vous êtes à Madagascar et vous cherchez une opportunité professionnelle à distance. Déposez votre candidature en ligne avec votre CV.',
      openGraph: {
        titre: 'Travailler avec Maldia, depuis Madagascar',
        description:
          'Rejoignez l’équipe Maldia, travaillez sur nos projets, ou intégrez à distance l’équipe d’une entreprise cliente au Canada francophone ou en Europe.',
      },
    },

    entete: {
      titre: 'Travailler avec Maldia, depuis Madagascar',
      description:
        'Vous êtes à Madagascar et vous cherchez une opportunité professionnelle à distance. Déposez votre candidature avec votre CV : si votre profil correspond à un besoin, nous vous contactons.',
      cta: 'Déposer ma candidature',
      mention: 'Formulaire court, entièrement en ligne',
    },

    opportunites: {
      titre: 'Trois façons de travailler avec Maldia',
      description:
        'Vous êtes à Madagascar et vous cherchez une opportunité professionnelle à distance. Voici les trois voies possibles avec Maldia.',
      liste: [
        {
          titre: 'Rejoindre l’équipe Maldia',
          description:
            'Vous intégrez directement l’équipe de Maldia et travaillez sur nos activités internes.',
        },
        {
          titre: 'Travailler sur nos projets',
          description:
            'Vous contribuez aux projets menés par Maldia pour ses clients, selon votre domaine professionnel.',
        },
        {
          titre: 'Rejoindre une entreprise cliente',
          description:
            'Dans le cadre du staff augmentation, vous rejoignez à distance l’équipe d’une entreprise cliente de Maldia.',
        },
      ],
    },

    cartes: {
      titre: 'Ce qu’il faut savoir avant de candidater',
      description:
        'Comment se passe le travail, avec quelles entreprises, et comment se déroule le recrutement.',
      liste: [
        {
          titre: 'Travailler à distance, depuis Madagascar',
          description:
            'Vous restez à Madagascar et vous travaillez à distance, soit sur les projets de Maldia, soit directement au sein de l’équipe d’une entreprise cliente. Maldia assure le suivi tout au long de la collaboration.',
        },
        {
          titre: 'Des entreprises internationales',
          description:
            'Nos entreprises clientes se trouvent principalement au Québec et au Canada francophone, en France, en Belgique, en Suisse, au Luxembourg et à Monaco.',
        },
        {
          titre: 'Le recrutement, étape par étape',
          description:
            'Vous déposez votre candidature en ligne avec votre CV. Si votre profil correspond à un besoin, nous vous contactons pour la suite.',
          frise: [
            { libelle: 'Candidature', precision: 'CV en ligne' },
            { libelle: 'Présélection', precision: 'par Maldia' },
            { libelle: 'Sélection', precision: 'avec le client' },
          ],
        },
      ],
    },

    criteres: {
      titre: 'Ce que nous demandons dans la candidature',
      description:
        'Le formulaire est court : vos coordonnées, votre domaine, le poste recherché, votre expérience, vos disponibilités et votre CV en PDF, DOC ou DOCX.',
      liste: [
        { libelle: 'Domaine', precision: 'professionnel' },
        { libelle: 'Expérience', precision: 'années' },
        { libelle: 'Français', precision: 'niveau' },
        { libelle: 'Anglais', precision: 'niveau' },
        { libelle: 'Disponibilité', precision: 'à partir de' },
      ],
    },

    profils: {
      titre: 'Les profils que nous recrutons',
      liste: [
        {
          description:
            'Sites web, intégrations et maintenance : profils front-end, back-end et full-stack.',
          nom: 'Développement web',
          precision: 'front-end, back-end, full-stack',
        },
        {
          description:
            'Applications métier et outils internes, du développement à la mise en production.',
          nom: 'Développement logiciel',
          precision: 'applications et outils',
        },
        {
          description: 'Interfaces, identité visuelle et supports de communication.',
          nom: 'Design',
          precision: 'UI/UX et graphisme',
        },
        {
          description: 'Montage, habillage et préparation de contenus vidéo pour vos canaux.',
          nom: 'Montage vidéo',
          precision: 'montage et post-production',
        },
        {
          description: 'Animation des réseaux sociaux, publication et modération des communautés.',
          nom: 'Community management',
          precision: 'réseaux sociaux',
        },
        {
          description: 'Campagnes, contenus et suivi des performances numériques.',
          nom: 'Marketing numérique',
          precision: 'campagnes et contenus',
        },
        {
          description: 'Gestion documentaire, saisie, suivi des dossiers et tâches administratives.',
          nom: 'Administration',
          precision: 'gestion et suivi',
        },
        {
          description: 'Réponses aux clients par courriel, clavardage ou téléphone.',
          nom: 'Service client',
          precision: 'support clientèle',
        },
        {
          description: 'Tenue de livres, rapprochements et préparation des documents comptables.',
          nom: 'Comptabilité',
          precision: 'tenue de livres',
        },
        {
          description: 'Appui quotidien à distance : agenda, courriels, coordination et suivis.',
          nom: 'Assistance virtuelle',
          precision: 'appui aux dirigeants',
        },
        {
          description:
            'D’autres profils professionnels sont recrutés selon les besoins de nos clients.',
          nom: 'Autres profils',
          precision: 'sur demande',
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
    titre: 'Entre Madagascar et les marchés francophones',
    description:
      'Agence Maldia connecte les talents de Madagascar avec des entreprises internationales qui souhaitent renforcer leurs équipes.',
    paragraphes: [
      'Nous recrutons à Madagascar et nous travaillons avec des entreprises établies au Québec et au Canada francophone, en France, en Belgique, en Suisse, au Luxembourg et à Monaco.',
      'Notre rôle tient en trois gestes. Nous recrutons et présélectionnons les talents. Nous présentons à l’entreprise les profils qui correspondent à son besoin. Puis nous accompagnons la collaboration dans la durée. Le talent reste à Madagascar et travaille à distance, dans l’équipe du client.',
      'Le service s’adresse aux deux côtés. Une personne à Madagascar y trouve une opportunité professionnelle sans quitter le pays. Une entreprise y trouve un renfort francophone, sans frais de recrutement et sans rien changer à ses outils.',
    ],
    reperes: {
      marches: 'marchés desservis',
      domaines: 'domaines professionnels',
      langues: 'langues de travail',
    },
    cta: 'Prendre rendez-vous',
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
    titre: 'Le blog',
    description:
      'Ce que nous apprenons du recrutement à Madagascar et du travail à distance avec des équipes francophones.',
    lire: 'Lire l’article',
    vide: 'Les premiers articles arrivent bientôt.',
    retour: 'Tous les articles',
    publieLe: 'Publié le',
    appelArticle: 'Passer à l’action',
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
    titre: 'Parlons-en',
    description:
      'Pour les entreprises, le rendez-vous est le moyen de contact principal : il se réserve directement dans notre calendrier. Pour les talents, tout passe par la candidature en ligne.',
    voies: [
      {
        intitule: 'Entreprises',
        titre: 'Un appel de 30 minutes',
        description:
          'Vous nous expliquez votre besoin. Nous vous indiquons quels profils sont disponibles et comment le service peut s’organiser pour votre équipe.',
        etapes: [
          'Vous choisissez un créneau dans le calendrier',
          'Vous recevez la confirmation et le lien de l’appel',
          'Nous parlons de votre besoin, sans engagement',
        ],
        cta: 'Prendre rendez-vous',
        note: 'Le rendez-vous passe par Cal.com et s’ajoute directement à notre calendrier.',
      },
      {
        intitule: 'Talents à Madagascar',
        titre: 'Déposer votre candidature',
        description:
          'Le formulaire est court : vos coordonnées, votre domaine, le poste recherché, votre expérience, vos disponibilités et votre CV.',
        etapes: [
          'Vous remplissez le formulaire en ligne',
          'Vous joignez votre CV en PDF, DOC ou DOCX',
          'Nous vous contactons si votre profil correspond',
        ],
        cta: 'Déposer ma candidature',
        note: 'Vous recevez une confirmation dès que votre candidature a bien été reçue.',
      },
    ],
    mention:
      'Ce site ne comporte pas de formulaire de contact et ne conserve aucune donnée : le rendez-vous passe par Cal.com, la candidature par notre application de CV.',
  },
}
