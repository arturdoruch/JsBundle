/**
 * Created by Artur on 2015-02-10.
 */

/**
 * Saves data into localStorage or into file.
 */
define([], function() {

    var local = {
        /**
         * Saves data into localStorage.
         *
         * @param {string} key
         * @param {mixed}  value
         */
        set: function(key, value) {
            localStorage.setItem( key, JSON.stringify(value) );
        },

        /**
         * Gets data from localStorage.
         *
         * @param {string} key
         * @returns {*}
         */
        get: function(key) {
            return JSON.parse( localStorage.getItem(key) );
        },

        /**
         * Removes data from localStorage.
         *
         * @param {string} key
         */
        remove: function(key) {
            localStorage.removeItem(key);
        }
    };

    //var file = {
    //    /*
    //     * Saves data into file.
    //     *
    //     * @param {string} path  Path to file where data should be saved.
    //     * @param {mixed}  value Data to save.
    //     */
    //    set: function(path, value) {
    //        Ajax.send({
    //            url: path,
    //            data: value,
    //            type: 'POST'
    //        });
    //    },
    //
    //    /*
    //     * Reads data from file.
    //     *
    //     * @param {string} path Path to file where data was saved.
    //     * @returns {*}
    //     */
    //    get: function(path) {
    //        return Ajax.send({
    //                url: path
    //            }).done(function(response) {
    //                console.log(response);
    //            });
    //    },
    //
    //    /*
    //     * Removes file.
    //     *
    //     * @param {string} path Path to file, to remove.
    //     */
    //    remove: function(path) {
    //
    //    }
    //};

    return {
        local: local
    }

});