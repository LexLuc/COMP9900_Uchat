import aiml



#Create the kernel and learn AIML files
kernel = aiml.Kernel()
kernel.learn("std-startup.xml")
kernel.respond("load aiml b")


#while True:
#    Question_Input = input("")
#    Answers = kernel.respond(input("Input:"))
#    print(kernel.respond(input("Input:")))
def FAQ_Answers(message):
    Answers = kernel.respond(message)
    return(Answers)


