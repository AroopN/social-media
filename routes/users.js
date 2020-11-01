const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
let User = require("../schemas/User");
const authentication = require("../middleware/authentication");

router.get("/", authentication, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

router.post(
  "/register",
  [
    check("firstName", "Name is empty").not().isEmpty(),
    check("lastName", "Last Name is empty").not().isEmpty(),
    check("userName", "User Name is empty").not().isEmpty(),
    check("email", "Email is invalid").isEmail(),
    check("password", "Password should be minimum 6 latters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      let { firstName, lastName, userName, email, password } = req.body;
      const user_email = await User.findOne({ email }).select("-password");
      if (user_email) {
        return res.status(401).send("Email has already been used.");
      }
      const user_username = await User.findOne({ userName }).select(
        "-password"
      );
      if (user_username) {
        return res.status(401).send("User Name already in use.");
      }
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const avatar = gravatar.url(email, {
        r: "pg",
        d: "mm",
        s: "200",
      });
      let newUser = new User({
        firstName,
        lastName,
        userName,
        email,
        password,
        avatar,
      });
      const salt = await bcryptjs.genSalt(10);
      let hashedPassword = await bcryptjs.hash(password, salt);
      newUser.password = hashedPassword;
      await newUser.save();
      const payload = {
        user: {
          id: newUser._id,
        },
      };
      jwt.sign(
        payload,
        config.get("jsonWebTokenSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //   res.send(`User ${userName} was created..`);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Email is invalid").isEmail(),
    check("password", "Password should be minimum 6 latters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      let { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send("No users linked with the email");
      }
      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json("Passwords don't match");
      }
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        config.get("jsonWebTokenSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
