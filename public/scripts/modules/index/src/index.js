define(function (require, exports, module) {
    var Backbone = require('backbone');


    var IndexView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {

            require.async('app/nav/1.0.0/nav', function (cb) {
                cb();
            });

            require.async('app/carousel/1.0.0/carousel', function (cb) {
                cb();
            });
            require.async('app/ioption/1.0.0/ioption', function (cb) {
                cb();
            });

            require.async('app/iplist/1.0.0/iplist', function (cb) {
                cb();
            });

        }
    });

    return function () {
        new IndexView();
    }
});