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

const updateUser = async(data, username) => {
  const { fullName, password, email } = data;
  const sql = `UPDATE "users" SET "full_name" = $1, "email" = $2, "password" = $3 WHERE "username" = $4;`;
  const passwordHashed = await bcrypt.hash(password, 10);
  const values = [fullName, email, passwordHashed, username];
  return db.query(sql, values).then((data) => {
    if (data.rows) {
      return true;
    } else {
      return false;
    }
  }).catch((e) => {
    console.log(e);
  });
};

const findByEmail = async(email) => {
  const sql = "SELECT username FROM users WHERE email = $1";
  const values = [email];
  return (await db.query(sql, values)).rows[0].username;
};

const findByUsername = async(username) => {
  const sql = "SELECT * FROM users WHERE username = $1";
  const values = [username];
  return (await db.query(sql, values)).rows[0];
};
  
  const userByEmail = (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const value = [email];
  return new Promise(function(resolve, reject){
    db.query(query, value)
      .then((data) => {
        console.log('IN!: ', JSON.stringify(data.rows));
        console.log(`Inside userByEmail: ${data.rows}`);
        // console.log(data.rows[id]);
        if (data.rows) {
          resolve(data.rows);
        }
        reject(false);
      })
      .catch(err => console.log(`Error : ${err.message}`));
  });
  // newPromise.then(function(value){
  //   console.log('Success!');
  //   return value;
  // }, function(error) {
  //   return error;
  // });

module.exports = { getUsers, addUser, findByEmail, findByUsername, updateUser, userByEmail };

