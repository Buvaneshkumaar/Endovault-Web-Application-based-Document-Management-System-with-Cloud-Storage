const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const Grid = require('gridfs-stream');
const zlib = require('zlib');
const { createBrotliCompress } = require('zlib');
const multer = require('multer');
const crypto = require('crypto');
const forge = require('node-forge');
const stream = require('stream');
const mammoth=require('mammoth');
const stopwords = require('stopwords').english;
const fs = require('fs');
const path = require('path');

const app = express();
// app.use(fileUpload());




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

multer().single('file');

mongoose.set('strictQuery', 'true');
let gfs;

mongoose.connect("mongodb+srv://sihworks001:schlenkians@cluster0.fbg8aof.mongodb.net/endovault?retryWrites=true&w=majority&appName=AtlasApp", { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("Database gets connected");
  gfs = Grid(connection.db, mongoose.mongo);
  // gfs.collection('Documents');
  console.log('GridFS is ready');
});



const PORT = process.env.PORT || 8080;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

// const RSA_PUBLIC_KEY = `
// -----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvpG3s2nHh0yK8OmFUYWZ
// MF+aDtKf0Ei/0i9t0Xo2kw/7VfIhqjN/MG8p3ANoSY2qNz93Ssf0Kw6GyUP9pmwF
// XblyS8rY8fl1Oxlq+XDSjO4s+U6t/2WwDpRqJArU/KUt61y3A6LJgdZaX5iFz5jl
// 4VRz/B/3ouY9X7/9hC6HKUJssu9rhFrLlL5PIRVlfYvNjy0u8jOaVTNGDF5HV3A7
// rg8YLG4F7fs8lcM2v55BW3K2O/2LlSyOk6lDsfgI+JAvxWV+nExZJ8pNnygEnVsI
// uDfbJl76fFTT5rLnpV6oOzHmN0CLHEaQr3/FRb7dbzMIhBwTbZgV4bxEJ+wfylUe
// iQIDAQAB
// -----END PUBLIC KEY-----
// `;

//FREQUENCY - EXTRACTION

app.post('/processfile', upload.single('file'), (req, res) => {
  console.log("enters into the server");

  const fileBuffer = req.file.buffer;
  const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

  let words = [];

  if (fileExtension === 'txt') {
    // Process .txt file
    const fileContent = fileBuffer.toString('utf-8');
    words = fileContent.toLowerCase().match(/\b[a-z]+\b/g);
  } else if (fileExtension === 'docx') {
    // Import mammoth here
    mammoth.extractRawText({ arrayBuffer: fileBuffer })
      .then(result => {
        const docxContent = result.value;
        words = docxContent.toLowerCase().match(/\b[a-z]+\b/g);

        console.log(words);

        // Process words and send the response
        processWordsAndRespond(words, res);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error processing .docx file');
      });
  } else {
    res.status(400).send('Unsupported file format. Only .txt and .docx are supported.');
    return; // exit the function for unsupported file types
  }

  // Process words and send the response
  processWordsAndRespond(words, res);
});

// Common function to process words and send the response

function processWordsAndRespond(words, res) {
  if (!words) {
    res.status(500).send('Error extracting words from the file.');
    return;
  }

  const wordCounts = {};

  // Filter out stopwords
  const filteredWords = words.filter(word => !stopwords.includes(word));

  for (const word of filteredWords) {
    if (!wordCounts[word]) {
      wordCounts[word] = 0;
    }
    wordCounts[word]++;
  }

  const sortedWordCounts = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
  const topWords = sortedWordCounts.slice(0, 10);

  const result = topWords.reduce((result, [word, count]) => {
    result[word] = count;
    return result;
  }, {});

  console.log(result); // Log the result to the console

  res.json(result);
}

//chat based functionality
app.post('/upload-document', upload.single('document'), (req, res) => {
  const document = req.file;

  if (document) {
    fs.writeFileSync(path.join(__dirname, 'uploaded-document.txt'), document.buffer.toString());
    res.json({ success: true, message: 'Document uploaded successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid document data' });
  }
});

app.post('/ask-question', (req, res) => {
  const { question } = req.body;

  if (question) {
    const documentContent = fs.readFileSync(path.join(__dirname, 'uploaded-document.txt'), 'utf-8');
    const answer = searchDocument(question, documentContent);
    res.json({ answer });
  } else {
    res.status(400).json({ answer: 'Invalid question' });
  }
});

function searchDocument(question, documentContent) {
  const index = documentContent.indexOf(question);
  if (index !== -1) {
    return documentContent.substring(index, index + 100);
  } else {
    return 'Answer not found';
  }
}








const cloudroute = require('./routes/mroute');
const cloudverify = require('./routes/mverify');
const fupload = require('./routes/uploadroute');
const hashfile = require('./routes/hashstore');
const Siupload=require('./routes/supload');
const EncryRouter = require('./routes/encryfile');
const Redata=require('./routes/reportroute');
const Comp=require('./routes/comproute');
const log=require('./routes/auth');
// Use the middleware directly without specifying a route

app.use('/Endosignup', cloudroute);
app.use('/Endoverify', cloudverify);
app.use('/Endovault', fupload);
app.use('/Endohash', hashfile);
app.use('/Simupload',Siupload);
app.use('/Endo', EncryRouter);
app.use('/Repo',Redata);
app.use('/Endocompress',Comp);
app.use('/Endoauth',log);




app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));