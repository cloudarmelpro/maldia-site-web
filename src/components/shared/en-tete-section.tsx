import { MESURE_PROSE } from '@/components/shared/section'
import type { Fond } from '@/components/shared/section'

const TITRES: Record<Fond, string> = {
  fond: 'text-encre',
  'fond-2': 'text-encre',
  tendre: 'text-encre',
  vif: 'text-sur-vif',
  sombre: 'text-sur-sombre',
}

// Sur les fonds teintés, --color-encre-2 tombe sous 4,5:1 : c'est le gris plus
// sombre de la maquette qui prend le relais. Sur `vif`, pas de teinte adoucie
// du tout — le blanc n'y tient le seuil qu'à pleine opacité.
const DESCRIPTIONS: Record<Fond, string> = {
  fond: 'text-encre-2',
  'fond-2': 'text-encre-2',
  tendre: 'text-encre-3',
  vif: 'text-sur-vif',
  sombre: 'text-sur-sombre/80',
}

type EnTeteSectionProps = {
  /** Même valeur que le titreId de la Section englobante : aria-labelledby vise ce titre. */
  titreId: string
  titre: string
  description?: string
  /** Doit répéter le fond de la Section englobante : c'est lui qui règle les couleurs. */
  fond?: Fond
}

export function EnTeteSection({
  titreId,
  titre,
  description,
  fond = 'fond',
}: EnTeteSectionProps) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
      {/* Le crénage négatif vient du @layer base : il ne vaut que pour h1 et h2. */}
      <h2
        id={titreId}
        className={`font-titre text-[2.125rem] leading-[1.05] font-normal text-balance sm:text-[2.75rem] lg:text-[3.375rem] ${TITRES[fond]}`}
      >
        {titre}
      </h2>
      {description ? (
        <p className={`${MESURE_PROSE} font-description leading-relaxed ${DESCRIPTIONS[fond]}`}>{description}</p>
      ) : null}
    </div>
  )
}
