drop table if exists "user";
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "login" varchar(128) DEFAULT NULL,
    "password" varchar(128) DEFAULT NULL,
    "email" varchar(128) DEFAULT NULL,
    "role" integer NOT NULL
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

drop table if exists "article";
CREATE TABLE "article" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "blog_id" SERIAL NOT NULL,
    "title" varchar(128) DEFAULT NULL,
    "text" text,
    "date" timestamp DEFAULT NULL
);

drop table if exists "comment";
CREATE TABLE "comment" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "article_id" SERIAL NOT NULL,
    "text" text,
    "date" timestamp DEFAULT NULL
);

drop table if exists "chat";
CREATE TABLE "chat" (
    "id" SERIAL PRIMARY KEY,
    "type" varchar(45) DEFAULT NULL
);


drop table if exists "chat_and_user";
CREATE TABLE "chat_and_user" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "chat_id" SERIAL NOT NULL
);

drop table if exists "chat_message";
CREATE TABLE "chat_message" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL NOT NULL,
    "chat_id" SERIAL NOT NULL,
    "text" text
);

drop table if exists "friends";
CREATE TABLE "friends" (
    "id" SERIAL PRIMARY KEY,
    "from_id" SERIAL NOT NULL,
    "to_id" SERIAL NOT NULL,
    "approved" smallint
);