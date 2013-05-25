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

            isRegexpRe: /^(?:\/(.*)?\/)(i?)$/,
            hyperlinkRe: /\[([^|\]]+?)\|([^\]]+?)\]/img,

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
                        return;
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

            clear: function (options) {
                this.currentHint = 0;

                ModelEvent.__super__.clear.apply(this, _.toArray(arguments));
            },

            parse: function (rawData) {
                var validator = rawData.validator;

                if (validator) {
                    if (_.isArray(validator)) {
                        validator = validator.join('\n');
                    }

                    var result = this.isRegexpRe.exec(validator);

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

                var activeDesc = desc.replace(
                    this.hyperlinkRe,
                    function (match, $1, $2) {
                        return '<span class="js-transit pseudo" data-id="' + $2 + '">' + $1 + '</span>'
                    }
                );

                rawData.activeDesc = activeDesc;
                rawData.passedDesc = desc.replace(
                    this.hyperlinkRe,
                    function (match, $1, $2) {
                        return $1
                    }
                );

                return rawData;
            }
        });

        return ModelEvent;
    }
);