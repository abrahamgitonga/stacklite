CREATE OR ALTER PROCEDURE add_UpdateVotes(
    @answer varchar(300),
    @votes INT =1
)

As
Begin
    SET NOCOUNT ON;
    DECLARE @exists BIT
    Select @exists= count(answer)
    from votes
    where answer = @answer
    if @exists =0
 BEGIN
        insert votes
            ( answer, votes)
        Values
            ( @answer, 1)
    End
Else  
  BEGIN
        UPDATE votes set  votes = @votes where answer = @answer
    END
End
Go