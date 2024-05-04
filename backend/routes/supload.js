const express = require('express');
const multer = require('multer');
const router = express.Router();
const Supload = require('../models/supload');
const nodemailer = require('nodemailer');
// const fetch = require('node-fetch');
// const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


cloudinary.config({ 
  cloud_name: 'dril0ihiq', 
  api_key: '493119511475153', 
  api_secret: '8SjzuWaF6OwWNMYGrKDGct-sAys' 
});


const storage = multer.memoryStorage(); const upload = multer({ storage: storage, limits: { fileSize: 200 * 1024 * 1024 } });

router.post('/upload', upload.single('file'), async (req, res) => {


  const file = req.file;
  const { urd, fname, domain, descrip } = req.body;
  const keywords = JSON.parse(req.body.keywords);

  console.log('Received Keywords:', keywords);



  if (!file) {
    return res.status(400).send('File not uploaded!!.');
  }

  const newFile = new Supload({
    urd: urd,
    keywords: keywords,
    filename: fname,
    domain: domain,
    uploadDate: new Date(),
    uploadTime: new Date().toLocaleTimeString(),
    contentType: file.mimetype,
    fileData: file.buffer,
    fileSize: file.size,
    fileExtension: file.originalname.split('.').pop(),
    descrip: descrip,

  });


  try {
    await newFile.save();
    console.log(`File ${newFile.filename} has been saved to MongoDB Atlas.`);
    res.status(200).send('File uploaded successfully.');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/upload1', async (req, res) => {
  try {
    const files = await Supload.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//filtering based upon keywords
router.get('/filterByKeywords', async (req, res) => {
  const { keyword } = req.query;

  try {
    const files = await Supload.find({ keywords: { $regex: new RegExp(keyword, 'i') } });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//filter by access code and title
router.get('/filterByAccessCode', async (req, res) => {
  const { accessCode } = req.query;

  try {
    const files = await Supload.find({ code: accessCode });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search files by title
router.get('/filterByTitle', async (req, res) => {
  const { title } = req.query;

  try {
    const files = await Supload.find({ filename: { $regex: new RegExp(title, 'i') } });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//ranking the files

router.get('/rankFiles', async (req, res) => {
  const { keyword } = req.query;

  try {
    const allFiles = await Supload.find();

    const rankedFiles = allFiles.map(file => {
      const k1 = 1.5; // You can adjust these parameters based on your requirements
      const b = 0.75;

      const avgDocLengthDescrip = allFiles.reduce((sum, file) => sum + file.descrip.length, 0) / allFiles.length;
      const avgDocLengthFileData = allFiles.reduce((sum, file) => sum + bufferToString(file.fileData).length, 0) / allFiles.length;

      const idfDescrip = Math.log(
        (allFiles.length - allFiles.filter(file => file.descrip.includes(keyword)).length + 0.5) /
          (allFiles.filter(file => file.descrip.includes(keyword)).length + 0.5)
      );

      const idfFileData = Math.log(
        (allFiles.length - allFiles.filter(file => bufferToString(file.fileData).includes(keyword)).length + 0.5) /
          (allFiles.filter(file => bufferToString(file.fileData).includes(keyword)).length + 0.5)
      );

      // Calculations for descrip
      const tfDescrip = (file.descrip.match(new RegExp(keyword, 'gi')) || []).length;
      const docLengthDescrip = file.descrip.length;
      const numeratorDescrip = tfDescrip * (k1 + 1);
      const denominatorDescrip = tfDescrip + k1 * (1 - b + b * (docLengthDescrip / avgDocLengthDescrip));
      const scoreDescrip = idfDescrip * (numeratorDescrip / denominatorDescrip);

      // Calculations for fileData
      const tfFileData = (bufferToString(file.fileData).match(new RegExp(keyword, 'gi')) || []).length;
      const docLengthFileData = bufferToString(file.fileData).length;
      const numeratorFileData = tfFileData * (k1 + 1);
      const denominatorFileData = tfFileData + k1 * (1 - b + b * (docLengthFileData / avgDocLengthFileData));
      const scoreFileData = idfFileData * (numeratorFileData / denominatorFileData);

      // Combine scores or choose any strategy that fits your ranking criteria
      const combinedScore = scoreDescrip + scoreFileData;

      return {
        domain: file.domain,
        filename: file.filename,
        urd: file.urd,
        descrip: file.descrip,
        code: file.code,
        uploadDate: new Date(),
        fileSize: file.fileSize,
        fileExtension: file.fileExtension,
        score: combinedScore,
      };
    });

    // Sort rankedFiles based on the combined score in descending order
    const sortedRankedFiles = rankedFiles.sort((a, b) => b.score - a.score);

    res.json(sortedRankedFiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to convert Buffer to string
function bufferToString(buffer) {
  return buffer.toString('utf-8');
}

//DELETING THE FILES FROM THE DATABASE
router.delete('/deleteFile/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const fileToDelete = await Supload.findByIdAndDelete(fileId);
    res.json({ message: 'File deleted successfully' });

    if (!fileToDelete) {
      return res.status(404).json({ error: 'File not found' });
    }

    
  } catch (error) {
    console.error('Error in deleteFile route:', error);
    res.status(500).json({ error: error.message });
  }
});

//downloadfile
router.get('/downloadFile/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await Supload.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.set({
      'Content-Type': file.contentType,
      'Content-Disposition': `attachment; filename=${file.filename}`,
    });

    res.send(file.fileData);
  } catch (error) {
    console.error('Error in downloadFile route:', error);
    res.status(500).json({ error: error.message });
  }
});

//share
router.post('/shareFile/:id', async (req, res) => {
  const fileId = req.params.id;
  const { email } = req.body;

  try {
    const file = await Supload.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Convert file buffer to readable string
    const fileContentString = file.fileData.toString('utf-8');

    // Your sharing logic here, for example, sending an email with the file attachment
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'buvaneshkumaars_ai@mepcoeng.ac.in', // replace with your Gmail email address
        pass: 'Buvi@123', // replace with your Gmail password
      },
    });

    const mailOptions = {
      from: 'buvaneshkumaars_ai@mepcoeng.ac.in', // replace with your Gmail email address
      to: email,
      subject: 'File Sharing',
      text: 'Please find the shared file attached.',
      attachments: [
        {
          filename: file.filename, // use the original filename
          content: fileContentString,
          encoding: 'base64', // specify encoding
          contentType: file.fileExtension, // use the stored content type
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sharing file via email:', error);
        res.status(500).json({ error: 'Error sharing file' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'File shared successfully' });
      }
    });
  } catch (error) {
    console.error('Error in shareFile route:', error);
    res.status(500).json({ error: error.message });
  }
});

//cloudinary
router.post('/cloudinaryUpload', async (req, res) => {
  console.log("enters in to the cloud!");
  const file = req.file;
  const filename = req.body.filename; 
  console.log(file,filename);  

  try {
    // Upload the file to Cloudinary with the specified filename
    await cloudinary.uploader.upload(file.path, {
      public_id: filename,
      resource_type: 'raw' // or 'raw' depending on the file type
    });

    res.status(200).json({ message: 'File uploaded to Cloudinary successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading to Cloudinary' });
  }
});






module.exports=router;


