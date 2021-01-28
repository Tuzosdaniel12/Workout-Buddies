const router = require("express").Router();
const forgotPassword = require("../controllers/forgotPasswordController.js");

//activate account
router.post("/api/forgot-password", forgotPassword);

module.exports = router;
