var searches = require('./routers/searches');
var twitter = require('./routers/twitter');

module.exports = function(app, path) {

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname + '/../public/index.html'));
    });

    app.use('/searches', searches);
    app.use('/twitter', twitter);
};