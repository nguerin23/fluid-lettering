/* Bandeau Fluid commun aux deux publications Facebook 4:5 (1080 x 1350).
   Trois courbes fluides bleues, avec léger relief, sur toute la largeur du pied de page. */
(() => {
  'use strict';
  const WIDTH=1080, HEIGHT=1350;
  function draw(ctx, top=1226){
    ctx.save();
    ctx.beginPath();
    ctx.rect(0,top,WIDTH,HEIGHT-top);
    ctx.clip();
    const bg=ctx.createLinearGradient(0,top,WIDTH,HEIGHT);
    bg.addColorStop(0,'#EEF3FF');
    bg.addColorStop(.65,'#E6ECFF');
    bg.addColorStop(1,'#D6E2FF');
    ctx.fillStyle=bg;
    ctx.fillRect(0,top,WIDTH,HEIGHT-top);

    const flow=ctx.createLinearGradient(-60,top,1140,HEIGHT);
    flow.addColorStop(0,'#070B66');
    flow.addColorStop(.27,'#3152F4');
    flow.addColorStop(.55,'#7C99F7');
    flow.addColorStop(.8,'#3152F4');
    flow.addColorStop(1,'#070B66');
    ctx.beginPath();
    ctx.moveTo(-80,1323);
    ctx.bezierCurveTo(122,1235,221,1379,385,1296);
    ctx.bezierCurveTo(544,1218,670,1370,829,1291);
    ctx.bezierCurveTo(979,1218,1026,1340,1160,1268);
    ctx.lineWidth=32;
    ctx.lineCap='round';
    ctx.lineJoin='round';
    ctx.strokeStyle=flow;
    ctx.shadowColor='rgba(7,11,102,0.20)';
    ctx.shadowBlur=11;
    ctx.shadowOffsetY=5;
    ctx.stroke();
    ctx.shadowBlur=0;
    ctx.shadowOffsetY=0;

    const ribbon=ctx.createLinearGradient(-20,HEIGHT,1120,top);
    ribbon.addColorStop(0,'#C9D6FF');
    ribbon.addColorStop(.5,'#FFFFFF');
    ribbon.addColorStop(1,'#7C99F7');
    ctx.beginPath();
    ctx.moveTo(-50,1348);
    ctx.bezierCurveTo(123,1288,253,1364,419,1322);
    ctx.bezierCurveTo(613,1270,704,1374,866,1323);
    ctx.bezierCurveTo(992,1284,1048,1342,1133,1314);
    ctx.strokeStyle=ribbon;
    ctx.lineWidth=12;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-30,1286);
    ctx.bezierCurveTo(145,1253,277,1342,422,1265);
    ctx.bezierCurveTo(581,1210,694,1323,851,1260);
    ctx.bezierCurveTo(976,1234,1074,1300,1133,1254);
    ctx.lineWidth=5;
    ctx.strokeStyle='rgba(124,153,247,0.66)';
    ctx.stroke();
    ctx.restore();
  }
  window.PJ_FB_FLUID={draw};
})();
