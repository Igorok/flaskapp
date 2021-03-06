--  psql -U postgres -d flaskapp -a -f schema_psg.sql
drop table if exists "user";
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "login" varchar(128) DEFAULT NULL,
    "password" varchar(128) DEFAULT NULL,
    "email" varchar(128) DEFAULT NULL,
    "role" integer NOT NULL,
    "date_reg" timestamp DEFAULT NULL,
    "date_act" timestamp DEFAULT NULL,
    "active" Boolean
);

drop table if exists "token";
CREATE TABLE "token" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "type" varchar(45) DEFAULT NULL,
    "date" timestamp DEFAULT NULL,
    "token" varchar(128) DEFAULT NULL,
    UNIQUE ("user_id","type")
);

drop table if exists "blog";
CREATE TABLE "blog" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "title" varchar(128) DEFAULT NULL,
    "text" text,
    "date" timestamp DEFAULT NULL,
    "public" Boolean
);

drop table if exists "post";
CREATE TABLE "post" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "blog_id" SERIAL NOT NULL,
    "title" varchar(128) DEFAULT NULL,
    "description" varchar(256) DEFAULT NULL,
    "text" text,
    "date" timestamp DEFAULT NULL,
    "public" Boolean
);

drop table if exists "comment";
CREATE TABLE "comment" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "post_id" SERIAL NOT NULL,
    "text" text,
    "date" timestamp DEFAULT NULL
);

drop table if exists "chat_private";
CREATE TABLE "chat_private" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "friend_id" SERIAL NOT NULL,
    "date" timestamp DEFAULT NULL
);

drop table if exists "chat_group";
CREATE TABLE "chat_group" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "description" varchar(256) DEFAULT NULL,
    "date" timestamp DEFAULT NULL
);

drop table if exists "chat_users";
CREATE TABLE "chat_users" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "chat_id" SERIAL NOT NULL
);

drop table if exists "chat_message";
CREATE TABLE "chat_message" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "chat_id" SERIAL NOT NULL,
    "text" text,
    "date" timestamp DEFAULT NULL
);

drop table if exists "friends";
CREATE TABLE "friends" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "friend_id" SERIAL NOT NULL,
    "approved" Boolean,
    "date" timestamp DEFAULT NULL,
    UNIQUE ("user_id","friend_id")
);