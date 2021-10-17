
-- selecting price of each listing by name - wildcard
SELECT plants.name as name, listings.price as listing_price
FROM listings
JOIN plants on listings.plant_id = plants.id
WHERE name LIKE 'tom%';
