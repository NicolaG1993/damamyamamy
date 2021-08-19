"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[146],{

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

/***/ 2735:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ CartButton)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
var es = __webpack_require__(1372);
// EXTERNAL MODULE: ./src/client/redux/LoadCart/loadCart.actions.js
var loadCart_actions = __webpack_require__(136);
;// CONCATENATED MODULE: ./src/client/components/CartButton/assets/shopping-cart.svg
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
;// CONCATENATED MODULE: ./src/client/components/CartButton/assets/x.svg
var x_path;

function x_extends() { x_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return x_extends.apply(this, arguments); }



function SvgX(props) {
  return /*#__PURE__*/react.createElement("svg", x_extends({
    "data-name": "Livello 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 128 128"
  }, props), x_path || (x_path = /*#__PURE__*/react.createElement("path", {
    d: "M128 108v7a48.72 48.72 0 01-13 13h-7c-2.73-2.37-5.61-4.59-8.18-7.12-11-10.9-22-21.83-32.85-32.91-2.31-2.36-3.7-2.41-5.93 0-3.81 4.18-7.88 8.14-12 12-9.73 9.27-18.4 19.65-29.06 28h-7a49.91 49.91 0 01-13-13v-7c2.24-2.6 4.33-5.35 6.74-7.79Q23.37 83.36 40.2 66.74c2.18-2.14 2.26-3.45 0-5.54-4-3.7-7.87-7.62-11.65-11.59C19.1 39.71 8.52 30.85 0 20v-7A49.61 49.61 0 0113 0h7c2.61 2.23 5.37 4.31 7.81 6.72q16.82 16.63 33.43 33.47c2.13 2.18 3.46 2.31 5.54 0 3.23-3.57 6.7-6.92 10.18-10.24 10.4-9.94 19.73-21 31-30h7a48.87 48.87 0 0113 13v7a71.13 71.13 0 01-7.41 8.59C109.7 39.38 99 50.32 88 61c-2.36 2.3-2.45 3.69 0 5.92 4.18 3.81 8.14 7.88 12 12 9.32 9.75 19.7 18.42 28 29.08z"
  })));
}

/* harmony default export */ const x = (SvgX);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/client/components/CartButton/CartButton.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var loadNotAvailables = function loadNotAvailables(state) {
  return state.loadCart.notAvailables;
};

var STATUS = {
  HOVERED: "hovered",
  NORMAL: "normal"
};
function CartButton(_ref) {
  var wrapSize = _ref.wrapSize,
      product_id = _ref.product_id;

  var _useState = (0,react.useState)(STATUS.NORMAL),
      _useState2 = _slicedToArray(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];

  var onMouseEnter = function onMouseEnter() {
    setStatus(STATUS.HOVERED);
  };

  var onMouseLeave = function onMouseLeave() {
    setStatus(STATUS.NORMAL);
  }; //questo metodo puó sembrare essere piú codice del dovuto, ma in veritá risolve un bug
  //in Item quando premiamo per aggingere/rimuovere per una frazione di secondo lo state non é hovered con pure css
  //cosí invece non succede, il btn status é sempre hovered
  //NB che in Item per qualche motivo ignora transition, quindi niente fading lí con questo metodo
  //Ho giá provato a copiare ed incollare css da Button component


  var dispatch = (0,es/* useDispatch */.I0)();

  var _useState3 = (0,react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isAvailable = _useState4[0],
      setIsAvailable = _useState4[1];

  var _useState5 = (0,react.useState)(""),
      _useState6 = _slicedToArray(_useState5, 2),
      itemId = _useState6[0],
      setItemId = _useState6[1]; // console.log("product_id: ", product_id);
  // console.log("itemId: ", itemId);
  //questo mi serve per remove!! ma non per add 🧨
  //https://commercejs.com/docs/sdk/cart/#remove-from-cart


  var notAvailables = (0,es/* useSelector */.v9)(loadNotAvailables, es/* shallowEqual */.wU); // console.log("notAvailables: ", notAvailables);

  (0,react.useEffect)(function () {
    if (notAvailables) {
      var result = notAvailables.filter(function (i) {
        return i.product_id === product_id;
      }); // se notAvailables esiste, cerca se contiene un item con questo product_id

      if (result.length === 0) {
        setIsAvailable(true); //se non torna nessun risultato allora é disponibile
      } else {
        setItemId(result[0].item_id); //altrimenti non lo é, estraiamo il suo item_id (ci serve per remove req to commerce.js)

        setIsAvailable(false); //settiamo stato su non disponibile
      }
    }
  }, [notAvailables]);

  var SmallCartButton = function SmallCartButton() {
    return isAvailable ? /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
      className: "add-cart add-cart-for-small",
      onClick: function onClick() {
        return dispatch((0,loadCart_actions/* addToCart */.Xq)({
          productId: product_id,
          quantity: 1
        }));
      },
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(shopping_cart, {})
    }) : /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
      className: "remove-cart remove-cart-for-small",
      onClick: function onClick() {
        return dispatch((0,loadCart_actions/* removeFromCart */.h2)({
          productId: itemId
        }));
      },
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(x, {})
    });
  };

  var LargeCartButton = function LargeCartButton() {
    return isAvailable ? /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
      className: "btn ".concat(status),
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onClick: function onClick() {
        return dispatch((0,loadCart_actions/* addToCart */.Xq)({
          productId: product_id,
          quantity: 1
        }));
      },
      children: "Aggiungi al carrello"
    }) : /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
      className: "btn ".concat(status),
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onClick: function onClick() {
        return dispatch((0,loadCart_actions/* removeFromCart */.h2)({
          productId: itemId
        }));
      },
      children: "Rimuovi dal carrello"
    });
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [wrapSize === "small" && /*#__PURE__*/(0,jsx_runtime.jsx)(SmallCartButton, {}), wrapSize === "large" && /*#__PURE__*/(0,jsx_runtime.jsx)(LargeCartButton, {})]
  });
}

