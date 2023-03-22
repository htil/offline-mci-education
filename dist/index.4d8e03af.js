// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4Nw3q":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "4821f2614d8e03af";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"e5fk1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BlocklyInterface", ()=>BlocklyInterface);
var _toolboxJs = require("./utility/Toolbox.js");
var _categoriesJs = require("./blocks/categories.js");
var _lodash = require("lodash");
var _lodashDefault = parcelHelpers.interopDefault(_lodash);
var _appJs = require("./app.js");
const BlocklyInterface = function() {
    // Handle custom block creation
    createCustomBlocks();
    const printVal = document.querySelector("#printVal");
    // UI Elements
    //this.runButton = document.getElementById('runButton');
    window.interpreter = null;
    window.runner = null;
    window.latestCode = "";
    window.editorMode = "block";
    window.highlightPause = false;
    let { cat_logic , cat_loops , cat_math , cat_sep , cat_data , cat_vars , cat_list  } = (0, _categoriesJs.Categories);
    let _toolbox = new (0, _toolboxJs.Toolbox)([
        cat_logic,
        cat_loops,
        cat_math,
        cat_sep,
        cat_data,
        cat_vars,
        cat_list
    ]);
    window.workspace = Blockly.inject("blocklyDiv", {
        media: "https://unpkg.com/browse/blockly/media/",
        toolbox: _toolbox.toString()
    });
    // Create custom tool box to load when category selected
    let createCustomToolBox = (blocks)=>{
        let res = [];
        blocks.forEach((element)=>{
            let block = (0, _toolboxJs.unwind)([
                element
            ], true);
            block = Blockly.Xml.textToDom(block).firstChild;
            res.push(block);
        });
        //console.log(res);
        return res;
    };
    // Triggers everytime category opens
    window.workspace.registerToolboxCategoryCallback("DATA", (ws)=>{
        return createCustomToolBox([
            "plot_raw",
            "getRaw",
            "removeSignalMean",
            "getabsdata",
            "filter_signal"
        ]);
    });
    /*
  Blockly.Xml.domToWorkspace(
    document.getElementById("startBlocks"),
    window.workspace
  );
  */ // Exit is used to signal the end of a script.
    Blockly.JavaScript.addReservedWords("exit");
    // Clear interpreter
    window.resetInterpreter = function() {
        //console.log("resetInterpreter")
        window.interpreter = null;
        window.workspace.highlightBlock(null);
        if (window.runner) {
            clearTimeout(window.runner);
            window.runner = null;
        }
    };
    window.generateCodeAndLoadIntoInterpreter = function() {
        Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
        Blockly.JavaScript.addReservedWords("highlightBlock");
        window.latestCode = Blockly.JavaScript.workspaceToCode(window.workspace);
        let xml = Blockly.Xml.workspaceToDom(window.workspace);
    // sync code. comment to stop synching
    // Add this later to offline app
    //window.textEditor.setValue(window.latestCode);
    //this.runButton = ''
    };
    let formatList = (list)=>{
        return list.properties ? (0, _lodashDefault.default).values(list.properties) : list;
    };
    // We need this to handle how to plot x-axis different based on wheter we are handlings user defined data or physio data
    // This is just a quick fix for now. When updated to support different types of data we will need to revisit this
    // Currently the plot functions checks to see if the list has a properties node. If so it assumes its user defined. Otherwise the x-axis is simply mapped to the value's index
    let formatListCallback = (list, processedData, cb)=>{
        if (list.properties) {
            list.properties = processedData;
            cb(list); // returns here
        } else cb(processedData);
    };
    /////////////////////// BEGIN INTERPRETER SETUP ///////////////////////////////////////////
    // Add native to blockly here
    // This is too big now needs to be moved into its on module (TODO)
    window.initApi = function(interpreter, globalObject) {
        /* Get Filter */ var wrapper = async function(list, low, high, callback) {
            try {
                //console.log(list, low, high)
                let arr = formatList(list);
                let filteredData = await (0, _appJs.blocklyHooks).filterSignalHook(arr, low, high);
                formatListCallback(list, filteredData, callback);
            /*if (list.properties) {
          list.properties = filteredData;
          return list;
          //cb(list); // returns here
        } else {
          //cb(processedData);
          return filteredData;
        }
        */ } catch (error) {
                return error;
            }
        };
        interpreter.setProperty(globalObject, "filterSignal", interpreter.createAsyncFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        /* Get Abs Values */ var wrapper = async function(list, callback) {
            try {
                let arr = formatList(list);
                let absData = await (0, _appJs.blocklyHooks).getAbsValueHook(arr);
                formatListCallback(list, absData, callback);
            } catch (error) {
                return error;
            }
        };
        interpreter.setProperty(globalObject, "getAbsVals", interpreter.createAsyncFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        /* Remove Mean */ // Example of using async functions with JS interpreter
        // See https://neil.fraser.name/software/JS-Interpreter/demos/async.html for example
        var wrapper = async function(list, callback) {
            try {
                let arr = formatList(list);
                let meanRemovedData = await (0, _appJs.blocklyHooks).removeMeanHook(arr);
                formatListCallback(list, meanRemovedData, callback);
            //callback(meanRemovedData)    // returns here
            } catch (error) {
                return error;
            }
        };
        interpreter.setProperty(globalObject, "removeMean", interpreter.createAsyncFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        // Get Raw
        // Not really sure if this matters.
        //the code doesn't actually call getRaw in customBlock currently.
        //Keep and eye on this in the future.
        var wrapper = function() {
            try {
                return (0, _appJs.blocklyHooks).raw();
            } catch (error) {
                return error;
            }
        };
        interpreter.setProperty(globalObject, "getRawData", interpreter.createNativeFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        // Plot Raw
        var wrapper = function(list, sampleCount) {
            if (list.properties) {
                var arr = (0, _lodashDefault.default).values(list.properties);
                (0, _appJs.blocklyHooks).plotRaw(arr, true, sampleCount);
            } else //console.log(list, sampleCount)
            (0, _appJs.blocklyHooks).plotRaw(list, false, sampleCount);
        };
        interpreter.setProperty(globalObject, "plotRaw", interpreter.createNativeFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        // Pan robot
        var wrapper = function(cmd) {
            window.pan(cmd);
            console.log("PAN ", cmd);
        };
        interpreter.setProperty(globalObject, "testVar", interpreter.createNativeFunction(wrapper));
        // Print to console
        var wrapper = function(cmd, something) {
            //console.log(cmd, something);
            if (cmd !== undefined) printVal.innerHTML = cmd;
            else printVal.innerHTML = "";
        };
        interpreter.setProperty(globalObject, "print", interpreter.createNativeFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        // setVelocityX
        var wrapper = function(cmd, something) {
            //console.log(cmd, something);
            window.player.setVelocityX(cmd);
        };
        interpreter.setProperty(globalObject, "setVelocityX", interpreter.createNativeFunction(wrapper));
        // setVelocityY
        var wrapper = function(cmd, something) {
            window.player.setVelocityY(cmd * -1);
        };
        interpreter.setProperty(globalObject, "setVelocityY", interpreter.createNativeFunction(wrapper));
        // END setY
        //////////////////////////////////////////////////////////////////
        // setX
        var wrapper = function(cmd, something) {
            window.player.x = cmd;
        };
        interpreter.setProperty(globalObject, "setX", interpreter.createNativeFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        // setY
        var wrapper = function(cmd, something) {
            window.player.y = cmd;
        };
        interpreter.setProperty(globalObject, "setY", interpreter.createNativeFunction(wrapper));
        // END setX
        //////////////////////////////////////////////////////////////////
        // Band power
        var wrapper = function(band, channel) {
            try {
                return window.bands[channel][band];
            } catch (error) {
                return error;
            }
        };
        interpreter.setProperty(globalObject, "getBandPower", interpreter.createNativeFunction(wrapper));
        // create wrapper to pull facial data
        var wrapper = function(feature, component) {
            try {
                if (component == "score") return window[feature][component];
                else return window[feature]["position"][component];
            } catch (error) {
                return error;
            }
        };
        interpreter.setProperty(globalObject, "getFacialData", interpreter.createNativeFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        // Expression Score
        var wrapper = function(expression) {
            try {
                console.log("expression", expression);
                return window["expressions"][expression];
            } catch (error) {
                return error;
            }
        };
        interpreter.setProperty(globalObject, "getExpressionScore", interpreter.createNativeFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        // Get Speech
        var wrapper = function() {
            try {
                return `${window.lastSpeech}`;
            } catch (error) {
                return error;
            }
        };
        interpreter.setProperty(globalObject, "getSpeech", interpreter.createNativeFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        // Speak
        var wrapper = function(text) {
            try {
                window.synthesizeSpeech(text);
            } catch (error) {
                return error;
            }
        };
        interpreter.setProperty(globalObject, "speak", interpreter.createNativeFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        // Update Face
        var wrapper = function(emotion, gaze, color) {
            try {
                window.updateFace(emotion, gaze, color);
            } catch (error) {
                return error;
            }
        };
        interpreter.setProperty(globalObject, "updateFace", interpreter.createNativeFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        // Get Physio
        var wrapper = function() {
            try {
                //console.log(window.filteredSample);
                return window.filteredSample; // get latest physio data here
            } catch (error) {
                return error;
            }
        };
        interpreter.setProperty(globalObject, "getPhysio", interpreter.createNativeFunction(wrapper));
        //////////////////////////////////////////////////////////////////
        // Handle highlighting
        function highlightBlock(id) {
            window.workspace.highlightBlock(id);
        }
        // Add an API function for highlighting blocks.
        const wrapperHighlight = function(id) {
            id = String(id || "");
            return highlightBlock(id);
        };
        interpreter.setProperty(globalObject, "highlightBlock", interpreter.createNativeFunction(wrapperHighlight));
        // Add an API for the wait block.  See wait_block.js
        initInterpreterWaitForSeconds(interpreter, globalObject);
    };
    ///////////////////////END INTERPRETER SETUP ///////////////////////////////////////////
    window.runBlocklyCode = function() {
        console.log("latest Code: ", window.latestCode);
        //console.log("Editor mode? ", window.editorMode);
        //console.log("Text code is ", window.textEditor.getValue());
        window.workspace.highlightBlock(null);
        if (window.editorMode == "block") window.interpreter = new Interpreter(window.latestCode, window.initApi);
        else {
            // use latest text code
            var textCode = window.textEditor.getValue();
            window.interpreter = new Interpreter(textCode, window.initApi);
        //console.log("HERE");
        }
        window.runner = function() {
            if (!window.interpreter) return;
            // console.log("running", window.interpreter)
            // Run is the example provided for async apps. However highlighting does not work well
            //var hasMore = window.interpreter.run();
            var hasMore = window.interpreter.step();
            //console.log("hasMore: ", hasMore)
            if (hasMore) setTimeout(window.runner, 10);
            else // console.log("window.resetInterpreter")
            window.resetInterpreter();
        };
        try {
            window.runner();
        } catch (error) {
            return error;
        }
    };
};
_c = BlocklyInterface;
BlocklyInterface.prototype.init = function() {
    //console.log("Blockly interface started")
    window.generateCodeAndLoadIntoInterpreter();
    window.workspace.addChangeListener(function(event) {
        if (!(event instanceof Blockly.Events.Ui)) {
            // Something changed. Parser needs to be reloaded.
            window.resetInterpreter();
            window.generateCodeAndLoadIntoInterpreter();
        // Don't run code until user is ready to run code
        //window.runBlockCode();
        }
    });
};
window.runBlockCode = function() {
    if (window.interprete == null) //this.runButton = 'disabled'
    //console.log("setTimeout(window.runBlocklyCode, 1)")
    setTimeout(window.runBlocklyCode, 1);
};
var _c;
$RefreshReg$(_c, "BlocklyInterface");

},{"./utility/Toolbox.js":"g8v1n","./blocks/categories.js":"2y70Z","lodash":"3qBDj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./app.js":"8lRBv"}]},["4Nw3q"], null, "parcelRequired44e")

//# sourceMappingURL=index.4d8e03af.js.map
