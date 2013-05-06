define(
    [
        'Skull',
        'lib/vendor/rivets'
    ],
    function (Skull, rivets) {
        'use strict';

        var ViewActive = Skull.View.extend({
            onRender: function () {
                ViewActive.__super__.onRender.call(this);

                rivets.bind(this.$el, {model: this.model});
            }
        });

        return ViewActive;
    }
);