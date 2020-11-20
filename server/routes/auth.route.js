const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const router = Router();

router.post('/registr', async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidat = await User.findOne({ email: email });
    
    if (candidat) {
      res.status(400).json({ message: 'Такой пользователь уже существует' });
    }
    
    //const hashPassword = await bcrypt.hash(password).then((res) => {console.log(res)});
    const user = new User({ email: email, password: password });
    await user.save();
    res.status(201).json({ message: 'Пользоватль успешно создан' });

  } catch (e) {
    res.status(500).json({ message: 'что-то пошло не так' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    console.log(user)

    if(!user) {
      res.status(400).json({ message: 'Пользователя с таким Email не сущестует' });
    }

    //const isMatch = await bcrypt.compare(password, user.password);

    const isMatch = password === user.password;

    if(!isMatch) {
      res.status(400).json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.status(200).json({ userId: user.id, isAuthorized: true, token });

  } catch (e) {
    res.status(500).json({ message: 'что-то пошло не так' });
  }
});

module.exports = router;