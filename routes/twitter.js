var express = require('express');
var router = express.Router();

/*
 * GET searcheslist.
 */
router.post('/search', function(req, res) {
    var T = req.twit;
    T.get('search/tweets',
        req.body,
        function(err, data, response) {
            //TODO Error Check
            res.json(data);
        });
});

module.exports = router;