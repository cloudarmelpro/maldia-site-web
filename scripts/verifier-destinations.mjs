/**
 * LA PORTE DES TROIS DESTINATIONS — `npm run destinations`.
 *
 * ── CE QU'ELLE REMPLACE ─────────────────────────────────────────────────────
 *
 * Les trois adresses etaient des constantes du code, et le test verifiait
 * qu'elles n'etaient pas vides. Depuis le 8 septembre 2026 elles viennent de
 * l'environnement : une adresse qui change ne doit pas demander un commit.
 *
 * Un test unitaire ne peut plus rien en dire — il tourne sans l'environnement
 * de deploiement, et une variable absente en developpement n'est pas un defaut.
 * La verification se fait donc AU MOMENT DE LA CONSTRUCTION, sur les valeurs
 * qui vont reellement etre inscrites dans le HTML.
 *
 * ── ELLE REFUSE, ELLE NE DEVINE PAS ─────────────────────────────────────────
 *
 * Aucune valeur par defaut, aucun repli. C'est la regle du socle, et la version
 * d'avant l'enfreignait : elle retombait sur l'adresse de production quand la
 * variable manquait. Un defaut silencieux deploie une valeur que personne n'a
 * relue.
 *
 * ── ELLE CHARGE L'ENVIRONNEMENT COMME NEXT LE FAIT ──────────────────────────
 *
 * `loadEnvConfig` de `@next/env` — le meme ordre de priorite, les memes
 * fichiers. Une verification qui lirait `.env` autrement mesurerait autre chose
 * que ce que la construction emploiera.
 */
// `@next/env` est un module CommonJS : il n'a pas d'export nomme, et l'importer
// comme s'il en avait echoue au chargement — pas a l'execution.
import env from '@next/env'

import { VARIABLES, refusDeLAdresse } from '../src/content/liens.ts'

env.loadEnvConfig(process.cwd())

const refus = []
for (const [nom, variable] of Object.entries(VARIABLES)) {
  const valeur = process.env[variable] ?? ''
  const cause = refusDeLAdresse(nom, valeur)
  if (cause !== null) refus.push({ nom, variable, cause })
}

if (refus.length === 0) {
  console.log(
    `Destinations : ${Object.keys(VARIABLES).length} sur ${Object.keys(VARIABLES).length}, formes verifiees.`,
  )
  for (const [nom, variable] of Object.entries(VARIABLES)) {
    console.log(`  ${nom.padEnd(12)} ${process.env[variable]}`)
  }
  process.exit(0)
}

console.error(`\nDestinations : ${refus.length} refus.\n`)
for (const r of refus) {
  console.error(`  ${r.nom} (${r.variable})`)
  console.error(`      ${r.cause}\n`)
}
console.error(
  [
    'Ces trois adresses sont inscrites dans le HTML au moment du `build` : il',
    "n'y a aucun serveur pour les relire quand quelqu'un clique. Une adresse",
    'absente donnerait un bouton mort, et le bouton de candidature parait a',
    'quatre endroits — WEB-1 dit que ce site sert les campagnes de recrutement.',
    '',
    'Elles se posent dans `.env` — voir `.env.example`, qui dit pour chacune',
    "d'ou vient la valeur et qui la decide.",
    '',
    "AUCUNE N'A DE VALEUR PAR DEFAUT, et c'est voulu : un defaut silencieux",
    "deploie une adresse que personne n'a relue.",
  ].join('\n'),
)
process.exit(1)
