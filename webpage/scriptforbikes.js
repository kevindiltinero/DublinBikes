/**
* Created by kevinfitzpatrick on 02/04/2016.
*/
//Stephen's Code
var myCentre;
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

function initialise(x) {

    //document.getElementById("random").innerHTML = "Hello";
    //This is a demo array.

    //var array = [
    //    [-6.278198, 53.34],
    //    [-6.244239, 53.34],
    //    [-6.295594, 53.33],
    //];

    //This is the server request
    var xmlhttp = new XMLHttpRequest();
    var url = "testit.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //Data goes in this function and executes
    function myFunction(response) {
        var thisdata = JSON.parse(response);
        var mydata = thisdata;
        var myarray = mydata.name;


        //findLocation();
        // map properties
        var mapProps = {
            center: myCentre,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProps);

        // user's current selection of functionality
        var current = document.getElementById("current");
        if (x == 1) { // bikes near me
            for (var i = 0; i < myarray.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(myarray[i][1], myarray[i][0]),
                    icon: "green.png",
                    map: map
                });

                var infowindow = new google.maps.InfoWindow();
                var Keith = "<img src='BikeStandsImages/Bikes_Stands_Avail1.png' alt='image in infowindow'>";

                // This is setting up the info boxes.
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(Keith);
                    infowindow.open(map, marker);
                    }
                })(marker, i));
            }

            var marker = new google.maps.Marker({
                position: myCentre,
                icon: "green.png"
            });
            marker.setMap(map);
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

            for (var i = 0; i < myarray.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(myarray[i][1], myarray[i][0]),
                    icon: "finishred.png",
                    map: map
                });
            }

            var marker = new google.maps.Marker({
                position: myCentre,
                icon: "finishgreen.png"
            });
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

            for (var i = 0; i < myarray.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(myarray[i][1], myarray[i][0]),
                    icon: "red.png",
                    map: map
                });
            }

            var marker = new google.maps.Marker({
                position: myCentre,
                icon: "finishred.png" // temporary holder
            });


            marker.setMap(map);
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

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=&sensor=false&callback=initialise";
    document.body.appendChild(script);
}

window.onload = loadScript;
