let express = require("express");
let api_routes = require("./routes/api.js");
let path = require("path");

let app = express();

// Serve Vue client
app.use(express.static("./student-sign-in/dist"));

app.use(express.json());

app.use("/api", api_routes);

app.use(function(req, res, next) {
    res.status(404).send("Not found");
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
})

let server = app.listen(process.env.PORT || 3000, function(){
    console.log("Express running on port", server.address().port);
})