import graphene
from flaskapp.blueprints.web.graphql.user import AuthGraph, ProfileGraph, UserGraph, UserListGraph
from flaskapp.blueprints.web.models.user import UserModel



# assign values to query
class Query(graphene.ObjectType):
    # authentication
    auth = graphene.Field(
        AuthGraph, 
        login = graphene.String(), 
        password = graphene.String(), 
        device = graphene.String()
    )
    def resolve_auth (self, info, login, password, device):
        _u = UserModel()
        _auth_user = _u.authenticate(login = login, password = password, device = device)
        return AuthGraph(**_auth_user)

    # get profile of current user by his token
    profile = graphene.Field(
        ProfileGraph,
        token = graphene.String(),
        device = graphene.String()
    )
    def resolve_profile (self, info, token, device):
        print('resolve_profile', token, device)

        _u = UserModel()
        _userProfile = _u.getUserProfile(token = token, device = device)

        print ('_userProfile', _userProfile)

        return ProfileGraph(**_userProfile)










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