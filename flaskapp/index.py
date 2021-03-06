# -*- coding: utf-8 -*-

import os
from flask import Flask, g

from werkzeug.utils import find_modules, import_string
from flaskapp.blueprints.web.index import web
from flaskapp.blueprints.web.chat import getChat
from flaskapp.db import Postgres
from flaskapp.config import config

app = Flask(__name__)
app.config.update(dict(
    DEBUG=True,
    SECRET_KEY=os.environ.get('SEKRET', '_5#y2L"F4Q8z\n\xec]/'),
    DB_USER= os.environ.get('DB_USER', config['POSTGRES']['USER']),
    DB_PASSWORD= os.environ.get('DB_PASSWORD', config['POSTGRES']['PASSWORD']),
    DB_NAME= os.environ.get('DB_NAME', config['POSTGRES']['NAME']),
    DB_HOST= os.environ.get('DB_HOST', config['POSTGRES']['HOST'])
))
app.config.from_envvar('FLASKAPP_SETTINGS', silent=True)

with app.app_context():
    p = Postgres()

@app.teardown_appcontext
def close_db(error):
    p.closeConnection()

app.register_blueprint(web)
from flask_socketio import SocketIO
socketio = SocketIO(app)
getChat(socketio)