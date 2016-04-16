from flask import *
from flask import Flask, render_template_string, request
import sqlite3


app = Flask(__name__)
DATABASE = 'dublinbikes.db'

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
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    results = []
    for row	in cur.execute("select	available_bike_stands from dublinbikes where number = %i ;" %station_id):
        row = dict(row)
        results.append(row)
    return jsonify(stations=results)

if __name__ == '__main__':
    app.run(debug=True)

