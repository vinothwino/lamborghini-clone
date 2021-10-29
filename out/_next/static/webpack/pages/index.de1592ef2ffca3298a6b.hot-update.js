webpackHotUpdate_N_E("pages/index",{

/***/ "./components/Navbar/index.js":
/*!************************************!*\
  !*** ./components/Navbar/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var assets_images_png_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/images/png/logo.png */ "./assets/images/png/logo.png");
/* harmony import */ var assets_images_png_logo_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(assets_images_png_logo_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CollapsiveContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CollapsiveContainer */ "./components/Navbar/CollapsiveContainer/index.js");
/* harmony import */ var _BurgerCollapsiveContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BurgerCollapsiveContainer */ "./components/Navbar/BurgerCollapsiveContainer/index.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");


var _jsxFileName = "E:\\personal projects\\website-clone-template\\lamborghini-clone\\components\\Navbar\\index.js",
    _this = undefined,
    _s = $RefreshSig$();








var Navbar = function Navbar() {
  _s();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(),
      selectedNav = _useState[0],
      setSelectedNav = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      showBurgerContainer = _useState2[0],
      toggleBurgerContainer = _useState2[1];

  var timeline = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(gsap__WEBPACK_IMPORTED_MODULE_6__["default"].timeline());
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    document.getElementById('models-container').addEventListener('mousemove', function (event) {
      console.log('changes');
      var target = event.target.getAttribute('data-target') || event.target.parentElement.getAttribute('data-target');
      var element = document.getElementById('collapsive-container');
      var t1 = timeline.current;
      if (target) switch (target) {
        case 'models':
        case 'custom-solution':
        case 'ownership':
        case 'motorsport':
          if (selectedNav !== target) {
            setSelectedNav(target);
            var item = document.querySelector("[data-item=".concat(target, "]"));

            if (item) {
              t1.clear();
              t1.to(item, {
                autoAlpha: 1,
                left: event.target.offsetLeft,
                duration: 0
              });
              t1.to(element, {
                autoAlpha: 1,
                yPercent: 0,
                height: item.scrollHeight,
                duration: 0,
                delay: 0
              });
            } else t1.to(element, {
              yPercent: -100,
              height: '0px',
              duration: 0,
              delay: 0
            });
          }

          break;

        default:
          setSelectedNav();
          t1.to(element, {
            yPercent: -100,
            height: '0px',
            duration: 0,
            delay: 0
          });
          break;
      }
    });
    document.getElementById('header').addEventListener('mouseleave', function (e) {
      var element = document.getElementById('collapsive-container');
      setSelectedNav();
      var t1 = timeline.current;
      t1.clear();
      t1.to(element, {
        yPercent: -100,
        height: '0px',
        duration: 0,
        delay: 0
      });
    });
    window.addEventListener('resize', function (event) {
      resizeAnimation();
    });
    resizeAnimation();
  }, []);
  var resizeAnimation = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    var navbarElement = document.getElementById('navbar');
    var maskElement = document.getElementById('navbar-mask');
    var modelElement = document.getElementById('mask-left');
    var hamburger = document.getElementById('hamburger');

    if (navbarElement.getAttribute('data-toggle-view') === 'settings') {
      maskElement.style.left = modelElement.offsetLeft + modelElement.offsetWidth + 'px';
      maskElement.style.width = hamburger.offsetLeft - modelElement.offsetWidth + 'px';
    } else {
      maskElement.style.left = modelElement.offsetLeft + 'px';
      maskElement.style.width = '100%';
    }
  });
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("header", {
    id: "header",
    className: "fixed-top",
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("nav", {
      id: "navbar",
      "data-toggle-view": "settings",
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
        id: "mask-left",
        href: "#",
        className: "brand",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("img", {
          src: assets_images_png_logo_png__WEBPACK_IMPORTED_MODULE_3___default.a,
          alt: "LOGO"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 77,
          columnNumber: 21
        }, _this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 17
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("ul", {
        id: "models-container",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
            href: "#",
            "data-target": "models",
            children: "models"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 81,
            columnNumber: 25
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 80,
          columnNumber: 21
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
            href: "#",
            "data-target": "custom-solution",
            children: "custom solutions"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 84,
            columnNumber: 25
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 83,
          columnNumber: 21
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
            href: "#",
            "data-target": "ownership",
            children: "ownership"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 87,
            columnNumber: 25
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 21
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
            href: "#",
            "data-target": "motorsport",
            children: "motorsport"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 90,
            columnNumber: 25
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 89,
          columnNumber: 21
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 17
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        className: "ms-auto d-flex",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("ul", {
          className: "d-none d-xl-flex",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
              href: "#",
              children: "dealerships"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 96,
              columnNumber: 29
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 95,
            columnNumber: 25
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
              href: "#",
              children: "museum"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 99,
              columnNumber: 29
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 98,
            columnNumber: 25
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
              href: "#",
              children: "store"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 102,
              columnNumber: 29
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 101,
            columnNumber: 25
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 94,
          columnNumber: 21
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "button-group d-flex justify-content-start align-items-center",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
            variant: "transparent",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("i", {
              className: "icon-chat"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 107,
              columnNumber: 29
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 106,
            columnNumber: 25
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
            variant: "transparent",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("i", {
              className: "icon-search"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 110,
              columnNumber: 29
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 109,
            columnNumber: 25
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
            id: "hamburger",
            variant: "transparent",
            className: "custom-burger bg-transparent ".concat(showBurgerContainer && 'active'),
            onClick: function onClick() {
              return toggleBurgerContainer(!showBurgerContainer);
            },
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 118,
              columnNumber: 29
            }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 119,
              columnNumber: 29
            }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 120,
              columnNumber: 29
            }, _this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 112,
            columnNumber: 25
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 105,
          columnNumber: 21
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 93,
        columnNumber: 17
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        id: "navbar-mask",
        className: "overlay-mask ".concat(showBurgerContainer && 'show')
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 17
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 13
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_CollapsiveContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      selectedNav: selectedNav
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 129,
      columnNumber: 13
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_BurgerCollapsiveContainer__WEBPACK_IMPORTED_MODULE_5__["default"], {
      show: showBurgerContainer,
      toggle: function toggle() {
        return toggleBurgerContainer(!showBurgerContainer);
      },
      resizeAnimation: resizeAnimation
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 13
    }, _this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 74,
    columnNumber: 9
  }, _this);
};

_s(Navbar, "fcKHZPRGS9+F3xJOFdogjx1QTew=");

_c = Navbar;
/* harmony default export */ __webpack_exports__["default"] = (Navbar);

var _c;

$RefreshReg$(_c, "Navbar");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9OYXZiYXIvaW5kZXguanMiXSwibmFtZXMiOlsiTmF2YmFyIiwidXNlU3RhdGUiLCJzZWxlY3RlZE5hdiIsInNldFNlbGVjdGVkTmF2Iiwic2hvd0J1cmdlckNvbnRhaW5lciIsInRvZ2dsZUJ1cmdlckNvbnRhaW5lciIsInRpbWVsaW5lIiwidXNlUmVmIiwiZ3NhcCIsInVzZUVmZmVjdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwicGFyZW50RWxlbWVudCIsImVsZW1lbnQiLCJ0MSIsImN1cnJlbnQiLCJpdGVtIiwicXVlcnlTZWxlY3RvciIsImNsZWFyIiwidG8iLCJhdXRvQWxwaGEiLCJsZWZ0Iiwib2Zmc2V0TGVmdCIsImR1cmF0aW9uIiwieVBlcmNlbnQiLCJoZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJkZWxheSIsImUiLCJ3aW5kb3ciLCJyZXNpemVBbmltYXRpb24iLCJ1c2VDYWxsYmFjayIsIm5hdmJhckVsZW1lbnQiLCJtYXNrRWxlbWVudCIsIm1vZGVsRWxlbWVudCIsImhhbWJ1cmdlciIsInN0eWxlIiwib2Zmc2V0V2lkdGgiLCJ3aWR0aCIsIkxPR08iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxHQUFNO0FBQUE7O0FBQUEsa0JBQ3FCQyxzREFBUSxFQUQ3QjtBQUFBLE1BQ1ZDLFdBRFU7QUFBQSxNQUNHQyxjQURIOztBQUFBLG1CQUVvQ0Ysc0RBQVEsQ0FBQyxLQUFELENBRjVDO0FBQUEsTUFFVkcsbUJBRlU7QUFBQSxNQUVXQyxxQkFGWDs7QUFHakIsTUFBTUMsUUFBUSxHQUFHQyxvREFBTSxDQUFDQyw0Q0FBSSxDQUFD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LHFFQUFDLGtFQUFEO0FBQ0ksVUFBSSxFQUFFRSxtQkFEVjtBQUVJLFlBQU0sRUFBRTtBQUFBLGVBQU1DLHFCQUFxQixDQUFDLENBQUNELG1CQUFGLENBQTNCO0FBQUEsT0FGWjtBQUdJLHFCQUFlLEVBQUVnQztBQUhyQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBeERKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURKO0FBZ0VILENBaklEOztHQUFNcEMsTTs7S0FBQUEsTTtBQW1JU0EscUVBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvaW5kZXguZGUxNTkyZWYyZmZjYTMyOThhNmIuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCdXR0b24sIENvbnRhaW5lciwgUm93LCBDb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnXHJcbmltcG9ydCBMT0dPIGZyb20gJ2Fzc2V0cy9pbWFnZXMvcG5nL2xvZ28ucG5nJ1xyXG5pbXBvcnQgQ29sbGFwc2l2ZUNvbnRhaW5lciBmcm9tICcuL0NvbGxhcHNpdmVDb250YWluZXInXHJcbmltcG9ydCBCdXJnZXJDb2xsYXBzaXZlQ29udGFpbmVyIGZyb20gJy4vQnVyZ2VyQ29sbGFwc2l2ZUNvbnRhaW5lcidcclxuaW1wb3J0IGdzYXAgZnJvbSAnZ3NhcCdcclxuXHJcbmNvbnN0IE5hdmJhciA9ICgpID0+IHtcclxuICAgIGNvbnN0IFtzZWxlY3RlZE5hdiwgc2V0U2VsZWN0ZWROYXZdID0gdXNlU3RhdGUoKVxyXG4gICAgY29uc3QgW3Nob3dCdXJnZXJDb250YWluZXIsIHRvZ2dsZUJ1cmdlckNvbnRhaW5lcl0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICAgIGNvbnN0IHRpbWVsaW5lID0gdXNlUmVmKGdzYXAudGltZWxpbmUoKSlcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGVscy1jb250YWluZXInKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZXMnKVxyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSB8fCBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JylcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sbGFwc2l2ZS1jb250YWluZXInKVxyXG4gICAgICAgICAgICBsZXQgdDEgPSB0aW1lbGluZS5jdXJyZW50XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQpXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vZGVscyc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3VzdG9tLXNvbHV0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdvd25lcnNoaXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdG9yc3BvcnQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWROYXYgIT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWROYXYodGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pdGVtPSR7dGFyZ2V0fV1gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MS5jbGVhcigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEudG8oaXRlbSwgeyBhdXRvQWxwaGE6IDEsIGxlZnQ6IGV2ZW50LnRhcmdldC5vZmZzZXRMZWZ0LCBkdXJhdGlvbjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxLnRvKGVsZW1lbnQsIHsgYXV0b0FscGhhOiAxLCB5UGVyY2VudDogMCwgaGVpZ2h0OiBpdGVtLnNjcm9sbEhlaWdodCwgZHVyYXRpb246IDAsIGRlbGF5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEudG8oZWxlbWVudCwgeyB5UGVyY2VudDogLTEwMCwgaGVpZ2h0OiAnMHB4JywgZHVyYXRpb246IDAsIGRlbGF5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWROYXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0MS50byhlbGVtZW50LCB7IHlQZXJjZW50OiAtMTAwLCBoZWlnaHQ6ICcwcHgnLCBkdXJhdGlvbjogMCwgZGVsYXk6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xsYXBzaXZlLWNvbnRhaW5lcicpXHJcbiAgICAgICAgICAgIHNldFNlbGVjdGVkTmF2KClcclxuICAgICAgICAgICAgbGV0IHQxID0gdGltZWxpbmUuY3VycmVudFxyXG4gICAgICAgICAgICB0MS5jbGVhcigpXHJcbiAgICAgICAgICAgIHQxLnRvKGVsZW1lbnQsIHsgeVBlcmNlbnQ6IC0xMDAsIGhlaWdodDogJzBweCcsIGR1cmF0aW9uOiAwLCBkZWxheTogMCB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgcmVzaXplQW5pbWF0aW9uKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXNpemVBbmltYXRpb24oKVxyXG5cclxuICAgIH0sIFtdKVxyXG5cclxuICAgIGNvbnN0IHJlc2l6ZUFuaW1hdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgICAgICBjb25zdCBuYXZiYXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhcicpXHJcbiAgICAgICAgY29uc3QgbWFza0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyLW1hc2snKVxyXG4gICAgICAgIGNvbnN0IG1vZGVsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWxlZnQnKVxyXG4gICAgICAgIGNvbnN0IGhhbWJ1cmdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoYW1idXJnZXInKVxyXG4gICAgICAgIGlmIChuYXZiYXJFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10b2dnbGUtdmlldycpID09PSAnc2V0dGluZ3MnKSB7XHJcbiAgICAgICAgICAgIG1hc2tFbGVtZW50LnN0eWxlLmxlZnQgPSBtb2RlbEVsZW1lbnQub2Zmc2V0TGVmdCArIG1vZGVsRWxlbWVudC5vZmZzZXRXaWR0aCArICdweCdcclxuICAgICAgICAgICAgbWFza0VsZW1lbnQuc3R5bGUud2lkdGggPSBoYW1idXJnZXIub2Zmc2V0TGVmdCAtIChtb2RlbEVsZW1lbnQub2Zmc2V0V2lkdGgpICsgJ3B4J1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbWFza0VsZW1lbnQuc3R5bGUubGVmdCA9IG1vZGVsRWxlbWVudC5vZmZzZXRMZWZ0ICsgJ3B4J1xyXG4gICAgICAgICAgICBtYXNrRWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxoZWFkZXIgaWQ9XCJoZWFkZXJcIiBjbGFzc05hbWU9XCJmaXhlZC10b3BcIj5cclxuICAgICAgICAgICAgPG5hdiBpZD1cIm5hdmJhclwiIGRhdGEtdG9nZ2xlLXZpZXc9XCJzZXR0aW5nc1wiPlxyXG4gICAgICAgICAgICAgICAgPGEgaWQ9XCJtYXNrLWxlZnRcIiBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImJyYW5kXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e0xPR099IGFsdD1cIkxPR09cIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPHVsIGlkPVwibW9kZWxzLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBkYXRhLXRhcmdldD1cIm1vZGVsc1wiPm1vZGVsczwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBkYXRhLXRhcmdldD1cImN1c3RvbS1zb2x1dGlvblwiPmN1c3RvbSBzb2x1dGlvbnM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS10YXJnZXQ9XCJvd25lcnNoaXBcIj5vd25lcnNoaXA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS10YXJnZXQ9XCJtb3RvcnNwb3J0XCI+bW90b3JzcG9ydDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXMtYXV0byBkLWZsZXhcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZC1ub25lIGQteGwtZmxleFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPmRlYWxlcnNoaXBzPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPm11c2V1bTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5zdG9yZTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uLWdyb3VwIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgYWxpZ24taXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJpY29uLWNoYXRcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJ0cmFuc3BhcmVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1zZWFyY2hcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImhhbWJ1cmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwidHJhbnNwYXJlbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgY3VzdG9tLWJ1cmdlciBiZy10cmFuc3BhcmVudCAke3Nob3dCdXJnZXJDb250YWluZXIgJiYgJ2FjdGl2ZSd9YH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRvZ2dsZUJ1cmdlckNvbnRhaW5lcighc2hvd0J1cmdlckNvbnRhaW5lcil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICBpZD1cIm5hdmJhci1tYXNrXCJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BvdmVybGF5LW1hc2sgJHtzaG93QnVyZ2VyQ29udGFpbmVyICYmICdzaG93J31gfT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L25hdj5cclxuICAgICAgICAgICAgPENvbGxhcHNpdmVDb250YWluZXIgc2VsZWN0ZWROYXY9e3NlbGVjdGVkTmF2fSAvPlxyXG4gICAgICAgICAgICA8QnVyZ2VyQ29sbGFwc2l2ZUNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgc2hvdz17c2hvd0J1cmdlckNvbnRhaW5lcn1cclxuICAgICAgICAgICAgICAgIHRvZ2dsZT17KCkgPT4gdG9nZ2xlQnVyZ2VyQ29udGFpbmVyKCFzaG93QnVyZ2VyQ29udGFpbmVyKX1cclxuICAgICAgICAgICAgICAgIHJlc2l6ZUFuaW1hdGlvbj17cmVzaXplQW5pbWF0aW9ufVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvaGVhZGVyPlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmF2YmFyOyJdLCJzb3VyY2VSb290IjoiIn0=