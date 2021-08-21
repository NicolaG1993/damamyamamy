"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[296],{

/***/ 6296:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Header)
});

// EXTERNAL MODULE: ./node_modules/@loadable/component/dist/loadable.esm.js + 1 modules
var loadable_esm = __webpack_require__(3810);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(3727);
// EXTERNAL MODULE: ./src/client/utils/useWindowDimensions.js
var useWindowDimensions = __webpack_require__(1970);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
var es = __webpack_require__(1372);
// EXTERNAL MODULE: ./src/client/redux/ToggleLayout/toggleLayout.actions.js
var toggleLayout_actions = __webpack_require__(8668);
;// CONCATENATED MODULE: ./src/client/components/Cart/CartIcon/assets/shopping-cart.svg
var _path;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



function SvgShoppingCart(props) {
  return /*#__PURE__*/react.createElement("svg", _extends({
    "data-name": "Livello 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 128 122.04"
  }, props), _path || (_path = /*#__PURE__*/react.createElement("path", {
    d: "M0 8.05v-5c3.51-3.75 8.11-3 12.51-3 13 0 16.86 3.1 18.29 15.71.46 4.11 1.94 5.14 5.88 5.12 27.47-.16 54.94 0 82.41-.13 3.48 0 6.57.49 8.91 3.29v5c-3.78 14-5.87 28.27-8.89 42.38-2.3 10.77-7.68 15.46-18.61 15.48H47.59c-13.69 0-18.73-4.64-20.61-18.26-2.39-17.29-5.28-34.51-7.46-51.82-.6-4.81-2.67-5.57-6.74-5.44-4.5.16-9.45 1.27-12.78-3.33zM111.94 107.21a14.94 14.94 0 11-14.89-15.07 15.39 15.39 0 0114.89 15.07zM60.24 107.13c0 8-6.67 14.79-14.46 14.79s-14.51-6.76-14.64-14.69S38.24 92.05 46 92.17a14.8 14.8 0 0114.24 14.96z"
  })));
}

/* harmony default export */ const shopping_cart = (SvgShoppingCart);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/client/components/Cart/CartIcon/CartIcon.js







var selectTotalItems = function selectTotalItems(state) {
  return state.loadCart.cart;
};

function CartIcon(_ref) {
  var closeNav = _ref.closeNav;
  var cart = (0,es/* useSelector */.v9)(selectTotalItems, es/* shallowEqual */.wU);

  var TotalItems = function TotalItems() {
    if (cart) {
      if (cart.total_items > 0) {
        return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          id: "cartCounter",
          children: cart.total_items
        });
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    className: "cart-icon-box",
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)(react_router_dom/* Link */.rU, {
      to: "/cart",
      onClick: closeNav,
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "cart-icon",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(shopping_cart, {})
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(TotalItems, {})]
    })
  });
}
;// CONCATENATED MODULE: ./src/client/components/Header/Header.js
// REACT




 // REDUX


 // COMPONENTS

var Logo = (0,loadable_esm/* default */.ZP)(function () {
  return __webpack_require__.e(/* import() */ 64).then(__webpack_require__.bind(__webpack_require__, 7064));
});



var HamburgerButton = (0,loadable_esm/* default */.ZP)(function () {
  return __webpack_require__.e(/* import() */ 320).then(__webpack_require__.bind(__webpack_require__, 320));
});
var ColorModeButton = (0,loadable_esm/* default */.ZP)(function () {
  return __webpack_require__.e(/* import() */ 694).then(__webpack_require__.bind(__webpack_require__, 8694));
});
var Nav = (0,loadable_esm/* default */.ZP)(function () {
  return __webpack_require__.e(/* import() */ 119).then(__webpack_require__.bind(__webpack_require__, 9119));
});
function Header() {
  var _useWindowDimensions = (0,useWindowDimensions/* default */.Z)(),
      width = _useWindowDimensions.width;

  (0,react.useEffect)(function () {
    width > 720 && close;
  }, [width]); // mi serve?
  // REDUX

  var dispatch = (0,es/* useDispatch */.I0)();

  var toggle = function toggle() {
    dispatch((0,toggleLayout_actions/* toggleLayout */.V)({
      id: "nav",
      fn: "toggle"
    }));
  };

  var close = function close() {
    dispatch((0,toggleLayout_actions/* toggleLayout */.V)({
      id: "nav",
      fn: "close"
    }));
  }; // SMALL COMPONENTS


  var LogoLink = function LogoLink() {
    return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "logo-wrap",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom/* Link */.rU, {
        to: "/",
        onClick: close,
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(Logo, {
          fallback: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
            className: "loader"
          })
        })
      })
    });
  };

  var MobileHeader = function MobileHeader() {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "header-wrap",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(LogoLink, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(CartIcon, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(HamburgerButton, {
        toggleNav: toggle
      })]
    });
  };

  var DesktopHeader = function DesktopHeader() {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "header-wrap",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(LogoLink, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(CartIcon, {}), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "header-buttons-box-right",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(ColorModeButton, {
          fallback: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
            className: "loader"
          })
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(HamburgerButton, {
          toggleNav: toggle
        })]
      })]
    });
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    id: "Header",
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "header-component",
      children: width <= 720 ? /*#__PURE__*/(0,jsx_runtime.jsx)(MobileHeader, {}) : /*#__PURE__*/(0,jsx_runtime.jsx)(DesktopHeader, {})
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(Nav, {
      fallback: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "loader"
      }),
      closeNav: close,
      width: width
    })]
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
//# sourceMappingURL=296.bundle.js.map