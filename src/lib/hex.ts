import { charCode } from './charCode.js';
export module hex {
   /**
    * Generate a hex values array from a charcode array with shades of red #RR0000.
    * Then, the hex value is able to be printed on a new image.
    *
    * @param {number[]} charcode The CharCode array to translate
    * @returns {string[]} Returns a string array of hex values
    * @example
    *
    * generateHex([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100]) // = "Hello, World"
    * // => ["#480000", "#650000", "#6c0000", "#6c0000", "#6f0000", "#2c0000", "#200000", "#570000", "#6f0000", "#720000", "#6c0000", "#640000"]
    *
    * generateHex(generateCharCode('ABC'))
    * // => ["#410000", "#420000", "#430000"]
    */
    export function generateHex(charcode: number[]): string[] {
        let arr: string[] = [];
        charcode.forEach(char => {
            arr.push('#' + ((1 << 24) + (char << 16)).toString(16).slice(1))
        });
        return arr
    }
   /**
    * Generate a string from the string array of hexadecimal values.
    * Only the red from rgb is used to store characters, so the input will generally be #RRGGBB => #RR0000.
    * In fact, RR refers to a number between 0 and 255.
    * Hex code is used here to store a charcode into a color.
    *
    * The array of hex values is generated from an array of charcode by generateHex(charcode)
    *
    * @param {string[]} hex The hex code array to translate (into string)
    * @returns {string} Returns a string from the corresponding characters
    * @example
    *
    * decodeHex(["#480000", "#650000", "#6c0000", "#6c0000", "#6f0000", "#2c0000", "#200000", "#570000", "#6f0000", "#720000", "#6c0000", "#640000"])
    * // => "Hello, World"
    *
    * decodeHex(generateHex(generateCharCode('ABC')))
    * // => "ABC"
     */
    export function decodeHex(hex: string[]): string {
        let arr: number[] = [];
        hex.forEach(hexa => {
            arr.push(parseInt(hexa.slice(1, 3), 16))
        });
        return charCode.decodeCharCode(arr).join('')
    }
}
