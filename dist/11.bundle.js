"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[11],{

/***/ 11:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Overlay)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1372);
/* harmony import */ var _redux_ToggleLayout_toggleLayout_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8668);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5893);



function Overlay() {
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__/* .useDispatch */ .I0)();
  var state = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__/* .useSelector */ .v9)(function (state) {
    return state;
  });
  var status = state.toggleLayout.layouts[0].active || false;

  var close = function close() {
    dispatch((0,_redux_ToggleLayout_toggleLayout_actions__WEBPACK_IMPORTED_MODULE_2__/* .toggleLayout */ .V)({
      id: "overlay",
      fn: "close"
    }));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "overlay ".concat(status ? "overlayIn" : "overlayOut"),
    onClick: close,
    children: "X"
  });
}

/***/ }),

/***/ 8668:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V": () => (/* binding */ toggleLayout)
/* harmony export */ });
/* harmony import */ var _toggleLayout_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3643);

function toggleLayout(payload) {
  var fn = payload.fn;

  if (fn === "toggle") {
    return {
      type: _toggleLayout_types__WEBPACK_IMPORTED_MODULE_0__/* .TOGGLE */ .DY,
      payload: payload
    };
  }

  if (fn === "open") {
    return {
      type: _toggleLayout_types__WEBPACK_IMPORTED_MODULE_0__/* .OPEN */ .o1,
      payload: payload
    };
  }

  if (fn === "close") {
    return {
      type: _toggleLayout_types__WEBPACK_IMPORTED_MODULE_0__/* .CLOSE */ .F$,
      payload: payload
    };
  }
}

/***/ })

}]);
//# sourceMappingURL=11.bundle.js.map