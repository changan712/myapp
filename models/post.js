/**
 *
 * @type {exports|*}
 */

var mongodb = require('./db'),
    markdown = require('markdown').markdown;

function Post(name, head, title, tags, post) {

    this.name = name;
    this.title = title;
    this.post = post;
    this.tags = tags;
    this.head = head;
}

Post.prototype.save = function (callback) {
    var date = new Date();

    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + '-' + (date.getMonth() + 1),
        day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };

    var post = {
        name: this.name,
        time: time,
        title: this.title,
        post: this.post,
        tags: this.tags,
        head: this.head,
        reprint_info: {},
        comments: [],
        pv: 0
    };

    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.insert(post, {safe: true}, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

Post.getTen = function (name, page, callback) {

    mongodb.open(function (err, db) {

        if (err) {
            return callback(err)
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            var query = {};
            if (name) {
                query.name = name;
            }
            collection.count(query, function (err, total) {
                collection.find(query, {
                    skip: (page - 1) * 10,
                    limit: 10
                }).sort({
                        time: -1
                    }).toArray(function (err, docs) {
                        mongodb.close();
                        if (err) {
                            return callback(err);
                        }
                        docs.forEach(function (doc) {

                            doc.post = markdown.toHTML(doc.post);
                        });
                        callback(null, docs, total)
                    });
            });
        });
    });
};
Post.getOne = function (name, day, title, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //根据用户名、发表日期及文章名进行查询

            collection.findOne({
                "name": name,
                "time.day": day,
                "title": title
            }, function (err, doc) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }

                if (doc) {
                    //每访问 1 次，pv 值增加 1
                    collection.update({
                        "name": name,
                        "time.day": day,
                        "title": title
                    }, {
                        $inc: {"pv": 1}
                    }, function (err) {
                        mongodb.close();
                        if (err) {
                            return callback(err);
                        }
                    });
                }
                mongodb.close();
                doc.post = markdown.toHTML(doc.post);
                callback(null, doc);//返回查询的一篇文章
            });
        });
    });
};
Post.edit = function (name, day, title, callback) {

    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                "name": name,
                "time.day": day,
                "title": title
            }, function (err, doc) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, doc);
            });
        });
    });
};

Post.update = function (name, day, title, post, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //更新文章内容
            collection.update({
                "name": name,
                "time.day": day,
                "title": title
            }, {
                $set: {post: post}
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

Post.remove = function (name, day, title, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //根据用户名、日期和标题查找并删除一篇文章
            collection.remove({
                "name": name,
                "time.day": day,
                "title": title
            }, {
                w: 1
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};
Post.getArchive = function (callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //返回只包含 name、time、title 属性的文档组成的存档数组
            collection.find({}, {
                "name": 1,
                "time": 1,
                "title": 1
            }).sort({
                    time: -1
                }).toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, docs);
                });
        });
    });
};

Post.getTags = function (callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                db.close();
                return  callback(err);
            }
            collection.distinct('tags', function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err)
                }
                callback(null, docs);
            });
        });
    });
};

Post.getTag = function (tag, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.find({
                'tags': tag
            }, {
                'name': 1,
                'time': 1,
                'title': 1
            }).sort({
                    time: -1
                }).toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, docs);
                })
        })
    })
};

Post.search = function (keyword, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var pattern = new RegExp('^.*' + keyword + '.*$', 'i');

            collection.find({
                title: pattern
            }, {
                name: 1,
                time: 1,
                title: 1
            }).sort({
                    time: -1
                }).toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, docs);
                });
        });
    });
};

Post.reprint = function (reprint_from, reprint_to, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                'name': reprint_from.name,
                'time.day': reprint_from.day,
                'title': reprint_from.title
            }, function (err, doc) {
                if (err) {
                    mongodb.close();
                    return callback(err)
                }
                var date = new Date();
                var time = {
                    date: date,
                    year: date.getFullYear(),
                    month: date.getFullYear() + "-" + (date.getMonth() + 1),
                    day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
                    minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
                }

                delete  doc._id; //删掉原来的id
                doc.name = reprint_to.name;
                doc.head = reprint_to.head;
                doc.title = (doc.title.search(/[转载]/) > -1) ? doc.title : '[转载]' + doc.title;
                doc.comments = [];
                doc.reprint_info = {'reprint_from': reprint_from};
                doc.pv = 0;

                //跟新被转载文章
                collection.update({
                    "name": reprint_from.name,
                    "time.day": reprint_from.day,
                    "title": reprint_from.title
                }, {
                    $push: {
                        "reprint_info.reprint_to": {
                            "name": doc.name,
                            "day": time.day,
                            "title": doc.title
                        }}
                }, function (err) {
                    if (err) {
                        mongodb.close();
                        return callback(err);
                    }
                });

                //将转载生成的副本修改后存入数据库，并返回存储后的文档
                collection.insert(doc, {
                    safe: true
                }, function (err, post) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }

                    callback(err, post[0]);
                });
            });
        });
    });
};


module.exports = Post;
