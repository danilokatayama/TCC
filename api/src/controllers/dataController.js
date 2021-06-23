const express = require('express');
const mysql = require('../database/index.js');

const authMiddleware = require('../middleware/auth.js')

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.send({ ok: true, user: req.userId });
});

router.get('/pointvalues/', async (req, res) => {
  try {
    const dataPointId = req.query.dataPointId;
    const ts = req.query.ts;

    const data = await mysql.getDataMany(dataPointId, ts); //TODO: write getDessert
    res.json(data);
  } catch (err) {
    return res.status(400).send({ error: 'Query failed' })
  }
});

router.get('/analytics_voltage_lv/', async (req, res) => {
  try {
    const dataPointId1 = req.query.dataPointId1;
    const dataPointId2 = req.query.dataPointId2;
    const dataPointId3 = req.query.dataPointId3;
    const dataPointId4 = req.query.dataPointId4;
    const dataPointId5 = req.query.dataPointId5;
    const dataPointId6 = req.query.dataPointId6;
    const ts = req.query.ts;

    const data1 = await mysql.getDataMany(dataPointId1, ts);
    const data2 = await mysql.getDataMany(dataPointId2, ts);
    const data3 = await mysql.getDataMany(dataPointId3, ts);
    const data4 = await mysql.getDataMany(dataPointId4, ts);
    const data5 = await mysql.getDataMany(dataPointId5, ts);
    const data6 = await mysql.getDataMany(dataPointId6, ts);
    res.json({ data1, data2, data3, data4, data5, data6 });
  } catch (err) {
    return res.status(400).send({ error: 'Query failed' })
  }
});

router.get('/analytics_current_lv/', async (req, res) => {
  try {
    const dataPointId1 = req.query.dataPointId1;
    const dataPointId2 = req.query.dataPointId2;
    const dataPointId3 = req.query.dataPointId3;
    const ts = req.query.ts;

    const data1 = await mysql.getDataMany(dataPointId1, ts);
    const data2 = await mysql.getDataMany(dataPointId2, ts);
    const data3 = await mysql.getDataMany(dataPointId3, ts);
    res.json({ data1, data2, data3 });
  } catch (err) {
    return res.status(400).send({ error: 'Query failed' })
  }
});

router.get('/analytics_power_lv/', async (req, res) => {
  try {
    const dataPointId1 = req.query.dataPointId1;
    const dataPointId2 = req.query.dataPointId2;
    const dataPointId3 = req.query.dataPointId3;
    const dataPointId4 = req.query.dataPointId4;
    const dataPointId5 = req.query.dataPointId5;
    const dataPointId6 = req.query.dataPointId6;
    const dataPointId7 = req.query.dataPointId7;
    const dataPointId8 = req.query.dataPointId8;
    const dataPointId9 = req.query.dataPointId9;
    const dataPointId10 = req.query.dataPointId10;
    const dataPointId11 = req.query.dataPointId11;
    const dataPointId12 = req.query.dataPointId12;
    const dataPointId13 = req.query.dataPointId13;

    const data1 = await mysql.getDataOne(dataPointId1);
    const data2 = await mysql.getDataOne(dataPointId2);
    const data3 = await mysql.getDataOne(dataPointId3);
    const data4 = await mysql.getDataOne(dataPointId4);
    const data5 = await mysql.getDataOne(dataPointId5);
    const data6 = await mysql.getDataOne(dataPointId6);
    const data7 = await mysql.getDataOne(dataPointId7);
    const data8 = await mysql.getDataOne(dataPointId8);
    const data9 = await mysql.getDataOne(dataPointId9);
    const data10 = await mysql.getDataOne(dataPointId10);
    const data11 = await mysql.getDataOne(dataPointId11);
    const data12 = await mysql.getDataOne(dataPointId12);
    const data13 = await mysql.getDataOne(dataPointId13);
    res.json({ data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13 });
  } catch (err) {
    return res.status(400).send({ error: 'Query failed' })
  }
});



