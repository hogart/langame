define(
    [
        'Skull',
        'View/Player'
    ],
    function (Skull, ViewPlayer) {
        'use strict';

        var ViewRoot = Skull.View.extend({
            __ui__: {
                title: 'title'
            },

            __children__: {
                '.js-player': ViewPlayer
            },

            __static__: true,

            initialize: function (options) {
                ViewRoot.__super__.initialize.call(this, options);

                this.render();

                this.ui.title.text('horray');
            }
        });

        return ViewRoot;
    }
);