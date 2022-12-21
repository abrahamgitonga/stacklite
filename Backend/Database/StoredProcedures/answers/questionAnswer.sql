CREATE
OR ALTER PROCEDURE getQuestionAnswers
    (@_id varchar(300))
AS
BEGIN
    SET
    NOCOUNT ON;

    select
        a._id,
        a.author,
        a.question,
        a.answer,
        v.votes,
        a.created_at,
        a.marked
    from
        answers AS a
        Left join votes v ON a._id = v.answer


    where
    a.question = @_id And a.is_deleted = 0
END
go