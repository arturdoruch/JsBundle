/**
 * Created by Artur on 2014-11-27.
 */

/**
 * Display message as popup
 */
define([
    './helper/position',
    './domElementBuilder'
], function(HelperPosition, DomElementBuilder) {

    var popupElem,
        itemElem,
        wrapperConfig = {
            attr: {id: 'ad-message-popup'},
            css:  {position: 'fixed', 'zIndex': 1000}
        },
        _config = {
            timeout: 7 // Time displayed message in seconds
        };

    /**
     * @param {object} config
     * @param {Number} config.timeout Time in seconds. Describe how long message should be displayed.
     * @param {DomElement} [wrapper]
     */
    function setConfig(config, wrapper) {
        $.extend(_config, config);
        if (wrapper instanceof DomElement) {
            setElements(wrapper)
        }
    }

    function setElements(wrapper) {
        if (!popupElem || wrapper) {
            popupElem = DomElementBuilder
                .add('popup', wrapper, wrapperConfig.attr, wrapperConfig.css)
                .get('popup');
        }
        if (!itemElem) {
            itemElem = $('<p>');
        }
        popupElem.appendToIfNot();
    }

    /**
     * Adds and immediately displays message.
     *
     * @param message {string}
     * @param type {string} [success, error, notice] Message type
     * @param timeout {int} Time in seconds.
     */
    function add(message, type, timeout) {
        var $item = display(message, type || 'notice'),
            interval;

        $item.one('click', function() {
            clearTimeout(interval);
            remove(this);
        });
        interval = setTimeout(function() {
            remove($item);
        }, (timeout || _config.timeout) * 1000);
    }

    function addError(message, timeout) {
        add(message, 'error', timeout);
    }

    function addSuccess(message, timeout) {
        add(message, 'success', timeout);
    }

    function remove($item) {
        if (popupElem) {
            if ($item) {
                $item.remove();
            }

            if (!$item || popupElem.el().childNodes.length == 0) {
                popupElem.remove();
            }
        }
    }

    function display(message, type) {
        setElements();

        var $item = itemElem.clone()
            .attr('class', type)
            .html(message)
            .appendTo(popupElem.$el());

        HelperPosition.setPosition( popupElem.el() );

        return $item;
    }

    return {
        config: setConfig,
        add: add,
        addError: addError,
        addSuccess: addSuccess,
        remove: remove
    }
});