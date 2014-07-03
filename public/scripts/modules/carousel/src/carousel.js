define(function (require, exports, module) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var tpl = require('/views/carousel.tpl');

    var CModel = Backbone.Model.extend({
        url: '/data/carousel'
    });
    var CView = Backbone.View.extend({
        el: '#carousel-con',
        initialize: function () {
            this.model = new CModel();
            this.model.fetch({
                success: $.proxy(function () {

                    this.render();
                    this.$('#carousel').carousel();
                    this.itemList = this.$('.item');
                    this.thumbList = this.$('.carousel-indicators li');

                    this.itemList.eq(this.model.get('currIndex')).addClass('active');
                    this.thumbList.eq(this.model.get('currIndex')).addClass('active');

                }, this)
            });
        },
        render: function () {
            var template = _.template(tpl, this.model.toJSON());
            this.$el.append(template);
        }
    });

    return function () {
        new CView();
    }
});
