"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[825],{

/***/ 2233:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Shop)
});

// EXTERNAL MODULE: ./node_modules/@loadable/component/dist/loadable.esm.js + 1 modules
var loadable_esm = __webpack_require__(7617);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
var es = __webpack_require__(1372);
// EXTERNAL MODULE: ./src/client/redux/FilterStore/filterStore.actions.js
var filterStore_actions = __webpack_require__(7646);
// EXTERNAL MODULE: ./src/client/redux/PageNav/pageNav.actions.js
var pageNav_actions = __webpack_require__(5168);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/client/components/Shop/PageNav/PageNav.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

 // import { Switch, Route, Link, useRouteMatch } from "react-router-dom";


 // import { getItem } from "../../../redux/LoadData/loadData.actions";





var loadPageNav = function loadPageNav(state) {
  return state.pageNav;
};

function PageNav() {
  var dispatch = (0,es/* useDispatch */.I0)(); // let state = useSelector((state) => state);

  var pageNav = (0,es/* useSelector */.v9)(loadPageNav, es/* shallowEqual */.wU);

  var nextPage = function nextPage() {
    return dispatch((0,pageNav_actions/* loadNewPage */.fK)({
      page: 1
    }));
  };

  var previousPage = function previousPage() {
    return dispatch((0,pageNav_actions/* loadNewPage */.fK)({
      page: -1
    }));
  };

  var goToPage = function goToPage(page) {
    return dispatch((0,pageNav_actions/* loadExactPage */.nE)({
      page: page
    }));
  }; // useEffect(() => dispatch(setPageNav()), []);


  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    id: "PageNav",
    children: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "pagenav-wrap",
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("nav", {
        className: "pagination",
        children: [pageNav.currentPage > 1 && /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
          className: "pagenav-arrow pagination-previous",
          onClick: function onClick() {
            previousPage();
          },
          children: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
            className: "pagenav-prev"
          })
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("ul", {
          className: "pagination-list",
          children: _toConsumableArray(Array(pageNav.filteredPages)).map(function (value, index) {
            return /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
              className: "pagenav-button pagination-link ".concat(pageNav.currentPage === index + 1 ? "is-current" : ""),
              onClick: function onClick() {
                return goToPage(index + 1);
              },
              children: index + 1
            }, index);
          })
        }), pageNav.currentPage !== pageNav.totalPages && /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
          className: "pagenav-arrow pagination-next",
          onClick: function onClick() {
            nextPage();
          },
          children: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
            className: "pagenav-next"
          })
        })]
      })
    })
  });
}
// EXTERNAL MODULE: ./src/client/redux/LoadData/loadData.actions.js
var loadData_actions = __webpack_require__(3689);
// EXTERNAL MODULE: ./src/client/utils/useWindowDimensions.js
var utils_useWindowDimensions = __webpack_require__(1970);
;// CONCATENATED MODULE: ./src/client/components/Shop/CategoriesMenu/CategoriesMenu.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || CategoriesMenu_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function CategoriesMenu_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return CategoriesMenu_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return CategoriesMenu_arrayLikeToArray(o, minLen); }

function CategoriesMenu_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var getCategories = function getCategories(state) {
  return state.loadData.categories;
};





function CategoriesMenu() {
  var _useWindowDimensions = useWindowDimensions(),
      width = _useWindowDimensions.width;

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      sliceStart = _useState2[0],
      setSliceStart = _useState2[1];

  var _useState3 = useState(7),
      _useState4 = _slicedToArray(_useState3, 2),
      step = _useState4[0],
      setStep = _useState4[1];

  var categories = useSelector(getCategories, shallowEqual);
  var dispatch = useDispatch();

  var handleSelectCategory = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(arg, argID) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // modifico solo filters.category con arg
              // setFilters((prevState) => ({
              // ...prevState,
              // category: arg,
              // categoryID: argID,
              // })); // forse non servirá setFilters
              // pure qui passiamo arg perché setState é async //dovremmo usare un useEffect in alternativa //il valore di state non ancora settato
              dispatch(filterByCategory({
                value: arg,
                valueID: argID
              })); // filterByCategory({ value: arg, valueID: argID });

              console.log("activate handleSelectCategory");

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleSelectCategory(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var seeNext = function seeNext() {
    setSliceStart(function (startingPoint) {
      return startingPoint < categories.length - step ? startingPoint + step : startingPoint = 0;
    });
  };

  var seePrev = function seePrev() {
    var formula = categories.length - categories.length % step; //il primo if serve per quando si va indietro dalla prima
    //crea automaticamente i breaking point su gli steps esatti

    setSliceStart(function (startingPoint) {
      return startingPoint < step ? formula === categories.length ? formula - step : formula : startingPoint - step;
    }); //il secondo serve per essere sicuri di non iniziare dall'ultima
    //in quel caso sottrae step
  };

  useEffect(function () {
    if (width <= 720) {
      setStep(2);
    } else {
      setStep(7);
    }
  }, [width]);
  useEffect(function () {
    console.log("sliceStart: ", sliceStart); // console.log("categories.length: ", categories.length);

    if (categories) {
      if (categories.length === sliceStart) {
        setSliceStart(function (startingPoint) {
          return startingPoint - step;
        });
      }
    }
  }, [sliceStart]);
  return /*#__PURE__*/_jsxs("nav", {
    className: "categories-nav",
    children: [/*#__PURE__*/_jsx("button", {
      className: "categories-btn",
      onClick: function onClick() {
        return seePrev();
      },
      children: "prev"
    }), categories ? /*#__PURE__*/_jsxs("div", {
      className: "categories-wrap",
      children: [/*#__PURE__*/_jsx("p", {
        onClick: function onClick() {
          return handleSelectCategory("", "");
        },
        children: "All"
      }), categories.slice(sliceStart, sliceStart + step).map(function (category) {
        return /*#__PURE__*/_jsx("p", {
          onClick: function onClick() {
            return handleSelectCategory(category.name, category.id);
          },
          children: category.name
        }, category.id);
      })]
    }) : /*#__PURE__*/_jsx("div", {
      className: "center-text",
      children: /*#__PURE__*/_jsx("p", {
        children: "Nessun risultato"
      })
    }), /*#__PURE__*/_jsx("button", {
      className: "categories-btn",
      onClick: function onClick() {
        return seeNext();
      },
      children: "next"
    })]
  });
}
;// CONCATENATED MODULE: ./src/client/components/Shop/Shop.js


 // REDUX
// import { connect } from "react-redux";


 // import { fetchHighestValue } from "../../redux/LoadData/loadData.actions";

var filterStore = function filterStore(state) {
  return state.filterStore;
};

var ItemsList = (0,loadable_esm/* default */.ZP)(function () {
  return __webpack_require__.e(/* import() */ 319).then(__webpack_require__.bind(__webpack_require__, 7319));
});
var Filter = (0,loadable_esm/* default */.ZP)(function () {
  return Promise.all(/* import() */[__webpack_require__.e(216), __webpack_require__.e(678)]).then(__webpack_require__.bind(__webpack_require__, 2678));
});




function Shop() {
  var storeState = (0,es/* useSelector */.v9)(filterStore, es/* shallowEqual */.wU);
  console.log("storeState changed:", storeState);
  var dispatch = (0,es/* useDispatch */.I0)();
  (0,react.useEffect)(function () {
    return dispatch((0,filterStore_actions/* setupStore */.zn)());
  }, []); // useEffect(
  //     () => storeState.data && dispatch(fetchHighestValue()),
  //     [storeState.data]
  // );

  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    id: "Shop",
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "shop-wrap",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h1", {
        children: "In negozio"
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(Filter, {
        fallback: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: "loader"
        })
      }), storeState.filteredItems && storeState.filteredItems.length === 1 && /*#__PURE__*/(0,jsx_runtime.jsxs)("h5", {
        children: [storeState.filteredItems.length, " risultato"]
      }), storeState.filteredItems && storeState.filteredItems.length > 1 && /*#__PURE__*/(0,jsx_runtime.jsxs)("h5", {
        children: [storeState.filteredItems.length, " risultati"]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(PageNav, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(ItemsList, {
        fallback: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: "loader"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(PageNav, {})]
    })
  });
}

