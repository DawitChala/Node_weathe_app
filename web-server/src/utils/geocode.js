const request = require('request')

const geocode = (address, callback) => {
    const mapbox_API_key = "pk.eyJ1IjoiZGF3aXRhYyIsImEiOiJja2xodzlmcTcxcDQyMm9uMTludGk5MGxnIn0.ms7HPrd11ySIWYQCE5NHBQ"
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + mapbox_API_key + '&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('An error has occurs', undefined)
        } else {
            if (body.features === undefined || body.features[0] === undefined) {
                callback('An error has occurs', undefined)
            } else {
                callback(undefined, {
                    lat: body.features[0].center[1],
                    long: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        }
    })
}


module.exports = geocode