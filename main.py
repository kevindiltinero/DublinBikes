from src import Scrape
import time


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
main()