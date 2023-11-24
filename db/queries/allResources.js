const db = require('../connection');

const query = `SELECT * FROM resources;`;

const getAllResources = () => {
  return db.query(query)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log(`Error fetching all Resources : ${err}`);
    });
};

module.exports = { getAllResources };
