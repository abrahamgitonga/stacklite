CREATE
OR ALTER PROCEDURE unmarkedAnswer(@_id varchar(300))
AS
BEGIN
    SET
    NOCOUNT ON;

    UPDATE
    answers
Set
    marked = 0
where
    _id = @_id
END
go