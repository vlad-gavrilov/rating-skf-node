const User = require('../models/user');

module.exports = async (req, res, next) => {
  if (!req.session.userId) {
    return next();
  }

  req.user = {};
  req.user.id = req.session.userId;

  const info = await User.getDescription(req.user.id);

  req.user.last_name = info.last_name;
  req.user.first_name = info.first_name;
  req.user.patronymic = info.patronymic;
  req.user.coefficient = info.coefficient;
  req.user.avatar = info.avatar;
  req.user.position = info.position;
  req.user.title = info.academic_title;
  req.user.degree = info.academic_degree;
  req.user.department = info.department;

  return next();
};
