<<<<<<< HEAD
import { locService } from './loc.service.js'
=======
'use strict'
>>>>>>> 21d84d413b7bc9814d272de44a434107d82141aa

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getClickedCord,
}

window.onCenterMapOnUsrPos = onCenterMapOnUsrPos;


var gMap;
var gClickedCord = { lat: 32.0749831, lng: 34.9120554 }

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
            // Configure the click listener.
            gMap.addListener("click", (mapsMouseEvent) => {
                // gClickedCord = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                // locService.addLocation(mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng());
                gClickedCord = mapsMouseEvent.latLng.toJSON()
                console.log('gClickedCord', gClickedCord);
            });

        })

}


function getClickedCord () {
    return gClickedCord
}

<<<<<<< HEAD
=======
function onCenterMapOnUsrPos() {

    const success = (position) => {
     var lat = position.coords.latitude
     var lng = position.coords.longitude
      console.log('latitude:', lat, 'longitude:', lng);
  
      gMap.setCenter(new google.maps.LatLng(lat, lng))
  
      const pos = { lat, lng }
  
      addMarker(pos, gMap)
  
    }
  
    const failure = (position) => {
      console.log(position);
    }
  
    navigator.geolocation.getCurrentPosition(success, failure)

}




>>>>>>> 21d84d413b7bc9814d272de44a434107d82141aa
function addMarker(loc) {
    console.log(loc);
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    // to do: save to locations

    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCQIIl72FNzgUMFnSD9dLHYIrFTznZkELA'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

