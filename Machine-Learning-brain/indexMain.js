_ThisNet = null;
_config=null;


const CreateNN=()=>{

    let inputLayerSizeIN = parseInt(document.getElementById('inputLayerSizeIN').value);
    let hiddenLayersIN = document.getElementsByClassName('hiddenLayersIN');
    let outputLayerSizeIN = parseInt(document.getElementById('outputLayerSizeIN').value);
    let ActivationSelectIN = parseInt(document.getElementById('ActivationSelectIN').value);
    let learningRateIN = parseInt(document.getElementById('learningRateIN').value);

    const hiddenValues = [...hiddenLayersIN].map((item)=>parseInt(item.value))

    _config = {
        hiddenLayers: hiddenValues,
        inputSize:inputLayerSizeIN,
        outputSize:outputLayerSizeIN,
        // activation:ActivationSelectIN,
        // learningRate:learningRateIN
    };

    _ThisNet = new brain.NeuralNetwork(_config);
    document.getElementById('PH-svg').innerHTML = brain.utilities.toSVG(_ThisNet);
    RenderTrainBase();


}



const RenderTrainBase=()=>{
    const ph = document.getElementById('toolsDiv');
    let strToRender = `<h1>Base 2 : Train</h1>`;
    strToRender+=`<textarea class="jsonInput" name="jsonInput" id="jsonInput" cols="30" rows="10">
{
 "1":{
  "input":[0,1],
  "output":[1]
 },
 "2":{
  "input":[1,0],
  "output":[1]
 },
 "3":{
  "input":[0,1],
  "output":[1]
 },
}
            </textarea>`





    strToRender += `<button onclick="TrainNN()">Train Network</button>`;
    ph.innerHTML=strToRender

}

const TrainNN=()=>{
    let trainString = document.getElementById('jsonInput').value;
    console.log(trainString);
    trainString=trainString.replace('\n','');

    const trainObject = JSON.parse(trainString);
    console.log(trainObject);
}

const AddHiddenInput = ()=>{
    const ph  = document.getElementById('hiddenPH');
    const hiddenElements = document.getElementsByClassName('hiddenLayersIN');
    ph.innerHTML= `<input step="1" min="1" value="3" class="hiddenLayersIN" name="HiddenLayerSizeIN" id="HiddenLayerSizeIN${hiddenElements.length}" type="number">`+ph.innerHTML;
}