# Fluid — Lettrage Pacifico

**Site :** https://nguerin23.github.io/fluid-lettering/

Un éditeur de lettrage manuscrit basé **uniquement sur la police Pacifico**, avec une palette vert → turquoise → bleu → violet dont la progression suit les courbes. Un léger relief est visible lorsque des lettres ou des traits se recouvrent.

## Fonctionnement

- **Police unique : Pacifico**, chargée depuis `font-packs/pacifico.json` et sélectionnée automatiquement, y compris sur les anciens liens avec un paramètre `police` obsolète.
- Texte initial : **bonjour**, 22 caractères maximum ; le bouton **Make** charge l’exemple Pacifico.
- Épaisseur par défaut **255**, espacement par défaut **−115**. Les deux réglages restent modifiables.
- Dégradé suivant la **distance parcourue sur la ligne médiane estimée** de chaque glyphe, avec contours SVG conservés. Le sens du stylo est estimé à partir des contours et n’est pas garanti être celui de la personne qui a dessiné la police.
- Ombre aux chevauchements : **50 % d’opacité**, légèrement décalée et diffusée, masquée par l’encre déjà peinte pour éviter le halo autour du mot.
- Export **SVG** autonome (masques vectoriels, cartes de couleurs intégrées en PNG) et **PNG** haute résolution.

## Dessin à main levée

Le bouton **Dessiner** ouvre un studio accessible au doigt, à la souris et au stylet : lissage réglable, épaisseur du trait, annulation, effacement, export SVG et réutilisation dans l’aperçu principal.

La couleur suit la longueur cumulée du tracé. Une ombre plus marquée (50 % d’opacité) apparaît aux croisements de gestes distincts, tout en restant limitée aux zones de recouvrement.

## Fichiers

- `index.html` : interface, aperçu, moteur de courbes et export.
- `font-packs/pacifico.json` : **unique police** (contours vectoriels compressés, chargement à la demande).
- `signature-studio.js` et `signature-studio.css` : dessin libre.
- `FONT-LICENSES.md` : crédits et texte de la licence SIL OFL de Pacifico.

Les autres polices et leurs anciennes ressources ont été retirées du dépôt.
