var express = require('express');
var router = express.Router();
var path = require("path");
var https = require("https");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'What are we going to do now'
    });
});

router.get('/quiz', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/../views/quiz.html'));
});

router.get('/dog/', function(req, res) {

});

router.get('/testme/', function(req, res, next) {

    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.598748,-122.388726&radius=1000&keyword=" + req.query.queryparam + "&key=AIzaSyBURdJOkG62jXYReG_GIyHwOvWo9YIxG28";
    https.get(url, function(response) {
        // data is streamed in chunks from the server
        // so we have to handle the "data" event
        var buffer = "",
            data,
            route;

        response.on("data", function(chunk) {
            buffer += chunk;
        });

        response.on("end", function(err) {
            // finished transferring data
            // dump the raw data
            //console.log(buffer);
            console.log("got buffer \n");
            data = JSON.parse(buffer);


            // extract the distance and time
            // console.log("Walking Distance: " + route.legs[0].distance.text);
            // console.log("Time: " + route.legs[0].duration.text);
            res.send(buffer);
        });
    });


});

// router.get('/musician/:name', function(req, res) {

//    // Get /musician/Matt
//    console.log(req.params.name)
//    // => Matt
//    var reply = '{"id": 1,"name":"' +req.params.name+ '","band":"BBQ Brawlers"}';
//    res.send(reply);
// });


var musicians = require('../controllers/musicians');
router.get('/musicians', musicians.findAll);
router.get('/musicians/:id', musicians.findById);
router.post('/musicians', musicians.add);
router.put('/musicians/:id', musicians.update);
router.delete('/musicians/:id', musicians.delete);


module.exports = router;
