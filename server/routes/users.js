const express = require("express");

const User = require("../models/user");

const bcrypt = require("bcryptjs");

const app = express();

app.get("/user", (req, res) => {
  //res.json("get user");
  User.find({}, "username email role").exec((err, usuaris) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuaris,
    });
  });
});

app.post("/user", (req, res) => {
  let body = req.body;
  let user = new User({
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      user: userDB,
    });
  });
});

app.put("/user", async (req, res) => {
  let { username, email, password, role } = req.body;

  let user = await User.updateOne(
    {
      email,
    },
    {
      $set: {
        username,
        email,
        password,
        role,
      },
    }
  );

  //console.log(user);

  if (user.modifiedCount != 0) {
    res.json({
      ok: true,
      user,
    });
  } else {
    res.json({
      ok: false,
      message: "User can't be modified",
    });
  }
});

app.delete("/user", async (req, res) => {
  let { correu } = req.body;

  const usuari = await User.deleteOne({
    correu,
  });

  if (usuari.deletedCount != 0) {
    res.json({
      eliminat: true,
      msg: "Usuari eliminat amb exit!",
    });
  } else {
    res.json({
      eliminat: false,
      msg: "L'usuari no s'ha pogut eliminar",
    });
  }
});

module.exports = app;
