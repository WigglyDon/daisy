--selecting quantity of plants by name with wildcard

SELECT plants.name as name, listings.quantity as listing_quantity
FROM listings
JOIN plants on listings.plant_id = plants.id
WHERE name LIKE 'dai%';
