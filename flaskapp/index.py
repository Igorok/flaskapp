# -*- coding: utf-8 -*-
"""
    Flaskr
    ~~~~~~

    A microblog example application written as Flask tutorial with
    Flask and sqlite3.

    :copyright: © 2010 by the Pallets team.
    :license: BSD, see LICENSE for more details.
"""

import os
from flask import Flask, g
from werkzeug.utils import find_modules, import_string

import flask
print('version', flask.__version__)

# from flaskr.blueprints.flaskr import init_db

from flaskapp.models.index import init_db, get_models
from flaskapp.routes.index import get_router

def register_cli(app):
    @app.cli.command('initdb')
    def initdb_command():
        """Creates the database tables."""
        init_db()
        print('Initialized the database.')


def register_teardowns(app):
    @app.teardown_appcontext
    def close_db(error):
        """Closes the database again at the end of the request."""
        if hasattr(g, 'sqlite_db'):
            g.sqlite_db.close()

            
app = Flask(__name__)
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'flaskapp.db'),
    DEBUG=True,
    SECRET_KEY=b'_5#y2L"F4Q8z\n\xec]/',
    USERNAME='admin',
    PASSWORD='default'
))
app.config.from_envvar('FLASAPP_SETTINGS', silent=True)

# register_blueprints(app)
register_cli(app)
register_teardowns(app)

get_models(app)
get_router(app)



# def register_blueprints(app):
#     """Register all blueprint modules

#     Reference: Armin Ronacher, "Flask for Fun and for Profit" PyBay 2016.
#     """
#     for name in find_modules('flaskr.blueprints'):
#         mod = import_string(name)
#         if hasattr(mod, 'bp'):
#             app.register_blueprint(mod.bp)
#     return None


# def register_cli(app):
#     @app.cli.command('initdb')
#     def initdb_command():
#         """Creates the database tables."""
#         init_db()
#         print('Initialized the database.')


# def register_teardowns(app):
#     @app.teardown_appcontext
#     def close_db(error):
#         """Closes the database again at the end of the request."""
#         if hasattr(g, 'sqlite_db'):
#             g.sqlite_db.close()