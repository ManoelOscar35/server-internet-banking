const mongoose = require("mongoose");

const Accounts = mongoose.model("Accounts", {
  user: {
    title: String,
    accounts: {
      email: String,
      nameClient: String,
      cpf: String,
      agency: String,
      account: String,
      password: String
      
    },
  },
});

module.exports = Accounts;