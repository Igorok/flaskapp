import graphene

class UserGraph (graphene.ObjectType):
    id = graphene.ID()
    login = graphene.String()
    email = graphene.String()
    role = graphene.String()


class UserListGraph (graphene.ObjectType):
    id = graphene.ID()
    users = graphene.List(UserGraph)

class AuthGraph (graphene.ObjectType):
    id = graphene.ID()
    login = graphene.String()
    email = graphene.String()
    role = graphene.String()
    token = graphene.String()