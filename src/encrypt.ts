import { charCode } from './lib/charCode.js';
import { hex } from './lib/hex.js';
import { dimensions } from './lib/dimensions.js';
const { PNG } = require('pngjs');
export module encrypt {
   /**
    * Create a PNG from a JS file
    * @param {string} filePath Path to the JS file to convert
    * @param {string} savePath Path to save the PNG file
    */
    export function encrypt(content: string) {
        function hexToRgb(hex: string): number | null {
            const result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (result) {
                return parseInt(result[1], 16)
            }
            return null
        }
        function random(): number {
            let charCode = 'abcdef1234567890'.charCodeAt(Math.round(Math.random() * 16));
            if (isNaN(charCode)) {
                charCode = 65
            }
            return charCode
        }
        content = content.replace(/(\r\n)/gm, '__RN__').replace(/(\n)/gm, '__N__').replace(/(\r)/gm, '__R__');
        const hexArray: string[] = hex.generateHex(charCode.generateCharCode(content));
        const length: number = hexArray.length;
        const tier = Math.ceil(length / 3);
        const IMGDimensions = dimensions.getDimensions(tier);
        const png = new PNG({
            width: IMGDimensions.width,
            height: IMGDimensions.height
        })
        const redHexArray: string[] = hexArray.slice(0, tier);
        const greenHexArray: string[] = hexArray.slice(tier, tier * 2);
        const blueHexArray: string[] = hexArray.slice(tier * 2, length);
        let i = 0;
        for (var y = 0; y < png.height; y++) {
            for (var x = 0; x < png.width; x++) {
                let idx = (png.width * y + x) << 2;
                if ((hexArray[i] !== undefined) && (hexArray[tier + i] !== undefined) && (hexArray[tier * 2 + i] !== undefined)) {
                    let isNull = 255;
                    if (hexToRgb(redHexArray[i]) !== null) {
                        png.data[idx] = hexToRgb(redHexArray[i])
                    } else {
                        png.data[idx] = random();
                        isNull = 253
                    }
                    if (hexToRgb(greenHexArray[i]) !== null) {
                        png.data[idx + 1] = hexToRgb(greenHexArray[i])
                    } else {
                        png.data[idx + 1] = random();
                        if (isNull === 255) {
                            isNull = 252
                        } else {
                            isNull = 250
                        }
                    }
                    if (hexToRgb(blueHexArray[i]) !== null) {
                        png.data[idx + 2] = hexToRgb(blueHexArray[i])
                    } else {
                        png.data[idx + 2] = random();
                        if (isNull === 255) {
                            isNull = 251
                        } else if (isNull === 252) {
                            isNull = 248
                        } else if (isNull === 253) {
                            isNull = 249
                        } else {
                            isNull = 254
                        }
                    }
                    png.data[idx + 3] = isNull // A is used as an informational pixel
                } else {
                    png.data[idx] = random();
                    png.data[idx + 1] = random();
                    png.data[idx + 2] = random();
                    png.data[idx + 3] = 254
                }
                i++
            }
        }
        return png.pack()
    }
}
