window.onload = function(){
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var releaseLineY = 25;

// release a new object every 1500ms
var releaseRate = 1200;

// speed of falling of elements
var releaseRateOfDescent = 0.70;

// when last object was released 
var lastRelease = -1;

// holds all released object
var objects = [];

animate();


function releaseRandomObject() {

    //random type for this new object
    var t;

    if (Math.random() < 0.50) {
        t = "red";
    } else {
        t = "blue";
    }

    // create circle object
    var object = {
        // set this objects type
        type: t,
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are released
        y: releaseLineY,
    }

    // push objects to the array
    objects.push(object);
}



function animate() {

    // get the elapsed time
    var time = Date.now();

    // see if its time to release a new object
    if (time > (lastRelease + releaseRate)) {
        lastRelease = time;
        releaseRandomObject();
    }

    // request another animation frame
    requestAnimationFrame(animate);

    // clear the canvas to redraw the objects into the frame
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the line where new objects are released
    ctx.beginPath();
    ctx.moveTo(0, releaseLineY);
    ctx.lineTo(canvas.width, releaseLineY);
    ctx.stroke();

    // move each object down the canvas
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.y += releaseRateOfDescent;
        ctx.beginPath();
        ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();
        

    }


}
}




















