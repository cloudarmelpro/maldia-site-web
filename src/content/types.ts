import type { Ancre, Langue } from './langues'

// Les libellés des deux CTA sont figés par le cahier (WEB-1, WEB-2, WEB-3,
// WEB-7), au mot près : portés dans le type, toute variante ne compile pas.
export type LibelleCandidature<L extends Langue = Langue> = {
  fr: 'Déposer ma candidature'
  en: 'Apply now'
}[L]

export type LibelleRendezVous<L extends Langue = Langue> = {
  fr: 'Prendre rendez-vous'
  en: 'Book a call'
}[L]

export type LienAncre<A extends Ancre = Ancre> = {
  readonly ancre: A
  readonly libelle: string
}

// Le détour générique est nécessaire : mappé sur un tuple concret, TypeScript
// parcourrait aussi `length` et les méthodes de tableau.
type LiensDepuisAncres<A extends readonly Ancre[]> = {
  readonly [I in keyof A]: LienAncre<A[I] & Ancre>
}

// L'en-tête et le pied ne listent pas les mêmes ancres : le pied ajoute la
// FAQ. Chaque navigation fige les siennes, et la structure impose la parité
// entre langues.
export const ANCRES_EN_TETE = [
  'talents',
  'entreprises',
  'profils',
  'a-propos',
  'contact',
] as const satisfies readonly Ancre[]

export const ANCRES_PIED = [
  'talents',
  'entreprises',
  'profils',
  'a-propos',
  'contact',
  'faq',
] as const satisfies readonly Ancre[]

export type NavigationEnTete = LiensDepuisAncres<typeof ANCRES_EN_TETE>
export type NavigationPied = LiensDepuisAncres<typeof ANCRES_PIED>

/** Un texte que la maquette coupe en deux lignes à un endroit précis. */
export type DeuxLignes = readonly [string, string]

/** Un texte dont la maquette met un fragment en exergue. */
export type MiseEnAvant = {
  readonly avant: string
  readonly misEnAvant: string
  readonly apres: string
}

/** Les marchés desservis (WEB-1). */
export type Marches = readonly [string, string, string, string, string, string, string]

/** Une des façons de travailler avec Maldia (WEB-1, WEB-3). */
export type Opportunite = {
  readonly titre: string
  readonly description: string
}

export type Opportunites = readonly [Opportunite, Opportunite, Opportunite]

/** Une étape du service de staff augmentation (WEB-4). */
export type Etape = {
  readonly numero: string
  /** Qui agit à cette étape — « Vous », « Maldia », « Ensemble ». */
  readonly cote: string
  readonly titre: string
  readonly description: string
}

export type Etapes = readonly [Etape, Etape, Etape, Etape, Etape, Etape]

export type Jalon = {
  readonly libelle: string
  readonly precision: string
}

/** Le recrutement vu du candidat : candidature, présélection, sélection (WEB-3). */
export type FriseRecrutement = readonly [Jalon, Jalon, Jalon]

export type CarteTalents = {
  readonly titre: string
  readonly description: string
}

export type CarteTalentsFrise = {
  readonly titre: string
  readonly description: string
  readonly frise: FriseRecrutement
}

/** La frise remplace le visuel de la troisième carte : sa position est celle de la maquette. */
export type CartesTalents = readonly [
  CarteTalents,
  CarteTalents,
  CarteTalentsFrise,
  CarteTalents,
]

/** Un champ du formulaire de candidature, tel que la carte des critères l'annonce. */
export type Critere = {
  readonly libelle: string
  readonly precision: string
}

export type Criteres = readonly [Critere, Critere, Critere, Critere, Critere]

export type Offre<L extends Langue = Langue> = {
  /** La pastille au sommet de la carte. */
  readonly intitule: string
  /** Occupe l'emplacement du prix de la maquette ; porte une action, pas un montant. */
  readonly prix: string
  /** La ligne accolée au prix. */
  readonly unite: string
  readonly description: string
  readonly inclus: readonly [string, string, string, string, string, string]
  readonly libelleSupplement: string
  readonly supplement: string
  readonly cta: LibelleCandidature<L> | LibelleRendezVous<L>
  readonly cta2: string
  readonly note: string
}

