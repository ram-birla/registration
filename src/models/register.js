const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email Already Exist"],
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid Email Address");
      }
    }
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmpassword: {
    type: String,
    required: true
  }
});

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;
