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
                answer: '.js-answer'
            },

            events: {
                'click .js-next': function () {
                    this.model.answer({});
                },

                'click .js-answer': 'makeAnswer',

                'click .js-transit': function (evt) {
                    var id = $(evt.target).attr('data-id');

                    this.game.goTo(id);
                },

                'keyup input[type="text"]': function (evt) {
                    var answer = this.ui.input.val();
                    if (answer && evt.keyCode == 13) {
                        this.makeAnswer();
                    } else {
                        this.markError(false);
                        this.ui.answer.prop('disabled', !answer);
                    }
                }
            },

            initialize: function (options) {
                ViewGameFeed.__super__.initialize.call(this, options);

                this.model = this.game.event;
                this.collection = new Skull.Collection([], {registry: this.registry});
                this.render();

                this.listenTo(this.game, 'change:event', this.onChangeEvent);
                this.listenTo(this.model, 'wrongAnswer', function () { this.markError(true); });
            },

            onChangeEvent: function (newEvent) {
                this.collection.add(this.model.toJSON());

                var current = this.ui.current;
                    current.addClass('currentEvent__hidden').removeClass('currentEvent__visible');
                this.ui.input.val('');
                this.markError(false);

                this.model.clear();
                this.model.set(newEvent.toJSON());

                setTimeout(function () {
                    current.removeClass('currentEvent__hidden').addClass('currentEvent__visible');
                }, 250);
            },

            onRender: function () {
                ViewGameFeed.__super__.onRender.call(this);

                rivets.bind(this.$el, {current: this.model, list: this.collection});
            },

            makeAnswer: function () {
                this.model.answer({
                    answer: this.ui.input.val().trim()
                });
            },

            markError: function (isError) {
                this.ui.input.toggleClass('error', !!isError)
            }
        });

        return ViewGameFeed;
    }
);