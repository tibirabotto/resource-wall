const db = require('../connection');

const query = `
  SELECT r.images_url, r.title, u.username, r.description, r.ratings, r.url
    FROM resources AS r
      JOIN users AS u ON r.user_id = u.id
    WHERE u.username = $1;
`;

const getMyResources = (username) => {
  let value = [ username ];
  return db.query(query, value)
    .then(data => {
      console.log(`Inside myResource:`, data.rows);
      return data.rows;
    })
    .catch(err => {
      console.log(`Error fetching data : ${err}`);
    });
};

module.exports = { getMyResources };
