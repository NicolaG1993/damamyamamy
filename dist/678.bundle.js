"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[678],{

/***/ 2678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Filter)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-input-range/lib/js/index.js
var js = __webpack_require__(9322);
var js_default = /*#__PURE__*/__webpack_require__.n(js);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/client/components/Shop/Filter/FilterForm/FilterForm.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







function FilterForm(_ref) {
  var research = _ref.research,
      handleForm = _ref.handleForm,
      handleFormOrder = _ref.handleFormOrder,
      priceRange = _ref.priceRange,
      handlePriceRange = _ref.handlePriceRange,
      setPriceRange = _ref.setPriceRange,
      handleRangeSlider = _ref.handleRangeSlider,
      categories = _ref.categories,
      filters = _ref.filters,
      topValue = _ref.topValue,
      filtersBar = _ref.filtersBar;

  var _useState = (0,react.useState)(filters),
      _useState2 = _slicedToArray(_useState, 2),
      appliedFilters = _useState2[0],
      setAppliedFilters = _useState2[1];

  (0,react.useEffect)(function () {
    return setAppliedFilters(filters);
  }, [filters]);
  console.log("appliedFilters", appliedFilters); // console.log("✨✨categories", categories);

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("form", {
    className: filtersBar ? "filter-form" : "hidden",
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "filter-form-col-left",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
          children: "Ricerca per nome"
        })
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "filter-form-col-right",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)("input", {
        type: "text",
        placeholder: "Cerca...",
        defaultValue: research || "",
        name: "name",
        id: "name",
        onChange: function onChange(e) {
          return handleForm(e);
        }
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "filter-form-col-left",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
          children: "Ricerca per prezzo"
        })
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "filter-form-col-right",
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "filter-form-prices",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          type: "number",
          min: "0",
          max: topValue,
          defaultValue: priceRange.min,
          name: "priceMin",
          id: "priceMin",
          onChange: function onChange(e) {
            return handlePriceRange({
              min: Number(e.target.value),
              max: priceRange.max
            });
          },
          onInput: function onInput(e) {
            return handleForm(e);
          }
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          type: "number",
          min: priceRange.min,
          max: priceRange.max,
          defaultValue: priceRange.max,
          name: "priceMax",
          id: "priceMax",
          onChange: function onChange(e) {
            return handlePriceRange({
              min: priceRange.min,
              max: Number(e.target.value)
            });
          },
          onInput: function onInput(e) {
            return handleForm(e);
          }
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "filter-form-col-full",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)((js_default()), {
        maxValue: topValue,
        minValue: 0,
        value: priceRange.max < priceRange.min ? {
          min: priceRange.min,
          max: priceRange.min
        } : priceRange,
        formatLabel: function formatLabel(value) {
          return "".concat(value, " \u20AC");
        },
        onChange: function onChange(value) {
          return setPriceRange(value);
        },
        onChangeComplete: function onChangeComplete() {
          return handleRangeSlider();
        }
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "filter-form-col-left",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
          children: "Categorie"
        })
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "filter-form-col-right",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(SelectCat, {
        defaultValue: appliedFilters.categoryID,
        handleForm: handleForm,
        categories: categories
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "filter-form-col-left",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
          children: "Ordina per"
        })
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "filter-form-col-right",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(SelectOrder, {
        handleFormOrder: handleFormOrder
      })
    })]
  });
}

function SelectCat(_ref2) {
  var defaultValue = _ref2.defaultValue,
      handleForm = _ref2.handleForm,
      categories = _ref2.categories;
  // console.log("FilterForm Select: ", defaultValue);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("select", {
    name: "category",
    id: "category",
    value: defaultValue || "",
    onChange: function onChange(e) {
      return handleForm(e);
    },
    children: [categories && categories.map(function (category) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
        value: category.id,
        label: category.name
      }, category.id);
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
      value: "",
      label: "--Tutte"
    })]
  });
}

