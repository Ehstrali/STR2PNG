const { generateCharCode, decodeCharCode } = require('./out/lib/charCode.js');
const { decodeHex, generateHex } = require('./out/lib/hex.js');
const { getDimensions } = require('./out/lib/dimensions.js');
const { singleToMultiLineComments } = require('./out/lib/comments.js');
const { decrypt } = require('./out/encode.js');
const { encode } = require('./out/decrypt.js');

module.exports = {
    generateCharCode,
    decodeCharCode,
    decodeHex,
    generateHex,
    getDimensions,
    singleToMultiLineComments,
    decrypt,
    encode
}
