const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeadear = req.headers.authorization;

  if (!authHeadear)
    return res.status(401).send({ error: 'No token provided' });

  const parts = authHeadear.split(' ');

  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token error' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token Invalid' });

    req.userId = decoded.id;
    return next();
  })
}