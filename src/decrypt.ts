import { createReadStream, writeFile } from 'fs';
const { PNG } = require('pngjs');
const { decodeHex } = require('./lib/hex.js');
const { decrypto } = require('./lib/crypto.js');
/**
 * Create a JS file from a PNG file
 * @param {string} filePath Path to the PNG file to convert
 * @param {string} savePath Path to save the JS file
 */
function decrypt(filePath: string, savePath: string, algorithm?: string, key?: string): void {
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
        if (algorithm === undefined) {
            algorithm = 'aes128'
        }
        if (key === undefined) {
            key = ''
        }
        const content: string = decodeHex(arr);
        writeFile(savePath, decrypto(content, algorithm, key), () => {}) // Use async because sync doesn't seems to work here...
    })
}

module.exports = { decrypt }
