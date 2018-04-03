import graphene
from flaskapp.blueprints.web.models.user import UserModel
from flaskapp.blueprints.web.models.blog import BlogModel

from flaskapp.blueprints.web.graphql.user import AuthGraph, ProfileGraph, EditProfileGraph
from flaskapp.blueprints.web.graphql.blog import BlogGraph


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
        blog = BlogModel()
        _u = UserModel()
        _userProfile = _u.getUserProfile(token = token, device = device)
        return ProfileGraph(**_userProfile)

    # update user profile
    editProfile = graphene.Field(
        EditProfileGraph,
        token = graphene.String(),
        device = graphene.String(),
        login = graphene.String(),
        email = graphene.String()
    )
    def resolve_editProfile (self, info, *args, **kwargs):
        _u = UserModel()
        _userProfile = _u.editUserProfile(**kwargs)
        return EditProfileGraph(**_userProfile)

    # get blog data
    getBlog = graphene.Field(
        BlogGraph,
        token = graphene.String(),
        device = graphene.String(),
        id = graphene.Int(),
    )
    def resolve_getBlog (self, info, *args, **kwargs):
        print(
            '**kwargs', kwargs, 'BlogGraph', BlogGraph
        )
        __b = BlogModel()
        __blog = __b.getBlog(**kwargs)
        return BlogGraph(**__blog)

    # edit new blog
    editBlog = graphene.Field(
        BlogGraph,
        token = graphene.String(),
        device = graphene.String(),
        id = graphene.Int(),
        title = graphene.String(),
        text = graphene.String(),
        public = graphene.Boolean()
    )
    def resolve_editBlog (self, info, *args, **kwargs):
        print(
            '**kwargs', kwargs, 'BlogGraph', BlogGraph
        )
        __b = BlogModel()
        __blog = __b.editBlog(**kwargs)
        return BlogGraph(**__blog)


# init query
schema = graphene.Schema(query=Query)