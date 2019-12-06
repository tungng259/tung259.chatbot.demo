from predict import response
from predict import classify
import websocket
import datetime
import time
 
# ws =websocket.WebSocket()
# ws.connect('ws://localhost:8000/')


try:
    import thread
except ImportError:
    import _thread as thread
import time

def on_message(ws, message):
    print(message)
    req = message.split('_')[1]
    idFriend = message.split('_')[0]
    msg = response(req)
    if(idFriend!='bot'):
        ws.send('bot_'+msg+'_'+idFriend)

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    def run(*args):
        # for i in range(3):
        #     time.sleep(1)
        #     ws.send("Hello %d" % i)
        time.sleep(1)
        #ws.close()
        print("thread terminating...")
    thread.start_new_thread(run, ())


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:8000/",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()

# req =""
# req = input()

# while(1==1):
    
#     print(response(req))
#     req=input()
