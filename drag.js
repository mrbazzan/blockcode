(function(global){
    "use strict";

    let dragTarget = null; // the block we are dragging
    let dragType = null; // where are we dragging from? menu or script
    let scriptBlocks = [];

    function dragStart(evt){
        if (!matches(evt.target, '.block')) return;
        if (matches(evt.target, '.menu .block')){
            dragType = "menu";
        } else {
            dragType = "script";
        }
        evt.target.classList.add("dragging");
        dragTarget = evt.target;

        scriptBlocks = Array.from(
            document.querySelectorAll(".script .block:not(.dragging)")
        );

        // This is just for visual effects.
        // .effectAllowed is used on draggable element
        if (matches(evt.target, '.menu .block')){
            evt.dataTransfer.effectAllowed = 'copy';
        } else {
            evt.dataTransfer.effectAllowed = 'move';
        }
    }

    function dragOver(evt){
        if (!matches(evt.target, '.menu, .menu *, .script, .script *')){
            // It keeps returning if the event is fired on
            // an element that does not match the css
            // selector above
            return
        }

        // prevent default to allow "drop operation"
        if (evt.preventDefault) {evt.preventDefault(); }

        // .dropEffect only works on dropzones
        if (dragType === 'menu'){
            evt.dataTransfer.dropEffect = 'copy';
        } else {
            evt.dataTransfer.dropEffect = 'move';
        }
    }

    window.addEventListener('dragstart', dragStart, false);
    window.addEventListener('dragover', dragOver, false);

})(window);