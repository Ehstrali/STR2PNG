import { createDecipher, createCipher } from 'crypto';

function encrypto(text: string): string {
    const cipher = createCipher('aes128', '');
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted
}

function decrypto(text: string): string {
    const decipher = createDecipher('aes128', '');
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec
}

module.exports = { encrypto, decrypto }
