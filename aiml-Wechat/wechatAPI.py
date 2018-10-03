import itchat
import main

@itchat.msg_register(itchat.content.TEXT)
def print_content(msg):
    answers = main.FAQ_Answers(msg['Text'])
    return (answers)

itchat.auto_login()
#itchat.send('hello, a bot', 'Stephen')
itchat.run()

