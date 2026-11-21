/* Pied de page Fluid partagé entre les deux visuels Facebook.
   Un seul ruban monochrome bleu nuit, très épais et traversant 1080 px.
   Le logo blanc est dessiné par-dessus depuis les modèles. */
(() => {
  'use strict';
  function draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0,1177,1080,173);
    ctx.clip();

    ctx.beginPath();
    ctx.moveTo(-100,1314);
    ctx.bezierCurveTo(115,1257,244,1337,405,1297);
    ctx.bezierCurveTo(562,1255,695,1336,840,1292);
    ctx.bezierCurveTo(986,1255,1064,1315,1180,1276);
    ctx.strokeStyle='#070B66';
    ctx.lineWidth=166;
    ctx.lineCap='round';
    ctx.lineJoin='round';
    ctx.stroke();
    ctx.restore();
  }
  window.PJ_FB_FLUID={draw};
})();
