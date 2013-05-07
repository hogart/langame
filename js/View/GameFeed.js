define(
    [
        'Skull',
        'View/Active',
        'lib/vendor/rivets'
    ],
    function (Skull, ViewActive, rivets) {
        'use strict';

        var ViewGameFeed = ViewActive.extend({
            tpl: 'gameFeed',

            __registry__: function () {
                var r = _.clone(ViewGameFeed.__super__.__registry__);
                r.game = 'game';

                return r;
            },

            events: {
                'click .js-next': function () {
                    this.model.answer({});
                },

                'click .js-answer': function () {
                    this.model.answer({
                        answer: this.$('input[type="text"]').val().trim()
                    })
                }
            },

            initialize: function (options) {
                ViewGameFeed.__super__.initialize.call(this, options);

                this.model = this.game.event;
                this.collection = new Skull.Collection([], {registry: this.registry});
                this.render();

                this.game.on(
                    'change:event',
                    function (newEvent) {
                        this.collection.add(this.model.toJSON());
                        this.model.set(newEvent.toJSON())
                    },
                    this
                );
            },

            onRender: function () {
                ViewGameFeed.__super__.onRender.call(this);

                rivets.bind(this.$el, {current: this.model, list: this.collection});
            }
        });

        return ViewGameFeed;
    }
);