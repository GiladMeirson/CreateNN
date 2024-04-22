_ThisNet = null;
_config=null;
_loaderInterval=null;
_trainstats=[];
_EvaluteArray=[];
_networkTrainTime=0;
_activation=null;
_learningRate=null;



$(document).ready(()=>{
    $('#loader').hide();
    $('#GraphModal').hide();
    CreateNN();
    ResetModel();
    document.getElementById('consolPH').innerHTML= `<p style="color: white; padding-bottom: 10px; font-size: 18px; border-bottom:1px solid white;">consol</p>`
})



const CreateNN=()=>{

    let inputLayerSizeIN = parseInt(document.getElementById('inputLayerSizeIN').value);
    let hiddenLayersIN = document.getElementsByClassName('hiddenLayersIN');
    let outputLayerSizeIN = parseInt(document.getElementById('outputLayerSizeIN').value);
    let ActivationSelectIN = document.getElementById('ActivationSelectIN').value;
    let learningRateIN = parseFloat(document.getElementById('learningRateIN').value);
    _learningRate=learningRateIN;
    _activation=ActivationSelectIN
    const hiddenValues = [...hiddenLayersIN].map((item)=>parseInt(item.value))

    _config = {
        hiddenLayers: hiddenValues,
        inputSize:inputLayerSizeIN,
        outputSize:outputLayerSizeIN,
        // activation:ActivationSelectIN,
        // learningRate:learningRateIN
    };
    const divistion = 1.9
    console.log(innerHeight/divistion,innerWidth/divistion)
    const optSVG = {
        height: innerHeight/divistion,
        width: innerWidth/divistion,
        radius: 12-parseInt(hiddenValues.length*0.5),
    }
    _ThisNet = new brain.NeuralNetwork(_config);
    document.getElementById('PH-svg').innerHTML = brain.utilities.toSVG(_ThisNet,optSVG);
    RenderTrainBase();
    RenderToConsol('model was created succses fully &#128077')


}


const EvaluteNet=()=>{

    const data = document.getElementById('EvaluteInput').value;
    const dataObject = JSON.parse(data);
    console.log('what we got ',dataObject);
    const ph = document.getElementById('consolPH');
    ph.innerHTML+=`<p>computing....</p>`
    ph.innerHTML+=`<p>--------------</p>`
    let errorsum=0;
    for (let i = 0; i < dataObject.length; i++) {
        const obj = dataObject[i];
        const res = _ThisNet.run(obj.input);
        console.log('res ',res);
        _EvaluteArray.push({predict:res[0],real:obj.output});
        errorsum+=Math.abs(obj.output-res[0]); 
        ph.innerHTML+=`<p>model predict: ${res[0]}</p>`
        ph.innerHTML+=`<p>real output: ${obj.output}</p>`
        ph.innerHTML+=`<p>--------------</p>`
    }
    let avgError = errorsum/dataObject.length;
    const accuracy = 1- avgError;
    ph.innerHTML+=`<p>accuracy: ${accuracy}</p>`
    const Container = document.getElementById('consoleContainer');
    Container.scrollTop = Container.scrollHeight;
}

const TrainNN=()=>{
    loader();
    let trainString = document.getElementById('jsonInput').value;
    //console.log(trainString);
    trainString=trainString.replace('\n','');
    const trainObject = JSON.parse(trainString);
    //console.log(trainObject);
    _config.activation=_activation;
    _config.learningRate=_learningRate;
    _ThisNet.train(trainObject,{
        callback:(stats)=>{
            console.log(stats)
            _trainstats.push(stats)
            RenderToConsol(`iterations: ${stats.iterations} --> Error: ${stats.error}`)
        },
        activation:_activation,
        learningRate:_learningRate,

    });
    RenderToConsol(`----------------------------------`)
    RenderToConsol(`finish train. model is ready &#128077 `)
    const Container = document.getElementById('consoleContainer');
    Container.scrollTop = Container.scrollHeight;
    stopLoader();
    RenderBase3();
}








