-- CREATE DATABASE local_db;
-- USE local_db;

\connect local_db

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE game(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    width INT NOT NULL DEFAULT 0,
    height INT NOT NULL DEFAULT 0,
	score INT NOT NULL DEFAULT 0,
	fruit JSONB NOT NULL,
	snake JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);