# Fluid — Atelier de lettering vectoriel

**Site :** https://nguerin23.github.io/fluid-lettering/

Fluid est un éditeur de lettrage manuscrit avec 11 polices au choix **et un studio de dessin libre au doigt, à la souris ou au stylet**, un dégradé suivant les courbes, de légères ombres aux croisements et des exports SVG/PNG.

## Polices disponibles

- Parisienne
- Fabfelt Script
- Farewell
- League Script
- Cetary
- Alucky
- My Ugly Handwritting
- Pacifico (par défaut)
- Gruenewald VA
- Banteng Story
- Stevilla Script

Les **10 nouvelles polices** ont été construites à partir des archives fournies, sans recours à des serveurs typographiques tiers. Parisienne conserve ses contours SVG existants.

## Fonctionnement

- Texte initial : **bonjour**, avec 22 caractères maximum.
- Choix de police dans le sélecteur et possibilité de partager l'URL avec le paramètre `?mot=...&police=...`.
- Bouton exemple **Make** à côté du champ de texte : charge « Make », Pacifico, épaisseur 255 et espacement −115. Le même style s'applique ensuite à n'importe quel autre mot.
- Ajustement de l'épaisseur du contour (valeur par défaut **255**, maximum **320**) et de l'espacement (valeur par défaut **−115**, avec superposition volontaire des lettres).
- Épaisseur normalisée selon les unités typographiques de chaque police.
- Dégradé continu **vert → turquoise → bleu → violet**, calculé selon la distance parcourue sur une **ligne centrale estimée** pour chaque lettre, et non selon une ligne horizontale. Les boucles et montées/descentes font évoluer la couleur localement.
- Le contour de chaque lettre est conservé comme **masque SVG vectoriel** ; la carte de couleurs curvilignes est intégrée dans le SVG sous forme d'une petite image PNG embarquée. Le fichier SVG est autonome, mais sa couleur intérieure n'est pas un dégradé SVG 100 % vectoriel.
- Export **SVG** autonome (masques de contour vectoriels et couleurs embarquées) et **PNG** haute résolution, sans police à installer sur l'appareil.
- Données de contours vectoriels encodées dans `font-packs/*.json` (zlib + base64). Chargement **à la demande**, mise en cache pour éviter de ralentir le chargement initial.
- Les courbes Bézier sont conservées (quadratiques ou cubiques suivant le fichier source), et le moteur inclut une prise en charge de base de l'espacement typographique et des ligatures courantes disponibles dans les fichiers.
- Un léger effet de profondeur est appliqué uniquement là où une lettre recouvre l'encre des lettres précédentes, à l'aide de masques SVG et d'une ombre très diffuse (opacité 13 %). Aucun halo ne borde le mot sur le fond vierge.
- La ligne centrale est reconstituée à partir du contour par squelettisation ; le parcours est une approximation géométrique, **pas l'ordre authentique des coups de plume de l'auteur de la police**.
- Il s'agit de **contours de lettres**, pas de courbes centrales « single-line » ; une animation authentique de stylo n'est pas proposée.

## Dessin à main levée

Cliquer sur **« ✎ Dessiner »** sous l'aperçu pour ouvrir une fenêtre de dessin intégrée :

- Dessiner librement plusieurs traits avec la souris, un stylet ou un écran tactile (événements Pointer Events, capture du pointeur et points coalescés).
- **Lisser** : curseur de **0 à 400 %** (défaut **120 %**). Rééchantillonnage à distance constante, de 1 à 8 passes de lissage spatial, puis simplification des points de contrôle (Douglas-Peucker) et interpolation de Catmull-Rom vers des courbes SVG Bézier cubiques. À **400 %**, le geste peut être fortement simplifié et les petites boucles arrondies ; revenir vers 100–200 % pour conserver davantage de détails.
- **Épaisseur** : curseur de 1 à 90 px, appliqué immédiatement aux traits existants.
- **Annuler le trait** : retire le dernier coup de crayon ; **Tout effacer** repart de zéro.
- **Exporter SVG** : télécharge un document vectoriel autonome composé de chemins centraux.
- **Utiliser ce dessin** : injecte le dessin dans l'aperçu principal ; les boutons SVG/PNG habituels fonctionnent alors avec le dessin manuel.
- Tout changement ultérieur de texte, police, épaisseur typographique ou espacement ramène au mode « police ».

**Croisements et superpositions** : les tracés centraux sont conservés avec leurs masques SVG réutilisables. Le dégradé suit maintenant la **longueur cumulée du trait dessiné**. Les segments reçoivent une couleur qui change avec l'avancée de la plume, même lorsqu'elle monte, descend ou fait une boucle. Aux croisements entre coups de stylo, le trait supérieur laisse une ombre très légère sur le trait inférieur, sans halo sur le papier blanc et sans assombrir tout le tracé. Il s'agit d'une **fusion visuelle** par masque, non d'une opération booléenne qui convertirait toute la forme en un unique contour SVG fermé. Les chemins centraux restent accessibles dans le SVG exporté. Le dessin n'est pas enregistré dans l'URL ou le stockage local : exporter le SVG pour le conserver.

### Fichiers du studio

- `signature-studio.js` — acquisition des points, lissage, chemins SVG, masque, commandes et export.
- `signature-studio.css` — fenêtre et disposition responsive.

## Structure

- `index.html` : interface, chargement des polices, moteur de rendu et exports.
- `parisienne-outlines.js` : contours d'origine de Parisienne.
- `font-packs/*.json` : 10 nouvelles polices vectorielles compressées.
- `FONT-LICENSES.md` : crédits, documents de licence des archives et réserves sur certains usages.
- `PARISIENNE-OFL.txt` : fichier de licence Parisienne historique.

## Licences

Consulter [FONT-LICENSES.md](FONT-LICENSES.md) avant toute republication. Certaines polices provenant de 1001Fonts sont autorisées pour l'intégration dans un site web, mais leurs licences restreignent la modification et la redistribution en tant que polices. Pour **Fabfelt Script**, l'archive n'incluait pas de licence explicite ; pour **Stevilla Script**, elle contenait un FONTLOG faisant référence à l'OFL mais pas le texte OFL lui-même.

Les anciennes ressources de police dans le dépôt sont conservées à titre d'archives.
