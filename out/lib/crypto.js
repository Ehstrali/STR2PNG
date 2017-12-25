"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
function encrypto(text, algorithm, key, encrypt) {
    if (encrypt === false) {
        return text.replace(/(\r\n|\n|\r)/gm, '__NEWLINE__');
    }
    const cipher = crypto_1.createCipher(algorithm, key);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
function decrypto(text, algorithm, key, encrypted) {
    if (encrypted === false) {
        return text.replace(/__NEWLINE__/g, '\n');
    }
    const decipher = crypto_1.createDecipher(algorithm, key);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
module.exports = { encrypto, decrypto };