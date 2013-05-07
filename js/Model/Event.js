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

                this.set({
                    hint: '',
                    isLastHint: false
                });

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
                }
            },

            onHint: function () {
                if (this.registry.acquire('difficulty') >= this.currentHint) {
                    var hint = this.get('hints')[this.currentHint],
                        isLastHint = !this.get('hints')[this.currentHint + 1];

                    this.set({
                        hint: hint,
                        isLastHint: isLastHint
                    });

                    this.currentHint++;
                }
            },

            parse: function (rawData) {
                var validator = rawData.validator;

                if (validator) {
                    if (_.isArray(validator)) {
                        validator = validator.join('\n');
                    }

                    var isRE = /^(?:\/(.*)?\/)(i?)$/,
                        result = isRE.exec(validator);

                    if (result && result.length) { // is regexp
                        rawData.validator = new RegExp(result[1], result[2] + 'm');
                    } else { // is function
                        rawData.validator = new Function('answer, player, game', validator);
                    }
                }

                var desc = rawData.desc;
                if (_.isArray(desc)) {
                    desc = desc.join('\n');
                }

                desc = desc.replace(
                    /\[([^|\]]+?)\|([^\]]+?)\]/img,
                    function (match, $1, $2) {
                        return '<a href="' + $2 + '">' + $1 + '</a>'
                    }
                );

                rawData.desc = desc;

                return rawData;
            }
        });

        return ModelEvent;
    }
);