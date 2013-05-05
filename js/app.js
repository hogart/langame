define(
    [
        'lib/vendor/rivets',
        'Skull',
        'Application',
        'View/Root'
    ],
    function (rivets, Skull, Application, ViewRoot) {
        rivets.configure({
            adapter: {
                subscribe: function (obj, keypath, callback) {
                    obj.on('change:' + keypath, callback)
                },
                unsubscribe: function (obj, keypath, callback) {
                    obj.off('change:' + keypath, callback)
                },
                read: function (obj, keypath) {
                    return obj.get(keypath)
                },
                publish: function (obj, keypath, value) {
                    obj.set(keypath, value)
                }
            }
        });

        var app = new Application({
            rootView: ViewRoot
        });

        app.start();
    }
);