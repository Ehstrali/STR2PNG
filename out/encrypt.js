"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const charCode_js_1 = require("./lib/charCode.js");
const hex_js_1 = require("./lib/hex.js");
const dimensions_js_1 = require("./lib/dimensions.js");
const { PNG } = require('pngjs');
var encrypt;
(function (encrypt_1) {
    function encrypt(content) {
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (result) {
                return parseInt(result[1], 16);
            }
            return null;
        }
        function random() {
            let charCode = 'abcdef1234567890'.charCodeAt(Math.round(Math.random() * 16));
            if (isNaN(charCode)) {
                charCode = 65;
            }
            return charCode;
        }
        content = content.replace(/(\r\n)/gm, '__RN__').replace(/(\n)/gm, '__N__').replace(/(\r)/gm, '__R__');
        const hexArray = hex_js_1.hex.generateHex(charCode_js_1.charCode.generateCharCode(content));
        const length = hexArray.length;
        const tier = Math.ceil(length / 3);
        const IMGDimensions = dimensions_js_1.dimensions.getDimensions(tier);
        const png = new PNG({
            width: IMGDimensions.width,
            height: IMGDimensions.height
        });
        const redHexArray = hexArray.slice(0, tier);
        const greenHexArray = hexArray.slice(tier, tier * 2);
        const blueHexArray = hexArray.slice(tier * 2, length);
        let i = 0;
        for (var y = 0; y < png.height; y++) {
            for (var x = 0; x < png.width; x++) {
                let idx = (png.width * y + x) << 2;
                if ((hexArray[i] !== undefined) && (hexArray[tier + i] !== undefined) && (hexArray[tier * 2 + i] !== undefined)) {
                    let isNull = 255;
                    if (hexToRgb(redHexArray[i]) !== null) {
                        png.data[idx] = hexToRgb(redHexArray[i]);
                    }
                    else {
                        png.data[idx] = random();
                        isNull = 253;
                    }
                    if (hexToRgb(greenHexArray[i]) !== null) {
                        png.data[idx + 1] = hexToRgb(greenHexArray[i]);
                    }
                    else {
                        png.data[idx + 1] = random();
                        if (isNull === 255) {
                            isNull = 252;
                        }
                        else {
                            isNull = 250;
                        }
                    }
                    if (hexToRgb(blueHexArray[i]) !== null) {
                        png.data[idx + 2] = hexToRgb(blueHexArray[i]);
                    }
                    else {
                        png.data[idx + 2] = random();
                        if (isNull === 255) {
                            isNull = 251;
                        }
                        else if (isNull === 252) {
                            isNull = 248;
                        }
                        else if (isNull === 253) {
                            isNull = 249;
                        }
                        else {
                            isNull = 254;
                        }
                    }
                    png.data[idx + 3] = isNull;
                }
                else {
                    png.data[idx] = random();
                    png.data[idx + 1] = random();
                    png.data[idx + 2] = random();
                    png.data[idx + 3] = 254;
                }
                i++;
            }
        }
        return png.pack();
    }
    encrypt_1.encrypt = encrypt;
})(encrypt = exports.encrypt || (exports.encrypt = {}));