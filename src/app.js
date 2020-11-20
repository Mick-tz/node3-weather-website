
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        kawai : 'cupc4ke - miguel.martinez@ciencias.unam.mx'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About wolverine',
        kawai: 'cupc4ke - miguel.martinez@ciencias.unam.mx'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help page',
        kawai: 'cupc4ke - miguel.martinez@ciencias.unam.mx'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'An address term must be provided'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            console.log(error)
            return res.send({error})            
        }
        forecast(latitude, longitude,(error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecastData,
                address
            })
        })
    })
})

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'A search term must be provided'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        err:'Help article not found',
        kawai : 'cupc4ke - miguel.martinez@ciencias.unam.mx'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        err:'Not found',
        kawai : 'cupc4ke - miguel.martinez@ciencias.unam.mx'
    })
})


app.listen(port, () => {
    console.log('server is up on port %s!', port)
})