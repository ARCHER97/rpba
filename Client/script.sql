drop database shop; 
create database shop;
use shop;

create table category(
	category VARCHAR(40) not null,
	primary key(category)
);

create table items(
	id int not null auto_increment,
	category VARCHAR(40) not null,
	user_id VARCHAR(40) not null,
	name VARCHAR(40) not null,
	about VARCHAR(200) not null,
	price int not null,
	primary key(id)
);

ALTER TABLE items     
ADD CONSTRAINT FK_item_category FOREIGN KEY (category)     
    REFERENCES category (category)     
    ON DELETE CASCADE    
    ON UPDATE CASCADE    
;   
ALTER TABLE items     
ADD CONSTRAINT FK_item_user FOREIGN KEY (user_id)     
    REFERENCES users (id)     
    ON DELETE CASCADE    
    ON UPDATE CASCADE    
;    

create table users(
	id VARCHAR(40) not null,
	login VARCHAR(40) not null,
	primary key(id)
);

create table users_category(
	id int not null auto_increment,
	id_user VARCHAR(40) not null,
	email VARCHAR(40) not null,
	body VARCHAR(40) DEFAULT '' not null,
	primary key(id) 
);

ALTER TABLE users_category     
ADD CONSTRAINT FK_users_category_users FOREIGN KEY (id_user)     
    REFERENCES users (id)     
    ON DELETE CASCADE    
    ON UPDATE CASCADE    
;  

INSERT INTO category (category) VALUE ('books'); 
INSERT INTO category (category) VALUE ('tables'); 