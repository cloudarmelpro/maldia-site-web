import type { Langue } from './langues'
import type { Articles } from './types'

/**
 * WEB-15 — les articles du blog.
 *
 * **Textes provisoires.** Le retour client demande la structure de la page et
 * le gabarit d'article avant le contenu ; ces trois articles la remplissent.
 * Ils n'avancent que des faits déjà écrits dans le cahier et dans le retour —
 * aucun chiffre, aucun nom de client, aucun témoignage n'y est inventé. Les
 * dates et les durées de lecture sont elles aussi provisoires.
 *
 * L'identifiant est le segment d'URL et il est **commun aux deux langues** :
 * c'est ce qui permet au sélecteur de langue de mener au même article. Une
 * URL publiée ne se change plus — l'hébergement ne redirige pas (décision
 * 0013), donc un identifiant renommé laisse une erreur 404.
 *
 * Le corps est une suite de blocs typés et non de paragraphes : le sommaire est
 * déduit des blocs `titre`, donc une section renommée renomme son entrée de
 * sommaire toute seule.
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
    etiquettes: ['Staff augmentation', 'Frais de recrutement', 'Délai'],
    corps: [
      {
        type: 'chapeau',
        texte:
          'Le mot revient partout et désigne rarement la même chose. Chez Maldia, il a un sens précis, et c’est ce sens-là qui décide de ce que vous payez et de qui décide.',
      },
      { type: 'titre', texte: 'Ni sous-traitance, ni agence de placement' },
      {
        type: 'paragraphe',
        texte:
          'Une personne basée à Madagascar rejoint votre équipe à distance, travaille sur vos projets, avec vos outils, selon vos méthodes. Elle n’est pas un prestataire à qui vous confiez un livrable. Elle est un renfort dans l’équipe que vous dirigez déjà.',
      },
      {
        type: 'paragraphe',
        texte:
          'La différence avec la sous-traitance tient à qui décide. En sous-traitance, vous achetez un résultat et le prestataire choisit comment l’atteindre. En staff augmentation, vous gardez la main sur le travail, les priorités et les méthodes.',
      },
      {
        type: 'citation',
        texte:
          'Ce que Maldia apporte, c’est la personne et le suivi de la collaboration — pas une organisation parallèle.',
      },
      { type: 'titre', texte: 'Ce que vous ne payez pas' },
      {
        type: 'paragraphe',
        texte:
          'La différence avec une agence de placement tient au moment où l’on vous facture. Il n’y a aucuns frais de recrutement : la recherche et la présélection des candidats ne vous sont pas facturées. Vous ne payez pas pour rencontrer des profils.',
      },
      { type: 'titre', texte: 'Le déroulement' },
      {
        type: 'paragraphe',
        texte:
          'Vous décrivez le profil recherché, le domaine et le niveau d’expérience attendu. Nous cherchons parmi nos candidats et nous filtrons selon le domaine, l’expérience et le niveau de français et d’anglais. Vous recevez uniquement les candidatures qui correspondent.',
      },
      {
        type: 'liste',
        items: [
          'Vous menez les entretiens et vous choisissez, seul.',
          'Le talent rejoint votre environnement de travail tel qu’il est.',
          'Maldia accompagne la collaboration et assure le suivi dans la durée.',
        ],
      },
      { type: 'titre', texte: 'Le délai, honnêtement' },
      {
        type: 'paragraphe',
        texte:
          'Comptez quatorze jours en moyenne entre votre demande et la présentation des profils. C’est une moyenne, pas une garantie : un profil rare demande plus de temps, et nous préférons le dire avant qu’après.',
      },
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
    etiquettes: ['Candidature', 'CV', 'Présélection'],
    corps: [
      {
        type: 'chapeau',
        texte:
          'Le formulaire de candidature est court, et c’est voulu : vos coordonnées, votre domaine, le poste recherché, votre expérience, vos disponibilités et votre CV. Ni lettre de motivation, ni compte à créer.',
      },
      { type: 'titre', texte: 'Le domaine professionnel' },
      {
        type: 'paragraphe',
        texte:
          'C’est le champ le plus important. Il détermine à quels besoins votre candidature sera rapprochée : développement web, développement logiciel, design, montage vidéo, community management, marketing numérique, administration, service client, comptabilité, assistance virtuelle, ou un autre profil professionnel.',
      },
      {
        type: 'paragraphe',
        texte:
          'Choisissez celui qui décrit votre travail réel, pas celui qui vous paraît le plus demandé.',
      },
      { type: 'titre', texte: 'Le français et l’anglais' },
      {
        type: 'paragraphe',
        texte:
          'Les deux sont évalués séparément. Vous n’avez pas à surestimer l’un pour compenser l’autre : beaucoup de postes demandent un excellent français et un anglais de lecture seulement.',
      },
      {
        type: 'citation',
        texte:
          'Une évaluation honnête vous évite un entretien qui ne pouvait pas se passer bien.',
      },
      { type: 'titre', texte: 'Le CV' },
      {
        type: 'paragraphe',
        texte:
          'Deux choses comptent plus que la mise en page, et une troisième vaut d’être dite.',
      },
      {
        type: 'liste',
        items: [
          'Pour chaque poste, dites ce que vous faisiez concrètement, pas seulement l’intitulé.',
          'Nommez les outils que vous maîtrisez : nos clients travaillent avec des outils précis.',
          'PDF, DOC ou DOCX — les trois formats acceptés, et rien d’autre à préparer.',
        ],
      },
      { type: 'titre', texte: 'La disponibilité' },
      {
        type: 'paragraphe',
        texte:
          'C’est une date, pas une promesse. Indiquez à partir de quand vous pouvez commencer réellement. Une date lointaine ne disqualifie pas une candidature — une date fausse fait perdre une occasion à tout le monde.',
      },
      { type: 'titre', texte: 'Après l’envoi' },
      {
        type: 'paragraphe',
        texte:
          'Votre profil rejoint notre base de candidats. Présélection par Maldia, puis sélection avec l’entreprise cliente.',
      },
    ],
  },
  {
    identifiant: 'travailler-avec-vos-outils',
    date: '2026-06-23',
    categorie: 'Outils',
    duree: '5 min',
    titre: 'Travailler avec vos outils, pas avec les nôtres',
    resume: 'Pourquoi nous n’imposons aucun outil à nos clients, et ce que cela demande à nos talents.',
    etiquettes: ['Outils', 'Intégration', 'Présélection'],
    corps: [
      {
        type: 'chapeau',
        texte:
          'Une équipe ne change pas d’outils parce qu’elle recrute. C’est pourtant ce que demandent beaucoup de prestataires, et le client se retrouve avec deux environnements à tenir.',
      },
      { type: 'titre', texte: 'Le problème pris dans l’autre sens' },
      {
        type: 'paragraphe',
        texte:
          'Nous nous adaptons aux outils déjà utilisés par l’entreprise. Le talent rejoint votre environnement de travail tel qu’il existe, et il n’y a rien à installer de votre côté.',
      },
      { type: 'titre', texte: 'Les familles d’outils' },
      {
        type: 'paragraphe',
        texte:
          'La communication : Slack, Microsoft Teams, Zoom. La bureautique : Google Workspace, Microsoft 365. La gestion de projet : Trello, Asana, ClickUp, Notion. Le développement : GitHub, GitLab, VS Code, et les technologies qui vont avec.',
      },
      {
        type: 'liste',
        items: [
          'Design : Figma, Canva, Photoshop, Illustrator.',
          'Vidéo : CapCut, Premiere Pro, After Effects.',
          'Web, commerce et marketing : WordPress, Shopify, HubSpot, Salesforce, Google Analytics, Meta Business Suite, Buffer.',
        ],
      },
      {
        type: 'citation',
        texte:
          'Ces marques sont citées pour situer les compétences de nos talents. Agence Maldia n’est partenaire d’aucune d’entre elles.',
      },
      { type: 'titre', texte: 'Ce que ça coûte, de notre côté' },
      {
        type: 'paragraphe',
        texte:
          'Ce choix a un coût, et il est chez nous. La présélection ne peut pas se limiter au domaine et à l’expérience : elle demande de savoir quels outils la personne a réellement utilisés, et lesquels elle a seulement croisés.',
      },
      {
        type: 'paragraphe',
        texte:
          'C’est une question que nous posons tôt, parce qu’elle décide de la vitesse d’intégration bien plus que l’ancienneté.',
      },
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
    etiquettes: ['Staff augmentation', 'Recruitment fees', 'Timeline'],
    corps: [
      {
        type: 'chapeau',
        texte:
          'The term is everywhere and rarely means the same thing twice. At Maldia it has a precise meaning, and that meaning decides what you pay for and who decides.',
      },
      { type: 'titre', texte: 'Neither outsourcing nor a placement agency' },
      {
        type: 'paragraphe',
        texte:
          'A person based in Madagascar joins your team remotely, works on your projects, with your tools, following your methods. They are not a supplier you hand a deliverable to. They are reinforcement inside the team you already run.',
      },
      {
        type: 'paragraphe',
        texte:
          'The difference from outsourcing comes down to who decides. With outsourcing, you buy a result and the supplier chooses how to reach it. With staff augmentation, you keep control of the work, the priorities and the methods.',
      },
      {
        type: 'citation',
        texte:
          'What Maldia brings is the person and the follow-up of the collaboration — not a parallel organisation.',
      },
      { type: 'titre', texte: 'What you do not pay for' },
      {
        type: 'paragraphe',
        texte:
          'The difference from a placement agency comes down to when you get billed. There are no recruitment fees: searching for and shortlisting candidates is not billed to you. You do not pay to meet profiles.',
      },
      { type: 'titre', texte: 'How it unfolds' },
      {
        type: 'paragraphe',
        texte:
          'You describe the profile you need, the field and the level of experience expected. We look among our candidates and filter on field, experience and level of French and English. You only receive the applications that match.',
      },
      {
        type: 'liste',
        items: [
          'You run the interviews and you choose, on your own.',
          'The talent joins your working environment as it stands.',
          'Maldia supports the collaboration and handles follow-up over time.',
        ],
      },
      { type: 'titre', texte: 'The timeline, honestly' },
      {
        type: 'paragraphe',
        texte:
          'Expect fourteen days on average between your request and the presentation of profiles. That is an average, not a guarantee: a rare profile takes longer, and we would rather say so beforehand than after.',
      },
    ],
  },
  {
    identifiant: 'preparer-sa-candidature',
    date: '2026-07-14',
    categorie: 'Talent',
    duree: '5 min',
    titre: 'Preparing your application to Maldia',
    resume: 'What the form asks for, what we look at, and what happens after you send it.',
    etiquettes: ['Application', 'Résumé', 'Shortlisting'],
    corps: [
      {
        type: 'chapeau',
        texte:
          'The application form is short, and that is deliberate: your contact details, your field, the role you want, your experience, your availability and your résumé. No cover letter, no account to create.',
      },
      { type: 'titre', texte: 'The professional field' },
      {
        type: 'paragraphe',
        texte:
          'This is the most important entry. It determines which requests your application gets matched against: web development, software development, design, video editing, community management, digital marketing, administration, customer service, accounting, virtual assistance, or another professional profile.',
      },
      {
        type: 'paragraphe',
        texte:
          'Pick the one that describes your actual work, not the one that looks most in demand.',
      },
      { type: 'titre', texte: 'French and English' },
      {
        type: 'paragraphe',
        texte:
          'Both are assessed separately. You do not have to overstate one to make up for the other: many roles need excellent French and reading-level English only.',
      },
      {
        type: 'citation',
        texte: 'An honest assessment saves you an interview that could not have gone well.',
      },
      { type: 'titre', texte: 'The résumé' },
      {
        type: 'paragraphe',
        texte: 'Two things matter more than the layout, and a third is worth saying.',
      },
      {
        type: 'liste',
        items: [
          'For each role, say what you actually did, not just the job title.',
          'Name the tools you know: our clients work with specific tools.',
          'PDF, DOC or DOCX — the three accepted formats, and nothing else to prepare.',
        ],
      },
      { type: 'titre', texte: 'Availability' },
      {
        type: 'paragraphe',
        texte:
          'It is a date, not a promise. State when you can genuinely start. A distant date does not disqualify an application — a false one costs everyone an opportunity.',
      },
      { type: 'titre', texte: 'After you send it' },
      {
        type: 'paragraphe',
        texte:
          'Your profile is added to our candidate database. Shortlisting by Maldia, then selection with the client company.',
      },
    ],
  },
  {
    identifiant: 'travailler-avec-vos-outils',
    date: '2026-06-23',
    categorie: 'Tools',
    duree: '5 min',
    titre: 'Working with your tools, not ours',
    resume: 'Why we impose no tools on our clients, and what that asks of our talent.',
    etiquettes: ['Tools', 'Onboarding', 'Shortlisting'],
    corps: [
      {
        type: 'chapeau',
        texte:
          'A team does not change tools because it hires. Yet that is what many suppliers ask for, and the client ends up maintaining two environments.',
      },
      { type: 'titre', texte: 'The problem, the other way round' },
      {
        type: 'paragraphe',
        texte:
          'We adapt to the tools the company already uses. The talent joins your working environment as it exists, and there is nothing for you to install.',
      },
      { type: 'titre', texte: 'The families of tools' },
      {
        type: 'paragraphe',
        texte:
          'Communication: Slack, Microsoft Teams, Zoom. Productivity: Google Workspace, Microsoft 365. Project management: Trello, Asana, ClickUp, Notion. Development: GitHub, GitLab, VS Code, and the technologies that go with them.',
      },
      {
        type: 'liste',
        items: [
          'Design: Figma, Canva, Photoshop, Illustrator.',
          'Video: CapCut, Premiere Pro, After Effects.',
          'Web, commerce and marketing: WordPress, Shopify, HubSpot, Salesforce, Google Analytics, Meta Business Suite, Buffer.',
        ],
      },
      {
        type: 'citation',
        texte:
          'These brands are named to situate our talent’s skills. Agence Maldia is not a partner of any of them.',
      },
      { type: 'titre', texte: 'What it costs, on our side' },
      {
        type: 'paragraphe',
        texte:
          'This choice has a cost, and the cost is ours. Shortlisting cannot stop at field and experience: it means finding out which tools the person has genuinely used, and which ones they have only brushed against.',
      },
      {
        type: 'paragraphe',
        texte:
          'We ask that early, because it decides how fast someone settles in far more than seniority does.',
      },
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

/** Les autres articles, dans l'ordre d'affichage — la section « dans la même série ». */
export function autresArticles(langue: Langue, identifiant: string) {
  return articlesTriees(langue).filter((article) => article.identifiant !== identifiant)
}

/** Les identifiants, dans l'ordre d'affichage — pour generateStaticParams et le sitemap. */
export function identifiantsArticles(langue: Langue): readonly string[] {
  return articlesTriees(langue).map((article) => article.identifiant)
}
