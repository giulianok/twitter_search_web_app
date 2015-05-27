var express = require('express');
var router = express.Router();

/*
 * GET searcheslist.
 */
router.post('/list', function(req, res) {
    var db = req.db;

    var limit = (typeof req.body.count === "undefined")? 5 : req.body.count;

    db.collection('searchcollection').find().sort({$natural: -1}).limit( limit, function(err, items) {
        if(err !== null){
            res.status(500).send(err.message);
        }
        else{
            items.toArray(function (err, items) {
                if(err === null){
                    res.json(items);
                }
                else{
                    res.status(500).send(err);
                }
            });
        }
    });
});

/*
 * POST to addsearch.
 */
router.post('/add', function(req, res) {
    var db = req.db;
    var data = req.body;
    data.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    data.date = new Date();

    db.collection('searchcollection').insert(data, function(err, result){
        if(err === null){
            res.json(result[0]);
            req.io.emit('search_key_update', result[0] );
        }
        else{
            res.status(500).send("Something went wrong during the insertion of a keyword into database.");
        }
    });
});

module.exports = router;
