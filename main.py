from src import Scrape
import time

data = Scrape.scrape_Info()
Scrape.into_File(data, 'testscrape.csv')
#Scrape.create_Database()
Scrape.into_Database(data)

#while True:
    #data = Scrape.scrape_Info()
    #if data:
        #Scrape.into_File(data, 'testscrape.csv')
    #time.sleep(120)