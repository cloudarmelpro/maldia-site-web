import { en } from './en'
import { fr } from './fr'
import type { Langue } from './langues'
import type { Contenu } from './types'

/**
 * Les deux contenus, indexes par langue.
 *
 * Ce module existe pour que la table ne soit pas recopiee dans chacune des huit
 * routes : recopiee, elle finirait par manquer une langue dans l'une d'elles.
 */
export const CONTENUS: Record<Langue, Contenu> = { fr, en }
