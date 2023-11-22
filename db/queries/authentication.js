const db = require("../connection");
const bcrypt = require("bcrypt");

const login = (email, password) => {
  console.log(email);
  const sql = "SELECT email, password FROM users where email = $1;";
  const values = [email];
  return db.query(sql, values).then((data) => {
    let result = false;
    if (data.rows) {
      result = bcrypt.compare(password, data.rows[0].password).then(function(result) {
        if (result) {
          return true;
        } else {
          return false;
        }
      });
    }
    return result;
  });
};

module.exports = { login };
