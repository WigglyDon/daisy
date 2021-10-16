##Website

https://web.compass.lighthouselabs.ca/projects/w4-midterm-proj?day_number=w05d5

#  🌼 --daisy-- 🌼
Buy n Sell
- Plants

MINIMUM DEMO REQUIRES
------------
-- cart that doesnt redirect or refresh (stretch)
-- sends an email when client clicks on the seller
-- favourite items 
-- admin can choose to put product out of stock 
-- messaging (two way communication between user/admin)
-- record these messages in the database
------------

RESTFUL

B - browse
R - read
E - update/edit
A - add
D - delete

-------------
1 page = AJAX 

 CHECKMARK user authentication: How would we do this with AJAX cookies?
ex. shopping cart 

##happy paths
                             
-- USER HAPPY PATH
get /
get /home
POST home/post_id/fav


-- ADMIN HAPPY PATH
get /
get /home
POST /home/post_id/delete
POST /home/post_id/sold-out


