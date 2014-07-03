/*
 * GET home page.
 */

var crypto = require('crypto'),
    fs = require('fs'),
    User = require('../models/user'),
    nav = require('../models/nav'),
    carousel = require('../models/carousel'),
    Plist = require('../models/plist');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/data/nav', function (req, res) {
        nav.get(function (err, data) {

            if (data) {
                res.send(data);
            }
        });
    });

    app.get('/data/carousel', function (req, res) {
        carousel.get(function (err, data) {

            if (data) {
                res.send(data);
            }
        });
    });

    /**
     * @m {String}
     * method
     * @p {String}
     *
     */
    app.get('/data/plist/:m?/:p?', function (req, res) {
        if (!req.params.p) {
            Plist[req.params.m](function (err, data) {
                if (data) {
                    res.send(data);
                }
            });
        } else {
            Plist[req.params.m](req.params.p, function (err, data) {
                if (data) {
                    res.send(data);
                }
            });
        }
    });

    app.post('/data/plist/', function (req, res) {

    });


    function checkLogin(req, res, next) {

        if (!req.session.user) {
            req.flash('error', '未登陆');
            res.redirect('/login');
        }
        next();
    }

    function checkNotLogin(req, res, next) {

        if (req.session.user) {
            req.flash('error', '已登陆');
            res.redirect('back');
        }
        next();
    }
};

