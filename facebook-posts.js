/* Deux maquettes fixes Facebook 4:5, sans champs de saisie.
   Photo de la médiathèque et logo vectoriel fournis avec le projet. */
(() => {
  'use strict';

  const $=id=>document.getElementById(id);
  const canvas=$('fbCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx)return;

  const C={navy:'#070B66',blue:'#3152F4',sky:'#7C99F7',pale:'#E6ECFF',paper:'#F7F9FF',white:'#FFFFFF',muted:'#50649D'};
  const practical={
    tags:['INFORMATION','SERVICES','MAIRIE'],
    lines:[
      'Accueil exceptionnellement fermé',
      'jeudi après-midi à la mairie',
      'Merci de votre compréhension.'
    ]
  };
  const buttons=[...document.querySelectorAll('[data-fb-template]')];
  const status=$('fbStatus'),help=$('fbTemplateHelp');
  const photo=new Image(),logo=new Image();
  let current='evenements',pending=false;

  function redrawOnLoad(img,url){
    img.addEventListener('load',schedule);
    img.addEventListener('error',()=>{
      status.textContent='Image indisponible : visuel de remplacement utilisé.';
      schedule();
    });
    img.src=url;
  }
  redrawOnLoad(photo,'images/plenee-jugon-mediatheque-banniere.jpg');
  redrawOnLoad(logo,'logo-plenee-jugon-monochrome-bleu-nuit.svg');

  function drawCover(x,y,w,h){
    if(photo.complete&&photo.naturalWidth>0&&photo.naturalHeight>0){
      const scale=Math.max(w/photo.naturalWidth,h/photo.naturalHeight);
      const sw=w/scale,sh=h/scale;
      ctx.drawImage(photo,(photo.naturalWidth-sw)/2,(photo.naturalHeight-sh)/2,sw,sh,x,y,w,h);
      return;
    }
    const gradient=ctx.createLinearGradient(0,0,w,h);
    gradient.addColorStop(0,C.navy);
    gradient.addColorStop(1,C.blue);
    ctx.fillStyle=gradient;ctx.fillRect(x,y,w,h);
  }

  function drawLine(value,x,y,maxW,maxSize,minSize,color,weight='500',family='Outfit'){
    let text=String(value||'').trim();
    let size=maxSize;
    ctx.textBaseline='top';ctx.textAlign='left';
    while(size>minSize){
      ctx.font=weight+' '+size+'px '+family+', Arial, sans-serif';
      if(ctx.measureText(text).width<=maxW)break;
      size-=2;
    }
    ctx.font=weight+' '+size+'px '+family+', Arial, sans-serif';
    if(ctx.measureText(text).width>maxW){
      while(text.length>1&&ctx.measureText(text+'…').width>maxW)text=text.slice(0,-1);
      text=text.trimEnd()+'…';
    }
    ctx.fillStyle=color;ctx.fillText(text,x,y);
  }

  function drawPractical(){
    const {navy,blue,pale,paper,white,muted}=C;
    ctx.fillStyle=paper;ctx.fillRect(0,0,1080,1350);

    // 1 — Photo source, bord à bord, sur la partie haute.
    drawCover(0,0,1080,585);

    // 2 — Exactement trois petites balises, toutes alignées à gauche.
    let x=76;
    const y=655;
    practical.tags.forEach(tag=>{
      ctx.font='700 23px Manrope, Arial, sans-serif';
      const badgeW=Math.min(286,Math.max(112,ctx.measureText(tag).width+40));
      ctx.fillStyle=white;
      ctx.beginPath();ctx.roundRect(x,y,badgeW,58,10);ctx.fill();
      ctx.strokeStyle='#C9D6FF';ctx.lineWidth=2;ctx.stroke();
      drawLine(tag,x+20,y+17,badgeW-36,23,19,blue,'700','Manrope');
      x+=badgeW+14;
    });

    // 3 — Trois lignes de texte : même origine et alignement à gauche.
    const starts=[804,922,1040];
    practical.lines.forEach((line,i)=>
      drawLine(line,76,starts[i],930,72,45,navy,'600','Outfit')
    );

    // 4 — Logo de la commune dans le coin inférieur droit.
    ctx.strokeStyle='#CBD6F5';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(76,1212);ctx.lineTo(1006,1212);ctx.stroke();
    drawLine('EXEMPLE FICTIF · MAQUETTE',76,1279,560,17,16,muted,'700','Manrope');
    if(logo.complete&&logo.naturalWidth>0){
      const w=244,h=w*88/246;
      ctx.drawImage(logo,1080-76-w,1230,w,h);
    }else{
      drawLine('Plénée-Jugon',785,1260,216,26,20,navy,'600');
    }
  }

  function render(){
    if(current==='evenements'){
      window.PJ_FB_TIMELINE.draw(ctx,{photo,logo});
    }else{
      drawPractical();
    }
    status.textContent='Aperçu · 1080 × 1350 px';
  }
  function schedule(){
    if(pending)return;
    pending=true;
    requestAnimationFrame(()=>{pending=false;render();});
  }
  function choose(value){
    if(value!=='evenements'&&value!=='pratique')return;
    current=value;
    buttons.forEach(button=>{
      button.setAttribute('aria-pressed',String(button.dataset.fbTemplate===value));
    });
    help.textContent=value==='evenements'
      ?'8 événements fictifs, alternés autour d’une frise verticale sous la photo et le titre.'
      :'Photo en haut, trois mots-clés et trois lignes alignées à gauche. Logo en bas à droite.';
    schedule();
  }
  buttons.forEach(button=>button.addEventListener('click',()=>choose(button.dataset.fbTemplate)));
  $('fbExport').addEventListener('click',()=>{
    render();
    canvas.toBlob(blob=>{
      if(!blob){status.textContent='Impossible de générer le fichier PNG.';return;}
      const url=URL.createObjectURL(blob),a=document.createElement('a');
      a.href=url;
      a.download='plenee-jugon-'+(current==='evenements'?'evenements-a-venir':'info-pratique')+'-exemple-1080x1350.png';
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1500);
      status.textContent='PNG 1080 × 1350 téléchargé.';
    },'image/png');
  });
  choose('evenements');
  if(document.fonts?.ready)document.fonts.ready.then(schedule);
})();
