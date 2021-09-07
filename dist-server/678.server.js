"use strict";exports.id=678,exports.ids=[678],exports.modules={2678:(e,r,t)=>{t.r(r),t.d(r,{default:()=>S});var n=t(6689),a=t(3984),i=t.n(a),o=(t(8166),t(997));function l(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function c(e){var r,t,a=e.research,c=e.handleForm,f=e.handleFormOrder,d=e.priceRange,m=e.handlePriceRange,h=e.setPriceRange,p=e.handleRangeSlider,v=e.categories,g=e.filters,x=e.topValue,y=e.filtersBar,j=(r=(0,n.useState)(g),t=2,function(e){if(Array.isArray(e))return e}(r)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,i=[],o=!0,l=!1;try{for(t=t.call(e);!(o=(n=t.next()).done)&&(i.push(n.value),!r||i.length!==r);o=!0);}catch(e){l=!0,a=e}finally{try{o||null==t.return||t.return()}finally{if(l)throw a}}return i}}(r,t)||function(e,r){if(e){if("string"==typeof e)return l(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?l(e,r):void 0}}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),b=j[0],w=j[1];return(0,n.useEffect)((function(){return w(g)}),[g]),console.log("appliedFilters",b),(0,o.jsxs)("form",{className:y?"filter-form":"hidden",children:[(0,o.jsx)("div",{className:"filter-form-col-left",children:(0,o.jsx)("label",{children:(0,o.jsx)("span",{children:"Ricerca per nome"})})}),(0,o.jsx)("div",{className:"filter-form-col-right",children:(0,o.jsx)("input",{type:"text",placeholder:"Cerca...",defaultValue:a||"",name:"name",id:"name",onChange:function(e){return c(e)}})}),(0,o.jsx)("div",{className:"filter-form-col-left",children:(0,o.jsx)("label",{children:(0,o.jsx)("span",{children:"Ricerca per prezzo"})})}),(0,o.jsx)("div",{className:"filter-form-col-right",children:(0,o.jsxs)("div",{className:"filter-form-prices",children:[(0,o.jsx)("input",{type:"number",min:"0",max:x,defaultValue:d.min,name:"priceMin",id:"priceMin",onChange:function(e){return m({min:Number(e.target.value),max:d.max})},onInput:function(e){return c(e)}}),(0,o.jsx)("input",{type:"number",min:d.min,max:d.max,defaultValue:d.max,name:"priceMax",id:"priceMax",onChange:function(e){return m({min:d.min,max:Number(e.target.value)})},onInput:function(e){return c(e)}})]})}),(0,o.jsx)("div",{className:"filter-form-col-full",children:(0,o.jsx)(i(),{maxValue:x,minValue:0,value:d.max<d.min?{min:d.min,max:d.min}:d,formatLabel:function(e){return"".concat(e," €")},onChange:function(e){return h(e)},onChangeComplete:function(){return p()}})}),(0,o.jsx)("div",{className:"filter-form-col-left",children:(0,o.jsx)("label",{children:(0,o.jsx)("span",{children:"Categorie"})})}),(0,o.jsx)("div",{className:"filter-form-col-right",children:(0,o.jsx)(u,{defaultValue:b.categoryID,handleForm:c,categories:v})}),(0,o.jsx)("div",{className:"filter-form-col-left",children:(0,o.jsx)("label",{children:(0,o.jsx)("span",{children:"Ordina per"})})}),(0,o.jsx)("div",{className:"filter-form-col-right",children:(0,o.jsx)(s,{handleFormOrder:f})})]})}function u(e){var r=e.defaultValue,t=e.handleForm,n=e.categories;return(0,o.jsxs)("select",{name:"category",id:"category",value:r||"",onChange:function(e){return t(e)},children:[n&&n.map((function(e){return(0,o.jsx)("option",{value:e.id,label:e.name},e.id)})),(0,o.jsx)("option",{value:"",label:"--Tutte"})]})}function s(e){var r=e.handleFormOrder;return(0,o.jsxs)("select",{name:"order",id:"order",onChange:function(e){return r(e)},children:[(0,o.jsx)("option",{value:"new",children:"Novitá"}),(0,o.jsx)("option",{value:"asc",children:"Ordine alfabetico A-Z"}),(0,o.jsx)("option",{value:"desc",children:"Ordine alfabetico Z-A"}),(0,o.jsx)("option",{value:"lowPrice",children:"Prezzo piú basso"}),(0,o.jsx)("option",{value:"highPrice",children:"Prezzo piú alto"})]})}var f=t(6022),d=t(7646),m=t(3689);function h(e){var r=e.navIsActive,t=e.toggleNav;return(0,o.jsx)("div",{id:"hamBtn2",className:r?"hamBtn2 active":"hamBtn",onClick:t,children:(0,o.jsx)("div",{className:"stick2"})})}function p(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function v(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?p(Object(t),!0).forEach((function(r){g(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function g(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function x(e,r,t,n,a,i,o){try{var l=e[i](o),c=l.value}catch(e){return void t(e)}l.done?r(c):Promise.resolve(c).then(n,a)}function y(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,i=[],o=!0,l=!1;try{for(t=t.call(e);!(o=(n=t.next()).done)&&(i.push(n.value),!r||i.length!==r);o=!0);}catch(e){l=!0,a=e}finally{try{o||null==t.return||t.return()}finally{if(l)throw a}}return i}}(e,r)||function(e,r){if(e){if("string"==typeof e)return j(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?j(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var b=function(e){return e.loadData.categories},w=function(e){return e.loadData.topValue},O=function(e){return e.filterStore.filteredItems},N=function(e){return e.filterStore.appliedFilters};function S(e){var r=e.research,t=y((0,n.useState)(!1),2),a=t[0],i=t[1],l=function(){var e,r=(e=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i(!a);case 1:case"end":return e.stop()}}),e)})),function(){var r=this,t=arguments;return new Promise((function(n,a){var i=e.apply(r,t);function o(e){x(i,n,a,o,l,"next",e)}function l(e){x(i,n,a,o,l,"throw",e)}o(void 0)}))});return function(){return r.apply(this,arguments)}}(),u=(0,f.useSelector)(b,f.shallowEqual),s=(0,f.useSelector)(w,f.shallowEqual),p=(0,f.useSelector)(O,f.shallowEqual),g=(0,f.useSelector)(N,f.shallowEqual),j=(0,f.useDispatch)();(0,n.useEffect)((function(){return u&&j((0,m.Aj)())}),[u]);var S=y((0,n.useState)({min:0,max:Number(s)||10}),2),P=S[0],I=S[1],D=y((0,n.useState)({name:r||"",priceMin:P.min,priceMax:P.max,category:"",categoryID:"",order:"new"}),2),A=D[0],C=D[1];(0,n.useEffect)((function(){return I({min:0,max:Number(s)})}),[s]),(0,n.useEffect)((function(){console.log("🐲🐲🐲"),C((function(e){return v(v({},e),g)}))}),[g]),(0,n.useEffect)((function(){return F()}),[A]);var F=function(){if(p&&A)switch(j((0,d.s2)({value:A.name.toLowerCase()})),j((0,d.Q6)({value:A.category,valueID:A.categoryID})),j((0,d.ID)({minPrice:A.priceMin,maxPrice:A.priceMax})),A.order){case"new":j((0,d._M)({value:A.order}));break;case"asc":case"desc":j((0,d.jK)({value:A.order}));break;case"lowPrice":case"highPrice":j((0,d.d$)({value:A.order}))}else console.log("🐸🐸🐸handleFilters activated but no filters! 🤔",A)};return(0,o.jsxs)("div",{className:"filter-wrap ".concat(a?"filter-wrap-active":"filter-wrap-inactive"),children:[(0,o.jsxs)("div",{className:"filter-wrap-header",onClick:l,children:[(0,o.jsx)("h3",{children:"Filtra risultati"}),(0,o.jsx)(h,{navIsActive:a,toggleNav:l})]}),s&&(0,o.jsx)(c,{filters:A,categories:u,research:r,topValue:Number(s),priceRange:P,setPriceRange:I,handleForm:function(e){e.preventDefault();var r=e.target.form;setTimeout((function(){Number(r[1].value)>=Number(r[2].value)&&(r[2].value=r[1].value),I({min:Number(r[1].value),max:Number(r[2].value)})}),3e3);var t=u.find((function(e){return e.id===r[3].value}));t=t?{category:t.name,categoryID:t.id}:{category:"",categoryID:""};var n=new FormData(r),a=Object.fromEntries(n.entries());a.category=t.category,a.categoryID=t.categoryID,C((function(e){return v(v({},e),a)})),console.log("handleForm activated",a)},handleFormOrder:function(e){e.preventDefault();var r=e.target.value;C((function(e){return v(v({},e),{},{order:r})})),console.log("handleFormOrder activated",r)},handlePriceRange:function(e){return I(e)},handleRangeSlider:function(){var e=document.querySelector("#priceMin"),r=document.querySelector("#priceMax");e.value=P.min,r.value=P.max,C((function(e){return v(v({},e),{},{priceMin:P.min,priceMax:P.max})}))},filtersBar:a})]})}}};