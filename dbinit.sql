DROP DATABASE IF EXISTS montag;
DROP USER IF EXISTS duner;
CREATE ROLE duner PASSWORD 'duner' LOGIN;
CREATE DATABASE montag OWNER duner;