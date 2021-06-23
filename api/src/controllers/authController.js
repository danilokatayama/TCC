const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('../database/index.js');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const userexist = await mysql.getUserByName(username);
    if (userexist[0])
      return res.status(400).send({ error: 'User already exists' })

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })

    const id = await mysql.createUser(username, hashedPassword, email);
    user = await mysql.getUser(id);
    user[0].password = undefined;
    res.json({
      user,
      token: generateToken({ id: user[0].id })
    });
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed' })
  }
});

router.post('/authenticate', async (req, res) => {
  try {
    var { username, password } = req.body;

    var user = await mysql.getUserByName(username);
    if (!user[0])
      return res.status(400).send({ error: 'User not found' });

    if (!(await bcrypt.compare(password, user[0].password)))
      return res.status(400).send({ error: 'Invalid Password' });

    user[0].password = undefined;
    // console.log(user[0].id);
    const lastLogin = await mysql.updateUserLastLogin(user[0].id);

    user[0].lastLogin = lastLogin;

    res.json({
      user: user[0],
      token: generateToken({ id: user[0].id })
    });
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Authentication failed' })
  }
});


module.exports = app => app.use('/auth', router);