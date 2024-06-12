const mysql = require("mysql");
const sql = require("./sql");
const logger = require("../winston/logger"); // logger.js 가져오기

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',  // 여기에 MySQL 사용자 이름을 입력하세요.
    password: 'Wlsgud@509',  // 여기에 MySQL 비밀번호를 입력하세요.
    database: 'dev'
});

const query = (alias, values, where = "") => {
  return new Promise((resolve, reject) => {
    pool.query(sql[alias] + where, values, (error, results) => {
      if (error) {
        logger.error(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getConnection = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        console.log(err);
        reject({ err });
      } else {
        resolve(conn);
      }
    });
  });
};

module.exports = {
  query,
  getConnection,
};
