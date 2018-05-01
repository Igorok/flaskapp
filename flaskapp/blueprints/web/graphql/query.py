import graphene
from flaskapp.blueprints.web.models.user import UserModel
from flaskapp.blueprints.web.models.blog import BlogModel

from flaskapp.blueprints.web.graphql.user import RegGraph, AuthGraph, ProfileGraph, EditProfileGraph
from flaskapp.blueprints.web.graphql.blog import BlogGraph, BlogListGraph


# assign values to query
class Query(graphene.ObjectType):
    # authentication
    registration = graphene.Field(
        RegGraph, 
        email = graphene.String(), 
        password = graphene.String(), 
        confirmPassword = graphene.String(), 
        device = graphene.String()
    )
    def resolve_registration (self, info, email, password, confirmPassword, device):
        _u = UserModel()
        _reg_user = _u.registration(
            email = email, 
            password = password, 
            confirmPassword=confirmPassword, 
            device = device
        )
        return RegGraph(**_reg_user)

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
        __b = BlogModel()
        __blog = __b.editBlog(**kwargs)
        return BlogGraph(**__blog)

    # get blog data
    getBlogList = graphene.Field(
        BlogListGraph,
        token = graphene.String(),
        device = graphene.String(),
        userId = graphene.Int(),
        start = graphene.Int(),
        perpage = graphene.Int(),
    )
    def resolve_getBlogList (self, info, *args, **kwargs):
        __b = BlogModel()
        __blog = __b.getBlogList(**kwargs)
        blogs = []
        for v in __blog['blogs']:
            blogs.append(BlogGraph(**v))
            
        return BlogListGraph(
            count = __blog['count'],
            blogs = blogs,
        )



# init query
schema = graphene.Schema(query=Query)