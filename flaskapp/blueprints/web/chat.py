from flask_socketio import send, emit, send

def getChat(socketio):
    @socketio.on('connect')
    def connect():
        print('connect: ')

    @socketio.on('json')
    def handle_json(json):
        print('received json: ' + str(json))
        send({'data': 1}, json=True)