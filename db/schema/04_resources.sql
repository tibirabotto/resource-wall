DROP TABLE IF EXISTS resources CASCADE;
CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  rating_id INTEGER REFERENCES ratings(id),
  category_id INTEGER REFERENCES categories(id),
  title text NOT NULL,
  description text NOT NULL,
  url text,
  liked_by text,
  images_url text
);
