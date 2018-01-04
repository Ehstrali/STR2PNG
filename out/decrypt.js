"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const hex_js_1 = require("./lib/hex.js");
const { PNG } = require('pngjs');
var decrypt;
(function (decrypt_1) {
    function decrypt(content, callback) {
        const redArr = [];
        const greenArr = [];
        const blueArr = [];
        const stream = new stream_1.PassThrough();
        stream.end(content);
        stream.pipe(new PNG()).on('parsed', function () {
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    const idx = (this.width * y + x) << 2;
                    const redHex = this.data[idx].toString(16);
                    const greenHex = this.data[idx + 1].toString(16);
                    const blueHex = this.data[idx + 2].toString(16);
                    const opacity = this.data[idx + 3];
                    if (opacity === 255) {
                        redArr.push('#' + redHex + '0000');
                        greenArr.push('#' + greenHex + '0000');
                        blueArr.push('#' + blueHex + '0000');
                    }
                    else if (opacity === 253) {
                        greenArr.push('#' + greenHex + '0000');
                        blueArr.push('#' + blueHex + '0000');
                    }
                    else if (opacity === 252) {
                        redArr.push('#' + redHex + '0000');
                        blueArr.push('#' + blueHex + '0000');
                    }
                    else if (opacity === 251) {
                        redArr.push('#' + redHex + '0000');
                        greenArr.push('#' + greenHex + '0000');
                    }
                    else if (opacity === 250) {
                        blueArr.push('#' + blueHex + '0000');
                    }
                    else if (opacity === 249) {
                        greenArr.push('#' + greenHex + '0000');
                    }
                    else if (opacity === 248) {
                        redArr.push('#' + redHex + '0000');
                    }
                }
            }
            const arr = redArr.concat(greenArr, blueArr);
            const content = hex_js_1.hex.decodeHex(arr);
            callback(content.replace(/__RN__/g, '\r\n').replace(/__N__/g, '\n').replace(/__R__/g, '\r'));
        });
    }
    decrypt_1.decrypt = decrypt;
})(decrypt = exports.decrypt || (exports.decrypt = {}));