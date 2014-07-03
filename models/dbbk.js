var settings = require('../settings'),
    mongodb = require('mongodb'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    poolModule = require('generic-pool');

var pool = poolModule.Pool({
    name: 'mongoPool',
    create: function (callback) {

        mongodb.MongoClient.connect('mongodb://localhost/myapp', {
            server:{poolSize:1}
        }, function(err,db){
            callback(err,db);
        });

      /*  var mongodb = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT), {safe: true});
        callback(null, mongodb);*/
    },
    destroy: function (mongodb) {
        mongodb.close();
    },
    max      : 2,
    idleTimeoutMillis: 30000

});


module.exports = pool;