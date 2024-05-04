const express = require('express');
const router = express.Router();
const CCsignup = require('../models/signup');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'buvaneshkumaars_ai@mepcoeng.ac.in',
    pass: 'Buvi@123',
  },
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, regnum, pass } = req.body;
    console.log('Received signup request:', { name, email, regnum, pass });
    // const existingUser = await CCsignup.findOne({ email });

    const existingEmail = await CCsignup.findOne({ email });
    const existingRegnum = await CCsignup.findOne({ regnum });
    const existingPass = await CCsignup.findOne({ pass });

    // if (existingUser) {
    //   console.log("email already exists");
    //   // return res.status(400).json({ error: 'Email already exists' });

    // }
    if (existingEmail && existingRegnum && existingPass) {
      console.log('Email, Register Number, and Password already exist');
      return res.status(409).json({ error: 'Email, Register Number, and Password already exist' });
    } else if (existingEmail && existingRegnum) {
      console.log('Email and Register Number already exist');
      return res.status(409).json({ error: 'Email and Register Number already exist' });
    } else if (existingEmail && existingPass) {
      console.log('Email and Password already exist');
      return res.status(409).json({ error: 'Email and Password already exist' });
    } else if (existingRegnum && existingPass) {
      console.log('Register Number and Password already exist');
      return res.status(409).json({ error: 'Register Number and Password already exist' });
    } else if (existingEmail) {
      console.log('Email already exists');
      return res.status(409).json({ error: 'Email already exists' });
    } else if (existingRegnum) {
      console.log('Register Number already exists');
      return res.status(409).json({ error: 'Register Number already exists' });
    } else if (existingPass) {
      console.log('Password already exists');
      return res.status(409).json({ error: 'Password already exists' });
    }
    const userId = Math.floor(100 + Math.random() * 900);
    const token = crypto.randomBytes(20).toString('hex');
    const usersignup = new CCsignup({
      name,
      email,
      regnum,
      pass,
      active: false,
      verificationToken: token,
      userId,
      createdAt: new Date(), // Add the generated userId
    });

    await usersignup.save();
    console.log('User signup saved successfully:', usersignup);

    const mailOptions = {
      from: 'buvaneshkumaars_ai@mepcoeng.ac.in',
      to: email,
      subject: 'Email Verification',
      text: `Hello ${name}, your user ID is: ${userId}. Please click on the link to verify your email: http://localhost:3000/mailverify?token=${token}`,
    };

    await transporter.sendMail(mailOptions);

    console.log('Data saved and email also sent !!');
    res.status(201).json({ message: 'Data saved and email also sent !!' });
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    res.status(500).json({ error: 'Error sending verification email', details: emailError.message });
  }

});

module.exports = router;
