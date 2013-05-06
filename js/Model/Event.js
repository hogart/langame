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
                ModelEvent.__super__.initialize.call(this, attributes, options);

                this.currentHint = 0;
            },

            answer: function (attributes) {
                var validator = this.get('validator'),
                    result;

                if (!validator) {
                    this.collection.next(this);
                    return;
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

                    if (this.registry.acquire('difficulty') <= this.currentHint) {
                        var hint = this.get('hints')[this.currentHint],
                            isLastHint = !!this.get('hints')[this.currentHint + 1];

                        this.trigger('hint', hint, isLastHint);
                        this.currentHint++;
                    }
                }
            },

            parse: function (rawData) {
                var validator = rawData.validator;

                if (validator) {
                    if (_.isArray(validator)) {
                        validator = validator.join('\n');
                    };

                    if (validator.startWith('/') && (validator.endsWith('/') || validator.endsWith('/i'))) { // is regexp
                        rawData.valdator = new RegExp(validator + 'm');
                    } else { // is function
                        rawData.validator = new Function('answer, player, game', validator);
                    }
                }

                if (_.isArray(rawData.desc)) {
                    rawData.desc = rawData.join('\n');
                }

                return rawData;
            }
        });

        return ModelEvent;
    }
);