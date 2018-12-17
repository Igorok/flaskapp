# -*- coding: utf-8 -*-

import os
from flask import Flask

from werkzeug.utils import find_modules, import_string
from flaskapp.blueprints.web.index import web
from flaskapp.blueprints.web.chat import getChat

from flaskapp.config import config
db_type = config['DB']

app = Flask(__name__)
app.register_blueprint(web)

from flask_socketio import SocketIO
socketio = SocketIO(app)
getChat(socketio)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'flaskapp.db'),
    DEBUG=True,
    SECRET_KEY=b'_5#y2L"F4Q8z\n\xec]/',
    USERNAME='admin',
    PASSWORD='default',
    DB_USER=config[db_type]['USER'],
    DB_PASSWORD=config[db_type]['PASSWORD'],
    DB_DB=config[db_type]['DB'],
    DB_HOST=config[db_type]['HOST'],
))
app.config.from_envvar('FLASAPP_SETTINGS', silent=True)



