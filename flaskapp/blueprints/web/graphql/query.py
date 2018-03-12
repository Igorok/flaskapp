import graphene
from flaskapp.blueprints.web.graphql.user import AuthGraph, UserGraph, UserListGraph
from flaskapp.blueprints.web.models.user import UserModel



# assign values to query
class Query(graphene.ObjectType):
    # authentication
    auth = graphene.Field(AuthGraph, login = graphene.String(), password = graphene.String())
    def resolve_auth (self, info, login, password):
        _u = UserModel()
        auth_user = _u.authenticate(login = login, password = password)
        return AuthGraph(**auth_user)
    
    # user detail
    user = graphene.Field(UserGraph, id=graphene.String())
    def resolve_user(self, info, id):
        print('user')

    # use list
    userlist = graphene.Field(UserListGraph, id=graphene.String())
    def resolve_userlist(self, info, id):
        _u = UserModel()
        u_list = _u.list()
        users = []
        for v in u_list:
            users.append(UserGraph(**v))

        return UserListGraph (
            users = users
        )




# init query
schema = graphene.Schema(query=Query)