define(
    [
        'Skull',
        'Model/Abstract'
    ],
    function (Skull, ModelAbstract) {
        'use strict';

        var CollectionAbstract = Skull.Collection.extend({
            model: ModelAbstract,

            initialize: function (models, options) {
                CollectionAbstract.__super__.initialize.call(this, models, options);
            }
        });

        return CollectionAbstract;
    }
);