import { createRoot } from "react-dom/client";
import json_data from "../data/data";
import json_data2 from "../data/data2";
import LineGraph from "../components/LineGraph";
import LinearLineGraph from "../components/LinearLineGraph";
import { tsv } from "d3";
import _data from "../data/emg1.csv";
import _ from "lodash";
import { startSpinner } from "../components/Spinner";
import fili from "../js/fili.esm.js";

let root = null;

let sampleFreq = 512;
let secondsMax = 120;
let X_MAX = sampleFreq * secondsMax;
let selectedDataY = [];
let selectedDataX = [];
let df_y;
let df_x;
let nivoData = [];

let testData = [
  { x: 0, y: 7 },
  { x: 1, y: 5 },
  { x: 2, y: 11 },
  { x: 3, y: 9 },
  { x: 4, y: 13 },
  { x: 7, y: 50 },
  { x: 9, y: 12 },
];

///////////// File Upload and Download Functions /////////////
// Move from  https://github.com/htil/neuroflow/blob/33c8500abc018a9c5adcfd40b1a4d7e2a212eb90/src/main.ts#L526
let eById = (id) => {
  let res = document.getElementById(id);
  if (res == null) throw new Error("Could not find element with ID: " + id);

  return res;
};

let load_input = eById("file_handler");

load_input.onchange = (e) => {

  let file = e.target.files[0];

  if (!file) {
    return;
  }

  let reader = new FileReader();

  reader.onload = (e) => {
    let contents = e.target.result.toString();
    let as_xml = Blockly.Xml.textToDom(contents);
    Blockly.Xml.domToWorkspace(as_xml, window.workspace);
    //console.log(contents);
  };

  reader.readAsText(file);
};

let loadProject = function () {
  console.log("load project");
  window.workspace.clear();
  window.workspace.clearUndo();

  let reader = new FileReader();

  reader.onload = (e) => {
    console.log(e);
  };
};

let download = function () {
  let filename = prompt();
  filename += `${filename}.xml`;

  let as_dom = Blockly.Xml.workspaceToDom(window.workspace);
  let as_text = Blockly.Xml.domToText(as_dom);

  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(as_text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

eById("saveFile").onclick = download;
eById("uploadFile").onclick = () => load_input.click();

///////////// File Upload and Download Functions /////////////

export const blocklyHooks = {
  plotRaw: (y, userDefined = false, sampleMax = 0) => {
    plotRawData(y, userDefined, sampleMax);
  },

  raw: () => {
    return df_y.values;
  },

  removeMeanHook: async (list) => {
    let df = new dfd.Series(list);
    let mean_removed = await removeMean(df);
    //mean_removed.print()
    return mean_removed.values;
  },

  getAbsValueHook: async (list) => {
    let df = new dfd.Series(list);
    let abs_data = await getAbsValue(df);
    console.log(abs_data);
    return abs_data.values;
  },

  filterSignalHook: async (list, low, high) => {
    //console.log(list, low, high)
    let filteredData = await filterSignal(list, low, high);
    return filteredData;
  },
};

let updateGraphComponent = async function (yVals, xMax, userDefined = false) {
  nivoData = [];
  startSpinner();
  await _.forEach(yVals, (value, index) => {
    if (index < xMax) {
      // if user defined use index else calculate based on sample freq
      let x = userDefined ? index : selectedDataX[index];
      let y = value;
      nivoData.push({ x, y });
    } else {
      //console.log("done")
      return false;
    }
  });
  updateData(nivoData);
};
let plotRawData = async function (y, userDefined = false, sampleMax = 0) {
  let plotMax = sampleMax > 0 ? sampleMax : X_MAX;
  await updateGraphComponent(y, plotMax, userDefined);
};

let removeMean = async function (df, updateGraph = false) {
  console.log("removeMean");
  let df_remove_mean = df.sub(df.mean());
  //df_remove_mean.print()
  if (updateGraph) {
    await updateGraphComponent(df_remove_mean.values, X_MAX);
  }
  return df_remove_mean;
};

let filterSignal = async function (y, low, cutoff, updateGraph = false) {
  const iirCalculator = new fili.CalcCascades();

  /*
    const firCalculator = new fili.FirCoeffs();
    var firFilterCoeffs = firCalculator.lowpass({
        order: 10, // filter order
        Fs: sampleFreq, // sampling frequency
        Fc: 3, // cutoff frequency
        characteristic: 'butterworth'
        //F1: parseInt(low),
        //F2: parseInt(cutoff)
        // forbandpass and bandstop F1 and F2 must be provided instead of Fc
    });
    
    const filter = new fili.FirFilter(firFilterCoeffs);

    */

  var iirFilterCoeffs = iirCalculator.lowpass({
    order: 3, // cascade 3 biquad filters (max: 12)
    characteristic: "butterworth",
    Fs: sampleFreq, // sampling frequency
    Fc: cutoff, // cutoff frequency / center frequency for bandpass, bandstop, peak
    //BW: 1, // bandwidth only for bandstop and bandpass filters - optional
    //gain: 0, // gain for peak, lowshelf and highshelf
    //preGain: false // adds one constant multiplication for highpass and lowpass
    // k = (1 + cos(omega)) * 0.5 / k = 1 with preGain == false
  });

  const filter = new fili.IirFilter(iirFilterCoeffs);

  signalFiltered = filter.simulate(y);
  console.log(signalFiltered);
  if (updateGraph) {
    await updateGraphComponent(signalFiltered, X_MAX);
  }

  return signalFiltered;
};

let getAbsValue = async function (df, updateGraph = false) {
  //let meanRemoved = await removeMean(df)
  let df_abs = df.abs();
  if (updateGraph) {
    await updateGraphComponent(df_abs.values, X_MAX);
  }
  return df_abs;
};

let formatRawCSVData = async function (csvArray) {
  await _.forEach(csvArray, ({ mV, mV2 }, index) => {
    selectedDataY.push(parseFloat(mV));
    selectedDataX.push(index / sampleFreq);
  });

  df_y = new dfd.Series(selectedDataY);
  df_x = new dfd.Series(selectedDataX);
  //df_y.print()
  //df_x.print()

  //let df_remove_mean = removeMean(df_y, true)
  //df_abs.iloc(["10:"]).print()
};

let loadData = async function (csvFile) {
  const rawCSV = await tsv(_data).then((data) => {
    return data;
  });
  formatRawCSVData(rawCSV);
  //console.log(rawCSV)
};

let createEventListener = function (id, callback) {
  document.getElementById(id).onclick = callback;
};

let handleEvents = function () {
  createEventListener("d1", () => {
    plotRawData(df_y, true);
  });
  createEventListener("d2", () => {
    removeMean(df_y, true);
  });
  createEventListener("d3", () => {
    //getAbsValue(df_y, true);
    download();
  });
  createEventListener("d4", async () => {
    //let _y = await getAbsValue(df_y);
    //console.log(_y.values)
    //filterSignal(_y.values, 3, true);
    loadProject();
  });
};

// Fix for getBBox error https://github.com/plouc/nivo/issues/2162#issuecomment-1467184517
HTMLCanvasElement.prototype.getBBox = function () {
  return { width: this.offsetWidth, height: this.offsetHeight };
};

let initData = function () {
  let data = [json_data];
  root = createRoot(document.getElementById("visualizer"));
  root.render(<LinearLineGraph data={testData} />);
  loadData();
};

let updateData = function (dataset) {
  //let data = [ dataset ]
  root.render(<LinearLineGraph data={dataset} />);
  //console.log("loading")
};

initData();
handleEvents();
//loadData("./data/emg1.csv")
