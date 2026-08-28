'use client'

import { useState } from 'react'

import type { Langue } from '@/content/langues'
import type { Article, Contenu } from '@/content/types'
import { CarteArticle } from '@/components/sections/carte-article'
import { FOCUS } from '@/components/shared/focus'
import { Apparition } from '@/components/shared/apparition'
import { classes } from '@/components/shared/classes'
import { delaiDeGrille } from '@/components/shared/decalage'

/**
 * Les onglets de categorie et la grille qu'ils filtrent.
 *
 * **C'est le seul etat de la page du blog**, et c'est pour lui seul que ce
 * fichier porte `"use client"`. Il vivait dans `blog-liste`, qui emportait alors
 * dans le paquet client le hero, l'article a la une, son image, l'encart d'appel
 * et tous leurs composants — du balisage entierement statique. Meme motif que
 * `selecteur-profils` : la section hote reste rendue au serveur.
 *
 * Les onglets sont deduits des categories **de la grille** et non de tous les
 * articles : la vedette en est sortie, et filtrer sur sa categorie laisserait
 * une grille vide.
 */
export function BlogGrille({
  contenu,
  liste,
  langue,
}: {
  contenu: Contenu['blog']
  /** Les articles hors vedette, deja tries. */
  liste: readonly Article[]
  langue: Langue
}) {
  const categories = [...new Set(liste.map((article) => article.categorie))]
  const onglets = [contenu.filtreTout, ...categories]

  const [filtre, setFiltre] = useState(0)
  const visibles = filtre === 0 ? liste : liste.filter((a) => a.categorie === onglets[filtre])

  return (
    <>
      {liste.length > 0 ? (
        <div role="group" aria-label={contenu.retour} className="flex flex-wrap gap-2">
          {onglets.map((libelle, indice) => {
            const actif = indice === filtre
            return (
              <button
                key={libelle}
                type="button"
                aria-pressed={actif}
                onClick={() => setFiltre(indice)}
                // La cible tactile passe devant jusqu'a `large`, ou la
                // navigation de bureau apparait.
                // `transition-colors` de Tailwind inclut `outline-color` :
                // l'anneau de focus arriverait en fondu depuis la couleur du
                // texte au lieu de paraitre net.
                className={classes(
                  'min-h-11.5 min-w-11.5 cursor-pointer rounded-liste px-4 etiquette text-[0.625rem] whitespace-nowrap transition-[background-color,color] duration-200 large:min-h-[2.125rem] large:min-w-0 large:px-[0.8125rem]',
                  FOCUS,
                  actif ? 'bg-primaire text-white' : 'bg-primaire/7 text-encre-2',
                )}
              >
                {libelle}
              </button>
            )
          })}
        </div>
      ) : null}

      {visibles.length === 0 ? (
        <p className="max-w-[52ch] text-[1.0625rem] text-encre-2">{contenu.vide}</p>
      ) : (
        <ul className="grid grid-cols-1 gap-3.5 duo:grid-cols-2 voies:grid-cols-3">
          {visibles.map((article, indice) => (
            <li key={article.identifiant} className="flex min-w-0">
              <Apparition delai={delaiDeGrille(indice)} className="flex min-w-0 grow">
                <CarteArticle article={article} langue={langue} deLecture={contenu.deLecture} />
              </Apparition>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
