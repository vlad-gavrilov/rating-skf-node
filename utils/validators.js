const { body } = require('express-validator');

exports.validatorsForRegistration = [
  body('last_name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Фамилия должна содержать минимум 2 символа')
    .isLength({ max: 50 })
    .withMessage('Фамилия слишком длинная')
    .isAlpha('ru-RU')
    .withMessage('Фамилия должна содержать только кириллические буквы')
    .escape()
    .customSanitizer((value) => value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()),
  body('first_name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Имя должно содержать минимум 2 символа')
    .isLength({ max: 50 })
    .withMessage('Имя слишком длинное')
    .isAlpha('ru-RU')
    .withMessage('Имя должно содержать только кириллические буквы')
    .escape()
    .customSanitizer((value) => value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()),
  body('patronymic')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Отчество слишком длинное')
    .isAlpha('ru-RU')
    .withMessage('Отчество должно содержать только кириллические буквы')
    .escape()
    .customSanitizer((value) => value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()),

  body('position')
    .isInt({ min: 1, max: 7 })
    .withMessage('Введите корректную должность')
    .toInt(),
  body('academic_degree')
    .isInt({ min: 1, max: 6 })
    .withMessage('Введите корректную ученую степень')
    .toInt(),
  body('academic_title')
    .isInt({ min: 1, max: 2 })
    .withMessage('Введите корректное ученое звание')
    .toInt(),
  body('department')
    .isInt({ min: 1, max: 4 })
    .withMessage('Введите корректную кафедру')
    .toInt(),

  body('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Введите корректный email'),
  body('password')
    .isLength({ min: 6, max: 32 })
    .withMessage('Длина пароля должна быть не менее 6 символов')
    .isAscii()
    .withMessage('Недопустимые символы в пароле'),
  body('passwordAgain')
    .custom((value, { req }) => req.body.password === value)
    .withMessage('Введенные пароли не совпадают'),
];

exports.validatorsForEditingOfUser = [
  body('last_name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Фамилия должна содержать минимум 2 символа')
    .isLength({ max: 50 })
    .withMessage('Фамилия слишком длинная')
    .isAlpha('ru-RU')
    .withMessage('Фамилия должна содержать только кириллические буквы')
    .escape()
    .customSanitizer((value) => value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()),
  body('first_name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Имя должно содержать минимум 2 символа')
    .isLength({ max: 50 })
    .withMessage('Имя слишком длинное')
    .isAlpha('ru-RU')
    .withMessage('Имя должно содержать только кириллические буквы')
    .escape()
    .customSanitizer((value) => value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()),
  body('patronymic')
    .trim()
    .isLength({ max: 50 })
    .withMessage('Отчество слишком длинное')
    .isAlpha('ru-RU')
    .withMessage('Отчество должно содержать только кириллические буквы')
    .escape()
    .customSanitizer((value) => value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()),

  body('position')
    .isInt({ min: 1, max: 7 })
    .withMessage('Введите корректную должность')
    .toInt(),
  body('academic_degree')
    .isInt({ min: 1, max: 6 })
    .withMessage('Введите корректную ученую степень')
    .toInt(),
  body('academic_title')
    .isInt({ min: 1, max: 2 })
    .withMessage('Введите корректное ученое звание')
    .toInt(),
  body('coefficient')
    .isInt({ min: 1, max: 4 })
    .withMessage('Введите корректный коэффициент')
    .toInt(),
  body('department')
    .isInt({ min: 1, max: 4 })
    .withMessage('Введите корректную кафедру')
    .toInt(),
  body('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Введите корректный email'),
];

exports.validatorsForEditingOfPassword = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Длина пароля должна быть не менее 6 символов')
    .isLength({ max: 32 })
    .withMessage('Длина пароля должна быть не более 32 символов')
    .isAscii()
    .withMessage('Недопустимые символы в пароле'),
  body('passwordAgain')
    .custom((value, { req }) => req.body.password === value).withMessage('Введенные пароли не совпадают'),
];

const fieldsOfRating = [];
for (let i = 1; i <= 10; i += 1) {
  fieldsOfRating.push(`OD_${i}`);
}
for (let i = 1; i <= 5; i += 1) {
  fieldsOfRating.push(`OP_${i}`);
}
for (let i = 1; i <= 9; i += 1) {
  fieldsOfRating.push(`NP_${i}`);
}
for (let i = 1; i <= 3; i += 1) {
  fieldsOfRating.push(`R_${i}`);
}
fieldsOfRating.push('ND_1');

exports.validatorsForEditingOfRating = [
  body(fieldsOfRating)
    .isInt({ min: 0, max: 100 })
    .withMessage('Должно быть введено число в диапазоне от 0 до 100')
    .toInt(),
];

/*
TODO email is in use (both cases)
.bail()
*/
