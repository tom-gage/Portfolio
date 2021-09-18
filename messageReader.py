import requests
import pyttsx3
import json
import time

engine = pyttsx3.init()

while True:
    time.sleep(5)
    print("fetching messages...")
    messages = requests.get('http://localhost:9000/messages')

    messages = json.loads(messages.text)

    for message in messages:
        engine.say(message)


    engine.runAndWait()


