"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const { PNG } = require('pngjs');
const { decodeHex } = require('./lib/hex.js');
const { decrypto } = require('./lib/crypto.js');
const { parseOptions } = require('./lib/parseOptions.js');
function decrypt(filePath, savePath, options) {
    const option = parseOptions(options);
    const redArr = [];
    const greenArr = [];
    const blueArr = [];
    fs_1.createReadStream(filePath)
        .pipe(new PNG())
        .on('parsed', function () {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
                if (this.data[idx + 3] === 255) {
                    redArr.push('#' + this.data[idx].toString(16) + '0000');
                    greenArr.push('#' + this.data[idx + 1].toString(16) + '0000');
                    blueArr.push('#' + this.data[idx + 2].toString(16) + '0000');
                }
                else if (this.data[idx + 3] === 253) {
                    greenArr.push('#' + this.data[idx + 1].toString(16) + '0000');
                    blueArr.push('#' + this.data[idx + 2].toString(16) + '0000');
                }
                else if (this.data[idx + 3] === 252) {
                    redArr.push('#' + this.data[idx].toString(16) + '0000');
                    blueArr.push('#' + this.data[idx + 2].toString(16) + '0000');
                }
                else if (this.data[idx + 3] === 251) {
                    redArr.push('#' + this.data[idx].toString(16) + '0000');
                    greenArr.push('#' + this.data[idx + 1].toString(16) + '0000');
                }
                else if (this.data[idx + 3] === 250) {
                    blueArr.push('#' + this.data[idx + 2].toString(16) + '0000');
                }
                else if (this.data[idx + 3] === 249) {
                    greenArr.push('#' + this.data[idx + 1].toString(16) + '0000');
                }
                else if (this.data[idx + 3] === 248) {
                    redArr.push('#' + this.data[idx].toString(16) + '0000');
                }
            }
        }
        const arr = redArr.concat(greenArr, blueArr);
        const content = decodeHex(arr);
        fs_1.writeFile(savePath, decrypto(content, option.algorithm, option.key, option.encrypt), () => { });
    });
}
module.exports = { decrypt };