//displays && Renders

const RenderToConsol=(text,overRide=false)=>{
    const ph = document.getElementById('consolPH');
    if (overRide) {
        ph.innerHTML=`<p>${text}</p>`;
    }
    else{
        ph.innerHTML+=`<p>${text}</p>`;

    }
    const Container = document.getElementById('consoleContainer');
    Container.scrollTop = Container.scrollHeight;
}

const ResetModel=()=>{
    const ph = document.getElementById('toolsDiv');
    let strToRender = `
    <h1>Base 1 : Create</h1>

    <!-- <label for="">Type of network : </label> -->
    
    <select name="TypeofNetwoekIN" id="TypeofNetwoekIN">
      <option value="Neural-Network">Neural-Network</option>
      <option value="LSTM">LSTM</option>
    </select>

    <!-- input -->
    <label for="inputLayerSizeIN">Input layer size : </label>
    <input step="1" min="1" value="2" name="inputLayerSizeIN" id="inputLayerSizeIN" type="number">

    <!-- hidden -->
    <label for="inputLayerSizeIN">Hidden layer size : </label>
    <div id="hiddenPH" class="wrapHidden">
      <input step="1" min="1" value="3" class="hiddenLayersIN" name="HiddenLayerSizeIN" id="HiddenLayerSizeIN" type="number">
      <button style="max-width: 75px;" onclick="AddHiddenInput()" id="AddhiddenBtn">+</button>
    </div>

    <!-- output -->
    <label for="outputLayerSizeIN">Output layer size : </label>
    <input step="1" min="1" value="1" name="outputLayerSizeIN" id="outputLayerSizeIN" type="number">




    <!-- Activation -->
    <label for="ActivationSelectIN">Activation function :</label>
    <select name="ActivationSelectIN" id="ActivationSelectIN">
      <option value="sigmoid">sigmoid</option>
      <option value="leaky-relu">leaky-relu</option>
      <option value="relu">relu</option>
      <option value="tanh">tanh</option>

    </select>

    <!-- Learning-Rate -->
    <label for="learningRateIN">Learning-Rate : </label>
    <input min="0.002" max="0.999" value="0.3" step="0.002" class="" name="learningRateIN" id="learningRateIN" type="number">

    <button onclick="CreateNN()">Create Network</button>
    `;
    ph.innerHTML=strToRender;
    RenderToConsol(`----------------------------------`)
    RenderToConsol(`Reset The Model`)

}
const RenderBase3=()=>{

    let strToRender = `
    <h1>Base 3 : Test - Evalute</h1>
    <h3>your model is ready.</h3>
    <button>Test</button>
    <button onclick="renderEvaluteBase()" >Evaluate</button>
    <button onclick="displayTrainGraph()">Show Train Error</button>
    <button onclick="displayTrainGraphaccuracy()">Show Train Accuracy</button>

    <br>
    <br>
    <button onclick="ResetModel()">Reset Model</button>
    <button onclick="downloadModelTextFile()">Export Model</button>
    `;
    const ph = document.getElementById('toolsDiv');
    ph.innerHTML = strToRender
}


const downloadModelTextFile=()=>{
    const stringModel = JSON.stringify(_ThisNet);
    downloadTextFile('Your_Model',stringModel);
}


const RenderTrainBase=()=>{
    const ph = document.getElementById('toolsDiv');
    let strToRender = `<h1>Base 2 : Train</h1>`;
    strToRender+=`<textarea class="jsonInput" name="jsonInput" id="jsonInput" cols="30" rows="10">
[
 {
  "input":[0,1],
  "output":[1]
 },
 {
  "input":[1,0],
  "output":[1]
 },
 {
  "input":[0,0],
  "output":[0]
 }
]</textarea>`





    strToRender += `<button onclick="TrainNN()">Train Network</button>`;
    strToRender += `<button onclick="ResetModel()">Back</button>`;
    ph.innerHTML=strToRender

}

