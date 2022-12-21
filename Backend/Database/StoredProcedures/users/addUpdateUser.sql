CREATE OR ALTER PROCEDURE add_UpdateUser
    @id VARCHAR(255),
    @username VARCHAR
(300),
    @email VARCHAR
(300),
    @password VARCHAR
(300)
AS
BEGIN
    IF @email = (SELECT email
    FROM users
    WHERE email=@email)
    UPDATE users
    SET
        username = @username,
        [password] = @password;
else
    INSERT INTO users
        ( _id,username, email, [password])
    VALUES
        ( @id, @username, @email, @password);
END



-- EXECUTE dbo.usp_CreateOrUpdateUser 'random', 'randomuser@gmail.com', 'random';
-- SELECT *
-- FROM dbo.users;
-- SELECT email
-- FROM dbo.users
-- WHERE email='randomuser@gmail.com';

SELECT *
from dbo.users