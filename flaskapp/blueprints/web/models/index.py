import pymysql.cursors
import psycopg2
from flask import g, current_app

class Model:
    def connect_mysql(self):
        """Connects to the specific database."""
        connection = pymysql.connect(
            host=current_app.config['DB_HOST'],
            user=current_app.config['DB_USER'],
            password=current_app.config['DB_PASSWORD'],
            db=current_app.config['DB_DB'],
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection

    def connect_postgres(self):
        pg_str = "host = '{0}' dbname = '{1}' user = '{2}' password = '{3}'".format(
            current_app.config['DB_HOST'],
            current_app.config['DB_DB'],
            current_app.config['DB_USER'],
            current_app.config['DB_PASSWORD']
        )
        connection = psycopg2.connect(pg_str)
        return connection

    def list_to_dict(self, keys):
        def map_func (values):
            res_dict = {}
            for k, v in enumerate(values):
                res_dict[keys[k]] = v
            return res_dict
        return map_func

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

