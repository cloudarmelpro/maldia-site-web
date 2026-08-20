import { PAGES } from './langues'
import type { Langue, Page } from './langues'

// Les libellés d'appel sont figés au mot près — par le cahier (WEB-1, WEB-2,
// WEB-3, WEB-7), par le retour client, et par le design « Hero Maldia v2 » pour
// les deux derniers. Portés dans le type, toute variante ne compile pas.
export type LibelleCandidature<L extends Langue = Langue> = {
  fr: 'Déposer ma candidature'
  en: 'Apply now'
}[L]

export type LibelleRendezVous<L extends Langue = Langue> = {
  fr: 'Prendre rendez-vous'
  en: 'Book a call'
}[L]

export type LibelleDiscuter<L extends Langue = Langue> = {
  fr: 'Discuter de vos besoins'
  en: 'Discuss your needs'
}[L]

export type LibelleProfil<L extends Langue = Langue> = {
  fr: 'Discuter d’un profil'
  en: 'Discuss a profile'
}[L]

export type LibelleDemanderProfil<L extends Langue = Langue> = {
  fr: 'Demander ce profil'
  en: 'Request this profile'
}[L]

/** Tous les libellés qui mènent au calendrier Cal.com (WEB-7). */
export type AppelEntreprise<L extends Langue = Langue> =
  | LibelleRendezVous<L>
  | LibelleDiscuter<L>
  | LibelleProfil<L>
  | LibelleDemanderProfil<L>

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
 * L'en-tête et le pied portent la même liste : le design ne les distingue pas,
 * et une navigation qui diverge de l'autre se remarque à l'usage.
 */
export type Navigation = LiensDepuisPages<typeof PAGES>

/** Produites à la compilation — jamais écrites dans un composant. */
export type Meta = {
  readonly titre: string
  readonly description: string
  readonly openGraph: {
    readonly titre: string
    readonly description: string
  }
}

/**
 * L'en-tête d'une page intérieure : l'intitulé en capitales, le `h1`, la
 * description, un appel.
 */
export type EnTetePage<A extends string> = {
  readonly intitule: string
  readonly titre: string
  readonly description: string
  readonly cta: A
  readonly mention: string
}

/** Les marchés desservis (WEB-1). */
export type Marches = readonly [string, string, string, string, string, string, string]

/**
 * WEB-12 — un message commercial, dans la carte du design : un intitulé sur
 * deux lignes, un chiffre, une phrase.
 *
 * `accent` met le chiffre en vert. Le design en marque un sur deux — c'est un
 * rythme visuel, pas une hiérarchie de sens.
 */
export type ArgumentCommercial = {
  readonly ligne1: string
  readonly ligne2: string
  readonly chiffre: string
  readonly description: string
  readonly accent?: boolean
}

export type ArgumentsCommerciaux = readonly [
  ArgumentCommercial,
  ArgumentCommercial,
  ArgumentCommercial,
  ArgumentCommercial,
  ArgumentCommercial,
  ArgumentCommercial,
]

/** Une étape de la méthode (WEB-4). Le rang est calculé, jamais recopié. */
export type Etape = {
  /**
   * Qui agit, comme donnée et non comme libellé : le design colore la pastille
   * selon que le client agit ou non, et `acteur` est traduit — le comparer à
   * « Vous » marcherait en français et nulle part ailleurs.
   */
  readonly cote: 'client' | 'maldia'
  readonly acteur: string
  readonly titre: string
  readonly description: string
}

export type Etapes = readonly [Etape, Etape, Etape, Etape, Etape]

/** Une catégorie de profils recrutés (WEB-5), telle que le sélecteur l'affiche. */
export type Profil = {
  readonly nom: string
  readonly description: string
  readonly etiquettes: readonly [string, string, string, string]
}

export type Profils = readonly [Profil, Profil, Profil, Profil, Profil, Profil]

