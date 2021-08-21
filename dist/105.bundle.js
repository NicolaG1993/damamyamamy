(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[105],{

/***/ 902:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 1105:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Checkout)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js + 1 modules
var react_router = __webpack_require__(5977);
// EXTERNAL MODULE: ./src/client/lib/commerce.js
var commerce = __webpack_require__(5214);
// EXTERNAL MODULE: ./src/client/utils/validateForms.js
var validateForms = __webpack_require__(3998);
// EXTERNAL MODULE: ./src/client/components/Button/Button.js
var Button = __webpack_require__(902);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/client/components/Checkout/steps/AddressForm.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








function AddressForm(_ref) {
  var checkoutToken = _ref.checkoutToken,
      next = _ref.next;

  var _useState = (0,react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      shippingCountries = _useState2[0],
      setShippingCountries = _useState2[1];

  var _useState3 = (0,react.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      shippingCountry = _useState4[0],
      setShippingCountry = _useState4[1];

  var _useState5 = (0,react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      shippingSubdivisions = _useState6[0],
      setShippingSubdivisions = _useState6[1];

  var _useState7 = (0,react.useState)(""),
      _useState8 = _slicedToArray(_useState7, 2),
      shippingSubdivision = _useState8[0],
      setShippingSubdivision = _useState8[1];

  var _useState9 = (0,react.useState)([]),
      _useState10 = _slicedToArray(_useState9, 2),
      shippingOptions = _useState10[0],
      setShippingOptions = _useState10[1];

  var _useState11 = (0,react.useState)(""),
      _useState12 = _slicedToArray(_useState11, 2),
      shippingOption = _useState12[0],
      setShippingOption = _useState12[1]; // const methods = useForm();


  var _useState13 = (0,react.useState)({}),
      _useState14 = _slicedToArray(_useState13, 2),
      values = _useState14[0],
      setValues = _useState14[1];

  var _useState15 = (0,react.useState)({}),
      _useState16 = _slicedToArray(_useState15, 2),
      errors = _useState16[0],
      setErrors = _useState16[1];

  console.log("errors: ", errors);
  var countries = Object.entries(shippingCountries).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        code = _ref3[0],
        name = _ref3[1];

    return {
      id: code,
      label: name
    };
  }); // console.log("countries: ", countries);

  var subdivisions = Object.entries(shippingSubdivisions).map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        code = _ref5[0],
        name = _ref5[1];

    return {
      id: code,
      label: name
    };
  }); // console.log("subdivisions: ", subdivisions);

  var options = shippingOptions.map(function (sO) {
    return {
      id: sO.id,
      label: "".concat(sO.description, " - (").concat(sO.price.formatted_with_symbol, ")")
    };
  });
  console.log("options: ", options);

  var fetchShippingCountries = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(checkoutTokenId) {
      var _yield$commerce$servi, countries;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return commerce/* commerce.services.localeListShippingCountries */.B.services.localeListShippingCountries(checkoutTokenId);

            case 2:
              _yield$commerce$servi = _context.sent;
              countries = _yield$commerce$servi.countries;
              // console.log("fetched countries: ", countries);
              setShippingCountries(countries);
              setShippingCountry(Object.keys(countries)[0]); //questo mi serve perché ricevo un oggetto invece di array (da commerce), e voglio solo i keys "countries" al suo interno // [0] é per avere il primo di questi

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function fetchShippingCountries(_x) {
      return _ref6.apply(this, arguments);
    };
  }();

  var fetchSubdivisions = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(countryCode) {
      var _yield$commerce$servi2, subdivisions;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return commerce/* commerce.services.localeListSubdivisions */.B.services.localeListSubdivisions(countryCode);

            case 2:
              _yield$commerce$servi2 = _context2.sent;
              subdivisions = _yield$commerce$servi2.subdivisions;
              // console.log("fetched subdivisions: ", subdivisions);
              setShippingSubdivisions(subdivisions);
              setShippingSubdivision(Object.keys(subdivisions)[0]);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function fetchSubdivisions(_x2) {
      return _ref7.apply(this, arguments);
    };
  }();

  var fetchShippingOptions = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(checkoutTokenId, country) {
      var region,
          options,
          _args3 = arguments;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              region = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;
              _context3.next = 3;
              return commerce/* commerce.checkout.getShippingOptions */.B.checkout.getShippingOptions(checkoutTokenId, {
                country: country,
                region: region
              });

            case 3:
              options = _context3.sent;
              // console.log("fetched options: ", options);
              setShippingOptions(options);
              setShippingOption(options[0].id);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function fetchShippingOptions(_x3, _x4) {
      return _ref8.apply(this, arguments);
    };
  }(); //region = null se non cé né una // io ho una sola option al momento ma puo essere utile se si vogliono aggiungere in futuro -> good practice


  (0,react.useEffect)(function () {
    fetchShippingCountries(checkoutToken.id);
  }, []); //useEffect é come componentDidMount, viene eseguito solo al caricamento del component // perché [] alla fine

  (0,react.useEffect)(function () {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]); //useEffect viene eseguito solo se cambia shippingCountry // perché [shippingCountry] alla fine // if exists

  (0,react.useEffect)(function () {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  var handleForm = function handleForm(e) {
    e.preventDefault();
    var form = e.target.form;
    var data = new FormData(form);
    var allValues = Object.fromEntries(data.entries()); // console.log("form data: ", allValues);

    setValues(allValues); // for (let name of data.keys()) {
    //     console.log("form name: ", name);
    // }
    // for (let value of data.values()) {
    //     console.log("form value: ", value);
    // }
  };

  (0,react.useEffect)(function () {
    if (values) {
      console.log("values in useEffect: ", values);
    }
  }, [values]);

  var handleBlur = function handleBlur(e) {
    var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value; //creo nuovo oggetto per rimuovere errore precedente

    var newErrObj = _objectSpread({}, errors); //validate


    if (name === "firstName") {
      var resp = (0,validateForms.nameValidation)("nome", value);

      if (resp) {
        setErrors(_objectSpread(_objectSpread({}, errors), {}, _defineProperty({}, name, resp)));
      } else {
        delete newErrObj[name];
        setErrors(newErrObj);
      }
    }

    if (name === "lastName") {
      var _resp = (0,validateForms.nameValidation)("cognome", value);

      if (_resp) {
        setErrors(_objectSpread(_objectSpread({}, errors), {}, _defineProperty({}, name, _resp)));
      } else {
        delete newErrObj[name];
        setErrors(newErrObj);
      }
    }

    if (name === "email") {
      var _resp2 = (0,validateForms.emailValidation)(value);

      if (_resp2) {
        setErrors(_objectSpread(_objectSpread({}, errors), {}, _defineProperty({}, name, _resp2)));
      } else {
        delete newErrObj[name];
        setErrors(newErrObj);
      }
    }

    if (name === "address1" || name === "city") {
      var _resp3 = (0,validateForms.requestedValue)(value);

      if (_resp3) {
        setErrors(_objectSpread(_objectSpread({}, errors), {}, _defineProperty({}, name, _resp3)));
      } else {
        delete newErrObj[name];
        setErrors(newErrObj);
      }
    }

    if (name === "zip") {
      var _resp4 = (0,validateForms.numberValidation)("CAP", value);

      if (_resp4) {
        setErrors(_objectSpread(_objectSpread({}, errors), {}, _defineProperty({}, name, _resp4)));
      } else {
        delete newErrObj[name];
        setErrors(newErrObj);
      }
    }
  };

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      next(values);
    } else {
      console.log("INVALID INPUTS");
      return;
    }
  };

  if (shippingOptions.length < 1) return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "loader loader-inverted"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("p", {
      children: "in attesa di commerce.js"
    })]
  });
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "checkout-form-box",
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h3", {
      className: "",
      children: "I vostri dati"
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("form", {
      onChange: function onChange(e) {
        return handleForm(e);
      },
      onSubmit: function onSubmit(e) {
        return handleSubmit(e);
      },
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-left",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          children: "Nome *"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "form-col-right",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          required: true,
          type: "text",
          name: "firstName",
          id: "firstName",
          onBlur: function onBlur(e) {
            return handleBlur(e);
          }
        }), errors.firstName && /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: "form-error",
          children: errors.firstName
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-left",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          children: "Cognome *"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "form-col-right",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          required: true,
          type: "text",
          name: "lastName",
          id: "lastName",
          onBlur: function onBlur(e) {
            return handleBlur(e);
          }
        }), errors.lastName && /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: "form-error",
          children: errors.lastName
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-left",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          children: "Indirizzo *"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "form-col-right",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          required: true,
          type: "text",
          name: "address1",
          id: "address1",
          onBlur: function onBlur(e) {
            return handleBlur(e);
          }
        }), errors.address1 && /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: "form-error",
          children: errors.address1
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-left",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          children: "Email *"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "form-col-right",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          required: true,
          type: "text",
          name: "email",
          id: "email",
          onBlur: function onBlur(e) {
            return handleBlur(e);
          }
        }), errors.email && /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: "form-error",
          children: errors.email
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-left",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          children: "Citt\xE0 *"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "form-col-right",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          required: true,
          type: "text",
          name: "city",
          id: "city",
          onBlur: function onBlur(e) {
            return handleBlur(e);
          }
        }), errors.city && /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: "form-error",
          children: errors.city
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-left",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          children: "CAP *"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "form-col-right",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          required: true,
          type: "text",
          name: "zip",
          id: "zip",
          onBlur: function onBlur(e) {
            return handleBlur(e);
          }
        }), errors.zip && /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: "form-error",
          children: errors.zip
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-left",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          children: "Stato"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-right",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("select", {
          required: true,
          name: "country",
          id: "country",
          value: shippingCountry,
          onChange: function onChange(e) {
            return setShippingCountry(e.target.value);
          },
          children: countries.map(function (country) {
            return /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
              value: country.id,
              children: country.label
            }, country.id);
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-left",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          children: "Provincia"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-right",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("select", {
          required: true,
          name: "region",
          id: "region",
          value: shippingSubdivision,
          onChange: function onChange(e) {
            return setShippingSubdivision(e.target.value);
          },
          children: subdivisions.map(function (subdivision) {
            return /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
              value: subdivision.id,
              children: subdivision.label
            }, subdivision.id);
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-left",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          children: "Metodo di spedizione"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "form-col-right",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("select", {
          required: true,
          name: "shipping",
          id: "shipping",
          value: shippingOption,
          onChange: function onChange(e) {
            return setShippingOption(e.target.value);
          },
          children: options.map(function (option) {
            return /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
              value: option.id,
              children: option.label
            }, option.id);
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
          page: "/cart",
          text: "Torna al carrello",
          type: "internal",
          style: "inverted-btn"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
          text: "Prosegui",
          type: "submit",
          style: "inverted-btn"
        })]
      })]
    })]
  });
}
/*

guardare quali props di input sono reali invece di CustomTextField (ex. "required"?)

*/
// EXTERNAL MODULE: ./node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js
var react_stripe_umd = __webpack_require__(6664);
// EXTERNAL MODULE: ./node_modules/@stripe/stripe-js/dist/stripe.esm.js
var stripe_esm = __webpack_require__(4465);
;// CONCATENATED MODULE: ./src/client/components/Checkout/steps/Review.js



