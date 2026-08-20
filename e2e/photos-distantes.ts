import type { Page } from '@playwright/test'

// Un PNG 1x1 transparent. Il ne sert qu'a repondre : la taille du bloc vient du
// ratio pose en CSS, pas des dimensions du fichier.
const PIXEL = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64',
)

/**
 * Coupe les requetes vers les photos de remplacement.
 *
 * Sans ca, `page.goto` attend l'evenement `load`, donc les photos hebergees
 * chez Unsplash (voir src/content/photos.ts). Sept navigateurs en parallele s'y
 * font limiter, et le test echoue par depassement de delai — un echec qui
 * ressemble a un defaut de la page alors qu'il vient d'un tiers.
 *
 * La geometrie mesuree est identique : `Visuel` pose le ratio en CSS
 * precisement pour que la mise en page ne depende pas du fichier. Ce reroutage
 * disparaitra avec les photos definitives, qui vivront dans `public/`.
 */
export async function sansPhotosDistantes(page: Page) {
  await page.route('https://images.unsplash.com/**', (route) =>
    route.fulfill({ status: 200, contentType: 'image/png', body: PIXEL }),
  )
}
