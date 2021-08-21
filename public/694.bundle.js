(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[694],{

/***/ 8694:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ColorModeButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var _utils_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8686);
/* harmony import */ var _utils_themes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_themes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5893);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



 // import { ReactComponent as MoonIcon } from "./assets/svg/moon.svg";
// import { ReactComponent as SunIcon } from "./assets/svg/sun.svg";



function ColorModeButton() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("light"),
      _useState2 = _slicedToArray(_useState, 2),
      togClass = _useState2[0],
      setTogClass = _useState2[1];

  var theme = localStorage.getItem("theme"); // console.log("theme", togClass);

  var toggleColors = function toggleColors() {
    if (localStorage.getItem("theme") === "theme-dark") {
      (0,_utils_themes__WEBPACK_IMPORTED_MODULE_1__.setTheme)("theme-light");
      setTogClass("light");
    } else {
      (0,_utils_themes__WEBPACK_IMPORTED_MODULE_1__.setTheme)("theme-dark");
      setTogClass("dark");
    }
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTogClass("dark");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTogClass("light");
    }
  }, [theme]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "color-mode-wrap",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      onClick: toggleColors,
      className: "color-mode-toggle ".concat(togClass === "light" ? "sun" : "moon"),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "color-mode-icons",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          id: "Sun"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          id: "Moon"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
        id: "toggleColorMode",
        name: "toggleColorMode",
        type: "checkbox",
        defaultChecked: togClass
      })]
    })
  });
} //ci vanno due svg dentro

/***/ }),

/***/ 8686:
/***/ ((module) => {

function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

function keepTheme() {
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-dark");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTheme("theme-light");
    }
  } else {
    setTheme("theme-dark");
  }
}

module.exports = {
  setTheme: setTheme,
  keepTheme: keepTheme
};

/***/ })

}]);
//# sourceMappingURL=694.bundle.js.map