/***/ }),

/***/ 146:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Item)
/* harmony export */ });
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7617);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5977);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3727);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1372);
/* harmony import */ var _redux_LoadData_loadData_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3689);
/* harmony import */ var _Button_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(902);
/* harmony import */ var _CartButton_CartButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2735);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5893);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var Shortlist = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 743).then(__webpack_require__.bind(__webpack_require__, 1743));
});
var Gallery = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 172).then(__webpack_require__.bind(__webpack_require__, 1172));
});

var loadItem = function loadItem(state) {
  return state.loadData.selectedItem;
};

function Item() {
  var match = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__/* .useRouteMatch */ .$B)();
  var key = match.params.id; // item id

  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useDispatch */ .I0)();
  var selectedItem = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useSelector */ .v9)(loadItem, react_redux__WEBPACK_IMPORTED_MODULE_2__/* .shallowEqual */ .wU);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      item = _useState2[0],
      setItem = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      galleryOpen = _useState4[0],
      setGalleryOpen = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      clickedPic = _useState6[0],
      setClickedPic = _useState6[1]; // console.log("🐔 state in Item.js: ", state);
  // console.log("🐔 item in Item.js: ", item);


  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    dispatch((0,_redux_LoadData_loadData_actions__WEBPACK_IMPORTED_MODULE_3__/* .getItem */ .rV)({
      key: key
    })); // (async () => {
    //     const itemInfos = await commerce.products.retrieve(key);
    //     setItem(itemInfos);
    // })(); //is this autoinvoking? 🐔
  }, [key]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setItem(selectedItem);
  }, [selectedItem]); // useEffect(() => {
  //     console.log("🐔 item in Item.js: ", item);
  // }, [item]);

  var toggleGallery = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(n, boo) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setClickedPic(n);
              setGalleryOpen(boo);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function toggleGallery(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var PicDisplay = function PicDisplay() {
    return item.assets.length > 1 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "item-pictures-wrap",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
        src: item.media.source || "test1.jpg",
        onClick: function onClick() {
          return toggleGallery(0, true);
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "item-pictures-small-wrap",
        children: item.assets.map(function (el, i) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
            src: el.url,
            onClick: function onClick() {
              return toggleGallery(i, true);
            }
          }, el.id);
        })
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
      src: item.media.source || "test1.jpg",
      onClick: function onClick() {
        return toggleGallery(0, true);
      }
    });
  };

  var ItemWrap = function ItemWrap() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      id: "Item",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "item-wrap",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "item-pic",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(PicDisplay, {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "item-infos",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h1", {
            children: item.name
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "item-infos-price",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("h2", {
              children: [item.price.raw, "\u20AC"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
              children: "IVA inclusa"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "product-divider-small",
            children: " "
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "item-infos-infos-box",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "item-infos-conditions",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                children: "Condizioni:"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "item-infos-conditions-wrap",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h5", {
                  children: "come nuovo"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "circle"
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "item-infos-infos",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                children: "Categoria:"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
                children: item.categories[0] && item.categories[0].name
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "item-infos-infos",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                children: "Tags:"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "item-infos-infos-inner-wrap",
                children: [item.categories[0] && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__/* .Link */ .rU, {
                  to: {
                    pathname: "/shop",
                    tag: item.categories[0].name
                  },
                  className: "item-tag",
                  children: item.categories[0].name
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__/* .Link */ .rU, {
                  to: {
                    pathname: "/shop",
                    tag: "3/5 anni"
                  },
                  className: "item-tag",
                  children: "3/5 anni"
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "item-infos-infos",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                children: "Disponibilit\xE1:"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
                children: "Pezzo unico"
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_CartButton_CartButton__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z, {
            wrapSize: "large",
            product_id: item.id
          })]
        })]
      })
    });
  };

  var ItemDescriptionWrap = function ItemDescriptionWrap() {
    var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("description"),
        _useState8 = _slicedToArray(_useState7, 2),
        infoDisplay = _useState8[0],
        setInfoDisplay = _useState8[1];

    var toggleInfoDisplay = function toggleInfoDisplay(val) {
      setInfoDisplay(val);
    }; //posso farlo?


    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("section", {
      className: "item-description-wrap",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "item-description",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "item-description-selector",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
            onClick: function onClick() {
              return toggleInfoDisplay("description");
            },
            className: infoDisplay === "description" ? "active-selector" : "not-active-selector",
            children: "Descrizione"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h3", {
            onClick: function onClick() {
              return toggleInfoDisplay("infos");
            },
            className: infoDisplay === "infos" ? "active-selector" : "not-active-selector",
            children: "Informazioni"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "item-description-display",
          children: infoDisplay === "description" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "dangerHTML-box",
            dangerouslySetInnerHTML: {
              __html: item.description.replace(/\u00a0/g, " ")
            }
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            children: "Prodotto mai utilizzato"
          })
        })]
      })
    });
  };

  var ShortlistWrap = function ShortlistWrap() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("section", {
      className: "item-shortlist-wrap",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Shortlist, {
        products: item.related_products,
        listTitle: "Articoli simili"
      })
    });
  };

  if (item) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_7__/* .Switch */ .rs, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_7__/* .Route */ .AW, {
        path: match.path,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ItemWrap, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ItemDescriptionWrap, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ShortlistWrap, {}), galleryOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Gallery, {
          toggleGallery: toggleGallery,
          item: item,
          clickedPic: clickedPic
        })]
      })
    });
  }

  if (!item) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "item-wrap",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "loader"
      })
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=146.bundle.js.map