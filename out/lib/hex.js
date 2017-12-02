"use strict";
const { decodeCharCode } = require('./charCode.js');
function generateHex(charcode) {
    let arr = [];
    charcode.forEach(char => {
        arr.push('#' + ((1 << 24) + (char << 16)).toString(16).slice(1));
    });
    return arr;
}
function decodeHex(hex) {
    let arr = [];
    hex.forEach(hexa => {
        arr.push(parseInt(hexa.slice(1, 3), 16));
    });
    return decodeCharCodeArray(arr).join('');
}
module.exports = { generateHex, decodeHex };