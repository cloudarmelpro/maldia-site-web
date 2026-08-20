import { PAGES } from './langues'
import type { Langue, Page } from './langues'

// Les libellés d'appel sont figés au mot près — par le cahier (WEB-1, WEB-2,
// WEB-3, WEB-7) et par le retour client pour « Trouver un talent ». Portés dans
// le type, toute variante ne compile pas.
export type LibelleCandidature<L extends Langue = Langue> = {
  fr: 'Déposer ma candidature'
  en: 'Apply now'
}[L]

export type LibelleRendezVous<L extends Langue = Langue> = {
  fr: 'Prendre rendez-vous'
  en: 'Book a call'
}[L]

export type LibelleTrouverTalent<L extends Langue = Langue> = {
  fr: 'Trouver un talent'
  en: 'Find a talent'
}[L]

export type LibelleDiscuter<L extends Langue = Langue> = {
  fr: 'Discuter de vos besoins'
  en: 'Discuss your needs'
}[L]

/** Les trois libellés qui mènent au calendrier Cal.com (WEB-7). */
export type AppelEntreprise<L extends Langue = Langue> =
  | LibelleRendezVous<L>
  | LibelleTrouverTalent<L>
  | LibelleDiscuter<L>

export type LienPage<P extends Page = Page> = {
  readonly page: P
  readonly libelle: string
}

// Le détour générique est nécessaire : mappé sur un tuple concret, TypeScript
// parcourrait aussi `length` et les méthodes de tableau.
type LiensDepuisPages<P extends readonly Page[]> = {
  readonly [I in keyof P]: LienPage<P[I] & Page>
}

/**
 * WEB-11 — les pages du menu, dans l'ordre de `PAGES`.
 *
 * L'en-tête et le pied portent la même liste : le retour client n'en distingue
 * pas deux, et une navigation qui diverge de l'autre se remarque à l'usage.
 */
export type Navigation = LiensDepuisPages<typeof PAGES>

/** Un texte que la maquette coupe en deux lignes à un endroit précis. */
export type DeuxLignes = readonly [string, string]

/** Un texte dont la maquette met un fragment en exergue. */
export type MiseEnAvant = {
  readonly avant: string
  readonly misEnAvant: string
  readonly apres: string
}

/** Produites à la compilation — jamais écrites dans un composant. */
export type Meta = {
  readonly titre: string
  readonly description: string
  readonly openGraph: {
    readonly titre: string
    readonly description: string
  }
}

/** L'en-tête d'une page intérieure : titre, description, un appel. */
export type EnTetePage<A extends string> = {
  readonly titre: string
  readonly description: string
  readonly cta: A
  readonly mention: string
}

/** Les marchés desservis (WEB-1). */
export type Marches = readonly [string, string, string, string, string, string, string]

/**
 * WEB-12 — un message commercial du retour client.
 *
 * `chiffre` est le repère qu'on lit d'abord ; `description` reprend la phrase
 * du client, au mot près. Les deux langues portent les mêmes chiffres —
 * `tests/chiffres.spec.ts` échoue si une seule est corrigée.
 */
export type ArgumentCommercial = {
  /** Absent quand l'argument n'est pas chiffré. */
  readonly chiffre?: string
  readonly titre: string
  readonly description: string
}

export type ArgumentsCommerciaux = readonly [
  ArgumentCommercial,
  ArgumentCommercial,
  ArgumentCommercial,
  ArgumentCommercial,
  ArgumentCommercial,
  ArgumentCommercial,
]

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

export type CarteTalentsFrise = CarteTalents & {
  readonly frise: FriseRecrutement
}

/** La frise remplace le visuel de la dernière carte : sa position est celle de la maquette. */
export type CartesTalents = readonly [CarteTalents, CarteTalents, CarteTalentsFrise]

/** Un champ du formulaire de candidature, tel que la carte des critères l'annonce. */
export type Critere = {
  readonly libelle: string
  readonly precision: string
}

export type Criteres = readonly [Critere, Critere, Critere, Critere, Critere]

/** Une des deux entrées de l'accueil (WEB-2) : les talents d'un côté, les entreprises de l'autre. */
export type Parcours<L extends Langue = Langue> = {
  /** La pastille au sommet de la carte. */
  readonly intitule: string
  /** Occupe l'emplacement du prix de la maquette ; porte une action, pas un montant. */
  readonly action: string
  /** La ligne accolée à l'action. */
  readonly unite: string
  readonly description: string
  readonly inclus: readonly [string, string, string, string, string, string]
  readonly libelleSupplement: string
  readonly supplement: string
  readonly cta: LibelleCandidature<L> | AppelEntreprise<L>
  readonly cta2: string
  readonly note: string
}

/** L'ordre fige la destination : la première carte mène à la candidature, la seconde au calendrier. */
export type DeuxParcours<L extends Langue = Langue> = readonly [Parcours<L>, Parcours<L>]

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

/** Une des deux voies de la page Contact : le calendrier, ou la candidature. */
export type VoieContact<L extends Langue = Langue> = {
  readonly intitule: string
  readonly titre: string
  readonly description: string
  readonly etapes: readonly [string, string, string]
  readonly cta: LibelleRendezVous<L> | LibelleCandidature<L>
  readonly note: string
}

/**
 * Le segment d'URL d'un article, et **le même dans les deux langues** : c'est
 * ce qui permet au sélecteur de langue de mener au même article plutôt qu'à
 * l'index. Une union fermée plutôt que `string` — la photo d'un article
 * manquant devient alors une erreur de compilation dans `photos.ts`.
 *
 * Une adresse publiée ne se change plus : l'hébergement ne redirige pas
 * (décision 0013), donc un identifiant renommé laisse une erreur 404.
 */
