const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

if (isIE11) {
    require('es6-object-assign').polyfill();
    require('promise-polyfill/src/polyfill');
    require('polyfill-array-includes');
    require('ie-string-startswith-polyfill');
}
