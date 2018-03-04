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

action = Action()












@web.route('/')
def index():
    return render_template('index.html', entries={})

@web.route('/hello')
def hello():
    u_list = action.user().get_user_list()
    return render_template('hello.html', u_list=u_list)

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














# schema
class Patron(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()
    age = graphene.Int()
    qwe = graphene.String()
    asd = graphene.String()

# assign values to query
class Query(graphene.ObjectType):

    patron = graphene.Field(Patron, id=graphene.String())


    def resolve_patron(self, info, id):
        print('resolve_patron', id)

        return Patron(
            id = 1, 
            name = 'Syrus', 
            age = 27,
            qwe = 'qwe',
            asd = 'asd',
        )

# request
query = '''
    query something($id: String!){
      patron (id: $id) {
        id
        name
        age
        asd
      }
    }
'''

# init query
schema = graphene.Schema(query=Query)

@web.route('/graphql', methods=['POST'])
def graphql():
    try:
        json = request.get_json(silent=True)



        print('graphql', json['variables'])



        # execute
        result = schema.execute(query, variable_values=json['variables'])
        print(result.data['patron'])

        return jsonify(data = result.data)


    except Exception as e:
        print("Unexpected error:", str(e))

        err_dict = {
            'code': 400, 
            'message': 'Bad Request'
        }
        abort(jsonify(error = err_dict))