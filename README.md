# Fluid — Atelier de lettering vectoriel

**Site :** https://nguerin23.github.io/fluid-lettering/

Fluid est un éditeur de lettrage manuscrit avec 11 polices au choix, un dégradé horizontal continu et des exports SVG/PNG.

## Polices disponibles

- Parisienne (par défaut)
- Fabfelt Script
- Farewell
- League Script
- Cetary
- Alucky
- My Ugly Handwritting
- Pacifico
- Gruenewald VA
- Banteng Story
- Stevilla Script

Les **10 nouvelles polices** ont été construites à partir des archives fournies, sans recours à des serveurs typographiques tiers. Parisienne conserve ses contours SVG existants.

## Fonctionnement

- Texte initial : **bonjour**, avec 22 caractères maximum.
- Choix de police dans le sélecteur et possibilité de partager l'URL avec le paramètre `?mot=...&police=...`.
- Ajustement de l'épaisseur du contour (valeur par défaut **150**, maximum **320**) et de l'espacement.
- Épaisseur normalisée selon les unités typographiques de chaque police.
- Dégradé continu violet → bleu → turquoise → vert, même lorsque plusieurs lettres se chevauchent.
- Export **SVG** autonome et **PNG** haute résolution, sans police à installer sur l'appareil.
- Données de contours vectoriels encodées dans `font-packs/*.json` (zlib + base64). Chargement **à la demande**, mise en cache pour éviter de ralentir le chargement initial.
- Les courbes Bézier sont conservées (quadratiques ou cubiques suivant le fichier source), et le moteur inclut une prise en charge de base de l'espacement typographique et des ligatures courantes disponibles dans les fichiers.
- Il s'agit de **contours de lettres**, pas de courbes centrales « single-line » ; une animation authentique de stylo n'est pas proposée.

## Structure

- `index.html` : interface, chargement des polices, moteur de rendu et exports.
- `parisienne-outlines.js` : contours d'origine de Parisienne.
- `font-packs/*.json` : 10 nouvelles polices vectorielles compressées.
- `FONT-LICENSES.md` : crédits, documents de licence des archives et réserves sur certains usages.
- `PARISIENNE-OFL.txt` : fichier de licence Parisienne historique.

## Licences

Consulter [FONT-LICENSES.md](FONT-LICENSES.md) avant toute republication. Certaines polices provenant de 1001Fonts sont autorisées pour l'intégration dans un site web, mais leurs licences restreignent la modification et la redistribution en tant que polices. Pour **Fabfelt Script**, l'archive n'incluait pas de licence explicite ; pour **Stevilla Script**, elle contenait un FONTLOG faisant référence à l'OFL mais pas le texte OFL lui-même.

Les anciennes ressources de police dans le dépôt sont conservées à titre d'archives.
