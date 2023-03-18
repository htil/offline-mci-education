import Interpreter from 'js-interpreter';

var Main = function () {
    this.blocklyInterface = new BlocklyInterface();
    console.log(this.blocklyInterface)

}

// Wait until document is finished loading before starting App
$(document).ready(function () {
    
    console.log("LOADED MAIN");
    var main = new Main();
    //main.start();
    

})


/*
var myInterpreter = new Interpreter('6 * 7');
myInterpreter.run();
alert(myInterpreter.value);
*/