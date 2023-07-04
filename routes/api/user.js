const express = require("express");
const router = express.Router();

const User = require("../../models/Users");

const { check, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const config = require("config");

// @route   POST /api/user/
// @desc    Create New User
// @access  PUBLIC
router.post(
  "/",
  [
    check(
      "username",
      "Username length cannot be less than 3 and greater than 255"
    )
      .trim()
      .isLength({ min: 3, max: 255 }),
    check("password", "Password cannot be empty").trim().not().isEmpty(),
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
        if (userFetched)
          return res.status(400).json({
            errors: [{ msg: "User already exists with same username" }],
          });
        else {
          const user = new User({
            username,
            password,
          });

          user
            .save()
            .then((newUser) => {
              const payload = {
                user: {
                  id: newUser._id,
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
            })
            .catch((err) => {
              return res.status(500).json({ errors: [{ msg: err }] });
            });
        }
      })
      .catch((err) => {
        return res.status(500).json({ errors: [{ msg: err }] });
      });
  }
);

module.exports = router;
