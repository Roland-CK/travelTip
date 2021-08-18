import {storageService} from './storage.service.js';

const KEY = 'locationDB';

export const locService = {
    getLocations,
    addLocation,
    deleteLocation,
    updateLocationName,

}


const gLocations = storageService.load(KEY) || []

function getLocations() {
    return gLocations;
}

function addLocation(latlng, placeName) {
    console.log('addLocation', latlng);
    //Don't forget to check if user did not entred name...
    if (!placeName) return
    gLocations.push(_createLocation(latlng.lat.toFixed(4), latlng.lng.toFixed(4), placeName));
    storageService.save(KEY, gLocations)
}


function _createLocation(lat, lng, placeName) {
    return {
        lat,
        lng,
        placeName,
        weather: '',
        createdAt: new Date().toLocaleString(),
        updatedAt: '',
    };
}

function deleteLocation(idx) {
    gLocations.splice(idx, 1);
    storageService.save(KEY, gLocations)
}


function updateLocationName(idx, newName){
    
const location = gLocations[idx]
console.log('locs :' , location);
location.placeName = newName;
storageService.save(KEY, gLocations)
}

