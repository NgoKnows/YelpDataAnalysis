import random
import rethinkdb as r

def getCorpus():
    corpus = ''
    r.connect(host="localhost", db="yelp", port=28015).repl()

    reviewCursor = r.table("reviews").run()

    y = 0

    for item in reviewCursor:
        if y > 2000:
            break
        y += 1
        corpus = corpus + ' ' + item['text']
    return corpus


def makeFreqDict(corpus):
    freqDict = dict()
    prev = ''
    cur = ''
    for word in corpus.split(' '):
        key = (prev, cur)
        if key not in freqDict:
            freqDict[key] = {word: 1}
        else:
            if word in freqDict[key]:
                freqDict[key][word] += 1
            else:
                freqDict[key][word] = 1

        prev = cur
        cur = word
    return freqDict

def getReview(freqDict) :
    wordArray = []
    prev = ''
    cur = ''

    for i in range(50):
        word = random.choice([x for x in freqDict[(prev, cur)] for y in range(freqDict[(prev, cur)][x])])
        wordArray.append(word)
        prev = cur
        cur = word
    print(" ".join(wordArray))

for i in range(5):
    getReview(makeFreqDict(getCorpus()))
