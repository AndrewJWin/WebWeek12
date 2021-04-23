let express = require('express')
let api_routes = require('./routes/api.js')
let path = require('path')

// Generate Application
let app = express() 

// Provide the Vue page as a static page.
app.use(express.static("./student-sign-in/dist"))

// Convert requests to JSON.
app.use(express.json())

// Route all /api domain requests to their specific routes.
app.use('/api', api_routes)

// Send all other requests to 404.
app.use(function(req, res, next) {
    res.status(404).send('Not found')
})

// If we come across an error we haven't anticipated, respond accordingly.
app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500).send('Server error')
})

// let the console know what port the server is running on.
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})