const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const CCsignup = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    regnum: { type: Number, required: true },
    pass: { type: String, required: true },
    active: { type: Boolean, default: false },
    verificationToken: { type: String },
    userId:{type:String},
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'signup' }
);
 CCsignup.pre('save', function (next) {
  if (this.pass && this.isModified('pass')) {
    bcrypt.hash(this.pass, 10, (err, hashed) => {
      if (err) return next(err);
      this.pass = hashed;
      next();
    });
  } else {
    next();
  }
});

CCsignup.methods.checkpass = function (pass, cb) {
  bcrypt.compare(pass, this.pass, (err, result) => {
    return cb(err, result);
  });
};
CCsignup.index({ email: 1, regnum: 1,pass:1 }, { unique: true });
const Userdetails = mongoose.model("Signup", CCsignup);
module.exports = Userdetails;
