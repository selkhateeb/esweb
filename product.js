import html from './html.js'
import bs from './bootstrap.js'
import {horizontal_layout} from './layouts.js'


function menu(...doms) {
    return bs.components.navbar(...doms);
}

function logo() {
    console.log('asd');
    return bs.components.navbar.brand("LOGO");
}

function product() {}
function footer() {}

var layout = //horizontal_layout(
        menu(
            logo()
        );
// ,
//         product(),
//         footer()
//);

console.log(layout);


document.body.appendChild(layout);
