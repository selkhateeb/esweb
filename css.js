export default (function CrappyStyleSheets() {

    const prototype = {};

    function property(name, value) {
        return [name, ':', value, ';'].join('');
    }

    [
        'accelerator',
        'animation',
        'azimuth',
        'background',
        'background-attachment',
        'background-color',
        'background-image',
        'background-position',
        'background-position-x',
        'background-position-y',
        'background-repeat',
        'behavior',
        'border',
        'border-bottom',
        'border-bottom-color',
        'border-bottom-style',
        'border-bottom-width',
        'border-collapse',
        'border-color',
        'border-left',
        'border-left-color',
        'border-left-style',
        'border-left-width',
        'border-right',
        'border-right-color',
        'border-right-style',
        'border-right-width',
        'border-spacing',
        'border-style',
        'border-top',
        'border-top-color',
        'border-top-style',
        'border-top-width',
        'border-width',
        'bottom',
        'box-sizing',
        'caption-side',
        'clear',
        'clip',
        'color',
        'content',
        'counter-increment',
        'counter-reset',
        'cue',
        'cue-after',
        'cue-before',
        'cursor',
        'direction',
        'display',
        'elevation',
        'empty-cells',
        'filter',
        'float',
        'font',
        'font-family',
        'font-size',
        'font-size-adjust',
        'font-stretch',
        'font-style',
        'font-variant',
        'font-weight',
        'height',
        'ime-mode',
        'include-source',
        'layer-background-color',
        'layer-background-image',
        'layout-flow',
        'layout-grid',
        'layout-grid-char',
        'layout-grid-char-spacing',
        'layout-grid-line',
        'layout-grid-mode',
        'layout-grid-type',
        'left',
        'letter-spacing',
        'line-break',
        'line-height',
        'list-style',
        'list-style-image',
        'list-style-position',
        'list-style-type',
        'margin',
        'margin-bottom',
        'margin-left',
        'margin-right',
        'margin-top',
        'marker-offset',
        'marks',
        'max-height',
        'max-width',
        'min-height',
        'min-width',
        '-moz-binding',
        '-moz-border-radius',
        '-moz-border-radius-topleft',
        '-moz-border-radius-topright',
        '-moz-border-radius-bottomright',
        '-moz-border-radius-bottomleft',
        '-moz-border-top-colors',
        '-moz-border-right-colors',
        '-moz-border-bottom-colors',
        '-moz-border-left-colors',
        '-moz-opacity',
        '-moz-outline',
        '-moz-outline-color',
        '-moz-outline-style',
        '-moz-outline-width',
        '-moz-user-focus',
        '-moz-user-input',
        '-moz-user-modify',
        '-moz-user-select',
        'opacity',
        'orphans',
        'outline',
        'outline-color',
        'outline-style',
        'outline-width',
        'overflow',
        'overflow-X',
        'overflow-Y',
        'padding',
        'padding-bottom',
        'padding-left',
        'padding-right',
        'padding-top',
        'page',
        'page-break-after',
        'page-break-before',
        'page-break-inside',
        'pause',
        'pause-after',
        'pause-before',
        'pitch',
        'pitch-range',
        'play-during',
        'pointer-events',
        'position',
        'quotes',
        '-replace',
        'richness',
        'right',
        'ruby-align',
        'ruby-overhang',
        'ruby-position',
        '-set-link-source',
        'size',
        'speak',
        'speak-header',
        'speak-numeral',
        'speak-punctuation',
        'speech-rate',
        'stress',
        'scrollbar-arrow-color',
        'scrollbar-base-color',
        'scrollbar-dark-shadow-color',
        'scrollbar-face-color',
        'scrollbar-highlight-color',
        'scrollbar-shadow-color',
        'scrollbar-3d-light-color',
        'scrollbar-track-color',
        'table-layout',
        'text-align',
        'text-align-last',
        'text-decoration',
        'text-indent',
        'text-justify',
        'text-overflow',
        'text-shadow',
        'text-transform',
        'text-autospace',
        'text-kashida-space',
        'text-underline-position',
        'top',
        'transition',
        'unicode-bidi',
        '-use-link-source',
        'vertical-align',
        'visibility',
        'voice-family',
        'volume',
        'white-space',
        'widows',
        'width',
        'word-break',
        'word-spacing',
        'word-wrap',
        'writing-mode',
        'z-index',
        'zoom',
        '-webkit-transition',
        '-webkit-animation',

    ].forEach(function add_to_prototype(_) {
        let name = _.replace(/-/g, '_');
        prototype[name] = function(value) {
            return property(_, value);
        }
    });


    const __css = {};

    const next_name = (function generator() {
        const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const max_position = letters.length - 1;
        let position = 0;
        let length = 1;
        return function next() {
            if(position === max_position) {
                position = 0;
            }

            let result = "";

            for(let i = 0; i < length; i++) {
                result += letters[position];
                position += 1;
            }
            return result;
        }
    }());


    // Returns the class name.
    function define(styles) {
        const class_name = next_name();

        __css[`.${class_name}`] = ['{', styles['_'].join('\n') ,'}\n'].join('\n');
        delete styles['_'];

        let selectors = Object.getOwnPropertyNames(styles);
        selectors.forEach(function(_) {
            let selector = `.${class_name} ${_}`;
            __css[selector] = ['{', styles[_].join('\n') ,'}\n'].join('\n');
        });

        return class_name;
    }


    function define_keyframes(name, properties) {
        __css[`@keyframes ${name}`] = properties;
        __css[`@-webkit-keyframes ${name}`] = properties;
    }


    // returns the generated css.
    function generate() {
        classes = Object.getOwnPropertyNames(__css);

        let the_css = "";

        classes.forEach(function(_) {
            let properties = __css[_];
            the_css += `${_} ${properties}`
        });

        return html.style(undefined, the_css);
    }


    function style(element) {
        return (function Styler() {
            let constructor = function renderStyle() {
                const class_name = next_name();
                __css[`.${class_name}`] = ['{', element._style, '}\n'].join('\n');
                element.className += ' ' + class_name;
            };
            element._style = '';

            [ 'color',
              'display',
              'font_size',
              'font_weight',
              'padding',
              'position',
              'pointer_events',
              'left',
              'top',
              'width',
              'border',
              'margin_bottom',
              'box_sizing',
              'border_bottom',
              'height',
              'opacity'
            ].forEach(function(_) {
                constructor[_] = function(value) {
                    element._style += css[_](value);
                    return constructor;
                }
            });
            return constructor;
        }());
    }

    function style_state(element) {
        return (function StateStyler() {
            let styles = [];

            let constructor = function compile() {
                let class_name = element.className.trim().split(' ')[0];
                styles.forEach(function add_css(_) {
                    __css[`.${class_name}:${_.pseudo}`] = [
                        '{',
                        _.properties.join(''),
                        '}\n'
                    ].join('\n');

                });
            };


            constructor.on = function On(pseudo_state) {
                let pseudo_style = {
                    pseudo: pseudo_state
                };
                return {
                    style: function Style(...properties) {
                        pseudo_style.properties = properties;
                        styles.push(pseudo_style);

                        return constructor;
                    }
                }
            };

            return constructor;
        }());
    }

    function animate(element) {
        return (function Animator() {
            let transition = undefined;
            let from_properties = undefined;
            let to_properties = undefined;
            let on_element = undefined;

            let constructor = function compile() {

                const class_name = next_name();
                let selectors = [];
                on_element.pseudo.forEach(function makeSelector(_) {
                    selectors.push(`.${class_name}:${_} ~ .${element.className.trim()}`);
                });

                if(from_properties) {
                    // Create the @key-frame structure.
                    const name = next_name();
                    __css[`@-webkit-keyframes ${name}`] = [
                        '{',
                        'from {',
                        from_properties,
                        '}',
                        'to {',
                        to_properties,
                        '}}\n'
                    ].join('\n');

                    __css[`${selectors.join(',')}`] = [
                        '{',
                        css._webkit_animation(`${name} ${transition}`),
                        '}\n'].join('\n');

                }
                else {
                    element.style = css.transition(transition);
                    __css[`${selectors.join(',')}`] = ['{', to_properties, '}\n'].join('\n');
                }
                on_element.element.className = [on_element.element.className,
                                                class_name].join(' ');

            };

            constructor.transition = function(value) {
                transition = value;
                return constructor;
            };

            constructor.from = function(...properties) {
                from_properties = properties.join('');
                return {
                    to: function(...properties) {
                        to_properties = properties.join('');
                        return constructor;
                    }
                }
            };

            constructor.to = function(...properties) {
                to_properties = properties.join('');
                return constructor;
            };

            constructor.on = function(element, ...pseudo) {
                on_element = {
                    'element': element,
                    'pseudo': pseudo
                };
                return constructor;
            };

            return constructor;
        }());
    }

    prototype.define = define;
    prototype.define_keyframes = define_keyframes;
    prototype.generate = generate;
    prototype.raw = function(_) { return _;};
    prototype.style = style;
    prototype.style_state = style_state;
    prototype.animate = animate;
    return Object.freeze(prototype);

}());
