const { createReadStream, writeFile } = require('fs');
const { PNG } = require('pngjs');
const { js_beautify } = require('js-beautify');
const { decodeHex } = require('./lib/hex.js');
/**
 * Create a JS file from a PNG file
 * @param {string} filePath Path to the PNG file to convert
 * @param {string} savePath Path to save the JS file
 */
function decrypt(filePath: string, savePath: string): void {
    let arr: string[] = [];
    createReadStream(filePath)
    .pipe(new PNG())
    .on('parsed', function (): void { // Do not use arrow function here
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
                if ((this.data[idx] > 0) && (this.data[idx + 3] === 255)) {
                    arr.push('#' + /*Red to hex*/ this.data[idx].toString(16) + '0000')
                }
            }
        }
        let content: string = decodeHex(arr);
        writeFile(savePath, js_beautify(content), () => {}) // Use async because sync doesn't seems to work here...
    })
}

module.exports = { decrypt }
