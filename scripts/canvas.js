/* Run when the document is ready */
$(document).ready(function(){

    // Instantiate new canvas, position it and add it to the document
    var canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.style.marginTop = "400px";
    document.getElementById("phone-container").appendChild(canvas);

    var bounding_rect = canvas.getBoundingClientRect();
    var ctx = canvas.getContext('2d');

    // Event listeners for canvas
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', update_mouse_pos);
    canvas.addEventListener('mouseenter', update_mouse_pos);

    // Previous Mouse position
    var mouse_position = { x: 0, y: 0 };

    // Update the previous mouse position
    function update_mouse_pos(e){
        rel_pos = {
            x: e.clientX - bounding_rect.left,
            y: e.clientY - bounding_rect.top
        };
        
        mouse_position.x = rel_pos.x;
        mouse_position.y = rel_pos.y;
    }

    // Draw Function
    function draw(e) {
        // Check if the left mouse button is pressed
        if (e.buttons !== 1) return;

        ctx.beginPath();
        ctx.moveTo(mouse_position.x, mouse_position.y); // from

        update_mouse_pos(e);
        ctx.lineTo(mouse_position.x, mouse_position.y); // to

        ctx.strokeStyle = "black";
        ctx.lineWidth = 8;
        ctx.stroke();
    }
});





