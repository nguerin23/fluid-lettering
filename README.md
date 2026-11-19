# Fluid — EMS Capitol (Sacramento) et Pecita

Générateur de lettering SVG utilisant deux polices monolignes sous licence **SIL Open Font License 1.1** : **EMS Capitol**, une adaptation monoligne de **Sacramento**, par défaut ; et **Pecita**, disponible dans le sélecteur.

**Site :** https://nguerin23.github.io/fluid-lettering/

## Polices

- **EMS Capitol (défaut)** : dérivé de Sacramento (Brian J. Bonislawsky / Astigmatic). Adaptation monoligne par Sheldon B. Michaels et conversion SVG par Windell H. Oskay ; les segments linéaires denses sont adoucis en courbes de Bézier dans Fluid, sans ajouter de raccords entre les lettres. [SVG original](https://github.com/msurguy/watercolor-playground/blob/main/public/fonts/single-line/EMS/EMSCapitol.svg)
- **Pecita (option)** : dessin manuscrit de Philippe Cochy ; chemins centraux calculés à partir des contours, avec lissage et gestion des ligatures et accents.

## Fonctions

- Texte libre jusqu'à **22 caractères**, initialement **bonjour**.
- Sélecteur **EMS Capitol / Pecita** (chargement différé des données Pecita).
- Curseurs **Épaisseur** et **Espacement** (−200 à +180).
- Dégradé violet → bleu → turquoise → vert **continu à l'échelle de tout le mot** : les coordonnées de chaque dégradé local compensent le décalage des lettres.
- Bouton **Animer l'écriture** pour révéler les traits suivant leur trajectoire. Les traits qui ne sont pas connectés restent séparés ; l'animation ne crée pas de raccord artificiel.
- Exports **SVG et PNG** statiques, compatibles avec un navigateur sans installer de police.

## Fichiers actifs

- `index.html` — interface, génération des chemins SVG, animation et exports.
- `ems-capitol.js` — 206 glyphes d'EMS Capitol dans leur géométrie originale monoligne.
- `EMS-CAPITOL-OFL.txt` — attribution et texte de la licence SIL OFL 1.1.
- `pecita-outlines.js` — glyphes, métriques et substitutions OpenType Pecita.
- `pecita-centerlines.js` — lignes centrales reconstruites Pecita.
- `PECITA-OFL.txt` — licence Pecita.

Les anciens fichiers EMS Allure Smooth et Mistral restent conservés dans le dépôt à titre historique, mais ne sont plus chargés par l'interface. Pour un fonctionnement hors ligne, placer les fichiers actifs dans le même dossier.

## Licence et attribution

Le code de Fluid et les polices sont des éléments distincts. Les données typographiques demeurent couvertes par les licences et attributions de leurs auteurs ; voir `EMS-CAPITOL-OFL.txt` et `PECITA-OFL.txt`. La licence SIL OFL 1.1 autorise notamment la modification et la redistribution sous conditions.
