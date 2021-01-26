const router = require("express").Router();
const validateAccountControllers = require("../controllers/validateAccoutController.js");

//activate account
router.put("/api/activate/:key", validateAccountControllers);

module.exports = router;
