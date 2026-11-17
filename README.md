# Fluid — Générateur de lettering vectoriel

Un atelier de lettering avec un **bouton « Générer »** et une sortie en **vrais tracés SVG** (aucun élément `<text>` dans les exports).

## Fonctionnalités

- **Manuscrit** (nouveau) — tracés cursifs liés, inspirés des courbes du caractère *Pecita*, avec ligatures contextuelles et accents.
- **Fluid original** — formes épaisses et organiques générées à partir de chemins de Bézier.
- Dégradés violet–bleu–vert et trois autres palettes.
- Réglage de l'épaisseur, des connexions et de l'inclinaison.
- Export SVG éditable et PNG, fond transparent possible.
- Saisie d'un mot, puis clic sur **Générer le lettering** (aucun rendu recalculé à chaque frappe).
- Le paramètre URL `?mot=Nicolas` préremplit le mot.

## Utilisation locale

Conserver `index.html` et `pecita-outlines.js` **dans le même dossier**, puis ouvrir `index.html` dans un navigateur avec JavaScript activé. Le site fonctionne sans dépendance externe.

## GitHub Pages

Dans **Settings → Pages**, choisir **Deploy from a branch** avec `main` et `/(root)`.

Adresse attendue : https://nguerin23.github.io/fluid-lettering/

## Crédits et licence de la source manuscrite

Les données de contours manuscrits dans `pecita-outlines.js` ont été adaptées de la police **Pecita**, © 2009–2015 Philippe Cochy. Cette police et les données de contours qui en dérivent sont sous **SIL Open Font License 1.1**. Voir `PECITA-OFL.txt` pour la notice et le texte de licence. « Pecita » est un nom de police réservé ; le présent outil ne distribue pas une nouvelle police sous ce nom.

Les exports sont des illustrations SVG indépendantes de la police installée.
