const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const User = require("../../models/Users");

const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   POST api/todo-items
// @desc    UPDATE todo item
// @access  Private
router.post(
  "/",
  [auth, [check("name", "Todo item is required").not().isEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 = Bad request
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    // Build todo object
    const todoFields = {};
    if (name) todoFields.name = name;

    User.findById(req.user.id).then((user) => {
      if (!user) {
        return res.status(404).json({ errors: [{ msg: "User not found" }] });
      }

      user.todoItems.unshift(todoFields);

      user
        .save()
        .then((user) => res.json(user.todoItems))
        .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
    });
  }
);

// @route   DELETE api/todo-items
// @desc    DELETE todo item
// @access  Private
router.delete("/:id", auth, (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }

    const removeIndex = user.todoItems
      .map((item) => item.todoId)
      .indexOf(req.params.id);

    if (removeIndex === -1) {
      return res.status(404).json({ errors: [{ msg: "Todo item not found" }] });
    }

    user.todoItems.splice(removeIndex, 1);

    user
      .save()
      .then((user) => res.json(user.todoItems))
      .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
  });
});

// @route   PUT api/todo-items
// @desc    UPDATE todo item
// @access  Private
router.put(
  "/:id",
  [auth, check("name", "Todo Item is required").not().isEmpty()],
  (req, res) => {
    console.log(req.params.id);
    User.findById(req.user.id).then((user) => {
      if (!user) {
        return res.status(404).json({ errors: [{ msg: "User not found" }] });
      }

      const updateIndex = user.todoItems
        .map((item) => item.todoId)
        .indexOf(req.params.id);

      if (updateIndex === -1) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Todo item not found" }] });
      }

      user.todoItems[updateIndex].name = req.body.name;

      user
        .save()
        .then((user) => res.json(user.todoItems))
        .catch((err) => res.status(400).json({ errors: [{ msg: err }] }));
    });
  }
);

module.exports = router;
