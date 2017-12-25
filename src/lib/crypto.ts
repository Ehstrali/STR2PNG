import { createDecipher, createCipher } from 'crypto';

function encrypto(text: string, algorithm: string, key: string, encrypt: boolean): string {
    if (encrypt === false) {
        return text.replace(/(\r\n|\n|\r)/gm, '__NEWLINE__');
    }
    const cipher = createCipher(algorithm, key);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted
}

function decrypto(text: string, algorithm: string, key: string, encrypted: boolean): string {
    if (encrypted === false) {
        return text.replace(/__NEWLINE__/g, '\n');
    }
    const decipher = createDecipher(algorithm, key);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec
}

module.exports = { encrypto, decrypto }
