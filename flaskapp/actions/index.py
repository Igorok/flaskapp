from flaskapp.models.user import User
from flaskapp.actions.user import ActionUser


class Action:
    def __init__(self, *args, **kwargs): 
        self.user = ActionUser()