/* Maquette fixe : 8 événements fictifs sur une frise verticale 4:5.
   Les données ne sont pas modifiables dans l'éditeur. */
(() => {
  'use strict';

  const events=[
    {date:'03 DÉC.',heure:'18H00',lieu:'Salle polyvalente',titre:'Réunion publique',description:'Projets de fin d’année'},
    {date:'05 DÉC.',heure:'10H30',lieu:'Médiathèque',titre:'Atelier lecture',description:'Animation pour les familles'},
    {date:'07 DÉC.',heure:'14H00',lieu:'Mairie',titre:'Permanence des élus',description:'Échanges avec les habitants'},
    {date:'10 DÉC.',heure:'19H00',lieu:'Espace associatif',titre:'Forum associatif',description:'Rencontre des bénévoles'},
    {date:'12 DÉC.',heure:'15H00',lieu:'Centre-bourg',titre:'Marché de Noël',description:'Stands et animations'},
    {date:'14 DÉC.',heure:'09H30',lieu:'École',titre:'Portes ouvertes',description:'Découverte des locaux'},
    {date:'17 DÉC.',heure:'18H30',lieu:'Salle des fêtes',titre:'Concert d’hiver',description:'Soirée musicale'},
    {date:'20 DÉC.',heure:'11H00',lieu:'Place de la mairie',titre:'Rencontre citoyenne',description:'Moment de partage'}
  ];

  const C={navy:'#070B66',blue:'#3152F4',sky:'#7C99F7',pale:'#E6ECFF',paper:'#F7F9FF',white:'#FFFFFF',muted:'#50649D'};

  function draw(ctx,{photo,logo}){
    const {navy,blue,sky,pale,paper,white,muted}=C;
    const fill=(color,x,y,w,h)=>{ctx.fillStyle=color;ctx.fillRect(x,y,w,h);};
    const font=(size,weight='500',family='Outfit')=>{
      ctx.font=weight+' '+size+'px '+family+', Arial, sans-serif';
    };
    const line=(value,x,y,maxW,size,minSize,color,weight='500',align='left',family='Outfit')=>{
      let text=String(value??'').replace(/\s+/g,' ').trim();
      if(!text)return;
      let pt=size;
      for(;pt>minSize;pt-=1){
        font(pt,weight,family);
        if(ctx.measureText(text).width<=maxW)break;
      }
      pt=Math.max(minSize,pt);
      font(pt,weight,family);
      if(ctx.measureText(text).width>maxW){
        while(text.length>1&&ctx.measureText(text+'…').width>maxW)text=text.slice(0,-1);
        text=text.trimEnd()+'…';
      }
      ctx.fillStyle=color;
      ctx.textBaseline='top';
      ctx.textAlign=align;
      ctx.fillText(text,x,y);
      ctx.textAlign='left';
    };

    fill(paper,0,0,1080,1350);
    // Photo de la commune pleine largeur, sans frise sur la couverture.
    if(photo&&photo.complete&&photo.naturalWidth>0){
      const iw=photo.naturalWidth,ih=photo.naturalHeight,scale=Math.max(1080/iw,328/ih);
      const sw=1080/scale,sh=328/scale;
      ctx.drawImage(photo,(iw-sw)/2,(ih-sh)/2,sw,sh,0,0,1080,328);
    }else{
      const grad=ctx.createLinearGradient(0,0,1080,328);
      grad.addColorStop(0,navy);grad.addColorStop(1,blue);
      ctx.fillStyle=grad;ctx.fillRect(0,0,1080,328);
    }

    fill(navy,0,328,1080,172);
    line('AGENDA  ·  EXEMPLES FICTIFS',76,350,920,24,21,sky,'700','left','Manrope');
    line('Événements à venir',75,397,940,76,60,white,'500');

    // Ligne centrale commençant seulement SOUS la couverture et le titre.
    const center=540,first=532,step=87;
    ctx.lineCap='round';
    ctx.lineWidth=4;
    ctx.strokeStyle=sky;
    ctx.beginPath();ctx.moveTo(center,first+5);ctx.lineTo(center,first+step*(events.length-1)+81);ctx.stroke();

    events.forEach((e,i)=>{
      const y=first+i*step;
      const left=i%2===0;
      const x=left?472:608,align=left?'right':'left',maxW=402;
      const cy=y+29;
      ctx.strokeStyle=sky;ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(center,cy);ctx.lineTo(left?497:583,cy);ctx.stroke();
      ctx.fillStyle=white;ctx.strokeStyle=blue;ctx.lineWidth=4;
      ctx.beginPath();ctx.arc(center,cy,9,0,Math.PI*2);ctx.fill();ctx.stroke();

      // Toutes les informations pratiques sur une même ligne, séparées par « | ».
      line(e.date+' | '+e.heure+' | '+e.lieu,x,y,maxW,18,14,blue,'700',align,'Manrope');
      line(e.titre,x,y+27,maxW,26,22,navy,'600',align);
      line(e.description,x,y+56,maxW,17,14,navy,'400',align,'Manrope');
    });

    // Bandeau Fluid sur 100 % de la largeur, sous le dernier événement.
    window.PJ_FB_FLUID.draw(ctx,1226);
    ctx.fillStyle='rgba(255,255,255,0.86)';
    ctx.beginPath();ctx.roundRect(64,1243,394,43,10);ctx.fill();
    line('EXEMPLES FICTIFS  ·  MAQUETTE',76,1253,365,17,15,muted,'700','left','Manrope');

    // Le vrai logo reste lisible au premier plan, en bas à droite.
    ctx.fillStyle='rgba(255,255,255,0.92)';
    ctx.beginPath();ctx.roundRect(786,1243,235,89,12);ctx.fill();
    if(logo&&logo.complete&&logo.naturalWidth>0){
      ctx.drawImage(logo,805,1251,200,200*88/246);
    }else{
      line('Plénée-Jugon',801,1271,206,23,17,navy,'600');
    }
  }

  window.PJ_FB_TIMELINE={draw,events};
})();
