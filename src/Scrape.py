#Import the needed packages
import requests
import pandas as pd
from time import gmtime, strftime
import sqlite3
import pandas.io.sql as pdsql

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


def into_Database(data):
    #Have to set up connection while using the database.
    conn = sqlite3.connect('dublinbikes.db')
    #Have to connect to the cursor
    c = conn.cursor()
    #Command to execute sql on the database
    c.execute("CREATE TABLE IF NOT EXISTS dublinbikes(idx INTEGER, address TEXT, number1 INTEGER, number2 INTEGER, boolean1 TEXT, bikes INTEGER, boolean2 TEXT, number3 INTEGER)")
    conn.commit()

    #This is putting the list into a data frame
    frame = pd.DataFrame(data)
    #This is formatting the time
    frame['time'] = strftime("%Y%m%d%H%M%S", gmtime())
    #Write records stored in a dataframe to an SQL database.
    pdsql.write_frame(frame, "dublinbikes", conn, flavor="sqlite", if_exists="append", )
    conn.commit()