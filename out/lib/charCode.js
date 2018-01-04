"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var charCode;
(function (charCode) {
    function generateCharCode(str) {
        let arr = [];
        for (var i = 0; i < str.length; ++i) {
            arr[i] = str.charCodeAt(i);
        }
        return arr;
    }
    charCode.generateCharCode = generateCharCode;
    function decodeCharCode(charcode) {
        let arr = [];
        charcode.forEach(char => {
            arr.push(String.fromCharCode(char));
        });
        return arr;
    }
    charCode.decodeCharCode = decodeCharCode;
})(charCode = exports.charCode || (exports.charCode = {}));