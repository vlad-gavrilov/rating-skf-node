const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const {
  validatorsForEditingOfUser,
  validatorsForEditingOfPassword,
} = require('../utils/validators');

const router = express.Router();

router.get('/', async (req, res) => {
  const { user } = req;

  res.render('cabinet/index', {
    title: 'Личный кабинет',
    user,
  });
});

router.route('/edit')
  .get(async (req, res) => {
    const user = await User.getAllInformation(req.user.id);
    user.email = await User.getEmail(req.user.id);
    res.render('cabinet/edit', {
      title: 'Редактировать',
      editError: req.flash('editError'),
      editSuccess: req.flash('editSuccess'),
      user,
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
      return res.redirect('/edit');
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

router.route('/edit/password')
  .get((req, res) => {
    res.render('cabinet/password', {
      title: 'Изменить пароль',
      user: req.user,
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
      const userData = {};
      userData.id = req.user.id;
      userData.password = await bcrypt.hash(req.body.password, 10);
      await User.setPassword(userData);
      req.flash('editSuccess', 'Пароль успешно изменен');
      return res.redirect('/edit/password');
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

router.route('/edit/photo')
  .get((req, res) => {
    res.render('cabinet/photo', {
      title: 'Изменить фотографию',
      // editError: req.flash('editError'),
      editSuccess: req.flash('editSuccess'),
      avatar: req.user.avatar,
      user: req.user,
    });
  })
  .post(async (req, res) => {
    try {
      User.updatePhoto(req.user.id, req.file.filename);
      req.flash('editSuccess', 'Фото успешно изменено');
      res.redirect('/edit/photo');
    } catch (e) {
      console.log(e);
    }
  });

module.exports = router;
