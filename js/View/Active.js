define(
    [
        'Skull',
        'lib/vendor/rivets'
    ],
    function (Skull, rivets) {
        'use strict';

        var ActiveView = Skull.View.extend({
            onRender: function () {
                ActiveView.__super__.onRender.call(this);

                rivets.bind(this.$el, {model: this.model});
            }
        });

        return ActiveView;
    }
);