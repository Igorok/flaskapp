from flaskapp.models.index import get_db

class User():
    def __init__(self, **kwargs):
        self.id = kwargs['id'] if 'id' in kwargs else None
        self.login = kwargs['login'] if 'login' in kwargs else None
        self.password = kwargs['password'] if 'password' in kwargs else None
        self.role = kwargs['role'] if 'role' in kwargs else None

    def add_user(self):
        db = get_db()
        db.execute('insert into user (login, password, role) values (?, ?, ?)',
                [self.login, self.password, self.role])
        db.commit()

    def get_user_list(self):
        db = get_db()
        cur = db.execute('select * from user order by id desc')
        u_list = cur.fetchall()

        return u_list or []