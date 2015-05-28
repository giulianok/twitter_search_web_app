var mongo = require('mongoskin');

var db_url = process.env.OPENSHIFT_MONGODB_DB_URL + 'twittersearch?authSource=nodejs'|| 'mongodb://localhost:27017/twittersearch';

exports.db = mongo.db( db_url, {native_parser:true});