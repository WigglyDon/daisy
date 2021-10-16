

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  plant_id INTEGER REFERENCES plants(id) ON DELETE CASCADE,
  price INTEGER,
  quantity INTEGER
);
