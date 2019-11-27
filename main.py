from predict import response
from predict import classify

req =""
req = input()

while(classify(req) != classify("goodbye")):
    response(req)
    req=input()
response("Goodbye")
