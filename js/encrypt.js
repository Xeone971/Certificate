/*
 * File: encrypt.js
 * Contract: EU contract 2022-FR01-KA220-HED-000023509
 * Project: FitNESS 2 ERASMUS+
 * File Created: Thursday, 11th April 2024
 * Authors: Steward OUADI (AgroParisTech),  Olivier VITRAC (INRAE), Lucca COLLAS
 * -----
 * Last Modified: Wednesday, 22nd May 2024
 * Modified By: Lucca COLLAS
 */

const secretKey = 'votre_clé_secrète';

export function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export function decryptData(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
