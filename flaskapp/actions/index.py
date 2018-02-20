from flaskapp.models.user import User

def add_user(user):
    u = User(**user)
    u.add_user()
    __u_dict = {
        'id': u.id,
        'login': u.login,
        'password': u.password,
        'role': u.role,
    }
    return __u_dict

def get_user_list():
    u = User()
    u_list = u.get_user_list()
    return u_list