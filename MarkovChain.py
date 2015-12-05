import random
import rethinkdb as r
import json

def get_corpus(table_name):
    corpus = ''
    r.connect(host="localhost", db="yelp", port=28015).repl()

    review_cursor = r.table(table_name).run()

    y = 0
    for item in review_cursor:
        if y > 1000:
            break
        y += 1
        corpus = corpus + ' ' + item['text']
    return corpus


def make_freq_dict(corpus):
    freq_dict = dict()
    prev = ''
    cur = ''
    for word in corpus.split(' '):
        key = (prev, cur)
        if key not in freq_dict:
            freq_dict[key] = {word: 1}
        else:
            if word in freq_dict[key]:
                freq_dict[key][word] += 1
            else:
                freq_dict[key][word] = 1

        prev = cur
        cur = word
    return freq_dict


def get_text(freq_dict):
    word_array = []
    prev = ''
    cur = ''

    for _ in range(50):
        try:
            word = random.choice([x for x in freq_dict[(prev, cur)] for y in range(freq_dict[(prev, cur)][x])])
            word_array.append(word)
            prev = cur
            cur = word
        except KeyError:
            word_array.append('.')
            prev = ''
            cur = ''
    while not cur.endswith('.'):
        word = random.choice([x for x in freq_dict[(prev, cur)] for y in range(freq_dict[(prev, cur)][x])])
        word_array.append(word)
        prev = cur
        cur = word
    return " ".join(word_array)


def main():
    review_freq_dict = make_freq_dict(get_corpus("reviews"))
    tip_freq_dict = make_freq_dict(get_corpus("tips"))

    reviews = []
    tips = []
    for _ in range(100):
        reviews.append(get_text(review_freq_dict))
        tips.append(get_text(tip_freq_dict))

    reviews = {'reviews': reviews}
    tips = {'tips': tips}
    with open('reviews.json', 'w') as outfile:
        json.dump(reviews, outfile)
    with open('tips.json', 'w') as outfile:
        json.dump(reviews, outfile)

if __name__ == "__main__":
    main()
