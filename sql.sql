create schema farmart;
use farmart;
 select *from products;
 insert into products(productName,productDetails,newprice,oldprice,offer) values("STORE","One Wireless Controller Black Color",1645,1903,28);
 
  select *from userdetails;
  DELETE FROM UserDetails WHERE id = 2;

 insert into userdetails(Name,Email,PhoneNumber,Password,userType) values("Tony","tony@gmail.com",7894561237,1234,"customer");

 select *from wishlist;
  insert into wishlist(productid) values(1);
	select p.id, w.id, productName,productDetails,newprice,oldprice,offer from products as p join wishlist as w on p.id = w.productid;
    
     select *from addcart;
      insert into addcart(Quantity) values(1);
    select p.id, a.id, productName,productdetails,newprice,oldprice,offer,Quantity from products as p join addcart as a on p.id = a.productid;
     select *from wishlist;
    delete from wishlist where id = 7;
    
      select *from addcart;
    delete from addcart where id =25;
    
    select *from justland;
    insert into justland(productName,productdetails,newprice,oldprice,offer,productImage) values();
    
      DELETE FROM products WHERE id = 16;
       select *from products;
       insert into products(productName, productdetails, newprice, oldprice, offer,Quantity, productImage) values('STORE','Wireless Controller Black Color',1300,1500,5,1,'');
       
       select p.id, a.id, productName,productdetails,newprice,oldprice,offer,Quantity from products as p join addcart as a where p.id = a.productid;
       
       select *from compare;
        delete from compare where id = 8;
         insert into compare(productid) values(1);
         
         select * from products as p join compare as c on p.id = c.productid;
         
  
    select * from products as p join wishlist as w on p.id = w.productid
    union all 
     select *from justland as j join wishlist as w on j.id = w.productid;
    
    select * from products as p join addcart as a on p.id = a.productid
    union all 
     select *from justland as j join addcart as a on j.id = a.productid;
    
    select * from products as p join compare as c on p.id = c.productid
    union all 
      select *from justland as j join compare as c on j.id = c.productid;
      
	
      
      
  
    select count(id) as count from addcart;
      select count(id) as count from wishlist;
          select count(id) as count from compare;
    
    select * from products where productName like '%Gopro%';   
  
  
    select *from wishtocart;
        delete from compare where id = 8;
         insert into wishtocart(productid) values(1);
         
         
         
         
use instashare;

select *from signupdata;
 insert into signupdata(email,username,password) values("tony@gmail.com","tonystark",1234);
 select *from signupdata WHERE email = email;
DELETE FROM signupdata WHERE id = 35;

SELECT * FROM signupdata WHERE id = 9;


UPDATE signupdata
SET username = 'tony'
WHERE id = 21;

UPDATE signupdata
SET profile_image = 'new_image_url' 
WHERE user_id = 'user_id';






 
 select *from posts;
SELECT * FROM instashare.posts;
  insert into posts(storyimg, story)values("","tonystark");
  
  SHOW CREATE TABLE posts;
ALTER TABLE posts MODIFY COLUMN storyimg LONGTEXT;
DESCRIBE posts;

ALTER TABLE posts MODIFY COLUMN story TEXT;


  insert into posts(userid, storyimg, story)values(1,1,"","tonystark");
    SELECT * FROM posts WHERE id = 3;
SHOW CREATE TABLE posts;
SELECT * FROM posts WHERE id = 10;
SELECT * FROM instashare.posts;
DELETE FROM posts WHERE id = 44;

select * from posts where story like '%billy%';

select i.caption , i.image,i.customid,  c.username,c.email, c.id   from customer as c
      join posts as i on c.id=i.customid where i.customid=1;

select p.story , p.storyimg, p.userid,  s.email, s.username, s.profileimg, s.id   from signupdata as s
      join posts as p on s.id=p.userid where p.userid = 9;
      
        select count(id = 3) as count from posts;
        
        select * from signupdata as s join posts as p on s.id = p.userid;
        
SELECT s.id, s.username, p.userid, p.story
FROM signupdata AS s
JOIN posts AS p ON s.id = p.userid
LIMIT 10;


  SELECT s.username, p.*
FROM signupdata AS s
JOIN posts AS p ON s.id = p.userid
WHERE s.username = 'tony stark';


select * from signupdata as s join posts as p on s.id = 23;

SELECT * FROM profile;

SELECT * FROM profile as u join signupdata as s on s.id = u.profileid where u.profileid = 25;
use instashare;
DELETE FROM profile WHERE id = 65;

select * from profile where profileid = 64;
SELECT * FROM profile as u join signupdata as s on s.id = u.profileid where s.id = 25;
        

SELECT 
    p.story, 
    p.storyimg, 
    p.userid,  
    s.email, 
    s.username, 
    s.id,
    pr.profileimage
FROM 
    signupdata AS s
JOIN 
    posts AS p ON s.id = p.userid
JOIN 
    profile AS pr ON s.id = pr.profileid
WHERE 
    p.userid = 58;
    
    
    SELECT 
    s.username, 
    p.storyimg, 
    p.story,
    pr.profileimage 
FROM 
    signupdata s 
LEFT JOIN 
    posts p ON s.id = p.userid 
LEFT JOIN 
    profile pr ON s.id = pr.profileid;

select * from signupdata where username like '%natasha%';




SELECT s.username, p.*, pr.profileimage
FROM signupdata AS s
JOIN posts AS p ON s.id = p.userid
JOIN profile AS pr ON s.id = pr.profileid
WHERE s.username LIKE '%natasha%';
select *from profile;
update profile set profileimage = "" where id = 58;

select *from storys;

SELECT u.username, s.simg, s.cid
FROM signupdata AS u
JOIN storys AS s ON u.id = s.cid
WHERE s.cid = 24;

SELECT s.username, pr.profileimage
FROM signupdata AS s
JOIN profile AS pr ON s.id = pr.profileid
WHERE s.username LIKE '%natasha%';