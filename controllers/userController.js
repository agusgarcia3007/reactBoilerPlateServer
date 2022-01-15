const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  //check if there is any error
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    //validate if user is available
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: "user already exists" });

    //create new user
    user = new User(req.body);

    //hash data
    const salt = await bcryptjs.genSalt(6);
    user.password = await bcryptjs.hash(password, salt);

    //save user
    await user.save();

    //create and sign jwt for auth
    const foo = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      foo,
      process.env.SECRET,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(218).send("fatal error");
  }
};
