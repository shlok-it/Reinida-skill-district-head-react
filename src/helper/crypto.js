import CryptoJS from 'crypto-js';

    const handleEncrypt = (key,text) => {
        const hashKey = CryptoJS.SHA512(key).toString(CryptoJS.enc.Hex);
        const encrypted = CryptoJS.AES.encrypt(text, hashKey).toString();
        return encrypted;
    };

     const handleDecrypt = (key,encryptedText) => {
        const hashKey = CryptoJS.SHA512(key).toString(CryptoJS.enc.Hex);
        const decrypted = CryptoJS.AES.decrypt(encryptedText, hashKey);
        const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
        return decryptedString;
    };
    export {handleEncrypt,handleDecrypt};