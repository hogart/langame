define(
    [
        'Skull',
        'Collection/Event'
    ],

    function (Skull, CollectionEvent) {
        'use strict';

        var ModelGame = Skull.Model.extend({
            initialize: function (attributes, options) {
                ModelGame.__super__.initialize.call(this, attributes, options);

                this.events = new CollectionEvent([], {registry: this.registry});
            },

            fetch: function () {
                return this.events.fetch(
                    {
                        reset: true,
                        success: this.onEventsLoaded.bind(this)
                    }
                );
            },

            onEventsLoaded: function () {
                this.listenTo(this.events, 'currentEvent', this.onEventChange);
                this.events.goTo('preamble1');
                this.trigger('syncEnd');
            },

            onEventChange: function (currentEvent) {
                this.event = currentEvent;
                this.trigger('change:event', this.event);
            }
        });

        return ModelGame;
    }
);