from flaskapp.blueprints.web.models.index import Model
from flaskapp.blueprints.web.models.user import UserModel
from datetime import datetime, timedelta

class ChatModel (Model):
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

        selGrRows = ['id', 'user_id', 'friend_id', 'date']
        selGrSql = '''select {0}, {1}, {2}, {3} from "chat_private"
            where ({1}=%s and {2}=%s) or ({1}=%s and {2}=%s)
            '''.format(*selGrRows)

        insGrSql = '''insert into "chat_private"
            ({1}, {2}, {3}) values (%s, %s, %s)
            returning "{0}";'''.format(*selGrRows)

        selGrByIdSql = 'select {0}, {1}, {2}, {3} from "chat_private" where {0}=%s;'.format(*selGrRows)
        # try to get private group with friendId and current user id
        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(selGrSql, [
            profileDict['id'],
            kwargs['friendId'],
            kwargs['friendId'],
            profileDict['id']
        ])
        selGrData = cursor.fetchone()
        # if group not found, insert new group
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

        #get users from group
        selUsrRows = ['id', 'login', 'dateReg', 'dateAct']
        selUsrSql = '''select {0}, {1}, date_reg as {2}, date_act as {3} 
            from "user" where {0}=any(%s);
            '''.format(*selUsrRows)
        cursor.execute(selUsrSql, [
            [selGrDict['user_id'], selGrDict['friend_id']]
        ])
        selUsrData = cursor.fetchall()
        ltdUsr = self.list_to_dict(selUsrRows)
        usrList = []
        uModel = UserModel()

        for u in selUsrData:
            ud = ltdUsr(u)
            onlData = uModel.checkOnline(ud)
            usrList.append({
                'id': ud['id'],
                'login': ud['login'],
                'online': onlData['online'],
                'dateAct': onlData['dateAct'].strftime('%Y-%m-%d %H:%M:%S'),
            })

        #get messages from group
        '''
        "id" SERIAL PRIMARY KEY,
        "user_id" SERIAL NOT NULL,
        "chat_id" SERIAL NOT NULL,
        "text" text,
        "date" timestamp DEFAULT NULL
        '''
        selMsgRows = ['id', 'userId', 'chatId', 'text', 'date']
        selMsgSql = '''select {0}, user_id as {1}, chat_id as {2}, {3}, {4}
            from "chat_message" where chat_id=%s
            order by id desc 
            limit %s
            ;'''.format(*selMsgRows)
        cursor.execute(selMsgSql, [
            selGrDict['id'],
            100
        ])
        selMsgData = cursor.fetchall()
        msgList = []
        if (not selMsgData is None):
            ltdMsg = self.list_to_dict(selMsgRows)
            msgList = list(map(ltdMsg, selMsgData))

        resDict = {
            'id': selGrDict['id'],
            'userId': selGrDict['user_id'],
            'friendId': selGrDict['friend_id'],
            'date': selGrDict['date'].strftime('%Y-%m-%d %H:%M:%S'),
            'users': usrList,
            'messages': msgList
        }

        return resDict
