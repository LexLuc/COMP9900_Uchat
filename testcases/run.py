import aiml

# Create the kernel and learn AIML files
kernel = aiml.Kernel()
kernel.learn("std-startup.xml")
kernel.respond("load aiml b")

while True:

    input_text = input('Input: ')
    input_text = input_text.replace('?', ' qeustion mark ')
    input_text = input_text.replace('.', ' exclamation point ')
    input_text = input_text.replace('.', ' period point ')
    input_text = input_text.replace('\'', ' apostrophe ')
    
    print(kernel.respond(input_text))

