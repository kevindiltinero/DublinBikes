#Import the needed packages
import requests
from time import gmtime, strftime
import sqlite3
import pandas.io.sql as pdsql
import pandas as pd
import re
import json



#Have to set up connection while using the database.
conn = sqlite3.connect('test.db')
#Have to connect to the cursor
c = conn.cursor()
#Command to execute sql on the database


def create_Database():
    c.execute("CREATE TABLE IF NOT EXISTS dublinbikes(address TEXT, available_bike_stands INT, available_bikes INT, "
              "banking BOOLEAN, bike_stands INT, bonus BOOLEAN, contract_name TEXT, last_update INT, name TEXT, number INT, "
              "position TEXT,  status TEXT)")
    conn.commit()


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
    #This is putting the list into a data frame
    frame = pd.DataFrame(data)
    frame['position'] = frame['position'].astype('S32')
    frame['last_update'] = strftime("%Y%m%d%H%M%S", gmtime())

    #Write records stored in a dataframe to an SQL database.
    frame.to_sql("dublinbikes", conn, flavor="sqlite", if_exists="append", index=False)
    #ALTERNATIVE frame.to_sql("dublinikes", conn, flavor='sqlite', schema=None, if_exists='append', index=True, index_label=None,)
    conn.commit()

def from_database():
    c.execute('SELECT position FROM dublinbikes')
    output = c.fetchall()
    return output

def clean(element):
    element = str(element)
    remove_long = re.sub(r'[b]\"\{\'[a-z]{3}\'\:\s', '', element)
    remove_lat = re.sub(r'\s\'[a-z]{3}\'\:', '', remove_long)
    if remove_lat.endswith('"'):
        remove_lat = remove_lat[:-1]
    final = remove_lat[:-1]
    result = final.split(', ')
    best = []
    for element in result:
        best.append(float(element))
    return best


