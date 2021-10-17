
-- selecting price of listing by id
SELECT listings.price
FROM listings
WHERE id = 4;


-- selecting price of each listing by name
SELECT listings.price
FROM plants
JOIN listings on plants.id = plant_id
WHERE name  = 'tom%';
