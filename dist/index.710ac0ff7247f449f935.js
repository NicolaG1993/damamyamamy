"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[826],{

/***/ 5796:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(3935);
// EXTERNAL MODULE: ./node_modules/@loadable/component/dist/loadable.esm.js + 1 modules
var loadable_esm = __webpack_require__(7617);
// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(3727);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
var es = __webpack_require__(1372);
// EXTERNAL MODULE: ./node_modules/redux/es/redux.js + 2 modules
var redux = __webpack_require__(1330);
// EXTERNAL MODULE: ./node_modules/redux-thunk/es/index.js
var redux_thunk_es = __webpack_require__(3894);
// EXTERNAL MODULE: ./node_modules/redux-devtools-extension/index.js
var redux_devtools_extension = __webpack_require__(8500);
;// CONCATENATED MODULE: ./src/client/utils/useDeepPath.js
function useDeepPath(obj, path, def) {
  //questa funzione serve per passare deep path come stringhe, es: "price.raw"
  function stringToPath(path) {
    // If the path isn't a string, return it
    if (typeof path !== "string") return path; // Create new array

    var output = []; // Split to an array with dot notation

    path.split(".").forEach(function (item, index) {
      // Split to an array with bracket notation
      item.split(/\[([^}]+)\]/g).forEach(function (key) {
        // Push to the new array
        if (key.length > 0) {
          output.push(key);
        }
      });
    });
    return output;
  } // Get the path as an array


  path = stringToPath(path); // Cache the current object

  var current = obj; // For each item in the path, dig into the object

  for (var i = 0; i < path.length; i++) {
    // If the item isn't found, return the default (or null)
    if (!current[path[i]]) return def || null; // Otherwise, update the current  value

    current = current[path[i]];
  }

  return current;
} // useDeepPath(state, price.raw, "no results");
// penso si usi cosí (vedi useSort.js)
;// CONCATENATED MODULE: ./src/client/utils/useSort.js

function sortArrayAsc(arr, field) {
  var sortedArr = arr.sort(function (a, b) {
    if (useDeepPath(a, field) > useDeepPath(b, field)) {
      return 1;
    }

    if (useDeepPath(b, field) > useDeepPath(a, field)) {
      return -1;
    }

    return 0;
  });
  return JSON.parse(JSON.stringify(sortedArr)); //l'array qui viene clonata, se no redux non la re-rendera
}
function sortArrayDesc(arr, field) {
  var sortedArr = arr.sort(function (a, b) {
    if (useDeepPath(a, field) > useDeepPath(b, field)) {
      return -1;
    }

    if (useDeepPath(b, field) > useDeepPath(a, field)) {
      return 1;
    }

    return 0;
  });
  return JSON.parse(JSON.stringify(sortedArr));
}
// EXTERNAL MODULE: ./src/client/redux/LoadData/loadData.types.js
var loadData_types = __webpack_require__(6570);
;// CONCATENATED MODULE: ./src/client/redux/LoadData/loadData.reducer.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable indent */


