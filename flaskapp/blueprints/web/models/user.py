from flaskapp.blueprints.web.models.index import connect_postgres, list_to_dict
from hashlib import sha256
from uuid import uuid4
from flaskapp.config import config
import time

class UserModel ():
    ROLE_USER = 0
    ROLE_ADMIN = 1
    TABLE = 'user'
    TABLE_TOKEN = 'token'

    def __init__(self, **kwargs):
        self.id = kwargs['id'] if 'id' in kwargs else None
        self.login = kwargs['login'] if 'login' in kwargs else None
        self.password = kwargs['password'] if 'password' in kwargs else None
        self.email = kwargs['email'] if 'email' in kwargs else None
        self.role = kwargs['role'] if 'role' in kwargs else self.ROLE_USER

    def hash_password (self, password):
        return sha256(str(password + config['SALT']).encode('utf-8')).hexdigest()

    def check_unique (self, **kwargs):
        if (
            not 'id' in kwargs or
            not 'login' in kwargs or
            not 'email' in kwargs
        ): 
            raise Exception('Login and email are required')

        user_id = kwargs['id'] if kwargs['id'] != None else -1

        connection = connect_postgres()
        cursor = connection.cursor()

        sql = '''select count(id) from "{0}"
            where (login = %s or email = %s)
            and id != %s'''.format(self.TABLE);

        cursor.execute(sql, (kwargs['login'], kwargs['email'], user_id))
        result = cursor.fetchone()
        connection.close()

        if (result[0] != 0):
            raise Exception('Login or email already exists')

        return result[0]


    def add_user(self):
        if (
            self.login == None or
            self.password == None or
            self.email == None
        ): 
            raise Exception('Login, email and password are required')
        
        count = self.check_unique(id = self.id, login = self.login, email = self.email)
        password = self.hash_password(self.password)
        sql = '''insert into "{0}" 
            ("login", "password", "email", "role") 
            values (%s, %s, %s, %s);'''.format(self.TABLE)
        
        connection = connect_postgres()
        cursor = connection.cursor()
        cursor.execute(sql, (self.login, password, self.email, self.role))
        connection.commit()
        connection.close()

        return dict(
            id=self.id,
            login=self.login,
            email=self.email,
            role=self.role,
        )

    def list(self):
        connection = connect_postgres()
        cursor = connection.cursor()

        sql_rows = ['id', 'login', 'email', 'role', self.TABLE]

        sql = '''select {0}, {1}, {2}, {3} 
            from "{4}" 
            order by id desc'''.format(*sql_rows)
        
        cursor.execute(sql)
        u_list = cursor.fetchall()
        connection.close()

        u_list = map(list_to_dict(sql_rows), u_list)
        return u_list or []

    def authenticate(self, *args, **kwargs):
        if (
            not 'login' in kwargs or
            not 'password' in kwargs
        ):
            raise Exception('Login and password are required')
        
        password = self.hash_password(kwargs['password'])
        auth_user = {}
        
        sql_rows = ['id', 'login', 'email', 'role', self.TABLE]

        connection = connect_postgres()
        cursor = connection.cursor()
        
        sql_select = '''select {0}, {1}, {2}, {3} 
            from "{4}" 
            where "login" = %s 
            and "password" = %s;'''.format(*sql_rows)

        cursor.execute(sql_select, (kwargs['login'], password))

        found_user = cursor.fetchone()

        if (found_user == None):
            connection.close()
            raise Exception('Wrong login or password')

        ltd_func = list_to_dict(sql_rows)
        auth_user = ltd_func(found_user)
        auth_type = kwargs['type'] if 'type' in kwargs else 'web'
        auth_token = uuid4().hex
        auth_date = time.strftime('%Y-%m-%d %H:%M:%S')

        sql_update = '''insert into {0} ("user_id", "type", "date", "token")
            values (%s, %s, %s, %s)
            on conflict ("user_id", "type") do update 
            set "date" = excluded.date,
            "token" = excluded.token;'''.format(self.TABLE_TOKEN)
    
        cursor.execute(sql_update, (auth_user['id'], auth_type, auth_date, auth_token))
        
        connection.commit()
        connection.close()

        auth_user['token'] = auth_token
        
        return auth_user