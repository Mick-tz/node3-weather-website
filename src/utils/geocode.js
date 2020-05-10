
const request = require("postman-request")

const geocode = (address, callback) => {
    const url_geo = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiY2hpbm8xMTciLCJhIjoiY2s5cThudHh0MGVndzNlcDU0ODZvaDRoMiJ9.1tIjWI96OGjJWgohoGp7vg&limit=1"

    request({ url: url_geo, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features[0]) {
            callback(undefined, {latitude : body.features[0].center[1], 
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
        } else {
            callback('Unable to find location, try another search!', undefined)
        }
    })
}



module.exports = geocode