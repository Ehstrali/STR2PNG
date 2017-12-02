"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const { PNG } = require('pngjs');
const { generateCharCode } = require('./lib/charCode.js');
const { generateHex } = require('./lib/hex.js');
const { getDimensions } = require('./lib/dimensions.js');
const { singleToMultiLineComments } = require('./lib/comments.js');
const regexComments = /(\/\/[^\n\r]*(?:[\n\r]+|$))/gm;
function encode(filePath, savePath) {
    let content = fs_1.readFileSync(filePath, {
        encoding: 'utf8'
    });
    if (content.match(regexComments)) {
        content = singleToMultiLineComments(content).replace(regexComments, '');
    }
    const hexArray = generateHex(generateCharCode(content));
    const png = new PNG({
        width: getDimensions(hexArray.length).width,
        height: getDimensions(hexArray.length).height
    });
    function hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            return parseInt(result[1], 16);
        }
        return null;
    }
    function random() {
        return Math.round((Math.random() * 120) + 20);
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
module.exports = { encode };