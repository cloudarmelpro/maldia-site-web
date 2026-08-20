import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// L'extracteur de Tailwind lit les classes comme des jetons dans le fichier
// source. Une classe collee a une interpolation — `py-[clamp(...)]${x}` — est
// lue avec le debut de l'expression : elle devient un candidat invalide, et la
// regle CSS n'est jamais engendree. Aucune erreur n'est levee, la page perd
// simplement le style.
//
// C'est arrive : le padding vertical de toutes les sections a disparu de cette
// facon, et l'espacement du site avec lui.
const ADJACENCE = /[A-Za-z0-9)\]_-]\$\{/

// Parcours a la main plutot que `globSync` : celui de `node:fs` n'est pas dans
// les types de Node 20, qui sont ceux du depot.
function fichiers(dossier: string): string[] {
  return readdirSync(dossier, { withFileTypes: true }).flatMap((entree) => {
    const chemin = join(dossier, entree.name)
    if (entree.isDirectory()) return fichiers(chemin)
    return entree.name.endsWith('.tsx') ? [chemin] : []
  })
}

describe('classes Tailwind', () => {
  it('aucune classe n est collee a une interpolation', () => {
    const fautives: string[] = []

    for (const chemin of fichiers('src')) {
      const lignes = readFileSync(chemin, 'utf8').split('\n')
      lignes.forEach((ligne, indice) => {
        // Seules les listes de classes sont concernees : une interpolation dans
        // un identifiant ou une URL est legitime.
        if (!ligne.includes('className')) return
        if (ADJACENCE.test(ligne)) {
          fautives.push(`${chemin}:${indice + 1} ${ligne.trim().slice(0, 90)}`)
        }
      })
    }

    expect(fautives, fautives.join('\n')).toEqual([])
  })
})
