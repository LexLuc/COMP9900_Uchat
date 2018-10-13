import aiml



#Create the kernel and learn AIML files
kernel = aiml.Kernel()
kernel.learn("std-startup.xml")
kernel.respond("load aiml b")


# while True:
#     print(kernel.respond(input("Input:")))
    
def FAQ_Answers(message):
   Answers = kernel.respond(message)
   return(Answers)