/** Une des deux voies de l'accueil (WEB-2) : les entreprises, les talents. */
export type Voie<L extends Langue = Langue> = {
  readonly pour: string
  readonly meta: string
  readonly titre: string
  readonly description: string
  readonly points: readonly [string, string, string, string, string, string]
  readonly libelleSupplement?: string
  readonly supplement?: string
  readonly cta: LibelleCandidature<L> | AppelEntreprise<L>
}

/** L'ordre fige la destination : la première mène au calendrier, la seconde à la candidature. */
export type DeuxVoies<L extends Langue = Langue> = readonly [Voie<L>, Voie<L>]

/** Le côté auquel une question s'adresse — c'est lui que filtrent les onglets. */
export type CoteQuestion = 'entreprise' | 'talent'

export type QuestionReponse = {
  readonly cote: CoteQuestion
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

/** Les trois onglets de la FAQ. L'ordre fige le filtre : tout, entreprises, talents. */
export type FiltresQuestions = readonly [string, string, string]

/** Une des deux cartes d'appel qui ferment chaque page. */
export type CarteAppel<L extends Langue = Langue> = {
  readonly intitule: string
  readonly titre: LibelleRendezVous<L> | LibelleCandidature<L>
  readonly mention: string
}

/**
 * Le segment d'URL d'un article, et **le même dans les deux langues** : c'est
 * ce qui permet au sélecteur de langue de mener au même article plutôt qu'à
 * l'index. Une union fermée plutôt que `string` — la photo d'un article
 * manquant devient alors une erreur de compilation dans `photos.ts`.
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
  /** La categorie sert de filtre sur l'index : les onglets en sont deduits. */
  readonly categorie: string
  /** Duree de lecture, telle que le design l'affiche a cote de la categorie. */
  readonly duree: string
  readonly titre: string
  readonly resume: string
  readonly corps: readonly string[]
}

export type Articles = readonly [Article, Article, Article]

/**
 * Contrat du contenu d'Agence Maldia — WEB-1 à WEB-15, dans la mise en page du
 * design « Hero Maldia v2 ».
 *
 * Les tuples figent la parité de structure entre les deux langues : une entrée
 * en plus ou en moins dans une seule ne compile pas.
 *
 * `commun` porte les blocs que plusieurs pages rendent. Le design réemploie ses
 * sections d'une page à l'autre ; écrites deux fois, elles finiraient par ne
 * plus dire la même chose.
 */
