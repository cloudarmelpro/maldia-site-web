// Les trois destinations sortantes du site. Elles viennent TOUTES de
// l'environnement, et aucune n'a de valeur par defaut.
//
// Une seule constante par destination, jamais un href recopie : le bouton
// « Deposer ma candidature » parait a quatre endroits (WEB-1, WEB-2, WEB-3).

/**
 * POURQUOI L'ENVIRONNEMENT, ET PLUS LE CODE — 8 septembre 2026.
 *
 * ── CE QUE LA VERSION D'AVANT FAISAIT DE TRAVERS ────────────────────────────
 *
 * L'adresse du portail etait ecrite en dur, avec un remplacement possible pour
 * le developpement. Deux defauts, et Maldia a nomme le premier :
 *
 * **Une adresse qui change demande alors de changer le CODE.** Un commit, une
 * relecture, un deploiement — pour une chaine de caracteres qui n'est pas une
 * decision d'ingenierie mais un fait d'exploitation. Le jour ou le portail
 * demenage, on recommence.
 *
 * **Et la valeur par defaut etait elle-meme un choix que personne n'avait
 * fait.** Elle passait pour une protection : oublier la variable donnait
 * l'adresse de production. Mais c'est exactement ce que le socle interdit
 * partout ailleurs — « aucune valeur par defaut, une cle absente fait REFUSER ».
 * Un defaut silencieux deploie une valeur que personne n'a relue, et le jour ou
 * elle est fausse, rien ne le dit.
 *
 * ── CE QUI REMPLACE LA PROTECTION ───────────────────────────────────────────
 *
 * `npm run destinations`, appelee par `prebuild`. Elle REFUSE la construction si
 * une adresse manque ou si sa forme est mauvaise. On ne devine plus : on
 * s'arrete, et le message dit quoi poser.
 *
 * C'est la meme conduite que `cv/` et `annuaire/` tiennent sur leurs propres
 * variables — echec ferme, jamais de substitut.
 *
 * ── ELLES SONT FIGEES A LA CONSTRUCTION ─────────────────────────────────────
 *
 * Ce depot est un export statique : aucun serveur ne relit une variable quand
 * quelqu'un clique. Le prefixe `NEXT_PUBLIC_` dit precisement cela — la valeur
 * est inscrite dans le HTML au `build`. Changer l'environnement APRES ne change
 * rien tant qu'on n'a pas reconstruit, et rien ne le signale.
 */

/** Le portail public des candidats — `WEB-1`, `WEB-2`, `WEB-3`, decision 0007. */
export const DESTINATION_CANDIDATURE = process.env.NEXT_PUBLIC_PORTAIL_CANDIDATS ?? ''

/** Le calendrier de prise de rendez-vous — `WEB-7`. */
export const DESTINATION_RENDEZ_VOUS = process.env.NEXT_PUBLIC_CALENDRIER ?? ''

/**
 * Ou part un formulaire de la page Contact — decision 0019.
 *
 * Vide, le formulaire est STATIQUE : affiche, boutons d'envoi desactives (0030).
 * `tests/formulaire.spec.ts` tient le bouton desactive.
 */
export const DESTINATION_FORMULAIRE = process.env.NEXT_PUBLIC_RECEPTION_FORMULAIRE ?? ''

/**
 * L'adresse du calendrier telle qu'elle s'affiche : sans protocole ni barre
 * finale.
 *
 * Derivee de la constante et non recopiee. Le design ecrit
 * « cal.com/agencemaldia » en dur ; une adresse affichee qui ne correspond pas
 * au lien est pire qu'une adresse absente. Vide, la ligne ne s'affiche pas.
 */
export function etiquetteRendezVous(): string {
  return DESTINATION_RENDEZ_VOUS.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/* ── LA VERIFICATION DES ADRESSES ─────────────────────────────────────────── */

/** Une destination, telle que la verification la nomme. */
export type NomDestination = 'candidature' | 'rendezVous' | 'formulaire'

export const VARIABLES: Record<NomDestination, string> = {
  candidature: 'NEXT_PUBLIC_PORTAIL_CANDIDATS',
  rendezVous: 'NEXT_PUBLIC_CALENDRIER',
  formulaire: 'NEXT_PUBLIC_RECEPTION_FORMULAIRE',
}

/**
 * Celles qui peuvent rester vides — decision 0030. Retirer un nom de cet
 * ensemble REARME la porte : son absence est de nouveau refusee.
 */
export const FACULTATIVES: ReadonlySet<NomDestination> = new Set([
  'candidature',
  'rendezVous',
  'formulaire',
])

/**
 * Ce qui rend une adresse INACCEPTABLE, ou `null` si elle passe.
 *
 * ── CE QUE CETTE FONCTION REFUSE, ET POURQUOI CHAQUE REGLE EXISTE ───────────
 *
 * Elle ne juge PAS le choix — c'est celui de Maldia, et il vit dans
 * l'environnement pour pouvoir changer sans toucher au code. Elle refuse ce qui
 * serait un DEFAUT quel que soit le choix :
 *
 * **Une adresse relative.** Ces trois boutons partent vers un autre domaine.
 * Un chemin menerait a une page de ce site qui n'existe pas.
 *
 * **Le sous-domaine d'administration, pour la candidature.** 0008 l'a arrete
 * pour l'administration PRIVEE : un candidat qui y arrive voit un refus. Le
 * portail public est un autre nom.
 *
 * **Un point de reception de formulaire en clair.** Il recoit un nom, un
 * courriel, un besoin et un CV. `http://` les enverrait lisibles sur le reseau.
 *
 * **Un `mailto:` pour la candidature.** 0007 l'a ecarte, et son motif survit a
 * la decision : « une adresse publiee sur un site ne se retire pas — elle
 * continue de recevoir des candidatures des mois apres que le portail existe,
 * et personne ne les lit ». Pour l'employer quand meme, il faut amender 0007,
 * pas contourner cette ligne.
 */
export function refusDeLAdresse(
  nom: NomDestination,
  adresse: string,
  facultatives: ReadonlySet<NomDestination> = FACULTATIVES,
): string | null {
  if (adresse.trim() === '') {
    return facultatives.has(nom) ? null : `absente — poser ${VARIABLES[nom]}`
  }

  if (nom === 'candidature' && adresse.startsWith('mailto:')) {
    return 'le courriel a ete ecarte par la decision 0007 ; l amender avant de le poser'
  }

  let url: URL
  try {
    url = new URL(adresse)
  } catch {
    return `« ${adresse} » n est pas une adresse absolue — il en faut une, ce bouton quitte ce site`
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return `protocole « ${url.protocol} » — il faut http ou https`
  }

  if (nom === 'candidature' && url.hostname.startsWith('admin.')) {
    return `« ${url.hostname} » est l administration privee (0008) — un candidat y verrait un refus`
  }

  if (nom === 'formulaire' && url.protocol !== 'https:') {
    return 'un point de reception en clair : il recoit un CV et des donnees personnelles'
  }

  return null
}
