const db = require('../connection');

const query = `SELECT * FROM resources;`;

const getAllResources = () => {
  return db.query(query)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log(`Error fetching data : ${err}`);
    });
};

module.exports = { getAllResources };
