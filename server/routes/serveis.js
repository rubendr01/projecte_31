const express = require("express");

const Serveis = require("../models/serveis");

const app = express();

app.get("/serveis", (req, res) => {
  //res.json("get user");
  Serveis.find({}, "nom descripcio feta usuariCreacio dataInici").exec(
    (err, serveis) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        serveis,
      });
    }
  );
});

module.exports = app;
