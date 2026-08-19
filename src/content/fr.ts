import type { Contenu } from './types'

// Contenu français — verbatim de la maquette réécrite par le client, avec la
// typographie française : apostrophe courbe, espace insécable étroite (U+202F)
// avant la ponctuation double.
export const fr: Contenu<'fr'> = {
  meta: {
    titre: 'Agence Maldia — Talents de Madagascar pour des équipes internationales',
    description:
      'Agence Maldia connecte les talents basés à Madagascar avec des entreprises internationales qui souhaitent renforcer leurs équipes à distance.',
    openGraph: {
      titre: 'Agence Maldia — Talents de Madagascar pour des équipes internationales',
      description:
        'Agence Maldia connecte les talents basés à Madagascar avec des entreprises internationales — Québec et Canada francophone, France, Belgique, Suisse, Luxembourg, Monaco — qui souhaitent renforcer leurs équipes à distance.',
    },
  },

  enTete: {
    marque: 'Agence Maldia',
    initiale: 'M',
    menu: 'Menu',
    navigation: [
      { ancre: 'talents', libelle: 'Talents' },
      { ancre: 'entreprises', libelle: 'Entreprises' },
      { ancre: 'profils', libelle: 'Profils' },
      { ancre: 'a-propos', libelle: 'À propos' },
      { ancre: 'contact', libelle: 'Contact' },
    ],
    changerDeLangue: 'Changer de langue',
    // WEB-7 : le rendez-vous est le moyen de contact principal des entreprises,
    // et la navigation est l'un des emplacements que le cahier lui donne.
    cta: 'Prendre rendez-vous',
  },

  hero: {
    pastille: {
      avant: 'Des talents de ',
      misEnAvant: 'Madagascar',
      apres: ', à distance, pour vos équipes',
    },
    titre: ['Renforcez votre équipe', 'avec des talents de Madagascar'],
    sousTitre: [
      'Agence Maldia connecte les talents de Madagascar avec des entreprises',
      'internationales qui souhaitent renforcer leurs équipes.',
    ],
    ctaPrincipal: 'Prendre rendez-vous',
    ctaSecondaire: 'Déposer ma candidature',
    mention: '30 min, via Cal.com',
  },

  marches: {
    titre: 'Nos talents travaillent avec des entreprises au Canada francophone et en Europe',
    liste: ['Québec', 'Canada francophone', 'France', 'Belgique', 'Suisse', 'Luxembourg', 'Monaco'],
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

  entreprises: {
    titre: 'Le staff augmentation, pour les entreprises',
    tuiles: {
      rangee1: ['Dév web', 'Logiciel', 'Design', 'Vidéo', 'CM', 'Marketing'],
      rangee2: ['Admin', 'Service client', 'Compta', 'Assistance'],
    },
    titreGauche: 'Des profils professionnels',
    titreSombre:
      'Renforcez vos équipes avec des talents basés à Madagascar, travaillant à distance',
    ctaSombre: 'Prendre rendez-vous',
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
        titre: 'Recherche',
        description: 'Nous cherchons le profil parmi nos talents basés à Madagascar.',
      },
      {
        numero: '03',
        cote: 'Maldia',
        titre: 'Présélection',
        description:
          'Nous filtrons selon le domaine, l’expérience et le niveau de français et d’anglais.',
      },
      {
        numero: '04',
        cote: 'Maldia',
        titre: 'Présentation des profils',
        description: 'Vous recevez uniquement les candidatures qui correspondent à votre besoin.',
      },
      {
        numero: '05',
        cote: 'Vous',
        titre: 'Sélection',
        description:
          'Vous menez les entretiens et choisissez la personne qui rejoint votre équipe.',
      },
      {
        numero: '06',
        cote: 'Ensemble',
        titre: 'Intégration et suivi',
        description:
          'Le talent travaille à distance dans votre équipe et Maldia assure le suivi.',
      },
    ],
    cta: 'Prendre rendez-vous',
    mention: 'Premier appel de 30 minutes, sans engagement',
  },

  talents: {
    titre: 'Pour les talents à Madagascar',
    description:
      'Qui est Maldia, quelles opportunités sont disponibles et comment se déroule le recrutement.',
    cartes: [
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
      {
        titre: 'À propos d’Agence Maldia',
        description:
          'Agence Maldia connecte les talents de Madagascar avec des entreprises internationales qui souhaitent renforcer leurs équipes. Nous recrutons, présélectionnons et accompagnons les deux côtés de la collaboration.',
      },
    ],
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
  },

  commencer: {
    titre: ['Deux façons', 'de commencer.'],
    sousTitre: [
      'Vous cherchez une opportunité, ou vous cherchez un talent.',
      'Dans les deux cas, une seule action à faire.',
    ],
    offres: [
      {
        intitule: 'Talents à Madagascar',
        prix: 'Candidature',
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
        prix: 'Rendez-vous',
        unite: '30 min, via Cal.com',
        description:
          'Pour les entreprises qui souhaitent renforcer leurs équipes avec des talents professionnels à distance.',
        inclus: [
          'Vous décrivez le profil recherché',
          'Maldia recherche et présélectionne',
          'Présentation des profils pertinents',
          'Vous participez à la sélection',
          'Le talent rejoint votre équipe à distance',
          'Suivi assuré par Maldia',
        ],
        libelleSupplement: 'Marchés desservis',
        supplement: 'Canada francophone et Europe',
        cta: 'Prendre rendez-vous',
        cta2: 'Discuter de vos besoins',
        note: 'Le rendez-vous se réserve directement dans notre calendrier, sans échange de courriels.',
      },
    ],
    promo: {
      titre: 'Vous ne savez pas encore quel profil recruter ?',
      description:
        'Expliquez-nous votre besoin lors d’un premier appel. Nous vous indiquons quels profils sont disponibles et comment le service peut s’organiser pour votre équipe.',
      cta: 'Discuter de vos besoins',
    },
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
        description:
          'Gestion documentaire, saisie, suivi des dossiers et tâches administratives.',
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

  faq: {
    titre: 'Questions fréquentes',
    description:
      'Les réponses aux questions que nous recevons le plus souvent, du côté des talents comme du côté des entreprises.',
    questions: [
      {
        question: 'Qui peut déposer une candidature ?',
        reponse:
          'Toute personne basée à Madagascar qui souhaite travailler avec Maldia ou être considérée pour un poste auprès d’une entreprise cliente.',
      },
      {
        question: 'Comment se déroule le travail à distance ?',
        reponse:
          'Le talent reste à Madagascar et travaille à distance, soit sur les projets de Maldia, soit intégré à l’équipe d’une entreprise cliente. Maldia assure le suivi.',
      },
      {
        question: 'Quels profils recherchez-vous ?',
        reponse:
          'Développement web et logiciel, design, montage vidéo, community management, marketing numérique, administration, service client, comptabilité, assistance virtuelle et autres profils professionnels.',
      },
      {
        question: 'Comment une entreprise commence-t-elle ?',
        reponse:
          'L’entreprise nous explique le profil recherché. Maldia recherche et présélectionne les candidats, présente les profils pertinents, le client participe à la sélection, puis le talent rejoint son équipe à distance.',
      },
      {
        question: 'Comment prendre rendez-vous ?',
        reponse:
          'La prise de rendez-vous se fait en ligne via Cal.com, directement depuis les boutons Prendre rendez-vous du site.',
      },
      {
        question: 'Le site est-il disponible en anglais ?',
        reponse:
          'Oui. Le site est disponible en français et en anglais, et vous pouvez passer d’une langue à l’autre à tout moment.',
      },
    ],
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
      { ancre: 'talents', libelle: 'Talents' },
      { ancre: 'entreprises', libelle: 'Staff augmentation' },
      { ancre: 'profils', libelle: 'Profils' },
      { ancre: 'a-propos', libelle: 'À propos' },
      { ancre: 'contact', libelle: 'Contact' },
      { ancre: 'faq', libelle: 'FAQ' },
    ],
    ctaSecondaire: 'Déposer ma candidature',
    copyright: '© Agence Maldia 2026. Tous droits réservés.',
  },
}
