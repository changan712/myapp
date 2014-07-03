var settings = require('../settings'),
    mongodb = require('mongodb'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    poolModule = require('generic-pool');

var pool = poolModule.Pool({
    name: 'mongoPool',
    create: function (callback) {
        mongodb.MongoClient.connect('mongodb://localhost/myapp', function (err, db) {
            callback(err, db);
        });
    },
    destroy: function (db) {
        db.close();
    },
    max: 100,
    idleTimeoutMillis: 3000,
    log: true
});


module.exports = pool;