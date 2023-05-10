const crypto = require("crypto");


const encryptedPass = crypto.pbkdf2Sync("12345", "rana@9808403128", 2000, 64, "sha512").toString('hex');

console.log(encryptedPass);
