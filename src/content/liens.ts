// Les deux destinations sortantes du site. Vides tant qu'elles ne sont pas
// arretees : `tests/liens.spec.ts` echoue, et un bouton mort ne peut pas partir
// en production par oubli. Voir docs/decisions/0007.
//
// Une seule constante par destination, jamais un href recopie : le bouton
// « Deposer ma candidature » parait a quatre endroits (WEB-1, WEB-2, WEB-3).

/**
 * Decision 0007 — TRANCHEE le 8 septembre 2026 : le portail public des
 * candidats.
 *
 * Les trois issues que 0007 laissait ouvertes etaient un courriel, un
 * formulaire tiers, ou « le portail `cv.agencemaldia.com` QUAND IL EXISTERA ».
 * Il existe : le depot `cv/` sert le formulaire public, ses seize champs, la
 * verification humaine et le stockage des fichiers. Et 0008 avait deja ARRETE
 * ce sous-domaine pour ce role precis.
 *
 * Le courriel avait ete ecarte par 0007 elle-meme, et l'argument tient : une
 * adresse publiee sur un site ne se retire pas, elle continue de recevoir des
 * candidatures des mois apres que le portail existe, et personne ne les lit.
 *
 * CE LIEN NE FONCTIONNERA QU'UNE FOIS `cv/` DEPLOYE. C'est un fait de mise en
 * ligne, pas une decision en attente : le sous-domaine est arrete, l'application
 * est ecrite. La porte de verification de `0007` ne protege plus contre ca —
 * elle verifie desormais la FORME de l'adresse, comme `tests/liens.spec.ts`
 * annoncait qu'il faudrait le faire.
 */
export const DESTINATION_CANDIDATURE = 'https://cv.agencemaldia.com'

/** WEB-7 — le calendrier Cal.com deja utilise par le client. */
export const DESTINATION_RENDEZ_VOUS = ''

/**
 * Ou part un formulaire de la page Contact.
 *
 * Vide, et c'est la seule raison pour laquelle les deux boutons d'envoi sont
 * desactives : cette application est un export statique, sans serveur pour
 * recevoir un envoi ni stockage pour un CV (WEB-10). Un formulaire qui avale
 * une candidature sans destinataire est pire qu'un formulaire absent — le
 * candidat croit avoir postule.
 *
 * La remplir demande trois reponses du client : ou arrivent les demandes, ou
 * vivent les CV, et qui repond. Voir decision 0019.
 */
export const DESTINATION_FORMULAIRE = ''

/**
 * L'adresse du calendrier telle qu'elle s'affiche : sans protocole ni barre
 * finale.
 *
 * Derivee de la constante et non recopiee. Le design ecrit
 * « cal.com/agencemaldia » en dur ; une adresse affichee qui ne correspond pas
 * au lien est pire qu'une adresse absente, et celle-ci n'est pas encore
 * arretee (decision 0007). Vide, la ligne ne s'affiche pas.
 */
export function etiquetteRendezVous(): string {
  return DESTINATION_RENDEZ_VOUS.replace(/^https?:\/\//, '').replace(/\/$/, '')
}