function SelectOrder(_ref3) {
  var handleFormOrder = _ref3.handleFormOrder;
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("select", {
    name: "order",
    id: "order",
    onChange: function onChange(e) {
      return handleFormOrder(e);
    },
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("option", {
      value: "new",
      children: "Novit\xE1"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
      value: "asc",
      children: "Ordine alfabetico A-Z"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
      value: "desc",
      children: "Ordine alfabetico Z-A"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
      value: "lowPrice",
      children: "Prezzo pi\xFA basso"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
      value: "highPrice",
      children: "Prezzo pi\xFA alto"
    })]
  });
} // prevent re render
// attivare altri filtri (uno alla volta!)
// testare App
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
var es = __webpack_require__(1372);
// EXTERNAL MODULE: ./src/client/redux/FilterStore/filterStore.actions.js
var filterStore_actions = __webpack_require__(7646);
// EXTERNAL MODULE: ./src/client/redux/LoadData/loadData.actions.js
var loadData_actions = __webpack_require__(3689);
;// CONCATENATED MODULE: ./src/client/components/Shop/Filter/HamburgerButton/HamburgerButton.js
 // import { toggleLayout } from "../../redux/ToggleLayout/toggleLayout.actions";
// import { useSelector, shallowEqual } from "react-redux";
// const selectLayouts = (state) => state.toggleLayout.layouts[1];


function HamburgerButton(_ref) {
  var navIsActive = _ref.navIsActive,
      toggleNav = _ref.toggleNav;
  // let state = useSelector(selectLayouts, shallowEqual);
  // let navIsActive = state.active;
  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    id: "hamBtn2",
    className: navIsActive ? "hamBtn2 active" : "hamBtn",
    onClick: toggleNav,
    children: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "stick2"
    })
  });
}
;// CONCATENATED MODULE: ./src/client/components/Shop/Filter/Filter.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Filter_slicedToArray(arr, i) { return Filter_arrayWithHoles(arr) || Filter_iterableToArrayLimit(arr, i) || Filter_unsupportedIterableToArray(arr, i) || Filter_nonIterableRest(); }

function Filter_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Filter_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Filter_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Filter_arrayLikeToArray(o, minLen); }

function Filter_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Filter_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Filter_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var getCategories = function getCategories(state) {
  return state.loadData.categories;
};

var getTopValue = function getTopValue(state) {
  return state.loadData.topValue;
};

var getFilteredItems = function getFilteredItems(state) {
  return state.filterStore.filteredItems;
};

var getAppliedFilters = function getAppliedFilters(state) {
  return state.filterStore.appliedFilters;
};

