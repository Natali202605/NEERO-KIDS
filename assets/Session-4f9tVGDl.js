import{c as s,u as d,d as a,j as t,L as m}from"./index-P7ss000E.js";import{m as i}from"./proxy-zZar6vd4.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=s("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=s("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);function b(){const{gameId:n}=d(),l=a(e=>e.addAttempt),r=a(e=>e.updateStars),o=a(e=>e.attemptsToday),c=()=>{l(),r(1)};return t.jsxs(i.section,{initial:{opacity:0},animate:{opacity:1},className:"space-y-6",children:[t.jsxs(m,{to:"/catalog",className:"inline-flex min-h-11 items-center gap-1 text-sm text-brand-600 hover:underline",children:[t.jsx(x,{className:"h-4 w-4"}),"Назад в каталог"]}),t.jsxs("div",{className:"rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center sm:p-12",children:[t.jsxs("h1",{className:"text-xl font-bold text-slate-800 sm:text-2xl",children:["Сессия: ",n??"неизвестно"]}),t.jsxs("p",{className:"mt-2 text-sm text-slate-500 sm:text-base",children:["Заглушка игровой сессии · попыток: ",o]}),t.jsxs("button",{type:"button",onClick:c,className:"mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-medium text-white active:scale-[0.98] hover:bg-brand-700 sm:w-auto",children:[t.jsx(p,{className:"h-5 w-5"}),"Завершить (+1 ⭐)"]})]})]})}export{b as default};
