const db = require('../connection');

const query1 = `
  INSERT INTO liked_resources_by_user (user_id, resource_id) VALUES ($1, $2) RETURNING id;
`;

const query2 = `
DELETE FROM liked_resources_by_user WHERE user_id = $1 AND resource_id = $2 RETURNING id;
`

const likedResource = (bool, user_id, resource_id) => {
  let values = [ user_id, resource_id ];
  let query = '';
  console.log(`Bool: ${bool}`);
  if(bool === 'true') {
    query = query1;
  } else {
    query = query2;
  }
  console.log(`Query: ${query}\n Values: ${values}`);
  return db.query(query, values)
    .then(function(data) {
      console.log(`Likedresource output: ${data.rows}`);
      return data.rows;
    })
    .catch(err => {
      console.log(`Error fetching data : ${err}`);
    });
};

module.exports = { likedResource };
