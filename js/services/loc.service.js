import {storageService} from './storage.service.js';

const KEY = 'locationDB';


export const locService = {
    getLocations,
    addLocation,
    deleteLocation,
    
}


const gLocations = [
    {
        lat:31.781646776490927,
        lng:34.65058981550658,
        placeName:'Dan',
        createdAt:new Date().toLocaleString(),
        updatedAt:'',
    },
]

function getLocations() {
    return gLocations;
}

function addLocation(latlng,placeName){
    console.log(latlng, placeName);

    //Don't forget to check if user did not entred name...
    gLocations.push(_createLocation(latlng.lat.toFixed(4), latlng.lng.toFixed(4)),placeName);
    return gLocations;
}


function _createLocation(lat,lng,placeName) {
    return {
        lat,
        lng,
        placeName,
    };
}

function deleteLocation(idx) {
    gLocations.splice(idx, 1);
}