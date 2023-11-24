const db = require('../connection');

const getCategories = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      return data.rows;
    })
    .catch(err => console.log(`Error fetching categories: ${err.message}`));
};

const setResource = (user_id, category_id, title, description, url, images_url) => {
  const values = [user_id, category_id, title, description, url, images_url];

  return db.query(`INSERT INTO resources (user_id, category_id, title, description, url, images_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`, values)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
}

module.exports = { getCategories, setResource };
