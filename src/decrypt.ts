import { createReadStream } from 'fs';
const { PNG } = require('pngjs');
const { decodeHex } = require('./lib/hex.js');
/**
 * Create a JS file from a PNG file
 * @param {string} filePath Path to the PNG file to convert
 * @param {string} savePath Path to save the JS file
 */
function decrypt(filePath: string, callback: string): string | void {
    const redArr: string[] = [];
    const greenArr: string[] = [];
    const blueArr: string[] = [];
    createReadStream(filePath)
    .pipe(new PNG())
    .on('parsed', function (): void {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
                if (this.data[idx + 3] === 255) {
                    redArr.push('#' + this.data[idx].toString(16) + '0000');
                    greenArr.push('#' + this.data[idx + 1].toString(16) + '0000');
                    blueArr.push('#' + this.data[idx + 2].toString(16) + '0000')
                } else if (this.data[idx + 3] === 253) {
                    greenArr.push('#' + this.data[idx + 1].toString(16) + '0000');
                    blueArr.push('#' + this.data[idx + 2].toString(16) + '0000')
                } else if (this.data[idx + 3] === 252) {
                    redArr.push('#' + this.data[idx].toString(16) + '0000');
                    blueArr.push('#' + this.data[idx + 2].toString(16) + '0000')
                } else if (this.data[idx + 3] === 251) {
                    redArr.push('#' + this.data[idx].toString(16) + '0000');
                    greenArr.push('#' + this.data[idx + 1].toString(16) + '0000')
                } else if (this.data[idx + 3] === 250) {
                    blueArr.push('#' + this.data[idx + 2].toString(16) + '0000')
                } else if (this.data[idx + 3] === 249) {
                    greenArr.push('#' + this.data[idx + 1].toString(16) + '0000')
                } else if (this.data[idx + 3] === 248) {
                    redArr.push('#' + this.data[idx].toString(16) + '0000')
                }
            }
        }
        const arr: string[] = redArr.concat(greenArr, blueArr);
        let content: string = decodeHex(arr).replace(/__NEWLINE__RN__/g, '\r\n');
        content = content.replace(/__NEWLINE__N__/g, '\n');
        callback(content.replace(/__NEWLINE__R__/g, '\r'))
    })
}

module.exports = { decrypt }
