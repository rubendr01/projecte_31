const express = require("express");

const Client = require("../models/client");

const bcrypt = require("bcryptjs");

const app = express();

app.get("/clients", (req, res) => {
  Client.find({}, "nom companyia correu estat telefon partner adreca").exec(
    (err, clients) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        clients,
      });
    }
  );
});

app.post("/clients", (req, res) => {
  let body = req.body;
  let client = new Client({
    nom: body.nom,
    companyia: body.companyia,
    correu: body.correu,
    estat: body.estat,
    telefon: body.telefon,
    partner: body.partner,
    adreca: body.adreca,
    password: bcrypt.hashSync(body.password, 10),
  });

  client.save((err, clientDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      client: clientDB,
    });
  });
});

app.put("/clients", async (req, res) => {
  let { nom, companyia, correu, estat, telefon, partner, adreca } = req.body;

  let client = await Client.updateOne(
    {
      correu,
    },
    {
      $set: {
        nom,
        correu,
        estat,
        companyia,
        telefon,
        partner,
        adreca,
      },
    }
  );

  //console.log(user);

  if (client.modifiedCount != 0) {
    res.json({
      ok: true,
      client,
    });
  } else {
    res.json({
      ok: false,
      message: "Client can't be modified",
    });
  }
});

app.delete("/clients", async (req, res) => {
  let { correu } = req.body;

  const client = await Client.deleteOne({
    correu,
  });

  if (client.deletedCount != 0) {
    res.json({
      eliminat: true,
      msg: "Client eliminat amb exit!",
    });
  } else {
    res.json({
      eliminat: false,
      msg: "El client no s'ha pogut eliminar",
    });
  }
});

module.exports = app;
