DROP TABLE IF EXISTS users_favorites;

CREATE TABLE users_favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE

)
