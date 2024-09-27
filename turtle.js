(function(global){
    "use strict";

    // how many of the screen's actual pixel should be used
    // to draw a single CSS pixel.
    let PIXEL_RATIO = window.devicePixelRatio || 1;

    let canvasPlaceholder = document.querySelector('.canvas-placeholder');
    let canvas = document.querySelector('.canvas');
    let script = document.querySelector('.script');
    let ctx = canvas.getContext('2d');
    let cos = Math.cos, sin = Math.sin, sqrt = Math.sqrt, PI = Math.PI;
    let DEGREE = PI/180;
    let color, direction, pos, pen, visible, WIDTH, HEIGHT;

    function deg2rad(degree){ return degree * DEGREE; }

    function onResize(evt){
        WIDTH = canvasPlaceholder.getBoundingClientRect().width * PIXEL_RATIO;
        HEIGHT = canvasPlaceholder.getBoundingClientRect().height * PIXEL_RATIO;
        canvas.setAttribute('width', WIDTH);
        canvas.setAttribute('height', HEIGHT);
        canvas.style.top = canvasPlaceholder.getBoundingClientRect().top + "px";
        canvas.style.left = canvasPlaceholder.getBoundingClientRect().left + "px";
        canvas.style.width = (WIDTH/PIXEL_RATIO) + "px";
        canvas.style.height = (HEIGHT/PIXEL_RATIO) + "px";
        if (evt){
            Menu.runSoon()
        }
    }

    // NB: when pen is true, we draw otherwise we move without drawing
    function penUp(){ pen = false; }
    function penDown(){ pen = true; }
    function recenter(){ pos = {x: WIDTH/2, y: HEIGHT/2 }; }

    function reset(){
        recenter();
        direction = deg2rad(90); // facing "up"
        visible = true;
        pen = true;
        color = 'green';
    }

    function clear(){
        // we save our starting coordinate system and restore to it,
        // to avoid using transformed one because the entire coordinate system
        // changes when a transformation is performed.
        ctx.save()
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,WIDTH,HEIGHT);
        ctx.restore();
        reset();
        ctx.moveTo(pos.x, pos.y);
    }

    function _turn(degree){ direction += deg2rad(degree); }

    function _moveForward(distance){
        let start = pos;
        pos = {
            x: cos(direction) * distance * PIXEL_RATIO + start.x,
            y: -sin(direction) * distance * PIXEL_RATIO + start.y
        }
        if (pen){
	        ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    }

    function drawTriangle(){
        let userPen = pen;
        if (visible){
            penUp(); _moveForward(5);
            penDown();
            _turn(-150); _moveForward(10);
            _turn(-120); _moveForward(10);
            _turn(-120); _moveForward(10);
            _turn(30);
            penUp(); _moveForward(-5);
            if (userPen){  // restore pen state
                penDown();
            }
	    }
    }

    function forward(block){ _moveForward(Block.value(block)); }
    function back(block){ _moveForward(-Block.value(block)); }
    function left(block) { _turn(Block.value(block)); }
    function right(block) { _turn(-Block.value(block)); }

    onResize();
    clear();
    drawTriangle();

    Menu.item("Forward", forward, 5, "steps");
    Menu.item("Back", back, 5, "steps");
    Menu.item("Right", right, 10, "degrees");
    Menu.item("Left", left, 10, "degrees");
    Menu.item("Pen up", penUp);
    Menu.item("Pen down", penDown);
    Menu.item("Back to center", recenter);

    script.addEventListener('beforeRun', clear, false);
    script.addEventListener('afterRun', drawTriangle, false);
    // resize canvas and re-run the blocks in script
    window.addEventListener('resize', onResize, false);

})(window);