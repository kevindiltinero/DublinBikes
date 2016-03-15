from src import Scrape
import time

Scrape.create_Database()

def single_run():
    data = Scrape.scrape_Info()
    Scrape.into_File(data, 'testscrape.csv')
    Scrape.into_Database(data)


def full_run():
    while True:
        Scrape the data from the API.
        data = Scrape.scrape_Info()
        if data:
            Into the .csv
            Scrape.into_File(data, 'fullscrape.csv')
            Into the database
            Scrape.into_Database(data)
        #
        time.sleep(300)


single_run()
#full_run()