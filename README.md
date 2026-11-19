# Fluid — Parisienne

Générateur de lettering SVG basé sur **les contours vectoriels de Parisienne**, police cursive dessinée par **Brian J. Bonislawsky (Astigmatic / AOETI)** et distribuée sous **SIL Open Font License 1.1**.

**Site :** https://nguerin23.github.io/fluid-lettering/

## Fonctionnement

- La police **Parisienne** est utilisée par défaut ; le texte initial reste **Nicolas** (22 caractères maximum).
- Le moteur utilise **372 entrées Unicode** issues des courbes du fichier source FontForge SFD, pas une police chargée par Internet. Les accents français sont pris en charge.
- **Épaisseur** : les contours originaux sont conservés ; le curseur permet de les épaissir en ajoutant un contour de la même couleur. Au minimum, la forme correspond à l'épaisseur native de Parisienne ; elle ne peut pas être amincie au-delà.
- **Espacement** : réglage de −200 à +180 unités ; les valeurs négatives rapprochent ou superposent les lettres.
- **Dégradé horizontal continu** violet → bleu → turquoise → vert sur l'ensemble du texte.
- Exports **SVG et PNG** statiques, sans dépendance à une police installée.
- Les courbes SVG correspondent aux contours remplis de la police ; ce ne sont **pas des lignes centrales monolignes** et l'éditeur n'annonce pas d'animation authentique de stylo.

## Fichiers actifs

- `index.html` — éditeur, rendu SVG, curseurs et exports.
- `parisienne-outlines.js` — données vectorielles dérivées des courbes originales de Parisienne.
- `PARISIENNE-OFL.txt` — licence officielle et attribution.

Les fichiers Pecita et les autres polices précédemment testées restent archivés dans le dépôt mais ne sont plus chargés.

## Source et licence

Source officielle : `googlefonts/googlefontdirectory-hg/ofl/parisienne/src/Parisienne-Regular-TTF.sfd`, ainsi que `google/fonts/ofl/parisienne`.

Parisienne est protégée par la **SIL OFL 1.1**, avec le nom réservé « Parisienne ». `parisienne-outlines.js` est un ensemble de données géométriques modifiées pour Fluid, et non une redistribution d'une nouvelle police portant ce nom réservé. Respecter les mentions de licence et de droits d'auteur lors d'une redistribution.
