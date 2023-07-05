import { Schema, model, models } from "mongoose";

import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
      lowercase: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    has_premium: {
      type: Boolean,
      default: false,
    },
    salt: {
      type: String,
      default: uuidv4(),
    },
    todoItems: [
      {
        todoId: {
          type: String,
          default: uuidv4(),
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (plainPassword) {
  this.encry_password = this.securePassword(plainPassword);
});

userSchema.methods = {
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  authenticate: function (plainPassword) {
    return crypto.timingSafeEqual(
      Buffer.from(this.securePassword(plainPassword)),
      Buffer.from(this.encry_password)
    );
  },
};

const User = models.User || model("User", userSchema);

export default User;
