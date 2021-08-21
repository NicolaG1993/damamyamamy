(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[660],{

/***/ 8253:
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

/***/ }),

/***/ 6660:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3810);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3727);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5977);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1372);
/* harmony import */ var _redux_LoadData_loadData_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3689);
/* harmony import */ var _redux_LoadCart_loadCart_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(136);
/* harmony import */ var _client_src_utils_themes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8253);
/* harmony import */ var _client_src_utils_themes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_client_src_utils_themes__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5893);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// REACT


 // REDUX





var fetchData = function fetchData(state) {
  return state.loadData;
}; // const fetchState = (state) => state;
// COMPONENTS


var Header = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 296).then(__webpack_require__.bind(__webpack_require__, 6296));
});
var Footer = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 481).then(__webpack_require__.bind(__webpack_require__, 8481));
});
var Overlay = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 11).then(__webpack_require__.bind(__webpack_require__, 11));
});
var Home = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 713).then(__webpack_require__.bind(__webpack_require__, 4713));
});
var About = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 959).then(__webpack_require__.bind(__webpack_require__, 2959));
});
var Contact = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 921).then(__webpack_require__.bind(__webpack_require__, 4921));
});
var Shop = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 825).then(__webpack_require__.bind(__webpack_require__, 2233));
});
var Item = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 146).then(__webpack_require__.bind(__webpack_require__, 146));
});
var Cart = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 499).then(__webpack_require__.bind(__webpack_require__, 499));
});
var Checkout = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return Promise.all(/* import() */[__webpack_require__.e(216), __webpack_require__.e(105)]).then(__webpack_require__.bind(__webpack_require__, 1105));
});
var FAQ = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 57).then(__webpack_require__.bind(__webpack_require__, 6957));
});
var PrivacyAndCookiePolicy = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 458).then(__webpack_require__.bind(__webpack_require__, 9458));
});
var Regolamento = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 595).then(__webpack_require__.bind(__webpack_require__, 8011));
});
var TermsAndConditions = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 859).then(__webpack_require__.bind(__webpack_require__, 6859));
});
var CookiesPopUp = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 301).then(__webpack_require__.bind(__webpack_require__, 7301));
}); // CUSTOM HOOKS

 // APP



function App() {
  var data = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useSelector */ .v9)(fetchData, react_redux__WEBPACK_IMPORTED_MODULE_2__/* .shallowEqual */ .wU); // console.log("data changed:", data);
  // let state = useSelector(fetchState, shallowEqual); // only for development //crashes Shop
  // console.log("🍟REDUX store: ", state);

  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useDispatch */ .I0)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    (0,_client_src_utils_themes__WEBPACK_IMPORTED_MODULE_5__.keepTheme)();
    dispatch((0,_redux_LoadData_loadData_actions__WEBPACK_IMPORTED_MODULE_3__/* .loadData */ .mu)());
    dispatch((0,_redux_LoadData_loadData_actions__WEBPACK_IMPORTED_MODULE_3__/* .fetchCategories */ .pE)());
    dispatch((0,_redux_LoadCart_loadCart_actions__WEBPACK_IMPORTED_MODULE_4__/* .fetchCart */ .x7)());
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    dispatch((0,_redux_LoadData_loadData_actions__WEBPACK_IMPORTED_MODULE_3__/* .fetchSpecificCategories */ .ou)());
  }, [data.data]);

  var NotFound = function NotFound() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h1", {
        children: "404 - Not Found!"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_7__/* .Link */ .rU, {
        to: "/",
        children: "Go Home"
      })]
    });
  };

  var routes = [{
    path: "/",
    exact: true,
    component: Home
  }, {
    path: "/about",
    component: About
  }, {
    path: "/shop",
    component: function component(props) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Shop, {
        research: props.location.tag
      });
    }
  }, {
    path: "/item/:id",
    component: Item
  }, {
    path: "/contact",
    component: Contact
  }, {
    path: "/checkout",
    component: Checkout
  }, {
    path: "/cart",
    component: Cart
  }, {
    path: "/cookie-policy",
    component: PrivacyAndCookiePolicy
  }, {
    path: "/FAQ",
    component: FAQ
  }, {
    path: "/regolamento",
    component: Regolamento
  }, {
    path: "/terms-conditions",
    component: TermsAndConditions
  }, {
    path: "/404",
    exact: true,
    component: NotFound
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "App",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Header, {
      fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "loader"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__/* .Switch */ .rs, {
      children: [routes.map(function (route, i) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(RouteWithSubRoutes, _objectSpread({}, route), i + 1);
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__/* .Redirect */ .l_, {
        to: "/404"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Footer, {
      fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "loader"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Overlay, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(CookiesPopUp, {})]
  });
} // SINGLE ROUTE COMPONENT

function RouteWithSubRoutes(route) {
  // console.log("route", route);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__/* .Route */ .AW, {
    path: route.path,
    render: function render(props) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(route.component, _objectSpread(_objectSpread({}, props), {}, {
        routes: route.routes,
        fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "loader"
        })
      }));
    }
  });
} // notAvailables viene passato da App ai children (es. App->Shop->Item->CartButton)
// perché Cart state vá caricato a prescindere da quale component arriviamo prima, come da url bar link
// inoltre il suo stato deve essere costante in tutta App e i suoi children
// quindi tutti i component devono aggiornarsi di conseguenza, insieme
// const handleAddToCart = async (productId, quantity) => {
//     const item = await commerce.cart.add(productId, quantity);
//     const addedItems = item.cart.line_items.map((obj) => ({
//         item_id: obj.id,
//         product_id: obj.product_id,
//     }));
//     setState({ ...state, cart: item.cart, notAvailables: addedItems });
// };
// const handleRemoveFromCart = async (productId) => {
//     const item = await commerce.cart.remove(productId);
//     const addedItems = item.cart.line_items.map((obj) => ({
//         item_id: obj.id,
//         product_id: obj.product_id,
//     }));
//     setState({ ...state, cart: item.cart, notAvailables: addedItems });
// };
// const handleEmptyCart = async () => {
//     const item = await commerce.cart.empty();
//     const addedItems = item.cart.line_items.map((obj) => ({
//         item_id: obj.id,
//         product_id: obj.product_id,
//     }));
//     setState({ ...state, cart: item.cart, notAvailables: addedItems });
// };
// const refreshCart = async () => {
//     const newCart = await commerce.cart.refresh();
//     setState({ ...state, cart: newCart, notAvailables: [] });
// };
// const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
//     if (checkoutTokenId === "test") {
//         //this is only for test
//         handleEmptyCart();
//     } else {
//         try {
//             const incomingOrder = await commerce.checkout.capture(
//                 checkoutTokenId,
//                 newOrder
//             );
//             setState({ ...state, order: incomingOrder });
//             refreshCart();
//         } catch (err) {
//             setState({ ...state, errorMessage: err.data.error.message });
//         }
//     }
// };

