
import graphene

class ChatPrivateGraph (graphene.ObjectType):
    id = graphene.Int()
    userId = graphene.Int()
    friendId = graphene.Int()
    linkId = graphene.Int()
    userLogin = graphene.String()
    friendLogin = graphene.String()


class ChatListGraph (graphene.ObjectType):
    chatPrivate = graphene.List(ChatPrivateGraph)
    chatGroup = graphene.List(ChatPrivateGraph)
    count = graphene.Int()