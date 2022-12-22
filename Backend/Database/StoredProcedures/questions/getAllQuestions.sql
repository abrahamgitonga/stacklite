CREATE
OR ALTER PROCEDURE allQuestions
    (@author_id varchar(300) = Null)
AS
BEGIN
    SET
    NOCOUNT ON;

    if @author_id IS NOT NULL BEGIN
        select
            q._id as question_id,
            q.author,
            q.title,
            q.content,
            q.tags,
            q.created_at,
            count(a.answer) as answers
        from
            questions q
            left join answers a on a.question_id = q._id
        where
    q.is_deleted = 0
            AND q.author = @author_id
        group by
    q._id,
    q.author,
    q.title,
    q.content,
    q.tags,
    q.created_at

    END
ELSE BEGIN
        select
            q._id as question_id,
            q.author,
            q.title,
            q.content,
            q.tags,
            q.created_at,
            count(a.answer) as answers
        from
            questions q
            left join answers a on a.question_id = q._id
        where
    q.is_deleted = 0
        group by
    q._id,
    q.author,
    q.title,
    q.content,
    q.tags,
    q.created_at

    END
END