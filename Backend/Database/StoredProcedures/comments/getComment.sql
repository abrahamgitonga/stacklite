CREATE
OR ALTER PROCEDURE getComment(@_id varchar(300))
As
Begin
    select
        *
    from
        comments
    where
    _id = @_id
        AND is_deleted = 0
End