export type IdentifiantArticle =
  | 'staff-augmentation'
  | 'preparer-sa-candidature'
  | 'travailler-avec-vos-outils'

/**
 * Un article du blog (WEB-15).
 *
 * `date` est en ISO, donc triable et indépendante de la langue : son affichage
 * est produit par Intl, pas recopié.
 */
export type Article = {
  readonly identifiant: IdentifiantArticle
  readonly date: string
  readonly titre: string
  readonly resume: string
  readonly corps: readonly string[]
}

export type Articles = readonly [Article, Article, Article]

/**
 * Contrat du contenu d'Agence Maldia — WEB-1 à WEB-15.
 *
 * Les tuples figent la parité de structure entre les deux langues : une entrée
 * en plus ou en moins dans une seule ne compile pas.
 *
 * `commun` porte ce qui paraît sur plusieurs pages. Un même bloc écrit deux
 * fois finirait par ne plus dire la même chose d'une page à l'autre.
 */
export type Contenu<L extends Langue = Langue> = {
  readonly commun: {
    readonly enTete: {
      readonly marque: string
      readonly initiale: string
      /** Nom accessible du bouton du menu mobile — exigé par l'accessibilité, absent de la maquette. */
      readonly menu: string
      readonly navigation: Navigation
      /** Libellé accessible du sélecteur de langue (WEB-8). */
      readonly changerDeLangue: string
      readonly cta: LibelleRendezVous<L>
    }

    /** WEB-1 — les marchés desservis. */
    readonly marches: {
      readonly titre: string
      readonly liste: Marches
    }

    /** WEB-12 — les messages commerciaux du retour client. */
    readonly argumentaire: {
      readonly titre: string
      readonly description: string
      readonly liste: ArgumentsCommerciaux
      /** Le délai est une moyenne et non une garantie : le retour client l'exige. */
      readonly mention: string
    }

    /** WEB-13 — le compteur de candidats. Le nombre vient de `chiffres.ts`. */
    readonly compteur: {
      readonly prefixe: string
      readonly libelle: string
      readonly precision: string
    }

    /** WEB-14 — le bandeau des outils. */
    readonly outils: {
      readonly titre: string
      /** Dit qu'il n'y a pas de partenariat : le retour client l'exige. */
      readonly mention: string
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
      readonly navigation: Navigation
      readonly ctaSecondaire: LibelleCandidature<L>
      readonly copyright: string
    }
  }

  /** WEB-2 — les deux parcours, compris en quelques secondes. */
  readonly accueil: {
    readonly meta: Meta
    readonly hero: {
      readonly pastille: MiseEnAvant
      readonly titre: DeuxLignes
      readonly sousTitre: DeuxLignes
      readonly ctaPrincipal: LibelleTrouverTalent<L>
      readonly ctaSecondaire: LibelleCandidature<L>
      readonly mention: string
    }
    readonly parcours: {
      readonly titre: DeuxLignes
      readonly sousTitre: DeuxLignes
      readonly entrees: DeuxParcours<L>
      readonly encart: {
        readonly titre: string
        readonly description: string
        readonly cta: LibelleDiscuter<L>
      }
    }
    readonly faq: {
      readonly titre: string
      readonly description: string
      readonly questions: QuestionsReponses
    }
  }

  /** WEB-4 — la page destinée aux entreprises. */
  readonly services: {
    readonly meta: Meta
    readonly entete: EnTetePage<LibelleRendezVous<L>>
    readonly deroulement: {
      readonly titre: string
      readonly description: string
      readonly liste: Etapes
      readonly cta: LibelleRendezVous<L>
      readonly mention: string
    }
    readonly domaines: {
      readonly titre: string
      readonly tuiles: TuilesDomaines
      readonly titreGauche: string
      readonly titreSombre: string
      readonly ctaSombre: LibelleDiscuter<L>
    }
  }

  /** WEB-3 et WEB-5 — la page destinée aux candidats à Madagascar. */
  readonly talents: {
    readonly meta: Meta
    readonly entete: EnTetePage<LibelleCandidature<L>>
    readonly opportunites: {
      readonly titre: string
      readonly description: string
      readonly liste: Opportunites
    }
    readonly cartes: {
      readonly titre: string
      readonly description: string
      readonly liste: CartesTalents
    }
    readonly criteres: {
      readonly titre: string
      readonly description: string
      readonly liste: Criteres
    }
    readonly profils: {
      readonly titre: string
      readonly liste: Profils
    }
  }

  /** WEB-6 — À propos. */
  readonly aPropos: {
    readonly meta: Meta
    readonly titre: string
    readonly description: string
    readonly paragraphes: readonly [string, string, string]
    /** Les chiffres sont comptés à partir des listes, pas recopiés. */
    readonly reperes: {
      readonly marches: string
      readonly domaines: string
      readonly langues: string
    }
    readonly cta: LibelleRendezVous<L>
  }

  /** WEB-15 — le blog. */
  readonly blog: {
    readonly meta: Meta
    readonly titre: string
    readonly description: string
    readonly lire: string
    /** Servi quand la liste d'articles est vide — la structure existe avant le contenu. */
    readonly vide: string
    readonly retour: string
    readonly publieLe: string
    /** Nom accessible du bloc d'appel qui ferme un article. */
    readonly appelArticle: string
  }

  /** WEB-7 — Contact, par le calendrier Cal.com. */
  readonly contact: {
    readonly meta: Meta
    readonly titre: string
    readonly description: string
    readonly voies: readonly [VoieContact<L>, VoieContact<L>]
    /** Explique l'absence de formulaire : le site n'a pas de serveur (WEB-10). */
    readonly mention: string
  }
}
