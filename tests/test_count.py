from tests import tests


#TEST THAT THE SCRAPE WENT INTO THE LOCAL VARIABLE.
def test_count():
    boolean = False
    test_data = tests.test_data
    if test_data:
        boolean = True
    assert boolean
