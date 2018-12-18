from flask_socketio import send, emit, send
from flaskapp.blueprints.web.models.chat import ChatModel

def getChat(socketio):
    @socketio.on('connect')
    def connect():
        print('connect: ')

    @socketio.on('getPrivateGroup')
    def getPrivateGroup(data):
        cm = ChatModel()
        prGr = cm.getPrivateGroup(**data)
        send(prGr, json=True)


    @socketio.on('json')
    def handle_json(json):
        print('received json: ' + str(json))
        send({'data': 1}, json=True)
