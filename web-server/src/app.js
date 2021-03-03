const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherstack = require('./utils/weatherstack')

console.log("hih")

const app = express()
const port = process.env.PORT || 3000;
// Definerer paths for express dirs
const public_directory_path = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

// setter opp handlebars
hbs.registerPartials(partials_path)
app.set('view engine', 'hbs')
app.set('views', views_path)

//setter opp statiske kdir.
app.use(express.static(public_directory_path))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'dave'
    })


})

app.get('/help', (req, res) => {
    console.log('ha')
    res.render('help', {
        title: 'help',
        name: 'dave'
    })


})
app.get('/about', (req, res) => {
    console.log('ha')
    res.render('about', {
        title: 'about',
        name: 'dave'
    })


})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error_messege: 'Help page not found',
        name: 'dave'
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    console.log(req.query.address)
    geocode(req.query.address, (error, response = {}) => {


        if (error) {
            return res.send({ error })
        }
        weatherstack(response, (error, forcast) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forcast,
                location: response.location,
                address: req.query.address

            })
        })
    })

})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error_messege: 'Page not found',
        name: 'dave'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)

})