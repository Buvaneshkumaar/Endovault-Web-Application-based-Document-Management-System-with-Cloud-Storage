const express = require('express');
const router = express.Router();
const CCsignup = require('../models/signup');

router.post('/activate-user', async (req, res) => {
  console.log('Received activation request:', req.body);

  try {
    const token = req.body.token;
    const user = await CCsignup.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired verification token' });
    }

    if (user.active) {
      return res.status(200).json({ message: 'Email already verified' });
    }

    const tokenExpirationTime = 24 * 60 * 60 * 1000; // 24 hours
    const currentTime = new Date().getTime();

    // Ensure that the user object and createdAt property exist
    if (user.createdAt && currentTime - user.createdAt.getTime() <= tokenExpirationTime) {
      // Update user's active status and clear verificationToken
      user.active = true;
      user.verificationToken = '';
      await user.save();

      console.log('User email verified successfully!');
      return res.status(200).json({ message: 'Email verified successfully' });
    } else {
      return res.status(400).json({ error: 'Verification token has expired' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
