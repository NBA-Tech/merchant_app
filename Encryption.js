import CryptoJS from 'crypto-js';

// AES Encryption
export function encryptAES256(plainText, key) {
    var secretKey = key.substring(0,16);
    var key = CryptoJS.enc.Utf8.parse(secretKey);
    var iv = CryptoJS.enc.Utf8.parse(secretKey);

    var cipherText = CryptoJS.AES.encrypt(plainText, key
        , {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );
    console.log("Encrypted Text : "+cipherText.toString());

    return cipherText;
}

// AES Decryption
export function decryptAES256(encryptedText, key) {
    const iv = CryptoJS.enc.Utf8.parse(key.substring(0, 16)); // Use the first 16 characters of the key as the IV
    const keySpec = CryptoJS.enc.Utf8.parse(key);

    const decrypted = CryptoJS.AES.decrypt(encryptedText, keySpec, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
}

// Base64 Encoding
export function base64Encode(plainText) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(plainText));
}

// Base64 Decoding
export function base64Decode(encodedText) {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedText));
}
