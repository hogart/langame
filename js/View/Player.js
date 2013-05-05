define(
    [
        'View/Active'
    ],
    function (ViewActive) {
        'use strict';

        var ViewPlayer = ViewActive.extend({
            __static__: true,

            initialize: function (options) {
                ViewPlayer.__super__.initialize.call(this, options);

                this.model = this.registry.acquire('player');
                this.render();
            }
        });

        return ViewPlayer;
    }
);