const request = require('request')

const weatherstack_API_key = 'c1b7d8d363d02ec5077d50b8c66118aa'
let url = 'http://api.weatherstack.com/current?access_key=' + weatherstack_API_key


const weatherstack = ({ lat, long, location }, callback) => {
    url += '&query=' + lat + ',' + long
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('an error has occurd', undefined)
        } else {

            callback(undefined, 'Det er for øyeblikket ' + body.current.temperature + ' celsius, men føles som ' + body.current.feelslike + " celcius. I " + location)

        }
    })
}

module.exports = weatherstack