/***/ }),

/***/ 5214:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ commerce)
/* harmony export */ });
/* harmony import */ var _chec_commerce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(172);
/* harmony import */ var _chec_commerce_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chec_commerce_js__WEBPACK_IMPORTED_MODULE_0__);

var commerce = new (_chec_commerce_js__WEBPACK_IMPORTED_MODULE_0___default())(undefined, true);

/***/ }),

/***/ 136:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x7": () => (/* binding */ fetchCart),
/* harmony export */   "Xq": () => (/* binding */ addToCart),
/* harmony export */   "h2": () => (/* binding */ removeFromCart),
/* harmony export */   "UY": () => (/* binding */ emptyCart),
/* harmony export */   "qN": () => (/* binding */ refreshCart)
/* harmony export */ });
/* harmony import */ var _loadCart_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7447);
/* harmony import */ var _lib_commerce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5214);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



function fetchCart() {
  return function (dispatch) {
    dispatch({
      type: _loadCart_types__WEBPACK_IMPORTED_MODULE_1__/* .FETCH_CART */ .ST
    });
    getSomeAsyncData(dispatch, _lib_commerce__WEBPACK_IMPORTED_MODULE_0__/* .commerce.cart.retrieve */ .B.cart.retrieve(), _loadCart_types__WEBPACK_IMPORTED_MODULE_1__/* .FETCH_CART */ .ST);
  };
}
function addToCart(payload) {
  return function (dispatch) {
    return getSomeAsyncData(dispatch, _lib_commerce__WEBPACK_IMPORTED_MODULE_0__/* .commerce.cart.add */ .B.cart.add(payload.productId, payload.quantity), _loadCart_types__WEBPACK_IMPORTED_MODULE_1__/* .HANDLE_CART */ .Wt);
  };
}
function removeFromCart(payload) {
  return function (dispatch) {
    return getSomeAsyncData(dispatch, _lib_commerce__WEBPACK_IMPORTED_MODULE_0__/* .commerce.cart.remove */ .B.cart.remove(payload.productId), _loadCart_types__WEBPACK_IMPORTED_MODULE_1__/* .HANDLE_CART */ .Wt);
  };
}
function emptyCart() {
  return function (dispatch) {
    return getSomeAsyncData(dispatch, _lib_commerce__WEBPACK_IMPORTED_MODULE_0__/* .commerce.cart.empty */ .B.cart.empty(), _loadCart_types__WEBPACK_IMPORTED_MODULE_1__/* .HANDLE_CART */ .Wt);
  };
}
function refreshCart() {
  return function (dispatch) {
    return getSomeAsyncData(dispatch, _lib_commerce__WEBPACK_IMPORTED_MODULE_0__/* .commerce.cart.refresh */ .B.cart.refresh(), _loadCart_types__WEBPACK_IMPORTED_MODULE_1__/* .HANDLE_NEW_CART */ .ol);
  };
}

