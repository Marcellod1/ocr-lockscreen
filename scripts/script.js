$(document).ready(function(){

    // Create Canvas and set options
    var canvas = new handwriting.Canvas(document.getElementById("canvas"));
    canvas.setLineWidth(15);
    canvas.setOptions(
        {
            language: "ja",
            numOfReturn: 1
        }
    );

    /* Set callback function for canvas.recognize. This function is called after the response from Google's API endpoint is complete 
    and throws errors if any occur.

    This function will perform the check between the user's input and the prompt
    */
    canvas.setCallBack(function(data, err) {
        if(err) throw err;
        else{
            console.log(data);
        }
    });


    // Simple submit button event
    $("#submit-button").mousedown(function(e){
           canvas.recognize();
        }
    );

    // Simple reset button event
    $("#reset-button").mousedown(function(e){
            canvas.erase();
        }
    );
});