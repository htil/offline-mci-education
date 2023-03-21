import { Toolbox, unwind } from "./utility/Toolbox.js";
import { Categories } from "./blocks/categories.js";
import _ from "lodash";
import { blocklyHooks } from "./app.js";
//console.log(blocklyHooks)

/** Class used to manage Blockly interface
 * @class
 */

export const BlocklyInterface = function () {
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
  let {
    cat_logic,
    cat_loops,
    cat_math,
    cat_sep,
    cat_data,
    cat_vars,
    cat_list,
  } = Categories;
  let _toolbox = new Toolbox([
    cat_logic,
    cat_loops,
    cat_math,
    cat_sep,
    cat_data,
    cat_vars,
    cat_list,
  ]);

  window.workspace = Blockly.inject("blocklyDiv", {
    media: "https://unpkg.com/browse/blockly/media/",
    toolbox: _toolbox.toString(),
    //toolbox: document.getElementById("toolbox"),
  });

  // Create custom tool box to load when category selected
  let createCustomToolBox = (blocks) => {
    let res = [];
    blocks.forEach((element) => {
      let block = unwind([element], true);
      block = Blockly.Xml.textToDom(block).firstChild;
      res.push(block);
    });
    //console.log(res);
    return res;
  };

  // Triggers everytime category opens
  window.workspace.registerToolboxCategoryCallback("DATA", (ws) => {
    return createCustomToolBox([
      "plot_raw",
      "getRaw",
      "removeSignalMean",
      "getabsdata",
      "filter_signal",
    ]);
  });

  /*
  Blockly.Xml.domToWorkspace(
    document.getElementById("startBlocks"),
    window.workspace
  );
  */

  // Exit is used to signal the end of a script.
  Blockly.JavaScript.addReservedWords("exit");

  // Clear interpreter
  window.resetInterpreter = function () {
    //console.log("resetInterpreter")
    window.interpreter = null;
    window.workspace.highlightBlock(null);
    if (window.runner) {
      clearTimeout(window.runner);
      window.runner = null;
    }
  };

  window.generateCodeAndLoadIntoInterpreter = function () {
    Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
    Blockly.JavaScript.addReservedWords("highlightBlock");
    window.latestCode = Blockly.JavaScript.workspaceToCode(window.workspace);
    let xml = Blockly.Xml.workspaceToDom(window.workspace);
    // sync code. comment to stop synching
    // Add this later to offline app
    //window.textEditor.setValue(window.latestCode);
    //this.runButton = ''
  };

  let formatList = (list) => {
    return list.properties ? _.values(list.properties) : list;
  };

  // We need this to handle how to plot x-axis different based on wheter we are handlings user defined data or physio data
  // This is just a quick fix for now. When updated to support different types of data we will need to revisit this
  // Currently the plot functions checks to see if the list has a properties node. If so it assumes its user defined. Otherwise the x-axis is simply mapped to the value's index
  let formatListCallback = (list, processedData, cb) => {
    if (list.properties) {
      list.properties = processedData;
      cb(list); // returns here
    } else {
      cb(processedData);
    }
  };

  /////////////////////// BEGIN INTERPRETER SETUP ///////////////////////////////////////////

  // Add native to blockly here
  // This is too big now needs to be moved into its on module (TODO)
  window.initApi = function (interpreter, globalObject) {
    /* Get Filter */
    var wrapper = async function (list, low, high, callback) {
      try {
        //console.log(list, low, high)
        let arr = formatList(list);
        let filteredData = await blocklyHooks.filterSignalHook(arr, low, high);
        formatListCallback(list, filteredData, callback);
        
        /*if (list.properties) {
          list.properties = filteredData;
          return list;
          //cb(list); // returns here
        } else {
          //cb(processedData);
          return filteredData;
        }
        */
      } catch (error) {
        return error;
      }
    };

    interpreter.setProperty(
      globalObject,
      "filterSignal",
      interpreter.createAsyncFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    /* Get Abs Values */

    var wrapper = async function (list, callback) {
      try {
        let arr = formatList(list);
        let absData = await blocklyHooks.getAbsValueHook(arr);
        formatListCallback(list, absData, callback);
      } catch (error) {
        return error;
      }
    };

    interpreter.setProperty(
      globalObject,
      "getAbsVals",
      interpreter.createAsyncFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    /* Remove Mean */
    // Example of using async functions with JS interpreter
    // See https://neil.fraser.name/software/JS-Interpreter/demos/async.html for example
    var wrapper = async function (list, callback) {
      try {
        let arr = formatList(list);
        let meanRemovedData = await blocklyHooks.removeMeanHook(arr);
        formatListCallback(list, meanRemovedData, callback);
        //callback(meanRemovedData)    // returns here
      } catch (error) {
        return error;
      }
    };

    interpreter.setProperty(
      globalObject,
      "removeMean",
      interpreter.createAsyncFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    // Get Raw
    // Not really sure if this matters.
    //the code doesn't actually call getRaw in customBlock currently.
    //Keep and eye on this in the future.
    var wrapper = function () {
      try {
        return blocklyHooks.raw();
      } catch (error) {
        return error;
      }
    };

    interpreter.setProperty(
      globalObject,
      "getRawData",
      interpreter.createNativeFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    // Plot Raw
    var wrapper = function (list, sampleCount) {
      if (list.properties) {
        var arr = _.values(list.properties);
        blocklyHooks.plotRaw(arr, true, sampleCount);
      } else {
        //console.log(list, sampleCount)
        blocklyHooks.plotRaw(list, false, sampleCount);
      }
    };

    interpreter.setProperty(
      globalObject,
      "plotRaw",
      interpreter.createNativeFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    // Pan robot
    var wrapper = function (cmd) {
      window.pan(cmd);
      console.log("PAN ", cmd);
    };

    interpreter.setProperty(
      globalObject,
      "testVar",
      interpreter.createNativeFunction(wrapper)
    );

    // Print to console
    var wrapper = function (cmd, something) {
      //console.log(cmd, something);
      if (cmd !== undefined) {
        printVal.innerHTML = cmd;
      } else {
        printVal.innerHTML = "";
      }
    };

    interpreter.setProperty(
      globalObject,
      "print",
      interpreter.createNativeFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    // setVelocityX
    var wrapper = function (cmd, something) {
      //console.log(cmd, something);
      window.player.setVelocityX(cmd);
    };
    interpreter.setProperty(
      globalObject,
      "setVelocityX",
      interpreter.createNativeFunction(wrapper)
    );

    // setVelocityY
    var wrapper = function (cmd, something) {
      window.player.setVelocityY(cmd * -1);
    };
    interpreter.setProperty(
      globalObject,
      "setVelocityY",
      interpreter.createNativeFunction(wrapper)
    );

    // END setY

    //////////////////////////////////////////////////////////////////

    // setX
    var wrapper = function (cmd, something) {
      window.player.x = cmd;
    };
    interpreter.setProperty(
      globalObject,
      "setX",
      interpreter.createNativeFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    // setY
    var wrapper = function (cmd, something) {
      window.player.y = cmd;
    };
    interpreter.setProperty(
      globalObject,
      "setY",
      interpreter.createNativeFunction(wrapper)
    );

    // END setX

    //////////////////////////////////////////////////////////////////

    // Band power
    var wrapper = function (band, channel) {
      try {
        return window.bands[channel][band];
      } catch (error) {
        return error;
      }
    };
    interpreter.setProperty(
      globalObject,
      "getBandPower",
      interpreter.createNativeFunction(wrapper)
    );

    // create wrapper to pull facial data
    var wrapper = function (feature, component) {
      try {
        if (component == "score") {
          return window[feature][component];
        } else {
          return window[feature]["position"][component];
        }
      } catch (error) {
        return error;
      }
    };
    interpreter.setProperty(
      globalObject,
      "getFacialData",
      interpreter.createNativeFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    // Expression Score
    var wrapper = function (expression) {
      try {
        console.log("expression", expression);
        return window["expressions"][expression];
      } catch (error) {
        return error;
      }
    };
    interpreter.setProperty(
      globalObject,
      "getExpressionScore",
      interpreter.createNativeFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    // Get Speech
    var wrapper = function () {
      try {
        return `${window.lastSpeech}`;
      } catch (error) {
        return error;
      }
    };
    interpreter.setProperty(
      globalObject,
      "getSpeech",
      interpreter.createNativeFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    // Speak
    var wrapper = function (text) {
      try {
        window.synthesizeSpeech(text);
      } catch (error) {
        return error;
      }
    };
    interpreter.setProperty(
      globalObject,
      "speak",
      interpreter.createNativeFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    // Update Face
    var wrapper = function (emotion, gaze, color) {
      try {
        window.updateFace(emotion, gaze, color);
      } catch (error) {
        return error;
      }
    };
    interpreter.setProperty(
      globalObject,
      "updateFace",
      interpreter.createNativeFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    // Get Physio
    var wrapper = function () {
      try {
        //console.log(window.filteredSample);
        return window.filteredSample; // get latest physio data here
      } catch (error) {
        return error;
      }
    };

    interpreter.setProperty(
      globalObject,
      "getPhysio",
      interpreter.createNativeFunction(wrapper)
    );

    //////////////////////////////////////////////////////////////////

    // Handle highlighting
    function highlightBlock(id) {
      window.workspace.highlightBlock(id);
    }

    // Add an API function for highlighting blocks.
    const wrapperHighlight = function (id) {
      id = String(id || "");
      return highlightBlock(id);
    };
    interpreter.setProperty(
      globalObject,
      "highlightBlock",
      interpreter.createNativeFunction(wrapperHighlight)
    );

    // Add an API for the wait block.  See wait_block.js
    initInterpreterWaitForSeconds(interpreter, globalObject);
  };

  ///////////////////////END INTERPRETER SETUP ///////////////////////////////////////////

  window.runBlocklyCode = function () {
    console.log("latest Code: ", window.latestCode);
    //console.log("Editor mode? ", window.editorMode);
    //console.log("Text code is ", window.textEditor.getValue());
    window.workspace.highlightBlock(null);
    if (window.editorMode == "block") {
      window.interpreter = new Interpreter(window.latestCode, window.initApi);
    } else {
      // use latest text code
      var textCode = window.textEditor.getValue();
      window.interpreter = new Interpreter(textCode, window.initApi);
      //console.log("HERE");
    }

    window.runner = function () {
      if (!window.interpreter) return;

      // console.log("running", window.interpreter)

      // Run is the example provided for async apps. However highlighting does not work well
      //var hasMore = window.interpreter.run();

      var hasMore = window.interpreter.step();

      //console.log("hasMore: ", hasMore)
      if (hasMore) {
        setTimeout(window.runner, 10);
      } else {
        // console.log("window.resetInterpreter")
        window.resetInterpreter();
      }
    };
    try {
      window.runner();
    } catch (error) {
      return error;
    }
  };
};

BlocklyInterface.prototype.init = function () {
  //console.log("Blockly interface started")
  window.generateCodeAndLoadIntoInterpreter();
  window.workspace.addChangeListener(function (event) {
    if (!(event instanceof Blockly.Events.Ui)) {
      // Something changed. Parser needs to be reloaded.
      window.resetInterpreter();
      window.generateCodeAndLoadIntoInterpreter();

      // Don't run code until user is ready to run code
      //window.runBlockCode();
    }
  });
};

window.runBlockCode = function () {
  if (window.interprete == null) {
    //this.runButton = 'disabled'
    //console.log("setTimeout(window.runBlocklyCode, 1)")
    setTimeout(window.runBlocklyCode, 1);
  }
};
