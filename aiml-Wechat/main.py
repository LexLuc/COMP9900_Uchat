import aiml

PATH_KNOWLEDGE_BASE = 'FAQ_FULL.aiml'
LOCAL_DEBUG = True

#Create the kernel and learn AIML files
kernel = aiml.Kernel()
kernel.learn(PATH_KNOWLEDGE_BASE)
kernel.respond("Hi")

if LOCAL_DEBUG is True:
    while True:
        Question_Input = input("")
        Answers = kernel.respond(input("Input:"))
        print(kernel.respond(input("Input:")))

def FAQ_Answers(message):
    Answers = kernel.respond(message)
    return(Answers)


