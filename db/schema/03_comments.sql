DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  resource_id INTEGER REFERENCES resources(id) NOT NULL,
  comment_by_user_id INTEGER NOT NULL,
  description text NOT NULL
);
