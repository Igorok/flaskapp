from flaskapp.blueprints.web.models.user import UserModel


class ActionUser:
    def add_user(self, *args, **kwargs):
        u = UserModel(**kwargs)
        u_dict = u.add_user()
        return u_dict

    def get_user_list(self, *args, **kwargs):
        u = UserModel()
        u_list = u.list()
        return u_list

    def authenticate(self, *args, **kwargs):
        u = UserModel()
        u_dict = u.authenticate(**kwargs)
        return u_dict