import type { Contenu } from '@/content/types'
import { CarteEtape } from '@/components/shared/carte-etape'
import { TeteSection } from '@/components/shared/tete-section'
import { Apparition } from '@/components/shared/apparition'
import { Bouton } from '@/components/shared/bouton'
import { classes } from '@/components/shared/classes'
import { BAS, CONTENEUR, HAUT } from '@/components/shared/section'

/**
 * WEB-4 — les etapes de la methode, sur l'aplat vert du design.
 *
 * La section batit son `<section>` elle-meme : `Section` ne propose pas d'aplat
 * vert, et recopier sa respiration la ferait diverger — d'ou HAUT, BAS et
 * CONTENEUR, importes plutot que reecrits.
 *
 * Le cote se lit sur `etape.cote`, jamais sur `acteur` qui est traduit. Le rang
 * est calcule : une etape inseree renumerote la suite toute seule.
 */
export function Methode({
  contenu,
  titreId,
  avecAppel = true,
}: {
  contenu: Contenu['commun']['methode']
  /** Deux pages portent cette section : l'id doit rester unique par page. */
  titreId: string
  /**
   * La conclusion et ses deux appels. Le design de la page Services ne les met
   * pas ici — son appel suit, dans l'encart de la section des postes.
   */
  avecAppel?: boolean
}) {
  return (
    <section
      aria-labelledby={titreId}
      className={classes('bg-primaire text-white', HAUT, BAS)}
    >
      <div className={CONTENEUR}>
        <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
          <TeteSection
            intitule={contenu.intitule}
            registre="vert"
            titreId={titreId}
            titre={contenu.titre}
            description={contenu.description}
            sombre
          />
        </div>

        <ol className="mt-[clamp(2.125rem,3.6vw,3.5rem)] grid grid-cols-[repeat(auto-fit,minmax(11.25rem,1fr))] gap-1.5">
          {contenu.liste.map((etape, indice) => (
            <li key={etape.titre} className="min-w-0">
              <CarteEtape etape={etape} indice={indice} registre="vert" />
            </li>
          ))}
        </ol>

        {avecAppel ? (
          <Apparition>
            <div className="mt-[clamp(1.75rem,2.8vw,2.5rem)] flex flex-wrap items-center justify-between gap-[clamp(1.25rem,3vw,2.5rem)]">
              <p className="max-w-[44ch] font-titre text-[clamp(1rem,1.35vw,1.25rem)] font-extralight leading-[1.35] tracking-[-0.02em] text-white">
                {contenu.conclusion}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Bouton
                  destination="rendezVous"
                  libelle={contenu.ctaPrincipal}
                  variante="blanc"
                  ornement="fleche"
                />
                <Bouton
                  destination="candidature"
                  libelle={contenu.ctaSecondaire}
                  variante="voile"
                />
              </div>
            </div>
          </Apparition>
        ) : null}
      </div>
    </section>
  )
}
