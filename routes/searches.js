var express = require('express');
var router = express.Router();

/*
 * GET searcheslist.
 */
router.get('/list', function(req, res) {
    var db = req.db;
    db.collection('searchcollection').find().toArray(function (err, items) {
        //TODO Error Check
        res.json(items);
    });
});

/*
 * POST to addsearch.
 */
router.post('/add', function(req, res) {
    var db = req.db;
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //TODO add timestamp
    req.body.ip = ip;
    db.collection('searchcollection').insert(req.body, function(err, result){
        res.json(
            (err === null) ? { data: result[0] , msg: ''} : { data: '', msg: err }
        );
    });
});

module.exports = router;
