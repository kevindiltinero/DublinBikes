/**
* Created by kevinfitzpatrick on 27/03/2016.
*/

//REQUEST
var xmlhttp = new XMLHttpRequest();
var url = "testit.json";
xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      myFunction(xmlhttp.responseText);
  }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

//
function myFunction(response) {
  var thisdata = JSON.parse(response);
  var mydata = thisdata;
  var array = mydata.name;

  //This is the standard setting up of the map with the settings
  //Setting the properties accordingly
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(53.344, -6.250427),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  //This is creating a new instance of the info object from the prototype in the library
  var infowindow = new google.maps.InfoWindow();

  //Declaring 2 variables but not giving them values
  var marker, i;

  // Use a for loop to plot the points from the array
  for (i = 0; i < array.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(array[i][1], array[i][0]),
      map: map
    });

    // This is setting up the info boxes.
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(array[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

}


