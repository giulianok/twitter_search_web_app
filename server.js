var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var Twit = require('twit');
var searches = {};
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/twittersearch", {native_parser:true});

var searches = require('./routes/searches');

var T = new Twit({
    consumer_key: 'HsHtIE2NsH4ga4CPEQVp3wfxg',
    consumer_secret: 'qZnEyf2EykW3bs8D3nXgomdM0I4P45Criz5jY0qjarWnaSEZAz',
    access_token: '777919578-xMlu4yNNuRZXqDJCQEOT0PJuancNKrEOx83GQwQD',
    access_token_secret: '5PTPJAuIH8vuR44i4TSopAqq4rQzg7u8Ycguvcy6T1RpZ'
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/searches', searches);

// Sockets
io.on('connection', function(socket) {
    searches[socket.id] = {};
    socket.on('q', function(q) {

        if (!searches[socket.id][q]) {
            console.log('New Search >>', q);

            var stream = T.stream('statuses/filter', {
                track: q
            });

            stream.on('tweet', function(tweet) {
                //console.log(q, tweet.id);
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

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

server.listen(port, ip);
console.log('Server listening on port 3000');