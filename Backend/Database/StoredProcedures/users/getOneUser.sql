CREATE OR ALTER PROCEDURE getOneUser
    (@email varchar(300))
As
Begin
    select *
    from users
    where email = @email
End