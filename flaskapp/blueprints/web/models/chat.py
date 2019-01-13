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
    def joinPrivateGroup(self, *args, **kwargs):
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
        
        cursor = self.connection.cursor()
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
            self.connection.commit()
            cursor.execute(selGrByIdSql, [grId])
            selGrData = cursor.fetchone()

        ltd = self.list_to_dict(selGrRows)
        selGrDict = ltd(selGrData)

        #get users from group
        selUsrRows = ['id', 'login', 'dateReg', 'dateAct']
        selUsrSql = '''select {0}, {1}, date_reg as {2}, date_act as {3} 
            from "user" where {0}=any(%s)
            order by id asc;
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
        selMsgRows = ['id', 'userId', 'chatId', 'text', 'date', 'userLogin']
        selMsgSql = '''select 
                chat_message.id as {0}, 
                chat_message.user_id as {1}, 
                chat_message.chat_id as {2}, 
                chat_message.text as {3}, 
                chat_message.date as {4},
                uTable.login as {5}
            from "chat_message" 
            join "user" as uTable on uTable.id = chat_message.user_id
            where chat_message.chat_id=%s
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
            for msg in selMsgData:
                msgDict = ltdMsg(msg)
                msgDict['date'] = msgDict['date'].strftime('%Y-%m-%d %H:%M')
                msgList.append(msgDict)
            msgList.reverse()

        resDict = {
            'id': selGrDict['id'],
            'userId': selGrDict['user_id'],
            'friendId': selGrDict['friend_id'],
            'date': selGrDict['date'].strftime('%Y-%m-%d %H:%M:%S'),
            'users': usrList,
            'messages': msgList
        }

        return resDict


    """
    receive message from user
    :param token: - current token of user
    :param chatId: - id of chat room
    :param text: - text of message

    return saved message 
    """
    def messagePrivate (self, *args, **kwargs):
        if (not 'chatId' in kwargs):
            raise Exception('Chat room not found')

        if (
            not 'text' in kwargs or
            kwargs['text'] is None or
            len(str(kwargs['text'])) == 0
        ):
            return None
        
        # check authentication and get data of current user
        uModel = UserModel()
        profileDict = uModel.getUserByToken(**kwargs)

        # check access to chat room
        grRows = ['id', 'user_id', 'friend_id', 'date']
        grSql = '''select {0}, {1}, {2}, {3} 
            from chat_private
            where id = %s 
            and (user_id = %s or friend_id = %s)
            ;'''.format(*grRows)

        cursor = self.connection.cursor()
        cursor.execute(grSql, [
            kwargs['chatId'],
            profileDict['id'],
            profileDict['id']
        ])
        grId = cursor.fetchone()

        if (grId is None):
            raise Exception('Message not saved')

        # insert message and return dict with id
        insRows = ['id', 'user_id', 'chat_id', 'text', 'date']
        insDict = {
            'userId': profileDict['id'],
            'chatId': kwargs['chatId'],
            'text': str(kwargs['text']),
            'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        insSql = '''insert into "chat_message"
            ({1}, {2}, {3}, {4})
            values (%s, %s, %s, %s)
            returning {0};'''.format(*insRows)
        cursor.execute(insSql, [
            insDict['userId'],
            insDict['chatId'],
            insDict['text'],
            insDict['date'],
        ])
        insDict['id'] = cursor.fetchone()[0]
        self.connection.commit()

        insDict['userLogin'] = profileDict['login']
        insDict['date'] = datetime.strptime(insDict['date'], '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d %H:%M')

        return insDict


    '''
    get list of chats for current user
    token (string): - current token of user
    start (int): - skip
    perpage (int): - limit

    return the list of chat rooms
    '''


    # param: start = graphene.Int()

    def getChatList (self, *args, **kwargs):
        start = int(kwargs['start']) if ('start' in kwargs) else 0
        perpage = int(kwargs['perpage']) if ('perpage' in kwargs) else 20

        listResult = {
            'count': 0,
            'chatPrivate': [],
            'chatGroup': []
        }

        uModel = UserModel()
        # check authentication and get data of current user
        profileDict = uModel.getUserByToken(**kwargs)

        chatRows = ['id', 'userId', 'friendId', 'userLogin', 'friendLogin']
        chatSql = '''select 
            chat_private.id as {0}, 
            chat_private.user_id as {1},
            chat_private.friend_id as {2},
            uTable.login as {3},
            fTable.login as {4}
        from chat_private 
        left join "user" as uTable on uTable.id = chat_private.user_id
        left join "user" as fTable on fTable.id = chat_private.friend_id
        where chat_private.user_id = %s or chat_private.friend_id = %s
        order by chat_private.id desc
        limit %s offset %s;'''.format(*chatRows)

        cursor = self.connection.cursor()
        cursor.execute(chatSql, (
            profileDict['id'],
            profileDict['id'],
            perpage,
            start
        ))
        chatData = cursor.fetchall()

        countSql = 'select count(id) from chat_private where chat_private.user_id = %s or chat_private.friend_id = %s;'
        cursor.execute(countSql, (
            profileDict['id'],
            profileDict['id']
        ))
        countData = cursor.fetchone()

        if (countData != None):
            listResult['count'] = countData[0]

        if (chatData != None):
            for row in chatData:
                chat = self.list_to_dict(chatRows)(row)
                chat['linkId'] = chat['friendId'] if profileDict['id'] == chat['userId'] else chat['userId']
                listResult['chatPrivate'].append(chat)

        return listResult