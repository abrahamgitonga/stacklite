CREATE
OR ALTER PROCEDURE updateAnswer(
    @_id varchar(300),
    @answer varchar(500))
AS
BEGIN
    SET
    NOCOUNT ON;

    UPDATE
    answers
SET
    answer = @answer
where
    _id = @_id
END
GO