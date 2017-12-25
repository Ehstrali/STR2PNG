"use strict";
function parseOptions(options) {
    let algorithm = 'aes128';
    let key = '';
    let encrypt = false;
    if (options === undefined) {
        return { algorithm: algorithm, key: key, encrypt: encrypt };
    }
    if (typeof options === 'string') {
        return { algorithm: options, key: key, encrypt: encrypt };
    }
    else {
        if (options.algorithm !== undefined) {
            algorithm = options.algorithm;
        }
        if (options.key !== undefined) {
            key = options.key;
        }
        if (options.encrypt !== undefined) {
            encrypt = options.encrypt;
        }
    }
    return { algorithm: algorithm, key: key, encrypt: encrypt };
}
module.exports = { parseOptions };