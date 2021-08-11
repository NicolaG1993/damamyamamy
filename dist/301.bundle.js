"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[301],{

/***/ 902:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3727);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5893);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var STATUS = {
  HOVERED: "hovered",
  NORMAL: "normal"
};
function Button(_ref) {
  var page = _ref.page,
      text = _ref.text,
      type = _ref.type,
      fn = _ref.fn;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(STATUS.NORMAL),
      _useState2 = _slicedToArray(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];

  var onMouseEnter = function onMouseEnter() {
    setStatus(STATUS.HOVERED);
  };

  var onMouseLeave = function onMouseLeave() {
    setStatus(STATUS.NORMAL);
  };

  var handleFunction = function handleFunction() {
    if (typeof fn === "function") {
      fn();
    } else {
      return;
    }
  };

  if (type === "function") return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
    type: "button",
    onClick: function onClick() {
      return handleFunction();
    } //activate fn here! 🧨
    ,
    className: "btn ".concat(status),
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    children: text
  });
  if (type === "internal") return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__/* .Link */ .rU, {
    to: page || "#",
    onClick: function onClick() {
      return handleFunction();
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      type: "button",
      className: "btn ".concat(status),
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      children: text
    })
  });
  if (type === "external") return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
    target: "_blank",
    href: page || "#",
    rel: "noopener noreferrer",
    onClick: function onClick() {
      return handleFunction();
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      type: "button",
      className: "btn ".concat(status),
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      children: text
    })
  });
  if (type === "submit") return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
    type: "submit",
    className: "btn ".concat(status),
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onClick: function onClick() {
      return handleFunction();
    },
    children: text
  });
}

/***/ }),

/***/ 7301:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CookiesPopUp)
/* harmony export */ });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3935);
/* harmony import */ var _Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(902);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1372);
/* harmony import */ var _redux_ToggleLayout_toggleLayout_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8668);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5893);
// REACT


 // REDUX


 // COMPONENT



function CookiesPopUp() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Modal, {});
} // COMPONENTS

var Modal = function Modal() {
  // REDUX
  var modalStatus = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useSelector */ .v9)(function (state) {
    return state.toggleLayout && state.toggleLayout.layouts[2].active;
  }); // let state = useSelector((state) => state);
  // let status = state.toggleLayout.layouts[2].active || false;

  return modalStatus ? /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_0__.createPortal( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Alert, {}), document.getElementById("root")) : null;
}; //  Creo Alert Component solo per tenere tutto piu separato


var Alert = function Alert() {
  // REDUX
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useDispatch */ .I0)();

  var close = function close() {
    dispatch((0,_redux_ToggleLayout_toggleLayout_actions__WEBPACK_IMPORTED_MODULE_4__/* .toggleLayout */ .V)({
      id: "alert",
      fn: "close"
    }));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "alert",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "alert-text-wrap",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3", {
        children: "Questo sito utilizza cookies"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("p", {
        children: ["We and our partners store or access information on devices, such as cookies and process personal data, such as unique identifiers and standard information sent by a device for the purposes described below. You may click to consent to our and our partners\u2019 processing for such purposes. Alternatively, you may click to refuse to consent, or access more detailed information and change your preferences before consenting. Your preferences will apply to this website only. Please note that some processing of your personal data may not require your consent, but you have a right to object to such processing. You can change your preferences at any time by returning to this site or visit our privacy policy.", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {})]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "alert-buttons-wrap",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Button_Button__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, {
        text: "Ho capito",
        type: "function",
        fn: close
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Button_Button__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, {
        page: "/document",
        text: "Maggiori informazioni",
        type: "internal",
        fn: close
      })]
    })]
  });
};

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
//# sourceMappingURL=301.bundle.js.map