define(function (require, exports, module) {

    var Backbone = require('backbone');
    var _ = require('underscore');
    var iplistTpl = require('/views/iplist.tpl');

    var IplistModel = Backbone.Model.extend({

    });

    var IplistCollection = Backbone.Collection.extend({

        model:IplistModel,
        url: '/data/plist/getRec'

    });

    var OptView = Backbone.View.extend({
        el: '#iplist-con',
        initialize: function () {
            this.collection = new IplistCollection();
            this.collection.fetch({
                success: $.proxy(function () {
                    this.render();
                }, this)
            });

        },
        render: function () {
            var o = {};
            o.list =   this.collection.toJSON();
            console.log(o.list);
            var template = _.template(iplistTpl, o);
            this.$el.append(template);
        }
    });

    return function () {
        new OptView();
    }
});
