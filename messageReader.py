import requests
import pyttsx3
import json
import time

engine = pyttsx3.init()

while True:
    time.sleep(10)
    
    print("fetching messages...")
    
    messages = requests.get('https://barno-1.herokuapp.com/messages')

    messages = json.loads(messages.text)

    for message in messages:
        print(message)
        engine.say(message)

    engine.runAndWait()


