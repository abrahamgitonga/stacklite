CREATE
OR ALTER PROCEDURE add_UpdateQuestions
    (
    @_id varchar(300),
    @author_id varchar(300),
    @title varchar(300),
    @content varchar(600),
    @tags varchar(600),
    @is_deleted bit = 0
)
As
Begin
    SET
    NOCOUNT ON;

    DECLARE @exists BIT
    select
        @exists = count(_id)
    from
        questions
    where
    _id = @_id
    if @exists = 0
INSERT INTO
    questions
    VALUES
        (
            @_id,
            @author_id,
            @title,
            @content,
            @tags,
            GETDATE(),
            @is_deleted
    )
    else
UPDATE
    questions
set
    _id = @_id,
    author = @author_id,
    title = @title,
    content = @content,
    tags = @tags
where
    _id = @_id
End
go