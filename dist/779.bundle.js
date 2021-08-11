(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[779],{

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
      fn = _ref.fn;

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
    className: "btn ".concat(status),
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
      className: "btn ".concat(status),
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
      className: "btn ".concat(status),
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      children: text
    })
  });
  if (type === "submit") return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
    type: "submit",
    className: "btn ".concat(status),
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onClick: function onClick() {
      return handleFunction();
    },
    children: text
  });
}

/***/ }),

/***/ 6779:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Contact)
});

// EXTERNAL MODULE: ./node_modules/@loadable/component/dist/loadable.esm.js + 1 modules
var loadable_esm = __webpack_require__(7617);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./src/client/utils/useScrollPosition.js
var useScrollPosition = __webpack_require__(960);
// EXTERNAL MODULE: ./src/client/utils/validateForms.js
var validateForms = __webpack_require__(3998);
// EXTERNAL MODULE: ./src/client/components/Button/Button.js
var Button = __webpack_require__(902);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/client/components/Contact/ContactForm/steps/StepA.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







function StepA(_ref) {
  var next = _ref.next,
      contactReq = _ref.contactReq;

  var _useState = (0,react.useState)(contactReq || {}),
      _useState2 = _slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  var _useState3 = (0,react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      errors = _useState4[0],
      setErrors = _useState4[1]; // console.log("values: ", values);


  var handleForm = function handleForm(e) {
    e.preventDefault();
    var form = e.target.form;
    var data = new FormData(form);
    var allValues = Object.fromEntries(data.entries());
    setValues(allValues);
  };

  var validate = function validate(e) {
    e.preventDefault();

    if (Object.keys(values).length === 0) {
      console.log("NO INPUTS");
      return;
    }

    var newErrObj = {
      fnameCheck: (0,validateForms.nameValidation)("nome", values.contactname),
      lnameCheck: (0,validateForms.nameValidation)("cognome", values.contactlast),
      emailCheck: (0,validateForms.emailValidation)(values.email),
      textCheck: (0,validateForms.textValidation)(values.message)
    };

    if (!newErrObj.fnameCheck) {
      delete newErrObj.fnameCheck;
    }

    if (!newErrObj.lnameCheck) {
      delete newErrObj.lnameCheck;
    }

    if (!newErrObj.emailCheck) {
      delete newErrObj.emailCheck;
    }

    if (!newErrObj.textCheck) {
      delete newErrObj.textCheck;
    }

    if (Object.keys(newErrObj).length === 0) {
      console.log("VALID INPUTS! OK");
      next(values);
    } else {
      console.log("INVALID INPUTS");
      setErrors(newErrObj);
      return;
    }
  };

  var ErrorsBox = function ErrorsBox() {
    return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "contact-form-error-wrap",
      children: Object.values(errors).map(function (error, i) {
        console.log("error ", error);
        return /*#__PURE__*/(0,jsx_runtime.jsxs)("p", {
          children: ["\u2022 ", error]
        }, i);
      })
    });
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [Object.keys(errors).length !== 0 && /*#__PURE__*/(0,jsx_runtime.jsx)(ErrorsBox, {}), /*#__PURE__*/(0,jsx_runtime.jsxs)("form", {
      className: "contact-form",
      onLoad: function onLoad(e) {
        return handleForm(e);
      },
      onInput: function onInput(e) {
        return handleForm(e);
      },
      onSubmit: function onSubmit(e) {
        return validate(e);
      },
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "contact-form-col-left",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          type: "text",
          placeholder: "Nome*",
          defaultValue: contactReq.contactname || "",
          name: "contactname",
          id: "contactname"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "contact-form-col-right",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          type: "text",
          placeholder: "Cognome*",
          defaultValue: contactReq.contactlast || "",
          name: "contactlast",
          id: "contactlast"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "contact-form-col-left",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          type: "text",
          placeholder: "Email*",
          defaultValue: contactReq.email || "",
          name: "email",
          id: "email"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "contact-form-col-right",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          type: "text",
          placeholder: "Numero di telefono",
          defaultValue: contactReq.phone || "",
          name: "phone",
          id: "phone"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "contact-form-col-full",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("textarea", {
          placeholder: "Messaggio",
          defaultValue: contactReq.message || "",
          name: "message",
          id: "message"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "contact-form-col-full",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
          text: "Invia",
          type: "submit"
        })
      })]
    })]
  });
}
;// CONCATENATED MODULE: ./src/client/components/Contact/ContactForm/steps/StepB.js
function StepB_slicedToArray(arr, i) { return StepB_arrayWithHoles(arr) || StepB_iterableToArrayLimit(arr, i) || StepB_unsupportedIterableToArray(arr, i) || StepB_nonIterableRest(); }

