_isClicked = false;
_trainPack=[];
_testPack=[];
_ThisNet={};
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

const RenderTest=()=>{
    document.getElementById("ph").innerHTML = `
    <h3>Mnist Test</h3>
    <table id="board">
        <tr><td id="td1"></td><td id="td2"></td><td id="td3"></td><td id="td4"></td><td id="td5"></td><td id="td6"></td><td id="td7"></td><td id="td8"></td><td id="td9"></td><td id="td10"></td><td id="td11"></td><td id="td12"></td><td id="td13"></td><td id="td14"></td><td id="td15"></td><td id="td16"></td></tr>
        <tr><td id="td17"></td><td id="td18"></td><td id="td19"></td><td id="td20"></td><td id="td21"></td><td id="td22"></td><td id="td23"></td><td id="td24"></td><td id="td25"></td><td id="td26"></td><td id="td27"></td><td id="td28"></td><td id="td29"></td><td id="td30"></td><td id="td31"></td><td id="td32"></td></tr>
        <tr><td id="td33"></td><td id="td34"></td><td id="td35"></td><td id="td36"></td><td id="td37"></td><td id="td38"></td><td id="td39"></td><td id="td40"></td><td id="td41"></td><td id="td42"></td><td id="td43"></td><td id="td44"></td><td id="td45"></td><td id="td46"></td><td id="td47"></td><td id="td48"></td></tr>
        <tr><td id="td49"></td><td id="td50"></td><td id="td51"></td><td id="td52"></td><td id="td53"></td><td id="td54"></td><td id="td55"></td><td id="td56"></td><td id="td57"></td><td id="td58"></td><td id="td59"></td><td id="td60"></td><td id="td61"></td><td id="td62"></td><td id="td63"></td><td id="td64"></td></tr>
        <tr><td id="td65"></td><td id="td66"></td><td id="td67"></td><td id="td68"></td><td id="td69"></td><td id="td70"></td><td id="td71"></td><td id="td72"></td><td id="td73"></td><td id="td74"></td><td id="td75"></td><td id="td76"></td><td id="td77"></td><td id="td78"></td><td id="td79"></td><td id="td80"></td></tr>
        <tr><td id="td81"></td><td id="td82"></td><td id="td83"></td><td id="td84"></td><td id="td85"></td><td id="td86"></td><td id="td87"></td><td id="td88"></td><td id="td89"></td><td id="td90"></td><td id="td91"></td><td id="td92"></td><td id="td93"></td><td id="td94"></td><td id="td95"></td><td id="td96"></td></tr>
        <tr><td id="td97"></td><td id="td98"></td><td id="td99"></td><td id="td100"></td><td id="td101"></td><td id="td102"></td><td id="td103"></td><td id="td104"></td><td id="td105"></td><td id="td106"></td><td id="td107"></td><td id="td108"></td><td id="td109"></td><td id="td110"></td><td id="td111"></td><td id="td112"></td></tr>
        <tr><td id="td113"></td><td id="td114"></td><td id="td115"></td><td id="td116"></td><td id="td117"></td><td id="td118"></td><td id="td119"></td><td id="td120"></td><td id="td121"></td><td id="td122"></td><td id="td123"></td><td id="td124"></td><td id="td125"></td><td id="td126"></td><td id="td127"></td><td id="td128"></td></tr>
        <tr><td id="td129"></td><td id="td130"></td><td id="td131"></td><td id="td132"></td><td id="td133"></td><td id="td134"></td><td id="td135"></td><td id="td136"></td><td id="td137"></td><td id="td138"></td><td id="td139"></td><td id="td140"></td><td id="td141"></td><td id="td142"></td><td id="td143"></td><td id="td144"></td></tr>
        <tr><td id="td145"></td><td id="td146"></td><td id="td147"></td><td id="td148"></td><td id="td149"></td><td id="td150"></td><td id="td151"></td><td id="td152"></td><td id="td153"></td><td id="td154"></td><td id="td155"></td><td id="td156"></td><td id="td157"></td><td id="td158"></td><td id="td159"></td><td id="td160"></td></tr>
        <tr><td id="td161"></td><td id="td162"></td><td id="td163"></td><td id="td164"></td><td id="td165"></td><td id="td166"></td><td id="td167"></td><td id="td168"></td><td id="td169"></td><td id="td170"></td><td id="td171"></td><td id="td172"></td><td id="td173"></td><td id="td174"></td><td id="td175"></td><td id="td176"></td></tr>
        <tr><td id="td177"></td><td id="td178"></td><td id="td179"></td><td id="td180"></td><td id="td181"></td><td id="td182"></td><td id="td183"></td><td id="td184"></td><td id="td185"></td><td id="td186"></td><td id="td187"></td><td id="td188"></td><td id="td189"></td><td id="td190"></td><td id="td191"></td><td id="td192"></td></tr>
        <tr><td id="td193"></td><td id="td194"></td><td id="td195"></td><td id="td196"></td><td id="td197"></td><td id="td198"></td><td id="td199"></td><td id="td200"></td><td id="td201"></td><td id="td202"></td><td id="td203"></td><td id="td204"></td><td id="td205"></td><td id="td206"></td><td id="td207"></td><td id="td208"></td></tr>
        <tr><td id="td209"></td><td id="td210"></td><td id="td211"></td><td id="td212"></td><td id="td213"></td><td id="td214"></td><td id="td215"></td><td id="td216"></td><td id="td217"></td><td id="td218"></td><td id="td219"></td><td id="td220"></td><td id="td221"></td><td id="td222"></td><td id="td223"></td><td id="td224"></td></tr>
        <tr><td id="td225"></td><td id="td226"></td><td id="td227"></td><td id="td228"></td><td id="td229"></td><td id="td230"></td><td id="td231"></td><td id="td232"></td><td id="td233"></td><td id="td234"></td><td id="td235"></td><td id="td236"></td><td id="td237"></td><td id="td238"></td><td id="td239"></td><td id="td240"></td></tr>
        <tr><td id="td241"></td><td id="td242"></td><td id="td243"></td><td id="td244"></td><td id="td245"></td><td id="td246"></td><td id="td247"></td><td id="td248"></td><td id="td249"></td><td id="td250"></td><td id="td251"></td><td id="td252"></td><td id="td253"></td><td id="td254"></td><td id="td255"></td><td id="td256"></td></tr>
    </table>
    <br><br>
    <button onclick="testThis()" class="button">TEST</button>
    <button onclick="location.reload()" class="button">BACK</button>
    <p id="predictP"><p>

    `;
    $("td").on("mouseover", function() {
        
        if (_isClicked) {
            $(this).css("background-color", "black");
            let index = parseInt($(this)[0].id.replace('td','')) -1 ;
            pack.input[index] = 1;
        }
        
    });
}

const testThis=()=>{
    console.log("Testing",pack);
    _ThisNet = JSON.parse(JSON.stringify(D));
    console.log(_ThisNet);
   const res =  _ThisNet.toFunction();
   console.log(res);

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