-- CREATE TABLE posts
-- (
--     id INT IDENTITY PRIMARY KEY,
--     title text,
--     content text,
--     parent_id INT,
--     author_id INT foreign key references users.id,
--     type VARCHAR(300),
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP

-- )
-- CREATE DATABASE stacklite

CREATE TABLE users
(
    _id VARCHAR(255) NOT NULL PRIMARY KEY,
    username VARCHAR(300) NOT NULL,
    email VARCHAR(300) UNIQUE NOT NULL,
    [password] VARCHAR(300) NOT NULL,
);


create table questions(
    _id VARCHAR(255) NOT NULL PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    content TEXT NOT NULL,
    author_id VARCHAR(255) FOREIGN KEY REFERENCES users(_id),
    tags VARCHAR(300) NOT NULL DEFAULT '',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BIT NOT NULL DEFAULT 0
);

CREATE TABLE answers
(
    _id VARCHAR(255) NOT NULL PRIMARY KEY,
    content TEXT NOT NULL,
    author_id VARCHAR(255) FOREIGN KEY REFERENCES users(_id),
    question VARCHAR(255) FOREIGN KEY REFERENCES questions(_id),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    marked BIT DEFAULT 0,
    is_deleted BIT NOT NULL DEFAULT 0,
);

CREATE TABLE comments
(
    _id VARCHAR(255) NOT NULL PRIMARY KEY,
    content TEXT NOT NULL,
    author_id VARCHAR(255) FOREIGN KEY REFERENCES users(_id),
    answer VARCHAR(255) FOREIGN KEY REFERENCES answers(_id),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BIT NOT NULL DEFAULT 0,
);

CREATE TABLE votes
(
    _id VARCHAR(255) NOT NULL PRIMARY KEY,
    author VARCHAR(255) FOREIGN KEY REFERENCES users(_id),
    answer VARCHAR(255) FOREIGN KEY REFERENCES answers(_id),
    votes INT NOT NULL

);


-- IF OBJECT_ID('users', 'U') IS NOT NULL
-- DROP TABLE users
-- IF OBJECT_ID('questions', 'U') IS NOT NULL
-- DROP TABLE questions
-- IF OBJECT_ID('answers', 'U') IS NOT NULL
-- DROP TABLE answers
-- IF OBJECT_ID('comments', 'U') IS NOT NULL
-- DROP TABLE comments
-- IF OBJECT_ID('votes', 'U') IS NOT NULL
-- DROP TABLE votes

-- go;
-- CREATE OR ALTER PROCEDURE dbo.usp_CreateOrUpdateUser
--     @username VARCHAR(300),
--     @email VARCHAR(300),
--     @password VARCHAR(300)
-- AS
-- BEGIN
--     IF @email = (SELECT email
--     FROM dbo.users
--     WHERE email=@email)
--     UPDATE dbo.users
--     SET
--         username = @username,
--         [password] = @password;
-- else
--     INSERT INTO dbo.users
--         ( username, email, [password])
--     VALUES
--         ( @username, @email, @password);
-- END



-- EXECUTE dbo.usp_CreateOrUpdateUser 'random', 'randomuser@gmail.com', 'random';
-- SELECT *
-- FROM dbo.users;
-- SELECT email
-- FROM dbo.users
-- WHERE email='randomuser@gmail.com';



--proc1user
-- CREATE OR ALTER PROCEDURE add_UpdateUser
--     @username VARCHAR(300),
--     @email VARCHAR(300),
--     @password VARCHAR(300)
-- AS
-- BEGIN
--     IF @email = (SELECT email
--     FROM users
--     WHERE email=@email)
--     UPDATE users
--     SET
--         username = @username,
--         [password] = @password;
-- else
--     INSERT INTO users
--         ( username, email, [password])
--     VALUES
--         ( @username, @email, @password);
-- END



--proc2users
-- CREATE OR ALTER PROCEDURE getOneUser
--     (@email varchar(300))
-- As
-- Begin
--     select *
--     from users
--     where email = @email
-- End

