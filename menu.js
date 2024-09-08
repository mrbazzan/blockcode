(function(global){
    "use strict";

    let menu = document.querySelector('.menu');
    let script = document.querySelector('.script');
    let scriptRegistry = {};  // block-name -> fn
    let scriptDirty = false;  // has script been modified?

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
        item: menuItem
    };

})(window);