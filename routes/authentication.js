const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { validatorsForRegistration } = require('../utils/validators');
const User = require('../models/user');

router.get('/login', (req, res) => {
  res.render('authentication/login', {
    layout: 'login',
    title: 'Вход в личный кабинет',
    loginError: req.flash('loginError'),
    successfulRegistration: req.flash('successfulRegistration'),
    loginEmail: req.session.loginEmail,
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userData = await User.getUserByEmail(email);

  if (userData && await bcrypt.compare(password, userData.password)) {
    req.session.userId = userData.teacher_id;
    req.session.isAuthenticated = true;
    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect('/');
    });
  } else {
    req.flash('loginError', 'Неверные данные для входа на сайт');
    req.session.loginEmail = req.body.email;
    return res.status(422).redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

router.get('/register', (req, res) => {
  res.render('authentication/register', {
    layout: 'login',
    title: 'Регистрация',
    errorLength: req.flash('errorLength'),
    errorLastname: req.flash('errorLastname'),
    registerError: req.flash('registerError'),
    data: req.session.userData,
  });
});

router.post('/register', validatorsForRegistration, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('registerError', errors.array()[0].msg);
    req.session.userData = req.body;
    return res.status(422).redirect('/register');
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  try {
    await User.createUser(req.body);
    req.flash('successfulRegistration', 'Регистрация прошла успешно');
    res.redirect('/login');
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;