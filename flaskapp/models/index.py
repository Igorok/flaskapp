import pymysql.cursors
from flask import g, current_app

def connect_db():
    """Connects to the specific database."""
    connection = pymysql.connect(
                    host=current_app.config['MYSQL_HOST'],
                    user=current_app.config['MYSQL_USER'],
                    password=current_app.config['MYSQL_PASSWORD'],
                    db=current_app.config['MYSQL_DB'],
                    charset='utf8mb4',
                    cursorclass=pymysql.cursors.DictCursor
                )
    return connection

def get_models(app):
    pass


# from sqlite3 import dbapi2 as sqlite3
# from flask import g, current_app

# def connect_db():
#     """Connects to the specific database."""
#     rv = sqlite3.connect(current_app.config['DATABASE'])
#     rv.row_factory = sqlite3.Row
#     return rv


# def init_db():
#     """Initializes the database."""
#     db = get_db()
#     with current_app.open_resource('models/schema.sql', mode='r') as f:
#         db.cursor().executescript(f.read())
#     db.commit()


# def get_db():
#     """Opens a new database connection if there is none yet for the
#     current application context.
#     """
#     if not hasattr(g, 'sqlite_db'):
#         g.sqlite_db = connect_db()
#     return g.sqlite_db

# def get_models(app):
#     pass

