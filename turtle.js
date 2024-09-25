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
    let color, pos, pen, WIDTH, HEIGHT;

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

    onResize();

    Menu.item("Pen up", penUp);
    Menu.item("Pen down", penDown);
    Menu.item("Back to center", recenter);

    // resize canvas and re-run the blocks in script
    window.addEventListener('resize', onResize, false);

})(window);