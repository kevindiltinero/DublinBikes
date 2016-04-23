from tests import tests
import pandas as pd

#TEST THAT THE SCRAPE WENT INTO THE .CSV
def test_create():
    df = pd.read_csv('testscrape.csv')
    number_of_rows = len(df.axes[0])
    assert number_of_rows == 100