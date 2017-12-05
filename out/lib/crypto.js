"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
function encrypto(text) {
    const cipher = crypto_1.createCipher('aes128', '');
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
function decrypto(text) {
    const decipher = crypto_1.createDecipher('aes128', '');
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
module.exports = { encrypto, decrypto };