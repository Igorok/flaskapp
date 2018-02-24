from flaskapp.models.user import User


class ActionUser:
    def add_user(self, **user):
        u = User(**user)
        __u_dict = u.add_user()
        return __u_dict

    def get_user_list(self):
        u = User()
        __u_list = u.get_user_list()
        return __u_list