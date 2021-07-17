const express = require('express');
const { validationResult } = require('express-validator');
const { validatorsForEditingOfRating } = require('../utils/validators');

const Rating = require('../models/rating');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
  const rating = {};
  rating.coefficient = await User.getCoefficient(req.user.id);

  rating.data = await Rating.getRating(req.user.id);
  rating.data = JSON.parse(rating.data);

  rating.sumOD = Object.values(rating.data.OD).reduce((a, b) => a + b, 0);
  rating.sumOP = Object.values(rating.data.OP).reduce((a, b) => a + b, 0);
  rating.sumND = Object.values(rating.data.ND).reduce((a, b) => a + b, 0);
  rating.sumNP = Object.values(rating.data.NP).reduce((a, b) => a + b, 0);
  rating.sumR = Object.values(rating.data.R).reduce((a, b) => a + b, 0);
  rating.sumAll = rating.sumOD + rating.sumOP + rating.sumND + rating.sumNP + rating.sumR;
  rating.finalValueOfRating = rating.sumAll * rating.coefficient;

  res.render('rating/index', {
    title: 'Рейтинг',
    user: req.user,
    rating,
  });
});

router.get('/edit', async (req, res) => {
  const rating = {};

  if (req.session.rating) {
    rating.data = req.session.rating;
  } else {
    rating.data = await Rating.getRating(req.user.id);
  }

  rating.data = JSON.parse(rating.data);

  res.render('rating/edit', {
    title: 'Редактировать рейтинг',
    editError: req.flash('editError'),
    editSuccess: req.flash('editSuccess'),
    user: req.user,
    rating,
  });
});

router.post('/edit', validatorsForEditingOfRating, async (req, res) => {
  const rawRating = req.body;
  const preparedRating = JSON.stringify({
    OD: {
      1: rawRating.OD_1,
      2: rawRating.OD_2,
      3: rawRating.OD_3,
      4: rawRating.OD_4,
      5: rawRating.OD_5,
      6: rawRating.OD_6,
      7: rawRating.OD_7,
      8: rawRating.OD_8,
      9: rawRating.OD_9,
      10: rawRating.OD_10,
    },
    OP: {
      1: rawRating.OP_1,
      2: rawRating.OP_2,
      3: rawRating.OP_3,
      4: rawRating.OP_4,
      5: rawRating.OD_5,
    },
    ND: {
      1: rawRating.ND_1,
    },
    NP: {
      1: rawRating.NP_1,
      2: rawRating.NP_2,
      3: rawRating.NP_3,
      4: rawRating.NP_4,
      5: rawRating.NP_5,
      6: rawRating.NP_6,
      7: rawRating.NP_7,
      8: rawRating.NP_8,
      9: rawRating.NP_9,
    },
    R: {
      1: rawRating.R_1,
      2: rawRating.R_2,
      3: rawRating.R_3,
    },
  });

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('editError', errors.array()[0].msg);
    req.session.rating = preparedRating;
    return res.status(422).redirect('/rating/edit');
  }

  try {
    delete req.session.rating;
    const userData = {};
    userData.id = req.user.id;
    userData.rating = preparedRating;

    await Rating.setRating(userData);

    req.flash('editSuccess', 'Рейтинг успешно изменен');
    return res.redirect('/rating/edit');
  } catch (e) {
    console.log(e);
    throw e;
  }
});

router.get('/reset', (req, res) => {
  delete req.session.rating;
  return res.redirect('/rating/edit');
});

module.exports = router;
