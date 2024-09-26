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

    function drop(evt){
        if (!matches(evt.target, '.menu, .menu *, .script, .script *')){
            return
        }

        let dropTarget = closest(
            evt.target,
            '.script .container, .script .block, .menu, .script'
        );

        let dropType = "script";
        if (matches(dropTarget, '.menu')){
            dropType = "menu";
        }

        // stops the browser from redirecting
        if (evt.stopPropagation){ evt.stopPropagation(); }

        // dragging from script to menu
        if (dragType === "script" && dropType === "menu"){
            dragTarget.parentElement.removeChild(dragTarget);
        }
        // dragging from script to script
        else if (dragType === "script" && dropType === "script"){
            if (matches(dropTarget, '.block')){
                dropTarget.parentElement.insertBefore(
                    dragTarget, dropTarget.nextSibling
                );
            } else { dropTarget.appendChild(dragTarget); }
        }
        // dragging from menu to script
        else if (dragType==="menu" && dropType === "script"){
            let newNode = dragTarget.cloneNode(true);
            newNode.classList.remove("dragging");
            if (matches(dropTarget, '.block')){
                dropTarget.parentElement.insertBefore(
                    newNode,
                    dropTarget.nextSibling
                );
            } else { dropTarget.appendChild(newNode); }
        }
    }

    function _findAndRemoveClass_(class_){
        let _elem = document.querySelector('.' + class_);
        if (_elem) _elem.classList.remove(class_);
    }

    function dragEnd(evt){
        _findAndRemoveClass_('dragging');
    }

    window.addEventListener('dragstart', dragStart, false);
    window.addEventListener('dragover', dragOver, false);
    window.addEventListener('drop', drop, false);
    window.addEventListener('dragend', dragEnd, false);

})(window);