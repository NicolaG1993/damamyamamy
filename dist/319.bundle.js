"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[319],{

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
  console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️item in ItemCard.js: ", item);

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
      setOnPage = _useState4[1];

  console.log("🧠🧠🧠PAGINATION!!!!!", pagination.displayedItems);
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
    console.log("🧠ItemsList updates results with: ", filteredItems);
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

  console.log("🍄🍄🍄 onPage -> ", onPage);
  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    className: "items-list",
    children: onPage ? onPage.length < 1 ? /*#__PURE__*/(0,jsx_runtime.jsx)("h4", {
      children: "No results"
    }) : onPage.map(function (item) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom/* Link */.rU, {
        to: "/item/".concat(item.id),
        className: "shop-item-wrap",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(ItemCard, {
          item: item
        })
      }, item.id);
    }) : /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      children: "Loading"
    })
  });
}

/***/ })

}]);
//# sourceMappingURL=319.bundle.js.map