CREATE DATABASE pmernauth;

/*CREATE EXTENSION IF NOT EXISTS "uuid-ossp" */

CREATE TABLE auth
(
    aid SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

CREATE TABLE profile
(
    pid uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    aid SERIAL REFERENCES auth,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    avatar TEXT,
    github VARCHAR(50),
    cohort VARCHAR(8),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


