from src import Scrape

data = Scrape.scrape_Info()
Scrape.into_File(data, 'testscrape.csv')