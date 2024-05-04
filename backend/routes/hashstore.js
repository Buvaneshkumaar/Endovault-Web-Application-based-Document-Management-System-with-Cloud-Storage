const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const HFile = require('../models/fhash');
const Counter = require('../models/counter');
const Buffer = require('buffer').Buffer;

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.use(express.json());

// router.post('/generateHash', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file provided' });
//     }

//     console.log("File received on the server");

//     const filebuffer = req.file.buffer;
//     const hash = crypto.createHash('sha256').update(filebuffer).digest('hex');
//     const size = req.file.size;

//     // Find the current counter value from the database and increment it
//     const counterDocument = await Counter.findOneAndUpdate(
//       { name: 'fileIDCounter' },
//       { $inc: { value: 1 } },
//       { new: true, upsert: true }
//     );

//     const fileID = counterDocument.value.toString().padStart(3, '0'); // Ensure 3 digits with leading zeros

//     // Store hash details in the database along with the fileID
//     const newFile = new HFile({
//       filename: req.body.filename,
//       hash,
//       size,
//       userId: req.body.userId,
//       fileID,
//     });

//     await newFile.save();

//     res.json({ message: 'Hash generated and stored successfully', hash, size, fileID });
//   } catch (error) {
//     console.error('Error generating or storing hash:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// router code
router.post('/generateHash', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    console.log("File received on the server");

    const filebuffer = req.file.buffer;
    const hash = crypto.createHash('sha256').update(filebuffer).digest('hex');
    const size = req.file.size;

    // Extract file extension
    const filenameParts = req.file.originalname.split('.');
    const fileExtension = filenameParts.length > 1 ? filenameParts.pop() : '';

    // Find the current counter value from the database and increment it
    const counterDocument = await Counter.findOneAndUpdate(
      { name: 'fileIDCounter' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const fileID = counterDocument.value.toString().padStart(3, '0'); // Ensure 3 digits with leading zeros

    // Store file details in the database along with the fileID, hashed content, original content, extension, and created date
    const newFile = new HFile({
      filename: req.body.filename,
      hashedContent: hash, // Store hashed content
      content: filebuffer.toString('base64'), // Store original content as base64-encoded string
      size,
      userId: req.body.userId,
      fileID,
      extension: fileExtension,
      createdDate: new Date(),
    });

    await newFile.save();

    res.json({ message: 'Hash generated and stored successfully', hash, size, fileID });
  } catch (error) {
    console.error('Error generating or storing hash:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//CHECKING ORIGINALITY

router.get('/files', async (req, res) => {
  try {
    const files = await HFile.find();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Generate instant hash
router.post('/generateInstantHash', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const fileBuffer = req.file.buffer;
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    res.json({ hash });
  } catch (error) {
    console.error('Error generating instant hash:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Check originality
router.post('/checkOriginality', async (req, res) => {
  console.log("enters into server!");
  try {
    const { fileID, instantHash } = req.body;

    // Find the file using fileID
    const file = await HFile.findOne({ fileID });
    console.log("file data", file);

    if (!file) {
      return res.json({ message: 'File not found' });
    }

    // Compare the hash values
    if (file.hashedContent === instantHash) {
      return res.json({ message: 'Content not modified' });
    } else {
      return res.json({ message: 'Content modified' });
    }
  } catch (error) {
    console.error('Error checking originality:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//download file
router.get('/download/:fileID', async (req, res) => {
  try {
    const { fileID } = req.params;

    // Find the file using fileID
    const file = await HFile.findOne({ fileID });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Set the content type based on the file extension
    const contentType = getContentType(file.filename);

    // Send the content as a downloadable file
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
    res.setHeader('Content-Type', contentType);
    res.send(file.content);
  } catch (error) {
    console.error('Error serving downloadable file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function getContentType(filename) {
  const extension = filename.split('.').pop();
  switch (extension) {
    case 'txt':
      return 'text/plain; charset=utf-8';
    case 'pdf':
      return 'application/pdf';
    // Add more cases for other file types as needed
    default:
      return 'application/octet-stream';
  }
}




module.exports = router;
