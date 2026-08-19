import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { Bouton, LienPastille } from '@/components/shared/bouton'
import { CONTENEUR } from '@/components/shared/section'
import { Defilement } from '@/components/shared/defilement'

/**
 * Le bloc de clôture de la maquette. Il ne se ferme pas : le pied prolonge le
 * même aplat, sans coupure — c'est pourquoi il n'a pas de padding bas.
 *
 * Les trois bandes de tuiles sont décoratives, décalées d'une rangée à l'autre
 * et de sens alternés. `motion-safe` coupe leur défilement : une bande sans fin
 * est le pire cas pour un trouble vestibulaire.
 */
export function Cloture({ contenu }: { contenu: Contenu['cloture'] }) {
  const tuiles = contenu.tuiles
  const rangees = [
    { cle: 'a', items: tuiles, sens: 'gauche' as const },
    { cle: 'b', items: [...tuiles.slice(5), ...tuiles.slice(0, 5)], sens: 'droite' as const },
    { cle: 'c', items: [...tuiles.slice(9), ...tuiles.slice(0, 9)], sens: 'gauche' as const },
  ]

  return (
    <section
      aria-labelledby="titre-cloture"
      className="bg-vif pt-20 text-sur-vif lg:pt-[4.875rem]"
    >
      <div className={CONTENEUR}>
        <Apparition>
          <div className="flex flex-col items-center gap-6.5 text-center">
            <h2
              id="titre-cloture"
              className="max-w-[20ch] font-titre text-[2.375rem] leading-[1.06] font-normal text-balance sm:text-[3rem] lg:text-[4.375rem]"
            >
              {contenu.titre}
            </h2>
            <p className="max-w-[52rem] font-description text-[1.0625rem] leading-[1.55] text-sur-vif">
              {contenu.description}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-7">
              <Bouton
                destination="candidature"
                libelle={contenu.ctaPrincipal}
                variante="inverse"
              />
              <LienPastille destination="rendezVous" libelle={contenu.ctaSecondaire} surSombre />
            </div>
          </div>
        </Apparition>

        <div
          aria-hidden
          className="mt-[4.625rem] flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_22%,#000_78%,transparent)]"
        >
          {rangees.map((rangee) => (
            <Defilement
              key={rangee.cle}
              items={rangee.items}
              sens={rangee.sens}
              rendu={(tuile) => (
                <span className="mr-4 grid h-[4.625rem] min-w-[4.625rem] place-items-center rounded-[1.125rem] bg-carte/15 px-5 text-[0.9375rem] font-semibold whitespace-nowrap text-sur-vif">
                  {tuile}
                </span>
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
