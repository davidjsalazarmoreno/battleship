(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{151:function(e){e.exports=JSON.parse('{"title":"welcome"}')},477:function(e,t,n){},478:function(e,t,n){"use strict";n.r(t);n(243),n(253);var r,a=n(0),o=n.n(a),c=n(111),l=n(25),i=(n(445),n(17)),u=n(88),s=n(16),m=n(114),p=n(12),d=Object(p.a)(r||(r=Object(m.a)(["\n  body {\n    ",";\n  }\n"])),{"--tw-bg-opacity":"1",backgroundColor:"rgba(0, 0, 0, var(--tw-bg-opacity))"}),f=p.b.div.withConfig({componentId:"ighjvk-0"})([""," ",""],{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},{"--tw-bg-opacity":"1",backgroundColor:"rgba(0, 0, 0, var(--tw-bg-opacity))"}),b=n(36),g=Object(b.b)("@score/select-game-difficulty"),h=Object(b.b)("@score/reset-game-difficulty"),v=Object(b.c)({turns:null},(function(e){e.addCase(g,(function(e,t){e.turns=t.payload})).addCase(h,(function(e){e.turns=null}))})),w=p.b.h1.withConfig({componentId:"sc-1p6u1eh-0"})(["",""],{marginTop:"2rem",marginBottom:"2rem",fontSize:"1.5rem",lineHeight:"2rem",fontWeight:"700","--tw-text-opacity":"1",color:"rgba(0, 149, 218, var(--tw-text-opacity))"}),y=function(e){var t=Object(s.f)();return o.a.createElement(E,{onClick:function(){e.onClick&&e.onClick(),t.push(e.to)}},e.children)},E=p.b.button.withConfig({componentId:"sc-1xc32ba-0"})([""," ","  "," ",""],{paddingLeft:"1rem",paddingRight:"1rem",paddingTop:"0.5rem",paddingBottom:"0.5rem",marginTop:"0.75rem",marginBottom:"0.75rem",borderWidth:"1px",borderRadius:"0.375rem"},{backgroundColor:"transparent","--tw-shadow":"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",boxShadow:"var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"},{fontSize:"0.875rem",lineHeight:"1.25rem",fontWeight:"500",letterSpacing:"0.1em",textTransform:"uppercase","--tw-text-opacity":"1",color:"rgba(0, 149, 218, var(--tw-text-opacity))","--tw-border-opacity":"1",borderColor:"rgba(0, 149, 218, var(--tw-border-opacity))"},{transitionProperty:"background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",transitionTimingFunction:"cubic-bezier(0.4, 0, 0.2, 1)",transitionDuration:"150ms",":hover":{"--tw-bg-opacity":"1",backgroundColor:"rgba(0, 149, 218, var(--tw-bg-opacity))","--tw-text-opacity":"1",color:"rgba(255, 255, 255, var(--tw-text-opacity))","--tw-border-opacity":"1",borderColor:"rgba(0, 88, 136, var(--tw-border-opacity))"}});function x(){var e=Object(l.c)();Object(a.useEffect)((function(){e(h())}),[e]);var t=function(t){console.log(t),e(g(t))};return a.createElement(a.Fragment,null,a.createElement(i.a,null,a.createElement("title",null,"StartGame"),a.createElement("meta",{name:"description",content:"Start game"})),a.createElement(S,null,a.createElement(w,null,"Welcome to Battleship"),a.createElement(j,null,a.createElement(y,{to:"/battleship",onClick:function(){t(1e3)}},"Easy (1000 turns)"),a.createElement(y,{to:"/battleship",onClick:function(){t(100)}},"Medium (100 turns)"),a.createElement(y,{to:"/battleship",onClick:function(){t(50)}},"Hard (50 turns)"),a.createElement(y,{to:"/scoreboard"},"Scoreboard"))))}var S=p.b.div.withConfig({componentId:"sc-1g2wcp7-0"})([""," min-height:320px;"],{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh"}),j=p.b.div.withConfig({componentId:"sc-1g2wcp7-1"})(["",""],{display:"flex",flexDirection:"column"});function C(){return a.createElement(a.Fragment,null,a.createElement(i.a,null,a.createElement("title",null,"Start game"),a.createElement("meta",{name:"description",content:"Battleship"})),a.createElement(f,null,a.createElement(x,null)))}var O=p.b.p.withConfig({componentId:"xyphto-0"})(["",""],{"--tw-text-opacity":"1",color:"rgba(0, 149, 218, var(--tw-text-opacity))"});function k(){return a.createElement(a.Fragment,null,a.createElement(i.a,null,a.createElement("title",null,"404 Page Not Found"),a.createElement("meta",{name:"description",content:"Page not found"})),a.createElement(I,null,a.createElement(w,null,"4",a.createElement("span",{role:"img","aria-label":"Crying Face"},"\ud83d\ude22"),"4"),a.createElement(O,null,"Page not found."),a.createElement(y,{to:"/"},"Go to Home Page")))}var I=p.b.div.withConfig({componentId:"sc-13o0tl0-0"})([""," min-height:320px;"],{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh","--tw-text-opacity":"1",color:"rgba(0, 149, 218, var(--tw-text-opacity))"}),T=n(479),L=n(59),N=function(e){var t=e.onClick,n=void 0===t?function(){return""}:t,r=e.testIdPrefix;return o.a.createElement(z,{"data-testid":"".concat(r,"-").concat(e.row).concat(e.col),onClick:function(){return n()},className:e.className},o.a.createElement(M,{className:"cell-content"},"\xa0"))},z=p.b.div.withConfig({componentId:"vcccfo-0"})([""," &.cell-default{","}&.cell-default > .cell-content{","}&.cell-ship{","}&.cell-ship > .cell-content{","}&.cell-failed-shot{","}&.cell-failed-shot > .cell-content{","}&.cell-strike{","}&.cell-strike > .cell-content{","}&.cell-sunk{","}&.cell-sunk > .cell-content{","}"],{padding:"0.5rem",borderWidth:"1px"},{"--tw-bg-opacity":"1",backgroundColor:"rgba(0, 149, 218, var(--tw-bg-opacity))","--tw-border-opacity":"1",borderColor:"rgba(131, 242, 242, var(--tw-border-opacity))"},{"--tw-border-opacity":"1",borderColor:"rgba(0, 149, 218, var(--tw-border-opacity))","--tw-bg-opacity":"1",backgroundColor:"rgba(0, 88, 136, var(--tw-bg-opacity))"},{"--tw-bg-opacity":"1",backgroundColor:"rgba(205, 205, 205, var(--tw-bg-opacity))","--tw-border-opacity":"1",borderColor:"rgba(205, 205, 205, var(--tw-border-opacity))"},{"--tw-border-opacity":"1",borderColor:"rgba(156, 163, 175, var(--tw-border-opacity))","--tw-shadow":"0 1px 2px 0 rgba(0, 0, 0, 0.05)",boxShadow:"var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)","--tw-bg-opacity":"1",backgroundColor:"rgba(180, 180, 180, var(--tw-bg-opacity))"},{"--tw-bg-opacity":"1",backgroundColor:"rgba(255, 255, 255, var(--tw-bg-opacity))","--tw-border-opacity":"1",borderColor:"rgba(205, 205, 205, var(--tw-border-opacity))"},{"--tw-bg-opacity":"1",backgroundColor:"rgba(255, 255, 255, var(--tw-bg-opacity))","--tw-border-opacity":"1",borderColor:"rgba(229, 231, 235, var(--tw-border-opacity))"},{"--tw-bg-opacity":"1",backgroundColor:"rgba(254, 243, 199, var(--tw-bg-opacity))","--tw-border-opacity":"1",borderColor:"rgba(180, 83, 9, var(--tw-border-opacity))"},{"--tw-bg-opacity":"1",backgroundColor:"rgba(254, 243, 199, var(--tw-bg-opacity))","--tw-border-opacity":"1",borderColor:"rgba(180, 83, 9, var(--tw-border-opacity))"},{"--tw-bg-opacity":"1",backgroundColor:"rgba(220, 38, 38, var(--tw-bg-opacity))","--tw-border-opacity":"1",borderColor:"rgba(220, 38, 38, var(--tw-border-opacity))",opacity:"0.9"},{"--tw-bg-opacity":"1",backgroundColor:"rgba(239, 68, 68, var(--tw-bg-opacity))","--tw-border-opacity":"1",borderColor:"rgba(248, 113, 113, var(--tw-border-opacity))"}),M=p.b.div.withConfig({componentId:"vcccfo-1"})(["width:30px;height:30px;",""],{padding:"0.5rem",marginLeft:"auto",marginRight:"auto",fontSize:"0.875rem",lineHeight:"1.25rem",color:"transparent",borderWidth:"2px",borderRadius:"9999px"});function F(e,t){return t.has(e)}function P(e,t){return t.find((function(t){return t.position.includes(e)}))}function B(e){for(var t=[],n=["a","b","c","d","e","f","g","h","i","j"],r=0,a=0,o=0;o<e;o++)t[o]={value:null,index:o,row:"",col:0},t[o].row=n[0],t[o].col=r,r+=1,(a+=1)>9&&(n.shift(),a=0),r>9&&(r=0);return t}function A(e){var t,n=e.position,r=e.enemyShips,a=e.attackerShots,o=(t=n,r.findIndex((function(e){return e.position.includes(t)})));if(o>-1){var c=Object(L.a)(r),l=c[o];return l.strikes.push(n),l.isSunk=l.strikes.length===l.position.length,c}var i=new Set(a);return i.add(n),i}function D(e){return 1e3===e?"easy":100===e?"medium":50===e?"hard":"easy"}function G(e){return 0===e.turnsLeft?"tie":0===e.playerShips?"defeat":0===e.cpuShips?"victory":"tie"}function R(e,t,n){var r=e,a=P(r,t);return!(a&&a.strikes.includes(r))&&!F(r,n)}var W=n(117),H=n(47),V=n(241),J=n(37),U={cpuTurn:!1,turnsLeft:50,playerShips:20,cpuShips:20};function q(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}function K(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(L.a)(Array(e).keys()).map((function(e){return e+t}))}function Q(e){var t=e.shipSize,n=e.vertical,r=e.grid,a=e.letters,o=e.rowIndex,c=e.columnIndex;if(n)return t+o>10||K(t,o).some((function(e){return!0===r.get(a[e])[c].taken}));if(t+c>10)return!0;var l=r.get(a[o]).slice(c);return l.length<t||l.some((function(e){return!0===e.taken}))}function X(e){var t=e.letters,n=e.rowIndex,r=e.columnIndex,a=K(e.shipSize,n),o={name:q(),position:[],strikes:[],isSunk:!1};return a.forEach((function(e){var n="".concat(t[e]).concat(r);o.position.push(n)})),o}function Y(e){for(var t=e.letters,n=e.rowIndex,r=e.columnIndex,a=e.shipSize,o=r,c={name:q(),position:[],strikes:[],isSunk:!1};a>0;)c.position.push("".concat(t[n]).concat(o)),o+=1,a-=1;return c}function Z(e,t){if(e>10)throw new Error("Grid max level reached, please choose a number between 2 and 10");for(var n=["a","b","c","d","e","f","g","h","i","j"],r=function(e,t){for(var n=["a","b","c","d","e","f","g","h","i","j"],r=new Map,a=0;a<e;a++){var o=Array.from({length:t},(function(){return{taken:!1}}));r.set(n[a],o)}return r}(e,t),a=[],o=[{size:4},{size:3},{size:3},{size:2},{size:2},{size:2},{size:1},{size:1},{size:1},{size:1}];o.length>0;){var c,l=Math.round(Math.random()*(e-1)),i=Math.round(Math.random()*(t-1)),u=r.get(n[l]),s=o[0].size;if(u&&!0!==(null===(c=u[i])||void 0===c?void 0:c.taken)){var m=1===Math.round(Math.random());if(!Q({shipSize:s,vertical:m,grid:r,letters:n,rowIndex:l,columnIndex:i})){var p=m?X({letters:n,rowIndex:l,columnIndex:i,shipSize:s}):Y({letters:n,rowIndex:l,columnIndex:i,shipSize:s});p.position.forEach((function(e){var t=Object(J.a)(e,2),n=t[0],a=t[1];r.get(n)[a].taken=!0})),a.push(p),o.shift()}}}return a}function $(e,t,n,r){var a=P(e,t);return a?function(e,t,n){return e.isSunk?"cell-sunk":e.strikes.includes(t)?"cell-strike":n?"cell-default":"cell-ship"}(a,e,r):F(e,n)?"cell-failed-shot":"cell-default"}function _(e,t,n){return $(e,t,n,!0)}function ee(e,t,n){return $(e,t,n,!1)}var te=["matchEnded","cpuTurn","turnsLeft","nextTurn"];function ne(e){var t=e.rows,n=e.columns,r=e.turns,o=e.initialShips,c=Object(a.useState)(B(t*n)),l=Object(J.a)(c,2),i=l[0],u=l[1],s=Object(a.useState)([]),m=Object(J.a)(s,2),p=m[0],d=m[1],f=Object(a.useState)([]),b=Object(J.a)(f,2),g=b[0],h=b[1],v=Object(a.useState)(new Set),w=Object(J.a)(v,2),y=w[0],E=w[1],x=Object(a.useState)(new Set),S=Object(J.a)(x,2),j=S[0],C=S[1],O=function(e){var t=Object(a.useState)(!1),n=Object(J.a)(t,2),r=n[0],o=n[1],c=Object(a.useState)(U),l=Object(J.a)(c,2),i=l[0],u=l[1];Object(a.useEffect)((function(){u(Object(H.a)(Object(H.a)({},U),{},{turnsLeft:e}))}),[e]),Object(a.useEffect)((function(){0!==i.turnsLeft&&0!==i.playerShips&&0!==i.cpuShips||(u((function(e){return Object(H.a)(Object(H.a)({},e),{},{cpuTurn:!1})})),o(!0))}),[i]);var s=function(){return{result:G(i),cpuShips:i.cpuShips,playerShips:i.playerShips,turnsLeft:i.turnsLeft,difficulty:D(e)}},m=function(e){var t=e.enemyShips,n=e.isCpuNext,r=n?"cpuShips":"playerShips";u((function(e){return Object(H.a)(Object(H.a)({},e),{},Object(W.a)({cpuTurn:n,turnsLeft:e.turnsLeft-1},r,t.filter((function(e){return!e.isSunk})).length))}))};return{matchEnded:r,cpuTurn:i.cpuTurn,turnsLeft:i.turnsLeft,getScore:s,nextTurn:m}}(r),k=O.matchEnded,I=O.cpuTurn,T=O.turnsLeft,L=O.nextTurn,N=Object(V.a)(O,te);Object(a.useEffect)((function(){if(o)d(null===o||void 0===o?void 0:o.cpu),h(null===o||void 0===o?void 0:o.player);else{var e=Z(t,n),r=Z(t,n);console.log(e,"cpus"),console.log(r,"pls"),d(e),h(r)}u(B(t*n))}),[n,t,r]),Object(a.useEffect)((function(){k||P()}),[k,I,i]);var z=function(e){var t=A({position:e,enemyShips:p,attackerShots:j});Array.isArray(t)?d(t):C(t),L({enemyShips:p,isCpuNext:!0})},M=function(e){var t=A({position:e,enemyShips:g,attackerShots:y});Array.isArray(t)?h(t):E(t),L({enemyShips:g,isCpuNext:!1})},F=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(0!==T){var n=t?{enemyShips:g,attackerShots:y}:{enemyShips:p,attackerShots:j},r=n.enemyShips,a=n.attackerShots,o=R(e,r,a);o&&(t?M(e):z(e))}},P=function(){if(I){var e=function(e,t,n){return e.filter((function(e){return!0===R("".concat(e.row).concat(e.col),t,n)}))}(i,g,y);if(e.length){var t=(o=e.length,Math.round(Math.random()*o-1));if(e[t]){var n=e[t],r=n.row,a=n.col;F("".concat(r).concat(a),!0)}}}var o};return Object(H.a)({matchEnded:k,grid:i,turnsLeft:T,handleAttack:F,getCellClassName:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?_(e,p,j):ee(e,g,y)}},N)}function re(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t="@battleship/scoreboard",n=Object(a.useState)((function(){try{var n=window.localStorage.getItem(t);return n?JSON.parse(n):e}catch(r){return console.log(r),e}})),r=Object(J.a)(n,2),o=r[0],c=r[1],l=function(e){try{c(e),window.localStorage.setItem(t,JSON.stringify(e))}catch(n){console.log(n)}};return{storedValue:o,setValue:l}}var ae=Object(b.b)("@score/add-match-result"),oe=Object(b.b)("@score/reset-match-result"),ce=Object(b.c)({lastMatch:null},(function(e){e.addCase(ae,(function(e,t){e.lastMatch=t.payload})).addCase(oe,(function(e){e.lastMatch=null}))}));function le(e){var t=e.matchEnded,n=e.turnsLeft;return t?null:a.createElement(ue,null,a.createElement(w,{"data-testid":"turns-left",className:""},"Turns: ".concat(n)))}var ie,ue=p.b.div.withConfig({componentId:"umojmw-0"})(["",";",";"],{marginTop:"1.25rem",marginBottom:"1.25rem"},{display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"700","--tw-text-opacity":"1",color:"rgba(0, 149, 218, var(--tw-text-opacity))"}),se=function(e){var t=e.rows,n=e.columns,r=e.initialShips,c=Object(l.d)((function(e){return e.configuration.turns})),i=Object(s.f)(),u=ne({rows:t,columns:n,turns:c||50,initialShips:r}),m=u.matchEnded,p=u.grid,d=u.turnsLeft,f=u.handleAttack,b=u.getScore,g=u.getCellClassName,h=re([]),v=h.storedValue,y=h.setValue,E=Object(l.c)();return Object(a.useEffect)((function(){if(m){var e=b();return y([e].concat(Object(L.a)(v))),E(ae(e)),void i.push("/game-over")}}),[m,b,i,y,E,v]),Object(a.useEffect)((function(){E(oe())}),[E]),Object(a.useEffect)((function(){null===c&&i.push("/")}),[c,i]),null===c?null:o.a.createElement(o.a.Fragment,null,o.a.createElement(le,{matchEnded:m,turnsLeft:d}),o.a.createElement(w,null,"CPU"),o.a.createElement(me,{rows:t,columns:n},p.map((function(e){var t="".concat(e.row).concat(e.col);return o.a.createElement(N,Object.assign({key:t,testIdPrefix:"cpu"},e,{className:g(t,!0),onClick:function(){return f(t)}}))}))),o.a.createElement(w,null,"Player"),o.a.createElement(me,{rows:t,columns:n},p.map((function(e){var t="".concat(e.row).concat(e.col);return o.a.createElement(N,Object.assign({key:t,testIdPrefix:"player"},e,{className:g(t)}))}))))},me=p.b.div(ie||(ie=Object(m.a)(["\n  ","\n  grid-template-rows: repeat(",", 1fr);\n  grid-template-columns: repeat(",", 1fr);\n"])),{display:"grid",width:"100%",userSelect:"none","@media (min-width: 1024px)":{width:"66.666667%"}},(function(e){return e.rows}),(function(e){return e.columns}));function pe(){return a.createElement(a.Fragment,null,a.createElement(i.a,null,a.createElement("title",null,"Home Page"),a.createElement("meta",{name:"description",content:"A React Boilerplate application homepage"})),a.createElement(f,null,a.createElement(se,{rows:10,columns:10})))}function de(e){return a.createElement(a.Fragment,null,a.createElement(i.a,null,a.createElement("title",null,"Game over"),a.createElement("meta",{name:"description",content:"Game over"})),a.createElement(fe,null,a.createElement(w,null,"Game Over"),a.createElement(O,null,"Last match result: ",e.score.result),a.createElement(y,{to:"/"},"Try again")))}var fe=p.b.div.withConfig({componentId:"tw6y1r-0"})([""," min-height:320px;"],{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh"});function be(){var e=Object(s.f)(),t=Object(l.d)((function(e){return e.score.lastMatch}));return Object(a.useEffect)((function(){t||e.push("/")}),[t,e]),null==t?null:a.createElement(a.Fragment,null,a.createElement(i.a,null,a.createElement("title",null,"Game over"),a.createElement("meta",{name:"description",content:"Game over"})),a.createElement(f,null,a.createElement(de,{score:t})))}function ge(){var e=re([]).storedValue;if(0===e.length)return a.createElement(a.Fragment,null,a.createElement(i.a,null,a.createElement("title",null,"Scoreboard"),a.createElement("meta",{name:"description",content:"No score!"})),a.createElement(he,null,"There's not score to show, please go back to start screen and play a match :-)",a.createElement(y,{to:"/"},"Start page")));var t=e.map((function(e){return a.createElement("tr",null,Object.values(e).map((function(e,t){return a.createElement("td",{key:"".concat(e,"-").concat(t),className:"p-3 uppercase"},e)})))}));return a.createElement(a.Fragment,null,a.createElement(i.a,null,a.createElement("title",null,"Matches: ".concat(e.length)),a.createElement("meta",{name:"description",content:"Matches: ".concat(e.length)})),a.createElement(he,null,a.createElement(w,null,"Scoreboard"),a.createElement("table",null,a.createElement("thead",null,a.createElement("tr",null,a.createElement("th",{className:"p-3"},"Result"),a.createElement("th",{className:"p-3"},"Cpu ships"),a.createElement("th",{className:"p-3"},"Player Ships"),a.createElement("th",{className:"p-3"},"Turns left"),a.createElement("th",{className:"p-3"},"Difficulty"))),a.createElement("tbody",null,t)),a.createElement(y,{to:"/"},"Start page")))}var he=p.b.div.withConfig({componentId:"sc-10s8mxe-0"})([""," min-height:320px;"],{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh","--tw-text-opacity":"1",color:"rgba(0, 149, 218, var(--tw-text-opacity))"});function ve(){return a.createElement(a.Fragment,null,a.createElement(i.a,null,a.createElement("title",null,"Scoreboard"),a.createElement("meta",{name:"description",content:"Check the scoreboard"})),a.createElement(f,null,a.createElement(ge,null)))}function we(){var e=Object(T.a)().i18n;return a.createElement(u.a,null,a.createElement(i.a,{titleTemplate:"%s - Battleship",defaultTitle:"Battleship",htmlAttributes:{lang:e.language}},a.createElement("meta",{name:"description",content:"A Battleship game web app"})),a.createElement(s.c,null,a.createElement(s.a,{exact:!0,path:"/",component:C}),a.createElement(s.a,{path:"/battleship",component:pe}),a.createElement(s.a,{path:"/game-over",component:be}),a.createElement(s.a,{path:"/scoreboard",component:ve}),a.createElement(s.a,{component:k})),a.createElement(d,null))}var ye=n(236),Ee=n(239),xe=n(31);function Se(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return 0===Object.keys(e).length?function(e){return e}:Object(xe.c)(Object(H.a)({},e))}var je=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,480)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),o(e),c(e)}))},Ce=n(240),Oe=n(91),ke=n(238),Ie=n(151),Te={},Le={en:{translation:Ie}};!function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Te,r=arguments.length>2?arguments[2]:void 0;Object.keys(t).forEach((function(a){var o=r?"".concat(r,".").concat(a):a;"object"===typeof t[a]?(n[a]={},e(t[a],n[a],o)):n[a]=o}))}(Ie);Ce.a.use(Oe.e).use(ke.a).init({resources:Le,fallbackLng:"en",debug:!1,interpolation:{escapeValue:!1}}),n(477);var Ne=function(){var e=Object(Ee.a)({}),t=e.run,n=[e],r=[Object(ye.a)({createReducer:Se,runSaga:t})];return Object(b.a)({reducer:Se({score:ce,configuration:v}),middleware:[].concat(Object(L.a)(Object(b.d)()),n),devTools:!1,enhancers:r})}(),ze=document.getElementById("root");c.render(a.createElement(l.a,{store:Ne},a.createElement(i.b,null,a.createElement(a.StrictMode,null,a.createElement(we,null)))),ze),je()}},[[478,1,2]]]);