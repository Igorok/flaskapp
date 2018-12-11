import graphene
from flaskapp.blueprints.web.models.user import UserModel
from flaskapp.blueprints.web.models.blog import BlogModel
from flaskapp.blueprints.web.models.post import PostModel

from flaskapp.blueprints.web.graphql.user import RegGraph, AuthGraph, ProfileGraph, EditProfileGraph, UserDetailGraph, UserListGraph, FriendRequest
from flaskapp.blueprints.web.graphql.blog import BlogGraph, BlogListGraph, PostGraph, MyBlogDetailGraph, BlogDetailGraph

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

    # get list blog data
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

    # get list blog data
    getMyBlogList = graphene.Field(
        BlogListGraph,
        token = graphene.String(),
        device = graphene.String(),
        start = graphene.Int(),
        perpage = graphene.Int(),
    )
    def resolve_getMyBlogList (self, info, *args, **kwargs):
        __b = BlogModel()
        __blog = __b.getMyBlogList(**kwargs)
        blogs = []
        for v in __blog['blogs']:
            blogs.append(BlogGraph(**v))

        return BlogListGraph(
            count = __blog['count'],
            blogs = blogs,
        )

    # make my blog public or hidden
    publicMyBlog = graphene.Field(
        BlogGraph,
        token = graphene.String(),
        device = graphene.String(),
        id = graphene.Int(),
        public = graphene.Boolean(),
    )
    def resolve_publicMyBlog (self, info, *args, **kwargs):
        __model = BlogModel()
        __blog = __model.publicMyBlog(**kwargs)
        return BlogGraph(**__blog)

    # edit new post
    editPost = graphene.Field(
        PostGraph,
        token = graphene.String(),
        device = graphene.String(),
        id = graphene.Int(),
        blogId = graphene.Int(),
        title = graphene.String(),
        descript = graphene.String(),
        text = graphene.String(),
        public = graphene.Boolean()
    )
    def resolve_editPost (self, info, *args, **kwargs):
        __p = PostModel()
        __post = __p.editPost(**kwargs)
        return PostGraph(**__post)
    
    # get my post
    getMyPost = graphene.Field(
        PostGraph,
        token = graphene.String(),
        device = graphene.String(),
        id = graphene.Int(),
        blogId = graphene.Int()
    )
    def resolve_getMyPost (self, info, *args, **kwargs):
        __p = PostModel()
        __post = __p.getMyPost(**kwargs)
        return PostGraph(**__post)

    #get my blog with posts
    getMyBlogDetail = graphene.Field(
        MyBlogDetailGraph,
        token = graphene.String(),
        device = graphene.String(),
        start = graphene.Int(),
        perpage = graphene.Int(),
        blogId = graphene.Int(),
    )
    def resolve_getMyBlogDetail (self, info, *args, **kwargs):
        __pm = PostModel()
        __myBd = __pm.getMyBlogDetail(**kwargs)
        __posts = map(lambda pDict: PostGraph(**pDict), __myBd['posts'])

        return MyBlogDetailGraph(
            count = __myBd['count'],
            blog = BlogGraph(**__myBd['blog']),
            posts = __posts,
        )

    #get blog with posts
    getBlogDetail = graphene.Field(
        BlogDetailGraph,
        token = graphene.String(),
        device = graphene.String(),
        start = graphene.Int(),
        perpage = graphene.Int(),
        blogId = graphene.Int(),
    )
    def resolve_getBlogDetail (self, info, *args, **kwargs):
        __pm = PostModel()
        __myBd = __pm.getBlogDetail(**kwargs)
        __posts = map(lambda pDict: PostGraph(**pDict), __myBd['posts'])

        return BlogDetailGraph(
            count = __myBd['count'],
            blog = BlogGraph(**__myBd['blog']),
            posts = __posts,
        )

     # get one post
    getPost = graphene.Field(
        PostGraph,
        token = graphene.String(),
        device = graphene.String(),
        id = graphene.Int(),
        blogId = graphene.Int()
    )
    def resolve_getPost (self, info, *args, **kwargs):
        __p = PostModel()
        __post = __p.getPost(**kwargs)
        return PostGraph(**__post)

    # get list blog data
    getUserList = graphene.Field(
        UserListGraph,
        token = graphene.String(),
        device = graphene.String(),
        start = graphene.Int(),
        perpage = graphene.Int(),
    )
    def resolve_getUserList (self, info, *args, **kwargs):
        __u = UserModel()
        __user = __u.getUserList(**kwargs)
        __users = []
        for v in __user['users']:
            __users.append(UserDetailGraph(**v))
        return UserListGraph(
            count = __user['count'],
            users = __users
        )

    # add user to friends
    friendRequest = graphene.Field(
        FriendRequest,
        token = graphene.String(),
        device = graphene.String(),
        id = graphene.Int(),
    )
    def resolve_friendRequest (self, info, *args, **kwargs):
        __u = UserModel()
        __res = __u.friendRequest(**kwargs)
        return FriendRequest(
            success = __res['success'],
            friendId = __res['friendId'],
            userId = __res['userId']
        )

    # remove users from friends
    friendRemove = graphene.Field(
        FriendRequest,
        token = graphene.String(),
        device = graphene.String(),
        id = graphene.Int(),
    )
    def resolve_friendRemove (self, info, *args, **kwargs):
        __u = UserModel()
        __res = __u.friendRemove(**kwargs)
        return FriendRequest(
            success = __res['success'],
            friendId = __res['friendId'],
            userId = __res['userId']
        )

# init query
schema = graphene.Schema(query=Query)