function Review(_ref) {
  var checkoutToken = _ref.checkoutToken;
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h5", {
      children: "Il vostro ordine:"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      children: checkoutToken.live.line_items.map(function (product) {
        return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "review-row",
          children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: "review-product-infos",
            children: [/*#__PURE__*/(0,jsx_runtime.jsx)("p", {
              children: product.name
            }), /*#__PURE__*/(0,jsx_runtime.jsxs)("p", {
              children: ["Quantit\xE0: ", product.quantity]
            })]
          }), /*#__PURE__*/(0,jsx_runtime.jsx)("p", {
            className: "review-product-price",
            children: product.line_total.formatted_with_symbol
          })]
        }, product.name);
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("p", {
        className: "review-final-price",
        children: ["Totale: ", checkoutToken.live.subtotal.formatted_with_symbol]
      })
    })]
  });
}
;// CONCATENATED MODULE: ./src/client/components/Checkout/steps/PaymentForm.js
function PaymentForm_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function PaymentForm_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { PaymentForm_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { PaymentForm_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function PaymentForm_slicedToArray(arr, i) { return PaymentForm_arrayWithHoles(arr) || PaymentForm_iterableToArrayLimit(arr, i) || PaymentForm_unsupportedIterableToArray(arr, i) || PaymentForm_nonIterableRest(); }

function PaymentForm_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function PaymentForm_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return PaymentForm_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return PaymentForm_arrayLikeToArray(o, minLen); }

function PaymentForm_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function PaymentForm_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function PaymentForm_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



 // import { envs } from "../../../../config";
// import ReactDOM from "react-dom";





var stripePromise = (0,stripe_esm/* loadStripe */.J)("pk_test_51IeyVQDhvZh2Tfco8sQW90qdWGh1gHcrFppkEoGKQ74ISWujDTy2C86oixsRf396tt1DCmz0VOViPUv4eNg2TvCF00f8Cgjd7p"); // const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PaymentForm(_ref) {
  var checkoutToken = _ref.checkoutToken,
      shippingData = _ref.shippingData,
      nextStep = _ref.nextStep,
      backStep = _ref.backStep,
      onCaptureCheckout = _ref.onCaptureCheckout,
      timeout = _ref.timeout;
  console.log("shippingData: ", shippingData);
  console.log("paypal: ", window.paypal);

  var _useState = (0,react.useState)("cc"),
      _useState2 = PaymentForm_slicedToArray(_useState, 2),
      method = _useState2[0],
      setMethod = _useState2[1];

  var _useState3 = (0,react.useState)(false),
      _useState4 = PaymentForm_slicedToArray(_useState3, 2),
      termsAccepted = _useState4[0],
      setTermsAccepted = _useState4[1];

  var _useState5 = (0,react.useState)(null),
      _useState6 = PaymentForm_slicedToArray(_useState5, 2),
      paypalError = _useState6[0],
      setPaypalError = _useState6[1];

  var paypalRef = (0,react.useRef)(null);
  (0,react.useEffect)(function () {
    // check if PayPal JS SDK is already loaded
    if (window.paypal) {
      renderButtons();
    } else {
      var ppValues = {
        currency: "EUR",
        disablefunding: "card,giropay,sepa,sofort",
        locale: "it_IT"
      };
      insertScriptElement({
        url: "https://www.paypal.com/sdk/js?client-id=".concat("AZVz756sSn0AylZvDKjKGJnhJMGIw3JLV5crP_6igMFZhIOH00ReyNl4bo8GSKT7P0NkK5GEZUgULuin", "&currency=").concat(ppValues.currency, "&disable-funding=").concat(ppValues.disablefunding, "&locale=").concat(ppValues.locale),
        callback: function callback() {
          renderButtons();
        }
      });
    }
  }, []);
  (0,react.useEffect)(function () {
    renderButtons();
  }, [method]);

  var renderButtons = function renderButtons() {
    //codice necessario perché il div di useRef viene renderizzato if (method == pp)
    if (method === "cc") {
      return;
    }

    if (method === "pp") {
      window.paypal.Buttons({
        style: {
          color: "blue",
          shape: "pill",
          label: "paypal",
          tagline: false
        },
        createOrder: function createOrder(data, actions) {
          return actions.order.create({
            purchase_units: [{
              description: "Your Order!",
              amount: {
                currency_code: "EUR",
                value: checkoutToken.live.subtotal.raw
              }
            }] //questa array verra mappata, devo mettere ogni elemento al suo interno 🐔

          });
        },
        onApprove: function () {
          var _onApprove = PaymentForm_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, actions) {
            var order, orderData;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return actions.order.capture();

                  case 2:
                    order = _context.sent;
                    // devo vedere questo order e in caso modificarlo come orderData
                    orderData = {
                      line_items: checkoutToken.live.line_items,
                      customer: {
                        firstname: shippingData.firstName,
                        lastname: shippingData.lastName,
                        email: shippingData.email
                      },
                      shipping: {
                        name: "Domestico",
                        street: shippingData.address1,
                        town_city: shippingData.city,
                        county_state: shippingData.region,
                        postal_zip_code: shippingData.zip,
                        country: shippingData.country
                      },
                      fulfillment: {
                        shipping_method: shippingData.shipping
                      },
                      payment: {
                        gateway: "paypal",
                        paypal: {
                          action: "capture",
                          payment_id: order.id,
                          payer_id: order.payer.payer_id
                        }
                      }
                    }; //devo vedere se action:capture é corretto

                    console.log("order", order);
                    console.log("orderData", orderData);
                    console.log("checkoutToken", checkoutToken);
                    onCaptureCheckout(checkoutToken.id, orderData);
                    nextStep();

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function onApprove(_x, _x2) {
            return _onApprove.apply(this, arguments);
          }

          return onApprove;
        }(),
        onError: function onError(err) {
          setPaypalError(err);
          console.error(err);
        }
      }).render(paypalRef.current);
    }
  };

  var handleSelection = function handleSelection(e) {
    console.log("e: ", e);
    console.log("e.target.value: ", e.target.value);
    setMethod(e.target.value);
  };

  var acceptTerms = function acceptTerms(e) {
    // e.preventDefault();
    e.persist();
    var checked = e.target.checked;
    checked ? setTermsAccepted(true) : setTermsAccepted(false);
  };

  var TermsBox = function TermsBox() {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "check-terms",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
        type: "checkbox",
        name: "accept",
        onChange: function onChange(e) {
          return acceptTerms(e);
        },
        checked: termsAccepted
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("label", {
        htmlFor: "accept",
        children: ["Dichiaro di aver letto", " ", /*#__PURE__*/(0,jsx_runtime.jsx)("a", {
          href: "/terms-conditions",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "Termini e Condizioni"
        })]
      })]
    });
  };

  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = PaymentForm_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e, elements, stripe) {
      var cardElement, _yield$stripe$createP, error, paymentMethod, orderData;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              e.preventDefault();

              if (!(!stripe || !elements)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              if (termsAccepted) {
                _context2.next = 6;
                break;
              }

              alert("Accettare termini e condizioni prima di proseguire");
              return _context2.abrupt("return");

            case 6:
              //forse va nello step precedente? 🐔
              cardElement = elements.getElement(react_stripe_umd.CardElement);
              _context2.next = 9;
              return stripe.createPaymentMethod({
                type: "card",
                card: cardElement
              });

            case 9:
              _yield$stripe$createP = _context2.sent;
              error = _yield$stripe$createP.error;
              paymentMethod = _yield$stripe$createP.paymentMethod;

              if (error) {
                console.log("[error]", error); // devo provare a fare un mockup dell'errore 🐔
              } else {
                orderData = {
                  line_items: checkoutToken.live.line_items,
                  customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email
                  },
                  shipping: {
                    name: "Domestico",
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.region,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.country
                  },
                  fulfillment: {
                    shipping_method: shippingData.shipping
                  },
                  payment: {
                    gateway: "stripe",
                    stripe: {
                      payment_method_id: paymentMethod.id
                    }
                  }
                }; // console.log("paymentMethod: ", paymentMethod);
                // console.log("orderData: ", orderData);

                onCaptureCheckout(checkoutToken.id, orderData);
                nextStep();
              }

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleSubmit(_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleFakeSubmit = /*#__PURE__*/function () {
    var _ref3 = PaymentForm_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              onCaptureCheckout("test", {}); //this is for App, to empty the cart

              timeout(); //this come as a prop from Checkout

              nextStep();

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function handleFakeSubmit() {
      return _ref3.apply(this, arguments);
    };
  }(); //this is only for test
  // useEffect(() => {
  //     // Load PayPal Script at the end of our DOM
  //     const script = document.createElement("script");
  //     script.src =
  //         "https://www.paypal.com/sdk/js?client-id=AZVz756sSn0AylZvDKjKGJnhJMGIw3JLV5crP_6igMFZhIOH00ReyNl4bo8GSKT7P0NkK5GEZUgULuin";
  //     script.addEventListener("load", () => setLoaded(true));
  //     document.main.appendChild(script);
  //     if (loaded) {
  //     }
  // });


  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "checkout-form-box",
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h3", {
      className: "",
      children: "Pagamento"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(Review, {
      checkoutToken: checkoutToken
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("h5", {
      children: "Metodi di pagamento:"
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("select", {
      className: "payment-mode",
      onChange: handleSelection,
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("option", {
        value: "cc",
        children: "Carta di credito"
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
        value: "pp",
        children: "Paypal"
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("option", {
        value: "test",
        children: "Test"
      })]
    }), method === "cc" && /*#__PURE__*/(0,jsx_runtime.jsx)(react_stripe_umd.Elements, {
      stripe: stripePromise,
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(react_stripe_umd.ElementsConsumer, {
        children: function children(_ref4) {
          var elements = _ref4.elements,
              stripe = _ref4.stripe;
          return /*#__PURE__*/(0,jsx_runtime.jsxs)("form", {
            onSubmit: function onSubmit(e) {
              return handleSubmit(e, elements, stripe);
            },
            children: [/*#__PURE__*/(0,jsx_runtime.jsx)(react_stripe_umd.CardElement, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(TermsBox, {}), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
              className: "row2",
              children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
                fn: backStep,
                text: "Torna indietro",
                type: "function",
                style: "inverted-btn"
              }), /*#__PURE__*/(0,jsx_runtime.jsxs)("button", {
                className: "btn inverted-btn",
                type: "submit",
                disabled: !stripe,
                children: ["Conferma", " " + checkoutToken.live.subtotal.formatted_with_symbol]
              })]
            })]
          });
        }
      })
    }), method === "pp" && /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "paypal-comp",
      children: [paypalError && /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        children: ["Uh oh, an error occurred! ", paypalError.message]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(TermsBox, {}), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "checkout-paypal-btn",
        ref: paypalRef
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
        fn: backStep,
        text: "Torna indietro",
        type: "function",
        style: "inverted-btn"
      })]
    }), method === "test" && /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
        fn: backStep,
        text: "Torna indietro",
        type: "function",
        style: "inverted-btn"
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
        fn: handleFakeSubmit,
        text: "Conferma ".concat(checkoutToken.live.subtotal.formatted_with_symbol),
        type: "function",
        style: "inverted-btn"
      })]
    })]
  });
}

