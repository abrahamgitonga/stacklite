CREATE
OR ALTER PROCEDURE getComments

As
Begin
    select
        *
    from
        comments
    where
     is_deleted = 0
End