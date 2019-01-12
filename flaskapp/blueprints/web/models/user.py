from flaskapp.blueprints.web.models.index import Model
from hashlib import sha256
from uuid import uuid4
from flaskapp.config import config
from datetime import datetime, timedelta

class UserItem ():
    ROLE_USER = 0
    ROLE_ADMIN = 1
    # create entity of user
    def __init__(self, **kwargs):
        self.id = kwargs['id'] if 'id' in kwargs else None
        self.login = kwargs['login'] if 'login' in kwargs else None
        self.password = kwargs['password'] if 'password' in kwargs else None
        self.confirmPassword = kwargs['confirmPassword'] if 'confirmPassword' in kwargs else None
        self.email = kwargs['email'] if 'email' in kwargs else None
        self.role = kwargs['role'] if 'role' in kwargs else self.ROLE_USER

        if 'date_reg' in kwargs:
            self.date_reg = str(kwargs['date_reg']).strip()
        else:
            self.date_reg = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        if 'date_act' in kwargs:
            self.date_act = str(kwargs['date_act']).strip()


    def registrationValidate(self):
        if (
            self.password == None or
            self.email == None
        ):
            raise Exception('Email and password are required!')

        if (self.password != self.confirmPassword):
            raise Exception('Please confirm password!')



class UserModel (Model):
    TABLE = 'user'
    TABLE_TOKEN = 'token'

    # check the date of last user activity and return his status
    def checkOnline(self, uDict):
        dateAct = uDict['dateReg']
        if (
            'dateAct' in uDict and
            not uDict['dateAct'] is None
        ):
            dateAct = uDict['dateAct']
        dateDiff = (datetime.now() - dateAct).total_seconds() / 60.0
        return {
            'dateAct': dateAct,
            'online': dateDiff < 5
        }

    # hash password of user
    def hash_password (self, password):
        return sha256(str(password + config['SALT']).encode('utf-8')).hexdigest()

    # find users with equal login, email and different ids
    def check_unique (self, **kwargs):
        if (
            not 'id' in kwargs or
            not 'login' in kwargs or
            not 'email' in kwargs
        ):
            raise Exception('Login and email are required')

        user_id = kwargs['id'] if kwargs['id'] != None else -1

        connection = self.connect_postgres()
        cursor = connection.cursor()

        sql = '''select count(id) from "{0}"
            where (login = %s or email = %s)
            and id != %s'''.format(self.TABLE)

        cursor.execute(sql, [kwargs['login'], kwargs['email'], user_id])
        result = cursor.fetchone()
        connection.close()

        if (result[0] != 0):
            raise Exception('Login or email already exists')

        return result[0]


    # add new user
    def registration (self, **kwargs):
        user = UserItem(**kwargs)
        user.registrationValidate()
        user.login = user.email
        count = self.check_unique(id = user.id, login = user.login, email = user.email)
        password = self.hash_password(user.password)

        sql = '''insert into "{0}"
            ("login", "password", "email", "role", "date_reg")
            values (%s, %s, %s, %s, %s);'''.format(self.TABLE)

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(sql, [user.login, password, user.email, user.role, user.date_reg])
        connection.commit()
        connection.close()

        return dict(
            login=user.login,
            email=user.email,
        )

    """
    login function
    @param {string} login - login
    @param {string} password - password
    """
    def authenticate(self, *args, **kwargs):
        # Login and password are required
        if (
            not 'login' in kwargs or
            not 'password' in kwargs
        ):
            raise Exception('Login and password are required')

        # hash password, select user
        password = self.hash_password(kwargs['password'])
        sql_rows = ['id', 'login', 'email', 'role', self.TABLE]

        connection = self.connect_postgres()
        cursor = connection.cursor()

        sql_select = '''select {0}, {1}, {2}, {3}
            from "{4}"
            where "login" = %s
            and "password" = %s;'''.format(*sql_rows)

        cursor.execute(sql_select, (kwargs['login'], password))
        found_user = cursor.fetchone()

        #user not found
        if (found_user == None):
            connection.close()
            raise Exception('Wrong login or password')

        # conver result to dict
        ltd_func = self.list_to_dict(sql_rows)
        auth_user = ltd_func(found_user)

        # update token of user
        auth_type = kwargs['type'] if 'type' in kwargs else 'web'
        auth_token = uuid4().hex
        auth_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        sql_update = '''insert into {0} ("user_id", "type", "date", "token")
            values (%s, %s, %s, %s)
            on conflict ("user_id", "type") do update
            set "date" = excluded.date,
            "token" = excluded.token;'''.format(self.TABLE_TOKEN)

        cursor.execute(sql_update, [auth_user['id'], auth_type, auth_date, auth_token])
        connection.commit()
        connection.close()

        auth_user['token'] = auth_token

        # return dict with user data
        return auth_user



    """
    get user by his token
    :param token: - current token after authentification
    :param device: - type of device, web or mobile
    return user entity
    """
    def getUserByToken (self, *args, **kwargs):
        if (not 'token' in kwargs):
            raise Exception('User not found')

        # get token for web or mobile
        tokenVal = kwargs['token']
        tokenType = kwargs['device'] if 'device' in kwargs else 'web'
        tokenRows = ['id', 'token', 'user_id', 'date', self.TABLE_TOKEN]
        tokenQuery = 'select {0}, {1}, {2}, {3} from {4} where token = %s and "type" = %s'.format(*tokenRows)

        connection = self.connect_postgres()
        cursor = connection.cursor()

        cursor.execute(tokenQuery, [tokenVal, tokenType])
        tokenFound = cursor.fetchone()

        # if token not found, access denied
        if (tokenFound == None):
            connection.close()
            raise Exception(403)

        # create a dictionary from list of values
        ltd_func = self.list_to_dict(tokenRows)
        tokenDict = ltd_func(tokenFound)

        # check that token is actual
        dateNow = datetime.now()
        dateEnd = tokenDict['date'] + timedelta(days = config['TOKEN_LIFETIME'])

        if dateNow > dateEnd:
            connection.close()
            raise Exception(403)

        # get user by user_id from token table
        userRows = ['id', 'login', 'email', 'role', self.TABLE]
        userQuery = 'select "{0}", "{1}", "{2}", "{3}" from "{4}" where "id" = %s'.format(*userRows)

        cursor.execute(userQuery, [tokenDict['user_id']])
        userFound = cursor.fetchone()

        # if user not found, access denied
        if (userFound == None):
            connection.close()
            raise Exception(403)

        # create a dictionary from list of values
        ltd_func = self.list_to_dict(userRows)
        userDict = ltd_func(userFound)

        # update user activity
        updateQuery = 'update "{0}" set "date_act" = %s where "id" = %s;'.format(self.TABLE)
        cursor.execute(updateQuery, [
            datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            userDict['id']
        ])
        connection.commit()
        connection.close()

        return userDict




    """
    get user profile
    :param token: - current token of user
    :param device: - type of device, web or mobile
    return profile of user
    """

    def getUserProfile (self, *args, **kwargs):
        # check authentication and get data of current user
        profile_dict = self.getUserByToken(**kwargs)

        profile_dict['friends'] = 0
        profile_dict['friendRequests'] = 0
        profile_dict['selfFriendRequests'] = 0
        profile_dict['countChats'] = 0
        profile_dict['countBlogs'] = 0

        blogQ = 'select count(id) from blog where user_id = %s;'
        chatQ = 'select count(id) from chat_private where user_id = %s or friend_id = %s;'
        friendsQ = '''select count(friends.id) from friends
            join friends as approve on friends.friend_id = approve.user_id 
                and friends.user_id = approve.friend_id
            where friends.user_id = %s;
        '''
        selfReqQ = '''select count (friends.id) from friends
            left join friends as approve on friends.friend_id = approve.user_id 
                and friends.user_id = approve.friend_id
            where friends.user_id = %s and approve.user_id is null;
        '''
        usrReqQ = '''select count(approve.friend_id) from friends
            right join friends as approve on friends.friend_id = approve.user_id
                and friends.user_id = approve.friend_id
            where approve.friend_id = %s and friends.user_id is null;
        '''
        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(blogQ, [profile_dict['id']])
        blogD = cursor.fetchone()
        if not blogD is None:
            profile_dict['countBlogs'] = blogD[0]

        cursor.execute(chatQ, [profile_dict['id'], profile_dict['id']])
        chatD = cursor.fetchone()
        if not chatD is None:
            profile_dict['countChats'] = chatD[0]

        cursor.execute(friendsQ, [profile_dict['id']])
        friendsD = cursor.fetchone()
        if not friendsD is None:
            profile_dict['friends'] = friendsD[0]
        
        cursor.execute(selfReqQ, [profile_dict['id']])
        selfReqD = cursor.fetchone()
        if not selfReqD is None:
            profile_dict['selfFriendRequests'] = selfReqD[0]

        cursor.execute(usrReqQ, [profile_dict['id']])
        usrReqD = cursor.fetchone()
        if not usrReqD is None:
            profile_dict['friendRequests'] = usrReqD[0]

        connection.close()

        return profile_dict

    """
    update user profile, at current moment possible to change only login and email
    both parameters are required
    :param token: - current token of user
    :param device: - type of device, web or mobile
    :param login: - login
    :param email: - email
    return new login and email
    """
    def editUserProfile (self, *args, **kwargs):
        # check authentication and get data of current user
        profile_dict = self.getUserByToken(**kwargs)

        # check required params
        if (
            not 'login' in kwargs or
            not 'email' in kwargs
        ):
            raise Exception('Nothing to change')

        login = str(kwargs['login']).strip()
        email = str(kwargs['email']).strip()

        # check that login or email was changed
        if (
            login == profile_dict['login'] and
            email == profile_dict['email']
        ):
            raise Exception('Nothing to change')

        # check that login and email not already used for other users
        count = self.check_unique(
            id = profile_dict['id'],
            login = login,
            email = email
        )

        update_query = 'update "{0}" set "login" = %s, "email" = %s where "id" = %s;'.format(self.TABLE)

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(update_query, [login, email, profile_dict['id']])
        connection.commit()
        connection.close()

        return dict(
            login = login,
            email = email
        )


    # list of users
    def getUserList (self, *args, **kwargs):
        # check authentication and get data of current user
        profile_dict = self.getUserByToken(**kwargs)

        start = int(kwargs['start']) if ('start' in kwargs) else 0
        perpage = int(kwargs['perpage']) if ('perpage' in kwargs) else 20

        listResult = {
            'count': 0,
            'users': []
        }
        userRows = [
            'id', 'login', 'email', 'dateAct', 'dateReg', # user data
            'selfFriendId', # friend for whom did send request this user
            'friendUserId' # user that did send friend request for this user
        ]

        # get data from the user table, excluding the current user
        # first join - get friends request to current user from this row
        # second join - get friends request from current user to this row
        userSql = '''
            select
                uTable.id as {0},
                uTable.login as {1},
                uTable.email as {2},
                uTable.date_act as {3},
                uTable.date_reg as {4},

                selfReq.friend_id as {5},
                frReq.user_id as {6}

                from "user" as uTable
            left join friends as selfReq
                on uTable.id = selfReq.user_id
                and selfReq.friend_id = %s

            left join friends as frReq
                on uTable.id = frReq.friend_id
                and frReq.user_id = %s

            where uTable.id != %s
            order by uTable.id asc limit %s offset %s;
        '''.format(*userRows)
        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(userSql, [
            profile_dict['id'],
            profile_dict['id'],
            profile_dict['id'],
            perpage,
            start
        ])
        userData = cursor.fetchall()

        # format users data for frontend
        if (userData is None):
            connection.close()
            return listResult
        else:
            ltd = self.list_to_dict(userRows)
            for u in userData:
                uDict = ltd(u)
                # check the date of last activity
                onlineInfo = self.checkOnline(uDict)

                uFormat = {
                    'id': uDict['id'],
                    'login': uDict['login'],
                    'email': uDict['email'],
                    'selfFriendId': uDict['selfFriendId'],
                    'friendUserId': uDict['friendUserId'],
                    'online': onlineInfo['online'],
                    'dtActive': onlineInfo['dateAct'].strftime('%Y-%m-%d %H:%M:%S'),
                }
                listResult['users'].append(uFormat)

        # get count of users for paginator
        countSql = 'select count(id) from "user" where "user".id != %s;'
        cursor.execute(countSql, [
            profile_dict['id']
        ])
        countData = cursor.fetchone()
        connection.close()

        if (countData != None):
            listResult['count'] = countData[0]

        return listResult


    """
    send friend request to some user
    :param token: - current token of user
    :param id: - id of the user for friendship
    return True if request added
    """
    def friendRequest (self, *args, **kwargs):
        # check authentication and get data of current user
        profile_dict = self.getUserByToken(**kwargs)

        id = int(kwargs['id']) if ('id' in kwargs) else 0
        dt = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        connection = self.connect_postgres()
        cursor = connection.cursor()

        sqlUpdate = '''insert into "friends" ("user_id", "friend_id", "date")
            values (%s, %s, %s)
            on conflict ("user_id", "friend_id") do update
            set "date" = excluded.date;
        '''

        cursor.execute(sqlUpdate, [profile_dict["id"], id, dt])
        connection.commit()
        connection.close()

        return {
            'success': True,
            'friendId': id,
            'userId': profile_dict["id"]
        }

    """
    remove friend request to some user
    :param token: - current token of user
    :param id: - id of the user for friendship
    return True if request deleted
    """
    def friendRemove (self, *args, **kwargs):
        # check authentication and get data of current user
        profile_dict = self.getUserByToken(**kwargs)

        id = int(kwargs['id']) if ('id' in kwargs) else 0
        dt = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        connection = self.connect_postgres()
        cursor = connection.cursor()

        sqlRemove = 'delete from "friends" where user_id=%s and friend_id=%s;'

        cursor.execute(sqlRemove, [profile_dict["id"], id])
        connection.commit()
        connection.close()

        return {
            'success': True,
            'friendId': id,
            'userId': profile_dict["id"]
        }

    # list of friends
    def getFriendList (self, *args, **kwargs):
        # check authentication and get data of current user
        profile_dict = self.getUserByToken(**kwargs)

        start = int(kwargs['start']) if ('start' in kwargs) else 0
        perpage = int(kwargs['perpage']) if ('perpage' in kwargs) else 20

        listResult = {
            'count': 0,
            'friends': []
        }
        userRows = [
            'id', 'login', 'email', 'dateAct', 'dateReg', # user data
            'selfFriendId', # friend for whom did send request this user
            'friendUserId' # user that did send friend request for this user
        ]

        userSql = '''
            select uTable.id as {0},
                uTable.login as {1},
                uTable.email as {2},
                uTable.date_act as {3},
                uTable.date_reg as {4},
                selfReq.friend_id as {5},
                usrReq.user_id as {6}

            from "user" as uTable

            left join friends as selfReq
                on uTable.id = selfReq.user_id
                and selfReq.friend_id = %s

            left join friends as usrReq
                on uTable.id = usrReq.friend_id
                and usrReq.user_id = %s

            where uTable.id <> %s
                and selfReq.friend_id = %s
                and usrReq.user_id = %s

            order by uTable.id asc limit %s offset %s;
        '''.format(*userRows)

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(userSql, [
            profile_dict['id'],
            profile_dict['id'],
            profile_dict['id'],
            profile_dict['id'],
            profile_dict['id'],
            perpage,
            start
        ])
        userData = cursor.fetchall()

        # format users data for frontend
        if (userData is None):
            connection.close()
            return listResult
        else:
            ltd = self.list_to_dict(userRows)
            for u in userData:
                uDict = ltd(u)
                # check the date of last activity
                onlineInfo = self.checkOnline(uDict)

                uFormat = {
                    'id': uDict['id'],
                    'login': uDict['login'],
                    'email': uDict['email'],
                    'selfFriendId': uDict['selfFriendId'],
                    'friendUserId': uDict['friendUserId'],
                    'online': onlineInfo['online'],
                    'dtActive': onlineInfo['dateAct'].strftime('%Y-%m-%d %H:%M:%S'),
                }
                listResult['friends'].append(uFormat)

        # get count of users for paginator
        countSql = 'select count(id) from "user" where "user".id != %s;'
        countSql = '''
            select count(uTable.id)

            from "user" as uTable

            left join friends as selfReq
                on uTable.id = selfReq.user_id
                and selfReq.friend_id = %s

            left join friends as usrReq
                on uTable.id = usrReq.friend_id
                and usrReq.user_id = %s

            where uTable.id <> %s
                and selfReq.friend_id = %s
                and usrReq.user_id = %s
        '''.format(*userRows)

        cursor.execute(countSql, [
            profile_dict['id'],
            profile_dict['id'],
            profile_dict['id'],
            profile_dict['id'],
            profile_dict['id']
        ])
        countData = cursor.fetchone()
        connection.close()

        if (countData != None):
            listResult['count'] = countData[0]

        return listResult

    '''
    logout
    @param {string} toke - token of current user
    '''
    def logout (self, *args, **kwargs):
        if (not 'token' in kwargs):
            raise Exception('User not found')

        logSql = 'delete from token where token.token = %s;'

        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(logSql, [kwargs['token']])
        connection.commit()
        connection.close()

        return {'success': True}