from src import Scrape
import json
import pandas as pd


#TEST 1; THAT THE SCRAPE INTO LOCAL VARIABLE WORKED
test_data = Scrape.scrape_Info()


#TEST 2; THAT IT WENT INTO THE DATABASE
Scrape.into_File(test_data, 'testscrape.csv')

#TEST 3; THAT IT WENT INTO THE DATABASE
Scrape.into_Database(test_data)
demo = Scrape.from_database()

#TEST 4; THAT WE SEND JSON DATA FROM DATABASE
array_for_javascript = []
demo = Scrape.from_database()
for i in range(0, len(demo)):
    array_for_javascript.append(Scrape.clean(demo[i][0]))
dict = {"name": array_for_javascript}
with open('testit.json', 'w') as outfile:
    json.dump(dict, outfile)

with open('testit.json') as f:
    df = pd.DataFrame(json.loads(line) for line in f)
    number_of_rows = len(df.axes[0])



