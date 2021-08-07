"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[55],{

/***/ 4055:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HamburgerButton)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1372);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5893);





var selectLayouts = function selectLayouts(state) {
  return state.toggleLayout.layouts[1];
};

function HamburgerButton(_ref) {
  var toggleNav = _ref.toggleNav;
  var state = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__/* .useSelector */ .v9)(selectLayouts, react_redux__WEBPACK_IMPORTED_MODULE_0__/* .shallowEqual */ .wU);
  var navIsActive = state.active;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    id: "hamBtn",
    className: navIsActive ? "hamBtn active" : "hamBtn",
    onClick: toggleNav,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "stick"
    })
  });
}

/***/ })

}]);
//# sourceMappingURL=55.bundle.js.map