function StepB_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function StepB_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return StepB_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return StepB_arrayLikeToArray(o, minLen); }

function StepB_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function StepB_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function StepB_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var rightAnswer = 5;
function StepB(_ref) {
  var backStep = _ref.backStep,
      confirmAndSend = _ref.confirmAndSend;

  var _useState = (0,react.useState)(),
      _useState2 = StepB_slicedToArray(_useState, 2),
      answer = _useState2[0],
      setAnswer = _useState2[1];

  var handleChange = function handleChange(e) {
    e.preventDefault();
    setAnswer(e.target.valueAsNumber);
  };

  var handleSubmit = function handleSubmit() {
    if (rightAnswer === answer) {
      console.log("right answer! ", answer);
      confirmAndSend();
    } else {
      console.log("wrong answer! ", answer);
    }
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "stepB",
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("label", {
        children: "Quanto fa 2 + 3?"
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("input", {
        type: "number",
        placeholder: "Risposta...",
        name: "robotcheck",
        id: "robotcheck",
        onChange: function onChange(e) {
          return handleChange(e);
        }
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
        text: "Torna indietro",
        type: "function",
        fn: backStep
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.Z, {
        text: "Invia",
        type: "function",
        fn: function fn() {
          return handleSubmit(answer);
        }
      })]
    })]
  });
}
// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(3727);
;// CONCATENATED MODULE: ./src/client/components/Contact/ContactForm/steps/StepC.js



function StepC(_ref) {
  var isFailed = _ref.isFailed,
      isFinished = _ref.isFinished,
      error = _ref.error;

  if (isFinished) {
    return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      children: "Messaggio inviato! Ti risponderemo al pi\xFA presto"
    });
  }

  if (isFailed) {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      children: ["Messaggio non inviato! C\xE9 stato un errore ", error, /*#__PURE__*/(0,jsx_runtime.jsx)("br", {}), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom/* Link */.rU, {
        to: "/",
        children: "Torna al sito"
      })]
    });
  } else return null;
}
;// CONCATENATED MODULE: ./src/client/components/Contact/ContactForm/ContactForm.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ContactForm_slicedToArray(arr, i) { return ContactForm_arrayWithHoles(arr) || ContactForm_iterableToArrayLimit(arr, i) || ContactForm_unsupportedIterableToArray(arr, i) || ContactForm_nonIterableRest(); }

function ContactForm_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function ContactForm_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ContactForm_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ContactForm_arrayLikeToArray(o, minLen); }

