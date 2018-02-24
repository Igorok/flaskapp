from flask import request, session, g, redirect, url_for, abort, \
    render_template, flash, current_app, jsonify

from flaskapp.actions.index import Action

action = Action()

print('Action', Action)

@current_app.route('/')
def index():
    return render_template('index.html', entries={})

@current_app.route('/hello')
def hello():
    u_list = action.user.get_user_list()
    
    print(u_list)
    return render_template('hello.html', u_list=u_list)

@current_app.route('/fetch', methods=['POST'])
def fetch():
    try:
        json = request.get_json(silent=True)
        if not hasattr(json, 'fetch'):
            raise Exception('Method not found')

        fetch_list = json['fetch'].split('.')
        fetch_class = fetch_list[0]
        fetch_def = fetch_list[1]

        print('fetch_list', fetch_list, fetch_class, fetch_def)
        u = action.user.add_user(json)
        

        return jsonify(data = u, status_code = 200)
    except Exception as e:
        print("Unexpected error:", repr(e))
        abort(jsonify(message=repr(e), status_code=400))
