-- CREATE DATABASE local_db;
-- USE local_db;

\connect local_db

CREATE TABLE game(
    id INT GENERATED ALWAYS AS IDENTITY,
    width INT NOT NULL DEFAULT 0,
    height INT NOT NULL DEFAULT 0,
	score INT NOT NULL DEFAULT 0,
	fruit JSONB NOT NULL,
	snake JSONB NOT NULL
);