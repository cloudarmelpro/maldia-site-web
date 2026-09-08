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
export const PORTAIL_CANDIDATS = 'https://cv.agencemaldia.com'

/**
 * La destination REELLE du bouton, remplacable a la CONSTRUCTION.
 *
 * ── POURQUOI UNE VARIABLE, ET POURQUOI CELLE-LA ─────────────────────────────
 *
 * En developpement, `cv/` tourne sur la boucle locale et le sous-domaine de
 * production ne resout pas : le bouton principal du site mene nulle part sur le
 * poste de qui travaille dessus.
 *
 * Ecrire l'adresse locale dans cette constante n'etait pas une option : ce
 * fichier est VERSIONNE, et `127.0.0.1` serait parti en production au premier
 * deploiement — un bouton mort, a sept endroits, sur le chemin de recrutement
 * que `WEB-1` decrit comme la raison d'etre du site.
 *
 * ── LA VALEUR PAR DEFAUT EST CELLE DE PRODUCTION, ET C'EST LE POINT ─────────
 *
 * Sans variable, on obtient `cv.agencemaldia.com`. Le mode de defaillance d'un
 * oubli est donc le BON comportement : un deploiement qui ne pose rien deploie
 * l'adresse juste. Une valeur par defaut vide, ou locale, aurait fait
 * l'inverse — et c'est la faute que ce depot commet le moins souvent parce
 * qu'il l'ecrit partout.
 *
 * ── ELLE EST FIGEE A LA CONSTRUCTION, PAS LUE A L'EXECUTION ────────────────
 *
 * Ce depot est un export statique : il n'y a aucun serveur pour lire une
 * variable au moment ou quelqu'un clique. Le prefixe `NEXT_PUBLIC_` dit
 * precisement cela — la valeur est inscrite dans le HTML au moment du `build`,
 * et changer la variable APRES demande de reconstruire. C'est une propriete a
 * connaitre, pas un defaut.
 *
 * C'est aussi la premiere variable d'environnement de ce depot, qui n'en lisait
 * aucune. Elle est documentee dans `.env.example`, et elle ne porte aucun
 * secret : une adresse publique, affichee dans chaque page.
 */
export const DESTINATION_CANDIDATURE =
  process.env.NEXT_PUBLIC_PORTAIL_CANDIDATS || PORTAIL_CANDIDATS

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