const renderEvaluteBase=()=>{
    const ph = document.getElementById('toolsDiv');
    let strToRender = `<h1>Evaluate  The Model</h1>`;
    
    strToRender+=`<textarea class="jsonInput" name="jsonInput" id="EvaluteInput" cols="30" rows="10">
[
 {
  "input":[0,1],
  "output":[1]
 },
 {
  "input":[1,0],
  "output":[1]
 },
 {
  "input":[0,0],
  "output":[0]
 }
]</textarea>`





    strToRender += `<button style="margin-block:15px;" onclick="EvaluteNet()">Evalute</button>`;
    strToRender += `<button onclick="RenderBase3()"> back </button>`;
    ph.innerHTML=strToRender
}

const ClearConsol=()=>{
    document.getElementById('consolPH').innerHTML=`<p style="color: white; padding-bottom: 10px; font-size: 18px; border-bottom:1px solid white;">consol</p>`;
}
const displayTrainGraphaccuracy=()=>{
    const data = ExtractsValues();
    const xValues = data[0];
    const yValues = data[1];
    const Yval = yValues.map((item)=>{
        return 1-item
    })

        new Chart("graphCanvas", {
            type: "line",
            data: {
                
                labels: xValues,
                datasets: [{
                label:'Train-accuracy Rate',
                fill: false,
                lineTension: 0,
                pointRadius: 2,
                backgroundColor: "rgba(225,20,20,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: Yval
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'accuracy Rate VS Iterations'
                    },
                    subtitle: {
                        display: true,
                        text: '*train data'
                    }
                },
                legend: {display: true},
            }
        });

        $('#GraphModal').show();
}

const displayTrainGraph=()=>{
    const data = ExtractsValues();
    const xValues = data[0];
    const yValues = data[1];

        new Chart("graphCanvas", {
            type: "line",
            data: {
                
                labels: xValues,
                datasets: [{
                label:'Error Rate',
                fill: false,
                lineTension: 0,
                pointRadius: 2,
                backgroundColor: "rgba(225,20,20,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Error Rate VS Iterations'
                    },
                    subtitle: {
                        display: true,
                        text: '*train data'
                    }
                },
                legend: {display: true},
            }
        });

        $('#GraphModal').show();
}

const ExtractsValues=()=>{
    let iterationsArray = [];
    let errorArray = [];

// Iterate through the array of objects
    _trainstats.forEach(obj => {
        // Push values into respective arrays
        iterationsArray.push(obj.iterations);
        errorArray.push(obj.error);
    });
    const returnarr=[]
    returnarr.push(iterationsArray);
    returnarr.push(errorArray);
    return returnarr;

}

const loader=()=>{
    $('#loader').show();
    let count = 0;
    _loaderInterval = setInterval(()=>{
        $('#loadingText').html('Learning');
        for (let i = 0; i < count; i++) {
            $('#loadingText').append('.');
            
        }
        count++;
        count==4?count=0:'';
    },500);

}

const stopLoader=()=>{
    $('#loader').hide();
   _loaderInterval!=null?clearInterval(_loaderInterval):'';
}

const AddHiddenInput = ()=>{
    const ph  = document.getElementById('hiddenPH');
    const hiddenElements = document.getElementsByClassName('hiddenLayersIN');
    ph.innerHTML= `<input step="1" min="1" value="3" class="hiddenLayersIN" name="HiddenLayerSizeIN" id="HiddenLayerSizeIN${hiddenElements.length}" type="number">`+ph.innerHTML;
}
const closeGraph =()=>{
    $('#GraphModal').hide();
    $('#GraphModal').html('');
    $('#GraphModal').html(`<span id="closeme" onclick="closeGraph()">X</span>
    <canvas style="width: 100%;" id="graphCanvas"></canvas>`);

}


function downloadTextFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}