function insertScriptElement(_ref5) {
  var url = _ref5.url,
      _ref5$attributes = _ref5.attributes,
      attributes = _ref5$attributes === void 0 ? {} : _ref5$attributes,
      _ref5$properties = _ref5.properties,
      properties = _ref5$properties === void 0 ? {} : _ref5$properties,
      callback = _ref5.callback;
  var newScript = document.createElement("script");

  newScript.onerror = function (err) {
    return console.error("An error occured while loading the PayPal JS SDK", err);
  };

  if (callback) newScript.onload = callback;
  Object.keys(attributes).forEach(function (key) {
    newScript.setAttribute(key, attributes[key]);
  });
  document.body.appendChild(newScript);
  newScript.src = url;
}
/*

CODICI PER TEST VERSION 🤖

- aggiungere nuova opzione "test" per method
- attivare timeout() (anche in Chekout.js)
- attivare isfinished in Chekout.js
- attivare handleFakeSubmit per fingere il pagamento
- aggiungere allerts su checkout, per chiarire che non funziona veramente in test mode
- aggiungere "test" condition in App in handleCaptureCheckout
- modificare le varie keys da live a sandbox/test (script url for paypal + dati per checkout stripe gateway)

PER TESTARE PAGAMENTO 
gateway: 'test_gateway',
    card: {
      number: '4242 4242 4242 4242',
      expiry_month: '01',
      expiry_year: '2023',
      cvc: '123',
      postal_zip_code: '94103',
    },

    
    
*/
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 18 modules
var es = __webpack_require__(1372);
// EXTERNAL MODULE: ./src/client/redux/LoadCart/loadCart.actions.js
var loadCart_actions = __webpack_require__(136);
// EXTERNAL MODULE: ./src/client/redux/Checkout/checkout.types.js
var checkout_types = __webpack_require__(3127);
;// CONCATENATED MODULE: ./src/client/redux/Checkout/checkout.actions.js
function checkout_actions_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function checkout_actions_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { checkout_actions_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { checkout_actions_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



function loadCheckout() {
  return {
    type: checkout_types/* LOAD_CHECKOUT */._r
  };
}
function captureCheckout(payload) {
  return function (dispatch) {
    return getSomeAsyncData(dispatch, commerce/* commerce.checkout.capture */.B.checkout.capture(payload.checkoutTokenId, payload.newOrder), checkout_types/* CAPTURE_CHECKOUT */.Nx);
  };
}

function getSomeAsyncData(_x, _x2, _x3) {
  return _getSomeAsyncData.apply(this, arguments);
}

function _getSomeAsyncData() {
  _getSomeAsyncData = checkout_actions_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, url, type) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("\uD83D\uDC6E\u200D\u2640\uFE0F\uD83D\uDC6E\u200D\u2642\uFE0F\uD83D\uDC6E\u200D\u2640\uFE0F: ", type);
            _context.prev = 1;
            _context.next = 4;
            return url;

          case 4:
            data = _context.sent;
            console.log("\uD83D\uDE0E\uD83D\uDE0B\uD83D\uDE0Bdata in ".concat(type, ": "), data);
            dispatch({
              type: type,
              payload: data
            });
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log("err in ".concat(type, " action: "), _context.t0);
            dispatch({
              type: checkout_types/* HANDLE_ERROR */.yA,
              payload: {
                actionType: type,
                error: _context.t0
              }
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _getSomeAsyncData.apply(this, arguments);
}
;// CONCATENATED MODULE: ./src/client/components/Checkout/Checkout.js
function Checkout_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function Checkout_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Checkout_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Checkout_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Checkout_slicedToArray(arr, i) { return Checkout_arrayWithHoles(arr) || Checkout_iterableToArrayLimit(arr, i) || Checkout_unsupportedIterableToArray(arr, i) || Checkout_nonIterableRest(); }

function Checkout_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Checkout_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Checkout_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Checkout_arrayLikeToArray(o, minLen); }

function Checkout_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Checkout_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Checkout_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







 // REDUX







var selectCart = function selectCart(state) {
  return state.loadCart.cart;
};

var selectOrder = function selectOrder(state) {
  return state.checkout.order;
};

var selectError = function selectError(state) {
  return state.checkout.error;
};

var steps = ["Shipping address", "Payment details"];
function Checkout() {
  //STATE
  var cart = (0,es/* useSelector */.v9)(selectCart, es/* shallowEqual */.wU);
  var order = (0,es/* useSelector */.v9)(selectOrder, es/* shallowEqual */.wU);
  var error = (0,es/* useSelector */.v9)(selectError, es/* shallowEqual */.wU);
  console.log("cart in Checkout.js: ", cart);

  var _useState = (0,react.useState)(0),
      _useState2 = Checkout_slicedToArray(_useState, 2),
      activeStep = _useState2[0],
      setActiveStep = _useState2[1];

  var _useState3 = (0,react.useState)(null),
      _useState4 = Checkout_slicedToArray(_useState3, 2),
      checkoutToken = _useState4[0],
      setCheckoutToken = _useState4[1];

  var _useState5 = (0,react.useState)({}),
      _useState6 = Checkout_slicedToArray(_useState5, 2),
      shippingData = _useState6[0],
      setShippingData = _useState6[1];

  var history = (0,react_router/* useHistory */.k6)();

  var _useState7 = (0,react.useState)(false),
      _useState8 = Checkout_slicedToArray(_useState7, 2),
      isFinished = _useState8[0],
      setIsFinished = _useState8[1]; //this is only for test


  (0,react.useEffect)(function () {
    return dispatch(loadCheckout());
  }, []); //STEPS FUNCTIONS

  var nextStep = function nextStep() {
    setActiveStep(function (prevActiveStep) {
      return prevActiveStep + 1;
    });
  };

  var backStep = function backStep() {
    setActiveStep(function (prevActiveStep) {
      return prevActiveStep - 1;
    });
  }; // !!in react, if u want to use the previous state, u need to call it as a callback fn


  var next = function next(data) {
    setShippingData(data);
    nextStep(); // console.log("shippingData: ", shippingData);
  };

  var dispatch = (0,es/* useDispatch */.I0)();

  var handleCaptureCheckout = /*#__PURE__*/function () {
    var _ref = Checkout_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(checkoutTokenId, newOrder) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("handleCaptureCheckout activated! 🥶🧨🎅");

              if (checkoutTokenId === "test") {
                //this is only for test
                dispatch((0,loadCart_actions/* emptyCart */.UY)());
              } else {
                dispatch(captureCheckout({
                  checkoutTokenId: checkoutTokenId,
                  newOrder: newOrder
                }));
              }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleCaptureCheckout(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(); //quando abbiamo un ordine allora facciamo il refresh


  (0,react.useEffect)(function () {
    return order && dispatch((0,loadCart_actions/* refreshCart */.qN)());
  }, [order]);
  (0,react.useEffect)(function () {
    var generateToken = /*#__PURE__*/function () {
      var _ref2 = Checkout_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return commerce/* commerce.checkout.generateTokenFrom */.B.checkout.generateTokenFrom("cart", cart.id);

              case 3:
                token = _context2.sent;
                console.log("token: ", token);
                setCheckoutToken(token);
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                if (activeStep !== steps.length) history.push("/"); // this fix the bug: if refresh page in checkout the cart will be empty
                // console.log("error: ", err);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      return function generateToken() {
        return _ref2.apply(this, arguments);
      };
    }();

    activeStep === 0 && generateToken();
  }, [cart]); // timeout -> mock up the transaction without using card details on stripe

  var timeout = function timeout() {
    console.log("timeout activated!");
    setTimeout(function () {
      setIsFinished(true);
    }, 3000);
  };

  var ProgressBar = function ProgressBar() {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("ul", {
      className: "progressbar",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("li", {
        className: "active",
        children: "Indirizzo"
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("li", {
        className: "".concat(activeStep > 0 ? "active" : ""),
        children: "Metodo di pagamento"
      })]
    });
  };

  var Form = function Form() {
    return activeStep === 0 ? /*#__PURE__*/(0,jsx_runtime.jsx)(AddressForm, {
      checkoutToken: checkoutToken,
      next: next
    }) : /*#__PURE__*/(0,jsx_runtime.jsx)(PaymentForm, {
      checkoutToken: checkoutToken,
      shippingData: shippingData // activeStep={activeStep}
      ,
      nextStep: nextStep,
      backStep: backStep,
      onCaptureCheckout: handleCaptureCheckout,
      timeout: timeout
    });
  };

  var Confirmation = function Confirmation() {
    return order ? /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "confirmation-wrap",
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("h3", {
          children: ["Grazie per il tuo acquisto ", order.customer.firstname, " ", order.customer.lastname, "!"]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("p", {
          children: ["Ordine: ", order.customer_reference]
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
        page: "/cart",
        text: "Torna al carrello",
        type: "internal",
        style: "inverted-btn"
      })]
    }) : isFinished ? /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "confirmation-wrap",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("h3", {
          children: ["Grazie per il tuo acquisto! ", shippingData.firstName, " ", shippingData.lastName, "!"]
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("br", {}), /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
        page: "/",
        text: "Torna al sito",
        type: "internal",
        style: "inverted-btn"
      })]
    }) : /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "loader-inverted"
    });
  }; //  (after testing) remove the "isFinished" condition and leave only the spinner


  if (error) {
    Confirmation = function Confirmation() {
      return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "confirmation-wrap",
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h3", {
            children: "Errore:"
          }), /*#__PURE__*/(0,jsx_runtime.jsx)("p", {
            children: error.err.data.error.message
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
          page: "/cart",
          text: "Torna al carrello",
          type: "internal"
        })]
      });
    };
  }

  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    id: "Checkout",
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "checkout-wrap",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "checkout-title",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("h1", {
          children: "Checkout"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "progressbar-wrap",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(ProgressBar, {})
      }), activeStep === steps.length ? /*#__PURE__*/(0,jsx_runtime.jsx)(Confirmation, {}) : checkoutToken ? /*#__PURE__*/(0,jsx_runtime.jsx)(Form, {}) : /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "loader-inverted"
      })]
    })
  });
}

