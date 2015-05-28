var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var io = require('socket.io')(server);

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


// configuration ===============================================================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Make our io accessible to our router
app.use(function(req,res,next){
    req.io = io;
    next();
});


// routes ======================================================================
require('./app/routes')(app, path);


// sockets =====================================================================
var searches = {};
var T = require('./config/twit').T;

io.on('connection', function(socket) {
    searches[socket.id] = {};
    socket.on('q', function(q) {

        if (!searches[socket.id][q]) {
            console.log('New Search >>', q);

            var stream = T.stream('statuses/filter', {
                track: q
            });

            stream.on('tweet', function(tweet) {
                console.log(q, tweet.id);
                socket.emit('tweet_' + q, tweet);
            });

            stream.on('limit', function(limitMessage) {
                console.log('Limit for User : ' + socket.id + ' on query ' + q + ' has rechead!');
            });

            stream.on('warning', function(warning) {
                console.log('warning', warning);
            });

            // https://dev.twitter.com/streaming/overview/connecting
            stream.on('reconnect', function(request, response, connectInterval) {
                console.log('reconnect :: connectInterval', connectInterval)
            });

            stream.on('disconnect', function(disconnectMessage) {
                console.log('disconnect', disconnectMessage);
            });

            searches[socket.id][q] = stream;
        }
    });

    socket.on('remove', function(q) {
        searches[socket.id][q].stop();
        delete searches[socket.id][q];
        console.log('Removed Search >>', q);
    });

    socket.on('disconnect', function() {
        for (var k in searches[socket.id]) {
            searches[socket.id][k].stop();
            delete searches[socket.id][k];
        }
        delete searches[socket.id];
        console.log('Removed All Search from user >>', socket.id);
    });

});

server.listen(port, ip);