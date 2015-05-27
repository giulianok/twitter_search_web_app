var mongo = require('mongoskin');

var db_url;

if(process.env){
    db_url = "mongodb://localhost:27017/";
}
else{
    db_url = process.env.OPENSHIFT_MONGODB_DB_URL;
}

exports.db = mongo.db( db_url + "twittersearch", {native_parser:true});