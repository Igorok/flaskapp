from flaskapp.blueprints.web.models.user import UserModel
from flaskapp.blueprints.web.actions.user import ActionUser


class Action:
    def user(self):
        return ActionUser()