const jwt = require("jsonwebtoken");

// Verificar token

let verificaToken = (req, res, next) => {
  let userToken = req.get("X-Access-Token");

  jwt.verify(userToken, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Token no vàlid",
        },
      });
    }

    req.usuari = decoded.usuari;

    next();
  });
};

// Verificar Admin Role
let verificaAdminRole = (req, res, next) => {
  let usuari = req.usuari;
  if (usuari.role !== "ADMIN_ROLE") {
    return res.status(401).json({
      ok: false,
      err: {
        message: "No autoritzat!",
      },
    });
  }
  next();
};

module.exports = {
  verificaToken,
  verificaAdminRole,
};
