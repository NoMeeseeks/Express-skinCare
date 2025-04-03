const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { user } = require('../models'); // Assuming you have User model set up


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// [POST] /register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, birthday } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    // const existingUser = await User.findOne({ where: { email } });
    // if (existingUser) {
    //   return res.status(400).json({ error: 'Email already in use' });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
      birthday
    });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        birthday: newUser.birthday
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// [POST] /login 
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const foundUser = await user.findOne({ where: { email } });
    if (!foundUser) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: foundUser.id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        birthday: foundUser.birthday
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Email and new password are required' });
    }

    // Use the SAME CASE as your import
    const userRecord = await user.findOne({ where: { email } }); // or User.findOne()
    if (!userRecord) {
      return res.json({ message: 'If the email exists, password has been reset' });
    }

    await userRecord.update({
      password: await bcrypt.hash(newPassword, 10)
    });

    res.json({ message: 'Password updated successfully' });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ 
      error: 'Server error during password reset',
      detailedError: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;