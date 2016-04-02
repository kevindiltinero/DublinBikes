from src import Scrape
import time
import json


def single_run():
    data = Scrape.scrape_Info()
    Scrape.into_File(data, 'testscrape.csv')
    Scrape.into_Database(data)


def main():
    #CREATE THE DATABASE
    Scrape.create_Database()
    while True:
        #Scrape the data from the API.
        data = Scrape.scrape_Info()
        if data:
            #Into the .csv
            Scrape.into_File(data, 'fullscrape.csv')
            #Into the database
            Scrape.into_Database(data)
        #300 seconds in between loop executions
        time.sleep(300)

#NOT USING ANYMORE THIS WAS TO GET TEST DATA
#single_run()

#THIS IS IT!!!!
#main()

#data = Scrape.scrape_Info()
#Scrape.into_File(data, 'test.scrape.csv')

array_for_javascript = []

demo = Scrape.from_database()

for i in range(0, len(demo)):
    array_for_javascript.append(Scrape.clean(demo[i][0]))

dict = {"name": array_for_javascript}

with open('webpage/testit.json', 'w') as outfile:
    json.dump(dict, outfile)

