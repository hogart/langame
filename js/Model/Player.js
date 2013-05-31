define(
    [
        'Skull',
        'underscore',
        'lib/local/utils'
    ],
    function (Skull, _, utils) {
        'use strict';

        var ModelPlayer = Skull.Model.extend({
            __registry__: {
                syncer: 'storageSyncer'
            },

            url: 'player',

            defaults: {
                sociability: 50,
                money: 0
            },

            max: {
                sociability: 100
            },

            min: {
                sociability: 0,
                money: 0
            },

            buff: function (debuffs) {
                if (!debuffs) {
                    return;
                }

                var toChange = {};

                _.each(debuffs, function (value, key) {
                    toChange[key] = utils.math.clamp(
                        this.min[key],
                        this.get(key) + value,
                        this.max[key]
                    );
                }, this);

                this.set(toChange);
            },

            isDead: function () {
                return this.get('sociability') === 0;
            }
        });

        return ModelPlayer;
    }
);