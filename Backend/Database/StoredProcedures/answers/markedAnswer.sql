CREATE
OR ALTER PROCEDURE markedAnswer(@_id varchar(300))
AS
BEGIN
    SET
  NOCOUNT ON;

    UPDATE
  answers
Set
  marked = 1
where
  _id = @_id
END
go