import type { Langue } from './langues'
import type { Articles } from './types'

/**
 * WEB-15 — les articles du blog.
 *
 * **Textes provisoires.** Le retour client demande la structure de la page et
 * le gabarit d'article avant le contenu ; ces trois articles la remplissent.
 * Ils n'avancent que des faits déjà écrits dans le cahier et dans le retour —
 * aucun chiffre, aucun nom de client, aucun témoignage n'y est inventé. Les
 * dates sont elles aussi provisoires.
 *
 * L'identifiant est le segment d'URL et il est **commun aux deux langues** :
 * c'est ce qui permet au sélecteur de langue de mener au même article. Une
 * URL publiée ne se change plus — l'hébergement ne redirige pas (décision
 * 0013), donc un identifiant renommé laisse une erreur 404.
 */
const articlesFr: Articles = [
  {
    identifiant: 'staff-augmentation',
    date: '2026-08-04',
    categorie: 'Méthode',
    duree: '6 min',
    titre: 'Le staff augmentation, en clair',
    resume:
      'Ni sous-traitance, ni agence de placement : une personne qui rejoint votre équipe, à distance, avec vos outils et vos méthodes.',
    corps: [
      'Le mot revient partout et désigne rarement la même chose. Chez Maldia, il a un sens précis : une personne basée à Madagascar rejoint votre équipe à distance, travaille sur vos projets, avec vos outils, selon vos méthodes. Elle n’est pas un prestataire à qui vous confiez un livrable. Elle est un renfort dans l’équipe que vous dirigez déjà.',
      'La différence avec la sous-traitance tient à qui décide. En sous-traitance, vous achetez un résultat et le prestataire choisit comment l’atteindre. En staff augmentation, vous gardez la main sur le travail, les priorités et les méthodes. Ce que Maldia apporte, c’est la personne et le suivi de la collaboration — pas une organisation parallèle.',
      'La différence avec une agence de placement tient au moment où l’on vous facture. Il n’y a aucuns frais de recrutement : la recherche et la présélection des candidats ne vous sont pas facturées. Vous ne payez pas pour rencontrer des profils.',
      'Le déroulement est court. Vous décrivez le profil recherché, le domaine et le niveau d’expérience attendu. Nous cherchons parmi nos candidats et nous filtrons selon le domaine, l’expérience et le niveau de français et d’anglais. Vous recevez uniquement les candidatures qui correspondent. Vous menez les entretiens et vous choisissez.',
      'Comptez quatorze jours en moyenne entre votre demande et la présentation des profils. C’est une moyenne, pas une garantie : un profil rare demande plus de temps, et nous préférons le dire avant qu’après.',
      'Une fois la personne choisie, elle rejoint votre environnement de travail tel qu’il est. Messagerie, gestion de projet, suivi des tâches : nous nous adaptons aux outils déjà utilisés par l’entreprise. Puis Maldia accompagne la collaboration et assure le suivi dans la durée.',
    ],
  },
  {
    identifiant: 'preparer-sa-candidature',
    date: '2026-07-14',
    categorie: 'Talents',
    duree: '5 min',
    titre: 'Préparer sa candidature chez Maldia',
    resume:
      'Ce que le formulaire demande, ce que nous regardons, et ce qui se passe après l’envoi.',
    corps: [
      'Le formulaire de candidature est court, et c’est voulu. Il demande vos coordonnées, votre domaine professionnel, le poste recherché, votre expérience, vos disponibilités et votre CV en PDF, DOC ou DOCX. Rien de plus. Vous n’avez ni lettre de motivation à rédiger, ni compte à créer.',
      'Le domaine professionnel est le champ le plus important. Il détermine à quels besoins votre candidature sera rapprochée : développement web, développement logiciel, design, montage vidéo, community management, marketing numérique, administration, service client, comptabilité, assistance virtuelle, ou un autre profil professionnel. Choisissez celui qui décrit votre travail réel, pas celui qui vous paraît le plus demandé.',
      'Le français et l’anglais sont évalués séparément. Vous n’avez pas à surestimer l’un pour compenser l’autre : beaucoup de postes demandent un excellent français et un anglais de lecture seulement. Une évaluation honnête vous évite un entretien qui ne pouvait pas se passer bien.',
      'Sur le CV, deux choses comptent plus que la mise en page. La première : indiquez pour chaque poste ce que vous faisiez concrètement, pas seulement l’intitulé. La seconde : nommez les outils que vous maîtrisez. Nos entreprises clientes travaillent avec des outils précis, et un talent qui les connaît déjà s’intègre plus vite.',
      'La disponibilité est une date, pas une promesse. Indiquez à partir de quand vous pouvez commencer réellement. Une date lointaine ne disqualifie pas une candidature — une date fausse fait perdre une occasion à tout le monde.',
      'Après l’envoi, vous recevez une confirmation dès que la candidature a bien été reçue. Votre profil rejoint ensuite notre base de candidats. Si un besoin correspond, nous vous contactons pour la suite : présélection par Maldia, puis sélection avec l’entreprise cliente.',
    ],
  },
  {
    identifiant: 'travailler-avec-vos-outils',
    date: '2026-06-23',
    categorie: 'Outils',
    duree: '5 min',
    titre: 'Travailler avec vos outils, pas avec les nôtres',
    resume:
      'Pourquoi nous n’imposons aucun outil à nos clients, et ce que cela demande à nos talents.',
    corps: [
      'Une équipe ne change pas d’outils parce qu’elle recrute. C’est pourtant ce que demandent beaucoup de prestataires : leur messagerie, leur gestion de projet, leur suivi des heures. Le client se retrouve avec deux environnements à tenir, et l’information se perd entre les deux.',
      'Nous prenons le problème dans l’autre sens. Nous nous adaptons aux outils déjà utilisés par l’entreprise. Le talent rejoint votre environnement de travail tel qu’il existe, et il n’y a rien à installer de votre côté.',
      'Concrètement, cela couvre plusieurs familles d’outils. La communication : Slack, Microsoft Teams, Zoom. La bureautique : Google Workspace, Microsoft 365. La gestion de projet : Trello, Asana, ClickUp, Notion. Le développement : GitHub, GitLab, VS Code, et les technologies qui vont avec.',
      'Du côté création, la même logique s’applique : Figma, Canva, Photoshop, Illustrator pour le design ; CapCut, Premiere Pro, After Effects pour la vidéo. Pour le web et le commerce en ligne : WordPress, Shopify. Pour le marketing et le suivi : HubSpot, Salesforce, Google Analytics, Meta Business Suite, Buffer.',
      'Ces marques sont citées pour situer les compétences de nos talents. Agence Maldia n’est partenaire d’aucune d’entre elles, et cette liste n’est pas une certification : c’est une façon de dire à une entreprise qu’elle n’aura pas à traduire sa façon de travailler.',
      'Ce choix a un coût, et il est de notre côté. La présélection ne peut pas se limiter au domaine et à l’expérience : elle demande de savoir quels outils la personne a réellement utilisés, et lesquels elle a seulement croisés. C’est une question que nous posons tôt, parce qu’elle décide de la vitesse d’intégration bien plus que l’ancienneté.',
    ],
  },
]

