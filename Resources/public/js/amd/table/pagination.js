/**
 * Created by Artur on 2014-11-15.
 */

define(['../event'], function(Event) {

    var $_pagination,
        _callback,
        _callbackArgs;

    /**
     * @param $pagination DomElement
     * @param callback function
     * @param callbackArgs array
     */
    var init = function($pagination, callback, callbackArgs) {
        $_pagination = $pagination;
        _callback = callback;
        _callbackArgs = callbackArgs || [];

        Event.attachEvents(events(), this)
    };

    var events = function() {
        return [
            ['click', $_pagination.find('a'), paginate]
        ]
    };

    var paginate = function($el) {
        var url = $el.getAttribute('href');

        _callbackArgs.unshift(url);
        _callback.apply(null, _callbackArgs);
    };

    return {
        init: init
    }
});