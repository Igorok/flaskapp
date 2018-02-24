from flaskapp.models.index import connect_db

class User():
    ROLE_USER = 0
    ROLE_ADMIN = 1

    def __init__(self, **kwargs):
        self.id = kwargs['id'] if 'id' in kwargs else None
        self.login = kwargs['login'] if 'login' in kwargs else None
        self.password = kwargs['password'] if 'password' in kwargs else None
        self.email = kwargs['email'] if 'email' in kwargs else None
        self.role = kwargs['role'] if 'role' in kwargs else self.ROLE_USER

    def add_user(self):
        if (
            self.login == None or
            self.password == None or
            self.email == None
        ): 
            raise Exception('Login, email and password are required')
        
        print(self.login, self.password, self.email, self.role);

        connection = connect_db()
        with connection.cursor() as cursor:
            sql = 'insert into `user` (`login`, `password`, `email`, `role`) values (%s, %s, %s, %s);'
            cursor.execute(sql, (self.login, self.password, self.email, self.role))
            connection.commit()
            connection.close()
            return dict(
                id=self.id,
                login=self.login,
                password=self.password,
                email=self.email,
                role=self.role,
            )

    def get_user_list(self):
        connection = connect_db()
        with connection.cursor() as cursor:
            sql = 'select * from user order by id desc'
            cursor.execute(sql)
            u_list = cursor.fetchall()
            connection.close()
            return u_list or []