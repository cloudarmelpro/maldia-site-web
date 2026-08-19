import { defineConfig, devices } from '@playwright/test'

// Des appareils reels, pas les points de rupture de Tailwind.
//
// 360 px domine encore le parc Android, et l'audience de recrutement est a
// Madagascar, sur mobile. A l'autre bout, l'audience entreprise est au Quebec ou en
// Europe sur de grands moniteurs : un site verifie seulement jusqu'a 1280 px n'a
// jamais ete verifie pour elle.
//
// La hauteur n'est pas decorative : 1440x900 offre proportionnellement MOINS de
// place verticale qu'un telephone, et c'est la que la ligne de flottaison se perd.
const ECRANS = [
  { nom: 'telephone-360', largeur: 360, hauteur: 740 },
  { nom: 'telephone-390', largeur: 390, hauteur: 844 },
  { nom: 'tablette-768', largeur: 768, hauteur: 1024 },
  { nom: 'portable-1280', largeur: 1280, hauteur: 800 },
  { nom: 'portable-1440', largeur: 1440, hauteur: 900 },
  { nom: 'bureau-1920', largeur: 1920, hauteur: 1080 },
  { nom: 'large-2560', largeur: 2560, hauteur: 1440 },
]

export default defineConfig({
  testDir: './e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',

  use: { baseURL: 'http://localhost:3000' },

  projects: ECRANS.map(({ nom, largeur, hauteur }) => ({
    name: nom,
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: largeur, height: hauteur },
      hasTouch: largeur < 768,
    },
  })),

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
