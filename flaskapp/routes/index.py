from flask import request, session, g, redirect, url_for, abort, \
    render_template, flash, current_app, jsonify

from flaskapp.actions.index import add_user, get_user_list

def get_router(app):
    @app.route('/')
    def index():
        return render_template('index.html', entries={})

    @app.route('/hello')
    def hello():
        u_list = get_user_list()
        print(u_list)
        return render_template('hello.html', u_list=u_list)

    @app.route('/fetch', methods=['POST'])
    def fetch():
        try:
            json = request.get_json(silent=True)
            u = add_user(json)
            print('u', u)

            return jsonify(u)
        except Exception as e:
            print("Unexpected error:", e)
            abort(400)
