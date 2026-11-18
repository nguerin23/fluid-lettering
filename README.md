# Fluid — Mistral SingleLine

Ce générateur de lettering affiche des courbes ouvertes issues de **Mistral SingleLine**, projet d'isdaT-type, sous **SIL Open Font License 1.1**.

Source des données : https://github.com/isdat-type/Mistral-SingleLine (fichier `sources/Mistral_SingleLine.glyphs`).

## Fonctionnement

- Le texte (22 caractères maximum) est dessiné directement en SVG : aucun glyphe n'est reconstruit par squelettisation et aucun tracé n'est raccordé artificiellement.
- Curseur **Épaisseur** : modifie `stroke-width` sur les lignes centrales natives.
- Curseur **Espacement** : de −200 à +180 ; valeurs négatives = chevauchement possible.
- Couleur : interpolation violet → bleu → turquoise → vert, calculée selon la longueur cumulée des chemins. Les courbes sont affichées en petits segments colorés, chacun suivant la tangente locale.
- Exports SVG (paths ouverts et dégradés) et PNG, sans besoin de police installée.
- Gestion des glyphes accentués par composants et de quelques ligatures documentées (`ll`, `on`, `qu`, `st`, `th`, `ff`, `pp`, `ss`, `fi`, `fl`). Il ne s'agit pas d'un moteur OpenType complet : les substitutions contextuelles avancées ne sont pas toutes reproduites.

## Fichiers

- `index.html` : interface et moteur SVG
- `mistral-strokes.js` : données de Bézier issues du source Glyphs de Mistral SingleLine
- `MISTRAL-OFL.txt` : licence d'origine de Mistral SingleLine

Le site est statique et peut être hébergé sur GitHub Pages, sans serveur. Le fichier `index.html` doit être dans le même dossier que `mistral-strokes.js`.

## Licence

Les données vectorielles de Mistral SingleLine restent couvertes par SIL OFL 1.1. Voir `MISTRAL-OFL.txt` et le dépôt de référence des auteurs. Le nom du projet ici est **Fluid**.