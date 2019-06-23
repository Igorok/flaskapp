from flask_socketio import send, emit, join_room
from flaskapp.blueprints.web.models.chat import ChatModel

def getChat(socketio):
    # @socketio.on('connect')
    # def connect():
    #     print('connect: ')

    @socketio.on('joinPrivateGroup')
    def joinPrivateGroup(data):
        print('joinPrivateGroup', data)

        cm = ChatModel()
        prGr = cm.joinPrivateGroup(**data)
        join_room(prGr['id'])
        emit('joinPrivateGroup', prGr, json=True, room=prGr['id'])

    @socketio.on('messagePrivate')
    def messagePrivate(data):
        cm = ChatModel()
        msg = cm.messagePrivate(**data)
        if (not msg is None):
            emit('messagePrivate', msg, json=True, room=msg['chatId'])

    @socketio.on_error()
    def error_handler(e):
        print('@socketio.on_error', e)
        emit('error', {'error': str(e)}, json=True)