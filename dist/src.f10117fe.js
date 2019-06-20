// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/models/Location.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Location =
/** @class */
function () {
  function Location(x, y, isFilled, isLocation, isSelected) {
    if (isFilled === void 0) {
      isFilled = false;
    }

    if (isLocation === void 0) {
      isLocation = false;
    }

    if (isSelected === void 0) {
      isSelected = false;
    }

    this.x = x;
    this.y = y;
    this.isFilled = isFilled;
    this.isLocation = isLocation;
    this.isSelected = isSelected;
  }

  Location.fromString = function (x, y, str) {
    switch (str) {
      case '1':
        return new Location(x, y, true, true, false);

      case '0':
        return new Location(x, y, false, true, false);

      default:
        return new Location(x, y, false, false, false);
    }
  };

  Location.prototype.getClassForRender = function () {
    var classString = 'col';

    switch (true) {
      case this.isLocation:
        classString += ' isLocation';

      case this.isFilled:
        classString += ' isFilled';

      case this.isSelected:
        classString += ' isSelected';
    }

    return classString;
  };

  return Location;
}();

exports["default"] = Location;
},{}],"src/models/V2.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var V2 =
/** @class */
function () {
  function V2(x, y) {
    this._x = +x;
    this._y = +y;
  }

  Object.defineProperty(V2.prototype, "x", {
    get: function get() {
      return this._x;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(V2.prototype, "y", {
    get: function get() {
      return this._y;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(V2.prototype, "object", {
    get: function get() {
      return {
        x: this._x,
        y: this._y
      };
    },
    enumerable: true,
    configurable: true
  });

  V2.fromObject = function (obj) {
    return new V2(obj.x, obj.y);
  };

  V2.fromArray = function (arr) {
    return new V2(arr[0], arr[1]);
  };

  return V2;
}();

exports["default"] = V2;
},{}],"src/Board/Board.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var Location_1 = __importDefault(require("../models/Location"));

var V2_1 = __importDefault(require("../models/V2"));

var Board =
/** @class */
function () {
  function Board(grid) {
    this._grid = [];
    this._grid = grid;
  }

  Board.fromString = function (string) {
    return new Board(string.trim().split('\n').map(function (rowString) {
      return rowString.trim().split('');
    }).map(function (row, y) {
      return row.map(function (col, x) {
        return Location_1["default"].fromString(x, y, col);
      });
    }));
  };

  Object.defineProperty(Board.prototype, "grid", {
    get: function get() {
      return this._grid;
    },
    enumerable: true,
    configurable: true
  });

  Board.prototype.prettyLog = function () {
    console.log("Board:");
    console.log(this._grid.map(function (row) {
      return row.map(function (col) {
        if (col.isFilled) {
          return "1";
        }

        if (col.isLocation) {
          return "0";
        }

        return "x";
      }).join("");
    }).join("\n"));
  }; // Is there any way to overload this?


  Board.prototype.getStoneRef = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (args[0] instanceof V2_1["default"]) {
      return this._grid[args[0].y][args[0].x];
    } // args is (number, number)


    if (typeof args[0] === 'number' && typeof args[1] === 'number') {
      return this._grid[args[1]][args[0]];
    }
  };

  return Board;
}();

exports["default"] = Board;
},{"../models/Location":"src/models/Location.ts","../models/V2":"src/models/V2.ts"}],"src/Board/BoardView.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var BoardView =
/** @class */
function () {
  function BoardView(container, board) {
    if (!container) {
      console.warn("Tried to instantiate a BoarView without container");
      return;
    }

    this._board = board;
    this._container = container;
    this.render();
  }

  BoardView.prototype.boardToHtmlString = function () {
    var str = this._board.grid.map(function (row) {
      return "<div class=\"board-row\">\n                " + row.map(function (loc) {
        return "<div class=\"" + loc.getClassForRender() + "\"></div>";
      }).join("") + "\n            </div>";
    }).join("");

    console.log(str);
    return str;
  };

  BoardView.prototype.render = function () {
    this._container.innerHTML = this.boardToHtmlString();
  };

  return BoardView;
}();

exports["default"] = BoardView;
},{}],"src/constants.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports["default"] = {
  BOARD_CONTAINER: '.board'
};
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

require("../styles/main.scss");

var Board_1 = __importDefault(require("./Board/Board"));

var BoardView_1 = __importDefault(require("./Board/BoardView"));

var constants_1 = __importDefault(require("./constants"));

var initialBoard = "\nxx111xx\nx11011x\nxx111xx\n";
var board = Board_1["default"].fromString(initialBoard);
var boardContainer = document.querySelector(constants_1["default"].BOARD_CONTAINER);
var boardView = new BoardView_1["default"](boardContainer, board);
},{"../styles/main.scss":"styles/main.scss","./Board/Board":"src/Board/Board.ts","./Board/BoardView":"src/Board/BoardView.ts","./constants":"src/constants.ts"}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55987" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map