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

# from flaskapp.blueprints.web.actions.index import Action
from flaskapp.blueprints.web.graphql.query import schema

# action = Action()

# get params from GET route
def getParams (keys, args):
    params = []
    for key in keys:
        if (args.get(key) != None):
            params.append({'name': key, 'val': args.get(key)})
    
    return params


@web.route('/graphql', methods=['POST'])
def graphql():
    try:
        json = request.get_json(silent=True)
        result = schema.execute(json['query'], variable_values=json['variables'])

        # print(
        #     'json', json,
        #     'result', result
        # )

        if (result.errors != None):
            raise Exception(result.errors[0])

        return jsonify(data = result.data or {})

    except Exception as e:
        print('Unexpected error:', str(e))
        err_dict = {
            'code': 400,
            'message': str(e)
        }
        abort(jsonify(error = err_dict))






# GET routes
@web.route('/')
def index():
    params = [
        {'name': 'page', 'val': 'about'}
    ]
    return render_template('view.html', scripts=['about'], params=params )

@web.route('/profile')
def profile():
    params = [
        {'name': 'page', 'val': 'profile'}
    ]
    return render_template('view.html', scripts=['profile'], params=params)

@web.route('/login')
def login():
    return render_template('view.html', scripts=['login'])

@web.route('/registration')
def registration():
    return render_template('view.html', scripts=['registration'])
    
@web.route('/blog-list')
def blogList():
    params = getParams(['userId', 'start', 'perpage'], request.args)
    params.append({'name': 'page', 'val': 'blog'})
    return render_template(
        'view.html', 
        scripts = ['blogList'],
        params = params
    )

@web.route('/my-blog-list')
def myBlogList():
    params = getParams(['start', 'perpage'], request.args)
    params.append({'name': 'page', 'val': 'blog'})
    return render_template(
        'view.html', 
        scripts = ['myBlogList'],
        params = params
    )

@web.route('/blog-edit/<blogId>')
def blogEdit(blogId):
    return render_template(
        'view.html', 
        scripts = ['blogEdit'], 
        params = [
            {'name': 'blogId', 'val': blogId},
            {'name': 'page', 'val': 'blog'}
        ]
    )

@web.route('/my-post-list/<blogId>')
def myBlogList():
    params = getParams(['start', 'perpage'], request.args)
    params.append({'name': 'page', 'val': 'blog'})
    params.append({'name': 'blogId', 'val': blogId})

    return render_template(
        'view.html', 
        scripts = ['myPostList'],
        params = params
    )

@web.route('/post-edit/<blogId>/<postId>')
def postEdit(blogId, postId):
    return render_template(
        'view.html', 
        scripts = ['postEdit'], 
        params = [
            {'name': 'blogId', 'val': blogId},
            {'name': 'postId', 'val': postId},
            {'name': 'page', 'val': 'blog'}
        ]
    )




@web.route('/hello')
def hello():
    u_list = action.user().get_user_list()
    return render_template('hello.html', u_list=u_list)
