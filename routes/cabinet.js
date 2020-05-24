const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/', async (req, res) => {
  let user = {};

  const info = await User.getAllInformation(req.user.id);

  user.last_name = info.last_name;
  user.first_name = info.first_name;
  user.patronymic = info.patronymic;
  user.coefficient = info.coefficient;

  user.position = await User.getPosition(info.position);
  user.title = await User.getTitle(info.academic_title);
  user.degree = await User.getDegree(info.academic_degree);
  user.department = await User.getDepartment(info.department);

  res.render('cabinet/index', {
    title: 'Личный кабинет',
    user
  });
});

router.route('/edit')
  .get(async (req, res) => {
    let user = await User.getAllInformation(req.user.id);
    user.email = await User.getEmail(req.user.id);
    res.render('cabinet/edit', {
      title: 'Редактировать',
      user
    });
  })
  .post(async (req, res) => {
    try {
      let userData = req.body;
      delete userData.submit;
      userData.id = req.user.id;
      await User.saveUserData(userData);
      res.redirect('/edit');
    } catch (e) {
      console.log(e);
    }
  });

router.get('/edit/password', (req, res) => {
  res.render('cabinet/password', {
    title: 'Изменить пароль',
    success: req.flash('successEdit'),
    error: req.flash('errorEdit')
  });
});

router.post('/edit/password', async (req, res) => {
  try {
    if (req.body.password === req.body.passwordAgain) {
      let userData = {};
      userData.id = req.user.id;
      userData.password = await bcrypt.hash(req.body.password, 10);
      await User.setPassword(userData);
      req.flash('successEdit', 'Пароль успешно изменен');
    } else {
      req.flash('errorEdit', 'Введенные пароли не совпадают');
    }
    res.redirect('/edit/password');
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;