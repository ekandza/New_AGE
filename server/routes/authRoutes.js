const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, 'secret_key');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Register new user
router.post('/register', async (req, res) => {
  const { login, password, email, photo } = req.body;
  try {
    const newUser = new User({ login, password, email, photo });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ login });
    if (!user) return res.status(401).json({ message: 'Invalid login or password' });

    const validPassword = await user.comparePassword(password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid login or password' });

    const token = jwt.sign({ _id: user._id }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout user
router.post('/logout', authenticateToken, (req, res) => {
  // To "logout" the user, we can simply remove the token on the client-side.
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
