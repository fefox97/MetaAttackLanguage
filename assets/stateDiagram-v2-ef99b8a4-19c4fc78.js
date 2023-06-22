import{p as Q,d as M,s as X,D as H,a as Z,S as F,b as j,c as I}from"./styles-29b137c7-8528c582.js";import{G as tt}from"./layout-db328a38-3639f6da.js";import{aA as a,au as g,az as x,aM as et,aB as ot,aD as w}from"./index-01d6c808.js";import{r as st}from"./index-714fe675-6c99c2e4.js";import"./edges-e08b4480-0003d6d2.js";import"./createText-d34e51c6-0a9c80cf.js";import"./svgDraw-591e3474-aee76526.js";import"./line-9ed8ba8b-9b86b2a8.js";import"./array-b7dcf730-9f3ba611.js";import"./constant-b644328d-6af51708.js";const h="rect",C="rectWithTitle",nt="start",ct="end",it="divider",rt="roundedWithTitle",at="note",lt="noteGroup",_="statediagram",dt="state",Et=`${_}-${dt}`,U="transition",St="note",Tt="note-edge",pt=`${U} ${Tt}`,_t=`${_}-${St}`,ut="cluster",Dt=`${_}-${ut}`,ft="cluster-alt",At=`${_}-${ft}`,V="parent",Y="note",bt="state",N="----",ht=`${N}${Y}`,O=`${N}${V}`,z="fill:none",W="fill: #333",m="c",q="text",K="normal";let y={},E=0;const yt=function(t){const n=Object.keys(t);for(const e of n)t[e]},gt=function(t,n){a.trace("Extracting classes"),n.db.clear();try{return n.parser.parse(t),n.db.extract(n.db.getRootDocV2()),n.db.getClasses()}catch(e){return e}};function $t(t){return t==null?"":t.classes?t.classes.join(" "):""}function R(t="",n=0,e="",c=N){const i=e!==null&&e.length>0?`${c}${e}`:"";return`${bt}-${t}${i}-${n}`}const b=(t,n,e,c,i,r)=>{const o=e.id,u=$t(c[o]);if(o!=="root"){let T=h;e.start===!0&&(T=nt),e.start===!1&&(T=ct),e.type!==H&&(T=e.type),y[o]||(y[o]={id:o,shape:T,description:w.sanitizeText(o,g()),classes:`${u} ${Et}`});const s=y[o];e.description&&(Array.isArray(s.description)?(s.shape=C,s.description.push(e.description)):s.description.length>0?(s.shape=C,s.description===o?s.description=[e.description]:s.description=[s.description,e.description]):(s.shape=h,s.description=e.description),s.description=w.sanitizeTextOrArray(s.description,g())),s.description.length===1&&s.shape===C&&(s.shape=h),!s.type&&e.doc&&(a.info("Setting cluster for ",o,G(e)),s.type="group",s.dir=G(e),s.shape=e.type===Z?it:rt,s.classes=s.classes+" "+Dt+" "+(r?At:""));const p={labelStyle:"",shape:s.shape,labelText:s.description,classes:s.classes,style:"",id:o,dir:s.dir,domId:R(o,E),type:s.type,padding:15};if(p.centerLabel=!0,e.note){const l={labelStyle:"",shape:at,labelText:e.note.text,classes:_t,style:"",id:o+ht+"-"+E,domId:R(o,E,Y),type:s.type,padding:15},d={labelStyle:"",shape:lt,labelText:e.note.text,classes:s.classes,style:"",id:o+O,domId:R(o,E,V),type:"group",padding:0};E++;const D=o+O;t.setNode(D,d),t.setNode(l.id,l),t.setNode(o,p),t.setParent(o,D),t.setParent(l.id,D);let S=o,f=l.id;e.note.position==="left of"&&(S=l.id,f=o),t.setEdge(S,f,{arrowhead:"none",arrowType:"",style:z,labelStyle:"",classes:pt,arrowheadStyle:W,labelpos:m,labelType:q,thickness:K})}else t.setNode(o,p)}n&&n.id!=="root"&&(a.trace("Setting node ",o," to be child of its parent ",n.id),t.setParent(o,n.id)),e.doc&&(a.trace("Adding nodes children "),xt(t,e,e.doc,c,i,!r))},xt=(t,n,e,c,i,r)=>{a.trace("items",e),e.forEach(o=>{switch(o.stmt){case j:b(t,n,o,c,i,r);break;case H:b(t,n,o,c,i,r);break;case F:{b(t,n,o.state1,c,i,r),b(t,n,o.state2,c,i,r);const u={id:"edge"+E,arrowhead:"normal",arrowTypeEnd:"arrow_barb",style:z,labelStyle:"",label:w.sanitizeText(o.description,g()),arrowheadStyle:W,labelpos:m,labelType:q,thickness:K,classes:U};t.setEdge(o.state1.id,o.state2.id,u,E),E++}break}})},G=(t,n=I)=>{let e=n;if(t.doc)for(let c=0;c<t.doc.length;c++){const i=t.doc[c];i.stmt==="dir"&&(e=i.value)}return e},Ct=async function(t,n,e,c){a.info("Drawing state diagram (v2)",n),y={},c.db.getDirection();const{securityLevel:i,state:r}=g(),o=r.nodeSpacing||50,u=r.rankSpacing||50;a.info(c.db.getRootDocV2()),c.db.extract(c.db.getRootDocV2()),a.info(c.db.getRootDocV2());const T=c.db.getStates(),s=new tt({multigraph:!0,compound:!0}).setGraph({rankdir:G(c.db.getRootDocV2()),nodesep:o,ranksep:u,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}});b(s,void 0,c.db.getRootDocV2(),T,c.db,!0);let p;i==="sandbox"&&(p=x("#i"+n));const l=i==="sandbox"?x(p.nodes()[0].contentDocument.body):x("body"),d=l.select(`[id="${n}"]`),D=l.select("#"+n+" g");await st(D,s,["barb"],_,n);const S=8;et.insertTitle(d,"statediagramTitleText",r.titleTopMargin,c.db.getDiagramTitle());const f=d.node().getBBox(),L=f.width+S*2,P=f.height+S*2;d.attr("class",_);const k=d.node().getBBox();ot(d,P,L,r.useMaxWidth);const v=`${k.x-S} ${k.y-S} ${L} ${P}`;a.debug(`viewBox ${v}`),d.attr("viewBox",v);const J=document.querySelectorAll('[id="'+n+'"] .edgeLabel .label');for(const $ of J){const B=$.getBBox(),A=document.createElementNS("http://www.w3.org/2000/svg",h);A.setAttribute("rx",0),A.setAttribute("ry",0),A.setAttribute("width",B.width),A.setAttribute("height",B.height),$.insertBefore(A,$.firstChild)}},Rt={setConf:yt,getClasses:gt,draw:Ct},Ht={parser:Q,db:M,renderer:Rt,styles:X,init:t=>{t.state||(t.state={}),t.state.arrowMarkerAbsolute=t.arrowMarkerAbsolute,M.clear()}};export{Ht as diagram};