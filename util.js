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

})(window);