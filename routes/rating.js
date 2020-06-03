const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');
const User = require('../models/user');

router.get('/', async (req, res) => {
  let rating = {};
  rating.coefficient = await User.getCoefficient(req.user.id);
  rating.OD = await Rating.getOD(req.user.id);
  delete rating.OD.teacher_id;
  rating.OP = await Rating.getOP(req.user.id);
  delete rating.OP.teacher_id;
  rating.ND = await Rating.getND(req.user.id);
  delete rating.ND.teacher_id;
  rating.NP = await Rating.getNP(req.user.id);
  delete rating.NP.teacher_id;
  rating.R = await Rating.getR(req.user.id);
  delete rating.R.teacher_id;

  rating.sumOD = Object.values(rating.OD).reduce((a, b) => a + b, 0);
  rating.sumOP = Object.values(rating.OP).reduce((a, b) => a + b, 0);
  rating.sumND = Object.values(rating.ND).reduce((a, b) => a + b, 0);
  rating.sumNP = Object.values(rating.NP).reduce((a, b) => a + b, 0);
  rating.sumR = Object.values(rating.R).reduce((a, b) => a + b, 0);
  rating.sumAll = rating.sumOD + rating.sumOP + rating.sumND + rating.sumNP + rating.sumR;
  rating.finalValueOfRating = rating.sumAll * rating.coefficient;

  res.render('rating/index', {
    title: 'Рейтинг',
    user: req.user,
    rating
  });
});

router.get('/edit', async (req, res) => {
  let rating = {};
  rating.coefficient = await User.getCoefficient(req.user.id);
  rating.OD = await Rating.getOD(req.user.id);
  delete rating.OD.teacher_id;
  rating.OP = await Rating.getOP(req.user.id);
  delete rating.OP.teacher_id;
  rating.ND = await Rating.getND(req.user.id);
  delete rating.ND.teacher_id;
  rating.NP = await Rating.getNP(req.user.id);
  delete rating.NP.teacher_id;
  rating.R = await Rating.getR(req.user.id);
  delete rating.R.teacher_id;

  res.render('rating/edit', {
    title: 'Редактировать рейтинг',
    user: req.user,
    rating
  });
});

router.post('/edit', (req, res) => {
});

module.exports = router;