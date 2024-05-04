const express=require('express');
const multer=require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const router=express.Router();
const File=require('../models/fupload');
const Grid=require('gridfs-stream');
const {GridFsStorage}=require('multer-gridfs-storage');
const NodeRSA = require('node-rsa');


const storage=multer.memoryStorage();
const upload=multer({storage:storage,limits:{fileSize:200 * 1024 * 1024}});

//RSA key pair
const key = new NodeRSA({ b: 2048 }); // Adjust the key size as needed
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

//Function to encrypting the file
const encryptFile = (fileBuffer) => {
    const encryptedBuffer = key.encrypt(fileBuffer, 'base64');
    return encryptedBuffer;
  };

//Downloading RSA public key
router.get('/downloadPublicKey', (req, res) => {
    fs.writeFileSync('publicKey.pem', publicKey);
    res.download('publicKey.pem', 'publicKey.pem', (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal server error');
      } else {
        // Remove the temporary public key file after download
        fs.unlinkSync('publicKey.pem');
      }
    });
  });


router.post('/submit',upload.single('file'),async(req,res)=>{
  console.log("req details:",req.body);
    // const file=req.file;
    // const {domain,descrip,urd}=req.body;
    const file = req.file;
    const { domain, descrip, urd, publicKey } = req.body;
    

    if(!file)
    {
        return res.status(400).send('file not upload');
    }
    //Encryption using RSA public key (using area)
    const encryptedFile = encryptFile(file.buffer);

   const newFile = new File({
    filename: file.originalname,
    contentType: file.mimetype,
    fileData: encryptedFile,
    domain: domain,
    descrip: descrip,
    urd: urd,
    uploadDate: new Date(),
  });

  try {
    await newFile.save();
    console.log(`File ${newFile.filename} has been saved to MongoDB Atlas.`);
    res.send('File uploaded successfully');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Internal server error');
  } 

});

module.exports=router;
