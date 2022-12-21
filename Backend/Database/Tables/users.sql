CREATE TABLE users
(
    _id INT IDENTITY NOT NULL PRIMARY KEY,
    username VARCHAR(300) NOT NULL,
    email VARCHAR(300) UNIQUE NOT NULL,
    [password] VARCHAR(300) NOT NULL,
);

ALTER TABLE dbo.users alter column _id VARCHAR(255) 