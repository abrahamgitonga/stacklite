CREATE OR ALTER PROCEDURE deleteAnswer
    (@_id varchar(300))
AS
BEGIN

    SET NOCOUNT ON;
    update answers set is_deleted = 1 where _id=@_id
END
go