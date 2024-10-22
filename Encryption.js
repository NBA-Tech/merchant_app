const crypto = require('crypto');

// AES Encryption
export function encryptAES256(plainText, key) {
    const iv = key.substring(0, 16); // Use the first 16 characters of the key as the IV
    const keySpec = crypto.createSecretKey(Buffer.from(key, 'utf8'));
    const ivSpec = Buffer.from(iv, 'utf8');
    
    const cipher = crypto.createCipheriv('aes-256-cbc', keySpec, ivSpec);
    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    return encrypted;
}

// AES Decryption
export function decryptAES256(encryptedText, key) {
    const iv = key.substring(0, 16); // Use the first 16 characters of the key as the IV
    const keySpec = crypto.createSecretKey(Buffer.from(key, 'utf8'));
    const ivSpec = Buffer.from(iv, 'utf8');

    const decipher = crypto.createDecipheriv('aes-256-cbc', keySpec, ivSpec);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}

// Base64 Encoding
export function base64Encode(plainText) {
    return Buffer.from(plainText).toString('base64');
}

// Base64 Decoding
export function base64Decode(encodedText) {
    return Buffer.from(encodedText, 'base64').toString('utf8');
}
