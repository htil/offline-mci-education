// Block creation tool https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
var createCustomBlocks = function() {
    /* Get Filter */ var filterData = {
        "type": "filter_signal",
        "message0": "filter between %1 and  %2 %3",
        "args0": [
            {
                "type": "field_input",
                "name": "low",
                "text": "0"
            },
            {
                "type": "field_input",
                "name": "high",
                "text": "30"
            },
            {
                "type": "input_value",
                "name": "signal"
            }
        ],
        "output": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    };
    Blockly.Blocks["filter_signal"] = {
        init: function() {
            this.jsonInit(filterData);
        }
    };
    Blockly.JavaScript["filter_signal"] = function(block) {
        var text_low = block.getFieldValue("low");
        var text_high = block.getFieldValue("high");
        var value_signal = Blockly.JavaScript.valueToCode(block, "signal", Blockly.JavaScript.ORDER_ATOMIC);
        //console.log(text_low, text_high, value_signal)
        // TODO: Assemble JavaScript into code variable.
        var code1 = `filterSignal(${value_signal}, ${text_low}, ${text_high})`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [
            code1,
            Blockly.JavaScript.ORDER_NONE
        ];
    };
    //////////////////////////////////////////////////////////////////
    /* Get Absolute Values */ var getAbsoluteData = {
        type: "getabsdata",
        message0: "Get Absolute Values %1",
        args0: [
            {
                type: "input_value",
                name: "LIST"
            }
        ],
        output: null,
        colour: 330,
        tooltip: "",
        helpUrl: ""
    };
    Blockly.Blocks["getabsdata"] = {
        init: function() {
            this.jsonInit(getAbsoluteData);
        }
    };
    Blockly.JavaScript["getabsdata"] = function(block) {
        var list = Blockly.JavaScript.valueToCode(block, "LIST", Blockly.JavaScript.ORDER_NONE);
        var code1 = `getAbsVals(${list})`;
        return [
            code1,
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ];
    };
    //////////////////////////////////////////////////////////////////
    /* Remove Mean */ var removeSignalMean = {
        type: "removeSignalMean",
        message0: "Remove Mean %1",
        args0: [
            {
                type: "input_value",
                name: "LIST"
            }
        ],
        output: null,
        colour: 330,
        tooltip: "",
        helpUrl: ""
    };
    Blockly.Blocks["removeSignalMean"] = {
        init: function() {
            this.jsonInit(removeSignalMean);
        }
    };
    Blockly.JavaScript["removeSignalMean"] = function(block) {
        var list = Blockly.JavaScript.valueToCode(block, "LIST", Blockly.JavaScript.ORDER_NONE);
        var code1 = `removeMean(${list})`;
        return [
            code1,
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ];
    };
    //////////////////////////////////////////////////////////////////
    /* Get Raw Data*/ var getRawData = {
        type: "getRaw",
        message0: "Get Signal ",
        output: null,
        colour: 330,
        tooltip: "",
        helpUrl: ""
    };
    Blockly.Blocks["getRaw"] = {
        init: function() {
            this.jsonInit(getRawData);
        }
    };
    Blockly.JavaScript["getRaw"] = function(block) {
        var code1 = `getRawData()`;
        return [
            code1,
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ];
    };
    //////////////////////////////////////////////////////////////////
    /* plot raw */ var plotRaw = {
        type: "plot_raw",
        message0: "Plot Signal %1 # of Samples %2",
        inputsInline: false,
        args0: [
            {
                type: "input_value",
                name: "LIST"
            },
            {
                type: "input_value",
                name: "SECONDS",
                check: "Number"
            }
        ],
        colour: 330,
        previousStatement: null,
        nextStatement: null
    };
    Blockly.Blocks["plot_raw"] = {
        init: function() {
            this.jsonInit(plotRaw);
        }
    };
    Blockly.JavaScript["plot_raw"] = function(block) {
        //var seconds = block.getFieldValue("SECONDS");
        var list = Blockly.JavaScript.valueToCode(block, "LIST", Blockly.JavaScript.ORDER_NONE);
        var seconds = Blockly.JavaScript.valueToCode(block, "SECONDS", Blockly.JavaScript.ORDER_NONE);
        seconds = seconds ? seconds : 0;
        return `plotRaw(${list}, ${seconds})\n`;
    };
    //////////////////////////////////////////////////////////////////
    /* pan() */ var panBy = {
        message0: "pan to %1",
        args0: [
            {
                type: "input_value",
                name: "ANGLE",
                check: "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 355
    };
    Blockly.Blocks["pan_by"] = {
        init: function() {
            this.jsonInit(panBy);
        }
    };
    Blockly.JavaScript["pan_by"] = function(block) {
        var angle = Blockly.JavaScript.valueToCode(block, "ANGLE", Blockly.JavaScript.ORDER_NONE);
        angle = angle > 1.5 ? 1.5 : angle;
        angle = angle < -1.5 ? -1.5 : angle;
        code = `pan(${angle})`;
        return code;
    };
    //////////////////////////////////////////////////////////////////
    /* Print */ var print = {
        message0: "print %1",
        args0: [
            {
                type: "input_value",
                name: "MSG",
                check: "Number"
            }
        ],
        previousStatement: "String",
        nextStatement: null,
        colour: "%{BKY_LOGIC_HUE}"
    };
    Blockly.Blocks["print"] = {
        init: function() {
            this.jsonInit(print);
        }
    };
    Blockly.JavaScript["print"] = function(block) {
        var msg = Blockly.JavaScript.valueToCode(block, "MSG", Blockly.JavaScript.ORDER_NONE);
        return `print(${msg});\n`;
    };
    //////////////////////////////////////////////////////////////////
    /******** setVelocityX *****/ var setVelocityX = {
        message0: "setVelocityX %1",
        args0: [
            {
                type: "input_value",
                name: "velocityX",
                check: "Number"
            }
        ],
        previousStatement: "Number",
        nextStatement: null,
        colour: "355"
    };
    Blockly.Blocks["setVelocityX"] = {
        init: function() {
            this.jsonInit(setVelocityX);
        }
    };
    Blockly.JavaScript["setVelocityX"] = function(block) {
        var val = Blockly.JavaScript.valueToCode(block, "velocityX", Blockly.JavaScript.ORDER_NONE);
        if (val) return `setVelocityX(${val});\n`;
        else return ``;
    };
    /******** setVelocityX *****/ //////////////////////////////////////////////////////////////////
    /******** setVelocityY *****/ var setVelocityY = {
        message0: "setVelocityY %1",
        args0: [
            {
                type: "input_value",
                name: "velocityY",
                check: "Number"
            }
        ],
        previousStatement: "Number",
        nextStatement: null,
        colour: "355"
    };
    Blockly.Blocks["setVelocityY"] = {
        init: function() {
            this.jsonInit(setVelocityY);
        }
    };
    Blockly.JavaScript["setVelocityY"] = function(block) {
        var val = Blockly.JavaScript.valueToCode(block, "velocityY", Blockly.JavaScript.ORDER_NONE);
        if (val) return `setVelocityY(${val});\n`;
        else return ``;
    };
    /******** setVelocityY *****/ //////////////////////////////////////////////////////////////////
    /******** setX *****/ var setPlayerX = {
        message0: "setPlayerX %1",
        args0: [
            {
                type: "input_value",
                name: "playerX",
                check: "Number"
            }
        ],
        previousStatement: "Number",
        nextStatement: null,
        colour: "355"
    };
    Blockly.Blocks["setPlayerX"] = {
        init: function() {
            this.jsonInit(setPlayerX);
        }
    };
    Blockly.JavaScript["setPlayerX"] = function(block) {
        var val = Blockly.JavaScript.valueToCode(block, "playerX", Blockly.JavaScript.ORDER_NONE);
        //console.log(val);
        if (val) return `setX(${val});\n`;
        else return "";
    };
    /******** setX *****/ /******** setY *****/ var setPlayerY = {
        message0: "setPlayerY %1",
        args0: [
            {
                type: "input_value",
                name: "playerY",
                check: "Number"
            }
        ],
        previousStatement: "Number",
        nextStatement: null,
        colour: "355"
    };
    Blockly.Blocks["setPlayerY"] = {
        init: function() {
            this.jsonInit(setPlayerY);
        }
    };
    Blockly.JavaScript["setPlayerY"] = function(block) {
        var val = Blockly.JavaScript.valueToCode(block, "playerY", Blockly.JavaScript.ORDER_NONE);
        if (val) return `setY(${val});\n`;
        else return "";
    };
    /******** setY *****/ /******  getBandPower ********/ var getBandPower = {
        type: "getalpha",
        lastDummyAlign0: "RIGHT",
        message0: "getBandPower %1 %2 %3",
        args0: [
            {
                type: "field_dropdown",
                name: "channels",
                options: [
                    [
                        "af7",
                        "af7"
                    ],
                    [
                        "af8",
                        "af8"
                    ],
                    [
                        "tp9",
                        "tp9"
                    ],
                    [
                        "tp10",
                        "tp10"
                    ]
                ]
            },
            {
                type: "input_dummy"
            },
            {
                type: "field_dropdown",
                name: "bands",
                options: [
                    [
                        "theta",
                        "theta"
                    ],
                    [
                        "alpha",
                        "alpha"
                    ],
                    [
                        "beta",
                        "beta"
                    ],
                    [
                        "gamma",
                        "gamma"
                    ]
                ]
            }
        ],
        inputsInline: true,
        output: null,
        colour: 75,
        tooltip: "",
        helpUrl: ""
    };
    Blockly.Blocks["getBandPower"] = {
        init: function() {
            this.jsonInit(getBandPower);
        }
    };
    Blockly.JavaScript["getBandPower"] = function(block) {
        var channel = block.getFieldValue("channels");
        var band = block.getFieldValue("bands");
        var code1 = `getBandPower('${band}', '${channel}')`;
        return [
            code1,
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ];
    };
    var getFacialData = {
        type: "getface",
        message0: "getFacialData %1 %2 %3",
        args0: [
            {
                type: "field_dropdown",
                name: "feature",
                options: [
                    [
                        "nose",
                        "nose"
                    ],
                    [
                        "leftEye",
                        "leftEye"
                    ],
                    [
                        "rightEye",
                        "rightEye"
                    ]
                ]
            },
            {
                type: "input_dummy"
            },
            {
                type: "field_dropdown",
                name: "component",
                options: [
                    [
                        "x",
                        "x"
                    ],
                    [
                        "y",
                        "y"
                    ],
                    [
                        "score",
                        "score"
                    ]
                ]
            }
        ],
        inputsInline: true,
        output: null,
        colour: 75,
        tooltip: "",
        helpUrl: ""
    };
    Blockly.Blocks["getFacialData"] = {
        init: function() {
            this.jsonInit(getFacialData);
        }
    };
    Blockly.JavaScript["getFacialData"] = function(block) {
        var feature = block.getFieldValue("feature");
        var component = block.getFieldValue("component");
        console.log("feature, component", feature, component);
        var code1 = `getFacialData('${feature}', '${component}')`;
        return [
            code1,
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ];
    };
    var getExpressionScore = {
        type: "getexpressionscore",
        message0: "getExpressionScore %1",
        args0: [
            {
                type: "field_dropdown",
                name: "expressions",
                options: [
                    [
                        "neutral",
                        "neutral"
                    ],
                    [
                        "happy",
                        "happy"
                    ],
                    [
                        "sad",
                        "sad"
                    ],
                    [
                        "angry",
                        "angry"
                    ],
                    [
                        "fearful",
                        "fearful"
                    ],
                    [
                        "disgusted",
                        "disgusted"
                    ],
                    [
                        "surprised",
                        "surprised"
                    ]
                ]
            }
        ],
        inputsInline: true,
        output: null,
        colour: 75,
        tooltip: "",
        helpUrl: ""
    };
    Blockly.Blocks["getExpressionScore"] = {
        init: function() {
            this.jsonInit(getExpressionScore);
        }
    };
    Blockly.JavaScript["getExpressionScore"] = function(block) {
        var expression = block.getFieldValue("expressions");
        //window.expressions[expression]
        //console.log("expression", expression)
        var code1 = `getExpressionScore('${expression}')`;
        return [
            code1,
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ];
    };
    var getSpeech = {
        type: "getspeech",
        message0: "getSpeech",
        output: null,
        colour: 75,
        tooltip: "",
        helpUrl: ""
    };
    Blockly.Blocks["getSpeech"] = {
        init: function() {
            this.jsonInit(getSpeech);
        }
    };
    Blockly.JavaScript["getSpeech"] = function(block) {
        var code1 = "getSpeech()";
        return [
            code1,
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ];
    };
    // Get Physio
    var getMuscleEnergy = {
        type: "getMuscleEnergy",
        message0: "getMuscleEnergy",
        output: null,
        colour: "250",
        tooltip: "",
        helpUrl: ""
    };
    Blockly.Blocks["getMuscleEnergy"] = {
        init: function() {
            this.jsonInit(getMuscleEnergy);
        }
    };
    Blockly.JavaScript["getMuscleEnergy"] = function(block) {
        var code1 = "getPhysio()";
        return [
            code1,
            Blockly.JavaScript.ORDER_FUNCTION_CALL
        ];
    };
    /* pan() */ var speak = {
        message0: "speak %1",
        args0: [
            {
                type: "input_value",
                name: "text",
                check: "String"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 355
    };
    Blockly.Blocks["speak"] = {
        init: function() {
            this.jsonInit(speak);
        }
    };
    Blockly.JavaScript["speak"] = function(block) {
        var text = Blockly.JavaScript.valueToCode(block, "text", Blockly.JavaScript.ORDER_ATOMIC);
        code = `speak(${text})`;
        return code;
    };
    var updateBaxterFace = {
        type: "updatebaxterface",
        message0: "%1 %2 %3 %4 %5",
        args0: [
            {
                type: "field_dropdown",
                name: "emotion",
                options: [
                    [
                        "afraid",
                        "Afraid"
                    ],
                    [
                        "confused",
                        "Confused"
                    ],
                    [
                        "happy",
                        "Happy"
                    ],
                    [
                        "joy",
                        "Joy"
                    ],
                    [
                        "neutral",
                        "Neutral"
                    ],
                    [
                        "reactive",
                        "Reactive"
                    ],
                    [
                        "sad",
                        "Sad"
                    ],
                    [
                        "sassy",
                        "Sassy"
                    ],
                    [
                        "silly",
                        "Silly"
                    ],
                    [
                        "sleep",
                        "Sleep"
                    ],
                    [
                        "surprise",
                        "Surprise"
                    ],
                    [
                        "worried",
                        "Worried"
                    ]
                ]
            },
            {
                type: "input_dummy"
            },
            {
                type: "field_dropdown",
                name: "color",
                options: [
                    [
                        "blue",
                        "Blue"
                    ],
                    [
                        "orange",
                        "Orange"
                    ],
                    [
                        "purple",
                        "Purple"
                    ],
                    [
                        "white",
                        "White"
                    ],
                    [
                        "green",
                        "Green"
                    ],
                    [
                        "yellow",
                        "Yellow"
                    ],
                    [
                        "red",
                        "Red"
                    ],
                    [
                        "gray",
                        "Gray"
                    ]
                ]
            },
            {
                type: "input_dummy"
            },
            {
                type: "field_dropdown",
                name: "gazeDirection",
                options: [
                    [
                        "topLeft",
                        "NW"
                    ],
                    [
                        "topRight",
                        "NE"
                    ],
                    [
                        "bottomLeft",
                        "SW"
                    ],
                    [
                        "bottomRight",
                        "SE"
                    ],
                    [
                        "blink",
                        "Blink"
                    ]
                ]
            }
        ],
        inputsInline: true,
        previousStatement: null,
        colour: 355,
        tooltip: "",
        helpUrl: ""
    };
    Blockly.Blocks["updateBaxterFace"] = {
        init: function() {
            this.jsonInit(updateBaxterFace);
        }
    };
    Blockly.JavaScript["updateBaxterFace"] = function(block) {
        var emotion = block.getFieldValue("emotion");
        var color = block.getFieldValue("color");
        var gaze = block.getFieldValue("gazeDirection");
        //window.updateFace(emotion, gaze, color)
        code = `updateFace('${emotion}', '${gaze}', '${color}' )`;
        return code;
    };
};

//# sourceMappingURL=index.0390ff90.js.map
