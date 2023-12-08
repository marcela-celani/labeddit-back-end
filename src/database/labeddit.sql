-- Active: 1701135183107@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        nickname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

INSERT INTO
    users (
        id,
        nickname,
        email,
        password,
        role
    )
VALUES (
        'admin',
        'Admin',
        'admin@email.com',
        '21232f297a57a5a743894a0e4a801fc3',
        'ADMIN'
    );

-- tipo ADMIN e senha = admin

SELECT * FROM users;

DROP TABLE users;

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT (0) NOT NULL,
        dislikes INTEGER DEFAULT (0) NOT NULL,
        comments INTEGER DEFAULT (0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
    );

SELECT * FROM posts;

DROP TABLE posts;

CREATE TABLE
    comments (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        post_id TEXT NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT (0) NOT NULL,
        dislikes INTEGER DEFAULT (0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (post_id) REFERENCES posts (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE FOREIGN KEY 
        (creator_id) REFERENCES users (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
    );

SELECT * FROM comments;

DROP TABLE comments;

CREATE TABLE
    likes_dislikes_posts (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
    );

SELECT * FROM likes_dislikes_posts;

DROP TABLE likes_dislikes_posts;

CREATE TABLE
    likes_dislikes_comments (
        user_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (comment_id) REFERENCES comments (id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
    );

SELECT * FROM likes_dislikes_comments;

DROP TABLE likes_dislikes_comments;