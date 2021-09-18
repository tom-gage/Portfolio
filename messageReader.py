import requests
import pyttsx3
import json

engine = pyttsx3.init()

messages = requests.get('http://localhost:9000/messages')

print(messages.text)

messages = json.loads(messages.text)

for message in messages:
    engine.say(message)


engine.runAndWait()


print("end of program")