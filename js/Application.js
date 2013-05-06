define(
    [
        'Skull',
        'StorageSyncer',
        'Model/Player',
        'Model/Game'
    ],
    function (Skull, StorageSyncer, ModelPlayer, ModelGame) {
        var App = Skull.Application.extend({
            start: function () {
                this.registry.register('gameDataUrl', '/gameData/data.json');

                this.registry.register('storageSyncer', new StorageSyncer({registry: this.registry}));

                var player = new ModelPlayer({}, {registry: this.registry});
                this.registry.register('player', player);
                player.fetch();

                var game = new ModelGame({}, {registry: this.registry});
                this.registry.register('game', game);
                game.on('syncEnd', App.__super__.start, this);

                game.fetch();
            }
        });

        return App;
    }
);