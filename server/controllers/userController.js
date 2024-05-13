const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validate } = require("validate.js");

const { User, Order, Feedback, Item } = require("../models/models");
const MailService = require("./service/mail/mailer.service");
const nodemailer = require("nodemailer");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async signup(req, res, next) {
    const { username, email, password, role } = req.body;

    const constraints = {
      username: {
        presence: true,
        length: {
          minimum: 4,
          maximum: 20,
        },
      },
      password: {
        presence: true,
        length: {
          minimum: 4,
          maximum: 20,
        },
      },
    };

    const validation = validate({ username, password }, constraints);
    if (validation) {
      // res.status(400).json({ error: validation });
      return next(ApiError.badRequest("Не корректный пароль или имя"));
    }

    if (!email || !password) {
      return next(ApiError.badRequest("Некорректная почта или пароль!"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует!")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      username,
      email,
      role,
      password: hashPassword,
    });
    const order = await Order.create({ userId: user.id });

    MailService.sendTestMail(user.email);

    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.notFound("Пользователь не найден("));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.forbidden("Неверный пароль("));
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest("Что-то пошло не так"));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      res.json({ token });
      
    } catch (e) {
      next(ApiError.forbidden('Ошибка проверки токена'))
    }
  }

  async addComment(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    try {
      const { description } = req.body;

      if (!description) {
        return next(ApiError.badRequest("Кажется, Вы забыли написать отзыв🙄"));
      }

      const comment = await Feedback.create({
        description,
        userId: decoded.id,
      });

      return res.json(comment);
    } catch (e) {
      next(
        ApiError.internalServerError(
          "Произошла ошибка при добавлении комментария",
          e
        )
      );
    }
  }
}

module.exports = new UserController();
