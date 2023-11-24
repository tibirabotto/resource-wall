const db = require('../connection');

const query = `
  SELECT r.*, u.username
    FROM resources AS r
      JOIN users AS u ON r.user_id = u.id
    WHERE u.username = $1;
`;

const getMyResources = (username) => {
  let value = [ username ];
  return db.query(query, value)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log(`Error fetching myResources : ${err}`);
    });
};

module.exports = { getMyResources };
