import graphene

class BlogGraph (graphene.ObjectType):
    id = graphene.Int()
    userId = graphene.Int()
    userName = graphene.String()
    userEmail = graphene.String()
    title = graphene.String()
    text = graphene.String()
    date = graphene.String()
    public = graphene.Boolean()

class BlogListGraph (graphene.ObjectType):
    blogs = graphene.List(BlogGraph)
    count = graphene.Int()

class PostGraph (graphene.ObjectType):
    id = graphene.Int()
    blogId = graphene.Int()
    userId = graphene.Int()
    userName = graphene.String()
    userEmail = graphene.String()
    title = graphene.String()
    description = graphene.String()
    text = graphene.String()
    date = graphene.String()
    public = graphene.Boolean()

class PostListGraph (graphene.ObjectType):
    posts = graphene.List(PostGraph)
    count = graphene.Int()