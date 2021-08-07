"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[32],{

/***/ 8032:
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
      topValue = _ref.topValue;

  var _useState = (0,react.useState)(filters),
      _useState2 = _slicedToArray(_useState, 2),
      appliedFilters = _useState2[0],
      setAppliedFilters = _useState2[1];

  (0,react.useEffect)(function () {
    return setAppliedFilters(filters);
  }, [filters]);
  console.log("appliedFilters", appliedFilters);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("form", {
    className: "filter-form",
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
  console.log("FilterForm Select: ", defaultValue);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("select", {
    name: "category",
    id: "category",
    value: defaultValue || "",
    onChange: function onChange(e) {
      return handleForm(e);
    },
    children: [categories && categories.map(function (category) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
        value: category.animalID,
        label: category.animal
      }, category.animalID);
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
;// CONCATENATED MODULE: ./src/client/components/Shop/Filter/Filter.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function Filter() {
  var categories = (0,es/* useSelector */.v9)(getCategories, es/* shallowEqual */.wU);
  var topValue = (0,es/* useSelector */.v9)(getTopValue, es/* shallowEqual */.wU);
  var filteredItems = (0,es/* useSelector */.v9)(getFilteredItems, es/* shallowEqual */.wU);
  var appliedFilters = (0,es/* useSelector */.v9)(getAppliedFilters, es/* shallowEqual */.wU);
  var dispatch = (0,es/* useDispatch */.I0)();
  var research = ""; //forse posso eliminare

  var _useState = (0,react.useState)({
    min: 0,
    max: Number(topValue) || 10
  }),
      _useState2 = Filter_slicedToArray(_useState, 2),
      priceRange = _useState2[0],
      setPriceRange = _useState2[1];

  var _useState3 = (0,react.useState)({
    name: research || "",
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    category: "",
    categoryID: "",
    order: "new"
  }),
      _useState4 = Filter_slicedToArray(_useState3, 2),
      filters = _useState4[0],
      setFilters = _useState4[1]; //forse posso eliminare //non credo


  (0,react.useEffect)(function () {
    return setPriceRange({
      min: 0,
      max: Number(topValue)
    });
  }, [topValue]);
  (0,react.useEffect)(function () {
    return setFilters(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), appliedFilters);
    });
  }, [appliedFilters]); //////////////////////////////////////////

  var handleForm = function handleForm(e) {
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

    var selectedCat = categories.find(function (cat) {
      return cat.animalID === Number(form[3].value);
    });
    !selectedCat ? selectedCat = {
      category: "",
      categoryID: ""
    } : selectedCat = {
      category: selectedCat.animal,
      categoryID: selectedCat.animalID
    }; // New State

    var data = new FormData(form);
    var allValues = Object.fromEntries(data.entries()); //Categories ptII

    allValues.category = selectedCat.category;
    allValues.categoryID = selectedCat.categoryID; // console.log("handleForm activated", form[4].value);
    // questo value crea bug perché passa solo animalID 🧨
    // preveniamo questo value da cambiare liberamente, questo input value va in conflitto con handleFormCategory // perché utilizzo ricerca category a due fattori

    setFilters(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), allValues);
    }); // console.log("Number(form[3].value", Number(form[3].value));

    console.log("handleForm activated", allValues);
  }; //////////////////////////////////////////


  var handleFormOrder = function handleFormOrder(e) {
    e.preventDefault();
    var value = e.target.value;
    setFilters(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        order: value
      });
    });
    console.log("handleFormOrder activated", value);
  }; //////////////////////////////////////////


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
  }; //////////////////////////////////////////


  (0,react.useEffect)(function () {
    return handleFilters();
  }, [filters]);

  var handleFilters = function handleFilters() {
    console.log("🐸🐸🐸handleFilters activated", filters);

    if (filteredItems && filters) {
      console.log("filters in useEffect[filters]: ", filters);
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
      console.log("🐸🐸🐸handleOrder activated but no filters! :(");
    }
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "filter-wrap",
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h4", {
      children: "Filters:"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(FilterForm, {
      filters: filters,
      categories: categories,
      research: research,
      topValue: Number(topValue),
      priceRange: priceRange,
      setPriceRange: setPriceRange,
      handleForm: handleForm,
      handleFormOrder: handleFormOrder,
      handlePriceRange: handlePriceRange,
      handleRangeSlider: handleRangeSlider
    })]
  });
}

/***/ })

}]);
//# sourceMappingURL=32.bundle.js.map