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
      setTimeout(resizeAnimation, 100);
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
      maskElement.style.width = hamburger.offsetLeft - (modelElement.offsetLeft + modelElement.offsetWidth) + 'px';
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
          lineNumber: 78,
          columnNumber: 21
        }, _this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 77,
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
            lineNumber: 82,
            columnNumber: 25
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 81,
          columnNumber: 21
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
            href: "#",
            "data-target": "custom-solution",
            children: "custom solutions"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 85,
            columnNumber: 25
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 84,
          columnNumber: 21
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
            href: "#",
            "data-target": "ownership",
            children: "ownership"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 88,
            columnNumber: 25
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 87,
          columnNumber: 21
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
            href: "#",
            "data-target": "motorsport",
            children: "motorsport"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 91,
            columnNumber: 25
          }, _this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 90,
          columnNumber: 21
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 80,
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
              lineNumber: 97,
              columnNumber: 29
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 96,
            columnNumber: 25
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
              href: "#",
              children: "museum"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 100,
              columnNumber: 29
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 99,
            columnNumber: 25
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("li", {
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("a", {
              href: "#",
              children: "store"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 103,
              columnNumber: 29
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 102,
            columnNumber: 25
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 95,
          columnNumber: 21
        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
          className: "button-group d-flex justify-content-start align-items-center",
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
            variant: "transparent",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("i", {
              className: "icon-chat"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 108,
              columnNumber: 29
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 107,
            columnNumber: 25
          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
            variant: "transparent",
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("i", {
              className: "icon-search"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 111,
              columnNumber: 29
            }, _this)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 110,
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
              lineNumber: 119,
              columnNumber: 29
            }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 120,
              columnNumber: 29
            }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 121,
              columnNumber: 29
            }, _this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 113,
            columnNumber: 25
          }, _this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 106,
          columnNumber: 21
        }, _this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 17
      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])("div", {
        id: "navbar-mask",
        className: "overlay-mask ".concat(showBurgerContainer && 'show')
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 125,
        columnNumber: 17
      }, _this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 13
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_CollapsiveContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      selectedNav: selectedNav
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 13
    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxDEV"])(_BurgerCollapsiveContainer__WEBPACK_IMPORTED_MODULE_5__["default"], {
      show: showBurgerContainer,
      toggle: function toggle() {
        return toggleBurgerContainer(!showBurgerContainer);
      },
      resizeAnimation: resizeAnimation
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 13
    }, _this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 75,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9OYXZiYXIvaW5kZXguanMiXSwibmFtZXMiOlsiTmF2YmFyIiwidXNlU3RhdGUiLCJzZWxlY3RlZE5hdiIsInNldFNlbGVjdGVkTmF2Iiwic2hvd0J1cmdlckNvbnRhaW5lciIsInRvZ2dsZUJ1cmdlckNvbnRhaW5lciIsInRpbWVsaW5lIiwidXNlUmVmIiwiZ3NhcCIsInVzZUVmZmVjdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwicGFyZW50RWxlbWVudCIsImVsZW1lbnQiLCJ0MSIsImN1cnJlbnQiLCJpdGVtIiwicXVlcnlTZWxlY3RvciIsImNsZWFyIiwidG8iLCJhdXRvQWxwaGEiLCJsZWZ0Iiwib2Zmc2V0TGVmdCIsImR1cmF0aW9uIiwieVBlcmNlbnQiLCJoZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJkZWxheSIsImUiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwicmVzaXplQW5pbWF0aW9uIiwidXNlQ2FsbGJhY2siLCJuYXZiYXJFbGVtZW50IiwibWFza0VsZW1lbnQiLCJtb2RlbEVsZW1lbnQiLCJoYW1idXJnZXIiLCJzdHlsZSIsIm9mZnNldFdpZHRoIiwid2lkdGgiLCJMT0dPIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsTUFBTSxHQUFHLFNBQVRBLE1BQVMsR0FBTTtBQUFBOztBQUFBLGtCQUNxQkMsc0RBQVEsRUFEN0I7QUFBQSxNQUNWQyxXQURVO0FBQUEsTUFDR0MsY0FESDs7QUFBQSxtQkFFb0NGLHNEQUFRLENBQUMsS0FBRCxDQUY1QztBQUFBLE1BRVZHLG1CQUZVO0FBQUEsTUFFV0MscUJBRlg7O0FBR2pCLE1BQU1DLFFBQVEsR0FBR0Msb0RBQU0sQ0FB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YUFESixlQXVESSxxRUFBQyw0REFBRDtBQUFxQixpQkFBVyxFQUFFRjtBQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBdkRKLGVBd0RJLHFFQUFDLGtFQUFEO0FBQ0ksVUFBSSxFQUFFRSxtQkFEVjtBQUVJLFlBQU0sRUFBRTtBQUFBLGVBQU1DLHFCQUFxQixDQUFDLENBQUNELG1CQUFGLENBQTNCO0FBQUEsT0FGWjtBQUdJLHFCQUFlLEVBQUVpQztBQUhyQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBeERKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURKO0FBZ0VILENBbElEOztHQUFNckMsTTs7S0FBQUEsTTtBQW9JU0EscUVBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvaW5kZXguNThmOWJlMDMzMTQxNzYwZDlhNTMuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCdXR0b24sIENvbnRhaW5lciwgUm93LCBDb2wgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnXHJcbmltcG9ydCBMT0dPIGZyb20gJ2Fzc2V0cy9pbWFnZXMvcG5nL2xvZ28ucG5nJ1xyXG5pbXBvcnQgQ29sbGFwc2l2ZUNvbnRhaW5lciBmcm9tICcuL0NvbGxhcHNpdmVDb250YWluZXInXHJcbmltcG9ydCBCdXJnZXJDb2xsYXBzaXZlQ29udGFpbmVyIGZyb20gJy4vQnVyZ2VyQ29sbGFwc2l2ZUNvbnRhaW5lcidcclxuaW1wb3J0IGdzYXAgZnJvbSAnZ3NhcCdcclxuXHJcbmNvbnN0IE5hdmJhciA9ICgpID0+IHtcclxuICAgIGNvbnN0IFtzZWxlY3RlZE5hdiwgc2V0U2VsZWN0ZWROYXZdID0gdXNlU3RhdGUoKVxyXG4gICAgY29uc3QgW3Nob3dCdXJnZXJDb250YWluZXIsIHRvZ2dsZUJ1cmdlckNvbnRhaW5lcl0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICAgIGNvbnN0IHRpbWVsaW5lID0gdXNlUmVmKGdzYXAudGltZWxpbmUoKSlcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGVscy1jb250YWluZXInKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZXMnKVxyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKSB8fCBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JylcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sbGFwc2l2ZS1jb250YWluZXInKVxyXG4gICAgICAgICAgICBsZXQgdDEgPSB0aW1lbGluZS5jdXJyZW50XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQpXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vZGVscyc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3VzdG9tLXNvbHV0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdvd25lcnNoaXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21vdG9yc3BvcnQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWROYXYgIT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWROYXYodGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pdGVtPSR7dGFyZ2V0fV1gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MS5jbGVhcigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEudG8oaXRlbSwgeyBhdXRvQWxwaGE6IDEsIGxlZnQ6IGV2ZW50LnRhcmdldC5vZmZzZXRMZWZ0LCBkdXJhdGlvbjogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxLnRvKGVsZW1lbnQsIHsgYXV0b0FscGhhOiAxLCB5UGVyY2VudDogMCwgaGVpZ2h0OiBpdGVtLnNjcm9sbEhlaWdodCwgZHVyYXRpb246IDAsIGRlbGF5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEudG8oZWxlbWVudCwgeyB5UGVyY2VudDogLTEwMCwgaGVpZ2h0OiAnMHB4JywgZHVyYXRpb246IDAsIGRlbGF5OiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWROYXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0MS50byhlbGVtZW50LCB7IHlQZXJjZW50OiAtMTAwLCBoZWlnaHQ6ICcwcHgnLCBkdXJhdGlvbjogMCwgZGVsYXk6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xsYXBzaXZlLWNvbnRhaW5lcicpXHJcbiAgICAgICAgICAgIHNldFNlbGVjdGVkTmF2KClcclxuICAgICAgICAgICAgbGV0IHQxID0gdGltZWxpbmUuY3VycmVudFxyXG4gICAgICAgICAgICB0MS5jbGVhcigpXHJcbiAgICAgICAgICAgIHQxLnRvKGVsZW1lbnQsIHsgeVBlcmNlbnQ6IC0xMDAsIGhlaWdodDogJzBweCcsIGR1cmF0aW9uOiAwLCBkZWxheTogMCB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChyZXNpemVBbmltYXRpb24sIDEwMClcclxuICAgICAgICAgICAgcmVzaXplQW5pbWF0aW9uKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXNpemVBbmltYXRpb24oKVxyXG5cclxuICAgIH0sIFtdKVxyXG5cclxuICAgIGNvbnN0IHJlc2l6ZUFuaW1hdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgICAgICBjb25zdCBuYXZiYXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmJhcicpXHJcbiAgICAgICAgY29uc3QgbWFza0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyLW1hc2snKVxyXG4gICAgICAgIGNvbnN0IG1vZGVsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXNrLWxlZnQnKVxyXG4gICAgICAgIGNvbnN0IGhhbWJ1cmdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoYW1idXJnZXInKVxyXG4gICAgICAgIGlmIChuYXZiYXJFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10b2dnbGUtdmlldycpID09PSAnc2V0dGluZ3MnKSB7XHJcbiAgICAgICAgICAgIG1hc2tFbGVtZW50LnN0eWxlLmxlZnQgPSBtb2RlbEVsZW1lbnQub2Zmc2V0TGVmdCArIG1vZGVsRWxlbWVudC5vZmZzZXRXaWR0aCArICdweCdcclxuICAgICAgICAgICAgbWFza0VsZW1lbnQuc3R5bGUud2lkdGggPSBoYW1idXJnZXIub2Zmc2V0TGVmdCAtIChtb2RlbEVsZW1lbnQub2Zmc2V0TGVmdCArIG1vZGVsRWxlbWVudC5vZmZzZXRXaWR0aCkgKyAncHgnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtYXNrRWxlbWVudC5zdHlsZS5sZWZ0ID0gbW9kZWxFbGVtZW50Lm9mZnNldExlZnQgKyAncHgnXHJcbiAgICAgICAgICAgIG1hc2tFbGVtZW50LnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGhlYWRlciBpZD1cImhlYWRlclwiIGNsYXNzTmFtZT1cImZpeGVkLXRvcFwiPlxyXG4gICAgICAgICAgICA8bmF2IGlkPVwibmF2YmFyXCIgZGF0YS10b2dnbGUtdmlldz1cInNldHRpbmdzXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBpZD1cIm1hc2stbGVmdFwiIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwiYnJhbmRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17TE9HT30gYWx0PVwiTE9HT1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8dWwgaWQ9XCJtb2RlbHMtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGRhdGEtdGFyZ2V0PVwibW9kZWxzXCI+bW9kZWxzPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGRhdGEtdGFyZ2V0PVwiY3VzdG9tLXNvbHV0aW9uXCI+Y3VzdG9tIHNvbHV0aW9uczwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBkYXRhLXRhcmdldD1cIm93bmVyc2hpcFwiPm93bmVyc2hpcDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBkYXRhLXRhcmdldD1cIm1vdG9yc3BvcnRcIj5tb3RvcnNwb3J0PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtcy1hdXRvIGQtZmxleFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJkLW5vbmUgZC14bC1mbGV4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+ZGVhbGVyc2hpcHM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+bXVzZXVtPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPnN0b3JlPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b24tZ3JvdXAgZC1mbGV4IGp1c3RpZnktY29udGVudC1zdGFydCBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwidHJhbnNwYXJlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tY2hhdFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJpY29uLXNlYXJjaFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiaGFtYnVyZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJ0cmFuc3BhcmVudFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BjdXN0b20tYnVyZ2VyIGJnLXRyYW5zcGFyZW50ICR7c2hvd0J1cmdlckNvbnRhaW5lciAmJiAnYWN0aXZlJ31gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlQnVyZ2VyQ29udGFpbmVyKCFzaG93QnVyZ2VyQ29udGFpbmVyKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIGlkPVwibmF2YmFyLW1hc2tcIlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YG92ZXJsYXktbWFzayAke3Nob3dCdXJnZXJDb250YWluZXIgJiYgJ3Nob3cnfWB9PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbmF2PlxyXG4gICAgICAgICAgICA8Q29sbGFwc2l2ZUNvbnRhaW5lciBzZWxlY3RlZE5hdj17c2VsZWN0ZWROYXZ9IC8+XHJcbiAgICAgICAgICAgIDxCdXJnZXJDb2xsYXBzaXZlQ29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICBzaG93PXtzaG93QnVyZ2VyQ29udGFpbmVyfVxyXG4gICAgICAgICAgICAgICAgdG9nZ2xlPXsoKSA9PiB0b2dnbGVCdXJnZXJDb250YWluZXIoIXNob3dCdXJnZXJDb250YWluZXIpfVxyXG4gICAgICAgICAgICAgICAgcmVzaXplQW5pbWF0aW9uPXtyZXNpemVBbmltYXRpb259XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9oZWFkZXI+XHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7Il0sInNvdXJjZVJvb3QiOiIifQ==