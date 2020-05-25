const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const { validatorsForEditingOfUser, validatorsForEditingOfPassword } = require('../utils/validators');

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
      editError: req.flash('editError'),
      editSuccess: req.flash('editSuccess'),
      user
    });
  })
  .post(validatorsForEditingOfUser, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash('editError', errors.array()[0].msg);
      return res.status(422).redirect('/edit');
    }

    try {
      req.body.id = req.user.id;
      await User.saveUserData(req.body);
      req.flash('editSuccess', 'Данные успешно изменены!');
      res.redirect('/edit');
    } catch (e) {
      console.log(e);
    }
  });

router.route('/edit/password')
  .get((req, res) => {
    res.render('cabinet/password', {
      title: 'Изменить пароль',
      editError: req.flash('editError'),
      editSuccess: req.flash('editSuccess'),
    });
  })
  .post(validatorsForEditingOfPassword, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.flash('editError', errors.array()[0].msg);
      return res.status(422).redirect('/edit/password');
    }

    try {
      let userData = {};
      userData.id = req.user.id;
      userData.password = await bcrypt.hash(req.body.password, 10);
      await User.setPassword(userData);
      req.flash('editSuccess', 'Пароль успешно изменен');
      res.redirect('/edit/password');
    } catch (e) {
      console.log(e);
    }
  });

module.exports = router;