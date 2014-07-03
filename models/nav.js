var pool = require('./db');

var nav = {
    save: function (data, callback) {

    },
    get: function (callback) {
        pool.acquire(function (err, db) {
            if (err) {
                pool.release(db);
                return callback(err);
            }
            db.collection('nav', function (err, collection) {
                if (err) {
                    pool.release(db);
                    return callback(err);
                }
                collection.findOne(function (err, doc) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, doc);
                    pool.release(db);

                });
            });

        });
    }
};

module.exports = nav;