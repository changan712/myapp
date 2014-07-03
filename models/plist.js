var pool = require('./db');
var pid = 0
function pid() {
    return pid++
}


function Plist(name, price, img, discount, totalnum, description, reced) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.discount = discount || '';
    this.totalnum = totalnum || '';
    this.description = description || '';
    this.reced = reced || '';
    this.pid = pid();
}

Plist.prototype.save = function (callback) {

    var pitem = {
        name: this.name,
        price: this.price,
        img: this.img,
        discount: this.discount,
        totalnum: this.totalnum,
        description: this.description,
        reced: this.reced,
        pid: this.pid
    };

};

Plist.getRec = function (callback) {
    pool.acquire(function (err, db) {
        if (err) {
            pool.release(db);
            return callback(err);
        }
        db.collection('plist', function (err, collection) {
            if (err) {
                pool.release(db);
                return callback(err);
            }
            collection.find({'reced': true}).toArray(function (err, doc) {
                if (err) {
                    return callback(err);
                }
                callback(null, doc);
                pool.release(db);
            })
        });

    });

};

Plist.getOne = function () {
}

Plist.getTen = function () {


};

module.exports = Plist;