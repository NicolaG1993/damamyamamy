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
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7617);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5977);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1372);
/* harmony import */ var _redux_LoadData_loadData_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3702);
/* harmony import */ var _client_src_utils_themes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8253);
/* harmony import */ var _client_src_utils_themes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_client_src_utils_themes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5893);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// REACT


 // REDUX




var fetchData = function fetchData(state) {
  return state.loadData;
}; // COMPONENTS


var Header = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 294).then(__webpack_require__.bind(__webpack_require__, 6294));
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
  return __webpack_require__.e(/* import() */ 779).then(__webpack_require__.bind(__webpack_require__, 6779));
});
var Shop = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 825).then(__webpack_require__.bind(__webpack_require__, 2233));
});
var Item = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 146).then(__webpack_require__.bind(__webpack_require__, 146));
});
var Cart = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 291).then(__webpack_require__.t.bind(__webpack_require__, 9291, 23));
});
var Checkout = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)(function () {
  return __webpack_require__.e(/* import() */ 675).then(__webpack_require__.t.bind(__webpack_require__, 3675, 23));
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
  var data = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useSelector */ .v9)(fetchData, react_redux__WEBPACK_IMPORTED_MODULE_2__/* .shallowEqual */ .wU);
  console.log("data changed:", data);
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useDispatch */ .I0)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    (0,_client_src_utils_themes__WEBPACK_IMPORTED_MODULE_4__.keepTheme)();
    dispatch((0,_redux_LoadData_loadData_actions__WEBPACK_IMPORTED_MODULE_3__/* .loadData */ .mu)());
    dispatch((0,_redux_LoadData_loadData_actions__WEBPACK_IMPORTED_MODULE_3__/* .fetchCategories */ .pE)()); // dispatch(fetchSpecificCategories());
    // dispatch(fetchHighestValue());
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    dispatch((0,_redux_LoadData_loadData_actions__WEBPACK_IMPORTED_MODULE_3__/* .fetchSpecificCategories */ .ou)());
  }, [data.data]);
  var routes = [{
    path: "/",
    exact: true,
    component: function component() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Home, {
        props: ""
      });
    }
  }, {
    path: "/about",
    component: About
  }, {
    path: "/shop",
    component: function component() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Shop, {});
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
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "App",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Header, {
      fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "loader"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__/* .Switch */ .rs, {
      children: routes.map(function (route, i) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(RouteWithSubRoutes, _objectSpread({}, route), i + 1);
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Footer, {
      fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "loader"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Overlay, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(CookiesPopUp, {})]
  });
} // SINGLE ROUTE COMPONENT

function RouteWithSubRoutes(route) {
  console.log("route", route);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__/* .Route */ .AW, {
    path: route.path,
    render: function render(props) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(route.component, _objectSpread(_objectSpread({}, props), {}, {
        routes: route.routes,
        fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "loader"
        })
      }));
    }
  });
}

/***/ }),

/***/ 3702:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "pE": () => (/* binding */ fetchCategories),
  "ou": () => (/* binding */ fetchSpecificCategories),
  "rV": () => (/* binding */ getItem),
  "mu": () => (/* binding */ loadData)
});

// UNUSED EXPORTS: fetchHighestValue

// EXTERNAL MODULE: ./src/client/redux/LoadData/loadData.types.js
var loadData_types = __webpack_require__(6570);
// EXTERNAL MODULE: ./node_modules/@chec/commerce.js/lib/index.js
var lib = __webpack_require__(172);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);
;// CONCATENATED MODULE: ./src/client/lib/commerce.js

var commerce = new (lib_default())("pk_test_256064749a77acef81f7f565517eb1be2138151d5380f", true);
;// CONCATENATED MODULE: ./src/client/redux/LoadData/loadData.actions.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


 // importa axios, api, ...
// Molte delle funzioni che fará il reducer si potranno eliminare se si lavora con server o api, vedi sotto

function loadData() {
  return function (dispatch) {
    dispatch({
      type: loadData_types/* LOAD_DATA */.Uy
    });
    getSomeAsyncData(dispatch, commerce.products.list(), loadData_types/* LOAD_DATA */.Uy);
  };
} // This is how we do async actions with redux-thunk

function fetchCategories() {
  return function (dispatch) {
    dispatch({
      type: loadData_types/* FETCH_CATEGORIES */.Hw
    });
    getSomeAsyncData(dispatch, commerce.categories.list(), loadData_types/* FETCH_CATEGORIES */.Hw);
  };
} // This is how we do async actions with redux-thunk

function getSomeAsyncData(_x, _x2, _x3) {
  return _getSomeAsyncData.apply(this, arguments);
}

function _getSomeAsyncData() {
  _getSomeAsyncData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, url, type) {
    var _yield$url, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return url;

          case 3:
            _yield$url = _context.sent;
            data = _yield$url.data;
            dispatch({
              type: type,
              payload: data
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log("err in ".concat(type, " action: "), _context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _getSomeAsyncData.apply(this, arguments);
}

function fetchSpecificCategories() {
  return {
    type: loadData_types/* FETCH_SPECIFIC_CATEGORIES */.q
  };
}
function fetchHighestValue() {
  return {
    type: FETCH_HIGHEST_VALUE
  };
}
function getItem(payload) {
  return {
    type: loadData_types/* GET_ITEM */.rt,
    payload: payload
  }; // una cosa come questa é meglio farla via request server side se possibile
}

/***/ })

}]);
//# sourceMappingURL=660.bundle.js.map