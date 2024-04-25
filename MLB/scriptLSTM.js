
const data = [
    {input:'i think this is a bad game', output:'bad'},
    {input:'i think this is a good movie', output:'good'},
    {input:'you are nice, thank you', output:'good'},
    {input:'fuck you , you own me money', output:'bad'},
    {input:'i wish you were dead', output:'bad'},
    {input:'i think i start to love this', output:'good'},
    {input:'i hate you so much', output:'bad'},
    {input:'i hate you', output:'bad'},
]

const net = new brain.recurrent.LSTM();
net.train(data,{
    iterations:3000,
})

const output = net.run('i hate you');
console.log(output);