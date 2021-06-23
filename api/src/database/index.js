const mysql = require('mysql');

let cachedDbPool;
function getDbPool() {
  if (!cachedDbPool) {
    cachedDbPool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'scadabr',
    });
  }
  return cachedDbPool;
}

module.exports = {

  getDataOne: async function getDataOne(dataPointId) {
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT * FROM pointvalues WHERE dataPointId = ? ORDER BY id DESC LIMIT 1';
      getDbPool().query(sql, [dataPointId], (err, results) => {

        if (err)
          return reject(err);

        resolve(results[0]);
      });
    });
  },

  getDataMany: async function getDataMany(dataPointId, fromTs) {
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT * FROM pointvalues WHERE dataPointId = ? AND ts >= ?';
      getDbPool().query(sql, [dataPointId, fromTs], (err, results) => {

        if (err)
          return reject(err);

        resolve(results);
      });
    });
  },

  getUser: async function getUsers(id) {
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT * FROM apiusers WHERE id=?';
      getDbPool().query(sql, [id], (err, results) => {

        if (err)
          return reject(err);

        resolve(results);
      });
    });
  },

  getUserByName: async function getUserByName(user) {
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT * FROM apiusers WHERE username=?';
      getDbPool().query(sql, [user], (err, results) => {
        if (err)
          return reject(err);

        resolve(results);
      });
    });
  },

  updateUserLastLogin: async function updateUserLastLogin(id) {
    const lastLogin = new Date().getTime();

    return new Promise(function (resolve, reject) {
      const sql = 'UPDATE apiusers SET lastLogin=? WHERE id=?';
      getDbPool().query(sql, [lastLogin, id], (err, results) => {
        if (err)
          return reject(err);

        resolve(lastLogin);
      });
    });
  },

  // getUserByNameAndPassword: async function getUserByNameAndPassword(user, pwd) {
  //   return new Promise(function (resolve, reject) {
  //     const sql = 'SELECT * FROM apiusers WHERE username=? and password=?';
  //     getDbPool().query(sql, [user, pwd], (err, results) => {
  //       if (err)
  //         return reject(err);

  //       resolve(results);
  //     });
  //   });
  // },

  getUsers: async function getUsers() {
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT * FROM apiusers';
      getDbPool().query(sql, (err, results) => {

        if (err)
          return reject(err);

        resolve(results);
      });
    });
  },

  // createUser: async function createUser(fields) {
  //   return new Promise(function(resolve, reject) {
  //     const sql = 'INSERT INTO apiusers SET ?';
  //     getDbPool().query(sql, fields,(err, results) => {
  //       resolve(results.insertId);
  //     });
  //   });
  // }

  createUser: async function createUser(user, pwd, email) {

    return new Promise(function (resolve, reject) {
      const sql = 'INSERT INTO apiusers (username, password, email) VALUES ?';
      const values = [[user, pwd, email]];
      getDbPool().query(sql, [values], (err, results) => {

        if (err)
          return reject(err);

        resolve(results.insertId);
      });
    });
  }

}