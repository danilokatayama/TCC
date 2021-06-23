const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('./database/index.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/authController')(app);
require('./controllers/dataController')(app);

app.listen(3000);

app.get('/', async (req, res) => {
  return res.send("api ready to serve");
});

app.get('/pointvalues/', async (req, res) => {
  try {
    const data = await mysql.getDataMany(); //TODO: write getDessert
    res.json(data);
  } catch (err) {
    return res.status(400).send({ error: 'Query failed' })
  }
});

// app.get('/users', async(req, res) => {
//   try {
//     const data = await mysql.getUsers(); //TODO: write getDessert
//     res.json(data);
//   } catch (err) {
//     return res.status(400).send({ error: 'Query failed'})
//   }
// });

// app.get ('/', (req, res) => {
//   res.send('OK')
// })