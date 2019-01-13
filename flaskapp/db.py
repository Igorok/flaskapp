import pymysql.cursors
import psycopg2
from flask import g, current_app

class Postgres ():
    def __init__(self):
        self.getConnection()

    def getConnection(self):
        if not hasattr(g, 'pg_connection'):
            pgStr = "host = '{0}' dbname = '{1}' user = '{2}' password = '{3}'".format(
                current_app.config['DB_HOST'],
                current_app.config['DB_NAME'],
                current_app.config['DB_USER'],
                current_app.config['DB_PASSWORD']
            )
            g.pg_connection = psycopg2.connect(pgStr)
        
        return g.pg_connection

    def closeConnection(self):
        if hasattr(g, 'pg_connection'):
            g.pg_connection.close()