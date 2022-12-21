CREATE OR ALTER PROCEDURE getAnswer(@_id varchar(300))
AS
BEGIN
    select *
    from answers
    where _id= @_id
END