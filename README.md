# Fluid — Sacramento et Pecita

Générateur de lettering SVG avec **Sacramento originale** par défaut et **Pecita** en option. Le site utilise les **contours vectoriels authentiques** de Sacramento, reconstruits directement depuis le fichier source officiel `sources/Sacramento.glyphs`, publié par le projet Sacramento de Google Fonts.

**Site :** https://nguerin23.github.io/fluid-lettering/

## Polices

- **Sacramento (par défaut)** : véritable police Sacramento originale de Brian J. Bonislawsky (Astigmatic/AOETI), sous SIL OFL 1.1. Elle est une écriture manuscrite **semi-liée**, aux contours remplis, et non une police single-stroke. Les 372 caractères Unicode de sa source Glyphs sont disponibles en SVG sans installation externe. [Source officielle](https://github.com/googlefonts/SacramentoFont)
- **Pecita (en option)** : police manuscrite par Philippe Cochy, dont Fluid emploie les lignes centrales reconstruites, le lissage et certaines substitutions de ligatures.

## Fonctionnalités

- Texte de 22 caractères au maximum, initialement **bonjour**.
- Sélecteur de police **Sacramento / Pecita**.
- Curseur **Épaisseur** : Sacramento garde ses contours de base et les épaissit par un trait supplémentaire ; le curseur ne peut pas amincir la forme originale. En Pecita, il règle directement la largeur du trait central.
- Curseur **Espacement** : de −200 à +180 pour ajuster la superposition des lettres.
- Dégradé violet → bleu → turquoise → vert continu horizontalement sur l'ensemble du mot, même entre des glyphes distincts.
- Bouton **Animer l'écriture** : pour Sacramento, animation de révélation lettre par lettre de gauche à droite (ses contours ne constituent pas un trajet de stylo) ; pour Pecita, animation des lignes centrales suivant les chemins.
- Exports **SVG et PNG** statiques ; les glyphes Sacramento sont exportés comme de vrais chemins vectoriels, sans dépendance à une police installée.

## Fichiers utilisés

- `index.html` — interface, composition, animation et exports.
- `sacramento-outlines.js` — contours de Sacramento issus de son source Glyphs, sous SIL OFL 1.1.
- `SACRAMENTO-OFL.txt` — licence et attribution officielles Sacramento.
- `pecita-outlines.js`, `pecita-centerlines.js` — données et lignes centrales Pecita, chargées à la demande.
- `PECITA-OFL.txt` — licence Pecita.

Les anciens fichiers EMS Capitol, EMS Allure et Mistral sont conservés comme archives, mais ne sont plus utilisés par l'interface. La licence SIL OFL autorise l'utilisation et la redistribution sous les conditions qu'elle prévoit. Conserver les mentions et fichiers de licence lors de la redistribution.
