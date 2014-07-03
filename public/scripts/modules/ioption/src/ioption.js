define(function (require, exports, module) {

    var Backbone = require('backbone');
    var _ = require('underscore');
    var optTpl = require('/views/ioption.tpl');

    var OptView = Backbone.View.extend({
        el: '#ioption-con',
        initialize: function () {
            this.render();
        },
        render: function () {
            var template = _.template(optTpl, {});
            this.$el.append(template);
        }
    });

    return function () {
        new OptView();
    }
});
