from flask import *
from flask import Flask, g, render_template, render_template_string, request, jsonify
import json
import sqlite3
import pandas as pd
import datetime

app = Flask(__name__)
DATABASE = 'dublinbikes_3.db'

#Connect to database
def connect_to_database():
    return sqlite3.connect(DATABASE)

#Get the database
def get_db():
    db = getattr(g, '_database',	None)
    if db is None:
        db = g._database = connect_to_database()
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database',	None)
    if db is not None:
        db.close()

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_station_info/<int:station_id>')
def get_station_info(station_id):
    conn = get_db()
    #conn = sqlite3.connect(dbfile)
    #conn.row_factory = sqlite3.Row
    #cur = conn.cursor()
    df = pd.read_sql_query("select * from dublinbikes where number = :number", conn, params={"number":station_id})
    df['last_update_dt'] = pd.to_datetime(df.last_update.apply(lambda x: datetime.datetime.strptime(str(x), "%Y%m%d%H%M%S")))
    #print(df.last_update_dt.describe())
    df.set_index('last_update_dt', inplace=True)
    results = []
    for i, row in df[['available_bike_stands', 'available_bikes']].resample('1d', how='mean').iterrows():
        d = row.to_dict()
        d['date'] = i.timestamp()
        results.append(d)
    print(results)
    
    return jsonify(stations=results)
# def get_station_info(station_id):
#     conn = get_db()
#     conn.row_factory = sqlite3.Row
#     cur = conn.cursor()
#     results = []
#     count = 0
#     for row	in cur.execute("select	available_bikes, available_bike_stands from dublinbikes where number = %i ;" %station_id):
#         row = dict(row)
#         results.append(row)
#         count += 1
#     print("Count is:", count)
#     return jsonify(stations=results)

if __name__ == '__main__':
    app.run(debug=True)

