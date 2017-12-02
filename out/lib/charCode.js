"use strict";
function generateCharCode(str) {
    if (typeof str !== 'string') {
        return [0];
    }
    let arr = [];
    for (var i = 0; i < str.length; ++i) {
        arr[i] = str.charCodeAt(i);
    }
    arr.unshift(32);
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