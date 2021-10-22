$(document).ready(function(){
    // Create Canvas
    var canvas = new handwriting.Canvas(document.getElementById("canvas"));
    
    // Set error callback function
    canvas.setCallBack(function(data, err) {
        if(err) throw err;
        else console.log(data);
    });

    // Set options
    canvas.setLineWidth(15);
    canvas.setOptions(
        {
            language: "ja",
            numOfReturn: 3
        }
    );

    // Submit button event
    $("#submit-button").mousedown(function(e){
        console.log("meme");
            var meme = canvas.recognize();
        }
    );

    // Submit button event
    $("#reset-button").mousedown(function(e){
        console.log("meme");
            var meme = canvas.erase();
        }
    );








});