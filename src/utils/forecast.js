
const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c511c049859d118e2893e361c7440dec&query=' + 
        latitude + ',' + longitude

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('failed with error code: ' + body.error.code)
        } else {
            data = body.current
            callback(undefined, data.weather_descriptions[0] + '. It is currently ' + data.temperature + 
                ' degrees out. But it feels like ' + data.feelslike + ' degrees!' +
                 ' The precipipation probabilty is currently ' + data.precip)
    }
}) 

}

module.exports = forecast



  