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

        selGrRows = ['id', 'user_id', 'friend_id', 'date'];
        selGrSql = '''select {0}, {1}, {2}, {3} from "chat_private"
            where ({1}=%s and {2}=%s) or ({1}=%s and {2}=%s)
            '''.format(*selGrRows);

        insGrSql = '''insert into "chat_private"
            ({1}, {2}, {3}) values (%s, %s, %s)
            returning "{0}"'''.format(*selGrRows)

        selGrByIdSql = '''select {0}, {1}, {2}, {3} from "chat_private"
            where {0}=%s
            '''.format(*selGrRows);

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(selGrSql, [
            profileDict['id'],
            kwargs['friendId'],
            kwargs['friendId'],
            profileDict['id']
        ])
        selGrData = cursor.fetchone()

        if (selGrData is None):
            cursor.execute(insGrSql, [
                profileDict['id'],
                kwargs['friendId'],
                datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            ])
            grId = cursor.fetchone()[0]
            connection.commit()
            cursor.execute(selGrByIdSql, [grId])
            selGrData = cursor.fetchone()

        ltd = self.list_to_dict(selGrRows)
        selGrDict = ltd(selGrData)

        selGrDict['date'] = selGrDict['date'].strftime('%Y-%m-%d %H:%M:%S')

        return selGrDict
