from tests import tests
import pandas as pd
import json

#TEST THAT THE SCRAPE WENT INTO THE .CSV
def test_execute():
    rows = tests.number_of_rows
    assert rows == 1

