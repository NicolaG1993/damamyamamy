"use strict";exports.id=481,exports.ids=[481],exports.modules={8481:(r,t,n)=>{n.r(t),n.d(t,{default:()=>m});var e=n(5771),o=n.n(e),i=n(6689),a=n(1970),l=n(960),u=n(997);function c(r,t){(null==t||t>r.length)&&(t=r.length);for(var n=0,e=new Array(t);n<t;n++)e[n]=r[n];return e}var s=o()((function(){return n.e(895).then(n.bind(n,5895))})),f=o()((function(){return n.e(732).then(n.bind(n,6732))})),d=o()((function(){return n.e(808).then(n.bind(n,4808))})),y=o()((function(){return n.e(575).then(n.bind(n,3575))}));function m(){var r,t,n=(0,a.Z)().width,e=(0,l.Z)().scrollTop,o=(r=(0,i.useState)({marginTop:"0"}),t=2,function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=n){var e,o,i=[],a=!0,l=!1;try{for(n=n.call(r);!(a=(e=n.next()).done)&&(i.push(e.value),!t||i.length!==t);a=!0);}catch(r){l=!0,o=r}finally{try{a||null==n.return||n.return()}finally{if(l)throw o}}return i}}(r,t)||function(r,t){if(r){if("string"==typeof r)return c(r,t);var n=Object.prototype.toString.call(r).slice(8,-1);return"Object"===n&&r.constructor&&(n=r.constructor.name),"Map"===n||"Set"===n?Array.from(r):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(r,t):void 0}}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),m=o[0],v=o[1];return(0,i.useEffect)((function(){e+window.innerHeight+200>=document.documentElement.offsetHeight?v({marginTop:"0"}):v(n<=720?{marginTop:"0"}:{marginTop:"190px"})}),[e]),(0,u.jsxs)("div",{id:"Footer",children:[(0,u.jsx)("div",{className:"footer-wraper",children:(0,u.jsxs)("div",{className:"footer-parallax-wraper",style:m,children:[(0,u.jsx)(s,{fallback:(0,u.jsx)("div",{className:"loader"})}),(0,u.jsx)(d,{fallback:(0,u.jsx)("div",{className:"loader"})}),(0,u.jsx)(f,{fallback:(0,u.jsx)("div",{className:"loader"})}),(0,u.jsx)(y,{fallback:(0,u.jsx)("div",{className:"loader"})})]})}),(0,u.jsx)(h,{})]})}function h(){var r=(new Date).getFullYear();return(0,u.jsx)("div",{className:"copyrights",children:(0,u.jsxs)("h5",{children:["Da Mamy a Mamy, © ",r]})})}},960:(r,t,n)=>{n.d(t,{Z:()=>i});var e=n(6689);function o(r,t){(null==t||t>r.length)&&(t=r.length);for(var n=0,e=new Array(t);n<t;n++)e[n]=r[n];return e}function i(){var r,t,n=(r=(0,e.useState)(window.scrollY),t=2,function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=n){var e,o,i=[],a=!0,l=!1;try{for(n=n.call(r);!(a=(e=n.next()).done)&&(i.push(e.value),!t||i.length!==t);a=!0);}catch(r){l=!0,o=r}finally{try{a||null==n.return||n.return()}finally{if(l)throw o}}return i}}(r,t)||function(r,t){if(r){if("string"==typeof r)return o(r,t);var n=Object.prototype.toString.call(r).slice(8,-1);return"Object"===n&&r.constructor&&(n=r.constructor.name),"Map"===n||"Set"===n?Array.from(r):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(r,t):void 0}}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=n[0],a=n[1],l=function(){a(window.scrollY)};return(0,e.useEffect)((function(){return window.addEventListener("scroll",l),function(){return window.removeEventListener("scroll",l)}})),{scrollTop:i}}},1970:(r,t,n)=>{n.d(t,{Z:()=>a});var e=n(6689);function o(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=n){var e,o,i=[],a=!0,l=!1;try{for(n=n.call(r);!(a=(e=n.next()).done)&&(i.push(e.value),!t||i.length!==t);a=!0);}catch(r){l=!0,o=r}finally{try{a||null==n.return||n.return()}finally{if(l)throw o}}return i}}(r,t)||function(r,t){if(r){if("string"==typeof r)return i(r,t);var n=Object.prototype.toString.call(r).slice(8,-1);return"Object"===n&&r.constructor&&(n=r.constructor.name),"Map"===n||"Set"===n?Array.from(r):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(r,t):void 0}}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(r,t){(null==t||t>r.length)&&(t=r.length);for(var n=0,e=new Array(t);n<t;n++)e[n]=r[n];return e}function a(){var r=o((0,e.useState)(window.innerWidth),2),t=r[0],n=r[1],i=o((0,e.useState)(window.innerHeight),2),a=i[0],l=i[1],u=function(){n(window.innerWidth),l(window.innerHeight)};return(0,e.useEffect)((function(){return window.addEventListener("resize",u),function(){return window.removeEventListener("resize",u)}})),{width:t,height:a}}}};