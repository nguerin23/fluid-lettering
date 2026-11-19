# Fluid — EMS Allure Smooth ou Pecita

Générateur de lettering SVG proposant deux polices sélectionnables : **EMS Allure Smooth** (courbes monolinéaires natives, lissées par Ellen Wasbø / Cutlings) et **Pecita** (lignes centrales reconstruites puis adoucies à partir de la police de Philippe Cochy). Les données des deux polices sont sous licence **SIL Open Font License 1.1**.

**Démo :** https://nguerin23.github.io/fluid-lettering/

**Sources :**
- https://cutlings.datafil.no/smoothed-single-line-fonts/
- https://github.com/msurguy/watercolor-playground/blob/main/public/fonts/single-line/Cutlings/EMS_Allure_Smooth.svg

## Fonctions

- Prévisualisation en direct pour un mot de 22 caractères maximum.\n- **Sélecteur de police** : EMS Allure Smooth par défaut, ou Pecita. Les données Pecita sont chargées à la demande.
- Tracés ouverts SVG : courbes Bézier natives pour EMS Allure Smooth ; extraction de lignes centrales et lissage de courbes pour Pecita. Aucun raccord artificiel n'est ajouté entre les lettres.
- **Épaisseur** : règle `stroke-width`.
- **Espacement** : −200 à +180 ; valeurs négatives pour superposer les lettres.
- Dégradé violet → bleu → turquoise → vert **continu à l’échelle de tout le mot**. Les coordonnées des dégradés compensent le décalage de chaque glyphe pour éviter toute rupture de couleur aux changements de lettre.
- Exports **SVG et PNG** sans police installée ni serveur.
- Accents pris en charge quand les glyphes sont présents dans la police (notamment `é`, `è`, `à`, `ç`). Les autres caractères utilisent un repli approximatif.

## Fichiers actifs

- `index.html` : application et rendu SVG.
- `ems-allure-smooth.js` : 205 glyphes de la vraie police single-line lissée.
- `EMS-ALLURE-OFL.txt` : crédit des créateurs et texte de la licence.\n- `pecita-outlines.js` : glyphes, ligatures et métriques utilisés pour la composition de Pecita.\n- `pecita-centerlines.js` : tracés centraux de Pecita utilisés pour le rendu monoligne.\n- `PECITA-OFL.txt` : licence de Pecita.

Le bouton **Animer l’écriture** révèle les chemins dans l’ordre de tracé ; les exports SVG et PNG restent statiques. Le mot par défaut est **bonjour**.

Le site est statique, hébergé sur GitHub Pages. Pour une installation hors ligne, conserver `index.html`, les trois fichiers JavaScript des polices et les deux licences dans le même dossier.

## Attribution

Allura par Rob Leuschke (TypeSETit), EMS Allure par Sheldon B. Michaels, conversion SVG par Windell H. Oskay, lissage et ajustements par Ellen Wasbø (Cutlings). Voir `EMS-ALLURE-OFL.txt`.

**Note :** les lignes centrales de Pecita sont des reconstructions approximatives de trajectoires d'écriture, et non des tracés originaux de la police. Le fichier historique Mistral est conservé dans le dépôt mais n'est pas chargé par le site. Aucune des deux polices ne garantit une liaison physique entre toutes les lettres ; la continuité visuelle dépend de l'espacement.
