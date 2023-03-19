import { createRoot } from 'react-dom/client'
import json_data from '../data/data'
import json_data2 from '../data/data2'
import LineGraph from '../components/LineGraph';
import LinearLineGraph from '../components/LinearLineGraph';
import { tsv } from 'd3';
import _data from "../data/emg1.csv";
import _ from 'lodash';
import { startSpinner } from '../components/Spinner';
import fili from "../js/fili.esm.js";


let root = null;

let sampleFreq = 512;
let secondsMax = 120
let X_MAX = sampleFreq * secondsMax
let selectedDataY = []
let selectedDataX = []
let df_y 
let df_x
let nivoData = []

testData =  [
    { x: 0, y: 7 },
    { x: 1, y: 5 },
    { x: 2, y: 11 },
    { x: 3, y: 9 },
    { x: 4, y: 13 },
    { x: 7, y: 50 },
    { x: 9, y: 12 },
]

let updateGraphComponent = async function(yVals, xMax, userDefined = false) {
    nivoData = []
    startSpinner()
    await _.forEach(yVals, (value, index) => {
        if (index < xMax){
            // if user defined use index else calculate based on sample freq
            x = userDefined ? index : selectedDataX[index]
            y = value
            nivoData.push({x, y})
        } else 
        {
            //console.log("done")
            return false
        }
    })
    updateData(nivoData)
}
let plotRawData = async function (y, userDefined = false, sampleMax = 0) {
    let plotMax = sampleMax > 0 ? sampleMax : X_MAX;
    await updateGraphComponent(y, plotMax, userDefined)
}

let removeMean = async function(df, updateGraph = false) {
    console.log("removeMean")
    let df_remove_mean =  df.sub(df.mean())
    //df_remove_mean.print()
    if (updateGraph) {
        await updateGraphComponent(df_remove_mean.values, X_MAX)
    }
    return df_remove_mean
}

let filterSignal = async function(y, cutoff, updateGraph = false){
    const firCalculator = new fili.FirCoeffs();
    var firFilterCoeffs = firCalculator.lowpass({
        order: 100, // filter order
        Fs: sampleFreq, // sampling frequency
        Fc: cutoff, // cutoff frequency
        // forbandpass and bandstop F1 and F2 must be provided instead of Fc
    });
    
    const filter = new fili.FirFilter(firFilterCoeffs);
    
    signalFiltered = filter.simulate(y)
    console.log(signalFiltered)
    if(updateGraph){
        await updateGraphComponent(signalFiltered, X_MAX)
    }

    return signalFiltered
}


let getAbsValue = async function (df, updateGraph = false) {
    let meanRemoved = await removeMean(df)    
    let df_abs = meanRemoved.abs()
    if (updateGraph) {
        await updateGraphComponent(df_abs.values, X_MAX)
    }
    return df_abs
}

let formatRawCSVData = async function(csvArray){
    await _.forEach(csvArray, ({mV, mV2}, index) => {
        selectedDataY.push(parseFloat(mV))
        selectedDataX.push(index / sampleFreq)
    })

    df_y = new dfd.Series(selectedDataY)
    df_x = new dfd.Series(selectedDataX)
    //df_y.print()
    //df_x.print()

    //let df_remove_mean = removeMean(df_y, true)
    //df_abs.iloc(["10:"]).print()
}

let loadData = async function(csvFile){
    const rawCSV = await tsv(_data).then((data) => { return data })
    formatRawCSVData(rawCSV)
    //console.log(rawCSV)
}   

let createEventListener = function (id, callback) {
    document.getElementById(id).onclick = callback;
};

window.blocklyHooks = {
    plotRaw: (y, userDefined = false, sampleMax = 0) => {
        //plotRawData(df_y, true)
        //console.log(y)
        plotRawData(y, userDefined, sampleMax)
    },

    raw: () => {return df_y.values}
}

let handleEvents = function () {
    createEventListener("d1", () => {plotRawData(df_y, true)});
    createEventListener("d2", () => {removeMean(df_y, true)});
    createEventListener("d3", () => {getAbsValue(df_y, true)});
    createEventListener("d4", async () => {
        let _y = await getAbsValue(df_y)
        //console.log(_y.values)
        filterSignal(_y.values, 3, true)
    });
};

// Fix for getBBox error https://github.com/plouc/nivo/issues/2162#issuecomment-1467184517
HTMLCanvasElement.prototype.getBBox = function () {
    return { width: this.offsetWidth, height: this.offsetHeight };
};

let initData = function(){
    let data = [ json_data ]
    root = createRoot(document.getElementById('visualizer'))
    root.render(<LinearLineGraph data={testData} />)
    loadData()
}

let updateData = function (dataset) {
    //let data = [ dataset ]
    root.render(<LinearLineGraph data={dataset} />)
    //console.log("loading")
}

initData()
handleEvents()
//loadData("./data/emg1.csv")