--proc3ques
CREATE
OR ALTER PROCEDURE add_UpdateQuestions
    (
    @_id varchar(300),
    @author varchar(300),
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
        (_id,)
    VALUES
        (
            @_id,
            @author,
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
    author = @author,
    title = @title,
    content = @content,
    tags = @tags
where
    _id = @_id
End
Go

create or alter procedure addQuestion(@_id varchar(300),
    @author varchar(300),
    @content varchar(300))
as
begin
    insert into questions
        (_id,author,content)
    values
        (@_id, @author, @content);

end


--proc4ques

-- CREATE
-- OR ALTER procedure deleteQuestion(@_id varchar(300))
-- AS
-- BEGIN
--     SET
--     NOCOUNT ON;

--     UPDATE
--     questions
-- set
--     is_deleted = 1
-- where
--     _id = @_id
-- END
-- go

--proc5ques
-- CREATE
-- OR ALTER PROCEDURE allQuestions
--     (@author varchar(300) = Null)
-- AS
-- BEGIN
--     SET
--     NOCOUNT ON;

--     if @author IS NOT NULL BEGIN
--         select
--             q._id as question_id,
--             q.author,
--             q.title,
--             q.content,
--             q.tags,
--             q.created_at,

--             count(a.content) as answers
--         from
--             questions q
--             left join answers a on a.question = q._id
--         where
--     q.is_deleted = 0
--             AND q.author = @author
--         group by
--     q._id,
--     q.author,
--     q.title,
--     q.content,
--     q.tags,
--     q.created_at

--     END
-- ELSE BEGIN
--         select
--             q._id as question_id,
--             q.author,
--             q.title,
--             q.content,
--             q.tags,
--             q.created_at,
--             count(a.content) as answers
--         from
--             questions q
--             left join answers a on a.question = q._id
--         where
--     q.is_deleted = 0
--         group by
--     q._id,
--     q.author,
--     q.title,
--     q.content,
--     q.tags,
--     q.created_at

--     END
-- END


-- CREATE OR ALTER PROCEDURE getAllQuestions
-- AS
-- BEGIN

--   SELECT * FROM questions WHERE is_deleted = 0;

-- END


--proc6ques
-- CREATE
-- OR ALTER PROCEDURE oneQuestion
--     (@_id varchar(300))
-- AS
-- BEGIN
--     SET
--     NOCOUNT ON;

--     select
--         _id,
--         author,
--         title,
--         content,
--         tags,
--         created_at

--     from
--         questions
--     where
--     _id = @_id
--         AND is_deleted = 0
-- END
-- go

-- CREATE OR ALTER PROCEDURE getOneQuestion (@_id VARCHAR(300))
-- AS
-- BEGIN

--   SELECT * FROM questions WHERE _id = @_id AND is_deleted = 0;

-- END
-- GO

--proc7answer

-- CREATE
-- OR ALTER PROCEDURE addAnswer(
--     @_id varchar(300),
--     @author varchar(300),
--     @question varchar(300),
--     @content varchar(600),
--     @marked BIT = 0
-- )
-- AS
-- BEGIN
--     SET
--   NOCOUNT ON;

--     INSERT INTO
--   answers
--         (
--         _id,
--         author,
--         question,
--         content,
--         created_at,
--         marked
--         )
--     values
--         (
--             @_id,
--             @author,
--             @question,
--             @content,
--             GETDATE(),
--             @marked
--   )
-- END
-- go


--proc8answer

-- CREATE OR ALTER PROCEDURE deleteAnswer
--     (@_id varchar(300))
-- AS
-- BEGIN

--     SET NOCOUNT ON;
--     update answers set is_deleted = 1 where _id=@_id
-- END
-- go

--proc9answer

-- CREATE OR ALTER PROCEDURE getAllAnswers
-- AS
-- BEGIN
--     select _id, author, question, content, created_at, marked
--     from answers
--     where is_deleted =0
-- END

--proc10answer

-- CREATE OR ALTER PROCEDURE getAnswer(@_id varchar(300))
-- AS
-- BEGIN
--     select *
--     from answers
--     where _id= @_id
-- END


--proc11answer

-- CREATE
-- OR ALTER PROCEDURE markedAnswer(@_id varchar(300))
-- AS
-- BEGIN
--     SET
--   NOCOUNT ON;

--     UPDATE
--   answers
-- Set
--   marked = 1
-- where
--   _id = @_id
-- END
-- go

--proc12answer

-- CREATE
-- OR ALTER PROCEDURE getQuestionAnswers
--     (@_id varchar(300))
-- AS
-- BEGIN
--     SET
--     NOCOUNT ON;

--     select
--         a._id,
--         a.author,
--         a.question,
--         a.content,
--         v.votes,
--         a.created_at,
--         a.marked
--     from
--         answers AS a
--         Left join votes v ON a._id = v.answer


--     where
--     a.question = @_id And a.is_deleted = 0
-- END
-- go

--proc13answer

-- CREATE
-- OR ALTER PROCEDURE unmarkedAnswer(@_id varchar(300))
-- AS
-- BEGIN
--     SET
--     NOCOUNT ON;

--     UPDATE
--     answers
-- Set
--     marked = 0
-- where
--     _id = @_id
-- END
-- go

--proc14answer

-- CREATE
-- OR ALTER PROCEDURE updateAnswer(
--     @_id varchar(300),
--     @content varchar(500))
-- AS
-- BEGIN
--     SET
--     NOCOUNT ON;

--     UPDATE
--     answers
-- SET
--     content = @content
-- where
--     _id = @_id
-- END
-- GO

--proc15comments

-- CREATE OR ALTER PROCEDURE addComment(
--     @_id varchar(300),
--     @author varchar(300),
--     @answer varchar(300),
--     @content varchar(500)
-- )
-- AS
-- BEGIN
--     SET NOCOUNT ON;
--     DECLARE @comdate datetime =GETDATE()

--     INSERT INTO comments
--         (_id, author, answer, content)
--     VALUES
--         (@_id, @author, @answer, @content )
-- END

-- GO

--proc16comments

-- CREATE
-- OR ALTER PROCEDURE getComments

-- As
-- Begin
--     select
--         *
--     from
--         comments
--     where
--      is_deleted = 0
-- End

--proc17comments

-- CREATE
-- OR ALTER PROCEDURE answerComments(@_id varchar(300))
-- As
-- Begin
--     select
--         *
--     from
--         comments
--     where
--     answer = @_id
--         AND is_deleted = 0
-- End

--proc18comments

-- CREATE OR ALTER PROCEDURE deleteComment(@_id varchar(300))
-- AS
-- SET NOCOUNT ON;
-- BEGIN
--     update comments set is_deleted = 1 where _id = @_id
-- END
-- GO

--proc19comments

-- CREATE
-- OR ALTER PROCEDURE getComment(@_id varchar(300))
-- As
-- Begin
--     select
--         *
--     from
--         comments
--     where
--     _id = @_id
--         AND is_deleted = 0
-- End

--proc20votes

-- CREATE OR ALTER PROCEDURE add_UpdateVotes(
--     @answer varchar(300),
--     @votes INT =1
-- )

-- As
-- Begin
--     SET NOCOUNT ON;
--     DECLARE @exists BIT
--     Select @exists= count(answer)
--     from votes
--     where answer = @answer
--     if @exists =0
--  BEGIN
--         insert votes
--             ( answer, votes)
--         Values
--             ( @answer, 1)
--     End
-- Else  
--   BEGIN
--         UPDATE votes set  votes = @votes where answer = @answer
--     END
-- End
-- Go

--proc21votes

-- CREATE OR ALTER PROCEDURE getAllVotes(
--     @answer varchar(300)
-- )
-- AS
-- BEGIN

--     select votes
--     from votes
--     where answer=@answer
-- END
-- GO

