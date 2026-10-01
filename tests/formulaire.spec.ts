import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { fr } from '@/content/fr'

// Depuis l'amendement de 0019, le formulaire part en production SANS point de
// reception. Plus aucune porte de construction ne l'arrete : ce bouton
// desactive est la seule chose qui empeche une candidature de partir dans le
// vide, et c'est ce fichier qui le tient.

// La constante est lue au chargement du module : on recharge pour chaque valeur.
async function rendre(destination: string): Promise<string> {
  vi.stubEnv('NEXT_PUBLIC_RECEPTION_FORMULAIRE', destination)
  vi.resetModules()
  const { FormulaireContact } = await import('@/components/sections/formulaire-contact')
  return renderToStaticMarkup(
    createElement(FormulaireContact, {
      onglets: fr.contact.onglets,
      voies: fr.contact.voies,
      noteFermee: fr.commun.formulaireFerme,
      className: '',
    }),
  )
}

const boutonEnvoi = (html: string) => html.match(/<button[^>]*type="submit"[^>]*>/)?.[0] ?? ''

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('0019 — le formulaire statique ne laisse rien partir', () => {
  it('sans point de reception, le bouton d envoi est desactive et le formulaire n a aucune action', async () => {
    const html = await rendre('')
    expect(boutonEnvoi(html), 'le bouton d envoi doit exister').not.toBe('')
    expect(boutonEnvoi(html)).toContain('disabled')
    expect(html).not.toMatch(/<form[^>]*\saction=/)
  })

  it('sans point de reception, la note qui le dit est affichee', async () => {
    // Un bouton grise sans explication se lit comme une panne.
    expect(await rendre('')).toContain(fr.commun.formulaireFerme)
  })

  it('le controle negatif : branche, le bouton s active et le formulaire part vers son adresse', async () => {
    // Sans ce cas, un bouton desactive en toutes circonstances passerait les
    // deux precedents.
    const html = await rendre('https://formulaire.test/envoi')
    expect(boutonEnvoi(html)).not.toContain('disabled')
    expect(html).toContain('action="https://formulaire.test/envoi"')
  })
})
