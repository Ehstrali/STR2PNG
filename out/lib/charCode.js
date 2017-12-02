"use strict";
function generateCharCode(str) {
    if (typeof str !== 'string') {
        str = JSON.stringify(str);
    }
    let arr = [];
    for (var i = 0; i < str.length; ++i) {
        arr[i] = str.charCodeAt(i);
    }
    return arr;
}
function decodeCharCode(charcode) {
    let arr = [];
    charcode.forEach(char => {
        arr.push(String.fromCharCode(char));
    });
    return arr;
}
module.exports = { generateCharCode, decodeCharCode };