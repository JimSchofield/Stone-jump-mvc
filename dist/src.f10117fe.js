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
},{"_css_loader":"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/util/V2.ts":[function(require,module,exports) {
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
  /*---- Operations ----*/


  V2.prototype.add = function (v2) {
    this._x += v2.x;
    this._y += v2.y;
    return this;
  };

  V2.add = function (v1, v2) {
    return new V2(v1.x + v2.x, v1.y + v2.y);
  };
  /*---- Geometry ----*/


  V2.midpoint = function (v, w) {
    return new V2((v.x + w.x) / 2, (v.y + w.y) / 2);
  };

  V2.distance = function (v, w) {
    return Math.sqrt(Math.pow(v.x - w.x, 2) + Math.pow(v.y - w.y, 2));
  };

  return V2;
}();

exports["default"] = V2;
},{}],"src/Board/Location.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var V2_1 = __importDefault(require("../util/V2"));

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

  Object.defineProperty(Location.prototype, "v2", {
    get: function get() {
      return new V2_1["default"](this.x, this.y);
    },
    enumerable: true,
    configurable: true
  });
  return Location;
}();

exports["default"] = Location;
},{"../util/V2":"src/util/V2.ts"}],"src/Board/Board.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var Location_1 = __importDefault(require("./Location"));

var V2_1 = __importDefault(require("../util/V2"));

var Board =
/** @class */
function () {
  function Board(grid) {
    this._grid = [[]];
    this._grid = grid;
    this.maxX = this._grid[0].length - 1;
    this.maxY = this._grid.length - 1;
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
  Object.defineProperty(Board.prototype, "hasStoneSelected", {
    get: function get() {
      return this._grid.flat(2).some(function (loc) {
        return loc.isSelected;
      });
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Board.prototype, "selectedStone", {
    get: function get() {
      return this._grid.flat(2).find(function (selected) {
        return selected.isSelected;
      });
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
  }; // Is there any other way to overload this?


  Board.prototype.getStoneRef = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (args[0] instanceof V2_1["default"]) {
      return this._grid[+args[0].y][+args[0].x];
    } // (number, number), ASSUME


    return this._grid[+args[1]][+args[0]];
  };

  Board.prototype.clearStoneSelect = function () {
    this._grid.flat(2).map(function (location) {
      return location.isSelected = false;
    });
  };

  Board.prototype.inBoardRange = function (coords) {
    var x = coords.x,
        y = coords.y;
    return x >= 0 && x <= this.maxX && y >= 0 && y <= this.maxY;
  };

  Board.prototype.selectStone = function (x, y) {
    this.clearStoneSelect();
    this.getStoneRef(x, y).isSelected = true;
  };

  Board.prototype.moveStone = function (move) {
    this.getStoneRef(move.from).isFilled = false;
    this.getStoneRef(V2_1["default"].midpoint(move.from, move.to)).isFilled = false;
    this.getStoneRef(move.to).isFilled = true;
  };

  return Board;
}();

exports["default"] = Board;
},{"./Location":"src/Board/Location.ts","../util/V2":"src/util/V2.ts"}],"src/Board/BoardView.ts":[function(require,module,exports) {
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

    this.board = board;
    this._container = container;
    this.render();
  }

  BoardView.prototype.getClassForRender = function (location) {
    var classString = 'col';

    if (location.isLocation) {
      classString += ' isLocation';
    }

    if (location.isFilled) {
      classString += ' isFilled';
    }

    if (location.isSelected) {
      classString += ' isSelected';
    }

    return classString;
  };

  BoardView.prototype.boardToHtmlString = function () {
    var _this = this;

    var str = this.board.grid.map(function (row, y) {
      return "<div class=\"board-row\">\n                " + row.map(function (loc, x) {
        return "<div class=\"" + _this.getClassForRender(loc) + "\" data-coords=\"" + y + "," + x + "\"></div>";
      }).join("") + "\n            </div>";
    }).join("");
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
},{}],"src/Components/MoveListComponent.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var MoveListComponent =
/** @class */
function () {
  function MoveListComponent(container) {
    this._container = container;
    this.render();
  }

  MoveListComponent.prototype.updateList = function (moveList) {
    this.moveList = moveList;
    this.render();
  };

  MoveListComponent.prototype.getListItems = function () {
    return this.moveList.map(function (move) {
      var _a = move.from,
          x = _a.x,
          y = _a.y;
      var _b = move.to,
          toX = _b.x,
          toY = _b.y;
      return "<li>(" + x + ", " + y + ") => (" + toX + ", " + toY + ")</li>";
    }).join('');
  };

  MoveListComponent.prototype.clearList = function () {
    this.moveList = null;
    this.render();
  };

  MoveListComponent.prototype.render = function () {
    this._container.innerHTML = "";

    if (this.moveList && this.moveList.length) {
      this._container.style.display = 'block';
      this._container.innerHTML = "\n                <h2>Valid Moves from selection</h2>\n                <ul>\n                    " + this.getListItems() + "\n                </ul>\n            ";
    } else {
      this._container.style.display = 'none';
    }
  };

  return MoveListComponent;
}();

exports["default"] = MoveListComponent;
},{}],"src/Controller.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var V2_1 = __importDefault(require("./util/V2"));

