from flask import Flask, request, jsonify
import aiml
import os


app = Flask(__name__)


@app.route('/api/dailychat', methods=['POST'])
def my_form_post():
    req_content = request.get_json()
    question = req_content['question']
    ans_content = kernel.respond(question)
    
    return jsonify(whatIsQuestion=ans_content)

if __name__ == '__main__':
    kernel = aiml.Kernel()
    kernel.learn(os.sep.join(['alice', '*.aiml']))

    property_file = 'bot.properties'
    with open(property_file, 'r') as f:
        for line in f:
            pList = line.split('=')
            key = pList[0]
            value = pList[1]
            kernel.setBotPredicate(key, value)
    
    app.run(host = "127.0.0.1", port=8080)
