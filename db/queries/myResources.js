const db = require('../connection');

const query = `
  SELECT images.image, title, username, description, rating_id, url
    FROM resources
      JOIN users ON resources.user_id = users.id
      JOIN images ON resources.id = images.resource_id
    WHERE resources.user_id = 1;
`;

const getMyResources = () => {
  return db.query(query)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log(`Error fetching data : ${err}`);
    });
};

module.exports = { getMyResources };