export type Offres<L extends Langue = Langue> = readonly [Offre<L>, Offre<L>]

/** Une catégorie de profils recrutés (WEB-5). */
export type Profil = {
  readonly description: string
  readonly nom: string
  readonly precision: string
}

export type Profils = readonly [
  Profil,
  Profil,
  Profil,
  Profil,
  Profil,
  Profil,
  Profil,
  Profil,
  Profil,
  Profil,
  Profil,
]

export type QuestionReponse = {
  readonly question: string
  readonly reponse: string
}

export type QuestionsReponses = readonly [
  QuestionReponse,
  QuestionReponse,
  QuestionReponse,
  QuestionReponse,
  QuestionReponse,
  QuestionReponse,
]

/** Les domaines professionnels, en tuiles courtes (WEB-4, WEB-5). */
export type TuilesDomaines = {
  readonly rangee1: readonly [string, string, string, string, string, string]
  readonly rangee2: readonly [string, string, string, string]
}

export type TuilesDefilantes = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
]


// Contrat du contenu d'Agence Maldia (WEB-1 à WEB-8), aligné sur la maquette
// réécrite par le client. Les tuples figent la parité de structure entre les
// deux langues : une entrée en plus ou en moins dans une seule ne compile pas.
export type Contenu<L extends Langue = Langue> = {
  /** Produites à la compilation — jamais écrites dans un composant. */
  readonly meta: {
    readonly titre: string
    readonly description: string
    readonly openGraph: {
      readonly titre: string
      readonly description: string
    }
  }

  readonly enTete: {
    readonly marque: string
    readonly initiale: string
    /** Nom accessible du bouton du menu mobile — exigé par l'accessibilité, absent de la maquette. */
    readonly menu: string
    readonly navigation: NavigationEnTete
    /** Libellé accessible du sélecteur de langue (WEB-8). */
    readonly changerDeLangue: string
    readonly cta: LibelleRendezVous<L>
  }

  readonly hero: {
    readonly pastille: MiseEnAvant
    readonly titre: DeuxLignes
    readonly sousTitre: DeuxLignes
    readonly ctaPrincipal: LibelleRendezVous<L>
    readonly ctaSecondaire: LibelleCandidature<L>
    readonly mention: string
  }

  readonly marches: {
    readonly titre: string
    readonly liste: Marches
  }

  readonly opportunites: {
    readonly titre: string
    readonly description: string
    readonly liste: Opportunites
  }

  readonly entreprises: {
    readonly titre: string
    readonly tuiles: TuilesDomaines
    readonly titreGauche: string
    readonly titreSombre: string
    readonly ctaSombre: LibelleRendezVous<L>
  }

  readonly deroulement: {
    readonly titre: string
    readonly description: string
    readonly liste: Etapes
    readonly cta: LibelleRendezVous<L>
    /** La précision qui suit l'appel, sous la grille. */
    readonly mention: string
  }

  readonly talents: {
    readonly titre: string
    readonly description: string
    readonly cartes: CartesTalents
    /** La cinquième carte de la maquette : ce que demande le formulaire de candidature. */
    readonly criteres: {
      readonly titre: string
      readonly description: string
      readonly liste: Criteres
    }
  }

  readonly commencer: {
    readonly titre: DeuxLignes
    readonly sousTitre: DeuxLignes
    readonly offres: Offres<L>
    readonly promo: {
      readonly titre: string
      readonly description: string
      readonly cta: string
    }
  }

  readonly profils: {
    readonly titre: string
    readonly liste: Profils
  }

  readonly faq: {
    readonly titre: string
    readonly description: string
    readonly questions: QuestionsReponses
  }

  readonly cloture: {
    readonly titre: string
    readonly description: string
    readonly ctaPrincipal: LibelleRendezVous<L>
    readonly ctaSecondaire: LibelleCandidature<L>
    readonly tuiles: TuilesDefilantes
  }

  /** Nom accessible du bouton de retour en haut. */
  readonly retourEnHaut: string

  readonly pied: {
    readonly navigation: NavigationPied
    readonly ctaSecondaire: LibelleCandidature<L>
    readonly copyright: string
  }
}
