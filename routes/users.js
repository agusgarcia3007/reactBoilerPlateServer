const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/userController");

//create an user route
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is not valid").isEmail(),
    check("password", "Use 6 or more characters").isLength({ min: 6 }),
  ],
  userController.createUser
);

module.exports = router;
