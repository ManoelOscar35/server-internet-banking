const express = require("express");
const cors = require("cors");

require("dotenv").config();

let app = express();
app.use(express.json());

app.use(cors());

const AuthRegisterUserRoutes = require("./routes/AuthRegisterUserRoutes"); 
const LoginRoutes = require("./routes/LoginRoutes");
const AccountsRoutes = require("./routes/AccountsRoutes");

app.use(AuthRegisterUserRoutes);
app.use(LoginRoutes);
app.use(AccountsRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});

require("./database/connection");