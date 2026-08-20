import { expect, test } from '@playwright/test'

import { identifiantsArticles } from '@/content/articles'
import { chemin, cheminArticle, LANGUES, PAGES } from '@/content/langues'
import { sansPhotosDistantes } from './photos-distantes'

// WEB-9 demande « adapté au mobile ». Ces mesures sont ce que cette phrase veut dire
// concrètement — et leur pendant grand écran, que le cahier ne nomme pas mais que
// l'audience entreprise juge.
//
// La liste vient de `PAGES` et non d'une énumération à la main : une page ajoutée
// au menu entre d'elle-même dans le contrôle. Sans ça, elle y échapperait sans que
// rien ne le signale.
//
// Un seul article par langue : les six partagent le même gabarit, et les mesurer
// tous multiplierait la durée de la suite sans rien mesurer de neuf.
const CHEMINS = [
  ...LANGUES.flatMap((langue) => PAGES.map((page) => chemin(langue, page))),
  ...LANGUES.map((langue) => cheminArticle(langue, identifiantsArticles(langue)[0])),
]

const CIBLE_TACTILE_MINIMALE = 44

// 75 caractères est l'optimum de lisibilité. 90 est le plafond au-delà duquel l'œil
// ne retrouve plus le début de la ligne suivante — c'est celui qu'on tient, pour
// laisser à la direction artistique la marge du choix.
const CARACTERES_PAR_LIGNE_MAXIMUM = 90

for (const adresse of CHEMINS) {
  test.describe(adresse, () => {
    test.beforeEach(async ({ page }) => {
      await sansPhotosDistantes(page)
    })

    test('aucun débordement horizontal', async ({ page }) => {
      await page.goto(adresse)

      const { documentWidth, viewportWidth } = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }))

      // Un pixel de tolérance : un arrondi de sous-pixel n'est pas un débordement.
      expect(
        documentWidth,
        'la page est plus large que la fenêtre — un défilement horizontal apparaît',
      ).toBeLessThanOrEqual(viewportWidth + 1)
    })

    test('les cibles tactiles font au moins 44 px', async ({ page, viewport }) => {
      test.skip(!viewport || viewport.width >= 768, 'ne vaut que sous 768 px')

      await page.goto(adresse)

      const trop_petites = await page.evaluate((minimum) => {
        const interactifs = document.querySelectorAll(
          'a[href], button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])',
        )
        const fautives: string[] = []

        for (const el of interactifs) {
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) continue // masqué : hors sujet
          if (r.width < minimum || r.height < minimum) {
            const texte = (el.textContent ?? '').trim().slice(0, 30)
            fautives.push(
              `${el.tagName.toLowerCase()} « ${texte} » — ${Math.round(r.width)}×${Math.round(r.height)} px`,
            )
          }
        }
        return fautives
      }, CIBLE_TACTILE_MINIMALE)

      expect(trop_petites, trop_petites.join(' | ')).toEqual([])
    })

    // Le defaut du grand ecran : sans largeur maximale, un paragraphe couvre toute la
    // fenetre. La mesure se fait en caracteres, pas en pixels — c'est la taille de
    // police qui decide, et une largeur de 900 px est confortable en 20 px, illisible
    // en 14 px.
    test('les lignes de texte ne dépassent pas 90 caractères', async ({ page }) => {
      await page.goto(adresse)

      const trop_longues = await page.evaluate((maximum) => {
        // La largeur du « 0 » dans la police calculée : c'est la definition de l'unité
        // CSS `ch`. Un canvas la donne sans toucher au document.
        const contexte = document.createElement('canvas').getContext('2d')
        if (!contexte) return []

        const fautifs: string[] = []

        // Un conteneur n'a pas de longueur de ligne : son texte vit dans ses
        // enfants, qui ont leur propre largeur. Mesurer la boite du parent
        // signalait la FAQ, dont chaque reponse est deja plafonnee a 62ch.
        const BLOCS = 'p, div, ul, ol, li, h1, h2, h3, h4, h5, h6, section, article'

        for (const el of document.querySelectorAll('p, li, blockquote')) {
          if (el.querySelector(BLOCS)) continue

          const texte = (el.textContent ?? '').trim()
          if (texte.length < 60) continue // trop court pour former une ligne pleine

          const style = getComputedStyle(el)
          contexte.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
          const largeur_du_zero = contexte.measureText('0').width
          if (largeur_du_zero === 0) continue

          const r = el.getBoundingClientRect()
          const caracteres = Math.round(r.width / largeur_du_zero)

          if (caracteres > maximum) {
            fautifs.push(
              `${el.tagName.toLowerCase()} « ${texte.slice(0, 30)}… » — ${caracteres} car./ligne sur ${Math.round(r.width)} px`,
            )
          }
        }
        return fautifs
      }, CARACTERES_PAR_LIGNE_MAXIMUM)

      expect(trop_longues, trop_longues.join(' | ')).toEqual([])
    })

    // La pilule d'intitule est un item de la grille a deux colonnes. Un item de
    // grille s'etire par defaut : sans `justify-self`, son fond couvrait les
    // 190 px de la colonne au lieu de serrer son texte. `self-start` seul ne
    // l'attrape pas — il porte sur l'axe vertical.
    test('les pilules serrent leur texte', async ({ page }) => {
      await page.goto(adresse)

      const etirees = await page.evaluate(() => {
        const fautives: string[] = []

        for (const el of document.querySelectorAll('[data-pilule]')) {
          const boite = el.getBoundingClientRect()
          if (boite.width === 0) continue

          const plage = document.createRange()
          plage.selectNodeContents(el)
          const contenu = plage.getBoundingClientRect()

          const style = getComputedStyle(el)
          const attendu =
            contenu.width + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)

          // Deux pixels de tolerance : un arrondi de sous-pixel n'est pas un etirement.
          if (boite.width > attendu + 2) {
            fautives.push(
              `« ${(el.textContent ?? '').trim()} » — ${Math.round(boite.width)} px pour ${Math.round(attendu)} px de contenu`,
            )
          }
        }
        return fautives
      })

      expect(etirees, etirees.join(' | ')).toEqual([])
    })
  })
}
