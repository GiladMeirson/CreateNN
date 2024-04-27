
// const data = [
//     {input:'i think this is a bad game', output:'bad'},
//     {input:'i think this is a good movie', output:'good'},
//     {input:'you are nice, thank you', output:'good'},
//     {input:'fuck you , you own me money', output:'bad'},
//     {input:'i wish you were dead', output:'bad'},
//     {input:'i think i start to love this', output:'good'},
//     {input:'i hate you so much', output:'bad'},
//     {input:'i hate you', output:'bad'},
// ]

const data = [
    {input:'i think this is a bad game', output:'bad'},
    {input:'i think this is a good movie', output:'good'},
    {input:'you are nice, thank you', output:'good'},
    {input:'fuck you , you own me money', output:'bad'},
    {input:'i wish you were dead', output:'bad'},
    {input:'i think i start to love this', output:'good'},
    {input:'i hate you so much', output:'bad'},
    {input:'i hate you', output:'bad'},
    {input:'This is an amazing book', output:'good'},
    {input:'The food here is delicious', output:'good'},
    {input:'I had a great time at the party', output:'good'},
    {input:'This movie is terrible', output:'bad'},
    {input:'The service was awful', output:'bad'},
    {input:'I cant stand this place', output:'bad'},
    {input:'The weather is perfect today', output:'good'},
    {input:'I love the new album', output:'good'},
    {input:'This game is so boring', output:'bad'},
    {input:'The customer support is terrible', output:'bad'},
    {input:'Im impressed with the quality', output:'good'},
];



const net = new brain.recurrent.LSTM();
//net.train(data);


net.train(data, {
    // Defaults values --> expected validation
    iterations: 2000, // the maximum times to iterate the training data --> number greater than 0
    errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
    log: true, // true to use console.log, when a function is supplied it is used --> Either true or a function
    logPeriod: 10, // iterations between logging out --> number greater than 0
    learningRate: 0.3, // scales with delta to effect training rate --> number between 0 and 1
    momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
    callback: null, // a periodic call back that can be triggered while training --> null or function
    callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
    //timeout: 10000, // the max number of milliseconds to train for --> number greater than 0. Default --> Infinity
  });

const output = net.run(`This is an amazing book`);
console.log(output);