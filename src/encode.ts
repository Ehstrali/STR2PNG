import { readFileSync, createWriteStream } from 'fs';
const { PNG } = require('pngjs');

const charCode = require('./lib/charCode.js');
const hex = require('./lib/hex.js');
const dimensions = require('./lib/dimensions.js');
const comments = require('./lib/comments.js');
/**
 * Create a PNG from a JS file
 * @param {string} filePath Path to the JS file to convert
 * @param {string} savePath Path to save the PNG file
 */
function encode(filePath: string, savePath: string): void {
    const content: string = comments.singleToMultiLineComments(readFileSync(filePath, { // Replace single line comments with multi line comments
        encoding: 'utf8'
    })).replace(/(\/\/[^\n\r]*(?:[\n\r]+|$))/gm, '');
    /**
     * Due to a bug some single line comments are left if they aren't on the beginning of the line
     * For now we remove them but it would be better to replace them with multi line comments
     */
    const hexArray: string[] = hex.generateHex(charCode.generateCharCode(content));
    const png = new PNG({
        width: dimensions.getDimensions(hexArray.length).width,
        height: dimensions.getDimensions(hexArray.length).height
    })
    function hexToRgb(hexa: string): number | null {
        let result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexa);
        if (result) {
            return parseInt(result[1], 16)
        }
        return null
    }
    function random(): number {
        return Math.round((Math.random() * 120) + 20)
    }
    for (var i = 0; i < (png.height * png.width); i++) {
        for (var y = 0; y < png.height; y++) {
            for (var x = 0; x < png.width; x++) {
                i++;
                let idx = (png.width * y + x) << 2;
                if ((hexArray[i] !== undefined) && (hexToRgb(hexArray[i]) !== null)) {
                    png.data[idx] = hexToRgb(hexArray[i]);
                    png.data[idx + 1] = random();
                    png.data[idx + 2] = random(); // Maybe B could be used to store infos like: new line.
                    png.data[idx + 3] = 255
                } else {
                    png.data[idx] = random();
                    png.data[idx + 1] = random();
                    png.data[idx + 2] = random();
                    png.data[idx + 3] = 254 // -1 Allows us to know that pixel don't store a char
                }
            }
        }
    }
    png.pack().pipe(createWriteStream(savePath))
}

module.exports = { encode }
