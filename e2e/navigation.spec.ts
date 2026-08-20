import { expect, test } from '@playwright/test'

import { chemin, LANGUES, PAGES } from '@/content/langues'
import { CONTENUS } from '@/content/contenus'
import { sansPhotosDistantes } from './photos-distantes'

// WEB-11 exige un menu de six entrees et un « Accueil » qui ramene toujours a la
// page principale. Une classe Tailwind ne le prouve pas : il faut cliquer.
//
// Le menu de bureau et le panneau mobile sont deux arbres differents. Sous 1024 px
// c'est le second qui est visible, et c'est celui-la qu'il faut ouvrir.
const RUPTURE_MENU = 1024

async function ouvrirLeMenuSiMobile(page: import('@playwright/test').Page, largeur: number) {
  if (largeur >= RUPTURE_MENU) return
  await page.getByRole('button', { name: 'Menu', exact: true }).first().click()
}

for (const langue of LANGUES) {
  const { navigation } = CONTENUS[langue].commun.enTete

  test.describe(`navigation ${langue}`, () => {
    test.beforeEach(async ({ page }) => {
      await sansPhotosDistantes(page)
    })

    test('chaque entree du menu mene a sa page', async ({ page, viewport }) => {
      const largeur = viewport?.width ?? RUPTURE_MENU

      for (const lien of navigation) {
        await page.goto(chemin(langue, 'accueil'))
        await ouvrirLeMenuSiMobile(page, largeur)

        await page.getByRole('link', { name: lien.libelle, exact: true }).first().click()
        await page.waitForURL(`**${chemin(langue, lien.page)}`)

        // Une page servie est une page qui a un titre : sans ce controle, une
        // redirection vers une coquille vide passerait.
        await expect(page.locator('h1')).toHaveCount(1)
      }
    })

    test('la page courante est annoncee au clavier, pas seulement coloree', async ({
      page,
      viewport,
    }) => {
      const largeur = viewport?.width ?? RUPTURE_MENU
      await page.goto(chemin(langue, 'services'))
      await ouvrirLeMenuSiMobile(page, largeur)

      const courante = page.locator('header a[aria-current="page"]')
      await expect(courante.first()).toHaveText(
        navigation.find((lien) => lien.page === 'services')!.libelle,
      )
    })

    test('le changement de langue reste sur la meme page', async ({ page, viewport }) => {
      const largeur = viewport?.width ?? RUPTURE_MENU
      const autre = langue === 'fr' ? 'en' : 'fr'

      for (const page_cible of PAGES) {
        await page.goto(chemin(langue, page_cible))
        await ouvrirLeMenuSiMobile(page, largeur)

        // Le pied porte l'endonyme, le panneau mobile le code de langue.
        const selecteur = page.locator(`a[hreflang="${autre}"]`).first()
        await selecteur.click()
        await page.waitForURL(`**${chemin(autre, page_cible)}`)
      }
    })
  })
}
