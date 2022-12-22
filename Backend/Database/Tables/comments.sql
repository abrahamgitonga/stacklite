CREATE TABLE comments
(
    _id VARCHAR(255) NOT NULL PRIMARY KEY,
    content TEXT NOT NULL,
    author_id VARCHAR(255) FOREIGN KEY REFERENCES users(_id),
    answer VARCHAR(255) FOREIGN KEY REFERENCES answers(_id),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BIT NOT NULL DEFAULT 0,
);