var MoveListComponent_1 = __importDefault(require("./Components/MoveListComponent"));

var Controller =
/** @class */
function () {
  function Controller(boardContainer, boardView, referee) {
    var _this = this;

    this.handleBoardClick = function (event) {
      // Check if location
      if (!event.target.dataset.coords) {
        _this.clearBoardSelection();

        return;
      } // peel off coords


      var _a = event.target.dataset.coords.split(",").map(function (el) {
        return +el;
      }),
          y = _a[0],
          x = _a[1]; // check if there is a selected stone, and if so, check if
      // the event's target is a valid destination


      if (_this._board.hasStoneSelected && _this._referee.moveIsValid({
        from: _this._board.selectedStone.v2,
        to: new V2_1["default"](x, y)
      }, _this._board)) {
        _this._board.moveStone({
          from: _this._board.selectedStone.v2,
          to: new V2_1["default"](x, y)
        });

        _this._boardView.render();
      }

      _this.selectNewStone(x, y);
    };

    this._board = boardView.board;
    this._boardView = boardView;
    this.boardContainer = boardContainer;
    this._referee = referee;
    this.init();
  }

  Controller.prototype.init = function () {
    this.createChildren().attachHandlers();
  };

  Controller.prototype.createChildren = function () {
    var moveListcontainer = document.querySelector('.valid-moves');
    this._validMoveElement = new MoveListComponent_1["default"](moveListcontainer);
    return this;
  };

  Controller.prototype.attachHandlers = function () {
    this.boardContainer.addEventListener('click', this.handleBoardClick);
    return this;
  };

  Controller.prototype.selectNewStone = function (x, y) {
    // if stone is a valid selection, clear all and select stone
    if (!this._board.getStoneRef(x, y).isFilled) {
      // Don't move on to render if not filled
      this.clearBoardSelection();
      return;
    }

    this._board.selectStone(x, y); // find possible moves from selection


    var moves = this._referee.findMovesFrom(new V2_1["default"](x, y), this._board);

    this._validMoveElement.updateList(moves); // render when all the calcs are done!


    this._boardView.render();
  };

  Controller.prototype.clearBoardSelection = function () {
    this._board.clearStoneSelect();

    this._validMoveElement.clearList();

    this._boardView.render();
  };

  return Controller;
}();

exports["default"] = Controller;
},{"./util/V2":"src/util/V2.ts","./Components/MoveListComponent":"src/Components/MoveListComponent.ts"}],"src/logic/MoveList.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var MoveList =
/** @class */
function () {
  function MoveList(moveList) {
    this._moveList = [];

    if (moveList && moveList.length) {
      this._moveList = moveList;
    }
  }

  Object.defineProperty(MoveList.prototype, "length", {
    get: function get() {
      return this._moveList.length;
    },
    enumerable: true,
    configurable: true
  });

  MoveList.prototype.addMove = function (move) {
    this._moveList.push(move);
  };

  MoveList.prototype.map = function (func) {
    return this._moveList.map(func);
  };

  return MoveList;
}();

