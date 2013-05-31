define(
    [
        'underscore'
    ],

    function (_) {
        var exports = {};

        var math = exports.math = {};

        /**
         * Returns value, restricted to min and max
         * @param {Number} [min=Number.MIN_VALUE]
         * @param {Number} value
         * @param {Number} [max=Number.MAX_VALUE]
         * @returns {Number}
         */
        math.clamp = function (min, value, max) {
            return Math.min(
                Math.max(value, _.isUndefined(min) ? Number.MIN_VALUE : min),
                max || Number.MAX_VALUE
            );
        };


        return exports;
    }
);