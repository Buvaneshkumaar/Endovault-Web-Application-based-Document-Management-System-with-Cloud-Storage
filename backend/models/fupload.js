const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  urd: {
    type: String,  
  },
  filename: {
    type: String,
  },
  domain: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  uploadTime: {
    type: String, // Assuming you want to store time as a string, modify as needed
  },
  contentType: {
    type: String
  },
  fileData: {
    type: Buffer
  },
  fileSize: {
    type: Number
  },
  fileExtension: {
    type: String
  },
  descrip: {
    type: String,
    required: true
  }
 
});

function generateRandomCode(length) {
    const prefix = 'STD';
    const numbers = '0123456789';
    let randomNumbers = '';

    // Generate four random numbers
    for (let i = 0; i < 4; i++) {
        randomNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomChars = '';

    // Generate random characters with the given length
    for (let i = 0; i < length - 4; i++) {
        randomChars += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Combine prefix, random numbers, and random characters
    return prefix + randomNumbers + randomChars;
}

fileSchema.pre('save', function(next) {
  this.code = generateRandomCode(10); 
  next();
});

const File = mongoose.model('File', fileSchema,'Documents');

module.exports = File;
