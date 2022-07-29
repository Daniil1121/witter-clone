import { body } from "express-validator";

export const registerValidations = [
  body("email", "Введите E-mail")
    .isEmail()
    .withMessage("Некорректный E-mail")
    .isLength({
      min: 8,
      max: 40,
    })
    .withMessage(
      "E-mail некорректной длины. Допустимая длина E-mail от 8 до 40 символов"
    ),
  body("fullname", "Введите имя")
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage(
      "Имя некорректной длины. Допустимая длина имени от 2 до 40 символов"
    ),
  body("username", "Введите логин")
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage(
      "Логин некорректной длины. Допустимая длина логина имени от 2 до 40 символов"
    ),
  body("password", "Введите пароль")
    .isString()
    .isLength({
      min: 6,
      max: 40,
    })
    .withMessage(
      "Пароль некорректной длины. Допустимая длина пароля имени от 6 до 40 символов"
    )
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error("Пароли не совпадают");
      } else {
        return value;
      }
    }),
];
