import type { Contenu } from '@/content/types'
import { TeteSection } from '@/components/shared/tete-section'
import { Apparition } from '@/components/shared/apparition'
import { Revelation } from '@/components/shared/revelation'
import { Section } from '@/components/shared/section'
import { SelecteurProfils } from '@/components/shared/selecteur-profils'

/**
 * WEB-5 — les profils sur l'accueil.
 *
 * **Cette section est redevenue un composant serveur.** Elle portait
 * `"use client"` pour un seul `useState` de selection, et emportait donc les six
 * profils, l'intitule, le titre et le bouton dans le paquet client. Le
 * selecteur est maintenant partage et pose aussi bas que possible : lui seul est
 * client.
 *
 * Son ancien commentaire affirmait qu'« il n'y a pas de version serveur de ce
 * composant qui rendrait la meme chose ». `services-postes` faisait pourtant
 * exactement ca, deux fichiers plus loin.
 */
export function Profils({
  contenu,
  titreId,
}: {
  contenu: Contenu['commun']['profils']
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
        <SelecteurProfils contenu={contenu} registre="accueil" />
      </Apparition>
    </Section>
  )
}
