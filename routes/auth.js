const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

//create an user route
router.post("/", authController.authUser);

router.get("/", auth, authController.authenticatedUser);

module.exports = router;
