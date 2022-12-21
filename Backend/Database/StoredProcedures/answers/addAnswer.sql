CREATE
OR ALTER PROCEDURE addAnswer(
    @_id varchar(300),
    @author varchar(300),
    @question varchar(300),
    @content varchar(600),
    @marked BIT = 0
)
AS
BEGIN
    SET
  NOCOUNT ON;

    INSERT INTO
  answers
        (
        _id,
        author,
        question,
        content,
        created_at,
        marked
        )
    values
        (
            @_id,
            @author,
            @question,
            @content,
            GETDATE(),
            @marked
  )
END
go