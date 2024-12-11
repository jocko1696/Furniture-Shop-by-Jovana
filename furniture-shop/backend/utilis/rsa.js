const fs = require('fs');
const NodeRSA = require('node-rsa');

const publicKey = fs.readFileSync('./keys/public.pem', 'utf8');
const privateKey = fs.readFileSync('./keys/private.pem', 'utf8');

const rsa = {
    public: new NodeRSA(publicKey),
    private: new NodeRSA(privateKey),

};

// Set the encryption and decryption options to match the frontend padding scheme (PKCS#1 v1.5)
rsa.private.setOptions({ encryptionScheme: 'pkcs1' }); // This matches the padding used by JSEncrypt

module.exports = rsa;