/***/ }),

/***/ 3998:
/***/ ((module) => {

var nameValidation = function nameValidation(fieldName, fieldValue) {
  if (fieldValue.trim() === "") {
    return "Il ".concat(fieldName, " \xE8 richiesto");
  }

  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Caratteri non consentiti";
  }

  if (fieldValue.trim().length < 3) {
    return "Il ".concat(fieldName, " deve contenere almeno 3 lettere");
  }

  return null;
};

var emailValidation = function emailValidation(email) {
  if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return null;
  }

  if (email.trim() === "") {
    return "È richiesta un'email";
  }

  return "Perfavore inserisci un'email valida";
};

var requestedValue = function requestedValue(fieldValue) {
  if (fieldValue.trim() === "") {
    return "Devi inserire qualcosa";
  }

  return null;
};

var textValidation = function textValidation(fieldValue) {
  if (fieldValue.trim() === "") {
    return "Devi scriverci qualcosa";
  }

  return null;
};

var numberValidation = function numberValidation(fieldName, fieldValue) {
  if (fieldValue.trim() === "") {
    return "Il ".concat(fieldName, " \xE8 richiesto");
  }

  if (/^\d+$/.test(fieldValue)) {
    return null;
  }

  return "".concat(fieldName, " deve essere un numero");
}; // const ageValidation = (age) => {
//     if (!age) {
//         return "Age is required";
//     }
//     if (age < 18) {
//         return "Age must be at least 18";
//     }
//     if (age > 99) {
//         return "Age must be under 99";
//     }
//     return null;
// };
// const validate = {
//     firstName: (name) => nameValidation("First Name", name),
//     lastName: (name) => nameValidation("Last Name", name),
//     email: emailValidation,
//     age: ageValidation,
// };


