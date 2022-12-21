CREATE
OR ALTER procedure deleteQuestion(@_id varchar(300))
AS
BEGIN
    SET
    NOCOUNT ON;

    UPDATE
    questions
set
    is_deleted = 1
where
    _id = @_id
END
go