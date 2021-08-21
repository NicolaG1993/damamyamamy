"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[319],{

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

/***/ 7319:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ItemsList)
});

// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(3727);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/client/components/Shop/ItemCard/ItemCard.js

 // not loading right



function ItemCard(_ref) {
  var item = _ref.item;

  // console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️item in ItemCard.js: ", item);
  function createMarkup() {
    return {
      __html: item.description
    };
  }

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "item-card",
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "item-card-img",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)("img", {
        src: item.media.source || "test1.jpg"
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "item-card-info",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h3", {
        children: item.name
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "item-card-divider-small",
        children: " "
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "item-card-description",
        dangerouslySetInnerHTML: createMarkup()
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("h5", {
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("span", {
          className: "price-for-item-card",
          children: "Prezzo: "
        }), item.price.raw, "\u20AC"]
      })]
    })]
  });
}
// EXTERNAL MODULE: ./src/client/components/CartButton/CartButton.js + 2 modules
var CartButton = __webpack_require__(2735);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
var es = __webpack_require__(1372);
// EXTERNAL MODULE: ./src/client/redux/PageNav/pageNav.actions.js
var pageNav_actions = __webpack_require__(5168);
;// CONCATENATED MODULE: ./src/client/components/Shop/ItemsList/ItemsList.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var loadFilteredItems = function loadFilteredItems(state) {
  return state.filterStore.filteredItems;
};

var loadPageNav = function loadPageNav(state) {
  return state.pageNav;
};

function ItemsList() {
  var pagination = (0,es/* useSelector */.v9)(loadPageNav, es/* shallowEqual */.wU);
  var filteredItems = (0,es/* useSelector */.v9)(loadFilteredItems, es/* shallowEqual */.wU);

  var _useState = (0,react.useState)(filteredItems),
      _useState2 = _slicedToArray(_useState, 2),
      results = _useState2[0],
      setResults = _useState2[1]; //prendiamo lo state settato da Filter component


  var _useState3 = (0,react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      onPage = _useState4[0],
      setOnPage = _useState4[1]; // console.log("🧠🧠🧠PAGINATION!!!!!", pagination.displayedItems);


  var dispatch = (0,es/* useDispatch */.I0)();

  var setPageState = function setPageState(arg) {
    return filteredItems && dispatch((0,pageNav_actions/* setPageNav */.Po)({
      ItemsList: arg
    }));
  };

  (0,react.useEffect)(function () {
    return document.querySelectorAll(".shop-item-wrap").forEach(function (el) {
      el.classList.add("fade-in");
    });
  });
  (0,react.useEffect)(function () {
    return setPageState(filteredItems);
  }, []); // settiamo PageNav

  (0,react.useEffect)(function () {
    // console.log("🧠ItemsList updates results with: ", filteredItems);
    setResults(filteredItems);
    setPageState(filteredItems || results);
  }, [filteredItems]); // settiamo state e PageNav quando cambiano filteredItems

  (0,react.useEffect)(function () {
    return setOnPage(pagination.displayedItems);
  }, [pagination.displayedItems]); //quando i displayedItems cambiano da pageNav reducer state
  // vengono passati attraverso il pagenav reducer
  // li viene gestita la paginazione e ci torna dei nuovi results, che vogliamo usare per render
  // non filteredItems
  // console.log("🍄🍄🍄 filteredItems -> ", filteredItems);
  // console.log("🍄🍄🍄 results -> ", results);
  // console.log("🍄🍄🍄 onPage -> ", onPage);

  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    className: "items-list",
    children: onPage ? onPage.length < 1 ? /*#__PURE__*/(0,jsx_runtime.jsx)("h4", {
      children: "No results"
    }) : onPage.map(function (item) {
      return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "shop-item-wrap",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom/* Link */.rU, {
          to: "/item/".concat(item.id),
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(ItemCard, {
            item: item
          })
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(CartButton/* default */.Z, {
          wrapSize: "small",
          product_id: item.id
        })]
      }, item.id);
    }) : /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      children: "Loading"
    })
  });
}

/***/ })

}]);
//# sourceMappingURL=319.bundle.js.map