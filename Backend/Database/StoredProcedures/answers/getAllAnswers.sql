CREATE OR ALTER PROCEDURE getAllAnswers
AS
BEGIN
    select _id, author, question, answer, created_at, marked
    from answers
    where is_deleted =0
END