const db = require('../connection');
const bcrypt = require("bcrypt");
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const addUser = async(data) => {
  const { username, fullName, email, password } = data;
  const sql = "INSERT INTO users (username, full_name, email, password) VALUES ($1, $2, $3, $4)";
  const passwordHashed = await bcrypt.hash(password, 10);
  const values = [username, fullName, email, passwordHashed];
  return db.query(sql, values).then((data) => {
    if (data.rows) {
      return true;
    } else {
      return false;
    }
  });
};

const findByEmail = async(email) => {
  const sql = "SELECT username FROM users WHERE email = $1";
  const values = [email];
  return (await db.query(sql, values)).rows[0].username;
};

module.exports = { getUsers, addUser, findByEmail };
