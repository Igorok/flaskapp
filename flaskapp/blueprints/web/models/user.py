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

    # get list of users
    # def list(self):
    #     connection = self.connect_postgres()
    #     cursor = connection.cursor()

    #     sql_rows = ['id', 'login', 'email', 'role', self.TABLE]

    #     sql = '''select {0}, {1}, {2}, {3} 
    #         from "{4}" 
    #         order by id desc'''.format(*sql_rows)
        
    #     cursor.execute(sql)
    #     u_list = cursor.fetchall()
    #     connection.close()

    #     u_list = map(self.list_to_dict(sql_rows), u_list)
    #     return u_list or []



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


    def getUserList (self, *args, **kwargs):
         # check authentication and get data of current user
        profile_dict = self.getUserByToken(**kwargs)

        start = int(kwargs['start']) if ('start' in kwargs) else 0
        perpage = int(kwargs['perpage']) if ('perpage' in kwargs) else 20

        listResult = {
            'count': 0,
            'users': []
        }


        """

        select 
            uTable.id,
            uTable.login,
            uTable.email,
            friends.user_id as u_id,
            friends.friend_id as f_id,
            friends.active as f_a
            from "user" as uTable
        left join friends
            on uTable.id = friends.user_id
            and friends.friend_id = 1
        where uTable.id != 1
        limit 10;



        id = graphene.ID()
        login = graphene.String()
        email = graphene.String()
        friend = graphene.Int()
        online = graphene.Boolean()
        dtActive = graphene.String()
        """


        userSql = '''
            select 
                uTable.id,
                uTable.login,
                uTable.email,
                friends.user_id as u_id,
                friends.friend_id as f_id,
                friends.active as f_a
                from "user" as uTable
            left join friends
                on uTable.id = friends.user_id
                and friends.friend_id = 1
            where uTable.id != 1
            limit 10;
        '''
        connection = self.connect_postgres()
        cursor = connection.cursor()
        cursor.execute(blogSql, (kwargs['blogId'], profileDict['id']))
        blogData = cursor.fetchone()

        if (blogData is None):
            connection.close()
            return listResult

        listResult['blog'] = self.list_to_dict(blogRows)(blogData)

        postRows = (
            'id', 'blogId', 'title', 'description', 'public', 'date', 
            'userId', 'userName'
        )
        postSql = '''select 
            post.id as {0},
            post.blog_id as {1},
            post.title as {2},
            post.description as {3},
            post.public as {4},
            post.date as {5},
            uTable.id as {6},
            uTable.login as {7}
            from post
            left join "user" as uTable on post.user_id = uTable.id
            where post.blog_id = %s and post.user_id = %s
            order by post.{0} desc limit %s offset %s;
            ;'''.format(*postRows)

        cursor.execute(postSql, (
            kwargs['blogId'], 
            profileDict['id'],
            perpage,
            start
        ))
        postData = cursor.fetchall()

        countSql = 'select count(id) from post where blog_id = %s and user_id = %s;'
        cursor.execute(countSql, (
            kwargs['blogId'], 
            profileDict['id']
        ))
        countData = cursor.fetchone()
        
        if (countData != None):
            listResult['count'] = countData[0]

        if (postData != None):
            listResult['posts'] = map(self.list_to_dict(postRows), postData)

        return listResult




        return listResult