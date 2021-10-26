$(document).ready(function(){

    // Get the initial prompt for the user
    let char_gen = new CharacterGenerator();
    var user_prompt = promptUser(char_gen);
    
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
            const prompt_char = user_prompt["char"][Object.keys(user_prompt["char"])[0]]; // this is nasty
            const written_char = data[0];

            console.log("Prompted:" + prompt_char);
            console.log("Written:" + written_char);

            if (prompt_char == written_char){
                console.log("Result: Correct");
                // Unlock
                unlockPhone();
                lockPhone();
                
            } else {
                console.log("Result: Incorrect");
                $("#incorrect").show();
                setTimeout(function () {
                    $("#incorrect").hide();
                    canvas.erase();
                    user_prompt = promptUser(char_gen);
                }, 1500);
            }
        }
    });


    // Simple submit button event - recognize user input and get a new user prompt
    $("#submit-button").mousedown(function(e){
           /* NOTE: you can only really call recognize here since it is async. Any susbsequent calls here may not have the updated state from the recognize callback.
            Try to put all program logic requiring the global state within the callback instead of in here */
            $("#submit-button").css("transform", "scale(0.85)");
            canvas.recognize();
            
    });

    // Mouse up event handler for the submit button - resets the image to normal scale
    $("#submit-button").mouseup(function(e){
            $("#submit-button").css("transform", "scale(1.0)");
    });


    // Simple reset button event - erase canvas and get a new user prompt
    $("#reset-button").mousedown(function(e){
            $("#reset-button").css("transform", "scale(0.85)");
            canvas.erase();
            user_prompt = promptUser(char_gen);        
    });


    // Mouse up event handler for the reset button - resets the image to normal scale
    $("#reset-button").mouseup(function(e){
            $("#reset-button").css("transform", "scale(1.0)");
        
    });


    // Simple reset button event - erase canvas and keep the current prompt
    $("#erase-button").mousedown(function(e){
        $("#erase-button").css("transform", "scale(0.85)");
        canvas.erase();
    });

    
    // Mouse up event handler for the erase button - resets the image to normal scale
    $("#erase-button").mouseup(function(e){
        $("#erase-button").css("transform", "scale(1.0)");
    });


    // Updates the user facing promp DOM element with a new random prompt depending on the language config
    function promptUser(generator){

        // Get the current state of the checkboxes from the DOM
        const hira = $("#hira-selector").prop('checked');
        const kata = $("#kata-selector").prop('checked');
        const tenten = $("#tenten-selector").prop('checked');

        // Update the generator options with the current state of the checkboxes
        generator.updateIncludeAlphas(hira, kata, tenten);
        const rand_char = generator.generate();

        // Decide on the value of the user's prompt based on the returned character  alphabet
        var prompt_str = ""

        if(rand_char["alpha"] == "hiragana" || rand_char["alpha"] == "hiraTenTen"){
            prompt_str = "Write Hiragana \"" + Object.keys(rand_char["char"])[0] + "\""
        } else{
            prompt_str = "Write Katakana \"" + Object.keys(rand_char["char"])[0] + "\""
        }

        // Change the prompt element in the DOM
        $("#prompt").text(prompt_str)
        return rand_char;
    }

    // Play the unlock animation
    function unlockPhone(){
        console.log("unlocking...");
        $("#phone-lock-screen").css("z-index", 1);
        $("#phone-border").css("z-index", 2);
        $("#phone-lock-screen").animate({bottom: '+=500px'});
    }


    // Play the lock animation
    function lockPhone(){

        console.log("locking...");
        $("#phone-lock-screen").animate({bottom: '-=500px'});
        $("#phone-lock-screen").css("z-index", 2);
        $("#phone-border").css("z-index", 1);
        canvas.erase();
        user_prompt = promptUser(char_gen);        
    }
});