import Interpreter from "js-interpreter";
import { BlocklyInterface } from "./blocklyinterface";

var Main = function () {
  this.blocklyInterface = new BlocklyInterface();
  //console.log(this.blocklyInterface);
  //this.runButton = document.getElementById("runButton");

  this.createEventListener = function (id, callback) {
    document.getElementById(id).onclick = callback;
  };

  this.handleEvents = function () {
    this.createEventListener("runButton", window.runBlockCode);
    this.createEventListener("stopButton", this.stopProgram);
  };
};


Main.prototype.stopProgram = function(){
    // stops game. add later
    //window.resetPhaser();
    window.resetInterpreter();
}


Main.prototype.start = function () {
    this.blocklyInterface.init();
    this.handleEvents();
};

// Wait until document is finished loading before starting App
$(document).ready(function () {
  //console.log("LOADED MAIN");
  var main = new Main();
  main.start();
});

/*
var myInterpreter = new Interpreter('6 * 7');
myInterpreter.run();
alert(myInterpreter.value);
*/
