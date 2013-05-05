define(
    [
        'Skull'
    ],
    function (Skull) {
        'use strict';

        var ModelPlayer = Skull.Model.extend({
            __registry__: {
                syncer: 'storageSyncer'
            },

            url: 'player',

            defaults: {
                health: 100,
                money: 0
            },

            isDead: function () {
                return this.get('health') === 0;
            }
        });

        return ModelPlayer;
    }
);