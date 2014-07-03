define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var navTpl = require('/views/nav.tpl');

    var NavModel = Backbone.Model.extend({
        url: '/data/nav',
        setCurr: function (index) {
            this.set('currIndex', index);
        }
    });
    var NavView = Backbone.View.extend({
        el: '#nav-con',
        initialize: function () {
            this.model = new NavModel();
            this.model.fetch({
                success: $.proxy(function () {
                    this.render();
                    this.navList = this.$('.navbar-nav li');
                    this.navList.eq(this.model.get('currIndex')).addClass('active');
                    this.model.on('change:currIndex', this.changeCurr);
                }, this)
            });
            _.bindAll(this, 'changeCurr');
        },
        render: function () {
            var template = _.template(navTpl, this.model.toJSON());
            this.$el.append(template);
        },
        changeCurr: function (mod) {
            this.navList.removeClass('active').eq(mod.get('currIndex')).addClass('active');
        }
    });

    return function () {
        new NavView();
    }
});