export type Contenu<L extends Langue = Langue> = {
  readonly commun: {
    readonly enTete: {
      readonly marque: string
      readonly initiale: string
      /** Nom accessible du bouton du menu mobile — exigé par l'accessibilité, absent du design. */
      readonly menu: string
      readonly fermerMenu: string
      readonly navigation: Navigation
      /** Libellé accessible du sélecteur de langue (WEB-8). */
      readonly changerDeLangue: string
      readonly cta: LibelleRendezVous<L>
    }

    /** WEB-12 — l'argumentaire chiffré. Accueil et Services. */
    readonly pourquoi: {
      readonly intitule: string
      readonly titre: string
      /** La fin du titre, que le design pose en gris clair. */
      readonly titreSuite: string
      readonly etiquette: string
      readonly liste: ArgumentsCommerciaux
      readonly encart: {
        readonly intitule: string
        readonly texte: string
        readonly cta: LibelleDiscuter<L>
      }
    }

    /** WEB-1 — les marchés, dans la bande défilante. */
    readonly marches: {
      readonly intitule: string
      readonly liste: Marches
      /** La ligne de droite de la barre du hero : la liste ne s'y résume pas d'elle-même. */
      readonly resume: string
    }

    /** WEB-5 — le sélecteur de profils. Accueil et Talents. */
    readonly profils: {
      readonly intitule: string
      readonly titre: string
      readonly cta: LibelleProfil<L>
      readonly liste: Profils
      readonly delaiIntitule: string
      readonly delai: string
      readonly ctaProfil: LibelleDemanderProfil<L>
    }

    /** WEB-4 — les cinq étapes. Accueil et Services. */
    readonly methode: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
      readonly liste: Etapes
      readonly conclusion: string
      readonly ctaPrincipal: LibelleRendezVous<L>
      readonly ctaSecondaire: LibelleCandidature<L>
    }

    /** WEB-2 — les deux voies. Accueil et Talents. */
    readonly parcours: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
      readonly voies: DeuxVoies<L>
    }

    /** WEB-13 et WEB-14 — le compteur et le bandeau des outils. */
    readonly base: {
      readonly intitule: string
      /** Le suffixe accolé au nombre — « + » dans le design. */
      readonly suffixe: string
      readonly libelle: string
      readonly precision: string
      readonly outilsIntitule: string
      /** Dit qu'il n'y a pas de partenariat : le retour client l'exige. */
      readonly mention: string
    }

    /** Le bloc d'appel qui ferme chaque page. */
    readonly contact: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
      readonly cartes: readonly [CarteAppel<L>, CarteAppel<L>]
    }

    readonly pied: {
      readonly navigation: Navigation
      readonly description: string
      readonly titrePages: string
      readonly titreContact: string
      readonly courriel: string
      readonly lieu: string
      /** Noms accessibles des trois liens sociaux, dans l'ordre du design. */
      readonly reseaux: readonly [string, string, string]
      readonly copyright: string
    }

    /** Nom accessible du bouton de retour en haut. */
    readonly retourEnHaut: string
  }

  /** WEB-2 — l'accueil, et le hero du design. */
  readonly accueil: {
    readonly meta: Meta
    readonly hero: {
      readonly lead: string
      readonly titre: string
      readonly carteAppel: {
        readonly intitule: string
        readonly titre: string
        readonly mention: string
      }
      readonly carteCandidature: LibelleCandidature<L>
      readonly badges: readonly [
        { readonly signe: string; readonly libelle: string },
        { readonly signe: string; readonly libelle: string },
      ]
      /** Noms accessibles du bouton qui met la dérive de la photo en pause. */
      readonly lecture: {
        readonly pause: string
        readonly reprendre: string
      }
    }
    readonly questions: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
      readonly filtres: FiltresQuestions
      readonly liste: QuestionsReponses
    }
  }

  /** WEB-4 — la page destinée aux entreprises. */
  readonly services: {
    readonly meta: Meta
    readonly entete: EnTetePage<LibelleRendezVous<L>>
  }

  /** WEB-3 et WEB-5 — la page destinée aux candidats à Madagascar. */
  readonly talents: {
    readonly meta: Meta
    readonly entete: EnTetePage<LibelleCandidature<L>>
  }

  /** WEB-6 — À propos. */
  readonly aPropos: {
    readonly meta: Meta
    readonly entete: EnTetePage<LibelleRendezVous<L>>
    readonly paragraphes: readonly [string, string, string]
    /** Les chiffres sont comptés à partir des listes, pas recopiés. */
    readonly reperes: {
      readonly marches: string
      readonly domaines: string
      readonly langues: string
    }
  }

  /** WEB-15 — le blog. */
  readonly blog: {
    readonly meta: Meta
    readonly entete: EnTetePage<LibelleRendezVous<L>>
    readonly lire: string
    /** Servi quand la liste d'articles est vide — la structure existe avant le contenu. */
    readonly vide: string
    readonly retour: string
    readonly publieLe: string
    /** L'onglet qui ne filtre rien. Les autres viennent des categories des articles. */
    readonly filtreTout: string
    /** La pastille citron de l'article mis en avant. */
    readonly aLaUne: string
    /** Le bloc en pointilles qui ferme la liste. */
    readonly suite: {
      readonly titre: string
      readonly texte: string
      readonly cta: string
    }
    /** Le bloc d'appel du design du blog : deux boutons, pas deux cartes. */
    readonly appel: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
      readonly ctaPrincipal: LibelleRendezVous<L>
      readonly ctaSecondaire: LibelleCandidature<L>
    }
  }

  /** WEB-7 — Contact, par le calendrier Cal.com. */
  readonly contact: {
    readonly meta: Meta
    readonly entete: EnTetePage<LibelleRendezVous<L>>
    /** Explique l'absence de formulaire : le site n'a pas de serveur (WEB-10). */
    readonly mention: string
  }
}
