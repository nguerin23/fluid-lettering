# Fluid — lettrage vectoriel en direct

Page web statique, compatible avec GitHub Pages. Saisir un mot et utiliser deux curseurs : **Épaisseur** (0–110) et **Espacement** (−200 à +180). Les valeurs négatives rapprochent et superposent les glyphes. Le dessin se régénère au fil de la saisie, sans bouton. L’aperçu est défilable horizontalement pour conserver les proportions des mots longs. Le dégradé violet → bleu → vert s'applique sur le mot complet.

Exports **SVG** et **PNG** depuis l’interface. `?mot=Nicolas` permet de préremplir le mot.

Les tracés sont dérivés de **Pecita** (Philippe Cochy), sous licence **SIL Open Font License 1.1**. Voir `PECITA-OFL.txt`. Les données vectorielles nécessaires se trouvent dans `pecita-outlines.js`.

Sur GitHub Pages : Settings → Pages → Deploy from a branch, branch `main`, folder `/(root)`.

## Dégradé suivant les courbes et superposition (novembre 2026)

En plus du dégradé continu de base, une couche de couleur est peinte sur des
segments échantillonnés le long des contours de Bézier de chaque glyphe. La
progression des teintes tient compte de la longueur cumulée des courbes, pas
seulement de la position horizontale. Les segments sont légèrement translucides,
ce qui crée un mélange de couleurs là où les formes se croisent ou se superposent.

Il s'agit d'un effet graphique fondé sur les **contours du lettrage**, pas d'une
reconstruction exacte du trajet du stylo de la police d'origine. Tous les
éléments restent vectoriels, avec une prévisualisation en direct et les exports
SVG/PNG.