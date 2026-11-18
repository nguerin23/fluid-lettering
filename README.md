# Fluid — Générateur de lettering monoligne

Fluid transforme les contours de la police **Pecita** en **lignes centrales** pré-calculées (squelettisation puis simplification vectorielle). Le site dessine des chemins SVG ouverts avec `fill="none"` et `stroke-width` variable ; il n'utilise plus les contours extérieurs de la police pour peindre les caractères.

La couleur suit **la longueur cumulée des lignes** : le moteur découpe chaque tracé en petits tronçons, chacun recevant son propre dégradé aligné sur sa direction. Le dégradé progresse une seule fois sur l'ensemble du mot, y compris dans les boucles et les retours.

## Utilisation

- **Mot** : mise à jour instantanée, accents et ligatures contextuelles pris en charge.
- **Épaisseur** : largeur réelle du trait, de 12 à 160, valeur initiale 64.
- **Espacement** : de −200 à +180. Les valeurs négatives superposent les lettres.
- **Export SVG / PNG** : SVG monoligne avec chemins Bézier simplifiés en polylignes et segments colorés, sans texte ni police nécessaire.
- La largeur du mot reste proportionnelle ; défilement horizontal sur les petits écrans.

## Fichiers

`index.html` + `pecita-outlines.js` (métriques, GSUB/GPOS et contours de référence) + `pecita-centerlines.js` (lignes centrales) + `PECITA-OFL.txt` (licence).

## Note technique

L'extraction des lignes centrales est **une approximation du geste**, non une restitution historique de l'ordre dans lequel le typographe a dessiné chaque lettre. Les bifurcations et ligatures complexes peuvent nécessiter une retouche manuelle pour un logo définitif.

## Licence

Données dérivées de **Pecita**, Philippe Cochy (2009–2015), licence **SIL Open Font License 1.1**. Voir `PECITA-OFL.txt`.

Lien GitHub Pages : https://nguerin23.github.io/fluid-lettering/