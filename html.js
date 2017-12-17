
export default (function HyperTextMarkupLanguage() {

    function create_tag(name, attributes, ...children) {
        return goog.dom.createDom(name, attributes, ...children);
    }


    const prototype = {
        create_tag: create_tag
    };


    [
        'div',
        'form',
        'label',
        'input',
        'nav',
        'span',
        'style',

    ].forEach(function add_to_prototype(_) {
        prototype[_] = function(attributes, ...children) {
            return create_tag(_, attributes, ...children);
        }
    });


    return Object.freeze(prototype);

}());
