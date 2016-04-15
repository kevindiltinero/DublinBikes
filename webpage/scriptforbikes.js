/**
* Created by kevinfitzpatrick on 02/04/2016.
*/
//Stephen's Code
var myCentre;
var myarray;
var map;
var mapProps;
var marker;
// function to find location of user
function findLocation() {
    if (!navigator.geolocation) { // if location can't be found
        myCentre = new google.maps.LatLng(53.344007,-6.266802); //default location
        return;
    }
    function found(position) {
        myCentre = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);
    }
    navigator.geolocation.getCurrentPosition(found);
}

findLocation();

function initialise(x) { // x is for knowing which functionality is being used, y is for form submit
    var key = document.getElementById("key");
    var keyinfo;

    //This is the server request
    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=a3a8a01538007e05924b81ebd579bbb053efe1da";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //Data goes in this function and executes
    function myFunction(response) {
        console.log(typeof (response));
        myarray = JSON.parse(response);
        console.log(myarray[0].position.lat);


        //findLocation();
        // map properties
        mapProps = {
            center: myCentre,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("googleMap"), mapProps);

        // user's current selection of functionality
        var current = document.getElementById("current");
        var searchbox = document.getElementById("formdiv");
        var mapcontainer = document.getElementById("googleMap");
        if (x == 1) { // bikes near me
            document.getElementById("moreinfo").style.display = "block";
            searchbox.style.display = "none";
            searchbox.style.height = "0px";
            mapcontainer.style.height = "371px";
            for (var i = 0; i < myarray.length; i++) {
                var icon;
                if (myarray[i].available_bikes < 5) {
                    icon = "red.png";
                } else if (myarray[i].available_bikes < 15) {
                    icon = "orange.png";
                } else {
                    icon = "green.png";
                }
//                var arrayholder = myarray[i];
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(myarray[i].position.lat, myarray[i].position.lng),
                    icon: icon,
                    map: map
//                    stationdetails: (myarray[i])
                });

                var infowindow = new google.maps.InfoWindow();
//                var stopinfo = marker.stationdetails.address;
                // This is setting up the info boxes.
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
//                    console.log(stopinfo);
//                    stopinfo = 'hello';
//                    console.log(marker.stationdetails);
//                    stopinfo = "<p>Address: " + this.stationdetails.address + "<br />" + 
//                        "Station Number: " + this.stationdetails.number + "<br />" +
//                        "Total Stands: " + this.stationdetails.bike_stands + "<br />" +
//                        "Available Bikes: " + this.stationdetails.available_bikes + "<br />" +
//                        "Available Bike Stands: " + this.stationdetails.available_bike_stands + "<br />" +
//                        "Status: " + this.stationdetails.status + "</p>";
//                    console.log(stopinfo);
                    return function () {
                        infowindow.setContent("<p>Address: " + myarray[i].address + "<br />" + 
                                              "Total Stands: " + myarray[i].bike_stands + "<br />" +
                                              "Available Bikes: " + myarray[i].available_bikes + "<br />" +
                                              "Status: " + myarray[i].status + "</p>");
                        $(document).ready(function() {
                            //When we click hte button
                            $('#send_data').on('click', function() {
                                $.ajax({
                                    url: "{{ url_for('data_post') }}",
                                    method: "POST",
                                    data: {
                                        data: $('#data').val()
                                    },
                                    success: function(data) {
                                        $('#response').html(data);
                                    }
                                });
                            });
                        });
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }

            keyinfo = '<p><img src="green.png" alt="green bike icon">: 15 or more bikes available<br />' + 
                '<img src="orange.png" alt="orange bike icon">: 5-14 bikes available<br />' + 
                '<img src="red.png" alt="red bike icon">: Less than 5 bikes available</p>';
            key.innerHTML = keyinfo;
            
            if (!current.innerHTML.match("Bikes Near Me")) {
                if (current.innerHTML.match("Spaces Near Me")) {
                    current.id = "spaces";
                } else if (current.innerHTML.match("Search By Station Address")) {
                    current.id = "address";
                    ;
                } else {
                    current.removeAttribute("id");
                }
                document.getElementById("bikes").id = "current";
            }
        } else if (x == 2) { // spaces near me
            document.getElementById("moreinfo").style.display = "block";
            searchbox.style.display = "none";
            searchbox.style.height = "0px";
            mapcontainer.style.height = "371px";

            for (var i = 0; i < myarray.length; i++) {
                var icon;
                if (myarray[i].available_bike_stands < 5) {
                    icon = "finishred.png";
                } else if (myarray[i].available_bike_stands < 15) {
                    icon = "finishorange.png";
                } else {
                    icon = "finishgreen.png";
                }
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(myarray[i].position.lat, myarray[i].position.lng),
                    icon: icon,
                    map: map
                });
                
                var infowindow = new google.maps.InfoWindow();
                // This is setting up the info boxes.
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent("<p>Address: " + myarray[i].address + "<br />" + 
                                              "Total Stands: " + myarray[i].bike_stands + "<br />" +
                                              "Available Bike Stands: " + myarray[i].available_bike_stands + "<br />" +
                                              "Status: " + myarray[i].status + "</p>");
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }

            keyinfo = '<p><img src="finishgreen.png" alt="green finish icon">: 15 or more bike stands available<br />' + 
                '<img src="finishorange.png" alt="orange finish icon">: 5-14 bike stands available<br />' + 
                '<img src="finishred.png" alt="red finish icon">: Less than 5 bike stands available</p>';
            key.innerHTML = keyinfo;
            
            marker.setMap(map);
            if (!current.innerHTML.match("Spaces Near Me")) {
                if (current.innerHTML.match("Bikes Near Me")) {
                    current.id = "bikes";
                } else if (current.innerHTML.match("Search By Station Address")) {
                    current.id = "address";
                } else {
                    current.removeAttribute("id");
                }
                document.getElementById("spaces").id = "current";
            }
        } else if (x == 3) { // search by address
            var datalistData = "";
            for (var i = 0; i < myarray.length; i++) {
                datalistData += '<option value="';
                datalistData += myarray[i].address;
                datalistData += '">';
                datalistData += myarray[i].address;
                datalistData += '</option>';
            }
            console.log(typeof datalistData);
            document.getElementById("datalist").innerHTML = datalistData;
            
            document.getElementById("moreinfo").style.display = "block";
            searchbox.style.display = "block";
            searchbox.style.height = "60px";
            mapcontainer.style.height = "311px";
            
            keyinfo = '<p><img src="searchicon.png" alt="searched station icon">: The location of the station you searched</p>';
            key.innerHTML = keyinfo;
            
            if (!current.innerHTML.match("Search By Station Address")) {
                if (current.innerHTML.match("Spaces Near Me")) {
                    current.id = "spaces";
                } else if (current.innerHTML.match("Bikes Near Me")) {
                    current.id = "bikes";
                } else {
                    current.removeAttribute("id");
                }
                document.getElementById("address").id = "current";
            }
        }
        console.log(current.innerHTML); // debugging buttons - problem with "current" id
    }
}

