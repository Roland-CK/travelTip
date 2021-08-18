import {storageService} from './storage.service.js';

const KEY = 'locationDB';


export const locService = {
    getLocations,
    addLocation,
    deleteLocation,
}


// const locs = [
//     { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
// ]


const gLocations = [
    {
        lat:31.781646776490927,
        lng:34.65058981550658,
        name:'Dan',
        createdAt:'',
        updatedAt:'',
    },
]

function getLocations() {
    return gLocations;
}

function addLocation(lat, lng, name){
    //Don't forget to check if user did not entred name...
    gLocations.push(_createLocation(lat, lng, name));
    return gLocations;
}


function _createLocation(name,lat,lng) {
    return {
        lat,
        lng,
        name,
        createdAt,
        updatedAt,
    };
}

function deleteLocation(idx) {
    gLocations.splice(idx, 1);
}