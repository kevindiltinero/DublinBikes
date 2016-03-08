#Import the needed packages
import requests
import pandas as pd
from time import gmtime, strftime

def scrape_Info():
    #To catch the exception
    try:
        #This is the API URL with the Key applied as a parameter
        URL_API = "https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=a3a8a01538007e05924b81ebd579bbb053efe1da"
        # This gets the station data using the URL and key
        info_station = requests.get(URL_API, proxies='')
        # Use a method from the class to deserialize
        station_deserialized = (info_station.json())

    except:
        print("Didn't work!")

    return station_deserialized


def into_File(data, filename):
    #This is putting the list into a data frame
    frame = pd.DataFrame(data)
    #This is formatting the time
    frame['time'] = strftime("%Y%m%d%H%M%S", gmtime())
    #Write to CSV
    frame.to_csv(filename, header=False, mode="a")