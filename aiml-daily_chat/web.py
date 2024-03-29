from flask import Flask, request,render_template
import aiml
import os


app = Flask(__name__)

@app.route('/')
def page1():
    return render_template('page1.html')

@app.route('/', methods=['POST'])
def my_form_post():
    text = request.form['text']
##    respond_text =  = text.upper()
    respond_text = kernel.respond(text)
    
    return respond_text

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
            
            
    
    
    app.run(host = "127.0.0.1", port = 5000, debug = True)
