# Fluid — Pecita à tracés reliés

Générateur de lettering vectoriel SVG utilisant **Pecita** comme police principale, avec des tracés centraux reconstruits et lissés, puis des **raccords en courbes de Bézier** entre les traits principaux des lettres quand la géométrie le permet.

**Site :** https://nguerin23.github.io/fluid-lettering/

## Fonctionnalités

- **Pecita continu par défaut**, texte initial « bonjour », jusqu'à 22 caractères.
- **Continuité renforcée** : sélection d'un chemin principal par glyphe, lissage des courbes et tentative de jonction entre chemins voisins. Une liaison est créée uniquement sous certains seuils de distance et de direction ; le résultat n'est donc pas garanti en un seul trait pour tous les mots.
- **Levées de stylo préservées** là où elles sont nécessaires : espaces, accents, points, autres traits secondaires, ou raccords géométriquement trop éloignés.
- **Animation d'écriture** : les chemins principaux dans l'ordre de lecture, puis les traits secondaires.
- **Épaisseur** et **Espacement** (−200 à +180) réglables en direct.
- **Dégradé global** violet → bleu → turquoise → vert, continu horizontalement sur le mot.
- Exports **SVG** et **PNG** statiques, sans police installée sur l'ordinateur.

## Fichiers actifs

- `index.html` — interface et composition, raccords Bézier, animation et exports.
- `pecita-outlines.js` — données de Pecita, métriques, substitutions et positionnement.
- `pecita-centerlines.js` — tracés centraux monolignes reconstruits à partir des contours de Pecita.
- `PECITA-OFL.txt` — licence et attribution de Pecita.

Les fichiers Sacramento, EMS Capitol et EMS Allure Smooth restent dans le dépôt, mais ne sont plus chargés par l'application.

## Crédits et licence

Pecita a été créée par Philippe Cochy. Les données typographiques sont sous **SIL Open Font License 1.1**. Les tracés centraux utilisés par Fluid sont des reconstructions et peuvent différer des chemins qu'emprunterait réellement un stylo. La licence autorise la modification et la redistribution sous conditions, notamment la conservation des mentions de licence.
