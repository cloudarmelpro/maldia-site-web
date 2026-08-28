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

/** WEB-6 — un principe de la page À propos. Son rang est calculé, jamais recopié. */
export type Principe = {
  readonly intitule: string
  readonly titre: string
  readonly texte: string
}

/**
 * WEB-6 — un côté du fonctionnement : Madagascar d'abord, les marchés ensuite.
 *
 * `texte` et `valeur` peuvent porter le jeton `{nombre}`, remplacé au rendu par
 * `NOMBRE_CANDIDATS`. Le nombre de candidats ne s'écrit qu'à un seul endroit
 * (WEB-13) : l'inscrire ici le ferait diverger entre les deux langues.
 */
export type Cote = {
  readonly lieu: string
  readonly titre: string
  readonly texte: string
  readonly valeur: string
  readonly legende: string
}

/** Une catégorie de profils recrutés (WEB-5), telle que le sélecteur l'affiche. */
export type Profil = {
  readonly nom: string
  /** La famille du design : Technique, Creation, Marketing, Operations. */
  readonly famille: string
  readonly description: string
  /** La version courte de `description`, pour les cartes de frise. */
  readonly resume: string
  /** Les outils sur une seule ligne, pour le pied des cartes de frise. */
  readonly outils: string
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

/**
 * Un champ du formulaire de la page Contact.
 *
 * `nom` est l'attribut `name` : c'est lui que lira le point de réception le
 * jour où il existera, et il ne se traduit donc pas.
 */
export type ChampFormulaire =
  | {
      readonly type: 'texte' | 'courriel'
      readonly nom: string
      readonly libelle: string
      readonly exemple: string
    }
  | {
      readonly type: 'choix'
      readonly nom: string
      readonly libelle: string
      readonly options: readonly string[]
    }
  | {
      readonly type: 'zone'
      readonly nom: string
      readonly libelle: string
      readonly exemple: string
    }
  | {
      readonly type: 'fichier'
      readonly nom: string
      readonly libelle: string
      readonly titre: string
      readonly precision: string
    }

/** Une des deux voies de la page Contact, chacune avec son formulaire. */
export type VoieContact = {
  readonly intitule: string
  readonly mention: string
  readonly titre: string
  readonly champs: readonly ChampFormulaire[]
  readonly envoyer: string
  readonly note: string
}

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
 * Un bloc du corps d'un article.
 *
 * Une union discriminée plutôt qu'une suite de paragraphes : le design pose un
 * chapeau, des titres de section, une citation et une liste à puces. Sans type
 * de bloc, il faudrait deviner le rôle d'une chaîne à sa position.
 *
 * Le sommaire est **déduit** des blocs `titre`, jamais écrit à côté : une
 * section renommée sans son entrée de sommaire donnerait un lien mort.
 */
export type BlocArticle =
  | { readonly type: 'chapeau'; readonly texte: string }
  | { readonly type: 'titre'; readonly texte: string }
  | { readonly type: 'paragraphe'; readonly texte: string }
  | { readonly type: 'citation'; readonly texte: string }
  | { readonly type: 'liste'; readonly items: readonly string[] }

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
  /** Les trois étiquettes de la ligne de signature. */
  readonly etiquettes: readonly [string, string, string]
  readonly corps: readonly BlocArticle[]
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
    /** Le premier arret de tabulation de chaque page — WCAG 2.4.1. */
    readonly allerAuContenu: string
    /**
     * Sous le bouton d'envoi, TANT QUE `DESTINATION_FORMULAIRE` est vide. Le
     * bouton est alors eteint, et la note du contenu decrit un formulaire qui
     * marche : sans ceci, le candidat lit un refus qui ne dit pas quoi faire.
     */
    readonly formulaireFerme: string
    /**
     * La page 404. Elle est servie pour une adresse qui ne correspond a aucune
     * route, donc sans langue connue : les deux versions paraissent cote a
     * cote, et le visiteur choisit la sienne.
     */
    readonly nonTrouve: {
      readonly intitule: string
      readonly titre: string
      readonly texte: string
      readonly retour: string
      readonly metaTitre: string
      readonly metaDescription: string
    }
  }

  /** WEB-2 — l'accueil, et le hero du design. */
  readonly accueil: {
    readonly meta: Meta
    readonly hero: {
      /** L'intitulé posé au-dessus du titre : l'offre et le lieu, en capitales. */
      readonly intitule: string
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
    /** L'intitulé de la bande des six chiffres, sur cette page seule. */
    readonly obtenez: string
    /** Le titre et la phrase de cette même bande. */
    readonly engagements: {
      readonly titre: string
      readonly description: string
    }
    /**
     * Le hero vert de la page. `description` et `mention` ne sont rendues nulle
     * part : le design n'y laisse que l'intitulé, le titre et les marchés.
     */
    readonly entete: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
      /** Sous l'argumentaire chiffré : le délai annoncé est une moyenne. */
      readonly mention: string
    }
    /**
     * Les postes confiés. Les six familles viennent de `commun.profils.liste` —
     * seul l'habillage est propre à cette page.
     */
    readonly postes: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
      /**
       * L'appel qui ferme la page. Il porte son propre intitulé, et son `titre`
       * n'est rendu nulle part : le design le remplace par cet intitulé.
       */
      readonly encart: {
        readonly intitule: string
        readonly titre: string
        readonly texte: string
        readonly cta: LibelleRendezVous<L>
      }
    }
  }

  /** WEB-3 et WEB-5 — la page destinée aux candidats à Madagascar. */
  readonly talents: {
    readonly meta: Meta
    /**
     * Le hero vert de la page : le `h1`, l'appel à candidater et les formats de
     * CV acceptés. Le libellé de l'appel reste celui de `encart.cta` — le
     * cahier n'en prévoit qu'un seul (WEB-3).
     */
    readonly entete: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
      /** Les formats acceptés, posés à côté de l'appel. */
      readonly mention: string
    }
    /** L'intitulé de la bande des trois repères — elle n'a pas de titre. */
    readonly principesIntitule: string
    readonly principes: readonly [Principe, Principe, Principe]
    readonly encart: {
      readonly intitule: string
      readonly titre: string
      readonly texte: string
      readonly cta: LibelleCandidature<L>
    }
    /**
     * L'en-tête seul : les profils affichés viennent de `commun.profils.liste`,
     * que la page Services rend aussi. Écrits ici, les deux divergeraient.
     */
    readonly domaines: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
    }
    readonly deroule: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
      /** `cote: 'client'` désigne le candidat ici — c'est ce côté que le design met en vert. */
      readonly liste: readonly [Etape, Etape, Etape, Etape]
    }
  }

  /** WEB-6 — À propos. */
  readonly aPropos: {
    readonly meta: Meta
    /**
     * Pas d'`EnTetePage` ici : le hero vert de la page ne porte ni bouton ni
     * mention, seulement l'intitulé, le titre et sa phrase d'appui.
     */
    readonly entete: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
    }
    readonly chapeau: string
    readonly chapeauSuite: string
    readonly principesIntitule: string
    readonly principes: readonly [Principe, Principe, Principe]
    readonly fonctionnement: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
      readonly cotes: readonly [Cote, Cote]
    }
    readonly reperes: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
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
    /** « de lecture », accolé à la durée dans la ligne sous le titre. */
    readonly deLecture: string
    /** L'intitulé du sommaire d'un article. */
    readonly sommaire: string
    /** Qui signe les articles. Le même pour tous — il n'y a pas d'auteur nommé. */
    readonly auteur: {
      readonly nom: string
      readonly lieu: string
    }
    /** Le bloc sombre qui ferme le corps d'un article. */
    readonly appelArticle: {
      readonly titre: string
      readonly texte: string
      readonly cta: LibelleRendezVous<L>
    }
    /** La section qui suit un article : les autres articles. */
    readonly serie: {
      readonly intitule: string
      readonly titre: string
    }
    /** L'onglet qui ne filtre rien. Les autres viennent des categories des articles. */
    readonly filtreTout: string
    /** La pastille de l'article mis en avant. */
    readonly aLaUne: string
    /** Le bloc en pointilles qui ferme la liste. */
    readonly suite: {
      readonly titre: string
      readonly texte: string
      readonly cta: string
    }
  }

  /** WEB-7 — Contact, par le calendrier Cal.com. */
  readonly contact: {
    readonly meta: Meta
    readonly entete: EnTetePage<LibelleRendezVous<L>>

    /** La section du calendrier : l'emplacement de l'intégration Cal.com. */
    readonly reservation: {
      readonly intitule: string
      readonly titre: string
      readonly description: string
      readonly evenement: string
      readonly fuseau: string
      /** Ce qui s'affiche à la place de l'intégration tant qu'elle n'a pas d'adresse. */
      readonly emplacement: {
        readonly titre: string
        readonly texte: string
      }
      readonly mention: string
      readonly cta: string
    }

    /** Les deux onglets : « je cherche du personnel », « je cherche un poste ». */
    readonly onglets: readonly [string, string]

    /**
     * Les deux voies du design, chacune avec son formulaire.
     *
     * Le bouton d'envoi est désactivé tant que `DESTINATION_FORMULAIRE` est
     * vide : sans point de réception, un envoi ne partirait nulle part. Voir
     * décision 0019.
     */
    readonly voies: readonly [VoieContact, VoieContact]

    /** La carte sombre du calendrier, dans la colonne de droite. */
    readonly calendrier: {
      readonly intitule: string
      readonly titre: string
      readonly texte: string
      readonly creneaux: readonly [string, string, string, string]
      readonly cta: string
    }

    /** Les lignes de coordonnées. Les valeurs viennent du pied et des marchés. */
    readonly coordonnees: {
      /** L'intitulé de la section, au-dessus des cartes. */
      readonly intitule: string
      readonly courriel: string
      readonly bureau: string
      readonly marches: string
    }

    /** Explique l'absence de formulaire : le site n'a pas de serveur (WEB-10). */
    readonly mention: string
  }
}