var INITIAL_STATE = {
  data: [],
  categories: []
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case loadData_types/* LOAD_DATA */.Uy:
      {
        var data = action.payload;
        console.log("LOAD_DATA: ", action.payload);
        return _objectSpread(_objectSpread({}, state), {}, {
          data: data
        });
      }

    case loadData_types/* FETCH_CATEGORIES */.Hw:
      {
        console.log("FETCH_CATEGORIES: ", action.payload);
        var categories = action.payload;
        return _objectSpread(_objectSpread({}, state), {}, {
          categories: categories
        });
      }

    case loadData_types/* FETCH_SPECIFIC_CATEGORIES */.q:
      {
        var _data = state.data;

        var catNewItems = _data && sortArrayDesc(_data, "created");

        var cat1 = _data && _data.filter(function (product) {
          return product.categories[0] && product.categories[0].slug === "giochi";
        });

        var cat2 = _data && _data.filter(function (product) {
          return product.categories[0] && product.categories[0].slug === "passeggini-e-trasporto";
        }); // FIXARE? 🧨


        console.log("FETCH_SPECIFIC_CATEGORIES: ", _objectSpread(_objectSpread({}, state), {}, {
          catNewItems: catNewItems,
          cat1: cat1,
          cat2: cat2
        }));
        return _objectSpread(_objectSpread({}, state), {}, {
          catNewItems: catNewItems,
          cat1: cat1,
          cat2: cat2
        });
      }

    case loadData_types/* FETCH_HIGHEST_VALUE */.MD:
      {
        var _data2 = state.data;
        var topValue = Math.max.apply(Math, _data2.map(function (element) {
          return element.price.raw; // FIXARE ? 🧨
        }));
        return _objectSpread(_objectSpread({}, state), {}, {
          topValue: topValue
        });
      }

    case loadData_types/* GET_ITEM */.rt:
      {
        var _data3 = state.data;
        var key = Number(action.payload.key);

        var selectedItem = _data3.find(function (item) {
          return item.id === key;
        }); // FIXARE ? 🧨


        console.log("GET_ITEM: ", selectedItem);
        return _objectSpread(_objectSpread({}, state), {}, {
          selectedItem: selectedItem
        });
      }

    default:
      return state;
  }
}
// EXTERNAL MODULE: ./src/client/redux/FilterStore/filterStore.types.js
var filterStore_types = __webpack_require__(5731);
;// CONCATENATED MODULE: ./src/client/redux/FilterStore/filterStore.reducer.js
function filterStore_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function filterStore_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { filterStore_reducer_ownKeys(Object(source), true).forEach(function (key) { filterStore_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { filterStore_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function filterStore_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable indent */


var filterStore_reducer_INITIAL_STATE = {};
function filterStore_reducer_reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : filterStore_reducer_INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case filterStore_types/* SETUP_STORE */.gt:
      {
        var data = action.payload;
        return filterStore_reducer_objectSpread(filterStore_reducer_objectSpread({}, state), {}, {
          appliedFilters: {
            name: "",
            priceMin: 0,
            category: "",
            categoryID: "",
            order: "new"
          },
          originalState: data,
          filteredItems: data
        });
      }

    case filterStore_types/* FILTER_BY_VALUE */.U_:
      {
        var newState = Object.assign({}, state);
        var value = action.payload.value;
        console.log("FILTER_BY_VALUE: ", value);
        var filteredValues = state.originalState.filter(function (product) {
          // NB: io uso originalState perché non mi aspetto di avere troppo data, in quel caso gestire chunk di data via server e usarli come originalState (credo)
          return product.name.toLowerCase().includes(value) || product.animal && product.animal.toLowerCase().includes(value);
        }); //look for objects with the received value in their ‘name’ or animal fields

        if (value === "") {
          newState.filteredItems = state.originalState;
        } else {
          newState.filteredItems = filteredValues;
        }

        newState.appliedFilters = filterStore_reducer_objectSpread(filterStore_reducer_objectSpread({}, state.appliedFilters), {}, {
          name: value
        });
        return newState;
      }

    case filterStore_types/* FILTER_BY_CATEGORY */.gr:
      {
        var _value = action.payload.value;
        var valueID = action.payload.valueID;

        var _newState = Object.assign({}, state);

        if (_value === "") {
          _newState.filteredItems = state.filteredItems;
        } else {
          _newState.filteredItems = state.filteredItems.filter(function (item) {
            return item.animal === _value && item.animalID === valueID;
          }); // NB: io uso originalState
        }

        _newState.appliedFilters = filterStore_reducer_objectSpread(filterStore_reducer_objectSpread({}, state.appliedFilters), {}, {
          category: _value,
          categoryID: valueID
        }); //Filter deve impostare i filtri
        //Li passa qua e viene filtrato state
        //State viene passato da comp? /o preso da redux state direttamente?
        //Salvare il nuovo state e usarlo in ItemsList

        console.log("FILTER_BY_CATEGORY", _newState);
        return _newState;
      }

    case filterStore_types/* FILTER_BY_PRICE */.o6:
      {
        var _newState2 = Object.assign({}, state);

        var minPrice = action.payload.minPrice;
        var maxPrice = action.payload.maxPrice;

        if (minPrice || maxPrice) {
          var _filteredValues = state.filteredItems.filter(function (product) {
            return product.age >= minPrice && product.age <= maxPrice;
          }); // NB: io uso originalState


          _newState2.filteredItems = _filteredValues;
        }

        return _newState2;
      }

    case filterStore_types/* SORT_BY_NEW */.Vn:
      {
        var _newState3 = Object.assign({}, state);

        _newState3.filteredItems = sortArrayDesc(state.filteredItems, "created");
        _newState3.appliedFilters = filterStore_reducer_objectSpread(filterStore_reducer_objectSpread({}, state.appliedFilters), {}, {
          order: action.payload.value
        });
        return _newState3;
      }

    case filterStore_types/* SORT_BY_ALPHABET */.oJ:
      {
        var _newState4 = Object.assign({}, state);

        var sortedArr = action.payload.value === "asc" ? sortArrayAsc(state.filteredItems, "name") : sortArrayDesc(state.filteredItems, "name");
        _newState4.filteredItems = sortedArr;
        _newState4.appliedFilters = filterStore_reducer_objectSpread(filterStore_reducer_objectSpread({}, state.appliedFilters), {}, {
          order: action.payload.value
        });
        return _newState4;
      }

    case filterStore_types/* SORT_BY_PRICE */.Ng:
      {
        console.log("SORT_BY_PRICE: ", state);
        var _value2 = action.payload.value;

        var _newState5 = Object.assign({}, state);

        var _sortedArr = _value2 === "lowPrice" ? sortArrayAsc(state.filteredItems, "age") : sortArrayDesc(state.filteredItems, "age");

        _newState5.filteredItems = _sortedArr;
        _newState5.appliedFilters = filterStore_reducer_objectSpread(filterStore_reducer_objectSpread({}, state.appliedFilters), {}, {
          order: _value2
        });

        var updatedState = filterStore_reducer_objectSpread({}, _newState5);

        return updatedState;
      }

    default:
      return state;
  }
}
// EXTERNAL MODULE: ./src/client/redux/PageNav/pageNav.types.js
var pageNav_types = __webpack_require__(5070);
;// CONCATENATED MODULE: ./src/client/redux/PageNav/pageNav.reducer.js
function pageNav_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function pageNav_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { pageNav_reducer_ownKeys(Object(source), true).forEach(function (key) { pageNav_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { pageNav_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function pageNav_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable indent */

var pageNav_reducer_INITIAL_STATE = {
  countPerPage: 9
}; // countPerPage: We need the total number of pages. This is used in rendering the pagination component. //round up

function pageNav_reducer_reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pageNav_reducer_INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case pageNav_types/* SETUP */.ye:
      {
        console.log("🍄SETUP: ", action.payload);
        var data = action.payload.ItemsList;
        var countPerPage = state.countPerPage;
        var count = data.length + 1;
        var totalPages = Math.ceil((count - 1) / countPerPage);
        return pageNav_reducer_objectSpread(pageNav_reducer_objectSpread({}, state), {}, {
          filteredItems: data,
          //i prodotti dopo i filtri // tutti inizialmente
          displayedItems: data.slice(0, countPerPage),
          //i prodotti al momento in pagina //0 l'inizio, countPerPage la fine
          currentCount: countPerPage,
          //index di filteredItems da usare per displayedItems //lo starting point
          totalCount: count,
          //la lunghezza di filteredItems
          currentPage: 1,
          //la pagina attuale
          totalPages: totalPages,
          //pagine totali
          filteredPages: totalPages //totale pagine filtrate ?

        });
      }

    case pageNav_types/* LOAD_NEW_PAGE */.RY:
      {
        var _countPerPage = state.countPerPage;
        var newState = Object.assign({}, state);
        var addPages = action.payload.page; //page to add (always 1 or -1)

        newState.currentPage += addPages; //add it to the currentPage

        var nextProducts;

        if (addPages === 1) {
          var upperCount = newState.currentCount + _countPerPage; //Moving from page 1 to 2 will cause ‘upperCount’ to be 18

          var lowerCount = newState.currentCount; //This hasn’t been changed

          newState.currentCount += _countPerPage; //Set new currentCount
          //Only retrieve products within the (9,18) range (for page 2)

          nextProducts = state.filteredItems.slice(lowerCount, upperCount);
        }

        if (addPages === -1) {
          var _upperCount = newState.currentCount; //18 //’currentCount’ has changed roles. Now it serves as the upperCount.

          var _lowerCount = newState.currentCount - _countPerPage; //9


          newState.currentCount = _lowerCount; //Then it’s reset. This way, the first if statement will always treat it as the ‘upperCount’

          nextProducts = state.filteredItems.slice(_lowerCount - _countPerPage, _upperCount - _countPerPage);
        }

        newState.displayedItems = nextProducts;
        window.history.pushState({
          page: 1
        }, "title 1", "?page=".concat(newState.currentPage)); //set url bar to actual page

        return newState;
      }

    case pageNav_types/* LOAD_EXACT_PAGE */.TL:
      {
        // console.log("LOAD_EXACT_PAGE", state);
        var _newState = Object.assign({}, state);

        var exactPage = action.payload.page;
        var upperCountExact = _newState.countPerPage * exactPage;
        var lowerCountExact = upperCountExact - _newState.countPerPage;

        var exactProducts = _newState.filteredItems.slice(lowerCountExact, upperCountExact);

        _newState.displayedItems = exactProducts;
        _newState.currentCount = upperCountExact;
        _newState.currentPage = exactPage;
        window.history.pushState({
          page: 1
        }, "title 1", "?page=".concat(_newState.currentPage));
        return _newState;
      }

    default:
      return state;
  }
} // una fn per fare il load di data necessario e settare starting state values (magari gia in shop o app!)
//   fare lo stesso per passState allora? (metterlo in app intendo)
//   e allora potrei anche accedere a results di Shop direttamente dallo state in ItemsList ?
//   e Shop diventerebbe un semplice container ? nice
//   pensandoci non mi serve tutto data in App, ma solo in Shop
//      in App data alla fine mi serve solo per le small categories, potrei peró caricarlo dentro il reducer per Shop -> filterStore
//      che poi passo ad un altro reducer per settare le small categories in un altro state (che useró in Home)
// una fn load new page
// EXTERNAL MODULE: ./src/client/redux/ToggleLayout/toggleLayout.types.js
var toggleLayout_types = __webpack_require__(3643);
;// CONCATENATED MODULE: ./src/client/redux/ToggleLayout/toggleLayout.reducer.js
/* eslint-disable indent */

var toggleLayout_reducer_INITIAL_STATE = {
  layouts: [{
    id: "overlay",
    active: false
  }, {
    id: "nav",
    active: false
  }, {
    id: "alert",
    active: true
  }]
};
function toggleLayout_reducer_reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : toggleLayout_reducer_INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case toggleLayout_types/* TOGGLE */.DY:
      {
        var layouts = state.layouts; // console.log("TOGGLE: ", action.payload);

        var id = action.payload.id;
        var newArr = layouts.map(function (layout) {
          return layout.id === id ? {
            id: layout.id,
            active: !layout.active
          } : layout;
        });
        return {
          layouts: newArr
        };
      }

    case toggleLayout_types/* OPEN */.o1:
      {
        var _layouts = state.layouts; // console.log("OPEN: ", action.payload);

        var _id = action.payload.id;

        var _newArr = _layouts.map(function (layout) {
          return layout.id === _id ? {
            id: layout.id,
            active: true
          } : layout;
        });

        return {
          layouts: _newArr
        };
      }

    case toggleLayout_types/* CLOSE */.F$:
      {
        var _layouts2 = state.layouts; // console.log("CLOSE: ", action.payload);

        var _id2 = action.payload.id;

        var _newArr2 = _layouts2.map(function (layout) {
          return layout.id === _id2 ? {
            id: layout.id,
            active: false
          } : layout;
        });

        return {
          layouts: _newArr2
        };
      }

    default:
      return state;
  }
}
;// CONCATENATED MODULE: ./src/client/redux/rootReducer.js





var rootReducer = (0,redux/* combineReducers */.UY)({
  loadData: reducer,
  filterStore: filterStore_reducer_reducer,
  pageNav: pageNav_reducer_reducer,
  toggleLayout: toggleLayout_reducer_reducer
});
/* harmony default export */ const redux_rootReducer = (rootReducer);
;// CONCATENATED MODULE: ./src/client/redux/store.js




var store = (0,redux/* createStore */.MT)(redux_rootReducer, (0,redux_devtools_extension/* composeWithDevTools */.Uo)((0,redux/* applyMiddleware */.md)(redux_thunk_es/* default */.Z)));
/* harmony default export */ const redux_store = (store);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js + 1 modules
var react_router = __webpack_require__(5977);
;// CONCATENATED MODULE: ./src/client/utils/scrollToTop.js


function ScrollToTop() {
  var _useLocation = (0,react_router/* useLocation */.TH)(),
      pathname = _useLocation.pathname;

  (0,react.useEffect)(function () {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/client/index.js
// REACT


 // REDUX


 // HOOKS

 // COMPONENTS

var App = (0,loadable_esm/* default */.ZP)(function () {
  return Promise.all(/* import() */[__webpack_require__.e(216), __webpack_require__.e(660)]).then(__webpack_require__.bind(__webpack_require__, 6660));
}); // STYLE

 // import Icon from "./assets/logo192.png";




if (false) {}

react_dom.render( /*#__PURE__*/(0,jsx_runtime.jsx)(es/* Provider */.zt, {
  store: redux_store,
  children: /*#__PURE__*/(0,jsx_runtime.jsxs)(react_router_dom/* BrowserRouter */.VK, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(ScrollToTop, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(App, {})]
  })
}), document.getElementById("root"));

/***/ }),

/***/ 5731:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gt": () => (/* binding */ SETUP_STORE),
/* harmony export */   "U_": () => (/* binding */ FILTER_BY_VALUE),
/* harmony export */   "gr": () => (/* binding */ FILTER_BY_CATEGORY),
/* harmony export */   "o6": () => (/* binding */ FILTER_BY_PRICE),
/* harmony export */   "Vn": () => (/* binding */ SORT_BY_NEW),
/* harmony export */   "oJ": () => (/* binding */ SORT_BY_ALPHABET),
/* harmony export */   "Ng": () => (/* binding */ SORT_BY_PRICE)
/* harmony export */ });
var SETUP_STORE = "SETUP STORE";
var FILTER_BY_VALUE = "FILTER BY VALUE";
var FILTER_BY_CATEGORY = "FILTER BY CATEGORY";
var FILTER_BY_PRICE = "FILTER BY PRICE";
var SORT_BY_NEW = "SORT BY NEW";
var SORT_BY_ALPHABET = "SORT BY ALPHABET";
var SORT_BY_PRICE = "SORT BY PRICE";

