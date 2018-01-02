const { decrypt } = require('./out/decrypt.js');
const { encrypt } = require('./out/encrypt.js');

module.exports = {
    decrypt: decrypt.decrypt,
    encrypt: encrypt.encrypt
}
