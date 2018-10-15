from flaskapp.blueprints.web.models.index import connect_mysql
from hashlib import sha256
from uuid import uuid4
from flaskapp.config import config
import time

class User():
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

        connection = connect_mysql()
        with connection.cursor() as cursor:
            sql = '''select count(id) as `count` from `{0}`
                    where (login = %s or email = %s)
                    and id != %s'''.format(self.TABLE);

            cursor.execute(sql, (kwargs['login'], kwargs['email'], user_id))
            result = cursor.fetchone()
            connection.close()

            if (result['count'] != 0):
                raise Exception('Login or email already exists')

            return result['count']


    def add_user(self):
        if (
            self.login is None or
            self.password is None or
            self.email is None
        ): 
            raise Exception('Login, email and password are required')
        
        count = self.check_unique(id = self.id, login = self.login, email = self.email)
        password = self.hash_password(self.password)

        connection = connect_mysql()
        with connection.cursor() as cursor:
            sql = '''insert into `{0}` 
                (`login`, `password`, `email`, `role`) 
                values (%s, %s, %s, %s);'''.format(self.TABLE)
            cursor.execute(sql, (self.login, password, self.email, self.role))
            connection.commit()
            connection.close()
            return dict(
                id=self.id,
                login=self.login,
                email=self.email,
                role=self.role,
            )

    def get_user_list(self):
        connection = connect_mysql()
        with connection.cursor() as cursor:
            sql = 'select id, login, email, role from `' + self.TABLE + '` order by id desc'
            cursor.execute(sql)
            u_list = cursor.fetchall()
            connection.close()
            return u_list or []

    def authenticate(self, **kwargs):
        if (
            not 'login' in kwargs or
            not 'password' in kwargs
        ):
            raise Exception('Login and password are required')
        
        password = self.hash_password(kwargs['password'])

        connection = connect_mysql()
        auth_user = {}

        with connection.cursor() as cursor:
            sql_select = '''select id, login, email, role from {0} 
                where `login` = %s 
                and `password` = %s;'''.format(self.TABLE)
            cursor.execute(sql_select, (kwargs['login'], password))
            auth_user = cursor.fetchone()

        if (auth_user is None):
            connection.close()
            raise Exception('Wrong login or password')

        auth_type = kwargs['type'] if 'type' in kwargs else 'web'
        auth_token = uuid4().hex
        auth_date = time.strftime('%Y-%m-%d %H:%M:%S')

        # postgres
        # INSERT INTO the_table (id, column_1, column_2) 
        # VALUES (1, 'A', 'X'), (2, 'B', 'Y'), (3, 'C', 'Z')
        # ON CONFLICT (id) DO UPDATE 
        #    SET column_1 = excluded.column_1, 
        #    column_2 = excluded.column_2;

        with connection.cursor() as cursor:
            sql_update =  '''insert into {0} (`user_id`, `type`, `date`, `token`)
                values (%s, %s, %s, %s)
                on duplicate key update
                `date` = values(`date`), 
                `token` = values(`token`);'''.format(self.TABLE_TOKEN)
        
            cursor.execute(sql_update, (auth_user['id'], auth_type, auth_date, auth_token))
        
        connection.commit()
        connection.close()

        auth_user['token'] = auth_token
        
        return auth_user