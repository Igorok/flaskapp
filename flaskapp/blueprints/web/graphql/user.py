import graphene

class GraphUser(graphene.ObjectType):
    id = graphene.ID()
    login = graphene.String()
    email = graphene.String()
    password = graphene.String()
    role = graphene.String()
    token = graphene.String()


class GraphUserList(graphene.ObjectType):
    id = graphene.ID()
    users = graphene.List(GraphUser)



class Patron(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()
    age = graphene.Int()

class PatronList(graphene.ObjectType):
    id = graphene.ID()
    patrons = graphene.List(Patron)
