function Location (address) {
    this.addressLine = address.addressLine;
    this.city_town = address.city_town;
    this.country = address.country;
    this.postalCode = address.postalCode;
    this.province = address.province;
    this.suburb = address.suburb;
}

const database = require('./db');
const storesRef = database.ref('/stores');

Location.getLocations = () => {
    let locations = [];

    return new Promise((resolve, reject) => {
        storesRef.once('value', (snapshot) => {
        
            snapshot.forEach((child) => {
                var location = child.child("location").val();
                locations.push(location);
            });
            resolve(locations);
        });
    });
}

module.exports = Location;