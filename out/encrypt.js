"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const { PNG } = require('pngjs');
const { generateCharCode } = require('./lib/charCode.js');
const { generateHex } = require('./lib/hex.js');
const { getDimensions } = require('./lib/dimensions.js');
const { encrypto } = require('./lib/crypto.js');
function encrypt(filePath, savePath, algorithm, key) {
    if (algorithm === undefined) {
        algorithm = 'aes128';
    }
    if (key === undefined) {
        key = '';
    }
    const content = encrypto(fs_1.readFileSync(filePath, 'utf8'), algorithm, key);
    const hexArray = generateHex(generateCharCode(content));
    const png = new PNG({
        width: getDimensions(hexArray.length).width,
        height: getDimensions(hexArray.length).height
    });
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
    let i = 0;
    for (var y = 0; y < png.height; y++) {
        for (var x = 0; x < png.width; x++) {
            let idx = (png.width * y + x) << 2;
            if ((hexArray[i] !== undefined) && (hexToRgb(hexArray[i]) !== null)) {
                png.data[idx] = hexToRgb(hexArray[i]);
                png.data[idx + 1] = random();
                png.data[idx + 2] = random();
                png.data[idx + 3] = 255;
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