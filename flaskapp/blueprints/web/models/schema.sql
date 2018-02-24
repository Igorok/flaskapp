drop table if exists user;
create table user (
    'id' integer primary key autoincrement,
    'login' text not null,
    'password' text not null,
    'role' text not null
);

drop table if exists blog;
create table blog (
    'id' integer primary key autoincrement,
    'user_id' integer not null,
    'title' text not null,
    'text' text not null,
    'date' datetime not null
);


drop table if exists article;
create table article (
    'id' integer primary key autoincrement,
    'user_id' integer not null,
    'blog_id' integer not null,
    'title' text not null,
    'text' text not null,
    'date' datetime not null
);

drop table if exists comment;
create table comment (
    'id' integer primary key autoincrement,
    'user_id' integer not null,
    'article_id' integer not null,
    'text' text not null,
    'date' datetime not null
);

drop table if exists chat;
create table chat (
    'id' integer primary key autoincrement,
    'type' text not null
);

drop table if exists chat_and_user;
create table chat_and_user (
    'id' integer primary key autoincrement,
    'user_id' integer not null,
    'chat_id' integer not null
);

drop table if exists chat_message;
create table chat_message (
    'id' integer primary key autoincrement,
    'user_id' integer not null,
    'chat_id' integer not null,
    'text' text not null
);