exports["default"] = MoveList;
},{}],"src/logic/Referee.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var MoveList_1 = __importDefault(require("./MoveList"));

var V2_1 = __importDefault(require("../util/V2"));

var Referee =
/** @class */
function () {
  function Referee(geometry) {
    this._geometry = geometry;
  }

  Referee.prototype.findMovesFrom = function (coords, board) {
    var _this = this;

    var legalMoves = new MoveList_1["default"]();

    this._geometry.translations.forEach(function (t) {
      if (!board.getStoneRef(coords).isFilled) {
        return;
      }

      var from = coords;
      var to = t(t(from));

      if (!_this.moveIsValid({
        from: from,
        to: to
      }, board)) {
        return;
      }

      ; // Whew, we made it and this move is legal:

      legalMoves.addMove({
        from: from,
        to: to
      });
    });

    return legalMoves;
  };

  Referee.prototype.moveIsValid = function (move, board) {
    // make sure moves are always a distance of two
    if (V2_1["default"].distance(move.from, move.to) !== 2) {
      return false;
    }

    if (!board.getStoneRef(move.from).isFilled) {
      return false;
    } // make sure midpoint is in range and filled


    var mid = V2_1["default"].midpoint(move.from, move.to);

    if (!(board.inBoardRange(mid) && board.getStoneRef(mid).isFilled)) {
      return false;
    } // check to make sure destination location is in range and not filled location
    // if so, valid move!


    var dest = move.to;

    if (!board.inBoardRange(dest)) {
      return false;
    }

    var destStoneRef = board.getStoneRef(dest);

    if (!(destStoneRef.isLocation && !destStoneRef.isFilled)) {
      return false;
    }

    return true;
  };

  return Referee;
}();

exports["default"] = Referee;
},{"./MoveList":"src/logic/MoveList.ts","../util/V2":"src/util/V2.ts"}],"src/logic/geometry.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var V2_1 = __importDefault(require("../util/V2"));

var Geometry =
/** @class */
function () {
  function Geometry(t) {
    this._translations = t;
  }

  Object.defineProperty(Geometry.prototype, "translations", {
    get: function get() {
      return this._translations;
    },
    enumerable: true,
    configurable: true
  });
  return Geometry;
}();

exports["default"] = Geometry;
var cartesianMoveList = [// up
function (coords) {
  return V2_1["default"].add(new V2_1["default"](0, -1), coords);
}, // down
function (coords) {
  return V2_1["default"].add(new V2_1["default"](0, 1), coords);
}, // left
function (coords) {
  return V2_1["default"].add(new V2_1["default"](-1, 0), coords);
}, // right
function (coords) {
  return V2_1["default"].add(new V2_1["default"](1, 0), coords);
}];
var CartesianGeometry = new Geometry(cartesianMoveList);
exports.CartesianGeometry = CartesianGeometry;
},{"../util/V2":"src/util/V2.ts"}],"src/index.ts":[function(require,module,exports) {
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

var Controller_1 = __importDefault(require("./Controller"));

var Referee_1 = __importDefault(require("./logic/Referee"));

var geometry_1 = require("./logic/geometry");

var initialBoard = "\n0110\nx111\n1011\n"; // Board setup

var board = Board_1["default"].fromString(initialBoard);
var boardContainer = document.querySelector(constants_1["default"].BOARD_CONTAINER);
var boardView = new BoardView_1["default"](boardContainer, board); // Move refereeing

var referee = new Referee_1["default"](geometry_1.CartesianGeometry);
var controller = new Controller_1["default"](boardContainer, boardView, referee);
},{"../styles/main.scss":"styles/main.scss","./Board/Board":"src/Board/Board.ts","./Board/BoardView":"src/Board/BoardView.ts","./constants":"src/constants.ts","./Controller":"src/Controller.ts","./logic/Referee":"src/logic/Referee.ts","./logic/geometry":"src/logic/geometry.ts"}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57848" + '/');

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