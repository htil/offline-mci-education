/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function initInterpreterWaitForSeconds(e,t){Blockly.JavaScript.addReservedWords("waitForSeconds");var n=e.createAsyncFunction((function(e,t){setTimeout(t,1e3*e)}));e.setProperty(t,"waitForSeconds",n)}Blockly.defineBlocksWithJsonArray([{type:"wait_seconds",message0:" wait %1 seconds",args0:[{type:"field_number",name:"SECONDS",min:0,max:600,value:1}],previousStatement:null,nextStatement:null,colour:"%{BKY_LOOPS_HUE}"}]),Blockly.JavaScript.wait_seconds=function(e){return"waitForSeconds("+Number(e.getFieldValue("SECONDS"))+");\n"};
//# sourceMappingURL=index.41bf6ca6.js.map
