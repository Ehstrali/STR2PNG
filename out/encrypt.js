"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const { PNG } = require('pngjs');
const { generateCharCode } = require('./lib/charCode.js');
const { generateHex } = require('./lib/hex.js');
const { getDimensions } = require('./lib/dimensions.js');
const { encrypto } = require('./lib/crypto.js');
function parseOptions(options) {
    let algorithm = 'aes128';
    let key = '';
    if (options === undefined) {
        return { algorithm: 'aes128', key: '' };
    }
    if (typeof options === 'string') {
        return { algorithm: options, key: '' };
    }
    else {
        if (options.algorithm !== undefined) {
            algorithm = options.algorithm;
        }
        else {
            algorithm = 'aes128';
        }
        if (options.key !== undefined) {
            key = options.key;
        }
        else {
            key = '';
        }
    }
    return { algorithm: algorithm, key: key };
}
function encrypt(filePath, savePath, options) {
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            return parseInt(result[1], 16);
        }
        return null;
    }
    function random() {
        let charCode = 'abcdefghijklmnopqrstuvwxyz1234567890'.charCodeAt(Math.round(Math.random() * 36));
        if (isNaN(charCode)) {
            charCode = 105;
        }
        return charCode;
    }
    const algorithm = parseOptions(options).algorithm;
    const key = parseOptions(options).key;
    const content = encrypto(fs_1.readFileSync(filePath, 'utf8'), algorithm, key);
    const hexArray = generateHex(generateCharCode(content));
    const length = hexArray.length;
    const tier = Math.round(length / 3) + 1;
    const png = new PNG({
        width: getDimensions(tier).width,
        height: getDimensions(tier).height
    });
    const redHexArray = hexArray.slice(0, tier);
    const greenHexArray = hexArray.slice(tier, tier * 2);
    const blueHexArray = hexArray.slice(tier * 2, length);
    let i = 0;
    for (var y = 0; y < png.height; y++) {
        for (var x = 0; x < png.width; x++) {
            let idx = (png.width * y + x) << 2;
            if ((hexArray[i] !== undefined) && ((hexToRgb(redHexArray[i]) !== null) || (hexToRgb(greenHexArray[i]) !== null) || (hexToRgb(blueHexArray[i]) !== null))) {
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
    png.pack().pipe(fs_1.createWriteStream(savePath));
}
module.exports = { encrypt };
