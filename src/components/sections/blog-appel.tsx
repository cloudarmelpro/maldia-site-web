import type { Langue } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { BarreBas } from '@/components/layout/barre-bas'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { Pilule } from '@/components/shared/pilule'
import { CONTENEUR, GRILLE_INTITULE } from '@/components/shared/section'

/**
 * La cloture du design du blog : deux boutons, pas deux cartes.
 *
 * Plus courte que celle du reste du site — pas de colonnes Pages, Contact ni
 * de reperes sociaux. Ce n'est pas un cul-de-sac pour autant : sur le blog
 * l'en-tete est **colle**, la navigation reste donc atteignable a tout moment,
 * et c'est ce qui justifie une cloture plus legere.
 *
 * Ce n'est pas une `Section` : la barre de langue partage l'aplat, separee
 * seulement par un filet. Une `Section` refermerait le padding entre les deux.
 */
export function BlogAppel({
  contenu,
  langue,
  cheminAutreLangue,
  changerDeLangue,
  copyright,
}: {
  contenu: Contenu['blog']['appel']
  langue: Langue
  cheminAutreLangue: string
  changerDeLangue: string
  copyright: string
}) {
  return (
    <section
      aria-labelledby="titre-blog-appel"
      className="bg-encre pt-[clamp(3.5rem,6vw,5.75rem)] pb-[clamp(2.5rem,4vw,3.75rem)] text-white"
    >
      <div className={CONTENEUR}>
        <div className={GRILLE_INTITULE}>
          <Apparition>
            <Pilule intitule={contenu.intitule} registre="sombre" />
          </Apparition>

          <div className="flex flex-col gap-[clamp(1.625rem,2.8vw,2.5rem)]">
            <Apparition>
              <div className="flex flex-col items-start gap-4.5 large:flex-row large:items-end large:justify-between large:gap-[clamp(1.5rem,3vw,3rem)]">
                <h2
                  id="titre-blog-appel"
                  className="max-w-[20ch] font-titre text-[clamp(1.75rem,3.4vw,3.5rem)] leading-[1.03] tracking-[-0.05em] text-white"
                >
                  {contenu.titre}
                </h2>
                <p className="max-w-[28ch] shrink-0 text-[0.875rem] leading-[1.6] text-sur-sombre large:text-right">
                  {contenu.description}
                </p>
              </div>
            </Apparition>

            <Apparition>
              <div className="flex flex-wrap gap-3">
                <Bouton
                  destination="rendezVous"
                  libelle={contenu.ctaPrincipal}
                  variante="lime"
                  ornement="fleche"
                />
                <Bouton
                  destination="candidature"
                  libelle={contenu.ctaSecondaire}
                  variante="contour-clair"
                />
              </div>
            </Apparition>
          </div>
        </div>

        <BarreBas
          langue={langue}
          cheminAutreLangue={cheminAutreLangue}
          changerDeLangue={changerDeLangue}
          copyright={copyright}
        />
      </div>
    </section>
  )
}
