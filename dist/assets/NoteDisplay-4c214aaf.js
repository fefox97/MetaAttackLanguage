import{d,i as p,a as u,f as s,E as i,g as r,t as c,o as l,_ as f}from"./index-85682bae.js";const m=["innerHTML"],k=["textContent"],v=["textContent"],y=d({__name:"NoteDisplay",props:{class:{type:String,required:!1},noteHtml:{type:String,required:!1},note:{type:String,required:!1},placeholder:{type:String,required:!1}},emits:["click"],setup(t){const n=t;return p(u),(o,e)=>t.noteHtml?(l(),s("div",{key:0,class:i(["prose overflow-auto outline-none",n.class]),onClick:e[0]||(e[0]=a=>o.$emit("click")),innerHTML:t.noteHtml},null,10,m)):t.note?(l(),s("div",{key:1,class:i(["prose overflow-auto outline-none",n.class]),onClick:e[1]||(e[1]=a=>o.$emit("click"))},[r("p",{textContent:c(t.note)},null,8,k)],2)):(l(),s("div",{key:2,class:i(["prose overflow-auto outline-none opacity-50 italic",n.class]),onClick:e[2]||(e[2]=a=>o.$emit("click"))},[r("p",{textContent:c(n.placeholder||"No notes.")},null,8,v)],2))}}),g=f(y,[["__file","/Users/fefox/Desktop/Presentazioni/MAL/node_modules/@slidev/client/internals/NoteDisplay.vue"]]);export{g as N};
