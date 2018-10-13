import itchat
import main

@itchat.msg_register(itchat.content.TEXT)
def reply_answer(msg):
    ans = main.FAQ_Answers(msg['Text'])
    return (ans)

itchat.auto_login(enableCmdQR=1)
#itchat.send('hello, a bot', 'Stephen')
itchat.run()

