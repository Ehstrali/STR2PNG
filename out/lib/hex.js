"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const charCode_js_1 = require("./charCode.js");
var hex;
(function (hex_1) {
    function generateHex(charcode) {
        let arr = [];
        charcode.forEach(char => {
            arr.push('#' + ((1 << 24) + (char << 16)).toString(16).slice(1));
        });
        return arr;
    }
    hex_1.generateHex = generateHex;
    function decodeHex(hex) {
        let arr = [];
        hex.forEach(hexa => {
            arr.push(parseInt(hexa.slice(1, 3), 16));
        });
        return charCode_js_1.charCode.decodeCharCode(arr).join('');
    }
    hex_1.decodeHex = decodeHex;
})(hex = exports.hex || (exports.hex = {}));