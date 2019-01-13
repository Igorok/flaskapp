import pymysql.cursors
import psycopg2
from flask import g, current_app
from flaskapp.blueprints.web.models.db import getPostgresConnection

class Model:
    connection = None

    def __init__(self):
        self.connection = getPostgresConnection()

    def list_to_dict(self, keys):
        def map_func (values):
            res_dict = {}
            for k, v in enumerate(values):
                res_dict[keys[k]] = v
            return res_dict
        return map_func
