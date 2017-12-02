"use strict";
const { createReadStream, writeFile } = require('fs');
const { PNG } = require('pngjs');
const { js_beautify } = require('js-beautify');
const { decodeHex } = require('./lib/hex.js');
function decrypt(filePath, savePath) {
    let arr = [];
    createReadStream(filePath)
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
        writeFile(savePath, js_beautify(content), () => { });
    });
}
module.exports = { decrypt };