function Filter(_ref) {
  var research = _ref.research;

  //TOGGLE FILTER BAR
  var _useState = (0,react.useState)(false),
      _useState2 = Filter_slicedToArray(_useState, 2),
      filtersBar = _useState2[0],
      setFiltersBar = _useState2[1];

  var toggleBar = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setFiltersBar(!filtersBar);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function toggleBar() {
      return _ref2.apply(this, arguments);
    };
  }(); //REDUX


  var categories = (0,es/* useSelector */.v9)(getCategories, es/* shallowEqual */.wU);
  var topValue = (0,es/* useSelector */.v9)(getTopValue, es/* shallowEqual */.wU);
  var filteredItems = (0,es/* useSelector */.v9)(getFilteredItems, es/* shallowEqual */.wU);
  var appliedFilters = (0,es/* useSelector */.v9)(getAppliedFilters, es/* shallowEqual */.wU);
  var dispatch = (0,es/* useDispatch */.I0)();
  (0,react.useEffect)(function () {
    return categories && dispatch((0,loadData_actions/* fetchHighestValue */.Aj)());
  }, [categories]); //FILTERS STATE

  var _useState3 = (0,react.useState)({
    min: 0,
    max: Number(topValue) || 10
  }),
      _useState4 = Filter_slicedToArray(_useState3, 2),
      priceRange = _useState4[0],
      setPriceRange = _useState4[1]; //questo é il range, non il valore degli input (solo iniziale se mai)


  var _useState5 = (0,react.useState)({
    name: research || "",
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    category: "",
    categoryID: "",
    order: "new"
  }),
      _useState6 = Filter_slicedToArray(_useState5, 2),
      filters = _useState6[0],
      setFilters = _useState6[1]; //forse posso eliminare //non credo


  (0,react.useEffect)(function () {
    return setPriceRange({
      min: 0,
      max: Number(topValue)
    });
  }, [topValue]);
  (0,react.useEffect)(function () {
    console.log("🐲🐲🐲");
    setFilters(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), appliedFilters);
    });
  }, [appliedFilters]); ////////////////////////////////////////////HANDLE FORM

  var handleForm = function handleForm(e) {
    // console.log("handleForm activated 🏰🏰🛸");
    e.preventDefault();
    var form = e.target.form; // Price range

    setTimeout(function () {
      if (Number(form[1].value) >= Number(form[2].value)) {
        form[2].value = form[1].value;
      }

      setPriceRange({
        min: Number(form[1].value),
        max: Number(form[2].value)
      });
    }, 3000); // Categories ptI
    // console.log("🐢🐔✔: ", form[3].value);

    var selectedCat = categories.find(function (cat) {
      return cat.id === form[3].value;
    });
    !selectedCat ? selectedCat = {
      category: "",
      categoryID: ""
    } : selectedCat = {
      category: selectedCat.name,
      categoryID: selectedCat.id
    }; // New State

    var data = new FormData(form);
    var allValues = Object.fromEntries(data.entries()); //Categories ptII

    allValues.category = selectedCat.category;
    allValues.categoryID = selectedCat.categoryID; // console.log("handleForm activated", form[4].value);
    // questo value crea bug perché passa solo categoryID 🧨
    // preveniamo questo value da cambiare liberamente, questo input value va in conflitto con handleFormCategory // perché utilizzo ricerca category a due fattori

    setFilters(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), allValues);
    }); // console.log("Number(form[3].value", Number(form[3].value));

    console.log("handleForm activated", allValues);
  };

  var handleFormOrder = function handleFormOrder(e) {
    e.preventDefault();
    var value = e.target.value;
    setFilters(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        order: value
      });
    });
    console.log("handleFormOrder activated", value);
  };

  var handlePriceRange = function handlePriceRange(value) {
    return setPriceRange(value);
  };

  var handleRangeSlider = function handleRangeSlider() {
    // console.log("value in handlePriceRange: ", value);
    var minInput = document.querySelector("#priceMin");
    var maxInput = document.querySelector("#priceMax");
    minInput.value = priceRange.min;
    maxInput.value = priceRange.max;
    setFilters(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        priceMin: priceRange.min,
        priceMax: priceRange.max
      });
    });
  }; ////////////////////////////////////////////HANDLE FILTERS


  (0,react.useEffect)(function () {
    return handleFilters();
  }, [filters]);

  var handleFilters = function handleFilters() {
    if (filteredItems && filters) {
      // console.log("🐸🐸🐸handleFilters activated", filters);
      dispatch((0,filterStore_actions/* filterByValue */.s2)({
        value: filters.name.toLowerCase()
      }));
      dispatch((0,filterStore_actions/* filterByCategory */.Q6)({
        value: filters.category,
        valueID: filters.categoryID
      })); // 🧨 Bug; se cancello lettera con category selezionata scompaiono i risultati

      dispatch((0,filterStore_actions/* filterByPrice */.ID)({
        minPrice: filters.priceMin,
        maxPrice: filters.priceMax
      }));

      switch (filters.order) {
        case "new":
          {
            dispatch((0,filterStore_actions/* sortByNew */._M)({
              value: filters.order
            }));
            break;
          }

        case "asc":
          {
            dispatch((0,filterStore_actions/* sortByAlphabet */.jK)({
              value: filters.order
            }));
            break;
          }

        case "desc":
          {
            dispatch((0,filterStore_actions/* sortByAlphabet */.jK)({
              value: filters.order
            }));
            break;
          }

        case "lowPrice":
          {
            dispatch((0,filterStore_actions/* sortByPrice */.d$)({
              value: filters.order
            }));
            break;
          }

        case "highPrice":
          {
            dispatch((0,filterStore_actions/* sortByPrice */.d$)({
              value: filters.order
            }));
            break;
          }

        default:
          break;
      }
    } else {
      console.log("🐸🐸🐸handleFilters activated but no filters! 🤔", filters);
      return;
    }
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "filter-wrap ".concat(filtersBar ? "filter-wrap-active" : "filter-wrap-inactive"),
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "filter-wrap-header",
      onClick: toggleBar,
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h3", {
        children: "Filtra risultati"
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(HamburgerButton, {
        navIsActive: filtersBar,
        toggleNav: toggleBar
      })]
    }), topValue && /*#__PURE__*/(0,jsx_runtime.jsx)(FilterForm, {
      filters: filters,
      categories: categories,
      research: research,
      topValue: Number(topValue),
      priceRange: priceRange,
      setPriceRange: setPriceRange,
      handleForm: handleForm,
      handleFormOrder: handleFormOrder,
      handlePriceRange: handlePriceRange,
      handleRangeSlider: handleRangeSlider,
      filtersBar: filtersBar
    })]
  });
}

/***/ })

}]);
//# sourceMappingURL=678.bundle.js.map