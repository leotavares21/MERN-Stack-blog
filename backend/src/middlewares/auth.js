const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send({ error: "Acesso negado" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send({ error: "Não autorizado" });
    }

    req.userId = decoded.params.id;

    next();
  });
};

module.exports = auth;
