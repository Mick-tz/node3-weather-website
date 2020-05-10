//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

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
                ' degrees out. But it feels like ' + data.feelslike + ' degrees!')
    }
}) 

}

module.exports = forecast



  