"use strict";
(self["webpackChunkdamamyamamy"] = self["webpackChunkdamamyamamy"] || []).push([[434],{

/***/ 2434:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Slider)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./src/client/components/Home/Slider/assets/pics/test4.jpg
var test4 = __webpack_require__(6668);
// EXTERNAL MODULE: ./src/client/components/Home/Slider/assets/pics/pic4.jpg
var pic4 = __webpack_require__(5486);
// EXTERNAL MODULE: ./src/client/components/Home/Slider/assets/pics/pic3.jpg
var pic3 = __webpack_require__(859);
// EXTERNAL MODULE: ./src/client/components/Home/Slider/assets/pics/pic2a.jpg
var pic2a = __webpack_require__(7602);
;// CONCATENATED MODULE: ./src/client/components/Home/Slider/assets/images.js




/* harmony default export */ const assets_images = ([test4, pic4, pic3, pic2a]);
// EXTERNAL MODULE: ./src/client/utils/useScrollPosition.js
var useScrollPosition = __webpack_require__(960);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/client/components/Home/Slider/SliderContent.js


var SliderContent = function SliderContent(props) {
  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    className: "SliderContent",
    style: {
      transform: "translateX(-".concat(props.translate, "px)"),
      transition: "transform ease-out ".concat(props.transition, "s"),
      height: "100%",
      width: "".concat(props.width, "px"),
      display: "flex"
    },
    children: props.children
  });
};

/* harmony default export */ const Slider_SliderContent = (SliderContent);
;// CONCATENATED MODULE: ./src/client/components/Home/Slider/Slide.js



var Slide = function Slide(_ref) {
  var content = _ref.content,
      width = _ref.width;
  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    style: {
      height: "100%",
      width: "".concat(width, "px"),
      backgroundImage: "url(".concat(content, ")"),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    }
  });
};

/* harmony default export */ const Slider_Slide = (/*#__PURE__*/(0,react.memo)(Slide));
;// CONCATENATED MODULE: ./src/client/components/Home/Slider/assets/left-arrow.svg
var _path;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



function SvgLeftArrow(props) {
  return /*#__PURE__*/react.createElement("svg", _extends({
    width: 14,
    height: 22,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/react.createElement("path", {
    d: "M12.064 1.681l-9.255 9.255 9.255 9.255",
    strokeWidth: 3,
    stroke: "#6F82BF",
    fill: "none",
    fillRule: "evenodd"
  })));
}

/* harmony default export */ const left_arrow = (SvgLeftArrow);
;// CONCATENATED MODULE: ./src/client/components/Home/Slider/assets/right-arrow.svg
var right_arrow_path;

function right_arrow_extends() { right_arrow_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return right_arrow_extends.apply(this, arguments); }



function SvgRightArrow(props) {
  return /*#__PURE__*/react.createElement("svg", right_arrow_extends({
    width: 14,
    height: 22,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), right_arrow_path || (right_arrow_path = /*#__PURE__*/react.createElement("path", {
    d: "M1.936 1.681l9.255 9.255-9.255 9.255",
    strokeWidth: 3,
    stroke: "#6F82BF",
    fill: "none",
    fillRule: "evenodd"
  })));
}

/* harmony default export */ const right_arrow = (SvgRightArrow);
;// CONCATENATED MODULE: ./src/client/components/Home/Slider/Arrow.js





var Arrow = function Arrow(_ref) {
  var direction = _ref.direction,
      handleClick = _ref.handleClick;
  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    onClick: handleClick,
    className: "arrowWrap ".concat(direction === "right" ? "rightArrowStyle" : "leftArrowStyle"),
    children: direction === "right" ? /*#__PURE__*/(0,jsx_runtime.jsx)(right_arrow, {}) : /*#__PURE__*/(0,jsx_runtime.jsx)(left_arrow, {})
  });
};

/* harmony default export */ const Slider_Arrow = (/*#__PURE__*/(0,react.memo)(Arrow));
;// CONCATENATED MODULE: ./src/client/components/Home/Slider/Dots.js



var Dot = function Dot(_ref) {
  var active = _ref.active;
  return /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
    style: {
      padding: "6px",
      margin: "5px",
      borderRadius: "50%",
      background: "".concat(active ? "rgb(231, 134, 235)" : "rgb(205,205,205)")
    }
  });
};

var MemoDot = /*#__PURE__*/(0,react.memo)(Dot);

var Dots = function Dots(_ref2) {
  var slides = _ref2.slides,
      activeSlide = _ref2.activeSlide;
  return /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
    style: {
      position: "absolute",
      bottom: "-60px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    children: slides.map(function (slide, i) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)(MemoDot, {
        active: activeSlide === i
      }, slide);
    })
  });
};

/* harmony default export */ const Slider_Dots = (Dots);
;// CONCATENATED MODULE: ./src/client/components/Home/Slider/Slider.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




 // import useWindowDimensions from "../../../utils/useWindowDimensions";







