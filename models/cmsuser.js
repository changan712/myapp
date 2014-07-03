var pool = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

//存储用户信息
User.prototype.save = function (callback) {
//要存入数据库的用户信息文档
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };

    pool.acquire(function (err, db) {
        if (err) {
            pool.release(db);
            return callback(err);
        }
        db.collection('cmsuser', function (err, collection) {
            if (err) {
                pool.release(db);
                return callback(err);
            }
            collection.insert(user, {safe: true}, function (err, user) {
                if (err) {
                    return callback(err);
                }
                callback(null, user);
                pool.release(db);

            });
        });

    });
};

//读取用户信息
User.get = function (name, callback) {
    pool.acquire(function (err, db) {
        if (err) {
            pool.release(db);
            return callback(err);
        }
        db.collection('cmsuser', function (err, collection) {
            if (err) {
                pool.release(db);
                return callback(err);
            }
            collection.findOne({'name': name}, function (err, user) {
                if (err) {
                    return callback(err);
                }
                callback(null, user);
                pool.release(db);

            });
        });

    });

};