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

    window.addEventListener('dragstart', dragStart, false);

})(window);