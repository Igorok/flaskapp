from flaskapp.blueprints.web.models.index import Model
from flaskapp.blueprints.web.models.user import UserModel
from datetime import datetime, timedelta

class ChatModel (Model):
    '''
    id: null,
    userId: userId,
    friendId: null,
    date: null,
    users: [],
    messages: [],
    '''

    """
    get private chat group by friendId
    :param token: - current token of user
    :param friendId: - friendId of friend
    return object, contain id of group, list of users and messages
    """
    def getPrivateGroup(self, *args, **kwargs):
        if (not 'friendId' in kwargs):
            raise Exception('Group not found')

        # check authentication and get data of current user
        uModel = UserModel()
        profileDict = uModel.getUserByToken(**kwargs)

        return None