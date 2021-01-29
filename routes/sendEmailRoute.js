const router = require("express").Router();
const sendCodeEmail = require("../controllers/sendCodeController.js");

//activate account
router.post("/api/send-email", sendCodeEmail);

module.exports = router;
