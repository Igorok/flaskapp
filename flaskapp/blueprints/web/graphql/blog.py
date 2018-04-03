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
