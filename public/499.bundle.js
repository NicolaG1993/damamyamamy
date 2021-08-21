"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[499],{

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

/***/ 499:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Cart)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(3727);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
var es = __webpack_require__(1372);
// EXTERNAL MODULE: ./src/client/redux/LoadCart/loadCart.actions.js
var loadCart_actions = __webpack_require__(136);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/client/components/Cart/CartItem/CartItem.js





function CartItem(_ref) {
  var item = _ref.item;
  var dispatch = (0,es/* useDispatch */.I0)();
  console.log("props in CartItem.js: ", item);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "cart-product-content",
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(react_router_dom/* Link */.rU, {
        to: "/item/".concat(item.product_id),
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("img", {
          src: item.media.source,
          alt: item.name
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "cart-product-info",
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h4", {
            children: item.name
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("h5", {
            children: ["\u20AC ", item.price.raw]
          })]
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
        className: "cart-remove-button",
        onClick: function onClick() {
          return dispatch((0,loadCart_actions/* removeFromCart */.h2)({
            productId: item.id
          }));
        },
        children: "X"
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "white-separator"
    })]
  });
} // btn deve switchare to remove se item é gia in cart 🐔
// EXTERNAL MODULE: ./src/client/components/Button/Button.js
var Button = __webpack_require__(902);
;// CONCATENATED MODULE: ./src/client/components/Cart/Cart.js




 // REDUX







var selectCart = function selectCart(state) {
  return state.loadCart.cart;
};

function Cart() {
  var dispatch = (0,es/* useDispatch */.I0)();
  var cart = (0,es/* useSelector */.v9)(selectCart, es/* shallowEqual */.wU);
  console.log("cart in Cart.js: ", cart);
  (0,react.useEffect)(function () {
    document.querySelectorAll(".product-box").forEach(function (el) {
      el.classList.add("fade-in");
    });
  });

  var EmptyCart = function EmptyCart() {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("p", {
        children: "Nessun prodotto nel tuo carrello"
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("br", {}), /*#__PURE__*/(0,jsx_runtime.jsx)("br", {}), /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
        page: "/shop",
        text: "Vai al negozio",
        type: "internal",
        style: "inverted-btn"
      })]
    });
  };

  var FilledCart = function FilledCart() {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "cart-container",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "cart-products",
        children: cart.line_items.map(function (item) {
          return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
            className: "cart-product-box",
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(CartItem, {
              item: item
            })
          }, item.id);
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "cart-interact",
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "cart-total",
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)("span", {}), /*#__PURE__*/(0,jsx_runtime.jsxs)("h3", {
            children: ["Totale: ", /*#__PURE__*/(0,jsx_runtime.jsx)("br", {}), cart.subtotal.formatted_with_symbol]
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("span", {}), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "cart-btns",
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
            text: "Svuota il carrello",
            type: "function",
            fn: function fn() {
              return dispatch((0,loadCart_actions/* emptyCart */.UY)());
            },
            style: "inverted-btn"
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
            page: "/checkout",
            text: "Vai alla cassa",
            type: "internal",
            style: "inverted-btn"
          })]
        })]
      })]
    });
  };

  if (!cart) return /*#__PURE__*/(0,jsx_runtime.jsx)("p", {
    children: "Loading..."
  });
  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    id: "cart-comp",
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "cart-comp-wrapper",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h2", {
        children: "Il tuo carrello"
      }), !cart.line_items.length ? /*#__PURE__*/(0,jsx_runtime.jsx)(EmptyCart, {}) : /*#__PURE__*/(0,jsx_runtime.jsx)(FilledCart, {})]
    })
  });
}

/***/ })

}]);
//# sourceMappingURL=499.bundle.js.map