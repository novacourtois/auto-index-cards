import json
import os
import re


with open(os.path.abspath('questions.txt')) as f:
    text = f.read()

p = re.compile("[0-9]+[\.][\s]")
questions = p.split(text)

index_cards = []

for q in questions:
	lines = q.split("\n")

	card = {}
	if len(lines[0]): 
		card["question"] = lines[0]
		card["answer"] = []
		
		

		for l in range(1, len(lines)):
			if len( lines[l] ):
				card["answer"].append( lines[l] )

		# print ( card["question"] )
		# print( card["answer"] )
		index_cards.append( card )
		# print('**********************')

print(index_cards)



with open('data.txt', 'w') as outfile:
    json.dump(index_cards, outfile)

# tmp = []
# for line in lines:
# 	print( line )

# 	l = line.split('\n')
# 	print ( l )
# 	print('\n\n---------------\n\n')


