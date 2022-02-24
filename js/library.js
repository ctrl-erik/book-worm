window.addEventListener("load", function () {
    markerList = [];

    function initMap(){
        map = new google.maps.Map(document.getElementById("map-div"), 
            {
                center: { lat: 43.3258496, lng: -79.839232 },
                zoom: 10,
            });
            showAll(true);        
    }
    
    function showAll(){
        for (i = 0; i < libraries.length; i++)
        {
            new_marker = new google.maps.Marker({
            position: {lat: parseFloat(libraries[i].properties.LATITUDE),
                        lng: parseFloat(libraries[i].properties.LONGITUDE)},
            title: libraries[i].properties.NAME
            });
            new_marker.setMap(map);
            new_marker.COMMUNITY = libraries[i].properties.COMMUNITY;
            markerList.push(new_marker);
        }
    }

    function showUserLocation(position){
    user_marker = new google.maps.Marker({
        position: {lat: position.coords.latitude,
                lng: position.coords.longitude},
        title: "Your Location",
        icon: "http://maps.google.com/mapfiles/kml/shapes/man.png"
        });

    user_marker.setMap(map);
    }

    function showError(error) {
        let errorCode = document.getElementById("errorCode");
        switch(error.code) {
            case error.PERMISSION_DENIED:
            errorCode.innerHTML = "User denied the request for Geolocation."
            break;
            case error.POSITION_UNAVAILABLE:
            errorCode.innerHTML = "Location information is unavailable."
            break;
            case error.TIMEOUT:
            errorCode.innerHTML = "The request to get user location timed out."
            break;
            case error.UNKNOWN_ERROR:
            errorCode.innerHTML = "An unknown error occurred."
            break;
        }
    }

    function getLocation() {
        // if navigator.geolocation doesn't exist, the browser does not support 
        // geolocaation... geolocation is an HTML5 feature so virtually all browers
        // now support it
        if (navigator.geolocation) {

            // call getCurrentPosition, give it our success and error functions
            navigator.geolocation.getCurrentPosition(showUserLocation, showError);

        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function filterMarker(district){
        for (i = 0; i < markerList.length; i++){
            if (markerList[i].COMMUNITY == district)
            markerList[i].setMap(map);
            else
            markerList[i].setMap(null);
        }
    }
});