const express = require('express');
const { createBrotliCompress } = require('zlib');
const stream = require('stream');
const fileUpload = require('express-fileupload');

const router = express.Router();

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

// Use express-fileupload middleware
router.use(fileUpload());

router.post('/compress', async (req, res) => {
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

    // Determine the file extension
    const fileExtension = file.name.split('.').pop().toLowerCase();

    // Set the filename in the Content-Disposition header with the correct file extension
    res.setHeader('Content-Disposition', `attachment; filename=${file.name.replace(/\.[^/.]+$/, "")}.${fileExtension}`);
    res.setHeader('Content-Type', file.mimetype); // Set the original file type

    // Use Brotli compression for all file types
    const compressedStream = createBrotliCompress();
    compressedStream.pipe(res);

    // Create a readable stream for the file data
    const readStream = new stream.PassThrough();
    readStream.end(file.data);
    readStream.pipe(compressedStream);

    console.log("Compression done and sent!");
  } catch (error) {
    console.error('Error compressing file', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;