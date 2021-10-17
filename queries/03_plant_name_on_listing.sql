SELECT plants.name as name
FROM plants
JOIN listings on plants.id = plant_id
where listings.price = 5;

-- can replace where with:
--1.  where listings.quantity = 4;
--2.  where listings.id = 4;

-- price greater than 5$
--3. where listings.price > 5;

--price less than 5
--4. where listings.price < 5;


