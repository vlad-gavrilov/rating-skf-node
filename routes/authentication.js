const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/login', (req, res) => {
  res.render('authentication/login', {
    layout: 'login',
    title: 'Вход в личный кабинет',
    loginError: req.flash('loginError'),
    successfulRegistration: req.flash('successfulRegistration'),
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.getUserByEmail(email);
  if (userData) {
    if (await bcrypt.compare(password, userData.password)) {
      req.session.userId = userData.teacher_id;
      req.session.isAuthenticated = true;
      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect('/');
      });
    } else {
      // Неверный пароль
      req.flash('loginError', 'Неверные данные для входа на сайт');
      res.redirect('/login');
    }
  } else {
    // Несуществующий в БД email
    req.flash('loginError', 'Неверные данные для входа на сайт');
    res.redirect('/login');
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
  });
});

router.post('/register', async (req, res) => {
  const newUser = {};

  newUser.last_name = req.body.last_name;
  newUser.first_name = req.body.first_name;
  newUser.patronymic = req.body.patronymic;
  newUser.email = req.body.email;
  newUser.position = Number(req.body.position);
  newUser.academic_degree = Number(req.body.academic_degree);
  newUser.academic_title = Number(req.body.academic_title);
  newUser.department = Number(req.body.department);
  // newUser.password = req.body.password;
  newUser.password = await bcrypt.hash(req.body.password, 10);

  var errors = false;

  if (req.body.password.length < 6) {
    req.flash('errorLength', 'Пароль должен быть не менее 6 символов');
    errors = true;
  }

  if (!newUser.last_name) {
    req.flash('errorLastname', 'Введите фамилию');
    errors = true;
  }

  if (errors) {
    res.redirect('/register');
  } else {
    try {
      await User.createUser(newUser);
      req.flash('successfulRegistration', 'Регистрация прошла успешно');
      res.redirect('/login');
    } catch (e) {
      console.log(e);
    }
  }
});

module.exports = router;