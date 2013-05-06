define(
    [
        'Skull',
        'View/Player',
        'View/GameFeed'
    ],
    function (Skull, ViewPlayer, ViewGameFeed) {
        'use strict';

        var ViewRoot = Skull.View.extend({
            __ui__: {
                title: 'title'
            },

            __children__: {
                '.js-player': ViewPlayer,
                '.js-gameFeed': ViewGameFeed
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