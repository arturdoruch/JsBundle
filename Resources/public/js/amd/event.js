
define([], function() {

    function AddEvent() {}
    /**
     * Events attributes collection
     * @type {Array}
     */
    var events = [];

    /**
     * Attaches event to jQuery element that triggers function.
     *
     * @param {Array}  eventsAttr [eventType, triggerElement, functionToTrigger, functionArguments, context]
     * @param {object} [context]
     * @param {bool}   [preventDefault]
     */
    AddEvent.prototype.attach = function(eventsAttr, context, preventDefault) {
        var attr,
            params;

        for (var i in eventsAttr) {
            attr = eventsAttr[i];
            params = {};
            params.event = attr[0];
            params.$element = attr[1];
            params.callback = attr[2];
            params.args = attr[3] || [];
            params.context = attr[4] || context || this;

            // Removes old event.
            params.$element.off(params.event);
            if (typeof params.callback !== 'function') {
                continue;
            }

            // Adds new event.
            (function(param) {
                param.$element.on(param.event, function(e) {
                    var arguments = param.args.slice(0);
                    arguments.push(this);
                    arguments.push(e);

                    if (preventDefault !== false) {
                        e.preventDefault();
                    }

                    param.callback.apply(param.context, arguments);
                });
            })(params);
        }
    };

    /**
     * @param {array}  eventsAttr [eventType, triggerElement, functionToTrigger, functionArguments, context]
     * @param {object} [context]
     * @param {bool}   [preventDefault]
     */
    function attachEvents(eventsAttr, context, preventDefault) {
        addEvents(eventsAttr);
        new AddEvent().attach(events, context, preventDefault);
    }

    /**
     * Collects events attributes into events array.
     * @param eventsAttr
     */
    function addEvents(eventsAttr) {
        for (var i in eventsAttr) {
            events.push(eventsAttr[i]);
        }
    }

    return {
        attachEvents: attachEvents,
        addEvents: addEvents
    }
});