/***/ }),

/***/ 7646:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zn": () => (/* binding */ setupStore),
/* harmony export */   "s2": () => (/* binding */ filterByValue),
/* harmony export */   "Q6": () => (/* binding */ filterByCategory),
/* harmony export */   "d$": () => (/* binding */ sortByPrice),
/* harmony export */   "ID": () => (/* binding */ filterByPrice),
/* harmony export */   "jK": () => (/* binding */ sortByAlphabet),
/* harmony export */   "_M": () => (/* binding */ sortByNew)
/* harmony export */ });
/* harmony import */ var _filterStore_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5731);
// in questo file esportiamo le varie funzioni da invokare in App

function setupStore() {
  //come ottenere state da un'altro reducer
  //in alternativa si puo semplicemente passare via prop da component
  return function (dispatch, getState) {
    var data = getState().loadData.data;
    dispatch({
      type: _filterStore_types__WEBPACK_IMPORTED_MODULE_0__/* .SETUP_STORE */ .gt,
      payload: data
    });
  };
}
function filterByValue(payload) {
  return {
    type: _filterStore_types__WEBPACK_IMPORTED_MODULE_0__/* .FILTER_BY_VALUE */ .U_,
    payload: payload
  };
}
function filterByCategory(payload) {
  return {
    type: _filterStore_types__WEBPACK_IMPORTED_MODULE_0__/* .FILTER_BY_CATEGORY */ .gr,
    payload: payload
  };
}
function sortByPrice(payload) {
  return {
    type: _filterStore_types__WEBPACK_IMPORTED_MODULE_0__/* .SORT_BY_PRICE */ .Ng,
    payload: payload
  };
}
function filterByPrice(payload) {
  return {
    type: _filterStore_types__WEBPACK_IMPORTED_MODULE_0__/* .FILTER_BY_PRICE */ .o6,
    payload: payload
  };
}
function sortByAlphabet(payload) {
  return {
    type: _filterStore_types__WEBPACK_IMPORTED_MODULE_0__/* .SORT_BY_ALPHABET */ .oJ,
    payload: payload
  };
}
function sortByNew(payload) {
  return {
    type: _filterStore_types__WEBPACK_IMPORTED_MODULE_0__/* .SORT_BY_NEW */ .Vn,
    payload: payload
  };
}

/***/ }),

/***/ 5168:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Po": () => (/* binding */ setPageNav),
/* harmony export */   "fK": () => (/* binding */ loadNewPage),
/* harmony export */   "nE": () => (/* binding */ loadExactPage)
/* harmony export */ });
/* harmony import */ var _pageNav_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5070);

function setPageNav(payload) {
  return {
    type: _pageNav_types__WEBPACK_IMPORTED_MODULE_0__/* .SETUP */ .ye,
    payload: payload
  };
}
function loadNewPage(payload) {
  return {
    type: _pageNav_types__WEBPACK_IMPORTED_MODULE_0__/* .LOAD_NEW_PAGE */ .RY,
    payload: payload
  };
}
function loadExactPage(payload) {
  return {
    type: _pageNav_types__WEBPACK_IMPORTED_MODULE_0__/* .LOAD_EXACT_PAGE */ .TL,
    payload: payload
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
//# sourceMappingURL=825.bundle.js.map