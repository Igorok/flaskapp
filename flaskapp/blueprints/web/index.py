from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

import graphene


web = Blueprint(
        'web',
        __name__,
        template_folder = 'templates',
        static_folder = 'static',
        static_url_path='/static/web'
    )




from flask import request, session, g, redirect, url_for, abort, \
    render_template, flash, current_app, jsonify

from flaskapp.blueprints.web.actions.index import Action
from flaskapp.blueprints.web.graphql.query import schema

action = Action()

# get params from GET route
def getParams (keys, args):
    params = []
    for key in keys:
        if (args.get(key) != None):
            params.append({'name': key, 'val': args.get(key)})
    
    return params

@web.route('/fetch', methods=['POST'])
def fetch():
    try:
        json = request.get_json(silent=True)

        if not 'fetch' in json:
            raise Exception('Method not found')

        fetch_list = json['fetch'].split('.')
        fetch_class = fetch_list[0]
        fetch_def = fetch_list[1]

        if not hasattr(action, fetch_class):
            raise Exception('404')

        f_act = getattr(action, fetch_class)()

        if not hasattr(f_act, fetch_def):
            raise Exception('404')

        f_def = getattr(f_act, fetch_def)

        data = f_def(**json)

        # https://google.github.io/styleguide/jsoncstyleguide.xml?showone=Property_Ordering_Example#Property_Ordering_Example
        return jsonify(data = data)
    except Exception as e:
        err_dict = {
            'code': 400,
            'message': 'Bad Request'
        }
        err_str = str(e)

        if err_str == '404':
            err_dict['code'] = 404
            err_dict['message'] = 'Not found'
        elif err_str == '403':
            err_dict['code'] = 403
            err_dict['message'] = 'Forbidden'
        else:
            err_dict['message'] = err_str


        print("Unexpected error:", str(e))
        # https://google.github.io/styleguide/jsoncstyleguide.xml?showone=error.code#error.code
        abort(jsonify(error = err_dict))




@web.route('/graphql', methods=['POST'])
def graphql():
    try:
        json = request.get_json(silent=True)
        result = schema.execute(json['query'], variable_values=json['variables'])

        if (result.errors != None):
            raise Exception(result.errors[0])

        return jsonify(data = result.data or {})

    except Exception as e:
        print("Unexpected error:", str(e))
        err_dict = {
            'code': 400,
            'message': str(e)
        }
        abort(jsonify(error = err_dict))






# GET routes
@web.route('/')
def index():
    return render_template('view.html', scripts=["about"])

@web.route('/profile')
def profile():
    return render_template('view.html', scripts=["profile"])

@web.route('/login')
def login():
    return render_template('view.html', scripts=["login"])

@web.route('/blog-list')
def blogList():
    params = getParams(['userId', 'from', 'to'], request.args)
    return render_template('view.html', scripts = ['blogList'], params = params)

@web.route('/blog-edit/<blogId>')
def blogEdit(blogId):
    return render_template(
        'view.html', 
        scripts = ['blogEdit'], 
        params = [{'name': 'blogId', 'val': blogId}]
    )

@web.route('/hello')
def hello():
    u_list = action.user().get_user_list()
    return render_template('hello.html', u_list=u_list)
