import{d as U,i as q,a as G,c as z,b as I,s as J,v as c,w as r,j as S,f as C,g as e,n as F,h as o,m as a,p as K,x as V,t as $,F as O,o as l,k as B,y as Q,z as W,A as X,B as Y,C as Z,_ as ee}from"./index-01d6c808.js";import{N as L}from"./NoteDisplay-559820fc.js";const te={class:"h-full flex flex-col"},oe={key:0,class:"px-5 py-2 max-h-60 overflow-auto border-t border-gray-400 border-opacity-20"},ne={class:"flex-none border-t border-gray-400 border-opacity-20"},se={class:"flex gap-1 items-center px-6 py-3"},ae=e("div",{class:"flex-auto"},null,-1),le={class:"p2 text-center"},ie=U({__name:"NotesView",setup(ce){q(G);const M=z.titleTemplate.replace("%s",z.title||"Slidev");I({title:`Notes - ${M}`});const{isFullscreen:T,toggle:u}=Q,n=J("slidev-notes-font-size",18),s=c(()=>{var t;return((t=r.lastUpdate)==null?void 0:t.type)==="viewer"?r.viewerPage:r.page}),d=c(()=>S.find(t=>t.path===`${s.value}`)),i=c(()=>S.find(t=>t.path===`${s.value+1}`));function j(){n.value=n.value+1}function A(){n.value=n.value-1}return(t,_)=>{var p,m,v,f,g,x,h,b,y,k,N,w;const H=Y,R=Z,D=W,E=X;return l(),C(O,null,[e("div",{class:"fixed top-0 left-0 h-2px bg-teal-500 transition-all duration-500",style:F({width:`${(s.value-1)/o(B)*100}%`})},null,4),e("div",te,[e("div",{class:"px-5 flex-auto h-full overflow-auto",style:F({fontSize:`${o(n)}px`})},[a(L,{note:(v=(m=(p=d.value)==null?void 0:p.meta)==null?void 0:m.slide)==null?void 0:v.note,"note-html":(x=(g=(f=d.value)==null?void 0:f.meta)==null?void 0:g.slide)==null?void 0:x.noteHTML,placeholder:`No notes for Slide ${s.value}.`},null,8,["note","note-html","placeholder"])],4),i.value?(l(),C("div",oe,[a(L,{class:"opacity-50",note:(y=(b=(h=i.value)==null?void 0:h.meta)==null?void 0:b.slide)==null?void 0:y.note,"note-html":(w=(N=(k=i.value)==null?void 0:k.meta)==null?void 0:N.slide)==null?void 0:w.noteHTML,placeholder:"No notes for next slide."},null,8,["note","note-html"])])):K("v-if",!0),e("div",ne,[e("div",se,[e("button",{class:"slidev-icon-btn",onClick:_[0]||(_[0]=(...P)=>o(u)&&o(u)(...P))},[o(T)?(l(),V(H,{key:0})):(l(),V(R,{key:1}))]),e("button",{class:"slidev-icon-btn",onClick:j},[a(D)]),e("button",{class:"slidev-icon-btn",onClick:A},[a(E)]),ae,e("div",le,$(s.value)+" / "+$(o(B)),1)])])])],64)}}}),de=ee(ie,[["__file","/home/runner/work/MetaAttackLanguage/MetaAttackLanguage/node_modules/@slidev/client/internals/NotesView.vue"]]);export{de as default};
