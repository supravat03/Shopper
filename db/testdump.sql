CREATE TABLE user_info (
 user_id int(11) NOT NULL AUTO_INCREMENT,
 name varchar(50) NOT NULL,
 email varchar(50) NOT NULL,
 password varchar(200) NOT NULL,
 confirmed tinyint(4) NOT NULL DEFAULT '0',
 user_type tinyint(6) NOT NULL DEFAULT '1',
 PRIMARY KEY (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;


CREATE TABLE product_info (
 product_id int(11) NOT NULL AUTO_INCREMENT,
 product_name varchar(100) NOT NULL,
 product_description varchar(1000) NOT NULL,
 product_price int(11) NOT NULL,
 image_1 longblob NOT NULL,
 image_2 longblob NOT NULL,
 image_3 longblob NOT NULL,
 user_id int(11) NOT NULL,
 product_category smallint(6) NOT NULL,
 PRIMARY KEY (product_id),
 KEY user_id (user_id),
 CONSTRAINT product_info_ibfk_1 FOREIGN KEY (user_id) REFERENCES user_info (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;


CREATE TABLE address_info (
 address_id int(11) NOT NULL AUTO_INCREMENT,
 first_name varchar(50) NOT NULL,
 last_name varchar(50) NOT NULL,
 house_no varchar(50) NOT NULL,
 street varchar(100) NOT NULL,
 pin int(11) NOT NULL,
 state tinyint(4) NOT NULL,
 telephone bigint(11) NOT NULL,
 user_id int(11) NOT NULL,
 PRIMARY KEY (address_id),
 KEY user_id (user_id),
 CONSTRAINT address_info_ibfk_1 FOREIGN KEY (user_id) REFERENCES user_info (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 
flush privileges;