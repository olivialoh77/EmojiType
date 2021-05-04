/** isketch-main is derived from:
 * ISketch-Main: ECE 188 HTML/JavaScript Educational Program written by Professor Xiang Chen
 * at https://github.com/ucla-hci/isketch
 **/
//
//
//

var ISKETCH = ISKETCH || {}
var emoticon_number = "";

$(document).ready(() => {
    //
    //  TIP: how you print information
    //
    console.log('Welcome to iSketch!')

    // initialize the canvas
    $('#cvsMain')[0].width = 250;
    $('#cvsMain')[0].height = 100;
    $('#cvsMain').css('background-color', '#eeeeee');
    ISKETCH.context = $('#cvsMain')[0].getContext('2d');
    ISKETCH.context.strokeStyle = "#000000";
    ISKETCH.context.lineJoin = "round";
    ISKETCH.context.lineWidth = 5;


    // add input event handlers
    $('#cvsMain').on('mousedown', ISKETCH.canvasMouseDown);
    $('#cvsMain').on('mousemove', ISKETCH.canvasMouseMove);
    $('#cvsMain').on('mouseup', ISKETCH.canvasMouseUp);
})

//
//
//
ISKETCH.canvasMouseDown = function (e) {
    ISKETCH.context.clearRect(0, 0, $('#cvsMain').width(), $('#cvsMain').height());
    ISKETCH.context.beginPath();

    let rect = $('#cvsMain')[0].getBoundingClientRect();
    let x = e.clientX - rect.left, y = e.clientY - rect.top
    ISKETCH.context.moveTo(x, y);
    ISKETCH.context.stroke();

    ISKETCH.isDragging = true;

    // -------------------------------------------------------------------------------
    // create an empty array to store the user's mouse coordinates
    //
    ISKETCH.coords = new Array()
    ISKETCH.dollar = new DollarRecognizer();
    //
    // TODO: add the mouse down coordinates to this array
    // TIP: array.push(element)
    //
    let p = new Point(x, y);
    ISKETCH.coords.push(p);
    // -------------------------------------------------------------------------------
}

//
//
//
ISKETCH.canvasMouseMove = function (e) {
    if (!ISKETCH.isDragging) return;

    let rect = $('#cvsMain')[0].getBoundingClientRect();
    let x = e.clientX - rect.left, y = e.clientY - rect.top
    ISKETCH.context.lineTo(x, y);
    ISKETCH.context.moveTo(x, y);
    ISKETCH.context.stroke();

    // -------------------------------------------------------------------------------
    // TODO: add the mouse move coordinates to the array
    let p = new Point(x, y);
    ISKETCH.coords.push(p);

    // -------------------------------------------------------------------------------
}


//
//
//
ISKETCH.canvasMouseUp = function (e) {
    ISKETCH.isDragging = false;
    ISKETCH.context.closePath();

    // -------------------------------------------------------------------------------
    // TODO: add the mouse up coordinates to the array

    // TODO: print the array
    console.log(ISKETCH.coords)
    let result = ISKETCH.dollar.Recognize(ISKETCH.coords, 1).Name;
    console.log(result);

    if (result == "smile"){
        emoticon_number = "&#128522";
    }
    else if (result == "x"){
        emoticon_number = "&#128518";
    }
    else if (result == "circle"){
        emoticon_number = "&#128558";
    }
    else if (result == "v"){
        emoticon_number = "&#128156";
    }
    else if (result == "frown"){
        emoticon_number = "&#128542";
    }
    else{
        emoticon_number = "";
    }

    console.log(emoticon_number);


    let html = document.getElementById("display").innerHTML;
    document.getElementById("display").innerHTML = html + emoticon_number;

    let aut = document.getElementById("auto").innerHTML;
    document.getElementById("auto").innerHTML = emoticon_number;

    let x = document.getElementById("keyboard");
    x.style.display = "block";
    let y = document.getElementById("tbMain");
    y.style.display = "none";

    // -------------------------------------------------------------------------------
}

