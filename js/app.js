define(
    [
        'lib/vendor/rivets',
        'Skull',
        'Application',
        'View/Root'
    ],
    function (rivets, Skull, Application, ViewRoot) {
        var isCollection = function (obj) {
            return obj instanceof Skull.Collection;
        };

        rivets.configure({
            adapter: {
                subscribe: function (obj, keypath, callback) {
                    if (isCollection(obj)) {
                        obj.on('add remove', function() { callback(obj.models) })
                    } else {
                        obj.on('change:' + keypath, callback)
                    }
                },
                unsubscribe: function (obj, keypath, callback) {
                    obj.off('change:' + keypath, callback)
                },
                read: function (obj, keypath) {
                    if (isCollection(obj)) {
                        if (keypath == 'length') {
                            return obj.length;
                        }
                        if (keypath == 'models') {
                            return obj.models;
                        }
                    }

                    return obj.get(keypath);
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