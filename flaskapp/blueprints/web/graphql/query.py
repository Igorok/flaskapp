import graphene
from flaskapp.blueprints.web.graphql.user import GraphUser, GraphUserList, Patron, PatronList


from flaskapp.blueprints.web.models.user import User



def getPatrList ():
    pList = [];
    for i in range(10):
        pList.append(
            Patron(
                id = i,
                name = "qwe" + str(i),
                age = 2 * i
            )
        )
    return pList


# assign values to query
class Query(graphene.ObjectType):
 
    user = graphene.Field(GraphUser, id=graphene.String())
    def resolve_user(self, info, id):
         print('user')

    userlist = graphene.Field(GraphUserList, id=graphene.String())
    def resolve_userlist(self, info, id):
        print('users', id)
        
        u = User()
        u_list = u.list()

        print('u_list', u_list)

        users = []

        for v in u_list:
            users.append(GraphUser(**v))
        

        return GraphUserList(
            users = users
        )

    
    
    
    patron = graphene.Field(Patron)

    def resolve_patron(self, info):
        return Patron(id=1, name='Syrus', age=27)

    patronlist = graphene.Field(PatronList, id=graphene.Int())    

    def resolve_patronlist(self, info, id):
        return PatronList(
            patrons = getPatrList(),
            id = id
        )


# init query
schema = graphene.Schema(query=Query)