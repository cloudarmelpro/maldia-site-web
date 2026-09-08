import type { Contenu } from '@/content/types'
import { TeteSection } from '@/components/shared/tete-section'
import { Apparition } from '@/components/shared/apparition'
import { Revelation } from '@/components/shared/revelation'
import { Section } from '@/components/shared/section'
import { SelecteurProfils } from '@/components/shared/selecteur-profils'

/**
 * WEB-5 — les profils sur l'accueil.
 *
 * **C'est un composant serveur, et le selecteur seul est client.** Une
 * directive `"use client"` posee ici pour son `useState` emporterait tout le
 * contenu de la section dans le paquet client. `services-postes` rend le meme
 * catalogue par le meme partage.
 */
export function Profils({
  contenu,
  titreId,
  versContact,
}: {
  contenu: Contenu['commun']['profils']
  /** Le chemin de la page contact, calculé par l'appelant : ces sections
   * reçoivent un contenu déjà résolu et n'ont pas la langue. */
  versContact: string
  /** Deux pages portent cette section : l'id doit rester unique par page. */
  titreId: string
}) {
  return (
    <Section titreId={titreId}>
      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        <TeteSection intitule={contenu.intitule} />

        <Revelation
          balise="h2"
          id={titreId}
          className="max-w-[24ch] font-titre text-[clamp(1.375rem,2.1vw,1.875rem)] leading-[1.15] tracking-[-0.045em] text-encre"
        >
          {contenu.titre}
        </Revelation>
      </div>

      <Apparition className="mt-[clamp(2.125rem,3.6vw,3.5rem)]">
        <SelecteurProfils contenu={contenu} registre="accueil" versContact={versContact} />
      </Apparition>
    </Section>
  )
}
