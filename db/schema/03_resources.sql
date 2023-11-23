DROP TABLE IF EXISTS resources CASCADE;
CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id),
  ratings INT,
  category_id INTEGER REFERENCES categories(id),
  title text NOT NULL,
  description text NOT NULL,
  url text,
  liked_by text,
  image text
);
