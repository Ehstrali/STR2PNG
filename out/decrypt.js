"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const { PNG } = require('pngjs');
const { decodeHex } = require('./lib/hex.js');
const { decrypto } = require('./lib/crypto.js');
function decrypt(filePath, savePath) {
    let arr = [];
    fs_1.createReadStream(filePath)
        .pipe(new PNG())
        .on('parsed', function () {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
                if ((this.data[idx] > 0) && (this.data[idx + 3] === 255)) {
                    arr.push('#' + this.data[idx].toString(16) + '0000');
                }
            }
        }
        let content = decodeHex(arr);
        fs_1.writeFile(savePath, decrypto(content), () => { });
    });
}
module.exports = { decrypt };