/* Maquette Facebook fixe : huit événements fictifs en frise 4:5.
   Descriptions sur deux à trois lignes et informations séparées visuellement. */
(() => {
  'use strict';

  const events=[
    {date:'JEU. 03 DÉC.',heure:'18H00',lieu:'Salle polyvalente',titre:'Réunion publique',description:'Présentation des projets communaux à venir, suivie d’un temps d’échange ouvert à tous les habitants.'},
    {date:'SAM. 05 DÉC.',heure:'10H30',lieu:'Médiathèque',titre:'Atelier lecture',description:'Des histoires à écouter et des découvertes pour les petits comme pour les grands, dans une ambiance conviviale.'},
    {date:'LUN. 07 DÉC.',heure:'14H00',lieu:'Mairie',titre:'Permanence des élus',description:'Venez poser vos questions et partager vos idées avec les élus sur les projets de la commune.'},
    {date:'JEU. 10 DÉC.',heure:'19H00',lieu:'Espace associatif',titre:'Forum associatif',description:'Rencontrez les associations locales, leurs bénévoles et découvrez les activités proposées tout au long de l’année.'},
    {date:'SAM. 12 DÉC.',heure:'15H00',lieu:'Centre-bourg',titre:'Marché de Noël',description:'Stands artisanaux, gourmandises et animations pour profiter ensemble de l’esprit des fêtes au centre-bourg.'},
    {date:'LUN. 14 DÉC.',heure:'09H30',lieu:'École',titre:'Portes ouvertes',description:'Visites guidées, rencontres avec les équipes pédagogiques et présentation des projets de l’établissement.'},
    {date:'JEU. 17 DÉC.',heure:'18H30',lieu:'Salle des fêtes',titre:'Concert d’hiver',description:'Une soirée musicale ouverte à toutes et tous, pour partager un moment chaleureux avant les fêtes.'},
    {date:'DIM. 20 DÉC.',heure:'11H00',lieu:'Place de la mairie',titre:'Rencontre citoyenne',description:'Une matinée conviviale pour se retrouver, discuter et découvrir ensemble les initiatives locales.'}
  ];

  const C={navy:'#070B66',blue:'#3152F4',sky:'#7C99F7',paper:'#F7F9FF',white:'#FFFFFF',muted:'#50649D'};

  function draw(ctx,{photo,logo}){
    const {navy,blue,sky,paper,white,muted}=C;
    const fill=(color,x,y,w,h)=>{ctx.fillStyle=color;ctx.fillRect(x,y,w,h);};
    const font=(size,weight='500',family='Outfit')=>{
      ctx.font=weight+' '+size+'px '+family+', Arial, sans-serif';
    };
    function line(value,x,y,maxW,size,minSize,color,weight='500',align='left',family='Outfit'){
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
    }

    // Ligne d'information lisible : date | heure | lieu, espaces généreux
    // et nuances distinctes. L'ensemble s'aligne sur la colonne.
    function drawMetadata(e,x,y,align,maxWidth){
      const values=[
        {text:e.date,color:navy,weight:'750'},
        {text:e.heure,color:blue,weight:'750'},
        {text:e.lieu,color:muted,weight:'650'}
      ];
      let size=18,space=12,widths=[],total=0;
      for(;size>=14;size--){
        space=size>=16?12:8;
        widths=values.map(v=>{font(size,v.weight,'Manrope');return ctx.measureText(v.text).width;});
        font(size,'600','Manrope');
        const pipeWidth=ctx.measureText('|').width;
        total=widths.reduce((a,b)=>a+b,0)+2*(pipeWidth+space*2);
        if(total<=maxWidth)break;
      }
      size=Math.max(14,size);
      let cursor=align==='right'?x-total:x;
      ctx.textBaseline='top';ctx.textAlign='left';
      values.forEach((v,i)=>{
        font(size,v.weight,'Manrope');
        ctx.fillStyle=v.color;ctx.fillText(v.text,cursor,y);
        cursor+=widths[i];
        if(i<2){
          cursor+=space;
          font(size,'600','Manrope');
          ctx.fillStyle=sky;ctx.fillText('|',cursor,y);
          cursor+=ctx.measureText('|').width+space;
        }
      });
    }

    // Retour automatique à la ligne, sans dépasser trois lignes.
    function drawDescription(description,x,y,maxWidth,align){
      const size=17,leading=18;
      font(size,'450','Manrope');
      const words=String(description||'').trim().split(/\s+/).filter(Boolean);
      const lines=[];
      let current='';
      for(const word of words){
        const candidate=current?current+' '+word:word;
        if(current&&ctx.measureText(candidate).width>maxWidth){
          lines.push(current);
          current=word;
        }else current=candidate;
      }
      if(current)lines.push(current);
      const visible=lines.slice(0,3);
      if(lines.length>3&&visible.length){
        let last=visible[2];
        while(last.length>1&&ctx.measureText(last+'…').width>maxWidth)last=last.slice(0,-1);
        visible[2]=last.trimEnd()+'…';
      }
      ctx.fillStyle=navy;ctx.textBaseline='top';ctx.textAlign=align;
      visible.forEach((value,i)=>ctx.fillText(value,x,y+i*leading));
      ctx.textAlign='left';
    }

    fill(paper,0,0,1080,1350);
    // Photo moins haute pour laisser de la place aux descriptions développées.
    const photoHeight=218;
    if(photo&&photo.complete&&photo.naturalWidth>0&&photo.naturalHeight>0){
      const iw=photo.naturalWidth,ih=photo.naturalHeight;
      const scale=Math.max(1080/iw,photoHeight/ih);
      const sw=1080/scale,sh=photoHeight/scale;
      ctx.drawImage(photo,(iw-sw)/2,(ih-sh)/2,sw,sh,0,0,1080,photoHeight);
    }else{
      const grad=ctx.createLinearGradient(0,0,1080,photoHeight);
      grad.addColorStop(0,navy);grad.addColorStop(1,blue);
      ctx.fillStyle=grad;ctx.fillRect(0,0,1080,photoHeight);
    }

    // Bandeau du titre moins haut ET moins large que précédemment.
    fill(navy,0,218,948,116);
    line('Événements à venir',74,245,840,74,61,white,'500');

    const center=540,first=355,step=104;
    ctx.lineCap='round';ctx.lineWidth=3;ctx.strokeStyle=sky;
    ctx.beginPath();
    ctx.moveTo(center,first+28);
    ctx.lineTo(center,first+step*(events.length-1)+34);
    ctx.stroke();

    events.forEach((e,i)=>{
      const y=first+i*step;
      const left=i%2===0;
      const x=left?470:610,align=left?'right':'left',maxW=400;
      const cy=y+26;
      ctx.strokeStyle=sky;ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(center,cy);ctx.lineTo(left?494:586,cy);ctx.stroke();
      ctx.fillStyle=white;ctx.strokeStyle=blue;ctx.lineWidth=4;
      ctx.beginPath();ctx.arc(center,cy,8,0,Math.PI*2);ctx.fill();ctx.stroke();

      drawMetadata(e,x,y,align,maxW);
      line(e.titre,x,y+24,maxW,26,23,navy,'650',align);
      drawDescription(e.description,x,y+51,maxW,align);
    });

    // Le ruban Fluid large sert de support au texte et au logo blanc.
    window.PJ_FB_FLUID.draw(ctx);
    line('AGENDA  |  ÉVÉNEMENTS FICTIFS',76,1271,620,19,17,white,'700','left','Manrope');
    if(logo&&logo.complete&&logo.naturalWidth>0){
      ctx.drawImage(logo,808,1254,200,200*88/246);
    }else{
      line('Plénée-Jugon',800,1275,208,25,19,white,'650');
    }
  }

  window.PJ_FB_TIMELINE={draw,events};
})();
