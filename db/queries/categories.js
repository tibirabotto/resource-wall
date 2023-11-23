const db = require('../connection');

function getAllCategories() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM categories', (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
}



module.exports = {
  getAllCategories
};
