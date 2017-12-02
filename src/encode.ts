import { readFileSync, createWriteStream } from 'fs';
const { PNG } = require('pngjs');
const { generateCharCode } = require('./lib/charCode.js');
const { generateHex } = require('./lib/hex.js');
const { getDimensions } = require('./lib/dimensions.js');
const { singleToMultiLineComments } = require('./lib/comments.js');
const regexComments = /(\/\/[^\n\r]*(?:[\n\r]+|$))/gm;
/**
 * Create a PNG from a JS file
 * @param {string} filePath Path to the JS file to convert
 * @param {string} savePath Path to save the PNG file
 */
function encode(filePath: string, savePath: string): void {
    let content: string = readFileSync(filePath, {
        encoding: 'utf8'
    })
    if (content.match(regexComments)) {
        // Replace single line comments with multi line comments
        // then replace these that hasn't been replaced
        content = singleToMultiLineComments(content).replace(regexComments, '')
    }
    const hexArray: string[] = generateHex(generateCharCode(content));
    const png = new PNG({
        width: getDimensions(hexArray.length).width,
        height: getDimensions(hexArray.length).height
    })
    function hexToRgb(hex: string): number | null {
        let result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            return parseInt(result[1], 16)
        }
        return null
    }
    function random(): number {
        return Math.round((Math.random() * 120) + 20)
    }
    let i = 0;
    for (var y = 0; y < png.height; y++) {
        for (var x = 0; x < png.width; x++) {
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
            i++
        }
    }
    png.pack().pipe(createWriteStream(savePath))
}

module.exports = { encode }