const articlesEn: Articles = [
  {
    identifiant: 'staff-augmentation',
    date: '2026-08-04',
    categorie: 'Method',
    duree: '6 min',
    titre: 'Staff augmentation, in plain terms',
    resume:
      'Neither outsourcing nor a placement agency: a person joining your team remotely, with your tools and your methods.',
    corps: [
      'The term is everywhere and rarely means the same thing twice. At Maldia it has a precise meaning: a person based in Madagascar joins your team remotely, works on your projects, with your tools, following your methods. They are not a supplier you hand a deliverable to. They are reinforcement inside the team you already run.',
      'The difference from outsourcing comes down to who decides. With outsourcing, you buy a result and the supplier chooses how to reach it. With staff augmentation, you keep control of the work, the priorities and the methods. What Maldia brings is the person and the follow-up of the collaboration — not a parallel organisation.',
      'The difference from a placement agency comes down to when you get billed. There are no recruitment fees: searching for and shortlisting candidates is not billed to you. You do not pay to meet profiles.',
      'The sequence is short. You describe the profile you need, the field and the level of experience expected. We look among our candidates and filter on field, experience and level of French and English. You only receive the applications that match. You run the interviews and you choose.',
      'Expect fourteen days on average between your request and the presentation of profiles. That is an average, not a guarantee: a rare profile takes longer, and we would rather say so beforehand than after.',
      'Once the person is chosen, they join your working environment as it stands. Messaging, project management, task tracking: we adapt to the tools the company already uses. Maldia then supports the collaboration and handles follow-up over time.',
    ],
  },
  {
    identifiant: 'preparer-sa-candidature',
    date: '2026-07-14',
    categorie: 'Talent',
    duree: '5 min',
    titre: 'Preparing your application to Maldia',
    resume:
      'What the form asks for, what we look at, and what happens after you send it.',
    corps: [
      'The application form is short, and that is deliberate. It asks for your contact details, your professional field, the role you want, your experience, your availability and your résumé in PDF, DOC or DOCX. Nothing more. There is no cover letter to write and no account to create.',
      'The professional field is the most important entry. It determines which requests your application gets matched against: web development, software development, design, video editing, community management, digital marketing, administration, customer service, accounting, virtual assistance, or another professional profile. Pick the one that describes your actual work, not the one that looks most in demand.',
      'French and English are assessed separately. You do not have to overstate one to make up for the other: many roles need excellent French and reading-level English only. An honest assessment saves you an interview that could not have gone well.',
      'On the résumé, two things matter more than the layout. First: for each role, say what you actually did, not just the job title. Second: name the tools you know. Our client companies work with specific tools, and talent who already knows them settles in faster.',
      'Availability is a date, not a promise. State when you can genuinely start. A distant date does not disqualify an application — a false one costs everyone an opportunity.',
      'After you send it, you receive a confirmation as soon as the application has been received. Your profile then joins our candidate database. If a request matches, we contact you for the next steps: shortlisting by Maldia, then selection with the client company.',
    ],
  },
  {
    identifiant: 'travailler-avec-vos-outils',
    date: '2026-06-23',
    categorie: 'Tools',
    duree: '5 min',
    titre: 'Working with your tools, not ours',
    resume:
      'Why we impose no tools on our clients, and what that asks of our talent.',
    corps: [
      'A team does not change tools because it hires. Yet that is what many suppliers ask for: their messaging, their project management, their time tracking. The client ends up maintaining two environments, and information gets lost between them.',
      'We take the problem the other way round. We adapt to the tools the company already uses. The talent joins your working environment as it exists, and there is nothing for you to install.',
      'In practice that covers several families of tools. Communication: Slack, Microsoft Teams, Zoom. Productivity: Google Workspace, Microsoft 365. Project management: Trello, Asana, ClickUp, Notion. Development: GitHub, GitLab, VS Code, and the technologies that go with them.',
      'On the creative side the same logic applies: Figma, Canva, Photoshop, Illustrator for design; CapCut, Premiere Pro, After Effects for video. For web and online commerce: WordPress, Shopify. For marketing and tracking: HubSpot, Salesforce, Google Analytics, Meta Business Suite, Buffer.',
      'These brands are named to situate our talent’s skills. Agence Maldia is not a partner of any of them, and this list is not a certification: it is a way of telling a company that it will not have to translate the way it works.',
      'This choice has a cost, and the cost is on our side. Shortlisting cannot stop at field and experience: it means finding out which tools the person has genuinely used, and which ones they have only brushed against. We ask that early, because it decides how fast someone settles in far more than seniority does.',
    ],
  },
]

export const ARTICLES: Record<Langue, Articles> = {
  fr: articlesFr,
  en: articlesEn,
}

/** Les plus récents d'abord : l'index et le sitemap lisent le même ordre. */
export function articlesTriees(langue: Langue) {
  return [...ARTICLES[langue]].sort((a, b) => b.date.localeCompare(a.date))
}

export function articleParIdentifiant(langue: Langue, identifiant: string) {
  return ARTICLES[langue].find((article) => article.identifiant === identifiant)
}

/**
 * Les categories presentes, dans l'ordre d'apparition.
 *
 * Les onglets de filtre de l'index en viennent, et non d'une liste ecrite a la
 * main : un onglet ne peut donc jamais renvoyer une liste vide.
 */
export function categoriesArticles(langue: Langue): readonly string[] {
  return [...new Set(articlesTriees(langue).map((article) => article.categorie))]
}

/** Les identifiants, dans l'ordre d'affichage — pour generateStaticParams et le sitemap. */
export function identifiantsArticles(langue: Langue): readonly string[] {
  return articlesTriees(langue).map((article) => article.identifiant)
}
