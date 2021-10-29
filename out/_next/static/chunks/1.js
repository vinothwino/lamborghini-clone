(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[1],{

/***/ "./node_modules/gsap/CSSRulePlugin.js":
/*!********************************************!*\
  !*** ./node_modules/gsap/CSSRulePlugin.js ***!
  \********************************************/
/*! exports provided: CSSRulePlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSSRulePlugin", function() { return CSSRulePlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CSSRulePlugin; });
/*!
 * CSSRulePlugin 3.5.1
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _coreInitted,
    _win,
    _doc,
    CSSPlugin,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _checkRegister = function _checkRegister() {
  if (!_coreInitted) {
    _initCore();

    if (!CSSPlugin) {
      console.warn("Please gsap.registerPlugin(CSSPlugin, CSSRulePlugin)");
    }
  }

  return _coreInitted;
},
    _initCore = function _initCore(core) {
  gsap = core || _getGSAP();

  if (_windowExists()) {
    _win = window;
    _doc = document;
  }

  if (gsap) {
    CSSPlugin = gsap.plugins.css;

    if (CSSPlugin) {
      _coreInitted = 1;
    }
  }
};

var CSSRulePlugin = {
  version: "3.5.1",
  name: "cssRule",
  init: function init(target, value, tween, index, targets) {
    if (!_checkRegister() || typeof target.cssText === "undefined") {
      return false;
    }

    var div = target._gsProxy = target._gsProxy || _doc.createElement("div");

    this.ss = target;
    this.style = div.style;
    div.style.cssText = target.cssText;
    CSSPlugin.prototype.init.call(this, div, value, tween, index, targets); //we just offload all the work to the regular CSSPlugin and then copy the cssText back over to the rule in the render() method. This allows us to have all of the updates to CSSPlugin automatically flow through to CSSRulePlugin instead of having to maintain both
  },
  render: function render(ratio, data) {
    var pt = data._pt,
        style = data.style,
        ss = data.ss,
        i;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    i = style.length;

    while (--i > -1) {
      ss[style[i]] = style[style[i]];
    }
  },
  getRule: function getRule(selector) {
    _checkRegister();

    var ruleProp = _doc.all ? "rules" : "cssRules",
        styleSheets = _doc.styleSheets,
        i = styleSheets.length,
        pseudo = selector.charAt(0) === ":",
        j,
        curSS,
        cs,
        a;
    selector = (pseudo ? "" : ",") + selector.split("::").join(":").toLowerCase() + ","; //note: old versions of IE report tag name selectors as upper case, so we just change everything to lowercase.

    if (pseudo) {
      a = [];
    }

    while (i--) {
      //Firefox may throw insecure operation errors when css is loaded from other domains, so try/catch.
      try {
        curSS = styleSheets[i][ruleProp];

        if (!curSS) {
          continue;
        }

        j = curSS.length;
      } catch (e) {
        console.warn(e);
        continue;
      }

      while (--j > -1) {
        cs = curSS[j];

        if (cs.selectorText && ("," + cs.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(selector) !== -1) {
          //note: IE adds an extra ":" to pseudo selectors, so .myClass:after becomes .myClass::after, so we need to strip the extra one out.
          if (pseudo) {
            a.push(cs.style);
          } else {
            return cs.style;
          }
        }
      }
    }

    return a;
  },
  register: _initCore
};
_getGSAP() && gsap.registerPlugin(CSSRulePlugin);


/***/ }),

/***/ "./node_modules/gsap/Draggable.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/Draggable.js ***!
  \****************************************/
/*! exports provided: Draggable, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return Draggable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Draggable; });
/* harmony import */ var _utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/matrix.js */ "./node_modules/gsap/utils/matrix.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*!
 * Draggable 3.5.1
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */


var gsap,
    _win,
    _doc,
    _docElement,
    _body,
    _tempDiv,
    _placeholderDiv,
    _coreInitted,
    _checkPrefix,
    _toArray,
    _supportsPassive,
    _isTouchDevice,
    _touchEventLookup,
    _dragCount,
    _isMultiTouching,
    _isAndroid,
    InertiaPlugin,
    _defaultCursor,
    _supportsPointer,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _emptyFunc = function _emptyFunc() {
  return false;
},
    _transformProp = "transform",
    _transformOriginProp = "transformOrigin",
    _round = function _round(value) {
  return Math.round(value * 10000) / 10000;
},
    _isArray = Array.isArray,
    _createElement = function _createElement(type, ns) {
  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _RAD2DEG = 180 / Math.PI,
    _bigNum = 1e20,
    _identityMatrix = new _utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["Matrix2D"](),
    _getTime = Date.now || function () {
  return new Date().getTime();
},
    _renderQueue = [],
    _lookup = {},
    //when a Draggable is created, the target gets a unique _gsDragID property that allows gets associated with the Draggable instance for quick lookups in Draggable.get(). This avoids circular references that could cause gc problems.
_lookupCount = 0,
    _clickableTagExp = /^(?:a|input|textarea|button|select)$/i,
    _lastDragTime = 0,
    _temp1 = {},
    // a simple object we reuse and populate (usually x/y properties) to conserve memory and improve performance.
_windowProxy = {},
    //memory/performance optimization - we reuse this object during autoScroll to store window-related bounds/offsets.
_copy = function _copy(obj, factor) {
  var copy = {},
      p;

  for (p in obj) {
    copy[p] = factor ? obj[p] * factor : obj[p];
  }

  return copy;
},
    _extend = function _extend(obj, defaults) {
  for (var p in defaults) {
    if (!(p in obj)) {
      obj[p] = defaults[p];
    }
  }

  return obj;
},
    _renderQueueTick = function _renderQueueTick() {
  return _renderQueue.forEach(function (func) {
    return func();
  });
},
    _addToRenderQueue = function _addToRenderQueue(func) {
  _renderQueue.push(func);

  if (_renderQueue.length === 1) {
    gsap.ticker.add(_renderQueueTick);
  }
},
    _renderQueueTimeout = function _renderQueueTimeout() {
  return !_renderQueue.length && gsap.ticker.remove(_renderQueueTick);
},
    _removeFromRenderQueue = function _removeFromRenderQueue(func) {
  var i = _renderQueue.length;

  while (i--) {
    if (_renderQueue[i] === func) {
      _renderQueue.splice(i, 1);
    }
  }

  gsap.to(_renderQueueTimeout, {
    overwrite: true,
    delay: 15,
    duration: 0,
    onComplete: _renderQueueTimeout,
    data: "_draggable"
  }); //remove the "tick" listener only after the render queue is empty for 15 seconds (to improve performance). Adding/removing it constantly for every click/touch wouldn't deliver optimal speed, and we also don't want the ticker to keep calling the render method when things are idle for long periods of time (we want to improve battery life on mobile devices).
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    if (!(p in obj)) {
      obj[p] = defaults[p];
    }
  }

  return obj;
},
    _addListener = function _addListener(element, type, func, capture) {
  if (element.addEventListener) {
    var touchType = _touchEventLookup[type];
    capture = capture || (_supportsPassive ? {
      passive: false
    } : null);
    element.addEventListener(touchType || type, func, capture);
    touchType && type !== touchType && element.addEventListener(type, func, capture); //some browsers actually support both, so must we. But pointer events cover all.
  }
},
    _removeListener = function _removeListener(element, type, func) {
  if (element.removeEventListener) {
    var touchType = _touchEventLookup[type];
    element.removeEventListener(touchType || type, func);
    touchType && type !== touchType && element.removeEventListener(type, func);
  }
},
    _preventDefault = function _preventDefault(event) {
  event.preventDefault && event.preventDefault();
  event.preventManipulation && event.preventManipulation(); //for some Microsoft browsers
},
    _hasTouchID = function _hasTouchID(list, ID) {
  var i = list.length;

  while (i--) {
    if (list[i].identifier === ID) {
      return true;
    }
  }
},
    _onMultiTouchDocumentEnd = function _onMultiTouchDocumentEnd(event) {
  _isMultiTouching = event.touches && _dragCount < event.touches.length;

  _removeListener(event.target, "touchend", _onMultiTouchDocumentEnd);
},
    _onMultiTouchDocument = function _onMultiTouchDocument(event) {
  _isMultiTouching = event.touches && _dragCount < event.touches.length;

  _addListener(event.target, "touchend", _onMultiTouchDocumentEnd);
},
    _getDocScrollTop = function _getDocScrollTop(doc) {
  return _win.pageYOffset || doc.scrollTop || doc.documentElement.scrollTop || doc.body.scrollTop || 0;
},
    _getDocScrollLeft = function _getDocScrollLeft(doc) {
  return _win.pageXOffset || doc.scrollLeft || doc.documentElement.scrollLeft || doc.body.scrollLeft || 0;
},
    _addScrollListener = function _addScrollListener(e, callback) {
  _addListener(e, "scroll", callback);

  if (!_isRoot(e.parentNode)) {
    _addScrollListener(e.parentNode, callback);
  }
},
    _removeScrollListener = function _removeScrollListener(e, callback) {
  _removeListener(e, "scroll", callback);

  if (!_isRoot(e.parentNode)) {
    _removeScrollListener(e.parentNode, callback);
  }
},
    _isRoot = function _isRoot(e) {
  return !!(!e || e === _docElement || e.nodeType === 9 || e === _doc.body || e === _win || !e.nodeType || !e.parentNode);
},
    _getMaxScroll = function _getMaxScroll(element, axis) {
  var dim = axis === "x" ? "Width" : "Height",
      scroll = "scroll" + dim,
      client = "client" + dim;
  return Math.max(0, _isRoot(element) ? Math.max(_docElement[scroll], _body[scroll]) - (_win["inner" + dim] || _docElement[client] || _body[client]) : element[scroll] - element[client]);
},
    _recordMaxScrolls = function _recordMaxScrolls(e, skipCurrent) {
  //records _gsMaxScrollX and _gsMaxScrollY properties for the element and all ancestors up the chain so that we can cap it, otherwise dragging beyond the edges with autoScroll on can endlessly scroll.
  var x = _getMaxScroll(e, "x"),
      y = _getMaxScroll(e, "y");

  if (_isRoot(e)) {
    e = _windowProxy;
  } else {
    _recordMaxScrolls(e.parentNode, skipCurrent);
  }

  e._gsMaxScrollX = x;
  e._gsMaxScrollY = y;

  if (!skipCurrent) {
    e._gsScrollX = e.scrollLeft || 0;
    e._gsScrollY = e.scrollTop || 0;
  }
},
    _setStyle = function _setStyle(element, property, value) {
  var style = element.style;

  if (!style) {
    return;
  }

  if (_isUndefined(style[property])) {
    property = _checkPrefix(property, element) || property;
  }

  if (value == null) {
    style.removeProperty && style.removeProperty(property.replace(/([A-Z])/g, "-$1").toLowerCase());
  } else {
    style[property] = value;
  }
},
    _getComputedStyle = function _getComputedStyle(element) {
  return _win.getComputedStyle(element instanceof Element ? element : element.host || (element.parentNode || {}).host || element);
},
    //the "host" stuff helps to accommodate ShadowDom objects.
_tempRect = {},
    //reuse to reduce garbage collection tasks
_parseRect = function _parseRect(e) {
  //accepts a DOM element, a mouse event, or a rectangle object and returns the corresponding rectangle with left, right, width, height, top, and bottom properties
  if (e === _win) {
    _tempRect.left = _tempRect.top = 0;
    _tempRect.width = _tempRect.right = _docElement.clientWidth || e.innerWidth || _body.clientWidth || 0;
    _tempRect.height = _tempRect.bottom = (e.innerHeight || 0) - 20 < _docElement.clientHeight ? _docElement.clientHeight : e.innerHeight || _body.clientHeight || 0;
    return _tempRect;
  }

  var doc = e.ownerDocument || _doc,
      r = !_isUndefined(e.pageX) ? {
    left: e.pageX - _getDocScrollLeft(doc),
    top: e.pageY - _getDocScrollTop(doc),
    right: e.pageX - _getDocScrollLeft(doc) + 1,
    bottom: e.pageY - _getDocScrollTop(doc) + 1
  } : !e.nodeType && !_isUndefined(e.left) && !_isUndefined(e.top) ? e : _toArray(e)[0].getBoundingClientRect();

  if (_isUndefined(r.right) && !_isUndefined(r.width)) {
    r.right = r.left + r.width;
    r.bottom = r.top + r.height;
  } else if (_isUndefined(r.width)) {
    //some browsers don't include width and height properties. We can't just set them directly on r because some browsers throw errors, so create a new generic object.
    r = {
      width: r.right - r.left,
      height: r.bottom - r.top,
      right: r.right,
      left: r.left,
      bottom: r.bottom,
      top: r.top
    };
  }

  return r;
},
    _dispatchEvent = function _dispatchEvent(target, type, callbackName) {
  var vars = target.vars,
      callback = vars[callbackName],
      listeners = target._listeners[type],
      result;

  if (_isFunction(callback)) {
    result = callback.apply(vars.callbackScope || target, vars[callbackName + "Params"] || [target.pointerEvent]);
  }

  if (listeners && target.dispatchEvent(type) === false) {
    result = false;
  }

  return result;
},
    _getBounds = function _getBounds(target, context) {
  //accepts any of the following: a DOM element, jQuery object, selector text, or an object defining bounds as {top, left, width, height} or {minX, maxX, minY, maxY}. Returns an object with left, top, width, and height properties.
  var e = _toArray(target)[0],
      top,
      left,
      offset;

  if (!e.nodeType && e !== _win) {
    if (!_isUndefined(target.left)) {
      offset = {
        x: 0,
        y: 0
      }; //_getOffsetTransformOrigin(context); //the bounds should be relative to the origin

      return {
        left: target.left - offset.x,
        top: target.top - offset.y,
        width: target.width,
        height: target.height
      };
    }

    left = target.min || target.minX || target.minRotation || 0;
    top = target.min || target.minY || 0;
    return {
      left: left,
      top: top,
      width: (target.max || target.maxX || target.maxRotation || 0) - left,
      height: (target.max || target.maxY || 0) - top
    };
  }

  return _getElementBounds(e, context);
},
    _point1 = {},
    //we reuse to minimize garbage collection tasks.
_getElementBounds = function _getElementBounds(element, context) {
  context = _toArray(context)[0];
  var isSVG = element.getBBox && element.ownerSVGElement,
      doc = element.ownerDocument || _doc,
      left,
      right,
      top,
      bottom,
      matrix,
      p1,
      p2,
      p3,
      p4,
      bbox,
      width,
      height,
      cs,
      contextParent;

  if (element === _win) {
    top = _getDocScrollTop(doc);
    left = _getDocScrollLeft(doc);
    right = left + (doc.documentElement.clientWidth || element.innerWidth || doc.body.clientWidth || 0);
    bottom = top + ((element.innerHeight || 0) - 20 < doc.documentElement.clientHeight ? doc.documentElement.clientHeight : element.innerHeight || doc.body.clientHeight || 0); //some browsers (like Firefox) ignore absolutely positioned elements, and collapse the height of the documentElement, so it could be 8px, for example, if you have just an absolutely positioned div. In that case, we use the innerHeight to resolve this.
  } else if (context === _win || _isUndefined(context)) {
    return element.getBoundingClientRect();
  } else {
    left = top = 0;

    if (isSVG) {
      bbox = element.getBBox();
      width = bbox.width;
      height = bbox.height;
    } else {
      if (element.viewBox && (bbox = element.viewBox.baseVal)) {
        left = bbox.x || 0;
        top = bbox.y || 0;
        width = bbox.width;
        height = bbox.height;
      }

      if (!width) {
        cs = _getComputedStyle(element);
        bbox = cs.boxSizing === "border-box";
        width = (parseFloat(cs.width) || element.clientWidth || 0) + (bbox ? 0 : parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth));
        height = (parseFloat(cs.height) || element.clientHeight || 0) + (bbox ? 0 : parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth));
      }
    }

    right = width;
    bottom = height;
  }

  if (element === context) {
    return {
      left: left,
      top: top,
      width: right - left,
      height: bottom - top
    };
  }

  matrix = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["getGlobalMatrix"])(context, true).multiply(Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["getGlobalMatrix"])(element));
  p1 = matrix.apply({
    x: left,
    y: top
  });
  p2 = matrix.apply({
    x: right,
    y: top
  });
  p3 = matrix.apply({
    x: right,
    y: bottom
  });
  p4 = matrix.apply({
    x: left,
    y: bottom
  });
  left = Math.min(p1.x, p2.x, p3.x, p4.x);
  top = Math.min(p1.y, p2.y, p3.y, p4.y);
  contextParent = context.parentNode || {};
  return {
    left: left + (contextParent.scrollLeft || 0),
    top: top + (contextParent.scrollTop || 0),
    width: Math.max(p1.x, p2.x, p3.x, p4.x) - left,
    height: Math.max(p1.y, p2.y, p3.y, p4.y) - top
  };
},
    _parseInertia = function _parseInertia(draggable, snap, max, min, factor, forceZeroVelocity) {
  var vars = {},
      a,
      i,
      l;

  if (snap) {
    if (factor !== 1 && snap instanceof Array) {
      //some data must be altered to make sense, like if the user passes in an array of rotational values in degrees, we must convert it to radians. Or for scrollLeft and scrollTop, we invert the values.
      vars.end = a = [];
      l = snap.length;

      if (_isObject(snap[0])) {
        //if the array is populated with objects, like points ({x:100, y:200}), make copies before multiplying by the factor, otherwise we'll mess up the originals and the user may reuse it elsewhere.
        for (i = 0; i < l; i++) {
          a[i] = _copy(snap[i], factor);
        }
      } else {
        for (i = 0; i < l; i++) {
          a[i] = snap[i] * factor;
        }
      }

      max += 1.1; //allow 1.1 pixels of wiggle room when snapping in order to work around some browser inconsistencies in the way bounds are reported which can make them roughly a pixel off. For example, if "snap:[-$('#menu').width(), 0]" was defined and #menu had a wrapper that was used as the bounds, some browsers would be one pixel off, making the minimum -752 for example when snap was [-753,0], thus instead of snapping to -753, it would snap to 0 since -753 was below the minimum.

      min -= 1.1;
    } else if (_isFunction(snap)) {
      vars.end = function (value) {
        var result = snap.call(draggable, value),
            copy,
            p;

        if (factor !== 1) {
          if (_isObject(result)) {
            copy = {};

            for (p in result) {
              copy[p] = result[p] * factor;
            }

            result = copy;
          } else {
            result *= factor;
          }
        }

        return result; //we need to ensure that we can scope the function call to the Draggable instance itself so that users can access important values like maxX, minX, maxY, minY, x, and y from within that function.
      };
    } else {
      vars.end = snap;
    }
  }

  if (max || max === 0) {
    vars.max = max;
  }

  if (min || min === 0) {
    vars.min = min;
  }

  if (forceZeroVelocity) {
    vars.velocity = 0;
  }

  return vars;
},
    _isClickable = function _isClickable(element) {
  //sometimes it's convenient to mark an element as clickable by adding a data-clickable="true" attribute (in which case we won't preventDefault() the mouse/touch event). This method checks if the element is an <a>, <input>, or <button> or has an onclick or has the data-clickable or contentEditable attribute set to true (or any of its parent elements).
  var data;
  return !element || !element.getAttribute || element === _body ? false : (data = element.getAttribute("data-clickable")) === "true" || data !== "false" && (element.onclick || _clickableTagExp.test(element.nodeName + "") || element.getAttribute("contentEditable") === "true") ? true : _isClickable(element.parentNode);
},
    _setSelectable = function _setSelectable(elements, selectable) {
  var i = elements.length,
      e;

  while (i--) {
    e = elements[i];
    e.ondragstart = e.onselectstart = selectable ? null : _emptyFunc; //setStyle(e, "userSelect", (selectable ? "text" : "none"));

    gsap.set(e, {
      lazy: true,
      userSelect: selectable ? "text" : "none"
    });
  }
},
    _isFixed = function _isFixed(element) {
  if (_getComputedStyle(element).position === "fixed") {
    return true;
  }

  element = element.parentNode;

  if (element && element.nodeType === 1) {
    // avoid document fragments which will throw an error.
    return _isFixed(element);
  }
},
    _supports3D,
    _addPaddingBR,
    //The ScrollProxy class wraps an element's contents into another div (we call it "content") that we either add padding when necessary or apply a translate3d() transform in order to overscroll (scroll past the boundaries). This allows us to simply set the scrollTop/scrollLeft (or top/left for easier reverse-axis orientation, which is what we do in Draggable) and it'll do all the work for us. For example, if we tried setting scrollTop to -100 on a normal DOM element, it wouldn't work - it'd look the same as setting it to 0, but if we set scrollTop of a ScrollProxy to -100, it'll give the correct appearance by either setting paddingTop of the wrapper to 100 or applying a 100-pixel translateY.
ScrollProxy = function ScrollProxy(element, vars) {
  element = gsap.utils.toArray(element)[0];
  vars = vars || {};
  var content = document.createElement("div"),
      style = content.style,
      node = element.firstChild,
      offsetTop = 0,
      offsetLeft = 0,
      prevTop = element.scrollTop,
      prevLeft = element.scrollLeft,
      scrollWidth = element.scrollWidth,
      scrollHeight = element.scrollHeight,
      extraPadRight = 0,
      maxLeft = 0,
      maxTop = 0,
      elementWidth,
      elementHeight,
      contentHeight,
      nextNode,
      transformStart,
      transformEnd;

  if (_supports3D && vars.force3D !== false) {
    transformStart = "translate3d(";
    transformEnd = "px,0px)";
  } else if (_transformProp) {
    transformStart = "translate(";
    transformEnd = "px)";
  }

  this.scrollTop = function (value, force) {
    if (!arguments.length) {
      return -this.top();
    }

    this.top(-value, force);
  };

  this.scrollLeft = function (value, force) {
    if (!arguments.length) {
      return -this.left();
    }

    this.left(-value, force);
  };

  this.left = function (value, force) {
    if (!arguments.length) {
      return -(element.scrollLeft + offsetLeft);
    }

    var dif = element.scrollLeft - prevLeft,
        oldOffset = offsetLeft;

    if ((dif > 2 || dif < -2) && !force) {
      //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
      prevLeft = element.scrollLeft;
      gsap.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      });
      this.left(-prevLeft);

      if (vars.onKill) {
        vars.onKill();
      }

      return;
    }

    value = -value; //invert because scrolling works in the opposite direction

    if (value < 0) {
      offsetLeft = value - 0.5 | 0;
      value = 0;
    } else if (value > maxLeft) {
      offsetLeft = value - maxLeft | 0;
      value = maxLeft;
    } else {
      offsetLeft = 0;
    }

    if (offsetLeft || oldOffset) {
      if (!this._skip) {
        style[_transformProp] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
      }

      if (offsetLeft + extraPadRight >= 0) {
        style.paddingRight = offsetLeft + extraPadRight + "px";
      }
    }

    element.scrollLeft = value | 0;
    prevLeft = element.scrollLeft; //don't merge this with the line above because some browsers adjust the scrollLeft after it's set, so in order to be 100% accurate in tracking it, we need to ask the browser to report it.
  };

  this.top = function (value, force) {
    if (!arguments.length) {
      return -(element.scrollTop + offsetTop);
    }

    var dif = element.scrollTop - prevTop,
        oldOffset = offsetTop;

    if ((dif > 2 || dif < -2) && !force) {
      //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
      prevTop = element.scrollTop;
      gsap.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      });
      this.top(-prevTop);

      if (vars.onKill) {
        vars.onKill();
      }

      return;
    }

    value = -value; //invert because scrolling works in the opposite direction

    if (value < 0) {
      offsetTop = value - 0.5 | 0;
      value = 0;
    } else if (value > maxTop) {
      offsetTop = value - maxTop | 0;
      value = maxTop;
    } else {
      offsetTop = 0;
    }

    if (offsetTop || oldOffset) {
      if (!this._skip) {
        style[_transformProp] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
      }
    }

    element.scrollTop = value | 0;
    prevTop = element.scrollTop;
  };

  this.maxScrollTop = function () {
    return maxTop;
  };

  this.maxScrollLeft = function () {
    return maxLeft;
  };

  this.disable = function () {
    node = content.firstChild;

    while (node) {
      nextNode = node.nextSibling;
      element.appendChild(node);
      node = nextNode;
    }

    if (element === content.parentNode) {
      //in case disable() is called when it's already disabled.
      element.removeChild(content);
    }
  };

  this.enable = function () {
    node = element.firstChild;

    if (node === content) {
      return;
    }

    while (node) {
      nextNode = node.nextSibling;
      content.appendChild(node);
      node = nextNode;
    }

    element.appendChild(content);
    this.calibrate();
  };

  this.calibrate = function (force) {
    var widthMatches = element.clientWidth === elementWidth,
        cs,
        x,
        y;
    prevTop = element.scrollTop;
    prevLeft = element.scrollLeft;

    if (widthMatches && element.clientHeight === elementHeight && content.offsetHeight === contentHeight && scrollWidth === element.scrollWidth && scrollHeight === element.scrollHeight && !force) {
      return; //no need to recalculate things if the width and height haven't changed.
    }

    if (offsetTop || offsetLeft) {
      x = this.left();
      y = this.top();
      this.left(-element.scrollLeft);
      this.top(-element.scrollTop);
    }

    cs = _getComputedStyle(element); //first, we need to remove any width constraints to see how the content naturally flows so that we can see if it's wider than the containing element. If so, we've got to record the amount of overage so that we can apply that as padding in order for browsers to correctly handle things. Then we switch back to a width of 100% (without that, some browsers don't flow the content correctly)

    if (!widthMatches || force) {
      style.display = "block";
      style.width = "auto";
      style.paddingRight = "0px";
      extraPadRight = Math.max(0, element.scrollWidth - element.clientWidth); //if the content is wider than the container, we need to add the paddingLeft and paddingRight in order for things to behave correctly.

      if (extraPadRight) {
        extraPadRight += parseFloat(cs.paddingLeft) + (_addPaddingBR ? parseFloat(cs.paddingRight) : 0);
      }
    }

    style.display = "inline-block";
    style.position = "relative";
    style.overflow = "visible";
    style.verticalAlign = "top";
    style.boxSizing = "content-box";
    style.width = "100%";
    style.paddingRight = extraPadRight + "px"; //some browsers neglect to factor in the bottom padding when calculating the scrollHeight, so we need to add that padding to the content when that happens. Allow a 2px margin for error

    if (_addPaddingBR) {
      style.paddingBottom = cs.paddingBottom;
    }

    elementWidth = element.clientWidth;
    elementHeight = element.clientHeight;
    scrollWidth = element.scrollWidth;
    scrollHeight = element.scrollHeight;
    maxLeft = element.scrollWidth - elementWidth;
    maxTop = element.scrollHeight - elementHeight;
    contentHeight = content.offsetHeight;
    style.display = "block";

    if (x || y) {
      this.left(x);
      this.top(y);
    }
  };

  this.content = content;
  this.element = element;
  this._skip = false;
  this.enable();
},
    _initCore = function _initCore(required) {
  if (_windowExists() && document.body) {
    var nav = window && window.navigator;
    _win = window;
    _doc = document;
    _docElement = _doc.documentElement;
    _body = _doc.body;
    _tempDiv = _createElement("div");
    _supportsPointer = !!window.PointerEvent;
    _placeholderDiv = _createElement("div");
    _placeholderDiv.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab";
    _defaultCursor = _placeholderDiv.style.cursor === "grab" ? "grab" : "move";
    _isAndroid = nav && nav.userAgent.toLowerCase().indexOf("android") !== -1; //Android handles touch events in an odd way and it's virtually impossible to "feature test" so we resort to UA sniffing

    _isTouchDevice = "ontouchstart" in _docElement && "orientation" in _win || nav && (nav.MaxTouchPoints > 0 || nav.msMaxTouchPoints > 0);

    _addPaddingBR = function () {
      //this function is in charge of analyzing browser behavior related to padding. It sets the _addPaddingBR to true if the browser doesn't normally factor in the bottom or right padding on the element inside the scrolling area, and it sets _addPaddingLeft to true if it's a browser that requires the extra offset (offsetLeft) to be added to the paddingRight (like Opera).
      var div = _createElement("div"),
          child = _createElement("div"),
          childStyle = child.style,
          parent = _body,
          val;

      childStyle.display = "inline-block";
      childStyle.position = "relative";
      div.style.cssText = child.innerHTML = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden";
      div.appendChild(child);
      parent.appendChild(div);
      val = child.offsetHeight + 18 > div.scrollHeight; //div.scrollHeight should be child.offsetHeight + 20 because of the 10px of padding on each side, but some browsers ignore one side. We allow a 2px margin of error.

      parent.removeChild(div);
      return val;
    }();

    _touchEventLookup = function (types) {
      //we create an object that makes it easy to translate touch event types into their "pointer" counterparts if we're in a browser that uses those instead. Like IE10 uses "MSPointerDown" instead of "touchstart", for example.
      var standard = types.split(","),
          converted = ("onpointerdown" in _tempDiv ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in _tempDiv ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : types).split(","),
          obj = {},
          i = 4;

      while (--i > -1) {
        obj[standard[i]] = converted[i];
        obj[converted[i]] = standard[i];
      } //to avoid problems in iOS 9, test to see if the browser supports the "passive" option on addEventListener().


      try {
        _docElement.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function get() {
            _supportsPassive = 1;
          }
        }));
      } catch (e) {}

      return obj;
    }("touchstart,touchmove,touchend,touchcancel");

    _addListener(_doc, "touchcancel", _emptyFunc); //some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document. Very strange indeed.


    _addListener(_win, "touchmove", _emptyFunc); //works around Safari bugs that still allow the page to scroll even when we preventDefault() on the touchmove event.


    _body && _body.addEventListener("touchstart", _emptyFunc); //works around Safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/

    _addListener(_doc, "contextmenu", function () {
      for (var p in _lookup) {
        if (_lookup[p].isPressed) {
          _lookup[p].endDrag();
        }
      }
    });

    gsap = _coreInitted = _getGSAP();
  }

  if (gsap) {
    InertiaPlugin = gsap.plugins.inertia;
    _checkPrefix = gsap.utils.checkPrefix;
    _transformProp = _checkPrefix(_transformProp);
    _transformOriginProp = _checkPrefix(_transformOriginProp);
    _toArray = gsap.utils.toArray;
    _supports3D = !!_checkPrefix("perspective");
  } else if (required) {
    console.warn("Please gsap.registerPlugin(Draggable)");
  }
};

var EventDispatcher = /*#__PURE__*/function () {
  function EventDispatcher(target) {
    this._listeners = {};
    this.target = target || this;
  }

  var _proto = EventDispatcher.prototype;

  _proto.addEventListener = function addEventListener(type, callback) {
    var list = this._listeners[type] || (this._listeners[type] = []);

    if (!~list.indexOf(callback)) {
      list.push(callback);
    }
  };

  _proto.removeEventListener = function removeEventListener(type, callback) {
    var list = this._listeners[type],
        i = list && list.indexOf(callback) || -1;
    i > -1 && list.splice(i, 1);
  };

  _proto.dispatchEvent = function dispatchEvent(type) {
    var _this = this;

    var result;
    (this._listeners[type] || []).forEach(function (callback) {
      return callback.call(_this, {
        type: type,
        target: _this.target
      }) === false && (result = false);
    });
    return result; //if any of the callbacks return false, pass that along.
  };

  return EventDispatcher;
}();

var Draggable = /*#__PURE__*/function (_EventDispatcher) {
  _inheritsLoose(Draggable, _EventDispatcher);

  function Draggable(target, vars) {
    var _this2;

    _this2 = _EventDispatcher.call(this) || this;

    if (!gsap) {
      _initCore(1);
    }

    target = _toArray(target)[0]; //in case the target is a selector object or selector text

    if (!InertiaPlugin) {
      InertiaPlugin = gsap.plugins.inertia;
    }

    _this2.vars = vars = _copy(vars || {});
    _this2.target = target;
    _this2.x = _this2.y = _this2.rotation = 0;
    _this2.dragResistance = parseFloat(vars.dragResistance) || 0;
    _this2.edgeResistance = isNaN(vars.edgeResistance) ? 1 : parseFloat(vars.edgeResistance) || 0;
    _this2.lockAxis = vars.lockAxis;
    _this2.autoScroll = vars.autoScroll || 0;
    _this2.lockedAxis = null;
    _this2.allowEventDefault = !!vars.allowEventDefault;
    gsap.getProperty(target, "x"); // to ensure that transforms are instantiated.

    var type = (vars.type || "x,y").toLowerCase(),
        xyMode = ~type.indexOf("x") || ~type.indexOf("y"),
        rotationMode = type.indexOf("rotation") !== -1,
        xProp = rotationMode ? "rotation" : xyMode ? "x" : "left",
        yProp = xyMode ? "y" : "top",
        allowX = !!(~type.indexOf("x") || ~type.indexOf("left") || type === "scroll"),
        allowY = !!(~type.indexOf("y") || ~type.indexOf("top") || type === "scroll"),
        minimumMovement = vars.minimumMovement || 2,
        self = _assertThisInitialized(_this2),
        triggers = _toArray(vars.trigger || vars.handle || target),
        killProps = {},
        dragEndTime = 0,
        checkAutoScrollBounds = false,
        autoScrollMarginTop = vars.autoScrollMarginTop || 40,
        autoScrollMarginRight = vars.autoScrollMarginRight || 40,
        autoScrollMarginBottom = vars.autoScrollMarginBottom || 40,
        autoScrollMarginLeft = vars.autoScrollMarginLeft || 40,
        isClickable = vars.clickableTest || _isClickable,
        clickTime = 0,
        gsCache = target._gsap || gsap.core.getCache(target),
        isFixed = _isFixed(target),
        getPropAsNum = function getPropAsNum(property, unit) {
      return parseFloat(gsCache.get(target, property, unit));
    },
        ownerDoc = target.ownerDocument || _doc,
        enabled,
        scrollProxy,
        startPointerX,
        startPointerY,
        startElementX,
        startElementY,
        hasBounds,
        hasDragCallback,
        hasMoveCallback,
        maxX,
        minX,
        maxY,
        minY,
        touch,
        touchID,
        rotationOrigin,
        dirty,
        old,
        snapX,
        snapY,
        snapXY,
        isClicking,
        touchEventTarget,
        matrix,
        interrupted,
        allowNativeTouchScrolling,
        touchDragAxis,
        isDispatching,
        clickDispatch,
        trustedClickDispatch,
        isPreventingDefault,
        onContextMenu = function onContextMenu(e) {
      //used to prevent long-touch from triggering a context menu.
      // (self.isPressed && e.which < 2) && self.endDrag() // previously ended drag when context menu was triggered, but instead we should just stop propagation and prevent the default event behavior.
      _preventDefault(e);

      e.stopImmediatePropagation && e.stopImmediatePropagation();
      return false;
    },
        //this method gets called on every tick of TweenLite.ticker which allows us to synchronize the renders to the core engine (which is typically synchronized with the display refresh via requestAnimationFrame). This is an optimization - it's better than applying the values inside the "mousemove" or "touchmove" event handler which may get called many times inbetween refreshes.
    render = function render(suppressEvents) {
      if (self.autoScroll && self.isDragging && (checkAutoScrollBounds || dirty)) {
        var e = target,
            autoScrollFactor = self.autoScroll * 15,
            //multiplying by 15 just gives us a better "feel" speed-wise.
        parent,
            isRoot,
            rect,
            pointerX,
            pointerY,
            changeX,
            changeY,
            gap;
        checkAutoScrollBounds = false;
        _windowProxy.scrollTop = _win.pageYOffset != null ? _win.pageYOffset : ownerDoc.documentElement.scrollTop != null ? ownerDoc.documentElement.scrollTop : ownerDoc.body.scrollTop;
        _windowProxy.scrollLeft = _win.pageXOffset != null ? _win.pageXOffset : ownerDoc.documentElement.scrollLeft != null ? ownerDoc.documentElement.scrollLeft : ownerDoc.body.scrollLeft;
        pointerX = self.pointerX - _windowProxy.scrollLeft;
        pointerY = self.pointerY - _windowProxy.scrollTop;

        while (e && !isRoot) {
          //walk up the chain and sense wherever the pointer is within 40px of an edge that's scrollable.
          isRoot = _isRoot(e.parentNode);
          parent = isRoot ? _windowProxy : e.parentNode;
          rect = isRoot ? {
            bottom: Math.max(_docElement.clientHeight, _win.innerHeight || 0),
            right: Math.max(_docElement.clientWidth, _win.innerWidth || 0),
            left: 0,
            top: 0
          } : parent.getBoundingClientRect();
          changeX = changeY = 0;

          if (allowY) {
            gap = parent._gsMaxScrollY - parent.scrollTop;

            if (gap < 0) {
              changeY = gap;
            } else if (pointerY > rect.bottom - autoScrollMarginBottom && gap) {
              checkAutoScrollBounds = true;
              changeY = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.bottom - pointerY) / autoScrollMarginBottom) | 0);
            } else if (pointerY < rect.top + autoScrollMarginTop && parent.scrollTop) {
              checkAutoScrollBounds = true;
              changeY = -Math.min(parent.scrollTop, autoScrollFactor * (1 - Math.max(0, pointerY - rect.top) / autoScrollMarginTop) | 0);
            }

            if (changeY) {
              parent.scrollTop += changeY;
            }
          }

          if (allowX) {
            gap = parent._gsMaxScrollX - parent.scrollLeft;

            if (gap < 0) {
              changeX = gap;
            } else if (pointerX > rect.right - autoScrollMarginRight && gap) {
              checkAutoScrollBounds = true;
              changeX = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.right - pointerX) / autoScrollMarginRight) | 0);
            } else if (pointerX < rect.left + autoScrollMarginLeft && parent.scrollLeft) {
              checkAutoScrollBounds = true;
              changeX = -Math.min(parent.scrollLeft, autoScrollFactor * (1 - Math.max(0, pointerX - rect.left) / autoScrollMarginLeft) | 0);
            }

            if (changeX) {
              parent.scrollLeft += changeX;
            }
          }

          if (isRoot && (changeX || changeY)) {
            _win.scrollTo(parent.scrollLeft, parent.scrollTop);

            setPointerPosition(self.pointerX + changeX, self.pointerY + changeY);
          }

          e = parent;
        }
      }

      if (dirty) {
        var x = self.x,
            y = self.y;

        if (rotationMode) {
          self.deltaX = x - parseFloat(gsCache.rotation);
          self.rotation = x;
          gsCache.rotation = x + "deg";
          gsCache.renderTransform(1, gsCache);
        } else {
          if (scrollProxy) {
            if (allowY) {
              self.deltaY = y - scrollProxy.top();
              scrollProxy.top(y);
            }

            if (allowX) {
              self.deltaX = x - scrollProxy.left();
              scrollProxy.left(x);
            }
          } else if (xyMode) {
            if (allowY) {
              self.deltaY = y - parseFloat(gsCache.y);
              gsCache.y = y + "px";
            }

            if (allowX) {
              self.deltaX = x - parseFloat(gsCache.x);
              gsCache.x = x + "px";
            }

            gsCache.renderTransform(1, gsCache);
          } else {
            if (allowY) {
              self.deltaY = y - parseFloat(target.style.top || 0);
              target.style.top = y + "px";
            }

            if (allowX) {
              self.deltaY = x - parseFloat(target.style.left || 0);
              target.style.left = x + "px";
            }
          }
        }

        if (hasDragCallback && !suppressEvents && !isDispatching) {
          isDispatching = true; //in case onDrag has an update() call (avoid endless loop)

          if (_dispatchEvent(self, "drag", "onDrag") === false) {
            if (allowX) {
              self.x -= self.deltaX;
            }

            if (allowY) {
              self.y -= self.deltaY;
            }

            render(true);
          }

          isDispatching = false;
        }
      }

      dirty = false;
    },
        //copies the x/y from the element (whether that be transforms, top/left, or ScrollProxy's top/left) to the Draggable's x and y (and rotation if necessary) properties so that they reflect reality and it also (optionally) applies any snapping necessary. This is used by the InertiaPlugin tween in an onUpdate to ensure things are synced and snapped.
    syncXY = function syncXY(skipOnUpdate, skipSnap) {
      var x = self.x,
          y = self.y,
          snappedValue,
          cs;

      if (!target._gsap) {
        //just in case the _gsap cache got wiped, like if the user called clearProps on the transform or something (very rare).
        gsCache = gsap.core.getCache(target);
      }

      if (xyMode) {
        self.x = parseFloat(gsCache.x);
        self.y = parseFloat(gsCache.y);
      } else if (rotationMode) {
        self.x = self.rotation = parseFloat(gsCache.rotation);
      } else if (scrollProxy) {
        self.y = scrollProxy.top();
        self.x = scrollProxy.left();
      } else {
        self.y = parseInt(target.style.top || (cs = _getComputedStyle(target)) && cs.top, 10) || 0;
        self.x = parseInt(target.style.left || (cs || {}).left, 10) || 0;
      }

      if ((snapX || snapY || snapXY) && !skipSnap && (self.isDragging || self.isThrowing)) {
        if (snapXY) {
          _temp1.x = self.x;
          _temp1.y = self.y;
          snappedValue = snapXY(_temp1);

          if (snappedValue.x !== self.x) {
            self.x = snappedValue.x;
            dirty = true;
          }

          if (snappedValue.y !== self.y) {
            self.y = snappedValue.y;
            dirty = true;
          }
        }

        if (snapX) {
          snappedValue = snapX(self.x);

          if (snappedValue !== self.x) {
            self.x = snappedValue;

            if (rotationMode) {
              self.rotation = snappedValue;
            }

            dirty = true;
          }
        }

        if (snapY) {
          snappedValue = snapY(self.y);

          if (snappedValue !== self.y) {
            self.y = snappedValue;
          }

          dirty = true;
        }
      }

      if (dirty) {
        render(true);
      }

      if (!skipOnUpdate) {
        self.deltaX = self.x - x;
        self.deltaY = self.y - y;

        _dispatchEvent(self, "throwupdate", "onThrowUpdate");
      }
    },
        buildSnapFunc = function buildSnapFunc(snap, min, max, factor) {
      if (min == null) {
        min = -_bigNum;
      }

      if (max == null) {
        max = _bigNum;
      }

      if (_isFunction(snap)) {
        return function (n) {
          var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

          return snap.call(self, n > max ? max + (n - max) * edgeTolerance : n < min ? min + (n - min) * edgeTolerance : n) * factor;
        };
      }

      if (_isArray(snap)) {
        return function (n) {
          var i = snap.length,
              closest = 0,
              absDif = _bigNum,
              val,
              dif;

          while (--i > -1) {
            val = snap[i];
            dif = val - n;

            if (dif < 0) {
              dif = -dif;
            }

            if (dif < absDif && val >= min && val <= max) {
              closest = i;
              absDif = dif;
            }
          }

          return snap[closest];
        };
      }

      return isNaN(snap) ? function (n) {
        return n;
      } : function () {
        return snap * factor;
      };
    },
        buildPointSnapFunc = function buildPointSnapFunc(snap, minX, maxX, minY, maxY, radius, factor) {
      radius = radius && radius < _bigNum ? radius * radius : _bigNum; //so we don't have to Math.sqrt() in the functions. Performance optimization.

      if (_isFunction(snap)) {
        return function (point) {
          var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance,
              x = point.x,
              y = point.y,
              result,
              dx,
              dy; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

          point.x = x = x > maxX ? maxX + (x - maxX) * edgeTolerance : x < minX ? minX + (x - minX) * edgeTolerance : x;
          point.y = y = y > maxY ? maxY + (y - maxY) * edgeTolerance : y < minY ? minY + (y - minY) * edgeTolerance : y;
          result = snap.call(self, point);

          if (result !== point) {
            point.x = result.x;
            point.y = result.y;
          }

          if (factor !== 1) {
            point.x *= factor;
            point.y *= factor;
          }

          if (radius < _bigNum) {
            dx = point.x - x;
            dy = point.y - y;

            if (dx * dx + dy * dy > radius) {
              point.x = x;
              point.y = y;
            }
          }

          return point;
        };
      }

      if (_isArray(snap)) {
        return function (p) {
          var i = snap.length,
              closest = 0,
              minDist = _bigNum,
              x,
              y,
              point,
              dist;

          while (--i > -1) {
            point = snap[i];
            x = point.x - p.x;
            y = point.y - p.y;
            dist = x * x + y * y;

            if (dist < minDist) {
              closest = i;
              minDist = dist;
            }
          }

          return minDist <= radius ? snap[closest] : p;
        };
      }

      return function (n) {
        return n;
      };
    },
        calculateBounds = function calculateBounds() {
      var bounds, targetBounds, snap, snapIsRaw;
      hasBounds = false;

      if (scrollProxy) {
        scrollProxy.calibrate();
        self.minX = minX = -scrollProxy.maxScrollLeft();
        self.minY = minY = -scrollProxy.maxScrollTop();
        self.maxX = maxX = self.maxY = maxY = 0;
        hasBounds = true;
      } else if (!!vars.bounds) {
        bounds = _getBounds(vars.bounds, target.parentNode); //could be a selector/jQuery object or a DOM element or a generic object like {top:0, left:100, width:1000, height:800} or {minX:100, maxX:1100, minY:0, maxY:800}

        if (rotationMode) {
          self.minX = minX = bounds.left;
          self.maxX = maxX = bounds.left + bounds.width;
          self.minY = minY = self.maxY = maxY = 0;
        } else if (!_isUndefined(vars.bounds.maxX) || !_isUndefined(vars.bounds.maxY)) {
          bounds = vars.bounds;
          self.minX = minX = bounds.minX;
          self.minY = minY = bounds.minY;
          self.maxX = maxX = bounds.maxX;
          self.maxY = maxY = bounds.maxY;
        } else {
          targetBounds = _getBounds(target, target.parentNode);
          self.minX = minX = Math.round(getPropAsNum(xProp, "px") + bounds.left - targetBounds.left - 0.5);
          self.minY = minY = Math.round(getPropAsNum(yProp, "px") + bounds.top - targetBounds.top - 0.5);
          self.maxX = maxX = Math.round(minX + (bounds.width - targetBounds.width));
          self.maxY = maxY = Math.round(minY + (bounds.height - targetBounds.height));
        }

        if (minX > maxX) {
          self.minX = maxX;
          self.maxX = maxX = minX;
          minX = self.minX;
        }

        if (minY > maxY) {
          self.minY = maxY;
          self.maxY = maxY = minY;
          minY = self.minY;
        }

        if (rotationMode) {
          self.minRotation = minX;
          self.maxRotation = maxX;
        }

        hasBounds = true;
      }

      if (vars.liveSnap) {
        snap = vars.liveSnap === true ? vars.snap || {} : vars.liveSnap;
        snapIsRaw = _isArray(snap) || _isFunction(snap);

        if (rotationMode) {
          snapX = buildSnapFunc(snapIsRaw ? snap : snap.rotation, minX, maxX, 1);
          snapY = null;
        } else {
          if (snap.points) {
            snapXY = buildPointSnapFunc(snapIsRaw ? snap : snap.points, minX, maxX, minY, maxY, snap.radius, scrollProxy ? -1 : 1);
          } else {
            if (allowX) {
              snapX = buildSnapFunc(snapIsRaw ? snap : snap.x || snap.left || snap.scrollLeft, minX, maxX, scrollProxy ? -1 : 1);
            }

            if (allowY) {
              snapY = buildSnapFunc(snapIsRaw ? snap : snap.y || snap.top || snap.scrollTop, minY, maxY, scrollProxy ? -1 : 1);
            }
          }
        }
      }
    },
        onThrowComplete = function onThrowComplete() {
      self.isThrowing = false;

      _dispatchEvent(self, "throwcomplete", "onThrowComplete");
    },
        onThrowInterrupt = function onThrowInterrupt() {
      self.isThrowing = false;
    },
        animate = function animate(inertia, forceZeroVelocity) {
      var snap, snapIsRaw, tween, overshootTolerance;

      if (inertia && InertiaPlugin) {
        if (inertia === true) {
          snap = vars.snap || vars.liveSnap || {};
          snapIsRaw = _isArray(snap) || _isFunction(snap);
          inertia = {
            resistance: (vars.throwResistance || vars.resistance || 1000) / (rotationMode ? 10 : 1)
          };

          if (rotationMode) {
            inertia.rotation = _parseInertia(self, snapIsRaw ? snap : snap.rotation, maxX, minX, 1, forceZeroVelocity);
          } else {
            if (allowX) {
              inertia[xProp] = _parseInertia(self, snapIsRaw ? snap : snap.points || snap.x || snap.left, maxX, minX, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "x");
            }

            if (allowY) {
              inertia[yProp] = _parseInertia(self, snapIsRaw ? snap : snap.points || snap.y || snap.top, maxY, minY, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "y");
            }

            if (snap.points || _isArray(snap) && _isObject(snap[0])) {
              inertia.linkedProps = xProp + "," + yProp;
              inertia.radius = snap.radius; //note: we also disable liveSnapping while throwing if there's a "radius" defined, otherwise it looks weird to have the item thrown past a snapping point but live-snapping mid-tween. We do this by altering the onUpdateParams so that "skipSnap" parameter is true for syncXY.
            }
          }
        }

        self.isThrowing = true;
        overshootTolerance = !isNaN(vars.overshootTolerance) ? vars.overshootTolerance : vars.edgeResistance === 1 ? 0 : 1 - self.edgeResistance + 0.2;

        if (!inertia.duration) {
          inertia.duration = {
            max: Math.max(vars.minDuration || 0, "maxDuration" in vars ? vars.maxDuration : 2),
            min: !isNaN(vars.minDuration) ? vars.minDuration : overshootTolerance === 0 || _isObject(inertia) && inertia.resistance > 1000 ? 0 : 0.5,
            overshoot: overshootTolerance
          };
        }

        self.tween = tween = gsap.to(scrollProxy || target, {
          inertia: inertia,
          data: "_draggable",
          onComplete: onThrowComplete,
          onInterrupt: onThrowInterrupt,
          onUpdate: vars.fastMode ? _dispatchEvent : syncXY,
          onUpdateParams: vars.fastMode ? [self, "onthrowupdate", "onThrowUpdate"] : snap && snap.radius ? [false, true] : []
        });

        if (!vars.fastMode) {
          if (scrollProxy) {
            scrollProxy._skip = true; // Microsoft browsers have a bug that causes them to briefly render the position incorrectly (it flashes to the end state when we seek() the tween even though we jump right back to the current position, and this only seems to happen when we're affecting both top and left), so we set a _suspendTransforms flag to prevent it from actually applying the values in the ScrollProxy.
          }

          tween.render(1e9, true, true); // force to the end. Remember, the duration will likely change upon initting because that's when InertiaPlugin calculates it.

          syncXY(true, true);
          self.endX = self.x;
          self.endY = self.y;

          if (rotationMode) {
            self.endRotation = self.x;
          }

          tween.play(0);
          syncXY(true, true);

          if (scrollProxy) {
            scrollProxy._skip = false; //Microsoft browsers have a bug that causes them to briefly render the position incorrectly (it flashes to the end state when we seek() the tween even though we jump right back to the current position, and this only seems to happen when we're affecting both top and left), so we set a _suspendTransforms flag to prevent it from actually applying the values in the ScrollProxy.
          }
        }
      } else if (hasBounds) {
        self.applyBounds();
      }
    },
        updateMatrix = function updateMatrix(shiftStart) {
      var start = matrix,
          p;
      matrix = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["getGlobalMatrix"])(target.parentNode, true);

      if (shiftStart && self.isPressed && !matrix.equals(start || new _utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["Matrix2D"]())) {
        //if the matrix changes WHILE the element is pressed, we must adjust the startPointerX and startPointerY accordingly, so we invert the original matrix and figure out where the pointerX and pointerY were in the global space, then apply the new matrix to get the updated coordinates.
        p = start.inverse().apply({
          x: startPointerX,
          y: startPointerY
        });
        matrix.apply(p, p);
        startPointerX = p.x;
        startPointerY = p.y;
      }

      if (matrix.equals(_identityMatrix)) {
        //if there are no transforms, we can optimize performance by not factoring in the matrix
        matrix = null;
      }
    },
        recordStartPositions = function recordStartPositions() {
      var edgeTolerance = 1 - self.edgeResistance,
          offsetX = isFixed ? _getDocScrollLeft(ownerDoc) : 0,
          offsetY = isFixed ? _getDocScrollTop(ownerDoc) : 0,
          parsedOrigin,
          x,
          y;
      updateMatrix(false);

      if (matrix) {
        _point1.x = self.pointerX - offsetX;
        _point1.y = self.pointerY - offsetY;
        matrix.apply(_point1, _point1);
        startPointerX = _point1.x; //translate to local coordinate system

        startPointerY = _point1.y;
      }

      if (dirty) {
        setPointerPosition(self.pointerX, self.pointerY);
        render(true);
      }

      if (scrollProxy) {
        calculateBounds();
        startElementY = scrollProxy.top();
        startElementX = scrollProxy.left();
      } else {
        //if the element is in the process of tweening, don't force snapping to occur because it could make it jump. Imagine the user throwing, then before it's done, clicking on the element in its inbetween state.
        if (isTweening()) {
          syncXY(true, true);
          calculateBounds();
        } else {
          self.applyBounds();
        }

        if (rotationMode) {
          parsedOrigin = target.ownerSVGElement ? [gsCache.xOrigin - target.getBBox().x, gsCache.yOrigin - target.getBBox().y] : (_getComputedStyle(target)[_transformOriginProp] || "0 0").split(" ");
          rotationOrigin = self.rotationOrigin = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_0__["getGlobalMatrix"])(target).apply({
            x: parseFloat(parsedOrigin[0]) || 0,
            y: parseFloat(parsedOrigin[1]) || 0
          });
          syncXY(true, true);
          x = self.pointerX - rotationOrigin.x - offsetX;
          y = rotationOrigin.y - self.pointerY + offsetY;
          startElementX = self.x; //starting rotation (x always refers to rotation in type:"rotation", measured in degrees)

          startElementY = self.y = Math.atan2(y, x) * _RAD2DEG;
        } else {
          //parent = !isFixed && target.parentNode;
          //startScrollTop = parent ? parent.scrollTop || 0 : 0;
          //startScrollLeft = parent ? parent.scrollLeft || 0 : 0;
          startElementY = getPropAsNum(yProp, "px"); //record the starting top and left values so that we can just add the mouse's movement to them later.

          startElementX = getPropAsNum(xProp, "px");
        }
      }

      if (hasBounds && edgeTolerance) {
        if (startElementX > maxX) {
          startElementX = maxX + (startElementX - maxX) / edgeTolerance;
        } else if (startElementX < minX) {
          startElementX = minX - (minX - startElementX) / edgeTolerance;
        }

        if (!rotationMode) {
          if (startElementY > maxY) {
            startElementY = maxY + (startElementY - maxY) / edgeTolerance;
          } else if (startElementY < minY) {
            startElementY = minY - (minY - startElementY) / edgeTolerance;
          }
        }
      }

      self.startX = startElementX;
      self.startY = startElementY;
    },
        isTweening = function isTweening() {
      return self.tween && self.tween.isActive();
    },
        removePlaceholder = function removePlaceholder() {
      if (_placeholderDiv.parentNode && !isTweening() && !self.isDragging) {
        //_placeholderDiv just props open auto-scrolling containers so they don't collapse as the user drags left/up. We remove it after dragging (and throwing, if necessary) finishes.
        _placeholderDiv.parentNode.removeChild(_placeholderDiv);
      }
    },
        //called when the mouse is pressed (or touch starts)
    onPress = function onPress(e, force) {
      var i;

      if (!enabled || self.isPressed || !e || (e.type === "mousedown" || e.type === "pointerdown") && !force && _getTime() - clickTime < 30 && _touchEventLookup[self.pointerEvent.type]) {
        //when we DON'T preventDefault() in order to accommodate touch-scrolling and the user just taps, many browsers also fire a mousedown/mouseup sequence AFTER the touchstart/touchend sequence, thus it'd result in two quick "click" events being dispatched. This line senses that condition and halts it on the subsequent mousedown.
        isPreventingDefault && e && enabled && _preventDefault(e); // in some browsers, we must listen for multiple event types like touchstart, pointerdown, mousedown. The first time this function is called, we record whether or not we _preventDefault() so that on duplicate calls, we can do the same if necessary.

        return;
      }

      interrupted = isTweening();
      self.pointerEvent = e;

      if (_touchEventLookup[e.type]) {
        //note: on iOS, BOTH touchmove and mousemove are dispatched, but the mousemove has pageY and pageX of 0 which would mess up the calculations and needlessly hurt performance.
        touchEventTarget = ~e.type.indexOf("touch") ? e.currentTarget || e.target : ownerDoc; //pointer-based touches (for Microsoft browsers) don't remain locked to the original target like other browsers, so we must use the document instead. The event type would be "MSPointerDown" or "pointerdown".

        _addListener(touchEventTarget, "touchend", onRelease);

        _addListener(touchEventTarget, "touchmove", onMove);

        _addListener(touchEventTarget, "touchcancel", onRelease);

        _addListener(ownerDoc, "touchstart", _onMultiTouchDocument);
      } else {
        touchEventTarget = null;

        _addListener(ownerDoc, "mousemove", onMove); //attach these to the document instead of the box itself so that if the user's mouse moves too quickly (and off of the box), things still work.

      }

      touchDragAxis = null;

      if (!_supportsPointer || !touchEventTarget) {
        _addListener(ownerDoc, "mouseup", onRelease);

        if (e && e.target) {
          _addListener(e.target, "mouseup", onRelease); //we also have to listen directly on the element because some browsers don't bubble up the event to the _doc on elements with contentEditable="true"

        }
      }

      isClicking = isClickable.call(self, e.target) && vars.dragClickables === false && !force;

      if (isClicking) {
        _addListener(e.target, "change", onRelease); //in some browsers, when you mousedown on a <select> element, no mouseup gets dispatched! So we listen for a "change" event instead.


        _dispatchEvent(self, "pressInit", "onPressInit");

        _dispatchEvent(self, "press", "onPress");

        _setSelectable(triggers, true); //accommodates things like inputs and elements with contentEditable="true" (otherwise user couldn't drag to select text)


        return;
      }

      allowNativeTouchScrolling = !touchEventTarget || allowX === allowY || self.vars.allowNativeTouchScrolling === false || self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2) ? false : allowX ? "y" : "x"; //note: in Chrome, right-clicking (for a context menu) fires onPress and it doesn't have the event.which set properly, so we must look for event.ctrlKey. If the user wants to allow context menus we should of course sense it here and not allow native touch scrolling.

      isPreventingDefault = !allowNativeTouchScrolling && !self.allowEventDefault;

      if (isPreventingDefault) {
        _preventDefault(e);

        _addListener(_win, "touchforcechange", _preventDefault); //works around safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/

      }

      if (e.changedTouches) {
        //touch events store the data slightly differently
        e = touch = e.changedTouches[0];
        touchID = e.identifier;
      } else if (e.pointerId) {
        touchID = e.pointerId; //for some Microsoft browsers
      } else {
        touch = touchID = null;
      }

      _dragCount++;

      _addToRenderQueue(render); //causes the Draggable to render on each "tick" of TweenLite.ticker (performance optimization - updating values in a mousemove can cause them to happen too frequently, like multiple times between frame redraws which is wasteful, and it also prevents values from updating properly in IE8)


      startPointerY = self.pointerY = e.pageY; //record the starting x and y so that we can calculate the movement from the original in _onMouseMove

      startPointerX = self.pointerX = e.pageX;

      _dispatchEvent(self, "pressInit", "onPressInit");

      if (allowNativeTouchScrolling || self.autoScroll) {
        _recordMaxScrolls(target.parentNode);
      }

      if (target.parentNode && self.autoScroll && !scrollProxy && !rotationMode && target.parentNode._gsMaxScrollX && !_placeholderDiv.parentNode && !target.getBBox) {
        //add a placeholder div to prevent the parent container from collapsing when the user drags the element left.
        _placeholderDiv.style.width = target.parentNode.scrollWidth + "px";
        target.parentNode.appendChild(_placeholderDiv);
      }

      recordStartPositions();
      self.tween && self.tween.kill();
      self.isThrowing = false;
      gsap.killTweensOf(scrollProxy || target, killProps, true); //in case the user tries to drag it before the last tween is done.

      scrollProxy && gsap.killTweensOf(target, {
        scrollTo: 1
      }, true); //just in case the original target's scroll position is being tweened somewhere else.

      self.tween = self.lockedAxis = null;

      if (vars.zIndexBoost || !rotationMode && !scrollProxy && vars.zIndexBoost !== false) {
        target.style.zIndex = Draggable.zIndex++;
      }

      self.isPressed = true;
      hasDragCallback = !!(vars.onDrag || self._listeners.drag);
      hasMoveCallback = !!(vars.onMove || self._listeners.move);

      if (!rotationMode && (vars.cursor !== false || vars.activeCursor)) {
        i = triggers.length;

        while (--i > -1) {
          //_setStyle(triggers[i], "cursor", vars.activeCursor || vars.cursor || (_defaultCursor === "grab" ? "grabbing" : _defaultCursor));
          gsap.set(triggers[i], {
            cursor: vars.activeCursor || vars.cursor || (_defaultCursor === "grab" ? "grabbing" : _defaultCursor)
          });
        }
      }

      _dispatchEvent(self, "press", "onPress");
    },
        //called every time the mouse/touch moves
    onMove = function onMove(e) {
      var originalEvent = e,
          touches,
          pointerX,
          pointerY,
          i,
          dx,
          dy;

      if (!enabled || _isMultiTouching || !self.isPressed || !e) {
        isPreventingDefault && e && enabled && _preventDefault(e); // in some browsers, we must listen for multiple event types like touchmove, pointermove, mousemove. The first time this function is called, we record whether or not we _preventDefault() so that on duplicate calls, we can do the same if necessary.

        return;
      }

      self.pointerEvent = e;
      touches = e.changedTouches;

      if (touches) {
        //touch events store the data slightly differently
        e = touches[0];

        if (e !== touch && e.identifier !== touchID) {
          //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
          i = touches.length;

          while (--i > -1 && (e = touches[i]).identifier !== touchID) {}

          if (i < 0) {
            return;
          }
        }
      } else if (e.pointerId && touchID && e.pointerId !== touchID) {
        //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
        return;
      }

      if (touchEventTarget && allowNativeTouchScrolling && !touchDragAxis) {
        //Android browsers force us to decide on the first "touchmove" event if we should allow the default (scrolling) behavior or preventDefault(). Otherwise, a "touchcancel" will be fired and then no "touchmove" or "touchend" will fire during the scrolling (no good).
        _point1.x = e.pageX;
        _point1.y = e.pageY;
        matrix && matrix.apply(_point1, _point1);
        pointerX = _point1.x;
        pointerY = _point1.y;
        dx = Math.abs(pointerX - startPointerX);
        dy = Math.abs(pointerY - startPointerY);

        if (dx !== dy && (dx > minimumMovement || dy > minimumMovement) || _isAndroid && allowNativeTouchScrolling === touchDragAxis) {
          touchDragAxis = dx > dy && allowX ? "x" : "y";

          if (allowNativeTouchScrolling && touchDragAxis !== allowNativeTouchScrolling) {
            _addListener(_win, "touchforcechange", _preventDefault); // prevents native touch scrolling from taking over if the user started dragging in the other direction in iOS Safari

          }

          if (self.vars.lockAxisOnTouchScroll !== false && allowX && allowY) {
            self.lockedAxis = touchDragAxis === "x" ? "y" : "x";
            _isFunction(self.vars.onLockAxis) && self.vars.onLockAxis.call(self, originalEvent);
          }

          if (_isAndroid && allowNativeTouchScrolling === touchDragAxis) {
            onRelease(originalEvent);
            return;
          }
        }
      }

      if (!self.allowEventDefault && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling !== touchDragAxis) && originalEvent.cancelable !== false) {
        _preventDefault(originalEvent);

        isPreventingDefault = true;
      } else if (isPreventingDefault) {
        isPreventingDefault = false;
      }

      if (self.autoScroll) {
        checkAutoScrollBounds = true;
      }

      setPointerPosition(e.pageX, e.pageY, hasMoveCallback);
    },
        setPointerPosition = function setPointerPosition(pointerX, pointerY, invokeOnMove) {
      var dragTolerance = 1 - self.dragResistance,
          edgeTolerance = 1 - self.edgeResistance,
          prevPointerX = self.pointerX,
          prevPointerY = self.pointerY,
          prevStartElementY = startElementY,
          prevX = self.x,
          prevY = self.y,
          prevEndX = self.endX,
          prevEndY = self.endY,
          prevEndRotation = self.endRotation,
          prevDirty = dirty,
          xChange,
          yChange,
          x,
          y,
          dif,
          temp;
      self.pointerX = pointerX;
      self.pointerY = pointerY;

      if (isFixed) {
        pointerX -= _getDocScrollLeft(ownerDoc);
        pointerY -= _getDocScrollTop(ownerDoc);
      }

      if (rotationMode) {
        y = Math.atan2(rotationOrigin.y - pointerY, pointerX - rotationOrigin.x) * _RAD2DEG;
        dif = self.y - y;

        if (dif > 180) {
          startElementY -= 360;
          self.y = y;
        } else if (dif < -180) {
          startElementY += 360;
          self.y = y;
        }

        if (self.x !== startElementX || Math.abs(startElementY - y) > minimumMovement) {
          self.y = y;
          x = startElementX + (startElementY - y) * dragTolerance;
        } else {
          x = startElementX;
        }
      } else {
        if (matrix) {
          temp = pointerX * matrix.a + pointerY * matrix.c + matrix.e;
          pointerY = pointerX * matrix.b + pointerY * matrix.d + matrix.f;
          pointerX = temp;
        }

        yChange = pointerY - startPointerY;
        xChange = pointerX - startPointerX;

        if (yChange < minimumMovement && yChange > -minimumMovement) {
          yChange = 0;
        }

        if (xChange < minimumMovement && xChange > -minimumMovement) {
          xChange = 0;
        }

        if ((self.lockAxis || self.lockedAxis) && (xChange || yChange)) {
          temp = self.lockedAxis;

          if (!temp) {
            self.lockedAxis = temp = allowX && Math.abs(xChange) > Math.abs(yChange) ? "y" : allowY ? "x" : null;

            if (temp && _isFunction(self.vars.onLockAxis)) {
              self.vars.onLockAxis.call(self, self.pointerEvent);
            }
          }

          if (temp === "y") {
            yChange = 0;
          } else if (temp === "x") {
            xChange = 0;
          }
        }

        x = _round(startElementX + xChange * dragTolerance);
        y = _round(startElementY + yChange * dragTolerance);
      }

      if ((snapX || snapY || snapXY) && (self.x !== x || self.y !== y && !rotationMode)) {
        if (snapXY) {
          _temp1.x = x;
          _temp1.y = y;
          temp = snapXY(_temp1);
          x = _round(temp.x);
          y = _round(temp.y);
        }

        if (snapX) {
          x = _round(snapX(x));
        }

        if (snapY) {
          y = _round(snapY(y));
        }
      } else if (hasBounds) {
        if (x > maxX) {
          x = maxX + Math.round((x - maxX) * edgeTolerance);
        } else if (x < minX) {
          x = minX + Math.round((x - minX) * edgeTolerance);
        }

        if (!rotationMode) {
          if (y > maxY) {
            y = Math.round(maxY + (y - maxY) * edgeTolerance);
          } else if (y < minY) {
            y = Math.round(minY + (y - minY) * edgeTolerance);
          }
        }
      }

      if (self.x !== x || self.y !== y && !rotationMode) {
        if (rotationMode) {
          self.endRotation = self.x = self.endX = x;
          dirty = true;
        } else {
          if (allowY) {
            self.y = self.endY = y;
            dirty = true; //a flag that indicates we need to render the target next time the TweenLite.ticker dispatches a "tick" event (typically on a requestAnimationFrame) - this is a performance optimization (we shouldn't render on every move because sometimes many move events can get dispatched between screen refreshes, and that'd be wasteful to render every time)
          }

          if (allowX) {
            self.x = self.endX = x;
            dirty = true;
          }
        }

        if (!invokeOnMove || _dispatchEvent(self, "move", "onMove") !== false) {
          if (!self.isDragging && self.isPressed) {
            self.isDragging = true;

            _dispatchEvent(self, "dragstart", "onDragStart");
          }
        } else {
          //revert because the onMove returned false!
          self.pointerX = prevPointerX;
          self.pointerY = prevPointerY;
          startElementY = prevStartElementY;
          self.x = prevX;
          self.y = prevY;
          self.endX = prevEndX;
          self.endY = prevEndY;
          self.endRotation = prevEndRotation;
          dirty = prevDirty;
        }
      }
    },
        //called when the mouse/touch is released
    onRelease = function onRelease(e, force) {
      if (!enabled || !self.isPressed || e && touchID != null && !force && (e.pointerId && e.pointerId !== touchID || e.changedTouches && !_hasTouchID(e.changedTouches, touchID))) {
        //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
        isPreventingDefault && e && enabled && _preventDefault(e); // in some browsers, we must listen for multiple event types like touchend, pointerup, mouseup. The first time this function is called, we record whether or not we _preventDefault() so that on duplicate calls, we can do the same if necessary.

        return;
      }

      self.isPressed = false;
      var originalEvent = e,
          wasDragging = self.isDragging,
          isContextMenuRelease = self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2),
          placeholderDelayedCall = gsap.delayedCall(0.001, removePlaceholder),
          touches,
          i,
          syntheticEvent,
          eventTarget,
          syntheticClick;

      if (touchEventTarget) {
        _removeListener(touchEventTarget, "touchend", onRelease);

        _removeListener(touchEventTarget, "touchmove", onMove);

        _removeListener(touchEventTarget, "touchcancel", onRelease);

        _removeListener(ownerDoc, "touchstart", _onMultiTouchDocument);
      } else {
        _removeListener(ownerDoc, "mousemove", onMove);
      }

      _removeListener(_win, "touchforcechange", _preventDefault);

      if (!_supportsPointer || !touchEventTarget) {
        _removeListener(ownerDoc, "mouseup", onRelease);

        if (e && e.target) {
          _removeListener(e.target, "mouseup", onRelease);
        }
      }

      dirty = false;

      if (isClicking && !isContextMenuRelease) {
        if (e) {
          _removeListener(e.target, "change", onRelease);

          self.pointerEvent = originalEvent;
        }

        _setSelectable(triggers, false);

        _dispatchEvent(self, "release", "onRelease");

        _dispatchEvent(self, "click", "onClick");

        isClicking = false;
        return;
      }

      _removeFromRenderQueue(render);

      if (!rotationMode) {
        i = triggers.length;

        while (--i > -1) {
          _setStyle(triggers[i], "cursor", vars.cursor || (vars.cursor !== false ? _defaultCursor : null));
        }
      }

      if (wasDragging) {
        dragEndTime = _lastDragTime = _getTime();
        self.isDragging = false;
      }

      _dragCount--;

      if (e) {
        touches = e.changedTouches;

        if (touches) {
          //touch events store the data slightly differently
          e = touches[0];

          if (e !== touch && e.identifier !== touchID) {
            //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
            i = touches.length;

            while (--i > -1 && (e = touches[i]).identifier !== touchID) {}

            if (i < 0) {
              return;
            }
          }
        }

        self.pointerEvent = originalEvent;
        self.pointerX = e.pageX;
        self.pointerY = e.pageY;
      }

      if (isContextMenuRelease && originalEvent) {
        _preventDefault(originalEvent);

        isPreventingDefault = true;

        _dispatchEvent(self, "release", "onRelease");
      } else if (originalEvent && !wasDragging) {
        isPreventingDefault = false;

        if (interrupted && (vars.snap || vars.bounds)) {
          //otherwise, if the user clicks on the object while it's animating to a snapped position, and then releases without moving 3 pixels, it will just stay there (it should animate/snap)
          animate(vars.inertia || vars.throwProps);
        }

        _dispatchEvent(self, "release", "onRelease");

        if ((!_isAndroid || originalEvent.type !== "touchmove") && originalEvent.type.indexOf("cancel") === -1) {
          //to accommodate native scrolling on Android devices, we have to immediately call onRelease() on the first touchmove event, but that shouldn't trigger a "click".
          _dispatchEvent(self, "click", "onClick");

          if (_getTime() - clickTime < 300) {
            _dispatchEvent(self, "doubleclick", "onDoubleClick");
          }

          eventTarget = originalEvent.target || target; //old IE uses srcElement

          clickTime = _getTime();

          syntheticClick = function syntheticClick() {
            // some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
            if (clickTime !== clickDispatch && self.enabled() && !self.isPressed && !originalEvent.defaultPrevented) {
              if (eventTarget.click) {
                //some browsers (like mobile Safari) don't properly trigger the click event
                eventTarget.click();
              } else if (ownerDoc.createEvent) {
                syntheticEvent = ownerDoc.createEvent("MouseEvents");
                syntheticEvent.initMouseEvent("click", true, true, _win, 1, self.pointerEvent.screenX, self.pointerEvent.screenY, self.pointerX, self.pointerY, false, false, false, false, 0, null);
                eventTarget.dispatchEvent(syntheticEvent);
              }
            }
          };

          if (!_isAndroid && !originalEvent.defaultPrevented) {
            //iOS Safari requires the synthetic click to happen immediately or else it simply won't work, but Android doesn't play nice.
            gsap.delayedCall(0.05, syntheticClick); //in addition to the iOS bug workaround, there's a Firefox issue with clicking on things like a video to play, so we must fake a click event in a slightly delayed fashion. Previously, we listened for the "click" event with "capture" false which solved the video-click-to-play issue, but it would allow the "click" event to be dispatched twice like if you were using a jQuery.click() because that was handled in the capture phase, thus we had to switch to the capture phase to avoid the double-dispatching, but do the delayed synthetic click. Don't fire it too fast (like 0.00001) because we want to give the native event a chance to fire first as it's "trusted".
          }
        }
      } else {
        animate(vars.inertia || vars.throwProps); //will skip if inertia/throwProps isn't defined or IntertiaPlugin isn't loaded.

        if (!self.allowEventDefault && originalEvent && (vars.dragClickables !== false || !isClickable.call(self, originalEvent.target)) && wasDragging && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling === touchDragAxis) && originalEvent.cancelable !== false) {
          isPreventingDefault = true;

          _preventDefault(originalEvent);
        } else {
          isPreventingDefault = false;
        }

        _dispatchEvent(self, "release", "onRelease");
      }

      isTweening() && placeholderDelayedCall.duration(self.tween.duration()); //sync the timing so that the placeholder DIV gets

      wasDragging && _dispatchEvent(self, "dragend", "onDragEnd");
      return true;
    },
        updateScroll = function updateScroll(e) {
      if (e && self.isDragging && !scrollProxy) {
        var parent = e.target || target.parentNode,
            deltaX = parent.scrollLeft - parent._gsScrollX,
            deltaY = parent.scrollTop - parent._gsScrollY;

        if (deltaX || deltaY) {
          if (matrix) {
            startPointerX -= deltaX * matrix.a + deltaY * matrix.c;
            startPointerY -= deltaY * matrix.d + deltaX * matrix.b;
          } else {
            startPointerX -= deltaX;
            startPointerY -= deltaY;
          }

          parent._gsScrollX += deltaX;
          parent._gsScrollY += deltaY;
          setPointerPosition(self.pointerX, self.pointerY);
        }
      }
    },
        onClick = function onClick(e) {
      //this was a huge pain in the neck to align all the various browsers and their behaviors. Chrome, Firefox, Safari, Opera, Android, and Microsoft Edge all handle events differently! Some will only trigger native behavior (like checkbox toggling) from trusted events. Others don't even support isTrusted, but require 2 events to flow through before triggering native behavior. Edge treats everything as trusted but also mandates that 2 flow through to trigger the correct native behavior.
      var time = _getTime(),
          recentlyClicked = time - clickTime < 40,
          recentlyDragged = time - dragEndTime < 40,
          alreadyDispatched = recentlyClicked && clickDispatch === clickTime,
          defaultPrevented = self.pointerEvent && self.pointerEvent.defaultPrevented,
          alreadyDispatchedTrusted = recentlyClicked && trustedClickDispatch === clickTime,
          trusted = e.isTrusted || e.isTrusted == null && recentlyClicked && alreadyDispatched; //note: Safari doesn't support isTrusted, and it won't properly execute native behavior (like toggling checkboxes) on the first synthetic "click" event - we must wait for the 2nd and treat it as trusted (but stop propagation at that point). Confusing, I know. Don't you love cross-browser compatibility challenges?


      if ((alreadyDispatched || recentlyDragged && self.vars.suppressClickOnDrag !== false) && e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }

      if (recentlyClicked && !(self.pointerEvent && self.pointerEvent.defaultPrevented) && (!alreadyDispatched || trusted && !alreadyDispatchedTrusted)) {
        //let the first click pass through unhindered. Let the next one only if it's trusted, then no more (stop quick-succession ones)
        if (trusted && alreadyDispatched) {
          trustedClickDispatch = clickTime;
        }

        clickDispatch = clickTime;
        return;
      }

      if (self.isPressed || recentlyDragged || recentlyClicked) {
        if (!trusted || !e.detail || !recentlyClicked || defaultPrevented) {
          _preventDefault(e);
        }
      }
    },
        localizePoint = function localizePoint(p) {
      return matrix ? {
        x: p.x * matrix.a + p.y * matrix.c + matrix.e,
        y: p.x * matrix.b + p.y * matrix.d + matrix.f
      } : {
        x: p.x,
        y: p.y
      };
    };

    old = Draggable.get(target);
    old && old.kill(); // avoids duplicates (an element can only be controlled by one Draggable)
    //give the user access to start/stop dragging...

    _this2.startDrag = function (event, align) {
      var r1, r2, p1, p2;
      onPress(event || self.pointerEvent, true); //if the pointer isn't on top of the element, adjust things accordingly

      if (align && !self.hitTest(event || self.pointerEvent)) {
        r1 = _parseRect(event || self.pointerEvent);
        r2 = _parseRect(target);
        p1 = localizePoint({
          x: r1.left + r1.width / 2,
          y: r1.top + r1.height / 2
        });
        p2 = localizePoint({
          x: r2.left + r2.width / 2,
          y: r2.top + r2.height / 2
        });
        startPointerX -= p1.x - p2.x;
        startPointerY -= p1.y - p2.y;
      }

      if (!self.isDragging) {
        self.isDragging = true;

        _dispatchEvent(self, "dragstart", "onDragStart");
      }
    };

    _this2.drag = onMove;

    _this2.endDrag = function (e) {
      return onRelease(e || self.pointerEvent, true);
    };

    _this2.timeSinceDrag = function () {
      return self.isDragging ? 0 : (_getTime() - dragEndTime) / 1000;
    };

    _this2.timeSinceClick = function () {
      return (_getTime() - clickTime) / 1000;
    };

    _this2.hitTest = function (target, threshold) {
      return Draggable.hitTest(self.target, target, threshold);
    };

    _this2.getDirection = function (from, diagonalThreshold) {
      //from can be "start" (default), "velocity", or an element
      var mode = from === "velocity" && InertiaPlugin ? from : _isObject(from) && !rotationMode ? "element" : "start",
          xChange,
          yChange,
          ratio,
          direction,
          r1,
          r2;

      if (mode === "element") {
        r1 = _parseRect(self.target);
        r2 = _parseRect(from);
      }

      xChange = mode === "start" ? self.x - startElementX : mode === "velocity" ? InertiaPlugin.getVelocity(target, xProp) : r1.left + r1.width / 2 - (r2.left + r2.width / 2);

      if (rotationMode) {
        return xChange < 0 ? "counter-clockwise" : "clockwise";
      } else {
        diagonalThreshold = diagonalThreshold || 2;
        yChange = mode === "start" ? self.y - startElementY : mode === "velocity" ? InertiaPlugin.getVelocity(target, yProp) : r1.top + r1.height / 2 - (r2.top + r2.height / 2);
        ratio = Math.abs(xChange / yChange);
        direction = ratio < 1 / diagonalThreshold ? "" : xChange < 0 ? "left" : "right";

        if (ratio < diagonalThreshold) {
          if (direction !== "") {
            direction += "-";
          }

          direction += yChange < 0 ? "up" : "down";
        }
      }

      return direction;
    };

    _this2.applyBounds = function (newBounds, sticky) {
      var x, y, forceZeroVelocity, e, parent, isRoot;

      if (newBounds && vars.bounds !== newBounds) {
        vars.bounds = newBounds;
        return self.update(true, sticky);
      }

      syncXY(true);
      calculateBounds();

      if (hasBounds && !isTweening()) {
        x = self.x;
        y = self.y;

        if (x > maxX) {
          x = maxX;
        } else if (x < minX) {
          x = minX;
        }

        if (y > maxY) {
          y = maxY;
        } else if (y < minY) {
          y = minY;
        }

        if (self.x !== x || self.y !== y) {
          forceZeroVelocity = true;
          self.x = self.endX = x;

          if (rotationMode) {
            self.endRotation = x;
          } else {
            self.y = self.endY = y;
          }

          dirty = true;
          render(true);

          if (self.autoScroll && !self.isDragging) {
            _recordMaxScrolls(target.parentNode);

            e = target;
            _windowProxy.scrollTop = _win.pageYOffset != null ? _win.pageYOffset : ownerDoc.documentElement.scrollTop != null ? ownerDoc.documentElement.scrollTop : ownerDoc.body.scrollTop;
            _windowProxy.scrollLeft = _win.pageXOffset != null ? _win.pageXOffset : ownerDoc.documentElement.scrollLeft != null ? ownerDoc.documentElement.scrollLeft : ownerDoc.body.scrollLeft;

            while (e && !isRoot) {
              //walk up the chain and sense wherever the scrollTop/scrollLeft exceeds the maximum.
              isRoot = _isRoot(e.parentNode);
              parent = isRoot ? _windowProxy : e.parentNode;

              if (allowY && parent.scrollTop > parent._gsMaxScrollY) {
                parent.scrollTop = parent._gsMaxScrollY;
              }

              if (allowX && parent.scrollLeft > parent._gsMaxScrollX) {
                parent.scrollLeft = parent._gsMaxScrollX;
              }

              e = parent;
            }
          }
        }

        if (self.isThrowing && (forceZeroVelocity || self.endX > maxX || self.endX < minX || self.endY > maxY || self.endY < minY)) {
          animate(vars.inertia || vars.throwProps, forceZeroVelocity);
        }
      }

      return self;
    };

    _this2.update = function (applyBounds, sticky, ignoreExternalChanges) {
      var x = self.x,
          y = self.y;
      updateMatrix(!sticky);

      if (applyBounds) {
        self.applyBounds();
      } else {
        if (dirty && ignoreExternalChanges) {
          render(true);
        }

        syncXY(true);
      }

      if (sticky) {
        setPointerPosition(self.pointerX, self.pointerY);
        dirty && render(true);
      }

      if (self.isPressed && !sticky && (allowX && Math.abs(x - self.x) > 0.01 || allowY && Math.abs(y - self.y) > 0.01 && !rotationMode)) {
        recordStartPositions();
      }

      if (self.autoScroll) {
        _recordMaxScrolls(target.parentNode, self.isDragging);

        checkAutoScrollBounds = self.isDragging;
        render(true); //in case reparenting occurred.

        _removeScrollListener(target, updateScroll);

        _addScrollListener(target, updateScroll);
      }

      return self;
    };

    _this2.enable = function (type) {
      var setVars = {
        lazy: true
      },
          id,
          i,
          trigger;

      if (!rotationMode && vars.cursor !== false) {
        setVars.cursor = vars.cursor || _defaultCursor;
      }

      if (gsap.utils.checkPrefix("touchCallout")) {
        setVars.touchCallout = "none";
      }

      setVars.touchAction = allowX === allowY ? "none" : vars.allowNativeTouchScrolling || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x";

      if (type !== "soft") {
        i = triggers.length;

        while (--i > -1) {
          trigger = triggers[i];
          _supportsPointer || _addListener(trigger, "mousedown", onPress);

          _addListener(trigger, "touchstart", onPress);

          _addListener(trigger, "click", onClick, true); //note: used to pass true for capture but it prevented click-to-play-video functionality in Firefox.


          gsap.set(trigger, setVars);

          if (trigger.getBBox && trigger.ownerSVGElement) {
            // a bug in chrome doesn't respect touch-action on SVG elements - it only works if we set it on the parent SVG.
            gsap.set(trigger.ownerSVGElement, {
              touchAction: allowX === allowY ? "none" : vars.allowNativeTouchScrolling || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x"
            });
          }

          vars.allowContextMenu || _addListener(trigger, "contextmenu", onContextMenu);
        }

        _setSelectable(triggers, false);
      }

      _addScrollListener(target, updateScroll);

      enabled = true;

      if (InertiaPlugin && type !== "soft") {
        InertiaPlugin.track(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
      }

      target._gsDragID = id = "d" + _lookupCount++;
      _lookup[id] = self;

      if (scrollProxy) {
        scrollProxy.enable();
        scrollProxy.element._gsDragID = id;
      }

      (vars.bounds || rotationMode) && recordStartPositions();
      vars.bounds && self.applyBounds();
      return self;
    };

    _this2.disable = function (type) {
      var dragging = self.isDragging,
          i,
          trigger;

      if (!rotationMode) {
        i = triggers.length;

        while (--i > -1) {
          _setStyle(triggers[i], "cursor", null);
        }
      }

      if (type !== "soft") {
        i = triggers.length;

        while (--i > -1) {
          trigger = triggers[i];

          _setStyle(trigger, "touchCallout", null);

          _setStyle(trigger, "touchAction", null);

          _removeListener(trigger, "mousedown", onPress);

          _removeListener(trigger, "touchstart", onPress);

          _removeListener(trigger, "click", onClick);

          _removeListener(trigger, "contextmenu", onContextMenu);
        }

        _setSelectable(triggers, true);

        if (touchEventTarget) {
          _removeListener(touchEventTarget, "touchcancel", onRelease);

          _removeListener(touchEventTarget, "touchend", onRelease);

          _removeListener(touchEventTarget, "touchmove", onMove);
        }

        _removeListener(ownerDoc, "mouseup", onRelease);

        _removeListener(ownerDoc, "mousemove", onMove);
      }

      _removeScrollListener(target, updateScroll);

      enabled = false;

      if (InertiaPlugin && type !== "soft") {
        InertiaPlugin.untrack(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
      }

      if (scrollProxy) {
        scrollProxy.disable();
      }

      _removeFromRenderQueue(render);

      self.isDragging = self.isPressed = isClicking = false;

      if (dragging) {
        _dispatchEvent(self, "dragend", "onDragEnd");
      }

      return self;
    };

    _this2.enabled = function (value, type) {
      return arguments.length ? value ? self.enable(type) : self.disable(type) : enabled;
    };

    _this2.kill = function () {
      self.isThrowing = false;

      if (self.tween) {
        self.tween.kill();
      }

      self.disable();
      gsap.set(triggers, {
        clearProps: "userSelect"
      });
      delete _lookup[target._gsDragID];
      return self;
    };

    if (~type.indexOf("scroll")) {
      scrollProxy = _this2.scrollProxy = new ScrollProxy(target, _extend({
        onKill: function onKill() {
          //ScrollProxy's onKill() gets called if/when the ScrollProxy senses that the user interacted with the scroll position manually (like using the scrollbar). IE9 doesn't fire the "mouseup" properly when users drag the scrollbar of an element, so this works around that issue.
          if (self.isPressed) {
            onRelease(null);
          }
        }
      }, vars)); //a bug in many Android devices' stock browser causes scrollTop to get forced back to 0 after it is altered via JS, so we set overflow to "hidden" on mobile/touch devices (they hide the scroll bar anyway). That works around the bug. (This bug is discussed at https://code.google.com/p/android/issues/detail?id=19625)

      target.style.overflowY = allowY && !_isTouchDevice ? "auto" : "hidden";
      target.style.overflowX = allowX && !_isTouchDevice ? "auto" : "hidden";
      target = scrollProxy.content;
    }

    if (rotationMode) {
      killProps.rotation = 1;
    } else {
      if (allowX) {
        killProps[xProp] = 1;
      }

      if (allowY) {
        killProps[yProp] = 1;
      }
    }

    gsCache.force3D = "force3D" in vars ? vars.force3D : true; //otherwise, normal dragging would be in 2D and then as soon as it's released and there's an inertia tween, it'd jump to 3D which can create an initial jump due to the work the browser must to do layerize it.

    _this2.enable();

    return _this2;
  }

  Draggable.register = function register(core) {
    gsap = core;

    _initCore();
  };

  Draggable.create = function create(targets, vars) {
    if (!_coreInitted) {
      _initCore(true);
    }

    return _toArray(targets).map(function (target) {
      return new Draggable(target, vars);
    });
  };

  Draggable.get = function get(target) {
    return _lookup[(_toArray(target)[0] || {})._gsDragID];
  };

  Draggable.timeSinceDrag = function timeSinceDrag() {
    return (_getTime() - _lastDragTime) / 1000;
  };

  Draggable.hitTest = function hitTest(obj1, obj2, threshold) {
    if (obj1 === obj2) {
      return false;
    }

    var r1 = _parseRect(obj1),
        r2 = _parseRect(obj2),
        top = r1.top,
        left = r1.left,
        right = r1.right,
        bottom = r1.bottom,
        width = r1.width,
        height = r1.height,
        isOutside = r2.left > right || r2.right < left || r2.top > bottom || r2.bottom < top,
        overlap,
        area,
        isRatio;

    if (isOutside || !threshold) {
      return !isOutside;
    }

    isRatio = (threshold + "").indexOf("%") !== -1;
    threshold = parseFloat(threshold) || 0;
    overlap = {
      left: Math.max(left, r2.left),
      top: Math.max(top, r2.top)
    };
    overlap.width = Math.min(right, r2.right) - overlap.left;
    overlap.height = Math.min(bottom, r2.bottom) - overlap.top;

    if (overlap.width < 0 || overlap.height < 0) {
      return false;
    }

    if (isRatio) {
      threshold *= 0.01;
      area = overlap.width * overlap.height;
      return area >= width * height * threshold || area >= r2.width * r2.height * threshold;
    }

    return overlap.width > threshold && overlap.height > threshold;
  };

  return Draggable;
}(EventDispatcher);

_setDefaults(Draggable.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: false,
  isPressed: false
});

Draggable.zIndex = 1000;
Draggable.version = "3.5.1";
_getGSAP() && gsap.registerPlugin(Draggable);


/***/ }),

/***/ "./node_modules/gsap/EasePack.js":
/*!***************************************!*\
  !*** ./node_modules/gsap/EasePack.js ***!
  \***************************************/
/*! exports provided: SlowMo, ExpoScaleEase, RoughEase, EasePack, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlowMo", function() { return SlowMo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpoScaleEase", function() { return ExpoScaleEase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoughEase", function() { return RoughEase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EasePack", function() { return EasePack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EasePack; });
/*!
 * EasePack 3.5.1
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _coreInitted,
    _registerEase,
    _getGSAP = function _getGSAP() {
  return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _boolean = function _boolean(value, defaultValue) {
  return !!(typeof value === "undefined" ? defaultValue : value && !~(value + "").indexOf("false"));
},
    _initCore = function _initCore(core) {
  gsap = core || _getGSAP();

  if (gsap) {
    _registerEase = gsap.registerEase; //add weighted ease capabilities to standard eases so users can do "power2.inOut(0.8)" for example to push everything toward the "out", or (-0.8) to push it toward the "in" (0 is neutral)

    var eases = gsap.parseEase(),
        createConfig = function createConfig(ease) {
      return function (ratio) {
        var y = 0.5 + ratio / 2;

        ease.config = function (p) {
          return ease(2 * (1 - p) * p * y + p * p);
        };
      };
    },
        p;

    for (p in eases) {
      if (!eases[p].config) {
        createConfig(eases[p]);
      }
    }

    _registerEase("slow", SlowMo);

    _registerEase("expoScale", ExpoScaleEase);

    _registerEase("rough", RoughEase);

    for (p in EasePack) {
      p !== "version" && gsap.core.globals(p, EasePack[p]);
    }

    _coreInitted = 1;
  }
},
    _createSlowMo = function _createSlowMo(linearRatio, power, yoyoMode) {
  linearRatio = Math.min(1, linearRatio || 0.7);

  var pow = linearRatio < 1 ? power || power === 0 ? power : 0.7 : 0,
      p1 = (1 - linearRatio) / 2,
      p3 = p1 + linearRatio,
      calcEnd = _boolean(yoyoMode);

  return function (p) {
    var r = p + (0.5 - p) * pow;
    return p < p1 ? calcEnd ? 1 - (p = 1 - p / p1) * p : r - (p = 1 - p / p1) * p * p * p * r : p > p3 ? calcEnd ? p === 1 ? 0 : 1 - (p = (p - p3) / p1) * p : r + (p - r) * (p = (p - p3) / p1) * p * p * p : calcEnd ? 1 : r;
  };
},
    _createExpoScale = function _createExpoScale(start, end, ease) {
  var p1 = Math.log(end / start),
      p2 = end - start;
  ease && (ease = gsap.parseEase(ease));
  return function (p) {
    return (start * Math.exp(p1 * (ease ? ease(p) : p)) - start) / p2;
  };
},
    EasePoint = function EasePoint(time, value, next) {
  this.t = time;
  this.v = value;

  if (next) {
    this.next = next;
    next.prev = this;
    this.c = next.v - value;
    this.gap = next.t - time;
  }
},
    _createRoughEase = function _createRoughEase(vars) {
  if (typeof vars !== "object") {
    //users may pass in via a string, like "rough(30)"
    vars = {
      points: +vars || 20
    };
  }

  var taper = vars.taper || "none",
      a = [],
      cnt = 0,
      points = (+vars.points || 20) | 0,
      i = points,
      randomize = _boolean(vars.randomize, true),
      clamp = _boolean(vars.clamp),
      template = gsap ? gsap.parseEase(vars.template) : 0,
      strength = (+vars.strength || 1) * 0.4,
      x,
      y,
      bump,
      invX,
      obj,
      pnt,
      recent;

  while (--i > -1) {
    x = randomize ? Math.random() : 1 / points * i;
    y = template ? template(x) : x;

    if (taper === "none") {
      bump = strength;
    } else if (taper === "out") {
      invX = 1 - x;
      bump = invX * invX * strength;
    } else if (taper === "in") {
      bump = x * x * strength;
    } else if (x < 0.5) {
      //"both" (start)
      invX = x * 2;
      bump = invX * invX * 0.5 * strength;
    } else {
      //"both" (end)
      invX = (1 - x) * 2;
      bump = invX * invX * 0.5 * strength;
    }

    if (randomize) {
      y += Math.random() * bump - bump * 0.5;
    } else if (i % 2) {
      y += bump * 0.5;
    } else {
      y -= bump * 0.5;
    }

    if (clamp) {
      if (y > 1) {
        y = 1;
      } else if (y < 0) {
        y = 0;
      }
    }

    a[cnt++] = {
      x: x,
      y: y
    };
  }

  a.sort(function (a, b) {
    return a.x - b.x;
  });
  pnt = new EasePoint(1, 1, null);
  i = points;

  while (i--) {
    obj = a[i];
    pnt = new EasePoint(obj.x, obj.y, pnt);
  }

  recent = new EasePoint(0, 0, pnt.t ? pnt : pnt.next);
  return function (p) {
    var pnt = recent;

    if (p > pnt.t) {
      while (pnt.next && p >= pnt.t) {
        pnt = pnt.next;
      }

      pnt = pnt.prev;
    } else {
      while (pnt.prev && p <= pnt.t) {
        pnt = pnt.prev;
      }
    }

    recent = pnt;
    return pnt.v + (p - pnt.t) / pnt.gap * pnt.c;
  };
};

var SlowMo = _createSlowMo(0.7);
SlowMo.ease = SlowMo; //for backward compatibility

SlowMo.config = _createSlowMo;
var ExpoScaleEase = _createExpoScale(1, 2);
ExpoScaleEase.config = _createExpoScale;
var RoughEase = _createRoughEase();
RoughEase.ease = RoughEase; //for backward compatibility

RoughEase.config = _createRoughEase;
var EasePack = {
  SlowMo: SlowMo,
  RoughEase: RoughEase,
  ExpoScaleEase: ExpoScaleEase
};

for (var p in EasePack) {
  EasePack[p].register = _initCore;
  EasePack[p].version = "3.5.1";
}

_getGSAP() && gsap.registerPlugin(SlowMo);


/***/ }),

/***/ "./node_modules/gsap/EaselPlugin.js":
/*!******************************************!*\
  !*** ./node_modules/gsap/EaselPlugin.js ***!
  \******************************************/
/*! exports provided: EaselPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EaselPlugin", function() { return EaselPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EaselPlugin; });
/*!
 * EaselPlugin 3.5.1
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _coreInitted,
    _win,
    _createJS,
    _ColorFilter,
    _ColorMatrixFilter,
    _colorProps = "redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier,redOffset,greenOffset,blueOffset,alphaOffset".split(","),
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _getCreateJS = function _getCreateJS() {
  return _createJS || _win && _win.createjs || _win || {};
},
    _warn = function _warn(message) {
  return console.warn(message);
},
    _cache = function _cache(target) {
  var b = target.getBounds && target.getBounds();

  if (!b) {
    b = target.nominalBounds || {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    };
    target.setBounds && target.setBounds(b.x, b.y, b.width, b.height);
  }

  target.cache && target.cache(b.x, b.y, b.width, b.height);

  _warn("EaselPlugin: for filters to display in EaselJS, you must call the object's cache() method first. GSAP attempted to use the target's getBounds() for the cache but that may not be completely accurate. " + target);
},
    _parseColorFilter = function _parseColorFilter(target, v, plugin) {
  if (!_ColorFilter) {
    _ColorFilter = _getCreateJS().ColorFilter;

    if (!_ColorFilter) {
      _warn("EaselPlugin error: The EaselJS ColorFilter JavaScript file wasn't loaded.");
    }
  }

  var filters = target.filters || [],
      i = filters.length,
      c,
      s,
      e,
      a,
      p,
      pt;

  while (i--) {
    if (filters[i] instanceof _ColorFilter) {
      s = filters[i];
      break;
    }
  }

  if (!s) {
    s = new _ColorFilter();
    filters.push(s);
    target.filters = filters;
  }

  e = s.clone();

  if (v.tint != null) {
    c = gsap.utils.splitColor(v.tint);
    a = v.tintAmount != null ? +v.tintAmount : 1;
    e.redOffset = +c[0] * a;
    e.greenOffset = +c[1] * a;
    e.blueOffset = +c[2] * a;
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - a;
  } else {
    for (p in v) {
      if (p !== "exposure") if (p !== "brightness") {
        e[p] = +v[p];
      }
    }
  }

  if (v.exposure != null) {
    e.redOffset = e.greenOffset = e.blueOffset = 255 * (+v.exposure - 1);
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1;
  } else if (v.brightness != null) {
    a = +v.brightness - 1;
    e.redOffset = e.greenOffset = e.blueOffset = a > 0 ? a * 255 : 0;
    e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - Math.abs(a);
  }

  i = 8;

  while (i--) {
    p = _colorProps[i];

    if (s[p] !== e[p]) {
      pt = plugin.add(s, p, s[p], e[p]);

      if (pt) {
        pt.op = "easel_colorFilter";
      }
    }
  }

  plugin._props.push("easel_colorFilter");

  if (!target.cacheID) {
    _cache(target);
  }
},
    _idMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    _lumR = 0.212671,
    _lumG = 0.715160,
    _lumB = 0.072169,
    _applyMatrix = function _applyMatrix(m, m2) {
  if (!(m instanceof Array) || !(m2 instanceof Array)) {
    return m2;
  }

  var temp = [],
      i = 0,
      z = 0,
      y,
      x;

  for (y = 0; y < 4; y++) {
    for (x = 0; x < 5; x++) {
      z = x === 4 ? m[i + 4] : 0;
      temp[i + x] = m[i] * m2[x] + m[i + 1] * m2[x + 5] + m[i + 2] * m2[x + 10] + m[i + 3] * m2[x + 15] + z;
    }

    i += 5;
  }

  return temp;
},
    _setSaturation = function _setSaturation(m, n) {
  if (isNaN(n)) {
    return m;
  }

  var inv = 1 - n,
      r = inv * _lumR,
      g = inv * _lumG,
      b = inv * _lumB;
  return _applyMatrix([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
},
    _colorize = function _colorize(m, color, amount) {
  if (isNaN(amount)) {
    amount = 1;
  }

  var c = gsap.utils.splitColor(color),
      r = c[0] / 255,
      g = c[1] / 255,
      b = c[2] / 255,
      inv = 1 - amount;
  return _applyMatrix([inv + amount * r * _lumR, amount * r * _lumG, amount * r * _lumB, 0, 0, amount * g * _lumR, inv + amount * g * _lumG, amount * g * _lumB, 0, 0, amount * b * _lumR, amount * b * _lumG, inv + amount * b * _lumB, 0, 0, 0, 0, 0, 1, 0], m);
},
    _setHue = function _setHue(m, n) {
  if (isNaN(n)) {
    return m;
  }

  n *= Math.PI / 180;
  var c = Math.cos(n),
      s = Math.sin(n);
  return _applyMatrix([_lumR + c * (1 - _lumR) + s * -_lumR, _lumG + c * -_lumG + s * -_lumG, _lumB + c * -_lumB + s * (1 - _lumB), 0, 0, _lumR + c * -_lumR + s * 0.143, _lumG + c * (1 - _lumG) + s * 0.14, _lumB + c * -_lumB + s * -0.283, 0, 0, _lumR + c * -_lumR + s * -(1 - _lumR), _lumG + c * -_lumG + s * _lumG, _lumB + c * (1 - _lumB) + s * _lumB, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
},
    _setContrast = function _setContrast(m, n) {
  if (isNaN(n)) {
    return m;
  }

  n += 0.01;
  return _applyMatrix([n, 0, 0, 0, 128 * (1 - n), 0, n, 0, 0, 128 * (1 - n), 0, 0, n, 0, 128 * (1 - n), 0, 0, 0, 1, 0], m);
},
    _parseColorMatrixFilter = function _parseColorMatrixFilter(target, v, plugin) {
  if (!_ColorMatrixFilter) {
    _ColorMatrixFilter = _getCreateJS().ColorMatrixFilter;

    if (!_ColorMatrixFilter) {
      _warn("EaselPlugin: The EaselJS ColorMatrixFilter JavaScript file wasn't loaded.");
    }
  }

  var filters = target.filters || [],
      i = filters.length,
      matrix,
      startMatrix,
      s,
      pg;

  while (--i > -1) {
    if (filters[i] instanceof _ColorMatrixFilter) {
      s = filters[i];
      break;
    }
  }

  if (!s) {
    s = new _ColorMatrixFilter(_idMatrix.slice());
    filters.push(s);
    target.filters = filters;
  }

  startMatrix = s.matrix;
  matrix = _idMatrix.slice();

  if (v.colorize != null) {
    matrix = _colorize(matrix, v.colorize, Number(v.colorizeAmount));
  }

  if (v.contrast != null) {
    matrix = _setContrast(matrix, Number(v.contrast));
  }

  if (v.hue != null) {
    matrix = _setHue(matrix, Number(v.hue));
  }

  if (v.saturation != null) {
    matrix = _setSaturation(matrix, Number(v.saturation));
  }

  i = matrix.length;

  while (--i > -1) {
    if (matrix[i] !== startMatrix[i]) {
      pg = plugin.add(startMatrix, i, startMatrix[i], matrix[i]);

      if (pg) {
        pg.op = "easel_colorMatrixFilter";
      }
    }
  }

  plugin._props.push("easel_colorMatrixFilter");

  if (!target.cacheID) {
    _cache();
  }

  plugin._matrix = startMatrix;
},
    _initCore = function _initCore(core) {
  gsap = core || _getGSAP();

  if (_windowExists()) {
    _win = window;
  }

  if (gsap) {
    _coreInitted = 1;
  }
};

var EaselPlugin = {
  version: "3.5.1",
  name: "easel",
  init: function init(target, value, tween, index, targets) {
    if (!_coreInitted) {
      _initCore();

      if (!gsap) {
        _warn("Please gsap.registerPlugin(EaselPlugin)");
      }
    }

    this.target = target;
    var p, pt, tint, colorMatrix, end, labels, i;

    for (p in value) {
      end = value[p];

      if (p === "colorFilter" || p === "tint" || p === "tintAmount" || p === "exposure" || p === "brightness") {
        if (!tint) {
          _parseColorFilter(target, value.colorFilter || value, this);

          tint = true;
        }
      } else if (p === "saturation" || p === "contrast" || p === "hue" || p === "colorize" || p === "colorizeAmount") {
        if (!colorMatrix) {
          _parseColorMatrixFilter(target, value.colorMatrixFilter || value, this);

          colorMatrix = true;
        }
      } else if (p === "frame") {
        if (typeof end === "string" && end.charAt(1) !== "=" && (labels = target.labels)) {
          for (i = 0; i < labels.length; i++) {
            if (labels[i].label === end) {
              end = labels[i].position;
            }
          }
        }

        pt = this.add(target, "gotoAndStop", target.currentFrame, end, index, targets, Math.round);

        if (pt) {
          pt.op = p;
        }
      } else if (target[p] != null) {
        this.add(target, p, "get", end);
      }
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    if (data.target.cacheID) {
      data.target.updateCache();
    }
  },
  register: _initCore
};

EaselPlugin.registerCreateJS = function (createjs) {
  _createJS = createjs;
};

_getGSAP() && gsap.registerPlugin(EaselPlugin);


/***/ }),

/***/ "./node_modules/gsap/MotionPathPlugin.js":
/*!***********************************************!*\
  !*** ./node_modules/gsap/MotionPathPlugin.js ***!
  \***********************************************/
/*! exports provided: MotionPathPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MotionPathPlugin", function() { return MotionPathPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MotionPathPlugin; });
/* harmony import */ var _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/paths.js */ "./node_modules/gsap/utils/paths.js");
/* harmony import */ var _utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/matrix.js */ "./node_modules/gsap/utils/matrix.js");
/*!
 * MotionPathPlugin 3.5.1
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */



var _xProps = ["x", "translateX", "left", "marginLeft"],
    _yProps = ["y", "translateY", "top", "marginTop"],
    _DEG2RAD = Math.PI / 180,
    gsap,
    PropTween,
    _getUnit,
    _toArray,
    _getGSAP = function _getGSAP() {
  return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _populateSegmentFromArray = function _populateSegmentFromArray(segment, values, property, mode) {
  //mode: 0 = x but don't fill y yet, 1 = y, 2 = x and fill y with 0.
  var l = values.length,
      si = mode === 2 ? 0 : mode,
      i = 0;

  for (; i < l; i++) {
    segment[si] = parseFloat(values[i][property]);
    mode === 2 && (segment[si + 1] = 0);
    si += 2;
  }

  return segment;
},
    _getPropNum = function _getPropNum(target, prop, unit) {
  return parseFloat(target._gsap.get(target, prop, unit || "px")) || 0;
},
    _relativize = function _relativize(segment) {
  var x = segment[0],
      y = segment[1],
      i;

  for (i = 2; i < segment.length; i += 2) {
    x = segment[i] += x;
    y = segment[i + 1] += y;
  }
},
    _segmentToRawPath = function _segmentToRawPath(plugin, segment, target, x, y, slicer, vars) {
  if (vars.type === "cubic") {
    segment = [segment];
  } else {
    segment.unshift(_getPropNum(target, x, vars.unitX), y ? _getPropNum(target, y, vars.unitY) : 0);
    vars.relative && _relativize(segment);
    var pointFunc = y ? _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["pointsToSegment"] : _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["flatPointsToSegment"];
    segment = [pointFunc(segment, vars.curviness)];
  }

  segment = slicer(_align(segment, target, vars));

  _addDimensionalPropTween(plugin, target, x, segment, "x", vars.unitX);

  y && _addDimensionalPropTween(plugin, target, y, segment, "y", vars.unitY);
  return Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["cacheRawPathMeasurements"])(segment, vars.resolution || (vars.curviness === 0 ? 20 : 12)); //when curviness is 0, it creates control points right on top of the anchors which makes it more sensitive to resolution, thus we change the default accordingly.
},
    _emptyFunc = function _emptyFunc(v) {
  return v;
},
    _numExp = /[-+\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/g,
    _originToPoint = function _originToPoint(element, origin, parentMatrix) {
  // origin is an array of normalized values (0-1) in relation to the width/height, so [0.5, 0.5] would be the center. It can also be "auto" in which case it will be the top left unless it's a <path>, when it will start at the beginning of the path itself.
  var m = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__["getGlobalMatrix"])(element),
      svg,
      x,
      y;

  if ((element.tagName + "").toLowerCase() === "svg") {
    svg = element.viewBox.baseVal;
    x = svg.x;
    y = svg.y;
    svg.width || (svg = {
      width: +element.getAttribute("width"),
      height: +element.getAttribute("height")
    });
  } else {
    svg = origin && element.getBBox && element.getBBox();
    x = y = 0;
  }

  if (origin && origin !== "auto") {
    x += origin.push ? origin[0] * (svg ? svg.width : element.offsetWidth || 0) : origin.x;
    y += origin.push ? origin[1] * (svg ? svg.height : element.offsetHeight || 0) : origin.y;
  }

  return parentMatrix.apply(x || y ? m.apply({
    x: x,
    y: y
  }) : {
    x: m.e,
    y: m.f
  });
},
    _getAlignMatrix = function _getAlignMatrix(fromElement, toElement, fromOrigin, toOrigin) {
  var parentMatrix = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__["getGlobalMatrix"])(fromElement.parentNode, true, true),
      m = parentMatrix.clone().multiply(Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__["getGlobalMatrix"])(toElement)),
      fromPoint = _originToPoint(fromElement, fromOrigin, parentMatrix),
      _originToPoint2 = _originToPoint(toElement, toOrigin, parentMatrix),
      x = _originToPoint2.x,
      y = _originToPoint2.y,
      p;

  m.e = m.f = 0;

  if (toOrigin === "auto" && toElement.getTotalLength && toElement.tagName.toLowerCase() === "path") {
    p = toElement.getAttribute("d").match(_numExp) || [];
    p = m.apply({
      x: +p[0],
      y: +p[1]
    });
    x += p.x;
    y += p.y;
  }

  if (p || toElement.getBBox && fromElement.getBBox && toElement.ownerSVGElement === fromElement.ownerSVGElement) {
    p = m.apply(toElement.getBBox());
    x -= p.x;
    y -= p.y;
  }

  m.e = x - fromPoint.x;
  m.f = y - fromPoint.y;
  return m;
},
    _align = function _align(rawPath, target, _ref) {
  var align = _ref.align,
      matrix = _ref.matrix,
      offsetX = _ref.offsetX,
      offsetY = _ref.offsetY,
      alignOrigin = _ref.alignOrigin;

  var x = rawPath[0][0],
      y = rawPath[0][1],
      curX = _getPropNum(target, "x"),
      curY = _getPropNum(target, "y"),
      alignTarget,
      m,
      p;

  if (!rawPath || !rawPath.length) {
    return Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getRawPath"])("M0,0L0,0");
  }

  if (align) {
    if (align === "self" || (alignTarget = _toArray(align)[0] || target) === target) {
      Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["transformRawPath"])(rawPath, 1, 0, 0, 1, curX - x, curY - y);
    } else {
      if (alignOrigin && alignOrigin[2] !== false) {
        gsap.set(target, {
          transformOrigin: alignOrigin[0] * 100 + "% " + alignOrigin[1] * 100 + "%"
        });
      } else {
        alignOrigin = [_getPropNum(target, "xPercent") / -100, _getPropNum(target, "yPercent") / -100];
      }

      m = _getAlignMatrix(target, alignTarget, alignOrigin, "auto");
      p = m.apply({
        x: x,
        y: y
      });
      Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["transformRawPath"])(rawPath, m.a, m.b, m.c, m.d, curX + m.e - (p.x - m.e), curY + m.f - (p.y - m.f));
    }
  }

  if (matrix) {
    Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["transformRawPath"])(rawPath, matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
  } else if (offsetX || offsetY) {
    Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["transformRawPath"])(rawPath, 1, 0, 0, 1, offsetX || 0, offsetY || 0);
  }

  return rawPath;
},
    _addDimensionalPropTween = function _addDimensionalPropTween(plugin, target, property, rawPath, pathProperty, forceUnit) {
  var cache = target._gsap,
      harness = cache.harness,
      alias = harness && harness.aliases && harness.aliases[property],
      prop = alias && alias.indexOf(",") < 0 ? alias : property,
      pt = plugin._pt = new PropTween(plugin._pt, target, prop, 0, 0, _emptyFunc, 0, cache.set(target, prop, plugin));
  pt.u = _getUnit(cache.get(target, prop, forceUnit)) || 0;
  pt.path = rawPath;
  pt.pp = pathProperty;

  plugin._props.push(prop);
},
    _sliceModifier = function _sliceModifier(start, end) {
  return function (rawPath) {
    return start || end !== 1 ? Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["sliceRawPath"])(rawPath, start, end) : rawPath;
  };
};

var MotionPathPlugin = {
  version: "3.5.1",
  name: "motionPath",
  register: function register(core, Plugin, propTween) {
    gsap = core;
    _getUnit = gsap.utils.getUnit;
    _toArray = gsap.utils.toArray;
    PropTween = propTween;
  },
  init: function init(target, vars) {
    if (!gsap) {
      console.warn("Please gsap.registerPlugin(MotionPathPlugin)");
      return false;
    }

    if (!(typeof vars === "object" && !vars.style) || !vars.path) {
      vars = {
        path: vars
      };
    }

    var rawPaths = [],
        path = vars.path,
        firstObj = path[0],
        autoRotate = vars.autoRotate,
        slicer = _sliceModifier(vars.start, "end" in vars ? vars.end : 1),
        rawPath,
        p,
        x,
        y;

    this.rawPaths = rawPaths;
    this.target = target;

    if (this.rotate = autoRotate || autoRotate === 0) {
      //get the rotational data FIRST so that the setTransform() method is called in the correct order in the render() loop - rotation gets set last.
      this.rOffset = parseFloat(autoRotate) || 0;
      this.radians = !!vars.useRadians;
      this.rProp = vars.rotation || "rotation"; // rotation property

      this.rSet = target._gsap.set(target, this.rProp, this); // rotation setter

      this.ru = _getUnit(target._gsap.get(target, this.rProp)) || 0; // rotation units
    }

    if (Array.isArray(path) && !("closed" in path) && typeof firstObj !== "number") {
      for (p in firstObj) {
        if (~_xProps.indexOf(p)) {
          x = p;
        } else if (~_yProps.indexOf(p)) {
          y = p;
        }
      }

      if (x && y) {
        //correlated values
        rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray(_populateSegmentFromArray([], path, x, 0), path, y, 1), target, vars.x || x, vars.y || y, slicer, vars));
      } else {
        x = y = 0;
      }

      for (p in firstObj) {
        p !== x && p !== y && rawPaths.push(_segmentToRawPath(this, _populateSegmentFromArray([], path, p, 2), target, p, 0, slicer, vars));
      }
    } else {
      rawPath = slicer(_align(Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getRawPath"])(vars.path), target, vars));
      Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["cacheRawPathMeasurements"])(rawPath, vars.resolution);
      rawPaths.push(rawPath);

      _addDimensionalPropTween(this, target, vars.x || "x", rawPath, "x", vars.unitX || "px");

      _addDimensionalPropTween(this, target, vars.y || "y", rawPath, "y", vars.unitY || "px");
    }
  },
  render: function render(ratio, data) {
    var rawPaths = data.rawPaths,
        i = rawPaths.length,
        pt = data._pt;

    if (ratio > 1) {
      ratio = 1;
    } else if (ratio < 0) {
      ratio = 0;
    }

    while (i--) {
      Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getPositionOnPath"])(rawPaths[i], ratio, !i && data.rotate, rawPaths[i]);
    }

    while (pt) {
      pt.set(pt.t, pt.p, pt.path[pt.pp] + pt.u, pt.d, ratio);
      pt = pt._next;
    }

    data.rotate && data.rSet(data.target, data.rProp, rawPaths[0].angle * (data.radians ? _DEG2RAD : 1) + data.rOffset + data.ru, data, ratio);
  },
  getLength: function getLength(path) {
    return Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["cacheRawPathMeasurements"])(Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getRawPath"])(path)).totalLength;
  },
  sliceRawPath: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["sliceRawPath"],
  getRawPath: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getRawPath"],
  pointsToSegment: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["pointsToSegment"],
  stringToRawPath: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["stringToRawPath"],
  rawPathToString: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["rawPathToString"],
  transformRawPath: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["transformRawPath"],
  getGlobalMatrix: _utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__["getGlobalMatrix"],
  getPositionOnPath: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["getPositionOnPath"],
  cacheRawPathMeasurements: _utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["cacheRawPathMeasurements"],
  convertToPath: function convertToPath(targets, swap) {
    return _toArray(targets).map(function (target) {
      return Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["convertToPath"])(target, swap !== false);
    });
  },
  convertCoordinates: function convertCoordinates(fromElement, toElement, point) {
    var m = Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__["getGlobalMatrix"])(toElement, true, true).multiply(Object(_utils_matrix_js__WEBPACK_IMPORTED_MODULE_1__["getGlobalMatrix"])(fromElement));
    return point ? m.apply(point) : m;
  },
  getAlignMatrix: _getAlignMatrix,
  getRelativePosition: function getRelativePosition(fromElement, toElement, fromOrigin, toOrigin) {
    var m = _getAlignMatrix(fromElement, toElement, fromOrigin, toOrigin);

    return {
      x: m.e,
      y: m.f
    };
  },
  arrayToRawPath: function arrayToRawPath(value, vars) {
    vars = vars || {};

    var segment = _populateSegmentFromArray(_populateSegmentFromArray([], value, vars.x || "x", 0), value, vars.y || "y", 1);

    vars.relative && _relativize(segment);
    return [vars.type === "cubic" ? segment : Object(_utils_paths_js__WEBPACK_IMPORTED_MODULE_0__["pointsToSegment"])(segment, vars.curviness)];
  }
};
_getGSAP() && gsap.registerPlugin(MotionPathPlugin);


/***/ }),

/***/ "./node_modules/gsap/PixiPlugin.js":
/*!*****************************************!*\
  !*** ./node_modules/gsap/PixiPlugin.js ***!
  \*****************************************/
/*! exports provided: PixiPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PixiPlugin", function() { return PixiPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PixiPlugin; });
/*!
 * PixiPlugin 3.5.1
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _win,
    _splitColor,
    _coreInitted,
    _PIXI,
    PropTween,
    _getSetter,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _warn = function _warn(message) {
  return console.warn(message);
},
    _idMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    _lumR = 0.212671,
    _lumG = 0.715160,
    _lumB = 0.072169,
    _applyMatrix = function _applyMatrix(m, m2) {
  var temp = [],
      i = 0,
      z = 0,
      y,
      x;

  for (y = 0; y < 4; y++) {
    for (x = 0; x < 5; x++) {
      z = x === 4 ? m[i + 4] : 0;
      temp[i + x] = m[i] * m2[x] + m[i + 1] * m2[x + 5] + m[i + 2] * m2[x + 10] + m[i + 3] * m2[x + 15] + z;
    }

    i += 5;
  }

  return temp;
},
    _setSaturation = function _setSaturation(m, n) {
  var inv = 1 - n,
      r = inv * _lumR,
      g = inv * _lumG,
      b = inv * _lumB;
  return _applyMatrix([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
},
    _colorize = function _colorize(m, color, amount) {
  var c = _splitColor(color),
      r = c[0] / 255,
      g = c[1] / 255,
      b = c[2] / 255,
      inv = 1 - amount;

  return _applyMatrix([inv + amount * r * _lumR, amount * r * _lumG, amount * r * _lumB, 0, 0, amount * g * _lumR, inv + amount * g * _lumG, amount * g * _lumB, 0, 0, amount * b * _lumR, amount * b * _lumG, inv + amount * b * _lumB, 0, 0, 0, 0, 0, 1, 0], m);
},
    _setHue = function _setHue(m, n) {
  n *= Math.PI / 180;
  var c = Math.cos(n),
      s = Math.sin(n);
  return _applyMatrix([_lumR + c * (1 - _lumR) + s * -_lumR, _lumG + c * -_lumG + s * -_lumG, _lumB + c * -_lumB + s * (1 - _lumB), 0, 0, _lumR + c * -_lumR + s * 0.143, _lumG + c * (1 - _lumG) + s * 0.14, _lumB + c * -_lumB + s * -0.283, 0, 0, _lumR + c * -_lumR + s * -(1 - _lumR), _lumG + c * -_lumG + s * _lumG, _lumB + c * (1 - _lumB) + s * _lumB, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
},
    _setContrast = function _setContrast(m, n) {
  return _applyMatrix([n, 0, 0, 0, 0.5 * (1 - n), 0, n, 0, 0, 0.5 * (1 - n), 0, 0, n, 0, 0.5 * (1 - n), 0, 0, 0, 1, 0], m);
},
    _getFilter = function _getFilter(target, type) {
  var filterClass = _PIXI.filters[type],
      filters = target.filters || [],
      i = filters.length,
      filter;

  if (!filterClass) {
    _warn(type + " not found. PixiPlugin.registerPIXI(PIXI)");
  }

  while (--i > -1) {
    if (filters[i] instanceof filterClass) {
      return filters[i];
    }
  }

  filter = new filterClass();

  if (type === "BlurFilter") {
    filter.blur = 0;
  }

  filters.push(filter);
  target.filters = filters;
  return filter;
},
    _addColorMatrixFilterCacheTween = function _addColorMatrixFilterCacheTween(p, plugin, cache, vars) {
  //we cache the ColorMatrixFilter components in a _gsColorMatrixFilter object attached to the target object so that it's easy to grab the current value at any time.
  plugin.add(cache, p, cache[p], vars[p]);

  plugin._props.push(p);
},
    _applyBrightnessToMatrix = function _applyBrightnessToMatrix(brightness, matrix) {
  var temp = new _PIXI.filters.ColorMatrixFilter();
  temp.matrix = matrix;
  temp.brightness(brightness, true);
  return temp.matrix;
},
    _copy = function _copy(obj) {
  var copy = {},
      p;

  for (p in obj) {
    copy[p] = obj[p];
  }

  return copy;
},
    _CMFdefaults = {
  contrast: 1,
  saturation: 1,
  colorizeAmount: 0,
  colorize: "rgb(255,255,255)",
  hue: 0,
  brightness: 1
},
    _parseColorMatrixFilter = function _parseColorMatrixFilter(target, v, pg) {
  var filter = _getFilter(target, "ColorMatrixFilter"),
      cache = target._gsColorMatrixFilter = target._gsColorMatrixFilter || _copy(_CMFdefaults),
      combine = v.combineCMF && !("colorMatrixFilter" in v && !v.colorMatrixFilter),
      i,
      matrix,
      startMatrix;

  startMatrix = filter.matrix;

  if (v.resolution) {
    filter.resolution = v.resolution;
  }

  if (v.matrix && v.matrix.length === startMatrix.length) {
    matrix = v.matrix;

    if (cache.contrast !== 1) {
      _addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
    }

    if (cache.hue) {
      _addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
    }

    if (cache.brightness !== 1) {
      _addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
    }

    if (cache.colorizeAmount) {
      _addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);

      _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
    }

    if (cache.saturation !== 1) {
      _addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
    }
  } else {
    matrix = _idMatrix.slice();

    if (v.contrast != null) {
      matrix = _setContrast(matrix, +v.contrast);

      _addColorMatrixFilterCacheTween("contrast", pg, cache, v);
    } else if (cache.contrast !== 1) {
      if (combine) {
        matrix = _setContrast(matrix, cache.contrast);
      } else {
        _addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
      }
    }

    if (v.hue != null) {
      matrix = _setHue(matrix, +v.hue);

      _addColorMatrixFilterCacheTween("hue", pg, cache, v);
    } else if (cache.hue) {
      if (combine) {
        matrix = _setHue(matrix, cache.hue);
      } else {
        _addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
      }
    }

    if (v.brightness != null) {
      matrix = _applyBrightnessToMatrix(+v.brightness, matrix);

      _addColorMatrixFilterCacheTween("brightness", pg, cache, v);
    } else if (cache.brightness !== 1) {
      if (combine) {
        matrix = _applyBrightnessToMatrix(cache.brightness, matrix);
      } else {
        _addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
      }
    }

    if (v.colorize != null) {
      v.colorizeAmount = "colorizeAmount" in v ? +v.colorizeAmount : 1;
      matrix = _colorize(matrix, v.colorize, v.colorizeAmount);

      _addColorMatrixFilterCacheTween("colorize", pg, cache, v);

      _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, v);
    } else if (cache.colorizeAmount) {
      if (combine) {
        matrix = _colorize(matrix, cache.colorize, cache.colorizeAmount);
      } else {
        _addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);

        _addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
      }
    }

    if (v.saturation != null) {
      matrix = _setSaturation(matrix, +v.saturation);

      _addColorMatrixFilterCacheTween("saturation", pg, cache, v);
    } else if (cache.saturation !== 1) {
      if (combine) {
        matrix = _setSaturation(matrix, cache.saturation);
      } else {
        _addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
      }
    }
  }

  i = matrix.length;

  while (--i > -1) {
    if (matrix[i] !== startMatrix[i]) {
      pg.add(startMatrix, i, startMatrix[i], matrix[i], "colorMatrixFilter");
    }
  }

  pg._props.push("colorMatrixFilter");
},
    _renderColor = function _renderColor(ratio, _ref) {
  var t = _ref.t,
      p = _ref.p,
      color = _ref.color,
      set = _ref.set;
  set(t, p, color[0] << 16 | color[1] << 8 | color[2]);
},
    _renderDirtyCache = function _renderDirtyCache(ratio, _ref2) {
  var g = _ref2.g;

  if (g) {
    //in order for PixiJS to actually redraw GraphicsData, we've gotta increment the "dirty" and "clearDirty" values. If we don't do this, the values will be tween properly, but not rendered.
    g.dirty++;
    g.clearDirty++;
  }
},
    _renderAutoAlpha = function _renderAutoAlpha(ratio, data) {
  data.t.visible = !!data.t.alpha;
},
    _addColorTween = function _addColorTween(target, p, value, plugin) {
  var currentValue = target[p],
      startColor = _splitColor(_isFunction(currentValue) ? target[p.indexOf("set") || !_isFunction(target["get" + p.substr(3)]) ? p : "get" + p.substr(3)]() : currentValue),
      endColor = _splitColor(value);

  plugin._pt = new PropTween(plugin._pt, target, p, 0, 0, _renderColor, {
    t: target,
    p: p,
    color: startColor,
    set: _getSetter(target, p)
  });
  plugin.add(startColor, 0, startColor[0], endColor[0]);
  plugin.add(startColor, 1, startColor[1], endColor[1]);
  plugin.add(startColor, 2, startColor[2], endColor[2]);
},
    _colorProps = {
  tint: 1,
  lineColor: 1,
  fillColor: 1
},
    _xyContexts = "position,scale,skew,pivot,anchor,tilePosition,tileScale".split(","),
    _contexts = {
  x: "position",
  y: "position",
  tileX: "tilePosition",
  tileY: "tilePosition"
},
    _colorMatrixFilterProps = {
  colorMatrixFilter: 1,
  saturation: 1,
  contrast: 1,
  hue: 1,
  colorize: 1,
  colorizeAmount: 1,
  brightness: 1,
  combineCMF: 1
},
    _DEG2RAD = Math.PI / 180,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _degreesToRadians = function _degreesToRadians(value) {
  return _isString(value) && value.charAt(1) === "=" ? value.substr(0, 2) + parseFloat(value.substr(2)) * _DEG2RAD : value * _DEG2RAD;
},
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 100000) / 100000, data);
},
    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue, radians) {
  var cap = 360 * (radians ? _DEG2RAD : 1),
      isString = _isString(endValue),
      relative = isString && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0,
      endNum = parseFloat(relative ? endValue.substr(2) : endValue) * (radians ? _DEG2RAD : 1),
      change = relative ? endNum * relative : endNum - startNum,
      finalValue = startNum + change,
      direction,
      pt;

  if (isString) {
    direction = endValue.split("_")[1];

    if (direction === "short") {
      change %= cap;

      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }

    if (direction === "cw" && change < 0) {
      change = (change + cap * 1e10) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * 1e10) % cap - ~~(change / cap) * cap;
    }
  }

  plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  return pt;
},
    _initCore = function _initCore() {
  if (_windowExists()) {
    _win = window;
    gsap = _coreInitted = _getGSAP();
    _PIXI = _PIXI || _win.PIXI;

    _splitColor = function _splitColor(color) {
      return gsap.utils.splitColor((color + "").substr(0, 2) === "0x" ? "#" + color.substr(2) : color);
    }; // some colors in PIXI are reported as "0xFF4421" instead of "#FF4421".

  }
},
    i,
    p; //context setup...


for (i = 0; i < _xyContexts.length; i++) {
  p = _xyContexts[i];
  _contexts[p + "X"] = p;
  _contexts[p + "Y"] = p;
}

var PixiPlugin = {
  version: "3.5.1",
  name: "pixi",
  register: function register(core, Plugin, propTween) {
    gsap = core;
    PropTween = propTween;
    _getSetter = Plugin.getSetter;

    _initCore();
  },
  registerPIXI: function registerPIXI(pixi) {
    _PIXI = pixi;
  },
  init: function init(target, values, tween, index, targets) {
    if (!_PIXI) {
      _initCore();
    }

    if (!target instanceof _PIXI.DisplayObject) {
      return false;
    }

    var isV4 = _PIXI.VERSION.charAt(0) === "4",
        context,
        axis,
        value,
        colorMatrix,
        filter,
        p,
        padding,
        i,
        data;

    for (p in values) {
      context = _contexts[p];
      value = values[p];

      if (context) {
        axis = ~p.charAt(p.length - 1).toLowerCase().indexOf("x") ? "x" : "y";
        this.add(target[context], axis, target[context][axis], context === "skew" ? _degreesToRadians(value) : value);
      } else if (p === "scale" || p === "anchor" || p === "pivot" || p === "tileScale") {
        this.add(target[p], "x", target[p].x, value);
        this.add(target[p], "y", target[p].y, value);
      } else if (p === "rotation" || p === "angle") {
        //PIXI expects rotation in radians, but as a convenience we let folks define it in degrees and we do the conversion.
        _addRotationalPropTween(this, target, p, target[p], value, p === "rotation");
      } else if (_colorMatrixFilterProps[p]) {
        if (!colorMatrix) {
          _parseColorMatrixFilter(target, values.colorMatrixFilter || values, this);

          colorMatrix = true;
        }
      } else if (p === "blur" || p === "blurX" || p === "blurY" || p === "blurPadding") {
        filter = _getFilter(target, "BlurFilter");
        this.add(filter, p, filter[p], value);

        if (values.blurPadding !== 0) {
          padding = values.blurPadding || Math.max(filter[p], value) * 2;
          i = target.filters.length;

          while (--i > -1) {
            target.filters[i].padding = Math.max(target.filters[i].padding, padding); //if we don't expand the padding on all the filters, it can look clipped.
          }
        }
      } else if (_colorProps[p]) {
        if ((p === "lineColor" || p === "fillColor") && target instanceof _PIXI.Graphics) {
          data = (target.geometry || target).graphicsData; //"geometry" was introduced in PIXI version 5

          this._pt = new PropTween(this._pt, target, p, 0, 0, _renderDirtyCache, {
            g: target.geometry || target
          });
          i = data.length;

          while (--i > -1) {
            _addColorTween(isV4 ? data[i] : data[i][p.substr(0, 4) + "Style"], isV4 ? p : "color", value, this);
          }
        } else {
          _addColorTween(target, p, value, this);
        }
      } else if (p === "autoAlpha") {
        this._pt = new PropTween(this._pt, target, "visible", 0, 0, _renderAutoAlpha);
        this.add(target, "alpha", target.alpha, value);

        this._props.push("alpha", "visible");
      } else if (p !== "resolution") {
        this.add(target, p, "get", value);
      }

      this._props.push(p);
    }
  }
};
_getGSAP() && gsap.registerPlugin(PixiPlugin);


/***/ }),

/***/ "./node_modules/gsap/ScrollToPlugin.js":
/*!*********************************************!*\
  !*** ./node_modules/gsap/ScrollToPlugin.js ***!
  \*********************************************/
/*! exports provided: ScrollToPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollToPlugin", function() { return ScrollToPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScrollToPlugin; });
/*!
 * ScrollToPlugin 3.5.1
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _coreInitted,
    _window,
    _docEl,
    _body,
    _toArray,
    _config,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _max = function _max(element, axis) {
  var dim = axis === "x" ? "Width" : "Height",
      scroll = "scroll" + dim,
      client = "client" + dim;
  return element === _window || element === _docEl || element === _body ? Math.max(_docEl[scroll], _body[scroll]) - (_window["inner" + dim] || _docEl[client] || _body[client]) : element[scroll] - element["offset" + dim];
},
    _buildGetter = function _buildGetter(e, axis) {
  //pass in an element and an axis ("x" or "y") and it'll return a getter function for the scroll position of that element (like scrollTop or scrollLeft, although if the element is the window, it'll use the pageXOffset/pageYOffset or the documentElement's scrollTop/scrollLeft or document.body's. Basically this streamlines things and makes a very fast getter across browsers.
  var p = "scroll" + (axis === "x" ? "Left" : "Top");

  if (e === _window) {
    if (e.pageXOffset != null) {
      p = "page" + axis.toUpperCase() + "Offset";
    } else {
      e = _docEl[p] != null ? _docEl : _body;
    }
  }

  return function () {
    return e[p];
  };
},
    _getOffset = function _getOffset(element, container) {
  var rect = _toArray(element)[0].getBoundingClientRect(),
      isRoot = !container || container === _window || container === _body,
      cRect = isRoot ? {
    top: _docEl.clientTop - (_window.pageYOffset || _docEl.scrollTop || _body.scrollTop || 0),
    left: _docEl.clientLeft - (_window.pageXOffset || _docEl.scrollLeft || _body.scrollLeft || 0)
  } : container.getBoundingClientRect(),
      offsets = {
    x: rect.left - cRect.left,
    y: rect.top - cRect.top
  };

  if (!isRoot && container) {
    //only add the current scroll position if it's not the window/body.
    offsets.x += _buildGetter(container, "x")();
    offsets.y += _buildGetter(container, "y")();
  }

  return offsets;
},
    _parseVal = function _parseVal(value, target, axis, currentVal, offset) {
  return !isNaN(value) && typeof value !== "object" ? parseFloat(value) - offset : _isString(value) && value.charAt(1) === "=" ? parseFloat(value.substr(2)) * (value.charAt(0) === "-" ? -1 : 1) + currentVal - offset : value === "max" ? _max(target, axis) - offset : Math.min(_max(target, axis), _getOffset(value, target)[axis] - offset);
},
    _initCore = function _initCore() {
  gsap = _getGSAP();

  if (_windowExists() && gsap && document.body) {
    _window = window;
    _body = document.body;
    _docEl = document.documentElement;
    _toArray = gsap.utils.toArray;
    gsap.config({
      autoKillThreshold: 7
    });
    _config = gsap.config();
    _coreInitted = 1;
  }
};

var ScrollToPlugin = {
  version: "3.5.1",
  name: "scrollTo",
  rawVars: 1,
  register: function register(core) {
    gsap = core;

    _initCore();
  },
  init: function init(target, value, tween, index, targets) {
    if (!_coreInitted) {
      _initCore();
    }

    var data = this;
    data.isWin = target === _window;
    data.target = target;
    data.tween = tween;

    if (typeof value !== "object") {
      value = {
        y: value
      }; //if we don't receive an object as the parameter, assume the user intends "y".

      if (_isString(value.y) && value.y !== "max" && value.y.charAt(1) !== "=") {
        value.x = value.y;
      }
    } else if (value.nodeType) {
      value = {
        y: value,
        x: value
      };
    }

    data.vars = value;
    data.autoKill = !!value.autoKill;
    data.getX = _buildGetter(target, "x");
    data.getY = _buildGetter(target, "y");
    data.x = data.xPrev = data.getX();
    data.y = data.yPrev = data.getY();

    if (value.x != null) {
      data.add(data, "x", data.x, _parseVal(value.x, target, "x", data.x, value.offsetX || 0), index, targets, Math.round);

      data._props.push("scrollTo_x");
    } else {
      data.skipX = 1;
    }

    if (value.y != null) {
      data.add(data, "y", data.y, _parseVal(value.y, target, "y", data.y, value.offsetY || 0), index, targets, Math.round);

      data._props.push("scrollTo_y");
    } else {
      data.skipY = 1;
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt,
        target = data.target,
        tween = data.tween,
        autoKill = data.autoKill,
        xPrev = data.xPrev,
        yPrev = data.yPrev,
        isWin = data.isWin,
        x,
        y,
        yDif,
        xDif,
        threshold;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    x = isWin || !data.skipX ? data.getX() : xPrev;
    y = isWin || !data.skipY ? data.getY() : yPrev;
    yDif = y - yPrev;
    xDif = x - xPrev;
    threshold = _config.autoKillThreshold;

    if (data.x < 0) {
      //can't scroll to a position less than 0! Might happen if someone uses a Back.easeOut or Elastic.easeOut when scrolling back to the top of the page (for example)
      data.x = 0;
    }

    if (data.y < 0) {
      data.y = 0;
    }

    if (autoKill) {
      //note: iOS has a bug that throws off the scroll by several pixels, so we need to check if it's within 7 pixels of the previous one that we set instead of just looking for an exact match.
      if (!data.skipX && (xDif > threshold || xDif < -threshold) && x < _max(target, "x")) {
        data.skipX = 1; //if the user scrolls separately, we should stop tweening!
      }

      if (!data.skipY && (yDif > threshold || yDif < -threshold) && y < _max(target, "y")) {
        data.skipY = 1; //if the user scrolls separately, we should stop tweening!
      }

      if (data.skipX && data.skipY) {
        tween.kill();

        if (data.vars.onAutoKill) {
          data.vars.onAutoKill.apply(tween, data.vars.onAutoKillParams || []);
        }
      }
    }

    if (isWin) {
      _window.scrollTo(!data.skipX ? data.x : x, !data.skipY ? data.y : y);
    } else {
      if (!data.skipY) {
        target.scrollTop = data.y;
      }

      if (!data.skipX) {
        target.scrollLeft = data.x;
      }
    }

    data.xPrev = data.x;
    data.yPrev = data.y;
  },
  kill: function kill(property) {
    var both = property === "scrollTo";

    if (both || property === "scrollTo_x") {
      this.skipX = 1;
    }

    if (both || property === "scrollTo_y") {
      this.skipY = 1;
    }
  }
};
ScrollToPlugin.max = _max;
ScrollToPlugin.getOffset = _getOffset;
ScrollToPlugin.buildGetter = _buildGetter;
_getGSAP() && gsap.registerPlugin(ScrollToPlugin);


/***/ }),

/***/ "./node_modules/gsap/ScrollTrigger.js":
/*!********************************************!*\
  !*** ./node_modules/gsap/ScrollTrigger.js ***!
  \********************************************/
/*! exports provided: ScrollTrigger, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollTrigger", function() { return ScrollTrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScrollTrigger; });
/*!
 * ScrollTrigger 3.5.1
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _coreInitted,
    _win,
    _doc,
    _docEl,
    _body,
    _root,
    _resizeDelay,
    _raf,
    _request,
    _toArray,
    _clamp,
    _time2,
    _syncInterval,
    _refreshing,
    _pointerIsDown,
    _transformProp,
    _i,
    _prevWidth,
    _prevHeight,
    _autoRefresh,
    _sort,
    _limitCallbacks,
    // if true, we'll only trigger callbacks if the active state toggles, so if you scroll immediately past both the start and end positions of a ScrollTrigger (thus inactive to inactive), neither its onEnter nor onLeave will be called. This is useful during startup.
_startup = 1,
    _proxies = [],
    _scrollers = [],
    _getTime = Date.now,
    _time1 = _getTime(),
    _lastScrollTime = 0,
    _enabled = 1,
    _passThrough = function _passThrough(v) {
  return v;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _isViewport = function _isViewport(e) {
  return !!~_root.indexOf(e);
},
    _getProxyProp = function _getProxyProp(element, property) {
  return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
},
    _getScrollFunc = function _getScrollFunc(element, _ref) {
  var s = _ref.s,
      sc = _ref.sc;

  var i = _scrollers.indexOf(element),
      offset = sc === _vertical.sc ? 1 : 2;

  !~i && (i = _scrollers.push(element) - 1);
  return _scrollers[i + offset] || (_scrollers[i + offset] = _getProxyProp(element, s) || (_isViewport(element) ? sc : function (value) {
    return arguments.length ? element[s] = value : element[s];
  }));
},
    _getBoundsFunc = function _getBoundsFunc(element) {
  return _getProxyProp(element, "getBoundingClientRect") || (_isViewport(element) ? function () {
    _winOffsets.width = _win.innerWidth;
    _winOffsets.height = _win.innerHeight;
    return _winOffsets;
  } : function () {
    return _getBounds(element);
  });
},
    _getSizeFunc = function _getSizeFunc(scroller, isViewport, _ref2) {
  var d = _ref2.d,
      d2 = _ref2.d2,
      a = _ref2.a;
  return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function () {
    return a()[d];
  } : function () {
    return (isViewport ? _win["inner" + d2] : scroller["client" + d2]) || 0;
  };
},
    _getOffsetsFunc = function _getOffsetsFunc(element, isViewport) {
  return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function () {
    return _winOffsets;
  };
},
    _maxScroll = function _maxScroll(element, _ref3) {
  var s = _ref3.s,
      d2 = _ref3.d2,
      d = _ref3.d,
      a = _ref3.a;
  return (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport(element) ? Math.max(_docEl[s], _body[s]) - (_win["inner" + d2] || _docEl["client" + d2] || _body["client" + d2]) : element[s] - element["offset" + d2];
},
    _iterateAutoRefresh = function _iterateAutoRefresh(func, events) {
  for (var i = 0; i < _autoRefresh.length; i += 3) {
    (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
  }
},
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _callIfFunc = function _callIfFunc(value) {
  return _isFunction(value) && value();
},
    _combineFunc = function _combineFunc(f1, f2) {
  return function () {
    var result1 = _callIfFunc(f1),
        result2 = _callIfFunc(f2);

    return function () {
      _callIfFunc(result1);

      _callIfFunc(result2);
    };
  };
},
    _abs = Math.abs,
    _scrollLeft = "scrollLeft",
    _scrollTop = "scrollTop",
    _left = "left",
    _top = "top",
    _right = "right",
    _bottom = "bottom",
    _width = "width",
    _height = "height",
    _Right = "Right",
    _Left = "Left",
    _Top = "Top",
    _Bottom = "Bottom",
    _padding = "padding",
    _margin = "margin",
    _Width = "Width",
    _Height = "Height",
    _px = "px",
    _horizontal = {
  s: _scrollLeft,
  p: _left,
  p2: _Left,
  os: _right,
  os2: _Right,
  d: _width,
  d2: _Width,
  a: "x",
  sc: function sc(value) {
    return arguments.length ? _win.scrollTo(value, _vertical.sc()) : _win.pageXOffset || _doc[_scrollLeft] || _docEl[_scrollLeft] || _body[_scrollLeft] || 0;
  }
},
    _vertical = {
  s: _scrollTop,
  p: _top,
  p2: _Top,
  os: _bottom,
  os2: _Bottom,
  d: _height,
  d2: _Height,
  a: "y",
  op: _horizontal,
  sc: function sc(value) {
    return arguments.length ? _win.scrollTo(_horizontal.sc(), value) : _win.pageYOffset || _doc[_scrollTop] || _docEl[_scrollTop] || _body[_scrollTop] || 0;
  }
},
    _getComputedStyle = function _getComputedStyle(element) {
  return _win.getComputedStyle(element);
},
    _makePositionable = function _makePositionable(element) {
  return element.style.position = _getComputedStyle(element).position === "absolute" ? "absolute" : "relative";
},
    // if the element already has position: absolute, leave that, otherwise make it position: relative
_setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || (obj[p] = defaults[p]);
  }

  return obj;
},
    //_isInViewport = element => (element = _getBounds(element)) && !(element.top > (_win.innerHeight || _docEl.clientHeight) || element.bottom < 0 || element.left > (_win.innerWidth || _docEl.clientWidth) || element.right < 0) && element,
_getBounds = function _getBounds(element, withoutTransforms) {
  var tween = withoutTransforms && _getComputedStyle(element)[_transformProp] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap.to(element, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1),
      bounds = element.getBoundingClientRect();
  tween && tween.progress(0).kill();
  return bounds;
},
    _getSize = function _getSize(element, _ref4) {
  var d2 = _ref4.d2;
  return element["offset" + d2] || element["client" + d2] || 0;
},
    _getLabels = function _getLabels(animation) {
  return function (value) {
    var a = [],
        labels = animation.labels,
        duration = animation.duration(),
        p;

    for (p in labels) {
      a.push(labels[p] / duration);
    }

    return gsap.utils.snap(a, value);
  };
},
    _multiListener = function _multiListener(func, element, types, callback) {
  return types.split(",").forEach(function (type) {
    return func(element, type, callback);
  });
},
    _addListener = function _addListener(element, type, func) {
  return element.addEventListener(type, func, {
    passive: true
  });
},
    _removeListener = function _removeListener(element, type, func) {
  return element.removeEventListener(type, func);
},
    _markerDefaults = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
},
    _defaults = {
  toggleActions: "play",
  anticipatePin: 0
},
    _keywords = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
},
    _offsetToPx = function _offsetToPx(value, size) {
  if (_isString(value)) {
    var eqIndex = value.indexOf("="),
        relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;

    if (relative) {
      value.indexOf("%") > eqIndex && (relative *= size / 100);
      value = value.substr(0, eqIndex - 1);
    }

    value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
  }

  return value;
},
    _createMarker = function _createMarker(type, name, container, direction, _ref5, offset, matchWidthEl) {
  var startColor = _ref5.startColor,
      endColor = _ref5.endColor,
      fontSize = _ref5.fontSize,
      indent = _ref5.indent,
      fontWeight = _ref5.fontWeight;

  var e = _doc.createElement("div"),
      useFixedPosition = _isViewport(container) || _getProxyProp(container, "pinType") === "fixed",
      isScroller = type.indexOf("scroller") !== -1,
      parent = useFixedPosition ? _body : container,
      isStart = type.indexOf("start") !== -1,
      color = isStart ? startColor : endColor,
      css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";

  css += "position:" + (isScroller && useFixedPosition ? "fixed;" : "absolute;");
  (isScroller || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
  matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
  e._isStart = isStart;
  e.setAttribute("class", "gsap-marker-" + type);
  e.style.cssText = css;
  e.innerText = name || name === 0 ? type + "-" + name : type;
  parent.insertBefore(e, parent.children[0]);
  e._offset = e["offset" + direction.op.d2];

  _positionMarker(e, 0, direction, isStart);

  return e;
},
    _positionMarker = function _positionMarker(marker, start, direction, flipped) {
  var vars = {
    display: "block"
  },
      side = direction[flipped ? "os2" : "p2"],
      oppositeSide = direction[flipped ? "p2" : "os2"];
  marker._isFlipped = flipped;
  vars[direction.a + "Percent"] = flipped ? -100 : 0;
  vars[direction.a] = flipped ? 1 : 0;
  vars["border" + side + _Width] = 1;
  vars["border" + oppositeSide + _Width] = 0;
  vars[direction.p] = start;
  gsap.set(marker, vars);
},
    _triggers = [],
    _ids = {},
    _sync = function _sync() {
  return _request || (_request = _raf(_updateAll));
},
    _onScroll = function _onScroll() {
  if (!_request) {
    _request = _raf(_updateAll);
    _lastScrollTime || _dispatch("scrollStart");
    _lastScrollTime = _getTime();
  }
},
    _onResize = function _onResize() {
  return !_refreshing && _resizeDelay.restart(true);
},
    // ignore resizes triggered by refresh()
_listeners = {},
    _emptyArray = [],
    _media = [],
    _creatingMedia,
    // when ScrollTrigger.matchMedia() is called, we record the current media key here (like "(min-width: 800px)") so that we can assign it to everything that's created during that call. Then we can revert just those when necessary. In the ScrollTrigger's init() call, the _creatingMedia is recorded as a "media" property on the instance.
_lastMediaTick,
    _onMediaChange = function _onMediaChange(e) {
  var tick = gsap.ticker.frame,
      matches = [],
      i = 0,
      index;

  if (_lastMediaTick !== tick || _startup) {
    _revertAll();

    for (; i < _media.length; i += 4) {
      index = _win.matchMedia(_media[i]).matches;

      if (index !== _media[i + 3]) {
        // note: some browsers fire the matchMedia event multiple times, like when going full screen, so we shouldn't call the function multiple times. Check to see if it's already matched.
        _media[i + 3] = index;
        index ? matches.push(i) : _revertAll(1, _media[i]) || _isFunction(_media[i + 2]) && _media[i + 2](); // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.
      }
    }

    _revertRecorded(); // in case killing/reverting any of the animations actually added inline styles back.


    for (i = 0; i < matches.length; i++) {
      index = matches[i];
      _creatingMedia = _media[index];
      _media[index + 2] = _media[index + 1](e);
    }

    _creatingMedia = 0;

    _refreshAll(0, 1);

    _lastMediaTick = tick;

    _dispatch("matchMedia");
  }
},
    _softRefresh = function _softRefresh() {
  return _removeListener(ScrollTrigger, "scrollEnd", _softRefresh) || _refreshAll(true);
},
    _dispatch = function _dispatch(type) {
  return _listeners[type] && _listeners[type].map(function (f) {
    return f();
  }) || _emptyArray;
},
    _savedStyles = [],
    // when ScrollTrigger.saveStyles() is called, the inline styles are recorded in this Array in a sequential format like [element, cssText, gsCache, media]. This keeps it very memory-efficient and fast to iterate through.
_revertRecorded = function _revertRecorded(media) {
  for (var i = 0; i < _savedStyles.length; i += 4) {
    if (!media || _savedStyles[i + 3] === media) {
      _savedStyles[i].style.cssText = _savedStyles[i + 1];
      _savedStyles[i + 2].uncache = 1;
    }
  }
},
    _revertAll = function _revertAll(kill, media) {
  var trigger;

  for (_i = 0; _i < _triggers.length; _i++) {
    trigger = _triggers[_i];

    if (!media || trigger.media === media) {
      if (kill) {
        trigger.kill(1);
      } else {
        trigger.scroll.rec || (trigger.scroll.rec = trigger.scroll()); // record the scroll positions so that in each refresh() we can ensure that it doesn't shift. Remember, pinning can make things change around, especially if the same element is pinned multiple times. If one was already recorded, don't re-record because unpinning may have occurred and made it shorter.

        trigger.revert();
      }
    }
  }

  _revertRecorded(media);

  media || _dispatch("revert");
},
    _refreshAll = function _refreshAll(force, skipRevert) {
  if (_lastScrollTime && !force) {
    _addListener(ScrollTrigger, "scrollEnd", _softRefresh);

    return;
  }

  var refreshInits = _dispatch("refreshInit");

  _sort && ScrollTrigger.sort();
  skipRevert || _revertAll();

  for (_i = 0; _i < _triggers.length; _i++) {
    _triggers[_i].refresh();
  }

  refreshInits.forEach(function (result) {
    return result && result.render && result.render(-1);
  }); // if the onRefreshInit() returns an animation (typically a gsap.set()), revert it. This makes it easy to put things in a certain spot before refreshing for measurement purposes, and then put things back.

  _i = _triggers.length;

  while (_i--) {
    _triggers[_i].scroll.rec = 0;
  }

  _resizeDelay.pause();

  _dispatch("refresh");
},
    _lastScroll = 0,
    _direction = 1,
    _updateAll = function _updateAll() {
  var l = _triggers.length,
      time = _getTime(),
      recordVelocity = time - _time1 >= 50,
      scroll = l && _triggers[0].scroll();

  _direction = _lastScroll > scroll ? -1 : 1;
  _lastScroll = scroll;

  if (recordVelocity) {
    if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
      _lastScrollTime = 0;

      _dispatch("scrollEnd");
    }

    _time2 = _time1;
    _time1 = time;
  }

  if (_direction < 0) {
    _i = l;

    while (_i--) {
      _triggers[_i] && _triggers[_i].update(0, recordVelocity);
    }

    _direction = 1;
  } else {
    for (_i = 0; _i < l; _i++) {
      _triggers[_i] && _triggers[_i].update(0, recordVelocity);
    }
  }

  _request = 0;
},
    _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float"],
    _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]),
    _swapPinOut = function _swapPinOut(pin, spacer, state) {
  _setState(state);

  if (pin.parentNode === spacer) {
    var parent = spacer.parentNode;

    if (parent) {
      parent.insertBefore(pin, spacer);
      parent.removeChild(spacer);
    }
  }
},
    _swapPinIn = function _swapPinIn(pin, spacer, cs, spacerState) {
  if (pin.parentNode !== spacer) {
    var i = _propNamesToCopy.length,
        spacerStyle = spacer.style,
        pinStyle = pin.style,
        p;

    while (i--) {
      p = _propNamesToCopy[i];
      spacerStyle[p] = cs[p];
    }

    spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
    cs.display === "inline" && (spacerStyle.display = "inline-block");
    pinStyle[_bottom] = pinStyle[_right] = "auto";
    spacerStyle.overflow = "visible";
    spacerStyle.boxSizing = "border-box";
    spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
    spacerStyle[_height] = _getSize(pin, _vertical) + _px;
    spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";

    _setState(spacerState);

    pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
    pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
    pinStyle[_padding] = cs[_padding];
    pin.parentNode.insertBefore(spacer, pin);
    spacer.appendChild(pin);
  }
},
    _capsExp = /([A-Z])/g,
    _setState = function _setState(state) {
  if (state) {
    var style = state.t.style,
        l = state.length,
        i = 0,
        p,
        value;

    for (; i < l; i += 2) {
      value = state[i + 1];
      p = state[i];

      if (value) {
        style[p] = value;
      } else if (style[p]) {
        style.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
      }
    }
  }
},
    _getState = function _getState(element) {
  // returns an array with alternating values like [property, value, property, value] and a "t" property pointing to the target (element). Makes it fast and cheap.
  var l = _stateProps.length,
      style = element.style,
      state = [],
      i = 0;

  for (; i < l; i++) {
    state.push(_stateProps[i], style[_stateProps[i]]);
  }

  state.t = element;
  return state;
},
    _copyState = function _copyState(state, override, omitOffsets) {
  var result = [],
      l = state.length,
      i = omitOffsets ? 8 : 0,
      // skip top, left, right, bottom if omitOffsets is true
  p;

  for (; i < l; i += 2) {
    p = state[i];
    result.push(p, p in override ? override[p] : state[i + 1]);
  }

  result.t = state.t;
  return result;
},
    _winOffsets = {
  left: 0,
  top: 0
},
    _parsePosition = function _parsePosition(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax) {
  _isFunction(value) && (value = value(self));

  if (_isString(value) && value.substr(0, 3) === "max") {
    value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
  }

  if (!_isNumber(value)) {
    _isFunction(trigger) && (trigger = trigger(self));

    var element = _toArray(trigger)[0] || _body,
        bounds = _getBounds(element) || {},
        offsets = value.split(" "),
        localOffset,
        globalOffset,
        display;

    if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
      // if display is "none", it won't report getBoundingClientRect() properly
      display = element.style.display;
      element.style.display = "block";
      bounds = _getBounds(element);
      display ? element.style.display = display : element.style.removeProperty("display");
    }

    localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
    globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
    value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
    markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
    scrollerSize -= scrollerSize - globalOffset; // adjust for the marker
  } else if (markerScroller) {
    _positionMarker(markerScroller, scrollerSize, direction, true);
  }

  if (marker) {
    var position = value + scrollerSize,
        isStart = marker._isStart;
    scrollerMax = "scroll" + direction.d2;

    _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body[scrollerMax], _docEl[scrollerMax]) : marker.parentNode[scrollerMax]) <= position + 1);

    if (useFixedPosition) {
      scrollerBounds = _getBounds(markerScroller);
      useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
    }
  }

  return Math.round(value);
},
    _prefixExp = /(?:webkit|moz|length|cssText)/i,
    _reparent = function _reparent(element, parent, top, left) {
  if (element.parentNode !== parent) {
    var style = element.style,
        p,
        cs;

    if (parent === _body) {
      element._stOrig = style.cssText; // record original inline styles so we can revert them later

      cs = _getComputedStyle(element);

      for (p in cs) {
        // must copy all relevant styles to ensure that nothing changes visually when we reparent to the <body>. Skip the vendor prefixed ones.
        if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
          style[p] = cs[p];
        }
      }

      style.top = top;
      style.left = left;
    } else {
      style.cssText = element._stOrig;
    }

    gsap.core.getCache(element).uncache = 1;
    parent.appendChild(element);
  }
},
    // returns a function that can be used to tween the scroll position in the direction provided, and when doing so it'll add a .tween property to the FUNCTION itself, and remove it when the tween completes or gets killed. This gives us a way to have multiple ScrollTriggers use a central function for any given scroller and see if there's a scroll tween running (which would affect if/how things get updated)
_getTweenCreator = function _getTweenCreator(scroller, direction) {
  var getScroll = _getScrollFunc(scroller, direction),
      prop = "_scroll" + direction.p2,
      // add a tweenable property to the scroller that's a getter/setter function, like _scrollTop or _scrollLeft. This way, if someone does gsap.killTweensOf(scroller) it'll kill the scroll tween.
  lastScroll1,
      lastScroll2,
      getTween = function getTween(scrollTo, vars, initialValue, change1, change2) {
    var tween = getTween.tween,
        onComplete = vars.onComplete,
        modifiers = {};
    tween && tween.kill();
    lastScroll1 = Math.round(initialValue);
    vars[prop] = scrollTo;
    vars.modifiers = modifiers;

    modifiers[prop] = function (value) {
      value = Math.round(getScroll()); // round because in some [very uncommon] Windows environments, it can get reported with decimals even though it was set without.

      if (value !== lastScroll1 && value !== lastScroll2) {
        // if the user scrolls, kill the tween. iOS Safari intermittently misreports the scroll position, it may be the most recently-set one or the one before that!
        tween.kill();
        getTween.tween = 0;
      } else {
        value = initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio;
      }

      lastScroll2 = lastScroll1;
      return lastScroll1 = Math.round(value);
    };

    vars.onComplete = function () {
      getTween.tween = 0;
      onComplete && onComplete.call(tween);
    };

    tween = getTween.tween = gsap.to(scroller, vars);
    return tween;
  };

  scroller[prop] = getScroll;
  return getTween;
};

_horizontal.op = _vertical;
var ScrollTrigger = /*#__PURE__*/function () {
  function ScrollTrigger(vars, animation) {
    _coreInitted || ScrollTrigger.register(gsap) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
    this.init(vars, animation);
  }

  var _proto = ScrollTrigger.prototype;

  _proto.init = function init(vars, animation) {
    this.progress = 0;
    this.vars && this.kill(1); // in case it's being initted again

    if (!_enabled) {
      this.update = this.refresh = this.kill = _passThrough;
      return;
    }

    vars = _setDefaults(_isString(vars) || _isNumber(vars) || vars.nodeType ? {
      trigger: vars
    } : vars, _defaults);

    var direction = vars.horizontal ? _horizontal : _vertical,
        _vars = vars,
        onUpdate = _vars.onUpdate,
        toggleClass = _vars.toggleClass,
        id = _vars.id,
        onToggle = _vars.onToggle,
        onRefresh = _vars.onRefresh,
        scrub = _vars.scrub,
        trigger = _vars.trigger,
        pin = _vars.pin,
        pinSpacing = _vars.pinSpacing,
        invalidateOnRefresh = _vars.invalidateOnRefresh,
        anticipatePin = _vars.anticipatePin,
        onScrubComplete = _vars.onScrubComplete,
        onSnapComplete = _vars.onSnapComplete,
        once = _vars.once,
        snap = _vars.snap,
        pinReparent = _vars.pinReparent,
        isToggle = !scrub && scrub !== 0,
        scroller = _toArray(vars.scroller || _win)[0],
        scrollerCache = gsap.core.getCache(scroller),
        isViewport = _isViewport(scroller),
        useFixedPosition = "pinType" in vars ? vars.pinType === "fixed" : isViewport || _getProxyProp(scroller, "pinType") === "fixed",
        callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack],
        toggleActions = isToggle && vars.toggleActions.split(" "),
        markers = "markers" in vars ? vars.markers : _defaults.markers,
        borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0,
        self = this,
        onRefreshInit = vars.onRefreshInit && function () {
      return vars.onRefreshInit(self);
    },
        getScrollerSize = _getSizeFunc(scroller, isViewport, direction),
        getScrollerOffsets = _getOffsetsFunc(scroller, isViewport),
        tweenTo,
        pinCache,
        snapFunc,
        isReverted,
        scroll1,
        scroll2,
        start,
        end,
        markerStart,
        markerEnd,
        markerStartTrigger,
        markerEndTrigger,
        markerVars,
        change,
        pinOriginalState,
        pinActiveState,
        pinState,
        spacer,
        offset,
        pinGetter,
        pinSetter,
        pinStart,
        pinChange,
        spacingStart,
        spacerState,
        markerStartSetter,
        markerEndSetter,
        cs,
        snap1,
        snap2,
        scrubTween,
        scrubSmooth,
        snapDurClamp,
        snapDelayedCall,
        prevProgress,
        prevScroll,
        prevAnimProgress;

    self.media = _creatingMedia;
    anticipatePin *= 45;

    _triggers.push(self);

    self.scroller = scroller;
    self.scroll = _getScrollFunc(scroller, direction);
    scroll1 = self.scroll();
    self.vars = vars;
    animation = animation || vars.animation;
    "refreshPriority" in vars && (_sort = 1);
    scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
      top: _getTweenCreator(scroller, _vertical),
      left: _getTweenCreator(scroller, _horizontal)
    };
    self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];

    if (animation) {
      animation.vars.lazy = false;
      animation._initted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.render(0, true, true);
      self.animation = animation.pause();
      animation.scrollTrigger = self;
      scrubSmooth = _isNumber(scrub) && scrub;
      scrubSmooth && (scrubTween = gsap.to(animation, {
        ease: "power3",
        duration: scrubSmooth,
        onComplete: function onComplete() {
          return onScrubComplete && onScrubComplete(self);
        }
      }));
      snap1 = 0;
      id || (id = animation.vars.id);
    }

    if (snap) {
      _isObject(snap) || (snap = {
        snapTo: snap
      });
      gsap.set(isViewport ? [_body, _docEl] : scroller, {
        scrollBehavior: "auto"
      }); // smooth scrolling doesn't work with snap.

      snapFunc = _isFunction(snap.snapTo) ? snap.snapTo : snap.snapTo === "labels" ? _getLabels(animation) : gsap.utils.snap(snap.snapTo);
      snapDurClamp = snap.duration || {
        min: 0.1,
        max: 2
      };
      snapDurClamp = _isObject(snapDurClamp) ? _clamp(snapDurClamp.min, snapDurClamp.max) : _clamp(snapDurClamp, snapDurClamp);
      snapDelayedCall = gsap.delayedCall(snap.delay || scrubSmooth / 2 || 0.1, function () {
        if (Math.abs(self.getVelocity()) < 10 && !_pointerIsDown) {
          var totalProgress = animation && !isToggle ? animation.totalProgress() : self.progress,
              velocity = (totalProgress - snap2) / (_getTime() - _time2) * 1000 || 0,
              change1 = _abs(velocity / 2) * velocity / 0.185,
              naturalEnd = totalProgress + change1,
              endValue = _clamp(0, 1, snapFunc(naturalEnd, self)),
              scroll = self.scroll(),
              endScroll = Math.round(start + endValue * change),
              tween = tweenTo.tween;

          if (scroll <= end && scroll >= start && endScroll !== scroll) {
            if (tween && !tween._initted && tween.data <= Math.abs(endScroll - scroll)) {
              // there's an overlapping snap! So we must figure out which one is closer and let that tween live.
              return;
            }

            tweenTo(endScroll, {
              duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
              ease: snap.ease || "power3",
              data: Math.abs(endScroll - scroll),
              // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
              onComplete: function onComplete() {
                snap1 = snap2 = animation && !isToggle ? animation.totalProgress() : self.progress;
                onSnapComplete && onSnapComplete(self);
              }
            }, scroll, change1 * change, endScroll - scroll - change1 * change);
          }
        } else if (self.isActive) {
          snapDelayedCall.restart(true);
        }
      }).pause();
    }

    id && (_ids[id] = self);
    trigger = self.trigger = _toArray(trigger || pin)[0];
    pin = pin === true ? trigger : _toArray(pin)[0];
    _isString(toggleClass) && (toggleClass = {
      targets: trigger,
      className: toggleClass
    });

    if (pin) {
      pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding); // if the parent is display: flex, don't apply pinSpacing by default.

      self.pin = pin;
      vars.force3D !== false && gsap.set(pin, {
        force3D: true
      });
      pinCache = gsap.core.getCache(pin);

      if (!pinCache.spacer) {
        // record the spacer and pinOriginalState on the cache in case someone tries pinning the same element with MULTIPLE ScrollTriggers - we don't want to have multiple spacers or record the "original" pin state after it has already been affected by another ScrollTrigger.
        pinCache.spacer = spacer = _doc.createElement("div");
        spacer.setAttribute("class", "pin-spacer" + (id ? " pin-spacer-" + id : ""));
        pinCache.pinState = pinOriginalState = _getState(pin);
      } else {
        pinOriginalState = pinCache.pinState;
      }

      self.spacer = spacer = pinCache.spacer;
      cs = _getComputedStyle(pin);
      spacingStart = cs[pinSpacing + direction.os2];
      pinGetter = gsap.getProperty(pin);
      pinSetter = gsap.quickSetter(pin, direction.a, _px); // pin.firstChild && !_maxScroll(pin, direction) && (pin.style.overflow = "hidden"); // protects from collapsing margins, but can have unintended consequences as demonstrated here: https://codepen.io/GreenSock/pen/1e42c7a73bfa409d2cf1e184e7a4248d so it was removed in favor of just telling people to set up their CSS to avoid the collapsing margins (overflow: hidden | auto is just one option. Another is border-top: 1px solid transparent).

      _swapPinIn(pin, spacer, cs);

      pinState = _getState(pin);
    }

    if (markers) {
      markerVars = _isObject(markers) ? _setDefaults(markers, _markerDefaults) : _markerDefaults;
      markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
      markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
      offset = markerStartTrigger["offset" + direction.op.d2];
      markerStart = _createMarker("start", id, scroller, direction, markerVars, offset);
      markerEnd = _createMarker("end", id, scroller, direction, markerVars, offset);

      if (!useFixedPosition) {
        _makePositionable(scroller);

        gsap.set([markerStartTrigger, markerEndTrigger], {
          force3D: true
        });
        markerStartSetter = gsap.quickSetter(markerStartTrigger, direction.a, _px);
        markerEndSetter = gsap.quickSetter(markerEndTrigger, direction.a, _px);
      }
    }

    self.revert = function (revert) {
      var r = revert !== false || !self.enabled,
          prevRefreshing = _refreshing;

      if (r !== isReverted) {
        if (r) {
          prevScroll = Math.max(self.scroll(), self.scroll.rec || 0); // record the scroll so we can revert later (repositioning/pinning things can affect scroll position). In the static refresh() method, we first record all the scroll positions as a reference.

          prevProgress = self.progress;
          prevAnimProgress = animation && animation.progress();
        }

        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
          return m.style.display = r ? "none" : "block";
        });
        r && (_refreshing = 1);
        self.update(r); // make sure the pin is back in its original position so that all the measurements are correct.

        _refreshing = prevRefreshing;
        pin && (r ? _swapPinOut(pin, spacer, pinOriginalState) : (!pinReparent || !self.isActive) && _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState));
        isReverted = r;
      }
    };

    self.refresh = function (soft) {
      if (_refreshing || !self.enabled) {
        return;
      }

      if (pin && soft && _lastScrollTime) {
        _addListener(ScrollTrigger, "scrollEnd", _softRefresh);

        return;
      }

      _refreshing = 1;
      scrubTween && scrubTween.kill();
      invalidateOnRefresh && animation && animation.progress(0).invalidate();
      isReverted || self.revert();

      var size = getScrollerSize(),
          scrollerBounds = getScrollerOffsets(),
          max = _maxScroll(scroller, direction),
          offset = 0,
          otherPinOffset = 0,
          parsedEnd = vars.end,
          parsedEndTrigger = vars.endTrigger || trigger,
          parsedStart = vars.start || (vars.start === 0 ? 0 : pin || !trigger ? "0 0" : "0 100%"),
          triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0,
          i = triggerIndex,
          cs,
          bounds,
          scroll,
          isVertical,
          override,
          curTrigger,
          curPin,
          oppositeScroll;

      while (i--) {
        // user might try to pin the same element more than once, so we must find any prior triggers with the same pin, revert them, and determine how long they're pinning so that we can offset things appropriately. Make sure we revert from last to first so that things "rewind" properly.
        curPin = _triggers[i].pin;
        curPin && (curPin === trigger || curPin === pin) && _triggers[i].revert();
      }

      start = _parsePosition(parsedStart, trigger, size, direction, self.scroll(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max) || (pin ? -0.001 : 0);
      _isFunction(parsedEnd) && (parsedEnd = parsedEnd(self));

      if (_isString(parsedEnd) && !parsedEnd.indexOf("+=")) {
        if (~parsedEnd.indexOf(" ")) {
          parsedEnd = (_isString(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
        } else {
          offset = _offsetToPx(parsedEnd.substr(2), size);
          parsedEnd = _isString(parsedStart) ? parsedStart : start + offset; // _parsePosition won't factor in the offset if the start is a number, so do it here.

          parsedEndTrigger = trigger;
        }
      }

      end = Math.max(start, _parsePosition(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, self.scroll() + offset, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max)) || -0.001;
      change = end - start || (start -= 0.01) && 0.001;
      offset = 0;
      i = triggerIndex;

      while (i--) {
        curTrigger = _triggers[i];
        curPin = curTrigger.pin;

        if (curPin && curTrigger.start - curTrigger._pinPush < start) {
          cs = curTrigger.end - curTrigger.start;
          curPin === trigger && (offset += cs);
          curPin === pin && (otherPinOffset += cs);
        }
      }

      start += offset;
      end += offset;
      self._pinPush = otherPinOffset;

      if (markerStart && offset) {
        // offset the markers if necessary
        cs = {};
        cs[direction.a] = "+=" + offset;
        gsap.set([markerStart, markerEnd], cs);
      }

      if (pin) {
        cs = _getComputedStyle(pin);
        isVertical = direction === _vertical;
        scroll = self.scroll(); // recalculate because the triggers can affect the scroll

        pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
        !max && end > 1 && ((isViewport ? _body : scroller).style["overflow-" + direction.a] = "scroll"); // makes sure the scroller has a scrollbar, otherwise if something has width: 100%, for example, it would be too big (exclude the scrollbar). See https://greensock.com/forums/topic/25182-scrolltrigger-width-of-page-increase-where-markers-are-set-to-false/

        _swapPinIn(pin, spacer, cs);

        pinState = _getState(pin); // transforms will interfere with the top/left/right/bottom placement, so remove them temporarily. getBoundingClientRect() factors in transforms.

        bounds = _getBounds(pin, true);
        oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();

        if (pinSpacing) {
          spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
          spacerState.t = spacer;
          i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
          i && spacerState.push(direction.d, i + _px); // for box-sizing: border-box (must include padding).

          _setState(spacerState);

          useFixedPosition && self.scroll(prevScroll);
        }

        if (useFixedPosition) {
          override = {
            top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
            left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
            boxSizing: "border-box",
            position: "fixed"
          };
          override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
          override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
          override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
          override[_padding] = cs[_padding];
          override[_padding + _Top] = cs[_padding + _Top];
          override[_padding + _Right] = cs[_padding + _Right];
          override[_padding + _Bottom] = cs[_padding + _Bottom];
          override[_padding + _Left] = cs[_padding + _Left];
          pinActiveState = _copyState(pinOriginalState, override, pinReparent);
        }

        if (animation) {
          // the animation might be affecting the transform, so we must jump to the end, check the value, and compensate accordingly. Otherwise, when it becomes unpinned, the pinSetter() will get set to a value that doesn't include whatever the animation did.
          animation.progress(1, true);
          pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
          change !== pinChange && pinActiveState.splice(pinActiveState.length - 2, 2); // transform is the last property/value set in the state Array. Since the animation is controlling that, we should omit it.

          animation.progress(0, true);
        } else {
          pinChange = change;
        }
      } else if (trigger && self.scroll()) {
        // it may be INSIDE a pinned element, so walk up the tree and look for any elements with _pinOffset to compensate because anything with pinSpacing that's already scrolled would throw off the measurements in getBoundingClientRect()
        bounds = trigger.parentNode;

        while (bounds && bounds !== _body) {
          if (bounds._pinOffset) {
            start -= bounds._pinOffset;
            end -= bounds._pinOffset;
          }

          bounds = bounds.parentNode;
        }
      }

      for (i = 0; i < triggerIndex; i++) {
        // make sure we revert from first to last to make sure things reach their end state properly
        curTrigger = _triggers[i].pin;
        curTrigger && (curTrigger === trigger || curTrigger === pin) && _triggers[i].revert(false);
      }

      self.start = start;
      self.end = end;
      scroll1 = scroll2 = self.scroll(); // reset velocity

      scroll1 < prevScroll && self.scroll(prevScroll);
      self.revert(false);
      _refreshing = 0;
      prevAnimProgress && isToggle && animation.progress(prevAnimProgress, true);

      if (prevProgress !== self.progress) {
        // ensures that the direction is set properly (when refreshing, progress is set back to 0 initially, then back again to wherever it needs to be) and that callbacks are triggered.
        scrubTween && animation.totalProgress(prevProgress, true); // to avoid issues where animation callbacks like onStart aren't triggered.

        self.progress = prevProgress;
        self.update();
      }

      pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
      onRefresh && onRefresh(self);
    };

    self.getVelocity = function () {
      return (self.scroll() - scroll2) / (_getTime() - _time2) * 1000 || 0;
    };

    self.update = function (reset, recordVelocity) {
      var scroll = self.scroll(),
          p = reset ? 0 : (scroll - start) / change,
          clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0,
          prevProgress = self.progress,
          isActive,
          wasActive,
          toggleState,
          action,
          stateChanged,
          toggled;

      if (recordVelocity) {
        scroll2 = scroll1;
        scroll1 = scroll;

        if (snap) {
          snap2 = snap1;
          snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
        }
      } // anticipate the pinning a few ticks ahead of time based on velocity to avoid a visual glitch due to the fact that most browsers do scrolling on a separate thread (not synced with requestAnimationFrame).


      anticipatePin && !clipped && pin && !_refreshing && !_startup && _lastScrollTime && start < scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin && (clipped = 0.0001);

      if (clipped !== prevProgress && self.enabled) {
        isActive = self.isActive = !!clipped && clipped < 1;
        wasActive = !!prevProgress && prevProgress < 1;
        toggled = isActive !== wasActive;
        stateChanged = toggled || !!clipped !== !!prevProgress; // could go from start all the way to end, thus it didn't toggle but it did change state in a sense (may need to fire a callback)

        self.direction = clipped > prevProgress ? 1 : -1;
        self.progress = clipped;

        if (!isToggle) {
          if (scrubTween && !_refreshing && !_startup) {
            scrubTween.vars.totalProgress = clipped;
            scrubTween.invalidate().restart();
          } else if (animation) {
            animation.totalProgress(clipped, !!_refreshing);
          }
        }

        if (pin) {
          reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);

          if (!useFixedPosition) {
            pinSetter(pinStart + pinChange * clipped);
          } else if (stateChanged) {
            action = !reset && clipped > prevProgress && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction); // if it's at the VERY end of the page, don't switch away from position: fixed because it's pointless and it could cause a brief flash when the user scrolls back up (when it gets pinned again)

            if (pinReparent) {
              if (!reset && (isActive || action)) {
                var bounds = _getBounds(pin, true),
                    _offset = scroll - start;

                _reparent(pin, _body, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
              } else {
                _reparent(pin, spacer);
              }
            }

            _setState(isActive || action ? pinActiveState : pinState);

            pinChange !== change && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !action ? pinChange : 0));
          }
        }

        snap && !tweenTo.tween && !_refreshing && !_startup && snapDelayedCall.restart(true);
        toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function (el) {
          return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
        }); // classes could affect positioning, so do it even if reset or refreshing is true.

        onUpdate && !isToggle && !reset && onUpdate(self);

        if (stateChanged && !_refreshing) {
          toggleState = clipped && !prevProgress ? 0 : clipped === 1 ? 1 : prevProgress === 1 ? 2 : 3; // 0 = enter, 1 = leave, 2 = enterBack, 3 = leaveBack (we prioritize the FIRST encounter, thus if you scroll really fast past the onEnter and onLeave in one tick, it'd prioritize onEnter.

          if (isToggle) {
            action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState]; // if it didn't toggle, that means it shot right past and since we prioritize the "enter" action, we should switch to the "leave" in this case (but only if one is defined)

            if (animation && (action === "complete" || action === "reset" || action in animation)) {
              if (action === "complete") {
                animation.pause().totalProgress(1);
              } else if (action === "reset") {
                animation.restart(true).pause();
              } else {
                animation[action]();
              }
            }

            onUpdate && onUpdate(self);
          }

          if (toggled || !_limitCallbacks) {
            // on startup, the page could be scrolled and we don't want to fire callbacks that didn't toggle. For example onEnter shouldn't fire if the ScrollTrigger isn't actually entered.
            onToggle && toggled && onToggle(self);
            callbacks[toggleState] && callbacks[toggleState](self);
            once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0); // a callback shouldn't be called again if once is true.

            if (!toggled) {
              // it's possible to go completely past, like from before the start to after the end (or vice-versa) in which case BOTH callbacks should be fired in that order
              toggleState = clipped === 1 ? 1 : 3;
              callbacks[toggleState] && callbacks[toggleState](self);
            }
          }
        } else if (isToggle && onUpdate && !_refreshing) {
          onUpdate(self);
        }
      } // update absolutely-positioned markers (only if the scroller isn't the viewport)


      if (markerEndSetter) {
        markerStartSetter(scroll + (markerStartTrigger._isFlipped ? 1 : 0));
        markerEndSetter(scroll);
      }
    };

    self.enable = function () {
      if (!self.enabled) {
        self.enabled = true;

        _addListener(scroller, "resize", _onResize);

        _addListener(scroller, "scroll", _onScroll);

        onRefreshInit && _addListener(ScrollTrigger, "refreshInit", onRefreshInit);
        !animation || !animation.add ? self.refresh() : gsap.delayedCall(0.01, function () {
          return start || end || self.refresh();
        }) && (change = 0.01) && (start = end = 0); // if the animation is a timeline, it may not have been populated yet, so it wouldn't render at the proper place on the first refresh(), thus we should schedule one for the next tick.
      }
    };

    self.disable = function (reset, allowAnimation) {
      if (self.enabled) {
        reset !== false && self.revert();
        self.enabled = self.isActive = false;
        allowAnimation || scrubTween && scrubTween.pause();
        prevScroll = 0;
        pinCache && (pinCache.uncache = 1);
        onRefreshInit && _removeListener(ScrollTrigger, "refreshInit", onRefreshInit);

        if (snapDelayedCall) {
          snapDelayedCall.pause();
          tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
        }

        if (!isViewport) {
          var i = _triggers.length;

          while (i--) {
            if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
              return; //don't remove the listeners if there are still other triggers referencing it.
            }
          }

          _removeListener(scroller, "resize", _onResize);

          _removeListener(scroller, "scroll", _onScroll);
        }
      }
    };

    self.kill = function (revert, allowAnimation) {
      self.disable(revert, allowAnimation);
      id && delete _ids[id];

      var i = _triggers.indexOf(self);

      _triggers.splice(i, 1);

      i === _i && _direction > 0 && _i--; // if we're in the middle of a refresh() or update(), splicing would cause skips in the index, so adjust...

      if (animation) {
        animation.scrollTrigger = null;
        revert && animation.render(-1);
        allowAnimation || animation.kill();
      }

      markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
        return m.parentNode.removeChild(m);
      });
      pinCache && (pinCache.uncache = 1);
    };

    self.enable();
  };

  ScrollTrigger.register = function register(core) {
    if (!_coreInitted) {
      gsap = core || _getGSAP();

      if (_windowExists() && window.document) {
        _win = window;
        _doc = document;
        _docEl = _doc.documentElement;
        _body = _doc.body;
      }

      if (gsap) {
        _toArray = gsap.utils.toArray;
        _clamp = gsap.utils.clamp;
        gsap.core.globals("ScrollTrigger", ScrollTrigger); // must register the global manually because in Internet Explorer, functions (classes) don't have a "name" property.

        if (_body) {
          _raf = _win.requestAnimationFrame || function (f) {
            return setTimeout(f, 16);
          };

          _addListener(_win, "mousewheel", _onScroll);

          _root = [_win, _doc, _docEl, _body];

          _addListener(_doc, "scroll", _onScroll); // some browsers (like Chrome), the window stops dispatching scroll events on the window if you scroll really fast, but it's consistent on the document!


          var bodyStyle = _body.style,
              border = bodyStyle.borderTop,
              bounds;
          bodyStyle.borderTop = "1px solid #000"; // works around an issue where a margin of a child element could throw off the bounds of the _body, making it seem like there's a margin when there actually isn't. The border ensures that the bounds are accurate.

          bounds = _getBounds(_body);
          _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0; // accommodate the offset of the <body> caused by margins and/or padding

          _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
          border ? bodyStyle.borderTop = border : bodyStyle.removeProperty("border-top");
          _syncInterval = setInterval(_sync, 200);
          gsap.delayedCall(0.5, function () {
            return _startup = 0;
          });

          _addListener(_doc, "touchcancel", _passThrough); // some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document.


          _addListener(_body, "touchstart", _passThrough); //works around Safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/


          _multiListener(_addListener, _doc, "pointerdown,touchstart,mousedown", function () {
            return _pointerIsDown = 1;
          });

          _multiListener(_addListener, _doc, "pointerup,touchend,mouseup", function () {
            return _pointerIsDown = 0;
          });

          _transformProp = gsap.utils.checkPrefix("transform");

          _stateProps.push(_transformProp);

          _coreInitted = _getTime();
          _resizeDelay = gsap.delayedCall(0.2, _refreshAll).pause();
          _autoRefresh = [_doc, "visibilitychange", function () {
            var w = _win.innerWidth,
                h = _win.innerHeight;

            if (_doc.hidden) {
              _prevWidth = w;
              _prevHeight = h;
            } else if (_prevWidth !== w || _prevHeight !== h) {
              _onResize();
            }
          }, _doc, "DOMContentLoaded", _refreshAll, _win, "load", function () {
            return _lastScrollTime || _refreshAll();
          }, _win, "resize", _onResize];

          _iterateAutoRefresh(_addListener);
        }
      }
    }

    return _coreInitted;
  };

  ScrollTrigger.defaults = function defaults(config) {
    for (var p in config) {
      _defaults[p] = config[p];
    }
  };

  ScrollTrigger.kill = function kill() {
    _enabled = 0;

    _triggers.slice(0).forEach(function (trigger) {
      return trigger.kill(1);
    });
  };

  ScrollTrigger.config = function config(vars) {
    "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
    var ms = vars.syncInterval;
    ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
    "autoRefreshEvents" in vars && (_iterateAutoRefresh(_removeListener) || _iterateAutoRefresh(_addListener, vars.autoRefreshEvents || "none"));
  };

  ScrollTrigger.scrollerProxy = function scrollerProxy(target, vars) {
    var t = _toArray(target)[0];

    _isViewport(t) ? _proxies.unshift(_win, vars, _body, vars, _docEl, vars) : _proxies.unshift(t, vars);
  };

  ScrollTrigger.matchMedia = function matchMedia(vars) {
    // _media is populated in the following order: mediaQueryString, onMatch, onUnmatch, isMatched. So if there are two media queries, the Array would have a length of 8
    var mq, p, i, func, result;

    for (p in vars) {
      i = _media.indexOf(p);
      func = vars[p];
      _creatingMedia = p;

      if (p === "all") {
        func();
      } else {
        mq = _win.matchMedia(p);

        if (mq) {
          mq.matches && (result = func());

          if (~i) {
            _media[i + 1] = _combineFunc(_media[i + 1], func);
            _media[i + 2] = _combineFunc(_media[i + 2], result);
          } else {
            i = _media.length;

            _media.push(p, func, result);

            mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
          }

          _media[i + 3] = mq.matches;
        }
      }

      _creatingMedia = 0;
    }

    return _media;
  };

  ScrollTrigger.clearMatchMedia = function clearMatchMedia(query) {
    query || (_media.length = 0);
    query = _media.indexOf(query);
    query >= 0 && _media.splice(query, 4);
  };

  return ScrollTrigger;
}();
ScrollTrigger.version = "3.5.1";

ScrollTrigger.saveStyles = function (targets) {
  return targets ? _toArray(targets).forEach(function (target) {
    var i = _savedStyles.indexOf(target);

    i >= 0 && _savedStyles.splice(i, 4);

    _savedStyles.push(target, target.style.cssText, gsap.core.getCache(target), _creatingMedia);
  }) : _savedStyles;
};

ScrollTrigger.revert = function (soft, media) {
  return _revertAll(!soft, media);
};

ScrollTrigger.create = function (vars, animation) {
  return new ScrollTrigger(vars, animation);
};

ScrollTrigger.refresh = function (safe) {
  return safe ? _onResize() : _refreshAll(true);
};

ScrollTrigger.update = _updateAll;

ScrollTrigger.maxScroll = function (element, horizontal) {
  return _maxScroll(element, horizontal ? _horizontal : _vertical);
};

ScrollTrigger.getScrollFunc = function (element, horizontal) {
  return _getScrollFunc(_toArray(element)[0], horizontal ? _horizontal : _vertical);
};

ScrollTrigger.getById = function (id) {
  return _ids[id];
};

ScrollTrigger.getAll = function () {
  return _triggers.slice(0);
};

ScrollTrigger.isScrolling = function () {
  return !!_lastScrollTime;
};

ScrollTrigger.addEventListener = function (type, callback) {
  var a = _listeners[type] || (_listeners[type] = []);
  ~a.indexOf(callback) || a.push(callback);
};

ScrollTrigger.removeEventListener = function (type, callback) {
  var a = _listeners[type],
      i = a && a.indexOf(callback);
  i >= 0 && a.splice(i, 1);
};

ScrollTrigger.batch = function (targets, vars) {
  var result = [],
      varsCopy = {},
      interval = vars.interval || 0.016,
      batchMax = vars.batchMax || 1e9,
      proxyCallback = function proxyCallback(type, callback) {
    var elements = [],
        triggers = [],
        delay = gsap.delayedCall(interval, function () {
      callback(elements, triggers);
      elements = [];
      triggers = [];
    }).pause();
    return function (self) {
      elements.length || delay.restart(true);
      elements.push(self.trigger);
      triggers.push(self);
      batchMax <= elements.length && delay.progress(1);
    };
  },
      p;

  for (p in vars) {
    varsCopy[p] = p.substr(0, 2) === "on" && _isFunction(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
  }

  if (_isFunction(batchMax)) {
    batchMax = batchMax();

    _addListener(ScrollTrigger, "refresh", function () {
      return batchMax = vars.batchMax();
    });
  }

  _toArray(targets).forEach(function (target) {
    var config = {};

    for (p in varsCopy) {
      config[p] = varsCopy[p];
    }

    config.trigger = target;
    result.push(ScrollTrigger.create(config));
  });

  return result;
};

ScrollTrigger.sort = function (func) {
  return _triggers.sort(func || function (a, b) {
    return (a.vars.refreshPriority || 0) * -1e6 + a.start - (b.start + (b.vars.refreshPriority || 0) * -1e6);
  });
};

_getGSAP() && gsap.registerPlugin(ScrollTrigger);


/***/ }),

/***/ "./node_modules/gsap/TextPlugin.js":
/*!*****************************************!*\
  !*** ./node_modules/gsap/TextPlugin.js ***!
  \*****************************************/
/*! exports provided: TextPlugin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextPlugin", function() { return TextPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextPlugin; });
/* harmony import */ var _utils_strings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/strings.js */ "./node_modules/gsap/utils/strings.js");
/*!
 * TextPlugin 3.5.1
 * https://greensock.com
 *
 * @license Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var gsap,
    _tempDiv,
    _getGSAP = function _getGSAP() {
  return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
};

var TextPlugin = {
  version: "3.5.1",
  name: "text",
  init: function init(target, value, tween) {
    var i = target.nodeName.toUpperCase(),
        data = this,
        _short,
        text,
        original,
        j,
        condensedText,
        condensedOriginal,
        aggregate,
        s;

    data.svg = target.getBBox && (i === "TEXT" || i === "TSPAN");

    if (!("innerHTML" in target) && !data.svg) {
      return false;
    }

    data.target = target;

    if (typeof value !== "object") {
      value = {
        value: value
      };
    }

    if (!("value" in value)) {
      data.text = data.original = [""];
      return;
    }

    data.delimiter = value.delimiter || "";
    original = Object(_utils_strings_js__WEBPACK_IMPORTED_MODULE_0__["splitInnerHTML"])(target, data.delimiter);

    if (!_tempDiv) {
      _tempDiv = document.createElement("div");
    }

    _tempDiv.innerHTML = value.value;
    text = Object(_utils_strings_js__WEBPACK_IMPORTED_MODULE_0__["splitInnerHTML"])(_tempDiv, data.delimiter);
    data.from = tween._from;

    if (data.from) {
      i = original;
      original = text;
      text = i;
    }

    data.hasClass = !!(value.newClass || value.oldClass);
    data.newClass = value.newClass;
    data.oldClass = value.oldClass;
    i = original.length - text.length;
    _short = i < 0 ? original : text;
    data.fillChar = value.fillChar || (value.padSpace ? "&nbsp;" : "");

    if (i < 0) {
      i = -i;
    }

    while (--i > -1) {
      _short.push(data.fillChar);
    }

    if (value.type === "diff") {
      j = 0;
      condensedText = [];
      condensedOriginal = [];
      aggregate = "";

      for (i = 0; i < text.length; i++) {
        s = text[i];

        if (s === original[i]) {
          aggregate += s;
        } else {
          condensedText[j] = aggregate + s;
          condensedOriginal[j++] = aggregate + original[i];
          aggregate = "";
        }
      }

      text = condensedText;
      original = condensedOriginal;

      if (aggregate) {
        text.push(aggregate);
        original.push(aggregate);
      }
    }

    if (value.speed) {
      tween.duration(Math.min(0.05 / value.speed * _short.length, value.maxDuration || 9999));
    }

    this.original = original;
    this.text = text;

    this._props.push("text");
  },
  render: function render(ratio, data) {
    if (ratio > 1) {
      ratio = 1;
    } else if (ratio < 0) {
      ratio = 0;
    }

    if (data.from) {
      ratio = 1 - ratio;
    }

    var text = data.text,
        hasClass = data.hasClass,
        newClass = data.newClass,
        oldClass = data.oldClass,
        delimiter = data.delimiter,
        target = data.target,
        fillChar = data.fillChar,
        original = data.original,
        l = text.length,
        i = ratio * l + 0.5 | 0,
        applyNew,
        applyOld,
        str;

    if (hasClass) {
      applyNew = newClass && i;
      applyOld = oldClass && i !== l;
      str = (applyNew ? "<span class='" + newClass + "'>" : "") + text.slice(0, i).join(delimiter) + (applyNew ? "</span>" : "") + (applyOld ? "<span class='" + oldClass + "'>" : "") + delimiter + original.slice(i).join(delimiter) + (applyOld ? "</span>" : "");
    } else {
      str = text.slice(0, i).join(delimiter) + delimiter + original.slice(i).join(delimiter);
    }

    if (data.svg) {
      //SVG text elements don't have an "innerHTML" in Microsoft browsers.
      target.textContent = str;
    } else {
      target.innerHTML = fillChar === "&nbsp;" && ~str.indexOf("  ") ? str.split("  ").join("&nbsp;&nbsp;") : str;
    }
  }
};
TextPlugin.splitInnerHTML = _utils_strings_js__WEBPACK_IMPORTED_MODULE_0__["splitInnerHTML"];
TextPlugin.emojiSafeSplit = _utils_strings_js__WEBPACK_IMPORTED_MODULE_0__["emojiSafeSplit"];
TextPlugin.getText = _utils_strings_js__WEBPACK_IMPORTED_MODULE_0__["getText"];
_getGSAP() && gsap.registerPlugin(TextPlugin);


/***/ }),

/***/ "./node_modules/gsap/all.js":
/*!**********************************!*\
  !*** ./node_modules/gsap/all.js ***!
  \**********************************/
/*! exports provided: gsap, default, CSSPlugin, TweenMax, TweenLite, TimelineMax, TimelineLite, Power0, Power1, Power2, Power3, Power4, Linear, Quad, Cubic, Quart, Quint, Strong, Elastic, Back, SteppedEase, Bounce, Sine, Expo, Circ, wrap, wrapYoyo, distribute, random, snap, normalize, getUnit, clamp, splitColor, toArray, mapRange, pipe, unitize, interpolate, shuffle, Draggable, CSSRulePlugin, EaselPlugin, SlowMo, ExpoScaleEase, RoughEase, EasePack, MotionPathPlugin, PixiPlugin, ScrollToPlugin, ScrollTrigger, TextPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gsap", function() { return gsapWithCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return gsapWithCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TweenMax", function() { return TweenMaxWithCSS; });
/* harmony import */ var _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gsap-core.js */ "./node_modules/gsap/gsap-core.js");
/* harmony import */ var _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CSSPlugin.js */ "./node_modules/gsap/CSSPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSSPlugin", function() { return _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TweenLite", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["TweenLite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineMax", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["TimelineMax"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimelineLite", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["TimelineLite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power0", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Power0"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power1", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Power1"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power2", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Power2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power3", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Power3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Power4", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Power4"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Linear", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Linear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Quad", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Quad"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cubic", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Cubic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Quart", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Quart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Quint", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Quint"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Strong", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Strong"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Elastic", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Elastic"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Back", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Back"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SteppedEase", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["SteppedEase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bounce", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Bounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sine", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Sine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Expo", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Expo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Circ", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["Circ"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["wrap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrapYoyo", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["wrapYoyo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distribute", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["distribute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "random", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["random"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "snap", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["snap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["normalize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getUnit", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["getUnit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["clamp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "splitColor", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["splitColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["toArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapRange", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["mapRange"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["pipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unitize", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["unitize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["interpolate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shuffle", function() { return _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["shuffle"]; });

/* harmony import */ var _Draggable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Draggable.js */ "./node_modules/gsap/Draggable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return _Draggable_js__WEBPACK_IMPORTED_MODULE_2__["Draggable"]; });

/* harmony import */ var _CSSRulePlugin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CSSRulePlugin.js */ "./node_modules/gsap/CSSRulePlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSSRulePlugin", function() { return _CSSRulePlugin_js__WEBPACK_IMPORTED_MODULE_3__["CSSRulePlugin"]; });

/* harmony import */ var _EaselPlugin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EaselPlugin.js */ "./node_modules/gsap/EaselPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EaselPlugin", function() { return _EaselPlugin_js__WEBPACK_IMPORTED_MODULE_4__["EaselPlugin"]; });

/* harmony import */ var _EasePack_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EasePack.js */ "./node_modules/gsap/EasePack.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlowMo", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_5__["SlowMo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpoScaleEase", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_5__["ExpoScaleEase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RoughEase", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_5__["RoughEase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EasePack", function() { return _EasePack_js__WEBPACK_IMPORTED_MODULE_5__["EasePack"]; });

/* harmony import */ var _MotionPathPlugin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MotionPathPlugin.js */ "./node_modules/gsap/MotionPathPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MotionPathPlugin", function() { return _MotionPathPlugin_js__WEBPACK_IMPORTED_MODULE_6__["MotionPathPlugin"]; });

/* harmony import */ var _PixiPlugin_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PixiPlugin.js */ "./node_modules/gsap/PixiPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PixiPlugin", function() { return _PixiPlugin_js__WEBPACK_IMPORTED_MODULE_7__["PixiPlugin"]; });

/* harmony import */ var _ScrollToPlugin_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ScrollToPlugin.js */ "./node_modules/gsap/ScrollToPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScrollToPlugin", function() { return _ScrollToPlugin_js__WEBPACK_IMPORTED_MODULE_8__["ScrollToPlugin"]; });

/* harmony import */ var _ScrollTrigger_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ScrollTrigger.js */ "./node_modules/gsap/ScrollTrigger.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScrollTrigger", function() { return _ScrollTrigger_js__WEBPACK_IMPORTED_MODULE_9__["ScrollTrigger"]; });

/* harmony import */ var _TextPlugin_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TextPlugin.js */ "./node_modules/gsap/TextPlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextPlugin", function() { return _TextPlugin_js__WEBPACK_IMPORTED_MODULE_10__["TextPlugin"]; });



var gsapWithCSS = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["default"].registerPlugin(_CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__["default"]) || _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__["default"], // to protect from tree shaking
	TweenMaxWithCSS = gsapWithCSS.core.Tween;











 

//BONUS EXPORTS
//export * from "./CustomEase.js";
//export * from "./DrawSVGPlugin.js";
//export * from "./Physics2DPlugin.js";
//export * from "./PhysicsPropsPlugin.js";
//export * from "./ScrambleTextPlugin.js";
//export * from "./CustomBounce.js";
//export * from "./CustomWiggle.js";
//export * from "./GSDevTools.js";
//export * from "./InertiaPlugin.js";
//export * from "./MorphSVGPlugin.js";
//export * from "./MotionPathHelper.js";
//export * from "./SplitText.js";

/***/ }),

/***/ "./node_modules/gsap/utils/matrix.js":
/*!*******************************************!*\
  !*** ./node_modules/gsap/utils/matrix.js ***!
  \*******************************************/
/*! exports provided: Matrix2D, getGlobalMatrix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix2D", function() { return Matrix2D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGlobalMatrix", function() { return getGlobalMatrix; });
/*!
 * matrix 3.5.1
 * https://greensock.com
 *
 * Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _doc,
    _win,
    _docElement,
    _body,
    _divContainer,
    _svgContainer,
    _identityMatrix,
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _hasOffsetBug,
    _setDoc = function _setDoc(element) {
  var doc = element.ownerDocument || element;

  if (!(_transformProp in element.style) && "msTransform" in element.style) {
    //to improve compatibility with old Microsoft browsers
    _transformProp = "msTransform";
    _transformOriginProp = _transformProp + "Origin";
  }

  while (doc.parentNode && (doc = doc.parentNode)) {}

  _win = window;
  _identityMatrix = new Matrix2D();

  if (doc) {
    _doc = doc;
    _docElement = doc.documentElement;
    _body = doc.body; // now test for the offset reporting bug. Use feature detection instead of browser sniffing to make things more bulletproof and future-proof. Hopefully Safari will fix their bug soon but it's 2020 and it's still not fixed.

    var d1 = doc.createElement("div"),
        d2 = doc.createElement("div");

    _body.appendChild(d1);

    d1.appendChild(d2);
    d1.style.position = "static";
    d1.style[_transformProp] = "translate3d(0,0,1px)";
    _hasOffsetBug = d2.offsetParent !== d1;

    _body.removeChild(d1);
  }

  return doc;
},
    _forceNonZeroScale = function _forceNonZeroScale(e) {
  // walks up the element's ancestors and finds any that had their scale set to 0 via GSAP, and changes them to 0.0001 to ensure that measurements work
  var a, cache;

  while (e && e !== _body) {
    cache = e._gsap;

    if (cache && !cache.scaleX && !cache.scaleY && cache.renderTransform) {
      cache.scaleX = cache.scaleY = 1e-4;
      cache.renderTransform(1, cache);
      a ? a.push(cache) : a = [cache];
    }

    e = e.parentNode;
  }

  return a;
},
    // possible future addition: pass an element to _forceDisplay() and it'll walk up all its ancestors and make sure anything with display: none is set to display: block, and if there's no parentNode, it'll add it to the body. It returns an Array that you can then feed to _revertDisplay() to have it revert all the changes it made.
// _forceDisplay = e => {
// 	let a = [],
// 		parent;
// 	while (e && e !== _body) {
// 		parent = e.parentNode;
// 		(_win.getComputedStyle(e).display === "none" || !parent) && a.push(e, e.style.display, parent) && (e.style.display = "block");
// 		parent || _body.appendChild(e);
// 		e = parent;
// 	}
// 	return a;
// },
// _revertDisplay = a => {
// 	for (let i = 0; i < a.length; i+=3) {
// 		a[i+1] ? (a[i].style.display = a[i+1]) : a[i].style.removeProperty("display");
// 		a[i+2] || a[i].parentNode.removeChild(a[i]);
// 	}
// },
_svgTemps = [],
    //we create 3 elements for SVG, and 3 for other DOM elements and cache them for performance reasons. They get nested in _divContainer and _svgContainer so that just one element is added to the DOM on each successive attempt. Again, performance is key.
_divTemps = [],
    _getDocScrollTop = function _getDocScrollTop() {
  return _win.pageYOffset || _doc.scrollTop || _docElement.scrollTop || _body.scrollTop || 0;
},
    _getDocScrollLeft = function _getDocScrollLeft() {
  return _win.pageXOffset || _doc.scrollLeft || _docElement.scrollLeft || _body.scrollLeft || 0;
},
    _svgOwner = function _svgOwner(element) {
  return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
},
    _isFixed = function _isFixed(element) {
  if (_win.getComputedStyle(element).position === "fixed") {
    return true;
  }

  element = element.parentNode;

  if (element && element.nodeType === 1) {
    // avoid document fragments which will throw an error.
    return _isFixed(element);
  }
},
    _createSibling = function _createSibling(element, i) {
  if (element.parentNode && (_doc || _setDoc(element))) {
    var svg = _svgOwner(element),
        ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml",
        type = svg ? i ? "rect" : "g" : "div",
        x = i !== 2 ? 0 : 100,
        y = i === 3 ? 100 : 0,
        css = "position:absolute;display:block;pointer-events:none;",
        e = _doc.createElementNS ? _doc.createElementNS(ns.replace(/^https/, "http"), type) : _doc.createElement(type);

    if (i) {
      if (!svg) {
        if (!_divContainer) {
          _divContainer = _createSibling(element);
          _divContainer.style.cssText = css;
        }

        e.style.cssText = css + "width:0.1px;height:0.1px;top:" + y + "px;left:" + x + "px";

        _divContainer.appendChild(e);
      } else {
        if (!_svgContainer) {
          _svgContainer = _createSibling(element);
        }

        e.setAttribute("width", 0.01);
        e.setAttribute("height", 0.01);
        e.setAttribute("transform", "translate(" + x + "," + y + ")");

        _svgContainer.appendChild(e);
      }
    }

    return e;
  }

  throw "Need document and parent.";
},
    _consolidate = function _consolidate(m) {
  // replaces SVGTransformList.consolidate() because a bug in Firefox causes it to break pointer events. See https://greensock.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800
  var c = new Matrix2D(),
      i = 0;

  for (; i < m.numberOfItems; i++) {
    c.multiply(m.getItem(i).matrix);
  }

  return c;
},
    _placeSiblings = function _placeSiblings(element, adjustGOffset) {
  var svg = _svgOwner(element),
      isRootSVG = element === svg,
      siblings = svg ? _svgTemps : _divTemps,
      container,
      m,
      b,
      x,
      y;

  if (element === _win) {
    return element;
  }

  if (!siblings.length) {
    siblings.push(_createSibling(element, 1), _createSibling(element, 2), _createSibling(element, 3));
  }

  container = svg ? _svgContainer : _divContainer;

  if (svg) {
    b = isRootSVG ? {
      x: 0,
      y: 0
    } : element.getBBox();
    m = element.transform ? element.transform.baseVal : {}; // IE11 doesn't follow the spec.

    if (m.numberOfItems) {
      m = m.numberOfItems > 1 ? _consolidate(m) : m.getItem(0).matrix; // don't call m.consolidate().matrix because a bug in Firefox makes pointer events not work when consolidate() is called on the same tick as getBoundingClientRect()! See https://greensock.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800

      x = m.a * b.x + m.c * b.y;
      y = m.b * b.x + m.d * b.y;
    } else {
      m = _identityMatrix;
      x = b.x;
      y = b.y;
    }

    if (adjustGOffset && element.tagName.toLowerCase() === "g") {
      x = y = 0;
    }

    container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
    (isRootSVG ? svg : element.parentNode).appendChild(container);
  } else {
    x = y = 0;

    if (_hasOffsetBug) {
      // some browsers (like Safari) have a bug that causes them to misreport offset values. When an ancestor element has a transform applied, it's supposed to treat it as if it's position: relative (new context). Safari botches this, so we need to find the closest ancestor (between the element and its offsetParent) that has a transform applied and if one is found, grab its offsetTop/Left and subtract them to compensate.
      m = element.offsetParent;
      b = element;

      while (b && (b = b.parentNode) && b !== m && b.parentNode) {
        if ((_win.getComputedStyle(b)[_transformProp] + "").length > 4) {
          x = b.offsetLeft;
          y = b.offsetTop;
          b = 0;
        }
      }
    }

    b = container.style;
    b.top = element.offsetTop - y + "px";
    b.left = element.offsetLeft - x + "px";
    m = _win.getComputedStyle(element);
    b[_transformProp] = m[_transformProp];
    b[_transformOriginProp] = m[_transformOriginProp];
    b.border = m.border;
    b.borderLeftStyle = m.borderLeftStyle;
    b.borderTopStyle = m.borderTopStyle;
    b.borderLeftWidth = m.borderLeftWidth;
    b.borderTopWidth = m.borderTopWidth;
    b.position = m.position === "fixed" ? "fixed" : "absolute";
    element.parentNode.appendChild(container);
  }

  return container;
},
    _setMatrix = function _setMatrix(m, a, b, c, d, e, f) {
  m.a = a;
  m.b = b;
  m.c = c;
  m.d = d;
  m.e = e;
  m.f = f;
  return m;
};

var Matrix2D = /*#__PURE__*/function () {
  function Matrix2D(a, b, c, d, e, f) {
    if (a === void 0) {
      a = 1;
    }

    if (b === void 0) {
      b = 0;
    }

    if (c === void 0) {
      c = 0;
    }

    if (d === void 0) {
      d = 1;
    }

    if (e === void 0) {
      e = 0;
    }

    if (f === void 0) {
      f = 0;
    }

    _setMatrix(this, a, b, c, d, e, f);
  }

  var _proto = Matrix2D.prototype;

  _proto.inverse = function inverse() {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f,
        determinant = a * d - b * c || 1e-10;
    return _setMatrix(this, d / determinant, -b / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b * e) / determinant);
  };

  _proto.multiply = function multiply(matrix) {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f,
        a2 = matrix.a,
        b2 = matrix.c,
        c2 = matrix.b,
        d2 = matrix.d,
        e2 = matrix.e,
        f2 = matrix.f;
    return _setMatrix(this, a2 * a + c2 * c, a2 * b + c2 * d, b2 * a + d2 * c, b2 * b + d2 * d, e + e2 * a + f2 * c, f + e2 * b + f2 * d);
  };

  _proto.clone = function clone() {
    return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f);
  };

  _proto.equals = function equals(matrix) {
    var a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f;
    return a === matrix.a && b === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
  };

  _proto.apply = function apply(point, decoratee) {
    if (decoratee === void 0) {
      decoratee = {};
    }

    var x = point.x,
        y = point.y,
        a = this.a,
        b = this.b,
        c = this.c,
        d = this.d,
        e = this.e,
        f = this.f;
    decoratee.x = x * a + y * c + e || 0;
    decoratee.y = x * b + y * d + f || 0;
    return decoratee;
  };

  return Matrix2D;
}(); //feed in an element and it'll return a 2D matrix (optionally inverted) so that you can translate between coordinate spaces.
// Inverting lets you translate a global point into a local coordinate space. No inverting lets you go the other way.
// We needed this to work around various browser bugs, like Firefox doesn't accurately report getScreenCTM() when there
// are transforms applied to ancestor elements.
// The matrix math to convert any x/y coordinate is as follows, which is wrapped in a convenient apply() method of Matrix2D above:
//     tx = m.a * x + m.c * y + m.e
//     ty = m.b * x + m.d * y + m.f

function getGlobalMatrix(element, inverse, adjustGOffset) {
  // adjustGOffset is typically used only when grabbing an element's PARENT's global matrix, and it ignores the x/y offset of any SVG <g> elements because they behave in a special way.
  if (!element || !element.parentNode || (_doc || _setDoc(element)).documentElement === element) {
    return new Matrix2D();
  }

  var zeroScales = _forceNonZeroScale(element.parentNode),
      svg = _svgOwner(element),
      temps = svg ? _svgTemps : _divTemps,
      container = _placeSiblings(element, adjustGOffset),
      b1 = temps[0].getBoundingClientRect(),
      b2 = temps[1].getBoundingClientRect(),
      b3 = temps[2].getBoundingClientRect(),
      parent = container.parentNode,
      isFixed = _isFixed(element),
      m = new Matrix2D((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + (isFixed ? 0 : _getDocScrollLeft()), b1.top + (isFixed ? 0 : _getDocScrollTop()));

  parent.removeChild(container);

  if (zeroScales) {
    b1 = zeroScales.length;

    while (b1--) {
      b2 = zeroScales[b1];
      b2.scaleX = b2.scaleY = 0;
      b2.renderTransform(1, b2);
    }
  }

  return inverse ? m.inverse() : m;
} // export function getMatrix(element) {
// 	_doc || _setDoc(element);
// 	let m = (_win.getComputedStyle(element)[_transformProp] + "").substr(7).match(/[-.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g),
// 		is2D = m && m.length === 6;
// 	return !m || m.length < 6 ? new Matrix2D() : new Matrix2D(+m[0], +m[1], +m[is2D ? 2 : 4], +m[is2D ? 3 : 5], +m[is2D ? 4 : 12], +m[is2D ? 5 : 13]);
// }

/***/ }),

/***/ "./node_modules/gsap/utils/paths.js":
/*!******************************************!*\
  !*** ./node_modules/gsap/utils/paths.js ***!
  \******************************************/
/*! exports provided: getRawPath, copyRawPath, reverseSegment, convertToPath, getRotationAtProgress, sliceRawPath, cacheRawPathMeasurements, subdivideSegment, getPositionOnPath, transformRawPath, stringToRawPath, bezierToPoints, flatPointsToSegment, pointsToSegment, simplifyPoints, getClosestData, subdivideSegmentNear, rawPathToString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRawPath", function() { return getRawPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyRawPath", function() { return copyRawPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverseSegment", function() { return reverseSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToPath", function() { return convertToPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotationAtProgress", function() { return getRotationAtProgress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sliceRawPath", function() { return sliceRawPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cacheRawPathMeasurements", function() { return cacheRawPathMeasurements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subdivideSegment", function() { return subdivideSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPositionOnPath", function() { return getPositionOnPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformRawPath", function() { return transformRawPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToRawPath", function() { return stringToRawPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bezierToPoints", function() { return bezierToPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatPointsToSegment", function() { return flatPointsToSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointsToSegment", function() { return pointsToSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simplifyPoints", function() { return simplifyPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClosestData", function() { return getClosestData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subdivideSegmentNear", function() { return subdivideSegmentNear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rawPathToString", function() { return rawPathToString; });
/*!
 * paths 3.5.1
 * https://greensock.com
 *
 * Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
    _numbersExp = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
    _scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,
    _selectorExp = /(^[#\.][a-z]|[a-y][a-z])/i,
    _DEG2RAD = Math.PI / 180,
    _RAD2DEG = 180 / Math.PI,
    _sin = Math.sin,
    _cos = Math.cos,
    _abs = Math.abs,
    _sqrt = Math.sqrt,
    _atan2 = Math.atan2,
    _largeNum = 1e8,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _temp = {},
    _temp2 = {},
    _roundingNum = 1e5,
    _wrapProgress = function _wrapProgress(progress) {
  return Math.round((progress + _largeNum) % 1 * _roundingNum) / _roundingNum || (progress < 0 ? 0 : 1);
},
    //if progress lands on 1, the % will make it 0 which is why we || 1, but not if it's negative because it makes more sense for motion to end at 0 in that case.
_round = function _round(value) {
  return Math.round(value * _roundingNum) / _roundingNum || 0;
},
    _splitSegment = function _splitSegment(rawPath, segIndex, i, t) {
  var segment = rawPath[segIndex],
      shift = t === 1 ? 6 : subdivideSegment(segment, i, t);

  if (shift && shift + i + 2 < segment.length) {
    rawPath.splice(segIndex, 0, segment.slice(0, i + shift + 2));
    segment.splice(0, i + shift);
    return 1;
  }
},
    _reverseRawPath = function _reverseRawPath(rawPath, skipOuter) {
  var i = rawPath.length;

  if (!skipOuter) {
    rawPath.reverse();
  }

  while (i--) {
    if (!rawPath[i].reversed) {
      reverseSegment(rawPath[i]);
    }
  }
},
    _copyMetaData = function _copyMetaData(source, copy) {
  copy.totalLength = source.totalLength;

  if (source.samples) {
    //segment
    copy.samples = source.samples.slice(0);
    copy.lookup = source.lookup.slice(0);
    copy.minLength = source.minLength;
    copy.resolution = source.resolution;
  } else {
    //rawPath
    copy.totalPoints = source.totalPoints;
  }

  return copy;
},
    //pushes a new segment into a rawPath, but if its starting values match the ending values of the last segment, it'll merge it into that same segment (to reduce the number of segments)
_appendOrMerge = function _appendOrMerge(rawPath, segment) {
  var index = rawPath.length,
      prevSeg = rawPath[index - 1] || [],
      l = prevSeg.length;

  if (segment[0] === prevSeg[l - 2] && segment[1] === prevSeg[l - 1]) {
    segment = prevSeg.concat(segment.slice(2));
    index--;
  }

  rawPath[index] = segment;
},
    _bestDistance;
/* TERMINOLOGY
 - RawPath - an array of arrays, one for each Segment. A single RawPath could have multiple "M" commands, defining Segments (paths aren't always connected).
 - Segment - an array containing a sequence of Cubic Bezier coordinates in alternating x, y, x, y format. Starting anchor, then control point 1, control point 2, and ending anchor, then the next control point 1, control point 2, anchor, etc. Uses less memory than an array with a bunch of {x, y} points.
 - Bezier - a single cubic Bezier with a starting anchor, two control points, and an ending anchor.
 - the variable "t" is typically the position along an individual Bezier path (time) and it's NOT linear, meaning it could accelerate/decelerate based on the control points whereas the "p" or "progress" value is linearly mapped to the whole path, so it shouldn't really accelerate/decelerate based on control points. So a progress of 0.2 would be almost exactly 20% along the path. "t" is ONLY in an individual Bezier piece.
 */
//accepts basic selector text, a path instance, a RawPath instance, or a Segment and returns a RawPath (makes it easy to homogenize things). If an element or selector text is passed in, it'll also cache the value so that if it's queried again, it'll just take the path data from there instead of parsing it all over again (as long as the path data itself hasn't changed - it'll check).


function getRawPath(value) {
  value = _isString(value) && _selectorExp.test(value) ? document.querySelector(value) || value : value;
  var e = value.getAttribute ? value : 0,
      rawPath;

  if (e && (value = value.getAttribute("d"))) {
    //implements caching
    if (!e._gsPath) {
      e._gsPath = {};
    }

    rawPath = e._gsPath[value];
    return rawPath && !rawPath._dirty ? rawPath : e._gsPath[value] = stringToRawPath(value);
  }

  return !value ? console.warn("Expecting a <path> element or an SVG path data string") : _isString(value) ? stringToRawPath(value) : _isNumber(value[0]) ? [value] : value;
} //copies a RawPath WITHOUT the length meta data (for speed)

function copyRawPath(rawPath) {
  var a = [],
      i = 0;

  for (; i < rawPath.length; i++) {
    a[i] = _copyMetaData(rawPath[i], rawPath[i].slice(0));
  }

  return _copyMetaData(rawPath, a);
}
function reverseSegment(segment) {
  var i = 0,
      y;
  segment.reverse(); //this will invert the order y, x, y, x so we must flip it back.

  for (; i < segment.length; i += 2) {
    y = segment[i];
    segment[i] = segment[i + 1];
    segment[i + 1] = y;
  }

  segment.reversed = !segment.reversed;
}

var _createPath = function _createPath(e, ignore) {
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path"),
      attr = [].slice.call(e.attributes),
      i = attr.length,
      name;
  ignore = "," + ignore + ",";

  while (--i > -1) {
    name = attr[i].nodeName.toLowerCase(); //in Microsoft Edge, if you don't set the attribute with a lowercase name, it doesn't render correctly! Super weird.

    if (ignore.indexOf("," + name + ",") < 0) {
      path.setAttributeNS(null, name, attr[i].nodeValue);
    }
  }

  return path;
},
    _typeAttrs = {
  rect: "rx,ry,x,y,width,height",
  circle: "r,cx,cy",
  ellipse: "rx,ry,cx,cy",
  line: "x1,x2,y1,y2"
},
    _attrToObj = function _attrToObj(e, attrs) {
  var props = attrs ? attrs.split(",") : [],
      obj = {},
      i = props.length;

  while (--i > -1) {
    obj[props[i]] = +e.getAttribute(props[i]) || 0;
  }

  return obj;
}; //converts an SVG shape like <circle>, <rect>, <polygon>, <polyline>, <ellipse>, etc. to a <path>, swapping it in and copying the attributes to match.


function convertToPath(element, swap) {
  var type = element.tagName.toLowerCase(),
      circ = 0.552284749831,
      data,
      x,
      y,
      r,
      ry,
      path,
      rcirc,
      rycirc,
      points,
      w,
      h,
      x2,
      x3,
      x4,
      x5,
      x6,
      y2,
      y3,
      y4,
      y5,
      y6,
      attr;

  if (type === "path" || !element.getBBox) {
    return element;
  }

  path = _createPath(element, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points");
  attr = _attrToObj(element, _typeAttrs[type]);

  if (type === "rect") {
    r = attr.rx;
    ry = attr.ry || r;
    x = attr.x;
    y = attr.y;
    w = attr.width - r * 2;
    h = attr.height - ry * 2;

    if (r || ry) {
      //if there are rounded corners, render cubic beziers
      x2 = x + r * (1 - circ);
      x3 = x + r;
      x4 = x3 + w;
      x5 = x4 + r * circ;
      x6 = x4 + r;
      y2 = y + ry * (1 - circ);
      y3 = y + ry;
      y4 = y3 + h;
      y5 = y4 + ry * circ;
      y6 = y4 + ry;
      data = "M" + x6 + "," + y3 + " V" + y4 + " C" + [x6, y5, x5, y6, x4, y6, x4 - (x4 - x3) / 3, y6, x3 + (x4 - x3) / 3, y6, x3, y6, x2, y6, x, y5, x, y4, x, y4 - (y4 - y3) / 3, x, y3 + (y4 - y3) / 3, x, y3, x, y2, x2, y, x3, y, x3 + (x4 - x3) / 3, y, x4 - (x4 - x3) / 3, y, x4, y, x5, y, x6, y2, x6, y3].join(",") + "z";
    } else {
      data = "M" + (x + w) + "," + y + " v" + h + " h" + -w + " v" + -h + " h" + w + "z";
    }
  } else if (type === "circle" || type === "ellipse") {
    if (type === "circle") {
      r = ry = attr.r;
      rycirc = r * circ;
    } else {
      r = attr.rx;
      ry = attr.ry;
      rycirc = ry * circ;
    }

    x = attr.cx;
    y = attr.cy;
    rcirc = r * circ;
    data = "M" + (x + r) + "," + y + " C" + [x + r, y + rycirc, x + rcirc, y + ry, x, y + ry, x - rcirc, y + ry, x - r, y + rycirc, x - r, y, x - r, y - rycirc, x - rcirc, y - ry, x, y - ry, x + rcirc, y - ry, x + r, y - rycirc, x + r, y].join(",") + "z";
  } else if (type === "line") {
    data = "M" + attr.x1 + "," + attr.y1 + " L" + attr.x2 + "," + attr.y2; //previously, we just converted to "Mx,y Lx,y" but Safari has bugs that cause that not to render properly when using a stroke-dasharray that's not fully visible! Using a cubic bezier fixes that issue.
  } else if (type === "polyline" || type === "polygon") {
    points = (element.getAttribute("points") + "").match(_numbersExp) || [];
    x = points.shift();
    y = points.shift();
    data = "M" + x + "," + y + " L" + points.join(",");

    if (type === "polygon") {
      data += "," + x + "," + y + "z";
    }
  }

  path.setAttribute("d", rawPathToString(path._gsRawPath = stringToRawPath(data)));

  if (swap && element.parentNode) {
    element.parentNode.insertBefore(path, element);
    element.parentNode.removeChild(element);
  }

  return path;
} //returns the rotation (in degrees) at a particular progress on a rawPath (the slope of the tangent)

function getRotationAtProgress(rawPath, progress) {
  var d = getProgressData(rawPath, progress >= 1 ? 1 - 1e-9 : progress ? progress : 1e-9);
  return getRotationAtBezierT(d.segment, d.i, d.t);
}

function getRotationAtBezierT(segment, i, t) {
  var a = segment[i],
      b = segment[i + 2],
      c = segment[i + 4],
      x;
  a += (b - a) * t;
  b += (c - b) * t;
  a += (b - a) * t;
  x = b + (c + (segment[i + 6] - c) * t - b) * t - a;
  a = segment[i + 1];
  b = segment[i + 3];
  c = segment[i + 5];
  a += (b - a) * t;
  b += (c - b) * t;
  a += (b - a) * t;
  return _round(_atan2(b + (c + (segment[i + 7] - c) * t - b) * t - a, x) * _RAD2DEG);
}

function sliceRawPath(rawPath, start, end) {
  if (_isUndefined(end)) {
    end = 1;
  }

  start = start || 0;
  var reverse = start > end,
      loops = Math.max(0, ~~(_abs(end - start) - 1e-8));

  if (reverse) {
    reverse = end;
    end = start;
    start = reverse;
    reverse = 1;
    loops -= loops ? 1 : 0;
  }

  if (start < 0 || end < 0) {
    var offset = ~~Math.min(start, end) + 1;
    start += offset;
    end += offset;
  }

  var path = copyRawPath(rawPath.totalLength ? rawPath : cacheRawPathMeasurements(rawPath)),
      wrap = end > 1,
      s = getProgressData(path, start, _temp, true),
      e = getProgressData(path, end, _temp2),
      eSeg = e.segment,
      sSeg = s.segment,
      eSegIndex = e.segIndex,
      sSegIndex = s.segIndex,
      ei = e.i,
      si = s.i,
      sameSegment = sSegIndex === eSegIndex,
      sameBezier = ei === si && sameSegment,
      invertedOrder = sameSegment && si > ei || sameBezier && s.t > e.t,
      sShift,
      eShift,
      i,
      copy,
      totalSegments,
      l,
      j;

  if (wrap || loops) {
    if (_splitSegment(path, sSegIndex, si, s.t)) {
      sShift = 1;
      sSegIndex++;

      if (sameBezier) {
        if (invertedOrder) {
          e.t /= s.t;
        } else {
          e.t = (e.t - s.t) / (1 - s.t);
          eSegIndex++;
          ei = 0;
        }
      } else if (sSegIndex <= eSegIndex + 1 && !invertedOrder) {
        eSegIndex++;

        if (sameSegment) {
          ei -= si;
        }
      }
    }

    if (!e.t) {
      eSegIndex--;
      reverse && sSegIndex--;
    } else if (_splitSegment(path, eSegIndex, ei, e.t)) {
      invertedOrder && sShift && sSegIndex++;
      reverse && eSegIndex++;
    }

    copy = [];
    totalSegments = path.length;
    l = 1 + totalSegments * loops;
    j = sSegIndex;

    if (reverse) {
      eSegIndex = (eSegIndex || totalSegments) - 1;
      l += (totalSegments - eSegIndex + sSegIndex) % totalSegments;

      for (i = 0; i < l; i++) {
        _appendOrMerge(copy, path[j]);

        j = (j || totalSegments) - 1;
      }
    } else {
      l += (totalSegments - sSegIndex + eSegIndex) % totalSegments;

      for (i = 0; i < l; i++) {
        _appendOrMerge(copy, path[j++ % totalSegments]);
      }
    }

    path = copy;
  } else {
    eShift = e.t === 1 ? 6 : subdivideSegment(eSeg, ei, e.t);

    if (start !== end) {
      sShift = subdivideSegment(sSeg, si, sameBezier ? s.t / e.t : s.t);

      if (sameSegment) {
        eShift += sShift;
      }

      eSeg.splice(ei + eShift + 2);

      if (sShift || si) {
        sSeg.splice(0, si + sShift);
      }

      i = path.length;

      while (i--) {
        //chop off any extra segments
        if (i < sSegIndex || i > eSegIndex) {
          path.splice(i, 1);
        }
      }
    } else {
      eSeg.angle = getRotationAtBezierT(eSeg, ei + eShift, 0); //record the value before we chop because it'll be impossible to determine the angle after its length is 0!

      ei += eShift;
      s = eSeg[ei];
      e = eSeg[ei + 1];
      eSeg.length = eSeg.totalLength = 0;
      eSeg.totalPoints = path.totalPoints = 8;
      eSeg.push(s, e, s, e, s, e, s, e);
    }
  }

  reverse && _reverseRawPath(path, wrap || loops);
  path.totalLength = 0;
  return path;
} //measures a Segment according to its resolution (so if segment.resolution is 6, for example, it'll take 6 samples equally across each Bezier) and create/populate a "samples" Array that has the length up to each of those sample points (always increasing from the start) as well as a "lookup" array that's broken up according to the smallest distance between 2 samples. This gives us a very fast way of looking up a progress position rather than looping through all the points/Beziers. You can optionally have it only measure a subset, starting at startIndex and going for a specific number of beziers (remember, there are 3 x/y pairs each, for a total of 6 elements for each Bezier). It will also populate a "totalLength" property, but that's not generally super accurate because by default it'll only take 6 samples per Bezier. But for performance reasons, it's perfectly adequate for measuring progress values along the path. If you need a more accurate totalLength, either increase the resolution or use the more advanced bezierToPoints() method which keeps adding points until they don't deviate by more than a certain precision value.

function measureSegment(segment, startIndex, bezierQty) {
  startIndex = startIndex || 0;

  if (!segment.samples) {
    segment.samples = [];
    segment.lookup = [];
  }

  var resolution = ~~segment.resolution || 12,
      inc = 1 / resolution,
      endIndex = bezierQty ? startIndex + bezierQty * 6 + 1 : segment.length,
      x1 = segment[startIndex],
      y1 = segment[startIndex + 1],
      samplesIndex = startIndex ? startIndex / 6 * resolution : 0,
      samples = segment.samples,
      lookup = segment.lookup,
      min = (startIndex ? segment.minLength : _largeNum) || _largeNum,
      prevLength = samples[samplesIndex + bezierQty * resolution - 1],
      length = startIndex ? samples[samplesIndex - 1] : 0,
      i,
      j,
      x4,
      x3,
      x2,
      xd,
      xd1,
      y4,
      y3,
      y2,
      yd,
      yd1,
      inv,
      t,
      lengthIndex,
      l,
      segLength;
  samples.length = lookup.length = 0;

  for (j = startIndex + 2; j < endIndex; j += 6) {
    x4 = segment[j + 4] - x1;
    x3 = segment[j + 2] - x1;
    x2 = segment[j] - x1;
    y4 = segment[j + 5] - y1;
    y3 = segment[j + 3] - y1;
    y2 = segment[j + 1] - y1;
    xd = xd1 = yd = yd1 = 0;

    if (_abs(x4) < 1e-5 && _abs(y4) < 1e-5 && _abs(x2) + _abs(y2) < 1e-5) {
      //dump points that are sufficiently close (basically right on top of each other, making a bezier super tiny or 0 length)
      if (segment.length > 8) {
        segment.splice(j, 6);
        j -= 6;
        endIndex -= 6;
      }
    } else {
      for (i = 1; i <= resolution; i++) {
        t = inc * i;
        inv = 1 - t;
        xd = xd1 - (xd1 = (t * t * x4 + 3 * inv * (t * x3 + inv * x2)) * t);
        yd = yd1 - (yd1 = (t * t * y4 + 3 * inv * (t * y3 + inv * y2)) * t);
        l = _sqrt(yd * yd + xd * xd);

        if (l < min) {
          min = l;
        }

        length += l;
        samples[samplesIndex++] = length;
      }
    }

    x1 += x4;
    y1 += y4;
  }

  if (prevLength) {
    prevLength -= length;

    for (; samplesIndex < samples.length; samplesIndex++) {
      samples[samplesIndex] += prevLength;
    }
  }

  if (samples.length && min) {
    segment.totalLength = segLength = samples[samples.length - 1] || 0;
    segment.minLength = min;
    l = lengthIndex = 0;

    for (i = 0; i < segLength; i += min) {
      lookup[l++] = samples[lengthIndex] < i ? ++lengthIndex : lengthIndex;
    }
  } else {
    segment.totalLength = samples[0] = 0;
  }

  return startIndex ? length - samples[startIndex / 2 - 1] : length;
}

function cacheRawPathMeasurements(rawPath, resolution) {
  var pathLength, points, i;

  for (i = pathLength = points = 0; i < rawPath.length; i++) {
    rawPath[i].resolution = ~~resolution || 12; //steps per Bezier curve (anchor, 2 control points, to anchor)

    points += rawPath[i].length;
    pathLength += measureSegment(rawPath[i]);
  }

  rawPath.totalPoints = points;
  rawPath.totalLength = pathLength;
  return rawPath;
} //divide segment[i] at position t (value between 0 and 1, progress along that particular cubic bezier segment that starts at segment[i]). Returns how many elements were spliced into the segment array (either 0 or 6)

function subdivideSegment(segment, i, t) {
  if (t <= 0 || t >= 1) {
    return 0;
  }

  var ax = segment[i],
      ay = segment[i + 1],
      cp1x = segment[i + 2],
      cp1y = segment[i + 3],
      cp2x = segment[i + 4],
      cp2y = segment[i + 5],
      bx = segment[i + 6],
      by = segment[i + 7],
      x1a = ax + (cp1x - ax) * t,
      x2 = cp1x + (cp2x - cp1x) * t,
      y1a = ay + (cp1y - ay) * t,
      y2 = cp1y + (cp2y - cp1y) * t,
      x1 = x1a + (x2 - x1a) * t,
      y1 = y1a + (y2 - y1a) * t,
      x2a = cp2x + (bx - cp2x) * t,
      y2a = cp2y + (by - cp2y) * t;
  x2 += (x2a - x2) * t;
  y2 += (y2a - y2) * t;
  segment.splice(i + 2, 4, _round(x1a), //first control point
  _round(y1a), _round(x1), //second control point
  _round(y1), _round(x1 + (x2 - x1) * t), //new fabricated anchor on line
  _round(y1 + (y2 - y1) * t), _round(x2), //third control point
  _round(y2), _round(x2a), //fourth control point
  _round(y2a));
  segment.samples && segment.samples.splice(i / 6 * segment.resolution | 0, 0, 0, 0, 0, 0, 0, 0);
  return 6;
} // returns an object {path, segment, segIndex, i, t}

function getProgressData(rawPath, progress, decoratee, pushToNextIfAtEnd) {
  decoratee = decoratee || {};
  rawPath.totalLength || cacheRawPathMeasurements(rawPath);

  if (progress < 0 || progress > 1) {
    progress = _wrapProgress(progress);
  }

  var segIndex = 0,
      segment = rawPath[0],
      samples,
      resolution,
      length,
      min,
      max,
      i,
      t;

  if (rawPath.length > 1) {
    //speed optimization: most of the time, there's only one segment so skip the recursion.
    length = rawPath.totalLength * progress;
    max = i = 0;

    while ((max += rawPath[i++].totalLength) < length) {
      segIndex = i;
    }

    segment = rawPath[segIndex];
    min = max - segment.totalLength;
    progress = (length - min) / (max - min) || 0;
  }

  samples = segment.samples;
  resolution = segment.resolution; //how many samples per cubic bezier chunk

  length = segment.totalLength * progress;
  i = segment.lookup[~~(length / segment.minLength)] || 0;
  min = i ? samples[i - 1] : 0;
  max = samples[i];

  if (max < length) {
    min = max;
    max = samples[++i];
  }

  t = 1 / resolution * ((length - min) / (max - min) + i % resolution);
  i = ~~(i / resolution) * 6;

  if (pushToNextIfAtEnd && t === 1) {
    if (i + 6 < segment.length) {
      i += 6;
      t = 0;
    } else if (segIndex + 1 < rawPath.length) {
      i = t = 0;
      segment = rawPath[++segIndex];
    }
  }

  decoratee.t = t;
  decoratee.i = i;
  decoratee.path = rawPath;
  decoratee.segment = segment;
  decoratee.segIndex = segIndex;
  return decoratee;
}

function getPositionOnPath(rawPath, progress, includeAngle, point) {
  var segment = rawPath[0],
      result = point || {},
      samples,
      resolution,
      length,
      min,
      max,
      i,
      t,
      a,
      inv;

  if (progress < 0 || progress > 1) {
    progress = _wrapProgress(progress);
  }

  if (rawPath.length > 1) {
    //speed optimization: most of the time, there's only one segment so skip the recursion.
    length = rawPath.totalLength * progress;
    max = i = 0;

    while ((max += rawPath[i++].totalLength) < length) {
      segment = rawPath[i];
    }

    min = max - segment.totalLength;
    progress = (length - min) / (max - min) || 0;
  }

  samples = segment.samples;
  resolution = segment.resolution;
  length = segment.totalLength * progress;
  i = segment.lookup[~~(length / segment.minLength)] || 0;
  min = i ? samples[i - 1] : 0;
  max = samples[i];

  if (max < length) {
    min = max;
    max = samples[++i];
  }

  t = 1 / resolution * ((length - min) / (max - min) + i % resolution) || 0;
  inv = 1 - t;
  i = ~~(i / resolution) * 6;
  a = segment[i];
  result.x = _round((t * t * (segment[i + 6] - a) + 3 * inv * (t * (segment[i + 4] - a) + inv * (segment[i + 2] - a))) * t + a);
  result.y = _round((t * t * (segment[i + 7] - (a = segment[i + 1])) + 3 * inv * (t * (segment[i + 5] - a) + inv * (segment[i + 3] - a))) * t + a);

  if (includeAngle) {
    result.angle = segment.totalLength ? getRotationAtBezierT(segment, i, t >= 1 ? 1 - 1e-9 : t ? t : 1e-9) : segment.angle || 0;
  }

  return result;
} //applies a matrix transform to RawPath (or a segment in a RawPath) and returns whatever was passed in (it transforms the values in the array(s), not a copy).

function transformRawPath(rawPath, a, b, c, d, tx, ty) {
  var j = rawPath.length,
      segment,
      l,
      i,
      x,
      y;

  while (--j > -1) {
    segment = rawPath[j];
    l = segment.length;

    for (i = 0; i < l; i += 2) {
      x = segment[i];
      y = segment[i + 1];
      segment[i] = x * a + y * c + tx;
      segment[i + 1] = x * b + y * d + ty;
    }
  }

  rawPath._dirty = 1;
  return rawPath;
} // translates SVG arc data into a segment (cubic beziers). Angle is in degrees.

function arcToSegment(lastX, lastY, rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
  if (lastX === x && lastY === y) {
    return;
  }

  rx = _abs(rx);
  ry = _abs(ry);

  var angleRad = angle % 360 * _DEG2RAD,
      cosAngle = _cos(angleRad),
      sinAngle = _sin(angleRad),
      PI = Math.PI,
      TWOPI = PI * 2,
      dx2 = (lastX - x) / 2,
      dy2 = (lastY - y) / 2,
      x1 = cosAngle * dx2 + sinAngle * dy2,
      y1 = -sinAngle * dx2 + cosAngle * dy2,
      x1_sq = x1 * x1,
      y1_sq = y1 * y1,
      radiiCheck = x1_sq / (rx * rx) + y1_sq / (ry * ry);

  if (radiiCheck > 1) {
    rx = _sqrt(radiiCheck) * rx;
    ry = _sqrt(radiiCheck) * ry;
  }

  var rx_sq = rx * rx,
      ry_sq = ry * ry,
      sq = (rx_sq * ry_sq - rx_sq * y1_sq - ry_sq * x1_sq) / (rx_sq * y1_sq + ry_sq * x1_sq);

  if (sq < 0) {
    sq = 0;
  }

  var coef = (largeArcFlag === sweepFlag ? -1 : 1) * _sqrt(sq),
      cx1 = coef * (rx * y1 / ry),
      cy1 = coef * -(ry * x1 / rx),
      sx2 = (lastX + x) / 2,
      sy2 = (lastY + y) / 2,
      cx = sx2 + (cosAngle * cx1 - sinAngle * cy1),
      cy = sy2 + (sinAngle * cx1 + cosAngle * cy1),
      ux = (x1 - cx1) / rx,
      uy = (y1 - cy1) / ry,
      vx = (-x1 - cx1) / rx,
      vy = (-y1 - cy1) / ry,
      temp = ux * ux + uy * uy,
      angleStart = (uy < 0 ? -1 : 1) * Math.acos(ux / _sqrt(temp)),
      angleExtent = (ux * vy - uy * vx < 0 ? -1 : 1) * Math.acos((ux * vx + uy * vy) / _sqrt(temp * (vx * vx + vy * vy)));

  isNaN(angleExtent) && (angleExtent = PI); //rare edge case. Math.cos(-1) is NaN.

  if (!sweepFlag && angleExtent > 0) {
    angleExtent -= TWOPI;
  } else if (sweepFlag && angleExtent < 0) {
    angleExtent += TWOPI;
  }

  angleStart %= TWOPI;
  angleExtent %= TWOPI;

  var segments = Math.ceil(_abs(angleExtent) / (TWOPI / 4)),
      rawPath = [],
      angleIncrement = angleExtent / segments,
      controlLength = 4 / 3 * _sin(angleIncrement / 2) / (1 + _cos(angleIncrement / 2)),
      ma = cosAngle * rx,
      mb = sinAngle * rx,
      mc = sinAngle * -ry,
      md = cosAngle * ry,
      i;

  for (i = 0; i < segments; i++) {
    angle = angleStart + i * angleIncrement;
    x1 = _cos(angle);
    y1 = _sin(angle);
    ux = _cos(angle += angleIncrement);
    uy = _sin(angle);
    rawPath.push(x1 - controlLength * y1, y1 + controlLength * x1, ux + controlLength * uy, uy - controlLength * ux, ux, uy);
  } //now transform according to the actual size of the ellipse/arc (the beziers were noramlized, between 0 and 1 on a circle).


  for (i = 0; i < rawPath.length; i += 2) {
    x1 = rawPath[i];
    y1 = rawPath[i + 1];
    rawPath[i] = x1 * ma + y1 * mc + cx;
    rawPath[i + 1] = x1 * mb + y1 * md + cy;
  }

  rawPath[i - 2] = x; //always set the end to exactly where it's supposed to be

  rawPath[i - 1] = y;
  return rawPath;
} //Spits back a RawPath with absolute coordinates. Each segment starts with a "moveTo" command (x coordinate, then y) and then 2 control points (x, y, x, y), then anchor. The goal is to minimize memory and maximize speed.


function stringToRawPath(d) {
  var a = (d + "").replace(_scientific, function (m) {
    var n = +m;
    return n < 0.0001 && n > -0.0001 ? 0 : n;
  }).match(_svgPathExp) || [],
      //some authoring programs spit out very small numbers in scientific notation like "1e-5", so make sure we round that down to 0 first.
  path = [],
      relativeX = 0,
      relativeY = 0,
      twoThirds = 2 / 3,
      elements = a.length,
      points = 0,
      errorMessage = "ERROR: malformed path: " + d,
      i,
      j,
      x,
      y,
      command,
      isRelative,
      segment,
      startX,
      startY,
      difX,
      difY,
      beziers,
      prevCommand,
      flag1,
      flag2,
      line = function line(sx, sy, ex, ey) {
    difX = (ex - sx) / 3;
    difY = (ey - sy) / 3;
    segment.push(sx + difX, sy + difY, ex - difX, ey - difY, ex, ey);
  };

  if (!d || !isNaN(a[0]) || isNaN(a[1])) {
    console.log(errorMessage);
    return path;
  }

  for (i = 0; i < elements; i++) {
    prevCommand = command;

    if (isNaN(a[i])) {
      command = a[i].toUpperCase();
      isRelative = command !== a[i]; //lower case means relative
    } else {
      //commands like "C" can be strung together without any new command characters between.
      i--;
    }

    x = +a[i + 1];
    y = +a[i + 2];

    if (isRelative) {
      x += relativeX;
      y += relativeY;
    }

    if (!i) {
      startX = x;
      startY = y;
    } // "M" (move)


    if (command === "M") {
      if (segment) {
        if (segment.length < 8) {
          //if the path data was funky and just had a M with no actual drawing anywhere, skip it.
          path.length -= 1;
        } else {
          points += segment.length;
        }
      }

      relativeX = startX = x;
      relativeY = startY = y;
      segment = [x, y];
      path.push(segment);
      i += 2;
      command = "L"; //an "M" with more than 2 values gets interpreted as "lineTo" commands ("L").
      // "C" (cubic bezier)
    } else if (command === "C") {
      if (!segment) {
        segment = [0, 0];
      }

      if (!isRelative) {
        relativeX = relativeY = 0;
      } //note: "*1" is just a fast/short way to cast the value as a Number. WAAAY faster in Chrome, slightly slower in Firefox.


      segment.push(x, y, relativeX + a[i + 3] * 1, relativeY + a[i + 4] * 1, relativeX += a[i + 5] * 1, relativeY += a[i + 6] * 1);
      i += 6; // "S" (continuation of cubic bezier)
    } else if (command === "S") {
      difX = relativeX;
      difY = relativeY;

      if (prevCommand === "C" || prevCommand === "S") {
        difX += relativeX - segment[segment.length - 4];
        difY += relativeY - segment[segment.length - 3];
      }

      if (!isRelative) {
        relativeX = relativeY = 0;
      }

      segment.push(difX, difY, x, y, relativeX += a[i + 3] * 1, relativeY += a[i + 4] * 1);
      i += 4; // "Q" (quadratic bezier)
    } else if (command === "Q") {
      difX = relativeX + (x - relativeX) * twoThirds;
      difY = relativeY + (y - relativeY) * twoThirds;

      if (!isRelative) {
        relativeX = relativeY = 0;
      }

      relativeX += a[i + 3] * 1;
      relativeY += a[i + 4] * 1;
      segment.push(difX, difY, relativeX + (x - relativeX) * twoThirds, relativeY + (y - relativeY) * twoThirds, relativeX, relativeY);
      i += 4; // "T" (continuation of quadratic bezier)
    } else if (command === "T") {
      difX = relativeX - segment[segment.length - 4];
      difY = relativeY - segment[segment.length - 3];
      segment.push(relativeX + difX, relativeY + difY, x + (relativeX + difX * 1.5 - x) * twoThirds, y + (relativeY + difY * 1.5 - y) * twoThirds, relativeX = x, relativeY = y);
      i += 2; // "H" (horizontal line)
    } else if (command === "H") {
      line(relativeX, relativeY, relativeX = x, relativeY);
      i += 1; // "V" (vertical line)
    } else if (command === "V") {
      //adjust values because the first (and only one) isn't x in this case, it's y.
      line(relativeX, relativeY, relativeX, relativeY = x + (isRelative ? relativeY - relativeX : 0));
      i += 1; // "L" (line) or "Z" (close)
    } else if (command === "L" || command === "Z") {
      if (command === "Z") {
        x = startX;
        y = startY;
        segment.closed = true;
      }

      if (command === "L" || _abs(relativeX - x) > 0.5 || _abs(relativeY - y) > 0.5) {
        line(relativeX, relativeY, x, y);

        if (command === "L") {
          i += 2;
        }
      }

      relativeX = x;
      relativeY = y; // "A" (arc)
    } else if (command === "A") {
      flag1 = a[i + 4];
      flag2 = a[i + 5];
      difX = a[i + 6];
      difY = a[i + 7];
      j = 7;

      if (flag1.length > 1) {
        // for cases when the flags are merged, like "a8 8 0 018 8" (the 0 and 1 flags are WITH the x value of 8, but it could also be "a8 8 0 01-8 8" so it may include x or not)
        if (flag1.length < 3) {
          difY = difX;
          difX = flag2;
          j--;
        } else {
          difY = flag2;
          difX = flag1.substr(2);
          j -= 2;
        }

        flag2 = flag1.charAt(1);
        flag1 = flag1.charAt(0);
      }

      beziers = arcToSegment(relativeX, relativeY, +a[i + 1], +a[i + 2], +a[i + 3], +flag1, +flag2, (isRelative ? relativeX : 0) + difX * 1, (isRelative ? relativeY : 0) + difY * 1);
      i += j;

      if (beziers) {
        for (j = 0; j < beziers.length; j++) {
          segment.push(beziers[j]);
        }
      }

      relativeX = segment[segment.length - 2];
      relativeY = segment[segment.length - 1];
    } else {
      console.log(errorMessage);
    }
  }

  i = segment.length;

  if (i < 6) {
    //in case there's odd SVG like a M0,0 command at the very end.
    path.pop();
    i = 0;
  } else if (segment[0] === segment[i - 2] && segment[1] === segment[i - 1]) {
    segment.closed = true;
  }

  path.totalPoints = points + i;
  return path;
} //populates the points array in alternating x/y values (like [x, y, x, y...] instead of individual point objects [{x, y}, {x, y}...] to conserve memory and stay in line with how we're handling segment arrays

function bezierToPoints(x1, y1, x2, y2, x3, y3, x4, y4, threshold, points, index) {
  var x12 = (x1 + x2) / 2,
      y12 = (y1 + y2) / 2,
      x23 = (x2 + x3) / 2,
      y23 = (y2 + y3) / 2,
      x34 = (x3 + x4) / 2,
      y34 = (y3 + y4) / 2,
      x123 = (x12 + x23) / 2,
      y123 = (y12 + y23) / 2,
      x234 = (x23 + x34) / 2,
      y234 = (y23 + y34) / 2,
      x1234 = (x123 + x234) / 2,
      y1234 = (y123 + y234) / 2,
      dx = x4 - x1,
      dy = y4 - y1,
      d2 = _abs((x2 - x4) * dy - (y2 - y4) * dx),
      d3 = _abs((x3 - x4) * dy - (y3 - y4) * dx),
      length;

  if (!points) {
    points = [x1, y1, x4, y4];
    index = 2;
  }

  points.splice(index || points.length - 2, 0, x1234, y1234);

  if ((d2 + d3) * (d2 + d3) > threshold * (dx * dx + dy * dy)) {
    length = points.length;
    bezierToPoints(x1, y1, x12, y12, x123, y123, x1234, y1234, threshold, points, index);
    bezierToPoints(x1234, y1234, x234, y234, x34, y34, x4, y4, threshold, points, index + 2 + (points.length - length));
  }

  return points;
}
/*
function getAngleBetweenPoints(x0, y0, x1, y1, x2, y2) { //angle between 3 points in radians
	var dx1 = x1 - x0,
		dy1 = y1 - y0,
		dx2 = x2 - x1,
		dy2 = y2 - y1,
		dx3 = x2 - x0,
		dy3 = y2 - y0,
		a = dx1 * dx1 + dy1 * dy1,
		b = dx2 * dx2 + dy2 * dy2,
		c = dx3 * dx3 + dy3 * dy3;
	return Math.acos( (a + b - c) / _sqrt(4 * a * b) );
},
*/
//pointsToSegment() doesn't handle flat coordinates (where y is always 0) the way we need (the resulting control points are always right on top of the anchors), so this function basically makes the control points go directly up and down, varying in length based on the curviness (more curvy, further control points)

function flatPointsToSegment(points, curviness) {
  if (curviness === void 0) {
    curviness = 1;
  }

  var x = points[0],
      y = 0,
      segment = [x, y],
      i = 2;

  for (; i < points.length; i += 2) {
    segment.push(x, y, points[i], y = (points[i] - x) * curviness / 2, x = points[i], -y);
  }

  return segment;
} //points is an array of x/y points, like [x, y, x, y, x, y]

function pointsToSegment(points, curviness, cornerThreshold) {
  //points = simplifyPoints(points, tolerance);
  var l = points.length - 2,
      x = +points[0],
      y = +points[1],
      nextX = +points[2],
      nextY = +points[3],
      segment = [x, y, x, y],
      dx2 = nextX - x,
      dy2 = nextY - y,
      closed = Math.abs(points[l] - x) < 0.001 && Math.abs(points[l + 1] - y) < 0.001,
      prevX,
      prevY,
      angle,
      slope,
      i,
      dx1,
      dx3,
      dy1,
      dy3,
      d1,
      d2,
      a,
      b,
      c;

  if (isNaN(cornerThreshold)) {
    cornerThreshold = Math.PI / 10;
  }

  if (closed) {
    // if the start and end points are basically on top of each other, close the segment by adding the 2nd point to the end, and the 2nd-to-last point to the beginning (we'll remove them at the end, but this allows the curvature to look perfect)
    points.push(nextX, nextY);
    nextX = x;
    nextY = y;
    x = points[l - 2];
    y = points[l - 1];
    points.unshift(x, y);
    l += 4;
  }

  curviness = curviness || curviness === 0 ? +curviness : 1;

  for (i = 2; i < l; i += 2) {
    prevX = x;
    prevY = y;
    x = nextX;
    y = nextY;
    nextX = +points[i + 2];
    nextY = +points[i + 3];
    dx1 = dx2;
    dy1 = dy2;
    dx2 = nextX - x;
    dy2 = nextY - y;
    dx3 = nextX - prevX;
    dy3 = nextY - prevY;
    a = dx1 * dx1 + dy1 * dy1;
    b = dx2 * dx2 + dy2 * dy2;
    c = dx3 * dx3 + dy3 * dy3;
    angle = Math.acos((a + b - c) / _sqrt(4 * a * b)); //angle between the 3 points

    d2 = angle / Math.PI * curviness; //temporary precalculation for speed (reusing d2 variable)

    d1 = _sqrt(a) * d2; //the tighter the angle, the shorter we make the handles in proportion.

    d2 *= _sqrt(b);

    if (x !== prevX || y !== prevY) {
      if (angle > cornerThreshold) {
        slope = _atan2(dy3, dx3);
        segment.push(_round(x - _cos(slope) * d1), //first control point
        _round(y - _sin(slope) * d1), _round(x), //anchor
        _round(y), _round(x + _cos(slope) * d2), //second control point
        _round(y + _sin(slope) * d2));
      } else {
        slope = _atan2(dy1, dx1);
        segment.push(_round(x - _cos(slope) * d1), //first control point
        _round(y - _sin(slope) * d1));
        slope = _atan2(dy2, dx2);
        segment.push(_round(x), //anchor
        _round(y), _round(x + _cos(slope) * d2), //second control point
        _round(y + _sin(slope) * d2));
      }
    }
  }

  segment.push(_round(nextX), _round(nextY), _round(nextX), _round(nextY));

  if (closed) {
    segment.splice(0, 6);
    segment.length = segment.length - 6;
  }

  return segment;
} //returns the squared distance between an x/y coordinate and a segment between x1/y1 and x2/y2

function pointToSegDist(x, y, x1, y1, x2, y2) {
  var dx = x2 - x1,
      dy = y2 - y1,
      t;

  if (dx || dy) {
    t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      x1 = x2;
      y1 = y2;
    } else if (t > 0) {
      x1 += dx * t;
      y1 += dy * t;
    }
  }

  return Math.pow(x - x1, 2) + Math.pow(y - y1, 2);
}

function simplifyStep(points, first, last, tolerance, simplified) {
  var maxSqDist = tolerance,
      firstX = points[first],
      firstY = points[first + 1],
      lastX = points[last],
      lastY = points[last + 1],
      index,
      i,
      d;

  for (i = first + 2; i < last; i += 2) {
    d = pointToSegDist(points[i], points[i + 1], firstX, firstY, lastX, lastY);

    if (d > maxSqDist) {
      index = i;
      maxSqDist = d;
    }
  }

  if (maxSqDist > tolerance) {
    if (index - first > 2) {
      simplifyStep(points, first, index, tolerance, simplified);
    }

    simplified.push(points[index], points[index + 1]);

    if (last - index > 2) {
      simplifyStep(points, index, last, tolerance, simplified);
    }
  }
} //points is an array of x/y values like [x, y, x, y, x, y]


function simplifyPoints(points, tolerance) {
  var prevX = parseFloat(points[0]),
      prevY = parseFloat(points[1]),
      temp = [prevX, prevY],
      l = points.length - 2,
      i,
      x,
      y,
      dx,
      dy,
      result,
      last;
  tolerance = Math.pow(tolerance || 1, 2);

  for (i = 2; i < l; i += 2) {
    x = parseFloat(points[i]);
    y = parseFloat(points[i + 1]);
    dx = prevX - x;
    dy = prevY - y;

    if (dx * dx + dy * dy > tolerance) {
      temp.push(x, y);
      prevX = x;
      prevY = y;
    }
  }

  temp.push(parseFloat(points[l]), parseFloat(points[l + 1]));
  last = temp.length - 2;
  result = [temp[0], temp[1]];
  simplifyStep(temp, 0, last, tolerance, result);
  result.push(temp[last], temp[last + 1]);
  return result;
}

function getClosestProgressOnBezier(iterations, px, py, start, end, slices, x0, y0, x1, y1, x2, y2, x3, y3) {
  var inc = (end - start) / slices,
      best = 0,
      t = start,
      x,
      y,
      d,
      dx,
      dy,
      inv;
  _bestDistance = _largeNum;

  while (t <= end) {
    inv = 1 - t;
    x = inv * inv * inv * x0 + 3 * inv * inv * t * x1 + 3 * inv * t * t * x2 + t * t * t * x3;
    y = inv * inv * inv * y0 + 3 * inv * inv * t * y1 + 3 * inv * t * t * y2 + t * t * t * y3;
    dx = x - px;
    dy = y - py;
    d = dx * dx + dy * dy;

    if (d < _bestDistance) {
      _bestDistance = d;
      best = t;
    }

    t += inc;
  }

  return iterations > 1 ? getClosestProgressOnBezier(iterations - 1, px, py, Math.max(best - inc, 0), Math.min(best + inc, 1), slices, x0, y0, x1, y1, x2, y2, x3, y3) : best;
}

function getClosestData(rawPath, x, y, slices) {
  //returns an object with the closest j, i, and t (j is the segment index, i is the index of the point in that segment, and t is the time/progress along that bezier)
  var closest = {
    j: 0,
    i: 0,
    t: 0
  },
      bestDistance = _largeNum,
      i,
      j,
      t,
      segment;

  for (j = 0; j < rawPath.length; j++) {
    segment = rawPath[j];

    for (i = 0; i < segment.length; i += 6) {
      t = getClosestProgressOnBezier(1, x, y, 0, 1, slices || 20, segment[i], segment[i + 1], segment[i + 2], segment[i + 3], segment[i + 4], segment[i + 5], segment[i + 6], segment[i + 7]);

      if (bestDistance > _bestDistance) {
        bestDistance = _bestDistance;
        closest.j = j;
        closest.i = i;
        closest.t = t;
      }
    }
  }

  return closest;
} //subdivide a Segment closest to a specific x,y coordinate

function subdivideSegmentNear(x, y, segment, slices, iterations) {
  var l = segment.length,
      bestDistance = _largeNum,
      bestT = 0,
      bestSegmentIndex = 0,
      t,
      i;
  slices = slices || 20;
  iterations = iterations || 3;

  for (i = 0; i < l; i += 6) {
    t = getClosestProgressOnBezier(1, x, y, 0, 1, slices, segment[i], segment[i + 1], segment[i + 2], segment[i + 3], segment[i + 4], segment[i + 5], segment[i + 6], segment[i + 7]);

    if (bestDistance > _bestDistance) {
      bestDistance = _bestDistance;
      bestT = t;
      bestSegmentIndex = i;
    }
  }

  t = getClosestProgressOnBezier(iterations, x, y, bestT - 0.05, bestT + 0.05, slices, segment[bestSegmentIndex], segment[bestSegmentIndex + 1], segment[bestSegmentIndex + 2], segment[bestSegmentIndex + 3], segment[bestSegmentIndex + 4], segment[bestSegmentIndex + 5], segment[bestSegmentIndex + 6], segment[bestSegmentIndex + 7]);
  subdivideSegment(segment, bestSegmentIndex, t);
  return bestSegmentIndex + 6;
}
/*
Takes any of the following and converts it to an all Cubic Bezier SVG data string:
- A <path> data string like "M0,0 L2,4 v20,15 H100"
- A RawPath, like [[x, y, x, y, x, y, x, y][[x, y, x, y, x, y, x, y]]
- A Segment, like [x, y, x, y, x, y, x, y]

Note: all numbers are rounded down to the closest 0.001 to minimize memory, maximize speed, and avoid odd numbers like 1e-13
*/

function rawPathToString(rawPath) {
  if (_isNumber(rawPath[0])) {
    //in case a segment is passed in instead
    rawPath = [rawPath];
  }

  var result = "",
      l = rawPath.length,
      sl,
      s,
      i,
      segment;

  for (s = 0; s < l; s++) {
    segment = rawPath[s];
    result += "M" + _round(segment[0]) + "," + _round(segment[1]) + " C";
    sl = segment.length;

    for (i = 2; i < sl; i++) {
      result += _round(segment[i++]) + "," + _round(segment[i++]) + " " + _round(segment[i++]) + "," + _round(segment[i++]) + " " + _round(segment[i++]) + "," + _round(segment[i]) + " ";
    }

    if (segment.closed) {
      result += "z";
    }
  }

  return result;
}
/*
// takes a segment with coordinates [x, y, x, y, ...] and converts the control points into angles and lengths [x, y, angle, length, angle, length, x, y, angle, length, ...] so that it animates more cleanly and avoids odd breaks/kinks. For example, if you animate from 1 o'clock to 6 o'clock, it'd just go directly/linearly rather than around. So the length would be very short in the middle of the tween.
export function cpCoordsToAngles(segment, copy) {
	var result = copy ? segment.slice(0) : segment,
		x, y, i;
	for (i = 0; i < segment.length; i+=6) {
		x = segment[i+2] - segment[i];
		y = segment[i+3] - segment[i+1];
		result[i+2] = Math.atan2(y, x);
		result[i+3] = Math.sqrt(x * x + y * y);
		x = segment[i+6] - segment[i+4];
		y = segment[i+7] - segment[i+5];
		result[i+4] = Math.atan2(y, x);
		result[i+5] = Math.sqrt(x * x + y * y);
	}
	return result;
}

// takes a segment that was converted with cpCoordsToAngles() to have angles and lengths instead of coordinates for the control points, and converts it BACK into coordinates.
export function cpAnglesToCoords(segment, copy) {
	var result = copy ? segment.slice(0) : segment,
		length = segment.length,
		rnd = 1000,
		angle, l, i, j;
	for (i = 0; i < length; i+=6) {
		angle = segment[i+2];
		l = segment[i+3]; //length
		result[i+2] = (((segment[i] + Math.cos(angle) * l) * rnd) | 0) / rnd;
		result[i+3] = (((segment[i+1] + Math.sin(angle) * l) * rnd) | 0) / rnd;
		angle = segment[i+4];
		l = segment[i+5]; //length
		result[i+4] = (((segment[i+6] - Math.cos(angle) * l) * rnd) | 0) / rnd;
		result[i+5] = (((segment[i+7] - Math.sin(angle) * l) * rnd) | 0) / rnd;
	}
	return result;
}

//adds an "isSmooth" array to each segment and populates it with a boolean value indicating whether or not it's smooth (the control points have basically the same slope). For any smooth control points, it converts the coordinates into angle (x, in radians) and length (y) and puts them into the same index value in a smoothData array.
export function populateSmoothData(rawPath) {
	let j = rawPath.length,
		smooth, segment, x, y, x2, y2, i, l, a, a2, isSmooth, smoothData;
	while (--j > -1) {
		segment = rawPath[j];
		isSmooth = segment.isSmooth = segment.isSmooth || [0, 0, 0, 0];
		smoothData = segment.smoothData = segment.smoothData || [0, 0, 0, 0];
		isSmooth.length = 4;
		l = segment.length - 2;
		for (i = 6; i < l; i += 6) {
			x = segment[i] - segment[i - 2];
			y = segment[i + 1] - segment[i - 1];
			x2 = segment[i + 2] - segment[i];
			y2 = segment[i + 3] - segment[i + 1];
			a = _atan2(y, x);
			a2 = _atan2(y2, x2);
			smooth = (Math.abs(a - a2) < 0.09);
			if (smooth) {
				smoothData[i - 2] = a;
				smoothData[i + 2] = a2;
				smoothData[i - 1] = _sqrt(x * x + y * y);
				smoothData[i + 3] = _sqrt(x2 * x2 + y2 * y2);
			}
			isSmooth.push(smooth, smooth, 0, 0, smooth, smooth);
		}
		//if the first and last points are identical, check to see if there's a smooth transition. We must handle this a bit differently due to their positions in the array.
		if (segment[l] === segment[0] && segment[l+1] === segment[1]) {
			x = segment[0] - segment[l-2];
			y = segment[1] - segment[l-1];
			x2 = segment[2] - segment[0];
			y2 = segment[3] - segment[1];
			a = _atan2(y, x);
			a2 = _atan2(y2, x2);
			if (Math.abs(a - a2) < 0.09) {
				smoothData[l-2] = a;
				smoothData[2] = a2;
				smoothData[l-1] = _sqrt(x * x + y * y);
				smoothData[3] = _sqrt(x2 * x2 + y2 * y2);
				isSmooth[l-2] = isSmooth[l-1] = true; //don't change indexes 2 and 3 because we'll trigger everything from the END, and this will optimize file size a bit.
			}
		}
	}
	return rawPath;
}
export function pointToScreen(svgElement, point) {
	if (arguments.length < 2) { //by default, take the first set of coordinates in the path as the point
		let rawPath = getRawPath(svgElement);
		point = svgElement.ownerSVGElement.createSVGPoint();
		point.x = rawPath[0][0];
		point.y = rawPath[0][1];
	}
	return point.matrixTransform(svgElement.getScreenCTM());
}

*/

/***/ }),

/***/ "./node_modules/gsap/utils/strings.js":
/*!********************************************!*\
  !*** ./node_modules/gsap/utils/strings.js ***!
  \********************************************/
/*! exports provided: emojiExp, getText, splitInnerHTML, emojiSafeSplit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emojiExp", function() { return emojiExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getText", function() { return getText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitInnerHTML", function() { return splitInnerHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emojiSafeSplit", function() { return emojiSafeSplit; });
/*!
 * strings: 3.5.1
 * https://greensock.com
 *
 * Copyright 2008-2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _trimExp = /(^\s+|\s+$)/g;
var emojiExp = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
function getText(e) {
  var type = e.nodeType,
      result = "";

  if (type === 1 || type === 9 || type === 11) {
    if (typeof e.textContent === "string") {
      return e.textContent;
    } else {
      for (e = e.firstChild; e; e = e.nextSibling) {
        result += getText(e);
      }
    }
  } else if (type === 3 || type === 4) {
    return e.nodeValue;
  }

  return result;
}
function splitInnerHTML(element, delimiter, trim) {
  var node = element.firstChild,
      result = [];

  while (node) {
    if (node.nodeType === 3) {
      result.push.apply(result, emojiSafeSplit((node.nodeValue + "").replace(/^\n+/g, "").replace(/\s+/g, " "), delimiter, trim));
    } else if ((node.nodeName + "").toLowerCase() === "br") {
      result[result.length - 1] += "<br>";
    } else {
      result.push(node.outerHTML);
    }

    node = node.nextSibling;
  }

  return result;
}
/*
//smaller kb version that only handles the simpler emoji's, which is often perfectly adequate.

let _emoji = "[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D]|[\uD800-\uDBFF][\uDC00-\uDFFF]",
	_emojiExp = new RegExp(_emoji),
	_emojiAndCharsExp = new RegExp(_emoji + "|.", "g"),
	_emojiSafeSplit = (text, delimiter, trim) => {
		if (trim) {
			text = text.replace(_trimExp, "");
		}
		return ((delimiter === "" || !delimiter) && _emojiExp.test(text)) ? text.match(_emojiAndCharsExp) : text.split(delimiter || "");
	};
 */

function emojiSafeSplit(text, delimiter, trim) {
  text += ""; // make sure it's cast as a string. Someone may pass in a number.

  if (trim) {
    text = text.replace(_trimExp, "");
  }

  if (delimiter && delimiter !== "") {
    return text.replace(/>/g, "&gt;").replace(/</g, "&lt;").split(delimiter);
  }

  var result = [],
      l = text.length,
      i = 0,
      j,
      character;

  for (; i < l; i++) {
    character = text.charAt(i);

    if (character.charCodeAt(0) >= 0xD800 && character.charCodeAt(0) <= 0xDBFF || text.charCodeAt(i + 1) >= 0xFE00 && text.charCodeAt(i + 1) <= 0xFE0F) {
      //special emoji characters use 2 or 4 unicode characters that we must keep together.
      j = ((text.substr(i, 12).split(emojiExp) || [])[1] || "").length || 2;
      character = text.substr(i, j);
      result.emoji = 1;
      i += j - 1;
    }

    result.push(character === ">" ? "&gt;" : character === "<" ? "&lt;" : character);
  }

  return result;
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL2dzYXAvQ1NTUnVsZVBsdWdpbi5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL2dzYXAvRHJhZ2dhYmxlLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvZ3NhcC9FYXNlUGFjay5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL2dzYXAvRWFzZWxQbHVnaW4uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9nc2FwL01vdGlvblBhdGhQbHVnaW4uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9nc2FwL1BpeGlQbHVnaW4uanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9nc2FwL1Njcm9sbFRvUGx1Z2luLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvZ3NhcC9TY3JvbGxUcmlnZ2VyLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvZ3NhcC9UZXh0UGx1Z2luLmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvZ3NhcC9hbGwuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9nc2FwL3V0aWxzL21hdHJpeC5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL2dzYXAvdXRpbHMvcGF0aHMuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9nc2FwL3V0aWxzL3N0cmluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRTtBQUMzRSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0ZBQXdGOztBQUV4RjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcElBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQXVDLHVCQUF1Qix1RkFBdUYsRUFBRSxhQUFhOztBQUVwSywrQ0FBK0MsMERBQTBELDJDQUEyQyxpQ0FBaUM7O0FBRXJMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUM4RDs7QUFFOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EseUpBQXlKOztBQUV6SixnREFBZ0Q7QUFDaEQsQ0FBQztBQUNEO0FBQ0E7QUFDQSwwQkFBMEIseURBQVE7QUFDbEM7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLEVBQUU7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxxRkFBcUY7QUFDckY7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0QsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsK0dBQStHO0FBQy9HLENBQUM7QUFDRDtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsZ0hBQWdILHlCQUF5QixLQUFLLHVCQUF1QjtBQUNySztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzQ0FBc0M7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRCxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrS0FBK0s7QUFDL0ssR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLHdFQUFlLHlCQUF5Qix3RUFBZTtBQUNsRTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0VBQWdFLGFBQWE7QUFDN0UsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBLE9BQU87QUFDUCxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCOztBQUVqQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUVBQXFFOztBQUVyRTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RTs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDOztBQUU5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELFdBQVcsU0FBUyxvQkFBb0Isa0JBQWtCLFdBQVc7QUFDNUg7QUFDQSw4RUFBOEU7O0FBRTlFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3REFBd0QsWUFBWSxhQUFhLGNBQWM7QUFDL0Y7QUFDQTtBQUNBLHVEQUF1RDs7QUFFdkQ7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7O0FBR1A7QUFDQSwyRUFBMkU7QUFDM0U7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQSxLQUFLOztBQUVMLGtEQUFrRDs7O0FBR2xELGdEQUFnRDs7O0FBR2hELDhEQUE4RDs7QUFFOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBLENBQUM7O0FBRU07QUFDUDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSx3REFBd0Q7QUFDeEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0RUFBNEU7O0FBRTVFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHNFQUFzRTs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsNERBQTRELGdGQUFnRix3Q0FBd0MsS0FBSzs7QUFFekw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLHFDQUFxQztBQUNyQzs7QUFFQSx3Q0FBd0M7O0FBRXhDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZUFBZSx3RUFBZTs7QUFFOUIsc0VBQXNFLHlEQUFRO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7O0FBRWxDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaURBQWlELHdFQUFlO0FBQ2hFO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDOztBQUVqQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7O0FBRXBEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrRUFBa0U7O0FBRWxFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkZBQTZGOztBQUU3Rjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLE9BQU87QUFDUDs7QUFFQSxvREFBb0Q7O0FBRXBEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1REFBdUQ7O0FBRXZEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxvREFBb0Q7OztBQUdwRDs7QUFFQTs7QUFFQSx1Q0FBdUM7OztBQUd2QztBQUNBOztBQUVBLHdOQUF3Tjs7QUFFeE47O0FBRUE7QUFDQTs7QUFFQSxnRUFBZ0U7O0FBRWhFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLDhCQUE4QjtBQUM5QixPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQSxnQ0FBZ0M7OztBQUdoQyw4Q0FBOEM7O0FBRTlDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTs7QUFFaEU7QUFDQTtBQUNBLE9BQU8sUUFBUTs7QUFFZjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrRUFBa0U7O0FBRWxFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9FQUFvRTs7QUFFcEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0U7O0FBRWxFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVEQUF1RDs7QUFFdkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsaURBQWlEOztBQUVqRDtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw2RUFBNkU7O0FBRTdFO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0ZBQStGOzs7QUFHL0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUI7O0FBRXJCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0RBQXdEOzs7QUFHeEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxTQUFTOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4REFBOEQ7O0FBRTlEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSw2Q0FBNkM7QUFDN0M7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ptRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0M7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQLHFCQUFxQjs7QUFFckI7QUFDTztBQUNQO0FBQ087QUFDUCwyQkFBMkI7O0FBRTNCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2xOQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsT0FBTztBQUNwQixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDblZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDb087QUFDaEw7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsT0FBTztBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0Esd0JBQXdCLCtEQUFlLEdBQUcsbUVBQW1CO0FBQzdEO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxTQUFTLGdGQUF3QiwrREFBK0Q7QUFDaEcsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsVUFBVSx3RUFBZTtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxxQkFBcUIsd0VBQWU7QUFDcEMsd0NBQXdDLHdFQUFlO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxrRUFBVTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0EsTUFBTSx3RUFBZ0I7QUFDdEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNLHdFQUFnQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0EsSUFBSSx3RUFBZ0I7QUFDcEIsR0FBRztBQUNILElBQUksd0VBQWdCO0FBQ3BCOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsZ0NBQWdDLG9FQUFZO0FBQzVDO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7O0FBRS9DLDZEQUE2RDs7QUFFN0Qsb0VBQW9FO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsOEJBQThCLGtFQUFVO0FBQ3hDLE1BQU0sZ0ZBQXdCO0FBQzlCOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsTUFBTSx5RUFBaUI7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQSxXQUFXLGdGQUF3QixDQUFDLGtFQUFVO0FBQzlDLEdBQUc7QUFDSCxnQkFBZ0IsNERBQVk7QUFDNUIsY0FBYywwREFBVTtBQUN4QixtQkFBbUIsK0RBQWU7QUFDbEMsbUJBQW1CLCtEQUFlO0FBQ2xDLG1CQUFtQiwrREFBZTtBQUNsQyxvQkFBb0IsZ0VBQWdCO0FBQ3BDLG1CQUFtQixnRUFBZTtBQUNsQyxxQkFBcUIsaUVBQWlCO0FBQ3RDLDRCQUE0Qix3RUFBd0I7QUFDcEQ7QUFDQTtBQUNBLGFBQWEscUVBQWM7QUFDM0IsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLFlBQVksd0VBQWUsaUNBQWlDLHdFQUFlO0FBQzNFO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0EsOENBQThDLHVFQUFlO0FBQzdEO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pWQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxPQUFPO0FBQ3BCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxlQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBLENBQUM7QUFDRDtBQUNBLE1BQU07OztBQUdOLFdBQVcsd0JBQXdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsMERBQTBEOztBQUUxRDtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOWNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2Qjs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwT0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpQkFBaUIseUJBQXlCO0FBQzFDO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMkJBQTJCLG9CQUFvQiwrQkFBK0Isb0JBQW9CLG1CQUFtQiw2QkFBNkIsYUFBYSxnQkFBZ0IsZUFBZSxtQkFBbUI7O0FBRXpQLGdFQUFnRSxjQUFjO0FBQzlFLHdJQUF3STtBQUN4SSxpREFBaUQsZ0JBQWdCLHlDQUF5QztBQUMxRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsVUFBVSxtQkFBbUI7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEdBQTRHO0FBQzVHO0FBQ0E7O0FBRUEsc0JBQXNCOzs7QUFHdEIsZUFBZSxvQkFBb0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHlCQUF5QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUEsY0FBYyx1QkFBdUI7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLHNFQUFzRTs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxjQUFjLHVCQUF1QjtBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHLEVBQUU7O0FBRUw7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNILGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVSxPQUFPO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxPQUFPO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLE9BQU87QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQzs7QUFFdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTyxFQUFFOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhKQUE4Sjs7QUFFOUo7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxxRkFBcUY7O0FBRS9JOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUVBQXFFOztBQUVyRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSw0RUFBNEU7O0FBRTVFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0JBQStCOztBQUUvQjtBQUNBLHlHQUF5Rzs7QUFFekc7O0FBRUEsa0NBQWtDOztBQUVsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRkFBc0Y7O0FBRXRGO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0M7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrRUFBa0U7O0FBRWxFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7O0FBR1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7O0FBRS9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWCwySEFBMkg7O0FBRTNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUyxFQUFFOztBQUVYOztBQUVBO0FBQ0Esc0dBQXNHOztBQUV0RztBQUNBLDJJQUEySTs7QUFFM0k7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUZBQXVGOztBQUV2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87OztBQUdQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsMENBQTBDO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEseUNBQXlDOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMERBQTBEOztBQUUxRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxrREFBa0Q7OztBQUdsRDtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7O0FBRWpEO0FBQ0EscUVBQXFFOztBQUVyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWCwwREFBMEQ7OztBQUcxRCwwREFBMEQ7OztBQUcxRDtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0EsV0FBVzs7QUFFWDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7Ozs7OztBQzNqREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDNkU7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsd0VBQWM7O0FBRTdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsd0VBQWM7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEOztBQUUvRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLGlCQUFpQjtBQUNsQzs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw2Q0FBNkMsc0RBQXNELE1BQU07QUFDekc7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdFQUFjO0FBQzFDLDRCQUE0QixnRUFBYztBQUMxQyxxQkFBcUIseURBQU87QUFDNUI7Ozs7Ozs7Ozs7Ozs7QUNyS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFrQztBQUNLO0FBQ3ZDLGtCQUFrQixxREFBSSxnQkFBZ0IscURBQVMsS0FBSyxxREFBSTtBQUN4RDs7QUFFK0Y7QUFDeVA7QUFDelQ7QUFDSTtBQUNGO0FBQ0g7QUFDUTtBQUNOO0FBQ0k7QUFDRDs7O0FBR25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7QUM3QkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxjQUFjLG9CQUFvQjtBQUNuRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkNBQTZDLGFBQWEsZ0JBQWdCOztBQUUxRTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEscUJBQXFCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsMkRBQTJEOztBQUUzRDtBQUNBLHNFQUFzRTs7QUFFdEU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUMsR0FBRztBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSTs7Ozs7Ozs7Ozs7O0FDbFlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsY0FBYztBQUNkLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0Esa1NBQWtTLEtBQUs7QUFDdlM7QUFDQTtBQUNBO0FBQ0E7OztBQUdPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7O0FBRUEsUUFBUSxvQkFBb0I7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0Esb0JBQW9COztBQUVwQixRQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQzs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7OztBQUdLO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDBFQUEwRTtBQUMxRSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVNO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsT0FBTztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDhEQUE4RDs7QUFFOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsY0FBYztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFVBQVUsK0JBQStCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDs7QUFFQSxtQ0FBbUMsb0JBQW9CO0FBQ3ZELCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsdUJBQXVCOztBQUV4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVNO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkM7O0FBRTNDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLGNBQWM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0gsYUFBYSxvQkFBb0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQSxDQUFDOzs7QUFHTTtBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLGNBQWM7QUFDM0I7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQztBQUNwQyxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87OztBQUdQO0FBQ0EsYUFBYTtBQUNiLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYixLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsS0FBSztBQUNMO0FBQ0EsYUFBYTtBQUNiLEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYTtBQUNiLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0I7QUFDcEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQyxvSEFBb0gsS0FBSyxHQUFHLEtBQUs7O0FBRTNIO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsbUJBQW1CO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVNO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RCxxQ0FBcUM7O0FBRXJDLHVCQUF1Qjs7QUFFdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixVQUFVO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHTTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsb0JBQW9CO0FBQ2pDOztBQUVBLGVBQWUsb0JBQW9CO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVNO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9CQUFvQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksWUFBWTtBQUN4QjtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRTs7Ozs7Ozs7Ozs7O0FDcDlDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDTyxnR0FBZ0csR0FBRztBQUNuRztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDRCQUE0QixHQUFHO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLHNCQUFzQjtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsT0FBTztBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5Qyw2QkFBNkI7QUFDdEU7O0FBRUE7QUFDQSxDIiwiZmlsZSI6InN0YXRpYy9jaHVua3MvMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQ1NTUnVsZVBsdWdpbiAzLjUuMVxuICogaHR0cHM6Ly9ncmVlbnNvY2suY29tXG4gKlxuICogQGxpY2Vuc2UgQ29weXJpZ2h0IDIwMDgtMjAyMCwgR3JlZW5Tb2NrLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogU3ViamVjdCB0byB0aGUgdGVybXMgYXQgaHR0cHM6Ly9ncmVlbnNvY2suY29tL3N0YW5kYXJkLWxpY2Vuc2Ugb3IgZm9yXG4gKiBDbHViIEdyZWVuU29jayBtZW1iZXJzLCB0aGUgYWdyZWVtZW50IGlzc3VlZCB3aXRoIHRoYXQgbWVtYmVyc2hpcC5cbiAqIEBhdXRob3I6IEphY2sgRG95bGUsIGphY2tAZ3JlZW5zb2NrLmNvbVxuKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cbnZhciBnc2FwLFxuICAgIF9jb3JlSW5pdHRlZCxcbiAgICBfd2luLFxuICAgIF9kb2MsXG4gICAgQ1NTUGx1Z2luLFxuICAgIF93aW5kb3dFeGlzdHMgPSBmdW5jdGlvbiBfd2luZG93RXhpc3RzKCkge1xuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIjtcbn0sXG4gICAgX2dldEdTQVAgPSBmdW5jdGlvbiBfZ2V0R1NBUCgpIHtcbiAgcmV0dXJuIGdzYXAgfHwgX3dpbmRvd0V4aXN0cygpICYmIChnc2FwID0gd2luZG93LmdzYXApICYmIGdzYXAucmVnaXN0ZXJQbHVnaW4gJiYgZ3NhcDtcbn0sXG4gICAgX2NoZWNrUmVnaXN0ZXIgPSBmdW5jdGlvbiBfY2hlY2tSZWdpc3RlcigpIHtcbiAgaWYgKCFfY29yZUluaXR0ZWQpIHtcbiAgICBfaW5pdENvcmUoKTtcblxuICAgIGlmICghQ1NTUGx1Z2luKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJQbGVhc2UgZ3NhcC5yZWdpc3RlclBsdWdpbihDU1NQbHVnaW4sIENTU1J1bGVQbHVnaW4pXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfY29yZUluaXR0ZWQ7XG59LFxuICAgIF9pbml0Q29yZSA9IGZ1bmN0aW9uIF9pbml0Q29yZShjb3JlKSB7XG4gIGdzYXAgPSBjb3JlIHx8IF9nZXRHU0FQKCk7XG5cbiAgaWYgKF93aW5kb3dFeGlzdHMoKSkge1xuICAgIF93aW4gPSB3aW5kb3c7XG4gICAgX2RvYyA9IGRvY3VtZW50O1xuICB9XG5cbiAgaWYgKGdzYXApIHtcbiAgICBDU1NQbHVnaW4gPSBnc2FwLnBsdWdpbnMuY3NzO1xuXG4gICAgaWYgKENTU1BsdWdpbikge1xuICAgICAgX2NvcmVJbml0dGVkID0gMTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB2YXIgQ1NTUnVsZVBsdWdpbiA9IHtcbiAgdmVyc2lvbjogXCIzLjUuMVwiLFxuICBuYW1lOiBcImNzc1J1bGVcIixcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhbHVlLCB0d2VlbiwgaW5kZXgsIHRhcmdldHMpIHtcbiAgICBpZiAoIV9jaGVja1JlZ2lzdGVyKCkgfHwgdHlwZW9mIHRhcmdldC5jc3NUZXh0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGRpdiA9IHRhcmdldC5fZ3NQcm94eSA9IHRhcmdldC5fZ3NQcm94eSB8fCBfZG9jLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICB0aGlzLnNzID0gdGFyZ2V0O1xuICAgIHRoaXMuc3R5bGUgPSBkaXYuc3R5bGU7XG4gICAgZGl2LnN0eWxlLmNzc1RleHQgPSB0YXJnZXQuY3NzVGV4dDtcbiAgICBDU1NQbHVnaW4ucHJvdG90eXBlLmluaXQuY2FsbCh0aGlzLCBkaXYsIHZhbHVlLCB0d2VlbiwgaW5kZXgsIHRhcmdldHMpOyAvL3dlIGp1c3Qgb2ZmbG9hZCBhbGwgdGhlIHdvcmsgdG8gdGhlIHJlZ3VsYXIgQ1NTUGx1Z2luIGFuZCB0aGVuIGNvcHkgdGhlIGNzc1RleHQgYmFjayBvdmVyIHRvIHRoZSBydWxlIGluIHRoZSByZW5kZXIoKSBtZXRob2QuIFRoaXMgYWxsb3dzIHVzIHRvIGhhdmUgYWxsIG9mIHRoZSB1cGRhdGVzIHRvIENTU1BsdWdpbiBhdXRvbWF0aWNhbGx5IGZsb3cgdGhyb3VnaCB0byBDU1NSdWxlUGx1Z2luIGluc3RlYWQgb2YgaGF2aW5nIHRvIG1haW50YWluIGJvdGhcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIocmF0aW8sIGRhdGEpIHtcbiAgICB2YXIgcHQgPSBkYXRhLl9wdCxcbiAgICAgICAgc3R5bGUgPSBkYXRhLnN0eWxlLFxuICAgICAgICBzcyA9IGRhdGEuc3MsXG4gICAgICAgIGk7XG5cbiAgICB3aGlsZSAocHQpIHtcbiAgICAgIHB0LnIocmF0aW8sIHB0LmQpO1xuICAgICAgcHQgPSBwdC5fbmV4dDtcbiAgICB9XG5cbiAgICBpID0gc3R5bGUubGVuZ3RoO1xuXG4gICAgd2hpbGUgKC0taSA+IC0xKSB7XG4gICAgICBzc1tzdHlsZVtpXV0gPSBzdHlsZVtzdHlsZVtpXV07XG4gICAgfVxuICB9LFxuICBnZXRSdWxlOiBmdW5jdGlvbiBnZXRSdWxlKHNlbGVjdG9yKSB7XG4gICAgX2NoZWNrUmVnaXN0ZXIoKTtcblxuICAgIHZhciBydWxlUHJvcCA9IF9kb2MuYWxsID8gXCJydWxlc1wiIDogXCJjc3NSdWxlc1wiLFxuICAgICAgICBzdHlsZVNoZWV0cyA9IF9kb2Muc3R5bGVTaGVldHMsXG4gICAgICAgIGkgPSBzdHlsZVNoZWV0cy5sZW5ndGgsXG4gICAgICAgIHBzZXVkbyA9IHNlbGVjdG9yLmNoYXJBdCgwKSA9PT0gXCI6XCIsXG4gICAgICAgIGosXG4gICAgICAgIGN1clNTLFxuICAgICAgICBjcyxcbiAgICAgICAgYTtcbiAgICBzZWxlY3RvciA9IChwc2V1ZG8gPyBcIlwiIDogXCIsXCIpICsgc2VsZWN0b3Iuc3BsaXQoXCI6OlwiKS5qb2luKFwiOlwiKS50b0xvd2VyQ2FzZSgpICsgXCIsXCI7IC8vbm90ZTogb2xkIHZlcnNpb25zIG9mIElFIHJlcG9ydCB0YWcgbmFtZSBzZWxlY3RvcnMgYXMgdXBwZXIgY2FzZSwgc28gd2UganVzdCBjaGFuZ2UgZXZlcnl0aGluZyB0byBsb3dlcmNhc2UuXG5cbiAgICBpZiAocHNldWRvKSB7XG4gICAgICBhID0gW107XG4gICAgfVxuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgLy9GaXJlZm94IG1heSB0aHJvdyBpbnNlY3VyZSBvcGVyYXRpb24gZXJyb3JzIHdoZW4gY3NzIGlzIGxvYWRlZCBmcm9tIG90aGVyIGRvbWFpbnMsIHNvIHRyeS9jYXRjaC5cbiAgICAgIHRyeSB7XG4gICAgICAgIGN1clNTID0gc3R5bGVTaGVldHNbaV1bcnVsZVByb3BdO1xuXG4gICAgICAgIGlmICghY3VyU1MpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGogPSBjdXJTUy5sZW5ndGg7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICgtLWogPiAtMSkge1xuICAgICAgICBjcyA9IGN1clNTW2pdO1xuXG4gICAgICAgIGlmIChjcy5zZWxlY3RvclRleHQgJiYgKFwiLFwiICsgY3Muc2VsZWN0b3JUZXh0LnNwbGl0KFwiOjpcIikuam9pbihcIjpcIikudG9Mb3dlckNhc2UoKSArIFwiLFwiKS5pbmRleE9mKHNlbGVjdG9yKSAhPT0gLTEpIHtcbiAgICAgICAgICAvL25vdGU6IElFIGFkZHMgYW4gZXh0cmEgXCI6XCIgdG8gcHNldWRvIHNlbGVjdG9ycywgc28gLm15Q2xhc3M6YWZ0ZXIgYmVjb21lcyAubXlDbGFzczo6YWZ0ZXIsIHNvIHdlIG5lZWQgdG8gc3RyaXAgdGhlIGV4dHJhIG9uZSBvdXQuXG4gICAgICAgICAgaWYgKHBzZXVkbykge1xuICAgICAgICAgICAgYS5wdXNoKGNzLnN0eWxlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGNzLnN0eWxlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9LFxuICByZWdpc3RlcjogX2luaXRDb3JlXG59O1xuX2dldEdTQVAoKSAmJiBnc2FwLnJlZ2lzdGVyUGx1Z2luKENTU1J1bGVQbHVnaW4pO1xuZXhwb3J0IHsgQ1NTUnVsZVBsdWdpbiBhcyBkZWZhdWx0IH07IiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKiFcbiAqIERyYWdnYWJsZSAzLjUuMVxuICogaHR0cHM6Ly9ncmVlbnNvY2suY29tXG4gKlxuICogQGxpY2Vuc2UgQ29weXJpZ2h0IDIwMDgtMjAyMCwgR3JlZW5Tb2NrLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogU3ViamVjdCB0byB0aGUgdGVybXMgYXQgaHR0cHM6Ly9ncmVlbnNvY2suY29tL3N0YW5kYXJkLWxpY2Vuc2Ugb3IgZm9yXG4gKiBDbHViIEdyZWVuU29jayBtZW1iZXJzLCB0aGUgYWdyZWVtZW50IGlzc3VlZCB3aXRoIHRoYXQgbWVtYmVyc2hpcC5cbiAqIEBhdXRob3I6IEphY2sgRG95bGUsIGphY2tAZ3JlZW5zb2NrLmNvbVxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBnZXRHbG9iYWxNYXRyaXgsIE1hdHJpeDJEIH0gZnJvbSBcIi4vdXRpbHMvbWF0cml4LmpzXCI7XG5cbnZhciBnc2FwLFxuICAgIF93aW4sXG4gICAgX2RvYyxcbiAgICBfZG9jRWxlbWVudCxcbiAgICBfYm9keSxcbiAgICBfdGVtcERpdixcbiAgICBfcGxhY2Vob2xkZXJEaXYsXG4gICAgX2NvcmVJbml0dGVkLFxuICAgIF9jaGVja1ByZWZpeCxcbiAgICBfdG9BcnJheSxcbiAgICBfc3VwcG9ydHNQYXNzaXZlLFxuICAgIF9pc1RvdWNoRGV2aWNlLFxuICAgIF90b3VjaEV2ZW50TG9va3VwLFxuICAgIF9kcmFnQ291bnQsXG4gICAgX2lzTXVsdGlUb3VjaGluZyxcbiAgICBfaXNBbmRyb2lkLFxuICAgIEluZXJ0aWFQbHVnaW4sXG4gICAgX2RlZmF1bHRDdXJzb3IsXG4gICAgX3N1cHBvcnRzUG9pbnRlcixcbiAgICBfd2luZG93RXhpc3RzID0gZnVuY3Rpb24gX3dpbmRvd0V4aXN0cygpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG59LFxuICAgIF9nZXRHU0FQID0gZnVuY3Rpb24gX2dldEdTQVAoKSB7XG4gIHJldHVybiBnc2FwIHx8IF93aW5kb3dFeGlzdHMoKSAmJiAoZ3NhcCA9IHdpbmRvdy5nc2FwKSAmJiBnc2FwLnJlZ2lzdGVyUGx1Z2luICYmIGdzYXA7XG59LFxuICAgIF9pc0Z1bmN0aW9uID0gZnVuY3Rpb24gX2lzRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiO1xufSxcbiAgICBfaXNPYmplY3QgPSBmdW5jdGlvbiBfaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn0sXG4gICAgX2lzVW5kZWZpbmVkID0gZnVuY3Rpb24gX2lzVW5kZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCI7XG59LFxuICAgIF9lbXB0eUZ1bmMgPSBmdW5jdGlvbiBfZW1wdHlGdW5jKCkge1xuICByZXR1cm4gZmFsc2U7XG59LFxuICAgIF90cmFuc2Zvcm1Qcm9wID0gXCJ0cmFuc2Zvcm1cIixcbiAgICBfdHJhbnNmb3JtT3JpZ2luUHJvcCA9IFwidHJhbnNmb3JtT3JpZ2luXCIsXG4gICAgX3JvdW5kID0gZnVuY3Rpb24gX3JvdW5kKHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogMTAwMDApIC8gMTAwMDA7XG59LFxuICAgIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheSxcbiAgICBfY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50KHR5cGUsIG5zKSB7XG4gIHZhciBlID0gX2RvYy5jcmVhdGVFbGVtZW50TlMgPyBfZG9jLmNyZWF0ZUVsZW1lbnROUygobnMgfHwgXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIpLnJlcGxhY2UoL15odHRwcy8sIFwiaHR0cFwiKSwgdHlwZSkgOiBfZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSk7IC8vc29tZSBzZXJ2ZXJzIHN3YXAgaW4gaHR0cHMgZm9yIGh0dHAgaW4gdGhlIG5hbWVzcGFjZSB3aGljaCBjYW4gYnJlYWsgdGhpbmdzLCBtYWtpbmcgXCJzdHlsZVwiIGluYWNjZXNzaWJsZS5cblxuICByZXR1cm4gZS5zdHlsZSA/IGUgOiBfZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSk7IC8vc29tZSBlbnZpcm9ubWVudHMgd29uJ3QgYWxsb3cgYWNjZXNzIHRvIHRoZSBlbGVtZW50J3Mgc3R5bGUgd2hlbiBjcmVhdGVkIHdpdGggYSBuYW1lc3BhY2UgaW4gd2hpY2ggY2FzZSB3ZSBkZWZhdWx0IHRvIHRoZSBzdGFuZGFyZCBjcmVhdGVFbGVtZW50KCkgdG8gd29yayBhcm91bmQgdGhlIGlzc3VlLiBBbHNvIG5vdGUgdGhhdCB3aGVuIEdTQVAgaXMgZW1iZWRkZWQgZGlyZWN0bHkgaW5zaWRlIGFuIFNWRyBmaWxlLCBjcmVhdGVFbGVtZW50KCkgd29uJ3QgYWxsb3cgYWNjZXNzIHRvIHRoZSBzdHlsZSBvYmplY3QgaW4gRmlyZWZveCAoc2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjAyMTUtcHJvYmxlbS11c2luZy10d2Vlbm1heC1pbi1zdGFuZGFsb25lLXNlbGYtY29udGFpbmluZy1zdmctZmlsZS1lcnItY2Fubm90LXNldC1wcm9wZXJ0eS1jc3N0ZXh0LW9mLXVuZGVmaW5lZC8pLlxufSxcbiAgICBfUkFEMkRFRyA9IDE4MCAvIE1hdGguUEksXG4gICAgX2JpZ051bSA9IDFlMjAsXG4gICAgX2lkZW50aXR5TWF0cml4ID0gbmV3IE1hdHJpeDJEKCksXG4gICAgX2dldFRpbWUgPSBEYXRlLm5vdyB8fCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbn0sXG4gICAgX3JlbmRlclF1ZXVlID0gW10sXG4gICAgX2xvb2t1cCA9IHt9LFxuICAgIC8vd2hlbiBhIERyYWdnYWJsZSBpcyBjcmVhdGVkLCB0aGUgdGFyZ2V0IGdldHMgYSB1bmlxdWUgX2dzRHJhZ0lEIHByb3BlcnR5IHRoYXQgYWxsb3dzIGdldHMgYXNzb2NpYXRlZCB3aXRoIHRoZSBEcmFnZ2FibGUgaW5zdGFuY2UgZm9yIHF1aWNrIGxvb2t1cHMgaW4gRHJhZ2dhYmxlLmdldCgpLiBUaGlzIGF2b2lkcyBjaXJjdWxhciByZWZlcmVuY2VzIHRoYXQgY291bGQgY2F1c2UgZ2MgcHJvYmxlbXMuXG5fbG9va3VwQ291bnQgPSAwLFxuICAgIF9jbGlja2FibGVUYWdFeHAgPSAvXig/OmF8aW5wdXR8dGV4dGFyZWF8YnV0dG9ufHNlbGVjdCkkL2ksXG4gICAgX2xhc3REcmFnVGltZSA9IDAsXG4gICAgX3RlbXAxID0ge30sXG4gICAgLy8gYSBzaW1wbGUgb2JqZWN0IHdlIHJldXNlIGFuZCBwb3B1bGF0ZSAodXN1YWxseSB4L3kgcHJvcGVydGllcykgdG8gY29uc2VydmUgbWVtb3J5IGFuZCBpbXByb3ZlIHBlcmZvcm1hbmNlLlxuX3dpbmRvd1Byb3h5ID0ge30sXG4gICAgLy9tZW1vcnkvcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIC0gd2UgcmV1c2UgdGhpcyBvYmplY3QgZHVyaW5nIGF1dG9TY3JvbGwgdG8gc3RvcmUgd2luZG93LXJlbGF0ZWQgYm91bmRzL29mZnNldHMuXG5fY29weSA9IGZ1bmN0aW9uIF9jb3B5KG9iaiwgZmFjdG9yKSB7XG4gIHZhciBjb3B5ID0ge30sXG4gICAgICBwO1xuXG4gIGZvciAocCBpbiBvYmopIHtcbiAgICBjb3B5W3BdID0gZmFjdG9yID8gb2JqW3BdICogZmFjdG9yIDogb2JqW3BdO1xuICB9XG5cbiAgcmV0dXJuIGNvcHk7XG59LFxuICAgIF9leHRlbmQgPSBmdW5jdGlvbiBfZXh0ZW5kKG9iaiwgZGVmYXVsdHMpIHtcbiAgZm9yICh2YXIgcCBpbiBkZWZhdWx0cykge1xuICAgIGlmICghKHAgaW4gb2JqKSkge1xuICAgICAgb2JqW3BdID0gZGVmYXVsdHNbcF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0sXG4gICAgX3JlbmRlclF1ZXVlVGljayA9IGZ1bmN0aW9uIF9yZW5kZXJRdWV1ZVRpY2soKSB7XG4gIHJldHVybiBfcmVuZGVyUXVldWUuZm9yRWFjaChmdW5jdGlvbiAoZnVuYykge1xuICAgIHJldHVybiBmdW5jKCk7XG4gIH0pO1xufSxcbiAgICBfYWRkVG9SZW5kZXJRdWV1ZSA9IGZ1bmN0aW9uIF9hZGRUb1JlbmRlclF1ZXVlKGZ1bmMpIHtcbiAgX3JlbmRlclF1ZXVlLnB1c2goZnVuYyk7XG5cbiAgaWYgKF9yZW5kZXJRdWV1ZS5sZW5ndGggPT09IDEpIHtcbiAgICBnc2FwLnRpY2tlci5hZGQoX3JlbmRlclF1ZXVlVGljayk7XG4gIH1cbn0sXG4gICAgX3JlbmRlclF1ZXVlVGltZW91dCA9IGZ1bmN0aW9uIF9yZW5kZXJRdWV1ZVRpbWVvdXQoKSB7XG4gIHJldHVybiAhX3JlbmRlclF1ZXVlLmxlbmd0aCAmJiBnc2FwLnRpY2tlci5yZW1vdmUoX3JlbmRlclF1ZXVlVGljayk7XG59LFxuICAgIF9yZW1vdmVGcm9tUmVuZGVyUXVldWUgPSBmdW5jdGlvbiBfcmVtb3ZlRnJvbVJlbmRlclF1ZXVlKGZ1bmMpIHtcbiAgdmFyIGkgPSBfcmVuZGVyUXVldWUubGVuZ3RoO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZiAoX3JlbmRlclF1ZXVlW2ldID09PSBmdW5jKSB7XG4gICAgICBfcmVuZGVyUXVldWUuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfVxuXG4gIGdzYXAudG8oX3JlbmRlclF1ZXVlVGltZW91dCwge1xuICAgIG92ZXJ3cml0ZTogdHJ1ZSxcbiAgICBkZWxheTogMTUsXG4gICAgZHVyYXRpb246IDAsXG4gICAgb25Db21wbGV0ZTogX3JlbmRlclF1ZXVlVGltZW91dCxcbiAgICBkYXRhOiBcIl9kcmFnZ2FibGVcIlxuICB9KTsgLy9yZW1vdmUgdGhlIFwidGlja1wiIGxpc3RlbmVyIG9ubHkgYWZ0ZXIgdGhlIHJlbmRlciBxdWV1ZSBpcyBlbXB0eSBmb3IgMTUgc2Vjb25kcyAodG8gaW1wcm92ZSBwZXJmb3JtYW5jZSkuIEFkZGluZy9yZW1vdmluZyBpdCBjb25zdGFudGx5IGZvciBldmVyeSBjbGljay90b3VjaCB3b3VsZG4ndCBkZWxpdmVyIG9wdGltYWwgc3BlZWQsIGFuZCB3ZSBhbHNvIGRvbid0IHdhbnQgdGhlIHRpY2tlciB0byBrZWVwIGNhbGxpbmcgdGhlIHJlbmRlciBtZXRob2Qgd2hlbiB0aGluZ3MgYXJlIGlkbGUgZm9yIGxvbmcgcGVyaW9kcyBvZiB0aW1lICh3ZSB3YW50IHRvIGltcHJvdmUgYmF0dGVyeSBsaWZlIG9uIG1vYmlsZSBkZXZpY2VzKS5cbn0sXG4gICAgX3NldERlZmF1bHRzID0gZnVuY3Rpb24gX3NldERlZmF1bHRzKG9iaiwgZGVmYXVsdHMpIHtcbiAgZm9yICh2YXIgcCBpbiBkZWZhdWx0cykge1xuICAgIGlmICghKHAgaW4gb2JqKSkge1xuICAgICAgb2JqW3BdID0gZGVmYXVsdHNbcF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0sXG4gICAgX2FkZExpc3RlbmVyID0gZnVuY3Rpb24gX2FkZExpc3RlbmVyKGVsZW1lbnQsIHR5cGUsIGZ1bmMsIGNhcHR1cmUpIHtcbiAgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIHZhciB0b3VjaFR5cGUgPSBfdG91Y2hFdmVudExvb2t1cFt0eXBlXTtcbiAgICBjYXB0dXJlID0gY2FwdHVyZSB8fCAoX3N1cHBvcnRzUGFzc2l2ZSA/IHtcbiAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgfSA6IG51bGwpO1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaFR5cGUgfHwgdHlwZSwgZnVuYywgY2FwdHVyZSk7XG4gICAgdG91Y2hUeXBlICYmIHR5cGUgIT09IHRvdWNoVHlwZSAmJiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZnVuYywgY2FwdHVyZSk7IC8vc29tZSBicm93c2VycyBhY3R1YWxseSBzdXBwb3J0IGJvdGgsIHNvIG11c3Qgd2UuIEJ1dCBwb2ludGVyIGV2ZW50cyBjb3ZlciBhbGwuXG4gIH1cbn0sXG4gICAgX3JlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gX3JlbW92ZUxpc3RlbmVyKGVsZW1lbnQsIHR5cGUsIGZ1bmMpIHtcbiAgaWYgKGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHZhciB0b3VjaFR5cGUgPSBfdG91Y2hFdmVudExvb2t1cFt0eXBlXTtcbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hUeXBlIHx8IHR5cGUsIGZ1bmMpO1xuICAgIHRvdWNoVHlwZSAmJiB0eXBlICE9PSB0b3VjaFR5cGUgJiYgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMpO1xuICB9XG59LFxuICAgIF9wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uIF9wcmV2ZW50RGVmYXVsdChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCAmJiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBldmVudC5wcmV2ZW50TWFuaXB1bGF0aW9uICYmIGV2ZW50LnByZXZlbnRNYW5pcHVsYXRpb24oKTsgLy9mb3Igc29tZSBNaWNyb3NvZnQgYnJvd3NlcnNcbn0sXG4gICAgX2hhc1RvdWNoSUQgPSBmdW5jdGlvbiBfaGFzVG91Y2hJRChsaXN0LCBJRCkge1xuICB2YXIgaSA9IGxpc3QubGVuZ3RoO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZiAobGlzdFtpXS5pZGVudGlmaWVyID09PSBJRCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59LFxuICAgIF9vbk11bHRpVG91Y2hEb2N1bWVudEVuZCA9IGZ1bmN0aW9uIF9vbk11bHRpVG91Y2hEb2N1bWVudEVuZChldmVudCkge1xuICBfaXNNdWx0aVRvdWNoaW5nID0gZXZlbnQudG91Y2hlcyAmJiBfZHJhZ0NvdW50IDwgZXZlbnQudG91Y2hlcy5sZW5ndGg7XG5cbiAgX3JlbW92ZUxpc3RlbmVyKGV2ZW50LnRhcmdldCwgXCJ0b3VjaGVuZFwiLCBfb25NdWx0aVRvdWNoRG9jdW1lbnRFbmQpO1xufSxcbiAgICBfb25NdWx0aVRvdWNoRG9jdW1lbnQgPSBmdW5jdGlvbiBfb25NdWx0aVRvdWNoRG9jdW1lbnQoZXZlbnQpIHtcbiAgX2lzTXVsdGlUb3VjaGluZyA9IGV2ZW50LnRvdWNoZXMgJiYgX2RyYWdDb3VudCA8IGV2ZW50LnRvdWNoZXMubGVuZ3RoO1xuXG4gIF9hZGRMaXN0ZW5lcihldmVudC50YXJnZXQsIFwidG91Y2hlbmRcIiwgX29uTXVsdGlUb3VjaERvY3VtZW50RW5kKTtcbn0sXG4gICAgX2dldERvY1Njcm9sbFRvcCA9IGZ1bmN0aW9uIF9nZXREb2NTY3JvbGxUb3AoZG9jKSB7XG4gIHJldHVybiBfd2luLnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3AgfHwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jLmJvZHkuc2Nyb2xsVG9wIHx8IDA7XG59LFxuICAgIF9nZXREb2NTY3JvbGxMZWZ0ID0gZnVuY3Rpb24gX2dldERvY1Njcm9sbExlZnQoZG9jKSB7XG4gIHJldHVybiBfd2luLnBhZ2VYT2Zmc2V0IHx8IGRvYy5zY3JvbGxMZWZ0IHx8IGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBkb2MuYm9keS5zY3JvbGxMZWZ0IHx8IDA7XG59LFxuICAgIF9hZGRTY3JvbGxMaXN0ZW5lciA9IGZ1bmN0aW9uIF9hZGRTY3JvbGxMaXN0ZW5lcihlLCBjYWxsYmFjaykge1xuICBfYWRkTGlzdGVuZXIoZSwgXCJzY3JvbGxcIiwgY2FsbGJhY2spO1xuXG4gIGlmICghX2lzUm9vdChlLnBhcmVudE5vZGUpKSB7XG4gICAgX2FkZFNjcm9sbExpc3RlbmVyKGUucGFyZW50Tm9kZSwgY2FsbGJhY2spO1xuICB9XG59LFxuICAgIF9yZW1vdmVTY3JvbGxMaXN0ZW5lciA9IGZ1bmN0aW9uIF9yZW1vdmVTY3JvbGxMaXN0ZW5lcihlLCBjYWxsYmFjaykge1xuICBfcmVtb3ZlTGlzdGVuZXIoZSwgXCJzY3JvbGxcIiwgY2FsbGJhY2spO1xuXG4gIGlmICghX2lzUm9vdChlLnBhcmVudE5vZGUpKSB7XG4gICAgX3JlbW92ZVNjcm9sbExpc3RlbmVyKGUucGFyZW50Tm9kZSwgY2FsbGJhY2spO1xuICB9XG59LFxuICAgIF9pc1Jvb3QgPSBmdW5jdGlvbiBfaXNSb290KGUpIHtcbiAgcmV0dXJuICEhKCFlIHx8IGUgPT09IF9kb2NFbGVtZW50IHx8IGUubm9kZVR5cGUgPT09IDkgfHwgZSA9PT0gX2RvYy5ib2R5IHx8IGUgPT09IF93aW4gfHwgIWUubm9kZVR5cGUgfHwgIWUucGFyZW50Tm9kZSk7XG59LFxuICAgIF9nZXRNYXhTY3JvbGwgPSBmdW5jdGlvbiBfZ2V0TWF4U2Nyb2xsKGVsZW1lbnQsIGF4aXMpIHtcbiAgdmFyIGRpbSA9IGF4aXMgPT09IFwieFwiID8gXCJXaWR0aFwiIDogXCJIZWlnaHRcIixcbiAgICAgIHNjcm9sbCA9IFwic2Nyb2xsXCIgKyBkaW0sXG4gICAgICBjbGllbnQgPSBcImNsaWVudFwiICsgZGltO1xuICByZXR1cm4gTWF0aC5tYXgoMCwgX2lzUm9vdChlbGVtZW50KSA/IE1hdGgubWF4KF9kb2NFbGVtZW50W3Njcm9sbF0sIF9ib2R5W3Njcm9sbF0pIC0gKF93aW5bXCJpbm5lclwiICsgZGltXSB8fCBfZG9jRWxlbWVudFtjbGllbnRdIHx8IF9ib2R5W2NsaWVudF0pIDogZWxlbWVudFtzY3JvbGxdIC0gZWxlbWVudFtjbGllbnRdKTtcbn0sXG4gICAgX3JlY29yZE1heFNjcm9sbHMgPSBmdW5jdGlvbiBfcmVjb3JkTWF4U2Nyb2xscyhlLCBza2lwQ3VycmVudCkge1xuICAvL3JlY29yZHMgX2dzTWF4U2Nyb2xsWCBhbmQgX2dzTWF4U2Nyb2xsWSBwcm9wZXJ0aWVzIGZvciB0aGUgZWxlbWVudCBhbmQgYWxsIGFuY2VzdG9ycyB1cCB0aGUgY2hhaW4gc28gdGhhdCB3ZSBjYW4gY2FwIGl0LCBvdGhlcndpc2UgZHJhZ2dpbmcgYmV5b25kIHRoZSBlZGdlcyB3aXRoIGF1dG9TY3JvbGwgb24gY2FuIGVuZGxlc3NseSBzY3JvbGwuXG4gIHZhciB4ID0gX2dldE1heFNjcm9sbChlLCBcInhcIiksXG4gICAgICB5ID0gX2dldE1heFNjcm9sbChlLCBcInlcIik7XG5cbiAgaWYgKF9pc1Jvb3QoZSkpIHtcbiAgICBlID0gX3dpbmRvd1Byb3h5O1xuICB9IGVsc2Uge1xuICAgIF9yZWNvcmRNYXhTY3JvbGxzKGUucGFyZW50Tm9kZSwgc2tpcEN1cnJlbnQpO1xuICB9XG5cbiAgZS5fZ3NNYXhTY3JvbGxYID0geDtcbiAgZS5fZ3NNYXhTY3JvbGxZID0geTtcblxuICBpZiAoIXNraXBDdXJyZW50KSB7XG4gICAgZS5fZ3NTY3JvbGxYID0gZS5zY3JvbGxMZWZ0IHx8IDA7XG4gICAgZS5fZ3NTY3JvbGxZID0gZS5zY3JvbGxUb3AgfHwgMDtcbiAgfVxufSxcbiAgICBfc2V0U3R5bGUgPSBmdW5jdGlvbiBfc2V0U3R5bGUoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHZhciBzdHlsZSA9IGVsZW1lbnQuc3R5bGU7XG5cbiAgaWYgKCFzdHlsZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChfaXNVbmRlZmluZWQoc3R5bGVbcHJvcGVydHldKSkge1xuICAgIHByb3BlcnR5ID0gX2NoZWNrUHJlZml4KHByb3BlcnR5LCBlbGVtZW50KSB8fCBwcm9wZXJ0eTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgc3R5bGUucmVtb3ZlUHJvcGVydHkgJiYgc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHkucmVwbGFjZSgvKFtBLVpdKS9nLCBcIi0kMVwiKS50b0xvd2VyQ2FzZSgpKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgfVxufSxcbiAgICBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGZ1bmN0aW9uIF9nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIF93aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCA/IGVsZW1lbnQgOiBlbGVtZW50Lmhvc3QgfHwgKGVsZW1lbnQucGFyZW50Tm9kZSB8fCB7fSkuaG9zdCB8fCBlbGVtZW50KTtcbn0sXG4gICAgLy90aGUgXCJob3N0XCIgc3R1ZmYgaGVscHMgdG8gYWNjb21tb2RhdGUgU2hhZG93RG9tIG9iamVjdHMuXG5fdGVtcFJlY3QgPSB7fSxcbiAgICAvL3JldXNlIHRvIHJlZHVjZSBnYXJiYWdlIGNvbGxlY3Rpb24gdGFza3Ncbl9wYXJzZVJlY3QgPSBmdW5jdGlvbiBfcGFyc2VSZWN0KGUpIHtcbiAgLy9hY2NlcHRzIGEgRE9NIGVsZW1lbnQsIGEgbW91c2UgZXZlbnQsIG9yIGEgcmVjdGFuZ2xlIG9iamVjdCBhbmQgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyByZWN0YW5nbGUgd2l0aCBsZWZ0LCByaWdodCwgd2lkdGgsIGhlaWdodCwgdG9wLCBhbmQgYm90dG9tIHByb3BlcnRpZXNcbiAgaWYgKGUgPT09IF93aW4pIHtcbiAgICBfdGVtcFJlY3QubGVmdCA9IF90ZW1wUmVjdC50b3AgPSAwO1xuICAgIF90ZW1wUmVjdC53aWR0aCA9IF90ZW1wUmVjdC5yaWdodCA9IF9kb2NFbGVtZW50LmNsaWVudFdpZHRoIHx8IGUuaW5uZXJXaWR0aCB8fCBfYm9keS5jbGllbnRXaWR0aCB8fCAwO1xuICAgIF90ZW1wUmVjdC5oZWlnaHQgPSBfdGVtcFJlY3QuYm90dG9tID0gKGUuaW5uZXJIZWlnaHQgfHwgMCkgLSAyMCA8IF9kb2NFbGVtZW50LmNsaWVudEhlaWdodCA/IF9kb2NFbGVtZW50LmNsaWVudEhlaWdodCA6IGUuaW5uZXJIZWlnaHQgfHwgX2JvZHkuY2xpZW50SGVpZ2h0IHx8IDA7XG4gICAgcmV0dXJuIF90ZW1wUmVjdDtcbiAgfVxuXG4gIHZhciBkb2MgPSBlLm93bmVyRG9jdW1lbnQgfHwgX2RvYyxcbiAgICAgIHIgPSAhX2lzVW5kZWZpbmVkKGUucGFnZVgpID8ge1xuICAgIGxlZnQ6IGUucGFnZVggLSBfZ2V0RG9jU2Nyb2xsTGVmdChkb2MpLFxuICAgIHRvcDogZS5wYWdlWSAtIF9nZXREb2NTY3JvbGxUb3AoZG9jKSxcbiAgICByaWdodDogZS5wYWdlWCAtIF9nZXREb2NTY3JvbGxMZWZ0KGRvYykgKyAxLFxuICAgIGJvdHRvbTogZS5wYWdlWSAtIF9nZXREb2NTY3JvbGxUb3AoZG9jKSArIDFcbiAgfSA6ICFlLm5vZGVUeXBlICYmICFfaXNVbmRlZmluZWQoZS5sZWZ0KSAmJiAhX2lzVW5kZWZpbmVkKGUudG9wKSA/IGUgOiBfdG9BcnJheShlKVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBpZiAoX2lzVW5kZWZpbmVkKHIucmlnaHQpICYmICFfaXNVbmRlZmluZWQoci53aWR0aCkpIHtcbiAgICByLnJpZ2h0ID0gci5sZWZ0ICsgci53aWR0aDtcbiAgICByLmJvdHRvbSA9IHIudG9wICsgci5oZWlnaHQ7XG4gIH0gZWxzZSBpZiAoX2lzVW5kZWZpbmVkKHIud2lkdGgpKSB7XG4gICAgLy9zb21lIGJyb3dzZXJzIGRvbid0IGluY2x1ZGUgd2lkdGggYW5kIGhlaWdodCBwcm9wZXJ0aWVzLiBXZSBjYW4ndCBqdXN0IHNldCB0aGVtIGRpcmVjdGx5IG9uIHIgYmVjYXVzZSBzb21lIGJyb3dzZXJzIHRocm93IGVycm9ycywgc28gY3JlYXRlIGEgbmV3IGdlbmVyaWMgb2JqZWN0LlxuICAgIHIgPSB7XG4gICAgICB3aWR0aDogci5yaWdodCAtIHIubGVmdCxcbiAgICAgIGhlaWdodDogci5ib3R0b20gLSByLnRvcCxcbiAgICAgIHJpZ2h0OiByLnJpZ2h0LFxuICAgICAgbGVmdDogci5sZWZ0LFxuICAgICAgYm90dG9tOiByLmJvdHRvbSxcbiAgICAgIHRvcDogci50b3BcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHI7XG59LFxuICAgIF9kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gX2Rpc3BhdGNoRXZlbnQodGFyZ2V0LCB0eXBlLCBjYWxsYmFja05hbWUpIHtcbiAgdmFyIHZhcnMgPSB0YXJnZXQudmFycyxcbiAgICAgIGNhbGxiYWNrID0gdmFyc1tjYWxsYmFja05hbWVdLFxuICAgICAgbGlzdGVuZXJzID0gdGFyZ2V0Ll9saXN0ZW5lcnNbdHlwZV0sXG4gICAgICByZXN1bHQ7XG5cbiAgaWYgKF9pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgIHJlc3VsdCA9IGNhbGxiYWNrLmFwcGx5KHZhcnMuY2FsbGJhY2tTY29wZSB8fCB0YXJnZXQsIHZhcnNbY2FsbGJhY2tOYW1lICsgXCJQYXJhbXNcIl0gfHwgW3RhcmdldC5wb2ludGVyRXZlbnRdKTtcbiAgfVxuXG4gIGlmIChsaXN0ZW5lcnMgJiYgdGFyZ2V0LmRpc3BhdGNoRXZlbnQodHlwZSkgPT09IGZhbHNlKSB7XG4gICAgcmVzdWx0ID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufSxcbiAgICBfZ2V0Qm91bmRzID0gZnVuY3Rpb24gX2dldEJvdW5kcyh0YXJnZXQsIGNvbnRleHQpIHtcbiAgLy9hY2NlcHRzIGFueSBvZiB0aGUgZm9sbG93aW5nOiBhIERPTSBlbGVtZW50LCBqUXVlcnkgb2JqZWN0LCBzZWxlY3RvciB0ZXh0LCBvciBhbiBvYmplY3QgZGVmaW5pbmcgYm91bmRzIGFzIHt0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHR9IG9yIHttaW5YLCBtYXhYLCBtaW5ZLCBtYXhZfS4gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBsZWZ0LCB0b3AsIHdpZHRoLCBhbmQgaGVpZ2h0IHByb3BlcnRpZXMuXG4gIHZhciBlID0gX3RvQXJyYXkodGFyZ2V0KVswXSxcbiAgICAgIHRvcCxcbiAgICAgIGxlZnQsXG4gICAgICBvZmZzZXQ7XG5cbiAgaWYgKCFlLm5vZGVUeXBlICYmIGUgIT09IF93aW4pIHtcbiAgICBpZiAoIV9pc1VuZGVmaW5lZCh0YXJnZXQubGVmdCkpIHtcbiAgICAgIG9mZnNldCA9IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTsgLy9fZ2V0T2Zmc2V0VHJhbnNmb3JtT3JpZ2luKGNvbnRleHQpOyAvL3RoZSBib3VuZHMgc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW5cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogdGFyZ2V0LmxlZnQgLSBvZmZzZXQueCxcbiAgICAgICAgdG9wOiB0YXJnZXQudG9wIC0gb2Zmc2V0LnksXG4gICAgICAgIHdpZHRoOiB0YXJnZXQud2lkdGgsXG4gICAgICAgIGhlaWdodDogdGFyZ2V0LmhlaWdodFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBsZWZ0ID0gdGFyZ2V0Lm1pbiB8fCB0YXJnZXQubWluWCB8fCB0YXJnZXQubWluUm90YXRpb24gfHwgMDtcbiAgICB0b3AgPSB0YXJnZXQubWluIHx8IHRhcmdldC5taW5ZIHx8IDA7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICB0b3A6IHRvcCxcbiAgICAgIHdpZHRoOiAodGFyZ2V0Lm1heCB8fCB0YXJnZXQubWF4WCB8fCB0YXJnZXQubWF4Um90YXRpb24gfHwgMCkgLSBsZWZ0LFxuICAgICAgaGVpZ2h0OiAodGFyZ2V0Lm1heCB8fCB0YXJnZXQubWF4WSB8fCAwKSAtIHRvcFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gX2dldEVsZW1lbnRCb3VuZHMoZSwgY29udGV4dCk7XG59LFxuICAgIF9wb2ludDEgPSB7fSxcbiAgICAvL3dlIHJldXNlIHRvIG1pbmltaXplIGdhcmJhZ2UgY29sbGVjdGlvbiB0YXNrcy5cbl9nZXRFbGVtZW50Qm91bmRzID0gZnVuY3Rpb24gX2dldEVsZW1lbnRCb3VuZHMoZWxlbWVudCwgY29udGV4dCkge1xuICBjb250ZXh0ID0gX3RvQXJyYXkoY29udGV4dClbMF07XG4gIHZhciBpc1NWRyA9IGVsZW1lbnQuZ2V0QkJveCAmJiBlbGVtZW50Lm93bmVyU1ZHRWxlbWVudCxcbiAgICAgIGRvYyA9IGVsZW1lbnQub3duZXJEb2N1bWVudCB8fCBfZG9jLFxuICAgICAgbGVmdCxcbiAgICAgIHJpZ2h0LFxuICAgICAgdG9wLFxuICAgICAgYm90dG9tLFxuICAgICAgbWF0cml4LFxuICAgICAgcDEsXG4gICAgICBwMixcbiAgICAgIHAzLFxuICAgICAgcDQsXG4gICAgICBiYm94LFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBjcyxcbiAgICAgIGNvbnRleHRQYXJlbnQ7XG5cbiAgaWYgKGVsZW1lbnQgPT09IF93aW4pIHtcbiAgICB0b3AgPSBfZ2V0RG9jU2Nyb2xsVG9wKGRvYyk7XG4gICAgbGVmdCA9IF9nZXREb2NTY3JvbGxMZWZ0KGRvYyk7XG4gICAgcmlnaHQgPSBsZWZ0ICsgKGRvYy5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZWxlbWVudC5pbm5lcldpZHRoIHx8IGRvYy5ib2R5LmNsaWVudFdpZHRoIHx8IDApO1xuICAgIGJvdHRvbSA9IHRvcCArICgoZWxlbWVudC5pbm5lckhlaWdodCB8fCAwKSAtIDIwIDwgZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgPyBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA6IGVsZW1lbnQuaW5uZXJIZWlnaHQgfHwgZG9jLmJvZHkuY2xpZW50SGVpZ2h0IHx8IDApOyAvL3NvbWUgYnJvd3NlcnMgKGxpa2UgRmlyZWZveCkgaWdub3JlIGFic29sdXRlbHkgcG9zaXRpb25lZCBlbGVtZW50cywgYW5kIGNvbGxhcHNlIHRoZSBoZWlnaHQgb2YgdGhlIGRvY3VtZW50RWxlbWVudCwgc28gaXQgY291bGQgYmUgOHB4LCBmb3IgZXhhbXBsZSwgaWYgeW91IGhhdmUganVzdCBhbiBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgZGl2LiBJbiB0aGF0IGNhc2UsIHdlIHVzZSB0aGUgaW5uZXJIZWlnaHQgdG8gcmVzb2x2ZSB0aGlzLlxuICB9IGVsc2UgaWYgKGNvbnRleHQgPT09IF93aW4gfHwgX2lzVW5kZWZpbmVkKGNvbnRleHQpKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH0gZWxzZSB7XG4gICAgbGVmdCA9IHRvcCA9IDA7XG5cbiAgICBpZiAoaXNTVkcpIHtcbiAgICAgIGJib3ggPSBlbGVtZW50LmdldEJCb3goKTtcbiAgICAgIHdpZHRoID0gYmJveC53aWR0aDtcbiAgICAgIGhlaWdodCA9IGJib3guaGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZWxlbWVudC52aWV3Qm94ICYmIChiYm94ID0gZWxlbWVudC52aWV3Qm94LmJhc2VWYWwpKSB7XG4gICAgICAgIGxlZnQgPSBiYm94LnggfHwgMDtcbiAgICAgICAgdG9wID0gYmJveC55IHx8IDA7XG4gICAgICAgIHdpZHRoID0gYmJveC53aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gYmJveC5oZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghd2lkdGgpIHtcbiAgICAgICAgY3MgPSBfZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICAgICAgYmJveCA9IGNzLmJveFNpemluZyA9PT0gXCJib3JkZXItYm94XCI7XG4gICAgICAgIHdpZHRoID0gKHBhcnNlRmxvYXQoY3Mud2lkdGgpIHx8IGVsZW1lbnQuY2xpZW50V2lkdGggfHwgMCkgKyAoYmJveCA/IDAgOiBwYXJzZUZsb2F0KGNzLmJvcmRlckxlZnRXaWR0aCkgKyBwYXJzZUZsb2F0KGNzLmJvcmRlclJpZ2h0V2lkdGgpKTtcbiAgICAgICAgaGVpZ2h0ID0gKHBhcnNlRmxvYXQoY3MuaGVpZ2h0KSB8fCBlbGVtZW50LmNsaWVudEhlaWdodCB8fCAwKSArIChiYm94ID8gMCA6IHBhcnNlRmxvYXQoY3MuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChjcy5ib3JkZXJCb3R0b21XaWR0aCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJpZ2h0ID0gd2lkdGg7XG4gICAgYm90dG9tID0gaGVpZ2h0O1xuICB9XG5cbiAgaWYgKGVsZW1lbnQgPT09IGNvbnRleHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogbGVmdCxcbiAgICAgIHRvcDogdG9wLFxuICAgICAgd2lkdGg6IHJpZ2h0IC0gbGVmdCxcbiAgICAgIGhlaWdodDogYm90dG9tIC0gdG9wXG4gICAgfTtcbiAgfVxuXG4gIG1hdHJpeCA9IGdldEdsb2JhbE1hdHJpeChjb250ZXh0LCB0cnVlKS5tdWx0aXBseShnZXRHbG9iYWxNYXRyaXgoZWxlbWVudCkpO1xuICBwMSA9IG1hdHJpeC5hcHBseSh7XG4gICAgeDogbGVmdCxcbiAgICB5OiB0b3BcbiAgfSk7XG4gIHAyID0gbWF0cml4LmFwcGx5KHtcbiAgICB4OiByaWdodCxcbiAgICB5OiB0b3BcbiAgfSk7XG4gIHAzID0gbWF0cml4LmFwcGx5KHtcbiAgICB4OiByaWdodCxcbiAgICB5OiBib3R0b21cbiAgfSk7XG4gIHA0ID0gbWF0cml4LmFwcGx5KHtcbiAgICB4OiBsZWZ0LFxuICAgIHk6IGJvdHRvbVxuICB9KTtcbiAgbGVmdCA9IE1hdGgubWluKHAxLngsIHAyLngsIHAzLngsIHA0LngpO1xuICB0b3AgPSBNYXRoLm1pbihwMS55LCBwMi55LCBwMy55LCBwNC55KTtcbiAgY29udGV4dFBhcmVudCA9IGNvbnRleHQucGFyZW50Tm9kZSB8fCB7fTtcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBsZWZ0ICsgKGNvbnRleHRQYXJlbnQuc2Nyb2xsTGVmdCB8fCAwKSxcbiAgICB0b3A6IHRvcCArIChjb250ZXh0UGFyZW50LnNjcm9sbFRvcCB8fCAwKSxcbiAgICB3aWR0aDogTWF0aC5tYXgocDEueCwgcDIueCwgcDMueCwgcDQueCkgLSBsZWZ0LFxuICAgIGhlaWdodDogTWF0aC5tYXgocDEueSwgcDIueSwgcDMueSwgcDQueSkgLSB0b3BcbiAgfTtcbn0sXG4gICAgX3BhcnNlSW5lcnRpYSA9IGZ1bmN0aW9uIF9wYXJzZUluZXJ0aWEoZHJhZ2dhYmxlLCBzbmFwLCBtYXgsIG1pbiwgZmFjdG9yLCBmb3JjZVplcm9WZWxvY2l0eSkge1xuICB2YXIgdmFycyA9IHt9LFxuICAgICAgYSxcbiAgICAgIGksXG4gICAgICBsO1xuXG4gIGlmIChzbmFwKSB7XG4gICAgaWYgKGZhY3RvciAhPT0gMSAmJiBzbmFwIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIC8vc29tZSBkYXRhIG11c3QgYmUgYWx0ZXJlZCB0byBtYWtlIHNlbnNlLCBsaWtlIGlmIHRoZSB1c2VyIHBhc3NlcyBpbiBhbiBhcnJheSBvZiByb3RhdGlvbmFsIHZhbHVlcyBpbiBkZWdyZWVzLCB3ZSBtdXN0IGNvbnZlcnQgaXQgdG8gcmFkaWFucy4gT3IgZm9yIHNjcm9sbExlZnQgYW5kIHNjcm9sbFRvcCwgd2UgaW52ZXJ0IHRoZSB2YWx1ZXMuXG4gICAgICB2YXJzLmVuZCA9IGEgPSBbXTtcbiAgICAgIGwgPSBzbmFwLmxlbmd0aDtcblxuICAgICAgaWYgKF9pc09iamVjdChzbmFwWzBdKSkge1xuICAgICAgICAvL2lmIHRoZSBhcnJheSBpcyBwb3B1bGF0ZWQgd2l0aCBvYmplY3RzLCBsaWtlIHBvaW50cyAoe3g6MTAwLCB5OjIwMH0pLCBtYWtlIGNvcGllcyBiZWZvcmUgbXVsdGlwbHlpbmcgYnkgdGhlIGZhY3Rvciwgb3RoZXJ3aXNlIHdlJ2xsIG1lc3MgdXAgdGhlIG9yaWdpbmFscyBhbmQgdGhlIHVzZXIgbWF5IHJldXNlIGl0IGVsc2V3aGVyZS5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGFbaV0gPSBfY29weShzbmFwW2ldLCBmYWN0b3IpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgYVtpXSA9IHNuYXBbaV0gKiBmYWN0b3I7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWF4ICs9IDEuMTsgLy9hbGxvdyAxLjEgcGl4ZWxzIG9mIHdpZ2dsZSByb29tIHdoZW4gc25hcHBpbmcgaW4gb3JkZXIgdG8gd29yayBhcm91bmQgc29tZSBicm93c2VyIGluY29uc2lzdGVuY2llcyBpbiB0aGUgd2F5IGJvdW5kcyBhcmUgcmVwb3J0ZWQgd2hpY2ggY2FuIG1ha2UgdGhlbSByb3VnaGx5IGEgcGl4ZWwgb2ZmLiBGb3IgZXhhbXBsZSwgaWYgXCJzbmFwOlstJCgnI21lbnUnKS53aWR0aCgpLCAwXVwiIHdhcyBkZWZpbmVkIGFuZCAjbWVudSBoYWQgYSB3cmFwcGVyIHRoYXQgd2FzIHVzZWQgYXMgdGhlIGJvdW5kcywgc29tZSBicm93c2VycyB3b3VsZCBiZSBvbmUgcGl4ZWwgb2ZmLCBtYWtpbmcgdGhlIG1pbmltdW0gLTc1MiBmb3IgZXhhbXBsZSB3aGVuIHNuYXAgd2FzIFstNzUzLDBdLCB0aHVzIGluc3RlYWQgb2Ygc25hcHBpbmcgdG8gLTc1MywgaXQgd291bGQgc25hcCB0byAwIHNpbmNlIC03NTMgd2FzIGJlbG93IHRoZSBtaW5pbXVtLlxuXG4gICAgICBtaW4gLT0gMS4xO1xuICAgIH0gZWxzZSBpZiAoX2lzRnVuY3Rpb24oc25hcCkpIHtcbiAgICAgIHZhcnMuZW5kID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBzbmFwLmNhbGwoZHJhZ2dhYmxlLCB2YWx1ZSksXG4gICAgICAgICAgICBjb3B5LFxuICAgICAgICAgICAgcDtcblxuICAgICAgICBpZiAoZmFjdG9yICE9PSAxKSB7XG4gICAgICAgICAgaWYgKF9pc09iamVjdChyZXN1bHQpKSB7XG4gICAgICAgICAgICBjb3B5ID0ge307XG5cbiAgICAgICAgICAgIGZvciAocCBpbiByZXN1bHQpIHtcbiAgICAgICAgICAgICAgY29weVtwXSA9IHJlc3VsdFtwXSAqIGZhY3RvcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzdWx0ID0gY29weTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ICo9IGZhY3RvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0OyAvL3dlIG5lZWQgdG8gZW5zdXJlIHRoYXQgd2UgY2FuIHNjb3BlIHRoZSBmdW5jdGlvbiBjYWxsIHRvIHRoZSBEcmFnZ2FibGUgaW5zdGFuY2UgaXRzZWxmIHNvIHRoYXQgdXNlcnMgY2FuIGFjY2VzcyBpbXBvcnRhbnQgdmFsdWVzIGxpa2UgbWF4WCwgbWluWCwgbWF4WSwgbWluWSwgeCwgYW5kIHkgZnJvbSB3aXRoaW4gdGhhdCBmdW5jdGlvbi5cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhcnMuZW5kID0gc25hcDtcbiAgICB9XG4gIH1cblxuICBpZiAobWF4IHx8IG1heCA9PT0gMCkge1xuICAgIHZhcnMubWF4ID0gbWF4O1xuICB9XG5cbiAgaWYgKG1pbiB8fCBtaW4gPT09IDApIHtcbiAgICB2YXJzLm1pbiA9IG1pbjtcbiAgfVxuXG4gIGlmIChmb3JjZVplcm9WZWxvY2l0eSkge1xuICAgIHZhcnMudmVsb2NpdHkgPSAwO1xuICB9XG5cbiAgcmV0dXJuIHZhcnM7XG59LFxuICAgIF9pc0NsaWNrYWJsZSA9IGZ1bmN0aW9uIF9pc0NsaWNrYWJsZShlbGVtZW50KSB7XG4gIC8vc29tZXRpbWVzIGl0J3MgY29udmVuaWVudCB0byBtYXJrIGFuIGVsZW1lbnQgYXMgY2xpY2thYmxlIGJ5IGFkZGluZyBhIGRhdGEtY2xpY2thYmxlPVwidHJ1ZVwiIGF0dHJpYnV0ZSAoaW4gd2hpY2ggY2FzZSB3ZSB3b24ndCBwcmV2ZW50RGVmYXVsdCgpIHRoZSBtb3VzZS90b3VjaCBldmVudCkuIFRoaXMgbWV0aG9kIGNoZWNrcyBpZiB0aGUgZWxlbWVudCBpcyBhbiA8YT4sIDxpbnB1dD4sIG9yIDxidXR0b24+IG9yIGhhcyBhbiBvbmNsaWNrIG9yIGhhcyB0aGUgZGF0YS1jbGlja2FibGUgb3IgY29udGVudEVkaXRhYmxlIGF0dHJpYnV0ZSBzZXQgdG8gdHJ1ZSAob3IgYW55IG9mIGl0cyBwYXJlbnQgZWxlbWVudHMpLlxuICB2YXIgZGF0YTtcbiAgcmV0dXJuICFlbGVtZW50IHx8ICFlbGVtZW50LmdldEF0dHJpYnV0ZSB8fCBlbGVtZW50ID09PSBfYm9keSA/IGZhbHNlIDogKGRhdGEgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY2xpY2thYmxlXCIpKSA9PT0gXCJ0cnVlXCIgfHwgZGF0YSAhPT0gXCJmYWxzZVwiICYmIChlbGVtZW50Lm9uY2xpY2sgfHwgX2NsaWNrYWJsZVRhZ0V4cC50ZXN0KGVsZW1lbnQubm9kZU5hbWUgKyBcIlwiKSB8fCBlbGVtZW50LmdldEF0dHJpYnV0ZShcImNvbnRlbnRFZGl0YWJsZVwiKSA9PT0gXCJ0cnVlXCIpID8gdHJ1ZSA6IF9pc0NsaWNrYWJsZShlbGVtZW50LnBhcmVudE5vZGUpO1xufSxcbiAgICBfc2V0U2VsZWN0YWJsZSA9IGZ1bmN0aW9uIF9zZXRTZWxlY3RhYmxlKGVsZW1lbnRzLCBzZWxlY3RhYmxlKSB7XG4gIHZhciBpID0gZWxlbWVudHMubGVuZ3RoLFxuICAgICAgZTtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgZSA9IGVsZW1lbnRzW2ldO1xuICAgIGUub25kcmFnc3RhcnQgPSBlLm9uc2VsZWN0c3RhcnQgPSBzZWxlY3RhYmxlID8gbnVsbCA6IF9lbXB0eUZ1bmM7IC8vc2V0U3R5bGUoZSwgXCJ1c2VyU2VsZWN0XCIsIChzZWxlY3RhYmxlID8gXCJ0ZXh0XCIgOiBcIm5vbmVcIikpO1xuXG4gICAgZ3NhcC5zZXQoZSwge1xuICAgICAgbGF6eTogdHJ1ZSxcbiAgICAgIHVzZXJTZWxlY3Q6IHNlbGVjdGFibGUgPyBcInRleHRcIiA6IFwibm9uZVwiXG4gICAgfSk7XG4gIH1cbn0sXG4gICAgX2lzRml4ZWQgPSBmdW5jdGlvbiBfaXNGaXhlZChlbGVtZW50KSB7XG4gIGlmIChfZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5wb3NpdGlvbiA9PT0gXCJmaXhlZFwiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEpIHtcbiAgICAvLyBhdm9pZCBkb2N1bWVudCBmcmFnbWVudHMgd2hpY2ggd2lsbCB0aHJvdyBhbiBlcnJvci5cbiAgICByZXR1cm4gX2lzRml4ZWQoZWxlbWVudCk7XG4gIH1cbn0sXG4gICAgX3N1cHBvcnRzM0QsXG4gICAgX2FkZFBhZGRpbmdCUixcbiAgICAvL1RoZSBTY3JvbGxQcm94eSBjbGFzcyB3cmFwcyBhbiBlbGVtZW50J3MgY29udGVudHMgaW50byBhbm90aGVyIGRpdiAod2UgY2FsbCBpdCBcImNvbnRlbnRcIikgdGhhdCB3ZSBlaXRoZXIgYWRkIHBhZGRpbmcgd2hlbiBuZWNlc3Nhcnkgb3IgYXBwbHkgYSB0cmFuc2xhdGUzZCgpIHRyYW5zZm9ybSBpbiBvcmRlciB0byBvdmVyc2Nyb2xsIChzY3JvbGwgcGFzdCB0aGUgYm91bmRhcmllcykuIFRoaXMgYWxsb3dzIHVzIHRvIHNpbXBseSBzZXQgdGhlIHNjcm9sbFRvcC9zY3JvbGxMZWZ0IChvciB0b3AvbGVmdCBmb3IgZWFzaWVyIHJldmVyc2UtYXhpcyBvcmllbnRhdGlvbiwgd2hpY2ggaXMgd2hhdCB3ZSBkbyBpbiBEcmFnZ2FibGUpIGFuZCBpdCdsbCBkbyBhbGwgdGhlIHdvcmsgZm9yIHVzLiBGb3IgZXhhbXBsZSwgaWYgd2UgdHJpZWQgc2V0dGluZyBzY3JvbGxUb3AgdG8gLTEwMCBvbiBhIG5vcm1hbCBET00gZWxlbWVudCwgaXQgd291bGRuJ3Qgd29yayAtIGl0J2QgbG9vayB0aGUgc2FtZSBhcyBzZXR0aW5nIGl0IHRvIDAsIGJ1dCBpZiB3ZSBzZXQgc2Nyb2xsVG9wIG9mIGEgU2Nyb2xsUHJveHkgdG8gLTEwMCwgaXQnbGwgZ2l2ZSB0aGUgY29ycmVjdCBhcHBlYXJhbmNlIGJ5IGVpdGhlciBzZXR0aW5nIHBhZGRpbmdUb3Agb2YgdGhlIHdyYXBwZXIgdG8gMTAwIG9yIGFwcGx5aW5nIGEgMTAwLXBpeGVsIHRyYW5zbGF0ZVkuXG5TY3JvbGxQcm94eSA9IGZ1bmN0aW9uIFNjcm9sbFByb3h5KGVsZW1lbnQsIHZhcnMpIHtcbiAgZWxlbWVudCA9IGdzYXAudXRpbHMudG9BcnJheShlbGVtZW50KVswXTtcbiAgdmFycyA9IHZhcnMgfHwge307XG4gIHZhciBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICAgIHN0eWxlID0gY29udGVudC5zdHlsZSxcbiAgICAgIG5vZGUgPSBlbGVtZW50LmZpcnN0Q2hpbGQsXG4gICAgICBvZmZzZXRUb3AgPSAwLFxuICAgICAgb2Zmc2V0TGVmdCA9IDAsXG4gICAgICBwcmV2VG9wID0gZWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICBwcmV2TGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgIHNjcm9sbFdpZHRoID0gZWxlbWVudC5zY3JvbGxXaWR0aCxcbiAgICAgIHNjcm9sbEhlaWdodCA9IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgZXh0cmFQYWRSaWdodCA9IDAsXG4gICAgICBtYXhMZWZ0ID0gMCxcbiAgICAgIG1heFRvcCA9IDAsXG4gICAgICBlbGVtZW50V2lkdGgsXG4gICAgICBlbGVtZW50SGVpZ2h0LFxuICAgICAgY29udGVudEhlaWdodCxcbiAgICAgIG5leHROb2RlLFxuICAgICAgdHJhbnNmb3JtU3RhcnQsXG4gICAgICB0cmFuc2Zvcm1FbmQ7XG5cbiAgaWYgKF9zdXBwb3J0czNEICYmIHZhcnMuZm9yY2UzRCAhPT0gZmFsc2UpIHtcbiAgICB0cmFuc2Zvcm1TdGFydCA9IFwidHJhbnNsYXRlM2QoXCI7XG4gICAgdHJhbnNmb3JtRW5kID0gXCJweCwwcHgpXCI7XG4gIH0gZWxzZSBpZiAoX3RyYW5zZm9ybVByb3ApIHtcbiAgICB0cmFuc2Zvcm1TdGFydCA9IFwidHJhbnNsYXRlKFwiO1xuICAgIHRyYW5zZm9ybUVuZCA9IFwicHgpXCI7XG4gIH1cblxuICB0aGlzLnNjcm9sbFRvcCA9IGZ1bmN0aW9uICh2YWx1ZSwgZm9yY2UpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAtdGhpcy50b3AoKTtcbiAgICB9XG5cbiAgICB0aGlzLnRvcCgtdmFsdWUsIGZvcmNlKTtcbiAgfTtcblxuICB0aGlzLnNjcm9sbExlZnQgPSBmdW5jdGlvbiAodmFsdWUsIGZvcmNlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gLXRoaXMubGVmdCgpO1xuICAgIH1cblxuICAgIHRoaXMubGVmdCgtdmFsdWUsIGZvcmNlKTtcbiAgfTtcblxuICB0aGlzLmxlZnQgPSBmdW5jdGlvbiAodmFsdWUsIGZvcmNlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gLShlbGVtZW50LnNjcm9sbExlZnQgKyBvZmZzZXRMZWZ0KTtcbiAgICB9XG5cbiAgICB2YXIgZGlmID0gZWxlbWVudC5zY3JvbGxMZWZ0IC0gcHJldkxlZnQsXG4gICAgICAgIG9sZE9mZnNldCA9IG9mZnNldExlZnQ7XG5cbiAgICBpZiAoKGRpZiA+IDIgfHwgZGlmIDwgLTIpICYmICFmb3JjZSkge1xuICAgICAgLy9pZiB0aGUgdXNlciBpbnRlcmFjdHMgd2l0aCB0aGUgc2Nyb2xsYmFyIChvciBzb21ldGhpbmcgZWxzZSBzY3JvbGxzIGl0LCBsaWtlIHRoZSBtb3VzZSB3aGVlbCksIHdlIHNob3VsZCBraWxsIGFueSB0d2VlbnMgb2YgdGhlIFNjcm9sbFByb3h5LlxuICAgICAgcHJldkxlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICBnc2FwLmtpbGxUd2VlbnNPZih0aGlzLCB7XG4gICAgICAgIGxlZnQ6IDEsXG4gICAgICAgIHNjcm9sbExlZnQ6IDFcbiAgICAgIH0pO1xuICAgICAgdGhpcy5sZWZ0KC1wcmV2TGVmdCk7XG5cbiAgICAgIGlmICh2YXJzLm9uS2lsbCkge1xuICAgICAgICB2YXJzLm9uS2lsbCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFsdWUgPSAtdmFsdWU7IC8vaW52ZXJ0IGJlY2F1c2Ugc2Nyb2xsaW5nIHdvcmtzIGluIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb25cblxuICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgIG9mZnNldExlZnQgPSB2YWx1ZSAtIDAuNSB8IDA7XG4gICAgICB2YWx1ZSA9IDA7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA+IG1heExlZnQpIHtcbiAgICAgIG9mZnNldExlZnQgPSB2YWx1ZSAtIG1heExlZnQgfCAwO1xuICAgICAgdmFsdWUgPSBtYXhMZWZ0O1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXRMZWZ0ID0gMDtcbiAgICB9XG5cbiAgICBpZiAob2Zmc2V0TGVmdCB8fCBvbGRPZmZzZXQpIHtcbiAgICAgIGlmICghdGhpcy5fc2tpcCkge1xuICAgICAgICBzdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2Zvcm1TdGFydCArIC1vZmZzZXRMZWZ0ICsgXCJweCxcIiArIC1vZmZzZXRUb3AgKyB0cmFuc2Zvcm1FbmQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChvZmZzZXRMZWZ0ICsgZXh0cmFQYWRSaWdodCA+PSAwKSB7XG4gICAgICAgIHN0eWxlLnBhZGRpbmdSaWdodCA9IG9mZnNldExlZnQgKyBleHRyYVBhZFJpZ2h0ICsgXCJweFwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCA9IHZhbHVlIHwgMDtcbiAgICBwcmV2TGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDsgLy9kb24ndCBtZXJnZSB0aGlzIHdpdGggdGhlIGxpbmUgYWJvdmUgYmVjYXVzZSBzb21lIGJyb3dzZXJzIGFkanVzdCB0aGUgc2Nyb2xsTGVmdCBhZnRlciBpdCdzIHNldCwgc28gaW4gb3JkZXIgdG8gYmUgMTAwJSBhY2N1cmF0ZSBpbiB0cmFja2luZyBpdCwgd2UgbmVlZCB0byBhc2sgdGhlIGJyb3dzZXIgdG8gcmVwb3J0IGl0LlxuICB9O1xuXG4gIHRoaXMudG9wID0gZnVuY3Rpb24gKHZhbHVlLCBmb3JjZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIC0oZWxlbWVudC5zY3JvbGxUb3AgKyBvZmZzZXRUb3ApO1xuICAgIH1cblxuICAgIHZhciBkaWYgPSBlbGVtZW50LnNjcm9sbFRvcCAtIHByZXZUb3AsXG4gICAgICAgIG9sZE9mZnNldCA9IG9mZnNldFRvcDtcblxuICAgIGlmICgoZGlmID4gMiB8fCBkaWYgPCAtMikgJiYgIWZvcmNlKSB7XG4gICAgICAvL2lmIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIHRoZSBzY3JvbGxiYXIgKG9yIHNvbWV0aGluZyBlbHNlIHNjcm9sbHMgaXQsIGxpa2UgdGhlIG1vdXNlIHdoZWVsKSwgd2Ugc2hvdWxkIGtpbGwgYW55IHR3ZWVucyBvZiB0aGUgU2Nyb2xsUHJveHkuXG4gICAgICBwcmV2VG9wID0gZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICBnc2FwLmtpbGxUd2VlbnNPZih0aGlzLCB7XG4gICAgICAgIHRvcDogMSxcbiAgICAgICAgc2Nyb2xsVG9wOiAxXG4gICAgICB9KTtcbiAgICAgIHRoaXMudG9wKC1wcmV2VG9wKTtcblxuICAgICAgaWYgKHZhcnMub25LaWxsKSB7XG4gICAgICAgIHZhcnMub25LaWxsKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YWx1ZSA9IC12YWx1ZTsgLy9pbnZlcnQgYmVjYXVzZSBzY3JvbGxpbmcgd29ya3MgaW4gdGhlIG9wcG9zaXRlIGRpcmVjdGlvblxuXG4gICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgb2Zmc2V0VG9wID0gdmFsdWUgLSAwLjUgfCAwO1xuICAgICAgdmFsdWUgPSAwO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPiBtYXhUb3ApIHtcbiAgICAgIG9mZnNldFRvcCA9IHZhbHVlIC0gbWF4VG9wIHwgMDtcbiAgICAgIHZhbHVlID0gbWF4VG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXRUb3AgPSAwO1xuICAgIH1cblxuICAgIGlmIChvZmZzZXRUb3AgfHwgb2xkT2Zmc2V0KSB7XG4gICAgICBpZiAoIXRoaXMuX3NraXApIHtcbiAgICAgICAgc3R5bGVbX3RyYW5zZm9ybVByb3BdID0gdHJhbnNmb3JtU3RhcnQgKyAtb2Zmc2V0TGVmdCArIFwicHgsXCIgKyAtb2Zmc2V0VG9wICsgdHJhbnNmb3JtRW5kO1xuICAgICAgfVxuICAgIH1cblxuICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gdmFsdWUgfCAwO1xuICAgIHByZXZUb3AgPSBlbGVtZW50LnNjcm9sbFRvcDtcbiAgfTtcblxuICB0aGlzLm1heFNjcm9sbFRvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbWF4VG9wO1xuICB9O1xuXG4gIHRoaXMubWF4U2Nyb2xsTGVmdCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbWF4TGVmdDtcbiAgfTtcblxuICB0aGlzLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgbm9kZSA9IGNvbnRlbnQuZmlyc3RDaGlsZDtcblxuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBuZXh0Tm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgbm9kZSA9IG5leHROb2RlO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50ID09PSBjb250ZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIC8vaW4gY2FzZSBkaXNhYmxlKCkgaXMgY2FsbGVkIHdoZW4gaXQncyBhbHJlYWR5IGRpc2FibGVkLlxuICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChjb250ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgbm9kZSA9IGVsZW1lbnQuZmlyc3RDaGlsZDtcblxuICAgIGlmIChub2RlID09PSBjb250ZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgIG5leHROb2RlID0gbm9kZS5uZXh0U2libGluZztcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICBub2RlID0gbmV4dE5vZGU7XG4gICAgfVxuXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICB0aGlzLmNhbGlicmF0ZSgpO1xuICB9O1xuXG4gIHRoaXMuY2FsaWJyYXRlID0gZnVuY3Rpb24gKGZvcmNlKSB7XG4gICAgdmFyIHdpZHRoTWF0Y2hlcyA9IGVsZW1lbnQuY2xpZW50V2lkdGggPT09IGVsZW1lbnRXaWR0aCxcbiAgICAgICAgY3MsXG4gICAgICAgIHgsXG4gICAgICAgIHk7XG4gICAgcHJldlRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIHByZXZMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuXG4gICAgaWYgKHdpZHRoTWF0Y2hlcyAmJiBlbGVtZW50LmNsaWVudEhlaWdodCA9PT0gZWxlbWVudEhlaWdodCAmJiBjb250ZW50Lm9mZnNldEhlaWdodCA9PT0gY29udGVudEhlaWdodCAmJiBzY3JvbGxXaWR0aCA9PT0gZWxlbWVudC5zY3JvbGxXaWR0aCAmJiBzY3JvbGxIZWlnaHQgPT09IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0ICYmICFmb3JjZSkge1xuICAgICAgcmV0dXJuOyAvL25vIG5lZWQgdG8gcmVjYWxjdWxhdGUgdGhpbmdzIGlmIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IGhhdmVuJ3QgY2hhbmdlZC5cbiAgICB9XG5cbiAgICBpZiAob2Zmc2V0VG9wIHx8IG9mZnNldExlZnQpIHtcbiAgICAgIHggPSB0aGlzLmxlZnQoKTtcbiAgICAgIHkgPSB0aGlzLnRvcCgpO1xuICAgICAgdGhpcy5sZWZ0KC1lbGVtZW50LnNjcm9sbExlZnQpO1xuICAgICAgdGhpcy50b3AoLWVsZW1lbnQuc2Nyb2xsVG9wKTtcbiAgICB9XG5cbiAgICBjcyA9IF9nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpOyAvL2ZpcnN0LCB3ZSBuZWVkIHRvIHJlbW92ZSBhbnkgd2lkdGggY29uc3RyYWludHMgdG8gc2VlIGhvdyB0aGUgY29udGVudCBuYXR1cmFsbHkgZmxvd3Mgc28gdGhhdCB3ZSBjYW4gc2VlIGlmIGl0J3Mgd2lkZXIgdGhhbiB0aGUgY29udGFpbmluZyBlbGVtZW50LiBJZiBzbywgd2UndmUgZ290IHRvIHJlY29yZCB0aGUgYW1vdW50IG9mIG92ZXJhZ2Ugc28gdGhhdCB3ZSBjYW4gYXBwbHkgdGhhdCBhcyBwYWRkaW5nIGluIG9yZGVyIGZvciBicm93c2VycyB0byBjb3JyZWN0bHkgaGFuZGxlIHRoaW5ncy4gVGhlbiB3ZSBzd2l0Y2ggYmFjayB0byBhIHdpZHRoIG9mIDEwMCUgKHdpdGhvdXQgdGhhdCwgc29tZSBicm93c2VycyBkb24ndCBmbG93IHRoZSBjb250ZW50IGNvcnJlY3RseSlcblxuICAgIGlmICghd2lkdGhNYXRjaGVzIHx8IGZvcmNlKSB7XG4gICAgICBzdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgc3R5bGUud2lkdGggPSBcImF1dG9cIjtcbiAgICAgIHN0eWxlLnBhZGRpbmdSaWdodCA9IFwiMHB4XCI7XG4gICAgICBleHRyYVBhZFJpZ2h0ID0gTWF0aC5tYXgoMCwgZWxlbWVudC5zY3JvbGxXaWR0aCAtIGVsZW1lbnQuY2xpZW50V2lkdGgpOyAvL2lmIHRoZSBjb250ZW50IGlzIHdpZGVyIHRoYW4gdGhlIGNvbnRhaW5lciwgd2UgbmVlZCB0byBhZGQgdGhlIHBhZGRpbmdMZWZ0IGFuZCBwYWRkaW5nUmlnaHQgaW4gb3JkZXIgZm9yIHRoaW5ncyB0byBiZWhhdmUgY29ycmVjdGx5LlxuXG4gICAgICBpZiAoZXh0cmFQYWRSaWdodCkge1xuICAgICAgICBleHRyYVBhZFJpZ2h0ICs9IHBhcnNlRmxvYXQoY3MucGFkZGluZ0xlZnQpICsgKF9hZGRQYWRkaW5nQlIgPyBwYXJzZUZsb2F0KGNzLnBhZGRpbmdSaWdodCkgOiAwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICBzdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICBzdHlsZS5vdmVyZmxvdyA9IFwidmlzaWJsZVwiO1xuICAgIHN0eWxlLnZlcnRpY2FsQWxpZ24gPSBcInRvcFwiO1xuICAgIHN0eWxlLmJveFNpemluZyA9IFwiY29udGVudC1ib3hcIjtcbiAgICBzdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgIHN0eWxlLnBhZGRpbmdSaWdodCA9IGV4dHJhUGFkUmlnaHQgKyBcInB4XCI7IC8vc29tZSBicm93c2VycyBuZWdsZWN0IHRvIGZhY3RvciBpbiB0aGUgYm90dG9tIHBhZGRpbmcgd2hlbiBjYWxjdWxhdGluZyB0aGUgc2Nyb2xsSGVpZ2h0LCBzbyB3ZSBuZWVkIHRvIGFkZCB0aGF0IHBhZGRpbmcgdG8gdGhlIGNvbnRlbnQgd2hlbiB0aGF0IGhhcHBlbnMuIEFsbG93IGEgMnB4IG1hcmdpbiBmb3IgZXJyb3JcblxuICAgIGlmIChfYWRkUGFkZGluZ0JSKSB7XG4gICAgICBzdHlsZS5wYWRkaW5nQm90dG9tID0gY3MucGFkZGluZ0JvdHRvbTtcbiAgICB9XG5cbiAgICBlbGVtZW50V2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIGVsZW1lbnRIZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICBzY3JvbGxXaWR0aCA9IGVsZW1lbnQuc2Nyb2xsV2lkdGg7XG4gICAgc2Nyb2xsSGVpZ2h0ID0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgbWF4TGVmdCA9IGVsZW1lbnQuc2Nyb2xsV2lkdGggLSBlbGVtZW50V2lkdGg7XG4gICAgbWF4VG9wID0gZWxlbWVudC5zY3JvbGxIZWlnaHQgLSBlbGVtZW50SGVpZ2h0O1xuICAgIGNvbnRlbnRIZWlnaHQgPSBjb250ZW50Lm9mZnNldEhlaWdodDtcbiAgICBzdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgaWYgKHggfHwgeSkge1xuICAgICAgdGhpcy5sZWZ0KHgpO1xuICAgICAgdGhpcy50b3AoeSk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIHRoaXMuX3NraXAgPSBmYWxzZTtcbiAgdGhpcy5lbmFibGUoKTtcbn0sXG4gICAgX2luaXRDb3JlID0gZnVuY3Rpb24gX2luaXRDb3JlKHJlcXVpcmVkKSB7XG4gIGlmIChfd2luZG93RXhpc3RzKCkgJiYgZG9jdW1lbnQuYm9keSkge1xuICAgIHZhciBuYXYgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcbiAgICBfd2luID0gd2luZG93O1xuICAgIF9kb2MgPSBkb2N1bWVudDtcbiAgICBfZG9jRWxlbWVudCA9IF9kb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgIF9ib2R5ID0gX2RvYy5ib2R5O1xuICAgIF90ZW1wRGl2ID0gX2NyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgX3N1cHBvcnRzUG9pbnRlciA9ICEhd2luZG93LlBvaW50ZXJFdmVudDtcbiAgICBfcGxhY2Vob2xkZXJEaXYgPSBfY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBfcGxhY2Vob2xkZXJEaXYuc3R5bGUuY3NzVGV4dCA9IFwidmlzaWJpbGl0eTpoaWRkZW47aGVpZ2h0OjFweDt0b3A6LTFweDtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOnJlbGF0aXZlO2NsZWFyOmJvdGg7Y3Vyc29yOmdyYWJcIjtcbiAgICBfZGVmYXVsdEN1cnNvciA9IF9wbGFjZWhvbGRlckRpdi5zdHlsZS5jdXJzb3IgPT09IFwiZ3JhYlwiID8gXCJncmFiXCIgOiBcIm1vdmVcIjtcbiAgICBfaXNBbmRyb2lkID0gbmF2ICYmIG5hdi51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiYW5kcm9pZFwiKSAhPT0gLTE7IC8vQW5kcm9pZCBoYW5kbGVzIHRvdWNoIGV2ZW50cyBpbiBhbiBvZGQgd2F5IGFuZCBpdCdzIHZpcnR1YWxseSBpbXBvc3NpYmxlIHRvIFwiZmVhdHVyZSB0ZXN0XCIgc28gd2UgcmVzb3J0IHRvIFVBIHNuaWZmaW5nXG5cbiAgICBfaXNUb3VjaERldmljZSA9IFwib250b3VjaHN0YXJ0XCIgaW4gX2RvY0VsZW1lbnQgJiYgXCJvcmllbnRhdGlvblwiIGluIF93aW4gfHwgbmF2ICYmIChuYXYuTWF4VG91Y2hQb2ludHMgPiAwIHx8IG5hdi5tc01heFRvdWNoUG9pbnRzID4gMCk7XG5cbiAgICBfYWRkUGFkZGluZ0JSID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy90aGlzIGZ1bmN0aW9uIGlzIGluIGNoYXJnZSBvZiBhbmFseXppbmcgYnJvd3NlciBiZWhhdmlvciByZWxhdGVkIHRvIHBhZGRpbmcuIEl0IHNldHMgdGhlIF9hZGRQYWRkaW5nQlIgdG8gdHJ1ZSBpZiB0aGUgYnJvd3NlciBkb2Vzbid0IG5vcm1hbGx5IGZhY3RvciBpbiB0aGUgYm90dG9tIG9yIHJpZ2h0IHBhZGRpbmcgb24gdGhlIGVsZW1lbnQgaW5zaWRlIHRoZSBzY3JvbGxpbmcgYXJlYSwgYW5kIGl0IHNldHMgX2FkZFBhZGRpbmdMZWZ0IHRvIHRydWUgaWYgaXQncyBhIGJyb3dzZXIgdGhhdCByZXF1aXJlcyB0aGUgZXh0cmEgb2Zmc2V0IChvZmZzZXRMZWZ0KSB0byBiZSBhZGRlZCB0byB0aGUgcGFkZGluZ1JpZ2h0IChsaWtlIE9wZXJhKS5cbiAgICAgIHZhciBkaXYgPSBfY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICAgICAgICBjaGlsZCA9IF9jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgICAgICAgIGNoaWxkU3R5bGUgPSBjaGlsZC5zdHlsZSxcbiAgICAgICAgICBwYXJlbnQgPSBfYm9keSxcbiAgICAgICAgICB2YWw7XG5cbiAgICAgIGNoaWxkU3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICBjaGlsZFN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgZGl2LnN0eWxlLmNzc1RleHQgPSBjaGlsZC5pbm5lckhUTUwgPSBcIndpZHRoOjkwcHg7aGVpZ2h0OjQwcHg7cGFkZGluZzoxMHB4O292ZXJmbG93OmF1dG87dmlzaWJpbGl0eTpoaWRkZW5cIjtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgIHZhbCA9IGNoaWxkLm9mZnNldEhlaWdodCArIDE4ID4gZGl2LnNjcm9sbEhlaWdodDsgLy9kaXYuc2Nyb2xsSGVpZ2h0IHNob3VsZCBiZSBjaGlsZC5vZmZzZXRIZWlnaHQgKyAyMCBiZWNhdXNlIG9mIHRoZSAxMHB4IG9mIHBhZGRpbmcgb24gZWFjaCBzaWRlLCBidXQgc29tZSBicm93c2VycyBpZ25vcmUgb25lIHNpZGUuIFdlIGFsbG93IGEgMnB4IG1hcmdpbiBvZiBlcnJvci5cblxuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGRpdik7XG4gICAgICByZXR1cm4gdmFsO1xuICAgIH0oKTtcblxuICAgIF90b3VjaEV2ZW50TG9va3VwID0gZnVuY3Rpb24gKHR5cGVzKSB7XG4gICAgICAvL3dlIGNyZWF0ZSBhbiBvYmplY3QgdGhhdCBtYWtlcyBpdCBlYXN5IHRvIHRyYW5zbGF0ZSB0b3VjaCBldmVudCB0eXBlcyBpbnRvIHRoZWlyIFwicG9pbnRlclwiIGNvdW50ZXJwYXJ0cyBpZiB3ZSdyZSBpbiBhIGJyb3dzZXIgdGhhdCB1c2VzIHRob3NlIGluc3RlYWQuIExpa2UgSUUxMCB1c2VzIFwiTVNQb2ludGVyRG93blwiIGluc3RlYWQgb2YgXCJ0b3VjaHN0YXJ0XCIsIGZvciBleGFtcGxlLlxuICAgICAgdmFyIHN0YW5kYXJkID0gdHlwZXMuc3BsaXQoXCIsXCIpLFxuICAgICAgICAgIGNvbnZlcnRlZCA9IChcIm9ucG9pbnRlcmRvd25cIiBpbiBfdGVtcERpdiA/IFwicG9pbnRlcmRvd24scG9pbnRlcm1vdmUscG9pbnRlcnVwLHBvaW50ZXJjYW5jZWxcIiA6IFwib25tc3BvaW50ZXJkb3duXCIgaW4gX3RlbXBEaXYgPyBcIk1TUG9pbnRlckRvd24sTVNQb2ludGVyTW92ZSxNU1BvaW50ZXJVcCxNU1BvaW50ZXJDYW5jZWxcIiA6IHR5cGVzKS5zcGxpdChcIixcIiksXG4gICAgICAgICAgb2JqID0ge30sXG4gICAgICAgICAgaSA9IDQ7XG5cbiAgICAgIHdoaWxlICgtLWkgPiAtMSkge1xuICAgICAgICBvYmpbc3RhbmRhcmRbaV1dID0gY29udmVydGVkW2ldO1xuICAgICAgICBvYmpbY29udmVydGVkW2ldXSA9IHN0YW5kYXJkW2ldO1xuICAgICAgfSAvL3RvIGF2b2lkIHByb2JsZW1zIGluIGlPUyA5LCB0ZXN0IHRvIHNlZSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgXCJwYXNzaXZlXCIgb3B0aW9uIG9uIGFkZEV2ZW50TGlzdGVuZXIoKS5cblxuXG4gICAgICB0cnkge1xuICAgICAgICBfZG9jRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidGVzdFwiLCBudWxsLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIFwicGFzc2l2ZVwiLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICBfc3VwcG9ydHNQYXNzaXZlID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfShcInRvdWNoc3RhcnQsdG91Y2htb3ZlLHRvdWNoZW5kLHRvdWNoY2FuY2VsXCIpO1xuXG4gICAgX2FkZExpc3RlbmVyKF9kb2MsIFwidG91Y2hjYW5jZWxcIiwgX2VtcHR5RnVuYyk7IC8vc29tZSBvbGRlciBBbmRyb2lkIGRldmljZXMgaW50ZXJtaXR0ZW50bHkgc3RvcCBkaXNwYXRjaGluZyBcInRvdWNobW92ZVwiIGV2ZW50cyBpZiB3ZSBkb24ndCBsaXN0ZW4gZm9yIFwidG91Y2hjYW5jZWxcIiBvbiB0aGUgZG9jdW1lbnQuIFZlcnkgc3RyYW5nZSBpbmRlZWQuXG5cblxuICAgIF9hZGRMaXN0ZW5lcihfd2luLCBcInRvdWNobW92ZVwiLCBfZW1wdHlGdW5jKTsgLy93b3JrcyBhcm91bmQgU2FmYXJpIGJ1Z3MgdGhhdCBzdGlsbCBhbGxvdyB0aGUgcGFnZSB0byBzY3JvbGwgZXZlbiB3aGVuIHdlIHByZXZlbnREZWZhdWx0KCkgb24gdGhlIHRvdWNobW92ZSBldmVudC5cblxuXG4gICAgX2JvZHkgJiYgX2JvZHkuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgX2VtcHR5RnVuYyk7IC8vd29ya3MgYXJvdW5kIFNhZmFyaSBidWc6IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjE0NTAtZHJhZ2dhYmxlLWluLWlmcmFtZS1vbi1tb2JpbGUtaXMtYnVnZ3kvXG5cbiAgICBfYWRkTGlzdGVuZXIoX2RvYywgXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBwIGluIF9sb29rdXApIHtcbiAgICAgICAgaWYgKF9sb29rdXBbcF0uaXNQcmVzc2VkKSB7XG4gICAgICAgICAgX2xvb2t1cFtwXS5lbmREcmFnKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGdzYXAgPSBfY29yZUluaXR0ZWQgPSBfZ2V0R1NBUCgpO1xuICB9XG5cbiAgaWYgKGdzYXApIHtcbiAgICBJbmVydGlhUGx1Z2luID0gZ3NhcC5wbHVnaW5zLmluZXJ0aWE7XG4gICAgX2NoZWNrUHJlZml4ID0gZ3NhcC51dGlscy5jaGVja1ByZWZpeDtcbiAgICBfdHJhbnNmb3JtUHJvcCA9IF9jaGVja1ByZWZpeChfdHJhbnNmb3JtUHJvcCk7XG4gICAgX3RyYW5zZm9ybU9yaWdpblByb3AgPSBfY2hlY2tQcmVmaXgoX3RyYW5zZm9ybU9yaWdpblByb3ApO1xuICAgIF90b0FycmF5ID0gZ3NhcC51dGlscy50b0FycmF5O1xuICAgIF9zdXBwb3J0czNEID0gISFfY2hlY2tQcmVmaXgoXCJwZXJzcGVjdGl2ZVwiKTtcbiAgfSBlbHNlIGlmIChyZXF1aXJlZCkge1xuICAgIGNvbnNvbGUud2FybihcIlBsZWFzZSBnc2FwLnJlZ2lzdGVyUGx1Z2luKERyYWdnYWJsZSlcIik7XG4gIH1cbn07XG5cbnZhciBFdmVudERpc3BhdGNoZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFdmVudERpc3BhdGNoZXIodGFyZ2V0KSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaykge1xuICAgIHZhciBsaXN0ID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdIHx8ICh0aGlzLl9saXN0ZW5lcnNbdHlwZV0gPSBbXSk7XG5cbiAgICBpZiAoIX5saXN0LmluZGV4T2YoY2FsbGJhY2spKSB7XG4gICAgICBsaXN0LnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgbGlzdCA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXSxcbiAgICAgICAgaSA9IGxpc3QgJiYgbGlzdC5pbmRleE9mKGNhbGxiYWNrKSB8fCAtMTtcbiAgICBpID4gLTEgJiYgbGlzdC5zcGxpY2UoaSwgMSk7XG4gIH07XG5cbiAgX3Byb3RvLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KHR5cGUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIHJlc3VsdDtcbiAgICAodGhpcy5fbGlzdGVuZXJzW3R5cGVdIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwoX3RoaXMsIHtcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgdGFyZ2V0OiBfdGhpcy50YXJnZXRcbiAgICAgIH0pID09PSBmYWxzZSAmJiAocmVzdWx0ID0gZmFsc2UpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7IC8vaWYgYW55IG9mIHRoZSBjYWxsYmFja3MgcmV0dXJuIGZhbHNlLCBwYXNzIHRoYXQgYWxvbmcuXG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50RGlzcGF0Y2hlcjtcbn0oKTtcblxuZXhwb3J0IHZhciBEcmFnZ2FibGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9FdmVudERpc3BhdGNoZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoRHJhZ2dhYmxlLCBfRXZlbnREaXNwYXRjaGVyKTtcblxuICBmdW5jdGlvbiBEcmFnZ2FibGUodGFyZ2V0LCB2YXJzKSB7XG4gICAgdmFyIF90aGlzMjtcblxuICAgIF90aGlzMiA9IF9FdmVudERpc3BhdGNoZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuXG4gICAgaWYgKCFnc2FwKSB7XG4gICAgICBfaW5pdENvcmUoMSk7XG4gICAgfVxuXG4gICAgdGFyZ2V0ID0gX3RvQXJyYXkodGFyZ2V0KVswXTsgLy9pbiBjYXNlIHRoZSB0YXJnZXQgaXMgYSBzZWxlY3RvciBvYmplY3Qgb3Igc2VsZWN0b3IgdGV4dFxuXG4gICAgaWYgKCFJbmVydGlhUGx1Z2luKSB7XG4gICAgICBJbmVydGlhUGx1Z2luID0gZ3NhcC5wbHVnaW5zLmluZXJ0aWE7XG4gICAgfVxuXG4gICAgX3RoaXMyLnZhcnMgPSB2YXJzID0gX2NvcHkodmFycyB8fCB7fSk7XG4gICAgX3RoaXMyLnRhcmdldCA9IHRhcmdldDtcbiAgICBfdGhpczIueCA9IF90aGlzMi55ID0gX3RoaXMyLnJvdGF0aW9uID0gMDtcbiAgICBfdGhpczIuZHJhZ1Jlc2lzdGFuY2UgPSBwYXJzZUZsb2F0KHZhcnMuZHJhZ1Jlc2lzdGFuY2UpIHx8IDA7XG4gICAgX3RoaXMyLmVkZ2VSZXNpc3RhbmNlID0gaXNOYU4odmFycy5lZGdlUmVzaXN0YW5jZSkgPyAxIDogcGFyc2VGbG9hdCh2YXJzLmVkZ2VSZXNpc3RhbmNlKSB8fCAwO1xuICAgIF90aGlzMi5sb2NrQXhpcyA9IHZhcnMubG9ja0F4aXM7XG4gICAgX3RoaXMyLmF1dG9TY3JvbGwgPSB2YXJzLmF1dG9TY3JvbGwgfHwgMDtcbiAgICBfdGhpczIubG9ja2VkQXhpcyA9IG51bGw7XG4gICAgX3RoaXMyLmFsbG93RXZlbnREZWZhdWx0ID0gISF2YXJzLmFsbG93RXZlbnREZWZhdWx0O1xuICAgIGdzYXAuZ2V0UHJvcGVydHkodGFyZ2V0LCBcInhcIik7IC8vIHRvIGVuc3VyZSB0aGF0IHRyYW5zZm9ybXMgYXJlIGluc3RhbnRpYXRlZC5cblxuICAgIHZhciB0eXBlID0gKHZhcnMudHlwZSB8fCBcIngseVwiKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB4eU1vZGUgPSB+dHlwZS5pbmRleE9mKFwieFwiKSB8fCB+dHlwZS5pbmRleE9mKFwieVwiKSxcbiAgICAgICAgcm90YXRpb25Nb2RlID0gdHlwZS5pbmRleE9mKFwicm90YXRpb25cIikgIT09IC0xLFxuICAgICAgICB4UHJvcCA9IHJvdGF0aW9uTW9kZSA/IFwicm90YXRpb25cIiA6IHh5TW9kZSA/IFwieFwiIDogXCJsZWZ0XCIsXG4gICAgICAgIHlQcm9wID0geHlNb2RlID8gXCJ5XCIgOiBcInRvcFwiLFxuICAgICAgICBhbGxvd1ggPSAhISh+dHlwZS5pbmRleE9mKFwieFwiKSB8fCB+dHlwZS5pbmRleE9mKFwibGVmdFwiKSB8fCB0eXBlID09PSBcInNjcm9sbFwiKSxcbiAgICAgICAgYWxsb3dZID0gISEofnR5cGUuaW5kZXhPZihcInlcIikgfHwgfnR5cGUuaW5kZXhPZihcInRvcFwiKSB8fCB0eXBlID09PSBcInNjcm9sbFwiKSxcbiAgICAgICAgbWluaW11bU1vdmVtZW50ID0gdmFycy5taW5pbXVtTW92ZW1lbnQgfHwgMixcbiAgICAgICAgc2VsZiA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMyKSxcbiAgICAgICAgdHJpZ2dlcnMgPSBfdG9BcnJheSh2YXJzLnRyaWdnZXIgfHwgdmFycy5oYW5kbGUgfHwgdGFyZ2V0KSxcbiAgICAgICAga2lsbFByb3BzID0ge30sXG4gICAgICAgIGRyYWdFbmRUaW1lID0gMCxcbiAgICAgICAgY2hlY2tBdXRvU2Nyb2xsQm91bmRzID0gZmFsc2UsXG4gICAgICAgIGF1dG9TY3JvbGxNYXJnaW5Ub3AgPSB2YXJzLmF1dG9TY3JvbGxNYXJnaW5Ub3AgfHwgNDAsXG4gICAgICAgIGF1dG9TY3JvbGxNYXJnaW5SaWdodCA9IHZhcnMuYXV0b1Njcm9sbE1hcmdpblJpZ2h0IHx8IDQwLFxuICAgICAgICBhdXRvU2Nyb2xsTWFyZ2luQm90dG9tID0gdmFycy5hdXRvU2Nyb2xsTWFyZ2luQm90dG9tIHx8IDQwLFxuICAgICAgICBhdXRvU2Nyb2xsTWFyZ2luTGVmdCA9IHZhcnMuYXV0b1Njcm9sbE1hcmdpbkxlZnQgfHwgNDAsXG4gICAgICAgIGlzQ2xpY2thYmxlID0gdmFycy5jbGlja2FibGVUZXN0IHx8IF9pc0NsaWNrYWJsZSxcbiAgICAgICAgY2xpY2tUaW1lID0gMCxcbiAgICAgICAgZ3NDYWNoZSA9IHRhcmdldC5fZ3NhcCB8fCBnc2FwLmNvcmUuZ2V0Q2FjaGUodGFyZ2V0KSxcbiAgICAgICAgaXNGaXhlZCA9IF9pc0ZpeGVkKHRhcmdldCksXG4gICAgICAgIGdldFByb3BBc051bSA9IGZ1bmN0aW9uIGdldFByb3BBc051bShwcm9wZXJ0eSwgdW5pdCkge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoZ3NDYWNoZS5nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCkpO1xuICAgIH0sXG4gICAgICAgIG93bmVyRG9jID0gdGFyZ2V0Lm93bmVyRG9jdW1lbnQgfHwgX2RvYyxcbiAgICAgICAgZW5hYmxlZCxcbiAgICAgICAgc2Nyb2xsUHJveHksXG4gICAgICAgIHN0YXJ0UG9pbnRlclgsXG4gICAgICAgIHN0YXJ0UG9pbnRlclksXG4gICAgICAgIHN0YXJ0RWxlbWVudFgsXG4gICAgICAgIHN0YXJ0RWxlbWVudFksXG4gICAgICAgIGhhc0JvdW5kcyxcbiAgICAgICAgaGFzRHJhZ0NhbGxiYWNrLFxuICAgICAgICBoYXNNb3ZlQ2FsbGJhY2ssXG4gICAgICAgIG1heFgsXG4gICAgICAgIG1pblgsXG4gICAgICAgIG1heFksXG4gICAgICAgIG1pblksXG4gICAgICAgIHRvdWNoLFxuICAgICAgICB0b3VjaElELFxuICAgICAgICByb3RhdGlvbk9yaWdpbixcbiAgICAgICAgZGlydHksXG4gICAgICAgIG9sZCxcbiAgICAgICAgc25hcFgsXG4gICAgICAgIHNuYXBZLFxuICAgICAgICBzbmFwWFksXG4gICAgICAgIGlzQ2xpY2tpbmcsXG4gICAgICAgIHRvdWNoRXZlbnRUYXJnZXQsXG4gICAgICAgIG1hdHJpeCxcbiAgICAgICAgaW50ZXJydXB0ZWQsXG4gICAgICAgIGFsbG93TmF0aXZlVG91Y2hTY3JvbGxpbmcsXG4gICAgICAgIHRvdWNoRHJhZ0F4aXMsXG4gICAgICAgIGlzRGlzcGF0Y2hpbmcsXG4gICAgICAgIGNsaWNrRGlzcGF0Y2gsXG4gICAgICAgIHRydXN0ZWRDbGlja0Rpc3BhdGNoLFxuICAgICAgICBpc1ByZXZlbnRpbmdEZWZhdWx0LFxuICAgICAgICBvbkNvbnRleHRNZW51ID0gZnVuY3Rpb24gb25Db250ZXh0TWVudShlKSB7XG4gICAgICAvL3VzZWQgdG8gcHJldmVudCBsb25nLXRvdWNoIGZyb20gdHJpZ2dlcmluZyBhIGNvbnRleHQgbWVudS5cbiAgICAgIC8vIChzZWxmLmlzUHJlc3NlZCAmJiBlLndoaWNoIDwgMikgJiYgc2VsZi5lbmREcmFnKCkgLy8gcHJldmlvdXNseSBlbmRlZCBkcmFnIHdoZW4gY29udGV4dCBtZW51IHdhcyB0cmlnZ2VyZWQsIGJ1dCBpbnN0ZWFkIHdlIHNob3VsZCBqdXN0IHN0b3AgcHJvcGFnYXRpb24gYW5kIHByZXZlbnQgdGhlIGRlZmF1bHQgZXZlbnQgYmVoYXZpb3IuXG4gICAgICBfcHJldmVudERlZmF1bHQoZSk7XG5cbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uICYmIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICAgICAgLy90aGlzIG1ldGhvZCBnZXRzIGNhbGxlZCBvbiBldmVyeSB0aWNrIG9mIFR3ZWVuTGl0ZS50aWNrZXIgd2hpY2ggYWxsb3dzIHVzIHRvIHN5bmNocm9uaXplIHRoZSByZW5kZXJzIHRvIHRoZSBjb3JlIGVuZ2luZSAod2hpY2ggaXMgdHlwaWNhbGx5IHN5bmNocm9uaXplZCB3aXRoIHRoZSBkaXNwbGF5IHJlZnJlc2ggdmlhIHJlcXVlc3RBbmltYXRpb25GcmFtZSkuIFRoaXMgaXMgYW4gb3B0aW1pemF0aW9uIC0gaXQncyBiZXR0ZXIgdGhhbiBhcHBseWluZyB0aGUgdmFsdWVzIGluc2lkZSB0aGUgXCJtb3VzZW1vdmVcIiBvciBcInRvdWNobW92ZVwiIGV2ZW50IGhhbmRsZXIgd2hpY2ggbWF5IGdldCBjYWxsZWQgbWFueSB0aW1lcyBpbmJldHdlZW4gcmVmcmVzaGVzLlxuICAgIHJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcihzdXBwcmVzc0V2ZW50cykge1xuICAgICAgaWYgKHNlbGYuYXV0b1Njcm9sbCAmJiBzZWxmLmlzRHJhZ2dpbmcgJiYgKGNoZWNrQXV0b1Njcm9sbEJvdW5kcyB8fCBkaXJ0eSkpIHtcbiAgICAgICAgdmFyIGUgPSB0YXJnZXQsXG4gICAgICAgICAgICBhdXRvU2Nyb2xsRmFjdG9yID0gc2VsZi5hdXRvU2Nyb2xsICogMTUsXG4gICAgICAgICAgICAvL211bHRpcGx5aW5nIGJ5IDE1IGp1c3QgZ2l2ZXMgdXMgYSBiZXR0ZXIgXCJmZWVsXCIgc3BlZWQtd2lzZS5cbiAgICAgICAgcGFyZW50LFxuICAgICAgICAgICAgaXNSb290LFxuICAgICAgICAgICAgcmVjdCxcbiAgICAgICAgICAgIHBvaW50ZXJYLFxuICAgICAgICAgICAgcG9pbnRlclksXG4gICAgICAgICAgICBjaGFuZ2VYLFxuICAgICAgICAgICAgY2hhbmdlWSxcbiAgICAgICAgICAgIGdhcDtcbiAgICAgICAgY2hlY2tBdXRvU2Nyb2xsQm91bmRzID0gZmFsc2U7XG4gICAgICAgIF93aW5kb3dQcm94eS5zY3JvbGxUb3AgPSBfd2luLnBhZ2VZT2Zmc2V0ICE9IG51bGwgPyBfd2luLnBhZ2VZT2Zmc2V0IDogb3duZXJEb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAhPSBudWxsID8gb3duZXJEb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA6IG93bmVyRG9jLmJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICBfd2luZG93UHJveHkuc2Nyb2xsTGVmdCA9IF93aW4ucGFnZVhPZmZzZXQgIT0gbnVsbCA/IF93aW4ucGFnZVhPZmZzZXQgOiBvd25lckRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCAhPSBudWxsID8gb3duZXJEb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgOiBvd25lckRvYy5ib2R5LnNjcm9sbExlZnQ7XG4gICAgICAgIHBvaW50ZXJYID0gc2VsZi5wb2ludGVyWCAtIF93aW5kb3dQcm94eS5zY3JvbGxMZWZ0O1xuICAgICAgICBwb2ludGVyWSA9IHNlbGYucG9pbnRlclkgLSBfd2luZG93UHJveHkuc2Nyb2xsVG9wO1xuXG4gICAgICAgIHdoaWxlIChlICYmICFpc1Jvb3QpIHtcbiAgICAgICAgICAvL3dhbGsgdXAgdGhlIGNoYWluIGFuZCBzZW5zZSB3aGVyZXZlciB0aGUgcG9pbnRlciBpcyB3aXRoaW4gNDBweCBvZiBhbiBlZGdlIHRoYXQncyBzY3JvbGxhYmxlLlxuICAgICAgICAgIGlzUm9vdCA9IF9pc1Jvb3QoZS5wYXJlbnROb2RlKTtcbiAgICAgICAgICBwYXJlbnQgPSBpc1Jvb3QgPyBfd2luZG93UHJveHkgOiBlLnBhcmVudE5vZGU7XG4gICAgICAgICAgcmVjdCA9IGlzUm9vdCA/IHtcbiAgICAgICAgICAgIGJvdHRvbTogTWF0aC5tYXgoX2RvY0VsZW1lbnQuY2xpZW50SGVpZ2h0LCBfd2luLmlubmVySGVpZ2h0IHx8IDApLFxuICAgICAgICAgICAgcmlnaHQ6IE1hdGgubWF4KF9kb2NFbGVtZW50LmNsaWVudFdpZHRoLCBfd2luLmlubmVyV2lkdGggfHwgMCksXG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgdG9wOiAwXG4gICAgICAgICAgfSA6IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBjaGFuZ2VYID0gY2hhbmdlWSA9IDA7XG5cbiAgICAgICAgICBpZiAoYWxsb3dZKSB7XG4gICAgICAgICAgICBnYXAgPSBwYXJlbnQuX2dzTWF4U2Nyb2xsWSAtIHBhcmVudC5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAgIGlmIChnYXAgPCAwKSB7XG4gICAgICAgICAgICAgIGNoYW5nZVkgPSBnYXA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXJZID4gcmVjdC5ib3R0b20gLSBhdXRvU2Nyb2xsTWFyZ2luQm90dG9tICYmIGdhcCkge1xuICAgICAgICAgICAgICBjaGVja0F1dG9TY3JvbGxCb3VuZHMgPSB0cnVlO1xuICAgICAgICAgICAgICBjaGFuZ2VZID0gTWF0aC5taW4oZ2FwLCBhdXRvU2Nyb2xsRmFjdG9yICogKDEgLSBNYXRoLm1heCgwLCByZWN0LmJvdHRvbSAtIHBvaW50ZXJZKSAvIGF1dG9TY3JvbGxNYXJnaW5Cb3R0b20pIHwgMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXJZIDwgcmVjdC50b3AgKyBhdXRvU2Nyb2xsTWFyZ2luVG9wICYmIHBhcmVudC5zY3JvbGxUb3ApIHtcbiAgICAgICAgICAgICAgY2hlY2tBdXRvU2Nyb2xsQm91bmRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY2hhbmdlWSA9IC1NYXRoLm1pbihwYXJlbnQuc2Nyb2xsVG9wLCBhdXRvU2Nyb2xsRmFjdG9yICogKDEgLSBNYXRoLm1heCgwLCBwb2ludGVyWSAtIHJlY3QudG9wKSAvIGF1dG9TY3JvbGxNYXJnaW5Ub3ApIHwgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VZKSB7XG4gICAgICAgICAgICAgIHBhcmVudC5zY3JvbGxUb3AgKz0gY2hhbmdlWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYWxsb3dYKSB7XG4gICAgICAgICAgICBnYXAgPSBwYXJlbnQuX2dzTWF4U2Nyb2xsWCAtIHBhcmVudC5zY3JvbGxMZWZ0O1xuXG4gICAgICAgICAgICBpZiAoZ2FwIDwgMCkge1xuICAgICAgICAgICAgICBjaGFuZ2VYID0gZ2FwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyWCA+IHJlY3QucmlnaHQgLSBhdXRvU2Nyb2xsTWFyZ2luUmlnaHQgJiYgZ2FwKSB7XG4gICAgICAgICAgICAgIGNoZWNrQXV0b1Njcm9sbEJvdW5kcyA9IHRydWU7XG4gICAgICAgICAgICAgIGNoYW5nZVggPSBNYXRoLm1pbihnYXAsIGF1dG9TY3JvbGxGYWN0b3IgKiAoMSAtIE1hdGgubWF4KDAsIHJlY3QucmlnaHQgLSBwb2ludGVyWCkgLyBhdXRvU2Nyb2xsTWFyZ2luUmlnaHQpIHwgMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXJYIDwgcmVjdC5sZWZ0ICsgYXV0b1Njcm9sbE1hcmdpbkxlZnQgJiYgcGFyZW50LnNjcm9sbExlZnQpIHtcbiAgICAgICAgICAgICAgY2hlY2tBdXRvU2Nyb2xsQm91bmRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY2hhbmdlWCA9IC1NYXRoLm1pbihwYXJlbnQuc2Nyb2xsTGVmdCwgYXV0b1Njcm9sbEZhY3RvciAqICgxIC0gTWF0aC5tYXgoMCwgcG9pbnRlclggLSByZWN0LmxlZnQpIC8gYXV0b1Njcm9sbE1hcmdpbkxlZnQpIHwgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VYKSB7XG4gICAgICAgICAgICAgIHBhcmVudC5zY3JvbGxMZWZ0ICs9IGNoYW5nZVg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzUm9vdCAmJiAoY2hhbmdlWCB8fCBjaGFuZ2VZKSkge1xuICAgICAgICAgICAgX3dpbi5zY3JvbGxUbyhwYXJlbnQuc2Nyb2xsTGVmdCwgcGFyZW50LnNjcm9sbFRvcCk7XG5cbiAgICAgICAgICAgIHNldFBvaW50ZXJQb3NpdGlvbihzZWxmLnBvaW50ZXJYICsgY2hhbmdlWCwgc2VsZi5wb2ludGVyWSArIGNoYW5nZVkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGUgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGRpcnR5KSB7XG4gICAgICAgIHZhciB4ID0gc2VsZi54LFxuICAgICAgICAgICAgeSA9IHNlbGYueTtcblxuICAgICAgICBpZiAocm90YXRpb25Nb2RlKSB7XG4gICAgICAgICAgc2VsZi5kZWx0YVggPSB4IC0gcGFyc2VGbG9hdChnc0NhY2hlLnJvdGF0aW9uKTtcbiAgICAgICAgICBzZWxmLnJvdGF0aW9uID0geDtcbiAgICAgICAgICBnc0NhY2hlLnJvdGF0aW9uID0geCArIFwiZGVnXCI7XG4gICAgICAgICAgZ3NDYWNoZS5yZW5kZXJUcmFuc2Zvcm0oMSwgZ3NDYWNoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNjcm9sbFByb3h5KSB7XG4gICAgICAgICAgICBpZiAoYWxsb3dZKSB7XG4gICAgICAgICAgICAgIHNlbGYuZGVsdGFZID0geSAtIHNjcm9sbFByb3h5LnRvcCgpO1xuICAgICAgICAgICAgICBzY3JvbGxQcm94eS50b3AoeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbGxvd1gpIHtcbiAgICAgICAgICAgICAgc2VsZi5kZWx0YVggPSB4IC0gc2Nyb2xsUHJveHkubGVmdCgpO1xuICAgICAgICAgICAgICBzY3JvbGxQcm94eS5sZWZ0KHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoeHlNb2RlKSB7XG4gICAgICAgICAgICBpZiAoYWxsb3dZKSB7XG4gICAgICAgICAgICAgIHNlbGYuZGVsdGFZID0geSAtIHBhcnNlRmxvYXQoZ3NDYWNoZS55KTtcbiAgICAgICAgICAgICAgZ3NDYWNoZS55ID0geSArIFwicHhcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFsbG93WCkge1xuICAgICAgICAgICAgICBzZWxmLmRlbHRhWCA9IHggLSBwYXJzZUZsb2F0KGdzQ2FjaGUueCk7XG4gICAgICAgICAgICAgIGdzQ2FjaGUueCA9IHggKyBcInB4XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdzQ2FjaGUucmVuZGVyVHJhbnNmb3JtKDEsIGdzQ2FjaGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWxsb3dZKSB7XG4gICAgICAgICAgICAgIHNlbGYuZGVsdGFZID0geSAtIHBhcnNlRmxvYXQodGFyZ2V0LnN0eWxlLnRvcCB8fCAwKTtcbiAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnRvcCA9IHkgKyBcInB4XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbGxvd1gpIHtcbiAgICAgICAgICAgICAgc2VsZi5kZWx0YVkgPSB4IC0gcGFyc2VGbG9hdCh0YXJnZXQuc3R5bGUubGVmdCB8fCAwKTtcbiAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmxlZnQgPSB4ICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNEcmFnQ2FsbGJhY2sgJiYgIXN1cHByZXNzRXZlbnRzICYmICFpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7IC8vaW4gY2FzZSBvbkRyYWcgaGFzIGFuIHVwZGF0ZSgpIGNhbGwgKGF2b2lkIGVuZGxlc3MgbG9vcClcblxuICAgICAgICAgIGlmIChfZGlzcGF0Y2hFdmVudChzZWxmLCBcImRyYWdcIiwgXCJvbkRyYWdcIikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoYWxsb3dYKSB7XG4gICAgICAgICAgICAgIHNlbGYueCAtPSBzZWxmLmRlbHRhWDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFsbG93WSkge1xuICAgICAgICAgICAgICBzZWxmLnkgLT0gc2VsZi5kZWx0YVk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlbmRlcih0cnVlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGlydHkgPSBmYWxzZTtcbiAgICB9LFxuICAgICAgICAvL2NvcGllcyB0aGUgeC95IGZyb20gdGhlIGVsZW1lbnQgKHdoZXRoZXIgdGhhdCBiZSB0cmFuc2Zvcm1zLCB0b3AvbGVmdCwgb3IgU2Nyb2xsUHJveHkncyB0b3AvbGVmdCkgdG8gdGhlIERyYWdnYWJsZSdzIHggYW5kIHkgKGFuZCByb3RhdGlvbiBpZiBuZWNlc3NhcnkpIHByb3BlcnRpZXMgc28gdGhhdCB0aGV5IHJlZmxlY3QgcmVhbGl0eSBhbmQgaXQgYWxzbyAob3B0aW9uYWxseSkgYXBwbGllcyBhbnkgc25hcHBpbmcgbmVjZXNzYXJ5LiBUaGlzIGlzIHVzZWQgYnkgdGhlIEluZXJ0aWFQbHVnaW4gdHdlZW4gaW4gYW4gb25VcGRhdGUgdG8gZW5zdXJlIHRoaW5ncyBhcmUgc3luY2VkIGFuZCBzbmFwcGVkLlxuICAgIHN5bmNYWSA9IGZ1bmN0aW9uIHN5bmNYWShza2lwT25VcGRhdGUsIHNraXBTbmFwKSB7XG4gICAgICB2YXIgeCA9IHNlbGYueCxcbiAgICAgICAgICB5ID0gc2VsZi55LFxuICAgICAgICAgIHNuYXBwZWRWYWx1ZSxcbiAgICAgICAgICBjcztcblxuICAgICAgaWYgKCF0YXJnZXQuX2dzYXApIHtcbiAgICAgICAgLy9qdXN0IGluIGNhc2UgdGhlIF9nc2FwIGNhY2hlIGdvdCB3aXBlZCwgbGlrZSBpZiB0aGUgdXNlciBjYWxsZWQgY2xlYXJQcm9wcyBvbiB0aGUgdHJhbnNmb3JtIG9yIHNvbWV0aGluZyAodmVyeSByYXJlKS5cbiAgICAgICAgZ3NDYWNoZSA9IGdzYXAuY29yZS5nZXRDYWNoZSh0YXJnZXQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoeHlNb2RlKSB7XG4gICAgICAgIHNlbGYueCA9IHBhcnNlRmxvYXQoZ3NDYWNoZS54KTtcbiAgICAgICAgc2VsZi55ID0gcGFyc2VGbG9hdChnc0NhY2hlLnkpO1xuICAgICAgfSBlbHNlIGlmIChyb3RhdGlvbk1vZGUpIHtcbiAgICAgICAgc2VsZi54ID0gc2VsZi5yb3RhdGlvbiA9IHBhcnNlRmxvYXQoZ3NDYWNoZS5yb3RhdGlvbik7XG4gICAgICB9IGVsc2UgaWYgKHNjcm9sbFByb3h5KSB7XG4gICAgICAgIHNlbGYueSA9IHNjcm9sbFByb3h5LnRvcCgpO1xuICAgICAgICBzZWxmLnggPSBzY3JvbGxQcm94eS5sZWZ0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLnkgPSBwYXJzZUludCh0YXJnZXQuc3R5bGUudG9wIHx8IChjcyA9IF9nZXRDb21wdXRlZFN0eWxlKHRhcmdldCkpICYmIGNzLnRvcCwgMTApIHx8IDA7XG4gICAgICAgIHNlbGYueCA9IHBhcnNlSW50KHRhcmdldC5zdHlsZS5sZWZ0IHx8IChjcyB8fCB7fSkubGVmdCwgMTApIHx8IDA7XG4gICAgICB9XG5cbiAgICAgIGlmICgoc25hcFggfHwgc25hcFkgfHwgc25hcFhZKSAmJiAhc2tpcFNuYXAgJiYgKHNlbGYuaXNEcmFnZ2luZyB8fCBzZWxmLmlzVGhyb3dpbmcpKSB7XG4gICAgICAgIGlmIChzbmFwWFkpIHtcbiAgICAgICAgICBfdGVtcDEueCA9IHNlbGYueDtcbiAgICAgICAgICBfdGVtcDEueSA9IHNlbGYueTtcbiAgICAgICAgICBzbmFwcGVkVmFsdWUgPSBzbmFwWFkoX3RlbXAxKTtcblxuICAgICAgICAgIGlmIChzbmFwcGVkVmFsdWUueCAhPT0gc2VsZi54KSB7XG4gICAgICAgICAgICBzZWxmLnggPSBzbmFwcGVkVmFsdWUueDtcbiAgICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc25hcHBlZFZhbHVlLnkgIT09IHNlbGYueSkge1xuICAgICAgICAgICAgc2VsZi55ID0gc25hcHBlZFZhbHVlLnk7XG4gICAgICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNuYXBYKSB7XG4gICAgICAgICAgc25hcHBlZFZhbHVlID0gc25hcFgoc2VsZi54KTtcblxuICAgICAgICAgIGlmIChzbmFwcGVkVmFsdWUgIT09IHNlbGYueCkge1xuICAgICAgICAgICAgc2VsZi54ID0gc25hcHBlZFZhbHVlO1xuXG4gICAgICAgICAgICBpZiAocm90YXRpb25Nb2RlKSB7XG4gICAgICAgICAgICAgIHNlbGYucm90YXRpb24gPSBzbmFwcGVkVmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc25hcFkpIHtcbiAgICAgICAgICBzbmFwcGVkVmFsdWUgPSBzbmFwWShzZWxmLnkpO1xuXG4gICAgICAgICAgaWYgKHNuYXBwZWRWYWx1ZSAhPT0gc2VsZi55KSB7XG4gICAgICAgICAgICBzZWxmLnkgPSBzbmFwcGVkVmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChkaXJ0eSkge1xuICAgICAgICByZW5kZXIodHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2tpcE9uVXBkYXRlKSB7XG4gICAgICAgIHNlbGYuZGVsdGFYID0gc2VsZi54IC0geDtcbiAgICAgICAgc2VsZi5kZWx0YVkgPSBzZWxmLnkgLSB5O1xuXG4gICAgICAgIF9kaXNwYXRjaEV2ZW50KHNlbGYsIFwidGhyb3d1cGRhdGVcIiwgXCJvblRocm93VXBkYXRlXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgICAgIGJ1aWxkU25hcEZ1bmMgPSBmdW5jdGlvbiBidWlsZFNuYXBGdW5jKHNuYXAsIG1pbiwgbWF4LCBmYWN0b3IpIHtcbiAgICAgIGlmIChtaW4gPT0gbnVsbCkge1xuICAgICAgICBtaW4gPSAtX2JpZ051bTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1heCA9PSBudWxsKSB7XG4gICAgICAgIG1heCA9IF9iaWdOdW07XG4gICAgICB9XG5cbiAgICAgIGlmIChfaXNGdW5jdGlvbihzbmFwKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICB2YXIgZWRnZVRvbGVyYW5jZSA9ICFzZWxmLmlzUHJlc3NlZCA/IDEgOiAxIC0gc2VsZi5lZGdlUmVzaXN0YW5jZTsgLy9pZiB3ZSdyZSB0d2VlbmluZywgZGlzYWJsZSB0aGUgZWRnZVRvbGVyYW5jZSBiZWNhdXNlIGl0J3MgYWxyZWFkeSBmYWN0b3JlZCBpbnRvIHRoZSB0d2VlbmluZyB2YWx1ZXMgKHdlIGRvbid0IHdhbnQgdG8gYXBwbHkgaXQgbXVsdGlwbGUgdGltZXMpXG5cbiAgICAgICAgICByZXR1cm4gc25hcC5jYWxsKHNlbGYsIG4gPiBtYXggPyBtYXggKyAobiAtIG1heCkgKiBlZGdlVG9sZXJhbmNlIDogbiA8IG1pbiA/IG1pbiArIChuIC0gbWluKSAqIGVkZ2VUb2xlcmFuY2UgOiBuKSAqIGZhY3RvcjtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9pc0FycmF5KHNuYXApKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobikge1xuICAgICAgICAgIHZhciBpID0gc25hcC5sZW5ndGgsXG4gICAgICAgICAgICAgIGNsb3Nlc3QgPSAwLFxuICAgICAgICAgICAgICBhYnNEaWYgPSBfYmlnTnVtLFxuICAgICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICAgIGRpZjtcblxuICAgICAgICAgIHdoaWxlICgtLWkgPiAtMSkge1xuICAgICAgICAgICAgdmFsID0gc25hcFtpXTtcbiAgICAgICAgICAgIGRpZiA9IHZhbCAtIG47XG5cbiAgICAgICAgICAgIGlmIChkaWYgPCAwKSB7XG4gICAgICAgICAgICAgIGRpZiA9IC1kaWY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkaWYgPCBhYnNEaWYgJiYgdmFsID49IG1pbiAmJiB2YWwgPD0gbWF4KSB7XG4gICAgICAgICAgICAgIGNsb3Nlc3QgPSBpO1xuICAgICAgICAgICAgICBhYnNEaWYgPSBkaWY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHNuYXBbY2xvc2VzdF07XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpc05hTihzbmFwKSA/IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNuYXAgKiBmYWN0b3I7XG4gICAgICB9O1xuICAgIH0sXG4gICAgICAgIGJ1aWxkUG9pbnRTbmFwRnVuYyA9IGZ1bmN0aW9uIGJ1aWxkUG9pbnRTbmFwRnVuYyhzbmFwLCBtaW5YLCBtYXhYLCBtaW5ZLCBtYXhZLCByYWRpdXMsIGZhY3Rvcikge1xuICAgICAgcmFkaXVzID0gcmFkaXVzICYmIHJhZGl1cyA8IF9iaWdOdW0gPyByYWRpdXMgKiByYWRpdXMgOiBfYmlnTnVtOyAvL3NvIHdlIGRvbid0IGhhdmUgdG8gTWF0aC5zcXJ0KCkgaW4gdGhlIGZ1bmN0aW9ucy4gUGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uLlxuXG4gICAgICBpZiAoX2lzRnVuY3Rpb24oc25hcCkpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgIHZhciBlZGdlVG9sZXJhbmNlID0gIXNlbGYuaXNQcmVzc2VkID8gMSA6IDEgLSBzZWxmLmVkZ2VSZXNpc3RhbmNlLFxuICAgICAgICAgICAgICB4ID0gcG9pbnQueCxcbiAgICAgICAgICAgICAgeSA9IHBvaW50LnksXG4gICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgZHgsXG4gICAgICAgICAgICAgIGR5OyAvL2lmIHdlJ3JlIHR3ZWVuaW5nLCBkaXNhYmxlIHRoZSBlZGdlVG9sZXJhbmNlIGJlY2F1c2UgaXQncyBhbHJlYWR5IGZhY3RvcmVkIGludG8gdGhlIHR3ZWVuaW5nIHZhbHVlcyAod2UgZG9uJ3Qgd2FudCB0byBhcHBseSBpdCBtdWx0aXBsZSB0aW1lcylcblxuICAgICAgICAgIHBvaW50LnggPSB4ID0geCA+IG1heFggPyBtYXhYICsgKHggLSBtYXhYKSAqIGVkZ2VUb2xlcmFuY2UgOiB4IDwgbWluWCA/IG1pblggKyAoeCAtIG1pblgpICogZWRnZVRvbGVyYW5jZSA6IHg7XG4gICAgICAgICAgcG9pbnQueSA9IHkgPSB5ID4gbWF4WSA/IG1heFkgKyAoeSAtIG1heFkpICogZWRnZVRvbGVyYW5jZSA6IHkgPCBtaW5ZID8gbWluWSArICh5IC0gbWluWSkgKiBlZGdlVG9sZXJhbmNlIDogeTtcbiAgICAgICAgICByZXN1bHQgPSBzbmFwLmNhbGwoc2VsZiwgcG9pbnQpO1xuXG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gcG9pbnQpIHtcbiAgICAgICAgICAgIHBvaW50LnggPSByZXN1bHQueDtcbiAgICAgICAgICAgIHBvaW50LnkgPSByZXN1bHQueTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZmFjdG9yICE9PSAxKSB7XG4gICAgICAgICAgICBwb2ludC54ICo9IGZhY3RvcjtcbiAgICAgICAgICAgIHBvaW50LnkgKj0gZmFjdG9yO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyYWRpdXMgPCBfYmlnTnVtKSB7XG4gICAgICAgICAgICBkeCA9IHBvaW50LnggLSB4O1xuICAgICAgICAgICAgZHkgPSBwb2ludC55IC0geTtcblxuICAgICAgICAgICAgaWYgKGR4ICogZHggKyBkeSAqIGR5ID4gcmFkaXVzKSB7XG4gICAgICAgICAgICAgIHBvaW50LnggPSB4O1xuICAgICAgICAgICAgICBwb2ludC55ID0geTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcG9pbnQ7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChfaXNBcnJheShzbmFwKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICB2YXIgaSA9IHNuYXAubGVuZ3RoLFxuICAgICAgICAgICAgICBjbG9zZXN0ID0gMCxcbiAgICAgICAgICAgICAgbWluRGlzdCA9IF9iaWdOdW0sXG4gICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgIHBvaW50LFxuICAgICAgICAgICAgICBkaXN0O1xuXG4gICAgICAgICAgd2hpbGUgKC0taSA+IC0xKSB7XG4gICAgICAgICAgICBwb2ludCA9IHNuYXBbaV07XG4gICAgICAgICAgICB4ID0gcG9pbnQueCAtIHAueDtcbiAgICAgICAgICAgIHkgPSBwb2ludC55IC0gcC55O1xuICAgICAgICAgICAgZGlzdCA9IHggKiB4ICsgeSAqIHk7XG5cbiAgICAgICAgICAgIGlmIChkaXN0IDwgbWluRGlzdCkge1xuICAgICAgICAgICAgICBjbG9zZXN0ID0gaTtcbiAgICAgICAgICAgICAgbWluRGlzdCA9IGRpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1pbkRpc3QgPD0gcmFkaXVzID8gc25hcFtjbG9zZXN0XSA6IHA7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH07XG4gICAgfSxcbiAgICAgICAgY2FsY3VsYXRlQm91bmRzID0gZnVuY3Rpb24gY2FsY3VsYXRlQm91bmRzKCkge1xuICAgICAgdmFyIGJvdW5kcywgdGFyZ2V0Qm91bmRzLCBzbmFwLCBzbmFwSXNSYXc7XG4gICAgICBoYXNCb3VuZHMgPSBmYWxzZTtcblxuICAgICAgaWYgKHNjcm9sbFByb3h5KSB7XG4gICAgICAgIHNjcm9sbFByb3h5LmNhbGlicmF0ZSgpO1xuICAgICAgICBzZWxmLm1pblggPSBtaW5YID0gLXNjcm9sbFByb3h5Lm1heFNjcm9sbExlZnQoKTtcbiAgICAgICAgc2VsZi5taW5ZID0gbWluWSA9IC1zY3JvbGxQcm94eS5tYXhTY3JvbGxUb3AoKTtcbiAgICAgICAgc2VsZi5tYXhYID0gbWF4WCA9IHNlbGYubWF4WSA9IG1heFkgPSAwO1xuICAgICAgICBoYXNCb3VuZHMgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICghIXZhcnMuYm91bmRzKSB7XG4gICAgICAgIGJvdW5kcyA9IF9nZXRCb3VuZHModmFycy5ib3VuZHMsIHRhcmdldC5wYXJlbnROb2RlKTsgLy9jb3VsZCBiZSBhIHNlbGVjdG9yL2pRdWVyeSBvYmplY3Qgb3IgYSBET00gZWxlbWVudCBvciBhIGdlbmVyaWMgb2JqZWN0IGxpa2Uge3RvcDowLCBsZWZ0OjEwMCwgd2lkdGg6MTAwMCwgaGVpZ2h0OjgwMH0gb3Ige21pblg6MTAwLCBtYXhYOjExMDAsIG1pblk6MCwgbWF4WTo4MDB9XG5cbiAgICAgICAgaWYgKHJvdGF0aW9uTW9kZSkge1xuICAgICAgICAgIHNlbGYubWluWCA9IG1pblggPSBib3VuZHMubGVmdDtcbiAgICAgICAgICBzZWxmLm1heFggPSBtYXhYID0gYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGg7XG4gICAgICAgICAgc2VsZi5taW5ZID0gbWluWSA9IHNlbGYubWF4WSA9IG1heFkgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKCFfaXNVbmRlZmluZWQodmFycy5ib3VuZHMubWF4WCkgfHwgIV9pc1VuZGVmaW5lZCh2YXJzLmJvdW5kcy5tYXhZKSkge1xuICAgICAgICAgIGJvdW5kcyA9IHZhcnMuYm91bmRzO1xuICAgICAgICAgIHNlbGYubWluWCA9IG1pblggPSBib3VuZHMubWluWDtcbiAgICAgICAgICBzZWxmLm1pblkgPSBtaW5ZID0gYm91bmRzLm1pblk7XG4gICAgICAgICAgc2VsZi5tYXhYID0gbWF4WCA9IGJvdW5kcy5tYXhYO1xuICAgICAgICAgIHNlbGYubWF4WSA9IG1heFkgPSBib3VuZHMubWF4WTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRCb3VuZHMgPSBfZ2V0Qm91bmRzKHRhcmdldCwgdGFyZ2V0LnBhcmVudE5vZGUpO1xuICAgICAgICAgIHNlbGYubWluWCA9IG1pblggPSBNYXRoLnJvdW5kKGdldFByb3BBc051bSh4UHJvcCwgXCJweFwiKSArIGJvdW5kcy5sZWZ0IC0gdGFyZ2V0Qm91bmRzLmxlZnQgLSAwLjUpO1xuICAgICAgICAgIHNlbGYubWluWSA9IG1pblkgPSBNYXRoLnJvdW5kKGdldFByb3BBc051bSh5UHJvcCwgXCJweFwiKSArIGJvdW5kcy50b3AgLSB0YXJnZXRCb3VuZHMudG9wIC0gMC41KTtcbiAgICAgICAgICBzZWxmLm1heFggPSBtYXhYID0gTWF0aC5yb3VuZChtaW5YICsgKGJvdW5kcy53aWR0aCAtIHRhcmdldEJvdW5kcy53aWR0aCkpO1xuICAgICAgICAgIHNlbGYubWF4WSA9IG1heFkgPSBNYXRoLnJvdW5kKG1pblkgKyAoYm91bmRzLmhlaWdodCAtIHRhcmdldEJvdW5kcy5oZWlnaHQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtaW5YID4gbWF4WCkge1xuICAgICAgICAgIHNlbGYubWluWCA9IG1heFg7XG4gICAgICAgICAgc2VsZi5tYXhYID0gbWF4WCA9IG1pblg7XG4gICAgICAgICAgbWluWCA9IHNlbGYubWluWDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtaW5ZID4gbWF4WSkge1xuICAgICAgICAgIHNlbGYubWluWSA9IG1heFk7XG4gICAgICAgICAgc2VsZi5tYXhZID0gbWF4WSA9IG1pblk7XG4gICAgICAgICAgbWluWSA9IHNlbGYubWluWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb3RhdGlvbk1vZGUpIHtcbiAgICAgICAgICBzZWxmLm1pblJvdGF0aW9uID0gbWluWDtcbiAgICAgICAgICBzZWxmLm1heFJvdGF0aW9uID0gbWF4WDtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc0JvdW5kcyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh2YXJzLmxpdmVTbmFwKSB7XG4gICAgICAgIHNuYXAgPSB2YXJzLmxpdmVTbmFwID09PSB0cnVlID8gdmFycy5zbmFwIHx8IHt9IDogdmFycy5saXZlU25hcDtcbiAgICAgICAgc25hcElzUmF3ID0gX2lzQXJyYXkoc25hcCkgfHwgX2lzRnVuY3Rpb24oc25hcCk7XG5cbiAgICAgICAgaWYgKHJvdGF0aW9uTW9kZSkge1xuICAgICAgICAgIHNuYXBYID0gYnVpbGRTbmFwRnVuYyhzbmFwSXNSYXcgPyBzbmFwIDogc25hcC5yb3RhdGlvbiwgbWluWCwgbWF4WCwgMSk7XG4gICAgICAgICAgc25hcFkgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzbmFwLnBvaW50cykge1xuICAgICAgICAgICAgc25hcFhZID0gYnVpbGRQb2ludFNuYXBGdW5jKHNuYXBJc1JhdyA/IHNuYXAgOiBzbmFwLnBvaW50cywgbWluWCwgbWF4WCwgbWluWSwgbWF4WSwgc25hcC5yYWRpdXMsIHNjcm9sbFByb3h5ID8gLTEgOiAxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFsbG93WCkge1xuICAgICAgICAgICAgICBzbmFwWCA9IGJ1aWxkU25hcEZ1bmMoc25hcElzUmF3ID8gc25hcCA6IHNuYXAueCB8fCBzbmFwLmxlZnQgfHwgc25hcC5zY3JvbGxMZWZ0LCBtaW5YLCBtYXhYLCBzY3JvbGxQcm94eSA/IC0xIDogMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbGxvd1kpIHtcbiAgICAgICAgICAgICAgc25hcFkgPSBidWlsZFNuYXBGdW5jKHNuYXBJc1JhdyA/IHNuYXAgOiBzbmFwLnkgfHwgc25hcC50b3AgfHwgc25hcC5zY3JvbGxUb3AsIG1pblksIG1heFksIHNjcm9sbFByb3h5ID8gLTEgOiAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgICAgICBvblRocm93Q29tcGxldGUgPSBmdW5jdGlvbiBvblRocm93Q29tcGxldGUoKSB7XG4gICAgICBzZWxmLmlzVGhyb3dpbmcgPSBmYWxzZTtcblxuICAgICAgX2Rpc3BhdGNoRXZlbnQoc2VsZiwgXCJ0aHJvd2NvbXBsZXRlXCIsIFwib25UaHJvd0NvbXBsZXRlXCIpO1xuICAgIH0sXG4gICAgICAgIG9uVGhyb3dJbnRlcnJ1cHQgPSBmdW5jdGlvbiBvblRocm93SW50ZXJydXB0KCkge1xuICAgICAgc2VsZi5pc1Rocm93aW5nID0gZmFsc2U7XG4gICAgfSxcbiAgICAgICAgYW5pbWF0ZSA9IGZ1bmN0aW9uIGFuaW1hdGUoaW5lcnRpYSwgZm9yY2VaZXJvVmVsb2NpdHkpIHtcbiAgICAgIHZhciBzbmFwLCBzbmFwSXNSYXcsIHR3ZWVuLCBvdmVyc2hvb3RUb2xlcmFuY2U7XG5cbiAgICAgIGlmIChpbmVydGlhICYmIEluZXJ0aWFQbHVnaW4pIHtcbiAgICAgICAgaWYgKGluZXJ0aWEgPT09IHRydWUpIHtcbiAgICAgICAgICBzbmFwID0gdmFycy5zbmFwIHx8IHZhcnMubGl2ZVNuYXAgfHwge307XG4gICAgICAgICAgc25hcElzUmF3ID0gX2lzQXJyYXkoc25hcCkgfHwgX2lzRnVuY3Rpb24oc25hcCk7XG4gICAgICAgICAgaW5lcnRpYSA9IHtcbiAgICAgICAgICAgIHJlc2lzdGFuY2U6ICh2YXJzLnRocm93UmVzaXN0YW5jZSB8fCB2YXJzLnJlc2lzdGFuY2UgfHwgMTAwMCkgLyAocm90YXRpb25Nb2RlID8gMTAgOiAxKVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAocm90YXRpb25Nb2RlKSB7XG4gICAgICAgICAgICBpbmVydGlhLnJvdGF0aW9uID0gX3BhcnNlSW5lcnRpYShzZWxmLCBzbmFwSXNSYXcgPyBzbmFwIDogc25hcC5yb3RhdGlvbiwgbWF4WCwgbWluWCwgMSwgZm9yY2VaZXJvVmVsb2NpdHkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWxsb3dYKSB7XG4gICAgICAgICAgICAgIGluZXJ0aWFbeFByb3BdID0gX3BhcnNlSW5lcnRpYShzZWxmLCBzbmFwSXNSYXcgPyBzbmFwIDogc25hcC5wb2ludHMgfHwgc25hcC54IHx8IHNuYXAubGVmdCwgbWF4WCwgbWluWCwgc2Nyb2xsUHJveHkgPyAtMSA6IDEsIGZvcmNlWmVyb1ZlbG9jaXR5IHx8IHNlbGYubG9ja2VkQXhpcyA9PT0gXCJ4XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWxsb3dZKSB7XG4gICAgICAgICAgICAgIGluZXJ0aWFbeVByb3BdID0gX3BhcnNlSW5lcnRpYShzZWxmLCBzbmFwSXNSYXcgPyBzbmFwIDogc25hcC5wb2ludHMgfHwgc25hcC55IHx8IHNuYXAudG9wLCBtYXhZLCBtaW5ZLCBzY3JvbGxQcm94eSA/IC0xIDogMSwgZm9yY2VaZXJvVmVsb2NpdHkgfHwgc2VsZi5sb2NrZWRBeGlzID09PSBcInlcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzbmFwLnBvaW50cyB8fCBfaXNBcnJheShzbmFwKSAmJiBfaXNPYmplY3Qoc25hcFswXSkpIHtcbiAgICAgICAgICAgICAgaW5lcnRpYS5saW5rZWRQcm9wcyA9IHhQcm9wICsgXCIsXCIgKyB5UHJvcDtcbiAgICAgICAgICAgICAgaW5lcnRpYS5yYWRpdXMgPSBzbmFwLnJhZGl1czsgLy9ub3RlOiB3ZSBhbHNvIGRpc2FibGUgbGl2ZVNuYXBwaW5nIHdoaWxlIHRocm93aW5nIGlmIHRoZXJlJ3MgYSBcInJhZGl1c1wiIGRlZmluZWQsIG90aGVyd2lzZSBpdCBsb29rcyB3ZWlyZCB0byBoYXZlIHRoZSBpdGVtIHRocm93biBwYXN0IGEgc25hcHBpbmcgcG9pbnQgYnV0IGxpdmUtc25hcHBpbmcgbWlkLXR3ZWVuLiBXZSBkbyB0aGlzIGJ5IGFsdGVyaW5nIHRoZSBvblVwZGF0ZVBhcmFtcyBzbyB0aGF0IFwic2tpcFNuYXBcIiBwYXJhbWV0ZXIgaXMgdHJ1ZSBmb3Igc3luY1hZLlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuaXNUaHJvd2luZyA9IHRydWU7XG4gICAgICAgIG92ZXJzaG9vdFRvbGVyYW5jZSA9ICFpc05hTih2YXJzLm92ZXJzaG9vdFRvbGVyYW5jZSkgPyB2YXJzLm92ZXJzaG9vdFRvbGVyYW5jZSA6IHZhcnMuZWRnZVJlc2lzdGFuY2UgPT09IDEgPyAwIDogMSAtIHNlbGYuZWRnZVJlc2lzdGFuY2UgKyAwLjI7XG5cbiAgICAgICAgaWYgKCFpbmVydGlhLmR1cmF0aW9uKSB7XG4gICAgICAgICAgaW5lcnRpYS5kdXJhdGlvbiA9IHtcbiAgICAgICAgICAgIG1heDogTWF0aC5tYXgodmFycy5taW5EdXJhdGlvbiB8fCAwLCBcIm1heER1cmF0aW9uXCIgaW4gdmFycyA/IHZhcnMubWF4RHVyYXRpb24gOiAyKSxcbiAgICAgICAgICAgIG1pbjogIWlzTmFOKHZhcnMubWluRHVyYXRpb24pID8gdmFycy5taW5EdXJhdGlvbiA6IG92ZXJzaG9vdFRvbGVyYW5jZSA9PT0gMCB8fCBfaXNPYmplY3QoaW5lcnRpYSkgJiYgaW5lcnRpYS5yZXNpc3RhbmNlID4gMTAwMCA/IDAgOiAwLjUsXG4gICAgICAgICAgICBvdmVyc2hvb3Q6IG92ZXJzaG9vdFRvbGVyYW5jZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnR3ZWVuID0gdHdlZW4gPSBnc2FwLnRvKHNjcm9sbFByb3h5IHx8IHRhcmdldCwge1xuICAgICAgICAgIGluZXJ0aWE6IGluZXJ0aWEsXG4gICAgICAgICAgZGF0YTogXCJfZHJhZ2dhYmxlXCIsXG4gICAgICAgICAgb25Db21wbGV0ZTogb25UaHJvd0NvbXBsZXRlLFxuICAgICAgICAgIG9uSW50ZXJydXB0OiBvblRocm93SW50ZXJydXB0LFxuICAgICAgICAgIG9uVXBkYXRlOiB2YXJzLmZhc3RNb2RlID8gX2Rpc3BhdGNoRXZlbnQgOiBzeW5jWFksXG4gICAgICAgICAgb25VcGRhdGVQYXJhbXM6IHZhcnMuZmFzdE1vZGUgPyBbc2VsZiwgXCJvbnRocm93dXBkYXRlXCIsIFwib25UaHJvd1VwZGF0ZVwiXSA6IHNuYXAgJiYgc25hcC5yYWRpdXMgPyBbZmFsc2UsIHRydWVdIDogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCF2YXJzLmZhc3RNb2RlKSB7XG4gICAgICAgICAgaWYgKHNjcm9sbFByb3h5KSB7XG4gICAgICAgICAgICBzY3JvbGxQcm94eS5fc2tpcCA9IHRydWU7IC8vIE1pY3Jvc29mdCBicm93c2VycyBoYXZlIGEgYnVnIHRoYXQgY2F1c2VzIHRoZW0gdG8gYnJpZWZseSByZW5kZXIgdGhlIHBvc2l0aW9uIGluY29ycmVjdGx5IChpdCBmbGFzaGVzIHRvIHRoZSBlbmQgc3RhdGUgd2hlbiB3ZSBzZWVrKCkgdGhlIHR3ZWVuIGV2ZW4gdGhvdWdoIHdlIGp1bXAgcmlnaHQgYmFjayB0byB0aGUgY3VycmVudCBwb3NpdGlvbiwgYW5kIHRoaXMgb25seSBzZWVtcyB0byBoYXBwZW4gd2hlbiB3ZSdyZSBhZmZlY3RpbmcgYm90aCB0b3AgYW5kIGxlZnQpLCBzbyB3ZSBzZXQgYSBfc3VzcGVuZFRyYW5zZm9ybXMgZmxhZyB0byBwcmV2ZW50IGl0IGZyb20gYWN0dWFsbHkgYXBwbHlpbmcgdGhlIHZhbHVlcyBpbiB0aGUgU2Nyb2xsUHJveHkuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHdlZW4ucmVuZGVyKDFlOSwgdHJ1ZSwgdHJ1ZSk7IC8vIGZvcmNlIHRvIHRoZSBlbmQuIFJlbWVtYmVyLCB0aGUgZHVyYXRpb24gd2lsbCBsaWtlbHkgY2hhbmdlIHVwb24gaW5pdHRpbmcgYmVjYXVzZSB0aGF0J3Mgd2hlbiBJbmVydGlhUGx1Z2luIGNhbGN1bGF0ZXMgaXQuXG5cbiAgICAgICAgICBzeW5jWFkodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgc2VsZi5lbmRYID0gc2VsZi54O1xuICAgICAgICAgIHNlbGYuZW5kWSA9IHNlbGYueTtcblxuICAgICAgICAgIGlmIChyb3RhdGlvbk1vZGUpIHtcbiAgICAgICAgICAgIHNlbGYuZW5kUm90YXRpb24gPSBzZWxmLng7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHdlZW4ucGxheSgwKTtcbiAgICAgICAgICBzeW5jWFkodHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgICBpZiAoc2Nyb2xsUHJveHkpIHtcbiAgICAgICAgICAgIHNjcm9sbFByb3h5Ll9za2lwID0gZmFsc2U7IC8vTWljcm9zb2Z0IGJyb3dzZXJzIGhhdmUgYSBidWcgdGhhdCBjYXVzZXMgdGhlbSB0byBicmllZmx5IHJlbmRlciB0aGUgcG9zaXRpb24gaW5jb3JyZWN0bHkgKGl0IGZsYXNoZXMgdG8gdGhlIGVuZCBzdGF0ZSB3aGVuIHdlIHNlZWsoKSB0aGUgdHdlZW4gZXZlbiB0aG91Z2ggd2UganVtcCByaWdodCBiYWNrIHRvIHRoZSBjdXJyZW50IHBvc2l0aW9uLCBhbmQgdGhpcyBvbmx5IHNlZW1zIHRvIGhhcHBlbiB3aGVuIHdlJ3JlIGFmZmVjdGluZyBib3RoIHRvcCBhbmQgbGVmdCksIHNvIHdlIHNldCBhIF9zdXNwZW5kVHJhbnNmb3JtcyBmbGFnIHRvIHByZXZlbnQgaXQgZnJvbSBhY3R1YWxseSBhcHBseWluZyB0aGUgdmFsdWVzIGluIHRoZSBTY3JvbGxQcm94eS5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaGFzQm91bmRzKSB7XG4gICAgICAgIHNlbGYuYXBwbHlCb3VuZHMoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgICAgICB1cGRhdGVNYXRyaXggPSBmdW5jdGlvbiB1cGRhdGVNYXRyaXgoc2hpZnRTdGFydCkge1xuICAgICAgdmFyIHN0YXJ0ID0gbWF0cml4LFxuICAgICAgICAgIHA7XG4gICAgICBtYXRyaXggPSBnZXRHbG9iYWxNYXRyaXgodGFyZ2V0LnBhcmVudE5vZGUsIHRydWUpO1xuXG4gICAgICBpZiAoc2hpZnRTdGFydCAmJiBzZWxmLmlzUHJlc3NlZCAmJiAhbWF0cml4LmVxdWFscyhzdGFydCB8fCBuZXcgTWF0cml4MkQoKSkpIHtcbiAgICAgICAgLy9pZiB0aGUgbWF0cml4IGNoYW5nZXMgV0hJTEUgdGhlIGVsZW1lbnQgaXMgcHJlc3NlZCwgd2UgbXVzdCBhZGp1c3QgdGhlIHN0YXJ0UG9pbnRlclggYW5kIHN0YXJ0UG9pbnRlclkgYWNjb3JkaW5nbHksIHNvIHdlIGludmVydCB0aGUgb3JpZ2luYWwgbWF0cml4IGFuZCBmaWd1cmUgb3V0IHdoZXJlIHRoZSBwb2ludGVyWCBhbmQgcG9pbnRlclkgd2VyZSBpbiB0aGUgZ2xvYmFsIHNwYWNlLCB0aGVuIGFwcGx5IHRoZSBuZXcgbWF0cml4IHRvIGdldCB0aGUgdXBkYXRlZCBjb29yZGluYXRlcy5cbiAgICAgICAgcCA9IHN0YXJ0LmludmVyc2UoKS5hcHBseSh7XG4gICAgICAgICAgeDogc3RhcnRQb2ludGVyWCxcbiAgICAgICAgICB5OiBzdGFydFBvaW50ZXJZXG4gICAgICAgIH0pO1xuICAgICAgICBtYXRyaXguYXBwbHkocCwgcCk7XG4gICAgICAgIHN0YXJ0UG9pbnRlclggPSBwLng7XG4gICAgICAgIHN0YXJ0UG9pbnRlclkgPSBwLnk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXRyaXguZXF1YWxzKF9pZGVudGl0eU1hdHJpeCkpIHtcbiAgICAgICAgLy9pZiB0aGVyZSBhcmUgbm8gdHJhbnNmb3Jtcywgd2UgY2FuIG9wdGltaXplIHBlcmZvcm1hbmNlIGJ5IG5vdCBmYWN0b3JpbmcgaW4gdGhlIG1hdHJpeFxuICAgICAgICBtYXRyaXggPSBudWxsO1xuICAgICAgfVxuICAgIH0sXG4gICAgICAgIHJlY29yZFN0YXJ0UG9zaXRpb25zID0gZnVuY3Rpb24gcmVjb3JkU3RhcnRQb3NpdGlvbnMoKSB7XG4gICAgICB2YXIgZWRnZVRvbGVyYW5jZSA9IDEgLSBzZWxmLmVkZ2VSZXNpc3RhbmNlLFxuICAgICAgICAgIG9mZnNldFggPSBpc0ZpeGVkID8gX2dldERvY1Njcm9sbExlZnQob3duZXJEb2MpIDogMCxcbiAgICAgICAgICBvZmZzZXRZID0gaXNGaXhlZCA/IF9nZXREb2NTY3JvbGxUb3Aob3duZXJEb2MpIDogMCxcbiAgICAgICAgICBwYXJzZWRPcmlnaW4sXG4gICAgICAgICAgeCxcbiAgICAgICAgICB5O1xuICAgICAgdXBkYXRlTWF0cml4KGZhbHNlKTtcblxuICAgICAgaWYgKG1hdHJpeCkge1xuICAgICAgICBfcG9pbnQxLnggPSBzZWxmLnBvaW50ZXJYIC0gb2Zmc2V0WDtcbiAgICAgICAgX3BvaW50MS55ID0gc2VsZi5wb2ludGVyWSAtIG9mZnNldFk7XG4gICAgICAgIG1hdHJpeC5hcHBseShfcG9pbnQxLCBfcG9pbnQxKTtcbiAgICAgICAgc3RhcnRQb2ludGVyWCA9IF9wb2ludDEueDsgLy90cmFuc2xhdGUgdG8gbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW1cblxuICAgICAgICBzdGFydFBvaW50ZXJZID0gX3BvaW50MS55O1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlydHkpIHtcbiAgICAgICAgc2V0UG9pbnRlclBvc2l0aW9uKHNlbGYucG9pbnRlclgsIHNlbGYucG9pbnRlclkpO1xuICAgICAgICByZW5kZXIodHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxQcm94eSkge1xuICAgICAgICBjYWxjdWxhdGVCb3VuZHMoKTtcbiAgICAgICAgc3RhcnRFbGVtZW50WSA9IHNjcm9sbFByb3h5LnRvcCgpO1xuICAgICAgICBzdGFydEVsZW1lbnRYID0gc2Nyb2xsUHJveHkubGVmdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9pZiB0aGUgZWxlbWVudCBpcyBpbiB0aGUgcHJvY2VzcyBvZiB0d2VlbmluZywgZG9uJ3QgZm9yY2Ugc25hcHBpbmcgdG8gb2NjdXIgYmVjYXVzZSBpdCBjb3VsZCBtYWtlIGl0IGp1bXAuIEltYWdpbmUgdGhlIHVzZXIgdGhyb3dpbmcsIHRoZW4gYmVmb3JlIGl0J3MgZG9uZSwgY2xpY2tpbmcgb24gdGhlIGVsZW1lbnQgaW4gaXRzIGluYmV0d2VlbiBzdGF0ZS5cbiAgICAgICAgaWYgKGlzVHdlZW5pbmcoKSkge1xuICAgICAgICAgIHN5bmNYWSh0cnVlLCB0cnVlKTtcbiAgICAgICAgICBjYWxjdWxhdGVCb3VuZHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLmFwcGx5Qm91bmRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm90YXRpb25Nb2RlKSB7XG4gICAgICAgICAgcGFyc2VkT3JpZ2luID0gdGFyZ2V0Lm93bmVyU1ZHRWxlbWVudCA/IFtnc0NhY2hlLnhPcmlnaW4gLSB0YXJnZXQuZ2V0QkJveCgpLngsIGdzQ2FjaGUueU9yaWdpbiAtIHRhcmdldC5nZXRCQm94KCkueV0gOiAoX2dldENvbXB1dGVkU3R5bGUodGFyZ2V0KVtfdHJhbnNmb3JtT3JpZ2luUHJvcF0gfHwgXCIwIDBcIikuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgIHJvdGF0aW9uT3JpZ2luID0gc2VsZi5yb3RhdGlvbk9yaWdpbiA9IGdldEdsb2JhbE1hdHJpeCh0YXJnZXQpLmFwcGx5KHtcbiAgICAgICAgICAgIHg6IHBhcnNlRmxvYXQocGFyc2VkT3JpZ2luWzBdKSB8fCAwLFxuICAgICAgICAgICAgeTogcGFyc2VGbG9hdChwYXJzZWRPcmlnaW5bMV0pIHx8IDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzeW5jWFkodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgeCA9IHNlbGYucG9pbnRlclggLSByb3RhdGlvbk9yaWdpbi54IC0gb2Zmc2V0WDtcbiAgICAgICAgICB5ID0gcm90YXRpb25PcmlnaW4ueSAtIHNlbGYucG9pbnRlclkgKyBvZmZzZXRZO1xuICAgICAgICAgIHN0YXJ0RWxlbWVudFggPSBzZWxmLng7IC8vc3RhcnRpbmcgcm90YXRpb24gKHggYWx3YXlzIHJlZmVycyB0byByb3RhdGlvbiBpbiB0eXBlOlwicm90YXRpb25cIiwgbWVhc3VyZWQgaW4gZGVncmVlcylcblxuICAgICAgICAgIHN0YXJ0RWxlbWVudFkgPSBzZWxmLnkgPSBNYXRoLmF0YW4yKHksIHgpICogX1JBRDJERUc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy9wYXJlbnQgPSAhaXNGaXhlZCAmJiB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAvL3N0YXJ0U2Nyb2xsVG9wID0gcGFyZW50ID8gcGFyZW50LnNjcm9sbFRvcCB8fCAwIDogMDtcbiAgICAgICAgICAvL3N0YXJ0U2Nyb2xsTGVmdCA9IHBhcmVudCA/IHBhcmVudC5zY3JvbGxMZWZ0IHx8IDAgOiAwO1xuICAgICAgICAgIHN0YXJ0RWxlbWVudFkgPSBnZXRQcm9wQXNOdW0oeVByb3AsIFwicHhcIik7IC8vcmVjb3JkIHRoZSBzdGFydGluZyB0b3AgYW5kIGxlZnQgdmFsdWVzIHNvIHRoYXQgd2UgY2FuIGp1c3QgYWRkIHRoZSBtb3VzZSdzIG1vdmVtZW50IHRvIHRoZW0gbGF0ZXIuXG5cbiAgICAgICAgICBzdGFydEVsZW1lbnRYID0gZ2V0UHJvcEFzTnVtKHhQcm9wLCBcInB4XCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNCb3VuZHMgJiYgZWRnZVRvbGVyYW5jZSkge1xuICAgICAgICBpZiAoc3RhcnRFbGVtZW50WCA+IG1heFgpIHtcbiAgICAgICAgICBzdGFydEVsZW1lbnRYID0gbWF4WCArIChzdGFydEVsZW1lbnRYIC0gbWF4WCkgLyBlZGdlVG9sZXJhbmNlO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0RWxlbWVudFggPCBtaW5YKSB7XG4gICAgICAgICAgc3RhcnRFbGVtZW50WCA9IG1pblggLSAobWluWCAtIHN0YXJ0RWxlbWVudFgpIC8gZWRnZVRvbGVyYW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcm90YXRpb25Nb2RlKSB7XG4gICAgICAgICAgaWYgKHN0YXJ0RWxlbWVudFkgPiBtYXhZKSB7XG4gICAgICAgICAgICBzdGFydEVsZW1lbnRZID0gbWF4WSArIChzdGFydEVsZW1lbnRZIC0gbWF4WSkgLyBlZGdlVG9sZXJhbmNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRFbGVtZW50WSA8IG1pblkpIHtcbiAgICAgICAgICAgIHN0YXJ0RWxlbWVudFkgPSBtaW5ZIC0gKG1pblkgLSBzdGFydEVsZW1lbnRZKSAvIGVkZ2VUb2xlcmFuY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGYuc3RhcnRYID0gc3RhcnRFbGVtZW50WDtcbiAgICAgIHNlbGYuc3RhcnRZID0gc3RhcnRFbGVtZW50WTtcbiAgICB9LFxuICAgICAgICBpc1R3ZWVuaW5nID0gZnVuY3Rpb24gaXNUd2VlbmluZygpIHtcbiAgICAgIHJldHVybiBzZWxmLnR3ZWVuICYmIHNlbGYudHdlZW4uaXNBY3RpdmUoKTtcbiAgICB9LFxuICAgICAgICByZW1vdmVQbGFjZWhvbGRlciA9IGZ1bmN0aW9uIHJlbW92ZVBsYWNlaG9sZGVyKCkge1xuICAgICAgaWYgKF9wbGFjZWhvbGRlckRpdi5wYXJlbnROb2RlICYmICFpc1R3ZWVuaW5nKCkgJiYgIXNlbGYuaXNEcmFnZ2luZykge1xuICAgICAgICAvL19wbGFjZWhvbGRlckRpdiBqdXN0IHByb3BzIG9wZW4gYXV0by1zY3JvbGxpbmcgY29udGFpbmVycyBzbyB0aGV5IGRvbid0IGNvbGxhcHNlIGFzIHRoZSB1c2VyIGRyYWdzIGxlZnQvdXAuIFdlIHJlbW92ZSBpdCBhZnRlciBkcmFnZ2luZyAoYW5kIHRocm93aW5nLCBpZiBuZWNlc3NhcnkpIGZpbmlzaGVzLlxuICAgICAgICBfcGxhY2Vob2xkZXJEaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfcGxhY2Vob2xkZXJEaXYpO1xuICAgICAgfVxuICAgIH0sXG4gICAgICAgIC8vY2FsbGVkIHdoZW4gdGhlIG1vdXNlIGlzIHByZXNzZWQgKG9yIHRvdWNoIHN0YXJ0cylcbiAgICBvblByZXNzID0gZnVuY3Rpb24gb25QcmVzcyhlLCBmb3JjZSkge1xuICAgICAgdmFyIGk7XG5cbiAgICAgIGlmICghZW5hYmxlZCB8fCBzZWxmLmlzUHJlc3NlZCB8fCAhZSB8fCAoZS50eXBlID09PSBcIm1vdXNlZG93blwiIHx8IGUudHlwZSA9PT0gXCJwb2ludGVyZG93blwiKSAmJiAhZm9yY2UgJiYgX2dldFRpbWUoKSAtIGNsaWNrVGltZSA8IDMwICYmIF90b3VjaEV2ZW50TG9va3VwW3NlbGYucG9pbnRlckV2ZW50LnR5cGVdKSB7XG4gICAgICAgIC8vd2hlbiB3ZSBET04nVCBwcmV2ZW50RGVmYXVsdCgpIGluIG9yZGVyIHRvIGFjY29tbW9kYXRlIHRvdWNoLXNjcm9sbGluZyBhbmQgdGhlIHVzZXIganVzdCB0YXBzLCBtYW55IGJyb3dzZXJzIGFsc28gZmlyZSBhIG1vdXNlZG93bi9tb3VzZXVwIHNlcXVlbmNlIEFGVEVSIHRoZSB0b3VjaHN0YXJ0L3RvdWNoZW5kIHNlcXVlbmNlLCB0aHVzIGl0J2QgcmVzdWx0IGluIHR3byBxdWljayBcImNsaWNrXCIgZXZlbnRzIGJlaW5nIGRpc3BhdGNoZWQuIFRoaXMgbGluZSBzZW5zZXMgdGhhdCBjb25kaXRpb24gYW5kIGhhbHRzIGl0IG9uIHRoZSBzdWJzZXF1ZW50IG1vdXNlZG93bi5cbiAgICAgICAgaXNQcmV2ZW50aW5nRGVmYXVsdCAmJiBlICYmIGVuYWJsZWQgJiYgX3ByZXZlbnREZWZhdWx0KGUpOyAvLyBpbiBzb21lIGJyb3dzZXJzLCB3ZSBtdXN0IGxpc3RlbiBmb3IgbXVsdGlwbGUgZXZlbnQgdHlwZXMgbGlrZSB0b3VjaHN0YXJ0LCBwb2ludGVyZG93biwgbW91c2Vkb3duLiBUaGUgZmlyc3QgdGltZSB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCwgd2UgcmVjb3JkIHdoZXRoZXIgb3Igbm90IHdlIF9wcmV2ZW50RGVmYXVsdCgpIHNvIHRoYXQgb24gZHVwbGljYXRlIGNhbGxzLCB3ZSBjYW4gZG8gdGhlIHNhbWUgaWYgbmVjZXNzYXJ5LlxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaW50ZXJydXB0ZWQgPSBpc1R3ZWVuaW5nKCk7XG4gICAgICBzZWxmLnBvaW50ZXJFdmVudCA9IGU7XG5cbiAgICAgIGlmIChfdG91Y2hFdmVudExvb2t1cFtlLnR5cGVdKSB7XG4gICAgICAgIC8vbm90ZTogb24gaU9TLCBCT1RIIHRvdWNobW92ZSBhbmQgbW91c2Vtb3ZlIGFyZSBkaXNwYXRjaGVkLCBidXQgdGhlIG1vdXNlbW92ZSBoYXMgcGFnZVkgYW5kIHBhZ2VYIG9mIDAgd2hpY2ggd291bGQgbWVzcyB1cCB0aGUgY2FsY3VsYXRpb25zIGFuZCBuZWVkbGVzc2x5IGh1cnQgcGVyZm9ybWFuY2UuXG4gICAgICAgIHRvdWNoRXZlbnRUYXJnZXQgPSB+ZS50eXBlLmluZGV4T2YoXCJ0b3VjaFwiKSA/IGUuY3VycmVudFRhcmdldCB8fCBlLnRhcmdldCA6IG93bmVyRG9jOyAvL3BvaW50ZXItYmFzZWQgdG91Y2hlcyAoZm9yIE1pY3Jvc29mdCBicm93c2VycykgZG9uJ3QgcmVtYWluIGxvY2tlZCB0byB0aGUgb3JpZ2luYWwgdGFyZ2V0IGxpa2Ugb3RoZXIgYnJvd3NlcnMsIHNvIHdlIG11c3QgdXNlIHRoZSBkb2N1bWVudCBpbnN0ZWFkLiBUaGUgZXZlbnQgdHlwZSB3b3VsZCBiZSBcIk1TUG9pbnRlckRvd25cIiBvciBcInBvaW50ZXJkb3duXCIuXG5cbiAgICAgICAgX2FkZExpc3RlbmVyKHRvdWNoRXZlbnRUYXJnZXQsIFwidG91Y2hlbmRcIiwgb25SZWxlYXNlKTtcblxuICAgICAgICBfYWRkTGlzdGVuZXIodG91Y2hFdmVudFRhcmdldCwgXCJ0b3VjaG1vdmVcIiwgb25Nb3ZlKTtcblxuICAgICAgICBfYWRkTGlzdGVuZXIodG91Y2hFdmVudFRhcmdldCwgXCJ0b3VjaGNhbmNlbFwiLCBvblJlbGVhc2UpO1xuXG4gICAgICAgIF9hZGRMaXN0ZW5lcihvd25lckRvYywgXCJ0b3VjaHN0YXJ0XCIsIF9vbk11bHRpVG91Y2hEb2N1bWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b3VjaEV2ZW50VGFyZ2V0ID0gbnVsbDtcblxuICAgICAgICBfYWRkTGlzdGVuZXIob3duZXJEb2MsIFwibW91c2Vtb3ZlXCIsIG9uTW92ZSk7IC8vYXR0YWNoIHRoZXNlIHRvIHRoZSBkb2N1bWVudCBpbnN0ZWFkIG9mIHRoZSBib3ggaXRzZWxmIHNvIHRoYXQgaWYgdGhlIHVzZXIncyBtb3VzZSBtb3ZlcyB0b28gcXVpY2tseSAoYW5kIG9mZiBvZiB0aGUgYm94KSwgdGhpbmdzIHN0aWxsIHdvcmsuXG5cbiAgICAgIH1cblxuICAgICAgdG91Y2hEcmFnQXhpcyA9IG51bGw7XG5cbiAgICAgIGlmICghX3N1cHBvcnRzUG9pbnRlciB8fCAhdG91Y2hFdmVudFRhcmdldCkge1xuICAgICAgICBfYWRkTGlzdGVuZXIob3duZXJEb2MsIFwibW91c2V1cFwiLCBvblJlbGVhc2UpO1xuXG4gICAgICAgIGlmIChlICYmIGUudGFyZ2V0KSB7XG4gICAgICAgICAgX2FkZExpc3RlbmVyKGUudGFyZ2V0LCBcIm1vdXNldXBcIiwgb25SZWxlYXNlKTsgLy93ZSBhbHNvIGhhdmUgdG8gbGlzdGVuIGRpcmVjdGx5IG9uIHRoZSBlbGVtZW50IGJlY2F1c2Ugc29tZSBicm93c2VycyBkb24ndCBidWJibGUgdXAgdGhlIGV2ZW50IHRvIHRoZSBfZG9jIG9uIGVsZW1lbnRzIHdpdGggY29udGVudEVkaXRhYmxlPVwidHJ1ZVwiXG5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpc0NsaWNraW5nID0gaXNDbGlja2FibGUuY2FsbChzZWxmLCBlLnRhcmdldCkgJiYgdmFycy5kcmFnQ2xpY2thYmxlcyA9PT0gZmFsc2UgJiYgIWZvcmNlO1xuXG4gICAgICBpZiAoaXNDbGlja2luZykge1xuICAgICAgICBfYWRkTGlzdGVuZXIoZS50YXJnZXQsIFwiY2hhbmdlXCIsIG9uUmVsZWFzZSk7IC8vaW4gc29tZSBicm93c2Vycywgd2hlbiB5b3UgbW91c2Vkb3duIG9uIGEgPHNlbGVjdD4gZWxlbWVudCwgbm8gbW91c2V1cCBnZXRzIGRpc3BhdGNoZWQhIFNvIHdlIGxpc3RlbiBmb3IgYSBcImNoYW5nZVwiIGV2ZW50IGluc3RlYWQuXG5cblxuICAgICAgICBfZGlzcGF0Y2hFdmVudChzZWxmLCBcInByZXNzSW5pdFwiLCBcIm9uUHJlc3NJbml0XCIpO1xuXG4gICAgICAgIF9kaXNwYXRjaEV2ZW50KHNlbGYsIFwicHJlc3NcIiwgXCJvblByZXNzXCIpO1xuXG4gICAgICAgIF9zZXRTZWxlY3RhYmxlKHRyaWdnZXJzLCB0cnVlKTsgLy9hY2NvbW1vZGF0ZXMgdGhpbmdzIGxpa2UgaW5wdXRzIGFuZCBlbGVtZW50cyB3aXRoIGNvbnRlbnRFZGl0YWJsZT1cInRydWVcIiAob3RoZXJ3aXNlIHVzZXIgY291bGRuJ3QgZHJhZyB0byBzZWxlY3QgdGV4dClcblxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYWxsb3dOYXRpdmVUb3VjaFNjcm9sbGluZyA9ICF0b3VjaEV2ZW50VGFyZ2V0IHx8IGFsbG93WCA9PT0gYWxsb3dZIHx8IHNlbGYudmFycy5hbGxvd05hdGl2ZVRvdWNoU2Nyb2xsaW5nID09PSBmYWxzZSB8fCBzZWxmLnZhcnMuYWxsb3dDb250ZXh0TWVudSAmJiBlICYmIChlLmN0cmxLZXkgfHwgZS53aGljaCA+IDIpID8gZmFsc2UgOiBhbGxvd1ggPyBcInlcIiA6IFwieFwiOyAvL25vdGU6IGluIENocm9tZSwgcmlnaHQtY2xpY2tpbmcgKGZvciBhIGNvbnRleHQgbWVudSkgZmlyZXMgb25QcmVzcyBhbmQgaXQgZG9lc24ndCBoYXZlIHRoZSBldmVudC53aGljaCBzZXQgcHJvcGVybHksIHNvIHdlIG11c3QgbG9vayBmb3IgZXZlbnQuY3RybEtleS4gSWYgdGhlIHVzZXIgd2FudHMgdG8gYWxsb3cgY29udGV4dCBtZW51cyB3ZSBzaG91bGQgb2YgY291cnNlIHNlbnNlIGl0IGhlcmUgYW5kIG5vdCBhbGxvdyBuYXRpdmUgdG91Y2ggc2Nyb2xsaW5nLlxuXG4gICAgICBpc1ByZXZlbnRpbmdEZWZhdWx0ID0gIWFsbG93TmF0aXZlVG91Y2hTY3JvbGxpbmcgJiYgIXNlbGYuYWxsb3dFdmVudERlZmF1bHQ7XG5cbiAgICAgIGlmIChpc1ByZXZlbnRpbmdEZWZhdWx0KSB7XG4gICAgICAgIF9wcmV2ZW50RGVmYXVsdChlKTtcblxuICAgICAgICBfYWRkTGlzdGVuZXIoX3dpbiwgXCJ0b3VjaGZvcmNlY2hhbmdlXCIsIF9wcmV2ZW50RGVmYXVsdCk7IC8vd29ya3MgYXJvdW5kIHNhZmFyaSBidWc6IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjE0NTAtZHJhZ2dhYmxlLWluLWlmcmFtZS1vbi1tb2JpbGUtaXMtYnVnZ3kvXG5cbiAgICAgIH1cblxuICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgICAgLy90b3VjaCBldmVudHMgc3RvcmUgdGhlIGRhdGEgc2xpZ2h0bHkgZGlmZmVyZW50bHlcbiAgICAgICAgZSA9IHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgdG91Y2hJRCA9IGUuaWRlbnRpZmllcjtcbiAgICAgIH0gZWxzZSBpZiAoZS5wb2ludGVySWQpIHtcbiAgICAgICAgdG91Y2hJRCA9IGUucG9pbnRlcklkOyAvL2ZvciBzb21lIE1pY3Jvc29mdCBicm93c2Vyc1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG91Y2ggPSB0b3VjaElEID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgX2RyYWdDb3VudCsrO1xuXG4gICAgICBfYWRkVG9SZW5kZXJRdWV1ZShyZW5kZXIpOyAvL2NhdXNlcyB0aGUgRHJhZ2dhYmxlIHRvIHJlbmRlciBvbiBlYWNoIFwidGlja1wiIG9mIFR3ZWVuTGl0ZS50aWNrZXIgKHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbiAtIHVwZGF0aW5nIHZhbHVlcyBpbiBhIG1vdXNlbW92ZSBjYW4gY2F1c2UgdGhlbSB0byBoYXBwZW4gdG9vIGZyZXF1ZW50bHksIGxpa2UgbXVsdGlwbGUgdGltZXMgYmV0d2VlbiBmcmFtZSByZWRyYXdzIHdoaWNoIGlzIHdhc3RlZnVsLCBhbmQgaXQgYWxzbyBwcmV2ZW50cyB2YWx1ZXMgZnJvbSB1cGRhdGluZyBwcm9wZXJseSBpbiBJRTgpXG5cblxuICAgICAgc3RhcnRQb2ludGVyWSA9IHNlbGYucG9pbnRlclkgPSBlLnBhZ2VZOyAvL3JlY29yZCB0aGUgc3RhcnRpbmcgeCBhbmQgeSBzbyB0aGF0IHdlIGNhbiBjYWxjdWxhdGUgdGhlIG1vdmVtZW50IGZyb20gdGhlIG9yaWdpbmFsIGluIF9vbk1vdXNlTW92ZVxuXG4gICAgICBzdGFydFBvaW50ZXJYID0gc2VsZi5wb2ludGVyWCA9IGUucGFnZVg7XG5cbiAgICAgIF9kaXNwYXRjaEV2ZW50KHNlbGYsIFwicHJlc3NJbml0XCIsIFwib25QcmVzc0luaXRcIik7XG5cbiAgICAgIGlmIChhbGxvd05hdGl2ZVRvdWNoU2Nyb2xsaW5nIHx8IHNlbGYuYXV0b1Njcm9sbCkge1xuICAgICAgICBfcmVjb3JkTWF4U2Nyb2xscyh0YXJnZXQucGFyZW50Tm9kZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQucGFyZW50Tm9kZSAmJiBzZWxmLmF1dG9TY3JvbGwgJiYgIXNjcm9sbFByb3h5ICYmICFyb3RhdGlvbk1vZGUgJiYgdGFyZ2V0LnBhcmVudE5vZGUuX2dzTWF4U2Nyb2xsWCAmJiAhX3BsYWNlaG9sZGVyRGl2LnBhcmVudE5vZGUgJiYgIXRhcmdldC5nZXRCQm94KSB7XG4gICAgICAgIC8vYWRkIGEgcGxhY2Vob2xkZXIgZGl2IHRvIHByZXZlbnQgdGhlIHBhcmVudCBjb250YWluZXIgZnJvbSBjb2xsYXBzaW5nIHdoZW4gdGhlIHVzZXIgZHJhZ3MgdGhlIGVsZW1lbnQgbGVmdC5cbiAgICAgICAgX3BsYWNlaG9sZGVyRGl2LnN0eWxlLndpZHRoID0gdGFyZ2V0LnBhcmVudE5vZGUuc2Nyb2xsV2lkdGggKyBcInB4XCI7XG4gICAgICAgIHRhcmdldC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKF9wbGFjZWhvbGRlckRpdik7XG4gICAgICB9XG5cbiAgICAgIHJlY29yZFN0YXJ0UG9zaXRpb25zKCk7XG4gICAgICBzZWxmLnR3ZWVuICYmIHNlbGYudHdlZW4ua2lsbCgpO1xuICAgICAgc2VsZi5pc1Rocm93aW5nID0gZmFsc2U7XG4gICAgICBnc2FwLmtpbGxUd2VlbnNPZihzY3JvbGxQcm94eSB8fCB0YXJnZXQsIGtpbGxQcm9wcywgdHJ1ZSk7IC8vaW4gY2FzZSB0aGUgdXNlciB0cmllcyB0byBkcmFnIGl0IGJlZm9yZSB0aGUgbGFzdCB0d2VlbiBpcyBkb25lLlxuXG4gICAgICBzY3JvbGxQcm94eSAmJiBnc2FwLmtpbGxUd2VlbnNPZih0YXJnZXQsIHtcbiAgICAgICAgc2Nyb2xsVG86IDFcbiAgICAgIH0sIHRydWUpOyAvL2p1c3QgaW4gY2FzZSB0aGUgb3JpZ2luYWwgdGFyZ2V0J3Mgc2Nyb2xsIHBvc2l0aW9uIGlzIGJlaW5nIHR3ZWVuZWQgc29tZXdoZXJlIGVsc2UuXG5cbiAgICAgIHNlbGYudHdlZW4gPSBzZWxmLmxvY2tlZEF4aXMgPSBudWxsO1xuXG4gICAgICBpZiAodmFycy56SW5kZXhCb29zdCB8fCAhcm90YXRpb25Nb2RlICYmICFzY3JvbGxQcm94eSAmJiB2YXJzLnpJbmRleEJvb3N0ICE9PSBmYWxzZSkge1xuICAgICAgICB0YXJnZXQuc3R5bGUuekluZGV4ID0gRHJhZ2dhYmxlLnpJbmRleCsrO1xuICAgICAgfVxuXG4gICAgICBzZWxmLmlzUHJlc3NlZCA9IHRydWU7XG4gICAgICBoYXNEcmFnQ2FsbGJhY2sgPSAhISh2YXJzLm9uRHJhZyB8fCBzZWxmLl9saXN0ZW5lcnMuZHJhZyk7XG4gICAgICBoYXNNb3ZlQ2FsbGJhY2sgPSAhISh2YXJzLm9uTW92ZSB8fCBzZWxmLl9saXN0ZW5lcnMubW92ZSk7XG5cbiAgICAgIGlmICghcm90YXRpb25Nb2RlICYmICh2YXJzLmN1cnNvciAhPT0gZmFsc2UgfHwgdmFycy5hY3RpdmVDdXJzb3IpKSB7XG4gICAgICAgIGkgPSB0cmlnZ2Vycy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKC0taSA+IC0xKSB7XG4gICAgICAgICAgLy9fc2V0U3R5bGUodHJpZ2dlcnNbaV0sIFwiY3Vyc29yXCIsIHZhcnMuYWN0aXZlQ3Vyc29yIHx8IHZhcnMuY3Vyc29yIHx8IChfZGVmYXVsdEN1cnNvciA9PT0gXCJncmFiXCIgPyBcImdyYWJiaW5nXCIgOiBfZGVmYXVsdEN1cnNvcikpO1xuICAgICAgICAgIGdzYXAuc2V0KHRyaWdnZXJzW2ldLCB7XG4gICAgICAgICAgICBjdXJzb3I6IHZhcnMuYWN0aXZlQ3Vyc29yIHx8IHZhcnMuY3Vyc29yIHx8IChfZGVmYXVsdEN1cnNvciA9PT0gXCJncmFiXCIgPyBcImdyYWJiaW5nXCIgOiBfZGVmYXVsdEN1cnNvcilcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfZGlzcGF0Y2hFdmVudChzZWxmLCBcInByZXNzXCIsIFwib25QcmVzc1wiKTtcbiAgICB9LFxuICAgICAgICAvL2NhbGxlZCBldmVyeSB0aW1lIHRoZSBtb3VzZS90b3VjaCBtb3Zlc1xuICAgIG9uTW92ZSA9IGZ1bmN0aW9uIG9uTW92ZShlKSB7XG4gICAgICB2YXIgb3JpZ2luYWxFdmVudCA9IGUsXG4gICAgICAgICAgdG91Y2hlcyxcbiAgICAgICAgICBwb2ludGVyWCxcbiAgICAgICAgICBwb2ludGVyWSxcbiAgICAgICAgICBpLFxuICAgICAgICAgIGR4LFxuICAgICAgICAgIGR5O1xuXG4gICAgICBpZiAoIWVuYWJsZWQgfHwgX2lzTXVsdGlUb3VjaGluZyB8fCAhc2VsZi5pc1ByZXNzZWQgfHwgIWUpIHtcbiAgICAgICAgaXNQcmV2ZW50aW5nRGVmYXVsdCAmJiBlICYmIGVuYWJsZWQgJiYgX3ByZXZlbnREZWZhdWx0KGUpOyAvLyBpbiBzb21lIGJyb3dzZXJzLCB3ZSBtdXN0IGxpc3RlbiBmb3IgbXVsdGlwbGUgZXZlbnQgdHlwZXMgbGlrZSB0b3VjaG1vdmUsIHBvaW50ZXJtb3ZlLCBtb3VzZW1vdmUuIFRoZSBmaXJzdCB0aW1lIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkLCB3ZSByZWNvcmQgd2hldGhlciBvciBub3Qgd2UgX3ByZXZlbnREZWZhdWx0KCkgc28gdGhhdCBvbiBkdXBsaWNhdGUgY2FsbHMsIHdlIGNhbiBkbyB0aGUgc2FtZSBpZiBuZWNlc3NhcnkuXG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZWxmLnBvaW50ZXJFdmVudCA9IGU7XG4gICAgICB0b3VjaGVzID0gZS5jaGFuZ2VkVG91Y2hlcztcblxuICAgICAgaWYgKHRvdWNoZXMpIHtcbiAgICAgICAgLy90b3VjaCBldmVudHMgc3RvcmUgdGhlIGRhdGEgc2xpZ2h0bHkgZGlmZmVyZW50bHlcbiAgICAgICAgZSA9IHRvdWNoZXNbMF07XG5cbiAgICAgICAgaWYgKGUgIT09IHRvdWNoICYmIGUuaWRlbnRpZmllciAhPT0gdG91Y2hJRCkge1xuICAgICAgICAgIC8vVXN1YWxseSBjaGFuZ2VkVG91Y2hlc1swXSB3aWxsIGJlIHdoYXQgd2UncmUgbG9va2luZyBmb3IsIGJ1dCBpbiBjYXNlIGl0J3Mgbm90LCBsb29rIHRocm91Z2ggdGhlIHJlc3Qgb2YgdGhlIGFycmF5Li4uKGFuZCBBbmRyb2lkIGJyb3dzZXJzIGRvbid0IHJldXNlIHRoZSBldmVudCBsaWtlIGlPUylcbiAgICAgICAgICBpID0gdG91Y2hlcy5sZW5ndGg7XG5cbiAgICAgICAgICB3aGlsZSAoLS1pID4gLTEgJiYgKGUgPSB0b3VjaGVzW2ldKS5pZGVudGlmaWVyICE9PSB0b3VjaElEKSB7fVxuXG4gICAgICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGUucG9pbnRlcklkICYmIHRvdWNoSUQgJiYgZS5wb2ludGVySWQgIT09IHRvdWNoSUQpIHtcbiAgICAgICAgLy9mb3Igc29tZSBNaWNyb3NvZnQgYnJvd3NlcnMsIHdlIG11c3QgYXR0YWNoIHRoZSBsaXN0ZW5lciB0byB0aGUgZG9jIHJhdGhlciB0aGFuIHRoZSB0cmlnZ2VyIHNvIHRoYXQgd2hlbiB0aGUgZmluZ2VyIG1vdmVzIG91dHNpZGUgdGhlIGJvdW5kcyBvZiB0aGUgdHJpZ2dlciwgdGhpbmdzIHN0aWxsIHdvcmsuIFNvIGlmIHRoZSBldmVudCB3ZSdyZSByZWNlaXZpbmcgaGFzIGEgcG9pbnRlcklkIHRoYXQgZG9lc24ndCBtYXRjaCB0aGUgdG91Y2hJRCwgaWdub3JlIGl0IChmb3IgbXVsdGktdG91Y2gpXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRvdWNoRXZlbnRUYXJnZXQgJiYgYWxsb3dOYXRpdmVUb3VjaFNjcm9sbGluZyAmJiAhdG91Y2hEcmFnQXhpcykge1xuICAgICAgICAvL0FuZHJvaWQgYnJvd3NlcnMgZm9yY2UgdXMgdG8gZGVjaWRlIG9uIHRoZSBmaXJzdCBcInRvdWNobW92ZVwiIGV2ZW50IGlmIHdlIHNob3VsZCBhbGxvdyB0aGUgZGVmYXVsdCAoc2Nyb2xsaW5nKSBiZWhhdmlvciBvciBwcmV2ZW50RGVmYXVsdCgpLiBPdGhlcndpc2UsIGEgXCJ0b3VjaGNhbmNlbFwiIHdpbGwgYmUgZmlyZWQgYW5kIHRoZW4gbm8gXCJ0b3VjaG1vdmVcIiBvciBcInRvdWNoZW5kXCIgd2lsbCBmaXJlIGR1cmluZyB0aGUgc2Nyb2xsaW5nIChubyBnb29kKS5cbiAgICAgICAgX3BvaW50MS54ID0gZS5wYWdlWDtcbiAgICAgICAgX3BvaW50MS55ID0gZS5wYWdlWTtcbiAgICAgICAgbWF0cml4ICYmIG1hdHJpeC5hcHBseShfcG9pbnQxLCBfcG9pbnQxKTtcbiAgICAgICAgcG9pbnRlclggPSBfcG9pbnQxLng7XG4gICAgICAgIHBvaW50ZXJZID0gX3BvaW50MS55O1xuICAgICAgICBkeCA9IE1hdGguYWJzKHBvaW50ZXJYIC0gc3RhcnRQb2ludGVyWCk7XG4gICAgICAgIGR5ID0gTWF0aC5hYnMocG9pbnRlclkgLSBzdGFydFBvaW50ZXJZKTtcblxuICAgICAgICBpZiAoZHggIT09IGR5ICYmIChkeCA+IG1pbmltdW1Nb3ZlbWVudCB8fCBkeSA+IG1pbmltdW1Nb3ZlbWVudCkgfHwgX2lzQW5kcm9pZCAmJiBhbGxvd05hdGl2ZVRvdWNoU2Nyb2xsaW5nID09PSB0b3VjaERyYWdBeGlzKSB7XG4gICAgICAgICAgdG91Y2hEcmFnQXhpcyA9IGR4ID4gZHkgJiYgYWxsb3dYID8gXCJ4XCIgOiBcInlcIjtcblxuICAgICAgICAgIGlmIChhbGxvd05hdGl2ZVRvdWNoU2Nyb2xsaW5nICYmIHRvdWNoRHJhZ0F4aXMgIT09IGFsbG93TmF0aXZlVG91Y2hTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIF9hZGRMaXN0ZW5lcihfd2luLCBcInRvdWNoZm9yY2VjaGFuZ2VcIiwgX3ByZXZlbnREZWZhdWx0KTsgLy8gcHJldmVudHMgbmF0aXZlIHRvdWNoIHNjcm9sbGluZyBmcm9tIHRha2luZyBvdmVyIGlmIHRoZSB1c2VyIHN0YXJ0ZWQgZHJhZ2dpbmcgaW4gdGhlIG90aGVyIGRpcmVjdGlvbiBpbiBpT1MgU2FmYXJpXG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VsZi52YXJzLmxvY2tBeGlzT25Ub3VjaFNjcm9sbCAhPT0gZmFsc2UgJiYgYWxsb3dYICYmIGFsbG93WSkge1xuICAgICAgICAgICAgc2VsZi5sb2NrZWRBeGlzID0gdG91Y2hEcmFnQXhpcyA9PT0gXCJ4XCIgPyBcInlcIiA6IFwieFwiO1xuICAgICAgICAgICAgX2lzRnVuY3Rpb24oc2VsZi52YXJzLm9uTG9ja0F4aXMpICYmIHNlbGYudmFycy5vbkxvY2tBeGlzLmNhbGwoc2VsZiwgb3JpZ2luYWxFdmVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF9pc0FuZHJvaWQgJiYgYWxsb3dOYXRpdmVUb3VjaFNjcm9sbGluZyA9PT0gdG91Y2hEcmFnQXhpcykge1xuICAgICAgICAgICAgb25SZWxlYXNlKG9yaWdpbmFsRXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXNlbGYuYWxsb3dFdmVudERlZmF1bHQgJiYgKCFhbGxvd05hdGl2ZVRvdWNoU2Nyb2xsaW5nIHx8IHRvdWNoRHJhZ0F4aXMgJiYgYWxsb3dOYXRpdmVUb3VjaFNjcm9sbGluZyAhPT0gdG91Y2hEcmFnQXhpcykgJiYgb3JpZ2luYWxFdmVudC5jYW5jZWxhYmxlICE9PSBmYWxzZSkge1xuICAgICAgICBfcHJldmVudERlZmF1bHQob3JpZ2luYWxFdmVudCk7XG5cbiAgICAgICAgaXNQcmV2ZW50aW5nRGVmYXVsdCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGlzUHJldmVudGluZ0RlZmF1bHQpIHtcbiAgICAgICAgaXNQcmV2ZW50aW5nRGVmYXVsdCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZi5hdXRvU2Nyb2xsKSB7XG4gICAgICAgIGNoZWNrQXV0b1Njcm9sbEJvdW5kcyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHNldFBvaW50ZXJQb3NpdGlvbihlLnBhZ2VYLCBlLnBhZ2VZLCBoYXNNb3ZlQ2FsbGJhY2spO1xuICAgIH0sXG4gICAgICAgIHNldFBvaW50ZXJQb3NpdGlvbiA9IGZ1bmN0aW9uIHNldFBvaW50ZXJQb3NpdGlvbihwb2ludGVyWCwgcG9pbnRlclksIGludm9rZU9uTW92ZSkge1xuICAgICAgdmFyIGRyYWdUb2xlcmFuY2UgPSAxIC0gc2VsZi5kcmFnUmVzaXN0YW5jZSxcbiAgICAgICAgICBlZGdlVG9sZXJhbmNlID0gMSAtIHNlbGYuZWRnZVJlc2lzdGFuY2UsXG4gICAgICAgICAgcHJldlBvaW50ZXJYID0gc2VsZi5wb2ludGVyWCxcbiAgICAgICAgICBwcmV2UG9pbnRlclkgPSBzZWxmLnBvaW50ZXJZLFxuICAgICAgICAgIHByZXZTdGFydEVsZW1lbnRZID0gc3RhcnRFbGVtZW50WSxcbiAgICAgICAgICBwcmV2WCA9IHNlbGYueCxcbiAgICAgICAgICBwcmV2WSA9IHNlbGYueSxcbiAgICAgICAgICBwcmV2RW5kWCA9IHNlbGYuZW5kWCxcbiAgICAgICAgICBwcmV2RW5kWSA9IHNlbGYuZW5kWSxcbiAgICAgICAgICBwcmV2RW5kUm90YXRpb24gPSBzZWxmLmVuZFJvdGF0aW9uLFxuICAgICAgICAgIHByZXZEaXJ0eSA9IGRpcnR5LFxuICAgICAgICAgIHhDaGFuZ2UsXG4gICAgICAgICAgeUNoYW5nZSxcbiAgICAgICAgICB4LFxuICAgICAgICAgIHksXG4gICAgICAgICAgZGlmLFxuICAgICAgICAgIHRlbXA7XG4gICAgICBzZWxmLnBvaW50ZXJYID0gcG9pbnRlclg7XG4gICAgICBzZWxmLnBvaW50ZXJZID0gcG9pbnRlclk7XG5cbiAgICAgIGlmIChpc0ZpeGVkKSB7XG4gICAgICAgIHBvaW50ZXJYIC09IF9nZXREb2NTY3JvbGxMZWZ0KG93bmVyRG9jKTtcbiAgICAgICAgcG9pbnRlclkgLT0gX2dldERvY1Njcm9sbFRvcChvd25lckRvYyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyb3RhdGlvbk1vZGUpIHtcbiAgICAgICAgeSA9IE1hdGguYXRhbjIocm90YXRpb25PcmlnaW4ueSAtIHBvaW50ZXJZLCBwb2ludGVyWCAtIHJvdGF0aW9uT3JpZ2luLngpICogX1JBRDJERUc7XG4gICAgICAgIGRpZiA9IHNlbGYueSAtIHk7XG5cbiAgICAgICAgaWYgKGRpZiA+IDE4MCkge1xuICAgICAgICAgIHN0YXJ0RWxlbWVudFkgLT0gMzYwO1xuICAgICAgICAgIHNlbGYueSA9IHk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlmIDwgLTE4MCkge1xuICAgICAgICAgIHN0YXJ0RWxlbWVudFkgKz0gMzYwO1xuICAgICAgICAgIHNlbGYueSA9IHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi54ICE9PSBzdGFydEVsZW1lbnRYIHx8IE1hdGguYWJzKHN0YXJ0RWxlbWVudFkgLSB5KSA+IG1pbmltdW1Nb3ZlbWVudCkge1xuICAgICAgICAgIHNlbGYueSA9IHk7XG4gICAgICAgICAgeCA9IHN0YXJ0RWxlbWVudFggKyAoc3RhcnRFbGVtZW50WSAtIHkpICogZHJhZ1RvbGVyYW5jZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4ID0gc3RhcnRFbGVtZW50WDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1hdHJpeCkge1xuICAgICAgICAgIHRlbXAgPSBwb2ludGVyWCAqIG1hdHJpeC5hICsgcG9pbnRlclkgKiBtYXRyaXguYyArIG1hdHJpeC5lO1xuICAgICAgICAgIHBvaW50ZXJZID0gcG9pbnRlclggKiBtYXRyaXguYiArIHBvaW50ZXJZICogbWF0cml4LmQgKyBtYXRyaXguZjtcbiAgICAgICAgICBwb2ludGVyWCA9IHRlbXA7XG4gICAgICAgIH1cblxuICAgICAgICB5Q2hhbmdlID0gcG9pbnRlclkgLSBzdGFydFBvaW50ZXJZO1xuICAgICAgICB4Q2hhbmdlID0gcG9pbnRlclggLSBzdGFydFBvaW50ZXJYO1xuXG4gICAgICAgIGlmICh5Q2hhbmdlIDwgbWluaW11bU1vdmVtZW50ICYmIHlDaGFuZ2UgPiAtbWluaW11bU1vdmVtZW50KSB7XG4gICAgICAgICAgeUNoYW5nZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeENoYW5nZSA8IG1pbmltdW1Nb3ZlbWVudCAmJiB4Q2hhbmdlID4gLW1pbmltdW1Nb3ZlbWVudCkge1xuICAgICAgICAgIHhDaGFuZ2UgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChzZWxmLmxvY2tBeGlzIHx8IHNlbGYubG9ja2VkQXhpcykgJiYgKHhDaGFuZ2UgfHwgeUNoYW5nZSkpIHtcbiAgICAgICAgICB0ZW1wID0gc2VsZi5sb2NrZWRBeGlzO1xuXG4gICAgICAgICAgaWYgKCF0ZW1wKSB7XG4gICAgICAgICAgICBzZWxmLmxvY2tlZEF4aXMgPSB0ZW1wID0gYWxsb3dYICYmIE1hdGguYWJzKHhDaGFuZ2UpID4gTWF0aC5hYnMoeUNoYW5nZSkgPyBcInlcIiA6IGFsbG93WSA/IFwieFwiIDogbnVsbDtcblxuICAgICAgICAgICAgaWYgKHRlbXAgJiYgX2lzRnVuY3Rpb24oc2VsZi52YXJzLm9uTG9ja0F4aXMpKSB7XG4gICAgICAgICAgICAgIHNlbGYudmFycy5vbkxvY2tBeGlzLmNhbGwoc2VsZiwgc2VsZi5wb2ludGVyRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0ZW1wID09PSBcInlcIikge1xuICAgICAgICAgICAgeUNoYW5nZSA9IDA7XG4gICAgICAgICAgfSBlbHNlIGlmICh0ZW1wID09PSBcInhcIikge1xuICAgICAgICAgICAgeENoYW5nZSA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgeCA9IF9yb3VuZChzdGFydEVsZW1lbnRYICsgeENoYW5nZSAqIGRyYWdUb2xlcmFuY2UpO1xuICAgICAgICB5ID0gX3JvdW5kKHN0YXJ0RWxlbWVudFkgKyB5Q2hhbmdlICogZHJhZ1RvbGVyYW5jZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoc25hcFggfHwgc25hcFkgfHwgc25hcFhZKSAmJiAoc2VsZi54ICE9PSB4IHx8IHNlbGYueSAhPT0geSAmJiAhcm90YXRpb25Nb2RlKSkge1xuICAgICAgICBpZiAoc25hcFhZKSB7XG4gICAgICAgICAgX3RlbXAxLnggPSB4O1xuICAgICAgICAgIF90ZW1wMS55ID0geTtcbiAgICAgICAgICB0ZW1wID0gc25hcFhZKF90ZW1wMSk7XG4gICAgICAgICAgeCA9IF9yb3VuZCh0ZW1wLngpO1xuICAgICAgICAgIHkgPSBfcm91bmQodGVtcC55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzbmFwWCkge1xuICAgICAgICAgIHggPSBfcm91bmQoc25hcFgoeCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNuYXBZKSB7XG4gICAgICAgICAgeSA9IF9yb3VuZChzbmFwWSh5KSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaGFzQm91bmRzKSB7XG4gICAgICAgIGlmICh4ID4gbWF4WCkge1xuICAgICAgICAgIHggPSBtYXhYICsgTWF0aC5yb3VuZCgoeCAtIG1heFgpICogZWRnZVRvbGVyYW5jZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoeCA8IG1pblgpIHtcbiAgICAgICAgICB4ID0gbWluWCArIE1hdGgucm91bmQoKHggLSBtaW5YKSAqIGVkZ2VUb2xlcmFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyb3RhdGlvbk1vZGUpIHtcbiAgICAgICAgICBpZiAoeSA+IG1heFkpIHtcbiAgICAgICAgICAgIHkgPSBNYXRoLnJvdW5kKG1heFkgKyAoeSAtIG1heFkpICogZWRnZVRvbGVyYW5jZSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh5IDwgbWluWSkge1xuICAgICAgICAgICAgeSA9IE1hdGgucm91bmQobWluWSArICh5IC0gbWluWSkgKiBlZGdlVG9sZXJhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGYueCAhPT0geCB8fCBzZWxmLnkgIT09IHkgJiYgIXJvdGF0aW9uTW9kZSkge1xuICAgICAgICBpZiAocm90YXRpb25Nb2RlKSB7XG4gICAgICAgICAgc2VsZi5lbmRSb3RhdGlvbiA9IHNlbGYueCA9IHNlbGYuZW5kWCA9IHg7XG4gICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChhbGxvd1kpIHtcbiAgICAgICAgICAgIHNlbGYueSA9IHNlbGYuZW5kWSA9IHk7XG4gICAgICAgICAgICBkaXJ0eSA9IHRydWU7IC8vYSBmbGFnIHRoYXQgaW5kaWNhdGVzIHdlIG5lZWQgdG8gcmVuZGVyIHRoZSB0YXJnZXQgbmV4dCB0aW1lIHRoZSBUd2VlbkxpdGUudGlja2VyIGRpc3BhdGNoZXMgYSBcInRpY2tcIiBldmVudCAodHlwaWNhbGx5IG9uIGEgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKSAtIHRoaXMgaXMgYSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24gKHdlIHNob3VsZG4ndCByZW5kZXIgb24gZXZlcnkgbW92ZSBiZWNhdXNlIHNvbWV0aW1lcyBtYW55IG1vdmUgZXZlbnRzIGNhbiBnZXQgZGlzcGF0Y2hlZCBiZXR3ZWVuIHNjcmVlbiByZWZyZXNoZXMsIGFuZCB0aGF0J2QgYmUgd2FzdGVmdWwgdG8gcmVuZGVyIGV2ZXJ5IHRpbWUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGFsbG93WCkge1xuICAgICAgICAgICAgc2VsZi54ID0gc2VsZi5lbmRYID0geDtcbiAgICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWludm9rZU9uTW92ZSB8fCBfZGlzcGF0Y2hFdmVudChzZWxmLCBcIm1vdmVcIiwgXCJvbk1vdmVcIikgIT09IGZhbHNlKSB7XG4gICAgICAgICAgaWYgKCFzZWxmLmlzRHJhZ2dpbmcgJiYgc2VsZi5pc1ByZXNzZWQpIHtcbiAgICAgICAgICAgIHNlbGYuaXNEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgIF9kaXNwYXRjaEV2ZW50KHNlbGYsIFwiZHJhZ3N0YXJ0XCIsIFwib25EcmFnU3RhcnRcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vcmV2ZXJ0IGJlY2F1c2UgdGhlIG9uTW92ZSByZXR1cm5lZCBmYWxzZSFcbiAgICAgICAgICBzZWxmLnBvaW50ZXJYID0gcHJldlBvaW50ZXJYO1xuICAgICAgICAgIHNlbGYucG9pbnRlclkgPSBwcmV2UG9pbnRlclk7XG4gICAgICAgICAgc3RhcnRFbGVtZW50WSA9IHByZXZTdGFydEVsZW1lbnRZO1xuICAgICAgICAgIHNlbGYueCA9IHByZXZYO1xuICAgICAgICAgIHNlbGYueSA9IHByZXZZO1xuICAgICAgICAgIHNlbGYuZW5kWCA9IHByZXZFbmRYO1xuICAgICAgICAgIHNlbGYuZW5kWSA9IHByZXZFbmRZO1xuICAgICAgICAgIHNlbGYuZW5kUm90YXRpb24gPSBwcmV2RW5kUm90YXRpb247XG4gICAgICAgICAgZGlydHkgPSBwcmV2RGlydHk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgICAgICAvL2NhbGxlZCB3aGVuIHRoZSBtb3VzZS90b3VjaCBpcyByZWxlYXNlZFxuICAgIG9uUmVsZWFzZSA9IGZ1bmN0aW9uIG9uUmVsZWFzZShlLCBmb3JjZSkge1xuICAgICAgaWYgKCFlbmFibGVkIHx8ICFzZWxmLmlzUHJlc3NlZCB8fCBlICYmIHRvdWNoSUQgIT0gbnVsbCAmJiAhZm9yY2UgJiYgKGUucG9pbnRlcklkICYmIGUucG9pbnRlcklkICE9PSB0b3VjaElEIHx8IGUuY2hhbmdlZFRvdWNoZXMgJiYgIV9oYXNUb3VjaElEKGUuY2hhbmdlZFRvdWNoZXMsIHRvdWNoSUQpKSkge1xuICAgICAgICAvL2ZvciBzb21lIE1pY3Jvc29mdCBicm93c2Vycywgd2UgbXVzdCBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvIHRoZSBkb2MgcmF0aGVyIHRoYW4gdGhlIHRyaWdnZXIgc28gdGhhdCB3aGVuIHRoZSBmaW5nZXIgbW92ZXMgb3V0c2lkZSB0aGUgYm91bmRzIG9mIHRoZSB0cmlnZ2VyLCB0aGluZ3Mgc3RpbGwgd29yay4gU28gaWYgdGhlIGV2ZW50IHdlJ3JlIHJlY2VpdmluZyBoYXMgYSBwb2ludGVySWQgdGhhdCBkb2Vzbid0IG1hdGNoIHRoZSB0b3VjaElELCBpZ25vcmUgaXQgKGZvciBtdWx0aS10b3VjaClcbiAgICAgICAgaXNQcmV2ZW50aW5nRGVmYXVsdCAmJiBlICYmIGVuYWJsZWQgJiYgX3ByZXZlbnREZWZhdWx0KGUpOyAvLyBpbiBzb21lIGJyb3dzZXJzLCB3ZSBtdXN0IGxpc3RlbiBmb3IgbXVsdGlwbGUgZXZlbnQgdHlwZXMgbGlrZSB0b3VjaGVuZCwgcG9pbnRlcnVwLCBtb3VzZXVwLiBUaGUgZmlyc3QgdGltZSB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCwgd2UgcmVjb3JkIHdoZXRoZXIgb3Igbm90IHdlIF9wcmV2ZW50RGVmYXVsdCgpIHNvIHRoYXQgb24gZHVwbGljYXRlIGNhbGxzLCB3ZSBjYW4gZG8gdGhlIHNhbWUgaWYgbmVjZXNzYXJ5LlxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5pc1ByZXNzZWQgPSBmYWxzZTtcbiAgICAgIHZhciBvcmlnaW5hbEV2ZW50ID0gZSxcbiAgICAgICAgICB3YXNEcmFnZ2luZyA9IHNlbGYuaXNEcmFnZ2luZyxcbiAgICAgICAgICBpc0NvbnRleHRNZW51UmVsZWFzZSA9IHNlbGYudmFycy5hbGxvd0NvbnRleHRNZW51ICYmIGUgJiYgKGUuY3RybEtleSB8fCBlLndoaWNoID4gMiksXG4gICAgICAgICAgcGxhY2Vob2xkZXJEZWxheWVkQ2FsbCA9IGdzYXAuZGVsYXllZENhbGwoMC4wMDEsIHJlbW92ZVBsYWNlaG9sZGVyKSxcbiAgICAgICAgICB0b3VjaGVzLFxuICAgICAgICAgIGksXG4gICAgICAgICAgc3ludGhldGljRXZlbnQsXG4gICAgICAgICAgZXZlbnRUYXJnZXQsXG4gICAgICAgICAgc3ludGhldGljQ2xpY2s7XG5cbiAgICAgIGlmICh0b3VjaEV2ZW50VGFyZ2V0KSB7XG4gICAgICAgIF9yZW1vdmVMaXN0ZW5lcih0b3VjaEV2ZW50VGFyZ2V0LCBcInRvdWNoZW5kXCIsIG9uUmVsZWFzZSk7XG5cbiAgICAgICAgX3JlbW92ZUxpc3RlbmVyKHRvdWNoRXZlbnRUYXJnZXQsIFwidG91Y2htb3ZlXCIsIG9uTW92ZSk7XG5cbiAgICAgICAgX3JlbW92ZUxpc3RlbmVyKHRvdWNoRXZlbnRUYXJnZXQsIFwidG91Y2hjYW5jZWxcIiwgb25SZWxlYXNlKTtcblxuICAgICAgICBfcmVtb3ZlTGlzdGVuZXIob3duZXJEb2MsIFwidG91Y2hzdGFydFwiLCBfb25NdWx0aVRvdWNoRG9jdW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3JlbW92ZUxpc3RlbmVyKG93bmVyRG9jLCBcIm1vdXNlbW92ZVwiLCBvbk1vdmUpO1xuICAgICAgfVxuXG4gICAgICBfcmVtb3ZlTGlzdGVuZXIoX3dpbiwgXCJ0b3VjaGZvcmNlY2hhbmdlXCIsIF9wcmV2ZW50RGVmYXVsdCk7XG5cbiAgICAgIGlmICghX3N1cHBvcnRzUG9pbnRlciB8fCAhdG91Y2hFdmVudFRhcmdldCkge1xuICAgICAgICBfcmVtb3ZlTGlzdGVuZXIob3duZXJEb2MsIFwibW91c2V1cFwiLCBvblJlbGVhc2UpO1xuXG4gICAgICAgIGlmIChlICYmIGUudGFyZ2V0KSB7XG4gICAgICAgICAgX3JlbW92ZUxpc3RlbmVyKGUudGFyZ2V0LCBcIm1vdXNldXBcIiwgb25SZWxlYXNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkaXJ0eSA9IGZhbHNlO1xuXG4gICAgICBpZiAoaXNDbGlja2luZyAmJiAhaXNDb250ZXh0TWVudVJlbGVhc2UpIHtcbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICBfcmVtb3ZlTGlzdGVuZXIoZS50YXJnZXQsIFwiY2hhbmdlXCIsIG9uUmVsZWFzZSk7XG5cbiAgICAgICAgICBzZWxmLnBvaW50ZXJFdmVudCA9IG9yaWdpbmFsRXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBfc2V0U2VsZWN0YWJsZSh0cmlnZ2VycywgZmFsc2UpO1xuXG4gICAgICAgIF9kaXNwYXRjaEV2ZW50KHNlbGYsIFwicmVsZWFzZVwiLCBcIm9uUmVsZWFzZVwiKTtcblxuICAgICAgICBfZGlzcGF0Y2hFdmVudChzZWxmLCBcImNsaWNrXCIsIFwib25DbGlja1wiKTtcblxuICAgICAgICBpc0NsaWNraW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgX3JlbW92ZUZyb21SZW5kZXJRdWV1ZShyZW5kZXIpO1xuXG4gICAgICBpZiAoIXJvdGF0aW9uTW9kZSkge1xuICAgICAgICBpID0gdHJpZ2dlcnMubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlICgtLWkgPiAtMSkge1xuICAgICAgICAgIF9zZXRTdHlsZSh0cmlnZ2Vyc1tpXSwgXCJjdXJzb3JcIiwgdmFycy5jdXJzb3IgfHwgKHZhcnMuY3Vyc29yICE9PSBmYWxzZSA/IF9kZWZhdWx0Q3Vyc29yIDogbnVsbCkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh3YXNEcmFnZ2luZykge1xuICAgICAgICBkcmFnRW5kVGltZSA9IF9sYXN0RHJhZ1RpbWUgPSBfZ2V0VGltZSgpO1xuICAgICAgICBzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgX2RyYWdDb3VudC0tO1xuXG4gICAgICBpZiAoZSkge1xuICAgICAgICB0b3VjaGVzID0gZS5jaGFuZ2VkVG91Y2hlcztcblxuICAgICAgICBpZiAodG91Y2hlcykge1xuICAgICAgICAgIC8vdG91Y2ggZXZlbnRzIHN0b3JlIHRoZSBkYXRhIHNsaWdodGx5IGRpZmZlcmVudGx5XG4gICAgICAgICAgZSA9IHRvdWNoZXNbMF07XG5cbiAgICAgICAgICBpZiAoZSAhPT0gdG91Y2ggJiYgZS5pZGVudGlmaWVyICE9PSB0b3VjaElEKSB7XG4gICAgICAgICAgICAvL1VzdWFsbHkgY2hhbmdlZFRvdWNoZXNbMF0gd2lsbCBiZSB3aGF0IHdlJ3JlIGxvb2tpbmcgZm9yLCBidXQgaW4gY2FzZSBpdCdzIG5vdCwgbG9vayB0aHJvdWdoIHRoZSByZXN0IG9mIHRoZSBhcnJheS4uLihhbmQgQW5kcm9pZCBicm93c2VycyBkb24ndCByZXVzZSB0aGUgZXZlbnQgbGlrZSBpT1MpXG4gICAgICAgICAgICBpID0gdG91Y2hlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIHdoaWxlICgtLWkgPiAtMSAmJiAoZSA9IHRvdWNoZXNbaV0pLmlkZW50aWZpZXIgIT09IHRvdWNoSUQpIHt9XG5cbiAgICAgICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5wb2ludGVyRXZlbnQgPSBvcmlnaW5hbEV2ZW50O1xuICAgICAgICBzZWxmLnBvaW50ZXJYID0gZS5wYWdlWDtcbiAgICAgICAgc2VsZi5wb2ludGVyWSA9IGUucGFnZVk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NvbnRleHRNZW51UmVsZWFzZSAmJiBvcmlnaW5hbEV2ZW50KSB7XG4gICAgICAgIF9wcmV2ZW50RGVmYXVsdChvcmlnaW5hbEV2ZW50KTtcblxuICAgICAgICBpc1ByZXZlbnRpbmdEZWZhdWx0ID0gdHJ1ZTtcblxuICAgICAgICBfZGlzcGF0Y2hFdmVudChzZWxmLCBcInJlbGVhc2VcIiwgXCJvblJlbGVhc2VcIik7XG4gICAgICB9IGVsc2UgaWYgKG9yaWdpbmFsRXZlbnQgJiYgIXdhc0RyYWdnaW5nKSB7XG4gICAgICAgIGlzUHJldmVudGluZ0RlZmF1bHQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoaW50ZXJydXB0ZWQgJiYgKHZhcnMuc25hcCB8fCB2YXJzLmJvdW5kcykpIHtcbiAgICAgICAgICAvL290aGVyd2lzZSwgaWYgdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBvYmplY3Qgd2hpbGUgaXQncyBhbmltYXRpbmcgdG8gYSBzbmFwcGVkIHBvc2l0aW9uLCBhbmQgdGhlbiByZWxlYXNlcyB3aXRob3V0IG1vdmluZyAzIHBpeGVscywgaXQgd2lsbCBqdXN0IHN0YXkgdGhlcmUgKGl0IHNob3VsZCBhbmltYXRlL3NuYXApXG4gICAgICAgICAgYW5pbWF0ZSh2YXJzLmluZXJ0aWEgfHwgdmFycy50aHJvd1Byb3BzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9kaXNwYXRjaEV2ZW50KHNlbGYsIFwicmVsZWFzZVwiLCBcIm9uUmVsZWFzZVwiKTtcblxuICAgICAgICBpZiAoKCFfaXNBbmRyb2lkIHx8IG9yaWdpbmFsRXZlbnQudHlwZSAhPT0gXCJ0b3VjaG1vdmVcIikgJiYgb3JpZ2luYWxFdmVudC50eXBlLmluZGV4T2YoXCJjYW5jZWxcIikgPT09IC0xKSB7XG4gICAgICAgICAgLy90byBhY2NvbW1vZGF0ZSBuYXRpdmUgc2Nyb2xsaW5nIG9uIEFuZHJvaWQgZGV2aWNlcywgd2UgaGF2ZSB0byBpbW1lZGlhdGVseSBjYWxsIG9uUmVsZWFzZSgpIG9uIHRoZSBmaXJzdCB0b3VjaG1vdmUgZXZlbnQsIGJ1dCB0aGF0IHNob3VsZG4ndCB0cmlnZ2VyIGEgXCJjbGlja1wiLlxuICAgICAgICAgIF9kaXNwYXRjaEV2ZW50KHNlbGYsIFwiY2xpY2tcIiwgXCJvbkNsaWNrXCIpO1xuXG4gICAgICAgICAgaWYgKF9nZXRUaW1lKCkgLSBjbGlja1RpbWUgPCAzMDApIHtcbiAgICAgICAgICAgIF9kaXNwYXRjaEV2ZW50KHNlbGYsIFwiZG91YmxlY2xpY2tcIiwgXCJvbkRvdWJsZUNsaWNrXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50VGFyZ2V0ID0gb3JpZ2luYWxFdmVudC50YXJnZXQgfHwgdGFyZ2V0OyAvL29sZCBJRSB1c2VzIHNyY0VsZW1lbnRcblxuICAgICAgICAgIGNsaWNrVGltZSA9IF9nZXRUaW1lKCk7XG5cbiAgICAgICAgICBzeW50aGV0aWNDbGljayA9IGZ1bmN0aW9uIHN5bnRoZXRpY0NsaWNrKCkge1xuICAgICAgICAgICAgLy8gc29tZSBicm93c2VycyAobGlrZSBGaXJlZm94KSB3b24ndCB0cnVzdCBzY3JpcHQtZ2VuZXJhdGVkIGNsaWNrcywgc28gaWYgdGhlIHVzZXIgdHJpZXMgdG8gY2xpY2sgb24gYSB2aWRlbyB0byBwbGF5IGl0LCBmb3IgZXhhbXBsZSwgaXQgc2ltcGx5IHdvbid0IHdvcmsuIFNpbmNlIGEgcmVndWxhciBcImNsaWNrXCIgZXZlbnQgd2lsbCBtb3N0IGxpa2VseSBiZSBnZW5lcmF0ZWQgYW55d2F5IChvbmUgdGhhdCBoYXMgaXRzIGlzVHJ1c3RlZCBmbGFnIHNldCB0byB0cnVlKSwgd2UgbXVzdCBzbGlnaHRseSBkZWxheSBvdXIgc2NyaXB0LWdlbmVyYXRlZCBjbGljayBzbyB0aGF0IHRoZSBcInJlYWxcIi90cnVzdGVkIG9uZSBpcyBwcmlvcml0aXplZC4gUmVtZW1iZXIsIHdoZW4gdGhlcmUgYXJlIGR1cGxpY2F0ZSBldmVudHMgaW4gcXVpY2sgc3VjY2Vzc2lvbiwgd2Ugc3VwcHJlc3MgYWxsIGJ1dCB0aGUgZmlyc3Qgb25lLiBTb21lIGJyb3dzZXJzIGRvbid0IGV2ZW4gdHJpZ2dlciB0aGUgXCJyZWFsXCIgb25lIGF0IGFsbCwgc28gb3VyIHN5bnRoZXRpYyBvbmUgaXMgYSBzYWZldHkgdmFsdmUgdGhhdCBlbnN1cmVzIHRoYXQgbm8gbWF0dGVyIHdoYXQsIGEgY2xpY2sgZXZlbnQgZG9lcyBnZXQgZGlzcGF0Y2hlZC5cbiAgICAgICAgICAgIGlmIChjbGlja1RpbWUgIT09IGNsaWNrRGlzcGF0Y2ggJiYgc2VsZi5lbmFibGVkKCkgJiYgIXNlbGYuaXNQcmVzc2VkICYmICFvcmlnaW5hbEV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50VGFyZ2V0LmNsaWNrKSB7XG4gICAgICAgICAgICAgICAgLy9zb21lIGJyb3dzZXJzIChsaWtlIG1vYmlsZSBTYWZhcmkpIGRvbid0IHByb3Blcmx5IHRyaWdnZXIgdGhlIGNsaWNrIGV2ZW50XG4gICAgICAgICAgICAgICAgZXZlbnRUYXJnZXQuY2xpY2soKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChvd25lckRvYy5jcmVhdGVFdmVudCkge1xuICAgICAgICAgICAgICAgIHN5bnRoZXRpY0V2ZW50ID0gb3duZXJEb2MuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50c1wiKTtcbiAgICAgICAgICAgICAgICBzeW50aGV0aWNFdmVudC5pbml0TW91c2VFdmVudChcImNsaWNrXCIsIHRydWUsIHRydWUsIF93aW4sIDEsIHNlbGYucG9pbnRlckV2ZW50LnNjcmVlblgsIHNlbGYucG9pbnRlckV2ZW50LnNjcmVlblksIHNlbGYucG9pbnRlclgsIHNlbGYucG9pbnRlclksIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KHN5bnRoZXRpY0V2ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoIV9pc0FuZHJvaWQgJiYgIW9yaWdpbmFsRXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgLy9pT1MgU2FmYXJpIHJlcXVpcmVzIHRoZSBzeW50aGV0aWMgY2xpY2sgdG8gaGFwcGVuIGltbWVkaWF0ZWx5IG9yIGVsc2UgaXQgc2ltcGx5IHdvbid0IHdvcmssIGJ1dCBBbmRyb2lkIGRvZXNuJ3QgcGxheSBuaWNlLlxuICAgICAgICAgICAgZ3NhcC5kZWxheWVkQ2FsbCgwLjA1LCBzeW50aGV0aWNDbGljayk7IC8vaW4gYWRkaXRpb24gdG8gdGhlIGlPUyBidWcgd29ya2Fyb3VuZCwgdGhlcmUncyBhIEZpcmVmb3ggaXNzdWUgd2l0aCBjbGlja2luZyBvbiB0aGluZ3MgbGlrZSBhIHZpZGVvIHRvIHBsYXksIHNvIHdlIG11c3QgZmFrZSBhIGNsaWNrIGV2ZW50IGluIGEgc2xpZ2h0bHkgZGVsYXllZCBmYXNoaW9uLiBQcmV2aW91c2x5LCB3ZSBsaXN0ZW5lZCBmb3IgdGhlIFwiY2xpY2tcIiBldmVudCB3aXRoIFwiY2FwdHVyZVwiIGZhbHNlIHdoaWNoIHNvbHZlZCB0aGUgdmlkZW8tY2xpY2stdG8tcGxheSBpc3N1ZSwgYnV0IGl0IHdvdWxkIGFsbG93IHRoZSBcImNsaWNrXCIgZXZlbnQgdG8gYmUgZGlzcGF0Y2hlZCB0d2ljZSBsaWtlIGlmIHlvdSB3ZXJlIHVzaW5nIGEgalF1ZXJ5LmNsaWNrKCkgYmVjYXVzZSB0aGF0IHdhcyBoYW5kbGVkIGluIHRoZSBjYXB0dXJlIHBoYXNlLCB0aHVzIHdlIGhhZCB0byBzd2l0Y2ggdG8gdGhlIGNhcHR1cmUgcGhhc2UgdG8gYXZvaWQgdGhlIGRvdWJsZS1kaXNwYXRjaGluZywgYnV0IGRvIHRoZSBkZWxheWVkIHN5bnRoZXRpYyBjbGljay4gRG9uJ3QgZmlyZSBpdCB0b28gZmFzdCAobGlrZSAwLjAwMDAxKSBiZWNhdXNlIHdlIHdhbnQgdG8gZ2l2ZSB0aGUgbmF0aXZlIGV2ZW50IGEgY2hhbmNlIHRvIGZpcmUgZmlyc3QgYXMgaXQncyBcInRydXN0ZWRcIi5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuaW1hdGUodmFycy5pbmVydGlhIHx8IHZhcnMudGhyb3dQcm9wcyk7IC8vd2lsbCBza2lwIGlmIGluZXJ0aWEvdGhyb3dQcm9wcyBpc24ndCBkZWZpbmVkIG9yIEludGVydGlhUGx1Z2luIGlzbid0IGxvYWRlZC5cblxuICAgICAgICBpZiAoIXNlbGYuYWxsb3dFdmVudERlZmF1bHQgJiYgb3JpZ2luYWxFdmVudCAmJiAodmFycy5kcmFnQ2xpY2thYmxlcyAhPT0gZmFsc2UgfHwgIWlzQ2xpY2thYmxlLmNhbGwoc2VsZiwgb3JpZ2luYWxFdmVudC50YXJnZXQpKSAmJiB3YXNEcmFnZ2luZyAmJiAoIWFsbG93TmF0aXZlVG91Y2hTY3JvbGxpbmcgfHwgdG91Y2hEcmFnQXhpcyAmJiBhbGxvd05hdGl2ZVRvdWNoU2Nyb2xsaW5nID09PSB0b3VjaERyYWdBeGlzKSAmJiBvcmlnaW5hbEV2ZW50LmNhbmNlbGFibGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgaXNQcmV2ZW50aW5nRGVmYXVsdCA9IHRydWU7XG5cbiAgICAgICAgICBfcHJldmVudERlZmF1bHQob3JpZ2luYWxFdmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNQcmV2ZW50aW5nRGVmYXVsdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgX2Rpc3BhdGNoRXZlbnQoc2VsZiwgXCJyZWxlYXNlXCIsIFwib25SZWxlYXNlXCIpO1xuICAgICAgfVxuXG4gICAgICBpc1R3ZWVuaW5nKCkgJiYgcGxhY2Vob2xkZXJEZWxheWVkQ2FsbC5kdXJhdGlvbihzZWxmLnR3ZWVuLmR1cmF0aW9uKCkpOyAvL3N5bmMgdGhlIHRpbWluZyBzbyB0aGF0IHRoZSBwbGFjZWhvbGRlciBESVYgZ2V0c1xuXG4gICAgICB3YXNEcmFnZ2luZyAmJiBfZGlzcGF0Y2hFdmVudChzZWxmLCBcImRyYWdlbmRcIiwgXCJvbkRyYWdFbmRcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgICAgICB1cGRhdGVTY3JvbGwgPSBmdW5jdGlvbiB1cGRhdGVTY3JvbGwoZSkge1xuICAgICAgaWYgKGUgJiYgc2VsZi5pc0RyYWdnaW5nICYmICFzY3JvbGxQcm94eSkge1xuICAgICAgICB2YXIgcGFyZW50ID0gZS50YXJnZXQgfHwgdGFyZ2V0LnBhcmVudE5vZGUsXG4gICAgICAgICAgICBkZWx0YVggPSBwYXJlbnQuc2Nyb2xsTGVmdCAtIHBhcmVudC5fZ3NTY3JvbGxYLFxuICAgICAgICAgICAgZGVsdGFZID0gcGFyZW50LnNjcm9sbFRvcCAtIHBhcmVudC5fZ3NTY3JvbGxZO1xuXG4gICAgICAgIGlmIChkZWx0YVggfHwgZGVsdGFZKSB7XG4gICAgICAgICAgaWYgKG1hdHJpeCkge1xuICAgICAgICAgICAgc3RhcnRQb2ludGVyWCAtPSBkZWx0YVggKiBtYXRyaXguYSArIGRlbHRhWSAqIG1hdHJpeC5jO1xuICAgICAgICAgICAgc3RhcnRQb2ludGVyWSAtPSBkZWx0YVkgKiBtYXRyaXguZCArIGRlbHRhWCAqIG1hdHJpeC5iO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFydFBvaW50ZXJYIC09IGRlbHRhWDtcbiAgICAgICAgICAgIHN0YXJ0UG9pbnRlclkgLT0gZGVsdGFZO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHBhcmVudC5fZ3NTY3JvbGxYICs9IGRlbHRhWDtcbiAgICAgICAgICBwYXJlbnQuX2dzU2Nyb2xsWSArPSBkZWx0YVk7XG4gICAgICAgICAgc2V0UG9pbnRlclBvc2l0aW9uKHNlbGYucG9pbnRlclgsIHNlbGYucG9pbnRlclkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAgICAgb25DbGljayA9IGZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICAgICAgLy90aGlzIHdhcyBhIGh1Z2UgcGFpbiBpbiB0aGUgbmVjayB0byBhbGlnbiBhbGwgdGhlIHZhcmlvdXMgYnJvd3NlcnMgYW5kIHRoZWlyIGJlaGF2aW9ycy4gQ2hyb21lLCBGaXJlZm94LCBTYWZhcmksIE9wZXJhLCBBbmRyb2lkLCBhbmQgTWljcm9zb2Z0IEVkZ2UgYWxsIGhhbmRsZSBldmVudHMgZGlmZmVyZW50bHkhIFNvbWUgd2lsbCBvbmx5IHRyaWdnZXIgbmF0aXZlIGJlaGF2aW9yIChsaWtlIGNoZWNrYm94IHRvZ2dsaW5nKSBmcm9tIHRydXN0ZWQgZXZlbnRzLiBPdGhlcnMgZG9uJ3QgZXZlbiBzdXBwb3J0IGlzVHJ1c3RlZCwgYnV0IHJlcXVpcmUgMiBldmVudHMgdG8gZmxvdyB0aHJvdWdoIGJlZm9yZSB0cmlnZ2VyaW5nIG5hdGl2ZSBiZWhhdmlvci4gRWRnZSB0cmVhdHMgZXZlcnl0aGluZyBhcyB0cnVzdGVkIGJ1dCBhbHNvIG1hbmRhdGVzIHRoYXQgMiBmbG93IHRocm91Z2ggdG8gdHJpZ2dlciB0aGUgY29ycmVjdCBuYXRpdmUgYmVoYXZpb3IuXG4gICAgICB2YXIgdGltZSA9IF9nZXRUaW1lKCksXG4gICAgICAgICAgcmVjZW50bHlDbGlja2VkID0gdGltZSAtIGNsaWNrVGltZSA8IDQwLFxuICAgICAgICAgIHJlY2VudGx5RHJhZ2dlZCA9IHRpbWUgLSBkcmFnRW5kVGltZSA8IDQwLFxuICAgICAgICAgIGFscmVhZHlEaXNwYXRjaGVkID0gcmVjZW50bHlDbGlja2VkICYmIGNsaWNrRGlzcGF0Y2ggPT09IGNsaWNrVGltZSxcbiAgICAgICAgICBkZWZhdWx0UHJldmVudGVkID0gc2VsZi5wb2ludGVyRXZlbnQgJiYgc2VsZi5wb2ludGVyRXZlbnQuZGVmYXVsdFByZXZlbnRlZCxcbiAgICAgICAgICBhbHJlYWR5RGlzcGF0Y2hlZFRydXN0ZWQgPSByZWNlbnRseUNsaWNrZWQgJiYgdHJ1c3RlZENsaWNrRGlzcGF0Y2ggPT09IGNsaWNrVGltZSxcbiAgICAgICAgICB0cnVzdGVkID0gZS5pc1RydXN0ZWQgfHwgZS5pc1RydXN0ZWQgPT0gbnVsbCAmJiByZWNlbnRseUNsaWNrZWQgJiYgYWxyZWFkeURpc3BhdGNoZWQ7IC8vbm90ZTogU2FmYXJpIGRvZXNuJ3Qgc3VwcG9ydCBpc1RydXN0ZWQsIGFuZCBpdCB3b24ndCBwcm9wZXJseSBleGVjdXRlIG5hdGl2ZSBiZWhhdmlvciAobGlrZSB0b2dnbGluZyBjaGVja2JveGVzKSBvbiB0aGUgZmlyc3Qgc3ludGhldGljIFwiY2xpY2tcIiBldmVudCAtIHdlIG11c3Qgd2FpdCBmb3IgdGhlIDJuZCBhbmQgdHJlYXQgaXQgYXMgdHJ1c3RlZCAoYnV0IHN0b3AgcHJvcGFnYXRpb24gYXQgdGhhdCBwb2ludCkuIENvbmZ1c2luZywgSSBrbm93LiBEb24ndCB5b3UgbG92ZSBjcm9zcy1icm93c2VyIGNvbXBhdGliaWxpdHkgY2hhbGxlbmdlcz9cblxuXG4gICAgICBpZiAoKGFscmVhZHlEaXNwYXRjaGVkIHx8IHJlY2VudGx5RHJhZ2dlZCAmJiBzZWxmLnZhcnMuc3VwcHJlc3NDbGlja09uRHJhZyAhPT0gZmFsc2UpICYmIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNlbnRseUNsaWNrZWQgJiYgIShzZWxmLnBvaW50ZXJFdmVudCAmJiBzZWxmLnBvaW50ZXJFdmVudC5kZWZhdWx0UHJldmVudGVkKSAmJiAoIWFscmVhZHlEaXNwYXRjaGVkIHx8IHRydXN0ZWQgJiYgIWFscmVhZHlEaXNwYXRjaGVkVHJ1c3RlZCkpIHtcbiAgICAgICAgLy9sZXQgdGhlIGZpcnN0IGNsaWNrIHBhc3MgdGhyb3VnaCB1bmhpbmRlcmVkLiBMZXQgdGhlIG5leHQgb25lIG9ubHkgaWYgaXQncyB0cnVzdGVkLCB0aGVuIG5vIG1vcmUgKHN0b3AgcXVpY2stc3VjY2Vzc2lvbiBvbmVzKVxuICAgICAgICBpZiAodHJ1c3RlZCAmJiBhbHJlYWR5RGlzcGF0Y2hlZCkge1xuICAgICAgICAgIHRydXN0ZWRDbGlja0Rpc3BhdGNoID0gY2xpY2tUaW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xpY2tEaXNwYXRjaCA9IGNsaWNrVGltZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZi5pc1ByZXNzZWQgfHwgcmVjZW50bHlEcmFnZ2VkIHx8IHJlY2VudGx5Q2xpY2tlZCkge1xuICAgICAgICBpZiAoIXRydXN0ZWQgfHwgIWUuZGV0YWlsIHx8ICFyZWNlbnRseUNsaWNrZWQgfHwgZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgIF9wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgICAgIGxvY2FsaXplUG9pbnQgPSBmdW5jdGlvbiBsb2NhbGl6ZVBvaW50KHApIHtcbiAgICAgIHJldHVybiBtYXRyaXggPyB7XG4gICAgICAgIHg6IHAueCAqIG1hdHJpeC5hICsgcC55ICogbWF0cml4LmMgKyBtYXRyaXguZSxcbiAgICAgICAgeTogcC54ICogbWF0cml4LmIgKyBwLnkgKiBtYXRyaXguZCArIG1hdHJpeC5mXG4gICAgICB9IDoge1xuICAgICAgICB4OiBwLngsXG4gICAgICAgIHk6IHAueVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgb2xkID0gRHJhZ2dhYmxlLmdldCh0YXJnZXQpO1xuICAgIG9sZCAmJiBvbGQua2lsbCgpOyAvLyBhdm9pZHMgZHVwbGljYXRlcyAoYW4gZWxlbWVudCBjYW4gb25seSBiZSBjb250cm9sbGVkIGJ5IG9uZSBEcmFnZ2FibGUpXG4gICAgLy9naXZlIHRoZSB1c2VyIGFjY2VzcyB0byBzdGFydC9zdG9wIGRyYWdnaW5nLi4uXG5cbiAgICBfdGhpczIuc3RhcnREcmFnID0gZnVuY3Rpb24gKGV2ZW50LCBhbGlnbikge1xuICAgICAgdmFyIHIxLCByMiwgcDEsIHAyO1xuICAgICAgb25QcmVzcyhldmVudCB8fCBzZWxmLnBvaW50ZXJFdmVudCwgdHJ1ZSk7IC8vaWYgdGhlIHBvaW50ZXIgaXNuJ3Qgb24gdG9wIG9mIHRoZSBlbGVtZW50LCBhZGp1c3QgdGhpbmdzIGFjY29yZGluZ2x5XG5cbiAgICAgIGlmIChhbGlnbiAmJiAhc2VsZi5oaXRUZXN0KGV2ZW50IHx8IHNlbGYucG9pbnRlckV2ZW50KSkge1xuICAgICAgICByMSA9IF9wYXJzZVJlY3QoZXZlbnQgfHwgc2VsZi5wb2ludGVyRXZlbnQpO1xuICAgICAgICByMiA9IF9wYXJzZVJlY3QodGFyZ2V0KTtcbiAgICAgICAgcDEgPSBsb2NhbGl6ZVBvaW50KHtcbiAgICAgICAgICB4OiByMS5sZWZ0ICsgcjEud2lkdGggLyAyLFxuICAgICAgICAgIHk6IHIxLnRvcCArIHIxLmhlaWdodCAvIDJcbiAgICAgICAgfSk7XG4gICAgICAgIHAyID0gbG9jYWxpemVQb2ludCh7XG4gICAgICAgICAgeDogcjIubGVmdCArIHIyLndpZHRoIC8gMixcbiAgICAgICAgICB5OiByMi50b3AgKyByMi5oZWlnaHQgLyAyXG4gICAgICAgIH0pO1xuICAgICAgICBzdGFydFBvaW50ZXJYIC09IHAxLnggLSBwMi54O1xuICAgICAgICBzdGFydFBvaW50ZXJZIC09IHAxLnkgLSBwMi55O1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNlbGYuaXNEcmFnZ2luZykge1xuICAgICAgICBzZWxmLmlzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgIF9kaXNwYXRjaEV2ZW50KHNlbGYsIFwiZHJhZ3N0YXJ0XCIsIFwib25EcmFnU3RhcnRcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzMi5kcmFnID0gb25Nb3ZlO1xuXG4gICAgX3RoaXMyLmVuZERyYWcgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIG9uUmVsZWFzZShlIHx8IHNlbGYucG9pbnRlckV2ZW50LCB0cnVlKTtcbiAgICB9O1xuXG4gICAgX3RoaXMyLnRpbWVTaW5jZURyYWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc2VsZi5pc0RyYWdnaW5nID8gMCA6IChfZ2V0VGltZSgpIC0gZHJhZ0VuZFRpbWUpIC8gMTAwMDtcbiAgICB9O1xuXG4gICAgX3RoaXMyLnRpbWVTaW5jZUNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIChfZ2V0VGltZSgpIC0gY2xpY2tUaW1lKSAvIDEwMDA7XG4gICAgfTtcblxuICAgIF90aGlzMi5oaXRUZXN0ID0gZnVuY3Rpb24gKHRhcmdldCwgdGhyZXNob2xkKSB7XG4gICAgICByZXR1cm4gRHJhZ2dhYmxlLmhpdFRlc3Qoc2VsZi50YXJnZXQsIHRhcmdldCwgdGhyZXNob2xkKTtcbiAgICB9O1xuXG4gICAgX3RoaXMyLmdldERpcmVjdGlvbiA9IGZ1bmN0aW9uIChmcm9tLCBkaWFnb25hbFRocmVzaG9sZCkge1xuICAgICAgLy9mcm9tIGNhbiBiZSBcInN0YXJ0XCIgKGRlZmF1bHQpLCBcInZlbG9jaXR5XCIsIG9yIGFuIGVsZW1lbnRcbiAgICAgIHZhciBtb2RlID0gZnJvbSA9PT0gXCJ2ZWxvY2l0eVwiICYmIEluZXJ0aWFQbHVnaW4gPyBmcm9tIDogX2lzT2JqZWN0KGZyb20pICYmICFyb3RhdGlvbk1vZGUgPyBcImVsZW1lbnRcIiA6IFwic3RhcnRcIixcbiAgICAgICAgICB4Q2hhbmdlLFxuICAgICAgICAgIHlDaGFuZ2UsXG4gICAgICAgICAgcmF0aW8sXG4gICAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICAgIHIxLFxuICAgICAgICAgIHIyO1xuXG4gICAgICBpZiAobW9kZSA9PT0gXCJlbGVtZW50XCIpIHtcbiAgICAgICAgcjEgPSBfcGFyc2VSZWN0KHNlbGYudGFyZ2V0KTtcbiAgICAgICAgcjIgPSBfcGFyc2VSZWN0KGZyb20pO1xuICAgICAgfVxuXG4gICAgICB4Q2hhbmdlID0gbW9kZSA9PT0gXCJzdGFydFwiID8gc2VsZi54IC0gc3RhcnRFbGVtZW50WCA6IG1vZGUgPT09IFwidmVsb2NpdHlcIiA/IEluZXJ0aWFQbHVnaW4uZ2V0VmVsb2NpdHkodGFyZ2V0LCB4UHJvcCkgOiByMS5sZWZ0ICsgcjEud2lkdGggLyAyIC0gKHIyLmxlZnQgKyByMi53aWR0aCAvIDIpO1xuXG4gICAgICBpZiAocm90YXRpb25Nb2RlKSB7XG4gICAgICAgIHJldHVybiB4Q2hhbmdlIDwgMCA/IFwiY291bnRlci1jbG9ja3dpc2VcIiA6IFwiY2xvY2t3aXNlXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaWFnb25hbFRocmVzaG9sZCA9IGRpYWdvbmFsVGhyZXNob2xkIHx8IDI7XG4gICAgICAgIHlDaGFuZ2UgPSBtb2RlID09PSBcInN0YXJ0XCIgPyBzZWxmLnkgLSBzdGFydEVsZW1lbnRZIDogbW9kZSA9PT0gXCJ2ZWxvY2l0eVwiID8gSW5lcnRpYVBsdWdpbi5nZXRWZWxvY2l0eSh0YXJnZXQsIHlQcm9wKSA6IHIxLnRvcCArIHIxLmhlaWdodCAvIDIgLSAocjIudG9wICsgcjIuaGVpZ2h0IC8gMik7XG4gICAgICAgIHJhdGlvID0gTWF0aC5hYnMoeENoYW5nZSAvIHlDaGFuZ2UpO1xuICAgICAgICBkaXJlY3Rpb24gPSByYXRpbyA8IDEgLyBkaWFnb25hbFRocmVzaG9sZCA/IFwiXCIgOiB4Q2hhbmdlIDwgMCA/IFwibGVmdFwiIDogXCJyaWdodFwiO1xuXG4gICAgICAgIGlmIChyYXRpbyA8IGRpYWdvbmFsVGhyZXNob2xkKSB7XG4gICAgICAgICAgaWYgKGRpcmVjdGlvbiAhPT0gXCJcIikge1xuICAgICAgICAgICAgZGlyZWN0aW9uICs9IFwiLVwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRpcmVjdGlvbiArPSB5Q2hhbmdlIDwgMCA/IFwidXBcIiA6IFwiZG93blwiO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkaXJlY3Rpb247XG4gICAgfTtcblxuICAgIF90aGlzMi5hcHBseUJvdW5kcyA9IGZ1bmN0aW9uIChuZXdCb3VuZHMsIHN0aWNreSkge1xuICAgICAgdmFyIHgsIHksIGZvcmNlWmVyb1ZlbG9jaXR5LCBlLCBwYXJlbnQsIGlzUm9vdDtcblxuICAgICAgaWYgKG5ld0JvdW5kcyAmJiB2YXJzLmJvdW5kcyAhPT0gbmV3Qm91bmRzKSB7XG4gICAgICAgIHZhcnMuYm91bmRzID0gbmV3Qm91bmRzO1xuICAgICAgICByZXR1cm4gc2VsZi51cGRhdGUodHJ1ZSwgc3RpY2t5KTtcbiAgICAgIH1cblxuICAgICAgc3luY1hZKHRydWUpO1xuICAgICAgY2FsY3VsYXRlQm91bmRzKCk7XG5cbiAgICAgIGlmIChoYXNCb3VuZHMgJiYgIWlzVHdlZW5pbmcoKSkge1xuICAgICAgICB4ID0gc2VsZi54O1xuICAgICAgICB5ID0gc2VsZi55O1xuXG4gICAgICAgIGlmICh4ID4gbWF4WCkge1xuICAgICAgICAgIHggPSBtYXhYO1xuICAgICAgICB9IGVsc2UgaWYgKHggPCBtaW5YKSB7XG4gICAgICAgICAgeCA9IG1pblg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeSA+IG1heFkpIHtcbiAgICAgICAgICB5ID0gbWF4WTtcbiAgICAgICAgfSBlbHNlIGlmICh5IDwgbWluWSkge1xuICAgICAgICAgIHkgPSBtaW5ZO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYueCAhPT0geCB8fCBzZWxmLnkgIT09IHkpIHtcbiAgICAgICAgICBmb3JjZVplcm9WZWxvY2l0eSA9IHRydWU7XG4gICAgICAgICAgc2VsZi54ID0gc2VsZi5lbmRYID0geDtcblxuICAgICAgICAgIGlmIChyb3RhdGlvbk1vZGUpIHtcbiAgICAgICAgICAgIHNlbGYuZW5kUm90YXRpb24gPSB4O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLnkgPSBzZWxmLmVuZFkgPSB5O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICByZW5kZXIodHJ1ZSk7XG5cbiAgICAgICAgICBpZiAoc2VsZi5hdXRvU2Nyb2xsICYmICFzZWxmLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIF9yZWNvcmRNYXhTY3JvbGxzKHRhcmdldC5wYXJlbnROb2RlKTtcblxuICAgICAgICAgICAgZSA9IHRhcmdldDtcbiAgICAgICAgICAgIF93aW5kb3dQcm94eS5zY3JvbGxUb3AgPSBfd2luLnBhZ2VZT2Zmc2V0ICE9IG51bGwgPyBfd2luLnBhZ2VZT2Zmc2V0IDogb3duZXJEb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAhPSBudWxsID8gb3duZXJEb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA6IG93bmVyRG9jLmJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgX3dpbmRvd1Byb3h5LnNjcm9sbExlZnQgPSBfd2luLnBhZ2VYT2Zmc2V0ICE9IG51bGwgPyBfd2luLnBhZ2VYT2Zmc2V0IDogb3duZXJEb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgIT0gbnVsbCA/IG93bmVyRG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IDogb3duZXJEb2MuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgICAgICAgICB3aGlsZSAoZSAmJiAhaXNSb290KSB7XG4gICAgICAgICAgICAgIC8vd2FsayB1cCB0aGUgY2hhaW4gYW5kIHNlbnNlIHdoZXJldmVyIHRoZSBzY3JvbGxUb3Avc2Nyb2xsTGVmdCBleGNlZWRzIHRoZSBtYXhpbXVtLlxuICAgICAgICAgICAgICBpc1Jvb3QgPSBfaXNSb290KGUucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICAgIHBhcmVudCA9IGlzUm9vdCA/IF93aW5kb3dQcm94eSA6IGUucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgICBpZiAoYWxsb3dZICYmIHBhcmVudC5zY3JvbGxUb3AgPiBwYXJlbnQuX2dzTWF4U2Nyb2xsWSkge1xuICAgICAgICAgICAgICAgIHBhcmVudC5zY3JvbGxUb3AgPSBwYXJlbnQuX2dzTWF4U2Nyb2xsWTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChhbGxvd1ggJiYgcGFyZW50LnNjcm9sbExlZnQgPiBwYXJlbnQuX2dzTWF4U2Nyb2xsWCkge1xuICAgICAgICAgICAgICAgIHBhcmVudC5zY3JvbGxMZWZ0ID0gcGFyZW50Ll9nc01heFNjcm9sbFg7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBlID0gcGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLmlzVGhyb3dpbmcgJiYgKGZvcmNlWmVyb1ZlbG9jaXR5IHx8IHNlbGYuZW5kWCA+IG1heFggfHwgc2VsZi5lbmRYIDwgbWluWCB8fCBzZWxmLmVuZFkgPiBtYXhZIHx8IHNlbGYuZW5kWSA8IG1pblkpKSB7XG4gICAgICAgICAgYW5pbWF0ZSh2YXJzLmluZXJ0aWEgfHwgdmFycy50aHJvd1Byb3BzLCBmb3JjZVplcm9WZWxvY2l0eSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIF90aGlzMi51cGRhdGUgPSBmdW5jdGlvbiAoYXBwbHlCb3VuZHMsIHN0aWNreSwgaWdub3JlRXh0ZXJuYWxDaGFuZ2VzKSB7XG4gICAgICB2YXIgeCA9IHNlbGYueCxcbiAgICAgICAgICB5ID0gc2VsZi55O1xuICAgICAgdXBkYXRlTWF0cml4KCFzdGlja3kpO1xuXG4gICAgICBpZiAoYXBwbHlCb3VuZHMpIHtcbiAgICAgICAgc2VsZi5hcHBseUJvdW5kcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRpcnR5ICYmIGlnbm9yZUV4dGVybmFsQ2hhbmdlcykge1xuICAgICAgICAgIHJlbmRlcih0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN5bmNYWSh0cnVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0aWNreSkge1xuICAgICAgICBzZXRQb2ludGVyUG9zaXRpb24oc2VsZi5wb2ludGVyWCwgc2VsZi5wb2ludGVyWSk7XG4gICAgICAgIGRpcnR5ICYmIHJlbmRlcih0cnVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGYuaXNQcmVzc2VkICYmICFzdGlja3kgJiYgKGFsbG93WCAmJiBNYXRoLmFicyh4IC0gc2VsZi54KSA+IDAuMDEgfHwgYWxsb3dZICYmIE1hdGguYWJzKHkgLSBzZWxmLnkpID4gMC4wMSAmJiAhcm90YXRpb25Nb2RlKSkge1xuICAgICAgICByZWNvcmRTdGFydFBvc2l0aW9ucygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZi5hdXRvU2Nyb2xsKSB7XG4gICAgICAgIF9yZWNvcmRNYXhTY3JvbGxzKHRhcmdldC5wYXJlbnROb2RlLCBzZWxmLmlzRHJhZ2dpbmcpO1xuXG4gICAgICAgIGNoZWNrQXV0b1Njcm9sbEJvdW5kcyA9IHNlbGYuaXNEcmFnZ2luZztcbiAgICAgICAgcmVuZGVyKHRydWUpOyAvL2luIGNhc2UgcmVwYXJlbnRpbmcgb2NjdXJyZWQuXG5cbiAgICAgICAgX3JlbW92ZVNjcm9sbExpc3RlbmVyKHRhcmdldCwgdXBkYXRlU2Nyb2xsKTtcblxuICAgICAgICBfYWRkU2Nyb2xsTGlzdGVuZXIodGFyZ2V0LCB1cGRhdGVTY3JvbGwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgX3RoaXMyLmVuYWJsZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICB2YXIgc2V0VmFycyA9IHtcbiAgICAgICAgbGF6eTogdHJ1ZVxuICAgICAgfSxcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBpLFxuICAgICAgICAgIHRyaWdnZXI7XG5cbiAgICAgIGlmICghcm90YXRpb25Nb2RlICYmIHZhcnMuY3Vyc29yICE9PSBmYWxzZSkge1xuICAgICAgICBzZXRWYXJzLmN1cnNvciA9IHZhcnMuY3Vyc29yIHx8IF9kZWZhdWx0Q3Vyc29yO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ3NhcC51dGlscy5jaGVja1ByZWZpeChcInRvdWNoQ2FsbG91dFwiKSkge1xuICAgICAgICBzZXRWYXJzLnRvdWNoQ2FsbG91dCA9IFwibm9uZVwiO1xuICAgICAgfVxuXG4gICAgICBzZXRWYXJzLnRvdWNoQWN0aW9uID0gYWxsb3dYID09PSBhbGxvd1kgPyBcIm5vbmVcIiA6IHZhcnMuYWxsb3dOYXRpdmVUb3VjaFNjcm9sbGluZyB8fCB2YXJzLmFsbG93RXZlbnREZWZhdWx0ID8gXCJtYW5pcHVsYXRpb25cIiA6IGFsbG93WCA/IFwicGFuLXlcIiA6IFwicGFuLXhcIjtcblxuICAgICAgaWYgKHR5cGUgIT09IFwic29mdFwiKSB7XG4gICAgICAgIGkgPSB0cmlnZ2Vycy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKC0taSA+IC0xKSB7XG4gICAgICAgICAgdHJpZ2dlciA9IHRyaWdnZXJzW2ldO1xuICAgICAgICAgIF9zdXBwb3J0c1BvaW50ZXIgfHwgX2FkZExpc3RlbmVyKHRyaWdnZXIsIFwibW91c2Vkb3duXCIsIG9uUHJlc3MpO1xuXG4gICAgICAgICAgX2FkZExpc3RlbmVyKHRyaWdnZXIsIFwidG91Y2hzdGFydFwiLCBvblByZXNzKTtcblxuICAgICAgICAgIF9hZGRMaXN0ZW5lcih0cmlnZ2VyLCBcImNsaWNrXCIsIG9uQ2xpY2ssIHRydWUpOyAvL25vdGU6IHVzZWQgdG8gcGFzcyB0cnVlIGZvciBjYXB0dXJlIGJ1dCBpdCBwcmV2ZW50ZWQgY2xpY2stdG8tcGxheS12aWRlbyBmdW5jdGlvbmFsaXR5IGluIEZpcmVmb3guXG5cblxuICAgICAgICAgIGdzYXAuc2V0KHRyaWdnZXIsIHNldFZhcnMpO1xuXG4gICAgICAgICAgaWYgKHRyaWdnZXIuZ2V0QkJveCAmJiB0cmlnZ2VyLm93bmVyU1ZHRWxlbWVudCkge1xuICAgICAgICAgICAgLy8gYSBidWcgaW4gY2hyb21lIGRvZXNuJ3QgcmVzcGVjdCB0b3VjaC1hY3Rpb24gb24gU1ZHIGVsZW1lbnRzIC0gaXQgb25seSB3b3JrcyBpZiB3ZSBzZXQgaXQgb24gdGhlIHBhcmVudCBTVkcuXG4gICAgICAgICAgICBnc2FwLnNldCh0cmlnZ2VyLm93bmVyU1ZHRWxlbWVudCwge1xuICAgICAgICAgICAgICB0b3VjaEFjdGlvbjogYWxsb3dYID09PSBhbGxvd1kgPyBcIm5vbmVcIiA6IHZhcnMuYWxsb3dOYXRpdmVUb3VjaFNjcm9sbGluZyB8fCB2YXJzLmFsbG93RXZlbnREZWZhdWx0ID8gXCJtYW5pcHVsYXRpb25cIiA6IGFsbG93WCA/IFwicGFuLXlcIiA6IFwicGFuLXhcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFycy5hbGxvd0NvbnRleHRNZW51IHx8IF9hZGRMaXN0ZW5lcih0cmlnZ2VyLCBcImNvbnRleHRtZW51XCIsIG9uQ29udGV4dE1lbnUpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3NldFNlbGVjdGFibGUodHJpZ2dlcnMsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgX2FkZFNjcm9sbExpc3RlbmVyKHRhcmdldCwgdXBkYXRlU2Nyb2xsKTtcblxuICAgICAgZW5hYmxlZCA9IHRydWU7XG5cbiAgICAgIGlmIChJbmVydGlhUGx1Z2luICYmIHR5cGUgIT09IFwic29mdFwiKSB7XG4gICAgICAgIEluZXJ0aWFQbHVnaW4udHJhY2soc2Nyb2xsUHJveHkgfHwgdGFyZ2V0LCB4eU1vZGUgPyBcIngseVwiIDogcm90YXRpb25Nb2RlID8gXCJyb3RhdGlvblwiIDogXCJ0b3AsbGVmdFwiKTtcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0Ll9nc0RyYWdJRCA9IGlkID0gXCJkXCIgKyBfbG9va3VwQ291bnQrKztcbiAgICAgIF9sb29rdXBbaWRdID0gc2VsZjtcblxuICAgICAgaWYgKHNjcm9sbFByb3h5KSB7XG4gICAgICAgIHNjcm9sbFByb3h5LmVuYWJsZSgpO1xuICAgICAgICBzY3JvbGxQcm94eS5lbGVtZW50Ll9nc0RyYWdJRCA9IGlkO1xuICAgICAgfVxuXG4gICAgICAodmFycy5ib3VuZHMgfHwgcm90YXRpb25Nb2RlKSAmJiByZWNvcmRTdGFydFBvc2l0aW9ucygpO1xuICAgICAgdmFycy5ib3VuZHMgJiYgc2VsZi5hcHBseUJvdW5kcygpO1xuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIF90aGlzMi5kaXNhYmxlID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIHZhciBkcmFnZ2luZyA9IHNlbGYuaXNEcmFnZ2luZyxcbiAgICAgICAgICBpLFxuICAgICAgICAgIHRyaWdnZXI7XG5cbiAgICAgIGlmICghcm90YXRpb25Nb2RlKSB7XG4gICAgICAgIGkgPSB0cmlnZ2Vycy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKC0taSA+IC0xKSB7XG4gICAgICAgICAgX3NldFN0eWxlKHRyaWdnZXJzW2ldLCBcImN1cnNvclwiLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZSAhPT0gXCJzb2Z0XCIpIHtcbiAgICAgICAgaSA9IHRyaWdnZXJzLmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoLS1pID4gLTEpIHtcbiAgICAgICAgICB0cmlnZ2VyID0gdHJpZ2dlcnNbaV07XG5cbiAgICAgICAgICBfc2V0U3R5bGUodHJpZ2dlciwgXCJ0b3VjaENhbGxvdXRcIiwgbnVsbCk7XG5cbiAgICAgICAgICBfc2V0U3R5bGUodHJpZ2dlciwgXCJ0b3VjaEFjdGlvblwiLCBudWxsKTtcblxuICAgICAgICAgIF9yZW1vdmVMaXN0ZW5lcih0cmlnZ2VyLCBcIm1vdXNlZG93blwiLCBvblByZXNzKTtcblxuICAgICAgICAgIF9yZW1vdmVMaXN0ZW5lcih0cmlnZ2VyLCBcInRvdWNoc3RhcnRcIiwgb25QcmVzcyk7XG5cbiAgICAgICAgICBfcmVtb3ZlTGlzdGVuZXIodHJpZ2dlciwgXCJjbGlja1wiLCBvbkNsaWNrKTtcblxuICAgICAgICAgIF9yZW1vdmVMaXN0ZW5lcih0cmlnZ2VyLCBcImNvbnRleHRtZW51XCIsIG9uQ29udGV4dE1lbnUpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3NldFNlbGVjdGFibGUodHJpZ2dlcnMsIHRydWUpO1xuXG4gICAgICAgIGlmICh0b3VjaEV2ZW50VGFyZ2V0KSB7XG4gICAgICAgICAgX3JlbW92ZUxpc3RlbmVyKHRvdWNoRXZlbnRUYXJnZXQsIFwidG91Y2hjYW5jZWxcIiwgb25SZWxlYXNlKTtcblxuICAgICAgICAgIF9yZW1vdmVMaXN0ZW5lcih0b3VjaEV2ZW50VGFyZ2V0LCBcInRvdWNoZW5kXCIsIG9uUmVsZWFzZSk7XG5cbiAgICAgICAgICBfcmVtb3ZlTGlzdGVuZXIodG91Y2hFdmVudFRhcmdldCwgXCJ0b3VjaG1vdmVcIiwgb25Nb3ZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9yZW1vdmVMaXN0ZW5lcihvd25lckRvYywgXCJtb3VzZXVwXCIsIG9uUmVsZWFzZSk7XG5cbiAgICAgICAgX3JlbW92ZUxpc3RlbmVyKG93bmVyRG9jLCBcIm1vdXNlbW92ZVwiLCBvbk1vdmUpO1xuICAgICAgfVxuXG4gICAgICBfcmVtb3ZlU2Nyb2xsTGlzdGVuZXIodGFyZ2V0LCB1cGRhdGVTY3JvbGwpO1xuXG4gICAgICBlbmFibGVkID0gZmFsc2U7XG5cbiAgICAgIGlmIChJbmVydGlhUGx1Z2luICYmIHR5cGUgIT09IFwic29mdFwiKSB7XG4gICAgICAgIEluZXJ0aWFQbHVnaW4udW50cmFjayhzY3JvbGxQcm94eSB8fCB0YXJnZXQsIHh5TW9kZSA/IFwieCx5XCIgOiByb3RhdGlvbk1vZGUgPyBcInJvdGF0aW9uXCIgOiBcInRvcCxsZWZ0XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsUHJveHkpIHtcbiAgICAgICAgc2Nyb2xsUHJveHkuZGlzYWJsZSgpO1xuICAgICAgfVxuXG4gICAgICBfcmVtb3ZlRnJvbVJlbmRlclF1ZXVlKHJlbmRlcik7XG5cbiAgICAgIHNlbGYuaXNEcmFnZ2luZyA9IHNlbGYuaXNQcmVzc2VkID0gaXNDbGlja2luZyA9IGZhbHNlO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgX2Rpc3BhdGNoRXZlbnQoc2VsZiwgXCJkcmFnZW5kXCIsIFwib25EcmFnRW5kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgX3RoaXMyLmVuYWJsZWQgPSBmdW5jdGlvbiAodmFsdWUsIHR5cGUpIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gdmFsdWUgPyBzZWxmLmVuYWJsZSh0eXBlKSA6IHNlbGYuZGlzYWJsZSh0eXBlKSA6IGVuYWJsZWQ7XG4gICAgfTtcblxuICAgIF90aGlzMi5raWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5pc1Rocm93aW5nID0gZmFsc2U7XG5cbiAgICAgIGlmIChzZWxmLnR3ZWVuKSB7XG4gICAgICAgIHNlbGYudHdlZW4ua2lsbCgpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLmRpc2FibGUoKTtcbiAgICAgIGdzYXAuc2V0KHRyaWdnZXJzLCB7XG4gICAgICAgIGNsZWFyUHJvcHM6IFwidXNlclNlbGVjdFwiXG4gICAgICB9KTtcbiAgICAgIGRlbGV0ZSBfbG9va3VwW3RhcmdldC5fZ3NEcmFnSURdO1xuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGlmICh+dHlwZS5pbmRleE9mKFwic2Nyb2xsXCIpKSB7XG4gICAgICBzY3JvbGxQcm94eSA9IF90aGlzMi5zY3JvbGxQcm94eSA9IG5ldyBTY3JvbGxQcm94eSh0YXJnZXQsIF9leHRlbmQoe1xuICAgICAgICBvbktpbGw6IGZ1bmN0aW9uIG9uS2lsbCgpIHtcbiAgICAgICAgICAvL1Njcm9sbFByb3h5J3Mgb25LaWxsKCkgZ2V0cyBjYWxsZWQgaWYvd2hlbiB0aGUgU2Nyb2xsUHJveHkgc2Vuc2VzIHRoYXQgdGhlIHVzZXIgaW50ZXJhY3RlZCB3aXRoIHRoZSBzY3JvbGwgcG9zaXRpb24gbWFudWFsbHkgKGxpa2UgdXNpbmcgdGhlIHNjcm9sbGJhcikuIElFOSBkb2Vzbid0IGZpcmUgdGhlIFwibW91c2V1cFwiIHByb3Blcmx5IHdoZW4gdXNlcnMgZHJhZyB0aGUgc2Nyb2xsYmFyIG9mIGFuIGVsZW1lbnQsIHNvIHRoaXMgd29ya3MgYXJvdW5kIHRoYXQgaXNzdWUuXG4gICAgICAgICAgaWYgKHNlbGYuaXNQcmVzc2VkKSB7XG4gICAgICAgICAgICBvblJlbGVhc2UobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB2YXJzKSk7IC8vYSBidWcgaW4gbWFueSBBbmRyb2lkIGRldmljZXMnIHN0b2NrIGJyb3dzZXIgY2F1c2VzIHNjcm9sbFRvcCB0byBnZXQgZm9yY2VkIGJhY2sgdG8gMCBhZnRlciBpdCBpcyBhbHRlcmVkIHZpYSBKUywgc28gd2Ugc2V0IG92ZXJmbG93IHRvIFwiaGlkZGVuXCIgb24gbW9iaWxlL3RvdWNoIGRldmljZXMgKHRoZXkgaGlkZSB0aGUgc2Nyb2xsIGJhciBhbnl3YXkpLiBUaGF0IHdvcmtzIGFyb3VuZCB0aGUgYnVnLiAoVGhpcyBidWcgaXMgZGlzY3Vzc2VkIGF0IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvYW5kcm9pZC9pc3N1ZXMvZGV0YWlsP2lkPTE5NjI1KVxuXG4gICAgICB0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gYWxsb3dZICYmICFfaXNUb3VjaERldmljZSA/IFwiYXV0b1wiIDogXCJoaWRkZW5cIjtcbiAgICAgIHRhcmdldC5zdHlsZS5vdmVyZmxvd1ggPSBhbGxvd1ggJiYgIV9pc1RvdWNoRGV2aWNlID8gXCJhdXRvXCIgOiBcImhpZGRlblwiO1xuICAgICAgdGFyZ2V0ID0gc2Nyb2xsUHJveHkuY29udGVudDtcbiAgICB9XG5cbiAgICBpZiAocm90YXRpb25Nb2RlKSB7XG4gICAgICBraWxsUHJvcHMucm90YXRpb24gPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWxsb3dYKSB7XG4gICAgICAgIGtpbGxQcm9wc1t4UHJvcF0gPSAxO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWxsb3dZKSB7XG4gICAgICAgIGtpbGxQcm9wc1t5UHJvcF0gPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdzQ2FjaGUuZm9yY2UzRCA9IFwiZm9yY2UzRFwiIGluIHZhcnMgPyB2YXJzLmZvcmNlM0QgOiB0cnVlOyAvL290aGVyd2lzZSwgbm9ybWFsIGRyYWdnaW5nIHdvdWxkIGJlIGluIDJEIGFuZCB0aGVuIGFzIHNvb24gYXMgaXQncyByZWxlYXNlZCBhbmQgdGhlcmUncyBhbiBpbmVydGlhIHR3ZWVuLCBpdCdkIGp1bXAgdG8gM0Qgd2hpY2ggY2FuIGNyZWF0ZSBhbiBpbml0aWFsIGp1bXAgZHVlIHRvIHRoZSB3b3JrIHRoZSBicm93c2VyIG11c3QgdG8gZG8gbGF5ZXJpemUgaXQuXG5cbiAgICBfdGhpczIuZW5hYmxlKCk7XG5cbiAgICByZXR1cm4gX3RoaXMyO1xuICB9XG5cbiAgRHJhZ2dhYmxlLnJlZ2lzdGVyID0gZnVuY3Rpb24gcmVnaXN0ZXIoY29yZSkge1xuICAgIGdzYXAgPSBjb3JlO1xuXG4gICAgX2luaXRDb3JlKCk7XG4gIH07XG5cbiAgRHJhZ2dhYmxlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZSh0YXJnZXRzLCB2YXJzKSB7XG4gICAgaWYgKCFfY29yZUluaXR0ZWQpIHtcbiAgICAgIF9pbml0Q29yZSh0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3RvQXJyYXkodGFyZ2V0cykubWFwKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKHRhcmdldCwgdmFycyk7XG4gICAgfSk7XG4gIH07XG5cbiAgRHJhZ2dhYmxlLmdldCA9IGZ1bmN0aW9uIGdldCh0YXJnZXQpIHtcbiAgICByZXR1cm4gX2xvb2t1cFsoX3RvQXJyYXkodGFyZ2V0KVswXSB8fCB7fSkuX2dzRHJhZ0lEXTtcbiAgfTtcblxuICBEcmFnZ2FibGUudGltZVNpbmNlRHJhZyA9IGZ1bmN0aW9uIHRpbWVTaW5jZURyYWcoKSB7XG4gICAgcmV0dXJuIChfZ2V0VGltZSgpIC0gX2xhc3REcmFnVGltZSkgLyAxMDAwO1xuICB9O1xuXG4gIERyYWdnYWJsZS5oaXRUZXN0ID0gZnVuY3Rpb24gaGl0VGVzdChvYmoxLCBvYmoyLCB0aHJlc2hvbGQpIHtcbiAgICBpZiAob2JqMSA9PT0gb2JqMikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciByMSA9IF9wYXJzZVJlY3Qob2JqMSksXG4gICAgICAgIHIyID0gX3BhcnNlUmVjdChvYmoyKSxcbiAgICAgICAgdG9wID0gcjEudG9wLFxuICAgICAgICBsZWZ0ID0gcjEubGVmdCxcbiAgICAgICAgcmlnaHQgPSByMS5yaWdodCxcbiAgICAgICAgYm90dG9tID0gcjEuYm90dG9tLFxuICAgICAgICB3aWR0aCA9IHIxLndpZHRoLFxuICAgICAgICBoZWlnaHQgPSByMS5oZWlnaHQsXG4gICAgICAgIGlzT3V0c2lkZSA9IHIyLmxlZnQgPiByaWdodCB8fCByMi5yaWdodCA8IGxlZnQgfHwgcjIudG9wID4gYm90dG9tIHx8IHIyLmJvdHRvbSA8IHRvcCxcbiAgICAgICAgb3ZlcmxhcCxcbiAgICAgICAgYXJlYSxcbiAgICAgICAgaXNSYXRpbztcblxuICAgIGlmIChpc091dHNpZGUgfHwgIXRocmVzaG9sZCkge1xuICAgICAgcmV0dXJuICFpc091dHNpZGU7XG4gICAgfVxuXG4gICAgaXNSYXRpbyA9ICh0aHJlc2hvbGQgKyBcIlwiKS5pbmRleE9mKFwiJVwiKSAhPT0gLTE7XG4gICAgdGhyZXNob2xkID0gcGFyc2VGbG9hdCh0aHJlc2hvbGQpIHx8IDA7XG4gICAgb3ZlcmxhcCA9IHtcbiAgICAgIGxlZnQ6IE1hdGgubWF4KGxlZnQsIHIyLmxlZnQpLFxuICAgICAgdG9wOiBNYXRoLm1heCh0b3AsIHIyLnRvcClcbiAgICB9O1xuICAgIG92ZXJsYXAud2lkdGggPSBNYXRoLm1pbihyaWdodCwgcjIucmlnaHQpIC0gb3ZlcmxhcC5sZWZ0O1xuICAgIG92ZXJsYXAuaGVpZ2h0ID0gTWF0aC5taW4oYm90dG9tLCByMi5ib3R0b20pIC0gb3ZlcmxhcC50b3A7XG5cbiAgICBpZiAob3ZlcmxhcC53aWR0aCA8IDAgfHwgb3ZlcmxhcC5oZWlnaHQgPCAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzUmF0aW8pIHtcbiAgICAgIHRocmVzaG9sZCAqPSAwLjAxO1xuICAgICAgYXJlYSA9IG92ZXJsYXAud2lkdGggKiBvdmVybGFwLmhlaWdodDtcbiAgICAgIHJldHVybiBhcmVhID49IHdpZHRoICogaGVpZ2h0ICogdGhyZXNob2xkIHx8IGFyZWEgPj0gcjIud2lkdGggKiByMi5oZWlnaHQgKiB0aHJlc2hvbGQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXAud2lkdGggPiB0aHJlc2hvbGQgJiYgb3ZlcmxhcC5oZWlnaHQgPiB0aHJlc2hvbGQ7XG4gIH07XG5cbiAgcmV0dXJuIERyYWdnYWJsZTtcbn0oRXZlbnREaXNwYXRjaGVyKTtcblxuX3NldERlZmF1bHRzKERyYWdnYWJsZS5wcm90b3R5cGUsIHtcbiAgcG9pbnRlclg6IDAsXG4gIHBvaW50ZXJZOiAwLFxuICBzdGFydFg6IDAsXG4gIHN0YXJ0WTogMCxcbiAgZGVsdGFYOiAwLFxuICBkZWx0YVk6IDAsXG4gIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICBpc1ByZXNzZWQ6IGZhbHNlXG59KTtcblxuRHJhZ2dhYmxlLnpJbmRleCA9IDEwMDA7XG5EcmFnZ2FibGUudmVyc2lvbiA9IFwiMy41LjFcIjtcbl9nZXRHU0FQKCkgJiYgZ3NhcC5yZWdpc3RlclBsdWdpbihEcmFnZ2FibGUpO1xuZXhwb3J0IHsgRHJhZ2dhYmxlIGFzIGRlZmF1bHQgfTsiLCIvKiFcbiAqIEVhc2VQYWNrIDMuNS4xXG4gKiBodHRwczovL2dyZWVuc29jay5jb21cbiAqXG4gKiBAbGljZW5zZSBDb3B5cmlnaHQgMjAwOC0yMDIwLCBHcmVlblNvY2suIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBTdWJqZWN0IHRvIHRoZSB0ZXJtcyBhdCBodHRwczovL2dyZWVuc29jay5jb20vc3RhbmRhcmQtbGljZW5zZSBvciBmb3JcbiAqIENsdWIgR3JlZW5Tb2NrIG1lbWJlcnMsIHRoZSBhZ3JlZW1lbnQgaXNzdWVkIHdpdGggdGhhdCBtZW1iZXJzaGlwLlxuICogQGF1dGhvcjogSmFjayBEb3lsZSwgamFja0BncmVlbnNvY2suY29tXG4qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xudmFyIGdzYXAsXG4gICAgX2NvcmVJbml0dGVkLFxuICAgIF9yZWdpc3RlckVhc2UsXG4gICAgX2dldEdTQVAgPSBmdW5jdGlvbiBfZ2V0R1NBUCgpIHtcbiAgcmV0dXJuIGdzYXAgfHwgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiAoZ3NhcCA9IHdpbmRvdy5nc2FwKSAmJiBnc2FwLnJlZ2lzdGVyUGx1Z2luICYmIGdzYXA7XG59LFxuICAgIF9ib29sZWFuID0gZnVuY3Rpb24gX2Jvb2xlYW4odmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xuICByZXR1cm4gISEodHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiID8gZGVmYXVsdFZhbHVlIDogdmFsdWUgJiYgIX4odmFsdWUgKyBcIlwiKS5pbmRleE9mKFwiZmFsc2VcIikpO1xufSxcbiAgICBfaW5pdENvcmUgPSBmdW5jdGlvbiBfaW5pdENvcmUoY29yZSkge1xuICBnc2FwID0gY29yZSB8fCBfZ2V0R1NBUCgpO1xuXG4gIGlmIChnc2FwKSB7XG4gICAgX3JlZ2lzdGVyRWFzZSA9IGdzYXAucmVnaXN0ZXJFYXNlOyAvL2FkZCB3ZWlnaHRlZCBlYXNlIGNhcGFiaWxpdGllcyB0byBzdGFuZGFyZCBlYXNlcyBzbyB1c2VycyBjYW4gZG8gXCJwb3dlcjIuaW5PdXQoMC44KVwiIGZvciBleGFtcGxlIHRvIHB1c2ggZXZlcnl0aGluZyB0b3dhcmQgdGhlIFwib3V0XCIsIG9yICgtMC44KSB0byBwdXNoIGl0IHRvd2FyZCB0aGUgXCJpblwiICgwIGlzIG5ldXRyYWwpXG5cbiAgICB2YXIgZWFzZXMgPSBnc2FwLnBhcnNlRWFzZSgpLFxuICAgICAgICBjcmVhdGVDb25maWcgPSBmdW5jdGlvbiBjcmVhdGVDb25maWcoZWFzZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyYXRpbykge1xuICAgICAgICB2YXIgeSA9IDAuNSArIHJhdGlvIC8gMjtcblxuICAgICAgICBlYXNlLmNvbmZpZyA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgcmV0dXJuIGVhc2UoMiAqICgxIC0gcCkgKiBwICogeSArIHAgKiBwKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfSxcbiAgICAgICAgcDtcblxuICAgIGZvciAocCBpbiBlYXNlcykge1xuICAgICAgaWYgKCFlYXNlc1twXS5jb25maWcpIHtcbiAgICAgICAgY3JlYXRlQ29uZmlnKGVhc2VzW3BdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfcmVnaXN0ZXJFYXNlKFwic2xvd1wiLCBTbG93TW8pO1xuXG4gICAgX3JlZ2lzdGVyRWFzZShcImV4cG9TY2FsZVwiLCBFeHBvU2NhbGVFYXNlKTtcblxuICAgIF9yZWdpc3RlckVhc2UoXCJyb3VnaFwiLCBSb3VnaEVhc2UpO1xuXG4gICAgZm9yIChwIGluIEVhc2VQYWNrKSB7XG4gICAgICBwICE9PSBcInZlcnNpb25cIiAmJiBnc2FwLmNvcmUuZ2xvYmFscyhwLCBFYXNlUGFja1twXSk7XG4gICAgfVxuXG4gICAgX2NvcmVJbml0dGVkID0gMTtcbiAgfVxufSxcbiAgICBfY3JlYXRlU2xvd01vID0gZnVuY3Rpb24gX2NyZWF0ZVNsb3dNbyhsaW5lYXJSYXRpbywgcG93ZXIsIHlveW9Nb2RlKSB7XG4gIGxpbmVhclJhdGlvID0gTWF0aC5taW4oMSwgbGluZWFyUmF0aW8gfHwgMC43KTtcblxuICB2YXIgcG93ID0gbGluZWFyUmF0aW8gPCAxID8gcG93ZXIgfHwgcG93ZXIgPT09IDAgPyBwb3dlciA6IDAuNyA6IDAsXG4gICAgICBwMSA9ICgxIC0gbGluZWFyUmF0aW8pIC8gMixcbiAgICAgIHAzID0gcDEgKyBsaW5lYXJSYXRpbyxcbiAgICAgIGNhbGNFbmQgPSBfYm9vbGVhbih5b3lvTW9kZSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChwKSB7XG4gICAgdmFyIHIgPSBwICsgKDAuNSAtIHApICogcG93O1xuICAgIHJldHVybiBwIDwgcDEgPyBjYWxjRW5kID8gMSAtIChwID0gMSAtIHAgLyBwMSkgKiBwIDogciAtIChwID0gMSAtIHAgLyBwMSkgKiBwICogcCAqIHAgKiByIDogcCA+IHAzID8gY2FsY0VuZCA/IHAgPT09IDEgPyAwIDogMSAtIChwID0gKHAgLSBwMykgLyBwMSkgKiBwIDogciArIChwIC0gcikgKiAocCA9IChwIC0gcDMpIC8gcDEpICogcCAqIHAgKiBwIDogY2FsY0VuZCA/IDEgOiByO1xuICB9O1xufSxcbiAgICBfY3JlYXRlRXhwb1NjYWxlID0gZnVuY3Rpb24gX2NyZWF0ZUV4cG9TY2FsZShzdGFydCwgZW5kLCBlYXNlKSB7XG4gIHZhciBwMSA9IE1hdGgubG9nKGVuZCAvIHN0YXJ0KSxcbiAgICAgIHAyID0gZW5kIC0gc3RhcnQ7XG4gIGVhc2UgJiYgKGVhc2UgPSBnc2FwLnBhcnNlRWFzZShlYXNlKSk7XG4gIHJldHVybiBmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiAoc3RhcnQgKiBNYXRoLmV4cChwMSAqIChlYXNlID8gZWFzZShwKSA6IHApKSAtIHN0YXJ0KSAvIHAyO1xuICB9O1xufSxcbiAgICBFYXNlUG9pbnQgPSBmdW5jdGlvbiBFYXNlUG9pbnQodGltZSwgdmFsdWUsIG5leHQpIHtcbiAgdGhpcy50ID0gdGltZTtcbiAgdGhpcy52ID0gdmFsdWU7XG5cbiAgaWYgKG5leHQpIHtcbiAgICB0aGlzLm5leHQgPSBuZXh0O1xuICAgIG5leHQucHJldiA9IHRoaXM7XG4gICAgdGhpcy5jID0gbmV4dC52IC0gdmFsdWU7XG4gICAgdGhpcy5nYXAgPSBuZXh0LnQgLSB0aW1lO1xuICB9XG59LFxuICAgIF9jcmVhdGVSb3VnaEVhc2UgPSBmdW5jdGlvbiBfY3JlYXRlUm91Z2hFYXNlKHZhcnMpIHtcbiAgaWYgKHR5cGVvZiB2YXJzICE9PSBcIm9iamVjdFwiKSB7XG4gICAgLy91c2VycyBtYXkgcGFzcyBpbiB2aWEgYSBzdHJpbmcsIGxpa2UgXCJyb3VnaCgzMClcIlxuICAgIHZhcnMgPSB7XG4gICAgICBwb2ludHM6ICt2YXJzIHx8IDIwXG4gICAgfTtcbiAgfVxuXG4gIHZhciB0YXBlciA9IHZhcnMudGFwZXIgfHwgXCJub25lXCIsXG4gICAgICBhID0gW10sXG4gICAgICBjbnQgPSAwLFxuICAgICAgcG9pbnRzID0gKCt2YXJzLnBvaW50cyB8fCAyMCkgfCAwLFxuICAgICAgaSA9IHBvaW50cyxcbiAgICAgIHJhbmRvbWl6ZSA9IF9ib29sZWFuKHZhcnMucmFuZG9taXplLCB0cnVlKSxcbiAgICAgIGNsYW1wID0gX2Jvb2xlYW4odmFycy5jbGFtcCksXG4gICAgICB0ZW1wbGF0ZSA9IGdzYXAgPyBnc2FwLnBhcnNlRWFzZSh2YXJzLnRlbXBsYXRlKSA6IDAsXG4gICAgICBzdHJlbmd0aCA9ICgrdmFycy5zdHJlbmd0aCB8fCAxKSAqIDAuNCxcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgYnVtcCxcbiAgICAgIGludlgsXG4gICAgICBvYmosXG4gICAgICBwbnQsXG4gICAgICByZWNlbnQ7XG5cbiAgd2hpbGUgKC0taSA+IC0xKSB7XG4gICAgeCA9IHJhbmRvbWl6ZSA/IE1hdGgucmFuZG9tKCkgOiAxIC8gcG9pbnRzICogaTtcbiAgICB5ID0gdGVtcGxhdGUgPyB0ZW1wbGF0ZSh4KSA6IHg7XG5cbiAgICBpZiAodGFwZXIgPT09IFwibm9uZVwiKSB7XG4gICAgICBidW1wID0gc3RyZW5ndGg7XG4gICAgfSBlbHNlIGlmICh0YXBlciA9PT0gXCJvdXRcIikge1xuICAgICAgaW52WCA9IDEgLSB4O1xuICAgICAgYnVtcCA9IGludlggKiBpbnZYICogc3RyZW5ndGg7XG4gICAgfSBlbHNlIGlmICh0YXBlciA9PT0gXCJpblwiKSB7XG4gICAgICBidW1wID0geCAqIHggKiBzdHJlbmd0aDtcbiAgICB9IGVsc2UgaWYgKHggPCAwLjUpIHtcbiAgICAgIC8vXCJib3RoXCIgKHN0YXJ0KVxuICAgICAgaW52WCA9IHggKiAyO1xuICAgICAgYnVtcCA9IGludlggKiBpbnZYICogMC41ICogc3RyZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vXCJib3RoXCIgKGVuZClcbiAgICAgIGludlggPSAoMSAtIHgpICogMjtcbiAgICAgIGJ1bXAgPSBpbnZYICogaW52WCAqIDAuNSAqIHN0cmVuZ3RoO1xuICAgIH1cblxuICAgIGlmIChyYW5kb21pemUpIHtcbiAgICAgIHkgKz0gTWF0aC5yYW5kb20oKSAqIGJ1bXAgLSBidW1wICogMC41O1xuICAgIH0gZWxzZSBpZiAoaSAlIDIpIHtcbiAgICAgIHkgKz0gYnVtcCAqIDAuNTtcbiAgICB9IGVsc2Uge1xuICAgICAgeSAtPSBidW1wICogMC41O1xuICAgIH1cblxuICAgIGlmIChjbGFtcCkge1xuICAgICAgaWYgKHkgPiAxKSB7XG4gICAgICAgIHkgPSAxO1xuICAgICAgfSBlbHNlIGlmICh5IDwgMCkge1xuICAgICAgICB5ID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhW2NudCsrXSA9IHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5XG4gICAgfTtcbiAgfVxuXG4gIGEuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhLnggLSBiLng7XG4gIH0pO1xuICBwbnQgPSBuZXcgRWFzZVBvaW50KDEsIDEsIG51bGwpO1xuICBpID0gcG9pbnRzO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBvYmogPSBhW2ldO1xuICAgIHBudCA9IG5ldyBFYXNlUG9pbnQob2JqLngsIG9iai55LCBwbnQpO1xuICB9XG5cbiAgcmVjZW50ID0gbmV3IEVhc2VQb2ludCgwLCAwLCBwbnQudCA/IHBudCA6IHBudC5uZXh0KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChwKSB7XG4gICAgdmFyIHBudCA9IHJlY2VudDtcblxuICAgIGlmIChwID4gcG50LnQpIHtcbiAgICAgIHdoaWxlIChwbnQubmV4dCAmJiBwID49IHBudC50KSB7XG4gICAgICAgIHBudCA9IHBudC5uZXh0O1xuICAgICAgfVxuXG4gICAgICBwbnQgPSBwbnQucHJldjtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKHBudC5wcmV2ICYmIHAgPD0gcG50LnQpIHtcbiAgICAgICAgcG50ID0gcG50LnByZXY7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVjZW50ID0gcG50O1xuICAgIHJldHVybiBwbnQudiArIChwIC0gcG50LnQpIC8gcG50LmdhcCAqIHBudC5jO1xuICB9O1xufTtcblxuZXhwb3J0IHZhciBTbG93TW8gPSBfY3JlYXRlU2xvd01vKDAuNyk7XG5TbG93TW8uZWFzZSA9IFNsb3dNbzsgLy9mb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuXG5TbG93TW8uY29uZmlnID0gX2NyZWF0ZVNsb3dNbztcbmV4cG9ydCB2YXIgRXhwb1NjYWxlRWFzZSA9IF9jcmVhdGVFeHBvU2NhbGUoMSwgMik7XG5FeHBvU2NhbGVFYXNlLmNvbmZpZyA9IF9jcmVhdGVFeHBvU2NhbGU7XG5leHBvcnQgdmFyIFJvdWdoRWFzZSA9IF9jcmVhdGVSb3VnaEVhc2UoKTtcblJvdWdoRWFzZS5lYXNlID0gUm91Z2hFYXNlOyAvL2ZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5cblJvdWdoRWFzZS5jb25maWcgPSBfY3JlYXRlUm91Z2hFYXNlO1xuZXhwb3J0IHZhciBFYXNlUGFjayA9IHtcbiAgU2xvd01vOiBTbG93TW8sXG4gIFJvdWdoRWFzZTogUm91Z2hFYXNlLFxuICBFeHBvU2NhbGVFYXNlOiBFeHBvU2NhbGVFYXNlXG59O1xuXG5mb3IgKHZhciBwIGluIEVhc2VQYWNrKSB7XG4gIEVhc2VQYWNrW3BdLnJlZ2lzdGVyID0gX2luaXRDb3JlO1xuICBFYXNlUGFja1twXS52ZXJzaW9uID0gXCIzLjUuMVwiO1xufVxuXG5fZ2V0R1NBUCgpICYmIGdzYXAucmVnaXN0ZXJQbHVnaW4oU2xvd01vKTtcbmV4cG9ydCB7IEVhc2VQYWNrIGFzIGRlZmF1bHQgfTsiLCIvKiFcbiAqIEVhc2VsUGx1Z2luIDMuNS4xXG4gKiBodHRwczovL2dyZWVuc29jay5jb21cbiAqXG4gKiBAbGljZW5zZSBDb3B5cmlnaHQgMjAwOC0yMDIwLCBHcmVlblNvY2suIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBTdWJqZWN0IHRvIHRoZSB0ZXJtcyBhdCBodHRwczovL2dyZWVuc29jay5jb20vc3RhbmRhcmQtbGljZW5zZSBvciBmb3JcbiAqIENsdWIgR3JlZW5Tb2NrIG1lbWJlcnMsIHRoZSBhZ3JlZW1lbnQgaXNzdWVkIHdpdGggdGhhdCBtZW1iZXJzaGlwLlxuICogQGF1dGhvcjogSmFjayBEb3lsZSwgamFja0BncmVlbnNvY2suY29tXG4qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xudmFyIGdzYXAsXG4gICAgX2NvcmVJbml0dGVkLFxuICAgIF93aW4sXG4gICAgX2NyZWF0ZUpTLFxuICAgIF9Db2xvckZpbHRlcixcbiAgICBfQ29sb3JNYXRyaXhGaWx0ZXIsXG4gICAgX2NvbG9yUHJvcHMgPSBcInJlZE11bHRpcGxpZXIsZ3JlZW5NdWx0aXBsaWVyLGJsdWVNdWx0aXBsaWVyLGFscGhhTXVsdGlwbGllcixyZWRPZmZzZXQsZ3JlZW5PZmZzZXQsYmx1ZU9mZnNldCxhbHBoYU9mZnNldFwiLnNwbGl0KFwiLFwiKSxcbiAgICBfd2luZG93RXhpc3RzID0gZnVuY3Rpb24gX3dpbmRvd0V4aXN0cygpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG59LFxuICAgIF9nZXRHU0FQID0gZnVuY3Rpb24gX2dldEdTQVAoKSB7XG4gIHJldHVybiBnc2FwIHx8IF93aW5kb3dFeGlzdHMoKSAmJiAoZ3NhcCA9IHdpbmRvdy5nc2FwKSAmJiBnc2FwLnJlZ2lzdGVyUGx1Z2luICYmIGdzYXA7XG59LFxuICAgIF9nZXRDcmVhdGVKUyA9IGZ1bmN0aW9uIF9nZXRDcmVhdGVKUygpIHtcbiAgcmV0dXJuIF9jcmVhdGVKUyB8fCBfd2luICYmIF93aW4uY3JlYXRlanMgfHwgX3dpbiB8fCB7fTtcbn0sXG4gICAgX3dhcm4gPSBmdW5jdGlvbiBfd2FybihtZXNzYWdlKSB7XG4gIHJldHVybiBjb25zb2xlLndhcm4obWVzc2FnZSk7XG59LFxuICAgIF9jYWNoZSA9IGZ1bmN0aW9uIF9jYWNoZSh0YXJnZXQpIHtcbiAgdmFyIGIgPSB0YXJnZXQuZ2V0Qm91bmRzICYmIHRhcmdldC5nZXRCb3VuZHMoKTtcblxuICBpZiAoIWIpIHtcbiAgICBiID0gdGFyZ2V0Lm5vbWluYWxCb3VuZHMgfHwge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICB3aWR0aDogMTAwLFxuICAgICAgaGVpZ2h0OiAxMDBcbiAgICB9O1xuICAgIHRhcmdldC5zZXRCb3VuZHMgJiYgdGFyZ2V0LnNldEJvdW5kcyhiLngsIGIueSwgYi53aWR0aCwgYi5oZWlnaHQpO1xuICB9XG5cbiAgdGFyZ2V0LmNhY2hlICYmIHRhcmdldC5jYWNoZShiLngsIGIueSwgYi53aWR0aCwgYi5oZWlnaHQpO1xuXG4gIF93YXJuKFwiRWFzZWxQbHVnaW46IGZvciBmaWx0ZXJzIHRvIGRpc3BsYXkgaW4gRWFzZWxKUywgeW91IG11c3QgY2FsbCB0aGUgb2JqZWN0J3MgY2FjaGUoKSBtZXRob2QgZmlyc3QuIEdTQVAgYXR0ZW1wdGVkIHRvIHVzZSB0aGUgdGFyZ2V0J3MgZ2V0Qm91bmRzKCkgZm9yIHRoZSBjYWNoZSBidXQgdGhhdCBtYXkgbm90IGJlIGNvbXBsZXRlbHkgYWNjdXJhdGUuIFwiICsgdGFyZ2V0KTtcbn0sXG4gICAgX3BhcnNlQ29sb3JGaWx0ZXIgPSBmdW5jdGlvbiBfcGFyc2VDb2xvckZpbHRlcih0YXJnZXQsIHYsIHBsdWdpbikge1xuICBpZiAoIV9Db2xvckZpbHRlcikge1xuICAgIF9Db2xvckZpbHRlciA9IF9nZXRDcmVhdGVKUygpLkNvbG9yRmlsdGVyO1xuXG4gICAgaWYgKCFfQ29sb3JGaWx0ZXIpIHtcbiAgICAgIF93YXJuKFwiRWFzZWxQbHVnaW4gZXJyb3I6IFRoZSBFYXNlbEpTIENvbG9yRmlsdGVyIEphdmFTY3JpcHQgZmlsZSB3YXNuJ3QgbG9hZGVkLlwiKTtcbiAgICB9XG4gIH1cblxuICB2YXIgZmlsdGVycyA9IHRhcmdldC5maWx0ZXJzIHx8IFtdLFxuICAgICAgaSA9IGZpbHRlcnMubGVuZ3RoLFxuICAgICAgYyxcbiAgICAgIHMsXG4gICAgICBlLFxuICAgICAgYSxcbiAgICAgIHAsXG4gICAgICBwdDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWYgKGZpbHRlcnNbaV0gaW5zdGFuY2VvZiBfQ29sb3JGaWx0ZXIpIHtcbiAgICAgIHMgPSBmaWx0ZXJzW2ldO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFzKSB7XG4gICAgcyA9IG5ldyBfQ29sb3JGaWx0ZXIoKTtcbiAgICBmaWx0ZXJzLnB1c2gocyk7XG4gICAgdGFyZ2V0LmZpbHRlcnMgPSBmaWx0ZXJzO1xuICB9XG5cbiAgZSA9IHMuY2xvbmUoKTtcblxuICBpZiAodi50aW50ICE9IG51bGwpIHtcbiAgICBjID0gZ3NhcC51dGlscy5zcGxpdENvbG9yKHYudGludCk7XG4gICAgYSA9IHYudGludEFtb3VudCAhPSBudWxsID8gK3YudGludEFtb3VudCA6IDE7XG4gICAgZS5yZWRPZmZzZXQgPSArY1swXSAqIGE7XG4gICAgZS5ncmVlbk9mZnNldCA9ICtjWzFdICogYTtcbiAgICBlLmJsdWVPZmZzZXQgPSArY1syXSAqIGE7XG4gICAgZS5yZWRNdWx0aXBsaWVyID0gZS5ncmVlbk11bHRpcGxpZXIgPSBlLmJsdWVNdWx0aXBsaWVyID0gMSAtIGE7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChwIGluIHYpIHtcbiAgICAgIGlmIChwICE9PSBcImV4cG9zdXJlXCIpIGlmIChwICE9PSBcImJyaWdodG5lc3NcIikge1xuICAgICAgICBlW3BdID0gK3ZbcF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHYuZXhwb3N1cmUgIT0gbnVsbCkge1xuICAgIGUucmVkT2Zmc2V0ID0gZS5ncmVlbk9mZnNldCA9IGUuYmx1ZU9mZnNldCA9IDI1NSAqICgrdi5leHBvc3VyZSAtIDEpO1xuICAgIGUucmVkTXVsdGlwbGllciA9IGUuZ3JlZW5NdWx0aXBsaWVyID0gZS5ibHVlTXVsdGlwbGllciA9IDE7XG4gIH0gZWxzZSBpZiAodi5icmlnaHRuZXNzICE9IG51bGwpIHtcbiAgICBhID0gK3YuYnJpZ2h0bmVzcyAtIDE7XG4gICAgZS5yZWRPZmZzZXQgPSBlLmdyZWVuT2Zmc2V0ID0gZS5ibHVlT2Zmc2V0ID0gYSA+IDAgPyBhICogMjU1IDogMDtcbiAgICBlLnJlZE11bHRpcGxpZXIgPSBlLmdyZWVuTXVsdGlwbGllciA9IGUuYmx1ZU11bHRpcGxpZXIgPSAxIC0gTWF0aC5hYnMoYSk7XG4gIH1cblxuICBpID0gODtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgcCA9IF9jb2xvclByb3BzW2ldO1xuXG4gICAgaWYgKHNbcF0gIT09IGVbcF0pIHtcbiAgICAgIHB0ID0gcGx1Z2luLmFkZChzLCBwLCBzW3BdLCBlW3BdKTtcblxuICAgICAgaWYgKHB0KSB7XG4gICAgICAgIHB0Lm9wID0gXCJlYXNlbF9jb2xvckZpbHRlclwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsdWdpbi5fcHJvcHMucHVzaChcImVhc2VsX2NvbG9yRmlsdGVyXCIpO1xuXG4gIGlmICghdGFyZ2V0LmNhY2hlSUQpIHtcbiAgICBfY2FjaGUodGFyZ2V0KTtcbiAgfVxufSxcbiAgICBfaWRNYXRyaXggPSBbMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMF0sXG4gICAgX2x1bVIgPSAwLjIxMjY3MSxcbiAgICBfbHVtRyA9IDAuNzE1MTYwLFxuICAgIF9sdW1CID0gMC4wNzIxNjksXG4gICAgX2FwcGx5TWF0cml4ID0gZnVuY3Rpb24gX2FwcGx5TWF0cml4KG0sIG0yKSB7XG4gIGlmICghKG0gaW5zdGFuY2VvZiBBcnJheSkgfHwgIShtMiBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIHJldHVybiBtMjtcbiAgfVxuXG4gIHZhciB0ZW1wID0gW10sXG4gICAgICBpID0gMCxcbiAgICAgIHogPSAwLFxuICAgICAgeSxcbiAgICAgIHg7XG5cbiAgZm9yICh5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgIGZvciAoeCA9IDA7IHggPCA1OyB4KyspIHtcbiAgICAgIHogPSB4ID09PSA0ID8gbVtpICsgNF0gOiAwO1xuICAgICAgdGVtcFtpICsgeF0gPSBtW2ldICogbTJbeF0gKyBtW2kgKyAxXSAqIG0yW3ggKyA1XSArIG1baSArIDJdICogbTJbeCArIDEwXSArIG1baSArIDNdICogbTJbeCArIDE1XSArIHo7XG4gICAgfVxuXG4gICAgaSArPSA1O1xuICB9XG5cbiAgcmV0dXJuIHRlbXA7XG59LFxuICAgIF9zZXRTYXR1cmF0aW9uID0gZnVuY3Rpb24gX3NldFNhdHVyYXRpb24obSwgbikge1xuICBpZiAoaXNOYU4obikpIHtcbiAgICByZXR1cm4gbTtcbiAgfVxuXG4gIHZhciBpbnYgPSAxIC0gbixcbiAgICAgIHIgPSBpbnYgKiBfbHVtUixcbiAgICAgIGcgPSBpbnYgKiBfbHVtRyxcbiAgICAgIGIgPSBpbnYgKiBfbHVtQjtcbiAgcmV0dXJuIF9hcHBseU1hdHJpeChbciArIG4sIGcsIGIsIDAsIDAsIHIsIGcgKyBuLCBiLCAwLCAwLCByLCBnLCBiICsgbiwgMCwgMCwgMCwgMCwgMCwgMSwgMF0sIG0pO1xufSxcbiAgICBfY29sb3JpemUgPSBmdW5jdGlvbiBfY29sb3JpemUobSwgY29sb3IsIGFtb3VudCkge1xuICBpZiAoaXNOYU4oYW1vdW50KSkge1xuICAgIGFtb3VudCA9IDE7XG4gIH1cblxuICB2YXIgYyA9IGdzYXAudXRpbHMuc3BsaXRDb2xvcihjb2xvciksXG4gICAgICByID0gY1swXSAvIDI1NSxcbiAgICAgIGcgPSBjWzFdIC8gMjU1LFxuICAgICAgYiA9IGNbMl0gLyAyNTUsXG4gICAgICBpbnYgPSAxIC0gYW1vdW50O1xuICByZXR1cm4gX2FwcGx5TWF0cml4KFtpbnYgKyBhbW91bnQgKiByICogX2x1bVIsIGFtb3VudCAqIHIgKiBfbHVtRywgYW1vdW50ICogciAqIF9sdW1CLCAwLCAwLCBhbW91bnQgKiBnICogX2x1bVIsIGludiArIGFtb3VudCAqIGcgKiBfbHVtRywgYW1vdW50ICogZyAqIF9sdW1CLCAwLCAwLCBhbW91bnQgKiBiICogX2x1bVIsIGFtb3VudCAqIGIgKiBfbHVtRywgaW52ICsgYW1vdW50ICogYiAqIF9sdW1CLCAwLCAwLCAwLCAwLCAwLCAxLCAwXSwgbSk7XG59LFxuICAgIF9zZXRIdWUgPSBmdW5jdGlvbiBfc2V0SHVlKG0sIG4pIHtcbiAgaWYgKGlzTmFOKG4pKSB7XG4gICAgcmV0dXJuIG07XG4gIH1cblxuICBuICo9IE1hdGguUEkgLyAxODA7XG4gIHZhciBjID0gTWF0aC5jb3MobiksXG4gICAgICBzID0gTWF0aC5zaW4obik7XG4gIHJldHVybiBfYXBwbHlNYXRyaXgoW19sdW1SICsgYyAqICgxIC0gX2x1bVIpICsgcyAqIC1fbHVtUiwgX2x1bUcgKyBjICogLV9sdW1HICsgcyAqIC1fbHVtRywgX2x1bUIgKyBjICogLV9sdW1CICsgcyAqICgxIC0gX2x1bUIpLCAwLCAwLCBfbHVtUiArIGMgKiAtX2x1bVIgKyBzICogMC4xNDMsIF9sdW1HICsgYyAqICgxIC0gX2x1bUcpICsgcyAqIDAuMTQsIF9sdW1CICsgYyAqIC1fbHVtQiArIHMgKiAtMC4yODMsIDAsIDAsIF9sdW1SICsgYyAqIC1fbHVtUiArIHMgKiAtKDEgLSBfbHVtUiksIF9sdW1HICsgYyAqIC1fbHVtRyArIHMgKiBfbHVtRywgX2x1bUIgKyBjICogKDEgLSBfbHVtQikgKyBzICogX2x1bUIsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDFdLCBtKTtcbn0sXG4gICAgX3NldENvbnRyYXN0ID0gZnVuY3Rpb24gX3NldENvbnRyYXN0KG0sIG4pIHtcbiAgaWYgKGlzTmFOKG4pKSB7XG4gICAgcmV0dXJuIG07XG4gIH1cblxuICBuICs9IDAuMDE7XG4gIHJldHVybiBfYXBwbHlNYXRyaXgoW24sIDAsIDAsIDAsIDEyOCAqICgxIC0gbiksIDAsIG4sIDAsIDAsIDEyOCAqICgxIC0gbiksIDAsIDAsIG4sIDAsIDEyOCAqICgxIC0gbiksIDAsIDAsIDAsIDEsIDBdLCBtKTtcbn0sXG4gICAgX3BhcnNlQ29sb3JNYXRyaXhGaWx0ZXIgPSBmdW5jdGlvbiBfcGFyc2VDb2xvck1hdHJpeEZpbHRlcih0YXJnZXQsIHYsIHBsdWdpbikge1xuICBpZiAoIV9Db2xvck1hdHJpeEZpbHRlcikge1xuICAgIF9Db2xvck1hdHJpeEZpbHRlciA9IF9nZXRDcmVhdGVKUygpLkNvbG9yTWF0cml4RmlsdGVyO1xuXG4gICAgaWYgKCFfQ29sb3JNYXRyaXhGaWx0ZXIpIHtcbiAgICAgIF93YXJuKFwiRWFzZWxQbHVnaW46IFRoZSBFYXNlbEpTIENvbG9yTWF0cml4RmlsdGVyIEphdmFTY3JpcHQgZmlsZSB3YXNuJ3QgbG9hZGVkLlwiKTtcbiAgICB9XG4gIH1cblxuICB2YXIgZmlsdGVycyA9IHRhcmdldC5maWx0ZXJzIHx8IFtdLFxuICAgICAgaSA9IGZpbHRlcnMubGVuZ3RoLFxuICAgICAgbWF0cml4LFxuICAgICAgc3RhcnRNYXRyaXgsXG4gICAgICBzLFxuICAgICAgcGc7XG5cbiAgd2hpbGUgKC0taSA+IC0xKSB7XG4gICAgaWYgKGZpbHRlcnNbaV0gaW5zdGFuY2VvZiBfQ29sb3JNYXRyaXhGaWx0ZXIpIHtcbiAgICAgIHMgPSBmaWx0ZXJzW2ldO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFzKSB7XG4gICAgcyA9IG5ldyBfQ29sb3JNYXRyaXhGaWx0ZXIoX2lkTWF0cml4LnNsaWNlKCkpO1xuICAgIGZpbHRlcnMucHVzaChzKTtcbiAgICB0YXJnZXQuZmlsdGVycyA9IGZpbHRlcnM7XG4gIH1cblxuICBzdGFydE1hdHJpeCA9IHMubWF0cml4O1xuICBtYXRyaXggPSBfaWRNYXRyaXguc2xpY2UoKTtcblxuICBpZiAodi5jb2xvcml6ZSAhPSBudWxsKSB7XG4gICAgbWF0cml4ID0gX2NvbG9yaXplKG1hdHJpeCwgdi5jb2xvcml6ZSwgTnVtYmVyKHYuY29sb3JpemVBbW91bnQpKTtcbiAgfVxuXG4gIGlmICh2LmNvbnRyYXN0ICE9IG51bGwpIHtcbiAgICBtYXRyaXggPSBfc2V0Q29udHJhc3QobWF0cml4LCBOdW1iZXIodi5jb250cmFzdCkpO1xuICB9XG5cbiAgaWYgKHYuaHVlICE9IG51bGwpIHtcbiAgICBtYXRyaXggPSBfc2V0SHVlKG1hdHJpeCwgTnVtYmVyKHYuaHVlKSk7XG4gIH1cblxuICBpZiAodi5zYXR1cmF0aW9uICE9IG51bGwpIHtcbiAgICBtYXRyaXggPSBfc2V0U2F0dXJhdGlvbihtYXRyaXgsIE51bWJlcih2LnNhdHVyYXRpb24pKTtcbiAgfVxuXG4gIGkgPSBtYXRyaXgubGVuZ3RoO1xuXG4gIHdoaWxlICgtLWkgPiAtMSkge1xuICAgIGlmIChtYXRyaXhbaV0gIT09IHN0YXJ0TWF0cml4W2ldKSB7XG4gICAgICBwZyA9IHBsdWdpbi5hZGQoc3RhcnRNYXRyaXgsIGksIHN0YXJ0TWF0cml4W2ldLCBtYXRyaXhbaV0pO1xuXG4gICAgICBpZiAocGcpIHtcbiAgICAgICAgcGcub3AgPSBcImVhc2VsX2NvbG9yTWF0cml4RmlsdGVyXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGx1Z2luLl9wcm9wcy5wdXNoKFwiZWFzZWxfY29sb3JNYXRyaXhGaWx0ZXJcIik7XG5cbiAgaWYgKCF0YXJnZXQuY2FjaGVJRCkge1xuICAgIF9jYWNoZSgpO1xuICB9XG5cbiAgcGx1Z2luLl9tYXRyaXggPSBzdGFydE1hdHJpeDtcbn0sXG4gICAgX2luaXRDb3JlID0gZnVuY3Rpb24gX2luaXRDb3JlKGNvcmUpIHtcbiAgZ3NhcCA9IGNvcmUgfHwgX2dldEdTQVAoKTtcblxuICBpZiAoX3dpbmRvd0V4aXN0cygpKSB7XG4gICAgX3dpbiA9IHdpbmRvdztcbiAgfVxuXG4gIGlmIChnc2FwKSB7XG4gICAgX2NvcmVJbml0dGVkID0gMTtcbiAgfVxufTtcblxuZXhwb3J0IHZhciBFYXNlbFBsdWdpbiA9IHtcbiAgdmVyc2lvbjogXCIzLjUuMVwiLFxuICBuYW1lOiBcImVhc2VsXCIsXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQodGFyZ2V0LCB2YWx1ZSwgdHdlZW4sIGluZGV4LCB0YXJnZXRzKSB7XG4gICAgaWYgKCFfY29yZUluaXR0ZWQpIHtcbiAgICAgIF9pbml0Q29yZSgpO1xuXG4gICAgICBpZiAoIWdzYXApIHtcbiAgICAgICAgX3dhcm4oXCJQbGVhc2UgZ3NhcC5yZWdpc3RlclBsdWdpbihFYXNlbFBsdWdpbilcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdmFyIHAsIHB0LCB0aW50LCBjb2xvck1hdHJpeCwgZW5kLCBsYWJlbHMsIGk7XG5cbiAgICBmb3IgKHAgaW4gdmFsdWUpIHtcbiAgICAgIGVuZCA9IHZhbHVlW3BdO1xuXG4gICAgICBpZiAocCA9PT0gXCJjb2xvckZpbHRlclwiIHx8IHAgPT09IFwidGludFwiIHx8IHAgPT09IFwidGludEFtb3VudFwiIHx8IHAgPT09IFwiZXhwb3N1cmVcIiB8fCBwID09PSBcImJyaWdodG5lc3NcIikge1xuICAgICAgICBpZiAoIXRpbnQpIHtcbiAgICAgICAgICBfcGFyc2VDb2xvckZpbHRlcih0YXJnZXQsIHZhbHVlLmNvbG9yRmlsdGVyIHx8IHZhbHVlLCB0aGlzKTtcblxuICAgICAgICAgIHRpbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHAgPT09IFwic2F0dXJhdGlvblwiIHx8IHAgPT09IFwiY29udHJhc3RcIiB8fCBwID09PSBcImh1ZVwiIHx8IHAgPT09IFwiY29sb3JpemVcIiB8fCBwID09PSBcImNvbG9yaXplQW1vdW50XCIpIHtcbiAgICAgICAgaWYgKCFjb2xvck1hdHJpeCkge1xuICAgICAgICAgIF9wYXJzZUNvbG9yTWF0cml4RmlsdGVyKHRhcmdldCwgdmFsdWUuY29sb3JNYXRyaXhGaWx0ZXIgfHwgdmFsdWUsIHRoaXMpO1xuXG4gICAgICAgICAgY29sb3JNYXRyaXggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHAgPT09IFwiZnJhbWVcIikge1xuICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gXCJzdHJpbmdcIiAmJiBlbmQuY2hhckF0KDEpICE9PSBcIj1cIiAmJiAobGFiZWxzID0gdGFyZ2V0LmxhYmVscykpIHtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGFiZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobGFiZWxzW2ldLmxhYmVsID09PSBlbmQpIHtcbiAgICAgICAgICAgICAgZW5kID0gbGFiZWxzW2ldLnBvc2l0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB0ID0gdGhpcy5hZGQodGFyZ2V0LCBcImdvdG9BbmRTdG9wXCIsIHRhcmdldC5jdXJyZW50RnJhbWUsIGVuZCwgaW5kZXgsIHRhcmdldHMsIE1hdGgucm91bmQpO1xuXG4gICAgICAgIGlmIChwdCkge1xuICAgICAgICAgIHB0Lm9wID0gcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0YXJnZXRbcF0gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmFkZCh0YXJnZXQsIHAsIFwiZ2V0XCIsIGVuZCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcihyYXRpbywgZGF0YSkge1xuICAgIHZhciBwdCA9IGRhdGEuX3B0O1xuXG4gICAgd2hpbGUgKHB0KSB7XG4gICAgICBwdC5yKHJhdGlvLCBwdC5kKTtcbiAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEudGFyZ2V0LmNhY2hlSUQpIHtcbiAgICAgIGRhdGEudGFyZ2V0LnVwZGF0ZUNhY2hlKCk7XG4gICAgfVxuICB9LFxuICByZWdpc3RlcjogX2luaXRDb3JlXG59O1xuXG5FYXNlbFBsdWdpbi5yZWdpc3RlckNyZWF0ZUpTID0gZnVuY3Rpb24gKGNyZWF0ZWpzKSB7XG4gIF9jcmVhdGVKUyA9IGNyZWF0ZWpzO1xufTtcblxuX2dldEdTQVAoKSAmJiBnc2FwLnJlZ2lzdGVyUGx1Z2luKEVhc2VsUGx1Z2luKTtcbmV4cG9ydCB7IEVhc2VsUGx1Z2luIGFzIGRlZmF1bHQgfTsiLCIvKiFcbiAqIE1vdGlvblBhdGhQbHVnaW4gMy41LjFcbiAqIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIEBsaWNlbnNlIENvcHlyaWdodCAyMDA4LTIwMjAsIEdyZWVuU29jay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9zdGFuZGFyZC1saWNlbnNlIG9yIGZvclxuICogQ2x1YiBHcmVlblNvY2sgbWVtYmVycywgdGhlIGFncmVlbWVudCBpc3N1ZWQgd2l0aCB0aGF0IG1lbWJlcnNoaXAuXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgeyBnZXRSYXdQYXRoLCBjYWNoZVJhd1BhdGhNZWFzdXJlbWVudHMsIGdldFBvc2l0aW9uT25QYXRoLCBwb2ludHNUb1NlZ21lbnQsIGZsYXRQb2ludHNUb1NlZ21lbnQsIHNsaWNlUmF3UGF0aCwgc3RyaW5nVG9SYXdQYXRoLCByYXdQYXRoVG9TdHJpbmcsIHRyYW5zZm9ybVJhd1BhdGgsIGNvbnZlcnRUb1BhdGggYXMgX2NvbnZlcnRUb1BhdGggfSBmcm9tIFwiLi91dGlscy9wYXRocy5qc1wiO1xuaW1wb3J0IHsgZ2V0R2xvYmFsTWF0cml4IH0gZnJvbSBcIi4vdXRpbHMvbWF0cml4LmpzXCI7XG5cbnZhciBfeFByb3BzID0gW1wieFwiLCBcInRyYW5zbGF0ZVhcIiwgXCJsZWZ0XCIsIFwibWFyZ2luTGVmdFwiXSxcbiAgICBfeVByb3BzID0gW1wieVwiLCBcInRyYW5zbGF0ZVlcIiwgXCJ0b3BcIiwgXCJtYXJnaW5Ub3BcIl0sXG4gICAgX0RFRzJSQUQgPSBNYXRoLlBJIC8gMTgwLFxuICAgIGdzYXAsXG4gICAgUHJvcFR3ZWVuLFxuICAgIF9nZXRVbml0LFxuICAgIF90b0FycmF5LFxuICAgIF9nZXRHU0FQID0gZnVuY3Rpb24gX2dldEdTQVAoKSB7XG4gIHJldHVybiBnc2FwIHx8IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgKGdzYXAgPSB3aW5kb3cuZ3NhcCkgJiYgZ3NhcC5yZWdpc3RlclBsdWdpbiAmJiBnc2FwO1xufSxcbiAgICBfcG9wdWxhdGVTZWdtZW50RnJvbUFycmF5ID0gZnVuY3Rpb24gX3BvcHVsYXRlU2VnbWVudEZyb21BcnJheShzZWdtZW50LCB2YWx1ZXMsIHByb3BlcnR5LCBtb2RlKSB7XG4gIC8vbW9kZTogMCA9IHggYnV0IGRvbid0IGZpbGwgeSB5ZXQsIDEgPSB5LCAyID0geCBhbmQgZmlsbCB5IHdpdGggMC5cbiAgdmFyIGwgPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgc2kgPSBtb2RlID09PSAyID8gMCA6IG1vZGUsXG4gICAgICBpID0gMDtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIHNlZ21lbnRbc2ldID0gcGFyc2VGbG9hdCh2YWx1ZXNbaV1bcHJvcGVydHldKTtcbiAgICBtb2RlID09PSAyICYmIChzZWdtZW50W3NpICsgMV0gPSAwKTtcbiAgICBzaSArPSAyO1xuICB9XG5cbiAgcmV0dXJuIHNlZ21lbnQ7XG59LFxuICAgIF9nZXRQcm9wTnVtID0gZnVuY3Rpb24gX2dldFByb3BOdW0odGFyZ2V0LCBwcm9wLCB1bml0KSB7XG4gIHJldHVybiBwYXJzZUZsb2F0KHRhcmdldC5fZ3NhcC5nZXQodGFyZ2V0LCBwcm9wLCB1bml0IHx8IFwicHhcIikpIHx8IDA7XG59LFxuICAgIF9yZWxhdGl2aXplID0gZnVuY3Rpb24gX3JlbGF0aXZpemUoc2VnbWVudCkge1xuICB2YXIgeCA9IHNlZ21lbnRbMF0sXG4gICAgICB5ID0gc2VnbWVudFsxXSxcbiAgICAgIGk7XG5cbiAgZm9yIChpID0gMjsgaSA8IHNlZ21lbnQubGVuZ3RoOyBpICs9IDIpIHtcbiAgICB4ID0gc2VnbWVudFtpXSArPSB4O1xuICAgIHkgPSBzZWdtZW50W2kgKyAxXSArPSB5O1xuICB9XG59LFxuICAgIF9zZWdtZW50VG9SYXdQYXRoID0gZnVuY3Rpb24gX3NlZ21lbnRUb1Jhd1BhdGgocGx1Z2luLCBzZWdtZW50LCB0YXJnZXQsIHgsIHksIHNsaWNlciwgdmFycykge1xuICBpZiAodmFycy50eXBlID09PSBcImN1YmljXCIpIHtcbiAgICBzZWdtZW50ID0gW3NlZ21lbnRdO1xuICB9IGVsc2Uge1xuICAgIHNlZ21lbnQudW5zaGlmdChfZ2V0UHJvcE51bSh0YXJnZXQsIHgsIHZhcnMudW5pdFgpLCB5ID8gX2dldFByb3BOdW0odGFyZ2V0LCB5LCB2YXJzLnVuaXRZKSA6IDApO1xuICAgIHZhcnMucmVsYXRpdmUgJiYgX3JlbGF0aXZpemUoc2VnbWVudCk7XG4gICAgdmFyIHBvaW50RnVuYyA9IHkgPyBwb2ludHNUb1NlZ21lbnQgOiBmbGF0UG9pbnRzVG9TZWdtZW50O1xuICAgIHNlZ21lbnQgPSBbcG9pbnRGdW5jKHNlZ21lbnQsIHZhcnMuY3VydmluZXNzKV07XG4gIH1cblxuICBzZWdtZW50ID0gc2xpY2VyKF9hbGlnbihzZWdtZW50LCB0YXJnZXQsIHZhcnMpKTtcblxuICBfYWRkRGltZW5zaW9uYWxQcm9wVHdlZW4ocGx1Z2luLCB0YXJnZXQsIHgsIHNlZ21lbnQsIFwieFwiLCB2YXJzLnVuaXRYKTtcblxuICB5ICYmIF9hZGREaW1lbnNpb25hbFByb3BUd2VlbihwbHVnaW4sIHRhcmdldCwgeSwgc2VnbWVudCwgXCJ5XCIsIHZhcnMudW5pdFkpO1xuICByZXR1cm4gY2FjaGVSYXdQYXRoTWVhc3VyZW1lbnRzKHNlZ21lbnQsIHZhcnMucmVzb2x1dGlvbiB8fCAodmFycy5jdXJ2aW5lc3MgPT09IDAgPyAyMCA6IDEyKSk7IC8vd2hlbiBjdXJ2aW5lc3MgaXMgMCwgaXQgY3JlYXRlcyBjb250cm9sIHBvaW50cyByaWdodCBvbiB0b3Agb2YgdGhlIGFuY2hvcnMgd2hpY2ggbWFrZXMgaXQgbW9yZSBzZW5zaXRpdmUgdG8gcmVzb2x1dGlvbiwgdGh1cyB3ZSBjaGFuZ2UgdGhlIGRlZmF1bHQgYWNjb3JkaW5nbHkuXG59LFxuICAgIF9lbXB0eUZ1bmMgPSBmdW5jdGlvbiBfZW1wdHlGdW5jKHYpIHtcbiAgcmV0dXJuIHY7XG59LFxuICAgIF9udW1FeHAgPSAvWy0rXFwuXSpcXGQrW1xcLmVcXC1cXCtdKlxcZCpbZVxcLVxcK10qXFxkKi9nLFxuICAgIF9vcmlnaW5Ub1BvaW50ID0gZnVuY3Rpb24gX29yaWdpblRvUG9pbnQoZWxlbWVudCwgb3JpZ2luLCBwYXJlbnRNYXRyaXgpIHtcbiAgLy8gb3JpZ2luIGlzIGFuIGFycmF5IG9mIG5vcm1hbGl6ZWQgdmFsdWVzICgwLTEpIGluIHJlbGF0aW9uIHRvIHRoZSB3aWR0aC9oZWlnaHQsIHNvIFswLjUsIDAuNV0gd291bGQgYmUgdGhlIGNlbnRlci4gSXQgY2FuIGFsc28gYmUgXCJhdXRvXCIgaW4gd2hpY2ggY2FzZSBpdCB3aWxsIGJlIHRoZSB0b3AgbGVmdCB1bmxlc3MgaXQncyBhIDxwYXRoPiwgd2hlbiBpdCB3aWxsIHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHBhdGggaXRzZWxmLlxuICB2YXIgbSA9IGdldEdsb2JhbE1hdHJpeChlbGVtZW50KSxcbiAgICAgIHN2ZyxcbiAgICAgIHgsXG4gICAgICB5O1xuXG4gIGlmICgoZWxlbWVudC50YWdOYW1lICsgXCJcIikudG9Mb3dlckNhc2UoKSA9PT0gXCJzdmdcIikge1xuICAgIHN2ZyA9IGVsZW1lbnQudmlld0JveC5iYXNlVmFsO1xuICAgIHggPSBzdmcueDtcbiAgICB5ID0gc3ZnLnk7XG4gICAgc3ZnLndpZHRoIHx8IChzdmcgPSB7XG4gICAgICB3aWR0aDogK2VsZW1lbnQuZ2V0QXR0cmlidXRlKFwid2lkdGhcIiksXG4gICAgICBoZWlnaHQ6ICtlbGVtZW50LmdldEF0dHJpYnV0ZShcImhlaWdodFwiKVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHN2ZyA9IG9yaWdpbiAmJiBlbGVtZW50LmdldEJCb3ggJiYgZWxlbWVudC5nZXRCQm94KCk7XG4gICAgeCA9IHkgPSAwO1xuICB9XG5cbiAgaWYgKG9yaWdpbiAmJiBvcmlnaW4gIT09IFwiYXV0b1wiKSB7XG4gICAgeCArPSBvcmlnaW4ucHVzaCA/IG9yaWdpblswXSAqIChzdmcgPyBzdmcud2lkdGggOiBlbGVtZW50Lm9mZnNldFdpZHRoIHx8IDApIDogb3JpZ2luLng7XG4gICAgeSArPSBvcmlnaW4ucHVzaCA/IG9yaWdpblsxXSAqIChzdmcgPyBzdmcuaGVpZ2h0IDogZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMCkgOiBvcmlnaW4ueTtcbiAgfVxuXG4gIHJldHVybiBwYXJlbnRNYXRyaXguYXBwbHkoeCB8fCB5ID8gbS5hcHBseSh7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH0pIDoge1xuICAgIHg6IG0uZSxcbiAgICB5OiBtLmZcbiAgfSk7XG59LFxuICAgIF9nZXRBbGlnbk1hdHJpeCA9IGZ1bmN0aW9uIF9nZXRBbGlnbk1hdHJpeChmcm9tRWxlbWVudCwgdG9FbGVtZW50LCBmcm9tT3JpZ2luLCB0b09yaWdpbikge1xuICB2YXIgcGFyZW50TWF0cml4ID0gZ2V0R2xvYmFsTWF0cml4KGZyb21FbGVtZW50LnBhcmVudE5vZGUsIHRydWUsIHRydWUpLFxuICAgICAgbSA9IHBhcmVudE1hdHJpeC5jbG9uZSgpLm11bHRpcGx5KGdldEdsb2JhbE1hdHJpeCh0b0VsZW1lbnQpKSxcbiAgICAgIGZyb21Qb2ludCA9IF9vcmlnaW5Ub1BvaW50KGZyb21FbGVtZW50LCBmcm9tT3JpZ2luLCBwYXJlbnRNYXRyaXgpLFxuICAgICAgX29yaWdpblRvUG9pbnQyID0gX29yaWdpblRvUG9pbnQodG9FbGVtZW50LCB0b09yaWdpbiwgcGFyZW50TWF0cml4KSxcbiAgICAgIHggPSBfb3JpZ2luVG9Qb2ludDIueCxcbiAgICAgIHkgPSBfb3JpZ2luVG9Qb2ludDIueSxcbiAgICAgIHA7XG5cbiAgbS5lID0gbS5mID0gMDtcblxuICBpZiAodG9PcmlnaW4gPT09IFwiYXV0b1wiICYmIHRvRWxlbWVudC5nZXRUb3RhbExlbmd0aCAmJiB0b0VsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInBhdGhcIikge1xuICAgIHAgPSB0b0VsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZFwiKS5tYXRjaChfbnVtRXhwKSB8fCBbXTtcbiAgICBwID0gbS5hcHBseSh7XG4gICAgICB4OiArcFswXSxcbiAgICAgIHk6ICtwWzFdXG4gICAgfSk7XG4gICAgeCArPSBwLng7XG4gICAgeSArPSBwLnk7XG4gIH1cblxuICBpZiAocCB8fCB0b0VsZW1lbnQuZ2V0QkJveCAmJiBmcm9tRWxlbWVudC5nZXRCQm94ICYmIHRvRWxlbWVudC5vd25lclNWR0VsZW1lbnQgPT09IGZyb21FbGVtZW50Lm93bmVyU1ZHRWxlbWVudCkge1xuICAgIHAgPSBtLmFwcGx5KHRvRWxlbWVudC5nZXRCQm94KCkpO1xuICAgIHggLT0gcC54O1xuICAgIHkgLT0gcC55O1xuICB9XG5cbiAgbS5lID0geCAtIGZyb21Qb2ludC54O1xuICBtLmYgPSB5IC0gZnJvbVBvaW50Lnk7XG4gIHJldHVybiBtO1xufSxcbiAgICBfYWxpZ24gPSBmdW5jdGlvbiBfYWxpZ24ocmF3UGF0aCwgdGFyZ2V0LCBfcmVmKSB7XG4gIHZhciBhbGlnbiA9IF9yZWYuYWxpZ24sXG4gICAgICBtYXRyaXggPSBfcmVmLm1hdHJpeCxcbiAgICAgIG9mZnNldFggPSBfcmVmLm9mZnNldFgsXG4gICAgICBvZmZzZXRZID0gX3JlZi5vZmZzZXRZLFxuICAgICAgYWxpZ25PcmlnaW4gPSBfcmVmLmFsaWduT3JpZ2luO1xuXG4gIHZhciB4ID0gcmF3UGF0aFswXVswXSxcbiAgICAgIHkgPSByYXdQYXRoWzBdWzFdLFxuICAgICAgY3VyWCA9IF9nZXRQcm9wTnVtKHRhcmdldCwgXCJ4XCIpLFxuICAgICAgY3VyWSA9IF9nZXRQcm9wTnVtKHRhcmdldCwgXCJ5XCIpLFxuICAgICAgYWxpZ25UYXJnZXQsXG4gICAgICBtLFxuICAgICAgcDtcblxuICBpZiAoIXJhd1BhdGggfHwgIXJhd1BhdGgubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGdldFJhd1BhdGgoXCJNMCwwTDAsMFwiKTtcbiAgfVxuXG4gIGlmIChhbGlnbikge1xuICAgIGlmIChhbGlnbiA9PT0gXCJzZWxmXCIgfHwgKGFsaWduVGFyZ2V0ID0gX3RvQXJyYXkoYWxpZ24pWzBdIHx8IHRhcmdldCkgPT09IHRhcmdldCkge1xuICAgICAgdHJhbnNmb3JtUmF3UGF0aChyYXdQYXRoLCAxLCAwLCAwLCAxLCBjdXJYIC0geCwgY3VyWSAtIHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWxpZ25PcmlnaW4gJiYgYWxpZ25PcmlnaW5bMl0gIT09IGZhbHNlKSB7XG4gICAgICAgIGdzYXAuc2V0KHRhcmdldCwge1xuICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogYWxpZ25PcmlnaW5bMF0gKiAxMDAgKyBcIiUgXCIgKyBhbGlnbk9yaWdpblsxXSAqIDEwMCArIFwiJVwiXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxpZ25PcmlnaW4gPSBbX2dldFByb3BOdW0odGFyZ2V0LCBcInhQZXJjZW50XCIpIC8gLTEwMCwgX2dldFByb3BOdW0odGFyZ2V0LCBcInlQZXJjZW50XCIpIC8gLTEwMF07XG4gICAgICB9XG5cbiAgICAgIG0gPSBfZ2V0QWxpZ25NYXRyaXgodGFyZ2V0LCBhbGlnblRhcmdldCwgYWxpZ25PcmlnaW4sIFwiYXV0b1wiKTtcbiAgICAgIHAgPSBtLmFwcGx5KHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgICAgfSk7XG4gICAgICB0cmFuc2Zvcm1SYXdQYXRoKHJhd1BhdGgsIG0uYSwgbS5iLCBtLmMsIG0uZCwgY3VyWCArIG0uZSAtIChwLnggLSBtLmUpLCBjdXJZICsgbS5mIC0gKHAueSAtIG0uZikpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtYXRyaXgpIHtcbiAgICB0cmFuc2Zvcm1SYXdQYXRoKHJhd1BhdGgsIG1hdHJpeC5hLCBtYXRyaXguYiwgbWF0cml4LmMsIG1hdHJpeC5kLCBtYXRyaXguZSwgbWF0cml4LmYpO1xuICB9IGVsc2UgaWYgKG9mZnNldFggfHwgb2Zmc2V0WSkge1xuICAgIHRyYW5zZm9ybVJhd1BhdGgocmF3UGF0aCwgMSwgMCwgMCwgMSwgb2Zmc2V0WCB8fCAwLCBvZmZzZXRZIHx8IDApO1xuICB9XG5cbiAgcmV0dXJuIHJhd1BhdGg7XG59LFxuICAgIF9hZGREaW1lbnNpb25hbFByb3BUd2VlbiA9IGZ1bmN0aW9uIF9hZGREaW1lbnNpb25hbFByb3BUd2VlbihwbHVnaW4sIHRhcmdldCwgcHJvcGVydHksIHJhd1BhdGgsIHBhdGhQcm9wZXJ0eSwgZm9yY2VVbml0KSB7XG4gIHZhciBjYWNoZSA9IHRhcmdldC5fZ3NhcCxcbiAgICAgIGhhcm5lc3MgPSBjYWNoZS5oYXJuZXNzLFxuICAgICAgYWxpYXMgPSBoYXJuZXNzICYmIGhhcm5lc3MuYWxpYXNlcyAmJiBoYXJuZXNzLmFsaWFzZXNbcHJvcGVydHldLFxuICAgICAgcHJvcCA9IGFsaWFzICYmIGFsaWFzLmluZGV4T2YoXCIsXCIpIDwgMCA/IGFsaWFzIDogcHJvcGVydHksXG4gICAgICBwdCA9IHBsdWdpbi5fcHQgPSBuZXcgUHJvcFR3ZWVuKHBsdWdpbi5fcHQsIHRhcmdldCwgcHJvcCwgMCwgMCwgX2VtcHR5RnVuYywgMCwgY2FjaGUuc2V0KHRhcmdldCwgcHJvcCwgcGx1Z2luKSk7XG4gIHB0LnUgPSBfZ2V0VW5pdChjYWNoZS5nZXQodGFyZ2V0LCBwcm9wLCBmb3JjZVVuaXQpKSB8fCAwO1xuICBwdC5wYXRoID0gcmF3UGF0aDtcbiAgcHQucHAgPSBwYXRoUHJvcGVydHk7XG5cbiAgcGx1Z2luLl9wcm9wcy5wdXNoKHByb3ApO1xufSxcbiAgICBfc2xpY2VNb2RpZmllciA9IGZ1bmN0aW9uIF9zbGljZU1vZGlmaWVyKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChyYXdQYXRoKSB7XG4gICAgcmV0dXJuIHN0YXJ0IHx8IGVuZCAhPT0gMSA/IHNsaWNlUmF3UGF0aChyYXdQYXRoLCBzdGFydCwgZW5kKSA6IHJhd1BhdGg7XG4gIH07XG59O1xuXG5leHBvcnQgdmFyIE1vdGlvblBhdGhQbHVnaW4gPSB7XG4gIHZlcnNpb246IFwiMy41LjFcIixcbiAgbmFtZTogXCJtb3Rpb25QYXRoXCIsXG4gIHJlZ2lzdGVyOiBmdW5jdGlvbiByZWdpc3Rlcihjb3JlLCBQbHVnaW4sIHByb3BUd2Vlbikge1xuICAgIGdzYXAgPSBjb3JlO1xuICAgIF9nZXRVbml0ID0gZ3NhcC51dGlscy5nZXRVbml0O1xuICAgIF90b0FycmF5ID0gZ3NhcC51dGlscy50b0FycmF5O1xuICAgIFByb3BUd2VlbiA9IHByb3BUd2VlbjtcbiAgfSxcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhcnMpIHtcbiAgICBpZiAoIWdzYXApIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlBsZWFzZSBnc2FwLnJlZ2lzdGVyUGx1Z2luKE1vdGlvblBhdGhQbHVnaW4pXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghKHR5cGVvZiB2YXJzID09PSBcIm9iamVjdFwiICYmICF2YXJzLnN0eWxlKSB8fCAhdmFycy5wYXRoKSB7XG4gICAgICB2YXJzID0ge1xuICAgICAgICBwYXRoOiB2YXJzXG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciByYXdQYXRocyA9IFtdLFxuICAgICAgICBwYXRoID0gdmFycy5wYXRoLFxuICAgICAgICBmaXJzdE9iaiA9IHBhdGhbMF0sXG4gICAgICAgIGF1dG9Sb3RhdGUgPSB2YXJzLmF1dG9Sb3RhdGUsXG4gICAgICAgIHNsaWNlciA9IF9zbGljZU1vZGlmaWVyKHZhcnMuc3RhcnQsIFwiZW5kXCIgaW4gdmFycyA/IHZhcnMuZW5kIDogMSksXG4gICAgICAgIHJhd1BhdGgsXG4gICAgICAgIHAsXG4gICAgICAgIHgsXG4gICAgICAgIHk7XG5cbiAgICB0aGlzLnJhd1BhdGhzID0gcmF3UGF0aHM7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG5cbiAgICBpZiAodGhpcy5yb3RhdGUgPSBhdXRvUm90YXRlIHx8IGF1dG9Sb3RhdGUgPT09IDApIHtcbiAgICAgIC8vZ2V0IHRoZSByb3RhdGlvbmFsIGRhdGEgRklSU1Qgc28gdGhhdCB0aGUgc2V0VHJhbnNmb3JtKCkgbWV0aG9kIGlzIGNhbGxlZCBpbiB0aGUgY29ycmVjdCBvcmRlciBpbiB0aGUgcmVuZGVyKCkgbG9vcCAtIHJvdGF0aW9uIGdldHMgc2V0IGxhc3QuXG4gICAgICB0aGlzLnJPZmZzZXQgPSBwYXJzZUZsb2F0KGF1dG9Sb3RhdGUpIHx8IDA7XG4gICAgICB0aGlzLnJhZGlhbnMgPSAhIXZhcnMudXNlUmFkaWFucztcbiAgICAgIHRoaXMuclByb3AgPSB2YXJzLnJvdGF0aW9uIHx8IFwicm90YXRpb25cIjsgLy8gcm90YXRpb24gcHJvcGVydHlcblxuICAgICAgdGhpcy5yU2V0ID0gdGFyZ2V0Ll9nc2FwLnNldCh0YXJnZXQsIHRoaXMuclByb3AsIHRoaXMpOyAvLyByb3RhdGlvbiBzZXR0ZXJcblxuICAgICAgdGhpcy5ydSA9IF9nZXRVbml0KHRhcmdldC5fZ3NhcC5nZXQodGFyZ2V0LCB0aGlzLnJQcm9wKSkgfHwgMDsgLy8gcm90YXRpb24gdW5pdHNcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoKSAmJiAhKFwiY2xvc2VkXCIgaW4gcGF0aCkgJiYgdHlwZW9mIGZpcnN0T2JqICE9PSBcIm51bWJlclwiKSB7XG4gICAgICBmb3IgKHAgaW4gZmlyc3RPYmopIHtcbiAgICAgICAgaWYgKH5feFByb3BzLmluZGV4T2YocCkpIHtcbiAgICAgICAgICB4ID0gcDtcbiAgICAgICAgfSBlbHNlIGlmICh+X3lQcm9wcy5pbmRleE9mKHApKSB7XG4gICAgICAgICAgeSA9IHA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHggJiYgeSkge1xuICAgICAgICAvL2NvcnJlbGF0ZWQgdmFsdWVzXG4gICAgICAgIHJhd1BhdGhzLnB1c2goX3NlZ21lbnRUb1Jhd1BhdGgodGhpcywgX3BvcHVsYXRlU2VnbWVudEZyb21BcnJheShfcG9wdWxhdGVTZWdtZW50RnJvbUFycmF5KFtdLCBwYXRoLCB4LCAwKSwgcGF0aCwgeSwgMSksIHRhcmdldCwgdmFycy54IHx8IHgsIHZhcnMueSB8fCB5LCBzbGljZXIsIHZhcnMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHggPSB5ID0gMDtcbiAgICAgIH1cblxuICAgICAgZm9yIChwIGluIGZpcnN0T2JqKSB7XG4gICAgICAgIHAgIT09IHggJiYgcCAhPT0geSAmJiByYXdQYXRocy5wdXNoKF9zZWdtZW50VG9SYXdQYXRoKHRoaXMsIF9wb3B1bGF0ZVNlZ21lbnRGcm9tQXJyYXkoW10sIHBhdGgsIHAsIDIpLCB0YXJnZXQsIHAsIDAsIHNsaWNlciwgdmFycykpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByYXdQYXRoID0gc2xpY2VyKF9hbGlnbihnZXRSYXdQYXRoKHZhcnMucGF0aCksIHRhcmdldCwgdmFycykpO1xuICAgICAgY2FjaGVSYXdQYXRoTWVhc3VyZW1lbnRzKHJhd1BhdGgsIHZhcnMucmVzb2x1dGlvbik7XG4gICAgICByYXdQYXRocy5wdXNoKHJhd1BhdGgpO1xuXG4gICAgICBfYWRkRGltZW5zaW9uYWxQcm9wVHdlZW4odGhpcywgdGFyZ2V0LCB2YXJzLnggfHwgXCJ4XCIsIHJhd1BhdGgsIFwieFwiLCB2YXJzLnVuaXRYIHx8IFwicHhcIik7XG5cbiAgICAgIF9hZGREaW1lbnNpb25hbFByb3BUd2Vlbih0aGlzLCB0YXJnZXQsIHZhcnMueSB8fCBcInlcIiwgcmF3UGF0aCwgXCJ5XCIsIHZhcnMudW5pdFkgfHwgXCJweFwiKTtcbiAgICB9XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKHJhdGlvLCBkYXRhKSB7XG4gICAgdmFyIHJhd1BhdGhzID0gZGF0YS5yYXdQYXRocyxcbiAgICAgICAgaSA9IHJhd1BhdGhzLmxlbmd0aCxcbiAgICAgICAgcHQgPSBkYXRhLl9wdDtcblxuICAgIGlmIChyYXRpbyA+IDEpIHtcbiAgICAgIHJhdGlvID0gMTtcbiAgICB9IGVsc2UgaWYgKHJhdGlvIDwgMCkge1xuICAgICAgcmF0aW8gPSAwO1xuICAgIH1cblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGdldFBvc2l0aW9uT25QYXRoKHJhd1BhdGhzW2ldLCByYXRpbywgIWkgJiYgZGF0YS5yb3RhdGUsIHJhd1BhdGhzW2ldKTtcbiAgICB9XG5cbiAgICB3aGlsZSAocHQpIHtcbiAgICAgIHB0LnNldChwdC50LCBwdC5wLCBwdC5wYXRoW3B0LnBwXSArIHB0LnUsIHB0LmQsIHJhdGlvKTtcbiAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgfVxuXG4gICAgZGF0YS5yb3RhdGUgJiYgZGF0YS5yU2V0KGRhdGEudGFyZ2V0LCBkYXRhLnJQcm9wLCByYXdQYXRoc1swXS5hbmdsZSAqIChkYXRhLnJhZGlhbnMgPyBfREVHMlJBRCA6IDEpICsgZGF0YS5yT2Zmc2V0ICsgZGF0YS5ydSwgZGF0YSwgcmF0aW8pO1xuICB9LFxuICBnZXRMZW5ndGg6IGZ1bmN0aW9uIGdldExlbmd0aChwYXRoKSB7XG4gICAgcmV0dXJuIGNhY2hlUmF3UGF0aE1lYXN1cmVtZW50cyhnZXRSYXdQYXRoKHBhdGgpKS50b3RhbExlbmd0aDtcbiAgfSxcbiAgc2xpY2VSYXdQYXRoOiBzbGljZVJhd1BhdGgsXG4gIGdldFJhd1BhdGg6IGdldFJhd1BhdGgsXG4gIHBvaW50c1RvU2VnbWVudDogcG9pbnRzVG9TZWdtZW50LFxuICBzdHJpbmdUb1Jhd1BhdGg6IHN0cmluZ1RvUmF3UGF0aCxcbiAgcmF3UGF0aFRvU3RyaW5nOiByYXdQYXRoVG9TdHJpbmcsXG4gIHRyYW5zZm9ybVJhd1BhdGg6IHRyYW5zZm9ybVJhd1BhdGgsXG4gIGdldEdsb2JhbE1hdHJpeDogZ2V0R2xvYmFsTWF0cml4LFxuICBnZXRQb3NpdGlvbk9uUGF0aDogZ2V0UG9zaXRpb25PblBhdGgsXG4gIGNhY2hlUmF3UGF0aE1lYXN1cmVtZW50czogY2FjaGVSYXdQYXRoTWVhc3VyZW1lbnRzLFxuICBjb252ZXJ0VG9QYXRoOiBmdW5jdGlvbiBjb252ZXJ0VG9QYXRoKHRhcmdldHMsIHN3YXApIHtcbiAgICByZXR1cm4gX3RvQXJyYXkodGFyZ2V0cykubWFwKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIHJldHVybiBfY29udmVydFRvUGF0aCh0YXJnZXQsIHN3YXAgIT09IGZhbHNlKTtcbiAgICB9KTtcbiAgfSxcbiAgY29udmVydENvb3JkaW5hdGVzOiBmdW5jdGlvbiBjb252ZXJ0Q29vcmRpbmF0ZXMoZnJvbUVsZW1lbnQsIHRvRWxlbWVudCwgcG9pbnQpIHtcbiAgICB2YXIgbSA9IGdldEdsb2JhbE1hdHJpeCh0b0VsZW1lbnQsIHRydWUsIHRydWUpLm11bHRpcGx5KGdldEdsb2JhbE1hdHJpeChmcm9tRWxlbWVudCkpO1xuICAgIHJldHVybiBwb2ludCA/IG0uYXBwbHkocG9pbnQpIDogbTtcbiAgfSxcbiAgZ2V0QWxpZ25NYXRyaXg6IF9nZXRBbGlnbk1hdHJpeCxcbiAgZ2V0UmVsYXRpdmVQb3NpdGlvbjogZnVuY3Rpb24gZ2V0UmVsYXRpdmVQb3NpdGlvbihmcm9tRWxlbWVudCwgdG9FbGVtZW50LCBmcm9tT3JpZ2luLCB0b09yaWdpbikge1xuICAgIHZhciBtID0gX2dldEFsaWduTWF0cml4KGZyb21FbGVtZW50LCB0b0VsZW1lbnQsIGZyb21PcmlnaW4sIHRvT3JpZ2luKTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBtLmUsXG4gICAgICB5OiBtLmZcbiAgICB9O1xuICB9LFxuICBhcnJheVRvUmF3UGF0aDogZnVuY3Rpb24gYXJyYXlUb1Jhd1BhdGgodmFsdWUsIHZhcnMpIHtcbiAgICB2YXJzID0gdmFycyB8fCB7fTtcblxuICAgIHZhciBzZWdtZW50ID0gX3BvcHVsYXRlU2VnbWVudEZyb21BcnJheShfcG9wdWxhdGVTZWdtZW50RnJvbUFycmF5KFtdLCB2YWx1ZSwgdmFycy54IHx8IFwieFwiLCAwKSwgdmFsdWUsIHZhcnMueSB8fCBcInlcIiwgMSk7XG5cbiAgICB2YXJzLnJlbGF0aXZlICYmIF9yZWxhdGl2aXplKHNlZ21lbnQpO1xuICAgIHJldHVybiBbdmFycy50eXBlID09PSBcImN1YmljXCIgPyBzZWdtZW50IDogcG9pbnRzVG9TZWdtZW50KHNlZ21lbnQsIHZhcnMuY3VydmluZXNzKV07XG4gIH1cbn07XG5fZ2V0R1NBUCgpICYmIGdzYXAucmVnaXN0ZXJQbHVnaW4oTW90aW9uUGF0aFBsdWdpbik7XG5leHBvcnQgeyBNb3Rpb25QYXRoUGx1Z2luIGFzIGRlZmF1bHQgfTsiLCIvKiFcbiAqIFBpeGlQbHVnaW4gMy41LjFcbiAqIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIEBsaWNlbnNlIENvcHlyaWdodCAyMDA4LTIwMjAsIEdyZWVuU29jay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9zdGFuZGFyZC1saWNlbnNlIG9yIGZvclxuICogQ2x1YiBHcmVlblNvY2sgbWVtYmVycywgdGhlIGFncmVlbWVudCBpc3N1ZWQgd2l0aCB0aGF0IG1lbWJlcnNoaXAuXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG52YXIgZ3NhcCxcbiAgICBfd2luLFxuICAgIF9zcGxpdENvbG9yLFxuICAgIF9jb3JlSW5pdHRlZCxcbiAgICBfUElYSSxcbiAgICBQcm9wVHdlZW4sXG4gICAgX2dldFNldHRlcixcbiAgICBfd2luZG93RXhpc3RzID0gZnVuY3Rpb24gX3dpbmRvd0V4aXN0cygpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG59LFxuICAgIF9nZXRHU0FQID0gZnVuY3Rpb24gX2dldEdTQVAoKSB7XG4gIHJldHVybiBnc2FwIHx8IF93aW5kb3dFeGlzdHMoKSAmJiAoZ3NhcCA9IHdpbmRvdy5nc2FwKSAmJiBnc2FwLnJlZ2lzdGVyUGx1Z2luICYmIGdzYXA7XG59LFxuICAgIF9pc0Z1bmN0aW9uID0gZnVuY3Rpb24gX2lzRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiO1xufSxcbiAgICBfd2FybiA9IGZ1bmN0aW9uIF93YXJuKG1lc3NhZ2UpIHtcbiAgcmV0dXJuIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbn0sXG4gICAgX2lkTWF0cml4ID0gWzEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDBdLFxuICAgIF9sdW1SID0gMC4yMTI2NzEsXG4gICAgX2x1bUcgPSAwLjcxNTE2MCxcbiAgICBfbHVtQiA9IDAuMDcyMTY5LFxuICAgIF9hcHBseU1hdHJpeCA9IGZ1bmN0aW9uIF9hcHBseU1hdHJpeChtLCBtMikge1xuICB2YXIgdGVtcCA9IFtdLFxuICAgICAgaSA9IDAsXG4gICAgICB6ID0gMCxcbiAgICAgIHksXG4gICAgICB4O1xuXG4gIGZvciAoeSA9IDA7IHkgPCA0OyB5KyspIHtcbiAgICBmb3IgKHggPSAwOyB4IDwgNTsgeCsrKSB7XG4gICAgICB6ID0geCA9PT0gNCA/IG1baSArIDRdIDogMDtcbiAgICAgIHRlbXBbaSArIHhdID0gbVtpXSAqIG0yW3hdICsgbVtpICsgMV0gKiBtMlt4ICsgNV0gKyBtW2kgKyAyXSAqIG0yW3ggKyAxMF0gKyBtW2kgKyAzXSAqIG0yW3ggKyAxNV0gKyB6O1xuICAgIH1cblxuICAgIGkgKz0gNTtcbiAgfVxuXG4gIHJldHVybiB0ZW1wO1xufSxcbiAgICBfc2V0U2F0dXJhdGlvbiA9IGZ1bmN0aW9uIF9zZXRTYXR1cmF0aW9uKG0sIG4pIHtcbiAgdmFyIGludiA9IDEgLSBuLFxuICAgICAgciA9IGludiAqIF9sdW1SLFxuICAgICAgZyA9IGludiAqIF9sdW1HLFxuICAgICAgYiA9IGludiAqIF9sdW1CO1xuICByZXR1cm4gX2FwcGx5TWF0cml4KFtyICsgbiwgZywgYiwgMCwgMCwgciwgZyArIG4sIGIsIDAsIDAsIHIsIGcsIGIgKyBuLCAwLCAwLCAwLCAwLCAwLCAxLCAwXSwgbSk7XG59LFxuICAgIF9jb2xvcml6ZSA9IGZ1bmN0aW9uIF9jb2xvcml6ZShtLCBjb2xvciwgYW1vdW50KSB7XG4gIHZhciBjID0gX3NwbGl0Q29sb3IoY29sb3IpLFxuICAgICAgciA9IGNbMF0gLyAyNTUsXG4gICAgICBnID0gY1sxXSAvIDI1NSxcbiAgICAgIGIgPSBjWzJdIC8gMjU1LFxuICAgICAgaW52ID0gMSAtIGFtb3VudDtcblxuICByZXR1cm4gX2FwcGx5TWF0cml4KFtpbnYgKyBhbW91bnQgKiByICogX2x1bVIsIGFtb3VudCAqIHIgKiBfbHVtRywgYW1vdW50ICogciAqIF9sdW1CLCAwLCAwLCBhbW91bnQgKiBnICogX2x1bVIsIGludiArIGFtb3VudCAqIGcgKiBfbHVtRywgYW1vdW50ICogZyAqIF9sdW1CLCAwLCAwLCBhbW91bnQgKiBiICogX2x1bVIsIGFtb3VudCAqIGIgKiBfbHVtRywgaW52ICsgYW1vdW50ICogYiAqIF9sdW1CLCAwLCAwLCAwLCAwLCAwLCAxLCAwXSwgbSk7XG59LFxuICAgIF9zZXRIdWUgPSBmdW5jdGlvbiBfc2V0SHVlKG0sIG4pIHtcbiAgbiAqPSBNYXRoLlBJIC8gMTgwO1xuICB2YXIgYyA9IE1hdGguY29zKG4pLFxuICAgICAgcyA9IE1hdGguc2luKG4pO1xuICByZXR1cm4gX2FwcGx5TWF0cml4KFtfbHVtUiArIGMgKiAoMSAtIF9sdW1SKSArIHMgKiAtX2x1bVIsIF9sdW1HICsgYyAqIC1fbHVtRyArIHMgKiAtX2x1bUcsIF9sdW1CICsgYyAqIC1fbHVtQiArIHMgKiAoMSAtIF9sdW1CKSwgMCwgMCwgX2x1bVIgKyBjICogLV9sdW1SICsgcyAqIDAuMTQzLCBfbHVtRyArIGMgKiAoMSAtIF9sdW1HKSArIHMgKiAwLjE0LCBfbHVtQiArIGMgKiAtX2x1bUIgKyBzICogLTAuMjgzLCAwLCAwLCBfbHVtUiArIGMgKiAtX2x1bVIgKyBzICogLSgxIC0gX2x1bVIpLCBfbHVtRyArIGMgKiAtX2x1bUcgKyBzICogX2x1bUcsIF9sdW1CICsgYyAqICgxIC0gX2x1bUIpICsgcyAqIF9sdW1CLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxXSwgbSk7XG59LFxuICAgIF9zZXRDb250cmFzdCA9IGZ1bmN0aW9uIF9zZXRDb250cmFzdChtLCBuKSB7XG4gIHJldHVybiBfYXBwbHlNYXRyaXgoW24sIDAsIDAsIDAsIDAuNSAqICgxIC0gbiksIDAsIG4sIDAsIDAsIDAuNSAqICgxIC0gbiksIDAsIDAsIG4sIDAsIDAuNSAqICgxIC0gbiksIDAsIDAsIDAsIDEsIDBdLCBtKTtcbn0sXG4gICAgX2dldEZpbHRlciA9IGZ1bmN0aW9uIF9nZXRGaWx0ZXIodGFyZ2V0LCB0eXBlKSB7XG4gIHZhciBmaWx0ZXJDbGFzcyA9IF9QSVhJLmZpbHRlcnNbdHlwZV0sXG4gICAgICBmaWx0ZXJzID0gdGFyZ2V0LmZpbHRlcnMgfHwgW10sXG4gICAgICBpID0gZmlsdGVycy5sZW5ndGgsXG4gICAgICBmaWx0ZXI7XG5cbiAgaWYgKCFmaWx0ZXJDbGFzcykge1xuICAgIF93YXJuKHR5cGUgKyBcIiBub3QgZm91bmQuIFBpeGlQbHVnaW4ucmVnaXN0ZXJQSVhJKFBJWEkpXCIpO1xuICB9XG5cbiAgd2hpbGUgKC0taSA+IC0xKSB7XG4gICAgaWYgKGZpbHRlcnNbaV0gaW5zdGFuY2VvZiBmaWx0ZXJDbGFzcykge1xuICAgICAgcmV0dXJuIGZpbHRlcnNbaV07XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyID0gbmV3IGZpbHRlckNsYXNzKCk7XG5cbiAgaWYgKHR5cGUgPT09IFwiQmx1ckZpbHRlclwiKSB7XG4gICAgZmlsdGVyLmJsdXIgPSAwO1xuICB9XG5cbiAgZmlsdGVycy5wdXNoKGZpbHRlcik7XG4gIHRhcmdldC5maWx0ZXJzID0gZmlsdGVycztcbiAgcmV0dXJuIGZpbHRlcjtcbn0sXG4gICAgX2FkZENvbG9yTWF0cml4RmlsdGVyQ2FjaGVUd2VlbiA9IGZ1bmN0aW9uIF9hZGRDb2xvck1hdHJpeEZpbHRlckNhY2hlVHdlZW4ocCwgcGx1Z2luLCBjYWNoZSwgdmFycykge1xuICAvL3dlIGNhY2hlIHRoZSBDb2xvck1hdHJpeEZpbHRlciBjb21wb25lbnRzIGluIGEgX2dzQ29sb3JNYXRyaXhGaWx0ZXIgb2JqZWN0IGF0dGFjaGVkIHRvIHRoZSB0YXJnZXQgb2JqZWN0IHNvIHRoYXQgaXQncyBlYXN5IHRvIGdyYWIgdGhlIGN1cnJlbnQgdmFsdWUgYXQgYW55IHRpbWUuXG4gIHBsdWdpbi5hZGQoY2FjaGUsIHAsIGNhY2hlW3BdLCB2YXJzW3BdKTtcblxuICBwbHVnaW4uX3Byb3BzLnB1c2gocCk7XG59LFxuICAgIF9hcHBseUJyaWdodG5lc3NUb01hdHJpeCA9IGZ1bmN0aW9uIF9hcHBseUJyaWdodG5lc3NUb01hdHJpeChicmlnaHRuZXNzLCBtYXRyaXgpIHtcbiAgdmFyIHRlbXAgPSBuZXcgX1BJWEkuZmlsdGVycy5Db2xvck1hdHJpeEZpbHRlcigpO1xuICB0ZW1wLm1hdHJpeCA9IG1hdHJpeDtcbiAgdGVtcC5icmlnaHRuZXNzKGJyaWdodG5lc3MsIHRydWUpO1xuICByZXR1cm4gdGVtcC5tYXRyaXg7XG59LFxuICAgIF9jb3B5ID0gZnVuY3Rpb24gX2NvcHkob2JqKSB7XG4gIHZhciBjb3B5ID0ge30sXG4gICAgICBwO1xuXG4gIGZvciAocCBpbiBvYmopIHtcbiAgICBjb3B5W3BdID0gb2JqW3BdO1xuICB9XG5cbiAgcmV0dXJuIGNvcHk7XG59LFxuICAgIF9DTUZkZWZhdWx0cyA9IHtcbiAgY29udHJhc3Q6IDEsXG4gIHNhdHVyYXRpb246IDEsXG4gIGNvbG9yaXplQW1vdW50OiAwLFxuICBjb2xvcml6ZTogXCJyZ2IoMjU1LDI1NSwyNTUpXCIsXG4gIGh1ZTogMCxcbiAgYnJpZ2h0bmVzczogMVxufSxcbiAgICBfcGFyc2VDb2xvck1hdHJpeEZpbHRlciA9IGZ1bmN0aW9uIF9wYXJzZUNvbG9yTWF0cml4RmlsdGVyKHRhcmdldCwgdiwgcGcpIHtcbiAgdmFyIGZpbHRlciA9IF9nZXRGaWx0ZXIodGFyZ2V0LCBcIkNvbG9yTWF0cml4RmlsdGVyXCIpLFxuICAgICAgY2FjaGUgPSB0YXJnZXQuX2dzQ29sb3JNYXRyaXhGaWx0ZXIgPSB0YXJnZXQuX2dzQ29sb3JNYXRyaXhGaWx0ZXIgfHwgX2NvcHkoX0NNRmRlZmF1bHRzKSxcbiAgICAgIGNvbWJpbmUgPSB2LmNvbWJpbmVDTUYgJiYgIShcImNvbG9yTWF0cml4RmlsdGVyXCIgaW4gdiAmJiAhdi5jb2xvck1hdHJpeEZpbHRlciksXG4gICAgICBpLFxuICAgICAgbWF0cml4LFxuICAgICAgc3RhcnRNYXRyaXg7XG5cbiAgc3RhcnRNYXRyaXggPSBmaWx0ZXIubWF0cml4O1xuXG4gIGlmICh2LnJlc29sdXRpb24pIHtcbiAgICBmaWx0ZXIucmVzb2x1dGlvbiA9IHYucmVzb2x1dGlvbjtcbiAgfVxuXG4gIGlmICh2Lm1hdHJpeCAmJiB2Lm1hdHJpeC5sZW5ndGggPT09IHN0YXJ0TWF0cml4Lmxlbmd0aCkge1xuICAgIG1hdHJpeCA9IHYubWF0cml4O1xuXG4gICAgaWYgKGNhY2hlLmNvbnRyYXN0ICE9PSAxKSB7XG4gICAgICBfYWRkQ29sb3JNYXRyaXhGaWx0ZXJDYWNoZVR3ZWVuKFwiY29udHJhc3RcIiwgcGcsIGNhY2hlLCBfQ01GZGVmYXVsdHMpO1xuICAgIH1cblxuICAgIGlmIChjYWNoZS5odWUpIHtcbiAgICAgIF9hZGRDb2xvck1hdHJpeEZpbHRlckNhY2hlVHdlZW4oXCJodWVcIiwgcGcsIGNhY2hlLCBfQ01GZGVmYXVsdHMpO1xuICAgIH1cblxuICAgIGlmIChjYWNoZS5icmlnaHRuZXNzICE9PSAxKSB7XG4gICAgICBfYWRkQ29sb3JNYXRyaXhGaWx0ZXJDYWNoZVR3ZWVuKFwiYnJpZ2h0bmVzc1wiLCBwZywgY2FjaGUsIF9DTUZkZWZhdWx0cyk7XG4gICAgfVxuXG4gICAgaWYgKGNhY2hlLmNvbG9yaXplQW1vdW50KSB7XG4gICAgICBfYWRkQ29sb3JNYXRyaXhGaWx0ZXJDYWNoZVR3ZWVuKFwiY29sb3JpemVcIiwgcGcsIGNhY2hlLCBfQ01GZGVmYXVsdHMpO1xuXG4gICAgICBfYWRkQ29sb3JNYXRyaXhGaWx0ZXJDYWNoZVR3ZWVuKFwiY29sb3JpemVBbW91bnRcIiwgcGcsIGNhY2hlLCBfQ01GZGVmYXVsdHMpO1xuICAgIH1cblxuICAgIGlmIChjYWNoZS5zYXR1cmF0aW9uICE9PSAxKSB7XG4gICAgICBfYWRkQ29sb3JNYXRyaXhGaWx0ZXJDYWNoZVR3ZWVuKFwic2F0dXJhdGlvblwiLCBwZywgY2FjaGUsIF9DTUZkZWZhdWx0cyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG1hdHJpeCA9IF9pZE1hdHJpeC5zbGljZSgpO1xuXG4gICAgaWYgKHYuY29udHJhc3QgIT0gbnVsbCkge1xuICAgICAgbWF0cml4ID0gX3NldENvbnRyYXN0KG1hdHJpeCwgK3YuY29udHJhc3QpO1xuXG4gICAgICBfYWRkQ29sb3JNYXRyaXhGaWx0ZXJDYWNoZVR3ZWVuKFwiY29udHJhc3RcIiwgcGcsIGNhY2hlLCB2KTtcbiAgICB9IGVsc2UgaWYgKGNhY2hlLmNvbnRyYXN0ICE9PSAxKSB7XG4gICAgICBpZiAoY29tYmluZSkge1xuICAgICAgICBtYXRyaXggPSBfc2V0Q29udHJhc3QobWF0cml4LCBjYWNoZS5jb250cmFzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfYWRkQ29sb3JNYXRyaXhGaWx0ZXJDYWNoZVR3ZWVuKFwiY29udHJhc3RcIiwgcGcsIGNhY2hlLCBfQ01GZGVmYXVsdHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2Lmh1ZSAhPSBudWxsKSB7XG4gICAgICBtYXRyaXggPSBfc2V0SHVlKG1hdHJpeCwgK3YuaHVlKTtcblxuICAgICAgX2FkZENvbG9yTWF0cml4RmlsdGVyQ2FjaGVUd2VlbihcImh1ZVwiLCBwZywgY2FjaGUsIHYpO1xuICAgIH0gZWxzZSBpZiAoY2FjaGUuaHVlKSB7XG4gICAgICBpZiAoY29tYmluZSkge1xuICAgICAgICBtYXRyaXggPSBfc2V0SHVlKG1hdHJpeCwgY2FjaGUuaHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9hZGRDb2xvck1hdHJpeEZpbHRlckNhY2hlVHdlZW4oXCJodWVcIiwgcGcsIGNhY2hlLCBfQ01GZGVmYXVsdHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2LmJyaWdodG5lc3MgIT0gbnVsbCkge1xuICAgICAgbWF0cml4ID0gX2FwcGx5QnJpZ2h0bmVzc1RvTWF0cml4KCt2LmJyaWdodG5lc3MsIG1hdHJpeCk7XG5cbiAgICAgIF9hZGRDb2xvck1hdHJpeEZpbHRlckNhY2hlVHdlZW4oXCJicmlnaHRuZXNzXCIsIHBnLCBjYWNoZSwgdik7XG4gICAgfSBlbHNlIGlmIChjYWNoZS5icmlnaHRuZXNzICE9PSAxKSB7XG4gICAgICBpZiAoY29tYmluZSkge1xuICAgICAgICBtYXRyaXggPSBfYXBwbHlCcmlnaHRuZXNzVG9NYXRyaXgoY2FjaGUuYnJpZ2h0bmVzcywgbWF0cml4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9hZGRDb2xvck1hdHJpeEZpbHRlckNhY2hlVHdlZW4oXCJicmlnaHRuZXNzXCIsIHBnLCBjYWNoZSwgX0NNRmRlZmF1bHRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodi5jb2xvcml6ZSAhPSBudWxsKSB7XG4gICAgICB2LmNvbG9yaXplQW1vdW50ID0gXCJjb2xvcml6ZUFtb3VudFwiIGluIHYgPyArdi5jb2xvcml6ZUFtb3VudCA6IDE7XG4gICAgICBtYXRyaXggPSBfY29sb3JpemUobWF0cml4LCB2LmNvbG9yaXplLCB2LmNvbG9yaXplQW1vdW50KTtcblxuICAgICAgX2FkZENvbG9yTWF0cml4RmlsdGVyQ2FjaGVUd2VlbihcImNvbG9yaXplXCIsIHBnLCBjYWNoZSwgdik7XG5cbiAgICAgIF9hZGRDb2xvck1hdHJpeEZpbHRlckNhY2hlVHdlZW4oXCJjb2xvcml6ZUFtb3VudFwiLCBwZywgY2FjaGUsIHYpO1xuICAgIH0gZWxzZSBpZiAoY2FjaGUuY29sb3JpemVBbW91bnQpIHtcbiAgICAgIGlmIChjb21iaW5lKSB7XG4gICAgICAgIG1hdHJpeCA9IF9jb2xvcml6ZShtYXRyaXgsIGNhY2hlLmNvbG9yaXplLCBjYWNoZS5jb2xvcml6ZUFtb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfYWRkQ29sb3JNYXRyaXhGaWx0ZXJDYWNoZVR3ZWVuKFwiY29sb3JpemVcIiwgcGcsIGNhY2hlLCBfQ01GZGVmYXVsdHMpO1xuXG4gICAgICAgIF9hZGRDb2xvck1hdHJpeEZpbHRlckNhY2hlVHdlZW4oXCJjb2xvcml6ZUFtb3VudFwiLCBwZywgY2FjaGUsIF9DTUZkZWZhdWx0cyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHYuc2F0dXJhdGlvbiAhPSBudWxsKSB7XG4gICAgICBtYXRyaXggPSBfc2V0U2F0dXJhdGlvbihtYXRyaXgsICt2LnNhdHVyYXRpb24pO1xuXG4gICAgICBfYWRkQ29sb3JNYXRyaXhGaWx0ZXJDYWNoZVR3ZWVuKFwic2F0dXJhdGlvblwiLCBwZywgY2FjaGUsIHYpO1xuICAgIH0gZWxzZSBpZiAoY2FjaGUuc2F0dXJhdGlvbiAhPT0gMSkge1xuICAgICAgaWYgKGNvbWJpbmUpIHtcbiAgICAgICAgbWF0cml4ID0gX3NldFNhdHVyYXRpb24obWF0cml4LCBjYWNoZS5zYXR1cmF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9hZGRDb2xvck1hdHJpeEZpbHRlckNhY2hlVHdlZW4oXCJzYXR1cmF0aW9uXCIsIHBnLCBjYWNoZSwgX0NNRmRlZmF1bHRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpID0gbWF0cml4Lmxlbmd0aDtcblxuICB3aGlsZSAoLS1pID4gLTEpIHtcbiAgICBpZiAobWF0cml4W2ldICE9PSBzdGFydE1hdHJpeFtpXSkge1xuICAgICAgcGcuYWRkKHN0YXJ0TWF0cml4LCBpLCBzdGFydE1hdHJpeFtpXSwgbWF0cml4W2ldLCBcImNvbG9yTWF0cml4RmlsdGVyXCIpO1xuICAgIH1cbiAgfVxuXG4gIHBnLl9wcm9wcy5wdXNoKFwiY29sb3JNYXRyaXhGaWx0ZXJcIik7XG59LFxuICAgIF9yZW5kZXJDb2xvciA9IGZ1bmN0aW9uIF9yZW5kZXJDb2xvcihyYXRpbywgX3JlZikge1xuICB2YXIgdCA9IF9yZWYudCxcbiAgICAgIHAgPSBfcmVmLnAsXG4gICAgICBjb2xvciA9IF9yZWYuY29sb3IsXG4gICAgICBzZXQgPSBfcmVmLnNldDtcbiAgc2V0KHQsIHAsIGNvbG9yWzBdIDw8IDE2IHwgY29sb3JbMV0gPDwgOCB8IGNvbG9yWzJdKTtcbn0sXG4gICAgX3JlbmRlckRpcnR5Q2FjaGUgPSBmdW5jdGlvbiBfcmVuZGVyRGlydHlDYWNoZShyYXRpbywgX3JlZjIpIHtcbiAgdmFyIGcgPSBfcmVmMi5nO1xuXG4gIGlmIChnKSB7XG4gICAgLy9pbiBvcmRlciBmb3IgUGl4aUpTIHRvIGFjdHVhbGx5IHJlZHJhdyBHcmFwaGljc0RhdGEsIHdlJ3ZlIGdvdHRhIGluY3JlbWVudCB0aGUgXCJkaXJ0eVwiIGFuZCBcImNsZWFyRGlydHlcIiB2YWx1ZXMuIElmIHdlIGRvbid0IGRvIHRoaXMsIHRoZSB2YWx1ZXMgd2lsbCBiZSB0d2VlbiBwcm9wZXJseSwgYnV0IG5vdCByZW5kZXJlZC5cbiAgICBnLmRpcnR5Kys7XG4gICAgZy5jbGVhckRpcnR5Kys7XG4gIH1cbn0sXG4gICAgX3JlbmRlckF1dG9BbHBoYSA9IGZ1bmN0aW9uIF9yZW5kZXJBdXRvQWxwaGEocmF0aW8sIGRhdGEpIHtcbiAgZGF0YS50LnZpc2libGUgPSAhIWRhdGEudC5hbHBoYTtcbn0sXG4gICAgX2FkZENvbG9yVHdlZW4gPSBmdW5jdGlvbiBfYWRkQ29sb3JUd2Vlbih0YXJnZXQsIHAsIHZhbHVlLCBwbHVnaW4pIHtcbiAgdmFyIGN1cnJlbnRWYWx1ZSA9IHRhcmdldFtwXSxcbiAgICAgIHN0YXJ0Q29sb3IgPSBfc3BsaXRDb2xvcihfaXNGdW5jdGlvbihjdXJyZW50VmFsdWUpID8gdGFyZ2V0W3AuaW5kZXhPZihcInNldFwiKSB8fCAhX2lzRnVuY3Rpb24odGFyZ2V0W1wiZ2V0XCIgKyBwLnN1YnN0cigzKV0pID8gcCA6IFwiZ2V0XCIgKyBwLnN1YnN0cigzKV0oKSA6IGN1cnJlbnRWYWx1ZSksXG4gICAgICBlbmRDb2xvciA9IF9zcGxpdENvbG9yKHZhbHVlKTtcblxuICBwbHVnaW4uX3B0ID0gbmV3IFByb3BUd2VlbihwbHVnaW4uX3B0LCB0YXJnZXQsIHAsIDAsIDAsIF9yZW5kZXJDb2xvciwge1xuICAgIHQ6IHRhcmdldCxcbiAgICBwOiBwLFxuICAgIGNvbG9yOiBzdGFydENvbG9yLFxuICAgIHNldDogX2dldFNldHRlcih0YXJnZXQsIHApXG4gIH0pO1xuICBwbHVnaW4uYWRkKHN0YXJ0Q29sb3IsIDAsIHN0YXJ0Q29sb3JbMF0sIGVuZENvbG9yWzBdKTtcbiAgcGx1Z2luLmFkZChzdGFydENvbG9yLCAxLCBzdGFydENvbG9yWzFdLCBlbmRDb2xvclsxXSk7XG4gIHBsdWdpbi5hZGQoc3RhcnRDb2xvciwgMiwgc3RhcnRDb2xvclsyXSwgZW5kQ29sb3JbMl0pO1xufSxcbiAgICBfY29sb3JQcm9wcyA9IHtcbiAgdGludDogMSxcbiAgbGluZUNvbG9yOiAxLFxuICBmaWxsQ29sb3I6IDFcbn0sXG4gICAgX3h5Q29udGV4dHMgPSBcInBvc2l0aW9uLHNjYWxlLHNrZXcscGl2b3QsYW5jaG9yLHRpbGVQb3NpdGlvbix0aWxlU2NhbGVcIi5zcGxpdChcIixcIiksXG4gICAgX2NvbnRleHRzID0ge1xuICB4OiBcInBvc2l0aW9uXCIsXG4gIHk6IFwicG9zaXRpb25cIixcbiAgdGlsZVg6IFwidGlsZVBvc2l0aW9uXCIsXG4gIHRpbGVZOiBcInRpbGVQb3NpdGlvblwiXG59LFxuICAgIF9jb2xvck1hdHJpeEZpbHRlclByb3BzID0ge1xuICBjb2xvck1hdHJpeEZpbHRlcjogMSxcbiAgc2F0dXJhdGlvbjogMSxcbiAgY29udHJhc3Q6IDEsXG4gIGh1ZTogMSxcbiAgY29sb3JpemU6IDEsXG4gIGNvbG9yaXplQW1vdW50OiAxLFxuICBicmlnaHRuZXNzOiAxLFxuICBjb21iaW5lQ01GOiAxXG59LFxuICAgIF9ERUcyUkFEID0gTWF0aC5QSSAvIDE4MCxcbiAgICBfaXNTdHJpbmcgPSBmdW5jdGlvbiBfaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn0sXG4gICAgX2RlZ3JlZXNUb1JhZGlhbnMgPSBmdW5jdGlvbiBfZGVncmVlc1RvUmFkaWFucyh2YWx1ZSkge1xuICByZXR1cm4gX2lzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS5jaGFyQXQoMSkgPT09IFwiPVwiID8gdmFsdWUuc3Vic3RyKDAsIDIpICsgcGFyc2VGbG9hdCh2YWx1ZS5zdWJzdHIoMikpICogX0RFRzJSQUQgOiB2YWx1ZSAqIF9ERUcyUkFEO1xufSxcbiAgICBfcmVuZGVyUHJvcFdpdGhFbmQgPSBmdW5jdGlvbiBfcmVuZGVyUHJvcFdpdGhFbmQocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCByYXRpbyA9PT0gMSA/IGRhdGEuZSA6IE1hdGgucm91bmQoKGRhdGEucyArIGRhdGEuYyAqIHJhdGlvKSAqIDEwMDAwMCkgLyAxMDAwMDAsIGRhdGEpO1xufSxcbiAgICBfYWRkUm90YXRpb25hbFByb3BUd2VlbiA9IGZ1bmN0aW9uIF9hZGRSb3RhdGlvbmFsUHJvcFR3ZWVuKHBsdWdpbiwgdGFyZ2V0LCBwcm9wZXJ0eSwgc3RhcnROdW0sIGVuZFZhbHVlLCByYWRpYW5zKSB7XG4gIHZhciBjYXAgPSAzNjAgKiAocmFkaWFucyA/IF9ERUcyUkFEIDogMSksXG4gICAgICBpc1N0cmluZyA9IF9pc1N0cmluZyhlbmRWYWx1ZSksXG4gICAgICByZWxhdGl2ZSA9IGlzU3RyaW5nICYmIGVuZFZhbHVlLmNoYXJBdCgxKSA9PT0gXCI9XCIgPyArKGVuZFZhbHVlLmNoYXJBdCgwKSArIFwiMVwiKSA6IDAsXG4gICAgICBlbmROdW0gPSBwYXJzZUZsb2F0KHJlbGF0aXZlID8gZW5kVmFsdWUuc3Vic3RyKDIpIDogZW5kVmFsdWUpICogKHJhZGlhbnMgPyBfREVHMlJBRCA6IDEpLFxuICAgICAgY2hhbmdlID0gcmVsYXRpdmUgPyBlbmROdW0gKiByZWxhdGl2ZSA6IGVuZE51bSAtIHN0YXJ0TnVtLFxuICAgICAgZmluYWxWYWx1ZSA9IHN0YXJ0TnVtICsgY2hhbmdlLFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgcHQ7XG5cbiAgaWYgKGlzU3RyaW5nKSB7XG4gICAgZGlyZWN0aW9uID0gZW5kVmFsdWUuc3BsaXQoXCJfXCIpWzFdO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJzaG9ydFwiKSB7XG4gICAgICBjaGFuZ2UgJT0gY2FwO1xuXG4gICAgICBpZiAoY2hhbmdlICE9PSBjaGFuZ2UgJSAoY2FwIC8gMikpIHtcbiAgICAgICAgY2hhbmdlICs9IGNoYW5nZSA8IDAgPyBjYXAgOiAtY2FwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiY3dcIiAmJiBjaGFuZ2UgPCAwKSB7XG4gICAgICBjaGFuZ2UgPSAoY2hhbmdlICsgY2FwICogMWUxMCkgJSBjYXAgLSB+fihjaGFuZ2UgLyBjYXApICogY2FwO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNjd1wiICYmIGNoYW5nZSA+IDApIHtcbiAgICAgIGNoYW5nZSA9IChjaGFuZ2UgLSBjYXAgKiAxZTEwKSAlIGNhcCAtIH5+KGNoYW5nZSAvIGNhcCkgKiBjYXA7XG4gICAgfVxuICB9XG5cbiAgcGx1Z2luLl9wdCA9IHB0ID0gbmV3IFByb3BUd2VlbihwbHVnaW4uX3B0LCB0YXJnZXQsIHByb3BlcnR5LCBzdGFydE51bSwgY2hhbmdlLCBfcmVuZGVyUHJvcFdpdGhFbmQpO1xuICBwdC5lID0gZmluYWxWYWx1ZTtcbiAgcmV0dXJuIHB0O1xufSxcbiAgICBfaW5pdENvcmUgPSBmdW5jdGlvbiBfaW5pdENvcmUoKSB7XG4gIGlmIChfd2luZG93RXhpc3RzKCkpIHtcbiAgICBfd2luID0gd2luZG93O1xuICAgIGdzYXAgPSBfY29yZUluaXR0ZWQgPSBfZ2V0R1NBUCgpO1xuICAgIF9QSVhJID0gX1BJWEkgfHwgX3dpbi5QSVhJO1xuXG4gICAgX3NwbGl0Q29sb3IgPSBmdW5jdGlvbiBfc3BsaXRDb2xvcihjb2xvcikge1xuICAgICAgcmV0dXJuIGdzYXAudXRpbHMuc3BsaXRDb2xvcigoY29sb3IgKyBcIlwiKS5zdWJzdHIoMCwgMikgPT09IFwiMHhcIiA/IFwiI1wiICsgY29sb3Iuc3Vic3RyKDIpIDogY29sb3IpO1xuICAgIH07IC8vIHNvbWUgY29sb3JzIGluIFBJWEkgYXJlIHJlcG9ydGVkIGFzIFwiMHhGRjQ0MjFcIiBpbnN0ZWFkIG9mIFwiI0ZGNDQyMVwiLlxuXG4gIH1cbn0sXG4gICAgaSxcbiAgICBwOyAvL2NvbnRleHQgc2V0dXAuLi5cblxuXG5mb3IgKGkgPSAwOyBpIDwgX3h5Q29udGV4dHMubGVuZ3RoOyBpKyspIHtcbiAgcCA9IF94eUNvbnRleHRzW2ldO1xuICBfY29udGV4dHNbcCArIFwiWFwiXSA9IHA7XG4gIF9jb250ZXh0c1twICsgXCJZXCJdID0gcDtcbn1cblxuZXhwb3J0IHZhciBQaXhpUGx1Z2luID0ge1xuICB2ZXJzaW9uOiBcIjMuNS4xXCIsXG4gIG5hbWU6IFwicGl4aVwiLFxuICByZWdpc3RlcjogZnVuY3Rpb24gcmVnaXN0ZXIoY29yZSwgUGx1Z2luLCBwcm9wVHdlZW4pIHtcbiAgICBnc2FwID0gY29yZTtcbiAgICBQcm9wVHdlZW4gPSBwcm9wVHdlZW47XG4gICAgX2dldFNldHRlciA9IFBsdWdpbi5nZXRTZXR0ZXI7XG5cbiAgICBfaW5pdENvcmUoKTtcbiAgfSxcbiAgcmVnaXN0ZXJQSVhJOiBmdW5jdGlvbiByZWdpc3RlclBJWEkocGl4aSkge1xuICAgIF9QSVhJID0gcGl4aTtcbiAgfSxcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhbHVlcywgdHdlZW4sIGluZGV4LCB0YXJnZXRzKSB7XG4gICAgaWYgKCFfUElYSSkge1xuICAgICAgX2luaXRDb3JlKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXQgaW5zdGFuY2VvZiBfUElYSS5EaXNwbGF5T2JqZWN0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGlzVjQgPSBfUElYSS5WRVJTSU9OLmNoYXJBdCgwKSA9PT0gXCI0XCIsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGF4aXMsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb2xvck1hdHJpeCxcbiAgICAgICAgZmlsdGVyLFxuICAgICAgICBwLFxuICAgICAgICBwYWRkaW5nLFxuICAgICAgICBpLFxuICAgICAgICBkYXRhO1xuXG4gICAgZm9yIChwIGluIHZhbHVlcykge1xuICAgICAgY29udGV4dCA9IF9jb250ZXh0c1twXTtcbiAgICAgIHZhbHVlID0gdmFsdWVzW3BdO1xuXG4gICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICBheGlzID0gfnAuY2hhckF0KHAubGVuZ3RoIC0gMSkudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwieFwiKSA/IFwieFwiIDogXCJ5XCI7XG4gICAgICAgIHRoaXMuYWRkKHRhcmdldFtjb250ZXh0XSwgYXhpcywgdGFyZ2V0W2NvbnRleHRdW2F4aXNdLCBjb250ZXh0ID09PSBcInNrZXdcIiA/IF9kZWdyZWVzVG9SYWRpYW5zKHZhbHVlKSA6IHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAocCA9PT0gXCJzY2FsZVwiIHx8IHAgPT09IFwiYW5jaG9yXCIgfHwgcCA9PT0gXCJwaXZvdFwiIHx8IHAgPT09IFwidGlsZVNjYWxlXCIpIHtcbiAgICAgICAgdGhpcy5hZGQodGFyZ2V0W3BdLCBcInhcIiwgdGFyZ2V0W3BdLngsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5hZGQodGFyZ2V0W3BdLCBcInlcIiwgdGFyZ2V0W3BdLnksIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAocCA9PT0gXCJyb3RhdGlvblwiIHx8IHAgPT09IFwiYW5nbGVcIikge1xuICAgICAgICAvL1BJWEkgZXhwZWN0cyByb3RhdGlvbiBpbiByYWRpYW5zLCBidXQgYXMgYSBjb252ZW5pZW5jZSB3ZSBsZXQgZm9sa3MgZGVmaW5lIGl0IGluIGRlZ3JlZXMgYW5kIHdlIGRvIHRoZSBjb252ZXJzaW9uLlxuICAgICAgICBfYWRkUm90YXRpb25hbFByb3BUd2Vlbih0aGlzLCB0YXJnZXQsIHAsIHRhcmdldFtwXSwgdmFsdWUsIHAgPT09IFwicm90YXRpb25cIik7XG4gICAgICB9IGVsc2UgaWYgKF9jb2xvck1hdHJpeEZpbHRlclByb3BzW3BdKSB7XG4gICAgICAgIGlmICghY29sb3JNYXRyaXgpIHtcbiAgICAgICAgICBfcGFyc2VDb2xvck1hdHJpeEZpbHRlcih0YXJnZXQsIHZhbHVlcy5jb2xvck1hdHJpeEZpbHRlciB8fCB2YWx1ZXMsIHRoaXMpO1xuXG4gICAgICAgICAgY29sb3JNYXRyaXggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHAgPT09IFwiYmx1clwiIHx8IHAgPT09IFwiYmx1clhcIiB8fCBwID09PSBcImJsdXJZXCIgfHwgcCA9PT0gXCJibHVyUGFkZGluZ1wiKSB7XG4gICAgICAgIGZpbHRlciA9IF9nZXRGaWx0ZXIodGFyZ2V0LCBcIkJsdXJGaWx0ZXJcIik7XG4gICAgICAgIHRoaXMuYWRkKGZpbHRlciwgcCwgZmlsdGVyW3BdLCB2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHZhbHVlcy5ibHVyUGFkZGluZyAhPT0gMCkge1xuICAgICAgICAgIHBhZGRpbmcgPSB2YWx1ZXMuYmx1clBhZGRpbmcgfHwgTWF0aC5tYXgoZmlsdGVyW3BdLCB2YWx1ZSkgKiAyO1xuICAgICAgICAgIGkgPSB0YXJnZXQuZmlsdGVycy5sZW5ndGg7XG5cbiAgICAgICAgICB3aGlsZSAoLS1pID4gLTEpIHtcbiAgICAgICAgICAgIHRhcmdldC5maWx0ZXJzW2ldLnBhZGRpbmcgPSBNYXRoLm1heCh0YXJnZXQuZmlsdGVyc1tpXS5wYWRkaW5nLCBwYWRkaW5nKTsgLy9pZiB3ZSBkb24ndCBleHBhbmQgdGhlIHBhZGRpbmcgb24gYWxsIHRoZSBmaWx0ZXJzLCBpdCBjYW4gbG9vayBjbGlwcGVkLlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfY29sb3JQcm9wc1twXSkge1xuICAgICAgICBpZiAoKHAgPT09IFwibGluZUNvbG9yXCIgfHwgcCA9PT0gXCJmaWxsQ29sb3JcIikgJiYgdGFyZ2V0IGluc3RhbmNlb2YgX1BJWEkuR3JhcGhpY3MpIHtcbiAgICAgICAgICBkYXRhID0gKHRhcmdldC5nZW9tZXRyeSB8fCB0YXJnZXQpLmdyYXBoaWNzRGF0YTsgLy9cImdlb21ldHJ5XCIgd2FzIGludHJvZHVjZWQgaW4gUElYSSB2ZXJzaW9uIDVcblxuICAgICAgICAgIHRoaXMuX3B0ID0gbmV3IFByb3BUd2Vlbih0aGlzLl9wdCwgdGFyZ2V0LCBwLCAwLCAwLCBfcmVuZGVyRGlydHlDYWNoZSwge1xuICAgICAgICAgICAgZzogdGFyZ2V0Lmdlb21ldHJ5IHx8IHRhcmdldFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGkgPSBkYXRhLmxlbmd0aDtcblxuICAgICAgICAgIHdoaWxlICgtLWkgPiAtMSkge1xuICAgICAgICAgICAgX2FkZENvbG9yVHdlZW4oaXNWNCA/IGRhdGFbaV0gOiBkYXRhW2ldW3Auc3Vic3RyKDAsIDQpICsgXCJTdHlsZVwiXSwgaXNWNCA/IHAgOiBcImNvbG9yXCIsIHZhbHVlLCB0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2FkZENvbG9yVHdlZW4odGFyZ2V0LCBwLCB2YWx1ZSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocCA9PT0gXCJhdXRvQWxwaGFcIikge1xuICAgICAgICB0aGlzLl9wdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIHRhcmdldCwgXCJ2aXNpYmxlXCIsIDAsIDAsIF9yZW5kZXJBdXRvQWxwaGEpO1xuICAgICAgICB0aGlzLmFkZCh0YXJnZXQsIFwiYWxwaGFcIiwgdGFyZ2V0LmFscGhhLCB2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5fcHJvcHMucHVzaChcImFscGhhXCIsIFwidmlzaWJsZVwiKTtcbiAgICAgIH0gZWxzZSBpZiAocCAhPT0gXCJyZXNvbHV0aW9uXCIpIHtcbiAgICAgICAgdGhpcy5hZGQodGFyZ2V0LCBwLCBcImdldFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3Byb3BzLnB1c2gocCk7XG4gICAgfVxuICB9XG59O1xuX2dldEdTQVAoKSAmJiBnc2FwLnJlZ2lzdGVyUGx1Z2luKFBpeGlQbHVnaW4pO1xuZXhwb3J0IHsgUGl4aVBsdWdpbiBhcyBkZWZhdWx0IH07IiwiLyohXG4gKiBTY3JvbGxUb1BsdWdpbiAzLjUuMVxuICogaHR0cHM6Ly9ncmVlbnNvY2suY29tXG4gKlxuICogQGxpY2Vuc2UgQ29weXJpZ2h0IDIwMDgtMjAyMCwgR3JlZW5Tb2NrLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogU3ViamVjdCB0byB0aGUgdGVybXMgYXQgaHR0cHM6Ly9ncmVlbnNvY2suY29tL3N0YW5kYXJkLWxpY2Vuc2Ugb3IgZm9yXG4gKiBDbHViIEdyZWVuU29jayBtZW1iZXJzLCB0aGUgYWdyZWVtZW50IGlzc3VlZCB3aXRoIHRoYXQgbWVtYmVyc2hpcC5cbiAqIEBhdXRob3I6IEphY2sgRG95bGUsIGphY2tAZ3JlZW5zb2NrLmNvbVxuKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cbnZhciBnc2FwLFxuICAgIF9jb3JlSW5pdHRlZCxcbiAgICBfd2luZG93LFxuICAgIF9kb2NFbCxcbiAgICBfYm9keSxcbiAgICBfdG9BcnJheSxcbiAgICBfY29uZmlnLFxuICAgIF93aW5kb3dFeGlzdHMgPSBmdW5jdGlvbiBfd2luZG93RXhpc3RzKCkge1xuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIjtcbn0sXG4gICAgX2dldEdTQVAgPSBmdW5jdGlvbiBfZ2V0R1NBUCgpIHtcbiAgcmV0dXJuIGdzYXAgfHwgX3dpbmRvd0V4aXN0cygpICYmIChnc2FwID0gd2luZG93LmdzYXApICYmIGdzYXAucmVnaXN0ZXJQbHVnaW4gJiYgZ3NhcDtcbn0sXG4gICAgX2lzU3RyaW5nID0gZnVuY3Rpb24gX2lzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59LFxuICAgIF9tYXggPSBmdW5jdGlvbiBfbWF4KGVsZW1lbnQsIGF4aXMpIHtcbiAgdmFyIGRpbSA9IGF4aXMgPT09IFwieFwiID8gXCJXaWR0aFwiIDogXCJIZWlnaHRcIixcbiAgICAgIHNjcm9sbCA9IFwic2Nyb2xsXCIgKyBkaW0sXG4gICAgICBjbGllbnQgPSBcImNsaWVudFwiICsgZGltO1xuICByZXR1cm4gZWxlbWVudCA9PT0gX3dpbmRvdyB8fCBlbGVtZW50ID09PSBfZG9jRWwgfHwgZWxlbWVudCA9PT0gX2JvZHkgPyBNYXRoLm1heChfZG9jRWxbc2Nyb2xsXSwgX2JvZHlbc2Nyb2xsXSkgLSAoX3dpbmRvd1tcImlubmVyXCIgKyBkaW1dIHx8IF9kb2NFbFtjbGllbnRdIHx8IF9ib2R5W2NsaWVudF0pIDogZWxlbWVudFtzY3JvbGxdIC0gZWxlbWVudFtcIm9mZnNldFwiICsgZGltXTtcbn0sXG4gICAgX2J1aWxkR2V0dGVyID0gZnVuY3Rpb24gX2J1aWxkR2V0dGVyKGUsIGF4aXMpIHtcbiAgLy9wYXNzIGluIGFuIGVsZW1lbnQgYW5kIGFuIGF4aXMgKFwieFwiIG9yIFwieVwiKSBhbmQgaXQnbGwgcmV0dXJuIGEgZ2V0dGVyIGZ1bmN0aW9uIGZvciB0aGUgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoYXQgZWxlbWVudCAobGlrZSBzY3JvbGxUb3Agb3Igc2Nyb2xsTGVmdCwgYWx0aG91Z2ggaWYgdGhlIGVsZW1lbnQgaXMgdGhlIHdpbmRvdywgaXQnbGwgdXNlIHRoZSBwYWdlWE9mZnNldC9wYWdlWU9mZnNldCBvciB0aGUgZG9jdW1lbnRFbGVtZW50J3Mgc2Nyb2xsVG9wL3Njcm9sbExlZnQgb3IgZG9jdW1lbnQuYm9keSdzLiBCYXNpY2FsbHkgdGhpcyBzdHJlYW1saW5lcyB0aGluZ3MgYW5kIG1ha2VzIGEgdmVyeSBmYXN0IGdldHRlciBhY3Jvc3MgYnJvd3NlcnMuXG4gIHZhciBwID0gXCJzY3JvbGxcIiArIChheGlzID09PSBcInhcIiA/IFwiTGVmdFwiIDogXCJUb3BcIik7XG5cbiAgaWYgKGUgPT09IF93aW5kb3cpIHtcbiAgICBpZiAoZS5wYWdlWE9mZnNldCAhPSBudWxsKSB7XG4gICAgICBwID0gXCJwYWdlXCIgKyBheGlzLnRvVXBwZXJDYXNlKCkgKyBcIk9mZnNldFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBlID0gX2RvY0VsW3BdICE9IG51bGwgPyBfZG9jRWwgOiBfYm9keTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBlW3BdO1xuICB9O1xufSxcbiAgICBfZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gX2dldE9mZnNldChlbGVtZW50LCBjb250YWluZXIpIHtcbiAgdmFyIHJlY3QgPSBfdG9BcnJheShlbGVtZW50KVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGlzUm9vdCA9ICFjb250YWluZXIgfHwgY29udGFpbmVyID09PSBfd2luZG93IHx8IGNvbnRhaW5lciA9PT0gX2JvZHksXG4gICAgICBjUmVjdCA9IGlzUm9vdCA/IHtcbiAgICB0b3A6IF9kb2NFbC5jbGllbnRUb3AgLSAoX3dpbmRvdy5wYWdlWU9mZnNldCB8fCBfZG9jRWwuc2Nyb2xsVG9wIHx8IF9ib2R5LnNjcm9sbFRvcCB8fCAwKSxcbiAgICBsZWZ0OiBfZG9jRWwuY2xpZW50TGVmdCAtIChfd2luZG93LnBhZ2VYT2Zmc2V0IHx8IF9kb2NFbC5zY3JvbGxMZWZ0IHx8IF9ib2R5LnNjcm9sbExlZnQgfHwgMClcbiAgfSA6IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgeDogcmVjdC5sZWZ0IC0gY1JlY3QubGVmdCxcbiAgICB5OiByZWN0LnRvcCAtIGNSZWN0LnRvcFxuICB9O1xuXG4gIGlmICghaXNSb290ICYmIGNvbnRhaW5lcikge1xuICAgIC8vb25seSBhZGQgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIGlmIGl0J3Mgbm90IHRoZSB3aW5kb3cvYm9keS5cbiAgICBvZmZzZXRzLnggKz0gX2J1aWxkR2V0dGVyKGNvbnRhaW5lciwgXCJ4XCIpKCk7XG4gICAgb2Zmc2V0cy55ICs9IF9idWlsZEdldHRlcihjb250YWluZXIsIFwieVwiKSgpO1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldHM7XG59LFxuICAgIF9wYXJzZVZhbCA9IGZ1bmN0aW9uIF9wYXJzZVZhbCh2YWx1ZSwgdGFyZ2V0LCBheGlzLCBjdXJyZW50VmFsLCBvZmZzZXQpIHtcbiAgcmV0dXJuICFpc05hTih2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiID8gcGFyc2VGbG9hdCh2YWx1ZSkgLSBvZmZzZXQgOiBfaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLmNoYXJBdCgxKSA9PT0gXCI9XCIgPyBwYXJzZUZsb2F0KHZhbHVlLnN1YnN0cigyKSkgKiAodmFsdWUuY2hhckF0KDApID09PSBcIi1cIiA/IC0xIDogMSkgKyBjdXJyZW50VmFsIC0gb2Zmc2V0IDogdmFsdWUgPT09IFwibWF4XCIgPyBfbWF4KHRhcmdldCwgYXhpcykgLSBvZmZzZXQgOiBNYXRoLm1pbihfbWF4KHRhcmdldCwgYXhpcyksIF9nZXRPZmZzZXQodmFsdWUsIHRhcmdldClbYXhpc10gLSBvZmZzZXQpO1xufSxcbiAgICBfaW5pdENvcmUgPSBmdW5jdGlvbiBfaW5pdENvcmUoKSB7XG4gIGdzYXAgPSBfZ2V0R1NBUCgpO1xuXG4gIGlmIChfd2luZG93RXhpc3RzKCkgJiYgZ3NhcCAmJiBkb2N1bWVudC5ib2R5KSB7XG4gICAgX3dpbmRvdyA9IHdpbmRvdztcbiAgICBfYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgX2RvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIF90b0FycmF5ID0gZ3NhcC51dGlscy50b0FycmF5O1xuICAgIGdzYXAuY29uZmlnKHtcbiAgICAgIGF1dG9LaWxsVGhyZXNob2xkOiA3XG4gICAgfSk7XG4gICAgX2NvbmZpZyA9IGdzYXAuY29uZmlnKCk7XG4gICAgX2NvcmVJbml0dGVkID0gMTtcbiAgfVxufTtcblxuZXhwb3J0IHZhciBTY3JvbGxUb1BsdWdpbiA9IHtcbiAgdmVyc2lvbjogXCIzLjUuMVwiLFxuICBuYW1lOiBcInNjcm9sbFRvXCIsXG4gIHJhd1ZhcnM6IDEsXG4gIHJlZ2lzdGVyOiBmdW5jdGlvbiByZWdpc3Rlcihjb3JlKSB7XG4gICAgZ3NhcCA9IGNvcmU7XG5cbiAgICBfaW5pdENvcmUoKTtcbiAgfSxcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhbHVlLCB0d2VlbiwgaW5kZXgsIHRhcmdldHMpIHtcbiAgICBpZiAoIV9jb3JlSW5pdHRlZCkge1xuICAgICAgX2luaXRDb3JlKCk7XG4gICAgfVxuXG4gICAgdmFyIGRhdGEgPSB0aGlzO1xuICAgIGRhdGEuaXNXaW4gPSB0YXJnZXQgPT09IF93aW5kb3c7XG4gICAgZGF0YS50YXJnZXQgPSB0YXJnZXQ7XG4gICAgZGF0YS50d2VlbiA9IHR3ZWVuO1xuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgdmFsdWUgPSB7XG4gICAgICAgIHk6IHZhbHVlXG4gICAgICB9OyAvL2lmIHdlIGRvbid0IHJlY2VpdmUgYW4gb2JqZWN0IGFzIHRoZSBwYXJhbWV0ZXIsIGFzc3VtZSB0aGUgdXNlciBpbnRlbmRzIFwieVwiLlxuXG4gICAgICBpZiAoX2lzU3RyaW5nKHZhbHVlLnkpICYmIHZhbHVlLnkgIT09IFwibWF4XCIgJiYgdmFsdWUueS5jaGFyQXQoMSkgIT09IFwiPVwiKSB7XG4gICAgICAgIHZhbHVlLnggPSB2YWx1ZS55O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsdWUubm9kZVR5cGUpIHtcbiAgICAgIHZhbHVlID0ge1xuICAgICAgICB5OiB2YWx1ZSxcbiAgICAgICAgeDogdmFsdWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZGF0YS52YXJzID0gdmFsdWU7XG4gICAgZGF0YS5hdXRvS2lsbCA9ICEhdmFsdWUuYXV0b0tpbGw7XG4gICAgZGF0YS5nZXRYID0gX2J1aWxkR2V0dGVyKHRhcmdldCwgXCJ4XCIpO1xuICAgIGRhdGEuZ2V0WSA9IF9idWlsZEdldHRlcih0YXJnZXQsIFwieVwiKTtcbiAgICBkYXRhLnggPSBkYXRhLnhQcmV2ID0gZGF0YS5nZXRYKCk7XG4gICAgZGF0YS55ID0gZGF0YS55UHJldiA9IGRhdGEuZ2V0WSgpO1xuXG4gICAgaWYgKHZhbHVlLnggIT0gbnVsbCkge1xuICAgICAgZGF0YS5hZGQoZGF0YSwgXCJ4XCIsIGRhdGEueCwgX3BhcnNlVmFsKHZhbHVlLngsIHRhcmdldCwgXCJ4XCIsIGRhdGEueCwgdmFsdWUub2Zmc2V0WCB8fCAwKSwgaW5kZXgsIHRhcmdldHMsIE1hdGgucm91bmQpO1xuXG4gICAgICBkYXRhLl9wcm9wcy5wdXNoKFwic2Nyb2xsVG9feFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5za2lwWCA9IDE7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlLnkgIT0gbnVsbCkge1xuICAgICAgZGF0YS5hZGQoZGF0YSwgXCJ5XCIsIGRhdGEueSwgX3BhcnNlVmFsKHZhbHVlLnksIHRhcmdldCwgXCJ5XCIsIGRhdGEueSwgdmFsdWUub2Zmc2V0WSB8fCAwKSwgaW5kZXgsIHRhcmdldHMsIE1hdGgucm91bmQpO1xuXG4gICAgICBkYXRhLl9wcm9wcy5wdXNoKFwic2Nyb2xsVG9feVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5za2lwWSA9IDE7XG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcihyYXRpbywgZGF0YSkge1xuICAgIHZhciBwdCA9IGRhdGEuX3B0LFxuICAgICAgICB0YXJnZXQgPSBkYXRhLnRhcmdldCxcbiAgICAgICAgdHdlZW4gPSBkYXRhLnR3ZWVuLFxuICAgICAgICBhdXRvS2lsbCA9IGRhdGEuYXV0b0tpbGwsXG4gICAgICAgIHhQcmV2ID0gZGF0YS54UHJldixcbiAgICAgICAgeVByZXYgPSBkYXRhLnlQcmV2LFxuICAgICAgICBpc1dpbiA9IGRhdGEuaXNXaW4sXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHlEaWYsXG4gICAgICAgIHhEaWYsXG4gICAgICAgIHRocmVzaG9sZDtcblxuICAgIHdoaWxlIChwdCkge1xuICAgICAgcHQucihyYXRpbywgcHQuZCk7XG4gICAgICBwdCA9IHB0Ll9uZXh0O1xuICAgIH1cblxuICAgIHggPSBpc1dpbiB8fCAhZGF0YS5za2lwWCA/IGRhdGEuZ2V0WCgpIDogeFByZXY7XG4gICAgeSA9IGlzV2luIHx8ICFkYXRhLnNraXBZID8gZGF0YS5nZXRZKCkgOiB5UHJldjtcbiAgICB5RGlmID0geSAtIHlQcmV2O1xuICAgIHhEaWYgPSB4IC0geFByZXY7XG4gICAgdGhyZXNob2xkID0gX2NvbmZpZy5hdXRvS2lsbFRocmVzaG9sZDtcblxuICAgIGlmIChkYXRhLnggPCAwKSB7XG4gICAgICAvL2Nhbid0IHNjcm9sbCB0byBhIHBvc2l0aW9uIGxlc3MgdGhhbiAwISBNaWdodCBoYXBwZW4gaWYgc29tZW9uZSB1c2VzIGEgQmFjay5lYXNlT3V0IG9yIEVsYXN0aWMuZWFzZU91dCB3aGVuIHNjcm9sbGluZyBiYWNrIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UgKGZvciBleGFtcGxlKVxuICAgICAgZGF0YS54ID0gMDtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS55IDwgMCkge1xuICAgICAgZGF0YS55ID0gMDtcbiAgICB9XG5cbiAgICBpZiAoYXV0b0tpbGwpIHtcbiAgICAgIC8vbm90ZTogaU9TIGhhcyBhIGJ1ZyB0aGF0IHRocm93cyBvZmYgdGhlIHNjcm9sbCBieSBzZXZlcmFsIHBpeGVscywgc28gd2UgbmVlZCB0byBjaGVjayBpZiBpdCdzIHdpdGhpbiA3IHBpeGVscyBvZiB0aGUgcHJldmlvdXMgb25lIHRoYXQgd2Ugc2V0IGluc3RlYWQgb2YganVzdCBsb29raW5nIGZvciBhbiBleGFjdCBtYXRjaC5cbiAgICAgIGlmICghZGF0YS5za2lwWCAmJiAoeERpZiA+IHRocmVzaG9sZCB8fCB4RGlmIDwgLXRocmVzaG9sZCkgJiYgeCA8IF9tYXgodGFyZ2V0LCBcInhcIikpIHtcbiAgICAgICAgZGF0YS5za2lwWCA9IDE7IC8vaWYgdGhlIHVzZXIgc2Nyb2xscyBzZXBhcmF0ZWx5LCB3ZSBzaG91bGQgc3RvcCB0d2VlbmluZyFcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYXRhLnNraXBZICYmICh5RGlmID4gdGhyZXNob2xkIHx8IHlEaWYgPCAtdGhyZXNob2xkKSAmJiB5IDwgX21heCh0YXJnZXQsIFwieVwiKSkge1xuICAgICAgICBkYXRhLnNraXBZID0gMTsgLy9pZiB0aGUgdXNlciBzY3JvbGxzIHNlcGFyYXRlbHksIHdlIHNob3VsZCBzdG9wIHR3ZWVuaW5nIVxuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YS5za2lwWCAmJiBkYXRhLnNraXBZKSB7XG4gICAgICAgIHR3ZWVuLmtpbGwoKTtcblxuICAgICAgICBpZiAoZGF0YS52YXJzLm9uQXV0b0tpbGwpIHtcbiAgICAgICAgICBkYXRhLnZhcnMub25BdXRvS2lsbC5hcHBseSh0d2VlbiwgZGF0YS52YXJzLm9uQXV0b0tpbGxQYXJhbXMgfHwgW10pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzV2luKSB7XG4gICAgICBfd2luZG93LnNjcm9sbFRvKCFkYXRhLnNraXBYID8gZGF0YS54IDogeCwgIWRhdGEuc2tpcFkgPyBkYXRhLnkgOiB5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFkYXRhLnNraXBZKSB7XG4gICAgICAgIHRhcmdldC5zY3JvbGxUb3AgPSBkYXRhLnk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZGF0YS5za2lwWCkge1xuICAgICAgICB0YXJnZXQuc2Nyb2xsTGVmdCA9IGRhdGEueDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRhLnhQcmV2ID0gZGF0YS54O1xuICAgIGRhdGEueVByZXYgPSBkYXRhLnk7XG4gIH0sXG4gIGtpbGw6IGZ1bmN0aW9uIGtpbGwocHJvcGVydHkpIHtcbiAgICB2YXIgYm90aCA9IHByb3BlcnR5ID09PSBcInNjcm9sbFRvXCI7XG5cbiAgICBpZiAoYm90aCB8fCBwcm9wZXJ0eSA9PT0gXCJzY3JvbGxUb194XCIpIHtcbiAgICAgIHRoaXMuc2tpcFggPSAxO1xuICAgIH1cblxuICAgIGlmIChib3RoIHx8IHByb3BlcnR5ID09PSBcInNjcm9sbFRvX3lcIikge1xuICAgICAgdGhpcy5za2lwWSA9IDE7XG4gICAgfVxuICB9XG59O1xuU2Nyb2xsVG9QbHVnaW4ubWF4ID0gX21heDtcblNjcm9sbFRvUGx1Z2luLmdldE9mZnNldCA9IF9nZXRPZmZzZXQ7XG5TY3JvbGxUb1BsdWdpbi5idWlsZEdldHRlciA9IF9idWlsZEdldHRlcjtcbl9nZXRHU0FQKCkgJiYgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUb1BsdWdpbik7XG5leHBvcnQgeyBTY3JvbGxUb1BsdWdpbiBhcyBkZWZhdWx0IH07IiwiLyohXG4gKiBTY3JvbGxUcmlnZ2VyIDMuNS4xXG4gKiBodHRwczovL2dyZWVuc29jay5jb21cbiAqXG4gKiBAbGljZW5zZSBDb3B5cmlnaHQgMjAwOC0yMDIwLCBHcmVlblNvY2suIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBTdWJqZWN0IHRvIHRoZSB0ZXJtcyBhdCBodHRwczovL2dyZWVuc29jay5jb20vc3RhbmRhcmQtbGljZW5zZSBvciBmb3JcbiAqIENsdWIgR3JlZW5Tb2NrIG1lbWJlcnMsIHRoZSBhZ3JlZW1lbnQgaXNzdWVkIHdpdGggdGhhdCBtZW1iZXJzaGlwLlxuICogQGF1dGhvcjogSmFjayBEb3lsZSwgamFja0BncmVlbnNvY2suY29tXG4qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xudmFyIGdzYXAsXG4gICAgX2NvcmVJbml0dGVkLFxuICAgIF93aW4sXG4gICAgX2RvYyxcbiAgICBfZG9jRWwsXG4gICAgX2JvZHksXG4gICAgX3Jvb3QsXG4gICAgX3Jlc2l6ZURlbGF5LFxuICAgIF9yYWYsXG4gICAgX3JlcXVlc3QsXG4gICAgX3RvQXJyYXksXG4gICAgX2NsYW1wLFxuICAgIF90aW1lMixcbiAgICBfc3luY0ludGVydmFsLFxuICAgIF9yZWZyZXNoaW5nLFxuICAgIF9wb2ludGVySXNEb3duLFxuICAgIF90cmFuc2Zvcm1Qcm9wLFxuICAgIF9pLFxuICAgIF9wcmV2V2lkdGgsXG4gICAgX3ByZXZIZWlnaHQsXG4gICAgX2F1dG9SZWZyZXNoLFxuICAgIF9zb3J0LFxuICAgIF9saW1pdENhbGxiYWNrcyxcbiAgICAvLyBpZiB0cnVlLCB3ZSdsbCBvbmx5IHRyaWdnZXIgY2FsbGJhY2tzIGlmIHRoZSBhY3RpdmUgc3RhdGUgdG9nZ2xlcywgc28gaWYgeW91IHNjcm9sbCBpbW1lZGlhdGVseSBwYXN0IGJvdGggdGhlIHN0YXJ0IGFuZCBlbmQgcG9zaXRpb25zIG9mIGEgU2Nyb2xsVHJpZ2dlciAodGh1cyBpbmFjdGl2ZSB0byBpbmFjdGl2ZSksIG5laXRoZXIgaXRzIG9uRW50ZXIgbm9yIG9uTGVhdmUgd2lsbCBiZSBjYWxsZWQuIFRoaXMgaXMgdXNlZnVsIGR1cmluZyBzdGFydHVwLlxuX3N0YXJ0dXAgPSAxLFxuICAgIF9wcm94aWVzID0gW10sXG4gICAgX3Njcm9sbGVycyA9IFtdLFxuICAgIF9nZXRUaW1lID0gRGF0ZS5ub3csXG4gICAgX3RpbWUxID0gX2dldFRpbWUoKSxcbiAgICBfbGFzdFNjcm9sbFRpbWUgPSAwLFxuICAgIF9lbmFibGVkID0gMSxcbiAgICBfcGFzc1Rocm91Z2ggPSBmdW5jdGlvbiBfcGFzc1Rocm91Z2godikge1xuICByZXR1cm4gdjtcbn0sXG4gICAgX3dpbmRvd0V4aXN0cyA9IGZ1bmN0aW9uIF93aW5kb3dFeGlzdHMoKSB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xufSxcbiAgICBfZ2V0R1NBUCA9IGZ1bmN0aW9uIF9nZXRHU0FQKCkge1xuICByZXR1cm4gZ3NhcCB8fCBfd2luZG93RXhpc3RzKCkgJiYgKGdzYXAgPSB3aW5kb3cuZ3NhcCkgJiYgZ3NhcC5yZWdpc3RlclBsdWdpbiAmJiBnc2FwO1xufSxcbiAgICBfaXNWaWV3cG9ydCA9IGZ1bmN0aW9uIF9pc1ZpZXdwb3J0KGUpIHtcbiAgcmV0dXJuICEhfl9yb290LmluZGV4T2YoZSk7XG59LFxuICAgIF9nZXRQcm94eVByb3AgPSBmdW5jdGlvbiBfZ2V0UHJveHlQcm9wKGVsZW1lbnQsIHByb3BlcnR5KSB7XG4gIHJldHVybiB+X3Byb3hpZXMuaW5kZXhPZihlbGVtZW50KSAmJiBfcHJveGllc1tfcHJveGllcy5pbmRleE9mKGVsZW1lbnQpICsgMV1bcHJvcGVydHldO1xufSxcbiAgICBfZ2V0U2Nyb2xsRnVuYyA9IGZ1bmN0aW9uIF9nZXRTY3JvbGxGdW5jKGVsZW1lbnQsIF9yZWYpIHtcbiAgdmFyIHMgPSBfcmVmLnMsXG4gICAgICBzYyA9IF9yZWYuc2M7XG5cbiAgdmFyIGkgPSBfc2Nyb2xsZXJzLmluZGV4T2YoZWxlbWVudCksXG4gICAgICBvZmZzZXQgPSBzYyA9PT0gX3ZlcnRpY2FsLnNjID8gMSA6IDI7XG5cbiAgIX5pICYmIChpID0gX3Njcm9sbGVycy5wdXNoKGVsZW1lbnQpIC0gMSk7XG4gIHJldHVybiBfc2Nyb2xsZXJzW2kgKyBvZmZzZXRdIHx8IChfc2Nyb2xsZXJzW2kgKyBvZmZzZXRdID0gX2dldFByb3h5UHJvcChlbGVtZW50LCBzKSB8fCAoX2lzVmlld3BvcnQoZWxlbWVudCkgPyBzYyA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gZWxlbWVudFtzXSA9IHZhbHVlIDogZWxlbWVudFtzXTtcbiAgfSkpO1xufSxcbiAgICBfZ2V0Qm91bmRzRnVuYyA9IGZ1bmN0aW9uIF9nZXRCb3VuZHNGdW5jKGVsZW1lbnQpIHtcbiAgcmV0dXJuIF9nZXRQcm94eVByb3AoZWxlbWVudCwgXCJnZXRCb3VuZGluZ0NsaWVudFJlY3RcIikgfHwgKF9pc1ZpZXdwb3J0KGVsZW1lbnQpID8gZnVuY3Rpb24gKCkge1xuICAgIF93aW5PZmZzZXRzLndpZHRoID0gX3dpbi5pbm5lcldpZHRoO1xuICAgIF93aW5PZmZzZXRzLmhlaWdodCA9IF93aW4uaW5uZXJIZWlnaHQ7XG4gICAgcmV0dXJuIF93aW5PZmZzZXRzO1xuICB9IDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfZ2V0Qm91bmRzKGVsZW1lbnQpO1xuICB9KTtcbn0sXG4gICAgX2dldFNpemVGdW5jID0gZnVuY3Rpb24gX2dldFNpemVGdW5jKHNjcm9sbGVyLCBpc1ZpZXdwb3J0LCBfcmVmMikge1xuICB2YXIgZCA9IF9yZWYyLmQsXG4gICAgICBkMiA9IF9yZWYyLmQyLFxuICAgICAgYSA9IF9yZWYyLmE7XG4gIHJldHVybiAoYSA9IF9nZXRQcm94eVByb3Aoc2Nyb2xsZXIsIFwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0XCIpKSA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYSgpW2RdO1xuICB9IDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoaXNWaWV3cG9ydCA/IF93aW5bXCJpbm5lclwiICsgZDJdIDogc2Nyb2xsZXJbXCJjbGllbnRcIiArIGQyXSkgfHwgMDtcbiAgfTtcbn0sXG4gICAgX2dldE9mZnNldHNGdW5jID0gZnVuY3Rpb24gX2dldE9mZnNldHNGdW5jKGVsZW1lbnQsIGlzVmlld3BvcnQpIHtcbiAgcmV0dXJuICFpc1ZpZXdwb3J0IHx8IH5fcHJveGllcy5pbmRleE9mKGVsZW1lbnQpID8gX2dldEJvdW5kc0Z1bmMoZWxlbWVudCkgOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF93aW5PZmZzZXRzO1xuICB9O1xufSxcbiAgICBfbWF4U2Nyb2xsID0gZnVuY3Rpb24gX21heFNjcm9sbChlbGVtZW50LCBfcmVmMykge1xuICB2YXIgcyA9IF9yZWYzLnMsXG4gICAgICBkMiA9IF9yZWYzLmQyLFxuICAgICAgZCA9IF9yZWYzLmQsXG4gICAgICBhID0gX3JlZjMuYTtcbiAgcmV0dXJuIChzID0gXCJzY3JvbGxcIiArIGQyKSAmJiAoYSA9IF9nZXRQcm94eVByb3AoZWxlbWVudCwgcykpID8gYSgpIC0gX2dldEJvdW5kc0Z1bmMoZWxlbWVudCkoKVtkXSA6IF9pc1ZpZXdwb3J0KGVsZW1lbnQpID8gTWF0aC5tYXgoX2RvY0VsW3NdLCBfYm9keVtzXSkgLSAoX3dpbltcImlubmVyXCIgKyBkMl0gfHwgX2RvY0VsW1wiY2xpZW50XCIgKyBkMl0gfHwgX2JvZHlbXCJjbGllbnRcIiArIGQyXSkgOiBlbGVtZW50W3NdIC0gZWxlbWVudFtcIm9mZnNldFwiICsgZDJdO1xufSxcbiAgICBfaXRlcmF0ZUF1dG9SZWZyZXNoID0gZnVuY3Rpb24gX2l0ZXJhdGVBdXRvUmVmcmVzaChmdW5jLCBldmVudHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfYXV0b1JlZnJlc2gubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAoIWV2ZW50cyB8fCB+ZXZlbnRzLmluZGV4T2YoX2F1dG9SZWZyZXNoW2kgKyAxXSkpICYmIGZ1bmMoX2F1dG9SZWZyZXNoW2ldLCBfYXV0b1JlZnJlc2hbaSArIDFdLCBfYXV0b1JlZnJlc2hbaSArIDJdKTtcbiAgfVxufSxcbiAgICBfaXNTdHJpbmcgPSBmdW5jdGlvbiBfaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn0sXG4gICAgX2lzRnVuY3Rpb24gPSBmdW5jdGlvbiBfaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG59LFxuICAgIF9pc051bWJlciA9IGZ1bmN0aW9uIF9pc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufSxcbiAgICBfaXNPYmplY3QgPSBmdW5jdGlvbiBfaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn0sXG4gICAgX2NhbGxJZkZ1bmMgPSBmdW5jdGlvbiBfY2FsbElmRnVuYyh2YWx1ZSkge1xuICByZXR1cm4gX2lzRnVuY3Rpb24odmFsdWUpICYmIHZhbHVlKCk7XG59LFxuICAgIF9jb21iaW5lRnVuYyA9IGZ1bmN0aW9uIF9jb21iaW5lRnVuYyhmMSwgZjIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0MSA9IF9jYWxsSWZGdW5jKGYxKSxcbiAgICAgICAgcmVzdWx0MiA9IF9jYWxsSWZGdW5jKGYyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBfY2FsbElmRnVuYyhyZXN1bHQxKTtcblxuICAgICAgX2NhbGxJZkZ1bmMocmVzdWx0Mik7XG4gICAgfTtcbiAgfTtcbn0sXG4gICAgX2FicyA9IE1hdGguYWJzLFxuICAgIF9zY3JvbGxMZWZ0ID0gXCJzY3JvbGxMZWZ0XCIsXG4gICAgX3Njcm9sbFRvcCA9IFwic2Nyb2xsVG9wXCIsXG4gICAgX2xlZnQgPSBcImxlZnRcIixcbiAgICBfdG9wID0gXCJ0b3BcIixcbiAgICBfcmlnaHQgPSBcInJpZ2h0XCIsXG4gICAgX2JvdHRvbSA9IFwiYm90dG9tXCIsXG4gICAgX3dpZHRoID0gXCJ3aWR0aFwiLFxuICAgIF9oZWlnaHQgPSBcImhlaWdodFwiLFxuICAgIF9SaWdodCA9IFwiUmlnaHRcIixcbiAgICBfTGVmdCA9IFwiTGVmdFwiLFxuICAgIF9Ub3AgPSBcIlRvcFwiLFxuICAgIF9Cb3R0b20gPSBcIkJvdHRvbVwiLFxuICAgIF9wYWRkaW5nID0gXCJwYWRkaW5nXCIsXG4gICAgX21hcmdpbiA9IFwibWFyZ2luXCIsXG4gICAgX1dpZHRoID0gXCJXaWR0aFwiLFxuICAgIF9IZWlnaHQgPSBcIkhlaWdodFwiLFxuICAgIF9weCA9IFwicHhcIixcbiAgICBfaG9yaXpvbnRhbCA9IHtcbiAgczogX3Njcm9sbExlZnQsXG4gIHA6IF9sZWZ0LFxuICBwMjogX0xlZnQsXG4gIG9zOiBfcmlnaHQsXG4gIG9zMjogX1JpZ2h0LFxuICBkOiBfd2lkdGgsXG4gIGQyOiBfV2lkdGgsXG4gIGE6IFwieFwiLFxuICBzYzogZnVuY3Rpb24gc2ModmFsdWUpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IF93aW4uc2Nyb2xsVG8odmFsdWUsIF92ZXJ0aWNhbC5zYygpKSA6IF93aW4ucGFnZVhPZmZzZXQgfHwgX2RvY1tfc2Nyb2xsTGVmdF0gfHwgX2RvY0VsW19zY3JvbGxMZWZ0XSB8fCBfYm9keVtfc2Nyb2xsTGVmdF0gfHwgMDtcbiAgfVxufSxcbiAgICBfdmVydGljYWwgPSB7XG4gIHM6IF9zY3JvbGxUb3AsXG4gIHA6IF90b3AsXG4gIHAyOiBfVG9wLFxuICBvczogX2JvdHRvbSxcbiAgb3MyOiBfQm90dG9tLFxuICBkOiBfaGVpZ2h0LFxuICBkMjogX0hlaWdodCxcbiAgYTogXCJ5XCIsXG4gIG9wOiBfaG9yaXpvbnRhbCxcbiAgc2M6IGZ1bmN0aW9uIHNjKHZhbHVlKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyBfd2luLnNjcm9sbFRvKF9ob3Jpem9udGFsLnNjKCksIHZhbHVlKSA6IF93aW4ucGFnZVlPZmZzZXQgfHwgX2RvY1tfc2Nyb2xsVG9wXSB8fCBfZG9jRWxbX3Njcm9sbFRvcF0gfHwgX2JvZHlbX3Njcm9sbFRvcF0gfHwgMDtcbiAgfVxufSxcbiAgICBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGZ1bmN0aW9uIF9nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIF93aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbn0sXG4gICAgX21ha2VQb3NpdGlvbmFibGUgPSBmdW5jdGlvbiBfbWFrZVBvc2l0aW9uYWJsZShlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gX2dldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIiA/IFwiYWJzb2x1dGVcIiA6IFwicmVsYXRpdmVcIjtcbn0sXG4gICAgLy8gaWYgdGhlIGVsZW1lbnQgYWxyZWFkeSBoYXMgcG9zaXRpb246IGFic29sdXRlLCBsZWF2ZSB0aGF0LCBvdGhlcndpc2UgbWFrZSBpdCBwb3NpdGlvbjogcmVsYXRpdmVcbl9zZXREZWZhdWx0cyA9IGZ1bmN0aW9uIF9zZXREZWZhdWx0cyhvYmosIGRlZmF1bHRzKSB7XG4gIGZvciAodmFyIHAgaW4gZGVmYXVsdHMpIHtcbiAgICBwIGluIG9iaiB8fCAob2JqW3BdID0gZGVmYXVsdHNbcF0pO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0sXG4gICAgLy9faXNJblZpZXdwb3J0ID0gZWxlbWVudCA9PiAoZWxlbWVudCA9IF9nZXRCb3VuZHMoZWxlbWVudCkpICYmICEoZWxlbWVudC50b3AgPiAoX3dpbi5pbm5lckhlaWdodCB8fCBfZG9jRWwuY2xpZW50SGVpZ2h0KSB8fCBlbGVtZW50LmJvdHRvbSA8IDAgfHwgZWxlbWVudC5sZWZ0ID4gKF93aW4uaW5uZXJXaWR0aCB8fCBfZG9jRWwuY2xpZW50V2lkdGgpIHx8IGVsZW1lbnQucmlnaHQgPCAwKSAmJiBlbGVtZW50LFxuX2dldEJvdW5kcyA9IGZ1bmN0aW9uIF9nZXRCb3VuZHMoZWxlbWVudCwgd2l0aG91dFRyYW5zZm9ybXMpIHtcbiAgdmFyIHR3ZWVuID0gd2l0aG91dFRyYW5zZm9ybXMgJiYgX2dldENvbXB1dGVkU3R5bGUoZWxlbWVudClbX3RyYW5zZm9ybVByb3BdICE9PSBcIm1hdHJpeCgxLCAwLCAwLCAxLCAwLCAwKVwiICYmIGdzYXAudG8oZWxlbWVudCwge1xuICAgIHg6IDAsXG4gICAgeTogMCxcbiAgICB4UGVyY2VudDogMCxcbiAgICB5UGVyY2VudDogMCxcbiAgICByb3RhdGlvbjogMCxcbiAgICByb3RhdGlvblg6IDAsXG4gICAgcm90YXRpb25ZOiAwLFxuICAgIHNjYWxlOiAxLFxuICAgIHNrZXdYOiAwLFxuICAgIHNrZXdZOiAwXG4gIH0pLnByb2dyZXNzKDEpLFxuICAgICAgYm91bmRzID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdHdlZW4gJiYgdHdlZW4ucHJvZ3Jlc3MoMCkua2lsbCgpO1xuICByZXR1cm4gYm91bmRzO1xufSxcbiAgICBfZ2V0U2l6ZSA9IGZ1bmN0aW9uIF9nZXRTaXplKGVsZW1lbnQsIF9yZWY0KSB7XG4gIHZhciBkMiA9IF9yZWY0LmQyO1xuICByZXR1cm4gZWxlbWVudFtcIm9mZnNldFwiICsgZDJdIHx8IGVsZW1lbnRbXCJjbGllbnRcIiArIGQyXSB8fCAwO1xufSxcbiAgICBfZ2V0TGFiZWxzID0gZnVuY3Rpb24gX2dldExhYmVscyhhbmltYXRpb24pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciBhID0gW10sXG4gICAgICAgIGxhYmVscyA9IGFuaW1hdGlvbi5sYWJlbHMsXG4gICAgICAgIGR1cmF0aW9uID0gYW5pbWF0aW9uLmR1cmF0aW9uKCksXG4gICAgICAgIHA7XG5cbiAgICBmb3IgKHAgaW4gbGFiZWxzKSB7XG4gICAgICBhLnB1c2gobGFiZWxzW3BdIC8gZHVyYXRpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBnc2FwLnV0aWxzLnNuYXAoYSwgdmFsdWUpO1xuICB9O1xufSxcbiAgICBfbXVsdGlMaXN0ZW5lciA9IGZ1bmN0aW9uIF9tdWx0aUxpc3RlbmVyKGZ1bmMsIGVsZW1lbnQsIHR5cGVzLCBjYWxsYmFjaykge1xuICByZXR1cm4gdHlwZXMuc3BsaXQoXCIsXCIpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICByZXR1cm4gZnVuYyhlbGVtZW50LCB0eXBlLCBjYWxsYmFjayk7XG4gIH0pO1xufSxcbiAgICBfYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBfYWRkTGlzdGVuZXIoZWxlbWVudCwgdHlwZSwgZnVuYykge1xuICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMsIHtcbiAgICBwYXNzaXZlOiB0cnVlXG4gIH0pO1xufSxcbiAgICBfcmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiBfcmVtb3ZlTGlzdGVuZXIoZWxlbWVudCwgdHlwZSwgZnVuYykge1xuICByZXR1cm4gZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMpO1xufSxcbiAgICBfbWFya2VyRGVmYXVsdHMgPSB7XG4gIHN0YXJ0Q29sb3I6IFwiZ3JlZW5cIixcbiAgZW5kQ29sb3I6IFwicmVkXCIsXG4gIGluZGVudDogMCxcbiAgZm9udFNpemU6IFwiMTZweFwiLFxuICBmb250V2VpZ2h0OiBcIm5vcm1hbFwiXG59LFxuICAgIF9kZWZhdWx0cyA9IHtcbiAgdG9nZ2xlQWN0aW9uczogXCJwbGF5XCIsXG4gIGFudGljaXBhdGVQaW46IDBcbn0sXG4gICAgX2tleXdvcmRzID0ge1xuICB0b3A6IDAsXG4gIGxlZnQ6IDAsXG4gIGNlbnRlcjogMC41LFxuICBib3R0b206IDEsXG4gIHJpZ2h0OiAxXG59LFxuICAgIF9vZmZzZXRUb1B4ID0gZnVuY3Rpb24gX29mZnNldFRvUHgodmFsdWUsIHNpemUpIHtcbiAgaWYgKF9pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YXIgZXFJbmRleCA9IHZhbHVlLmluZGV4T2YoXCI9XCIpLFxuICAgICAgICByZWxhdGl2ZSA9IH5lcUluZGV4ID8gKyh2YWx1ZS5jaGFyQXQoZXFJbmRleCAtIDEpICsgMSkgKiBwYXJzZUZsb2F0KHZhbHVlLnN1YnN0cihlcUluZGV4ICsgMSkpIDogMDtcblxuICAgIGlmIChyZWxhdGl2ZSkge1xuICAgICAgdmFsdWUuaW5kZXhPZihcIiVcIikgPiBlcUluZGV4ICYmIChyZWxhdGl2ZSAqPSBzaXplIC8gMTAwKTtcbiAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyKDAsIGVxSW5kZXggLSAxKTtcbiAgICB9XG5cbiAgICB2YWx1ZSA9IHJlbGF0aXZlICsgKHZhbHVlIGluIF9rZXl3b3JkcyA/IF9rZXl3b3Jkc1t2YWx1ZV0gKiBzaXplIDogfnZhbHVlLmluZGV4T2YoXCIlXCIpID8gcGFyc2VGbG9hdCh2YWx1ZSkgKiBzaXplIC8gMTAwIDogcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMCk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59LFxuICAgIF9jcmVhdGVNYXJrZXIgPSBmdW5jdGlvbiBfY3JlYXRlTWFya2VyKHR5cGUsIG5hbWUsIGNvbnRhaW5lciwgZGlyZWN0aW9uLCBfcmVmNSwgb2Zmc2V0LCBtYXRjaFdpZHRoRWwpIHtcbiAgdmFyIHN0YXJ0Q29sb3IgPSBfcmVmNS5zdGFydENvbG9yLFxuICAgICAgZW5kQ29sb3IgPSBfcmVmNS5lbmRDb2xvcixcbiAgICAgIGZvbnRTaXplID0gX3JlZjUuZm9udFNpemUsXG4gICAgICBpbmRlbnQgPSBfcmVmNS5pbmRlbnQsXG4gICAgICBmb250V2VpZ2h0ID0gX3JlZjUuZm9udFdlaWdodDtcblxuICB2YXIgZSA9IF9kb2MuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcbiAgICAgIHVzZUZpeGVkUG9zaXRpb24gPSBfaXNWaWV3cG9ydChjb250YWluZXIpIHx8IF9nZXRQcm94eVByb3AoY29udGFpbmVyLCBcInBpblR5cGVcIikgPT09IFwiZml4ZWRcIixcbiAgICAgIGlzU2Nyb2xsZXIgPSB0eXBlLmluZGV4T2YoXCJzY3JvbGxlclwiKSAhPT0gLTEsXG4gICAgICBwYXJlbnQgPSB1c2VGaXhlZFBvc2l0aW9uID8gX2JvZHkgOiBjb250YWluZXIsXG4gICAgICBpc1N0YXJ0ID0gdHlwZS5pbmRleE9mKFwic3RhcnRcIikgIT09IC0xLFxuICAgICAgY29sb3IgPSBpc1N0YXJ0ID8gc3RhcnRDb2xvciA6IGVuZENvbG9yLFxuICAgICAgY3NzID0gXCJib3JkZXItY29sb3I6XCIgKyBjb2xvciArIFwiO2ZvbnQtc2l6ZTpcIiArIGZvbnRTaXplICsgXCI7Y29sb3I6XCIgKyBjb2xvciArIFwiO2ZvbnQtd2VpZ2h0OlwiICsgZm9udFdlaWdodCArIFwiO3BvaW50ZXItZXZlbnRzOm5vbmU7d2hpdGUtc3BhY2U6bm93cmFwO2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWYsQXJpYWw7ei1pbmRleDoxMDAwO3BhZGRpbmc6NHB4IDhweDtib3JkZXItd2lkdGg6MDtib3JkZXItc3R5bGU6c29saWQ7XCI7XG5cbiAgY3NzICs9IFwicG9zaXRpb246XCIgKyAoaXNTY3JvbGxlciAmJiB1c2VGaXhlZFBvc2l0aW9uID8gXCJmaXhlZDtcIiA6IFwiYWJzb2x1dGU7XCIpO1xuICAoaXNTY3JvbGxlciB8fCAhdXNlRml4ZWRQb3NpdGlvbikgJiYgKGNzcyArPSAoZGlyZWN0aW9uID09PSBfdmVydGljYWwgPyBfcmlnaHQgOiBfYm90dG9tKSArIFwiOlwiICsgKG9mZnNldCArIHBhcnNlRmxvYXQoaW5kZW50KSkgKyBcInB4O1wiKTtcbiAgbWF0Y2hXaWR0aEVsICYmIChjc3MgKz0gXCJib3gtc2l6aW5nOmJvcmRlci1ib3g7dGV4dC1hbGlnbjpsZWZ0O3dpZHRoOlwiICsgbWF0Y2hXaWR0aEVsLm9mZnNldFdpZHRoICsgXCJweDtcIik7XG4gIGUuX2lzU3RhcnQgPSBpc1N0YXJ0O1xuICBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZ3NhcC1tYXJrZXItXCIgKyB0eXBlKTtcbiAgZS5zdHlsZS5jc3NUZXh0ID0gY3NzO1xuICBlLmlubmVyVGV4dCA9IG5hbWUgfHwgbmFtZSA9PT0gMCA/IHR5cGUgKyBcIi1cIiArIG5hbWUgOiB0eXBlO1xuICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGUsIHBhcmVudC5jaGlsZHJlblswXSk7XG4gIGUuX29mZnNldCA9IGVbXCJvZmZzZXRcIiArIGRpcmVjdGlvbi5vcC5kMl07XG5cbiAgX3Bvc2l0aW9uTWFya2VyKGUsIDAsIGRpcmVjdGlvbiwgaXNTdGFydCk7XG5cbiAgcmV0dXJuIGU7XG59LFxuICAgIF9wb3NpdGlvbk1hcmtlciA9IGZ1bmN0aW9uIF9wb3NpdGlvbk1hcmtlcihtYXJrZXIsIHN0YXJ0LCBkaXJlY3Rpb24sIGZsaXBwZWQpIHtcbiAgdmFyIHZhcnMgPSB7XG4gICAgZGlzcGxheTogXCJibG9ja1wiXG4gIH0sXG4gICAgICBzaWRlID0gZGlyZWN0aW9uW2ZsaXBwZWQgPyBcIm9zMlwiIDogXCJwMlwiXSxcbiAgICAgIG9wcG9zaXRlU2lkZSA9IGRpcmVjdGlvbltmbGlwcGVkID8gXCJwMlwiIDogXCJvczJcIl07XG4gIG1hcmtlci5faXNGbGlwcGVkID0gZmxpcHBlZDtcbiAgdmFyc1tkaXJlY3Rpb24uYSArIFwiUGVyY2VudFwiXSA9IGZsaXBwZWQgPyAtMTAwIDogMDtcbiAgdmFyc1tkaXJlY3Rpb24uYV0gPSBmbGlwcGVkID8gMSA6IDA7XG4gIHZhcnNbXCJib3JkZXJcIiArIHNpZGUgKyBfV2lkdGhdID0gMTtcbiAgdmFyc1tcImJvcmRlclwiICsgb3Bwb3NpdGVTaWRlICsgX1dpZHRoXSA9IDA7XG4gIHZhcnNbZGlyZWN0aW9uLnBdID0gc3RhcnQ7XG4gIGdzYXAuc2V0KG1hcmtlciwgdmFycyk7XG59LFxuICAgIF90cmlnZ2VycyA9IFtdLFxuICAgIF9pZHMgPSB7fSxcbiAgICBfc3luYyA9IGZ1bmN0aW9uIF9zeW5jKCkge1xuICByZXR1cm4gX3JlcXVlc3QgfHwgKF9yZXF1ZXN0ID0gX3JhZihfdXBkYXRlQWxsKSk7XG59LFxuICAgIF9vblNjcm9sbCA9IGZ1bmN0aW9uIF9vblNjcm9sbCgpIHtcbiAgaWYgKCFfcmVxdWVzdCkge1xuICAgIF9yZXF1ZXN0ID0gX3JhZihfdXBkYXRlQWxsKTtcbiAgICBfbGFzdFNjcm9sbFRpbWUgfHwgX2Rpc3BhdGNoKFwic2Nyb2xsU3RhcnRcIik7XG4gICAgX2xhc3RTY3JvbGxUaW1lID0gX2dldFRpbWUoKTtcbiAgfVxufSxcbiAgICBfb25SZXNpemUgPSBmdW5jdGlvbiBfb25SZXNpemUoKSB7XG4gIHJldHVybiAhX3JlZnJlc2hpbmcgJiYgX3Jlc2l6ZURlbGF5LnJlc3RhcnQodHJ1ZSk7XG59LFxuICAgIC8vIGlnbm9yZSByZXNpemVzIHRyaWdnZXJlZCBieSByZWZyZXNoKClcbl9saXN0ZW5lcnMgPSB7fSxcbiAgICBfZW1wdHlBcnJheSA9IFtdLFxuICAgIF9tZWRpYSA9IFtdLFxuICAgIF9jcmVhdGluZ01lZGlhLFxuICAgIC8vIHdoZW4gU2Nyb2xsVHJpZ2dlci5tYXRjaE1lZGlhKCkgaXMgY2FsbGVkLCB3ZSByZWNvcmQgdGhlIGN1cnJlbnQgbWVkaWEga2V5IGhlcmUgKGxpa2UgXCIobWluLXdpZHRoOiA4MDBweClcIikgc28gdGhhdCB3ZSBjYW4gYXNzaWduIGl0IHRvIGV2ZXJ5dGhpbmcgdGhhdCdzIGNyZWF0ZWQgZHVyaW5nIHRoYXQgY2FsbC4gVGhlbiB3ZSBjYW4gcmV2ZXJ0IGp1c3QgdGhvc2Ugd2hlbiBuZWNlc3NhcnkuIEluIHRoZSBTY3JvbGxUcmlnZ2VyJ3MgaW5pdCgpIGNhbGwsIHRoZSBfY3JlYXRpbmdNZWRpYSBpcyByZWNvcmRlZCBhcyBhIFwibWVkaWFcIiBwcm9wZXJ0eSBvbiB0aGUgaW5zdGFuY2UuXG5fbGFzdE1lZGlhVGljayxcbiAgICBfb25NZWRpYUNoYW5nZSA9IGZ1bmN0aW9uIF9vbk1lZGlhQ2hhbmdlKGUpIHtcbiAgdmFyIHRpY2sgPSBnc2FwLnRpY2tlci5mcmFtZSxcbiAgICAgIG1hdGNoZXMgPSBbXSxcbiAgICAgIGkgPSAwLFxuICAgICAgaW5kZXg7XG5cbiAgaWYgKF9sYXN0TWVkaWFUaWNrICE9PSB0aWNrIHx8IF9zdGFydHVwKSB7XG4gICAgX3JldmVydEFsbCgpO1xuXG4gICAgZm9yICg7IGkgPCBfbWVkaWEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIGluZGV4ID0gX3dpbi5tYXRjaE1lZGlhKF9tZWRpYVtpXSkubWF0Y2hlcztcblxuICAgICAgaWYgKGluZGV4ICE9PSBfbWVkaWFbaSArIDNdKSB7XG4gICAgICAgIC8vIG5vdGU6IHNvbWUgYnJvd3NlcnMgZmlyZSB0aGUgbWF0Y2hNZWRpYSBldmVudCBtdWx0aXBsZSB0aW1lcywgbGlrZSB3aGVuIGdvaW5nIGZ1bGwgc2NyZWVuLCBzbyB3ZSBzaG91bGRuJ3QgY2FsbCB0aGUgZnVuY3Rpb24gbXVsdGlwbGUgdGltZXMuIENoZWNrIHRvIHNlZSBpZiBpdCdzIGFscmVhZHkgbWF0Y2hlZC5cbiAgICAgICAgX21lZGlhW2kgKyAzXSA9IGluZGV4O1xuICAgICAgICBpbmRleCA/IG1hdGNoZXMucHVzaChpKSA6IF9yZXZlcnRBbGwoMSwgX21lZGlhW2ldKSB8fCBfaXNGdW5jdGlvbihfbWVkaWFbaSArIDJdKSAmJiBfbWVkaWFbaSArIDJdKCk7IC8vIEZpcmVmb3ggZG9lc24ndCB1cGRhdGUgdGhlIFwibWF0Y2hlc1wiIHByb3BlcnR5IG9mIHRoZSBNZWRpYVF1ZXJ5TGlzdCBvYmplY3QgY29ycmVjdGx5IC0gaXQgb25seSBkb2VzIHNvIGFzIGl0IGNhbGxzIGl0cyBjaGFuZ2UgaGFuZGxlciAtIHNvIHdlIG11c3QgcmUtY3JlYXRlIGEgbWVkaWEgcXVlcnkgaGVyZSB0byBlbnN1cmUgaXQncyBhY2N1cmF0ZS5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBfcmV2ZXJ0UmVjb3JkZWQoKTsgLy8gaW4gY2FzZSBraWxsaW5nL3JldmVydGluZyBhbnkgb2YgdGhlIGFuaW1hdGlvbnMgYWN0dWFsbHkgYWRkZWQgaW5saW5lIHN0eWxlcyBiYWNrLlxuXG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaW5kZXggPSBtYXRjaGVzW2ldO1xuICAgICAgX2NyZWF0aW5nTWVkaWEgPSBfbWVkaWFbaW5kZXhdO1xuICAgICAgX21lZGlhW2luZGV4ICsgMl0gPSBfbWVkaWFbaW5kZXggKyAxXShlKTtcbiAgICB9XG5cbiAgICBfY3JlYXRpbmdNZWRpYSA9IDA7XG5cbiAgICBfcmVmcmVzaEFsbCgwLCAxKTtcblxuICAgIF9sYXN0TWVkaWFUaWNrID0gdGljaztcblxuICAgIF9kaXNwYXRjaChcIm1hdGNoTWVkaWFcIik7XG4gIH1cbn0sXG4gICAgX3NvZnRSZWZyZXNoID0gZnVuY3Rpb24gX3NvZnRSZWZyZXNoKCkge1xuICByZXR1cm4gX3JlbW92ZUxpc3RlbmVyKFNjcm9sbFRyaWdnZXIsIFwic2Nyb2xsRW5kXCIsIF9zb2Z0UmVmcmVzaCkgfHwgX3JlZnJlc2hBbGwodHJ1ZSk7XG59LFxuICAgIF9kaXNwYXRjaCA9IGZ1bmN0aW9uIF9kaXNwYXRjaCh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzW3R5cGVdICYmIF9saXN0ZW5lcnNbdHlwZV0ubWFwKGZ1bmN0aW9uIChmKSB7XG4gICAgcmV0dXJuIGYoKTtcbiAgfSkgfHwgX2VtcHR5QXJyYXk7XG59LFxuICAgIF9zYXZlZFN0eWxlcyA9IFtdLFxuICAgIC8vIHdoZW4gU2Nyb2xsVHJpZ2dlci5zYXZlU3R5bGVzKCkgaXMgY2FsbGVkLCB0aGUgaW5saW5lIHN0eWxlcyBhcmUgcmVjb3JkZWQgaW4gdGhpcyBBcnJheSBpbiBhIHNlcXVlbnRpYWwgZm9ybWF0IGxpa2UgW2VsZW1lbnQsIGNzc1RleHQsIGdzQ2FjaGUsIG1lZGlhXS4gVGhpcyBrZWVwcyBpdCB2ZXJ5IG1lbW9yeS1lZmZpY2llbnQgYW5kIGZhc3QgdG8gaXRlcmF0ZSB0aHJvdWdoLlxuX3JldmVydFJlY29yZGVkID0gZnVuY3Rpb24gX3JldmVydFJlY29yZGVkKG1lZGlhKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX3NhdmVkU3R5bGVzLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgaWYgKCFtZWRpYSB8fCBfc2F2ZWRTdHlsZXNbaSArIDNdID09PSBtZWRpYSkge1xuICAgICAgX3NhdmVkU3R5bGVzW2ldLnN0eWxlLmNzc1RleHQgPSBfc2F2ZWRTdHlsZXNbaSArIDFdO1xuICAgICAgX3NhdmVkU3R5bGVzW2kgKyAyXS51bmNhY2hlID0gMTtcbiAgICB9XG4gIH1cbn0sXG4gICAgX3JldmVydEFsbCA9IGZ1bmN0aW9uIF9yZXZlcnRBbGwoa2lsbCwgbWVkaWEpIHtcbiAgdmFyIHRyaWdnZXI7XG5cbiAgZm9yIChfaSA9IDA7IF9pIDwgX3RyaWdnZXJzLmxlbmd0aDsgX2krKykge1xuICAgIHRyaWdnZXIgPSBfdHJpZ2dlcnNbX2ldO1xuXG4gICAgaWYgKCFtZWRpYSB8fCB0cmlnZ2VyLm1lZGlhID09PSBtZWRpYSkge1xuICAgICAgaWYgKGtpbGwpIHtcbiAgICAgICAgdHJpZ2dlci5raWxsKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJpZ2dlci5zY3JvbGwucmVjIHx8ICh0cmlnZ2VyLnNjcm9sbC5yZWMgPSB0cmlnZ2VyLnNjcm9sbCgpKTsgLy8gcmVjb3JkIHRoZSBzY3JvbGwgcG9zaXRpb25zIHNvIHRoYXQgaW4gZWFjaCByZWZyZXNoKCkgd2UgY2FuIGVuc3VyZSB0aGF0IGl0IGRvZXNuJ3Qgc2hpZnQuIFJlbWVtYmVyLCBwaW5uaW5nIGNhbiBtYWtlIHRoaW5ncyBjaGFuZ2UgYXJvdW5kLCBlc3BlY2lhbGx5IGlmIHRoZSBzYW1lIGVsZW1lbnQgaXMgcGlubmVkIG11bHRpcGxlIHRpbWVzLiBJZiBvbmUgd2FzIGFscmVhZHkgcmVjb3JkZWQsIGRvbid0IHJlLXJlY29yZCBiZWNhdXNlIHVucGlubmluZyBtYXkgaGF2ZSBvY2N1cnJlZCBhbmQgbWFkZSBpdCBzaG9ydGVyLlxuXG4gICAgICAgIHRyaWdnZXIucmV2ZXJ0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3JldmVydFJlY29yZGVkKG1lZGlhKTtcblxuICBtZWRpYSB8fCBfZGlzcGF0Y2goXCJyZXZlcnRcIik7XG59LFxuICAgIF9yZWZyZXNoQWxsID0gZnVuY3Rpb24gX3JlZnJlc2hBbGwoZm9yY2UsIHNraXBSZXZlcnQpIHtcbiAgaWYgKF9sYXN0U2Nyb2xsVGltZSAmJiAhZm9yY2UpIHtcbiAgICBfYWRkTGlzdGVuZXIoU2Nyb2xsVHJpZ2dlciwgXCJzY3JvbGxFbmRcIiwgX3NvZnRSZWZyZXNoKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciByZWZyZXNoSW5pdHMgPSBfZGlzcGF0Y2goXCJyZWZyZXNoSW5pdFwiKTtcblxuICBfc29ydCAmJiBTY3JvbGxUcmlnZ2VyLnNvcnQoKTtcbiAgc2tpcFJldmVydCB8fCBfcmV2ZXJ0QWxsKCk7XG5cbiAgZm9yIChfaSA9IDA7IF9pIDwgX3RyaWdnZXJzLmxlbmd0aDsgX2krKykge1xuICAgIF90cmlnZ2Vyc1tfaV0ucmVmcmVzaCgpO1xuICB9XG5cbiAgcmVmcmVzaEluaXRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHJldHVybiByZXN1bHQgJiYgcmVzdWx0LnJlbmRlciAmJiByZXN1bHQucmVuZGVyKC0xKTtcbiAgfSk7IC8vIGlmIHRoZSBvblJlZnJlc2hJbml0KCkgcmV0dXJucyBhbiBhbmltYXRpb24gKHR5cGljYWxseSBhIGdzYXAuc2V0KCkpLCByZXZlcnQgaXQuIFRoaXMgbWFrZXMgaXQgZWFzeSB0byBwdXQgdGhpbmdzIGluIGEgY2VydGFpbiBzcG90IGJlZm9yZSByZWZyZXNoaW5nIGZvciBtZWFzdXJlbWVudCBwdXJwb3NlcywgYW5kIHRoZW4gcHV0IHRoaW5ncyBiYWNrLlxuXG4gIF9pID0gX3RyaWdnZXJzLmxlbmd0aDtcblxuICB3aGlsZSAoX2ktLSkge1xuICAgIF90cmlnZ2Vyc1tfaV0uc2Nyb2xsLnJlYyA9IDA7XG4gIH1cblxuICBfcmVzaXplRGVsYXkucGF1c2UoKTtcblxuICBfZGlzcGF0Y2goXCJyZWZyZXNoXCIpO1xufSxcbiAgICBfbGFzdFNjcm9sbCA9IDAsXG4gICAgX2RpcmVjdGlvbiA9IDEsXG4gICAgX3VwZGF0ZUFsbCA9IGZ1bmN0aW9uIF91cGRhdGVBbGwoKSB7XG4gIHZhciBsID0gX3RyaWdnZXJzLmxlbmd0aCxcbiAgICAgIHRpbWUgPSBfZ2V0VGltZSgpLFxuICAgICAgcmVjb3JkVmVsb2NpdHkgPSB0aW1lIC0gX3RpbWUxID49IDUwLFxuICAgICAgc2Nyb2xsID0gbCAmJiBfdHJpZ2dlcnNbMF0uc2Nyb2xsKCk7XG5cbiAgX2RpcmVjdGlvbiA9IF9sYXN0U2Nyb2xsID4gc2Nyb2xsID8gLTEgOiAxO1xuICBfbGFzdFNjcm9sbCA9IHNjcm9sbDtcblxuICBpZiAocmVjb3JkVmVsb2NpdHkpIHtcbiAgICBpZiAoX2xhc3RTY3JvbGxUaW1lICYmICFfcG9pbnRlcklzRG93biAmJiB0aW1lIC0gX2xhc3RTY3JvbGxUaW1lID4gMjAwKSB7XG4gICAgICBfbGFzdFNjcm9sbFRpbWUgPSAwO1xuXG4gICAgICBfZGlzcGF0Y2goXCJzY3JvbGxFbmRcIik7XG4gICAgfVxuXG4gICAgX3RpbWUyID0gX3RpbWUxO1xuICAgIF90aW1lMSA9IHRpbWU7XG4gIH1cblxuICBpZiAoX2RpcmVjdGlvbiA8IDApIHtcbiAgICBfaSA9IGw7XG5cbiAgICB3aGlsZSAoX2ktLSkge1xuICAgICAgX3RyaWdnZXJzW19pXSAmJiBfdHJpZ2dlcnNbX2ldLnVwZGF0ZSgwLCByZWNvcmRWZWxvY2l0eSk7XG4gICAgfVxuXG4gICAgX2RpcmVjdGlvbiA9IDE7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChfaSA9IDA7IF9pIDwgbDsgX2krKykge1xuICAgICAgX3RyaWdnZXJzW19pXSAmJiBfdHJpZ2dlcnNbX2ldLnVwZGF0ZSgwLCByZWNvcmRWZWxvY2l0eSk7XG4gICAgfVxuICB9XG5cbiAgX3JlcXVlc3QgPSAwO1xufSxcbiAgICBfcHJvcE5hbWVzVG9Db3B5ID0gW19sZWZ0LCBfdG9wLCBfYm90dG9tLCBfcmlnaHQsIF9tYXJnaW4gKyBfQm90dG9tLCBfbWFyZ2luICsgX1JpZ2h0LCBfbWFyZ2luICsgX1RvcCwgX21hcmdpbiArIF9MZWZ0LCBcImRpc3BsYXlcIiwgXCJmbGV4U2hyaW5rXCIsIFwiZmxvYXRcIl0sXG4gICAgX3N0YXRlUHJvcHMgPSBfcHJvcE5hbWVzVG9Db3B5LmNvbmNhdChbX3dpZHRoLCBfaGVpZ2h0LCBcImJveFNpemluZ1wiLCBcIm1heFwiICsgX1dpZHRoLCBcIm1heFwiICsgX0hlaWdodCwgXCJwb3NpdGlvblwiLCBfbWFyZ2luLCBfcGFkZGluZywgX3BhZGRpbmcgKyBfVG9wLCBfcGFkZGluZyArIF9SaWdodCwgX3BhZGRpbmcgKyBfQm90dG9tLCBfcGFkZGluZyArIF9MZWZ0XSksXG4gICAgX3N3YXBQaW5PdXQgPSBmdW5jdGlvbiBfc3dhcFBpbk91dChwaW4sIHNwYWNlciwgc3RhdGUpIHtcbiAgX3NldFN0YXRlKHN0YXRlKTtcblxuICBpZiAocGluLnBhcmVudE5vZGUgPT09IHNwYWNlcikge1xuICAgIHZhciBwYXJlbnQgPSBzcGFjZXIucGFyZW50Tm9kZTtcblxuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUocGluLCBzcGFjZXIpO1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHNwYWNlcik7XG4gICAgfVxuICB9XG59LFxuICAgIF9zd2FwUGluSW4gPSBmdW5jdGlvbiBfc3dhcFBpbkluKHBpbiwgc3BhY2VyLCBjcywgc3BhY2VyU3RhdGUpIHtcbiAgaWYgKHBpbi5wYXJlbnROb2RlICE9PSBzcGFjZXIpIHtcbiAgICB2YXIgaSA9IF9wcm9wTmFtZXNUb0NvcHkubGVuZ3RoLFxuICAgICAgICBzcGFjZXJTdHlsZSA9IHNwYWNlci5zdHlsZSxcbiAgICAgICAgcGluU3R5bGUgPSBwaW4uc3R5bGUsXG4gICAgICAgIHA7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBwID0gX3Byb3BOYW1lc1RvQ29weVtpXTtcbiAgICAgIHNwYWNlclN0eWxlW3BdID0gY3NbcF07XG4gICAgfVxuXG4gICAgc3BhY2VyU3R5bGUucG9zaXRpb24gPSBjcy5wb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiID8gXCJhYnNvbHV0ZVwiIDogXCJyZWxhdGl2ZVwiO1xuICAgIGNzLmRpc3BsYXkgPT09IFwiaW5saW5lXCIgJiYgKHNwYWNlclN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiKTtcbiAgICBwaW5TdHlsZVtfYm90dG9tXSA9IHBpblN0eWxlW19yaWdodF0gPSBcImF1dG9cIjtcbiAgICBzcGFjZXJTdHlsZS5vdmVyZmxvdyA9IFwidmlzaWJsZVwiO1xuICAgIHNwYWNlclN0eWxlLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuICAgIHNwYWNlclN0eWxlW193aWR0aF0gPSBfZ2V0U2l6ZShwaW4sIF9ob3Jpem9udGFsKSArIF9weDtcbiAgICBzcGFjZXJTdHlsZVtfaGVpZ2h0XSA9IF9nZXRTaXplKHBpbiwgX3ZlcnRpY2FsKSArIF9weDtcbiAgICBzcGFjZXJTdHlsZVtfcGFkZGluZ10gPSBwaW5TdHlsZVtfbWFyZ2luXSA9IHBpblN0eWxlW190b3BdID0gcGluU3R5bGVbX2xlZnRdID0gXCIwXCI7XG5cbiAgICBfc2V0U3RhdGUoc3BhY2VyU3RhdGUpO1xuXG4gICAgcGluU3R5bGVbX3dpZHRoXSA9IHBpblN0eWxlW1wibWF4XCIgKyBfV2lkdGhdID0gY3NbX3dpZHRoXTtcbiAgICBwaW5TdHlsZVtfaGVpZ2h0XSA9IHBpblN0eWxlW1wibWF4XCIgKyBfSGVpZ2h0XSA9IGNzW19oZWlnaHRdO1xuICAgIHBpblN0eWxlW19wYWRkaW5nXSA9IGNzW19wYWRkaW5nXTtcbiAgICBwaW4ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3BhY2VyLCBwaW4pO1xuICAgIHNwYWNlci5hcHBlbmRDaGlsZChwaW4pO1xuICB9XG59LFxuICAgIF9jYXBzRXhwID0gLyhbQS1aXSkvZyxcbiAgICBfc2V0U3RhdGUgPSBmdW5jdGlvbiBfc2V0U3RhdGUoc3RhdGUpIHtcbiAgaWYgKHN0YXRlKSB7XG4gICAgdmFyIHN0eWxlID0gc3RhdGUudC5zdHlsZSxcbiAgICAgICAgbCA9IHN0YXRlLmxlbmd0aCxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIHAsXG4gICAgICAgIHZhbHVlO1xuXG4gICAgZm9yICg7IGkgPCBsOyBpICs9IDIpIHtcbiAgICAgIHZhbHVlID0gc3RhdGVbaSArIDFdO1xuICAgICAgcCA9IHN0YXRlW2ldO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgc3R5bGVbcF0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoc3R5bGVbcF0pIHtcbiAgICAgICAgc3R5bGUucmVtb3ZlUHJvcGVydHkocC5yZXBsYWNlKF9jYXBzRXhwLCBcIi0kMVwiKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0sXG4gICAgX2dldFN0YXRlID0gZnVuY3Rpb24gX2dldFN0YXRlKGVsZW1lbnQpIHtcbiAgLy8gcmV0dXJucyBhbiBhcnJheSB3aXRoIGFsdGVybmF0aW5nIHZhbHVlcyBsaWtlIFtwcm9wZXJ0eSwgdmFsdWUsIHByb3BlcnR5LCB2YWx1ZV0gYW5kIGEgXCJ0XCIgcHJvcGVydHkgcG9pbnRpbmcgdG8gdGhlIHRhcmdldCAoZWxlbWVudCkuIE1ha2VzIGl0IGZhc3QgYW5kIGNoZWFwLlxuICB2YXIgbCA9IF9zdGF0ZVByb3BzLmxlbmd0aCxcbiAgICAgIHN0eWxlID0gZWxlbWVudC5zdHlsZSxcbiAgICAgIHN0YXRlID0gW10sXG4gICAgICBpID0gMDtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIHN0YXRlLnB1c2goX3N0YXRlUHJvcHNbaV0sIHN0eWxlW19zdGF0ZVByb3BzW2ldXSk7XG4gIH1cblxuICBzdGF0ZS50ID0gZWxlbWVudDtcbiAgcmV0dXJuIHN0YXRlO1xufSxcbiAgICBfY29weVN0YXRlID0gZnVuY3Rpb24gX2NvcHlTdGF0ZShzdGF0ZSwgb3ZlcnJpZGUsIG9taXRPZmZzZXRzKSB7XG4gIHZhciByZXN1bHQgPSBbXSxcbiAgICAgIGwgPSBzdGF0ZS5sZW5ndGgsXG4gICAgICBpID0gb21pdE9mZnNldHMgPyA4IDogMCxcbiAgICAgIC8vIHNraXAgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tIGlmIG9taXRPZmZzZXRzIGlzIHRydWVcbiAgcDtcblxuICBmb3IgKDsgaSA8IGw7IGkgKz0gMikge1xuICAgIHAgPSBzdGF0ZVtpXTtcbiAgICByZXN1bHQucHVzaChwLCBwIGluIG92ZXJyaWRlID8gb3ZlcnJpZGVbcF0gOiBzdGF0ZVtpICsgMV0pO1xuICB9XG5cbiAgcmVzdWx0LnQgPSBzdGF0ZS50O1xuICByZXR1cm4gcmVzdWx0O1xufSxcbiAgICBfd2luT2Zmc2V0cyA9IHtcbiAgbGVmdDogMCxcbiAgdG9wOiAwXG59LFxuICAgIF9wYXJzZVBvc2l0aW9uID0gZnVuY3Rpb24gX3BhcnNlUG9zaXRpb24odmFsdWUsIHRyaWdnZXIsIHNjcm9sbGVyU2l6ZSwgZGlyZWN0aW9uLCBzY3JvbGwsIG1hcmtlciwgbWFya2VyU2Nyb2xsZXIsIHNlbGYsIHNjcm9sbGVyQm91bmRzLCBib3JkZXJXaWR0aCwgdXNlRml4ZWRQb3NpdGlvbiwgc2Nyb2xsZXJNYXgpIHtcbiAgX2lzRnVuY3Rpb24odmFsdWUpICYmICh2YWx1ZSA9IHZhbHVlKHNlbGYpKTtcblxuICBpZiAoX2lzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS5zdWJzdHIoMCwgMykgPT09IFwibWF4XCIpIHtcbiAgICB2YWx1ZSA9IHNjcm9sbGVyTWF4ICsgKHZhbHVlLmNoYXJBdCg0KSA9PT0gXCI9XCIgPyBfb2Zmc2V0VG9QeChcIjBcIiArIHZhbHVlLnN1YnN0cigzKSwgc2Nyb2xsZXJTaXplKSA6IDApO1xuICB9XG5cbiAgaWYgKCFfaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgX2lzRnVuY3Rpb24odHJpZ2dlcikgJiYgKHRyaWdnZXIgPSB0cmlnZ2VyKHNlbGYpKTtcblxuICAgIHZhciBlbGVtZW50ID0gX3RvQXJyYXkodHJpZ2dlcilbMF0gfHwgX2JvZHksXG4gICAgICAgIGJvdW5kcyA9IF9nZXRCb3VuZHMoZWxlbWVudCkgfHwge30sXG4gICAgICAgIG9mZnNldHMgPSB2YWx1ZS5zcGxpdChcIiBcIiksXG4gICAgICAgIGxvY2FsT2Zmc2V0LFxuICAgICAgICBnbG9iYWxPZmZzZXQsXG4gICAgICAgIGRpc3BsYXk7XG5cbiAgICBpZiAoKCFib3VuZHMgfHwgIWJvdW5kcy5sZWZ0ICYmICFib3VuZHMudG9wKSAmJiBfZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgLy8gaWYgZGlzcGxheSBpcyBcIm5vbmVcIiwgaXQgd29uJ3QgcmVwb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIHByb3Blcmx5XG4gICAgICBkaXNwbGF5ID0gZWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgYm91bmRzID0gX2dldEJvdW5kcyhlbGVtZW50KTtcbiAgICAgIGRpc3BsYXkgPyBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5IDogZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImRpc3BsYXlcIik7XG4gICAgfVxuXG4gICAgbG9jYWxPZmZzZXQgPSBfb2Zmc2V0VG9QeChvZmZzZXRzWzBdLCBib3VuZHNbZGlyZWN0aW9uLmRdKTtcbiAgICBnbG9iYWxPZmZzZXQgPSBfb2Zmc2V0VG9QeChvZmZzZXRzWzFdIHx8IFwiMFwiLCBzY3JvbGxlclNpemUpO1xuICAgIHZhbHVlID0gYm91bmRzW2RpcmVjdGlvbi5wXSAtIHNjcm9sbGVyQm91bmRzW2RpcmVjdGlvbi5wXSAtIGJvcmRlcldpZHRoICsgbG9jYWxPZmZzZXQgKyBzY3JvbGwgLSBnbG9iYWxPZmZzZXQ7XG4gICAgbWFya2VyU2Nyb2xsZXIgJiYgX3Bvc2l0aW9uTWFya2VyKG1hcmtlclNjcm9sbGVyLCBnbG9iYWxPZmZzZXQsIGRpcmVjdGlvbiwgc2Nyb2xsZXJTaXplIC0gZ2xvYmFsT2Zmc2V0IDwgMjAgfHwgbWFya2VyU2Nyb2xsZXIuX2lzU3RhcnQgJiYgZ2xvYmFsT2Zmc2V0ID4gMjApO1xuICAgIHNjcm9sbGVyU2l6ZSAtPSBzY3JvbGxlclNpemUgLSBnbG9iYWxPZmZzZXQ7IC8vIGFkanVzdCBmb3IgdGhlIG1hcmtlclxuICB9IGVsc2UgaWYgKG1hcmtlclNjcm9sbGVyKSB7XG4gICAgX3Bvc2l0aW9uTWFya2VyKG1hcmtlclNjcm9sbGVyLCBzY3JvbGxlclNpemUsIGRpcmVjdGlvbiwgdHJ1ZSk7XG4gIH1cblxuICBpZiAobWFya2VyKSB7XG4gICAgdmFyIHBvc2l0aW9uID0gdmFsdWUgKyBzY3JvbGxlclNpemUsXG4gICAgICAgIGlzU3RhcnQgPSBtYXJrZXIuX2lzU3RhcnQ7XG4gICAgc2Nyb2xsZXJNYXggPSBcInNjcm9sbFwiICsgZGlyZWN0aW9uLmQyO1xuXG4gICAgX3Bvc2l0aW9uTWFya2VyKG1hcmtlciwgcG9zaXRpb24sIGRpcmVjdGlvbiwgaXNTdGFydCAmJiBwb3NpdGlvbiA+IDIwIHx8ICFpc1N0YXJ0ICYmICh1c2VGaXhlZFBvc2l0aW9uID8gTWF0aC5tYXgoX2JvZHlbc2Nyb2xsZXJNYXhdLCBfZG9jRWxbc2Nyb2xsZXJNYXhdKSA6IG1hcmtlci5wYXJlbnROb2RlW3Njcm9sbGVyTWF4XSkgPD0gcG9zaXRpb24gKyAxKTtcblxuICAgIGlmICh1c2VGaXhlZFBvc2l0aW9uKSB7XG4gICAgICBzY3JvbGxlckJvdW5kcyA9IF9nZXRCb3VuZHMobWFya2VyU2Nyb2xsZXIpO1xuICAgICAgdXNlRml4ZWRQb3NpdGlvbiAmJiAobWFya2VyLnN0eWxlW2RpcmVjdGlvbi5vcC5wXSA9IHNjcm9sbGVyQm91bmRzW2RpcmVjdGlvbi5vcC5wXSAtIGRpcmVjdGlvbi5vcC5tIC0gbWFya2VyLl9vZmZzZXQgKyBfcHgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlKTtcbn0sXG4gICAgX3ByZWZpeEV4cCA9IC8oPzp3ZWJraXR8bW96fGxlbmd0aHxjc3NUZXh0KS9pLFxuICAgIF9yZXBhcmVudCA9IGZ1bmN0aW9uIF9yZXBhcmVudChlbGVtZW50LCBwYXJlbnQsIHRvcCwgbGVmdCkge1xuICBpZiAoZWxlbWVudC5wYXJlbnROb2RlICE9PSBwYXJlbnQpIHtcbiAgICB2YXIgc3R5bGUgPSBlbGVtZW50LnN0eWxlLFxuICAgICAgICBwLFxuICAgICAgICBjcztcblxuICAgIGlmIChwYXJlbnQgPT09IF9ib2R5KSB7XG4gICAgICBlbGVtZW50Ll9zdE9yaWcgPSBzdHlsZS5jc3NUZXh0OyAvLyByZWNvcmQgb3JpZ2luYWwgaW5saW5lIHN0eWxlcyBzbyB3ZSBjYW4gcmV2ZXJ0IHRoZW0gbGF0ZXJcblxuICAgICAgY3MgPSBfZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcblxuICAgICAgZm9yIChwIGluIGNzKSB7XG4gICAgICAgIC8vIG11c3QgY29weSBhbGwgcmVsZXZhbnQgc3R5bGVzIHRvIGVuc3VyZSB0aGF0IG5vdGhpbmcgY2hhbmdlcyB2aXN1YWxseSB3aGVuIHdlIHJlcGFyZW50IHRvIHRoZSA8Ym9keT4uIFNraXAgdGhlIHZlbmRvciBwcmVmaXhlZCBvbmVzLlxuICAgICAgICBpZiAoIStwICYmICFfcHJlZml4RXhwLnRlc3QocCkgJiYgY3NbcF0gJiYgdHlwZW9mIHN0eWxlW3BdID09PSBcInN0cmluZ1wiICYmIHAgIT09IFwiMFwiKSB7XG4gICAgICAgICAgc3R5bGVbcF0gPSBjc1twXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzdHlsZS50b3AgPSB0b3A7XG4gICAgICBzdHlsZS5sZWZ0ID0gbGVmdDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuY3NzVGV4dCA9IGVsZW1lbnQuX3N0T3JpZztcbiAgICB9XG5cbiAgICBnc2FwLmNvcmUuZ2V0Q2FjaGUoZWxlbWVudCkudW5jYWNoZSA9IDE7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICB9XG59LFxuICAgIC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHR3ZWVuIHRoZSBzY3JvbGwgcG9zaXRpb24gaW4gdGhlIGRpcmVjdGlvbiBwcm92aWRlZCwgYW5kIHdoZW4gZG9pbmcgc28gaXQnbGwgYWRkIGEgLnR3ZWVuIHByb3BlcnR5IHRvIHRoZSBGVU5DVElPTiBpdHNlbGYsIGFuZCByZW1vdmUgaXQgd2hlbiB0aGUgdHdlZW4gY29tcGxldGVzIG9yIGdldHMga2lsbGVkLiBUaGlzIGdpdmVzIHVzIGEgd2F5IHRvIGhhdmUgbXVsdGlwbGUgU2Nyb2xsVHJpZ2dlcnMgdXNlIGEgY2VudHJhbCBmdW5jdGlvbiBmb3IgYW55IGdpdmVuIHNjcm9sbGVyIGFuZCBzZWUgaWYgdGhlcmUncyBhIHNjcm9sbCB0d2VlbiBydW5uaW5nICh3aGljaCB3b3VsZCBhZmZlY3QgaWYvaG93IHRoaW5ncyBnZXQgdXBkYXRlZClcbl9nZXRUd2VlbkNyZWF0b3IgPSBmdW5jdGlvbiBfZ2V0VHdlZW5DcmVhdG9yKHNjcm9sbGVyLCBkaXJlY3Rpb24pIHtcbiAgdmFyIGdldFNjcm9sbCA9IF9nZXRTY3JvbGxGdW5jKHNjcm9sbGVyLCBkaXJlY3Rpb24pLFxuICAgICAgcHJvcCA9IFwiX3Njcm9sbFwiICsgZGlyZWN0aW9uLnAyLFxuICAgICAgLy8gYWRkIGEgdHdlZW5hYmxlIHByb3BlcnR5IHRvIHRoZSBzY3JvbGxlciB0aGF0J3MgYSBnZXR0ZXIvc2V0dGVyIGZ1bmN0aW9uLCBsaWtlIF9zY3JvbGxUb3Agb3IgX3Njcm9sbExlZnQuIFRoaXMgd2F5LCBpZiBzb21lb25lIGRvZXMgZ3NhcC5raWxsVHdlZW5zT2Yoc2Nyb2xsZXIpIGl0J2xsIGtpbGwgdGhlIHNjcm9sbCB0d2Vlbi5cbiAgbGFzdFNjcm9sbDEsXG4gICAgICBsYXN0U2Nyb2xsMixcbiAgICAgIGdldFR3ZWVuID0gZnVuY3Rpb24gZ2V0VHdlZW4oc2Nyb2xsVG8sIHZhcnMsIGluaXRpYWxWYWx1ZSwgY2hhbmdlMSwgY2hhbmdlMikge1xuICAgIHZhciB0d2VlbiA9IGdldFR3ZWVuLnR3ZWVuLFxuICAgICAgICBvbkNvbXBsZXRlID0gdmFycy5vbkNvbXBsZXRlLFxuICAgICAgICBtb2RpZmllcnMgPSB7fTtcbiAgICB0d2VlbiAmJiB0d2Vlbi5raWxsKCk7XG4gICAgbGFzdFNjcm9sbDEgPSBNYXRoLnJvdW5kKGluaXRpYWxWYWx1ZSk7XG4gICAgdmFyc1twcm9wXSA9IHNjcm9sbFRvO1xuICAgIHZhcnMubW9kaWZpZXJzID0gbW9kaWZpZXJzO1xuXG4gICAgbW9kaWZpZXJzW3Byb3BdID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IE1hdGgucm91bmQoZ2V0U2Nyb2xsKCkpOyAvLyByb3VuZCBiZWNhdXNlIGluIHNvbWUgW3ZlcnkgdW5jb21tb25dIFdpbmRvd3MgZW52aXJvbm1lbnRzLCBpdCBjYW4gZ2V0IHJlcG9ydGVkIHdpdGggZGVjaW1hbHMgZXZlbiB0aG91Z2ggaXQgd2FzIHNldCB3aXRob3V0LlxuXG4gICAgICBpZiAodmFsdWUgIT09IGxhc3RTY3JvbGwxICYmIHZhbHVlICE9PSBsYXN0U2Nyb2xsMikge1xuICAgICAgICAvLyBpZiB0aGUgdXNlciBzY3JvbGxzLCBraWxsIHRoZSB0d2Vlbi4gaU9TIFNhZmFyaSBpbnRlcm1pdHRlbnRseSBtaXNyZXBvcnRzIHRoZSBzY3JvbGwgcG9zaXRpb24sIGl0IG1heSBiZSB0aGUgbW9zdCByZWNlbnRseS1zZXQgb25lIG9yIHRoZSBvbmUgYmVmb3JlIHRoYXQhXG4gICAgICAgIHR3ZWVuLmtpbGwoKTtcbiAgICAgICAgZ2V0VHdlZW4udHdlZW4gPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBpbml0aWFsVmFsdWUgKyBjaGFuZ2UxICogdHdlZW4ucmF0aW8gKyBjaGFuZ2UyICogdHdlZW4ucmF0aW8gKiB0d2Vlbi5yYXRpbztcbiAgICAgIH1cblxuICAgICAgbGFzdFNjcm9sbDIgPSBsYXN0U2Nyb2xsMTtcbiAgICAgIHJldHVybiBsYXN0U2Nyb2xsMSA9IE1hdGgucm91bmQodmFsdWUpO1xuICAgIH07XG5cbiAgICB2YXJzLm9uQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBnZXRUd2Vlbi50d2VlbiA9IDA7XG4gICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUuY2FsbCh0d2Vlbik7XG4gICAgfTtcblxuICAgIHR3ZWVuID0gZ2V0VHdlZW4udHdlZW4gPSBnc2FwLnRvKHNjcm9sbGVyLCB2YXJzKTtcbiAgICByZXR1cm4gdHdlZW47XG4gIH07XG5cbiAgc2Nyb2xsZXJbcHJvcF0gPSBnZXRTY3JvbGw7XG4gIHJldHVybiBnZXRUd2Vlbjtcbn07XG5cbl9ob3Jpem9udGFsLm9wID0gX3ZlcnRpY2FsO1xuZXhwb3J0IHZhciBTY3JvbGxUcmlnZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2Nyb2xsVHJpZ2dlcih2YXJzLCBhbmltYXRpb24pIHtcbiAgICBfY29yZUluaXR0ZWQgfHwgU2Nyb2xsVHJpZ2dlci5yZWdpc3Rlcihnc2FwKSB8fCBjb25zb2xlLndhcm4oXCJQbGVhc2UgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyKVwiKTtcbiAgICB0aGlzLmluaXQodmFycywgYW5pbWF0aW9uKTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTY3JvbGxUcmlnZ2VyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdCA9IGZ1bmN0aW9uIGluaXQodmFycywgYW5pbWF0aW9uKSB7XG4gICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgdGhpcy52YXJzICYmIHRoaXMua2lsbCgxKTsgLy8gaW4gY2FzZSBpdCdzIGJlaW5nIGluaXR0ZWQgYWdhaW5cblxuICAgIGlmICghX2VuYWJsZWQpIHtcbiAgICAgIHRoaXMudXBkYXRlID0gdGhpcy5yZWZyZXNoID0gdGhpcy5raWxsID0gX3Bhc3NUaHJvdWdoO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhcnMgPSBfc2V0RGVmYXVsdHMoX2lzU3RyaW5nKHZhcnMpIHx8IF9pc051bWJlcih2YXJzKSB8fCB2YXJzLm5vZGVUeXBlID8ge1xuICAgICAgdHJpZ2dlcjogdmFyc1xuICAgIH0gOiB2YXJzLCBfZGVmYXVsdHMpO1xuXG4gICAgdmFyIGRpcmVjdGlvbiA9IHZhcnMuaG9yaXpvbnRhbCA/IF9ob3Jpem9udGFsIDogX3ZlcnRpY2FsLFxuICAgICAgICBfdmFycyA9IHZhcnMsXG4gICAgICAgIG9uVXBkYXRlID0gX3ZhcnMub25VcGRhdGUsXG4gICAgICAgIHRvZ2dsZUNsYXNzID0gX3ZhcnMudG9nZ2xlQ2xhc3MsXG4gICAgICAgIGlkID0gX3ZhcnMuaWQsXG4gICAgICAgIG9uVG9nZ2xlID0gX3ZhcnMub25Ub2dnbGUsXG4gICAgICAgIG9uUmVmcmVzaCA9IF92YXJzLm9uUmVmcmVzaCxcbiAgICAgICAgc2NydWIgPSBfdmFycy5zY3J1YixcbiAgICAgICAgdHJpZ2dlciA9IF92YXJzLnRyaWdnZXIsXG4gICAgICAgIHBpbiA9IF92YXJzLnBpbixcbiAgICAgICAgcGluU3BhY2luZyA9IF92YXJzLnBpblNwYWNpbmcsXG4gICAgICAgIGludmFsaWRhdGVPblJlZnJlc2ggPSBfdmFycy5pbnZhbGlkYXRlT25SZWZyZXNoLFxuICAgICAgICBhbnRpY2lwYXRlUGluID0gX3ZhcnMuYW50aWNpcGF0ZVBpbixcbiAgICAgICAgb25TY3J1YkNvbXBsZXRlID0gX3ZhcnMub25TY3J1YkNvbXBsZXRlLFxuICAgICAgICBvblNuYXBDb21wbGV0ZSA9IF92YXJzLm9uU25hcENvbXBsZXRlLFxuICAgICAgICBvbmNlID0gX3ZhcnMub25jZSxcbiAgICAgICAgc25hcCA9IF92YXJzLnNuYXAsXG4gICAgICAgIHBpblJlcGFyZW50ID0gX3ZhcnMucGluUmVwYXJlbnQsXG4gICAgICAgIGlzVG9nZ2xlID0gIXNjcnViICYmIHNjcnViICE9PSAwLFxuICAgICAgICBzY3JvbGxlciA9IF90b0FycmF5KHZhcnMuc2Nyb2xsZXIgfHwgX3dpbilbMF0sXG4gICAgICAgIHNjcm9sbGVyQ2FjaGUgPSBnc2FwLmNvcmUuZ2V0Q2FjaGUoc2Nyb2xsZXIpLFxuICAgICAgICBpc1ZpZXdwb3J0ID0gX2lzVmlld3BvcnQoc2Nyb2xsZXIpLFxuICAgICAgICB1c2VGaXhlZFBvc2l0aW9uID0gXCJwaW5UeXBlXCIgaW4gdmFycyA/IHZhcnMucGluVHlwZSA9PT0gXCJmaXhlZFwiIDogaXNWaWV3cG9ydCB8fCBfZ2V0UHJveHlQcm9wKHNjcm9sbGVyLCBcInBpblR5cGVcIikgPT09IFwiZml4ZWRcIixcbiAgICAgICAgY2FsbGJhY2tzID0gW3ZhcnMub25FbnRlciwgdmFycy5vbkxlYXZlLCB2YXJzLm9uRW50ZXJCYWNrLCB2YXJzLm9uTGVhdmVCYWNrXSxcbiAgICAgICAgdG9nZ2xlQWN0aW9ucyA9IGlzVG9nZ2xlICYmIHZhcnMudG9nZ2xlQWN0aW9ucy5zcGxpdChcIiBcIiksXG4gICAgICAgIG1hcmtlcnMgPSBcIm1hcmtlcnNcIiBpbiB2YXJzID8gdmFycy5tYXJrZXJzIDogX2RlZmF1bHRzLm1hcmtlcnMsXG4gICAgICAgIGJvcmRlcldpZHRoID0gaXNWaWV3cG9ydCA/IDAgOiBwYXJzZUZsb2F0KF9nZXRDb21wdXRlZFN0eWxlKHNjcm9sbGVyKVtcImJvcmRlclwiICsgZGlyZWN0aW9uLnAyICsgX1dpZHRoXSkgfHwgMCxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIG9uUmVmcmVzaEluaXQgPSB2YXJzLm9uUmVmcmVzaEluaXQgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHZhcnMub25SZWZyZXNoSW5pdChzZWxmKTtcbiAgICB9LFxuICAgICAgICBnZXRTY3JvbGxlclNpemUgPSBfZ2V0U2l6ZUZ1bmMoc2Nyb2xsZXIsIGlzVmlld3BvcnQsIGRpcmVjdGlvbiksXG4gICAgICAgIGdldFNjcm9sbGVyT2Zmc2V0cyA9IF9nZXRPZmZzZXRzRnVuYyhzY3JvbGxlciwgaXNWaWV3cG9ydCksXG4gICAgICAgIHR3ZWVuVG8sXG4gICAgICAgIHBpbkNhY2hlLFxuICAgICAgICBzbmFwRnVuYyxcbiAgICAgICAgaXNSZXZlcnRlZCxcbiAgICAgICAgc2Nyb2xsMSxcbiAgICAgICAgc2Nyb2xsMixcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZCxcbiAgICAgICAgbWFya2VyU3RhcnQsXG4gICAgICAgIG1hcmtlckVuZCxcbiAgICAgICAgbWFya2VyU3RhcnRUcmlnZ2VyLFxuICAgICAgICBtYXJrZXJFbmRUcmlnZ2VyLFxuICAgICAgICBtYXJrZXJWYXJzLFxuICAgICAgICBjaGFuZ2UsXG4gICAgICAgIHBpbk9yaWdpbmFsU3RhdGUsXG4gICAgICAgIHBpbkFjdGl2ZVN0YXRlLFxuICAgICAgICBwaW5TdGF0ZSxcbiAgICAgICAgc3BhY2VyLFxuICAgICAgICBvZmZzZXQsXG4gICAgICAgIHBpbkdldHRlcixcbiAgICAgICAgcGluU2V0dGVyLFxuICAgICAgICBwaW5TdGFydCxcbiAgICAgICAgcGluQ2hhbmdlLFxuICAgICAgICBzcGFjaW5nU3RhcnQsXG4gICAgICAgIHNwYWNlclN0YXRlLFxuICAgICAgICBtYXJrZXJTdGFydFNldHRlcixcbiAgICAgICAgbWFya2VyRW5kU2V0dGVyLFxuICAgICAgICBjcyxcbiAgICAgICAgc25hcDEsXG4gICAgICAgIHNuYXAyLFxuICAgICAgICBzY3J1YlR3ZWVuLFxuICAgICAgICBzY3J1YlNtb290aCxcbiAgICAgICAgc25hcER1ckNsYW1wLFxuICAgICAgICBzbmFwRGVsYXllZENhbGwsXG4gICAgICAgIHByZXZQcm9ncmVzcyxcbiAgICAgICAgcHJldlNjcm9sbCxcbiAgICAgICAgcHJldkFuaW1Qcm9ncmVzcztcblxuICAgIHNlbGYubWVkaWEgPSBfY3JlYXRpbmdNZWRpYTtcbiAgICBhbnRpY2lwYXRlUGluICo9IDQ1O1xuXG4gICAgX3RyaWdnZXJzLnB1c2goc2VsZik7XG5cbiAgICBzZWxmLnNjcm9sbGVyID0gc2Nyb2xsZXI7XG4gICAgc2VsZi5zY3JvbGwgPSBfZ2V0U2Nyb2xsRnVuYyhzY3JvbGxlciwgZGlyZWN0aW9uKTtcbiAgICBzY3JvbGwxID0gc2VsZi5zY3JvbGwoKTtcbiAgICBzZWxmLnZhcnMgPSB2YXJzO1xuICAgIGFuaW1hdGlvbiA9IGFuaW1hdGlvbiB8fCB2YXJzLmFuaW1hdGlvbjtcbiAgICBcInJlZnJlc2hQcmlvcml0eVwiIGluIHZhcnMgJiYgKF9zb3J0ID0gMSk7XG4gICAgc2Nyb2xsZXJDYWNoZS50d2VlblNjcm9sbCA9IHNjcm9sbGVyQ2FjaGUudHdlZW5TY3JvbGwgfHwge1xuICAgICAgdG9wOiBfZ2V0VHdlZW5DcmVhdG9yKHNjcm9sbGVyLCBfdmVydGljYWwpLFxuICAgICAgbGVmdDogX2dldFR3ZWVuQ3JlYXRvcihzY3JvbGxlciwgX2hvcml6b250YWwpXG4gICAgfTtcbiAgICBzZWxmLnR3ZWVuVG8gPSB0d2VlblRvID0gc2Nyb2xsZXJDYWNoZS50d2VlblNjcm9sbFtkaXJlY3Rpb24ucF07XG5cbiAgICBpZiAoYW5pbWF0aW9uKSB7XG4gICAgICBhbmltYXRpb24udmFycy5sYXp5ID0gZmFsc2U7XG4gICAgICBhbmltYXRpb24uX2luaXR0ZWQgfHwgYW5pbWF0aW9uLnZhcnMuaW1tZWRpYXRlUmVuZGVyICE9PSBmYWxzZSAmJiB2YXJzLmltbWVkaWF0ZVJlbmRlciAhPT0gZmFsc2UgJiYgYW5pbWF0aW9uLnJlbmRlcigwLCB0cnVlLCB0cnVlKTtcbiAgICAgIHNlbGYuYW5pbWF0aW9uID0gYW5pbWF0aW9uLnBhdXNlKCk7XG4gICAgICBhbmltYXRpb24uc2Nyb2xsVHJpZ2dlciA9IHNlbGY7XG4gICAgICBzY3J1YlNtb290aCA9IF9pc051bWJlcihzY3J1YikgJiYgc2NydWI7XG4gICAgICBzY3J1YlNtb290aCAmJiAoc2NydWJUd2VlbiA9IGdzYXAudG8oYW5pbWF0aW9uLCB7XG4gICAgICAgIGVhc2U6IFwicG93ZXIzXCIsXG4gICAgICAgIGR1cmF0aW9uOiBzY3J1YlNtb290aCxcbiAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gb25Db21wbGV0ZSgpIHtcbiAgICAgICAgICByZXR1cm4gb25TY3J1YkNvbXBsZXRlICYmIG9uU2NydWJDb21wbGV0ZShzZWxmKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgICAgc25hcDEgPSAwO1xuICAgICAgaWQgfHwgKGlkID0gYW5pbWF0aW9uLnZhcnMuaWQpO1xuICAgIH1cblxuICAgIGlmIChzbmFwKSB7XG4gICAgICBfaXNPYmplY3Qoc25hcCkgfHwgKHNuYXAgPSB7XG4gICAgICAgIHNuYXBUbzogc25hcFxuICAgICAgfSk7XG4gICAgICBnc2FwLnNldChpc1ZpZXdwb3J0ID8gW19ib2R5LCBfZG9jRWxdIDogc2Nyb2xsZXIsIHtcbiAgICAgICAgc2Nyb2xsQmVoYXZpb3I6IFwiYXV0b1wiXG4gICAgICB9KTsgLy8gc21vb3RoIHNjcm9sbGluZyBkb2Vzbid0IHdvcmsgd2l0aCBzbmFwLlxuXG4gICAgICBzbmFwRnVuYyA9IF9pc0Z1bmN0aW9uKHNuYXAuc25hcFRvKSA/IHNuYXAuc25hcFRvIDogc25hcC5zbmFwVG8gPT09IFwibGFiZWxzXCIgPyBfZ2V0TGFiZWxzKGFuaW1hdGlvbikgOiBnc2FwLnV0aWxzLnNuYXAoc25hcC5zbmFwVG8pO1xuICAgICAgc25hcER1ckNsYW1wID0gc25hcC5kdXJhdGlvbiB8fCB7XG4gICAgICAgIG1pbjogMC4xLFxuICAgICAgICBtYXg6IDJcbiAgICAgIH07XG4gICAgICBzbmFwRHVyQ2xhbXAgPSBfaXNPYmplY3Qoc25hcER1ckNsYW1wKSA/IF9jbGFtcChzbmFwRHVyQ2xhbXAubWluLCBzbmFwRHVyQ2xhbXAubWF4KSA6IF9jbGFtcChzbmFwRHVyQ2xhbXAsIHNuYXBEdXJDbGFtcCk7XG4gICAgICBzbmFwRGVsYXllZENhbGwgPSBnc2FwLmRlbGF5ZWRDYWxsKHNuYXAuZGVsYXkgfHwgc2NydWJTbW9vdGggLyAyIHx8IDAuMSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoc2VsZi5nZXRWZWxvY2l0eSgpKSA8IDEwICYmICFfcG9pbnRlcklzRG93bikge1xuICAgICAgICAgIHZhciB0b3RhbFByb2dyZXNzID0gYW5pbWF0aW9uICYmICFpc1RvZ2dsZSA/IGFuaW1hdGlvbi50b3RhbFByb2dyZXNzKCkgOiBzZWxmLnByb2dyZXNzLFxuICAgICAgICAgICAgICB2ZWxvY2l0eSA9ICh0b3RhbFByb2dyZXNzIC0gc25hcDIpIC8gKF9nZXRUaW1lKCkgLSBfdGltZTIpICogMTAwMCB8fCAwLFxuICAgICAgICAgICAgICBjaGFuZ2UxID0gX2Ficyh2ZWxvY2l0eSAvIDIpICogdmVsb2NpdHkgLyAwLjE4NSxcbiAgICAgICAgICAgICAgbmF0dXJhbEVuZCA9IHRvdGFsUHJvZ3Jlc3MgKyBjaGFuZ2UxLFxuICAgICAgICAgICAgICBlbmRWYWx1ZSA9IF9jbGFtcCgwLCAxLCBzbmFwRnVuYyhuYXR1cmFsRW5kLCBzZWxmKSksXG4gICAgICAgICAgICAgIHNjcm9sbCA9IHNlbGYuc2Nyb2xsKCksXG4gICAgICAgICAgICAgIGVuZFNjcm9sbCA9IE1hdGgucm91bmQoc3RhcnQgKyBlbmRWYWx1ZSAqIGNoYW5nZSksXG4gICAgICAgICAgICAgIHR3ZWVuID0gdHdlZW5Uby50d2VlbjtcblxuICAgICAgICAgIGlmIChzY3JvbGwgPD0gZW5kICYmIHNjcm9sbCA+PSBzdGFydCAmJiBlbmRTY3JvbGwgIT09IHNjcm9sbCkge1xuICAgICAgICAgICAgaWYgKHR3ZWVuICYmICF0d2Vlbi5faW5pdHRlZCAmJiB0d2Vlbi5kYXRhIDw9IE1hdGguYWJzKGVuZFNjcm9sbCAtIHNjcm9sbCkpIHtcbiAgICAgICAgICAgICAgLy8gdGhlcmUncyBhbiBvdmVybGFwcGluZyBzbmFwISBTbyB3ZSBtdXN0IGZpZ3VyZSBvdXQgd2hpY2ggb25lIGlzIGNsb3NlciBhbmQgbGV0IHRoYXQgdHdlZW4gbGl2ZS5cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0d2VlblRvKGVuZFNjcm9sbCwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogc25hcER1ckNsYW1wKF9hYnMoTWF0aC5tYXgoX2FicyhuYXR1cmFsRW5kIC0gdG90YWxQcm9ncmVzcyksIF9hYnMoZW5kVmFsdWUgLSB0b3RhbFByb2dyZXNzKSkgKiAwLjE4NSAvIHZlbG9jaXR5IC8gMC4wNSB8fCAwKSksXG4gICAgICAgICAgICAgIGVhc2U6IHNuYXAuZWFzZSB8fCBcInBvd2VyM1wiLFxuICAgICAgICAgICAgICBkYXRhOiBNYXRoLmFicyhlbmRTY3JvbGwgLSBzY3JvbGwpLFxuICAgICAgICAgICAgICAvLyByZWNvcmQgdGhlIGRpc3RhbmNlIHNvIHRoYXQgaWYgYW5vdGhlciBzbmFwIHR3ZWVuIG9jY3VycyAoY29uZmxpY3QpIHdlIGNhbiBwcmlvcml0aXplIHRoZSBjbG9zZXN0IHNuYXAuXG4gICAgICAgICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uIG9uQ29tcGxldGUoKSB7XG4gICAgICAgICAgICAgICAgc25hcDEgPSBzbmFwMiA9IGFuaW1hdGlvbiAmJiAhaXNUb2dnbGUgPyBhbmltYXRpb24udG90YWxQcm9ncmVzcygpIDogc2VsZi5wcm9ncmVzcztcbiAgICAgICAgICAgICAgICBvblNuYXBDb21wbGV0ZSAmJiBvblNuYXBDb21wbGV0ZShzZWxmKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgc2Nyb2xsLCBjaGFuZ2UxICogY2hhbmdlLCBlbmRTY3JvbGwgLSBzY3JvbGwgLSBjaGFuZ2UxICogY2hhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZi5pc0FjdGl2ZSkge1xuICAgICAgICAgIHNuYXBEZWxheWVkQ2FsbC5yZXN0YXJ0KHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KS5wYXVzZSgpO1xuICAgIH1cblxuICAgIGlkICYmIChfaWRzW2lkXSA9IHNlbGYpO1xuICAgIHRyaWdnZXIgPSBzZWxmLnRyaWdnZXIgPSBfdG9BcnJheSh0cmlnZ2VyIHx8IHBpbilbMF07XG4gICAgcGluID0gcGluID09PSB0cnVlID8gdHJpZ2dlciA6IF90b0FycmF5KHBpbilbMF07XG4gICAgX2lzU3RyaW5nKHRvZ2dsZUNsYXNzKSAmJiAodG9nZ2xlQ2xhc3MgPSB7XG4gICAgICB0YXJnZXRzOiB0cmlnZ2VyLFxuICAgICAgY2xhc3NOYW1lOiB0b2dnbGVDbGFzc1xuICAgIH0pO1xuXG4gICAgaWYgKHBpbikge1xuICAgICAgcGluU3BhY2luZyA9PT0gZmFsc2UgfHwgcGluU3BhY2luZyA9PT0gX21hcmdpbiB8fCAocGluU3BhY2luZyA9ICFwaW5TcGFjaW5nICYmIF9nZXRDb21wdXRlZFN0eWxlKHBpbi5wYXJlbnROb2RlKS5kaXNwbGF5ID09PSBcImZsZXhcIiA/IGZhbHNlIDogX3BhZGRpbmcpOyAvLyBpZiB0aGUgcGFyZW50IGlzIGRpc3BsYXk6IGZsZXgsIGRvbid0IGFwcGx5IHBpblNwYWNpbmcgYnkgZGVmYXVsdC5cblxuICAgICAgc2VsZi5waW4gPSBwaW47XG4gICAgICB2YXJzLmZvcmNlM0QgIT09IGZhbHNlICYmIGdzYXAuc2V0KHBpbiwge1xuICAgICAgICBmb3JjZTNEOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHBpbkNhY2hlID0gZ3NhcC5jb3JlLmdldENhY2hlKHBpbik7XG5cbiAgICAgIGlmICghcGluQ2FjaGUuc3BhY2VyKSB7XG4gICAgICAgIC8vIHJlY29yZCB0aGUgc3BhY2VyIGFuZCBwaW5PcmlnaW5hbFN0YXRlIG9uIHRoZSBjYWNoZSBpbiBjYXNlIHNvbWVvbmUgdHJpZXMgcGlubmluZyB0aGUgc2FtZSBlbGVtZW50IHdpdGggTVVMVElQTEUgU2Nyb2xsVHJpZ2dlcnMgLSB3ZSBkb24ndCB3YW50IHRvIGhhdmUgbXVsdGlwbGUgc3BhY2VycyBvciByZWNvcmQgdGhlIFwib3JpZ2luYWxcIiBwaW4gc3RhdGUgYWZ0ZXIgaXQgaGFzIGFscmVhZHkgYmVlbiBhZmZlY3RlZCBieSBhbm90aGVyIFNjcm9sbFRyaWdnZXIuXG4gICAgICAgIHBpbkNhY2hlLnNwYWNlciA9IHNwYWNlciA9IF9kb2MuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc3BhY2VyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicGluLXNwYWNlclwiICsgKGlkID8gXCIgcGluLXNwYWNlci1cIiArIGlkIDogXCJcIikpO1xuICAgICAgICBwaW5DYWNoZS5waW5TdGF0ZSA9IHBpbk9yaWdpbmFsU3RhdGUgPSBfZ2V0U3RhdGUocGluKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBpbk9yaWdpbmFsU3RhdGUgPSBwaW5DYWNoZS5waW5TdGF0ZTtcbiAgICAgIH1cblxuICAgICAgc2VsZi5zcGFjZXIgPSBzcGFjZXIgPSBwaW5DYWNoZS5zcGFjZXI7XG4gICAgICBjcyA9IF9nZXRDb21wdXRlZFN0eWxlKHBpbik7XG4gICAgICBzcGFjaW5nU3RhcnQgPSBjc1twaW5TcGFjaW5nICsgZGlyZWN0aW9uLm9zMl07XG4gICAgICBwaW5HZXR0ZXIgPSBnc2FwLmdldFByb3BlcnR5KHBpbik7XG4gICAgICBwaW5TZXR0ZXIgPSBnc2FwLnF1aWNrU2V0dGVyKHBpbiwgZGlyZWN0aW9uLmEsIF9weCk7IC8vIHBpbi5maXJzdENoaWxkICYmICFfbWF4U2Nyb2xsKHBpbiwgZGlyZWN0aW9uKSAmJiAocGluLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIik7IC8vIHByb3RlY3RzIGZyb20gY29sbGFwc2luZyBtYXJnaW5zLCBidXQgY2FuIGhhdmUgdW5pbnRlbmRlZCBjb25zZXF1ZW5jZXMgYXMgZGVtb25zdHJhdGVkIGhlcmU6IGh0dHBzOi8vY29kZXBlbi5pby9HcmVlblNvY2svcGVuLzFlNDJjN2E3M2JmYTQwOWQyY2YxZTE4NGU3YTQyNDhkIHNvIGl0IHdhcyByZW1vdmVkIGluIGZhdm9yIG9mIGp1c3QgdGVsbGluZyBwZW9wbGUgdG8gc2V0IHVwIHRoZWlyIENTUyB0byBhdm9pZCB0aGUgY29sbGFwc2luZyBtYXJnaW5zIChvdmVyZmxvdzogaGlkZGVuIHwgYXV0byBpcyBqdXN0IG9uZSBvcHRpb24uIEFub3RoZXIgaXMgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHRyYW5zcGFyZW50KS5cblxuICAgICAgX3N3YXBQaW5JbihwaW4sIHNwYWNlciwgY3MpO1xuXG4gICAgICBwaW5TdGF0ZSA9IF9nZXRTdGF0ZShwaW4pO1xuICAgIH1cblxuICAgIGlmIChtYXJrZXJzKSB7XG4gICAgICBtYXJrZXJWYXJzID0gX2lzT2JqZWN0KG1hcmtlcnMpID8gX3NldERlZmF1bHRzKG1hcmtlcnMsIF9tYXJrZXJEZWZhdWx0cykgOiBfbWFya2VyRGVmYXVsdHM7XG4gICAgICBtYXJrZXJTdGFydFRyaWdnZXIgPSBfY3JlYXRlTWFya2VyKFwic2Nyb2xsZXItc3RhcnRcIiwgaWQsIHNjcm9sbGVyLCBkaXJlY3Rpb24sIG1hcmtlclZhcnMsIDApO1xuICAgICAgbWFya2VyRW5kVHJpZ2dlciA9IF9jcmVhdGVNYXJrZXIoXCJzY3JvbGxlci1lbmRcIiwgaWQsIHNjcm9sbGVyLCBkaXJlY3Rpb24sIG1hcmtlclZhcnMsIDAsIG1hcmtlclN0YXJ0VHJpZ2dlcik7XG4gICAgICBvZmZzZXQgPSBtYXJrZXJTdGFydFRyaWdnZXJbXCJvZmZzZXRcIiArIGRpcmVjdGlvbi5vcC5kMl07XG4gICAgICBtYXJrZXJTdGFydCA9IF9jcmVhdGVNYXJrZXIoXCJzdGFydFwiLCBpZCwgc2Nyb2xsZXIsIGRpcmVjdGlvbiwgbWFya2VyVmFycywgb2Zmc2V0KTtcbiAgICAgIG1hcmtlckVuZCA9IF9jcmVhdGVNYXJrZXIoXCJlbmRcIiwgaWQsIHNjcm9sbGVyLCBkaXJlY3Rpb24sIG1hcmtlclZhcnMsIG9mZnNldCk7XG5cbiAgICAgIGlmICghdXNlRml4ZWRQb3NpdGlvbikge1xuICAgICAgICBfbWFrZVBvc2l0aW9uYWJsZShzY3JvbGxlcik7XG5cbiAgICAgICAgZ3NhcC5zZXQoW21hcmtlclN0YXJ0VHJpZ2dlciwgbWFya2VyRW5kVHJpZ2dlcl0sIHtcbiAgICAgICAgICBmb3JjZTNEOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBtYXJrZXJTdGFydFNldHRlciA9IGdzYXAucXVpY2tTZXR0ZXIobWFya2VyU3RhcnRUcmlnZ2VyLCBkaXJlY3Rpb24uYSwgX3B4KTtcbiAgICAgICAgbWFya2VyRW5kU2V0dGVyID0gZ3NhcC5xdWlja1NldHRlcihtYXJrZXJFbmRUcmlnZ2VyLCBkaXJlY3Rpb24uYSwgX3B4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxmLnJldmVydCA9IGZ1bmN0aW9uIChyZXZlcnQpIHtcbiAgICAgIHZhciByID0gcmV2ZXJ0ICE9PSBmYWxzZSB8fCAhc2VsZi5lbmFibGVkLFxuICAgICAgICAgIHByZXZSZWZyZXNoaW5nID0gX3JlZnJlc2hpbmc7XG5cbiAgICAgIGlmIChyICE9PSBpc1JldmVydGVkKSB7XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgcHJldlNjcm9sbCA9IE1hdGgubWF4KHNlbGYuc2Nyb2xsKCksIHNlbGYuc2Nyb2xsLnJlYyB8fCAwKTsgLy8gcmVjb3JkIHRoZSBzY3JvbGwgc28gd2UgY2FuIHJldmVydCBsYXRlciAocmVwb3NpdGlvbmluZy9waW5uaW5nIHRoaW5ncyBjYW4gYWZmZWN0IHNjcm9sbCBwb3NpdGlvbikuIEluIHRoZSBzdGF0aWMgcmVmcmVzaCgpIG1ldGhvZCwgd2UgZmlyc3QgcmVjb3JkIGFsbCB0aGUgc2Nyb2xsIHBvc2l0aW9ucyBhcyBhIHJlZmVyZW5jZS5cblxuICAgICAgICAgIHByZXZQcm9ncmVzcyA9IHNlbGYucHJvZ3Jlc3M7XG4gICAgICAgICAgcHJldkFuaW1Qcm9ncmVzcyA9IGFuaW1hdGlvbiAmJiBhbmltYXRpb24ucHJvZ3Jlc3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hcmtlclN0YXJ0ICYmIFttYXJrZXJTdGFydCwgbWFya2VyRW5kLCBtYXJrZXJTdGFydFRyaWdnZXIsIG1hcmtlckVuZFRyaWdnZXJdLmZvckVhY2goZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICByZXR1cm4gbS5zdHlsZS5kaXNwbGF5ID0gciA/IFwibm9uZVwiIDogXCJibG9ja1wiO1xuICAgICAgICB9KTtcbiAgICAgICAgciAmJiAoX3JlZnJlc2hpbmcgPSAxKTtcbiAgICAgICAgc2VsZi51cGRhdGUocik7IC8vIG1ha2Ugc3VyZSB0aGUgcGluIGlzIGJhY2sgaW4gaXRzIG9yaWdpbmFsIHBvc2l0aW9uIHNvIHRoYXQgYWxsIHRoZSBtZWFzdXJlbWVudHMgYXJlIGNvcnJlY3QuXG5cbiAgICAgICAgX3JlZnJlc2hpbmcgPSBwcmV2UmVmcmVzaGluZztcbiAgICAgICAgcGluICYmIChyID8gX3N3YXBQaW5PdXQocGluLCBzcGFjZXIsIHBpbk9yaWdpbmFsU3RhdGUpIDogKCFwaW5SZXBhcmVudCB8fCAhc2VsZi5pc0FjdGl2ZSkgJiYgX3N3YXBQaW5JbihwaW4sIHNwYWNlciwgX2dldENvbXB1dGVkU3R5bGUocGluKSwgc3BhY2VyU3RhdGUpKTtcbiAgICAgICAgaXNSZXZlcnRlZCA9IHI7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYucmVmcmVzaCA9IGZ1bmN0aW9uIChzb2Z0KSB7XG4gICAgICBpZiAoX3JlZnJlc2hpbmcgfHwgIXNlbGYuZW5hYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwaW4gJiYgc29mdCAmJiBfbGFzdFNjcm9sbFRpbWUpIHtcbiAgICAgICAgX2FkZExpc3RlbmVyKFNjcm9sbFRyaWdnZXIsIFwic2Nyb2xsRW5kXCIsIF9zb2Z0UmVmcmVzaCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBfcmVmcmVzaGluZyA9IDE7XG4gICAgICBzY3J1YlR3ZWVuICYmIHNjcnViVHdlZW4ua2lsbCgpO1xuICAgICAgaW52YWxpZGF0ZU9uUmVmcmVzaCAmJiBhbmltYXRpb24gJiYgYW5pbWF0aW9uLnByb2dyZXNzKDApLmludmFsaWRhdGUoKTtcbiAgICAgIGlzUmV2ZXJ0ZWQgfHwgc2VsZi5yZXZlcnQoKTtcblxuICAgICAgdmFyIHNpemUgPSBnZXRTY3JvbGxlclNpemUoKSxcbiAgICAgICAgICBzY3JvbGxlckJvdW5kcyA9IGdldFNjcm9sbGVyT2Zmc2V0cygpLFxuICAgICAgICAgIG1heCA9IF9tYXhTY3JvbGwoc2Nyb2xsZXIsIGRpcmVjdGlvbiksXG4gICAgICAgICAgb2Zmc2V0ID0gMCxcbiAgICAgICAgICBvdGhlclBpbk9mZnNldCA9IDAsXG4gICAgICAgICAgcGFyc2VkRW5kID0gdmFycy5lbmQsXG4gICAgICAgICAgcGFyc2VkRW5kVHJpZ2dlciA9IHZhcnMuZW5kVHJpZ2dlciB8fCB0cmlnZ2VyLFxuICAgICAgICAgIHBhcnNlZFN0YXJ0ID0gdmFycy5zdGFydCB8fCAodmFycy5zdGFydCA9PT0gMCA/IDAgOiBwaW4gfHwgIXRyaWdnZXIgPyBcIjAgMFwiIDogXCIwIDEwMCVcIiksXG4gICAgICAgICAgdHJpZ2dlckluZGV4ID0gdHJpZ2dlciAmJiBNYXRoLm1heCgwLCBfdHJpZ2dlcnMuaW5kZXhPZihzZWxmKSkgfHwgMCxcbiAgICAgICAgICBpID0gdHJpZ2dlckluZGV4LFxuICAgICAgICAgIGNzLFxuICAgICAgICAgIGJvdW5kcyxcbiAgICAgICAgICBzY3JvbGwsXG4gICAgICAgICAgaXNWZXJ0aWNhbCxcbiAgICAgICAgICBvdmVycmlkZSxcbiAgICAgICAgICBjdXJUcmlnZ2VyLFxuICAgICAgICAgIGN1clBpbixcbiAgICAgICAgICBvcHBvc2l0ZVNjcm9sbDtcblxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAvLyB1c2VyIG1pZ2h0IHRyeSB0byBwaW4gdGhlIHNhbWUgZWxlbWVudCBtb3JlIHRoYW4gb25jZSwgc28gd2UgbXVzdCBmaW5kIGFueSBwcmlvciB0cmlnZ2VycyB3aXRoIHRoZSBzYW1lIHBpbiwgcmV2ZXJ0IHRoZW0sIGFuZCBkZXRlcm1pbmUgaG93IGxvbmcgdGhleSdyZSBwaW5uaW5nIHNvIHRoYXQgd2UgY2FuIG9mZnNldCB0aGluZ3MgYXBwcm9wcmlhdGVseS4gTWFrZSBzdXJlIHdlIHJldmVydCBmcm9tIGxhc3QgdG8gZmlyc3Qgc28gdGhhdCB0aGluZ3MgXCJyZXdpbmRcIiBwcm9wZXJseS5cbiAgICAgICAgY3VyUGluID0gX3RyaWdnZXJzW2ldLnBpbjtcbiAgICAgICAgY3VyUGluICYmIChjdXJQaW4gPT09IHRyaWdnZXIgfHwgY3VyUGluID09PSBwaW4pICYmIF90cmlnZ2Vyc1tpXS5yZXZlcnQoKTtcbiAgICAgIH1cblxuICAgICAgc3RhcnQgPSBfcGFyc2VQb3NpdGlvbihwYXJzZWRTdGFydCwgdHJpZ2dlciwgc2l6ZSwgZGlyZWN0aW9uLCBzZWxmLnNjcm9sbCgpLCBtYXJrZXJTdGFydCwgbWFya2VyU3RhcnRUcmlnZ2VyLCBzZWxmLCBzY3JvbGxlckJvdW5kcywgYm9yZGVyV2lkdGgsIHVzZUZpeGVkUG9zaXRpb24sIG1heCkgfHwgKHBpbiA/IC0wLjAwMSA6IDApO1xuICAgICAgX2lzRnVuY3Rpb24ocGFyc2VkRW5kKSAmJiAocGFyc2VkRW5kID0gcGFyc2VkRW5kKHNlbGYpKTtcblxuICAgICAgaWYgKF9pc1N0cmluZyhwYXJzZWRFbmQpICYmICFwYXJzZWRFbmQuaW5kZXhPZihcIis9XCIpKSB7XG4gICAgICAgIGlmICh+cGFyc2VkRW5kLmluZGV4T2YoXCIgXCIpKSB7XG4gICAgICAgICAgcGFyc2VkRW5kID0gKF9pc1N0cmluZyhwYXJzZWRTdGFydCkgPyBwYXJzZWRTdGFydC5zcGxpdChcIiBcIilbMF0gOiBcIlwiKSArIHBhcnNlZEVuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvZmZzZXQgPSBfb2Zmc2V0VG9QeChwYXJzZWRFbmQuc3Vic3RyKDIpLCBzaXplKTtcbiAgICAgICAgICBwYXJzZWRFbmQgPSBfaXNTdHJpbmcocGFyc2VkU3RhcnQpID8gcGFyc2VkU3RhcnQgOiBzdGFydCArIG9mZnNldDsgLy8gX3BhcnNlUG9zaXRpb24gd29uJ3QgZmFjdG9yIGluIHRoZSBvZmZzZXQgaWYgdGhlIHN0YXJ0IGlzIGEgbnVtYmVyLCBzbyBkbyBpdCBoZXJlLlxuXG4gICAgICAgICAgcGFyc2VkRW5kVHJpZ2dlciA9IHRyaWdnZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZW5kID0gTWF0aC5tYXgoc3RhcnQsIF9wYXJzZVBvc2l0aW9uKHBhcnNlZEVuZCB8fCAocGFyc2VkRW5kVHJpZ2dlciA/IFwiMTAwJSAwXCIgOiBtYXgpLCBwYXJzZWRFbmRUcmlnZ2VyLCBzaXplLCBkaXJlY3Rpb24sIHNlbGYuc2Nyb2xsKCkgKyBvZmZzZXQsIG1hcmtlckVuZCwgbWFya2VyRW5kVHJpZ2dlciwgc2VsZiwgc2Nyb2xsZXJCb3VuZHMsIGJvcmRlcldpZHRoLCB1c2VGaXhlZFBvc2l0aW9uLCBtYXgpKSB8fCAtMC4wMDE7XG4gICAgICBjaGFuZ2UgPSBlbmQgLSBzdGFydCB8fCAoc3RhcnQgLT0gMC4wMSkgJiYgMC4wMDE7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgICAgaSA9IHRyaWdnZXJJbmRleDtcblxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjdXJUcmlnZ2VyID0gX3RyaWdnZXJzW2ldO1xuICAgICAgICBjdXJQaW4gPSBjdXJUcmlnZ2VyLnBpbjtcblxuICAgICAgICBpZiAoY3VyUGluICYmIGN1clRyaWdnZXIuc3RhcnQgLSBjdXJUcmlnZ2VyLl9waW5QdXNoIDwgc3RhcnQpIHtcbiAgICAgICAgICBjcyA9IGN1clRyaWdnZXIuZW5kIC0gY3VyVHJpZ2dlci5zdGFydDtcbiAgICAgICAgICBjdXJQaW4gPT09IHRyaWdnZXIgJiYgKG9mZnNldCArPSBjcyk7XG4gICAgICAgICAgY3VyUGluID09PSBwaW4gJiYgKG90aGVyUGluT2Zmc2V0ICs9IGNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzdGFydCArPSBvZmZzZXQ7XG4gICAgICBlbmQgKz0gb2Zmc2V0O1xuICAgICAgc2VsZi5fcGluUHVzaCA9IG90aGVyUGluT2Zmc2V0O1xuXG4gICAgICBpZiAobWFya2VyU3RhcnQgJiYgb2Zmc2V0KSB7XG4gICAgICAgIC8vIG9mZnNldCB0aGUgbWFya2VycyBpZiBuZWNlc3NhcnlcbiAgICAgICAgY3MgPSB7fTtcbiAgICAgICAgY3NbZGlyZWN0aW9uLmFdID0gXCIrPVwiICsgb2Zmc2V0O1xuICAgICAgICBnc2FwLnNldChbbWFya2VyU3RhcnQsIG1hcmtlckVuZF0sIGNzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBpbikge1xuICAgICAgICBjcyA9IF9nZXRDb21wdXRlZFN0eWxlKHBpbik7XG4gICAgICAgIGlzVmVydGljYWwgPSBkaXJlY3Rpb24gPT09IF92ZXJ0aWNhbDtcbiAgICAgICAgc2Nyb2xsID0gc2VsZi5zY3JvbGwoKTsgLy8gcmVjYWxjdWxhdGUgYmVjYXVzZSB0aGUgdHJpZ2dlcnMgY2FuIGFmZmVjdCB0aGUgc2Nyb2xsXG5cbiAgICAgICAgcGluU3RhcnQgPSBwYXJzZUZsb2F0KHBpbkdldHRlcihkaXJlY3Rpb24uYSkpICsgb3RoZXJQaW5PZmZzZXQ7XG4gICAgICAgICFtYXggJiYgZW5kID4gMSAmJiAoKGlzVmlld3BvcnQgPyBfYm9keSA6IHNjcm9sbGVyKS5zdHlsZVtcIm92ZXJmbG93LVwiICsgZGlyZWN0aW9uLmFdID0gXCJzY3JvbGxcIik7IC8vIG1ha2VzIHN1cmUgdGhlIHNjcm9sbGVyIGhhcyBhIHNjcm9sbGJhciwgb3RoZXJ3aXNlIGlmIHNvbWV0aGluZyBoYXMgd2lkdGg6IDEwMCUsIGZvciBleGFtcGxlLCBpdCB3b3VsZCBiZSB0b28gYmlnIChleGNsdWRlIHRoZSBzY3JvbGxiYXIpLiBTZWUgaHR0cHM6Ly9ncmVlbnNvY2suY29tL2ZvcnVtcy90b3BpYy8yNTE4Mi1zY3JvbGx0cmlnZ2VyLXdpZHRoLW9mLXBhZ2UtaW5jcmVhc2Utd2hlcmUtbWFya2Vycy1hcmUtc2V0LXRvLWZhbHNlL1xuXG4gICAgICAgIF9zd2FwUGluSW4ocGluLCBzcGFjZXIsIGNzKTtcblxuICAgICAgICBwaW5TdGF0ZSA9IF9nZXRTdGF0ZShwaW4pOyAvLyB0cmFuc2Zvcm1zIHdpbGwgaW50ZXJmZXJlIHdpdGggdGhlIHRvcC9sZWZ0L3JpZ2h0L2JvdHRvbSBwbGFjZW1lbnQsIHNvIHJlbW92ZSB0aGVtIHRlbXBvcmFyaWx5LiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBmYWN0b3JzIGluIHRyYW5zZm9ybXMuXG5cbiAgICAgICAgYm91bmRzID0gX2dldEJvdW5kcyhwaW4sIHRydWUpO1xuICAgICAgICBvcHBvc2l0ZVNjcm9sbCA9IHVzZUZpeGVkUG9zaXRpb24gJiYgX2dldFNjcm9sbEZ1bmMoc2Nyb2xsZXIsIGlzVmVydGljYWwgPyBfaG9yaXpvbnRhbCA6IF92ZXJ0aWNhbCkoKTtcblxuICAgICAgICBpZiAocGluU3BhY2luZykge1xuICAgICAgICAgIHNwYWNlclN0YXRlID0gW3BpblNwYWNpbmcgKyBkaXJlY3Rpb24ub3MyLCBjaGFuZ2UgKyBvdGhlclBpbk9mZnNldCArIF9weF07XG4gICAgICAgICAgc3BhY2VyU3RhdGUudCA9IHNwYWNlcjtcbiAgICAgICAgICBpID0gcGluU3BhY2luZyA9PT0gX3BhZGRpbmcgPyBfZ2V0U2l6ZShwaW4sIGRpcmVjdGlvbikgKyBjaGFuZ2UgKyBvdGhlclBpbk9mZnNldCA6IDA7XG4gICAgICAgICAgaSAmJiBzcGFjZXJTdGF0ZS5wdXNoKGRpcmVjdGlvbi5kLCBpICsgX3B4KTsgLy8gZm9yIGJveC1zaXppbmc6IGJvcmRlci1ib3ggKG11c3QgaW5jbHVkZSBwYWRkaW5nKS5cblxuICAgICAgICAgIF9zZXRTdGF0ZShzcGFjZXJTdGF0ZSk7XG5cbiAgICAgICAgICB1c2VGaXhlZFBvc2l0aW9uICYmIHNlbGYuc2Nyb2xsKHByZXZTY3JvbGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVzZUZpeGVkUG9zaXRpb24pIHtcbiAgICAgICAgICBvdmVycmlkZSA9IHtcbiAgICAgICAgICAgIHRvcDogYm91bmRzLnRvcCArIChpc1ZlcnRpY2FsID8gc2Nyb2xsIC0gc3RhcnQgOiBvcHBvc2l0ZVNjcm9sbCkgKyBfcHgsXG4gICAgICAgICAgICBsZWZ0OiBib3VuZHMubGVmdCArIChpc1ZlcnRpY2FsID8gb3Bwb3NpdGVTY3JvbGwgOiBzY3JvbGwgLSBzdGFydCkgKyBfcHgsXG4gICAgICAgICAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIlxuICAgICAgICAgIH07XG4gICAgICAgICAgb3ZlcnJpZGVbX3dpZHRoXSA9IG92ZXJyaWRlW1wibWF4XCIgKyBfV2lkdGhdID0gTWF0aC5jZWlsKGJvdW5kcy53aWR0aCkgKyBfcHg7XG4gICAgICAgICAgb3ZlcnJpZGVbX2hlaWdodF0gPSBvdmVycmlkZVtcIm1heFwiICsgX0hlaWdodF0gPSBNYXRoLmNlaWwoYm91bmRzLmhlaWdodCkgKyBfcHg7XG4gICAgICAgICAgb3ZlcnJpZGVbX21hcmdpbl0gPSBvdmVycmlkZVtfbWFyZ2luICsgX1RvcF0gPSBvdmVycmlkZVtfbWFyZ2luICsgX1JpZ2h0XSA9IG92ZXJyaWRlW19tYXJnaW4gKyBfQm90dG9tXSA9IG92ZXJyaWRlW19tYXJnaW4gKyBfTGVmdF0gPSBcIjBcIjtcbiAgICAgICAgICBvdmVycmlkZVtfcGFkZGluZ10gPSBjc1tfcGFkZGluZ107XG4gICAgICAgICAgb3ZlcnJpZGVbX3BhZGRpbmcgKyBfVG9wXSA9IGNzW19wYWRkaW5nICsgX1RvcF07XG4gICAgICAgICAgb3ZlcnJpZGVbX3BhZGRpbmcgKyBfUmlnaHRdID0gY3NbX3BhZGRpbmcgKyBfUmlnaHRdO1xuICAgICAgICAgIG92ZXJyaWRlW19wYWRkaW5nICsgX0JvdHRvbV0gPSBjc1tfcGFkZGluZyArIF9Cb3R0b21dO1xuICAgICAgICAgIG92ZXJyaWRlW19wYWRkaW5nICsgX0xlZnRdID0gY3NbX3BhZGRpbmcgKyBfTGVmdF07XG4gICAgICAgICAgcGluQWN0aXZlU3RhdGUgPSBfY29weVN0YXRlKHBpbk9yaWdpbmFsU3RhdGUsIG92ZXJyaWRlLCBwaW5SZXBhcmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYW5pbWF0aW9uKSB7XG4gICAgICAgICAgLy8gdGhlIGFuaW1hdGlvbiBtaWdodCBiZSBhZmZlY3RpbmcgdGhlIHRyYW5zZm9ybSwgc28gd2UgbXVzdCBqdW1wIHRvIHRoZSBlbmQsIGNoZWNrIHRoZSB2YWx1ZSwgYW5kIGNvbXBlbnNhdGUgYWNjb3JkaW5nbHkuIE90aGVyd2lzZSwgd2hlbiBpdCBiZWNvbWVzIHVucGlubmVkLCB0aGUgcGluU2V0dGVyKCkgd2lsbCBnZXQgc2V0IHRvIGEgdmFsdWUgdGhhdCBkb2Vzbid0IGluY2x1ZGUgd2hhdGV2ZXIgdGhlIGFuaW1hdGlvbiBkaWQuXG4gICAgICAgICAgYW5pbWF0aW9uLnByb2dyZXNzKDEsIHRydWUpO1xuICAgICAgICAgIHBpbkNoYW5nZSA9IHBpbkdldHRlcihkaXJlY3Rpb24uYSkgLSBwaW5TdGFydCArIGNoYW5nZSArIG90aGVyUGluT2Zmc2V0O1xuICAgICAgICAgIGNoYW5nZSAhPT0gcGluQ2hhbmdlICYmIHBpbkFjdGl2ZVN0YXRlLnNwbGljZShwaW5BY3RpdmVTdGF0ZS5sZW5ndGggLSAyLCAyKTsgLy8gdHJhbnNmb3JtIGlzIHRoZSBsYXN0IHByb3BlcnR5L3ZhbHVlIHNldCBpbiB0aGUgc3RhdGUgQXJyYXkuIFNpbmNlIHRoZSBhbmltYXRpb24gaXMgY29udHJvbGxpbmcgdGhhdCwgd2Ugc2hvdWxkIG9taXQgaXQuXG5cbiAgICAgICAgICBhbmltYXRpb24ucHJvZ3Jlc3MoMCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGluQ2hhbmdlID0gY2hhbmdlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRyaWdnZXIgJiYgc2VsZi5zY3JvbGwoKSkge1xuICAgICAgICAvLyBpdCBtYXkgYmUgSU5TSURFIGEgcGlubmVkIGVsZW1lbnQsIHNvIHdhbGsgdXAgdGhlIHRyZWUgYW5kIGxvb2sgZm9yIGFueSBlbGVtZW50cyB3aXRoIF9waW5PZmZzZXQgdG8gY29tcGVuc2F0ZSBiZWNhdXNlIGFueXRoaW5nIHdpdGggcGluU3BhY2luZyB0aGF0J3MgYWxyZWFkeSBzY3JvbGxlZCB3b3VsZCB0aHJvdyBvZmYgdGhlIG1lYXN1cmVtZW50cyBpbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBib3VuZHMgPSB0cmlnZ2VyLnBhcmVudE5vZGU7XG5cbiAgICAgICAgd2hpbGUgKGJvdW5kcyAmJiBib3VuZHMgIT09IF9ib2R5KSB7XG4gICAgICAgICAgaWYgKGJvdW5kcy5fcGluT2Zmc2V0KSB7XG4gICAgICAgICAgICBzdGFydCAtPSBib3VuZHMuX3Bpbk9mZnNldDtcbiAgICAgICAgICAgIGVuZCAtPSBib3VuZHMuX3Bpbk9mZnNldDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBib3VuZHMgPSBib3VuZHMucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdHJpZ2dlckluZGV4OyBpKyspIHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHdlIHJldmVydCBmcm9tIGZpcnN0IHRvIGxhc3QgdG8gbWFrZSBzdXJlIHRoaW5ncyByZWFjaCB0aGVpciBlbmQgc3RhdGUgcHJvcGVybHlcbiAgICAgICAgY3VyVHJpZ2dlciA9IF90cmlnZ2Vyc1tpXS5waW47XG4gICAgICAgIGN1clRyaWdnZXIgJiYgKGN1clRyaWdnZXIgPT09IHRyaWdnZXIgfHwgY3VyVHJpZ2dlciA9PT0gcGluKSAmJiBfdHJpZ2dlcnNbaV0ucmV2ZXJ0KGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgc2VsZi5zdGFydCA9IHN0YXJ0O1xuICAgICAgc2VsZi5lbmQgPSBlbmQ7XG4gICAgICBzY3JvbGwxID0gc2Nyb2xsMiA9IHNlbGYuc2Nyb2xsKCk7IC8vIHJlc2V0IHZlbG9jaXR5XG5cbiAgICAgIHNjcm9sbDEgPCBwcmV2U2Nyb2xsICYmIHNlbGYuc2Nyb2xsKHByZXZTY3JvbGwpO1xuICAgICAgc2VsZi5yZXZlcnQoZmFsc2UpO1xuICAgICAgX3JlZnJlc2hpbmcgPSAwO1xuICAgICAgcHJldkFuaW1Qcm9ncmVzcyAmJiBpc1RvZ2dsZSAmJiBhbmltYXRpb24ucHJvZ3Jlc3MocHJldkFuaW1Qcm9ncmVzcywgdHJ1ZSk7XG5cbiAgICAgIGlmIChwcmV2UHJvZ3Jlc3MgIT09IHNlbGYucHJvZ3Jlc3MpIHtcbiAgICAgICAgLy8gZW5zdXJlcyB0aGF0IHRoZSBkaXJlY3Rpb24gaXMgc2V0IHByb3Blcmx5ICh3aGVuIHJlZnJlc2hpbmcsIHByb2dyZXNzIGlzIHNldCBiYWNrIHRvIDAgaW5pdGlhbGx5LCB0aGVuIGJhY2sgYWdhaW4gdG8gd2hlcmV2ZXIgaXQgbmVlZHMgdG8gYmUpIGFuZCB0aGF0IGNhbGxiYWNrcyBhcmUgdHJpZ2dlcmVkLlxuICAgICAgICBzY3J1YlR3ZWVuICYmIGFuaW1hdGlvbi50b3RhbFByb2dyZXNzKHByZXZQcm9ncmVzcywgdHJ1ZSk7IC8vIHRvIGF2b2lkIGlzc3VlcyB3aGVyZSBhbmltYXRpb24gY2FsbGJhY2tzIGxpa2Ugb25TdGFydCBhcmVuJ3QgdHJpZ2dlcmVkLlxuXG4gICAgICAgIHNlbGYucHJvZ3Jlc3MgPSBwcmV2UHJvZ3Jlc3M7XG4gICAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHBpbiAmJiBwaW5TcGFjaW5nICYmIChzcGFjZXIuX3Bpbk9mZnNldCA9IE1hdGgucm91bmQoc2VsZi5wcm9ncmVzcyAqIHBpbkNoYW5nZSkpO1xuICAgICAgb25SZWZyZXNoICYmIG9uUmVmcmVzaChzZWxmKTtcbiAgICB9O1xuXG4gICAgc2VsZi5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAoc2VsZi5zY3JvbGwoKSAtIHNjcm9sbDIpIC8gKF9nZXRUaW1lKCkgLSBfdGltZTIpICogMTAwMCB8fCAwO1xuICAgIH07XG5cbiAgICBzZWxmLnVwZGF0ZSA9IGZ1bmN0aW9uIChyZXNldCwgcmVjb3JkVmVsb2NpdHkpIHtcbiAgICAgIHZhciBzY3JvbGwgPSBzZWxmLnNjcm9sbCgpLFxuICAgICAgICAgIHAgPSByZXNldCA/IDAgOiAoc2Nyb2xsIC0gc3RhcnQpIC8gY2hhbmdlLFxuICAgICAgICAgIGNsaXBwZWQgPSBwIDwgMCA/IDAgOiBwID4gMSA/IDEgOiBwIHx8IDAsXG4gICAgICAgICAgcHJldlByb2dyZXNzID0gc2VsZi5wcm9ncmVzcyxcbiAgICAgICAgICBpc0FjdGl2ZSxcbiAgICAgICAgICB3YXNBY3RpdmUsXG4gICAgICAgICAgdG9nZ2xlU3RhdGUsXG4gICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgIHN0YXRlQ2hhbmdlZCxcbiAgICAgICAgICB0b2dnbGVkO1xuXG4gICAgICBpZiAocmVjb3JkVmVsb2NpdHkpIHtcbiAgICAgICAgc2Nyb2xsMiA9IHNjcm9sbDE7XG4gICAgICAgIHNjcm9sbDEgPSBzY3JvbGw7XG5cbiAgICAgICAgaWYgKHNuYXApIHtcbiAgICAgICAgICBzbmFwMiA9IHNuYXAxO1xuICAgICAgICAgIHNuYXAxID0gYW5pbWF0aW9uICYmICFpc1RvZ2dsZSA/IGFuaW1hdGlvbi50b3RhbFByb2dyZXNzKCkgOiBjbGlwcGVkO1xuICAgICAgICB9XG4gICAgICB9IC8vIGFudGljaXBhdGUgdGhlIHBpbm5pbmcgYSBmZXcgdGlja3MgYWhlYWQgb2YgdGltZSBiYXNlZCBvbiB2ZWxvY2l0eSB0byBhdm9pZCBhIHZpc3VhbCBnbGl0Y2ggZHVlIHRvIHRoZSBmYWN0IHRoYXQgbW9zdCBicm93c2VycyBkbyBzY3JvbGxpbmcgb24gYSBzZXBhcmF0ZSB0aHJlYWQgKG5vdCBzeW5jZWQgd2l0aCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUpLlxuXG5cbiAgICAgIGFudGljaXBhdGVQaW4gJiYgIWNsaXBwZWQgJiYgcGluICYmICFfcmVmcmVzaGluZyAmJiAhX3N0YXJ0dXAgJiYgX2xhc3RTY3JvbGxUaW1lICYmIHN0YXJ0IDwgc2Nyb2xsICsgKHNjcm9sbCAtIHNjcm9sbDIpIC8gKF9nZXRUaW1lKCkgLSBfdGltZTIpICogYW50aWNpcGF0ZVBpbiAmJiAoY2xpcHBlZCA9IDAuMDAwMSk7XG5cbiAgICAgIGlmIChjbGlwcGVkICE9PSBwcmV2UHJvZ3Jlc3MgJiYgc2VsZi5lbmFibGVkKSB7XG4gICAgICAgIGlzQWN0aXZlID0gc2VsZi5pc0FjdGl2ZSA9ICEhY2xpcHBlZCAmJiBjbGlwcGVkIDwgMTtcbiAgICAgICAgd2FzQWN0aXZlID0gISFwcmV2UHJvZ3Jlc3MgJiYgcHJldlByb2dyZXNzIDwgMTtcbiAgICAgICAgdG9nZ2xlZCA9IGlzQWN0aXZlICE9PSB3YXNBY3RpdmU7XG4gICAgICAgIHN0YXRlQ2hhbmdlZCA9IHRvZ2dsZWQgfHwgISFjbGlwcGVkICE9PSAhIXByZXZQcm9ncmVzczsgLy8gY291bGQgZ28gZnJvbSBzdGFydCBhbGwgdGhlIHdheSB0byBlbmQsIHRodXMgaXQgZGlkbid0IHRvZ2dsZSBidXQgaXQgZGlkIGNoYW5nZSBzdGF0ZSBpbiBhIHNlbnNlIChtYXkgbmVlZCB0byBmaXJlIGEgY2FsbGJhY2spXG5cbiAgICAgICAgc2VsZi5kaXJlY3Rpb24gPSBjbGlwcGVkID4gcHJldlByb2dyZXNzID8gMSA6IC0xO1xuICAgICAgICBzZWxmLnByb2dyZXNzID0gY2xpcHBlZDtcblxuICAgICAgICBpZiAoIWlzVG9nZ2xlKSB7XG4gICAgICAgICAgaWYgKHNjcnViVHdlZW4gJiYgIV9yZWZyZXNoaW5nICYmICFfc3RhcnR1cCkge1xuICAgICAgICAgICAgc2NydWJUd2Vlbi52YXJzLnRvdGFsUHJvZ3Jlc3MgPSBjbGlwcGVkO1xuICAgICAgICAgICAgc2NydWJUd2Vlbi5pbnZhbGlkYXRlKCkucmVzdGFydCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhbmltYXRpb24udG90YWxQcm9ncmVzcyhjbGlwcGVkLCAhIV9yZWZyZXNoaW5nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGluKSB7XG4gICAgICAgICAgcmVzZXQgJiYgcGluU3BhY2luZyAmJiAoc3BhY2VyLnN0eWxlW3BpblNwYWNpbmcgKyBkaXJlY3Rpb24ub3MyXSA9IHNwYWNpbmdTdGFydCk7XG5cbiAgICAgICAgICBpZiAoIXVzZUZpeGVkUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHBpblNldHRlcihwaW5TdGFydCArIHBpbkNoYW5nZSAqIGNsaXBwZWQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGVDaGFuZ2VkKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAhcmVzZXQgJiYgY2xpcHBlZCA+IHByZXZQcm9ncmVzcyAmJiBlbmQgKyAxID4gc2Nyb2xsICYmIHNjcm9sbCArIDEgPj0gX21heFNjcm9sbChzY3JvbGxlciwgZGlyZWN0aW9uKTsgLy8gaWYgaXQncyBhdCB0aGUgVkVSWSBlbmQgb2YgdGhlIHBhZ2UsIGRvbid0IHN3aXRjaCBhd2F5IGZyb20gcG9zaXRpb246IGZpeGVkIGJlY2F1c2UgaXQncyBwb2ludGxlc3MgYW5kIGl0IGNvdWxkIGNhdXNlIGEgYnJpZWYgZmxhc2ggd2hlbiB0aGUgdXNlciBzY3JvbGxzIGJhY2sgdXAgKHdoZW4gaXQgZ2V0cyBwaW5uZWQgYWdhaW4pXG5cbiAgICAgICAgICAgIGlmIChwaW5SZXBhcmVudCkge1xuICAgICAgICAgICAgICBpZiAoIXJlc2V0ICYmIChpc0FjdGl2ZSB8fCBhY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJvdW5kcyA9IF9nZXRCb3VuZHMocGluLCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgX29mZnNldCA9IHNjcm9sbCAtIHN0YXJ0O1xuXG4gICAgICAgICAgICAgICAgX3JlcGFyZW50KHBpbiwgX2JvZHksIGJvdW5kcy50b3AgKyAoZGlyZWN0aW9uID09PSBfdmVydGljYWwgPyBfb2Zmc2V0IDogMCkgKyBfcHgsIGJvdW5kcy5sZWZ0ICsgKGRpcmVjdGlvbiA9PT0gX3ZlcnRpY2FsID8gMCA6IF9vZmZzZXQpICsgX3B4KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfcmVwYXJlbnQocGluLCBzcGFjZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9zZXRTdGF0ZShpc0FjdGl2ZSB8fCBhY3Rpb24gPyBwaW5BY3RpdmVTdGF0ZSA6IHBpblN0YXRlKTtcblxuICAgICAgICAgICAgcGluQ2hhbmdlICE9PSBjaGFuZ2UgJiYgY2xpcHBlZCA8IDEgJiYgaXNBY3RpdmUgfHwgcGluU2V0dGVyKHBpblN0YXJ0ICsgKGNsaXBwZWQgPT09IDEgJiYgIWFjdGlvbiA/IHBpbkNoYW5nZSA6IDApKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzbmFwICYmICF0d2VlblRvLnR3ZWVuICYmICFfcmVmcmVzaGluZyAmJiAhX3N0YXJ0dXAgJiYgc25hcERlbGF5ZWRDYWxsLnJlc3RhcnQodHJ1ZSk7XG4gICAgICAgIHRvZ2dsZUNsYXNzICYmICh0b2dnbGVkIHx8IG9uY2UgJiYgY2xpcHBlZCAmJiAoY2xpcHBlZCA8IDEgfHwgIV9saW1pdENhbGxiYWNrcykpICYmIF90b0FycmF5KHRvZ2dsZUNsYXNzLnRhcmdldHMpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgcmV0dXJuIGVsLmNsYXNzTGlzdFtpc0FjdGl2ZSB8fCBvbmNlID8gXCJhZGRcIiA6IFwicmVtb3ZlXCJdKHRvZ2dsZUNsYXNzLmNsYXNzTmFtZSk7XG4gICAgICAgIH0pOyAvLyBjbGFzc2VzIGNvdWxkIGFmZmVjdCBwb3NpdGlvbmluZywgc28gZG8gaXQgZXZlbiBpZiByZXNldCBvciByZWZyZXNoaW5nIGlzIHRydWUuXG5cbiAgICAgICAgb25VcGRhdGUgJiYgIWlzVG9nZ2xlICYmICFyZXNldCAmJiBvblVwZGF0ZShzZWxmKTtcblxuICAgICAgICBpZiAoc3RhdGVDaGFuZ2VkICYmICFfcmVmcmVzaGluZykge1xuICAgICAgICAgIHRvZ2dsZVN0YXRlID0gY2xpcHBlZCAmJiAhcHJldlByb2dyZXNzID8gMCA6IGNsaXBwZWQgPT09IDEgPyAxIDogcHJldlByb2dyZXNzID09PSAxID8gMiA6IDM7IC8vIDAgPSBlbnRlciwgMSA9IGxlYXZlLCAyID0gZW50ZXJCYWNrLCAzID0gbGVhdmVCYWNrICh3ZSBwcmlvcml0aXplIHRoZSBGSVJTVCBlbmNvdW50ZXIsIHRodXMgaWYgeW91IHNjcm9sbCByZWFsbHkgZmFzdCBwYXN0IHRoZSBvbkVudGVyIGFuZCBvbkxlYXZlIGluIG9uZSB0aWNrLCBpdCdkIHByaW9yaXRpemUgb25FbnRlci5cblxuICAgICAgICAgIGlmIChpc1RvZ2dsZSkge1xuICAgICAgICAgICAgYWN0aW9uID0gIXRvZ2dsZWQgJiYgdG9nZ2xlQWN0aW9uc1t0b2dnbGVTdGF0ZSArIDFdICE9PSBcIm5vbmVcIiAmJiB0b2dnbGVBY3Rpb25zW3RvZ2dsZVN0YXRlICsgMV0gfHwgdG9nZ2xlQWN0aW9uc1t0b2dnbGVTdGF0ZV07IC8vIGlmIGl0IGRpZG4ndCB0b2dnbGUsIHRoYXQgbWVhbnMgaXQgc2hvdCByaWdodCBwYXN0IGFuZCBzaW5jZSB3ZSBwcmlvcml0aXplIHRoZSBcImVudGVyXCIgYWN0aW9uLCB3ZSBzaG91bGQgc3dpdGNoIHRvIHRoZSBcImxlYXZlXCIgaW4gdGhpcyBjYXNlIChidXQgb25seSBpZiBvbmUgaXMgZGVmaW5lZClcblxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbiAmJiAoYWN0aW9uID09PSBcImNvbXBsZXRlXCIgfHwgYWN0aW9uID09PSBcInJlc2V0XCIgfHwgYWN0aW9uIGluIGFuaW1hdGlvbikpIHtcbiAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLnBhdXNlKCkudG90YWxQcm9ncmVzcygxKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwicmVzZXRcIikge1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5yZXN0YXJ0KHRydWUpLnBhdXNlKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uW2FjdGlvbl0oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvblVwZGF0ZSAmJiBvblVwZGF0ZShzZWxmKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodG9nZ2xlZCB8fCAhX2xpbWl0Q2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAvLyBvbiBzdGFydHVwLCB0aGUgcGFnZSBjb3VsZCBiZSBzY3JvbGxlZCBhbmQgd2UgZG9uJ3Qgd2FudCB0byBmaXJlIGNhbGxiYWNrcyB0aGF0IGRpZG4ndCB0b2dnbGUuIEZvciBleGFtcGxlIG9uRW50ZXIgc2hvdWxkbid0IGZpcmUgaWYgdGhlIFNjcm9sbFRyaWdnZXIgaXNuJ3QgYWN0dWFsbHkgZW50ZXJlZC5cbiAgICAgICAgICAgIG9uVG9nZ2xlICYmIHRvZ2dsZWQgJiYgb25Ub2dnbGUoc2VsZik7XG4gICAgICAgICAgICBjYWxsYmFja3NbdG9nZ2xlU3RhdGVdICYmIGNhbGxiYWNrc1t0b2dnbGVTdGF0ZV0oc2VsZik7XG4gICAgICAgICAgICBvbmNlICYmIChjbGlwcGVkID09PSAxID8gc2VsZi5raWxsKGZhbHNlLCAxKSA6IGNhbGxiYWNrc1t0b2dnbGVTdGF0ZV0gPSAwKTsgLy8gYSBjYWxsYmFjayBzaG91bGRuJ3QgYmUgY2FsbGVkIGFnYWluIGlmIG9uY2UgaXMgdHJ1ZS5cblxuICAgICAgICAgICAgaWYgKCF0b2dnbGVkKSB7XG4gICAgICAgICAgICAgIC8vIGl0J3MgcG9zc2libGUgdG8gZ28gY29tcGxldGVseSBwYXN0LCBsaWtlIGZyb20gYmVmb3JlIHRoZSBzdGFydCB0byBhZnRlciB0aGUgZW5kIChvciB2aWNlLXZlcnNhKSBpbiB3aGljaCBjYXNlIEJPVEggY2FsbGJhY2tzIHNob3VsZCBiZSBmaXJlZCBpbiB0aGF0IG9yZGVyXG4gICAgICAgICAgICAgIHRvZ2dsZVN0YXRlID0gY2xpcHBlZCA9PT0gMSA/IDEgOiAzO1xuICAgICAgICAgICAgICBjYWxsYmFja3NbdG9nZ2xlU3RhdGVdICYmIGNhbGxiYWNrc1t0b2dnbGVTdGF0ZV0oc2VsZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzVG9nZ2xlICYmIG9uVXBkYXRlICYmICFfcmVmcmVzaGluZykge1xuICAgICAgICAgIG9uVXBkYXRlKHNlbGYpO1xuICAgICAgICB9XG4gICAgICB9IC8vIHVwZGF0ZSBhYnNvbHV0ZWx5LXBvc2l0aW9uZWQgbWFya2VycyAob25seSBpZiB0aGUgc2Nyb2xsZXIgaXNuJ3QgdGhlIHZpZXdwb3J0KVxuXG5cbiAgICAgIGlmIChtYXJrZXJFbmRTZXR0ZXIpIHtcbiAgICAgICAgbWFya2VyU3RhcnRTZXR0ZXIoc2Nyb2xsICsgKG1hcmtlclN0YXJ0VHJpZ2dlci5faXNGbGlwcGVkID8gMSA6IDApKTtcbiAgICAgICAgbWFya2VyRW5kU2V0dGVyKHNjcm9sbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzZWxmLmVuYWJsZWQpIHtcbiAgICAgICAgc2VsZi5lbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICBfYWRkTGlzdGVuZXIoc2Nyb2xsZXIsIFwicmVzaXplXCIsIF9vblJlc2l6ZSk7XG5cbiAgICAgICAgX2FkZExpc3RlbmVyKHNjcm9sbGVyLCBcInNjcm9sbFwiLCBfb25TY3JvbGwpO1xuXG4gICAgICAgIG9uUmVmcmVzaEluaXQgJiYgX2FkZExpc3RlbmVyKFNjcm9sbFRyaWdnZXIsIFwicmVmcmVzaEluaXRcIiwgb25SZWZyZXNoSW5pdCk7XG4gICAgICAgICFhbmltYXRpb24gfHwgIWFuaW1hdGlvbi5hZGQgPyBzZWxmLnJlZnJlc2goKSA6IGdzYXAuZGVsYXllZENhbGwoMC4wMSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBzdGFydCB8fCBlbmQgfHwgc2VsZi5yZWZyZXNoKCk7XG4gICAgICAgIH0pICYmIChjaGFuZ2UgPSAwLjAxKSAmJiAoc3RhcnQgPSBlbmQgPSAwKTsgLy8gaWYgdGhlIGFuaW1hdGlvbiBpcyBhIHRpbWVsaW5lLCBpdCBtYXkgbm90IGhhdmUgYmVlbiBwb3B1bGF0ZWQgeWV0LCBzbyBpdCB3b3VsZG4ndCByZW5kZXIgYXQgdGhlIHByb3BlciBwbGFjZSBvbiB0aGUgZmlyc3QgcmVmcmVzaCgpLCB0aHVzIHdlIHNob3VsZCBzY2hlZHVsZSBvbmUgZm9yIHRoZSBuZXh0IHRpY2suXG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYuZGlzYWJsZSA9IGZ1bmN0aW9uIChyZXNldCwgYWxsb3dBbmltYXRpb24pIHtcbiAgICAgIGlmIChzZWxmLmVuYWJsZWQpIHtcbiAgICAgICAgcmVzZXQgIT09IGZhbHNlICYmIHNlbGYucmV2ZXJ0KCk7XG4gICAgICAgIHNlbGYuZW5hYmxlZCA9IHNlbGYuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgYWxsb3dBbmltYXRpb24gfHwgc2NydWJUd2VlbiAmJiBzY3J1YlR3ZWVuLnBhdXNlKCk7XG4gICAgICAgIHByZXZTY3JvbGwgPSAwO1xuICAgICAgICBwaW5DYWNoZSAmJiAocGluQ2FjaGUudW5jYWNoZSA9IDEpO1xuICAgICAgICBvblJlZnJlc2hJbml0ICYmIF9yZW1vdmVMaXN0ZW5lcihTY3JvbGxUcmlnZ2VyLCBcInJlZnJlc2hJbml0XCIsIG9uUmVmcmVzaEluaXQpO1xuXG4gICAgICAgIGlmIChzbmFwRGVsYXllZENhbGwpIHtcbiAgICAgICAgICBzbmFwRGVsYXllZENhbGwucGF1c2UoKTtcbiAgICAgICAgICB0d2VlblRvLnR3ZWVuICYmIHR3ZWVuVG8udHdlZW4ua2lsbCgpICYmICh0d2VlblRvLnR3ZWVuID0gMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzVmlld3BvcnQpIHtcbiAgICAgICAgICB2YXIgaSA9IF90cmlnZ2Vycy5sZW5ndGg7XG5cbiAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBpZiAoX3RyaWdnZXJzW2ldLnNjcm9sbGVyID09PSBzY3JvbGxlciAmJiBfdHJpZ2dlcnNbaV0gIT09IHNlbGYpIHtcbiAgICAgICAgICAgICAgcmV0dXJuOyAvL2Rvbid0IHJlbW92ZSB0aGUgbGlzdGVuZXJzIGlmIHRoZXJlIGFyZSBzdGlsbCBvdGhlciB0cmlnZ2VycyByZWZlcmVuY2luZyBpdC5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfcmVtb3ZlTGlzdGVuZXIoc2Nyb2xsZXIsIFwicmVzaXplXCIsIF9vblJlc2l6ZSk7XG5cbiAgICAgICAgICBfcmVtb3ZlTGlzdGVuZXIoc2Nyb2xsZXIsIFwic2Nyb2xsXCIsIF9vblNjcm9sbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi5raWxsID0gZnVuY3Rpb24gKHJldmVydCwgYWxsb3dBbmltYXRpb24pIHtcbiAgICAgIHNlbGYuZGlzYWJsZShyZXZlcnQsIGFsbG93QW5pbWF0aW9uKTtcbiAgICAgIGlkICYmIGRlbGV0ZSBfaWRzW2lkXTtcblxuICAgICAgdmFyIGkgPSBfdHJpZ2dlcnMuaW5kZXhPZihzZWxmKTtcblxuICAgICAgX3RyaWdnZXJzLnNwbGljZShpLCAxKTtcblxuICAgICAgaSA9PT0gX2kgJiYgX2RpcmVjdGlvbiA+IDAgJiYgX2ktLTsgLy8gaWYgd2UncmUgaW4gdGhlIG1pZGRsZSBvZiBhIHJlZnJlc2goKSBvciB1cGRhdGUoKSwgc3BsaWNpbmcgd291bGQgY2F1c2Ugc2tpcHMgaW4gdGhlIGluZGV4LCBzbyBhZGp1c3QuLi5cblxuICAgICAgaWYgKGFuaW1hdGlvbikge1xuICAgICAgICBhbmltYXRpb24uc2Nyb2xsVHJpZ2dlciA9IG51bGw7XG4gICAgICAgIHJldmVydCAmJiBhbmltYXRpb24ucmVuZGVyKC0xKTtcbiAgICAgICAgYWxsb3dBbmltYXRpb24gfHwgYW5pbWF0aW9uLmtpbGwoKTtcbiAgICAgIH1cblxuICAgICAgbWFya2VyU3RhcnQgJiYgW21hcmtlclN0YXJ0LCBtYXJrZXJFbmQsIG1hcmtlclN0YXJ0VHJpZ2dlciwgbWFya2VyRW5kVHJpZ2dlcl0uZm9yRWFjaChmdW5jdGlvbiAobSkge1xuICAgICAgICByZXR1cm4gbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG0pO1xuICAgICAgfSk7XG4gICAgICBwaW5DYWNoZSAmJiAocGluQ2FjaGUudW5jYWNoZSA9IDEpO1xuICAgIH07XG5cbiAgICBzZWxmLmVuYWJsZSgpO1xuICB9O1xuXG4gIFNjcm9sbFRyaWdnZXIucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3Rlcihjb3JlKSB7XG4gICAgaWYgKCFfY29yZUluaXR0ZWQpIHtcbiAgICAgIGdzYXAgPSBjb3JlIHx8IF9nZXRHU0FQKCk7XG5cbiAgICAgIGlmIChfd2luZG93RXhpc3RzKCkgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICAgIF93aW4gPSB3aW5kb3c7XG4gICAgICAgIF9kb2MgPSBkb2N1bWVudDtcbiAgICAgICAgX2RvY0VsID0gX2RvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIF9ib2R5ID0gX2RvYy5ib2R5O1xuICAgICAgfVxuXG4gICAgICBpZiAoZ3NhcCkge1xuICAgICAgICBfdG9BcnJheSA9IGdzYXAudXRpbHMudG9BcnJheTtcbiAgICAgICAgX2NsYW1wID0gZ3NhcC51dGlscy5jbGFtcDtcbiAgICAgICAgZ3NhcC5jb3JlLmdsb2JhbHMoXCJTY3JvbGxUcmlnZ2VyXCIsIFNjcm9sbFRyaWdnZXIpOyAvLyBtdXN0IHJlZ2lzdGVyIHRoZSBnbG9iYWwgbWFudWFsbHkgYmVjYXVzZSBpbiBJbnRlcm5ldCBFeHBsb3JlciwgZnVuY3Rpb25zIChjbGFzc2VzKSBkb24ndCBoYXZlIGEgXCJuYW1lXCIgcHJvcGVydHkuXG5cbiAgICAgICAgaWYgKF9ib2R5KSB7XG4gICAgICAgICAgX3JhZiA9IF93aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmLCAxNik7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIF9hZGRMaXN0ZW5lcihfd2luLCBcIm1vdXNld2hlZWxcIiwgX29uU2Nyb2xsKTtcblxuICAgICAgICAgIF9yb290ID0gW193aW4sIF9kb2MsIF9kb2NFbCwgX2JvZHldO1xuXG4gICAgICAgICAgX2FkZExpc3RlbmVyKF9kb2MsIFwic2Nyb2xsXCIsIF9vblNjcm9sbCk7IC8vIHNvbWUgYnJvd3NlcnMgKGxpa2UgQ2hyb21lKSwgdGhlIHdpbmRvdyBzdG9wcyBkaXNwYXRjaGluZyBzY3JvbGwgZXZlbnRzIG9uIHRoZSB3aW5kb3cgaWYgeW91IHNjcm9sbCByZWFsbHkgZmFzdCwgYnV0IGl0J3MgY29uc2lzdGVudCBvbiB0aGUgZG9jdW1lbnQhXG5cblxuICAgICAgICAgIHZhciBib2R5U3R5bGUgPSBfYm9keS5zdHlsZSxcbiAgICAgICAgICAgICAgYm9yZGVyID0gYm9keVN0eWxlLmJvcmRlclRvcCxcbiAgICAgICAgICAgICAgYm91bmRzO1xuICAgICAgICAgIGJvZHlTdHlsZS5ib3JkZXJUb3AgPSBcIjFweCBzb2xpZCAjMDAwXCI7IC8vIHdvcmtzIGFyb3VuZCBhbiBpc3N1ZSB3aGVyZSBhIG1hcmdpbiBvZiBhIGNoaWxkIGVsZW1lbnQgY291bGQgdGhyb3cgb2ZmIHRoZSBib3VuZHMgb2YgdGhlIF9ib2R5LCBtYWtpbmcgaXQgc2VlbSBsaWtlIHRoZXJlJ3MgYSBtYXJnaW4gd2hlbiB0aGVyZSBhY3R1YWxseSBpc24ndC4gVGhlIGJvcmRlciBlbnN1cmVzIHRoYXQgdGhlIGJvdW5kcyBhcmUgYWNjdXJhdGUuXG5cbiAgICAgICAgICBib3VuZHMgPSBfZ2V0Qm91bmRzKF9ib2R5KTtcbiAgICAgICAgICBfdmVydGljYWwubSA9IE1hdGgucm91bmQoYm91bmRzLnRvcCArIF92ZXJ0aWNhbC5zYygpKSB8fCAwOyAvLyBhY2NvbW1vZGF0ZSB0aGUgb2Zmc2V0IG9mIHRoZSA8Ym9keT4gY2F1c2VkIGJ5IG1hcmdpbnMgYW5kL29yIHBhZGRpbmdcblxuICAgICAgICAgIF9ob3Jpem9udGFsLm0gPSBNYXRoLnJvdW5kKGJvdW5kcy5sZWZ0ICsgX2hvcml6b250YWwuc2MoKSkgfHwgMDtcbiAgICAgICAgICBib3JkZXIgPyBib2R5U3R5bGUuYm9yZGVyVG9wID0gYm9yZGVyIDogYm9keVN0eWxlLnJlbW92ZVByb3BlcnR5KFwiYm9yZGVyLXRvcFwiKTtcbiAgICAgICAgICBfc3luY0ludGVydmFsID0gc2V0SW50ZXJ2YWwoX3N5bmMsIDIwMCk7XG4gICAgICAgICAgZ3NhcC5kZWxheWVkQ2FsbCgwLjUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3RhcnR1cCA9IDA7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBfYWRkTGlzdGVuZXIoX2RvYywgXCJ0b3VjaGNhbmNlbFwiLCBfcGFzc1Rocm91Z2gpOyAvLyBzb21lIG9sZGVyIEFuZHJvaWQgZGV2aWNlcyBpbnRlcm1pdHRlbnRseSBzdG9wIGRpc3BhdGNoaW5nIFwidG91Y2htb3ZlXCIgZXZlbnRzIGlmIHdlIGRvbid0IGxpc3RlbiBmb3IgXCJ0b3VjaGNhbmNlbFwiIG9uIHRoZSBkb2N1bWVudC5cblxuXG4gICAgICAgICAgX2FkZExpc3RlbmVyKF9ib2R5LCBcInRvdWNoc3RhcnRcIiwgX3Bhc3NUaHJvdWdoKTsgLy93b3JrcyBhcm91bmQgU2FmYXJpIGJ1ZzogaHR0cHM6Ly9ncmVlbnNvY2suY29tL2ZvcnVtcy90b3BpYy8yMTQ1MC1kcmFnZ2FibGUtaW4taWZyYW1lLW9uLW1vYmlsZS1pcy1idWdneS9cblxuXG4gICAgICAgICAgX211bHRpTGlzdGVuZXIoX2FkZExpc3RlbmVyLCBfZG9jLCBcInBvaW50ZXJkb3duLHRvdWNoc3RhcnQsbW91c2Vkb3duXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfcG9pbnRlcklzRG93biA9IDE7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBfbXVsdGlMaXN0ZW5lcihfYWRkTGlzdGVuZXIsIF9kb2MsIFwicG9pbnRlcnVwLHRvdWNoZW5kLG1vdXNldXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9wb2ludGVySXNEb3duID0gMDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIF90cmFuc2Zvcm1Qcm9wID0gZ3NhcC51dGlscy5jaGVja1ByZWZpeChcInRyYW5zZm9ybVwiKTtcblxuICAgICAgICAgIF9zdGF0ZVByb3BzLnB1c2goX3RyYW5zZm9ybVByb3ApO1xuXG4gICAgICAgICAgX2NvcmVJbml0dGVkID0gX2dldFRpbWUoKTtcbiAgICAgICAgICBfcmVzaXplRGVsYXkgPSBnc2FwLmRlbGF5ZWRDYWxsKDAuMiwgX3JlZnJlc2hBbGwpLnBhdXNlKCk7XG4gICAgICAgICAgX2F1dG9SZWZyZXNoID0gW19kb2MsIFwidmlzaWJpbGl0eWNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdyA9IF93aW4uaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICBoID0gX3dpbi5pbm5lckhlaWdodDtcblxuICAgICAgICAgICAgaWYgKF9kb2MuaGlkZGVuKSB7XG4gICAgICAgICAgICAgIF9wcmV2V2lkdGggPSB3O1xuICAgICAgICAgICAgICBfcHJldkhlaWdodCA9IGg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKF9wcmV2V2lkdGggIT09IHcgfHwgX3ByZXZIZWlnaHQgIT09IGgpIHtcbiAgICAgICAgICAgICAgX29uUmVzaXplKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgX2RvYywgXCJET01Db250ZW50TG9hZGVkXCIsIF9yZWZyZXNoQWxsLCBfd2luLCBcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9sYXN0U2Nyb2xsVGltZSB8fCBfcmVmcmVzaEFsbCgpO1xuICAgICAgICAgIH0sIF93aW4sIFwicmVzaXplXCIsIF9vblJlc2l6ZV07XG5cbiAgICAgICAgICBfaXRlcmF0ZUF1dG9SZWZyZXNoKF9hZGRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2NvcmVJbml0dGVkO1xuICB9O1xuXG4gIFNjcm9sbFRyaWdnZXIuZGVmYXVsdHMgPSBmdW5jdGlvbiBkZWZhdWx0cyhjb25maWcpIHtcbiAgICBmb3IgKHZhciBwIGluIGNvbmZpZykge1xuICAgICAgX2RlZmF1bHRzW3BdID0gY29uZmlnW3BdO1xuICAgIH1cbiAgfTtcblxuICBTY3JvbGxUcmlnZ2VyLmtpbGwgPSBmdW5jdGlvbiBraWxsKCkge1xuICAgIF9lbmFibGVkID0gMDtcblxuICAgIF90cmlnZ2Vycy5zbGljZSgwKS5mb3JFYWNoKGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gdHJpZ2dlci5raWxsKDEpO1xuICAgIH0pO1xuICB9O1xuXG4gIFNjcm9sbFRyaWdnZXIuY29uZmlnID0gZnVuY3Rpb24gY29uZmlnKHZhcnMpIHtcbiAgICBcImxpbWl0Q2FsbGJhY2tzXCIgaW4gdmFycyAmJiAoX2xpbWl0Q2FsbGJhY2tzID0gISF2YXJzLmxpbWl0Q2FsbGJhY2tzKTtcbiAgICB2YXIgbXMgPSB2YXJzLnN5bmNJbnRlcnZhbDtcbiAgICBtcyAmJiBjbGVhckludGVydmFsKF9zeW5jSW50ZXJ2YWwpIHx8IChfc3luY0ludGVydmFsID0gbXMpICYmIHNldEludGVydmFsKF9zeW5jLCBtcyk7XG4gICAgXCJhdXRvUmVmcmVzaEV2ZW50c1wiIGluIHZhcnMgJiYgKF9pdGVyYXRlQXV0b1JlZnJlc2goX3JlbW92ZUxpc3RlbmVyKSB8fCBfaXRlcmF0ZUF1dG9SZWZyZXNoKF9hZGRMaXN0ZW5lciwgdmFycy5hdXRvUmVmcmVzaEV2ZW50cyB8fCBcIm5vbmVcIikpO1xuICB9O1xuXG4gIFNjcm9sbFRyaWdnZXIuc2Nyb2xsZXJQcm94eSA9IGZ1bmN0aW9uIHNjcm9sbGVyUHJveHkodGFyZ2V0LCB2YXJzKSB7XG4gICAgdmFyIHQgPSBfdG9BcnJheSh0YXJnZXQpWzBdO1xuXG4gICAgX2lzVmlld3BvcnQodCkgPyBfcHJveGllcy51bnNoaWZ0KF93aW4sIHZhcnMsIF9ib2R5LCB2YXJzLCBfZG9jRWwsIHZhcnMpIDogX3Byb3hpZXMudW5zaGlmdCh0LCB2YXJzKTtcbiAgfTtcblxuICBTY3JvbGxUcmlnZ2VyLm1hdGNoTWVkaWEgPSBmdW5jdGlvbiBtYXRjaE1lZGlhKHZhcnMpIHtcbiAgICAvLyBfbWVkaWEgaXMgcG9wdWxhdGVkIGluIHRoZSBmb2xsb3dpbmcgb3JkZXI6IG1lZGlhUXVlcnlTdHJpbmcsIG9uTWF0Y2gsIG9uVW5tYXRjaCwgaXNNYXRjaGVkLiBTbyBpZiB0aGVyZSBhcmUgdHdvIG1lZGlhIHF1ZXJpZXMsIHRoZSBBcnJheSB3b3VsZCBoYXZlIGEgbGVuZ3RoIG9mIDhcbiAgICB2YXIgbXEsIHAsIGksIGZ1bmMsIHJlc3VsdDtcblxuICAgIGZvciAocCBpbiB2YXJzKSB7XG4gICAgICBpID0gX21lZGlhLmluZGV4T2YocCk7XG4gICAgICBmdW5jID0gdmFyc1twXTtcbiAgICAgIF9jcmVhdGluZ01lZGlhID0gcDtcblxuICAgICAgaWYgKHAgPT09IFwiYWxsXCIpIHtcbiAgICAgICAgZnVuYygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXEgPSBfd2luLm1hdGNoTWVkaWEocCk7XG5cbiAgICAgICAgaWYgKG1xKSB7XG4gICAgICAgICAgbXEubWF0Y2hlcyAmJiAocmVzdWx0ID0gZnVuYygpKTtcblxuICAgICAgICAgIGlmICh+aSkge1xuICAgICAgICAgICAgX21lZGlhW2kgKyAxXSA9IF9jb21iaW5lRnVuYyhfbWVkaWFbaSArIDFdLCBmdW5jKTtcbiAgICAgICAgICAgIF9tZWRpYVtpICsgMl0gPSBfY29tYmluZUZ1bmMoX21lZGlhW2kgKyAyXSwgcmVzdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaSA9IF9tZWRpYS5sZW5ndGg7XG5cbiAgICAgICAgICAgIF9tZWRpYS5wdXNoKHAsIGZ1bmMsIHJlc3VsdCk7XG5cbiAgICAgICAgICAgIG1xLmFkZExpc3RlbmVyID8gbXEuYWRkTGlzdGVuZXIoX29uTWVkaWFDaGFuZ2UpIDogbXEuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBfb25NZWRpYUNoYW5nZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX21lZGlhW2kgKyAzXSA9IG1xLm1hdGNoZXM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX2NyZWF0aW5nTWVkaWEgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBfbWVkaWE7XG4gIH07XG5cbiAgU2Nyb2xsVHJpZ2dlci5jbGVhck1hdGNoTWVkaWEgPSBmdW5jdGlvbiBjbGVhck1hdGNoTWVkaWEocXVlcnkpIHtcbiAgICBxdWVyeSB8fCAoX21lZGlhLmxlbmd0aCA9IDApO1xuICAgIHF1ZXJ5ID0gX21lZGlhLmluZGV4T2YocXVlcnkpO1xuICAgIHF1ZXJ5ID49IDAgJiYgX21lZGlhLnNwbGljZShxdWVyeSwgNCk7XG4gIH07XG5cbiAgcmV0dXJuIFNjcm9sbFRyaWdnZXI7XG59KCk7XG5TY3JvbGxUcmlnZ2VyLnZlcnNpb24gPSBcIjMuNS4xXCI7XG5cblNjcm9sbFRyaWdnZXIuc2F2ZVN0eWxlcyA9IGZ1bmN0aW9uICh0YXJnZXRzKSB7XG4gIHJldHVybiB0YXJnZXRzID8gX3RvQXJyYXkodGFyZ2V0cykuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdmFyIGkgPSBfc2F2ZWRTdHlsZXMuaW5kZXhPZih0YXJnZXQpO1xuXG4gICAgaSA+PSAwICYmIF9zYXZlZFN0eWxlcy5zcGxpY2UoaSwgNCk7XG5cbiAgICBfc2F2ZWRTdHlsZXMucHVzaCh0YXJnZXQsIHRhcmdldC5zdHlsZS5jc3NUZXh0LCBnc2FwLmNvcmUuZ2V0Q2FjaGUodGFyZ2V0KSwgX2NyZWF0aW5nTWVkaWEpO1xuICB9KSA6IF9zYXZlZFN0eWxlcztcbn07XG5cblNjcm9sbFRyaWdnZXIucmV2ZXJ0ID0gZnVuY3Rpb24gKHNvZnQsIG1lZGlhKSB7XG4gIHJldHVybiBfcmV2ZXJ0QWxsKCFzb2Z0LCBtZWRpYSk7XG59O1xuXG5TY3JvbGxUcmlnZ2VyLmNyZWF0ZSA9IGZ1bmN0aW9uICh2YXJzLCBhbmltYXRpb24pIHtcbiAgcmV0dXJuIG5ldyBTY3JvbGxUcmlnZ2VyKHZhcnMsIGFuaW1hdGlvbik7XG59O1xuXG5TY3JvbGxUcmlnZ2VyLnJlZnJlc2ggPSBmdW5jdGlvbiAoc2FmZSkge1xuICByZXR1cm4gc2FmZSA/IF9vblJlc2l6ZSgpIDogX3JlZnJlc2hBbGwodHJ1ZSk7XG59O1xuXG5TY3JvbGxUcmlnZ2VyLnVwZGF0ZSA9IF91cGRhdGVBbGw7XG5cblNjcm9sbFRyaWdnZXIubWF4U2Nyb2xsID0gZnVuY3Rpb24gKGVsZW1lbnQsIGhvcml6b250YWwpIHtcbiAgcmV0dXJuIF9tYXhTY3JvbGwoZWxlbWVudCwgaG9yaXpvbnRhbCA/IF9ob3Jpem9udGFsIDogX3ZlcnRpY2FsKTtcbn07XG5cblNjcm9sbFRyaWdnZXIuZ2V0U2Nyb2xsRnVuYyA9IGZ1bmN0aW9uIChlbGVtZW50LCBob3Jpem9udGFsKSB7XG4gIHJldHVybiBfZ2V0U2Nyb2xsRnVuYyhfdG9BcnJheShlbGVtZW50KVswXSwgaG9yaXpvbnRhbCA/IF9ob3Jpem9udGFsIDogX3ZlcnRpY2FsKTtcbn07XG5cblNjcm9sbFRyaWdnZXIuZ2V0QnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICByZXR1cm4gX2lkc1tpZF07XG59O1xuXG5TY3JvbGxUcmlnZ2VyLmdldEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF90cmlnZ2Vycy5zbGljZSgwKTtcbn07XG5cblNjcm9sbFRyaWdnZXIuaXNTY3JvbGxpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAhIV9sYXN0U2Nyb2xsVGltZTtcbn07XG5cblNjcm9sbFRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaykge1xuICB2YXIgYSA9IF9saXN0ZW5lcnNbdHlwZV0gfHwgKF9saXN0ZW5lcnNbdHlwZV0gPSBbXSk7XG4gIH5hLmluZGV4T2YoY2FsbGJhY2spIHx8IGEucHVzaChjYWxsYmFjayk7XG59O1xuXG5TY3JvbGxUcmlnZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcbiAgdmFyIGEgPSBfbGlzdGVuZXJzW3R5cGVdLFxuICAgICAgaSA9IGEgJiYgYS5pbmRleE9mKGNhbGxiYWNrKTtcbiAgaSA+PSAwICYmIGEuc3BsaWNlKGksIDEpO1xufTtcblxuU2Nyb2xsVHJpZ2dlci5iYXRjaCA9IGZ1bmN0aW9uICh0YXJnZXRzLCB2YXJzKSB7XG4gIHZhciByZXN1bHQgPSBbXSxcbiAgICAgIHZhcnNDb3B5ID0ge30sXG4gICAgICBpbnRlcnZhbCA9IHZhcnMuaW50ZXJ2YWwgfHwgMC4wMTYsXG4gICAgICBiYXRjaE1heCA9IHZhcnMuYmF0Y2hNYXggfHwgMWU5LFxuICAgICAgcHJveHlDYWxsYmFjayA9IGZ1bmN0aW9uIHByb3h5Q2FsbGJhY2sodHlwZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZWxlbWVudHMgPSBbXSxcbiAgICAgICAgdHJpZ2dlcnMgPSBbXSxcbiAgICAgICAgZGVsYXkgPSBnc2FwLmRlbGF5ZWRDYWxsKGludGVydmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjYWxsYmFjayhlbGVtZW50cywgdHJpZ2dlcnMpO1xuICAgICAgZWxlbWVudHMgPSBbXTtcbiAgICAgIHRyaWdnZXJzID0gW107XG4gICAgfSkucGF1c2UoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNlbGYpIHtcbiAgICAgIGVsZW1lbnRzLmxlbmd0aCB8fCBkZWxheS5yZXN0YXJ0KHRydWUpO1xuICAgICAgZWxlbWVudHMucHVzaChzZWxmLnRyaWdnZXIpO1xuICAgICAgdHJpZ2dlcnMucHVzaChzZWxmKTtcbiAgICAgIGJhdGNoTWF4IDw9IGVsZW1lbnRzLmxlbmd0aCAmJiBkZWxheS5wcm9ncmVzcygxKTtcbiAgICB9O1xuICB9LFxuICAgICAgcDtcblxuICBmb3IgKHAgaW4gdmFycykge1xuICAgIHZhcnNDb3B5W3BdID0gcC5zdWJzdHIoMCwgMikgPT09IFwib25cIiAmJiBfaXNGdW5jdGlvbih2YXJzW3BdKSAmJiBwICE9PSBcIm9uUmVmcmVzaEluaXRcIiA/IHByb3h5Q2FsbGJhY2socCwgdmFyc1twXSkgOiB2YXJzW3BdO1xuICB9XG5cbiAgaWYgKF9pc0Z1bmN0aW9uKGJhdGNoTWF4KSkge1xuICAgIGJhdGNoTWF4ID0gYmF0Y2hNYXgoKTtcblxuICAgIF9hZGRMaXN0ZW5lcihTY3JvbGxUcmlnZ2VyLCBcInJlZnJlc2hcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGJhdGNoTWF4ID0gdmFycy5iYXRjaE1heCgpO1xuICAgIH0pO1xuICB9XG5cbiAgX3RvQXJyYXkodGFyZ2V0cykuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgZm9yIChwIGluIHZhcnNDb3B5KSB7XG4gICAgICBjb25maWdbcF0gPSB2YXJzQ29weVtwXTtcbiAgICB9XG5cbiAgICBjb25maWcudHJpZ2dlciA9IHRhcmdldDtcbiAgICByZXN1bHQucHVzaChTY3JvbGxUcmlnZ2VyLmNyZWF0ZShjb25maWcpKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblNjcm9sbFRyaWdnZXIuc29ydCA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gIHJldHVybiBfdHJpZ2dlcnMuc29ydChmdW5jIHx8IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIChhLnZhcnMucmVmcmVzaFByaW9yaXR5IHx8IDApICogLTFlNiArIGEuc3RhcnQgLSAoYi5zdGFydCArIChiLnZhcnMucmVmcmVzaFByaW9yaXR5IHx8IDApICogLTFlNik7XG4gIH0pO1xufTtcblxuX2dldEdTQVAoKSAmJiBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpO1xuZXhwb3J0IHsgU2Nyb2xsVHJpZ2dlciBhcyBkZWZhdWx0IH07IiwiLyohXG4gKiBUZXh0UGx1Z2luIDMuNS4xXG4gKiBodHRwczovL2dyZWVuc29jay5jb21cbiAqXG4gKiBAbGljZW5zZSBDb3B5cmlnaHQgMjAwOC0yMDIwLCBHcmVlblNvY2suIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBTdWJqZWN0IHRvIHRoZSB0ZXJtcyBhdCBodHRwczovL2dyZWVuc29jay5jb20vc3RhbmRhcmQtbGljZW5zZSBvciBmb3JcbiAqIENsdWIgR3JlZW5Tb2NrIG1lbWJlcnMsIHRoZSBhZ3JlZW1lbnQgaXNzdWVkIHdpdGggdGhhdCBtZW1iZXJzaGlwLlxuICogQGF1dGhvcjogSmFjayBEb3lsZSwgamFja0BncmVlbnNvY2suY29tXG4qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHsgZW1vamlTYWZlU3BsaXQsIGdldFRleHQsIHNwbGl0SW5uZXJIVE1MIH0gZnJvbSBcIi4vdXRpbHMvc3RyaW5ncy5qc1wiO1xuXG52YXIgZ3NhcCxcbiAgICBfdGVtcERpdixcbiAgICBfZ2V0R1NBUCA9IGZ1bmN0aW9uIF9nZXRHU0FQKCkge1xuICByZXR1cm4gZ3NhcCB8fCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIChnc2FwID0gd2luZG93LmdzYXApICYmIGdzYXAucmVnaXN0ZXJQbHVnaW4gJiYgZ3NhcDtcbn07XG5cbmV4cG9ydCB2YXIgVGV4dFBsdWdpbiA9IHtcbiAgdmVyc2lvbjogXCIzLjUuMVwiLFxuICBuYW1lOiBcInRleHRcIixcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCh0YXJnZXQsIHZhbHVlLCB0d2Vlbikge1xuICAgIHZhciBpID0gdGFyZ2V0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIGRhdGEgPSB0aGlzLFxuICAgICAgICBfc2hvcnQsXG4gICAgICAgIHRleHQsXG4gICAgICAgIG9yaWdpbmFsLFxuICAgICAgICBqLFxuICAgICAgICBjb25kZW5zZWRUZXh0LFxuICAgICAgICBjb25kZW5zZWRPcmlnaW5hbCxcbiAgICAgICAgYWdncmVnYXRlLFxuICAgICAgICBzO1xuXG4gICAgZGF0YS5zdmcgPSB0YXJnZXQuZ2V0QkJveCAmJiAoaSA9PT0gXCJURVhUXCIgfHwgaSA9PT0gXCJUU1BBTlwiKTtcblxuICAgIGlmICghKFwiaW5uZXJIVE1MXCIgaW4gdGFyZ2V0KSAmJiAhZGF0YS5zdmcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBkYXRhLnRhcmdldCA9IHRhcmdldDtcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHZhbHVlID0ge1xuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCEoXCJ2YWx1ZVwiIGluIHZhbHVlKSkge1xuICAgICAgZGF0YS50ZXh0ID0gZGF0YS5vcmlnaW5hbCA9IFtcIlwiXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkYXRhLmRlbGltaXRlciA9IHZhbHVlLmRlbGltaXRlciB8fCBcIlwiO1xuICAgIG9yaWdpbmFsID0gc3BsaXRJbm5lckhUTUwodGFyZ2V0LCBkYXRhLmRlbGltaXRlcik7XG5cbiAgICBpZiAoIV90ZW1wRGl2KSB7XG4gICAgICBfdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgfVxuXG4gICAgX3RlbXBEaXYuaW5uZXJIVE1MID0gdmFsdWUudmFsdWU7XG4gICAgdGV4dCA9IHNwbGl0SW5uZXJIVE1MKF90ZW1wRGl2LCBkYXRhLmRlbGltaXRlcik7XG4gICAgZGF0YS5mcm9tID0gdHdlZW4uX2Zyb207XG5cbiAgICBpZiAoZGF0YS5mcm9tKSB7XG4gICAgICBpID0gb3JpZ2luYWw7XG4gICAgICBvcmlnaW5hbCA9IHRleHQ7XG4gICAgICB0ZXh0ID0gaTtcbiAgICB9XG5cbiAgICBkYXRhLmhhc0NsYXNzID0gISEodmFsdWUubmV3Q2xhc3MgfHwgdmFsdWUub2xkQ2xhc3MpO1xuICAgIGRhdGEubmV3Q2xhc3MgPSB2YWx1ZS5uZXdDbGFzcztcbiAgICBkYXRhLm9sZENsYXNzID0gdmFsdWUub2xkQ2xhc3M7XG4gICAgaSA9IG9yaWdpbmFsLmxlbmd0aCAtIHRleHQubGVuZ3RoO1xuICAgIF9zaG9ydCA9IGkgPCAwID8gb3JpZ2luYWwgOiB0ZXh0O1xuICAgIGRhdGEuZmlsbENoYXIgPSB2YWx1ZS5maWxsQ2hhciB8fCAodmFsdWUucGFkU3BhY2UgPyBcIiZuYnNwO1wiIDogXCJcIik7XG5cbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIGkgPSAtaTtcbiAgICB9XG5cbiAgICB3aGlsZSAoLS1pID4gLTEpIHtcbiAgICAgIF9zaG9ydC5wdXNoKGRhdGEuZmlsbENoYXIpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZS50eXBlID09PSBcImRpZmZcIikge1xuICAgICAgaiA9IDA7XG4gICAgICBjb25kZW5zZWRUZXh0ID0gW107XG4gICAgICBjb25kZW5zZWRPcmlnaW5hbCA9IFtdO1xuICAgICAgYWdncmVnYXRlID0gXCJcIjtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcyA9IHRleHRbaV07XG5cbiAgICAgICAgaWYgKHMgPT09IG9yaWdpbmFsW2ldKSB7XG4gICAgICAgICAgYWdncmVnYXRlICs9IHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uZGVuc2VkVGV4dFtqXSA9IGFnZ3JlZ2F0ZSArIHM7XG4gICAgICAgICAgY29uZGVuc2VkT3JpZ2luYWxbaisrXSA9IGFnZ3JlZ2F0ZSArIG9yaWdpbmFsW2ldO1xuICAgICAgICAgIGFnZ3JlZ2F0ZSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGV4dCA9IGNvbmRlbnNlZFRleHQ7XG4gICAgICBvcmlnaW5hbCA9IGNvbmRlbnNlZE9yaWdpbmFsO1xuXG4gICAgICBpZiAoYWdncmVnYXRlKSB7XG4gICAgICAgIHRleHQucHVzaChhZ2dyZWdhdGUpO1xuICAgICAgICBvcmlnaW5hbC5wdXNoKGFnZ3JlZ2F0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlLnNwZWVkKSB7XG4gICAgICB0d2Vlbi5kdXJhdGlvbihNYXRoLm1pbigwLjA1IC8gdmFsdWUuc3BlZWQgKiBfc2hvcnQubGVuZ3RoLCB2YWx1ZS5tYXhEdXJhdGlvbiB8fCA5OTk5KSk7XG4gICAgfVxuXG4gICAgdGhpcy5vcmlnaW5hbCA9IG9yaWdpbmFsO1xuICAgIHRoaXMudGV4dCA9IHRleHQ7XG5cbiAgICB0aGlzLl9wcm9wcy5wdXNoKFwidGV4dFwiKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIocmF0aW8sIGRhdGEpIHtcbiAgICBpZiAocmF0aW8gPiAxKSB7XG4gICAgICByYXRpbyA9IDE7XG4gICAgfSBlbHNlIGlmIChyYXRpbyA8IDApIHtcbiAgICAgIHJhdGlvID0gMDtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5mcm9tKSB7XG4gICAgICByYXRpbyA9IDEgLSByYXRpbztcbiAgICB9XG5cbiAgICB2YXIgdGV4dCA9IGRhdGEudGV4dCxcbiAgICAgICAgaGFzQ2xhc3MgPSBkYXRhLmhhc0NsYXNzLFxuICAgICAgICBuZXdDbGFzcyA9IGRhdGEubmV3Q2xhc3MsXG4gICAgICAgIG9sZENsYXNzID0gZGF0YS5vbGRDbGFzcyxcbiAgICAgICAgZGVsaW1pdGVyID0gZGF0YS5kZWxpbWl0ZXIsXG4gICAgICAgIHRhcmdldCA9IGRhdGEudGFyZ2V0LFxuICAgICAgICBmaWxsQ2hhciA9IGRhdGEuZmlsbENoYXIsXG4gICAgICAgIG9yaWdpbmFsID0gZGF0YS5vcmlnaW5hbCxcbiAgICAgICAgbCA9IHRleHQubGVuZ3RoLFxuICAgICAgICBpID0gcmF0aW8gKiBsICsgMC41IHwgMCxcbiAgICAgICAgYXBwbHlOZXcsXG4gICAgICAgIGFwcGx5T2xkLFxuICAgICAgICBzdHI7XG5cbiAgICBpZiAoaGFzQ2xhc3MpIHtcbiAgICAgIGFwcGx5TmV3ID0gbmV3Q2xhc3MgJiYgaTtcbiAgICAgIGFwcGx5T2xkID0gb2xkQ2xhc3MgJiYgaSAhPT0gbDtcbiAgICAgIHN0ciA9IChhcHBseU5ldyA/IFwiPHNwYW4gY2xhc3M9J1wiICsgbmV3Q2xhc3MgKyBcIic+XCIgOiBcIlwiKSArIHRleHQuc2xpY2UoMCwgaSkuam9pbihkZWxpbWl0ZXIpICsgKGFwcGx5TmV3ID8gXCI8L3NwYW4+XCIgOiBcIlwiKSArIChhcHBseU9sZCA/IFwiPHNwYW4gY2xhc3M9J1wiICsgb2xkQ2xhc3MgKyBcIic+XCIgOiBcIlwiKSArIGRlbGltaXRlciArIG9yaWdpbmFsLnNsaWNlKGkpLmpvaW4oZGVsaW1pdGVyKSArIChhcHBseU9sZCA/IFwiPC9zcGFuPlwiIDogXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IHRleHQuc2xpY2UoMCwgaSkuam9pbihkZWxpbWl0ZXIpICsgZGVsaW1pdGVyICsgb3JpZ2luYWwuc2xpY2UoaSkuam9pbihkZWxpbWl0ZXIpO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnN2Zykge1xuICAgICAgLy9TVkcgdGV4dCBlbGVtZW50cyBkb24ndCBoYXZlIGFuIFwiaW5uZXJIVE1MXCIgaW4gTWljcm9zb2Z0IGJyb3dzZXJzLlxuICAgICAgdGFyZ2V0LnRleHRDb250ZW50ID0gc3RyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuaW5uZXJIVE1MID0gZmlsbENoYXIgPT09IFwiJm5ic3A7XCIgJiYgfnN0ci5pbmRleE9mKFwiICBcIikgPyBzdHIuc3BsaXQoXCIgIFwiKS5qb2luKFwiJm5ic3A7Jm5ic3A7XCIpIDogc3RyO1xuICAgIH1cbiAgfVxufTtcblRleHRQbHVnaW4uc3BsaXRJbm5lckhUTUwgPSBzcGxpdElubmVySFRNTDtcblRleHRQbHVnaW4uZW1vamlTYWZlU3BsaXQgPSBlbW9qaVNhZmVTcGxpdDtcblRleHRQbHVnaW4uZ2V0VGV4dCA9IGdldFRleHQ7XG5fZ2V0R1NBUCgpICYmIGdzYXAucmVnaXN0ZXJQbHVnaW4oVGV4dFBsdWdpbik7XG5leHBvcnQgeyBUZXh0UGx1Z2luIGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgZ3NhcCBmcm9tIFwiLi9nc2FwLWNvcmUuanNcIjtcbmltcG9ydCBDU1NQbHVnaW4gZnJvbSBcIi4vQ1NTUGx1Z2luLmpzXCI7XG52YXIgZ3NhcFdpdGhDU1MgPSBnc2FwLnJlZ2lzdGVyUGx1Z2luKENTU1BsdWdpbikgfHwgZ3NhcCwgLy8gdG8gcHJvdGVjdCBmcm9tIHRyZWUgc2hha2luZ1xuXHRUd2Vlbk1heFdpdGhDU1MgPSBnc2FwV2l0aENTUy5jb3JlLlR3ZWVuO1xuXG5leHBvcnQgeyBnc2FwV2l0aENTUyBhcyBnc2FwLCBnc2FwV2l0aENTUyBhcyBkZWZhdWx0LCBDU1NQbHVnaW4sIFR3ZWVuTWF4V2l0aENTUyBhcyBUd2Vlbk1heCB9O1xuZXhwb3J0IHsgVHdlZW5MaXRlLCBUaW1lbGluZU1heCwgVGltZWxpbmVMaXRlLCBQb3dlcjAsIFBvd2VyMSwgUG93ZXIyLCBQb3dlcjMsIFBvd2VyNCwgTGluZWFyLCBRdWFkLCBDdWJpYywgUXVhcnQsIFF1aW50LCBTdHJvbmcsIEVsYXN0aWMsIEJhY2ssIFN0ZXBwZWRFYXNlLCBCb3VuY2UsIFNpbmUsIEV4cG8sIENpcmMsIHdyYXAsIHdyYXBZb3lvLCBkaXN0cmlidXRlLCByYW5kb20sIHNuYXAsIG5vcm1hbGl6ZSwgZ2V0VW5pdCwgY2xhbXAsIHNwbGl0Q29sb3IsIHRvQXJyYXksIG1hcFJhbmdlLCBwaXBlLCB1bml0aXplLCBpbnRlcnBvbGF0ZSwgc2h1ZmZsZSB9IGZyb20gXCIuL2dzYXAtY29yZS5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vRHJhZ2dhYmxlLmpzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9DU1NSdWxlUGx1Z2luLmpzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9FYXNlbFBsdWdpbi5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vRWFzZVBhY2suanNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL01vdGlvblBhdGhQbHVnaW4uanNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1BpeGlQbHVnaW4uanNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1Njcm9sbFRvUGx1Z2luLmpzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9TY3JvbGxUcmlnZ2VyLmpzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UZXh0UGx1Z2luLmpzXCI7IFxuXG4vL0JPTlVTIEVYUE9SVFNcbi8vZXhwb3J0ICogZnJvbSBcIi4vQ3VzdG9tRWFzZS5qc1wiO1xuLy9leHBvcnQgKiBmcm9tIFwiLi9EcmF3U1ZHUGx1Z2luLmpzXCI7XG4vL2V4cG9ydCAqIGZyb20gXCIuL1BoeXNpY3MyRFBsdWdpbi5qc1wiO1xuLy9leHBvcnQgKiBmcm9tIFwiLi9QaHlzaWNzUHJvcHNQbHVnaW4uanNcIjtcbi8vZXhwb3J0ICogZnJvbSBcIi4vU2NyYW1ibGVUZXh0UGx1Z2luLmpzXCI7XG4vL2V4cG9ydCAqIGZyb20gXCIuL0N1c3RvbUJvdW5jZS5qc1wiO1xuLy9leHBvcnQgKiBmcm9tIFwiLi9DdXN0b21XaWdnbGUuanNcIjtcbi8vZXhwb3J0ICogZnJvbSBcIi4vR1NEZXZUb29scy5qc1wiO1xuLy9leHBvcnQgKiBmcm9tIFwiLi9JbmVydGlhUGx1Z2luLmpzXCI7XG4vL2V4cG9ydCAqIGZyb20gXCIuL01vcnBoU1ZHUGx1Z2luLmpzXCI7XG4vL2V4cG9ydCAqIGZyb20gXCIuL01vdGlvblBhdGhIZWxwZXIuanNcIjtcbi8vZXhwb3J0ICogZnJvbSBcIi4vU3BsaXRUZXh0LmpzXCI7IiwiLyohXG4gKiBtYXRyaXggMy41LjFcbiAqIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIENvcHlyaWdodCAyMDA4LTIwMjAsIEdyZWVuU29jay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9zdGFuZGFyZC1saWNlbnNlIG9yIGZvclxuICogQ2x1YiBHcmVlblNvY2sgbWVtYmVycywgdGhlIGFncmVlbWVudCBpc3N1ZWQgd2l0aCB0aGF0IG1lbWJlcnNoaXAuXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG52YXIgX2RvYyxcbiAgICBfd2luLFxuICAgIF9kb2NFbGVtZW50LFxuICAgIF9ib2R5LFxuICAgIF9kaXZDb250YWluZXIsXG4gICAgX3N2Z0NvbnRhaW5lcixcbiAgICBfaWRlbnRpdHlNYXRyaXgsXG4gICAgX3RyYW5zZm9ybVByb3AgPSBcInRyYW5zZm9ybVwiLFxuICAgIF90cmFuc2Zvcm1PcmlnaW5Qcm9wID0gX3RyYW5zZm9ybVByb3AgKyBcIk9yaWdpblwiLFxuICAgIF9oYXNPZmZzZXRCdWcsXG4gICAgX3NldERvYyA9IGZ1bmN0aW9uIF9zZXREb2MoZWxlbWVudCkge1xuICB2YXIgZG9jID0gZWxlbWVudC5vd25lckRvY3VtZW50IHx8IGVsZW1lbnQ7XG5cbiAgaWYgKCEoX3RyYW5zZm9ybVByb3AgaW4gZWxlbWVudC5zdHlsZSkgJiYgXCJtc1RyYW5zZm9ybVwiIGluIGVsZW1lbnQuc3R5bGUpIHtcbiAgICAvL3RvIGltcHJvdmUgY29tcGF0aWJpbGl0eSB3aXRoIG9sZCBNaWNyb3NvZnQgYnJvd3NlcnNcbiAgICBfdHJhbnNmb3JtUHJvcCA9IFwibXNUcmFuc2Zvcm1cIjtcbiAgICBfdHJhbnNmb3JtT3JpZ2luUHJvcCA9IF90cmFuc2Zvcm1Qcm9wICsgXCJPcmlnaW5cIjtcbiAgfVxuXG4gIHdoaWxlIChkb2MucGFyZW50Tm9kZSAmJiAoZG9jID0gZG9jLnBhcmVudE5vZGUpKSB7fVxuXG4gIF93aW4gPSB3aW5kb3c7XG4gIF9pZGVudGl0eU1hdHJpeCA9IG5ldyBNYXRyaXgyRCgpO1xuXG4gIGlmIChkb2MpIHtcbiAgICBfZG9jID0gZG9jO1xuICAgIF9kb2NFbGVtZW50ID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICBfYm9keSA9IGRvYy5ib2R5OyAvLyBub3cgdGVzdCBmb3IgdGhlIG9mZnNldCByZXBvcnRpbmcgYnVnLiBVc2UgZmVhdHVyZSBkZXRlY3Rpb24gaW5zdGVhZCBvZiBicm93c2VyIHNuaWZmaW5nIHRvIG1ha2UgdGhpbmdzIG1vcmUgYnVsbGV0cHJvb2YgYW5kIGZ1dHVyZS1wcm9vZi4gSG9wZWZ1bGx5IFNhZmFyaSB3aWxsIGZpeCB0aGVpciBidWcgc29vbiBidXQgaXQncyAyMDIwIGFuZCBpdCdzIHN0aWxsIG5vdCBmaXhlZC5cblxuICAgIHZhciBkMSA9IGRvYy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgICAgICBkMiA9IGRvYy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgX2JvZHkuYXBwZW5kQ2hpbGQoZDEpO1xuXG4gICAgZDEuYXBwZW5kQ2hpbGQoZDIpO1xuICAgIGQxLnN0eWxlLnBvc2l0aW9uID0gXCJzdGF0aWNcIjtcbiAgICBkMS5zdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSBcInRyYW5zbGF0ZTNkKDAsMCwxcHgpXCI7XG4gICAgX2hhc09mZnNldEJ1ZyA9IGQyLm9mZnNldFBhcmVudCAhPT0gZDE7XG5cbiAgICBfYm9keS5yZW1vdmVDaGlsZChkMSk7XG4gIH1cblxuICByZXR1cm4gZG9jO1xufSxcbiAgICBfZm9yY2VOb25aZXJvU2NhbGUgPSBmdW5jdGlvbiBfZm9yY2VOb25aZXJvU2NhbGUoZSkge1xuICAvLyB3YWxrcyB1cCB0aGUgZWxlbWVudCdzIGFuY2VzdG9ycyBhbmQgZmluZHMgYW55IHRoYXQgaGFkIHRoZWlyIHNjYWxlIHNldCB0byAwIHZpYSBHU0FQLCBhbmQgY2hhbmdlcyB0aGVtIHRvIDAuMDAwMSB0byBlbnN1cmUgdGhhdCBtZWFzdXJlbWVudHMgd29ya1xuICB2YXIgYSwgY2FjaGU7XG5cbiAgd2hpbGUgKGUgJiYgZSAhPT0gX2JvZHkpIHtcbiAgICBjYWNoZSA9IGUuX2dzYXA7XG5cbiAgICBpZiAoY2FjaGUgJiYgIWNhY2hlLnNjYWxlWCAmJiAhY2FjaGUuc2NhbGVZICYmIGNhY2hlLnJlbmRlclRyYW5zZm9ybSkge1xuICAgICAgY2FjaGUuc2NhbGVYID0gY2FjaGUuc2NhbGVZID0gMWUtNDtcbiAgICAgIGNhY2hlLnJlbmRlclRyYW5zZm9ybSgxLCBjYWNoZSk7XG4gICAgICBhID8gYS5wdXNoKGNhY2hlKSA6IGEgPSBbY2FjaGVdO1xuICAgIH1cblxuICAgIGUgPSBlLnBhcmVudE5vZGU7XG4gIH1cblxuICByZXR1cm4gYTtcbn0sXG4gICAgLy8gcG9zc2libGUgZnV0dXJlIGFkZGl0aW9uOiBwYXNzIGFuIGVsZW1lbnQgdG8gX2ZvcmNlRGlzcGxheSgpIGFuZCBpdCdsbCB3YWxrIHVwIGFsbCBpdHMgYW5jZXN0b3JzIGFuZCBtYWtlIHN1cmUgYW55dGhpbmcgd2l0aCBkaXNwbGF5OiBub25lIGlzIHNldCB0byBkaXNwbGF5OiBibG9jaywgYW5kIGlmIHRoZXJlJ3Mgbm8gcGFyZW50Tm9kZSwgaXQnbGwgYWRkIGl0IHRvIHRoZSBib2R5LiBJdCByZXR1cm5zIGFuIEFycmF5IHRoYXQgeW91IGNhbiB0aGVuIGZlZWQgdG8gX3JldmVydERpc3BsYXkoKSB0byBoYXZlIGl0IHJldmVydCBhbGwgdGhlIGNoYW5nZXMgaXQgbWFkZS5cbi8vIF9mb3JjZURpc3BsYXkgPSBlID0+IHtcbi8vIFx0bGV0IGEgPSBbXSxcbi8vIFx0XHRwYXJlbnQ7XG4vLyBcdHdoaWxlIChlICYmIGUgIT09IF9ib2R5KSB7XG4vLyBcdFx0cGFyZW50ID0gZS5wYXJlbnROb2RlO1xuLy8gXHRcdChfd2luLmdldENvbXB1dGVkU3R5bGUoZSkuZGlzcGxheSA9PT0gXCJub25lXCIgfHwgIXBhcmVudCkgJiYgYS5wdXNoKGUsIGUuc3R5bGUuZGlzcGxheSwgcGFyZW50KSAmJiAoZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiKTtcbi8vIFx0XHRwYXJlbnQgfHwgX2JvZHkuYXBwZW5kQ2hpbGQoZSk7XG4vLyBcdFx0ZSA9IHBhcmVudDtcbi8vIFx0fVxuLy8gXHRyZXR1cm4gYTtcbi8vIH0sXG4vLyBfcmV2ZXJ0RGlzcGxheSA9IGEgPT4ge1xuLy8gXHRmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKz0zKSB7XG4vLyBcdFx0YVtpKzFdID8gKGFbaV0uc3R5bGUuZGlzcGxheSA9IGFbaSsxXSkgOiBhW2ldLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZGlzcGxheVwiKTtcbi8vIFx0XHRhW2krMl0gfHwgYVtpXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGFbaV0pO1xuLy8gXHR9XG4vLyB9LFxuX3N2Z1RlbXBzID0gW10sXG4gICAgLy93ZSBjcmVhdGUgMyBlbGVtZW50cyBmb3IgU1ZHLCBhbmQgMyBmb3Igb3RoZXIgRE9NIGVsZW1lbnRzIGFuZCBjYWNoZSB0aGVtIGZvciBwZXJmb3JtYW5jZSByZWFzb25zLiBUaGV5IGdldCBuZXN0ZWQgaW4gX2RpdkNvbnRhaW5lciBhbmQgX3N2Z0NvbnRhaW5lciBzbyB0aGF0IGp1c3Qgb25lIGVsZW1lbnQgaXMgYWRkZWQgdG8gdGhlIERPTSBvbiBlYWNoIHN1Y2Nlc3NpdmUgYXR0ZW1wdC4gQWdhaW4sIHBlcmZvcm1hbmNlIGlzIGtleS5cbl9kaXZUZW1wcyA9IFtdLFxuICAgIF9nZXREb2NTY3JvbGxUb3AgPSBmdW5jdGlvbiBfZ2V0RG9jU2Nyb2xsVG9wKCkge1xuICByZXR1cm4gX3dpbi5wYWdlWU9mZnNldCB8fCBfZG9jLnNjcm9sbFRvcCB8fCBfZG9jRWxlbWVudC5zY3JvbGxUb3AgfHwgX2JvZHkuc2Nyb2xsVG9wIHx8IDA7XG59LFxuICAgIF9nZXREb2NTY3JvbGxMZWZ0ID0gZnVuY3Rpb24gX2dldERvY1Njcm9sbExlZnQoKSB7XG4gIHJldHVybiBfd2luLnBhZ2VYT2Zmc2V0IHx8IF9kb2Muc2Nyb2xsTGVmdCB8fCBfZG9jRWxlbWVudC5zY3JvbGxMZWZ0IHx8IF9ib2R5LnNjcm9sbExlZnQgfHwgMDtcbn0sXG4gICAgX3N2Z093bmVyID0gZnVuY3Rpb24gX3N2Z093bmVyKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQub3duZXJTVkdFbGVtZW50IHx8ICgoZWxlbWVudC50YWdOYW1lICsgXCJcIikudG9Mb3dlckNhc2UoKSA9PT0gXCJzdmdcIiA/IGVsZW1lbnQgOiBudWxsKTtcbn0sXG4gICAgX2lzRml4ZWQgPSBmdW5jdGlvbiBfaXNGaXhlZChlbGVtZW50KSB7XG4gIGlmIChfd2luLmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gPT09IFwiZml4ZWRcIikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgLy8gYXZvaWQgZG9jdW1lbnQgZnJhZ21lbnRzIHdoaWNoIHdpbGwgdGhyb3cgYW4gZXJyb3IuXG4gICAgcmV0dXJuIF9pc0ZpeGVkKGVsZW1lbnQpO1xuICB9XG59LFxuICAgIF9jcmVhdGVTaWJsaW5nID0gZnVuY3Rpb24gX2NyZWF0ZVNpYmxpbmcoZWxlbWVudCwgaSkge1xuICBpZiAoZWxlbWVudC5wYXJlbnROb2RlICYmIChfZG9jIHx8IF9zZXREb2MoZWxlbWVudCkpKSB7XG4gICAgdmFyIHN2ZyA9IF9zdmdPd25lcihlbGVtZW50KSxcbiAgICAgICAgbnMgPSBzdmcgPyBzdmcuZ2V0QXR0cmlidXRlKFwieG1sbnNcIikgfHwgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIDogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsXG4gICAgICAgIHR5cGUgPSBzdmcgPyBpID8gXCJyZWN0XCIgOiBcImdcIiA6IFwiZGl2XCIsXG4gICAgICAgIHggPSBpICE9PSAyID8gMCA6IDEwMCxcbiAgICAgICAgeSA9IGkgPT09IDMgPyAxMDAgOiAwLFxuICAgICAgICBjc3MgPSBcInBvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6YmxvY2s7cG9pbnRlci1ldmVudHM6bm9uZTtcIixcbiAgICAgICAgZSA9IF9kb2MuY3JlYXRlRWxlbWVudE5TID8gX2RvYy5jcmVhdGVFbGVtZW50TlMobnMucmVwbGFjZSgvXmh0dHBzLywgXCJodHRwXCIpLCB0eXBlKSA6IF9kb2MuY3JlYXRlRWxlbWVudCh0eXBlKTtcblxuICAgIGlmIChpKSB7XG4gICAgICBpZiAoIXN2Zykge1xuICAgICAgICBpZiAoIV9kaXZDb250YWluZXIpIHtcbiAgICAgICAgICBfZGl2Q29udGFpbmVyID0gX2NyZWF0ZVNpYmxpbmcoZWxlbWVudCk7XG4gICAgICAgICAgX2RpdkNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gY3NzO1xuICAgICAgICB9XG5cbiAgICAgICAgZS5zdHlsZS5jc3NUZXh0ID0gY3NzICsgXCJ3aWR0aDowLjFweDtoZWlnaHQ6MC4xcHg7dG9wOlwiICsgeSArIFwicHg7bGVmdDpcIiArIHggKyBcInB4XCI7XG5cbiAgICAgICAgX2RpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghX3N2Z0NvbnRhaW5lcikge1xuICAgICAgICAgIF9zdmdDb250YWluZXIgPSBfY3JlYXRlU2libGluZyhlbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGUuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgMC4wMSk7XG4gICAgICAgIGUuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIDAuMDEpO1xuICAgICAgICBlLnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArIHggKyBcIixcIiArIHkgKyBcIilcIik7XG5cbiAgICAgICAgX3N2Z0NvbnRhaW5lci5hcHBlbmRDaGlsZChlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZTtcbiAgfVxuXG4gIHRocm93IFwiTmVlZCBkb2N1bWVudCBhbmQgcGFyZW50LlwiO1xufSxcbiAgICBfY29uc29saWRhdGUgPSBmdW5jdGlvbiBfY29uc29saWRhdGUobSkge1xuICAvLyByZXBsYWNlcyBTVkdUcmFuc2Zvcm1MaXN0LmNvbnNvbGlkYXRlKCkgYmVjYXVzZSBhIGJ1ZyBpbiBGaXJlZm94IGNhdXNlcyBpdCB0byBicmVhayBwb2ludGVyIGV2ZW50cy4gU2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjMyNDgtdG91Y2gtaXMtbm90LXdvcmtpbmctb24tZHJhZ2dhYmxlLWluLWZpcmVmb3gtd2luZG93cy12MzI0Lz90YWI9Y29tbWVudHMjY29tbWVudC0xMDk4MDBcbiAgdmFyIGMgPSBuZXcgTWF0cml4MkQoKSxcbiAgICAgIGkgPSAwO1xuXG4gIGZvciAoOyBpIDwgbS5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICBjLm11bHRpcGx5KG0uZ2V0SXRlbShpKS5tYXRyaXgpO1xuICB9XG5cbiAgcmV0dXJuIGM7XG59LFxuICAgIF9wbGFjZVNpYmxpbmdzID0gZnVuY3Rpb24gX3BsYWNlU2libGluZ3MoZWxlbWVudCwgYWRqdXN0R09mZnNldCkge1xuICB2YXIgc3ZnID0gX3N2Z093bmVyKGVsZW1lbnQpLFxuICAgICAgaXNSb290U1ZHID0gZWxlbWVudCA9PT0gc3ZnLFxuICAgICAgc2libGluZ3MgPSBzdmcgPyBfc3ZnVGVtcHMgOiBfZGl2VGVtcHMsXG4gICAgICBjb250YWluZXIsXG4gICAgICBtLFxuICAgICAgYixcbiAgICAgIHgsXG4gICAgICB5O1xuXG4gIGlmIChlbGVtZW50ID09PSBfd2luKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBpZiAoIXNpYmxpbmdzLmxlbmd0aCkge1xuICAgIHNpYmxpbmdzLnB1c2goX2NyZWF0ZVNpYmxpbmcoZWxlbWVudCwgMSksIF9jcmVhdGVTaWJsaW5nKGVsZW1lbnQsIDIpLCBfY3JlYXRlU2libGluZyhlbGVtZW50LCAzKSk7XG4gIH1cblxuICBjb250YWluZXIgPSBzdmcgPyBfc3ZnQ29udGFpbmVyIDogX2RpdkNvbnRhaW5lcjtcblxuICBpZiAoc3ZnKSB7XG4gICAgYiA9IGlzUm9vdFNWRyA/IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfSA6IGVsZW1lbnQuZ2V0QkJveCgpO1xuICAgIG0gPSBlbGVtZW50LnRyYW5zZm9ybSA/IGVsZW1lbnQudHJhbnNmb3JtLmJhc2VWYWwgOiB7fTsgLy8gSUUxMSBkb2Vzbid0IGZvbGxvdyB0aGUgc3BlYy5cblxuICAgIGlmIChtLm51bWJlck9mSXRlbXMpIHtcbiAgICAgIG0gPSBtLm51bWJlck9mSXRlbXMgPiAxID8gX2NvbnNvbGlkYXRlKG0pIDogbS5nZXRJdGVtKDApLm1hdHJpeDsgLy8gZG9uJ3QgY2FsbCBtLmNvbnNvbGlkYXRlKCkubWF0cml4IGJlY2F1c2UgYSBidWcgaW4gRmlyZWZveCBtYWtlcyBwb2ludGVyIGV2ZW50cyBub3Qgd29yayB3aGVuIGNvbnNvbGlkYXRlKCkgaXMgY2FsbGVkIG9uIHRoZSBzYW1lIHRpY2sgYXMgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkhIFNlZSBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzIzMjQ4LXRvdWNoLWlzLW5vdC13b3JraW5nLW9uLWRyYWdnYWJsZS1pbi1maXJlZm94LXdpbmRvd3MtdjMyNC8/dGFiPWNvbW1lbnRzI2NvbW1lbnQtMTA5ODAwXG5cbiAgICAgIHggPSBtLmEgKiBiLnggKyBtLmMgKiBiLnk7XG4gICAgICB5ID0gbS5iICogYi54ICsgbS5kICogYi55O1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gX2lkZW50aXR5TWF0cml4O1xuICAgICAgeCA9IGIueDtcbiAgICAgIHkgPSBiLnk7XG4gICAgfVxuXG4gICAgaWYgKGFkanVzdEdPZmZzZXQgJiYgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiZ1wiKSB7XG4gICAgICB4ID0geSA9IDA7XG4gICAgfVxuXG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBcIm1hdHJpeChcIiArIG0uYSArIFwiLFwiICsgbS5iICsgXCIsXCIgKyBtLmMgKyBcIixcIiArIG0uZCArIFwiLFwiICsgKG0uZSArIHgpICsgXCIsXCIgKyAobS5mICsgeSkgKyBcIilcIik7XG4gICAgKGlzUm9vdFNWRyA/IHN2ZyA6IGVsZW1lbnQucGFyZW50Tm9kZSkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgfSBlbHNlIHtcbiAgICB4ID0geSA9IDA7XG5cbiAgICBpZiAoX2hhc09mZnNldEJ1Zykge1xuICAgICAgLy8gc29tZSBicm93c2VycyAobGlrZSBTYWZhcmkpIGhhdmUgYSBidWcgdGhhdCBjYXVzZXMgdGhlbSB0byBtaXNyZXBvcnQgb2Zmc2V0IHZhbHVlcy4gV2hlbiBhbiBhbmNlc3RvciBlbGVtZW50IGhhcyBhIHRyYW5zZm9ybSBhcHBsaWVkLCBpdCdzIHN1cHBvc2VkIHRvIHRyZWF0IGl0IGFzIGlmIGl0J3MgcG9zaXRpb246IHJlbGF0aXZlIChuZXcgY29udGV4dCkuIFNhZmFyaSBib3RjaGVzIHRoaXMsIHNvIHdlIG5lZWQgdG8gZmluZCB0aGUgY2xvc2VzdCBhbmNlc3RvciAoYmV0d2VlbiB0aGUgZWxlbWVudCBhbmQgaXRzIG9mZnNldFBhcmVudCkgdGhhdCBoYXMgYSB0cmFuc2Zvcm0gYXBwbGllZCBhbmQgaWYgb25lIGlzIGZvdW5kLCBncmFiIGl0cyBvZmZzZXRUb3AvTGVmdCBhbmQgc3VidHJhY3QgdGhlbSB0byBjb21wZW5zYXRlLlxuICAgICAgbSA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgICAgYiA9IGVsZW1lbnQ7XG5cbiAgICAgIHdoaWxlIChiICYmIChiID0gYi5wYXJlbnROb2RlKSAmJiBiICE9PSBtICYmIGIucGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAoKF93aW4uZ2V0Q29tcHV0ZWRTdHlsZShiKVtfdHJhbnNmb3JtUHJvcF0gKyBcIlwiKS5sZW5ndGggPiA0KSB7XG4gICAgICAgICAgeCA9IGIub2Zmc2V0TGVmdDtcbiAgICAgICAgICB5ID0gYi5vZmZzZXRUb3A7XG4gICAgICAgICAgYiA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBiID0gY29udGFpbmVyLnN0eWxlO1xuICAgIGIudG9wID0gZWxlbWVudC5vZmZzZXRUb3AgLSB5ICsgXCJweFwiO1xuICAgIGIubGVmdCA9IGVsZW1lbnQub2Zmc2V0TGVmdCAtIHggKyBcInB4XCI7XG4gICAgbSA9IF93aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgICBiW190cmFuc2Zvcm1Qcm9wXSA9IG1bX3RyYW5zZm9ybVByb3BdO1xuICAgIGJbX3RyYW5zZm9ybU9yaWdpblByb3BdID0gbVtfdHJhbnNmb3JtT3JpZ2luUHJvcF07XG4gICAgYi5ib3JkZXIgPSBtLmJvcmRlcjtcbiAgICBiLmJvcmRlckxlZnRTdHlsZSA9IG0uYm9yZGVyTGVmdFN0eWxlO1xuICAgIGIuYm9yZGVyVG9wU3R5bGUgPSBtLmJvcmRlclRvcFN0eWxlO1xuICAgIGIuYm9yZGVyTGVmdFdpZHRoID0gbS5ib3JkZXJMZWZ0V2lkdGg7XG4gICAgYi5ib3JkZXJUb3BXaWR0aCA9IG0uYm9yZGVyVG9wV2lkdGg7XG4gICAgYi5wb3NpdGlvbiA9IG0ucG9zaXRpb24gPT09IFwiZml4ZWRcIiA/IFwiZml4ZWRcIiA6IFwiYWJzb2x1dGVcIjtcbiAgICBlbGVtZW50LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgfVxuXG4gIHJldHVybiBjb250YWluZXI7XG59LFxuICAgIF9zZXRNYXRyaXggPSBmdW5jdGlvbiBfc2V0TWF0cml4KG0sIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgbS5hID0gYTtcbiAgbS5iID0gYjtcbiAgbS5jID0gYztcbiAgbS5kID0gZDtcbiAgbS5lID0gZTtcbiAgbS5mID0gZjtcbiAgcmV0dXJuIG07XG59O1xuXG5leHBvcnQgdmFyIE1hdHJpeDJEID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWF0cml4MkQoYSwgYiwgYywgZCwgZSwgZikge1xuICAgIGlmIChhID09PSB2b2lkIDApIHtcbiAgICAgIGEgPSAxO1xuICAgIH1cblxuICAgIGlmIChiID09PSB2b2lkIDApIHtcbiAgICAgIGIgPSAwO1xuICAgIH1cblxuICAgIGlmIChjID09PSB2b2lkIDApIHtcbiAgICAgIGMgPSAwO1xuICAgIH1cblxuICAgIGlmIChkID09PSB2b2lkIDApIHtcbiAgICAgIGQgPSAxO1xuICAgIH1cblxuICAgIGlmIChlID09PSB2b2lkIDApIHtcbiAgICAgIGUgPSAwO1xuICAgIH1cblxuICAgIGlmIChmID09PSB2b2lkIDApIHtcbiAgICAgIGYgPSAwO1xuICAgIH1cblxuICAgIF9zZXRNYXRyaXgodGhpcywgYSwgYiwgYywgZCwgZSwgZik7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTWF0cml4MkQucHJvdG90eXBlO1xuXG4gIF9wcm90by5pbnZlcnNlID0gZnVuY3Rpb24gaW52ZXJzZSgpIHtcbiAgICB2YXIgYSA9IHRoaXMuYSxcbiAgICAgICAgYiA9IHRoaXMuYixcbiAgICAgICAgYyA9IHRoaXMuYyxcbiAgICAgICAgZCA9IHRoaXMuZCxcbiAgICAgICAgZSA9IHRoaXMuZSxcbiAgICAgICAgZiA9IHRoaXMuZixcbiAgICAgICAgZGV0ZXJtaW5hbnQgPSBhICogZCAtIGIgKiBjIHx8IDFlLTEwO1xuICAgIHJldHVybiBfc2V0TWF0cml4KHRoaXMsIGQgLyBkZXRlcm1pbmFudCwgLWIgLyBkZXRlcm1pbmFudCwgLWMgLyBkZXRlcm1pbmFudCwgYSAvIGRldGVybWluYW50LCAoYyAqIGYgLSBkICogZSkgLyBkZXRlcm1pbmFudCwgLShhICogZiAtIGIgKiBlKSAvIGRldGVybWluYW50KTtcbiAgfTtcblxuICBfcHJvdG8ubXVsdGlwbHkgPSBmdW5jdGlvbiBtdWx0aXBseShtYXRyaXgpIHtcbiAgICB2YXIgYSA9IHRoaXMuYSxcbiAgICAgICAgYiA9IHRoaXMuYixcbiAgICAgICAgYyA9IHRoaXMuYyxcbiAgICAgICAgZCA9IHRoaXMuZCxcbiAgICAgICAgZSA9IHRoaXMuZSxcbiAgICAgICAgZiA9IHRoaXMuZixcbiAgICAgICAgYTIgPSBtYXRyaXguYSxcbiAgICAgICAgYjIgPSBtYXRyaXguYyxcbiAgICAgICAgYzIgPSBtYXRyaXguYixcbiAgICAgICAgZDIgPSBtYXRyaXguZCxcbiAgICAgICAgZTIgPSBtYXRyaXguZSxcbiAgICAgICAgZjIgPSBtYXRyaXguZjtcbiAgICByZXR1cm4gX3NldE1hdHJpeCh0aGlzLCBhMiAqIGEgKyBjMiAqIGMsIGEyICogYiArIGMyICogZCwgYjIgKiBhICsgZDIgKiBjLCBiMiAqIGIgKyBkMiAqIGQsIGUgKyBlMiAqIGEgKyBmMiAqIGMsIGYgKyBlMiAqIGIgKyBmMiAqIGQpO1xuICB9O1xuXG4gIF9wcm90by5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgTWF0cml4MkQodGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgdGhpcy5kLCB0aGlzLmUsIHRoaXMuZik7XG4gIH07XG5cbiAgX3Byb3RvLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyhtYXRyaXgpIHtcbiAgICB2YXIgYSA9IHRoaXMuYSxcbiAgICAgICAgYiA9IHRoaXMuYixcbiAgICAgICAgYyA9IHRoaXMuYyxcbiAgICAgICAgZCA9IHRoaXMuZCxcbiAgICAgICAgZSA9IHRoaXMuZSxcbiAgICAgICAgZiA9IHRoaXMuZjtcbiAgICByZXR1cm4gYSA9PT0gbWF0cml4LmEgJiYgYiA9PT0gbWF0cml4LmIgJiYgYyA9PT0gbWF0cml4LmMgJiYgZCA9PT0gbWF0cml4LmQgJiYgZSA9PT0gbWF0cml4LmUgJiYgZiA9PT0gbWF0cml4LmY7XG4gIH07XG5cbiAgX3Byb3RvLmFwcGx5ID0gZnVuY3Rpb24gYXBwbHkocG9pbnQsIGRlY29yYXRlZSkge1xuICAgIGlmIChkZWNvcmF0ZWUgPT09IHZvaWQgMCkge1xuICAgICAgZGVjb3JhdGVlID0ge307XG4gICAgfVxuXG4gICAgdmFyIHggPSBwb2ludC54LFxuICAgICAgICB5ID0gcG9pbnQueSxcbiAgICAgICAgYSA9IHRoaXMuYSxcbiAgICAgICAgYiA9IHRoaXMuYixcbiAgICAgICAgYyA9IHRoaXMuYyxcbiAgICAgICAgZCA9IHRoaXMuZCxcbiAgICAgICAgZSA9IHRoaXMuZSxcbiAgICAgICAgZiA9IHRoaXMuZjtcbiAgICBkZWNvcmF0ZWUueCA9IHggKiBhICsgeSAqIGMgKyBlIHx8IDA7XG4gICAgZGVjb3JhdGVlLnkgPSB4ICogYiArIHkgKiBkICsgZiB8fCAwO1xuICAgIHJldHVybiBkZWNvcmF0ZWU7XG4gIH07XG5cbiAgcmV0dXJuIE1hdHJpeDJEO1xufSgpOyAvL2ZlZWQgaW4gYW4gZWxlbWVudCBhbmQgaXQnbGwgcmV0dXJuIGEgMkQgbWF0cml4IChvcHRpb25hbGx5IGludmVydGVkKSBzbyB0aGF0IHlvdSBjYW4gdHJhbnNsYXRlIGJldHdlZW4gY29vcmRpbmF0ZSBzcGFjZXMuXG4vLyBJbnZlcnRpbmcgbGV0cyB5b3UgdHJhbnNsYXRlIGEgZ2xvYmFsIHBvaW50IGludG8gYSBsb2NhbCBjb29yZGluYXRlIHNwYWNlLiBObyBpbnZlcnRpbmcgbGV0cyB5b3UgZ28gdGhlIG90aGVyIHdheS5cbi8vIFdlIG5lZWRlZCB0aGlzIHRvIHdvcmsgYXJvdW5kIHZhcmlvdXMgYnJvd3NlciBidWdzLCBsaWtlIEZpcmVmb3ggZG9lc24ndCBhY2N1cmF0ZWx5IHJlcG9ydCBnZXRTY3JlZW5DVE0oKSB3aGVuIHRoZXJlXG4vLyBhcmUgdHJhbnNmb3JtcyBhcHBsaWVkIHRvIGFuY2VzdG9yIGVsZW1lbnRzLlxuLy8gVGhlIG1hdHJpeCBtYXRoIHRvIGNvbnZlcnQgYW55IHgveSBjb29yZGluYXRlIGlzIGFzIGZvbGxvd3MsIHdoaWNoIGlzIHdyYXBwZWQgaW4gYSBjb252ZW5pZW50IGFwcGx5KCkgbWV0aG9kIG9mIE1hdHJpeDJEIGFib3ZlOlxuLy8gICAgIHR4ID0gbS5hICogeCArIG0uYyAqIHkgKyBtLmVcbi8vICAgICB0eSA9IG0uYiAqIHggKyBtLmQgKiB5ICsgbS5mXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHbG9iYWxNYXRyaXgoZWxlbWVudCwgaW52ZXJzZSwgYWRqdXN0R09mZnNldCkge1xuICAvLyBhZGp1c3RHT2Zmc2V0IGlzIHR5cGljYWxseSB1c2VkIG9ubHkgd2hlbiBncmFiYmluZyBhbiBlbGVtZW50J3MgUEFSRU5UJ3MgZ2xvYmFsIG1hdHJpeCwgYW5kIGl0IGlnbm9yZXMgdGhlIHgveSBvZmZzZXQgb2YgYW55IFNWRyA8Zz4gZWxlbWVudHMgYmVjYXVzZSB0aGV5IGJlaGF2ZSBpbiBhIHNwZWNpYWwgd2F5LlxuICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQucGFyZW50Tm9kZSB8fCAoX2RvYyB8fCBfc2V0RG9jKGVsZW1lbnQpKS5kb2N1bWVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeDJEKCk7XG4gIH1cblxuICB2YXIgemVyb1NjYWxlcyA9IF9mb3JjZU5vblplcm9TY2FsZShlbGVtZW50LnBhcmVudE5vZGUpLFxuICAgICAgc3ZnID0gX3N2Z093bmVyKGVsZW1lbnQpLFxuICAgICAgdGVtcHMgPSBzdmcgPyBfc3ZnVGVtcHMgOiBfZGl2VGVtcHMsXG4gICAgICBjb250YWluZXIgPSBfcGxhY2VTaWJsaW5ncyhlbGVtZW50LCBhZGp1c3RHT2Zmc2V0KSxcbiAgICAgIGIxID0gdGVtcHNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBiMiA9IHRlbXBzWzFdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgYjMgPSB0ZW1wc1syXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIHBhcmVudCA9IGNvbnRhaW5lci5wYXJlbnROb2RlLFxuICAgICAgaXNGaXhlZCA9IF9pc0ZpeGVkKGVsZW1lbnQpLFxuICAgICAgbSA9IG5ldyBNYXRyaXgyRCgoYjIubGVmdCAtIGIxLmxlZnQpIC8gMTAwLCAoYjIudG9wIC0gYjEudG9wKSAvIDEwMCwgKGIzLmxlZnQgLSBiMS5sZWZ0KSAvIDEwMCwgKGIzLnRvcCAtIGIxLnRvcCkgLyAxMDAsIGIxLmxlZnQgKyAoaXNGaXhlZCA/IDAgOiBfZ2V0RG9jU2Nyb2xsTGVmdCgpKSwgYjEudG9wICsgKGlzRml4ZWQgPyAwIDogX2dldERvY1Njcm9sbFRvcCgpKSk7XG5cbiAgcGFyZW50LnJlbW92ZUNoaWxkKGNvbnRhaW5lcik7XG5cbiAgaWYgKHplcm9TY2FsZXMpIHtcbiAgICBiMSA9IHplcm9TY2FsZXMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGIxLS0pIHtcbiAgICAgIGIyID0gemVyb1NjYWxlc1tiMV07XG4gICAgICBiMi5zY2FsZVggPSBiMi5zY2FsZVkgPSAwO1xuICAgICAgYjIucmVuZGVyVHJhbnNmb3JtKDEsIGIyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW52ZXJzZSA/IG0uaW52ZXJzZSgpIDogbTtcbn0gLy8gZXhwb3J0IGZ1bmN0aW9uIGdldE1hdHJpeChlbGVtZW50KSB7XG4vLyBcdF9kb2MgfHwgX3NldERvYyhlbGVtZW50KTtcbi8vIFx0bGV0IG0gPSAoX3dpbi5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpW190cmFuc2Zvcm1Qcm9wXSArIFwiXCIpLnN1YnN0cig3KS5tYXRjaCgvWy0uXSpcXGQrWy5lXFwtK10qXFxkKltlXFwtXFwrXSpcXGQqL2cpLFxuLy8gXHRcdGlzMkQgPSBtICYmIG0ubGVuZ3RoID09PSA2O1xuLy8gXHRyZXR1cm4gIW0gfHwgbS5sZW5ndGggPCA2ID8gbmV3IE1hdHJpeDJEKCkgOiBuZXcgTWF0cml4MkQoK21bMF0sICttWzFdLCArbVtpczJEID8gMiA6IDRdLCArbVtpczJEID8gMyA6IDVdLCArbVtpczJEID8gNCA6IDEyXSwgK21baXMyRCA/IDUgOiAxM10pO1xuLy8gfSIsIi8qIVxuICogcGF0aHMgMy41LjFcbiAqIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIENvcHlyaWdodCAyMDA4LTIwMjAsIEdyZWVuU29jay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9zdGFuZGFyZC1saWNlbnNlIG9yIGZvclxuICogQ2x1YiBHcmVlblNvY2sgbWVtYmVycywgdGhlIGFncmVlbWVudCBpc3N1ZWQgd2l0aCB0aGF0IG1lbWJlcnNoaXAuXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG52YXIgX3N2Z1BhdGhFeHAgPSAvW2FjaGxtcXN0dnpdfCgtP1xcZCpcXC4/XFxkKig/OmVbXFwtK10/XFxkKyk/KVswLTldL2lnLFxuICAgIF9udW1iZXJzRXhwID0gLyg/OigtKT9cXGQqXFwuP1xcZCooPzplW1xcLStdP1xcZCspPylbMC05XS9pZyxcbiAgICBfc2NpZW50aWZpYyA9IC9bXFwrXFwtXT9cXGQqXFwuP1xcZCtlW1xcK1xcLV0/XFxkKy9pZyxcbiAgICBfc2VsZWN0b3JFeHAgPSAvKF5bI1xcLl1bYS16XXxbYS15XVthLXpdKS9pLFxuICAgIF9ERUcyUkFEID0gTWF0aC5QSSAvIDE4MCxcbiAgICBfUkFEMkRFRyA9IDE4MCAvIE1hdGguUEksXG4gICAgX3NpbiA9IE1hdGguc2luLFxuICAgIF9jb3MgPSBNYXRoLmNvcyxcbiAgICBfYWJzID0gTWF0aC5hYnMsXG4gICAgX3NxcnQgPSBNYXRoLnNxcnQsXG4gICAgX2F0YW4yID0gTWF0aC5hdGFuMixcbiAgICBfbGFyZ2VOdW0gPSAxZTgsXG4gICAgX2lzU3RyaW5nID0gZnVuY3Rpb24gX2lzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCI7XG59LFxuICAgIF9pc051bWJlciA9IGZ1bmN0aW9uIF9pc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufSxcbiAgICBfaXNVbmRlZmluZWQgPSBmdW5jdGlvbiBfaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn0sXG4gICAgX3RlbXAgPSB7fSxcbiAgICBfdGVtcDIgPSB7fSxcbiAgICBfcm91bmRpbmdOdW0gPSAxZTUsXG4gICAgX3dyYXBQcm9ncmVzcyA9IGZ1bmN0aW9uIF93cmFwUHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQoKHByb2dyZXNzICsgX2xhcmdlTnVtKSAlIDEgKiBfcm91bmRpbmdOdW0pIC8gX3JvdW5kaW5nTnVtIHx8IChwcm9ncmVzcyA8IDAgPyAwIDogMSk7XG59LFxuICAgIC8vaWYgcHJvZ3Jlc3MgbGFuZHMgb24gMSwgdGhlICUgd2lsbCBtYWtlIGl0IDAgd2hpY2ggaXMgd2h5IHdlIHx8IDEsIGJ1dCBub3QgaWYgaXQncyBuZWdhdGl2ZSBiZWNhdXNlIGl0IG1ha2VzIG1vcmUgc2Vuc2UgZm9yIG1vdGlvbiB0byBlbmQgYXQgMCBpbiB0aGF0IGNhc2UuXG5fcm91bmQgPSBmdW5jdGlvbiBfcm91bmQodmFsdWUpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBfcm91bmRpbmdOdW0pIC8gX3JvdW5kaW5nTnVtIHx8IDA7XG59LFxuICAgIF9zcGxpdFNlZ21lbnQgPSBmdW5jdGlvbiBfc3BsaXRTZWdtZW50KHJhd1BhdGgsIHNlZ0luZGV4LCBpLCB0KSB7XG4gIHZhciBzZWdtZW50ID0gcmF3UGF0aFtzZWdJbmRleF0sXG4gICAgICBzaGlmdCA9IHQgPT09IDEgPyA2IDogc3ViZGl2aWRlU2VnbWVudChzZWdtZW50LCBpLCB0KTtcblxuICBpZiAoc2hpZnQgJiYgc2hpZnQgKyBpICsgMiA8IHNlZ21lbnQubGVuZ3RoKSB7XG4gICAgcmF3UGF0aC5zcGxpY2Uoc2VnSW5kZXgsIDAsIHNlZ21lbnQuc2xpY2UoMCwgaSArIHNoaWZ0ICsgMikpO1xuICAgIHNlZ21lbnQuc3BsaWNlKDAsIGkgKyBzaGlmdCk7XG4gICAgcmV0dXJuIDE7XG4gIH1cbn0sXG4gICAgX3JldmVyc2VSYXdQYXRoID0gZnVuY3Rpb24gX3JldmVyc2VSYXdQYXRoKHJhd1BhdGgsIHNraXBPdXRlcikge1xuICB2YXIgaSA9IHJhd1BhdGgubGVuZ3RoO1xuXG4gIGlmICghc2tpcE91dGVyKSB7XG4gICAgcmF3UGF0aC5yZXZlcnNlKCk7XG4gIH1cblxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWYgKCFyYXdQYXRoW2ldLnJldmVyc2VkKSB7XG4gICAgICByZXZlcnNlU2VnbWVudChyYXdQYXRoW2ldKTtcbiAgICB9XG4gIH1cbn0sXG4gICAgX2NvcHlNZXRhRGF0YSA9IGZ1bmN0aW9uIF9jb3B5TWV0YURhdGEoc291cmNlLCBjb3B5KSB7XG4gIGNvcHkudG90YWxMZW5ndGggPSBzb3VyY2UudG90YWxMZW5ndGg7XG5cbiAgaWYgKHNvdXJjZS5zYW1wbGVzKSB7XG4gICAgLy9zZWdtZW50XG4gICAgY29weS5zYW1wbGVzID0gc291cmNlLnNhbXBsZXMuc2xpY2UoMCk7XG4gICAgY29weS5sb29rdXAgPSBzb3VyY2UubG9va3VwLnNsaWNlKDApO1xuICAgIGNvcHkubWluTGVuZ3RoID0gc291cmNlLm1pbkxlbmd0aDtcbiAgICBjb3B5LnJlc29sdXRpb24gPSBzb3VyY2UucmVzb2x1dGlvbjtcbiAgfSBlbHNlIHtcbiAgICAvL3Jhd1BhdGhcbiAgICBjb3B5LnRvdGFsUG9pbnRzID0gc291cmNlLnRvdGFsUG9pbnRzO1xuICB9XG5cbiAgcmV0dXJuIGNvcHk7XG59LFxuICAgIC8vcHVzaGVzIGEgbmV3IHNlZ21lbnQgaW50byBhIHJhd1BhdGgsIGJ1dCBpZiBpdHMgc3RhcnRpbmcgdmFsdWVzIG1hdGNoIHRoZSBlbmRpbmcgdmFsdWVzIG9mIHRoZSBsYXN0IHNlZ21lbnQsIGl0J2xsIG1lcmdlIGl0IGludG8gdGhhdCBzYW1lIHNlZ21lbnQgKHRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHNlZ21lbnRzKVxuX2FwcGVuZE9yTWVyZ2UgPSBmdW5jdGlvbiBfYXBwZW5kT3JNZXJnZShyYXdQYXRoLCBzZWdtZW50KSB7XG4gIHZhciBpbmRleCA9IHJhd1BhdGgubGVuZ3RoLFxuICAgICAgcHJldlNlZyA9IHJhd1BhdGhbaW5kZXggLSAxXSB8fCBbXSxcbiAgICAgIGwgPSBwcmV2U2VnLmxlbmd0aDtcblxuICBpZiAoc2VnbWVudFswXSA9PT0gcHJldlNlZ1tsIC0gMl0gJiYgc2VnbWVudFsxXSA9PT0gcHJldlNlZ1tsIC0gMV0pIHtcbiAgICBzZWdtZW50ID0gcHJldlNlZy5jb25jYXQoc2VnbWVudC5zbGljZSgyKSk7XG4gICAgaW5kZXgtLTtcbiAgfVxuXG4gIHJhd1BhdGhbaW5kZXhdID0gc2VnbWVudDtcbn0sXG4gICAgX2Jlc3REaXN0YW5jZTtcbi8qIFRFUk1JTk9MT0dZXG4gLSBSYXdQYXRoIC0gYW4gYXJyYXkgb2YgYXJyYXlzLCBvbmUgZm9yIGVhY2ggU2VnbWVudC4gQSBzaW5nbGUgUmF3UGF0aCBjb3VsZCBoYXZlIG11bHRpcGxlIFwiTVwiIGNvbW1hbmRzLCBkZWZpbmluZyBTZWdtZW50cyAocGF0aHMgYXJlbid0IGFsd2F5cyBjb25uZWN0ZWQpLlxuIC0gU2VnbWVudCAtIGFuIGFycmF5IGNvbnRhaW5pbmcgYSBzZXF1ZW5jZSBvZiBDdWJpYyBCZXppZXIgY29vcmRpbmF0ZXMgaW4gYWx0ZXJuYXRpbmcgeCwgeSwgeCwgeSBmb3JtYXQuIFN0YXJ0aW5nIGFuY2hvciwgdGhlbiBjb250cm9sIHBvaW50IDEsIGNvbnRyb2wgcG9pbnQgMiwgYW5kIGVuZGluZyBhbmNob3IsIHRoZW4gdGhlIG5leHQgY29udHJvbCBwb2ludCAxLCBjb250cm9sIHBvaW50IDIsIGFuY2hvciwgZXRjLiBVc2VzIGxlc3MgbWVtb3J5IHRoYW4gYW4gYXJyYXkgd2l0aCBhIGJ1bmNoIG9mIHt4LCB5fSBwb2ludHMuXG4gLSBCZXppZXIgLSBhIHNpbmdsZSBjdWJpYyBCZXppZXIgd2l0aCBhIHN0YXJ0aW5nIGFuY2hvciwgdHdvIGNvbnRyb2wgcG9pbnRzLCBhbmQgYW4gZW5kaW5nIGFuY2hvci5cbiAtIHRoZSB2YXJpYWJsZSBcInRcIiBpcyB0eXBpY2FsbHkgdGhlIHBvc2l0aW9uIGFsb25nIGFuIGluZGl2aWR1YWwgQmV6aWVyIHBhdGggKHRpbWUpIGFuZCBpdCdzIE5PVCBsaW5lYXIsIG1lYW5pbmcgaXQgY291bGQgYWNjZWxlcmF0ZS9kZWNlbGVyYXRlIGJhc2VkIG9uIHRoZSBjb250cm9sIHBvaW50cyB3aGVyZWFzIHRoZSBcInBcIiBvciBcInByb2dyZXNzXCIgdmFsdWUgaXMgbGluZWFybHkgbWFwcGVkIHRvIHRoZSB3aG9sZSBwYXRoLCBzbyBpdCBzaG91bGRuJ3QgcmVhbGx5IGFjY2VsZXJhdGUvZGVjZWxlcmF0ZSBiYXNlZCBvbiBjb250cm9sIHBvaW50cy4gU28gYSBwcm9ncmVzcyBvZiAwLjIgd291bGQgYmUgYWxtb3N0IGV4YWN0bHkgMjAlIGFsb25nIHRoZSBwYXRoLiBcInRcIiBpcyBPTkxZIGluIGFuIGluZGl2aWR1YWwgQmV6aWVyIHBpZWNlLlxuICovXG4vL2FjY2VwdHMgYmFzaWMgc2VsZWN0b3IgdGV4dCwgYSBwYXRoIGluc3RhbmNlLCBhIFJhd1BhdGggaW5zdGFuY2UsIG9yIGEgU2VnbWVudCBhbmQgcmV0dXJucyBhIFJhd1BhdGggKG1ha2VzIGl0IGVhc3kgdG8gaG9tb2dlbml6ZSB0aGluZ3MpLiBJZiBhbiBlbGVtZW50IG9yIHNlbGVjdG9yIHRleHQgaXMgcGFzc2VkIGluLCBpdCdsbCBhbHNvIGNhY2hlIHRoZSB2YWx1ZSBzbyB0aGF0IGlmIGl0J3MgcXVlcmllZCBhZ2FpbiwgaXQnbGwganVzdCB0YWtlIHRoZSBwYXRoIGRhdGEgZnJvbSB0aGVyZSBpbnN0ZWFkIG9mIHBhcnNpbmcgaXQgYWxsIG92ZXIgYWdhaW4gKGFzIGxvbmcgYXMgdGhlIHBhdGggZGF0YSBpdHNlbGYgaGFzbid0IGNoYW5nZWQgLSBpdCdsbCBjaGVjaykuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhd1BhdGgodmFsdWUpIHtcbiAgdmFsdWUgPSBfaXNTdHJpbmcodmFsdWUpICYmIF9zZWxlY3RvckV4cC50ZXN0KHZhbHVlKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFsdWUpIHx8IHZhbHVlIDogdmFsdWU7XG4gIHZhciBlID0gdmFsdWUuZ2V0QXR0cmlidXRlID8gdmFsdWUgOiAwLFxuICAgICAgcmF3UGF0aDtcblxuICBpZiAoZSAmJiAodmFsdWUgPSB2YWx1ZS5nZXRBdHRyaWJ1dGUoXCJkXCIpKSkge1xuICAgIC8vaW1wbGVtZW50cyBjYWNoaW5nXG4gICAgaWYgKCFlLl9nc1BhdGgpIHtcbiAgICAgIGUuX2dzUGF0aCA9IHt9O1xuICAgIH1cblxuICAgIHJhd1BhdGggPSBlLl9nc1BhdGhbdmFsdWVdO1xuICAgIHJldHVybiByYXdQYXRoICYmICFyYXdQYXRoLl9kaXJ0eSA/IHJhd1BhdGggOiBlLl9nc1BhdGhbdmFsdWVdID0gc3RyaW5nVG9SYXdQYXRoKHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiAhdmFsdWUgPyBjb25zb2xlLndhcm4oXCJFeHBlY3RpbmcgYSA8cGF0aD4gZWxlbWVudCBvciBhbiBTVkcgcGF0aCBkYXRhIHN0cmluZ1wiKSA6IF9pc1N0cmluZyh2YWx1ZSkgPyBzdHJpbmdUb1Jhd1BhdGgodmFsdWUpIDogX2lzTnVtYmVyKHZhbHVlWzBdKSA/IFt2YWx1ZV0gOiB2YWx1ZTtcbn0gLy9jb3BpZXMgYSBSYXdQYXRoIFdJVEhPVVQgdGhlIGxlbmd0aCBtZXRhIGRhdGEgKGZvciBzcGVlZClcblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlSYXdQYXRoKHJhd1BhdGgpIHtcbiAgdmFyIGEgPSBbXSxcbiAgICAgIGkgPSAwO1xuXG4gIGZvciAoOyBpIDwgcmF3UGF0aC5sZW5ndGg7IGkrKykge1xuICAgIGFbaV0gPSBfY29weU1ldGFEYXRhKHJhd1BhdGhbaV0sIHJhd1BhdGhbaV0uc2xpY2UoMCkpO1xuICB9XG5cbiAgcmV0dXJuIF9jb3B5TWV0YURhdGEocmF3UGF0aCwgYSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZVNlZ21lbnQoc2VnbWVudCkge1xuICB2YXIgaSA9IDAsXG4gICAgICB5O1xuICBzZWdtZW50LnJldmVyc2UoKTsgLy90aGlzIHdpbGwgaW52ZXJ0IHRoZSBvcmRlciB5LCB4LCB5LCB4IHNvIHdlIG11c3QgZmxpcCBpdCBiYWNrLlxuXG4gIGZvciAoOyBpIDwgc2VnbWVudC5sZW5ndGg7IGkgKz0gMikge1xuICAgIHkgPSBzZWdtZW50W2ldO1xuICAgIHNlZ21lbnRbaV0gPSBzZWdtZW50W2kgKyAxXTtcbiAgICBzZWdtZW50W2kgKyAxXSA9IHk7XG4gIH1cblxuICBzZWdtZW50LnJldmVyc2VkID0gIXNlZ21lbnQucmV2ZXJzZWQ7XG59XG5cbnZhciBfY3JlYXRlUGF0aCA9IGZ1bmN0aW9uIF9jcmVhdGVQYXRoKGUsIGlnbm9yZSkge1xuICB2YXIgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwicGF0aFwiKSxcbiAgICAgIGF0dHIgPSBbXS5zbGljZS5jYWxsKGUuYXR0cmlidXRlcyksXG4gICAgICBpID0gYXR0ci5sZW5ndGgsXG4gICAgICBuYW1lO1xuICBpZ25vcmUgPSBcIixcIiArIGlnbm9yZSArIFwiLFwiO1xuXG4gIHdoaWxlICgtLWkgPiAtMSkge1xuICAgIG5hbWUgPSBhdHRyW2ldLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7IC8vaW4gTWljcm9zb2Z0IEVkZ2UsIGlmIHlvdSBkb24ndCBzZXQgdGhlIGF0dHJpYnV0ZSB3aXRoIGEgbG93ZXJjYXNlIG5hbWUsIGl0IGRvZXNuJ3QgcmVuZGVyIGNvcnJlY3RseSEgU3VwZXIgd2VpcmQuXG5cbiAgICBpZiAoaWdub3JlLmluZGV4T2YoXCIsXCIgKyBuYW1lICsgXCIsXCIpIDwgMCkge1xuICAgICAgcGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBuYW1lLCBhdHRyW2ldLm5vZGVWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhdGg7XG59LFxuICAgIF90eXBlQXR0cnMgPSB7XG4gIHJlY3Q6IFwicngscnkseCx5LHdpZHRoLGhlaWdodFwiLFxuICBjaXJjbGU6IFwicixjeCxjeVwiLFxuICBlbGxpcHNlOiBcInJ4LHJ5LGN4LGN5XCIsXG4gIGxpbmU6IFwieDEseDIseTEseTJcIlxufSxcbiAgICBfYXR0clRvT2JqID0gZnVuY3Rpb24gX2F0dHJUb09iaihlLCBhdHRycykge1xuICB2YXIgcHJvcHMgPSBhdHRycyA/IGF0dHJzLnNwbGl0KFwiLFwiKSA6IFtdLFxuICAgICAgb2JqID0ge30sXG4gICAgICBpID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgtLWkgPiAtMSkge1xuICAgIG9ialtwcm9wc1tpXV0gPSArZS5nZXRBdHRyaWJ1dGUocHJvcHNbaV0pIHx8IDA7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTsgLy9jb252ZXJ0cyBhbiBTVkcgc2hhcGUgbGlrZSA8Y2lyY2xlPiwgPHJlY3Q+LCA8cG9seWdvbj4sIDxwb2x5bGluZT4sIDxlbGxpcHNlPiwgZXRjLiB0byBhIDxwYXRoPiwgc3dhcHBpbmcgaXQgaW4gYW5kIGNvcHlpbmcgdGhlIGF0dHJpYnV0ZXMgdG8gbWF0Y2guXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1BhdGgoZWxlbWVudCwgc3dhcCkge1xuICB2YXIgdHlwZSA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgY2lyYyA9IDAuNTUyMjg0NzQ5ODMxLFxuICAgICAgZGF0YSxcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgcixcbiAgICAgIHJ5LFxuICAgICAgcGF0aCxcbiAgICAgIHJjaXJjLFxuICAgICAgcnljaXJjLFxuICAgICAgcG9pbnRzLFxuICAgICAgdyxcbiAgICAgIGgsXG4gICAgICB4MixcbiAgICAgIHgzLFxuICAgICAgeDQsXG4gICAgICB4NSxcbiAgICAgIHg2LFxuICAgICAgeTIsXG4gICAgICB5MyxcbiAgICAgIHk0LFxuICAgICAgeTUsXG4gICAgICB5NixcbiAgICAgIGF0dHI7XG5cbiAgaWYgKHR5cGUgPT09IFwicGF0aFwiIHx8ICFlbGVtZW50LmdldEJCb3gpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHBhdGggPSBfY3JlYXRlUGF0aChlbGVtZW50LCBcIngseSx3aWR0aCxoZWlnaHQsY3gsY3kscngscnkscix4MSx4Mix5MSx5Mixwb2ludHNcIik7XG4gIGF0dHIgPSBfYXR0clRvT2JqKGVsZW1lbnQsIF90eXBlQXR0cnNbdHlwZV0pO1xuXG4gIGlmICh0eXBlID09PSBcInJlY3RcIikge1xuICAgIHIgPSBhdHRyLnJ4O1xuICAgIHJ5ID0gYXR0ci5yeSB8fCByO1xuICAgIHggPSBhdHRyLng7XG4gICAgeSA9IGF0dHIueTtcbiAgICB3ID0gYXR0ci53aWR0aCAtIHIgKiAyO1xuICAgIGggPSBhdHRyLmhlaWdodCAtIHJ5ICogMjtcblxuICAgIGlmIChyIHx8IHJ5KSB7XG4gICAgICAvL2lmIHRoZXJlIGFyZSByb3VuZGVkIGNvcm5lcnMsIHJlbmRlciBjdWJpYyBiZXppZXJzXG4gICAgICB4MiA9IHggKyByICogKDEgLSBjaXJjKTtcbiAgICAgIHgzID0geCArIHI7XG4gICAgICB4NCA9IHgzICsgdztcbiAgICAgIHg1ID0geDQgKyByICogY2lyYztcbiAgICAgIHg2ID0geDQgKyByO1xuICAgICAgeTIgPSB5ICsgcnkgKiAoMSAtIGNpcmMpO1xuICAgICAgeTMgPSB5ICsgcnk7XG4gICAgICB5NCA9IHkzICsgaDtcbiAgICAgIHk1ID0geTQgKyByeSAqIGNpcmM7XG4gICAgICB5NiA9IHk0ICsgcnk7XG4gICAgICBkYXRhID0gXCJNXCIgKyB4NiArIFwiLFwiICsgeTMgKyBcIiBWXCIgKyB5NCArIFwiIENcIiArIFt4NiwgeTUsIHg1LCB5NiwgeDQsIHk2LCB4NCAtICh4NCAtIHgzKSAvIDMsIHk2LCB4MyArICh4NCAtIHgzKSAvIDMsIHk2LCB4MywgeTYsIHgyLCB5NiwgeCwgeTUsIHgsIHk0LCB4LCB5NCAtICh5NCAtIHkzKSAvIDMsIHgsIHkzICsgKHk0IC0geTMpIC8gMywgeCwgeTMsIHgsIHkyLCB4MiwgeSwgeDMsIHksIHgzICsgKHg0IC0geDMpIC8gMywgeSwgeDQgLSAoeDQgLSB4MykgLyAzLCB5LCB4NCwgeSwgeDUsIHksIHg2LCB5MiwgeDYsIHkzXS5qb2luKFwiLFwiKSArIFwielwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gXCJNXCIgKyAoeCArIHcpICsgXCIsXCIgKyB5ICsgXCIgdlwiICsgaCArIFwiIGhcIiArIC13ICsgXCIgdlwiICsgLWggKyBcIiBoXCIgKyB3ICsgXCJ6XCI7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY2lyY2xlXCIgfHwgdHlwZSA9PT0gXCJlbGxpcHNlXCIpIHtcbiAgICBpZiAodHlwZSA9PT0gXCJjaXJjbGVcIikge1xuICAgICAgciA9IHJ5ID0gYXR0ci5yO1xuICAgICAgcnljaXJjID0gciAqIGNpcmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHIgPSBhdHRyLnJ4O1xuICAgICAgcnkgPSBhdHRyLnJ5O1xuICAgICAgcnljaXJjID0gcnkgKiBjaXJjO1xuICAgIH1cblxuICAgIHggPSBhdHRyLmN4O1xuICAgIHkgPSBhdHRyLmN5O1xuICAgIHJjaXJjID0gciAqIGNpcmM7XG4gICAgZGF0YSA9IFwiTVwiICsgKHggKyByKSArIFwiLFwiICsgeSArIFwiIENcIiArIFt4ICsgciwgeSArIHJ5Y2lyYywgeCArIHJjaXJjLCB5ICsgcnksIHgsIHkgKyByeSwgeCAtIHJjaXJjLCB5ICsgcnksIHggLSByLCB5ICsgcnljaXJjLCB4IC0gciwgeSwgeCAtIHIsIHkgLSByeWNpcmMsIHggLSByY2lyYywgeSAtIHJ5LCB4LCB5IC0gcnksIHggKyByY2lyYywgeSAtIHJ5LCB4ICsgciwgeSAtIHJ5Y2lyYywgeCArIHIsIHldLmpvaW4oXCIsXCIpICsgXCJ6XCI7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJsaW5lXCIpIHtcbiAgICBkYXRhID0gXCJNXCIgKyBhdHRyLngxICsgXCIsXCIgKyBhdHRyLnkxICsgXCIgTFwiICsgYXR0ci54MiArIFwiLFwiICsgYXR0ci55MjsgLy9wcmV2aW91c2x5LCB3ZSBqdXN0IGNvbnZlcnRlZCB0byBcIk14LHkgTHgseVwiIGJ1dCBTYWZhcmkgaGFzIGJ1Z3MgdGhhdCBjYXVzZSB0aGF0IG5vdCB0byByZW5kZXIgcHJvcGVybHkgd2hlbiB1c2luZyBhIHN0cm9rZS1kYXNoYXJyYXkgdGhhdCdzIG5vdCBmdWxseSB2aXNpYmxlISBVc2luZyBhIGN1YmljIGJlemllciBmaXhlcyB0aGF0IGlzc3VlLlxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicG9seWxpbmVcIiB8fCB0eXBlID09PSBcInBvbHlnb25cIikge1xuICAgIHBvaW50cyA9IChlbGVtZW50LmdldEF0dHJpYnV0ZShcInBvaW50c1wiKSArIFwiXCIpLm1hdGNoKF9udW1iZXJzRXhwKSB8fCBbXTtcbiAgICB4ID0gcG9pbnRzLnNoaWZ0KCk7XG4gICAgeSA9IHBvaW50cy5zaGlmdCgpO1xuICAgIGRhdGEgPSBcIk1cIiArIHggKyBcIixcIiArIHkgKyBcIiBMXCIgKyBwb2ludHMuam9pbihcIixcIik7XG5cbiAgICBpZiAodHlwZSA9PT0gXCJwb2x5Z29uXCIpIHtcbiAgICAgIGRhdGEgKz0gXCIsXCIgKyB4ICsgXCIsXCIgKyB5ICsgXCJ6XCI7XG4gICAgfVxuICB9XG5cbiAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJkXCIsIHJhd1BhdGhUb1N0cmluZyhwYXRoLl9nc1Jhd1BhdGggPSBzdHJpbmdUb1Jhd1BhdGgoZGF0YSkpKTtcblxuICBpZiAoc3dhcCAmJiBlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICBlbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHBhdGgsIGVsZW1lbnQpO1xuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBwYXRoO1xufSAvL3JldHVybnMgdGhlIHJvdGF0aW9uIChpbiBkZWdyZWVzKSBhdCBhIHBhcnRpY3VsYXIgcHJvZ3Jlc3Mgb24gYSByYXdQYXRoICh0aGUgc2xvcGUgb2YgdGhlIHRhbmdlbnQpXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3RhdGlvbkF0UHJvZ3Jlc3MocmF3UGF0aCwgcHJvZ3Jlc3MpIHtcbiAgdmFyIGQgPSBnZXRQcm9ncmVzc0RhdGEocmF3UGF0aCwgcHJvZ3Jlc3MgPj0gMSA/IDEgLSAxZS05IDogcHJvZ3Jlc3MgPyBwcm9ncmVzcyA6IDFlLTkpO1xuICByZXR1cm4gZ2V0Um90YXRpb25BdEJlemllclQoZC5zZWdtZW50LCBkLmksIGQudCk7XG59XG5cbmZ1bmN0aW9uIGdldFJvdGF0aW9uQXRCZXppZXJUKHNlZ21lbnQsIGksIHQpIHtcbiAgdmFyIGEgPSBzZWdtZW50W2ldLFxuICAgICAgYiA9IHNlZ21lbnRbaSArIDJdLFxuICAgICAgYyA9IHNlZ21lbnRbaSArIDRdLFxuICAgICAgeDtcbiAgYSArPSAoYiAtIGEpICogdDtcbiAgYiArPSAoYyAtIGIpICogdDtcbiAgYSArPSAoYiAtIGEpICogdDtcbiAgeCA9IGIgKyAoYyArIChzZWdtZW50W2kgKyA2XSAtIGMpICogdCAtIGIpICogdCAtIGE7XG4gIGEgPSBzZWdtZW50W2kgKyAxXTtcbiAgYiA9IHNlZ21lbnRbaSArIDNdO1xuICBjID0gc2VnbWVudFtpICsgNV07XG4gIGEgKz0gKGIgLSBhKSAqIHQ7XG4gIGIgKz0gKGMgLSBiKSAqIHQ7XG4gIGEgKz0gKGIgLSBhKSAqIHQ7XG4gIHJldHVybiBfcm91bmQoX2F0YW4yKGIgKyAoYyArIChzZWdtZW50W2kgKyA3XSAtIGMpICogdCAtIGIpICogdCAtIGEsIHgpICogX1JBRDJERUcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2xpY2VSYXdQYXRoKHJhd1BhdGgsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKF9pc1VuZGVmaW5lZChlbmQpKSB7XG4gICAgZW5kID0gMTtcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgdmFyIHJldmVyc2UgPSBzdGFydCA+IGVuZCxcbiAgICAgIGxvb3BzID0gTWF0aC5tYXgoMCwgfn4oX2FicyhlbmQgLSBzdGFydCkgLSAxZS04KSk7XG5cbiAgaWYgKHJldmVyc2UpIHtcbiAgICByZXZlcnNlID0gZW5kO1xuICAgIGVuZCA9IHN0YXJ0O1xuICAgIHN0YXJ0ID0gcmV2ZXJzZTtcbiAgICByZXZlcnNlID0gMTtcbiAgICBsb29wcyAtPSBsb29wcyA/IDEgOiAwO1xuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPCAwKSB7XG4gICAgdmFyIG9mZnNldCA9IH5+TWF0aC5taW4oc3RhcnQsIGVuZCkgKyAxO1xuICAgIHN0YXJ0ICs9IG9mZnNldDtcbiAgICBlbmQgKz0gb2Zmc2V0O1xuICB9XG5cbiAgdmFyIHBhdGggPSBjb3B5UmF3UGF0aChyYXdQYXRoLnRvdGFsTGVuZ3RoID8gcmF3UGF0aCA6IGNhY2hlUmF3UGF0aE1lYXN1cmVtZW50cyhyYXdQYXRoKSksXG4gICAgICB3cmFwID0gZW5kID4gMSxcbiAgICAgIHMgPSBnZXRQcm9ncmVzc0RhdGEocGF0aCwgc3RhcnQsIF90ZW1wLCB0cnVlKSxcbiAgICAgIGUgPSBnZXRQcm9ncmVzc0RhdGEocGF0aCwgZW5kLCBfdGVtcDIpLFxuICAgICAgZVNlZyA9IGUuc2VnbWVudCxcbiAgICAgIHNTZWcgPSBzLnNlZ21lbnQsXG4gICAgICBlU2VnSW5kZXggPSBlLnNlZ0luZGV4LFxuICAgICAgc1NlZ0luZGV4ID0gcy5zZWdJbmRleCxcbiAgICAgIGVpID0gZS5pLFxuICAgICAgc2kgPSBzLmksXG4gICAgICBzYW1lU2VnbWVudCA9IHNTZWdJbmRleCA9PT0gZVNlZ0luZGV4LFxuICAgICAgc2FtZUJlemllciA9IGVpID09PSBzaSAmJiBzYW1lU2VnbWVudCxcbiAgICAgIGludmVydGVkT3JkZXIgPSBzYW1lU2VnbWVudCAmJiBzaSA+IGVpIHx8IHNhbWVCZXppZXIgJiYgcy50ID4gZS50LFxuICAgICAgc1NoaWZ0LFxuICAgICAgZVNoaWZ0LFxuICAgICAgaSxcbiAgICAgIGNvcHksXG4gICAgICB0b3RhbFNlZ21lbnRzLFxuICAgICAgbCxcbiAgICAgIGo7XG5cbiAgaWYgKHdyYXAgfHwgbG9vcHMpIHtcbiAgICBpZiAoX3NwbGl0U2VnbWVudChwYXRoLCBzU2VnSW5kZXgsIHNpLCBzLnQpKSB7XG4gICAgICBzU2hpZnQgPSAxO1xuICAgICAgc1NlZ0luZGV4Kys7XG5cbiAgICAgIGlmIChzYW1lQmV6aWVyKSB7XG4gICAgICAgIGlmIChpbnZlcnRlZE9yZGVyKSB7XG4gICAgICAgICAgZS50IC89IHMudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlLnQgPSAoZS50IC0gcy50KSAvICgxIC0gcy50KTtcbiAgICAgICAgICBlU2VnSW5kZXgrKztcbiAgICAgICAgICBlaSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc1NlZ0luZGV4IDw9IGVTZWdJbmRleCArIDEgJiYgIWludmVydGVkT3JkZXIpIHtcbiAgICAgICAgZVNlZ0luZGV4Kys7XG5cbiAgICAgICAgaWYgKHNhbWVTZWdtZW50KSB7XG4gICAgICAgICAgZWkgLT0gc2k7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWUudCkge1xuICAgICAgZVNlZ0luZGV4LS07XG4gICAgICByZXZlcnNlICYmIHNTZWdJbmRleC0tO1xuICAgIH0gZWxzZSBpZiAoX3NwbGl0U2VnbWVudChwYXRoLCBlU2VnSW5kZXgsIGVpLCBlLnQpKSB7XG4gICAgICBpbnZlcnRlZE9yZGVyICYmIHNTaGlmdCAmJiBzU2VnSW5kZXgrKztcbiAgICAgIHJldmVyc2UgJiYgZVNlZ0luZGV4Kys7XG4gICAgfVxuXG4gICAgY29weSA9IFtdO1xuICAgIHRvdGFsU2VnbWVudHMgPSBwYXRoLmxlbmd0aDtcbiAgICBsID0gMSArIHRvdGFsU2VnbWVudHMgKiBsb29wcztcbiAgICBqID0gc1NlZ0luZGV4O1xuXG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIGVTZWdJbmRleCA9IChlU2VnSW5kZXggfHwgdG90YWxTZWdtZW50cykgLSAxO1xuICAgICAgbCArPSAodG90YWxTZWdtZW50cyAtIGVTZWdJbmRleCArIHNTZWdJbmRleCkgJSB0b3RhbFNlZ21lbnRzO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIF9hcHBlbmRPck1lcmdlKGNvcHksIHBhdGhbal0pO1xuXG4gICAgICAgIGogPSAoaiB8fCB0b3RhbFNlZ21lbnRzKSAtIDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGwgKz0gKHRvdGFsU2VnbWVudHMgLSBzU2VnSW5kZXggKyBlU2VnSW5kZXgpICUgdG90YWxTZWdtZW50cztcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICBfYXBwZW5kT3JNZXJnZShjb3B5LCBwYXRoW2orKyAlIHRvdGFsU2VnbWVudHNdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXRoID0gY29weTtcbiAgfSBlbHNlIHtcbiAgICBlU2hpZnQgPSBlLnQgPT09IDEgPyA2IDogc3ViZGl2aWRlU2VnbWVudChlU2VnLCBlaSwgZS50KTtcblxuICAgIGlmIChzdGFydCAhPT0gZW5kKSB7XG4gICAgICBzU2hpZnQgPSBzdWJkaXZpZGVTZWdtZW50KHNTZWcsIHNpLCBzYW1lQmV6aWVyID8gcy50IC8gZS50IDogcy50KTtcblxuICAgICAgaWYgKHNhbWVTZWdtZW50KSB7XG4gICAgICAgIGVTaGlmdCArPSBzU2hpZnQ7XG4gICAgICB9XG5cbiAgICAgIGVTZWcuc3BsaWNlKGVpICsgZVNoaWZ0ICsgMik7XG5cbiAgICAgIGlmIChzU2hpZnQgfHwgc2kpIHtcbiAgICAgICAgc1NlZy5zcGxpY2UoMCwgc2kgKyBzU2hpZnQpO1xuICAgICAgfVxuXG4gICAgICBpID0gcGF0aC5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgLy9jaG9wIG9mZiBhbnkgZXh0cmEgc2VnbWVudHNcbiAgICAgICAgaWYgKGkgPCBzU2VnSW5kZXggfHwgaSA+IGVTZWdJbmRleCkge1xuICAgICAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVTZWcuYW5nbGUgPSBnZXRSb3RhdGlvbkF0QmV6aWVyVChlU2VnLCBlaSArIGVTaGlmdCwgMCk7IC8vcmVjb3JkIHRoZSB2YWx1ZSBiZWZvcmUgd2UgY2hvcCBiZWNhdXNlIGl0J2xsIGJlIGltcG9zc2libGUgdG8gZGV0ZXJtaW5lIHRoZSBhbmdsZSBhZnRlciBpdHMgbGVuZ3RoIGlzIDAhXG5cbiAgICAgIGVpICs9IGVTaGlmdDtcbiAgICAgIHMgPSBlU2VnW2VpXTtcbiAgICAgIGUgPSBlU2VnW2VpICsgMV07XG4gICAgICBlU2VnLmxlbmd0aCA9IGVTZWcudG90YWxMZW5ndGggPSAwO1xuICAgICAgZVNlZy50b3RhbFBvaW50cyA9IHBhdGgudG90YWxQb2ludHMgPSA4O1xuICAgICAgZVNlZy5wdXNoKHMsIGUsIHMsIGUsIHMsIGUsIHMsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldmVyc2UgJiYgX3JldmVyc2VSYXdQYXRoKHBhdGgsIHdyYXAgfHwgbG9vcHMpO1xuICBwYXRoLnRvdGFsTGVuZ3RoID0gMDtcbiAgcmV0dXJuIHBhdGg7XG59IC8vbWVhc3VyZXMgYSBTZWdtZW50IGFjY29yZGluZyB0byBpdHMgcmVzb2x1dGlvbiAoc28gaWYgc2VnbWVudC5yZXNvbHV0aW9uIGlzIDYsIGZvciBleGFtcGxlLCBpdCdsbCB0YWtlIDYgc2FtcGxlcyBlcXVhbGx5IGFjcm9zcyBlYWNoIEJlemllcikgYW5kIGNyZWF0ZS9wb3B1bGF0ZSBhIFwic2FtcGxlc1wiIEFycmF5IHRoYXQgaGFzIHRoZSBsZW5ndGggdXAgdG8gZWFjaCBvZiB0aG9zZSBzYW1wbGUgcG9pbnRzIChhbHdheXMgaW5jcmVhc2luZyBmcm9tIHRoZSBzdGFydCkgYXMgd2VsbCBhcyBhIFwibG9va3VwXCIgYXJyYXkgdGhhdCdzIGJyb2tlbiB1cCBhY2NvcmRpbmcgdG8gdGhlIHNtYWxsZXN0IGRpc3RhbmNlIGJldHdlZW4gMiBzYW1wbGVzLiBUaGlzIGdpdmVzIHVzIGEgdmVyeSBmYXN0IHdheSBvZiBsb29raW5nIHVwIGEgcHJvZ3Jlc3MgcG9zaXRpb24gcmF0aGVyIHRoYW4gbG9vcGluZyB0aHJvdWdoIGFsbCB0aGUgcG9pbnRzL0JlemllcnMuIFlvdSBjYW4gb3B0aW9uYWxseSBoYXZlIGl0IG9ubHkgbWVhc3VyZSBhIHN1YnNldCwgc3RhcnRpbmcgYXQgc3RhcnRJbmRleCBhbmQgZ29pbmcgZm9yIGEgc3BlY2lmaWMgbnVtYmVyIG9mIGJlemllcnMgKHJlbWVtYmVyLCB0aGVyZSBhcmUgMyB4L3kgcGFpcnMgZWFjaCwgZm9yIGEgdG90YWwgb2YgNiBlbGVtZW50cyBmb3IgZWFjaCBCZXppZXIpLiBJdCB3aWxsIGFsc28gcG9wdWxhdGUgYSBcInRvdGFsTGVuZ3RoXCIgcHJvcGVydHksIGJ1dCB0aGF0J3Mgbm90IGdlbmVyYWxseSBzdXBlciBhY2N1cmF0ZSBiZWNhdXNlIGJ5IGRlZmF1bHQgaXQnbGwgb25seSB0YWtlIDYgc2FtcGxlcyBwZXIgQmV6aWVyLiBCdXQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIGl0J3MgcGVyZmVjdGx5IGFkZXF1YXRlIGZvciBtZWFzdXJpbmcgcHJvZ3Jlc3MgdmFsdWVzIGFsb25nIHRoZSBwYXRoLiBJZiB5b3UgbmVlZCBhIG1vcmUgYWNjdXJhdGUgdG90YWxMZW5ndGgsIGVpdGhlciBpbmNyZWFzZSB0aGUgcmVzb2x1dGlvbiBvciB1c2UgdGhlIG1vcmUgYWR2YW5jZWQgYmV6aWVyVG9Qb2ludHMoKSBtZXRob2Qgd2hpY2gga2VlcHMgYWRkaW5nIHBvaW50cyB1bnRpbCB0aGV5IGRvbid0IGRldmlhdGUgYnkgbW9yZSB0aGFuIGEgY2VydGFpbiBwcmVjaXNpb24gdmFsdWUuXG5cbmZ1bmN0aW9uIG1lYXN1cmVTZWdtZW50KHNlZ21lbnQsIHN0YXJ0SW5kZXgsIGJlemllclF0eSkge1xuICBzdGFydEluZGV4ID0gc3RhcnRJbmRleCB8fCAwO1xuXG4gIGlmICghc2VnbWVudC5zYW1wbGVzKSB7XG4gICAgc2VnbWVudC5zYW1wbGVzID0gW107XG4gICAgc2VnbWVudC5sb29rdXAgPSBbXTtcbiAgfVxuXG4gIHZhciByZXNvbHV0aW9uID0gfn5zZWdtZW50LnJlc29sdXRpb24gfHwgMTIsXG4gICAgICBpbmMgPSAxIC8gcmVzb2x1dGlvbixcbiAgICAgIGVuZEluZGV4ID0gYmV6aWVyUXR5ID8gc3RhcnRJbmRleCArIGJlemllclF0eSAqIDYgKyAxIDogc2VnbWVudC5sZW5ndGgsXG4gICAgICB4MSA9IHNlZ21lbnRbc3RhcnRJbmRleF0sXG4gICAgICB5MSA9IHNlZ21lbnRbc3RhcnRJbmRleCArIDFdLFxuICAgICAgc2FtcGxlc0luZGV4ID0gc3RhcnRJbmRleCA/IHN0YXJ0SW5kZXggLyA2ICogcmVzb2x1dGlvbiA6IDAsXG4gICAgICBzYW1wbGVzID0gc2VnbWVudC5zYW1wbGVzLFxuICAgICAgbG9va3VwID0gc2VnbWVudC5sb29rdXAsXG4gICAgICBtaW4gPSAoc3RhcnRJbmRleCA/IHNlZ21lbnQubWluTGVuZ3RoIDogX2xhcmdlTnVtKSB8fCBfbGFyZ2VOdW0sXG4gICAgICBwcmV2TGVuZ3RoID0gc2FtcGxlc1tzYW1wbGVzSW5kZXggKyBiZXppZXJRdHkgKiByZXNvbHV0aW9uIC0gMV0sXG4gICAgICBsZW5ndGggPSBzdGFydEluZGV4ID8gc2FtcGxlc1tzYW1wbGVzSW5kZXggLSAxXSA6IDAsXG4gICAgICBpLFxuICAgICAgaixcbiAgICAgIHg0LFxuICAgICAgeDMsXG4gICAgICB4MixcbiAgICAgIHhkLFxuICAgICAgeGQxLFxuICAgICAgeTQsXG4gICAgICB5MyxcbiAgICAgIHkyLFxuICAgICAgeWQsXG4gICAgICB5ZDEsXG4gICAgICBpbnYsXG4gICAgICB0LFxuICAgICAgbGVuZ3RoSW5kZXgsXG4gICAgICBsLFxuICAgICAgc2VnTGVuZ3RoO1xuICBzYW1wbGVzLmxlbmd0aCA9IGxvb2t1cC5sZW5ndGggPSAwO1xuXG4gIGZvciAoaiA9IHN0YXJ0SW5kZXggKyAyOyBqIDwgZW5kSW5kZXg7IGogKz0gNikge1xuICAgIHg0ID0gc2VnbWVudFtqICsgNF0gLSB4MTtcbiAgICB4MyA9IHNlZ21lbnRbaiArIDJdIC0geDE7XG4gICAgeDIgPSBzZWdtZW50W2pdIC0geDE7XG4gICAgeTQgPSBzZWdtZW50W2ogKyA1XSAtIHkxO1xuICAgIHkzID0gc2VnbWVudFtqICsgM10gLSB5MTtcbiAgICB5MiA9IHNlZ21lbnRbaiArIDFdIC0geTE7XG4gICAgeGQgPSB4ZDEgPSB5ZCA9IHlkMSA9IDA7XG5cbiAgICBpZiAoX2Ficyh4NCkgPCAxZS01ICYmIF9hYnMoeTQpIDwgMWUtNSAmJiBfYWJzKHgyKSArIF9hYnMoeTIpIDwgMWUtNSkge1xuICAgICAgLy9kdW1wIHBvaW50cyB0aGF0IGFyZSBzdWZmaWNpZW50bHkgY2xvc2UgKGJhc2ljYWxseSByaWdodCBvbiB0b3Agb2YgZWFjaCBvdGhlciwgbWFraW5nIGEgYmV6aWVyIHN1cGVyIHRpbnkgb3IgMCBsZW5ndGgpXG4gICAgICBpZiAoc2VnbWVudC5sZW5ndGggPiA4KSB7XG4gICAgICAgIHNlZ21lbnQuc3BsaWNlKGosIDYpO1xuICAgICAgICBqIC09IDY7XG4gICAgICAgIGVuZEluZGV4IC09IDY7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoaSA9IDE7IGkgPD0gcmVzb2x1dGlvbjsgaSsrKSB7XG4gICAgICAgIHQgPSBpbmMgKiBpO1xuICAgICAgICBpbnYgPSAxIC0gdDtcbiAgICAgICAgeGQgPSB4ZDEgLSAoeGQxID0gKHQgKiB0ICogeDQgKyAzICogaW52ICogKHQgKiB4MyArIGludiAqIHgyKSkgKiB0KTtcbiAgICAgICAgeWQgPSB5ZDEgLSAoeWQxID0gKHQgKiB0ICogeTQgKyAzICogaW52ICogKHQgKiB5MyArIGludiAqIHkyKSkgKiB0KTtcbiAgICAgICAgbCA9IF9zcXJ0KHlkICogeWQgKyB4ZCAqIHhkKTtcblxuICAgICAgICBpZiAobCA8IG1pbikge1xuICAgICAgICAgIG1pbiA9IGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZW5ndGggKz0gbDtcbiAgICAgICAgc2FtcGxlc1tzYW1wbGVzSW5kZXgrK10gPSBsZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgeDEgKz0geDQ7XG4gICAgeTEgKz0geTQ7XG4gIH1cblxuICBpZiAocHJldkxlbmd0aCkge1xuICAgIHByZXZMZW5ndGggLT0gbGVuZ3RoO1xuXG4gICAgZm9yICg7IHNhbXBsZXNJbmRleCA8IHNhbXBsZXMubGVuZ3RoOyBzYW1wbGVzSW5kZXgrKykge1xuICAgICAgc2FtcGxlc1tzYW1wbGVzSW5kZXhdICs9IHByZXZMZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgaWYgKHNhbXBsZXMubGVuZ3RoICYmIG1pbikge1xuICAgIHNlZ21lbnQudG90YWxMZW5ndGggPSBzZWdMZW5ndGggPSBzYW1wbGVzW3NhbXBsZXMubGVuZ3RoIC0gMV0gfHwgMDtcbiAgICBzZWdtZW50Lm1pbkxlbmd0aCA9IG1pbjtcbiAgICBsID0gbGVuZ3RoSW5kZXggPSAwO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHNlZ0xlbmd0aDsgaSArPSBtaW4pIHtcbiAgICAgIGxvb2t1cFtsKytdID0gc2FtcGxlc1tsZW5ndGhJbmRleF0gPCBpID8gKytsZW5ndGhJbmRleCA6IGxlbmd0aEluZGV4O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzZWdtZW50LnRvdGFsTGVuZ3RoID0gc2FtcGxlc1swXSA9IDA7XG4gIH1cblxuICByZXR1cm4gc3RhcnRJbmRleCA/IGxlbmd0aCAtIHNhbXBsZXNbc3RhcnRJbmRleCAvIDIgLSAxXSA6IGxlbmd0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhY2hlUmF3UGF0aE1lYXN1cmVtZW50cyhyYXdQYXRoLCByZXNvbHV0aW9uKSB7XG4gIHZhciBwYXRoTGVuZ3RoLCBwb2ludHMsIGk7XG5cbiAgZm9yIChpID0gcGF0aExlbmd0aCA9IHBvaW50cyA9IDA7IGkgPCByYXdQYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgcmF3UGF0aFtpXS5yZXNvbHV0aW9uID0gfn5yZXNvbHV0aW9uIHx8IDEyOyAvL3N0ZXBzIHBlciBCZXppZXIgY3VydmUgKGFuY2hvciwgMiBjb250cm9sIHBvaW50cywgdG8gYW5jaG9yKVxuXG4gICAgcG9pbnRzICs9IHJhd1BhdGhbaV0ubGVuZ3RoO1xuICAgIHBhdGhMZW5ndGggKz0gbWVhc3VyZVNlZ21lbnQocmF3UGF0aFtpXSk7XG4gIH1cblxuICByYXdQYXRoLnRvdGFsUG9pbnRzID0gcG9pbnRzO1xuICByYXdQYXRoLnRvdGFsTGVuZ3RoID0gcGF0aExlbmd0aDtcbiAgcmV0dXJuIHJhd1BhdGg7XG59IC8vZGl2aWRlIHNlZ21lbnRbaV0gYXQgcG9zaXRpb24gdCAodmFsdWUgYmV0d2VlbiAwIGFuZCAxLCBwcm9ncmVzcyBhbG9uZyB0aGF0IHBhcnRpY3VsYXIgY3ViaWMgYmV6aWVyIHNlZ21lbnQgdGhhdCBzdGFydHMgYXQgc2VnbWVudFtpXSkuIFJldHVybnMgaG93IG1hbnkgZWxlbWVudHMgd2VyZSBzcGxpY2VkIGludG8gdGhlIHNlZ21lbnQgYXJyYXkgKGVpdGhlciAwIG9yIDYpXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJkaXZpZGVTZWdtZW50KHNlZ21lbnQsIGksIHQpIHtcbiAgaWYgKHQgPD0gMCB8fCB0ID49IDEpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciBheCA9IHNlZ21lbnRbaV0sXG4gICAgICBheSA9IHNlZ21lbnRbaSArIDFdLFxuICAgICAgY3AxeCA9IHNlZ21lbnRbaSArIDJdLFxuICAgICAgY3AxeSA9IHNlZ21lbnRbaSArIDNdLFxuICAgICAgY3AyeCA9IHNlZ21lbnRbaSArIDRdLFxuICAgICAgY3AyeSA9IHNlZ21lbnRbaSArIDVdLFxuICAgICAgYnggPSBzZWdtZW50W2kgKyA2XSxcbiAgICAgIGJ5ID0gc2VnbWVudFtpICsgN10sXG4gICAgICB4MWEgPSBheCArIChjcDF4IC0gYXgpICogdCxcbiAgICAgIHgyID0gY3AxeCArIChjcDJ4IC0gY3AxeCkgKiB0LFxuICAgICAgeTFhID0gYXkgKyAoY3AxeSAtIGF5KSAqIHQsXG4gICAgICB5MiA9IGNwMXkgKyAoY3AyeSAtIGNwMXkpICogdCxcbiAgICAgIHgxID0geDFhICsgKHgyIC0geDFhKSAqIHQsXG4gICAgICB5MSA9IHkxYSArICh5MiAtIHkxYSkgKiB0LFxuICAgICAgeDJhID0gY3AyeCArIChieCAtIGNwMngpICogdCxcbiAgICAgIHkyYSA9IGNwMnkgKyAoYnkgLSBjcDJ5KSAqIHQ7XG4gIHgyICs9ICh4MmEgLSB4MikgKiB0O1xuICB5MiArPSAoeTJhIC0geTIpICogdDtcbiAgc2VnbWVudC5zcGxpY2UoaSArIDIsIDQsIF9yb3VuZCh4MWEpLCAvL2ZpcnN0IGNvbnRyb2wgcG9pbnRcbiAgX3JvdW5kKHkxYSksIF9yb3VuZCh4MSksIC8vc2Vjb25kIGNvbnRyb2wgcG9pbnRcbiAgX3JvdW5kKHkxKSwgX3JvdW5kKHgxICsgKHgyIC0geDEpICogdCksIC8vbmV3IGZhYnJpY2F0ZWQgYW5jaG9yIG9uIGxpbmVcbiAgX3JvdW5kKHkxICsgKHkyIC0geTEpICogdCksIF9yb3VuZCh4MiksIC8vdGhpcmQgY29udHJvbCBwb2ludFxuICBfcm91bmQoeTIpLCBfcm91bmQoeDJhKSwgLy9mb3VydGggY29udHJvbCBwb2ludFxuICBfcm91bmQoeTJhKSk7XG4gIHNlZ21lbnQuc2FtcGxlcyAmJiBzZWdtZW50LnNhbXBsZXMuc3BsaWNlKGkgLyA2ICogc2VnbWVudC5yZXNvbHV0aW9uIHwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCk7XG4gIHJldHVybiA2O1xufSAvLyByZXR1cm5zIGFuIG9iamVjdCB7cGF0aCwgc2VnbWVudCwgc2VnSW5kZXgsIGksIHR9XG5cbmZ1bmN0aW9uIGdldFByb2dyZXNzRGF0YShyYXdQYXRoLCBwcm9ncmVzcywgZGVjb3JhdGVlLCBwdXNoVG9OZXh0SWZBdEVuZCkge1xuICBkZWNvcmF0ZWUgPSBkZWNvcmF0ZWUgfHwge307XG4gIHJhd1BhdGgudG90YWxMZW5ndGggfHwgY2FjaGVSYXdQYXRoTWVhc3VyZW1lbnRzKHJhd1BhdGgpO1xuXG4gIGlmIChwcm9ncmVzcyA8IDAgfHwgcHJvZ3Jlc3MgPiAxKSB7XG4gICAgcHJvZ3Jlc3MgPSBfd3JhcFByb2dyZXNzKHByb2dyZXNzKTtcbiAgfVxuXG4gIHZhciBzZWdJbmRleCA9IDAsXG4gICAgICBzZWdtZW50ID0gcmF3UGF0aFswXSxcbiAgICAgIHNhbXBsZXMsXG4gICAgICByZXNvbHV0aW9uLFxuICAgICAgbGVuZ3RoLFxuICAgICAgbWluLFxuICAgICAgbWF4LFxuICAgICAgaSxcbiAgICAgIHQ7XG5cbiAgaWYgKHJhd1BhdGgubGVuZ3RoID4gMSkge1xuICAgIC8vc3BlZWQgb3B0aW1pemF0aW9uOiBtb3N0IG9mIHRoZSB0aW1lLCB0aGVyZSdzIG9ubHkgb25lIHNlZ21lbnQgc28gc2tpcCB0aGUgcmVjdXJzaW9uLlxuICAgIGxlbmd0aCA9IHJhd1BhdGgudG90YWxMZW5ndGggKiBwcm9ncmVzcztcbiAgICBtYXggPSBpID0gMDtcblxuICAgIHdoaWxlICgobWF4ICs9IHJhd1BhdGhbaSsrXS50b3RhbExlbmd0aCkgPCBsZW5ndGgpIHtcbiAgICAgIHNlZ0luZGV4ID0gaTtcbiAgICB9XG5cbiAgICBzZWdtZW50ID0gcmF3UGF0aFtzZWdJbmRleF07XG4gICAgbWluID0gbWF4IC0gc2VnbWVudC50b3RhbExlbmd0aDtcbiAgICBwcm9ncmVzcyA9IChsZW5ndGggLSBtaW4pIC8gKG1heCAtIG1pbikgfHwgMDtcbiAgfVxuXG4gIHNhbXBsZXMgPSBzZWdtZW50LnNhbXBsZXM7XG4gIHJlc29sdXRpb24gPSBzZWdtZW50LnJlc29sdXRpb247IC8vaG93IG1hbnkgc2FtcGxlcyBwZXIgY3ViaWMgYmV6aWVyIGNodW5rXG5cbiAgbGVuZ3RoID0gc2VnbWVudC50b3RhbExlbmd0aCAqIHByb2dyZXNzO1xuICBpID0gc2VnbWVudC5sb29rdXBbfn4obGVuZ3RoIC8gc2VnbWVudC5taW5MZW5ndGgpXSB8fCAwO1xuICBtaW4gPSBpID8gc2FtcGxlc1tpIC0gMV0gOiAwO1xuICBtYXggPSBzYW1wbGVzW2ldO1xuXG4gIGlmIChtYXggPCBsZW5ndGgpIHtcbiAgICBtaW4gPSBtYXg7XG4gICAgbWF4ID0gc2FtcGxlc1srK2ldO1xuICB9XG5cbiAgdCA9IDEgLyByZXNvbHV0aW9uICogKChsZW5ndGggLSBtaW4pIC8gKG1heCAtIG1pbikgKyBpICUgcmVzb2x1dGlvbik7XG4gIGkgPSB+fihpIC8gcmVzb2x1dGlvbikgKiA2O1xuXG4gIGlmIChwdXNoVG9OZXh0SWZBdEVuZCAmJiB0ID09PSAxKSB7XG4gICAgaWYgKGkgKyA2IDwgc2VnbWVudC5sZW5ndGgpIHtcbiAgICAgIGkgKz0gNjtcbiAgICAgIHQgPSAwO1xuICAgIH0gZWxzZSBpZiAoc2VnSW5kZXggKyAxIDwgcmF3UGF0aC5sZW5ndGgpIHtcbiAgICAgIGkgPSB0ID0gMDtcbiAgICAgIHNlZ21lbnQgPSByYXdQYXRoWysrc2VnSW5kZXhdO1xuICAgIH1cbiAgfVxuXG4gIGRlY29yYXRlZS50ID0gdDtcbiAgZGVjb3JhdGVlLmkgPSBpO1xuICBkZWNvcmF0ZWUucGF0aCA9IHJhd1BhdGg7XG4gIGRlY29yYXRlZS5zZWdtZW50ID0gc2VnbWVudDtcbiAgZGVjb3JhdGVlLnNlZ0luZGV4ID0gc2VnSW5kZXg7XG4gIHJldHVybiBkZWNvcmF0ZWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQb3NpdGlvbk9uUGF0aChyYXdQYXRoLCBwcm9ncmVzcywgaW5jbHVkZUFuZ2xlLCBwb2ludCkge1xuICB2YXIgc2VnbWVudCA9IHJhd1BhdGhbMF0sXG4gICAgICByZXN1bHQgPSBwb2ludCB8fCB7fSxcbiAgICAgIHNhbXBsZXMsXG4gICAgICByZXNvbHV0aW9uLFxuICAgICAgbGVuZ3RoLFxuICAgICAgbWluLFxuICAgICAgbWF4LFxuICAgICAgaSxcbiAgICAgIHQsXG4gICAgICBhLFxuICAgICAgaW52O1xuXG4gIGlmIChwcm9ncmVzcyA8IDAgfHwgcHJvZ3Jlc3MgPiAxKSB7XG4gICAgcHJvZ3Jlc3MgPSBfd3JhcFByb2dyZXNzKHByb2dyZXNzKTtcbiAgfVxuXG4gIGlmIChyYXdQYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAvL3NwZWVkIG9wdGltaXphdGlvbjogbW9zdCBvZiB0aGUgdGltZSwgdGhlcmUncyBvbmx5IG9uZSBzZWdtZW50IHNvIHNraXAgdGhlIHJlY3Vyc2lvbi5cbiAgICBsZW5ndGggPSByYXdQYXRoLnRvdGFsTGVuZ3RoICogcHJvZ3Jlc3M7XG4gICAgbWF4ID0gaSA9IDA7XG5cbiAgICB3aGlsZSAoKG1heCArPSByYXdQYXRoW2krK10udG90YWxMZW5ndGgpIDwgbGVuZ3RoKSB7XG4gICAgICBzZWdtZW50ID0gcmF3UGF0aFtpXTtcbiAgICB9XG5cbiAgICBtaW4gPSBtYXggLSBzZWdtZW50LnRvdGFsTGVuZ3RoO1xuICAgIHByb2dyZXNzID0gKGxlbmd0aCAtIG1pbikgLyAobWF4IC0gbWluKSB8fCAwO1xuICB9XG5cbiAgc2FtcGxlcyA9IHNlZ21lbnQuc2FtcGxlcztcbiAgcmVzb2x1dGlvbiA9IHNlZ21lbnQucmVzb2x1dGlvbjtcbiAgbGVuZ3RoID0gc2VnbWVudC50b3RhbExlbmd0aCAqIHByb2dyZXNzO1xuICBpID0gc2VnbWVudC5sb29rdXBbfn4obGVuZ3RoIC8gc2VnbWVudC5taW5MZW5ndGgpXSB8fCAwO1xuICBtaW4gPSBpID8gc2FtcGxlc1tpIC0gMV0gOiAwO1xuICBtYXggPSBzYW1wbGVzW2ldO1xuXG4gIGlmIChtYXggPCBsZW5ndGgpIHtcbiAgICBtaW4gPSBtYXg7XG4gICAgbWF4ID0gc2FtcGxlc1srK2ldO1xuICB9XG5cbiAgdCA9IDEgLyByZXNvbHV0aW9uICogKChsZW5ndGggLSBtaW4pIC8gKG1heCAtIG1pbikgKyBpICUgcmVzb2x1dGlvbikgfHwgMDtcbiAgaW52ID0gMSAtIHQ7XG4gIGkgPSB+fihpIC8gcmVzb2x1dGlvbikgKiA2O1xuICBhID0gc2VnbWVudFtpXTtcbiAgcmVzdWx0LnggPSBfcm91bmQoKHQgKiB0ICogKHNlZ21lbnRbaSArIDZdIC0gYSkgKyAzICogaW52ICogKHQgKiAoc2VnbWVudFtpICsgNF0gLSBhKSArIGludiAqIChzZWdtZW50W2kgKyAyXSAtIGEpKSkgKiB0ICsgYSk7XG4gIHJlc3VsdC55ID0gX3JvdW5kKCh0ICogdCAqIChzZWdtZW50W2kgKyA3XSAtIChhID0gc2VnbWVudFtpICsgMV0pKSArIDMgKiBpbnYgKiAodCAqIChzZWdtZW50W2kgKyA1XSAtIGEpICsgaW52ICogKHNlZ21lbnRbaSArIDNdIC0gYSkpKSAqIHQgKyBhKTtcblxuICBpZiAoaW5jbHVkZUFuZ2xlKSB7XG4gICAgcmVzdWx0LmFuZ2xlID0gc2VnbWVudC50b3RhbExlbmd0aCA/IGdldFJvdGF0aW9uQXRCZXppZXJUKHNlZ21lbnQsIGksIHQgPj0gMSA/IDEgLSAxZS05IDogdCA/IHQgOiAxZS05KSA6IHNlZ21lbnQuYW5nbGUgfHwgMDtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59IC8vYXBwbGllcyBhIG1hdHJpeCB0cmFuc2Zvcm0gdG8gUmF3UGF0aCAob3IgYSBzZWdtZW50IGluIGEgUmF3UGF0aCkgYW5kIHJldHVybnMgd2hhdGV2ZXIgd2FzIHBhc3NlZCBpbiAoaXQgdHJhbnNmb3JtcyB0aGUgdmFsdWVzIGluIHRoZSBhcnJheShzKSwgbm90IGEgY29weSkuXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1SYXdQYXRoKHJhd1BhdGgsIGEsIGIsIGMsIGQsIHR4LCB0eSkge1xuICB2YXIgaiA9IHJhd1BhdGgubGVuZ3RoLFxuICAgICAgc2VnbWVudCxcbiAgICAgIGwsXG4gICAgICBpLFxuICAgICAgeCxcbiAgICAgIHk7XG5cbiAgd2hpbGUgKC0taiA+IC0xKSB7XG4gICAgc2VnbWVudCA9IHJhd1BhdGhbal07XG4gICAgbCA9IHNlZ21lbnQubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkgKz0gMikge1xuICAgICAgeCA9IHNlZ21lbnRbaV07XG4gICAgICB5ID0gc2VnbWVudFtpICsgMV07XG4gICAgICBzZWdtZW50W2ldID0geCAqIGEgKyB5ICogYyArIHR4O1xuICAgICAgc2VnbWVudFtpICsgMV0gPSB4ICogYiArIHkgKiBkICsgdHk7XG4gICAgfVxuICB9XG5cbiAgcmF3UGF0aC5fZGlydHkgPSAxO1xuICByZXR1cm4gcmF3UGF0aDtcbn0gLy8gdHJhbnNsYXRlcyBTVkcgYXJjIGRhdGEgaW50byBhIHNlZ21lbnQgKGN1YmljIGJlemllcnMpLiBBbmdsZSBpcyBpbiBkZWdyZWVzLlxuXG5mdW5jdGlvbiBhcmNUb1NlZ21lbnQobGFzdFgsIGxhc3RZLCByeCwgcnksIGFuZ2xlLCBsYXJnZUFyY0ZsYWcsIHN3ZWVwRmxhZywgeCwgeSkge1xuICBpZiAobGFzdFggPT09IHggJiYgbGFzdFkgPT09IHkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByeCA9IF9hYnMocngpO1xuICByeSA9IF9hYnMocnkpO1xuXG4gIHZhciBhbmdsZVJhZCA9IGFuZ2xlICUgMzYwICogX0RFRzJSQUQsXG4gICAgICBjb3NBbmdsZSA9IF9jb3MoYW5nbGVSYWQpLFxuICAgICAgc2luQW5nbGUgPSBfc2luKGFuZ2xlUmFkKSxcbiAgICAgIFBJID0gTWF0aC5QSSxcbiAgICAgIFRXT1BJID0gUEkgKiAyLFxuICAgICAgZHgyID0gKGxhc3RYIC0geCkgLyAyLFxuICAgICAgZHkyID0gKGxhc3RZIC0geSkgLyAyLFxuICAgICAgeDEgPSBjb3NBbmdsZSAqIGR4MiArIHNpbkFuZ2xlICogZHkyLFxuICAgICAgeTEgPSAtc2luQW5nbGUgKiBkeDIgKyBjb3NBbmdsZSAqIGR5MixcbiAgICAgIHgxX3NxID0geDEgKiB4MSxcbiAgICAgIHkxX3NxID0geTEgKiB5MSxcbiAgICAgIHJhZGlpQ2hlY2sgPSB4MV9zcSAvIChyeCAqIHJ4KSArIHkxX3NxIC8gKHJ5ICogcnkpO1xuXG4gIGlmIChyYWRpaUNoZWNrID4gMSkge1xuICAgIHJ4ID0gX3NxcnQocmFkaWlDaGVjaykgKiByeDtcbiAgICByeSA9IF9zcXJ0KHJhZGlpQ2hlY2spICogcnk7XG4gIH1cblxuICB2YXIgcnhfc3EgPSByeCAqIHJ4LFxuICAgICAgcnlfc3EgPSByeSAqIHJ5LFxuICAgICAgc3EgPSAocnhfc3EgKiByeV9zcSAtIHJ4X3NxICogeTFfc3EgLSByeV9zcSAqIHgxX3NxKSAvIChyeF9zcSAqIHkxX3NxICsgcnlfc3EgKiB4MV9zcSk7XG5cbiAgaWYgKHNxIDwgMCkge1xuICAgIHNxID0gMDtcbiAgfVxuXG4gIHZhciBjb2VmID0gKGxhcmdlQXJjRmxhZyA9PT0gc3dlZXBGbGFnID8gLTEgOiAxKSAqIF9zcXJ0KHNxKSxcbiAgICAgIGN4MSA9IGNvZWYgKiAocnggKiB5MSAvIHJ5KSxcbiAgICAgIGN5MSA9IGNvZWYgKiAtKHJ5ICogeDEgLyByeCksXG4gICAgICBzeDIgPSAobGFzdFggKyB4KSAvIDIsXG4gICAgICBzeTIgPSAobGFzdFkgKyB5KSAvIDIsXG4gICAgICBjeCA9IHN4MiArIChjb3NBbmdsZSAqIGN4MSAtIHNpbkFuZ2xlICogY3kxKSxcbiAgICAgIGN5ID0gc3kyICsgKHNpbkFuZ2xlICogY3gxICsgY29zQW5nbGUgKiBjeTEpLFxuICAgICAgdXggPSAoeDEgLSBjeDEpIC8gcngsXG4gICAgICB1eSA9ICh5MSAtIGN5MSkgLyByeSxcbiAgICAgIHZ4ID0gKC14MSAtIGN4MSkgLyByeCxcbiAgICAgIHZ5ID0gKC15MSAtIGN5MSkgLyByeSxcbiAgICAgIHRlbXAgPSB1eCAqIHV4ICsgdXkgKiB1eSxcbiAgICAgIGFuZ2xlU3RhcnQgPSAodXkgPCAwID8gLTEgOiAxKSAqIE1hdGguYWNvcyh1eCAvIF9zcXJ0KHRlbXApKSxcbiAgICAgIGFuZ2xlRXh0ZW50ID0gKHV4ICogdnkgLSB1eSAqIHZ4IDwgMCA/IC0xIDogMSkgKiBNYXRoLmFjb3MoKHV4ICogdnggKyB1eSAqIHZ5KSAvIF9zcXJ0KHRlbXAgKiAodnggKiB2eCArIHZ5ICogdnkpKSk7XG5cbiAgaXNOYU4oYW5nbGVFeHRlbnQpICYmIChhbmdsZUV4dGVudCA9IFBJKTsgLy9yYXJlIGVkZ2UgY2FzZS4gTWF0aC5jb3MoLTEpIGlzIE5hTi5cblxuICBpZiAoIXN3ZWVwRmxhZyAmJiBhbmdsZUV4dGVudCA+IDApIHtcbiAgICBhbmdsZUV4dGVudCAtPSBUV09QSTtcbiAgfSBlbHNlIGlmIChzd2VlcEZsYWcgJiYgYW5nbGVFeHRlbnQgPCAwKSB7XG4gICAgYW5nbGVFeHRlbnQgKz0gVFdPUEk7XG4gIH1cblxuICBhbmdsZVN0YXJ0ICU9IFRXT1BJO1xuICBhbmdsZUV4dGVudCAlPSBUV09QSTtcblxuICB2YXIgc2VnbWVudHMgPSBNYXRoLmNlaWwoX2FicyhhbmdsZUV4dGVudCkgLyAoVFdPUEkgLyA0KSksXG4gICAgICByYXdQYXRoID0gW10sXG4gICAgICBhbmdsZUluY3JlbWVudCA9IGFuZ2xlRXh0ZW50IC8gc2VnbWVudHMsXG4gICAgICBjb250cm9sTGVuZ3RoID0gNCAvIDMgKiBfc2luKGFuZ2xlSW5jcmVtZW50IC8gMikgLyAoMSArIF9jb3MoYW5nbGVJbmNyZW1lbnQgLyAyKSksXG4gICAgICBtYSA9IGNvc0FuZ2xlICogcngsXG4gICAgICBtYiA9IHNpbkFuZ2xlICogcngsXG4gICAgICBtYyA9IHNpbkFuZ2xlICogLXJ5LFxuICAgICAgbWQgPSBjb3NBbmdsZSAqIHJ5LFxuICAgICAgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc2VnbWVudHM7IGkrKykge1xuICAgIGFuZ2xlID0gYW5nbGVTdGFydCArIGkgKiBhbmdsZUluY3JlbWVudDtcbiAgICB4MSA9IF9jb3MoYW5nbGUpO1xuICAgIHkxID0gX3NpbihhbmdsZSk7XG4gICAgdXggPSBfY29zKGFuZ2xlICs9IGFuZ2xlSW5jcmVtZW50KTtcbiAgICB1eSA9IF9zaW4oYW5nbGUpO1xuICAgIHJhd1BhdGgucHVzaCh4MSAtIGNvbnRyb2xMZW5ndGggKiB5MSwgeTEgKyBjb250cm9sTGVuZ3RoICogeDEsIHV4ICsgY29udHJvbExlbmd0aCAqIHV5LCB1eSAtIGNvbnRyb2xMZW5ndGggKiB1eCwgdXgsIHV5KTtcbiAgfSAvL25vdyB0cmFuc2Zvcm0gYWNjb3JkaW5nIHRvIHRoZSBhY3R1YWwgc2l6ZSBvZiB0aGUgZWxsaXBzZS9hcmMgKHRoZSBiZXppZXJzIHdlcmUgbm9yYW1saXplZCwgYmV0d2VlbiAwIGFuZCAxIG9uIGEgY2lyY2xlKS5cblxuXG4gIGZvciAoaSA9IDA7IGkgPCByYXdQYXRoLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgeDEgPSByYXdQYXRoW2ldO1xuICAgIHkxID0gcmF3UGF0aFtpICsgMV07XG4gICAgcmF3UGF0aFtpXSA9IHgxICogbWEgKyB5MSAqIG1jICsgY3g7XG4gICAgcmF3UGF0aFtpICsgMV0gPSB4MSAqIG1iICsgeTEgKiBtZCArIGN5O1xuICB9XG5cbiAgcmF3UGF0aFtpIC0gMl0gPSB4OyAvL2Fsd2F5cyBzZXQgdGhlIGVuZCB0byBleGFjdGx5IHdoZXJlIGl0J3Mgc3VwcG9zZWQgdG8gYmVcblxuICByYXdQYXRoW2kgLSAxXSA9IHk7XG4gIHJldHVybiByYXdQYXRoO1xufSAvL1NwaXRzIGJhY2sgYSBSYXdQYXRoIHdpdGggYWJzb2x1dGUgY29vcmRpbmF0ZXMuIEVhY2ggc2VnbWVudCBzdGFydHMgd2l0aCBhIFwibW92ZVRvXCIgY29tbWFuZCAoeCBjb29yZGluYXRlLCB0aGVuIHkpIGFuZCB0aGVuIDIgY29udHJvbCBwb2ludHMgKHgsIHksIHgsIHkpLCB0aGVuIGFuY2hvci4gVGhlIGdvYWwgaXMgdG8gbWluaW1pemUgbWVtb3J5IGFuZCBtYXhpbWl6ZSBzcGVlZC5cblxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9SYXdQYXRoKGQpIHtcbiAgdmFyIGEgPSAoZCArIFwiXCIpLnJlcGxhY2UoX3NjaWVudGlmaWMsIGZ1bmN0aW9uIChtKSB7XG4gICAgdmFyIG4gPSArbTtcbiAgICByZXR1cm4gbiA8IDAuMDAwMSAmJiBuID4gLTAuMDAwMSA/IDAgOiBuO1xuICB9KS5tYXRjaChfc3ZnUGF0aEV4cCkgfHwgW10sXG4gICAgICAvL3NvbWUgYXV0aG9yaW5nIHByb2dyYW1zIHNwaXQgb3V0IHZlcnkgc21hbGwgbnVtYmVycyBpbiBzY2llbnRpZmljIG5vdGF0aW9uIGxpa2UgXCIxZS01XCIsIHNvIG1ha2Ugc3VyZSB3ZSByb3VuZCB0aGF0IGRvd24gdG8gMCBmaXJzdC5cbiAgcGF0aCA9IFtdLFxuICAgICAgcmVsYXRpdmVYID0gMCxcbiAgICAgIHJlbGF0aXZlWSA9IDAsXG4gICAgICB0d29UaGlyZHMgPSAyIC8gMyxcbiAgICAgIGVsZW1lbnRzID0gYS5sZW5ndGgsXG4gICAgICBwb2ludHMgPSAwLFxuICAgICAgZXJyb3JNZXNzYWdlID0gXCJFUlJPUjogbWFsZm9ybWVkIHBhdGg6IFwiICsgZCxcbiAgICAgIGksXG4gICAgICBqLFxuICAgICAgeCxcbiAgICAgIHksXG4gICAgICBjb21tYW5kLFxuICAgICAgaXNSZWxhdGl2ZSxcbiAgICAgIHNlZ21lbnQsXG4gICAgICBzdGFydFgsXG4gICAgICBzdGFydFksXG4gICAgICBkaWZYLFxuICAgICAgZGlmWSxcbiAgICAgIGJlemllcnMsXG4gICAgICBwcmV2Q29tbWFuZCxcbiAgICAgIGZsYWcxLFxuICAgICAgZmxhZzIsXG4gICAgICBsaW5lID0gZnVuY3Rpb24gbGluZShzeCwgc3ksIGV4LCBleSkge1xuICAgIGRpZlggPSAoZXggLSBzeCkgLyAzO1xuICAgIGRpZlkgPSAoZXkgLSBzeSkgLyAzO1xuICAgIHNlZ21lbnQucHVzaChzeCArIGRpZlgsIHN5ICsgZGlmWSwgZXggLSBkaWZYLCBleSAtIGRpZlksIGV4LCBleSk7XG4gIH07XG5cbiAgaWYgKCFkIHx8ICFpc05hTihhWzBdKSB8fCBpc05hTihhWzFdKSkge1xuICAgIGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSk7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZWxlbWVudHM7IGkrKykge1xuICAgIHByZXZDb21tYW5kID0gY29tbWFuZDtcblxuICAgIGlmIChpc05hTihhW2ldKSkge1xuICAgICAgY29tbWFuZCA9IGFbaV0udG9VcHBlckNhc2UoKTtcbiAgICAgIGlzUmVsYXRpdmUgPSBjb21tYW5kICE9PSBhW2ldOyAvL2xvd2VyIGNhc2UgbWVhbnMgcmVsYXRpdmVcbiAgICB9IGVsc2Uge1xuICAgICAgLy9jb21tYW5kcyBsaWtlIFwiQ1wiIGNhbiBiZSBzdHJ1bmcgdG9nZXRoZXIgd2l0aG91dCBhbnkgbmV3IGNvbW1hbmQgY2hhcmFjdGVycyBiZXR3ZWVuLlxuICAgICAgaS0tO1xuICAgIH1cblxuICAgIHggPSArYVtpICsgMV07XG4gICAgeSA9ICthW2kgKyAyXTtcblxuICAgIGlmIChpc1JlbGF0aXZlKSB7XG4gICAgICB4ICs9IHJlbGF0aXZlWDtcbiAgICAgIHkgKz0gcmVsYXRpdmVZO1xuICAgIH1cblxuICAgIGlmICghaSkge1xuICAgICAgc3RhcnRYID0geDtcbiAgICAgIHN0YXJ0WSA9IHk7XG4gICAgfSAvLyBcIk1cIiAobW92ZSlcblxuXG4gICAgaWYgKGNvbW1hbmQgPT09IFwiTVwiKSB7XG4gICAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICBpZiAoc2VnbWVudC5sZW5ndGggPCA4KSB7XG4gICAgICAgICAgLy9pZiB0aGUgcGF0aCBkYXRhIHdhcyBmdW5reSBhbmQganVzdCBoYWQgYSBNIHdpdGggbm8gYWN0dWFsIGRyYXdpbmcgYW55d2hlcmUsIHNraXAgaXQuXG4gICAgICAgICAgcGF0aC5sZW5ndGggLT0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb2ludHMgKz0gc2VnbWVudC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVsYXRpdmVYID0gc3RhcnRYID0geDtcbiAgICAgIHJlbGF0aXZlWSA9IHN0YXJ0WSA9IHk7XG4gICAgICBzZWdtZW50ID0gW3gsIHldO1xuICAgICAgcGF0aC5wdXNoKHNlZ21lbnQpO1xuICAgICAgaSArPSAyO1xuICAgICAgY29tbWFuZCA9IFwiTFwiOyAvL2FuIFwiTVwiIHdpdGggbW9yZSB0aGFuIDIgdmFsdWVzIGdldHMgaW50ZXJwcmV0ZWQgYXMgXCJsaW5lVG9cIiBjb21tYW5kcyAoXCJMXCIpLlxuICAgICAgLy8gXCJDXCIgKGN1YmljIGJlemllcilcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09IFwiQ1wiKSB7XG4gICAgICBpZiAoIXNlZ21lbnQpIHtcbiAgICAgICAgc2VnbWVudCA9IFswLCAwXTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc1JlbGF0aXZlKSB7XG4gICAgICAgIHJlbGF0aXZlWCA9IHJlbGF0aXZlWSA9IDA7XG4gICAgICB9IC8vbm90ZTogXCIqMVwiIGlzIGp1c3QgYSBmYXN0L3Nob3J0IHdheSB0byBjYXN0IHRoZSB2YWx1ZSBhcyBhIE51bWJlci4gV0FBQVkgZmFzdGVyIGluIENocm9tZSwgc2xpZ2h0bHkgc2xvd2VyIGluIEZpcmVmb3guXG5cblxuICAgICAgc2VnbWVudC5wdXNoKHgsIHksIHJlbGF0aXZlWCArIGFbaSArIDNdICogMSwgcmVsYXRpdmVZICsgYVtpICsgNF0gKiAxLCByZWxhdGl2ZVggKz0gYVtpICsgNV0gKiAxLCByZWxhdGl2ZVkgKz0gYVtpICsgNl0gKiAxKTtcbiAgICAgIGkgKz0gNjsgLy8gXCJTXCIgKGNvbnRpbnVhdGlvbiBvZiBjdWJpYyBiZXppZXIpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSBcIlNcIikge1xuICAgICAgZGlmWCA9IHJlbGF0aXZlWDtcbiAgICAgIGRpZlkgPSByZWxhdGl2ZVk7XG5cbiAgICAgIGlmIChwcmV2Q29tbWFuZCA9PT0gXCJDXCIgfHwgcHJldkNvbW1hbmQgPT09IFwiU1wiKSB7XG4gICAgICAgIGRpZlggKz0gcmVsYXRpdmVYIC0gc2VnbWVudFtzZWdtZW50Lmxlbmd0aCAtIDRdO1xuICAgICAgICBkaWZZICs9IHJlbGF0aXZlWSAtIHNlZ21lbnRbc2VnbWVudC5sZW5ndGggLSAzXTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc1JlbGF0aXZlKSB7XG4gICAgICAgIHJlbGF0aXZlWCA9IHJlbGF0aXZlWSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHNlZ21lbnQucHVzaChkaWZYLCBkaWZZLCB4LCB5LCByZWxhdGl2ZVggKz0gYVtpICsgM10gKiAxLCByZWxhdGl2ZVkgKz0gYVtpICsgNF0gKiAxKTtcbiAgICAgIGkgKz0gNDsgLy8gXCJRXCIgKHF1YWRyYXRpYyBiZXppZXIpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSBcIlFcIikge1xuICAgICAgZGlmWCA9IHJlbGF0aXZlWCArICh4IC0gcmVsYXRpdmVYKSAqIHR3b1RoaXJkcztcbiAgICAgIGRpZlkgPSByZWxhdGl2ZVkgKyAoeSAtIHJlbGF0aXZlWSkgKiB0d29UaGlyZHM7XG5cbiAgICAgIGlmICghaXNSZWxhdGl2ZSkge1xuICAgICAgICByZWxhdGl2ZVggPSByZWxhdGl2ZVkgPSAwO1xuICAgICAgfVxuXG4gICAgICByZWxhdGl2ZVggKz0gYVtpICsgM10gKiAxO1xuICAgICAgcmVsYXRpdmVZICs9IGFbaSArIDRdICogMTtcbiAgICAgIHNlZ21lbnQucHVzaChkaWZYLCBkaWZZLCByZWxhdGl2ZVggKyAoeCAtIHJlbGF0aXZlWCkgKiB0d29UaGlyZHMsIHJlbGF0aXZlWSArICh5IC0gcmVsYXRpdmVZKSAqIHR3b1RoaXJkcywgcmVsYXRpdmVYLCByZWxhdGl2ZVkpO1xuICAgICAgaSArPSA0OyAvLyBcIlRcIiAoY29udGludWF0aW9uIG9mIHF1YWRyYXRpYyBiZXppZXIpXG4gICAgfSBlbHNlIGlmIChjb21tYW5kID09PSBcIlRcIikge1xuICAgICAgZGlmWCA9IHJlbGF0aXZlWCAtIHNlZ21lbnRbc2VnbWVudC5sZW5ndGggLSA0XTtcbiAgICAgIGRpZlkgPSByZWxhdGl2ZVkgLSBzZWdtZW50W3NlZ21lbnQubGVuZ3RoIC0gM107XG4gICAgICBzZWdtZW50LnB1c2gocmVsYXRpdmVYICsgZGlmWCwgcmVsYXRpdmVZICsgZGlmWSwgeCArIChyZWxhdGl2ZVggKyBkaWZYICogMS41IC0geCkgKiB0d29UaGlyZHMsIHkgKyAocmVsYXRpdmVZICsgZGlmWSAqIDEuNSAtIHkpICogdHdvVGhpcmRzLCByZWxhdGl2ZVggPSB4LCByZWxhdGl2ZVkgPSB5KTtcbiAgICAgIGkgKz0gMjsgLy8gXCJIXCIgKGhvcml6b250YWwgbGluZSlcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09IFwiSFwiKSB7XG4gICAgICBsaW5lKHJlbGF0aXZlWCwgcmVsYXRpdmVZLCByZWxhdGl2ZVggPSB4LCByZWxhdGl2ZVkpO1xuICAgICAgaSArPSAxOyAvLyBcIlZcIiAodmVydGljYWwgbGluZSlcbiAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09IFwiVlwiKSB7XG4gICAgICAvL2FkanVzdCB2YWx1ZXMgYmVjYXVzZSB0aGUgZmlyc3QgKGFuZCBvbmx5IG9uZSkgaXNuJ3QgeCBpbiB0aGlzIGNhc2UsIGl0J3MgeS5cbiAgICAgIGxpbmUocmVsYXRpdmVYLCByZWxhdGl2ZVksIHJlbGF0aXZlWCwgcmVsYXRpdmVZID0geCArIChpc1JlbGF0aXZlID8gcmVsYXRpdmVZIC0gcmVsYXRpdmVYIDogMCkpO1xuICAgICAgaSArPSAxOyAvLyBcIkxcIiAobGluZSkgb3IgXCJaXCIgKGNsb3NlKVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gXCJMXCIgfHwgY29tbWFuZCA9PT0gXCJaXCIpIHtcbiAgICAgIGlmIChjb21tYW5kID09PSBcIlpcIikge1xuICAgICAgICB4ID0gc3RhcnRYO1xuICAgICAgICB5ID0gc3RhcnRZO1xuICAgICAgICBzZWdtZW50LmNsb3NlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21tYW5kID09PSBcIkxcIiB8fCBfYWJzKHJlbGF0aXZlWCAtIHgpID4gMC41IHx8IF9hYnMocmVsYXRpdmVZIC0geSkgPiAwLjUpIHtcbiAgICAgICAgbGluZShyZWxhdGl2ZVgsIHJlbGF0aXZlWSwgeCwgeSk7XG5cbiAgICAgICAgaWYgKGNvbW1hbmQgPT09IFwiTFwiKSB7XG4gICAgICAgICAgaSArPSAyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlbGF0aXZlWCA9IHg7XG4gICAgICByZWxhdGl2ZVkgPSB5OyAvLyBcIkFcIiAoYXJjKVxuICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gXCJBXCIpIHtcbiAgICAgIGZsYWcxID0gYVtpICsgNF07XG4gICAgICBmbGFnMiA9IGFbaSArIDVdO1xuICAgICAgZGlmWCA9IGFbaSArIDZdO1xuICAgICAgZGlmWSA9IGFbaSArIDddO1xuICAgICAgaiA9IDc7XG5cbiAgICAgIGlmIChmbGFnMS5sZW5ndGggPiAxKSB7XG4gICAgICAgIC8vIGZvciBjYXNlcyB3aGVuIHRoZSBmbGFncyBhcmUgbWVyZ2VkLCBsaWtlIFwiYTggOCAwIDAxOCA4XCIgKHRoZSAwIGFuZCAxIGZsYWdzIGFyZSBXSVRIIHRoZSB4IHZhbHVlIG9mIDgsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIFwiYTggOCAwIDAxLTggOFwiIHNvIGl0IG1heSBpbmNsdWRlIHggb3Igbm90KVxuICAgICAgICBpZiAoZmxhZzEubGVuZ3RoIDwgMykge1xuICAgICAgICAgIGRpZlkgPSBkaWZYO1xuICAgICAgICAgIGRpZlggPSBmbGFnMjtcbiAgICAgICAgICBqLS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlmWSA9IGZsYWcyO1xuICAgICAgICAgIGRpZlggPSBmbGFnMS5zdWJzdHIoMik7XG4gICAgICAgICAgaiAtPSAyO1xuICAgICAgICB9XG5cbiAgICAgICAgZmxhZzIgPSBmbGFnMS5jaGFyQXQoMSk7XG4gICAgICAgIGZsYWcxID0gZmxhZzEuY2hhckF0KDApO1xuICAgICAgfVxuXG4gICAgICBiZXppZXJzID0gYXJjVG9TZWdtZW50KHJlbGF0aXZlWCwgcmVsYXRpdmVZLCArYVtpICsgMV0sICthW2kgKyAyXSwgK2FbaSArIDNdLCArZmxhZzEsICtmbGFnMiwgKGlzUmVsYXRpdmUgPyByZWxhdGl2ZVggOiAwKSArIGRpZlggKiAxLCAoaXNSZWxhdGl2ZSA/IHJlbGF0aXZlWSA6IDApICsgZGlmWSAqIDEpO1xuICAgICAgaSArPSBqO1xuXG4gICAgICBpZiAoYmV6aWVycykge1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgYmV6aWVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHNlZ21lbnQucHVzaChiZXppZXJzW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZWxhdGl2ZVggPSBzZWdtZW50W3NlZ21lbnQubGVuZ3RoIC0gMl07XG4gICAgICByZWxhdGl2ZVkgPSBzZWdtZW50W3NlZ21lbnQubGVuZ3RoIC0gMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yTWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgaSA9IHNlZ21lbnQubGVuZ3RoO1xuXG4gIGlmIChpIDwgNikge1xuICAgIC8vaW4gY2FzZSB0aGVyZSdzIG9kZCBTVkcgbGlrZSBhIE0wLDAgY29tbWFuZCBhdCB0aGUgdmVyeSBlbmQuXG4gICAgcGF0aC5wb3AoKTtcbiAgICBpID0gMDtcbiAgfSBlbHNlIGlmIChzZWdtZW50WzBdID09PSBzZWdtZW50W2kgLSAyXSAmJiBzZWdtZW50WzFdID09PSBzZWdtZW50W2kgLSAxXSkge1xuICAgIHNlZ21lbnQuY2xvc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIHBhdGgudG90YWxQb2ludHMgPSBwb2ludHMgKyBpO1xuICByZXR1cm4gcGF0aDtcbn0gLy9wb3B1bGF0ZXMgdGhlIHBvaW50cyBhcnJheSBpbiBhbHRlcm5hdGluZyB4L3kgdmFsdWVzIChsaWtlIFt4LCB5LCB4LCB5Li4uXSBpbnN0ZWFkIG9mIGluZGl2aWR1YWwgcG9pbnQgb2JqZWN0cyBbe3gsIHl9LCB7eCwgeX0uLi5dIHRvIGNvbnNlcnZlIG1lbW9yeSBhbmQgc3RheSBpbiBsaW5lIHdpdGggaG93IHdlJ3JlIGhhbmRsaW5nIHNlZ21lbnQgYXJyYXlzXG5cbmV4cG9ydCBmdW5jdGlvbiBiZXppZXJUb1BvaW50cyh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzLCB4NCwgeTQsIHRocmVzaG9sZCwgcG9pbnRzLCBpbmRleCkge1xuICB2YXIgeDEyID0gKHgxICsgeDIpIC8gMixcbiAgICAgIHkxMiA9ICh5MSArIHkyKSAvIDIsXG4gICAgICB4MjMgPSAoeDIgKyB4MykgLyAyLFxuICAgICAgeTIzID0gKHkyICsgeTMpIC8gMixcbiAgICAgIHgzNCA9ICh4MyArIHg0KSAvIDIsXG4gICAgICB5MzQgPSAoeTMgKyB5NCkgLyAyLFxuICAgICAgeDEyMyA9ICh4MTIgKyB4MjMpIC8gMixcbiAgICAgIHkxMjMgPSAoeTEyICsgeTIzKSAvIDIsXG4gICAgICB4MjM0ID0gKHgyMyArIHgzNCkgLyAyLFxuICAgICAgeTIzNCA9ICh5MjMgKyB5MzQpIC8gMixcbiAgICAgIHgxMjM0ID0gKHgxMjMgKyB4MjM0KSAvIDIsXG4gICAgICB5MTIzNCA9ICh5MTIzICsgeTIzNCkgLyAyLFxuICAgICAgZHggPSB4NCAtIHgxLFxuICAgICAgZHkgPSB5NCAtIHkxLFxuICAgICAgZDIgPSBfYWJzKCh4MiAtIHg0KSAqIGR5IC0gKHkyIC0geTQpICogZHgpLFxuICAgICAgZDMgPSBfYWJzKCh4MyAtIHg0KSAqIGR5IC0gKHkzIC0geTQpICogZHgpLFxuICAgICAgbGVuZ3RoO1xuXG4gIGlmICghcG9pbnRzKSB7XG4gICAgcG9pbnRzID0gW3gxLCB5MSwgeDQsIHk0XTtcbiAgICBpbmRleCA9IDI7XG4gIH1cblxuICBwb2ludHMuc3BsaWNlKGluZGV4IHx8IHBvaW50cy5sZW5ndGggLSAyLCAwLCB4MTIzNCwgeTEyMzQpO1xuXG4gIGlmICgoZDIgKyBkMykgKiAoZDIgKyBkMykgPiB0aHJlc2hvbGQgKiAoZHggKiBkeCArIGR5ICogZHkpKSB7XG4gICAgbGVuZ3RoID0gcG9pbnRzLmxlbmd0aDtcbiAgICBiZXppZXJUb1BvaW50cyh4MSwgeTEsIHgxMiwgeTEyLCB4MTIzLCB5MTIzLCB4MTIzNCwgeTEyMzQsIHRocmVzaG9sZCwgcG9pbnRzLCBpbmRleCk7XG4gICAgYmV6aWVyVG9Qb2ludHMoeDEyMzQsIHkxMjM0LCB4MjM0LCB5MjM0LCB4MzQsIHkzNCwgeDQsIHk0LCB0aHJlc2hvbGQsIHBvaW50cywgaW5kZXggKyAyICsgKHBvaW50cy5sZW5ndGggLSBsZW5ndGgpKTtcbiAgfVxuXG4gIHJldHVybiBwb2ludHM7XG59XG4vKlxuZnVuY3Rpb24gZ2V0QW5nbGVCZXR3ZWVuUG9pbnRzKHgwLCB5MCwgeDEsIHkxLCB4MiwgeTIpIHsgLy9hbmdsZSBiZXR3ZWVuIDMgcG9pbnRzIGluIHJhZGlhbnNcblx0dmFyIGR4MSA9IHgxIC0geDAsXG5cdFx0ZHkxID0geTEgLSB5MCxcblx0XHRkeDIgPSB4MiAtIHgxLFxuXHRcdGR5MiA9IHkyIC0geTEsXG5cdFx0ZHgzID0geDIgLSB4MCxcblx0XHRkeTMgPSB5MiAtIHkwLFxuXHRcdGEgPSBkeDEgKiBkeDEgKyBkeTEgKiBkeTEsXG5cdFx0YiA9IGR4MiAqIGR4MiArIGR5MiAqIGR5Mixcblx0XHRjID0gZHgzICogZHgzICsgZHkzICogZHkzO1xuXHRyZXR1cm4gTWF0aC5hY29zKCAoYSArIGIgLSBjKSAvIF9zcXJ0KDQgKiBhICogYikgKTtcbn0sXG4qL1xuLy9wb2ludHNUb1NlZ21lbnQoKSBkb2Vzbid0IGhhbmRsZSBmbGF0IGNvb3JkaW5hdGVzICh3aGVyZSB5IGlzIGFsd2F5cyAwKSB0aGUgd2F5IHdlIG5lZWQgKHRoZSByZXN1bHRpbmcgY29udHJvbCBwb2ludHMgYXJlIGFsd2F5cyByaWdodCBvbiB0b3Agb2YgdGhlIGFuY2hvcnMpLCBzbyB0aGlzIGZ1bmN0aW9uIGJhc2ljYWxseSBtYWtlcyB0aGUgY29udHJvbCBwb2ludHMgZ28gZGlyZWN0bHkgdXAgYW5kIGRvd24sIHZhcnlpbmcgaW4gbGVuZ3RoIGJhc2VkIG9uIHRoZSBjdXJ2aW5lc3MgKG1vcmUgY3VydnksIGZ1cnRoZXIgY29udHJvbCBwb2ludHMpXG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0UG9pbnRzVG9TZWdtZW50KHBvaW50cywgY3VydmluZXNzKSB7XG4gIGlmIChjdXJ2aW5lc3MgPT09IHZvaWQgMCkge1xuICAgIGN1cnZpbmVzcyA9IDE7XG4gIH1cblxuICB2YXIgeCA9IHBvaW50c1swXSxcbiAgICAgIHkgPSAwLFxuICAgICAgc2VnbWVudCA9IFt4LCB5XSxcbiAgICAgIGkgPSAyO1xuXG4gIGZvciAoOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgc2VnbWVudC5wdXNoKHgsIHksIHBvaW50c1tpXSwgeSA9IChwb2ludHNbaV0gLSB4KSAqIGN1cnZpbmVzcyAvIDIsIHggPSBwb2ludHNbaV0sIC15KTtcbiAgfVxuXG4gIHJldHVybiBzZWdtZW50O1xufSAvL3BvaW50cyBpcyBhbiBhcnJheSBvZiB4L3kgcG9pbnRzLCBsaWtlIFt4LCB5LCB4LCB5LCB4LCB5XVxuXG5leHBvcnQgZnVuY3Rpb24gcG9pbnRzVG9TZWdtZW50KHBvaW50cywgY3VydmluZXNzLCBjb3JuZXJUaHJlc2hvbGQpIHtcbiAgLy9wb2ludHMgPSBzaW1wbGlmeVBvaW50cyhwb2ludHMsIHRvbGVyYW5jZSk7XG4gIHZhciBsID0gcG9pbnRzLmxlbmd0aCAtIDIsXG4gICAgICB4ID0gK3BvaW50c1swXSxcbiAgICAgIHkgPSArcG9pbnRzWzFdLFxuICAgICAgbmV4dFggPSArcG9pbnRzWzJdLFxuICAgICAgbmV4dFkgPSArcG9pbnRzWzNdLFxuICAgICAgc2VnbWVudCA9IFt4LCB5LCB4LCB5XSxcbiAgICAgIGR4MiA9IG5leHRYIC0geCxcbiAgICAgIGR5MiA9IG5leHRZIC0geSxcbiAgICAgIGNsb3NlZCA9IE1hdGguYWJzKHBvaW50c1tsXSAtIHgpIDwgMC4wMDEgJiYgTWF0aC5hYnMocG9pbnRzW2wgKyAxXSAtIHkpIDwgMC4wMDEsXG4gICAgICBwcmV2WCxcbiAgICAgIHByZXZZLFxuICAgICAgYW5nbGUsXG4gICAgICBzbG9wZSxcbiAgICAgIGksXG4gICAgICBkeDEsXG4gICAgICBkeDMsXG4gICAgICBkeTEsXG4gICAgICBkeTMsXG4gICAgICBkMSxcbiAgICAgIGQyLFxuICAgICAgYSxcbiAgICAgIGIsXG4gICAgICBjO1xuXG4gIGlmIChpc05hTihjb3JuZXJUaHJlc2hvbGQpKSB7XG4gICAgY29ybmVyVGhyZXNob2xkID0gTWF0aC5QSSAvIDEwO1xuICB9XG5cbiAgaWYgKGNsb3NlZCkge1xuICAgIC8vIGlmIHRoZSBzdGFydCBhbmQgZW5kIHBvaW50cyBhcmUgYmFzaWNhbGx5IG9uIHRvcCBvZiBlYWNoIG90aGVyLCBjbG9zZSB0aGUgc2VnbWVudCBieSBhZGRpbmcgdGhlIDJuZCBwb2ludCB0byB0aGUgZW5kLCBhbmQgdGhlIDJuZC10by1sYXN0IHBvaW50IHRvIHRoZSBiZWdpbm5pbmcgKHdlJ2xsIHJlbW92ZSB0aGVtIGF0IHRoZSBlbmQsIGJ1dCB0aGlzIGFsbG93cyB0aGUgY3VydmF0dXJlIHRvIGxvb2sgcGVyZmVjdClcbiAgICBwb2ludHMucHVzaChuZXh0WCwgbmV4dFkpO1xuICAgIG5leHRYID0geDtcbiAgICBuZXh0WSA9IHk7XG4gICAgeCA9IHBvaW50c1tsIC0gMl07XG4gICAgeSA9IHBvaW50c1tsIC0gMV07XG4gICAgcG9pbnRzLnVuc2hpZnQoeCwgeSk7XG4gICAgbCArPSA0O1xuICB9XG5cbiAgY3VydmluZXNzID0gY3VydmluZXNzIHx8IGN1cnZpbmVzcyA9PT0gMCA/ICtjdXJ2aW5lc3MgOiAxO1xuXG4gIGZvciAoaSA9IDI7IGkgPCBsOyBpICs9IDIpIHtcbiAgICBwcmV2WCA9IHg7XG4gICAgcHJldlkgPSB5O1xuICAgIHggPSBuZXh0WDtcbiAgICB5ID0gbmV4dFk7XG4gICAgbmV4dFggPSArcG9pbnRzW2kgKyAyXTtcbiAgICBuZXh0WSA9ICtwb2ludHNbaSArIDNdO1xuICAgIGR4MSA9IGR4MjtcbiAgICBkeTEgPSBkeTI7XG4gICAgZHgyID0gbmV4dFggLSB4O1xuICAgIGR5MiA9IG5leHRZIC0geTtcbiAgICBkeDMgPSBuZXh0WCAtIHByZXZYO1xuICAgIGR5MyA9IG5leHRZIC0gcHJldlk7XG4gICAgYSA9IGR4MSAqIGR4MSArIGR5MSAqIGR5MTtcbiAgICBiID0gZHgyICogZHgyICsgZHkyICogZHkyO1xuICAgIGMgPSBkeDMgKiBkeDMgKyBkeTMgKiBkeTM7XG4gICAgYW5nbGUgPSBNYXRoLmFjb3MoKGEgKyBiIC0gYykgLyBfc3FydCg0ICogYSAqIGIpKTsgLy9hbmdsZSBiZXR3ZWVuIHRoZSAzIHBvaW50c1xuXG4gICAgZDIgPSBhbmdsZSAvIE1hdGguUEkgKiBjdXJ2aW5lc3M7IC8vdGVtcG9yYXJ5IHByZWNhbGN1bGF0aW9uIGZvciBzcGVlZCAocmV1c2luZyBkMiB2YXJpYWJsZSlcblxuICAgIGQxID0gX3NxcnQoYSkgKiBkMjsgLy90aGUgdGlnaHRlciB0aGUgYW5nbGUsIHRoZSBzaG9ydGVyIHdlIG1ha2UgdGhlIGhhbmRsZXMgaW4gcHJvcG9ydGlvbi5cblxuICAgIGQyICo9IF9zcXJ0KGIpO1xuXG4gICAgaWYgKHggIT09IHByZXZYIHx8IHkgIT09IHByZXZZKSB7XG4gICAgICBpZiAoYW5nbGUgPiBjb3JuZXJUaHJlc2hvbGQpIHtcbiAgICAgICAgc2xvcGUgPSBfYXRhbjIoZHkzLCBkeDMpO1xuICAgICAgICBzZWdtZW50LnB1c2goX3JvdW5kKHggLSBfY29zKHNsb3BlKSAqIGQxKSwgLy9maXJzdCBjb250cm9sIHBvaW50XG4gICAgICAgIF9yb3VuZCh5IC0gX3NpbihzbG9wZSkgKiBkMSksIF9yb3VuZCh4KSwgLy9hbmNob3JcbiAgICAgICAgX3JvdW5kKHkpLCBfcm91bmQoeCArIF9jb3Moc2xvcGUpICogZDIpLCAvL3NlY29uZCBjb250cm9sIHBvaW50XG4gICAgICAgIF9yb3VuZCh5ICsgX3NpbihzbG9wZSkgKiBkMikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xvcGUgPSBfYXRhbjIoZHkxLCBkeDEpO1xuICAgICAgICBzZWdtZW50LnB1c2goX3JvdW5kKHggLSBfY29zKHNsb3BlKSAqIGQxKSwgLy9maXJzdCBjb250cm9sIHBvaW50XG4gICAgICAgIF9yb3VuZCh5IC0gX3NpbihzbG9wZSkgKiBkMSkpO1xuICAgICAgICBzbG9wZSA9IF9hdGFuMihkeTIsIGR4Mik7XG4gICAgICAgIHNlZ21lbnQucHVzaChfcm91bmQoeCksIC8vYW5jaG9yXG4gICAgICAgIF9yb3VuZCh5KSwgX3JvdW5kKHggKyBfY29zKHNsb3BlKSAqIGQyKSwgLy9zZWNvbmQgY29udHJvbCBwb2ludFxuICAgICAgICBfcm91bmQoeSArIF9zaW4oc2xvcGUpICogZDIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZWdtZW50LnB1c2goX3JvdW5kKG5leHRYKSwgX3JvdW5kKG5leHRZKSwgX3JvdW5kKG5leHRYKSwgX3JvdW5kKG5leHRZKSk7XG5cbiAgaWYgKGNsb3NlZCkge1xuICAgIHNlZ21lbnQuc3BsaWNlKDAsIDYpO1xuICAgIHNlZ21lbnQubGVuZ3RoID0gc2VnbWVudC5sZW5ndGggLSA2O1xuICB9XG5cbiAgcmV0dXJuIHNlZ21lbnQ7XG59IC8vcmV0dXJucyB0aGUgc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGFuIHgveSBjb29yZGluYXRlIGFuZCBhIHNlZ21lbnQgYmV0d2VlbiB4MS95MSBhbmQgeDIveTJcblxuZnVuY3Rpb24gcG9pbnRUb1NlZ0Rpc3QoeCwgeSwgeDEsIHkxLCB4MiwgeTIpIHtcbiAgdmFyIGR4ID0geDIgLSB4MSxcbiAgICAgIGR5ID0geTIgLSB5MSxcbiAgICAgIHQ7XG5cbiAgaWYgKGR4IHx8IGR5KSB7XG4gICAgdCA9ICgoeCAtIHgxKSAqIGR4ICsgKHkgLSB5MSkgKiBkeSkgLyAoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgaWYgKHQgPiAxKSB7XG4gICAgICB4MSA9IHgyO1xuICAgICAgeTEgPSB5MjtcbiAgICB9IGVsc2UgaWYgKHQgPiAwKSB7XG4gICAgICB4MSArPSBkeCAqIHQ7XG4gICAgICB5MSArPSBkeSAqIHQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1hdGgucG93KHggLSB4MSwgMikgKyBNYXRoLnBvdyh5IC0geTEsIDIpO1xufVxuXG5mdW5jdGlvbiBzaW1wbGlmeVN0ZXAocG9pbnRzLCBmaXJzdCwgbGFzdCwgdG9sZXJhbmNlLCBzaW1wbGlmaWVkKSB7XG4gIHZhciBtYXhTcURpc3QgPSB0b2xlcmFuY2UsXG4gICAgICBmaXJzdFggPSBwb2ludHNbZmlyc3RdLFxuICAgICAgZmlyc3RZID0gcG9pbnRzW2ZpcnN0ICsgMV0sXG4gICAgICBsYXN0WCA9IHBvaW50c1tsYXN0XSxcbiAgICAgIGxhc3RZID0gcG9pbnRzW2xhc3QgKyAxXSxcbiAgICAgIGluZGV4LFxuICAgICAgaSxcbiAgICAgIGQ7XG5cbiAgZm9yIChpID0gZmlyc3QgKyAyOyBpIDwgbGFzdDsgaSArPSAyKSB7XG4gICAgZCA9IHBvaW50VG9TZWdEaXN0KHBvaW50c1tpXSwgcG9pbnRzW2kgKyAxXSwgZmlyc3RYLCBmaXJzdFksIGxhc3RYLCBsYXN0WSk7XG5cbiAgICBpZiAoZCA+IG1heFNxRGlzdCkge1xuICAgICAgaW5kZXggPSBpO1xuICAgICAgbWF4U3FEaXN0ID0gZDtcbiAgICB9XG4gIH1cblxuICBpZiAobWF4U3FEaXN0ID4gdG9sZXJhbmNlKSB7XG4gICAgaWYgKGluZGV4IC0gZmlyc3QgPiAyKSB7XG4gICAgICBzaW1wbGlmeVN0ZXAocG9pbnRzLCBmaXJzdCwgaW5kZXgsIHRvbGVyYW5jZSwgc2ltcGxpZmllZCk7XG4gICAgfVxuXG4gICAgc2ltcGxpZmllZC5wdXNoKHBvaW50c1tpbmRleF0sIHBvaW50c1tpbmRleCArIDFdKTtcblxuICAgIGlmIChsYXN0IC0gaW5kZXggPiAyKSB7XG4gICAgICBzaW1wbGlmeVN0ZXAocG9pbnRzLCBpbmRleCwgbGFzdCwgdG9sZXJhbmNlLCBzaW1wbGlmaWVkKTtcbiAgICB9XG4gIH1cbn0gLy9wb2ludHMgaXMgYW4gYXJyYXkgb2YgeC95IHZhbHVlcyBsaWtlIFt4LCB5LCB4LCB5LCB4LCB5XVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzaW1wbGlmeVBvaW50cyhwb2ludHMsIHRvbGVyYW5jZSkge1xuICB2YXIgcHJldlggPSBwYXJzZUZsb2F0KHBvaW50c1swXSksXG4gICAgICBwcmV2WSA9IHBhcnNlRmxvYXQocG9pbnRzWzFdKSxcbiAgICAgIHRlbXAgPSBbcHJldlgsIHByZXZZXSxcbiAgICAgIGwgPSBwb2ludHMubGVuZ3RoIC0gMixcbiAgICAgIGksXG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIGR4LFxuICAgICAgZHksXG4gICAgICByZXN1bHQsXG4gICAgICBsYXN0O1xuICB0b2xlcmFuY2UgPSBNYXRoLnBvdyh0b2xlcmFuY2UgfHwgMSwgMik7XG5cbiAgZm9yIChpID0gMjsgaSA8IGw7IGkgKz0gMikge1xuICAgIHggPSBwYXJzZUZsb2F0KHBvaW50c1tpXSk7XG4gICAgeSA9IHBhcnNlRmxvYXQocG9pbnRzW2kgKyAxXSk7XG4gICAgZHggPSBwcmV2WCAtIHg7XG4gICAgZHkgPSBwcmV2WSAtIHk7XG5cbiAgICBpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0b2xlcmFuY2UpIHtcbiAgICAgIHRlbXAucHVzaCh4LCB5KTtcbiAgICAgIHByZXZYID0geDtcbiAgICAgIHByZXZZID0geTtcbiAgICB9XG4gIH1cblxuICB0ZW1wLnB1c2gocGFyc2VGbG9hdChwb2ludHNbbF0pLCBwYXJzZUZsb2F0KHBvaW50c1tsICsgMV0pKTtcbiAgbGFzdCA9IHRlbXAubGVuZ3RoIC0gMjtcbiAgcmVzdWx0ID0gW3RlbXBbMF0sIHRlbXBbMV1dO1xuICBzaW1wbGlmeVN0ZXAodGVtcCwgMCwgbGFzdCwgdG9sZXJhbmNlLCByZXN1bHQpO1xuICByZXN1bHQucHVzaCh0ZW1wW2xhc3RdLCB0ZW1wW2xhc3QgKyAxXSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdldENsb3Nlc3RQcm9ncmVzc09uQmV6aWVyKGl0ZXJhdGlvbnMsIHB4LCBweSwgc3RhcnQsIGVuZCwgc2xpY2VzLCB4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLCB4MywgeTMpIHtcbiAgdmFyIGluYyA9IChlbmQgLSBzdGFydCkgLyBzbGljZXMsXG4gICAgICBiZXN0ID0gMCxcbiAgICAgIHQgPSBzdGFydCxcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgZCxcbiAgICAgIGR4LFxuICAgICAgZHksXG4gICAgICBpbnY7XG4gIF9iZXN0RGlzdGFuY2UgPSBfbGFyZ2VOdW07XG5cbiAgd2hpbGUgKHQgPD0gZW5kKSB7XG4gICAgaW52ID0gMSAtIHQ7XG4gICAgeCA9IGludiAqIGludiAqIGludiAqIHgwICsgMyAqIGludiAqIGludiAqIHQgKiB4MSArIDMgKiBpbnYgKiB0ICogdCAqIHgyICsgdCAqIHQgKiB0ICogeDM7XG4gICAgeSA9IGludiAqIGludiAqIGludiAqIHkwICsgMyAqIGludiAqIGludiAqIHQgKiB5MSArIDMgKiBpbnYgKiB0ICogdCAqIHkyICsgdCAqIHQgKiB0ICogeTM7XG4gICAgZHggPSB4IC0gcHg7XG4gICAgZHkgPSB5IC0gcHk7XG4gICAgZCA9IGR4ICogZHggKyBkeSAqIGR5O1xuXG4gICAgaWYgKGQgPCBfYmVzdERpc3RhbmNlKSB7XG4gICAgICBfYmVzdERpc3RhbmNlID0gZDtcbiAgICAgIGJlc3QgPSB0O1xuICAgIH1cblxuICAgIHQgKz0gaW5jO1xuICB9XG5cbiAgcmV0dXJuIGl0ZXJhdGlvbnMgPiAxID8gZ2V0Q2xvc2VzdFByb2dyZXNzT25CZXppZXIoaXRlcmF0aW9ucyAtIDEsIHB4LCBweSwgTWF0aC5tYXgoYmVzdCAtIGluYywgMCksIE1hdGgubWluKGJlc3QgKyBpbmMsIDEpLCBzbGljZXMsIHgwLCB5MCwgeDEsIHkxLCB4MiwgeTIsIHgzLCB5MykgOiBiZXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xvc2VzdERhdGEocmF3UGF0aCwgeCwgeSwgc2xpY2VzKSB7XG4gIC8vcmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgY2xvc2VzdCBqLCBpLCBhbmQgdCAoaiBpcyB0aGUgc2VnbWVudCBpbmRleCwgaSBpcyB0aGUgaW5kZXggb2YgdGhlIHBvaW50IGluIHRoYXQgc2VnbWVudCwgYW5kIHQgaXMgdGhlIHRpbWUvcHJvZ3Jlc3MgYWxvbmcgdGhhdCBiZXppZXIpXG4gIHZhciBjbG9zZXN0ID0ge1xuICAgIGo6IDAsXG4gICAgaTogMCxcbiAgICB0OiAwXG4gIH0sXG4gICAgICBiZXN0RGlzdGFuY2UgPSBfbGFyZ2VOdW0sXG4gICAgICBpLFxuICAgICAgaixcbiAgICAgIHQsXG4gICAgICBzZWdtZW50O1xuXG4gIGZvciAoaiA9IDA7IGogPCByYXdQYXRoLmxlbmd0aDsgaisrKSB7XG4gICAgc2VnbWVudCA9IHJhd1BhdGhbal07XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VnbWVudC5sZW5ndGg7IGkgKz0gNikge1xuICAgICAgdCA9IGdldENsb3Nlc3RQcm9ncmVzc09uQmV6aWVyKDEsIHgsIHksIDAsIDEsIHNsaWNlcyB8fCAyMCwgc2VnbWVudFtpXSwgc2VnbWVudFtpICsgMV0sIHNlZ21lbnRbaSArIDJdLCBzZWdtZW50W2kgKyAzXSwgc2VnbWVudFtpICsgNF0sIHNlZ21lbnRbaSArIDVdLCBzZWdtZW50W2kgKyA2XSwgc2VnbWVudFtpICsgN10pO1xuXG4gICAgICBpZiAoYmVzdERpc3RhbmNlID4gX2Jlc3REaXN0YW5jZSkge1xuICAgICAgICBiZXN0RGlzdGFuY2UgPSBfYmVzdERpc3RhbmNlO1xuICAgICAgICBjbG9zZXN0LmogPSBqO1xuICAgICAgICBjbG9zZXN0LmkgPSBpO1xuICAgICAgICBjbG9zZXN0LnQgPSB0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbG9zZXN0O1xufSAvL3N1YmRpdmlkZSBhIFNlZ21lbnQgY2xvc2VzdCB0byBhIHNwZWNpZmljIHgseSBjb29yZGluYXRlXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJkaXZpZGVTZWdtZW50TmVhcih4LCB5LCBzZWdtZW50LCBzbGljZXMsIGl0ZXJhdGlvbnMpIHtcbiAgdmFyIGwgPSBzZWdtZW50Lmxlbmd0aCxcbiAgICAgIGJlc3REaXN0YW5jZSA9IF9sYXJnZU51bSxcbiAgICAgIGJlc3RUID0gMCxcbiAgICAgIGJlc3RTZWdtZW50SW5kZXggPSAwLFxuICAgICAgdCxcbiAgICAgIGk7XG4gIHNsaWNlcyA9IHNsaWNlcyB8fCAyMDtcbiAgaXRlcmF0aW9ucyA9IGl0ZXJhdGlvbnMgfHwgMztcblxuICBmb3IgKGkgPSAwOyBpIDwgbDsgaSArPSA2KSB7XG4gICAgdCA9IGdldENsb3Nlc3RQcm9ncmVzc09uQmV6aWVyKDEsIHgsIHksIDAsIDEsIHNsaWNlcywgc2VnbWVudFtpXSwgc2VnbWVudFtpICsgMV0sIHNlZ21lbnRbaSArIDJdLCBzZWdtZW50W2kgKyAzXSwgc2VnbWVudFtpICsgNF0sIHNlZ21lbnRbaSArIDVdLCBzZWdtZW50W2kgKyA2XSwgc2VnbWVudFtpICsgN10pO1xuXG4gICAgaWYgKGJlc3REaXN0YW5jZSA+IF9iZXN0RGlzdGFuY2UpIHtcbiAgICAgIGJlc3REaXN0YW5jZSA9IF9iZXN0RGlzdGFuY2U7XG4gICAgICBiZXN0VCA9IHQ7XG4gICAgICBiZXN0U2VnbWVudEluZGV4ID0gaTtcbiAgICB9XG4gIH1cblxuICB0ID0gZ2V0Q2xvc2VzdFByb2dyZXNzT25CZXppZXIoaXRlcmF0aW9ucywgeCwgeSwgYmVzdFQgLSAwLjA1LCBiZXN0VCArIDAuMDUsIHNsaWNlcywgc2VnbWVudFtiZXN0U2VnbWVudEluZGV4XSwgc2VnbWVudFtiZXN0U2VnbWVudEluZGV4ICsgMV0sIHNlZ21lbnRbYmVzdFNlZ21lbnRJbmRleCArIDJdLCBzZWdtZW50W2Jlc3RTZWdtZW50SW5kZXggKyAzXSwgc2VnbWVudFtiZXN0U2VnbWVudEluZGV4ICsgNF0sIHNlZ21lbnRbYmVzdFNlZ21lbnRJbmRleCArIDVdLCBzZWdtZW50W2Jlc3RTZWdtZW50SW5kZXggKyA2XSwgc2VnbWVudFtiZXN0U2VnbWVudEluZGV4ICsgN10pO1xuICBzdWJkaXZpZGVTZWdtZW50KHNlZ21lbnQsIGJlc3RTZWdtZW50SW5kZXgsIHQpO1xuICByZXR1cm4gYmVzdFNlZ21lbnRJbmRleCArIDY7XG59XG4vKlxuVGFrZXMgYW55IG9mIHRoZSBmb2xsb3dpbmcgYW5kIGNvbnZlcnRzIGl0IHRvIGFuIGFsbCBDdWJpYyBCZXppZXIgU1ZHIGRhdGEgc3RyaW5nOlxuLSBBIDxwYXRoPiBkYXRhIHN0cmluZyBsaWtlIFwiTTAsMCBMMiw0IHYyMCwxNSBIMTAwXCJcbi0gQSBSYXdQYXRoLCBsaWtlIFtbeCwgeSwgeCwgeSwgeCwgeSwgeCwgeV1bW3gsIHksIHgsIHksIHgsIHksIHgsIHldXVxuLSBBIFNlZ21lbnQsIGxpa2UgW3gsIHksIHgsIHksIHgsIHksIHgsIHldXG5cbk5vdGU6IGFsbCBudW1iZXJzIGFyZSByb3VuZGVkIGRvd24gdG8gdGhlIGNsb3Nlc3QgMC4wMDEgdG8gbWluaW1pemUgbWVtb3J5LCBtYXhpbWl6ZSBzcGVlZCwgYW5kIGF2b2lkIG9kZCBudW1iZXJzIGxpa2UgMWUtMTNcbiovXG5cbmV4cG9ydCBmdW5jdGlvbiByYXdQYXRoVG9TdHJpbmcocmF3UGF0aCkge1xuICBpZiAoX2lzTnVtYmVyKHJhd1BhdGhbMF0pKSB7XG4gICAgLy9pbiBjYXNlIGEgc2VnbWVudCBpcyBwYXNzZWQgaW4gaW5zdGVhZFxuICAgIHJhd1BhdGggPSBbcmF3UGF0aF07XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gXCJcIixcbiAgICAgIGwgPSByYXdQYXRoLmxlbmd0aCxcbiAgICAgIHNsLFxuICAgICAgcyxcbiAgICAgIGksXG4gICAgICBzZWdtZW50O1xuXG4gIGZvciAocyA9IDA7IHMgPCBsOyBzKyspIHtcbiAgICBzZWdtZW50ID0gcmF3UGF0aFtzXTtcbiAgICByZXN1bHQgKz0gXCJNXCIgKyBfcm91bmQoc2VnbWVudFswXSkgKyBcIixcIiArIF9yb3VuZChzZWdtZW50WzFdKSArIFwiIENcIjtcbiAgICBzbCA9IHNlZ21lbnQubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMjsgaSA8IHNsOyBpKyspIHtcbiAgICAgIHJlc3VsdCArPSBfcm91bmQoc2VnbWVudFtpKytdKSArIFwiLFwiICsgX3JvdW5kKHNlZ21lbnRbaSsrXSkgKyBcIiBcIiArIF9yb3VuZChzZWdtZW50W2krK10pICsgXCIsXCIgKyBfcm91bmQoc2VnbWVudFtpKytdKSArIFwiIFwiICsgX3JvdW5kKHNlZ21lbnRbaSsrXSkgKyBcIixcIiArIF9yb3VuZChzZWdtZW50W2ldKSArIFwiIFwiO1xuICAgIH1cblxuICAgIGlmIChzZWdtZW50LmNsb3NlZCkge1xuICAgICAgcmVzdWx0ICs9IFwielwiO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKlxuLy8gdGFrZXMgYSBzZWdtZW50IHdpdGggY29vcmRpbmF0ZXMgW3gsIHksIHgsIHksIC4uLl0gYW5kIGNvbnZlcnRzIHRoZSBjb250cm9sIHBvaW50cyBpbnRvIGFuZ2xlcyBhbmQgbGVuZ3RocyBbeCwgeSwgYW5nbGUsIGxlbmd0aCwgYW5nbGUsIGxlbmd0aCwgeCwgeSwgYW5nbGUsIGxlbmd0aCwgLi4uXSBzbyB0aGF0IGl0IGFuaW1hdGVzIG1vcmUgY2xlYW5seSBhbmQgYXZvaWRzIG9kZCBicmVha3Mva2lua3MuIEZvciBleGFtcGxlLCBpZiB5b3UgYW5pbWF0ZSBmcm9tIDEgbydjbG9jayB0byA2IG8nY2xvY2ssIGl0J2QganVzdCBnbyBkaXJlY3RseS9saW5lYXJseSByYXRoZXIgdGhhbiBhcm91bmQuIFNvIHRoZSBsZW5ndGggd291bGQgYmUgdmVyeSBzaG9ydCBpbiB0aGUgbWlkZGxlIG9mIHRoZSB0d2Vlbi5cbmV4cG9ydCBmdW5jdGlvbiBjcENvb3Jkc1RvQW5nbGVzKHNlZ21lbnQsIGNvcHkpIHtcblx0dmFyIHJlc3VsdCA9IGNvcHkgPyBzZWdtZW50LnNsaWNlKDApIDogc2VnbWVudCxcblx0XHR4LCB5LCBpO1xuXHRmb3IgKGkgPSAwOyBpIDwgc2VnbWVudC5sZW5ndGg7IGkrPTYpIHtcblx0XHR4ID0gc2VnbWVudFtpKzJdIC0gc2VnbWVudFtpXTtcblx0XHR5ID0gc2VnbWVudFtpKzNdIC0gc2VnbWVudFtpKzFdO1xuXHRcdHJlc3VsdFtpKzJdID0gTWF0aC5hdGFuMih5LCB4KTtcblx0XHRyZXN1bHRbaSszXSA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcblx0XHR4ID0gc2VnbWVudFtpKzZdIC0gc2VnbWVudFtpKzRdO1xuXHRcdHkgPSBzZWdtZW50W2krN10gLSBzZWdtZW50W2krNV07XG5cdFx0cmVzdWx0W2krNF0gPSBNYXRoLmF0YW4yKHksIHgpO1xuXHRcdHJlc3VsdFtpKzVdID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8vIHRha2VzIGEgc2VnbWVudCB0aGF0IHdhcyBjb252ZXJ0ZWQgd2l0aCBjcENvb3Jkc1RvQW5nbGVzKCkgdG8gaGF2ZSBhbmdsZXMgYW5kIGxlbmd0aHMgaW5zdGVhZCBvZiBjb29yZGluYXRlcyBmb3IgdGhlIGNvbnRyb2wgcG9pbnRzLCBhbmQgY29udmVydHMgaXQgQkFDSyBpbnRvIGNvb3JkaW5hdGVzLlxuZXhwb3J0IGZ1bmN0aW9uIGNwQW5nbGVzVG9Db29yZHMoc2VnbWVudCwgY29weSkge1xuXHR2YXIgcmVzdWx0ID0gY29weSA/IHNlZ21lbnQuc2xpY2UoMCkgOiBzZWdtZW50LFxuXHRcdGxlbmd0aCA9IHNlZ21lbnQubGVuZ3RoLFxuXHRcdHJuZCA9IDEwMDAsXG5cdFx0YW5nbGUsIGwsIGksIGo7XG5cdGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrPTYpIHtcblx0XHRhbmdsZSA9IHNlZ21lbnRbaSsyXTtcblx0XHRsID0gc2VnbWVudFtpKzNdOyAvL2xlbmd0aFxuXHRcdHJlc3VsdFtpKzJdID0gKCgoc2VnbWVudFtpXSArIE1hdGguY29zKGFuZ2xlKSAqIGwpICogcm5kKSB8IDApIC8gcm5kO1xuXHRcdHJlc3VsdFtpKzNdID0gKCgoc2VnbWVudFtpKzFdICsgTWF0aC5zaW4oYW5nbGUpICogbCkgKiBybmQpIHwgMCkgLyBybmQ7XG5cdFx0YW5nbGUgPSBzZWdtZW50W2krNF07XG5cdFx0bCA9IHNlZ21lbnRbaSs1XTsgLy9sZW5ndGhcblx0XHRyZXN1bHRbaSs0XSA9ICgoKHNlZ21lbnRbaSs2XSAtIE1hdGguY29zKGFuZ2xlKSAqIGwpICogcm5kKSB8IDApIC8gcm5kO1xuXHRcdHJlc3VsdFtpKzVdID0gKCgoc2VnbWVudFtpKzddIC0gTWF0aC5zaW4oYW5nbGUpICogbCkgKiBybmQpIHwgMCkgLyBybmQ7XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLy9hZGRzIGFuIFwiaXNTbW9vdGhcIiBhcnJheSB0byBlYWNoIHNlZ21lbnQgYW5kIHBvcHVsYXRlcyBpdCB3aXRoIGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgb3Igbm90IGl0J3Mgc21vb3RoICh0aGUgY29udHJvbCBwb2ludHMgaGF2ZSBiYXNpY2FsbHkgdGhlIHNhbWUgc2xvcGUpLiBGb3IgYW55IHNtb290aCBjb250cm9sIHBvaW50cywgaXQgY29udmVydHMgdGhlIGNvb3JkaW5hdGVzIGludG8gYW5nbGUgKHgsIGluIHJhZGlhbnMpIGFuZCBsZW5ndGggKHkpIGFuZCBwdXRzIHRoZW0gaW50byB0aGUgc2FtZSBpbmRleCB2YWx1ZSBpbiBhIHNtb290aERhdGEgYXJyYXkuXG5leHBvcnQgZnVuY3Rpb24gcG9wdWxhdGVTbW9vdGhEYXRhKHJhd1BhdGgpIHtcblx0bGV0IGogPSByYXdQYXRoLmxlbmd0aCxcblx0XHRzbW9vdGgsIHNlZ21lbnQsIHgsIHksIHgyLCB5MiwgaSwgbCwgYSwgYTIsIGlzU21vb3RoLCBzbW9vdGhEYXRhO1xuXHR3aGlsZSAoLS1qID4gLTEpIHtcblx0XHRzZWdtZW50ID0gcmF3UGF0aFtqXTtcblx0XHRpc1Ntb290aCA9IHNlZ21lbnQuaXNTbW9vdGggPSBzZWdtZW50LmlzU21vb3RoIHx8IFswLCAwLCAwLCAwXTtcblx0XHRzbW9vdGhEYXRhID0gc2VnbWVudC5zbW9vdGhEYXRhID0gc2VnbWVudC5zbW9vdGhEYXRhIHx8IFswLCAwLCAwLCAwXTtcblx0XHRpc1Ntb290aC5sZW5ndGggPSA0O1xuXHRcdGwgPSBzZWdtZW50Lmxlbmd0aCAtIDI7XG5cdFx0Zm9yIChpID0gNjsgaSA8IGw7IGkgKz0gNikge1xuXHRcdFx0eCA9IHNlZ21lbnRbaV0gLSBzZWdtZW50W2kgLSAyXTtcblx0XHRcdHkgPSBzZWdtZW50W2kgKyAxXSAtIHNlZ21lbnRbaSAtIDFdO1xuXHRcdFx0eDIgPSBzZWdtZW50W2kgKyAyXSAtIHNlZ21lbnRbaV07XG5cdFx0XHR5MiA9IHNlZ21lbnRbaSArIDNdIC0gc2VnbWVudFtpICsgMV07XG5cdFx0XHRhID0gX2F0YW4yKHksIHgpO1xuXHRcdFx0YTIgPSBfYXRhbjIoeTIsIHgyKTtcblx0XHRcdHNtb290aCA9IChNYXRoLmFicyhhIC0gYTIpIDwgMC4wOSk7XG5cdFx0XHRpZiAoc21vb3RoKSB7XG5cdFx0XHRcdHNtb290aERhdGFbaSAtIDJdID0gYTtcblx0XHRcdFx0c21vb3RoRGF0YVtpICsgMl0gPSBhMjtcblx0XHRcdFx0c21vb3RoRGF0YVtpIC0gMV0gPSBfc3FydCh4ICogeCArIHkgKiB5KTtcblx0XHRcdFx0c21vb3RoRGF0YVtpICsgM10gPSBfc3FydCh4MiAqIHgyICsgeTIgKiB5Mik7XG5cdFx0XHR9XG5cdFx0XHRpc1Ntb290aC5wdXNoKHNtb290aCwgc21vb3RoLCAwLCAwLCBzbW9vdGgsIHNtb290aCk7XG5cdFx0fVxuXHRcdC8vaWYgdGhlIGZpcnN0IGFuZCBsYXN0IHBvaW50cyBhcmUgaWRlbnRpY2FsLCBjaGVjayB0byBzZWUgaWYgdGhlcmUncyBhIHNtb290aCB0cmFuc2l0aW9uLiBXZSBtdXN0IGhhbmRsZSB0aGlzIGEgYml0IGRpZmZlcmVudGx5IGR1ZSB0byB0aGVpciBwb3NpdGlvbnMgaW4gdGhlIGFycmF5LlxuXHRcdGlmIChzZWdtZW50W2xdID09PSBzZWdtZW50WzBdICYmIHNlZ21lbnRbbCsxXSA9PT0gc2VnbWVudFsxXSkge1xuXHRcdFx0eCA9IHNlZ21lbnRbMF0gLSBzZWdtZW50W2wtMl07XG5cdFx0XHR5ID0gc2VnbWVudFsxXSAtIHNlZ21lbnRbbC0xXTtcblx0XHRcdHgyID0gc2VnbWVudFsyXSAtIHNlZ21lbnRbMF07XG5cdFx0XHR5MiA9IHNlZ21lbnRbM10gLSBzZWdtZW50WzFdO1xuXHRcdFx0YSA9IF9hdGFuMih5LCB4KTtcblx0XHRcdGEyID0gX2F0YW4yKHkyLCB4Mik7XG5cdFx0XHRpZiAoTWF0aC5hYnMoYSAtIGEyKSA8IDAuMDkpIHtcblx0XHRcdFx0c21vb3RoRGF0YVtsLTJdID0gYTtcblx0XHRcdFx0c21vb3RoRGF0YVsyXSA9IGEyO1xuXHRcdFx0XHRzbW9vdGhEYXRhW2wtMV0gPSBfc3FydCh4ICogeCArIHkgKiB5KTtcblx0XHRcdFx0c21vb3RoRGF0YVszXSA9IF9zcXJ0KHgyICogeDIgKyB5MiAqIHkyKTtcblx0XHRcdFx0aXNTbW9vdGhbbC0yXSA9IGlzU21vb3RoW2wtMV0gPSB0cnVlOyAvL2Rvbid0IGNoYW5nZSBpbmRleGVzIDIgYW5kIDMgYmVjYXVzZSB3ZSdsbCB0cmlnZ2VyIGV2ZXJ5dGhpbmcgZnJvbSB0aGUgRU5ELCBhbmQgdGhpcyB3aWxsIG9wdGltaXplIGZpbGUgc2l6ZSBhIGJpdC5cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJhd1BhdGg7XG59XG5leHBvcnQgZnVuY3Rpb24gcG9pbnRUb1NjcmVlbihzdmdFbGVtZW50LCBwb2ludCkge1xuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHsgLy9ieSBkZWZhdWx0LCB0YWtlIHRoZSBmaXJzdCBzZXQgb2YgY29vcmRpbmF0ZXMgaW4gdGhlIHBhdGggYXMgdGhlIHBvaW50XG5cdFx0bGV0IHJhd1BhdGggPSBnZXRSYXdQYXRoKHN2Z0VsZW1lbnQpO1xuXHRcdHBvaW50ID0gc3ZnRWxlbWVudC5vd25lclNWR0VsZW1lbnQuY3JlYXRlU1ZHUG9pbnQoKTtcblx0XHRwb2ludC54ID0gcmF3UGF0aFswXVswXTtcblx0XHRwb2ludC55ID0gcmF3UGF0aFswXVsxXTtcblx0fVxuXHRyZXR1cm4gcG9pbnQubWF0cml4VHJhbnNmb3JtKHN2Z0VsZW1lbnQuZ2V0U2NyZWVuQ1RNKCkpO1xufVxuXG4qLyIsIi8qIVxuICogc3RyaW5nczogMy41LjFcbiAqIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIENvcHlyaWdodCAyMDA4LTIwMjAsIEdyZWVuU29jay4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9zdGFuZGFyZC1saWNlbnNlIG9yIGZvclxuICogQ2x1YiBHcmVlblNvY2sgbWVtYmVycywgdGhlIGFncmVlbWVudCBpc3N1ZWQgd2l0aCB0aGF0IG1lbWJlcnNoaXAuXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiovXG5cbi8qIGVzbGludC1kaXNhYmxlICovXG52YXIgX3RyaW1FeHAgPSAvKF5cXHMrfFxccyskKS9nO1xuZXhwb3J0IHZhciBlbW9qaUV4cCA9IC8oW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXSg/OltcXHUyMDBEXFx1RkUwRl1bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdKXsyLH18XFx1RDgzRFxcdURDNjkoPzpcXHUyMDBEKD86KD86XFx1RDgzRFxcdURDNjlcXHUyMDBEKT9cXHVEODNEXFx1REM2N3woPzpcXHVEODNEXFx1REM2OVxcdTIwMEQpP1xcdUQ4M0RcXHVEQzY2KXxcXHVEODNDW1xcdURGRkItXFx1REZGRl0pfFxcdUQ4M0RcXHVEQzY5XFx1MjAwRCg/OlxcdUQ4M0RcXHVEQzY5XFx1MjAwRCk/XFx1RDgzRFxcdURDNjZcXHUyMDBEXFx1RDgzRFxcdURDNjZ8XFx1RDgzRFxcdURDNjlcXHUyMDBEKD86XFx1RDgzRFxcdURDNjlcXHUyMDBEKT9cXHVEODNEXFx1REM2N1xcdTIwMEQoPzpcXHVEODNEW1xcdURDNjZcXHVEQzY3XSl8XFx1RDgzQ1xcdURGRjNcXHVGRTBGXFx1MjAwRFxcdUQ4M0NcXHVERjA4fCg/OlxcdUQ4M0NbXFx1REZDM1xcdURGQzRcXHVERkNBXXxcXHVEODNEW1xcdURDNkVcXHVEQzcxXFx1REM3M1xcdURDNzdcXHVEQzgxXFx1REM4MlxcdURDODZcXHVEQzg3XFx1REU0NS1cXHVERTQ3XFx1REU0QlxcdURFNERcXHVERTRFXFx1REVBM1xcdURFQjQtXFx1REVCNl18XFx1RDgzRVtcXHVERDI2XFx1REQzNy1cXHVERDM5XFx1REQzRFxcdUREM0VcXHVEREQ2LVxcdURERERdKSg/OlxcdUQ4M0NbXFx1REZGQi1cXHVERkZGXSlcXHUyMDBEW1xcdTI2NDBcXHUyNjQyXVxcdUZFMEZ8XFx1RDgzRFxcdURDNjkoPzpcXHVEODNDW1xcdURGRkItXFx1REZGRl0pXFx1MjAwRCg/OlxcdUQ4M0NbXFx1REYzRVxcdURGNzNcXHVERjkzXFx1REZBNFxcdURGQThcXHVERkVCXFx1REZFRF18XFx1RDgzRFtcXHVEQ0JCXFx1RENCQ1xcdUREMjdcXHVERDJDXFx1REU4MFxcdURFOTJdKXwoPzpcXHVEODNDW1xcdURGQzNcXHVERkM0XFx1REZDQV18XFx1RDgzRFtcXHVEQzZFXFx1REM2RlxcdURDNzFcXHVEQzczXFx1REM3N1xcdURDODFcXHVEQzgyXFx1REM4NlxcdURDODdcXHVERTQ1LVxcdURFNDdcXHVERTRCXFx1REU0RFxcdURFNEVcXHVERUEzXFx1REVCNC1cXHVERUI2XXxcXHVEODNFW1xcdUREMjZcXHVERDM3LVxcdUREMzlcXHVERDNDLVxcdUREM0VcXHVEREQ2LVxcdUREREZdKVxcdTIwMERbXFx1MjY0MFxcdTI2NDJdXFx1RkUwRnxcXHVEODNDXFx1RERGRFxcdUQ4M0NcXHVEREYwfFxcdUQ4M0NcXHVEREY2XFx1RDgzQ1xcdURERTZ8XFx1RDgzQ1xcdURERjRcXHVEODNDXFx1RERGMnxcXHVEODNDXFx1RERFOSg/OlxcdUQ4M0NbXFx1RERFQVxcdURERUNcXHVEREVGXFx1RERGMFxcdURERjJcXHVEREY0XFx1RERGRl0pfFxcdUQ4M0NcXHVEREY3KD86XFx1RDgzQ1tcXHVEREVBXFx1RERGNFxcdURERjhcXHVEREZBXFx1RERGQ10pfFxcdUQ4M0NcXHVEREU4KD86XFx1RDgzQ1tcXHVEREU2XFx1RERFOFxcdURERTlcXHVEREVCLVxcdURERUVcXHVEREYwLVxcdURERjVcXHVEREY3XFx1RERGQS1cXHVEREZGXSl8KD86XFx1MjZGOXxcXHVEODNDW1xcdURGQ0JcXHVERkNDXXxcXHVEODNEXFx1REQ3NSkoPzpcXHVGRTBGXFx1MjAwRFtcXHUyNjQwXFx1MjY0Ml18KD86XFx1RDgzQ1tcXHVERkZCLVxcdURGRkZdKVxcdTIwMERbXFx1MjY0MFxcdTI2NDJdKVxcdUZFMEZ8KD86XFx1RDgzRFxcdURDNDFcXHVGRTBGXFx1MjAwRFxcdUQ4M0RcXHVEREU4fFxcdUQ4M0RcXHVEQzY5KD86XFx1RDgzQ1tcXHVERkZCLVxcdURGRkZdKVxcdTIwMERbXFx1MjY5NVxcdTI2OTZcXHUyNzA4XXxcXHVEODNEXFx1REM2OVxcdTIwMERbXFx1MjY5NVxcdTI2OTZcXHUyNzA4XXxcXHVEODNEXFx1REM2OCg/Oig/OlxcdUQ4M0NbXFx1REZGQi1cXHVERkZGXSlcXHUyMDBEW1xcdTI2OTVcXHUyNjk2XFx1MjcwOF18XFx1MjAwRFtcXHUyNjk1XFx1MjY5NlxcdTI3MDhdKSlcXHVGRTBGfFxcdUQ4M0NcXHVEREYyKD86XFx1RDgzQ1tcXHVEREU2XFx1RERFOC1cXHVEREVEXFx1RERGMC1cXHVEREZGXSl8XFx1RDgzRFxcdURDNjlcXHUyMDBEKD86XFx1RDgzQ1tcXHVERjNFXFx1REY3M1xcdURGOTNcXHVERkE0XFx1REZBOFxcdURGRUJcXHVERkVEXXxcXHVEODNEW1xcdURDQkJcXHVEQ0JDXFx1REQyN1xcdUREMkNcXHVERTgwXFx1REU5Ml18XFx1Mjc2NFxcdUZFMEZcXHUyMDBEKD86XFx1RDgzRFxcdURDOEJcXHUyMDBEKD86XFx1RDgzRFtcXHVEQzY4XFx1REM2OV0pfFxcdUQ4M0RbXFx1REM2OFxcdURDNjldKSl8XFx1RDgzQ1xcdURERjEoPzpcXHVEODNDW1xcdURERTYtXFx1RERFOFxcdURERUVcXHVEREYwXFx1RERGNy1cXHVEREZCXFx1RERGRV0pfFxcdUQ4M0NcXHVEREVGKD86XFx1RDgzQ1tcXHVEREVBXFx1RERGMlxcdURERjRcXHVEREY1XSl8XFx1RDgzQ1xcdURERUQoPzpcXHVEODNDW1xcdURERjBcXHVEREYyXFx1RERGM1xcdURERjdcXHVEREY5XFx1RERGQV0pfFxcdUQ4M0NcXHVEREVCKD86XFx1RDgzQ1tcXHVEREVFLVxcdURERjBcXHVEREYyXFx1RERGNFxcdURERjddKXxbI1xcKjAtOV1cXHVGRTBGXFx1MjBFM3xcXHVEODNDXFx1RERFNyg/OlxcdUQ4M0NbXFx1RERFNlxcdURERTdcXHVEREU5LVxcdURERUZcXHVEREYxLVxcdURERjRcXHVEREY2LVxcdURERjlcXHVEREZCXFx1RERGQ1xcdURERkVcXHVEREZGXSl8XFx1RDgzQ1xcdURERTYoPzpcXHVEODNDW1xcdURERTgtXFx1RERFQ1xcdURERUVcXHVEREYxXFx1RERGMlxcdURERjRcXHVEREY2LVxcdURERkFcXHVEREZDXFx1RERGRFxcdURERkZdKXxcXHVEODNDXFx1RERGRig/OlxcdUQ4M0NbXFx1RERFNlxcdURERjJcXHVEREZDXSl8XFx1RDgzQ1xcdURERjUoPzpcXHVEODNDW1xcdURERTZcXHVEREVBLVxcdURERURcXHVEREYwLVxcdURERjNcXHVEREY3LVxcdURERjlcXHVEREZDXFx1RERGRV0pfFxcdUQ4M0NcXHVEREZCKD86XFx1RDgzQ1tcXHVEREU2XFx1RERFOFxcdURERUFcXHVEREVDXFx1RERFRVxcdURERjNcXHVEREZBXSl8XFx1RDgzQ1xcdURERjMoPzpcXHVEODNDW1xcdURERTZcXHVEREU4XFx1RERFQS1cXHVEREVDXFx1RERFRVxcdURERjFcXHVEREY0XFx1RERGNVxcdURERjdcXHVEREZBXFx1RERGRl0pfFxcdUQ4M0NcXHVERkY0XFx1REI0MFxcdURDNjdcXHVEQjQwXFx1REM2Mig/OlxcdURCNDBcXHVEQzc3XFx1REI0MFxcdURDNkNcXHVEQjQwXFx1REM3M3xcXHVEQjQwXFx1REM3M1xcdURCNDBcXHVEQzYzXFx1REI0MFxcdURDNzR8XFx1REI0MFxcdURDNjVcXHVEQjQwXFx1REM2RVxcdURCNDBcXHVEQzY3KVxcdURCNDBcXHVEQzdGfFxcdUQ4M0RcXHVEQzY4KD86XFx1MjAwRCg/OlxcdTI3NjRcXHVGRTBGXFx1MjAwRCg/OlxcdUQ4M0RcXHVEQzhCXFx1MjAwRCk/XFx1RDgzRFxcdURDNjh8KD86KD86XFx1RDgzRFtcXHVEQzY4XFx1REM2OV0pXFx1MjAwRCk/XFx1RDgzRFxcdURDNjZcXHUyMDBEXFx1RDgzRFxcdURDNjZ8KD86KD86XFx1RDgzRFtcXHVEQzY4XFx1REM2OV0pXFx1MjAwRCk/XFx1RDgzRFxcdURDNjdcXHUyMDBEKD86XFx1RDgzRFtcXHVEQzY2XFx1REM2N10pfFxcdUQ4M0NbXFx1REYzRVxcdURGNzNcXHVERjkzXFx1REZBNFxcdURGQThcXHVERkVCXFx1REZFRF18XFx1RDgzRFtcXHVEQ0JCXFx1RENCQ1xcdUREMjdcXHVERDJDXFx1REU4MFxcdURFOTJdKXwoPzpcXHVEODNDW1xcdURGRkItXFx1REZGRl0pXFx1MjAwRCg/OlxcdUQ4M0NbXFx1REYzRVxcdURGNzNcXHVERjkzXFx1REZBNFxcdURGQThcXHVERkVCXFx1REZFRF18XFx1RDgzRFtcXHVEQ0JCXFx1RENCQ1xcdUREMjdcXHVERDJDXFx1REU4MFxcdURFOTJdKSl8XFx1RDgzQ1xcdURERjgoPzpcXHVEODNDW1xcdURERTYtXFx1RERFQVxcdURERUMtXFx1RERGNFxcdURERjctXFx1RERGOVxcdURERkJcXHVEREZELVxcdURERkZdKXxcXHVEODNDXFx1RERGMCg/OlxcdUQ4M0NbXFx1RERFQVxcdURERUMtXFx1RERFRVxcdURERjJcXHVEREYzXFx1RERGNVxcdURERjdcXHVEREZDXFx1RERGRVxcdURERkZdKXxcXHVEODNDXFx1RERGRSg/OlxcdUQ4M0NbXFx1RERFQVxcdURERjldKXxcXHVEODNDXFx1RERFRSg/OlxcdUQ4M0NbXFx1RERFOC1cXHVEREVBXFx1RERGMS1cXHVEREY0XFx1RERGNi1cXHVEREY5XSl8XFx1RDgzQ1xcdURERjkoPzpcXHVEODNDW1xcdURERTZcXHVEREU4XFx1RERFOVxcdURERUItXFx1RERFRFxcdURERUYtXFx1RERGNFxcdURERjdcXHVEREY5XFx1RERGQlxcdURERkNcXHVEREZGXSl8XFx1RDgzQ1xcdURERUMoPzpcXHVEODNDW1xcdURERTZcXHVEREU3XFx1RERFOS1cXHVEREVFXFx1RERGMS1cXHVEREYzXFx1RERGNS1cXHVEREZBXFx1RERGQ1xcdURERkVdKXxcXHVEODNDXFx1RERGQSg/OlxcdUQ4M0NbXFx1RERFNlxcdURERUNcXHVEREYyXFx1RERGM1xcdURERjhcXHVEREZFXFx1RERGRl0pfFxcdUQ4M0NcXHVEREVBKD86XFx1RDgzQ1tcXHVEREU2XFx1RERFOFxcdURERUFcXHVEREVDXFx1RERFRFxcdURERjctXFx1RERGQV0pfFxcdUQ4M0NcXHVEREZDKD86XFx1RDgzQ1tcXHVEREVCXFx1RERGOF0pfCg/OlxcdTI2Rjl8XFx1RDgzQ1tcXHVERkNCXFx1REZDQ118XFx1RDgzRFxcdURENzUpKD86XFx1RDgzQ1tcXHVERkZCLVxcdURGRkZdKXwoPzpcXHVEODNDW1xcdURGQzNcXHVERkM0XFx1REZDQV18XFx1RDgzRFtcXHVEQzZFXFx1REM3MVxcdURDNzNcXHVEQzc3XFx1REM4MVxcdURDODJcXHVEQzg2XFx1REM4N1xcdURFNDUtXFx1REU0N1xcdURFNEJcXHVERTREXFx1REU0RVxcdURFQTNcXHVERUI0LVxcdURFQjZdfFxcdUQ4M0VbXFx1REQyNlxcdUREMzctXFx1REQzOVxcdUREM0RcXHVERDNFXFx1RERENi1cXHVEREREXSkoPzpcXHVEODNDW1xcdURGRkItXFx1REZGRl0pfCg/OltcXHUyNjFEXFx1MjcwQS1cXHUyNzBEXXxcXHVEODNDW1xcdURGODVcXHVERkMyXFx1REZDN118XFx1RDgzRFtcXHVEQzQyXFx1REM0M1xcdURDNDYtXFx1REM1MFxcdURDNjZcXHVEQzY3XFx1REM3MFxcdURDNzJcXHVEQzc0LVxcdURDNzZcXHVEQzc4XFx1REM3Q1xcdURDODNcXHVEQzg1XFx1RENBQVxcdURENzRcXHVERDdBXFx1REQ5MFxcdUREOTVcXHVERDk2XFx1REU0Q1xcdURFNEZcXHVERUMwXFx1REVDQ118XFx1RDgzRVtcXHVERDE4LVxcdUREMUNcXHVERDFFXFx1REQxRlxcdUREMzAtXFx1REQzNlxcdURERDEtXFx1RERENV0pKD86XFx1RDgzQ1tcXHVERkZCLVxcdURGRkZdKXxcXHVEODNEXFx1REM2OCg/OlxcdTIwMEQoPzooPzooPzpcXHVEODNEW1xcdURDNjhcXHVEQzY5XSlcXHUyMDBEKT9cXHVEODNEXFx1REM2N3woPzooPzpcXHVEODNEW1xcdURDNjhcXHVEQzY5XSlcXHUyMDBEKT9cXHVEODNEXFx1REM2Nil8XFx1RDgzQ1tcXHVERkZCLVxcdURGRkZdKXwoPzpbXFx1MjYxRFxcdTI2RjlcXHUyNzBBLVxcdTI3MERdfFxcdUQ4M0NbXFx1REY4NVxcdURGQzItXFx1REZDNFxcdURGQzdcXHVERkNBLVxcdURGQ0NdfFxcdUQ4M0RbXFx1REM0MlxcdURDNDNcXHVEQzQ2LVxcdURDNTBcXHVEQzY2LVxcdURDNjlcXHVEQzZFXFx1REM3MC1cXHVEQzc4XFx1REM3Q1xcdURDODEtXFx1REM4M1xcdURDODUtXFx1REM4N1xcdURDQUFcXHVERDc0XFx1REQ3NVxcdUREN0FcXHVERDkwXFx1REQ5NVxcdUREOTZcXHVERTQ1LVxcdURFNDdcXHVERTRCLVxcdURFNEZcXHVERUEzXFx1REVCNC1cXHVERUI2XFx1REVDMFxcdURFQ0NdfFxcdUQ4M0VbXFx1REQxOC1cXHVERDFDXFx1REQxRVxcdUREMUZcXHVERDI2XFx1REQzMC1cXHVERDM5XFx1REQzRFxcdUREM0VcXHVEREQxLVxcdURERERdKSg/OlxcdUQ4M0NbXFx1REZGQi1cXHVERkZGXSk/fCg/OltcXHUyMzFBXFx1MjMxQlxcdTIzRTktXFx1MjNFQ1xcdTIzRjBcXHUyM0YzXFx1MjVGRFxcdTI1RkVcXHUyNjE0XFx1MjYxNVxcdTI2NDgtXFx1MjY1M1xcdTI2N0ZcXHUyNjkzXFx1MjZBMVxcdTI2QUFcXHUyNkFCXFx1MjZCRFxcdTI2QkVcXHUyNkM0XFx1MjZDNVxcdTI2Q0VcXHUyNkQ0XFx1MjZFQVxcdTI2RjJcXHUyNkYzXFx1MjZGNVxcdTI2RkFcXHUyNkZEXFx1MjcwNVxcdTI3MEFcXHUyNzBCXFx1MjcyOFxcdTI3NENcXHUyNzRFXFx1Mjc1My1cXHUyNzU1XFx1Mjc1N1xcdTI3OTUtXFx1Mjc5N1xcdTI3QjBcXHUyN0JGXFx1MkIxQlxcdTJCMUNcXHUyQjUwXFx1MkI1NV18XFx1RDgzQ1tcXHVEQzA0XFx1RENDRlxcdUREOEVcXHVERDkxLVxcdUREOUFcXHVEREU2LVxcdURERkZcXHVERTAxXFx1REUxQVxcdURFMkZcXHVERTMyLVxcdURFMzZcXHVERTM4LVxcdURFM0FcXHVERTUwXFx1REU1MVxcdURGMDAtXFx1REYyMFxcdURGMkQtXFx1REYzNVxcdURGMzctXFx1REY3Q1xcdURGN0UtXFx1REY5M1xcdURGQTAtXFx1REZDQVxcdURGQ0YtXFx1REZEM1xcdURGRTAtXFx1REZGMFxcdURGRjRcXHVERkY4LVxcdURGRkZdfFxcdUQ4M0RbXFx1REMwMC1cXHVEQzNFXFx1REM0MFxcdURDNDItXFx1RENGQ1xcdURDRkYtXFx1REQzRFxcdURENEItXFx1REQ0RVxcdURENTAtXFx1REQ2N1xcdUREN0FcXHVERDk1XFx1REQ5NlxcdUREQTRcXHVEREZCLVxcdURFNEZcXHVERTgwLVxcdURFQzVcXHVERUNDXFx1REVEMC1cXHVERUQyXFx1REVFQlxcdURFRUNcXHVERUY0LVxcdURFRjhdfFxcdUQ4M0VbXFx1REQxMC1cXHVERDNBXFx1REQzQy1cXHVERDNFXFx1REQ0MC1cXHVERDQ1XFx1REQ0Ny1cXHVERDRDXFx1REQ1MC1cXHVERDZCXFx1REQ4MC1cXHVERDk3XFx1RERDMFxcdURERDAtXFx1RERFNl0pfCg/OlsjXFwqMC05XFx4QTlcXHhBRVxcdTIwM0NcXHUyMDQ5XFx1MjEyMlxcdTIxMzlcXHUyMTk0LVxcdTIxOTlcXHUyMUE5XFx1MjFBQVxcdTIzMUFcXHUyMzFCXFx1MjMyOFxcdTIzQ0ZcXHUyM0U5LVxcdTIzRjNcXHUyM0Y4LVxcdTIzRkFcXHUyNEMyXFx1MjVBQVxcdTI1QUJcXHUyNUI2XFx1MjVDMFxcdTI1RkItXFx1MjVGRVxcdTI2MDAtXFx1MjYwNFxcdTI2MEVcXHUyNjExXFx1MjYxNFxcdTI2MTVcXHUyNjE4XFx1MjYxRFxcdTI2MjBcXHUyNjIyXFx1MjYyM1xcdTI2MjZcXHUyNjJBXFx1MjYyRVxcdTI2MkZcXHUyNjM4LVxcdTI2M0FcXHUyNjQwXFx1MjY0MlxcdTI2NDgtXFx1MjY1M1xcdTI2NjBcXHUyNjYzXFx1MjY2NVxcdTI2NjZcXHUyNjY4XFx1MjY3QlxcdTI2N0ZcXHUyNjkyLVxcdTI2OTdcXHUyNjk5XFx1MjY5QlxcdTI2OUNcXHUyNkEwXFx1MjZBMVxcdTI2QUFcXHUyNkFCXFx1MjZCMFxcdTI2QjFcXHUyNkJEXFx1MjZCRVxcdTI2QzRcXHUyNkM1XFx1MjZDOFxcdTI2Q0VcXHUyNkNGXFx1MjZEMVxcdTI2RDNcXHUyNkQ0XFx1MjZFOVxcdTI2RUFcXHUyNkYwLVxcdTI2RjVcXHUyNkY3LVxcdTI2RkFcXHUyNkZEXFx1MjcwMlxcdTI3MDVcXHUyNzA4LVxcdTI3MERcXHUyNzBGXFx1MjcxMlxcdTI3MTRcXHUyNzE2XFx1MjcxRFxcdTI3MjFcXHUyNzI4XFx1MjczM1xcdTI3MzRcXHUyNzQ0XFx1Mjc0N1xcdTI3NENcXHUyNzRFXFx1Mjc1My1cXHUyNzU1XFx1Mjc1N1xcdTI3NjNcXHUyNzY0XFx1Mjc5NS1cXHUyNzk3XFx1MjdBMVxcdTI3QjBcXHUyN0JGXFx1MjkzNFxcdTI5MzVcXHUyQjA1LVxcdTJCMDdcXHUyQjFCXFx1MkIxQ1xcdTJCNTBcXHUyQjU1XFx1MzAzMFxcdTMwM0RcXHUzMjk3XFx1MzI5OV18XFx1RDgzQ1tcXHVEQzA0XFx1RENDRlxcdURENzBcXHVERDcxXFx1REQ3RVxcdUREN0ZcXHVERDhFXFx1REQ5MS1cXHVERDlBXFx1RERFNi1cXHVEREZGXFx1REUwMVxcdURFMDJcXHVERTFBXFx1REUyRlxcdURFMzItXFx1REUzQVxcdURFNTBcXHVERTUxXFx1REYwMC1cXHVERjIxXFx1REYyNC1cXHVERjkzXFx1REY5NlxcdURGOTdcXHVERjk5LVxcdURGOUJcXHVERjlFLVxcdURGRjBcXHVERkYzLVxcdURGRjVcXHVERkY3LVxcdURGRkZdfFxcdUQ4M0RbXFx1REMwMC1cXHVEQ0ZEXFx1RENGRi1cXHVERDNEXFx1REQ0OS1cXHVERDRFXFx1REQ1MC1cXHVERDY3XFx1REQ2RlxcdURENzBcXHVERDczLVxcdUREN0FcXHVERDg3XFx1REQ4QS1cXHVERDhEXFx1REQ5MFxcdUREOTVcXHVERDk2XFx1RERBNFxcdUREQTVcXHVEREE4XFx1RERCMVxcdUREQjJcXHVEREJDXFx1RERDMi1cXHVEREM0XFx1REREMS1cXHVEREQzXFx1REREQy1cXHVERERFXFx1RERFMVxcdURERTNcXHVEREU4XFx1RERFRlxcdURERjNcXHVEREZBLVxcdURFNEZcXHVERTgwLVxcdURFQzVcXHVERUNCLVxcdURFRDJcXHVERUUwLVxcdURFRTVcXHVERUU5XFx1REVFQlxcdURFRUNcXHVERUYwXFx1REVGMy1cXHVERUY4XXxcXHVEODNFW1xcdUREMTAtXFx1REQzQVxcdUREM0MtXFx1REQzRVxcdURENDAtXFx1REQ0NVxcdURENDctXFx1REQ0Q1xcdURENTAtXFx1REQ2QlxcdUREODAtXFx1REQ5N1xcdUREQzBcXHVEREQwLVxcdURERTZdKVxcdUZFMEYpLztcbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0KGUpIHtcbiAgdmFyIHR5cGUgPSBlLm5vZGVUeXBlLFxuICAgICAgcmVzdWx0ID0gXCJcIjtcblxuICBpZiAodHlwZSA9PT0gMSB8fCB0eXBlID09PSA5IHx8IHR5cGUgPT09IDExKSB7XG4gICAgaWYgKHR5cGVvZiBlLnRleHRDb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gZS50ZXh0Q29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChlID0gZS5maXJzdENoaWxkOyBlOyBlID0gZS5uZXh0U2libGluZykge1xuICAgICAgICByZXN1bHQgKz0gZ2V0VGV4dChlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gMyB8fCB0eXBlID09PSA0KSB7XG4gICAgcmV0dXJuIGUubm9kZVZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdElubmVySFRNTChlbGVtZW50LCBkZWxpbWl0ZXIsIHRyaW0pIHtcbiAgdmFyIG5vZGUgPSBlbGVtZW50LmZpcnN0Q2hpbGQsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAobm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICByZXN1bHQucHVzaC5hcHBseShyZXN1bHQsIGVtb2ppU2FmZVNwbGl0KChub2RlLm5vZGVWYWx1ZSArIFwiXCIpLnJlcGxhY2UoL15cXG4rL2csIFwiXCIpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpLCBkZWxpbWl0ZXIsIHRyaW0pKTtcbiAgICB9IGVsc2UgaWYgKChub2RlLm5vZGVOYW1lICsgXCJcIikudG9Mb3dlckNhc2UoKSA9PT0gXCJiclwiKSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdICs9IFwiPGJyPlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChub2RlLm91dGVySFRNTCk7XG4gICAgfVxuXG4gICAgbm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLypcbi8vc21hbGxlciBrYiB2ZXJzaW9uIHRoYXQgb25seSBoYW5kbGVzIHRoZSBzaW1wbGVyIGVtb2ppJ3MsIHdoaWNoIGlzIG9mdGVuIHBlcmZlY3RseSBhZGVxdWF0ZS5cblxubGV0IF9lbW9qaSA9IFwiW1xcdUUwMDAtXFx1RjhGRl18XFx1RDgzQ1tcXHVEQzAwLVxcdURGRkZdfFxcdUQ4M0RbXFx1REMwMC1cXHVERkZGXXxbXFx1MjY5NC1cXHUyNjk3XXxcXHVEODNFW1xcdUREMTAtXFx1REQ1RF18W1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXVwiLFxuXHRfZW1vamlFeHAgPSBuZXcgUmVnRXhwKF9lbW9qaSksXG5cdF9lbW9qaUFuZENoYXJzRXhwID0gbmV3IFJlZ0V4cChfZW1vamkgKyBcInwuXCIsIFwiZ1wiKSxcblx0X2Vtb2ppU2FmZVNwbGl0ID0gKHRleHQsIGRlbGltaXRlciwgdHJpbSkgPT4ge1xuXHRcdGlmICh0cmltKSB7XG5cdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKF90cmltRXhwLCBcIlwiKTtcblx0XHR9XG5cdFx0cmV0dXJuICgoZGVsaW1pdGVyID09PSBcIlwiIHx8ICFkZWxpbWl0ZXIpICYmIF9lbW9qaUV4cC50ZXN0KHRleHQpKSA/IHRleHQubWF0Y2goX2Vtb2ppQW5kQ2hhcnNFeHApIDogdGV4dC5zcGxpdChkZWxpbWl0ZXIgfHwgXCJcIik7XG5cdH07XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVtb2ppU2FmZVNwbGl0KHRleHQsIGRlbGltaXRlciwgdHJpbSkge1xuICB0ZXh0ICs9IFwiXCI7IC8vIG1ha2Ugc3VyZSBpdCdzIGNhc3QgYXMgYSBzdHJpbmcuIFNvbWVvbmUgbWF5IHBhc3MgaW4gYSBudW1iZXIuXG5cbiAgaWYgKHRyaW0pIHtcbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKF90cmltRXhwLCBcIlwiKTtcbiAgfVxuXG4gIGlmIChkZWxpbWl0ZXIgJiYgZGVsaW1pdGVyICE9PSBcIlwiKSB7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikuc3BsaXQoZGVsaW1pdGVyKTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBbXSxcbiAgICAgIGwgPSB0ZXh0Lmxlbmd0aCxcbiAgICAgIGkgPSAwLFxuICAgICAgaixcbiAgICAgIGNoYXJhY3RlcjtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIGNoYXJhY3RlciA9IHRleHQuY2hhckF0KGkpO1xuXG4gICAgaWYgKGNoYXJhY3Rlci5jaGFyQ29kZUF0KDApID49IDB4RDgwMCAmJiBjaGFyYWN0ZXIuY2hhckNvZGVBdCgwKSA8PSAweERCRkYgfHwgdGV4dC5jaGFyQ29kZUF0KGkgKyAxKSA+PSAweEZFMDAgJiYgdGV4dC5jaGFyQ29kZUF0KGkgKyAxKSA8PSAweEZFMEYpIHtcbiAgICAgIC8vc3BlY2lhbCBlbW9qaSBjaGFyYWN0ZXJzIHVzZSAyIG9yIDQgdW5pY29kZSBjaGFyYWN0ZXJzIHRoYXQgd2UgbXVzdCBrZWVwIHRvZ2V0aGVyLlxuICAgICAgaiA9ICgodGV4dC5zdWJzdHIoaSwgMTIpLnNwbGl0KGVtb2ppRXhwKSB8fCBbXSlbMV0gfHwgXCJcIikubGVuZ3RoIHx8IDI7XG4gICAgICBjaGFyYWN0ZXIgPSB0ZXh0LnN1YnN0cihpLCBqKTtcbiAgICAgIHJlc3VsdC5lbW9qaSA9IDE7XG4gICAgICBpICs9IGogLSAxO1xuICAgIH1cblxuICAgIHJlc3VsdC5wdXNoKGNoYXJhY3RlciA9PT0gXCI+XCIgPyBcIiZndDtcIiA6IGNoYXJhY3RlciA9PT0gXCI8XCIgPyBcIiZsdDtcIiA6IGNoYXJhY3Rlcik7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufSJdLCJzb3VyY2VSb290IjoiIn0=