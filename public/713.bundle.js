"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[713],{

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
      fn = _ref.fn,
      style = _ref.style;

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
    className: "btn ".concat(status, " ").concat(style),
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
      className: "btn ".concat(status, " ").concat(style),
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
      className: "btn ".concat(status, " ").concat(style),
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      children: text
    })
  });
  if (type === "submit") return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
    type: "submit",
    className: "btn ".concat(status, " ").concat(style),
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onClick: function onClick() {
      return handleFunction();
    },
    children: text
  });
}

/***/ }),

/***/ 4713:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3810);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1372);
/* harmony import */ var _utils_useScrollPosition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(960);
/* harmony import */ var _utils_useWindowDimensions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1970);
/* harmony import */ var _Button_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(902);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5893);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var fetchData = function fetchData(state) {
  return state.loadData;
};

var Slider = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 434).then(__webpack_require__.bind(__webpack_require__, 2434));
});
var Shortlist = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 839).then(__webpack_require__.bind(__webpack_require__, 1743));
});
var IconsList = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 611).then(__webpack_require__.bind(__webpack_require__, 611));
});



function Home() {
  var data = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useSelector */ .v9)(fetchData, react_redux__WEBPACK_IMPORTED_MODULE_2__/* .shallowEqual */ .wU);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("800px"),
      _useState2 = _slicedToArray(_useState, 2),
      iconslistHeight = _useState2[0],
      setIconslistHeight = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("100px 40px 90px 40px"),
      _useState4 = _slicedToArray(_useState3, 2),
      shortlistPadding = _useState4[0],
      setShortlistPadding = _useState4[1];

  var _useScrollPosition = (0,_utils_useScrollPosition__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)(),
      scrollTop = _useScrollPosition.scrollTop;

  var _useWindowDimensions = (0,_utils_useWindowDimensions__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(),
      width = _useWindowDimensions.width;

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (scrollTop > 1410) {
      if (width <= 720) {
        setIconslistHeight("1000px");
        setShortlistPadding("100px 20px 120px 20px");
      } else {
        setIconslistHeight("400px");
        setShortlistPadding("100px 40px 90px 40px");
      }
    } else {
      if (width <= 720) {
        setIconslistHeight("800px");
        setShortlistPadding("100px 20px 120px 20px");
      } else {
        setIconslistHeight("800px");
        setShortlistPadding("100px 40px 300px 40px");
      }
    }
  }, [scrollTop]); // const dispatch = useDispatch();
  // const toggle = () => {
  //     dispatch(toggleLayout({ id: "overlay", fn: "toggle" }));
  // };
  // const style = {
  //     color: "red",
  //     textAlign: "center",
  // };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    id: "Home",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Slider, {
      fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "loader"
      }),
      width: width
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("section", {
      className: "home-wrap",
      style: {
        padding: shortlistPadding
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h2", {
        children: "IN NEGOZIO"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Button_Button__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z, {
        page: "/shop",
        text: "Vedi tutti gli articoli",
        type: "internal"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Shortlist, {
        products: data.catNewItems,
        listTitle: "Ultimi arrivi"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Shortlist, {
        products: data.cat1,
        listTitle: "Giochi"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Shortlist, {
        products: data.cat2,
        listTitle: "Passeggini e trasporto"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(IconsList, {
      iconslistHeight: iconslistHeight
    })]
  });
}

/***/ }),

/***/ 960:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useScrollPosition)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function useScrollPosition() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(window.scrollY),
      _useState2 = _slicedToArray(_useState, 2),
      scrollTop = _useState2[0],
      setScrollTop = _useState2[1];

  var updateScrollPosition = function updateScrollPosition() {
    setScrollTop(window.scrollY);
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    window.addEventListener("scroll", updateScrollPosition);
    return function () {
      return window.removeEventListener("scroll", updateScrollPosition);
    };
  });
  return {
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ 1970:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useWindowDimensions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function useWindowDimensions() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(window.innerWidth),
      _useState2 = _slicedToArray(_useState, 2),
      width = _useState2[0],
      setWidth = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(window.innerHeight),
      _useState4 = _slicedToArray(_useState3, 2),
      height = _useState4[0],
      setHeight = _useState4[1];

  var updateWidthAndHeight = function updateWidthAndHeight() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    window.addEventListener("resize", updateWidthAndHeight);
    return function () {
      return window.removeEventListener("resize", updateWidthAndHeight);
    };
  });
  return {
    width: width,
    height: height
  };
}

/***/ })

}]);
//# sourceMappingURL=713.bundle.js.map