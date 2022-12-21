CREATE
OR ALTER PROCEDURE answerComments(@_id varchar(300))
As
Begin
    select
        *
    from
        comments
    where
    answer = @_id
        AND is_deleted = 0
End