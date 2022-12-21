CREATE
OR ALTER PROCEDURE oneQuestion
    (@_id varchar(300))
AS
BEGIN
    SET
    NOCOUNT ON;

    select
        _id,
        author,
        title,
        content,
        tags,
        created_at

    from
        questions
    where
    _id = @_id
        AND is_deleted = 0
END
go