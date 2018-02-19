import json

from flask import request, session, g, redirect, url_for, abort, \
    render_template, flash, current_app

def getRouter(app):
    @app.route('/')
    def index():
        return render_template('index.html', entries={})

    @app.route('/hello')
    def hello():
        return render_template('hello.html', entries={})

    @app.route('/fetch', methods=['POST'])
    def fetch():
        try:
            json = request.get_json(silent=True)
            print(json)
            print(json["login"] or '')
            print(json["password"] or '')
            print(json["arr"] or '')
            return '{"qwe": 123}'
        except Exception as e:
            print("Unexpected error:", e)
            abort(400)
