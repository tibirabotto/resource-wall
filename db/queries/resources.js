const db = require('../connection');

async function searchResourcesInDB(searchQuery) {
  try {
    const result = await db.query(
      'SELECT * FROM resources r WHERE title LIKE $1 OR description LIKE $1',
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

const getCommentsByResource = async(resourceId) => {
  try {
    const sql = `select users.username as username, comments.description
                 from comments
                 join users
                 on users.id = comments.comment_by_user_id
                 join resources
                 on resources.id = comments.resource_id
                 where resources.id = $1`;
    const values = [resourceId];
    return (await db.query(sql, values)).rows;
  } catch (e) {
    console.log(`ERROR: getCategoryByResource ${e}`);
  }
};

const likedResources = async(userId) => {
  try {
    const sql = `SELECT l.resource_id
      FROM liked_resources_by_user l
        JOIN users u
        ON u.id = l.user_id
      WHERE u.username = $1;`
    const values = [ userId ];
    return (await db.query(sql, values)).rows;
  } catch (e) {
    console.log(`ERROR: likedResources ${e}`);
  }
};

module.exports = {
  searchResourcesInDB, getResourcesByCategory, getAllResources, getResourceById, getCommentsByResource, likedResources
};
