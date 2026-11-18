# Fluid — Tracés libres et lissage intensif

Générateur de lettering vectoriel fondé sur des contours de la police **Pecita** de Philippe Cochy, licence SIL Open Font License 1.1.

## Fonctionnement

- **Tracés séparés** : les lignes centrales restent indépendantes, sans raccords artificiels ni parcours continu imposé entre les lettres.
- **Lissage renforcé** : rééchantillonnage à distance régulière, 12 passes de filtrage gaussien pour les traits principaux, puis courbes SVG cubiques de Bézier.
- Les accents restent des tracés distincts.
- Dégradé violet → bleu → vert le long de la longueur cumulée des tracés, pas seulement sur l'axe horizontal.
- Aperçu instantané, curseurs **épaisseur** et **espacement** (valeurs négatives possibles), exports SVG et PNG.

## Publication

Placer les fichiers `index.html`, `pecita-outlines.js`, `pecita-centerlines.js` et `PECITA-OFL.txt` ensemble sur la branche `main`. Le site fonctionne avec GitHub Pages : https://nguerin23.github.io/fluid-lettering/

Les données manuscrites sont dérivées de Pecita (© Philippe Cochy), sous SIL OFL 1.1. Voir `PECITA-OFL.txt` pour la licence et les mentions de provenance.
