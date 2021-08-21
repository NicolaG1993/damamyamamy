"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[743],{

/***/ 1743:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Shortlist)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./src/client/utils/useWindowDimensions.js
var useWindowDimensions = __webpack_require__(1970);
// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(3727);
// EXTERNAL MODULE: ./src/client/components/CartButton/CartButton.js + 2 modules
var CartButton = __webpack_require__(2735);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/client/components/Shortlist/ItemCard/ItemCard.js





function ItemCard(_ref) {
  var product = _ref.product;
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "product-content",
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(react_router_dom/* Link */.rU, {
      to: "/item/".concat(product.id),
      className: "product-content-small",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {
        className: "product-img",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("img", {
          src: product.media.source || "test1.jpg"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "product-info",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h4", {
          children: product.name
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: "product-divider-small",
          children: " "
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("h5", {
          children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("span", {
            className: "price-for-small-card-tag",
            children: ["Prezzo:", " "]
          }), product.price.raw, "\u20AC"]
        })]
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(CartButton/* default */.Z, {
      wrapSize: "small",
      product_id: product.id
    })]
  });
}
;// CONCATENATED MODULE: ./src/client/components/Shortlist/Shortlist.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








function Shortlist(_ref) {
  var products = _ref.products,
      listTitle = _ref.listTitle;

  var _useWindowDimensions = (0,useWindowDimensions/* default */.Z)(),
      width = _useWindowDimensions.width;

  var _useState = (0,react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      sliceStart = _useState2[0],
      setSliceStart = _useState2[1];

  var _useState3 = (0,react.useState)(4),
      _useState4 = _slicedToArray(_useState3, 2),
      step = _useState4[0],
      setStep = _useState4[1];

  var seeNext = function seeNext() {
    setSliceStart(function (startingPoint) {
      return startingPoint < products.length - step ? startingPoint + step : startingPoint = 0;
    });
  };

  var seePrev = function seePrev() {
    var formula = products.length - products.length % step; //il primo if serve per quando si va indietro dalla prima
    //crea automaticamente i breaking point su gli steps esatti

    setSliceStart(function (startingPoint) {
      return startingPoint < step ? formula === products.length ? formula - step : formula : startingPoint - step;
    }); //il secondo serve per essere sicuri di non iniziare dall'ultima
    //in quel caso sottrae step
  };

  (0,react.useEffect)(function () {
    document.querySelectorAll(".product-box").forEach(function (el) {
      el.classList.add("fade-in");
    });
  });
  (0,react.useEffect)(function () {
    if (width <= 720) {
      setStep(2);
    } else {
      setStep(4);
    }
  }, [width]);
  (0,react.useEffect)(function () {
    console.log("sliceStart: ", sliceStart); // console.log("products.length: ", products.length);

    if (products) {
      if (products.length === sliceStart) {
        setSliceStart(function (startingPoint) {
          return startingPoint - step;
        });
      }
    }
  }, [sliceStart]);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "shortlist",
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "shortlist-topbar",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h3", {
        children: listTitle
      }), products && (products.length ? /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "shortlist-btns",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("button", {
          className: "small-arrow",
          onClick: function onClick() {
            return seePrev();
          },
          children: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
            className: "small-arrow-left"
          })
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
          className: "small-arrow",
          onClick: function onClick() {
            return seeNext();
          },
          children: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
            className: "small-arrow-right"
          })
        })]
      }) : /*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment, {}))]
    }), products ? products.length ? /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "products-small",
      children: products.slice(sliceStart, sliceStart + step).map(function (product) {
        return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
          className: "product-box product-box-shortlist",
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(ItemCard, {
            product: product // notAvailables={notAvailables}
            // onAddToCart={onAddToCart}
            // removeFromCart={removeFromCart}
            // cardSize={"small"}

          })
        }, product.id);
      })
    }) : /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "center-text",
      children: /*#__PURE__*/(0,jsx_runtime.jsx)("p", {
        children: "Nessun risultato"
      })
    }) : /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: "loader"
    })]
  });
} // usare map su un array
// l'array arriva da un axios req -> server -> database
// si usa l'id dello user (se cé!) per ricevere un array personalizzata
// (si possono usare cookies? stile facebook o pubblicitá per risultati ancora piú personallizati - informarsi)
// se no andare per ordine cronologico - o simile

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
//# sourceMappingURL=743.bundle.js.map