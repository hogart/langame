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

            __ui__: {
                current: '.js-current',
                input: 'input[type="text"]',
                answer: ''
            },

            events: {
                'click .js-next': function () {
                    this.model.answer({});
                },

                'click .js-answer': function () {
                    this.model.answer({
                        answer: this.$('input[type="text"]').val().trim()
                    })
                },

                'click .js-transit': function (evt) {
                    var id = $(evt.target).attr('data-id');

                    this.game.goTo(id);
                }/*,

                'keyup input[type="text"]': function () {
                    this.ui.answer.prop('disabled', !!this.ui.current.val());
                }*/
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

                        var current = this.ui.current;
                            current.addClass('currentEvent__hidden').removeClass('currentEvent__visible');
                        this.ui.input.val('');

                        this.model.set(newEvent.toJSON());
                        setTimeout(function () {
                            current.removeClass('currentEvent__hidden').addClass('currentEvent__visible');
                        }, 250)

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