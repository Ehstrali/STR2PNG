import { PassThrough } from 'stream';
import { hex } from './lib/hex.js';
const { PNG } = require('pngjs');
export module decrypt {
   /**
    * Returns a string from a given Buffer
    * @param {Buffer} content Must be the buffer of the image
    * @param {Function} callback
    */
    export function decrypt(content: Buffer, callback: Function): void {
        const redArr: string[] = [];
        const greenArr: string[] = [];
        const blueArr: string[] = [];
        const stream = new PassThrough();
        stream.end(content)
        stream.pipe(new PNG()).on('parsed', function (this: any): void {
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
                        blueArr.push('#' + blueHex + '0000')
                    } else if (opacity === 253) {
                        greenArr.push('#' + greenHex + '0000');
                        blueArr.push('#' + blueHex + '0000')
                    } else if (opacity === 252) {
                        redArr.push('#' + redHex + '0000');
                        blueArr.push('#' + blueHex + '0000')
                    } else if (opacity === 251) {
                        redArr.push('#' + redHex + '0000');
                        greenArr.push('#' + greenHex + '0000')
                    } else if (opacity === 250) {
                        blueArr.push('#' + blueHex + '0000')
                    } else if (opacity === 249) {
                        greenArr.push('#' + greenHex + '0000')
                    } else if (opacity === 248) {
                        redArr.push('#' + redHex + '0000')
                    }
                }
            }
            const arr: string[] = redArr.concat(greenArr, blueArr);
            const content: string = hex.decodeHex(arr)
            callback(content.replace(/__RN__/g, '\r\n').replace(/__N__/g, '\n').replace(/__R__/g, '\r'))
        })
    }
}
