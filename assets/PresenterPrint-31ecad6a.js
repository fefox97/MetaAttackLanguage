import{d as _,i as d,a as p,u,b as h,c as m,e as g,f as n,g as t,t as o,h as s,F as f,r as v,n as x,j as y,o as r,k as b,l as k,m as N,p as w,q as L,_ as P}from"./index-01d6c808.js";import{N as S}from"./NoteDisplay-559820fc.js";const V={class:"m-4"},j={class:"mb-10"},M={class:"text-4xl font-bold mt-2"},T={class:"opacity-50"},A={class:"text-lg"},B={class:"font-bold flex gap-2"},C={class:"opacity-50"},D=t("div",{class:"flex-auto"},null,-1),H={key:0,class:"border-gray-400/50 mb-8"},z=_({__name:"PresenterPrint",setup(F){d(p),u(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),h({title:`Notes - ${m.title}`});const i=g(()=>y.slice(0,-1).map(a=>{var l;return(l=a.meta)==null?void 0:l.slide}).filter(a=>a!==void 0&&a.noteHTML!==""));return(a,l)=>(r(),n("div",{id:"page-root",style:x(s(L))},[t("div",V,[t("div",j,[t("h1",M,o(s(m).title),1),t("div",T,o(new Date().toLocaleString()),1)]),(r(!0),n(f,null,v(s(i),(e,c)=>(r(),n("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",A,[t("div",B,[t("div",C,o(e==null?void 0:e.no)+"/"+o(s(b)),1),k(" "+o(e==null?void 0:e.title)+" ",1),D])]),N(S,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<s(i).length-1?(r(),n("hr",H)):w("v-if",!0)]))),128))])],4))}}),R=P(z,[["__file","/home/runner/work/MetaAttackLanguage/MetaAttackLanguage/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{R as default};
