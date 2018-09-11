## first version,  @Mingkai Ma

import os.path
import sys

question = input('Question: ')
answer = input('Answer:')


print(f'question you input is: {question}')
print(f'answer you input is: {answer}')


file_name = 'train_question.aiml'
setUp_file = 'std-startup.xml'

if(os.path.exists(file_name)):
    L = []
    with open(file_name, 'r') as f:
        for line in f:
            L.append(line)


    for i in range(len(L)):
        if '<!-- write new here -->' in L[i]:
            break

    question_answer = f'\t<category>\n\t\t<pattern>{question}</pattern>\n\n\t\t<template>{answer}</template>\n\n\t</category>\n'
    L.insert(i, question_answer)

    with open(file_name, 'w') as f:
        for i in L:
            f.write(i)
    


else:
    with open(file_name, 'w') as f:
        f.write('<aiml version="1.0.1" encoding="UTF-8">\n\n')
        f.write('\t<category>\n')
        f.write(f'\t\t<pattern>{question}</pattern>\n\n')
        f.write(f'\t\t<template>{answer}</template>\n\n')
        f.write('\t</category>\n')
        f.write('<!-- write new here -->')
        f.write('\n')
        f.write('</aiml>')



L = []
with open(setUp_file, 'r') as f:
    for line in f:
        L.append(line)


if '            <learn>train_question.aiml</learn>\n' in L:
    print('finished')
    sys.exit(0)

for i in range(len(L)):
    if 'Write new here' in L[i]:
        newLine = '            <learn>train_question.aiml</learn>\n'
        break

L.insert(i, newLine)

with open(setUp_file, 'w') as f:
    for i in L:
        f.write(i)

print('finished\n')



    
