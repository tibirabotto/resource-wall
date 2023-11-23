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

module.exports = {
  searchResourcesInDB, getResourcesByCategory, getAllResources
};
