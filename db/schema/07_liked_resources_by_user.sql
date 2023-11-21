DROP TABLE IF EXISTS liked_resources_by_user CASCADE;
CREATE TABLE liked_resources_by_user (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  resource_id INTEGER REFERENCES resources(id) NOT NULL
);
