import pymysql.cursors
import psycopg2
from flask import g, current_app

class Model:
    connection = None

    def __init__(self):
        self.connection = self.getPostgresConnection()

    def __del__(self):
        if not self.connection is None:
            self.connection.close()



    def connect_mysql(self):
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

    def getPostgresConnection(self):
        if self.connection is None:
            pgStr = "host = '{0}' dbname = '{1}' user = '{2}' password = '{3}'".format(
                current_app.config['DB_HOST'],
                current_app.config['DB_NAME'],
                current_app.config['DB_USER'],
                current_app.config['DB_PASSWORD']
            )
            self.connection = psycopg2.connect(pgStr)

        return self.connection

    def list_to_dict(self, keys):
        def map_func (values):
            res_dict = {}
            for k, v in enumerate(values):
                res_dict[keys[k]] = v
            return res_dict
        return map_func
