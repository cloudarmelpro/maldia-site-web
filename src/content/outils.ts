/**
 * WEB-14 — les outils du bandeau défilant.
 *
 * Des noms et non des logos. `simple-icons` ne redistribue plus Slack,
 * Microsoft, Adobe, Canva, Salesforce ni VS Code : il manquerait assez de
 * marques pour qu'un bandeau moitié logos moitié texte se lise comme une
 * erreur. Voir décision 0016.
 *
 * Hors des fichiers de langue : un nom de produit ne se traduit pas.
 *
 * Trois rangées de onze, dans l'ordre des catégories du retour client. Le
 * découpage n'est pas sémantique — il équilibre les longueurs de rangée.
 */
export const OUTILS = [
  [
    'Slack',
    'Microsoft Teams',
    'Zoom',
    'Google Workspace',
    'Microsoft 365',
    'Trello',
    'Asana',
    'ClickUp',
    'Notion',
    'GitHub',
    'GitLab',
  ],
  [
    'VS Code',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'Python',
    'Vue',
    'Nuxt',
    'React',
    'Figma',
    'Canva',
    'Photoshop',
  ],
  [
    'Illustrator',
    'CapCut',
    'Premiere Pro',
    'After Effects',
    'WordPress',
    'Shopify',
    'HubSpot',
    'Salesforce',
    'Google Analytics',
    'Meta Business Suite',
    'Buffer',
  ],
] as const satisfies readonly (readonly string[])[]
