const Accounts = require("../models/Accounts");
const bcrypt = require("bcrypt");

module.exports = class AccountsController {
  static async registerAccounts(req, res) {
    const { email, nameClient, cpf, agency, account, password } = req.body.user.accounts;

    const user = req.body.user.title;

    if (!email) {
        return res
          .status(422)
          .json({ message: "O email é obrigatório!" });
      }

    if (!nameClient) {
      return res
        .status(422)
        .json({ message: "O nome do cliente é obrigatório!" });
    }

    if (!cpf) {
      return res.status(422).json({ message: "O cpf é obrigatório!" });
    }

    if (!agency) {
      return res
        .status(422)
        .json({ message: "A agência é obrigatória!" });
    }

    if (!account) {
        return res
          .status(422)
          .json({ message: "A conta é obrigatória!" });
    }

    if (!password) {
        return res
          .status(422)
          .json({ message: "A senha é obrigatória!" });
      }

    const hash = await bcrypt.genSalt(12);

    const passwordHash = await bcrypt.hash(password, hash);

    const accounts = new Accounts({
        user: {
            title: user,
            accounts: {
              email,
              nameClient,
              cpf,
              agency,
              account,
              password: passwordHash
              
            },
          },
    });

    try {
      await accounts.save();
      res
        .status(201)
        .json({ message: "Cadastro da conta foi realizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao cadastrar a conta!" });
    }
  }

  static async listAccounts(req, res) {
    Accounts.find({}).then((list) => {

    let {user} = req.headers;

    const newArray = list.map((el) => {
        return {
            user: {
                title: user,
                accounts: {
                  _id: el._id.toString(),
                  email: el.user.accounts.email,
                  nameClient: el.user.accounts.nameClient,
                  cpf: el.user.accounts.cpf,
                  agency: el.user.accounts.agency,
                  account: el.user.accounts.account,
                  password: el.user.accounts.password
                  
                },
              },
            };
        });

      let result = newArray;

      res.status(200).json({ result });
      
    });
  }

  /*
  static async updateAccounts(req, res) {
    try {
      const id = req.params.id;
      const user = await Accounts.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar conta!" });
    }
  }

  static async deleteAccounts(req, res) {
    try {
      const id = req.params.id;
      const deleteAccounts = await Accounts.findByIdAndDelete(id);

      if (deleteAccounts) {
        res
          .status(200)
          .json({ messagem: "A conta foi excluída com sucesso!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir a conta!" });
    }
  }*/
}
