import{_ as e,b as t}from"./MemberList.vue_vue&type=script&setup=true&lang.dd2b1256.js";import{d as s,a as o,o as a,c as i,w as n,f as u,g as r,e as l,l as p,t as d,F as g,s as m,r as y,X as f,x as c,u as h}from"./vendor.33ec9ea5.js";import{o as v,g as b,p as _,s as k}from"./index.5e15b890.js";var q=s({props:{groupList:{type:null,required:!0},loading:{type:Boolean,required:!0}},setup:t=>(s,m)=>{const y=o("a-empty"),f=o("a-spin"),c=o("a-menu-item"),h=o("a-menu");return a(),i(h,{mode:"inline"},{default:n((()=>[t.groupList?t.loading?(a(),i(f,{key:1})):(a(!0),u(g,{key:2},r(t.groupList,((t,s)=>(a(),i(c,{key:t.id},{icon:n((()=>[l(e,{"group-id":t.id,"group-name":t.name},null,8,["group-id","group-name"])])),default:n((()=>[p(" "+d(`${t.name}(${t.id})`),1)])),_:2},1024)))),128)):(a(),i(y,{key:0}))])),_:1})}});const w=p("发消息");var L=s({props:{memberList:{type:null,required:!0},group:{type:null,required:!0},loading:{type:Boolean,required:!0}},emits:["goto-group-session","goto-temp-session"],setup(e,{emit:s}){const r=e=>s("goto-temp-session",e);return(s,p)=>{const d=o("a-empty"),m=o("a-button"),y=o("a-page-header"),f=o("a-col"),c=o("a-row");return e.group?(a(),u(g,{key:1},[l(c,{style:{height:"15%"}},{default:n((()=>[l(f,{span:24},{default:n((()=>[l(y,{title:e.group.name,"sub-title":e.group.id,style:{background:"#fff"}},{extra:n((()=>[l(m,{type:"primary",key:"send-message",ghost:"",onClick:p[0]||(p[0]=e=>s.$emit("goto-group-session"))},{default:n((()=>[w])),_:1})])),_:1},8,["title","sub-title"])])),_:1})])),_:1}),l(c,{type:"flex",justify:"center",style:{height:"75%",overflow:"auto"}},{default:n((()=>[l(f,{span:20},{default:n((()=>[l(t,{onGotoTempSession:r,"member-list":e.memberList,loading:e.loading},null,8,["member-list","loading"])])),_:1})])),_:1})],64)):(a(),i(d,{key:0,style:{height:"100%"}}))}}}),x=s({setup(e){const t=m(),s=y([]),{groups:u,state:r}=v(),p=f((()=>{if(u&&0!=s.value.length)return s.value[0]})),d=f((()=>{if(p&&u.value)return u.value.find((e=>e.id==p.value))})),{members:g,state:w,emitUpdate:x}=b(p);function S(){d.value&&(_("group",d.value),t.push({name:"session",query:{sessionIdentityString:k([d.value.id,"group"])}}))}function j(e){_("temp",e),t.push({name:"session",query:{sessionIdentityString:k([e.id,"temp"])}})}return c((()=>x())),(e,t)=>{const p=o("a-col"),m=o("a-row");return a(),i(m,{style:{height:"100%"}},{default:n((()=>[l(p,{span:8,style:{height:"100%",overflow:"auto","background-color":"white"}},{default:n((()=>[l(q,{loading:"done"!=h(r),style:{height:"100%"},"group-list":h(u),selectedKeys:s.value,"onUpdate:selectedKeys":t[0]||(t[0]=e=>s.value=e)},null,8,["loading","group-list","selectedKeys"])])),_:1}),l(p,{span:16,style:{height:"100%"}},{default:n((()=>[l(L,{onGotoGroupSession:S,onGotoTempSession:j,group:h(d),"member-list":h(g),loading:"done"!=h(w)},null,8,["group","member-list","loading"])])),_:1})])),_:1})}}});export{x as default};
