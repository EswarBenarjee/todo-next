const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const User = require("../../models/Users");

const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   GET api/auth
// @desc    Get details
// @access  Public
router.get("/", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-encry_password")
    .then((user) => res.json({ user }))
    .catch((err) => {
      res.status(500).json({ errors: err.message });
    });
});

// @route   POST api/auth
// @desc    Log in
// @access  Public
router.post(
  "/",
  [
    check("username", "Invalid Credentials").exists(),
    check("password", "Invalid Credentials").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check if user exists
    User.findOne({ username })
      .then((userFetched) => {
        if (!userFetched)
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentails" }] });

        if (userFetched.authenticate(password)) {
          const payload = {
            user: {
              id: userFetched.id,
            },
          };

          jwt.sign(
            payload,
            config.get("secret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err)
                return res
                  .status(500)
                  .json({ errors: [{ msg: "Token is not generated" }] });
              return res.json({ token: token });
            }
          );
        } else {
          return res
            .status(500)
            .json({ errors: [{ msg: "Invalid credentails" }] });
        }
      })
      .catch((err) => {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
      });
  }
);

module.exports = router;
