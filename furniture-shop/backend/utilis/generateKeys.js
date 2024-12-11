const NodeRSA = require('node-rsa');
const fs = require('fs');
const path = require('path');

const keysDir = path.join(__dirname, '../keys');

// Ensure the directory exists
if (!fs.existsSync(keysDir)) {
    fs.mkdirSync(keysDir, { recursive: true });
}

const generateKeys = () => {
    const key = new NodeRSA({ b: 2048 });
    const publicKey = key.exportKey('public');
    const privateKey = key.exportKey('private');

    fs.writeFileSync(path.join(keysDir, 'public.pem'), publicKey);
    fs.writeFileSync(path.join(keysDir, 'private.pem'), privateKey);

    console.log("RSA keys generated and saved!");
};

generateKeys();
