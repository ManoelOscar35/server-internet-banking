const router = require("express").Router();

const AccountsController = require("../controllers/AccountsController");

router.post("/auth/accounts", AccountsController.registerAccounts);
router.get("/list/accounts", AccountsController.listAccounts);
//router.put("/update/accounts/:id", AccountsController.updateAccounts);
//router.delete("/delete/accounts/:id", AccountsController.deleteAccounts);

module.exports = router;
