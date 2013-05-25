define(
    [
        'Collection/Abstract',
        'Model/Event',
        'underscore'
    ],
    function (CollectionAbstract, ModelEvent, _) {
        'use strict';

        var CollectionEvent = CollectionAbstract.extend({
            __registry__: {
                syncer: 'syncer',
                player: 'player',
                game: 'game'
            },

            model: ModelEvent,

            url: function () {
                return this.registry.acquire('gameDataUrl');
            },

            initialize: function (attributes, options) {
                CollectionEvent.__super__.initialize.call(this, attributes, options);
            },

            next: function (model) {
                this.goTo(model.get('next'))
            },

            goTo: function (id) {
                this.currentEvent = this.get(id);

                if (this.currentEvent) {
                    this.trigger('currentEvent', this.currentEvent);
                } else {
                    throw new Error('Invalid transition to next quest: ' + id);
                }
            },

            parse: function (rawData) {
                var ctx = this.model.prototype,
                    parse = ctx.parse.bind(ctx);

                return rawData.map(parse);
            }
        });

        return CollectionEvent;
    }
);