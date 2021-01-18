DROP DATABASE IF EXISTS workout_buddies_db;

CREATE database workout_buddies_db;

USE workout_buddies_db;

CREATE TABLE  User(
    id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(30) NOT NULL,
    createdAT TIMESTAMP,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);