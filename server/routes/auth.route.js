const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const autoMiddleware = require('../middleware/autologin.middleware'); 
const { body, validationResult } = require('express-validator');

const router = Router();

router.post(
  '/registr',
  [
    body('email','Некорректный email').isEmail(),
    body('password','Минимальная длина пароля 3 символа').isLength({ min: 3 })
  ],
  async (req, res) => {
  try {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors[0].msg });
    }

    const { email, password } = req.body;
    const candidat = await User.findOne({ email: email });
    
    if (candidat) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' });
    }
    
    const hashPassword = await bcrypt.hash(password, 8);
    const user = new User({ email: email, password: hashPassword });
    await user.save();
    res.status(201).json({ message: 'Пользоватль успешно создан' });

  } catch (e) {
    res.status(500).json({ message: 'что-то пошло не так' });
  }
});

router.post(
  '/login',
  [
    body('email','Введите корректный email').isEmail().normalizeEmail(),
    body('password','Минимальная длина пароля 3 символа').isLength({ min: 3 })
  ], 
  async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors[0].msg });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
      res.status(400).json({ message: 'Пользователя с таким Email не сущестует' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if(!isMatch) {
      res.status(400).json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign(
      { userId: user._id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.status(200).json({ 
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (e) {
    res.status(500).json({ message: 'что-то пошло не так' });
  }
});

router.get('/autologin', autoMiddleware, async (req, res) => {
  try {

    const user = await User.findOne({_id: req.user.userId})

    const token = jwt.sign({userId: user._id}, config.get('jwtSecret'), {expiresIn: "1h"});

    res.status(200).json({ 
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (e) {
    res.status(500).json({ message: 'что-то пошло не так' });
  }
});

module.exports = router;