create table questions
(
    _id VARCHAR(255) NOT NULL PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    content TEXT NOT NULL,
    author_id VARCHAR(255) FOREIGN KEY REFERENCES users(_id),
    tags VARCHAR(300) NOT NULL DEFAULT '',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BIT NOT NULL DEFAULT 0
);