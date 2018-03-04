import graphene

class User(graphene.ObjectType):
    id = graphene.ID()
    login = graphene.String()
    email = graphene.String()
    password = graphene.String()
    token = graphene.String()


class UserList(graphene.ObjectType):
    users = graphene.List(User)


