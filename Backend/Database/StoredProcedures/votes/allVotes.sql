CREATE OR ALTER PROCEDURE getAllVotes(
    @answer varchar(300)
)
AS
BEGIN

    select votes
    from votes
    where answer=@answer
END
GO