function Slider(_ref) {
  var width = _ref.width;

  var _useScrollPosition = (0,useScrollPosition/* default */.Z)(),
      scrollTop = _useScrollPosition.scrollTop; // const { width } = useWindowDimensions();


  var _useState = (0,react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      parallaxHeight = _useState2[0],
      setParallaxHeight = _useState2[1];

  var autoPlay = 10;
  var firstSlide = assets_images[0];
  var secondSlide = assets_images[1];
  var lastSlide = assets_images[assets_images.length - 1];

  var _useState3 = (0,react.useState)({
    activeSlide: 0,
    translate: width,
    transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide]
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      state = _useState4[0],
      setState = _useState4[1];

  var activeSlide = state.activeSlide,
      translate = state.translate,
      _slides = state._slides,
      transition = state.transition;
  var autoPlayRef = (0,react.useRef)();
  var transitionRef = (0,react.useRef)();
  var resizeRef = (0,react.useRef)();
  var sliderRef = (0,react.useRef)();
  (0,react.useEffect)(function () {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  }); // run on every render

  (0,react.useEffect)(function () {
    var slider = sliderRef.current;

    var smooth = function smooth(e) {
      if (e.target.className.includes("SliderContent")) {
        transitionRef.current();
      }
    };

    var transitionEnd = slider.addEventListener("transitionend", smooth); // returned function will be called on component unmount

    return function () {
      slider.removeEventListener("transitionend", transitionEnd);
    };
  }, []); // run only when component mount

  (0,react.useEffect)(function () {
    if (transition === 0) setState(_objectSpread(_objectSpread({}, state), {}, {
      transition: 0.45
    }));
  }, [transition]);
  (0,react.useEffect)(function () {
    var play = function play() {
      autoPlayRef.current();
    };

    var interval = null;

    if (autoPlay) {
      interval = setInterval(play, autoPlay * 1000);
    }

    return function () {
      if (autoPlay) {
        clearInterval(interval);
      }
    };
  }, [activeSlide]);
  (0,react.useEffect)(function () {
    if (scrollTop > 150) {
      setParallaxHeight("35vh");
    } else {
      setParallaxHeight("70vh");
    }
  }, [scrollTop]);

  var handleResize = function handleResize() {
    return setState(_objectSpread(_objectSpread({}, state), {}, {
      translate: width,
      transition: 0
    }));
  };

  (0,react.useEffect)(function () {
    console.log("width changed!", width);
    handleResize();
  }, [width]);

  var smoothTransition = function smoothTransition() {
    var _slides = []; // We're at the last slide.

    if (activeSlide === assets_images.length - 1) _slides = [assets_images[assets_images.length - 2], lastSlide, firstSlide]; // We're back at the first slide. Just reset to how it was on initial render
    else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide]; // Create an array of the previous last slide, and the next two slides that follow it.
    else _slides = assets_images.slice(activeSlide - 1, activeSlide + 2);
    setState(_objectSpread(_objectSpread({}, state), {}, {
      _slides: _slides,
      transition: 0,
      translate: width
    }));
  };

  var nextSlide = function nextSlide() {
    return setState(_objectSpread(_objectSpread({}, state), {}, {
      translate: translate + width,
      activeSlide: activeSlide === assets_images.length - 1 ? 0 : activeSlide + 1
    }));
  };

  var prevSlide = function prevSlide() {
    return setState(_objectSpread(_objectSpread({}, state), {}, {
      translate: 0,
      activeSlide: activeSlide === 0 ? assets_images.length - 1 : activeSlide - 1
    }));
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "sliderBox",
    style: {
      height: "".concat(parallaxHeight),
      transition: "0.8s ease"
    },
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      style: SliderCSS,
      ref: sliderRef,
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Slider_SliderContent, {
        translate: translate,
        transition: transition,
        width: width * _slides.length,
        children: _slides.map(function (_slide, i) {
          return /*#__PURE__*/(0,jsx_runtime.jsx)(Slider_Slide, {
            width: width,
            content: _slide
          }, _slide + i);
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(Slider_Arrow, {
        direction: "left",
        handleClick: prevSlide
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(Slider_Arrow, {
        direction: "right",
        handleClick: nextSlide
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(Slider_Dots, {
      slides: assets_images,
      activeSlide: activeSlide
    })]
  });
}
var SliderCSS = {
  position: "relative",
  height: "100%",
  width: "100%",
  margin: "0 auto",
  overflow: "hidden",
  whiteSpace: "nowrap"
}; // video -> https://www.youtube.com/watch?v=N7W-S4JhMXY
// devo ancora analizzare per bene questo component (tipo useRef ?)

/***/ }),

/***/ 7602:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "99b283f9420217a8ad7b.jpg";

/***/ }),

/***/ 859:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "15eadfcdc240a5614575.jpg";

/***/ }),

/***/ 5486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "14a54dac9f9d4567f5be.jpg";

/***/ }),

/***/ 6668:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d44f52750243475e0e32.jpg";

/***/ })

}]);
//# sourceMappingURL=434.bundle.js.map