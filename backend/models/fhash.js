// const mongoose = require('mongoose');

// const hfileSchema = new mongoose.Schema({
//   filename: String,
//   hash: String,
//   createdDate: { type: Date, default: Date.now },
//   size: Number,
//   userId: String,
//   fileID: String, 
//   content: { type: String, required: true },
// }, { collection: 'hfiles' });

// const HFile = mongoose.model('HFile', hfileSchema);
// module.exports = HFile;
// fhash.js
const mongoose = require('mongoose');

const hfileSchema = new mongoose.Schema({
  filename: String,
  createdDate: { type: Date, default: Date.now },
  size: Number,
  userId: String,
  fileID: String,
  hashedContent: { type: String, required: true }, // Store hashed content
  content: { type: String, required: true }, // Store original content
  extension: String, // Store file extension
}, { collection: 'hfiles' });

const HFile = mongoose.model('HFile', hfileSchema);
module.exports = HFile;
