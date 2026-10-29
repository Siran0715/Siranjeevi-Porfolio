
(function(){
'use strict';
/* ---------- content and configuration (edit here) ---------- */
var CONFIG={
  links:{
    github:'https://github.com/Siran0715',
    linkedin:'https://www.linkedin.com/in/siranjeevi-d-49014941',
    eduRepo:'https://github.com/Siran0715/EduVerse_Backend',
    orbitRepo:'https://github.com/Siran0715/Orbit-Meet'
  },
  resumeUrl:'' /* paste a public résumé URL here when it is ready */
};

var SHOTS=[
  {t:'Dashboard',d:'Dashboard. Counters for total, active, deleted and added-today students, a greeting, and a system status panel that lists the backend and the database.'},
  {t:'AI assistant',d:'AI assistant. A chat view that opens with a greeting from EduVerse AI, with a message box and a send button.'},
  {t:'Settings',d:'Settings. Profile information with name, email and role, a change password action, and logout.'}
];

var ARCH={
  ui:{t:'React.js interface',d:'The screens in the gallery: dashboard, students, AI assistant and settings. It talks to the backend with Axios and uses React Toastify for notifications.'},
  api:{t:'Spring Boot application',d:'Handles student management, user management, audit logs and dashboard data. Spring Security with JWT covers login and registration.'},
  orm:{t:'Spring Data JPA with Hibernate',d:'Maps application entities to database tables. The dashboard separates active students from soft-deleted ones, so deleted records are marked instead of removed.'},
  db:{t:'MySQL',d:'Stores the application data. The connection URL, username and password are supplied through application properties.'},
  ext:{t:'Gemini API',d:'An external Google service. The backend is configured with a Gemini API key, and the AI assistant screen is the part of the interface that uses it.'}
};

var TYPES={proj:'Public repository',prac:'Practical implementation',lab:'Learning lab'};
var CATALOGUE=[
  {id:'library',t:'Library Management microservices',type:'prac',tags:['Microservices','API Gateway','PostgreSQL','Redis'],
   pts:['Separate Book, Customer and Order services.','An API Gateway in front of the services.','PostgreSQL for persistence and Redis for caching.'],repo:''},
  {id:'auth',t:'OAuth and two-factor authentication',type:'prac',tags:['OAuth','2FA'],
   pts:['Hands-on practice with OAuth sign-in and two-factor authentication.','Both are also named in the OrbitMeet repository description.'],repo:''},
  {id:'selenium',t:'Selenium test automation',type:'prac',tags:['Selenium','TestNG','Maven','Extent Reports'],
   pts:['Explicit waits for stable element handling.','Page Object Model to keep tests maintainable.','Data-driven testing with TestNG, built with Maven.','Extent Reports for test reporting.'],repo:''},
  {id:'ailabs',t:'AI orchestration experiments',type:'lab',tags:['Spring AI','LangChain4j','LangGraph4j','Gemini API'],
   pts:['Spring AI with Gemini.','LangChain4j with Gemini.','LangGraph4j experiments.'],repo:''},
  {id:'cloud',t:'Cloud-native and GitOps labs',type:'lab',tags:['Docker','Kubernetes','Istio','Envoy Gateway','Argo CD'],
   pts:['Containers with Docker and orchestration with Kubernetes.','Service mesh work with Istio and Envoy Gateway.','GitOps delivery with Argo CD.'],repo:''}
];

var CATS=[
  {n:'Core languages and scripting',t:['Java','JavaScript','SQL','Linux','Bash / Shell Scripting']},
  {n:'Backend, APIs and messaging',t:['Spring Boot','Spring Security','JWT','OAuth','2FA','REST APIs','gRPC','Apache Kafka']},
  {n:'Frontend and real-time',t:['React.js','HTML','CSS','WebSocket','WebRTC']},
  {n:'Data and persistence',t:['Hibernate/JPA','MySQL','PostgreSQL','Redis']},
  {n:'AI engineering',t:['Gemini API','Spring AI','LangChain4j','LangGraph4j']},
  {n:'Testing and code quality',t:['Selenium WebDriver','JUnit','TestNG','Maven','Page Object Model','Data-driven Testing','Extent Reports','SonarQube']},
  {n:'Cloud-native delivery',t:['Git','GitHub','Docker','Kubernetes','NGINX','Istio','Envoy Gateway','Argo CD','GitOps','CI/CD']},
  {n:'Observability',t:['Prometheus','Grafana','Jaeger','Kiali']}
];
var PROJ={edu:{n:'EduVerse',k:'Public repository',href:'#edu'},orbit:{n:'OrbitMeet',k:'Public repository',href:'#orbit'},
  library:{n:'Library Management microservices',k:'Practical implementation'},auth:{n:'OAuth and 2FA practice',k:'Practical implementation'},
  selenium:{n:'Selenium test automation',k:'Practical implementation'},ailabs:{n:'AI orchestration experiments',k:'Learning lab'},cloud:{n:'Cloud-native and GitOps labs',k:'Learning lab'}};
var USE={
 'Java':['edu','selenium','ailabs'],'JavaScript':['orbit','edu'],'Spring Boot':['edu'],'Spring Security':['edu'],'JWT':['edu'],'OAuth':['orbit','auth'],'2FA':['orbit','auth'],'REST APIs':['edu'],
 'React.js':['edu'],'WebSocket':['orbit'],'WebRTC':['orbit'],'Hibernate/JPA':['edu'],'MySQL':['edu'],'PostgreSQL':['library'],'Redis':['library'],
 'Selenium WebDriver':['selenium'],'TestNG':['selenium'],'Maven':['selenium','edu'],'Page Object Model':['selenium'],'Data-driven Testing':['selenium'],'Extent Reports':['selenium'],
 'Docker':['cloud'],'Kubernetes':['cloud'],'Istio':['cloud'],'Envoy Gateway':['cloud'],'Argo CD':['cloud'],'GitOps':['cloud'],
 'Gemini API':['edu','ailabs'],'Spring AI':['ailabs'],'LangChain4j':['ailabs'],'LangGraph4j':['ailabs']
};

var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* links */
$$('[data-link]').forEach(function(a){a.href=CONFIG.links[a.getAttribute('data-link')]});

/* resume */
(function(){
  var c=$('#resumeCell');
  if(CONFIG.resumeUrl){
    c.insertAdjacentHTML('beforeend','<a class="big" href="'+CONFIG.resumeUrl+'" target="_blank" rel="noopener noreferrer">Open résumé</a><p class="muted">Opens in a new tab.</p>');
  }else{
    c.insertAdjacentHTML('beforeend','<p class="st">Being updated</p><p class="muted">A résumé link will appear here when it is ready.</p>');
  }
})();

/* viewer */
var viewer=$('#viewer');
function openViewer(src,alt,cap){
  $('#vImg').src=src;$('#vImg').alt=alt;$('#vCap').textContent=cap;
  if(viewer.showModal){try{viewer.showModal()}catch(e){viewer.setAttribute('open','')}}else{viewer.setAttribute('open','')}
}
$('#vClose').addEventListener('click',function(){viewer.close?viewer.close():viewer.removeAttribute('open')});
viewer.addEventListener('click',function(e){if(e.target===viewer){viewer.close&&viewer.close()}});

/* EduVerse gallery */
(function(){
  var shots=$$('.shot'),tabs=$$('.tab'),cap=$('#shotCap'),cur=0;
  function set(i){
    cur=i;
    shots.forEach(function(s,k){s.setAttribute('data-pos',String((k-i+3)%3))});
    tabs.forEach(function(t,k){t.setAttribute('aria-pressed',k===i?'true':'false')});
    cap.textContent=SHOTS[i].d;
  }
  shots.forEach(function(s,k){s.addEventListener('click',function(){
    if(k!==cur){set(k)}else{var im=$('img',s);openViewer(im.src,im.alt,SHOTS[k].t)}
  })});
  tabs.forEach(function(t,k){t.addEventListener('click',function(){set(k)})});
  $('#enlarge').addEventListener('click',function(){var im=$('img',shots[cur]);openViewer(im.src,im.alt,SHOTS[cur].t)});
  set(0);
  var deck=$('#deck');
  if(!reduce&&window.matchMedia('(hover:hover)').matches){
    deck.addEventListener('pointermove',function(e){
      var r=deck.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      deck.style.setProperty('--ry',(x*7).toFixed(2)+'deg');deck.style.setProperty('--rx',(-y*6).toFixed(2)+'deg');
    });
    deck.addEventListener('pointerleave',function(){deck.style.setProperty('--ry','0deg');deck.style.setProperty('--rx','0deg')});
  }
})();

/* architecture */
(function(){
  var nodes=$$('#arch .node'),det=$('#archDetail');
  function show(k){
    nodes.forEach(function(n){n.setAttribute('aria-pressed',n.getAttribute('data-n')===k?'true':'false')});
    det.innerHTML='<strong></strong><span></span>';
    $('strong',det).textContent=ARCH[k].t;$('span',det).textContent=ARCH[k].d;
  }
  nodes.forEach(function(n){
    var k=n.getAttribute('data-n');
    n.addEventListener('click',function(){show(k)});
    n.addEventListener('mouseenter',function(){show(k)});
  });
  show('ui');
})();

/* OrbitMeet pins */
(function(){
  var pins=$$('.pin'),leg=$$('#legend button');
  function set(p){
    pins.forEach(function(x){x.setAttribute('aria-pressed',x.getAttribute('data-p')===p?'true':'false')});
    leg.forEach(function(x){x.setAttribute('aria-pressed',x.getAttribute('data-p')===p?'true':'false')});
  }
  pins.concat(leg).forEach(function(b){b.addEventListener('click',function(){set(b.getAttribute('data-p'))})});
  var f=$('#oFrame');
  if(!reduce&&window.matchMedia('(hover:hover)').matches){
    f.addEventListener('pointermove',function(e){
      var r=f.getBoundingClientRect();var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      f.style.setProperty('--ry',(x*6).toFixed(2));f.style.setProperty('--rx',(-y*5).toFixed(2));
    });
    f.addEventListener('pointerleave',function(){f.style.setProperty('--ry',0);f.style.setProperty('--rx',0)});
  }
})();

/* catalogue */
var filter='all';
function renderCatalogue(){
  var fb=$('#filters');
  var opts=[['all','All'],['prac',TYPES.prac+'s'],['lab',TYPES.lab+'s']];
  fb.innerHTML='';
  opts.forEach(function(o){
    var b=document.createElement('button');b.className='fbtn';b.type='button';b.textContent=o[1];
    b.setAttribute('aria-pressed',filter===o[0]?'true':'false');
    b.addEventListener('click',function(){filter=o[0];renderCatalogue()});
    fb.appendChild(b);
  });
  var list=$('#catalogue');list.innerHTML='';
  CATALOGUE.forEach(function(c){
    var row=document.createElement('div');row.className='row';row.id='row-'+c.id;
    if(filter!=='all'&&c.type!==filter)row.hidden=true;
    var tcls=c.type==='lab'?'lab':'prac';
    row.innerHTML='<button class="row-head" aria-expanded="false" aria-controls="b-'+c.id+'"><span class="rt"></span><span class="chips"></span><span class="chev" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M7 1v12M1 7h12"/></svg></span></button><div class="row-body" id="b-'+c.id+'" hidden><span class="chip '+tcls+'" style="justify-self:start"></span><ul></ul><div class="repo"></div></div>';
    $('.rt',row).textContent=c.t;
    var chips=$('.chips',row);
    c.tags.slice(0,3).forEach(function(t){var s=document.createElement('span');s.className='chip';s.textContent=t;chips.appendChild(s)});
    $('.chip.'+tcls,row).textContent=TYPES[c.type];
    var ul=$('ul',row);c.pts.forEach(function(p){var li=document.createElement('li');li.textContent=p;ul.appendChild(li)});
    var repo=$('.repo',row);
    if(c.repo){repo.innerHTML='<a class="btn" target="_blank" rel="noopener noreferrer">View repository</a>';$('a',repo).href=c.repo}
    else{repo.innerHTML='<p class="evidence" style="border:0;padding:0">No public repository is linked for this item.</p>'}
    var head=$('.row-head',row),body=$('.row-body',row);
    head.addEventListener('click',function(){
      var open=head.getAttribute('aria-expanded')==='true';
      head.setAttribute('aria-expanded',open?'false':'true');body.hidden=open;
    });
    list.appendChild(row);
  });
}
function openRow(id){
  filter='all';renderCatalogue();
  var row=$('#row-'+id);if(!row)return;
  var head=$('.row-head',row);head.setAttribute('aria-expanded','true');$('.row-body',row).hidden=false;
  row.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'});
  row.classList.add('flash');
}
renderCatalogue();

/* skills */
(function(){
  var cats=$('#cats'),where=$('#where'),sel='Gemini API';
  CATS.forEach(function(c){
    var d=document.createElement('div');d.className='cat';
    d.innerHTML='<h3></h3><div class="chips"></div>';$('h3',d).textContent=c.n;
    c.t.forEach(function(t){
      var b=document.createElement('button');b.type='button';b.className='tech';b.textContent=t;b.setAttribute('data-t',t);b.setAttribute('aria-pressed','false');
      b.addEventListener('click',function(){sel=sel===t?null:t;paint()});
      $('.chips',d).appendChild(b);
    });
    cats.appendChild(d);
  });
  function paint(){
    var used=sel?USE[sel]||[]:[];
    $$('.tech').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-t')===sel?'true':'false')});
    where.innerHTML='';
    var h=document.createElement('h3');var m=document.createElement('p');m.className='mono';
    if(!sel){m.textContent='Where it shows up';h.textContent='Select a technology';
      where.appendChild(m);where.appendChild(h);return}
    m.textContent='Where it shows up';h.textContent=sel;
    where.appendChild(m);where.appendChild(h);
    var pills=document.createElement('div');pills.className='pills';
    if(!used.length){
      var note=document.createElement('p');note.className='muted skill-note';
      note.textContent='Listed as part of my wider engineering skill set. No featured-project connection is being claimed here.';
      pills.appendChild(note);
    }
    used.forEach(function(id){
      var p=PROJ[id];var el;
      if(p.href){el=document.createElement('a');el.href=p.href}
      else{el=document.createElement('button');el.type='button';el.addEventListener('click',function(){openRow(id)})}
      el.className='pill';el.innerHTML='<span></span><small></small>';
      $('span',el).textContent=p.n;$('small',el).textContent=p.k;pills.appendChild(el);
    });
    where.appendChild(pills);
  }
  paint();
})();

/* ---------- hero lattice (canvas, pointer-reactive) ---------- */
(function(){
  var cv=$('#lattice');if(!cv||!cv.getContext)return;
  var ctx=cv.getContext('2d');if(!ctx)return;
  var stage=$('#stage'),frame=$('#frame'),hero=$('#heroWrap');
  var phi=(1+Math.sqrt(5))/2,V=[],E=[];
  function norm(p,r){var l=Math.hypot(p[0],p[1],p[2]);return [p[0]/l*r,p[1]/l*r,p[2]/l*r]}
  var ico=[[-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],[0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],[phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]];
  ico.forEach(function(p){V.push({p:norm(p,1),k:'o'})});
  var inner=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  inner.forEach(function(p){V.push({p:norm(p,.5),k:'i'})});
  var labels=['API','DB','RTC','AI','UI'],ringN=10,ringStart=V.length;
  for(var i=0;i<ringN;i++){
    var a=i/ringN*Math.PI*2,x=Math.cos(a)*1.62,z=Math.sin(a)*1.62,y=Math.sin(a*2)*.18;
    V.push({p:[x,y,z],k:'r',lab:i%2===0?labels[i/2]:null});
  }
  function d(a,b){return Math.hypot(a.p[0]-b.p[0],a.p[1]-b.p[1],a.p[2]-b.p[2])}
  for(var a=0;a<12;a++)for(var b=a+1;b<12;b++)if(d(V[a],V[b])<1.12)E.push([a,b,'o']);
  for(var a2=12;a2<18;a2++){
    for(var b2=a2+1;b2<18;b2++)if(d(V[a2],V[b2])<.75)E.push([a2,b2,'i']);
    var near=[];for(var c=0;c<12;c++)near.push([d(V[a2],V[c]),c]);
    near.sort(function(x,y){return x[0]-y[0]});E.push([a2,near[0][1],'x']);E.push([a2,near[1][1],'x']);
  }
  for(var r=0;r<ringN;r++){
    E.push([ringStart+r,ringStart+(r+1)%ringN,'r']);
    if(r%2===0){var nn=[];for(var c2=0;c2<12;c2++)nn.push([d(V[ringStart+r],V[c2]),c2]);nn.sort(function(x,y){return x[0]-y[0]});E.push([ringStart+r,nn[0][1],'x'])}
  }
  var W=0,H=0,dpr=1,t0=performance.now(),px=0,py=0,tx=0,ty=0,mx=-999,my=-999,running=false,visible=true;
  function size(){
    var r=cv.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);
    W=r.width;H=r.height;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    if(!running)draw(0);
  }
  function draw(t){
    ctx.clearRect(0,0,W,H);
    var yaw=t*0.00018+px*.7,pitch=.42+py*.35,cy=Math.cos(yaw),sy=Math.sin(yaw),cx=Math.cos(pitch),sx=Math.sin(pitch);
    var S=Math.min(W,H)*.27,f=3.6,ox=W/2,oy=H/2,P=[];
    for(var i=0;i<V.length;i++){
      var p=V[i].p,x=p[0]*cy+p[2]*sy,z=-p[0]*sy+p[2]*cy,y=p[1];
      var y2=y*cx-z*sx,z2=y*sx+z*cx,k=f/(f+z2);
      P.push({x:ox+x*S*k,y:oy+y2*S*k,z:z2,k:k});
    }
    ctx.lineWidth=1;
    for(var e=0;e<E.length;e++){
      var A=P[E[e][0]],B=P[E[e][1]],type=E[e][2],dep=(A.z+B.z)/2;
      var al=.1+.38*(1.6-dep)/3.2;if(type==='x')al*=.7;if(type==='r')al*=.9;
      ctx.strokeStyle=type==='x'?'rgba(154,176,230,'+al+')':'rgba(110,160,255,'+al+')';
      ctx.setLineDash(type==='r'?[3,4]:[]);
      ctx.beginPath();ctx.moveTo(A.x,A.y);ctx.lineTo(B.x,B.y);ctx.stroke();
    }
    ctx.setLineDash([]);
    var hot=-1,best=64;
    for(var j=0;j<P.length;j++){var dd=Math.hypot(P[j].x-mx,P[j].y-my);if(dd<best){best=dd;hot=j}}
    ctx.font='500 11px "IBM Plex Mono",monospace';ctx.textBaseline='middle';
    for(var n=0;n<P.length;n++){
      var q=P[n],v=V[n],front=(1.6-q.z)/3.2,isHot=n===hot;
      var rad=(v.k==='r'?2.6:v.k==='i'?1.8:2.2)*q.k*(isHot?1.9:1);
      if(isHot){var g=ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,26);g.addColorStop(0,'rgba(122,167,255,.55)');g.addColorStop(1,'rgba(122,167,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(q.x,q.y,26,0,6.283);ctx.fill()}
      ctx.fillStyle=isHot?'#e9f1ff':'rgba(190,212,255,'+(.35+.55*front)+')';
      ctx.beginPath();ctx.arc(q.x,q.y,Math.max(1,rad),0,6.283);ctx.fill();
      if(v.lab){ctx.fillStyle='rgba(154,172,203,'+(isHot?1:.25+.5*front)+')';ctx.fillText(v.lab,q.x+8,q.y)}
    }
  }
  function frameLoop(now){
    if(!running)return;
    px+=(tx-px)*.06;py+=(ty-py)*.06;
    frame.style.setProperty('--ry',(px*6).toFixed(2));frame.style.setProperty('--rx',(-py*4).toFixed(2));
    draw(now-t0);requestAnimationFrame(frameLoop);
  }
  function start(){if(reduce||running||!visible||document.hidden)return;running=true;requestAnimationFrame(frameLoop)}
  function stop(){running=false}
  hero.addEventListener('pointermove',function(e){
    var r=hero.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*2;ty=((e.clientY-r.top)/r.height-.5)*2;
    var c=cv.getBoundingClientRect();mx=e.clientX-c.left;my=e.clientY-c.top;
  });
  hero.addEventListener('pointerleave',function(){tx=0;ty=0;mx=-999;my=-999});
  if('ResizeObserver' in window){new ResizeObserver(size).observe(cv)}else{window.addEventListener('resize',size)}
  if('IntersectionObserver' in window){new IntersectionObserver(function(es){visible=es[0].isIntersecting;visible?start():stop()}).observe(stage)}
  document.addEventListener('visibilitychange',function(){document.hidden?stop():start()});
  size();draw(0);start();
})();
})();