function getSomeAsyncData(_x, _x2, _x3) {
  return _getSomeAsyncData.apply(this, arguments);
}

function _getSomeAsyncData() {
  _getSomeAsyncData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, url, type) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return url;

          case 3:
            data = _context.sent;
            // console.log(`😎😋😋data in ${type}: `, data);
            dispatch({
              type: type,
              payload: data
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log("err in ".concat(type, " action: "), _context.t0);
            dispatch({
              type: _loadCart_types__WEBPACK_IMPORTED_MODULE_1__/* .HANDLE_ERROR */ .yA,
              payload: {
                actionType: type,
                error: _context.t0
              }
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getSomeAsyncData.apply(this, arguments);
}

/***/ }),

/***/ 3689:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mu": () => (/* binding */ loadData),
/* harmony export */   "pE": () => (/* binding */ fetchCategories),
/* harmony export */   "rV": () => (/* binding */ getItem),
/* harmony export */   "ou": () => (/* binding */ fetchSpecificCategories),
/* harmony export */   "Aj": () => (/* binding */ fetchHighestValue)
/* harmony export */ });
/* harmony import */ var _loadData_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6570);
/* harmony import */ var _lib_commerce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5214);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


 // importa axios, api, ...
// Molte delle funzioni che fará il reducer si potranno eliminare se si lavora con server o api, vedi sotto

function loadData() {
  return function (dispatch) {
    dispatch({
      type: _loadData_types__WEBPACK_IMPORTED_MODULE_1__/* .LOAD_DATA */ .Uy
    });
    getSomeAsyncData(dispatch, _lib_commerce__WEBPACK_IMPORTED_MODULE_0__/* .commerce.products.list */ .B.products.list(), _loadData_types__WEBPACK_IMPORTED_MODULE_1__/* .LOAD_DATA */ .Uy);
  };
} // This is how we do async actions with redux-thunk

function fetchCategories() {
  return function (dispatch) {
    dispatch({
      type: _loadData_types__WEBPACK_IMPORTED_MODULE_1__/* .FETCH_CATEGORIES */ .Hw
    });
    getSomeAsyncData(dispatch, _lib_commerce__WEBPACK_IMPORTED_MODULE_0__/* .commerce.categories.list */ .B.categories.list(), _loadData_types__WEBPACK_IMPORTED_MODULE_1__/* .FETCH_CATEGORIES */ .Hw);
  };
} // This is how we do async actions with redux-thunk

function getItem(payload) {
  // una cosa come questa é meglio farla via request server side se possibile
  // console.log("😶😶😶😶😶😶", payload.key);
  var key = payload.key;
  return function (dispatch) {
    dispatch({
      type: _loadData_types__WEBPACK_IMPORTED_MODULE_1__/* .GET_ITEM */ .rt
    });
    getSomeAsyncData(dispatch, _lib_commerce__WEBPACK_IMPORTED_MODULE_0__/* .commerce.products.retrieve */ .B.products.retrieve(key), _loadData_types__WEBPACK_IMPORTED_MODULE_1__/* .GET_ITEM */ .rt);
  };
}

function getSomeAsyncData(_x, _x2, _x3) {
  return _getSomeAsyncData.apply(this, arguments);
}

function _getSomeAsyncData() {
  _getSomeAsyncData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, url, type) {
    var result, data, _yield$url, _data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!(type === _loadData_types__WEBPACK_IMPORTED_MODULE_1__/* .GET_ITEM */ .rt)) {
              _context.next = 8;
              break;
            }

            _context.next = 4;
            return url;

          case 4:
            data = _context.sent;
            result = data;
            _context.next = 13;
            break;

          case 8:
            _context.next = 10;
            return url;

          case 10:
            _yield$url = _context.sent;
            _data = _yield$url.data;
            result = _data;

          case 13:
            dispatch({
              type: type,
              payload: result
            }); // console.log("😶😶😶😶😶😶datadatadata", result);

            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            console.log("err in ".concat(type, " action: "), _context.t0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));
  return _getSomeAsyncData.apply(this, arguments);
}

function fetchSpecificCategories() {
  return {
    type: _loadData_types__WEBPACK_IMPORTED_MODULE_1__/* .FETCH_SPECIFIC_CATEGORIES */ .q
  };
}
function fetchHighestValue() {
  return {
    type: _loadData_types__WEBPACK_IMPORTED_MODULE_1__/* .FETCH_HIGHEST_VALUE */ .MD
  };
}

/***/ })

}]);
//# sourceMappingURL=660.bundle.js.map