CREATE OR ALTER PROCEDURE addComment(
    @_id varchar(300),
    @author varchar(300),
    @answer varchar(300),
    @content varchar(500)
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @comdate datetime =GETDATE()

    INSERT INTO comments
        (_id, author, answer, content, added_at)
    VALUES
        (@_id, @author, @answer, @content, @comdate )
END

GO