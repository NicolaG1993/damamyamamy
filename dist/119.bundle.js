"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[119],{

/***/ 9119:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Nav)
/* harmony export */ });
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7617);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3727);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1372);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5893);



var ColorModeButton = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 694).then(__webpack_require__.bind(__webpack_require__, 8694));
});





var selectLayouts = function selectLayouts(state) {
  return state.toggleLayout.layouts[1];
};

var links = [{
  to: "/",
  title: "Home"
}, {
  to: "/about",
  title: "Chi siamo"
}, {
  to: "/shop",
  title: "In negozio"
}, {
  to: "/contact",
  title: "Contatto"
}, {
  to: "/document",
  title: "Vendi"
}];
function Nav(_ref) {
  var closeNav = _ref.closeNav,
      width = _ref.width;
  var state = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__/* .useSelector */ .v9)(selectLayouts, react_redux__WEBPACK_IMPORTED_MODULE_1__/* .shallowEqual */ .wU);
  var navIsActive = state.active;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "header-overlay ".concat(navIsActive ? "overlayIn" : "overlayOut"),
      onClick: closeNav
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("nav", {
      className: "header-nav ".concat(navIsActive ? "nav-on" : ""),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
        children: links.map(function (link, i) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__/* .Link */ .rU, {
            to: link.to,
            onClick: function onClick() {
              return closeNav();
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
              children: [link.title, " "]
            })
          }, i);
        })
      }), width <= 720 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ColorModeButton, {
        fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "loader"
        })
      })]
    })]
  });
}

/***/ })

}]);
//# sourceMappingURL=119.bundle.js.map