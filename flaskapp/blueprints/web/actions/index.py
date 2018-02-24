from flaskapp.blueprints.web.models.user import User
from flaskapp.blueprints.web.actions.user import ActionUser


class Action:
    def user(self):
        return ActionUser()