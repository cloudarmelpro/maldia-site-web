import { avecNombre } from '@/content/chiffres'
import type { Langue } from '@/content/langues'
import type { Contenu } from '@/content/types'
import { Apparition } from '@/components/shared/apparition'
import { delaiDeGrille } from '@/components/shared/decalage'
import { EnTeteSection } from '@/components/shared/en-tete-section'
import { Pilule } from '@/components/shared/pilule'
import { GRILLE_INTITULE, Section } from '@/components/shared/section'

/**
 * WEB-6 — les deux cotes du service : Madagascar, puis les marches.
 *
 * Le compteur « 01 / 02 » est calcule sur la liste, pas ecrit : ajouter un cote
 * corrigerait le denominateur des deux autres tout seul.
 *
 * Le nombre de candidats vient du jeton `{nombre}` que porte le contenu, jamais
 * de la phrase elle-meme — voir `chiffres.ts` (WEB-13).
 */
export function AProposFonctionnement({
  contenu,
  langue,
}: {
  contenu: Contenu['aPropos']['fonctionnement']
  langue: Langue
}) {
  const total = String(contenu.cotes.length).padStart(2, '0')

  return (
    <Section titreId="titre-fonctionnement" fond="fond-2">
      <div className={GRILLE_INTITULE}>
        <Apparition>
          <Pilule intitule={contenu.intitule} registre="clair" />
        </Apparition>

        <div className="flex flex-col gap-[clamp(1.625rem,2.8vw,2.5rem)]">
          <Apparition>
            <EnTeteSection
              titreId="titre-fonctionnement"
              titre={contenu.titre}
              description={contenu.description}
            />
          </Apparition>

          <ul className="grid grid-cols-1 gap-4 voies:grid-cols-2">
            {contenu.cotes.map((cote, indice) => (
              <li key={cote.titre} className="min-w-0">
                <Apparition delai={delaiDeGrille(indice)} className="h-full">
                  <div className="grid h-full min-w-0 grid-rows-[auto_auto_auto_1fr_auto] rounded-encart border border-trait bg-white p-[clamp(1.625rem,2.2vw,2.125rem)]">
                    <span className="flex items-center justify-between gap-3.5">
                      <span className="rounded-liste bg-pilule px-3 py-1.75 etiquette-fine text-[0.625rem] tracking-[0.09em] text-encre-2">
                        {cote.lieu}
                      </span>
                      <span aria-hidden className="etiquette-fine text-[0.625rem] tracking-[0.09em] normal-case text-encre-3">
                        {String(indice + 1).padStart(2, '0')} / {total}
                      </span>
                    </span>
                    <strong className="mt-[clamp(1.625rem,2.4vw,2.375rem)] font-titre text-[clamp(1.3125rem,1.9vw,1.6875rem)] leading-[1.15] tracking-[-0.042em] text-encre">
                      {cote.titre}
                    </strong>
                    <span className="mt-3.25 max-w-[46ch] text-[0.875rem] leading-[1.65] text-encre-2">
                      {avecNombre(cote.texte, langue)}
                    </span>
                    <span />
                    <span className="mt-[clamp(1.375rem,2vw,1.875rem)] flex flex-wrap items-baseline gap-3 border-t border-trait-2 pt-4.5">
                      <strong className="font-titre text-[clamp(1.75rem,2.4vw,2.25rem)] leading-none tracking-[-0.05em] text-primaire">
                        {avecNombre(cote.valeur, langue)}
                      </strong>
                      <span className="etiquette-fine text-[0.625rem] tracking-[0.08em] text-encre-3">
                        {cote.legende}
                      </span>
                    </span>
                  </div>
                </Apparition>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
