
define([
    './processNoticeManager',
    './config',
    './helper/object'
], function(ProcessNoticeManager, config, HelperObject) {

    /**
     * @param {object} options
     * @param {string} [processName]
     * @param {bool}   [showLoader]
     */
    var send = function(options, processName, showLoader) {
        var notice = ProcessNoticeManager.set(processName, showLoader);

        validateOptions(options);
        //options.dataType = 'json';
        options.url = properUrl(options.url);
        options = parseOptions(options);
        //console.log( options );

        return $.ajax(options)
            .done(function(response) {
                //console.log( response );
            })
            .always(function() {
                ProcessNoticeManager.remove(notice);
            });
    };

    var loadView = function(attachToElem, route, data, type) {
        if (data && !(data instanceof Object)) {
            throw new Error('Invalid argument: data must be an object');
        }

        var options = {
            url: properUrl(route),
            data: data || null
        };
        if (type) {
            options.type = type;
        }

        options = parseOptions(options);
        options.headers['Load-View'] = 1;

        return $.ajax(options)
            .done(function(response) {
                if (attachToElem) {
                    attachToElem.show();
                    attachToElem.html(response);
                }
            });
    };

    function validateOptions(options) {
        if (options && !(options instanceof Object)) {
            throw new Error('Invalid argument: options must be an object');
        }

        if (!options.hasOwnProperty('url')) {
            throw new Error('Not defined "url" property in Ajax.send options');
        }
    }

    function parseOptions(userOptions) {
        var options = {},
            data = userOptions.data || null,
            type = userOptions.type || null;

        if ((HelperObject.is('Array', data) || HelperObject.is('Object', data)) && type != 'GET') {
            options.data = JSON.stringify(data);
            options.contentType = 'application/json;'; // charset=UFT-8
            options.type = 'POST';
        } else {
            //options.headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UFT-8'};
            options.contentType = 'application/x-www-form-urlencoded; charset=UFT-8';
        }

        /**
         * Sets data type response from server
         * e.g.: If responseType is 'html' then will be returned html code
         *
         * @responseType {string} [html, data, all]
         */
        //options.headers['Response-Type'] = (userOptions.responseType) ? userOptions.responseType : 'all';

        return $.extend(userOptions, options);
    }

    function properUrl(url) {
        return config.BASE_URL + url.replace(config.BASE_URL, '');
    }

    return {
        send: send,
        loadView: loadView
    }
});
