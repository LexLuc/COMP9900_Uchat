import requests
import itchat
import main

dailychat_backend_url = "http://127.0.0.1:8080/api/dailychat"
request_fmt = {'question': ''}

def clear_delimeters(text):
    text = text.replace('?', ' qeustion mark ')
    text = text.replace('!', ' exclamation point ')
    text = text.replace('.', ' period point ')
    text = text.replace('\'', ' apostrophe ')
    text = text.replace('-', '')

    return text

@itchat.msg_register(itchat.content.TEXT)
def reply_answer(msg):
    msg_txt = msg['Text']
    cleared_txt = clear_delimeters(msg_txt)
    ans = main.FAQ_Answers(cleared_txt)

    if ans == 'I have no answer for that.':
        request_fmt['question'] = msg_txt
        response = requests.post(dailychat_backend_url, json=request_fmt)
        ans = response.json()['whatIsQuestion']

    return (ans)

itchat.auto_login()
itchat.run()