function ContactForm_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ContactForm_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ContactForm_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var steps = ["Contact", "Robot Check"];
function ContactForm() {
  var _useState = (0,react.useState)(0),
      _useState2 = ContactForm_slicedToArray(_useState, 2),
      activeStep = _useState2[0],
      setActiveStep = _useState2[1];

  var _useState3 = (0,react.useState)(false),
      _useState4 = ContactForm_slicedToArray(_useState3, 2),
      isFinished = _useState4[0],
      setIsFinished = _useState4[1];

  var _useState5 = (0,react.useState)(false),
      _useState6 = ContactForm_slicedToArray(_useState5, 2),
      isFailed = _useState6[0],
      setIsFailed = _useState6[1];

  var _useState7 = (0,react.useState)({}),
      _useState8 = ContactForm_slicedToArray(_useState7, 2),
      contactReq = _useState8[0],
      setContactReq = _useState8[1];

  var _useState9 = (0,react.useState)(),
      _useState10 = ContactForm_slicedToArray(_useState9, 2),
      error = _useState10[0],
      setError = _useState10[1];

  var nextStep = function nextStep() {
    setActiveStep(function (prevActiveStep) {
      return prevActiveStep + 1;
    });
  };

  var backStep = function backStep() {
    setActiveStep(function (prevActiveStep) {
      return prevActiveStep - 1;
    });
  };

  var next = function next(data) {
    setContactReq(data);
    nextStep();
  };

  var confirmAndSend = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              nextStep(); //more code here -> using try catch and axios

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function confirmAndSend() {
      return _ref.apply(this, arguments);
    };
  }();

  var Form = function Form() {
    return activeStep === 0 ? /*#__PURE__*/(0,jsx_runtime.jsx)(StepA, {
      next: next,
      contactReq: contactReq
    }) : /*#__PURE__*/(0,jsx_runtime.jsx)(StepB, {
      backStep: backStep,
      confirmAndSend: confirmAndSend
    });
  };

  var Confirmation = function Confirmation() {
    if (isFinished) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)(StepC, {
        isFinished: isFinished
      });
    } else {
      return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "loader"
      });
    }
  };

  if (error || isFailed) {
    Confirmation = function Confirmation() {
      return /*#__PURE__*/(0,jsx_runtime.jsx)(StepC, {
        isFailed: isFailed,
        error: error
      });
    };
  }

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "contact-form-component",
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("h1", {
      className: "contact-form-col-full",
      children: ["Contatta ", /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
        id: "line-breaker"
      }), "da Mamy a Mamy"]
    }), activeStep === steps.length ? /*#__PURE__*/(0,jsx_runtime.jsx)(Confirmation, {}) : /*#__PURE__*/(0,jsx_runtime.jsx)(Form, {})]
  });
}
var MemoizedContactForm = /*#__PURE__*/(0,react.memo)(ContactForm);
;// CONCATENATED MODULE: ./src/client/components/Contact/Contact.js
function Contact_slicedToArray(arr, i) { return Contact_arrayWithHoles(arr) || Contact_iterableToArrayLimit(arr, i) || Contact_unsupportedIterableToArray(arr, i) || Contact_nonIterableRest(); }

function Contact_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Contact_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Contact_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Contact_arrayLikeToArray(o, minLen); }

function Contact_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Contact_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Contact_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var ContactList = (0,loadable_esm/* default */.ZP)(function () {
  return __webpack_require__.e(/* import() */ 384).then(__webpack_require__.bind(__webpack_require__, 3384));
});
var ContactMap = (0,loadable_esm/* default */.ZP)(function () {
  return __webpack_require__.e(/* import() */ 183).then(__webpack_require__.bind(__webpack_require__, 5183));
});
function Contact() {
  var _useScrollPosition = (0,useScrollPosition/* default */.Z)(),
      scrollTop = _useScrollPosition.scrollTop;

  var _useState = (0,react.useState)(),
      _useState2 = Contact_slicedToArray(_useState, 2),
      padding = _useState2[0],
      setPadding = _useState2[1]; //usando hooks cosí ho anche l'animazione al caricamento, quando il padding non é ancora definito


  (0,react.useEffect)(function () {
    console.log("MOUNTED");
  }, []);
  (0,react.useEffect)(function () {
    if (scrollTop > 70) {
      if (scrollTop > 250) {
        setPadding("20px");
      } else {
        setPadding("10px 20px 50px 20px");
      }
    } else {
      setPadding("125px 20px 160px 20px"); // per screen > 1110px = 160px 20px 160px 20px
    }
  }, [scrollTop]);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    id: "Contact",
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "contact-wrap",
      style: {
        padding: padding
      },
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(MemoizedContactForm, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(ContactList, {
        fallback: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: "loader"
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(ContactMap, {
      fallback: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "loader"
      })
    })]
  });
}

/***/ }),

/***/ 960:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useScrollPosition)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function useScrollPosition() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(window.scrollY),
      _useState2 = _slicedToArray(_useState, 2),
      scrollTop = _useState2[0],
      setScrollTop = _useState2[1];

  var updateScrollPosition = function updateScrollPosition() {
    setScrollTop(window.scrollY);
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    window.addEventListener("scroll", updateScrollPosition);
    return function () {
      return window.removeEventListener("scroll", updateScrollPosition);
    };
  });
  return {
    scrollTop: scrollTop
  };
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
//# sourceMappingURL=779.bundle.js.map