router.get('/single_line_diagram/', async (req, res) => {
  try {
    const dataPointId1 = req.query.dataPointId1;
    const dataPointId2 = req.query.dataPointId2;
    const dataPointId3 = req.query.dataPointId3;
    const dataPointId4 = req.query.dataPointId4;
    const dataPointId5 = req.query.dataPointId5;
    const dataPointId6 = req.query.dataPointId6;
    const dataPointId7 = req.query.dataPointId7;
    const dataPointId8 = req.query.dataPointId8;
    const dataPointId9 = req.query.dataPointId9;
    const dataPointId10 = req.query.dataPointId10;
    const dataPointId11 = req.query.dataPointId11;

    const data1 = await mysql.getDataOne(dataPointId1);
    const data2 = await mysql.getDataOne(dataPointId2);
    const data3 = await mysql.getDataOne(dataPointId3);
    const data4 = await mysql.getDataOne(dataPointId4);
    const data5 = await mysql.getDataOne(dataPointId5);
    const data6 = await mysql.getDataOne(dataPointId6);
    const data7 = await mysql.getDataOne(dataPointId7);
    const data8 = await mysql.getDataOne(dataPointId8);
    const data9 = await mysql.getDataOne(dataPointId9);
    const data10 = await mysql.getDataOne(dataPointId10);
    const data11 = await mysql.getDataOne(dataPointId11);
    res.json({ data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11 });
  } catch (err) {
    return res.status(400).send({ error: 'Query failed' })
  }
});

router.get('/analytics_current_mv/', async (req, res) => {
  try {
    const dataPointId1 = req.query.dataPointId1;
    const dataPointId2 = req.query.dataPointId2;
    const dataPointId3 = req.query.dataPointId3;
    const dataPointId4 = req.query.dataPointId4;
    const dataPointId5 = req.query.dataPointId5;
    const dataPointId6 = req.query.dataPointId6;
    const dataPointId7 = req.query.dataPointId7;
    const dataPointId8 = req.query.dataPointId8;
    const dataPointId9 = req.query.dataPointId9;
    const ts = req.query.ts;

    const data1 = await mysql.getDataMany(dataPointId1, ts);
    const data2 = await mysql.getDataMany(dataPointId2, ts);
    const data3 = await mysql.getDataMany(dataPointId3, ts);
    const data4 = await mysql.getDataOne(dataPointId4);
    const data5 = await mysql.getDataOne(dataPointId5);
    const data6 = await mysql.getDataOne(dataPointId6);
    const data7 = await mysql.getDataOne(dataPointId7);
    const data8 = await mysql.getDataOne(dataPointId8);
    const data9 = await mysql.getDataOne(dataPointId9);
    res.json({ data1, data2, data3, data4, data5, data6, data7, data8, data9 });
  } catch (err) {
    return res.status(400).send({ error: 'Query failed' })
  }
});

router.get('/analytics_operation_mv/', async (req, res) => {
  try {
    const dataPointId1 = req.query.dataPointId1;
    const dataPointId2 = req.query.dataPointId2;
    const dataPointId3 = req.query.dataPointId3;

    const data1 = await mysql.getDataOne(dataPointId1);
    const data2 = await mysql.getDataOne(dataPointId2);
    const data3 = await mysql.getDataOne(dataPointId3);
    res.json({ data1, data2, data3 });
  } catch (err) {
    return res.status(400).send({ error: 'Query failed' })
  }
});

router.get('/energy_consumption/', async (req, res) => {
  try {
    const dataPointId1 = req.query.dataPointId1;
    const dataPointId2 = req.query.dataPointId2;
    const dataPointId3 = req.query.dataPointId3;
    const dataPointId4 = req.query.dataPointId4;

    const data1 = await mysql.getDataOne(dataPointId1);
    const data2 = await mysql.getDataOne(dataPointId2);
    const data3 = await mysql.getDataOne(dataPointId3);
    const data4 = await mysql.getDataOne(dataPointId4);
    res.json({ data1, data2, data3, data4 });
  } catch (err) {
    return res.status(400).send({ error: 'Query failed' })
  }
});


module.exports = app => app.use('/data', router);