const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const CCsignup = require('../models/signup');

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, pass } = req.body;

    // Check if the email exists in the database
    const userData = await CCsignup.findOne({ email });

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }


    if (!userData.active) {
      return res.status(401).json({ error: 'Email not verified yet' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(pass, userData.pass);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Successful login
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
