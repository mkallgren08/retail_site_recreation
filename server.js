// ========================================
// Dependencies
// ========================================

const bodyParser = require("body-parser")
const logger = require("morgan")
const express = require("express");
var path = require("path");
var request = require('request');

// Initialize Express
const app = express();
// Set the port to use as a variable.
const port = process.env.PORT || 3000;


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//Use body-parser and morgan with the app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// set the app to listen for a server connection
app.listen(port, function () {
    console.log('App listening on port ' + port)
});



// ====================================
//      Routing
// ====================================
let catalogListURL = "http://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=6&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1"


// Homepage Route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/product_list_page.html"));
});

// //Route to load the product list
app.get("/catalogList", function (req, res) {
    request.get({ url: catalogListURL}, function(error, response, body) { 
        if (!error && response.statusCode == 200) { 
            // console.log("Body:" +  body);
            res.send(body);
           } 
       }); 
});