import aiml

PATH_KNOWLEDGE_BASE = 'std-startup.xml'
LOCAL_DEBUG = False

# Create the kernel and learn AIML files:
kernel = aiml.Kernel()
kernel.learn(PATH_KNOWLEDGE_BASE)
kernel.respond("load aiml b")

# Local debug mode:
if LOCAL_DEBUG is True:
    while True:
        Question_Input = input('')
        ans = kernel.respond(input('User: '))
        print('Reply: '+ans)

# Answer FAQ function:
def FAQ_Answers(message):
    Answers = kernel.respond(message)
    return(Answers)
