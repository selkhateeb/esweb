import html from './html.js'

export default (function BootStrap() {
    const prototype = {
        components: {}
    };

    // Helpers.
    const error = console.error;

    const navbar_sub_components_classes = [
        'navbar-brand', 'navbar-nav', 'navbar-toggler',
        'form-inline', 'navbar-text',
        'collapse navbar-collapse'
    ];

    prototype.components.navbar = function Navbar(...doms) {

        // Validation.
        function is_supported(dom) {
            const len = navbar_sub_components_classes.length;
            for(let i = 0; i < len; i++) {
                let re = new RegExp([
                    '(^|\s+)',
                    navbar_sub_components_classes[i] ,
                    '($|\s+)'].join(''));
                return re.test(dom.className);
            }
        }

        if(!doms.some(is_supported)) {
            error([
                'Using unsupported navbar subcomponent! Should be on of: ',
                navbar_sub_components_classes
            ].join(''));
        }

        return html.nav({'class': [
            'navbar',
            'navbar-expand-lg',
            'navbar-light',
            'bg-light' ].join(' ')
        }, doms);
    }

    prototype.components.navbar.brand = function Brand(...doms) {
        return html.div({'class': 'navbar-brand' }, ...doms);
    }
    prototype.components.navbar.nav = function Brand(...doms) {
        return html.div({'class': 'navbar-nav' }, ...doms);
    }
    prototype.components.navbar.toggler = function Brand(...doms) {
        return html.div({'class': 'navbar-toggler' }, ...doms);
    }
    prototype.components.navbar.text = function Brand(...doms) {
        return html.div({'class': 'navbar-text' }, ...doms);
    }
    prototype.components.navbar.collapse = function Brand(...doms) {
        return html.div({'class': 'collapse navbar-collapse' }, ...doms);
    }



    return Object.freeze(prototype);
}());