/***/ }),

/***/ 6570:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Uy": () => (/* binding */ LOAD_DATA),
/* harmony export */   "Hw": () => (/* binding */ FETCH_CATEGORIES),
/* harmony export */   "q": () => (/* binding */ FETCH_SPECIFIC_CATEGORIES),
/* harmony export */   "MD": () => (/* binding */ FETCH_HIGHEST_VALUE),
/* harmony export */   "rt": () => (/* binding */ GET_ITEM)
/* harmony export */ });
var LOAD_DATA = "LOAD DATA";
var FETCH_CATEGORIES = "FETCH CATEGORIES";
var FETCH_SPECIFIC_CATEGORIES = "LOAD SPECIFIC CATEGORIES";
var FETCH_HIGHEST_VALUE = "FETCH HIGHEST VALUE";
var GET_ITEM = "GET ITEM";

/***/ }),

/***/ 5070:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ye": () => (/* binding */ SETUP),
/* harmony export */   "RY": () => (/* binding */ LOAD_NEW_PAGE),
/* harmony export */   "TL": () => (/* binding */ LOAD_EXACT_PAGE)
/* harmony export */ });
var SETUP = "SETUP";
var LOAD_NEW_PAGE = "LOAD NEW PAGE";
var LOAD_EXACT_PAGE = "LOAD EXACT PAGE";

/***/ }),

/***/ 3643:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DY": () => (/* binding */ TOGGLE),
/* harmony export */   "o1": () => (/* binding */ OPEN),
/* harmony export */   "F$": () => (/* binding */ CLOSE)
/* harmony export */ });
var TOGGLE = "TOGGLE";
var OPEN = "OPEN";
var CLOSE = "CLOSE";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [216], () => (__webpack_exec__(6981), __webpack_exec__(5796)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.710ac0ff7247f449f935.js.map