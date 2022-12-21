CREATE OR ALTER PROCEDURE deleteComment(@_id varchar(300))
AS
SET NOCOUNT ON;
BEGIN
    update comments set is_deleted = 1 where _id = @_id
END
GO