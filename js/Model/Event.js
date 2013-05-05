define(
    [
        'Model/Abstract',
        'underscore'
    ],
    function (ModelAbstract, _) {
        'use strict';

        var ModelEvent = ModelAbstract.extend({
            __registry__: {
                player: 'player',
                game: 'game'
            },

            initialize: function (attributes, options) {
                ModelEvent.__super__.call(this, attributes, options);

                this.currentHint = 0;
            },

            validate: function (attributes) {
                var validator = this.get('validator'),
                    result;

                if (!validator) {
                    this.collection.next();
                }

                if (_.isRegExp(validator)) {
                    result = validator.test(attributes.answer);
                } else if (_.isFunction(validator)) {
                    result = validator(attributes.answer, this.player, this.game)
                }

                if (result) {
                    this.collection.next(this);
                } else {
                    if (this.player.isDead()) {
                        return
                    }

                    if (this.registry.get('difficulty') <= this.currentHint) {
                        var hint = this.get('hints')[this.currentHint],
                            isLastHint = !!this.get('hints')[this.currentHint + 1];

                        this.trigger('hint', hint, isLastHint);
                        this.currentHint++;
                    }
                }
            }
        });

        return ModelEvent;
    }
);