import pymysql.cursors
import psycopg2
from flask import g, current_app

def connect_mysql():
        """Connects to the specific database."""
        connection = pymysql.connect(
            host=current_app.config['DB_HOST'],
            user=current_app.config['DB_USER'],
            password=current_app.config['DB_PASSWORD'],
            db=current_app.config['DB_NAME'],
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection

def getPostgresConnection():
    if not hasattr(g, 'pg_connection'):
        pgStr = "host = '{0}' dbname = '{1}' user = '{2}' password = '{3}'".format(
            current_app.config['DB_HOST'],
            current_app.config['DB_NAME'],
            current_app.config['DB_USER'],
            current_app.config['DB_PASSWORD']
        )
        g.pg_connection = psycopg2.connect(pgStr)
        
    return g.pg_connection