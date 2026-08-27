import type { Contenu } from '@/content/types'
import { TeteSection } from '@/components/shared/tete-section'
import { CarteEtape } from '@/components/shared/carte-etape'
import { Revelation } from '@/components/shared/revelation'
import { classes } from '@/components/shared/classes'
import { BAS, CONTENEUR } from '@/components/shared/section'

const TITRE_ID = 'titre-methode'

/**
 * WEB-4 — les cinq etapes, dans le traitement clair que le design reserve a
 * Services : la meme geometrie de cartes que l'accueil, sur l'aplat blanc.
 *
 * `Methode` n'est pas reemployee : elle porte l'aplat vert de l'accueil, et
 * cette page n'a plus aucune bande de couleur avant le bloc Contact.
 *
 * Le cote se lit sur `etape.cote` et jamais sur `acteur`, qui est traduit.
 * Le rang est calcule depuis l'indice.
 */
export function ServicesMethode({ contenu }: { contenu: Contenu['commun']['methode'] }) {
  return (
    <section aria-labelledby={TITRE_ID} className={classes('bg-fond', BAS)}>
      <div className={classes(CONTENEUR, 'flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]')}>
        <TeteSection
          intitule={contenu.intitule}
          titreId={TITRE_ID}
          titre={contenu.titre}
          description={contenu.description}
        />

        <ol className="grid grid-cols-[repeat(auto-fit,minmax(11.25rem,1fr))] gap-1.5">
          {contenu.liste.map((etape, indice) => (
            <li key={etape.titre} className="min-w-0">
              <CarteEtape etape={etape} indice={indice} registre="clair" />
            </li>
          ))}
        </ol>

        <Revelation className="max-w-[44ch] font-titre text-[clamp(1rem,1.35vw,1.25rem)] font-normal leading-[1.35] tracking-[-0.02em] text-encre">
          {contenu.conclusion}
        </Revelation>
      </div>
    </section>
  )
}
