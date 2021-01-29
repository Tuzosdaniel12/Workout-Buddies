const router = require("express").Router();
const resetPassword = require("../controllers/resetPassword.js");

//activate account
router.put("/api/reset-password", resetPassword);

module.exports = router;