function searchForm(form) {
    var stationIndex;
    var correctSearch = false;
    for (var i = 0; i < myarray.length; i++) {
        if (myarray[i].address == form.stationaddresses.value) {
            stationIndex = i;
            correctSearch = true;
        }
    }
    if (correctSearch == false) {
        alert("Address not recognised. Please try again or select option from list");
    } else {
        marker.setMap(null);
        var newCentre = new google.maps.LatLng(myarray[stationIndex].position.lat, myarray[stationIndex].position.lng);
        console.log(newCentre);
        marker = new google.maps.Marker({
            position: newCentre,
            icon: "searchicon.png",
            map: map
        });

        var infowindow = new google.maps.InfoWindow();
        // This is setting up the info box
        google.maps.event.addListener(marker, 'click', (function () {
                infowindow.setContent("<p>Address: " + myarray[stationIndex].address + "<br />" + 
                                      "Total Stands: " + myarray[stationIndex].bike_stands + "<br />" +
                                      "Available Bikes: " + myarray[stationIndex].available_bikes + "<br />" +
                                      "Available Bike Stands: " + myarray[stationIndex].available_bike_stands + "<br />" +
                                      "Status: " + myarray[stationIndex].status + "</p>");
                infowindow.open(map, marker);
        }));
        map.setCenter(newCentre);
        marker.setMap(map);
    }
}

function moreInfo() {
    var extrainfo = document.getElementById("extrainfo");
    if (extrainfo.style.display == 'none') {
        extrainfo.style.display = 'block';
    } else {
        extrainfo.style.display = 'none';
    }
}

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=&sensor=false&callback=initialise";
    document.body.appendChild(script);
}

window.onload = loadScript;
