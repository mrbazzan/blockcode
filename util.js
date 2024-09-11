(function(global){
    "use strict";
    global.elem = function elem(tag, attrs, children){
        attrs = attrs || {};
        children = children || [];
        let e = document.createElement(tag);
        Object.keys(attrs).forEach(
            key => e.setAttribute(key, attrs[key])
        );
        children.forEach(function(child){
            if (typeof child == 'string'){
                child = document.createTextNode(child);
            }
            e.appendChild(child);
        });
        return e;
    };

    global.matches = function matches(elem, selector){
        return elem.matches(selector);
    };

    global.trigger = function trigger(name, target){
        target.dispatchEvent( new CustomEvent(name, {bubbles: true, cancelable: false}));
    };

    global.closest = function closest(elem, selector){
        while (elem){
            if (matches(elem, selector)){
                return elem;
            }
            elem = elem.parentElement;
        }
        return null;
    };

})(window);