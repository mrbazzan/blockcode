(function(global){
    "use strict";

    let menu = document.querySelector('.menu');
    let script = document.querySelector('.script');
    let scriptRegistry = {};  // block-name -> fn
    let scriptDirty = false;  // has script been modified?

    function runSoon(){ scriptDirty = true; }

    function run(){
        // run block on script modification
        if (scriptDirty){
            scriptDirty = false;
            trigger('beforeRun', script);
            let blocks = document.querySelectorAll('.script > .block');
            Block.run(Array.from(blocks));
        }
        requestAnimationFrame(run);
    }
    // Execute the "run" function for the next frame.
    requestAnimationFrame(run);

    function runEach(evt){
        let block = evt.target;
        if (!matches(block, '.script .block')) return

        // call function associated with a block
        scriptRegistry[block.dataset.name](block);
    }

    function menuItem(name, fn, value, contents){
        let item = Block.create(name, value, contents);
        scriptRegistry[name] = fn;
        menu.appendChild(item);
        return item;
    }

    function repeat(block){
        let count = Block.value(block);
        let contents = Block.contents(block);
        for (let i=0; i<count; i++){
            Block.run(contents);
        }
    }
    // Add "repeat" to the MENU section
    menuItem("Repeat", repeat, 10, []);


    global.Menu = {
        runSoon: runSoon,
        item: menuItem
    };

    document.addEventListener('drop', runSoon, false);
    script.addEventListener('keyup', runSoon, false);
    script.addEventListener('change', runSoon, false);
    script.addEventListener('run', runEach, false);

})(window);