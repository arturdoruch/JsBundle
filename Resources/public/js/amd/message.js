/**
 * Created by Artur on 2015-01-05.
 */

/**
 * ToDo Add configuration for showing message box element. Slide box from outside viewPort etc.
 */

define([
    './event',
    './helper/dom',
    './helper/object',
    './helper/position'
], function(Event, HDom, HObject, HPosition) {

    var collection = [],
        _wrapper = null,
        _config = {
            removeTimeout: 3,
            position: 'top-center',
            messageBox: {
                id: 'ad-message-box'
            },
            messagesList: {
                className: 'ad-messages-list'
            }
        };

    function Message(type, message) {
        this.type = type;
        this.message = message;
    }

    /**
     * @param {object}       [config]               Global configuration.
     * @param {Number|false} [config.removeTimeout] Time in seconds, after which message will be removed from DOM object.
     *                                              If false timeout function will not setting.
     * @param {string}       [config.position="top-center"] Place on the screen, where message box will be appears.
     *                                              This value format is "vertical-horizontal"
     * @param {HTMLElement}  [wrapper]
     */
    function setConfig(config, wrapper) {
        _config = $.extend(_config, config);
        setMessageBox(wrapper);
    }

    /**
     * Adds message into messages array collection grouped by type.
     * @param type {string}     Message type like: error, success, notice.
     * @param message {string}
     */
    function add(type, message) {
        if (_wrapper === null) {
            setMessageBox();
        }

        if (HObject.is('String', type) && HObject.is('String', message)) {
            collection.push(new Message(type, message));
        }
    }

    /**
     * @param {Number} timeout Time in seconds, after which message will be removed from DOM object.
     *                         Override config property "removeTimeout" only for this one messages set.
     */
    function display(timeout) {
        if (collection.length > 0) {
            var $list = createMessagesList(collection);

            // Clear collection messages.
            collection = [];

            $(_wrapper).append($list).hide();
            setBoxPosition();

            $(_wrapper).fadeIn(200, function() {
                setRemoveEvent($list, timeout);
            });
        }
    }

    // Private methods
    function clear($list) {
        $list.fadeOut(200, function() {
            var $this = $(this);
            //$this.off('click');
            $this.remove();

            if (_wrapper.children.length > 0) {
                setBoxPosition();
            } else {
                $(_wrapper).hide();
            }
        });
    }

    function setMessageBox(wrapper) {
        if (wrapper !== undefined) {
            /*if (wrapper instanceof HTMLElement) {
                wrapper = $(wrapper);
            } else*/
            if (!HDom.isHTMLElement(wrapper)) {
                throw new Error('"wrapper" must be a DOM Element');
            }
        } else {
            wrapper = createMessageBox();
        }

        wrapper.style.display = 'none';
        _wrapper = wrapper;
    }

    function createMessageBox() {
        var wrapper = document.createElement('div');

        wrapper.id = _config.messageBox.id;
        document.body.appendChild(wrapper);

        return wrapper;
    }

    function createMessagesList(collection) {
        var $list = $('<ul>').addClass(_config.messagesList.className),
            $item,
            message;

        for (var i in collection) {
            message = collection[i];

            $item = $('<li>')
                .addClass(message.type)
                .text(message.message);
            //setRemoveEvent($item);
            $list.append($item);
        }

        return $list;
    }

    function setRemoveEvent($elem, timeout) {
        var interval;

        $elem.one('click', function() {
            clearTimeout(interval);
            clear($(this));
        });

        timeout = (timeout !== undefined) ? timeout : _config.removeTimeout;
        if (timeout !== false) {
            interval = setTimeout(function () {
                $elem.trigger('click');
            }, timeout * 1000);
        }
    }

    function setBoxPosition() {
        var params = _config.position.split('-');

        if (params[0] && params[1]) {
            HPosition.setPosition(_wrapper, params[0], params[1]);
        }
    }

    return {
        setConfig: setConfig,
        add: add,
        display: display
        //clear: clear,
        //clearAll: clearAll
    }
});