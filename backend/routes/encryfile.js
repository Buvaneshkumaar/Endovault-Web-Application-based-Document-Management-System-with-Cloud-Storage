const express = require('express');
const fileUpload = require('express-fileupload');
const crypto = require('crypto');
const forge = require('node-forge');

const router = express.Router();
router.use(fileUpload());

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const RSA_PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvpG3s2nHh0yK8OmFUYWZ
MF+aDtKf0Ei/0i9t0Xo2kw/7VfIhqjN/MG8p3ANoSY2qNz93Ssf0Kw6GyUP9pmwF

XblyS8rY8fl1Oxlq+XDSjO4s+U6t/2WwDpRqJArU/KUt61y3A6LJgdZaX5iFz5jl
4VRz/B/3ouY9X7/9hC6HKUJssu9rhFrLlL5PIRVlfYvNjy0u8jOaVTNGDF5HV3A7
rg8YLG4F7fs8lcM2v55BW3K2O/2LlSyOk6lDsfgI+JAvxWV+nExZJ8pNnygEnVsI
uDfbJl76fFTT5rLnpV6oOzHmN0CLHEaQr3/FRb7dbzMIhBwTbZgV4bxEJ+wfylUe
iQIDAQAB
-----END PUBLIC KEY-----
`;

router.post('/aesencrypt', async (req, res) => {
    try {
      if (!req.files || !req.files.file) {
        console.log("No file received on the server");
        return res.status(400).json({ error: 'File is required.' });
      }
  
      const file = req.files.file;
  
      if (file.size > MAX_FILE_SIZE_BYTES) {
        console.log("File size exceeds the limit");
        return res.status(400).json({ error: 'File size exceeds the limit.' });
      }
  
      console.log("File received on the server", file);
  
      // Convert the file data to a buffer
      const fileData = Buffer.from(file.data);
  
      // Generate a random 256-bit key
      const aesKey = crypto.randomBytes(32); // 256 bits / 8 = 32 bytes
  
  
      const cipher = crypto.createCipheriv('aes-256-cfb', aesKey, Buffer.alloc(16, 0)); 
  
      // Encrypt the file
      const encryptedFile = Buffer.concat([cipher.update(fileData), cipher.final()]);
  
      console.log("AES Encrypted file (Level 1):", encryptedFile);
  
  
      const aesKeyData = aesKey.toString('base64');
      const encryptedFileData = encryptedFile.toString('base64');
  
      res.json({ file: encryptedFileData, key: aesKeyData });
    } catch (err) {
      console.error("Encryption failed (from server):", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  const handleServerHybridEncryption = async (req, res) => {
    try {
      // Assuming that the AES-encrypted file content and key are sent in req.body
      const aesEncryptedFile = req.body.encryptedFile;
      const aesKey = req.body.key;
  
      // console.log("AES file (from server):", aesEncryptedFile);
  
      if (!aesEncryptedFile || !aesKey) {
        console.log("AES-encrypted file or key not provided");
        return res.status(400).json({ error: 'AES-encrypted file and key are required.' });
      }
  
      // Decrypt the AES key
      const decryptedAesKey = forge.util.decode64(aesKey);
  
      // Perform RSA encryption on the AES-encrypted file content
      const rsaKey = forge.pki.publicKeyFromPem(RSA_PUBLIC_KEY);
      const rsaEncryfile = rsaKey.encrypt(decryptedAesKey, 'RSA-OAEP');
  
      console.log("RSA Encrypted File (Level 2)", rsaEncryfile);
  
      // Convert the encrypted file to Base64
      const base64EncryptedRsaFile = forge.util.encode64(rsaEncryfile);
  
      res.json({ encryptedAesFile: base64EncryptedRsaFile });
    } catch (error) {
      console.error('RSA Encryption failed (from server):', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
router.post('/rsaserverencrypt', handleServerHybridEncryption);


module.exports=router;