/* Pied de page Fluid partagé : un trait unique, épais et monochrome.
   Canvas 1080×1350. Aucun dégradé, aucune ombre, aucune ligne secondaire. */
(() => {
  'use strict';
  function draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0,1285,1080,65);
    ctx.clip();
    ctx.beginPath();
    ctx.moveTo(-60,1331);
    ctx.bezierCurveTo(130,1297,250,1354,409,1326);
    ctx.bezierCurveTo(557,1298,690,1349,834,1325);
    ctx.bezierCurveTo(971,1300,1067,1346,1140,1317);
    ctx.strokeStyle='#070B66';
    ctx.lineWidth=30;
    ctx.lineCap='round';
    ctx.lineJoin='round';
    ctx.stroke();
    ctx.restore();
  }
  window.PJ_FB_FLUID={draw};
})();
