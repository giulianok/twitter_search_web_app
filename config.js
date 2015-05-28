var mongo = require('mongoskin');

var db_url = process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost:27017/";

exports.db = mongo.db( db_url + "twittersearch", {native_parser:true});