/**
 * Generate a charcode array from the numbers corresponding to the characters.
 * See: http://www.asciitable.com/
 * @param {string} str The string to translate (into charcode)
 * @returns {number[]} Returns a charcode array
 * @example
 *
 * generateCharCode('Hello World')
 * // => [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
 */
function generateCharCode(str: string): number[] {
    let arr: number[] = [];
    for (var i = 0; i < str.length; ++i) {
        arr[i] = str.charCodeAt(i)
    }
    arr.unshift(32); // new space at the beggining : Resolve a bug where the first element is deleted
    return arr
}
/**
 * Generate a string array from the characters corresponding to the charcodes.
 * See: http://www.asciitable.com/
 * @param {number[]} charcode The charcode array to translate (into string array)
 * @returns {string[]} Returns a string array with the corresponding characters
 * @example
 *
 * decodeCharCode([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100])
 * // => ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"]
 */
function decodeCharCode(charcode: number[]): string[] {
    let arr: string[] = [];
    charcode.forEach(char => {
        arr.push(String.fromCharCode(char))
    });
    return arr
}

module.exports = { generateCharCode, decodeCharCode }
