const User = require('../models/user')

module.exports = async function(req, res, next) {
  if (!req.session.userId) {
    return next();
  }

  req.user = {};
  req.user.id = req.session.userId;
  const info = await User.getAllInformation(req.user.id);

  req.user.last_name = info.last_name;
  req.user.first_name = info.first_name;
  req.user.patronymic = info.patronymic;
  req.user.coefficient = info.coefficient;
  req.user.avatar = info.avatar;

  req.user.position = await User.getPosition(info.position);
  req.user.title = await User.getTitle(info.academic_title);
  req.user.degree = await User.getDegree(info.academic_degree);
  req.user.department = await User.getDepartment(info.department);

  next();
}