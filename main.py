from src import Scrape
import time

Scrape.create_Database()


data = Scrape.scrape_Info()
Scrape.into_File(data, 'testscrape.csv')
Scrape.into_Database(data)

#while True:
    #Scrape the data from the API.
    #data = Scrape.scrape_Info()
    #if data:
        #Into the .csv
        #Scrape.into_File(data, 'testscrape.csv')
        #Into the database
        #Scrape.into_Database(data)
    #time.sleep(120)