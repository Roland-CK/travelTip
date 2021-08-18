import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.renderLocations = renderLocations;
window.onDelete = onDelete;
window.onCenterMapOnUsrLoc = onCenterMapOnUsrLoc;
window.onAddLocation = onAddLocation;
window.onUpdateLocation = onUpdateLocation;


function onInit() {
    renderLocations()
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');

        })
        
        .catch(() => console.log('Error: cannot init map'));
}


function renderLocations() {
    const locations = locService.getLocations()
    const strHtmls = locations.map((location, idx) => {
        return `
            <tr>
                <td>${idx + 1}</td>
                <td>${location.placeName}</td>
                <td>${location.lat}</td>
                <td>${location.lng}</td>
                <td class="go-td"><button class="go-btn" data-lat="${location.lat
                 }" data-lng="${location.lng}" onclick="onPanTo(this.dataset.lat,this.dataset.lng)" >Go</button></td>
                <td><button class="delete-btn" data-idx="${idx}" onclick="onDelete(this.dataset.idx)">Delete</button></td>
                <td><button class="update-btn" data-idx="${idx}" onclick="onUpdateLocation(this.dataset.idx)">Update</button></td>

            </tr>
          `;

    });
    document.querySelector('.locations-data').innerHTML = strHtmls.join('');
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker(mapService.getClickedCord());
    var placeName = prompt('Enter location name')
    locService.addLocation(mapService.getClickedCord(), placeName);
    renderLocations()
}

function onGetLocs() {
    locService.getLocations()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`

        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo(lat,lng) {
    console.log('Panning the Map');
    mapService.panTo(lat,lng);
}

function onDelete(idx) {
    locService.deleteLocation(idx);
    renderLocations();
}


function onCenterMapOnUsrLoc () {
    mapService.setMapOnUsrLoc()
}

function onAddLocation() {
    console.log('adding location..');
    
}

function onUpdateLocation(idx) {
    console.log(idx);
    const newName = prompt('Enter new location Name: ');
    locService.updateLocationName(idx,newName)
    renderLocations();
}