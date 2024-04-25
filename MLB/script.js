
// provide optional config object (or undefined). Defaults shown.
const config = {
  hiddenLayers: [3],
  inputSize:2,
  outputSize:1 // array of ints for the sizes of the hidden layers in the network
};

// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);

net.train([
  {
    input:[0,0],
    output:[0]
  },
  {
    input:[1,1],
    output:[0]
  },
  {
    input:[1,0],
    output:[1]
  }
])

document.getElementById('stam').innerHTML = brain.utilities.toSVG(net);


