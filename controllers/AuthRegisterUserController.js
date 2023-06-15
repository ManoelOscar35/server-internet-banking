const User = require("../models/User");

const bcrypt = require("bcrypt");

module.exports = class AuthRegisterUserController {
  static async init(req, res) {
    res.send({ message: "Bem vindo a nossa API!" });
  }

  static async registerUser(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "O email é obrigatório!" });
    }

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatório!" });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(422)
        .json({ message: "Já existe uma conta com esse e-mail!" });
    }

    const hash = await bcrypt.genSalt(12);

    const passwordHash = await bcrypt.hash(password, hash);

    const user = new User({
      email,
      password: passwordHash,
    });

    try {
      await user.save();
      res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso!", user });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Ocorreu um erro ao cadastrar o usuário, tente mais tarde!",
        });
    }
  
  }
};
