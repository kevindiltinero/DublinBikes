from tests import tests

#TEST THAT THE SCRAPE WENT INTO THE LOCAL VARIABLE.
def test_empty():
    boolean = False
    test_data = tests.demo
    if test_data:
        boolean = True
    assert boolean