// routes/usersRouter.js
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const upload = require('../upload');
const bcrypt = require('bcryptjs');




router.post('/users', upload.single('photo'), async (req, res) => {
  const { login, email, password } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const user = new User({ login, email, password, photo });
  await user.save();
  res.status(201).send(user);
});

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.put('/users/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { login, email, password } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).send({ message: 'Utilisateur non trouvé' });
  }

  user.login = login;
  user.email = email;
  user.password = password;
  if (photo) {
    user.photo = photo;
  }

  await user.save();
  res.send(user);
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(204).send();
});



// Route pour la racine de l'URL
router.get('/', (req, res) => {
  res.send('USER HOME');
});



 





module.exports = router;
