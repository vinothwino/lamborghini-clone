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
      setTimeout(resizeAnimation, 250); // resizeAnimation()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9OYXZiYXIvaW5kZXguanMiXSwibmFtZXMiOlsiTmF2YmFyIiwidXNlU3RhdGUiLCJzZWxlY3RlZE5hdiIsInNldFNlbGVjdGVkTmF2Iiwic2hvd0J1cmdlckNvbnRhaW5lciIsInRvZ2dsZUJ1cmdlckNvbnRhaW5lciIsInRpbWVsaW5lIiwidXNlUmVmIiwiZ3NhcCIsInVzZUVmZmVjdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwicGFyZW50RWxlbWVudCIsImVsZW1lbnQiLCJ0MSIsImN1cnJlbnQiLCJpdGVtIiwicXVlcnlTZWxlY3RvciIsImNsZWFyIiwidG8iLCJhdXRvQWxwaGEiLCJsZWZ0Iiwib2Zmc2V0TGVmdCIsImR1cmF0aW9uIiwieVBlcmNlbnQiLCJoZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJkZWxheSIsImUiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwicmVzaXplQW5pbWF0aW9uIiwidXNlQ2FsbGJhY2siLCJuYXZiYXJFbGVtZW50IiwibWFza0VsZW1lbnQiLCJtb2RlbEVsZW1lbnQiLCJoYW1idXJnZXIiLCJzdHlsZSIsIm9mZnNldFdpZHRoIiwid2lkdGgiLCJMT0dPIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsTUFBTSxHQUFHLFNBQVRBLE1BQVMsR0FBTTtBQUFBOztBQUFBLGtCQUNxQkMsc0RBQVEsRUFEN0I7QUFBQSxNQUNWQyxXQURVO0FBQUEsTUFDR0MsY0FESDs7QUFBQSxtQkFFb0NGLHNEQUFRLENBQUMsS0FBRCxDQUY1QztBQUFBLE1BRVZHLG1CQUZVO0FBQUEsTUFFV0MscUJBRlg7O0FBR2pCLE1BQU1DLFFBQVEsR0FBR0Msb0RBQU0sQ0FB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QURKLGVBdURJLHFFQUFDLDREQUFEO0FBQXFCLGlCQUFXLEVBQUVGO0FBQWxDO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUF2REosZUF3REkscUVBQUMsa0VBQUQ7QUFDSSxVQUFJLEVBQUVFLG1CQURWO0FBRUksWUFBTSxFQUFFO0FBQUEsZUFBTUMscUJBQXFCLENBQUMsQ0FBQ0QsbUJBQUYsQ0FBM0I7QUFBQSxPQUZaO0FBR0kscUJBQWUsRUFBRWlDO0FBSHJCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUF4REo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREo7QUFnRUgsQ0FsSUQ7O0dBQU1yQyxNOztLQUFBQSxNO0FBb0lTQSxxRUFBZiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9pbmRleC41ZDA3ODA0MTg5NGVmNmE4MTE0OS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgQ29udGFpbmVyLCBSb3csIENvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCdcclxuaW1wb3J0IExPR08gZnJvbSAnYXNzZXRzL2ltYWdlcy9wbmcvbG9nby5wbmcnXHJcbmltcG9ydCBDb2xsYXBzaXZlQ29udGFpbmVyIGZyb20gJy4vQ29sbGFwc2l2ZUNvbnRhaW5lcidcclxuaW1wb3J0IEJ1cmdlckNvbGxhcHNpdmVDb250YWluZXIgZnJvbSAnLi9CdXJnZXJDb2xsYXBzaXZlQ29udGFpbmVyJ1xyXG5pbXBvcnQgZ3NhcCBmcm9tICdnc2FwJ1xyXG5cclxuY29uc3QgTmF2YmFyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgW3NlbGVjdGVkTmF2LCBzZXRTZWxlY3RlZE5hdl0gPSB1c2VTdGF0ZSgpXHJcbiAgICBjb25zdCBbc2hvd0J1cmdlckNvbnRhaW5lciwgdG9nZ2xlQnVyZ2VyQ29udGFpbmVyXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gICAgY29uc3QgdGltZWxpbmUgPSB1c2VSZWYoZ3NhcC50aW1lbGluZSgpKVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZWxzLWNvbnRhaW5lcicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlcycpXHJcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpIHx8IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKVxyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xsYXBzaXZlLWNvbnRhaW5lcicpXHJcbiAgICAgICAgICAgIGxldCB0MSA9IHRpbWVsaW5lLmN1cnJlbnRcclxuICAgICAgICAgICAgaWYgKHRhcmdldClcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW9kZWxzJzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdjdXN0b20tc29sdXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ293bmVyc2hpcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbW90b3JzcG9ydCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZE5hdiAhPT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZE5hdih0YXJnZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWl0ZW09JHt0YXJnZXR9XWApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxLmNsZWFyKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MS50byhpdGVtLCB7IGF1dG9BbHBoYTogMSwgbGVmdDogZXZlbnQudGFyZ2V0Lm9mZnNldExlZnQsIGR1cmF0aW9uOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEudG8oZWxlbWVudCwgeyBhdXRvQWxwaGE6IDEsIHlQZXJjZW50OiAwLCBoZWlnaHQ6IGl0ZW0uc2Nyb2xsSGVpZ2h0LCBkdXJhdGlvbjogMCwgZGVsYXk6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MS50byhlbGVtZW50LCB7IHlQZXJjZW50OiAtMTAwLCBoZWlnaHQ6ICcwcHgnLCBkdXJhdGlvbjogMCwgZGVsYXk6IDAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZE5hdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQxLnRvKGVsZW1lbnQsIHsgeVBlcmNlbnQ6IC0xMDAsIGhlaWdodDogJzBweCcsIGR1cmF0aW9uOiAwLCBkZWxheTogMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbGxhcHNpdmUtY29udGFpbmVyJylcclxuICAgICAgICAgICAgc2V0U2VsZWN0ZWROYXYoKVxyXG4gICAgICAgICAgICBsZXQgdDEgPSB0aW1lbGluZS5jdXJyZW50XHJcbiAgICAgICAgICAgIHQxLmNsZWFyKClcclxuICAgICAgICAgICAgdDEudG8oZWxlbWVudCwgeyB5UGVyY2VudDogLTEwMCwgaGVpZ2h0OiAnMHB4JywgZHVyYXRpb246IDAsIGRlbGF5OiAwIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlc2l6ZUFuaW1hdGlvbiwgMjUwKVxyXG4gICAgICAgICAgICAvLyByZXNpemVBbmltYXRpb24oKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJlc2l6ZUFuaW1hdGlvbigpXHJcblxyXG4gICAgfSwgW10pXHJcblxyXG4gICAgY29uc3QgcmVzaXplQW5pbWF0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5hdmJhckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2YmFyJylcclxuICAgICAgICBjb25zdCBtYXNrRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZiYXItbWFzaycpXHJcbiAgICAgICAgY29uc3QgbW9kZWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hc2stbGVmdCcpXHJcbiAgICAgICAgY29uc3QgaGFtYnVyZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hhbWJ1cmdlcicpXHJcbiAgICAgICAgaWYgKG5hdmJhckVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRvZ2dsZS12aWV3JykgPT09ICdzZXR0aW5ncycpIHtcclxuICAgICAgICAgICAgbWFza0VsZW1lbnQuc3R5bGUubGVmdCA9IG1vZGVsRWxlbWVudC5vZmZzZXRMZWZ0ICsgbW9kZWxFbGVtZW50Lm9mZnNldFdpZHRoICsgJ3B4J1xyXG4gICAgICAgICAgICBtYXNrRWxlbWVudC5zdHlsZS53aWR0aCA9IGhhbWJ1cmdlci5vZmZzZXRMZWZ0IC0gKG1vZGVsRWxlbWVudC5vZmZzZXRMZWZ0ICsgbW9kZWxFbGVtZW50Lm9mZnNldFdpZHRoKSArICdweCdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG1hc2tFbGVtZW50LnN0eWxlLmxlZnQgPSBtb2RlbEVsZW1lbnQub2Zmc2V0TGVmdCArICdweCdcclxuICAgICAgICAgICAgbWFza0VsZW1lbnQuc3R5bGUud2lkdGggPSAnMTAwJSdcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8aGVhZGVyIGlkPVwiaGVhZGVyXCIgY2xhc3NOYW1lPVwiZml4ZWQtdG9wXCI+XHJcbiAgICAgICAgICAgIDxuYXYgaWQ9XCJuYXZiYXJcIiBkYXRhLXRvZ2dsZS12aWV3PVwic2V0dGluZ3NcIj5cclxuICAgICAgICAgICAgICAgIDxhIGlkPVwibWFzay1sZWZ0XCIgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJicmFuZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtMT0dPfSBhbHQ9XCJMT0dPXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDx1bCBpZD1cIm1vZGVscy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS10YXJnZXQ9XCJtb2RlbHNcIj5tb2RlbHM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgZGF0YS10YXJnZXQ9XCJjdXN0b20tc29sdXRpb25cIj5jdXN0b20gc29sdXRpb25zPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGRhdGEtdGFyZ2V0PVwib3duZXJzaGlwXCI+b3duZXJzaGlwPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGRhdGEtdGFyZ2V0PVwibW90b3JzcG9ydFwiPm1vdG9yc3BvcnQ8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1zLWF1dG8gZC1mbGV4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImQtbm9uZSBkLXhsLWZsZXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5kZWFsZXJzaGlwczwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5tdXNldW08L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+c3RvcmU8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1ncm91cCBkLWZsZXgganVzdGlmeS1jb250ZW50LXN0YXJ0IGFsaWduLWl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJ0cmFuc3BhcmVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiaWNvbi1jaGF0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwidHJhbnNwYXJlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImljb24tc2VhcmNoXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJoYW1idXJnZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInRyYW5zcGFyZW50XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGN1c3RvbS1idXJnZXIgYmctdHJhbnNwYXJlbnQgJHtzaG93QnVyZ2VyQ29udGFpbmVyICYmICdhY3RpdmUnfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVCdXJnZXJDb250YWluZXIoIXNob3dCdXJnZXJDb250YWluZXIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJuYXZiYXItbWFza1wiXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgb3ZlcmxheS1tYXNrICR7c2hvd0J1cmdlckNvbnRhaW5lciAmJiAnc2hvdyd9YH0+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9uYXY+XHJcbiAgICAgICAgICAgIDxDb2xsYXBzaXZlQ29udGFpbmVyIHNlbGVjdGVkTmF2PXtzZWxlY3RlZE5hdn0gLz5cclxuICAgICAgICAgICAgPEJ1cmdlckNvbGxhcHNpdmVDb250YWluZXJcclxuICAgICAgICAgICAgICAgIHNob3c9e3Nob3dCdXJnZXJDb250YWluZXJ9XHJcbiAgICAgICAgICAgICAgICB0b2dnbGU9eygpID0+IHRvZ2dsZUJ1cmdlckNvbnRhaW5lcighc2hvd0J1cmdlckNvbnRhaW5lcil9XHJcbiAgICAgICAgICAgICAgICByZXNpemVBbmltYXRpb249e3Jlc2l6ZUFuaW1hdGlvbn1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8L2hlYWRlcj5cclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdmJhcjsiXSwic291cmNlUm9vdCI6IiJ9