module.exports = {
  nameValidation: nameValidation,
  emailValidation: emailValidation,
  requestedValue: requestedValue,
  textValidation: textValidation,
  numberValidation: numberValidation
};
/*

1- prendere tutti i valori di form
2- prima di avviare submit il check deve gia essere fatto
3- in caso di errore gli allert vengono mostrati e nessuna richiesta o reload vengono eseguiti, il form resta invariato

2.1- l'oggetto viene inviato in una funzione che gestisce i vari elementi
2.2- ogni valore viene mandato alla validation adeguata (es. nome, number, email) 
2.3- ognuna di queste validation torna il valore, se corretto, oppure un errore + message
2.4- la funzione principale riceve i vari risultati e ricostruisce l'oggetto con i valori (forse non serve visto che vanno giá bene i valori del form stesso)
2.5- costruisce un secondo oggetto con gli errori, se presenti
2.6- in questo caso ritorna al component del form due cose: error = true & errorsObj
2.7- il form se non riceve error = true fa andare next(values), altrimenti no: mostra gli errori ai rispettivi input fields

2.1b.1- potrei evitare la funzione che gestisce l'oggetto, spedendo ogni input alla funzione corrispondente dal component, ricevendo per ognuna l'ok o l'errore
2.1b.2- poi nel component faccio un check degli errori prima di mavviare il submit

*/

/***/ })

}]);
//# sourceMappingURL=105.bundle.js.map