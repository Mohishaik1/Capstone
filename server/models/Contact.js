import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  // email: {
  //     type: String,
  //     required: true,
  // },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  // message: {
  //     type: String
  // }
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

const contactModel = mongoose.model(
  "Contact-form",
  contactSchema,
  "Contact-forms"
);

export default contactModel;
