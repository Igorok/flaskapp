import graphene

class RegGraph (graphene.ObjectType):
    login = graphene.String()
    email = graphene.String()

class AuthGraph (graphene.ObjectType):
    id = graphene.ID()
    login = graphene.String()
    email = graphene.String()
    role = graphene.String()
    token = graphene.String()

class ProfileGraph (graphene.ObjectType):
    id = graphene.ID()
    login = graphene.String()
    email = graphene.String()
    role = graphene.String()
    friends = graphene.Int()
    friendRequests = graphene.Int()
    selfFriendRequests = graphene.Int()
    countChats = graphene.Int()
    countBlogs = graphene.Int()

class EditProfileGraph (graphene.ObjectType):
    login = graphene.String()
    email = graphene.String()

class UserDetailGraph (graphene.ObjectType):
    id = graphene.ID()
    login = graphene.String()
    email = graphene.String()
    friend = graphene.Int()
    online = graphene.Boolean()
    dtActive = graphene.String()

class UserListGraph (graphene.ObjectType):
    count = graphene.Int()
    users = graphene.List(UserDetailGraph)
