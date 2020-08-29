const { Schema, model } = require("mongoose");

const ContactSchema = new Schema(
  {
    id: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      max: 10,
    },
    interest: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Contact", ContactSchema);
