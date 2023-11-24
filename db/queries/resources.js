const db = require('../connection');

async function searchResourcesInDB(searchQuery) {
  try {
    const result = await db.query(
      'SELECT r.*, i.image FROM resources r LEFT JOIN images i ON r.id = i.resource_id WHERE r.title ILIKE $1 OR r.description ILIKE $1',
      ['%' + searchQuery + '%']
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
}

function getResourcesByCategory(id) {
  return db.query(`SELECT * FROM resources WHERE category_id = ${id}`)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log(`Error fetching data : ${err}`);
    });
}

function getAllResources() {
  return db.query('SELECT * FROM resources')
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log(`Error fetching data : ${err}`);
    });
}

const getResourceById = async(id) => {
  try {
    const sql = `SELECT resources.*, categories.name as category_name, users.username as username
                 FROM resources
                 JOIN categories
                 ON categories.id = resources.category_id
                 JOIN users
                 ON users.id = resources.user_id
                 WHERE resources.id = $1`;

    const values = [id];
    return (await db.query(sql, values)).rows[0];
  } catch (e) {
    console.log(`ERROR: getResourceByID ${e}`);
  }
};

module.exports = {
  searchResourcesInDB, getResourcesByCategory, getAllResources, getResourceById
};
