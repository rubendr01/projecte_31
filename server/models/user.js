const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let rolesValids = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no és un rol vàlid",
};

let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "el nom d'usuari és obligatori"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "el correu elèctronic és obligatori"],
  },
  password: {
    type: String,
    required: [true, "La contrasenya és obligatori"],
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: rolesValids,
  },
});

userSchema.methods.toJson = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.plugin(uniqueValidator, { message: "{PATH} deu ser únic" });

module.exports = mongoose.model("User", userSchema);
