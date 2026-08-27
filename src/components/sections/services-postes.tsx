import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { Section } from '@/components/shared/section'
import { ServicesSelecteur } from '@/components/sections/services-selecteur'

const TITRE_ID = 'titre-postes'

/**
 * WEB-4 et WEB-5 — les postes que les clients confient, et l'appel a les
 * chiffrer.
 *
 * Les postes viennent de `commun.profils`, la meme source que le selecteur de
 * l'accueil : c'est le meme catalogue vu autrement, et deux listes divergeraient
 * a la premiere correction.
 *
 * La selection est un etat, donc un composant client — pose au niveau du
 * selecteur seul, l'en-tete et l'encart restant rendus au serveur.
 */
export function ServicesPostes({
  contenu,
  profils,
}: {
  contenu: Contenu['services']['postes']
  profils: Contenu['commun']['profils']
}) {
  return (
    <Section titreId={TITRE_ID}>
      <div className="flex flex-col gap-[clamp(1.25rem,2.4vw,1.75rem)]">
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="clair" />
        </Apparition>

        <Apparition registre="texte">
          <EnTeteSection
            titreId={TITRE_ID}
            titre={contenu.titre}
            description={contenu.description}
          />
        </Apparition>
      </div>

      <Apparition className="mt-12">
        <ServicesSelecteur contenu={profils} />
      </Apparition>

      <Apparition>
        <div className="mt-6 flex flex-wrap items-center gap-6 rounded-panneau bg-primaire p-[clamp(1.1875rem,1.8vw,1.5625rem)]">
          <div className="min-w-0 grow basis-[23.75rem]">
            <strong className="font-titre text-[clamp(1.125rem,1.7vw,1.4375rem)] leading-[1.12] tracking-[-0.02em] text-white">
              {contenu.encart.titre}
            </strong>
            <p className="mt-3 max-w-[50ch] text-base leading-[1.55] text-white/92">
              {contenu.encart.texte}
            </p>
          </div>
          <Bouton
            destination="rendezVous"
            libelle={contenu.encart.cta}
            variante="blanc"
            className="shrink-0"
          />
        </div>
      </Apparition>
    </Section>
  )
}
