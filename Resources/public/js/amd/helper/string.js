/**
 * Created by Artur on 2015-01-04.
 */

define([], function() {

    return {
        /**
         * Repeats string count times
         *
         * @param pattern {string}
         * @param count {int}
         * @returns {string}
         */
        strRepeat: function(pattern, count) {
            if (count < 1) return '';
            var result = '';

            while (count > 0) {
                if (count >= 1) {
                    result += pattern;
                }
                count--;
            }

            return result;
        },

        /**
         * Translates a string with underscores into camel case (e.g. first_name -> firstName)
         *
         * @param string {string}             String in underscore format
         * @param capitaliseFirstChar {bool}  If true, capitalise the first char in string
         * @returns {string}
         */
        camelize: function(string, capitaliseFirstChar) {
            //string = string.toLowerCase();
            var firstChar = (capitaliseFirstChar === true) ? string.charAt(0).toUpperCase() : string.charAt(0).toLowerCase();
            string = firstChar + string.slice(1);

            return string.replace(/[\-_]([a-z])/g, function(match) {
                return match[1].toUpperCase();
            });
        },

        /**
         * Translates a string in camel case style into plain text (camelCase --> Camel case).
         *
         * @param {string} string
         * @returns {string}
         */
        camelCaseToString: function(string) {
            if (!string) {
                return null;
            }
            string = string.replace(/([A-Z])/g, function(match) {
                return match[0] = ' ' + match[0].toLowerCase();
            });

            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
});
