const crypto = require("crypto");

// Replace with your own 256-bit (32 bytes) key and 128-bit (16 bytes) IV

/* const key = Buffer.from(,"hex");
const iv = Buffer.from(, "hex");
 */

/**
 * Encrypts a given text using AES-256-CBC.
 * @param {string} text - The text to encrypt.
 * @returns {string} - The encrypted text in Base64 format.
 */
function encrypt(text, key, secret) {
  const Key = Buffer.from(key, "hex");
  const IV = Buffer.from(secret, "hex");

  const cipher = crypto.createCipheriv("aes-256-cbc", Key, IV);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

/**
 * Decrypts a given text using AES-256-CBC.
 * @param {string} encryptedText - The encrypted text in Base64 format.
 * @returns {string} - The decrypted text.
 */
function decrypt(encryptedText, key, secret) {
  const Key = Buffer.from(key, "hex");
  const IV = Buffer.from(secret, "hex");

  const decipher = crypto.createDecipheriv("aes-256-cbc", Key, IV);
  let decrypted = decipher.update(encryptedText, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
}


module.exports = { encrypt, decrypt };
