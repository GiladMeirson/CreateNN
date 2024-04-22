_isClicked = false;
_trainPack=[];
_testPack=[];
pack ={
    input: new Array(256).fill(0),
    output: new Array(10).fill(0)
}

$(document).ready(()=>{
    //console.log("Mnist.js is ready");

    //console.log(pack);
    $("td").on("mouseover", function() {
        
        if (_isClicked) {
            $(this).css("background-color", "black");
            let index = parseInt($(this)[0].id.replace('td','')) -1 ;
            pack.input[index] = 1;
        }
        
    });


  
})


const SubmitPack = ()=>{
    let label = parseInt($("#labelIN").val());
    //console.log(label);
    if (label==NaN || label > 9 || label < 0 || label == null || label==undefined ||$("#labelIN").val()==''){
        alert("Please enter a valid label");
        return;   
    }
    pack.output[label] = 1;
    const refPack = JSON.parse(JSON.stringify(pack));
    _trainPack.push(refPack);
    resetBoard();

    
}

function downloadJSON(obj, filename) {
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = filename + '.json';
    a.innerHTML = 'download JSON';

    var container = document.body; // Use an appropriate container
    container.appendChild(a);
    a.click();
    a.remove();
}


const downloadData=()=>{
    const downloadData = () => {
        const data = JSON.stringify(_trainPack);
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'trainPack.txt';
        link.click();
        URL.revokeObjectURL(url);
    }
    //downloadData();
    downloadJSON(_trainPack,'yourDataJSON');
}

const resetBoard = ()=>{
    pack.input = new Array(256).fill(0);
    pack.output = new Array(10).fill(0);
    $("td").css("background-color", "white");
    $("#labelIN").val('');
}
$(document).on("mousedown", function() {
    _isClicked = true;
});

$(document).on("mouseup", function() {
    _isClicked = false;
});