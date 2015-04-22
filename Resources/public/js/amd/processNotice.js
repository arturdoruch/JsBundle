
define(['./domElementBuilder'], function(ElementBuilder) {

    var items = [],
        /**
         * @typedef elements
         * @property {DomElement} notice
         * @property {DomElement} noticeLoader
         * @property {DomElement} noticeItem
         */
        /** @type {elements} */
        el = {};

    var Notice = function(name) {
        this.id = Math.floor(Math.random()*999999999);
        this.name = name;
    };

    /**
     * @param {DomElement} [notice]
     * @param {DomElement} [noticeLoader]
     * @param {DomElement} [noticeItem]
     */
    var ProcessNotice = function(notice, noticeLoader, noticeItem) {
        ElementBuilder
            .add('notice', notice,             {id: 'ad-process-notice'},        {display: 'block'})
            .add('noticeLoader', noticeLoader, {id: 'ad-process-notice-loader'}, {display: 'block'})
            .add('noticeItem', noticeItem,     {'class': 'item'}, 'span');

        el = ElementBuilder.all();
        el.notice.hide().appendToIfNot();
        el.noticeLoader.hide().appendToIfNot();
    };

    // public (shared across instances)
    ProcessNotice.prototype = {
        /**
         * Adds new process into queue.
         * @param name string
         * @return {Notice|null}
         */
        add: function (name) {
            if (!name) {
                throw new Error('This error was throw during call method "Process.add". Parameter "name" is not set.');
            }

            if (isProcessExists(name)) {
                return null;
            }

            var processEntity = new Notice(name);
            items.push(processEntity);

            return processEntity;
        },

        /**
         * Removes single process name
         * @param {Notice|} process
         */
        remove: function (process) {
            if (!process) {
                return;
            }

            if (!(process instanceof Notice)) {
                throw new Error('This error was throw during call method "Process.remove". ' +
                    'Parameter "process" must be instance of "Notice".');
            }
            // Remove item form array
            items = items.filter(function(item) {
                return item.id !== process.id;
            });

            if (items.length === 0) {
                this.graphicLoader('remove');
            }

            this.display();
        },

        /**
         * Display all added process names and loader image if was set.
         * @param showLoader bool
         */
        show: function (showLoader) {
            this.graphicLoader('add', showLoader);
            this.display();
        },

        display: function () {
            el.notice.empty();
            if (items.length > 0) {
                toggleElement('notice', true);
                for (var i in items) {
                    el.noticeItem.$el()
                        .clone()
                        .html( items[i].name )
                        .appendTo( el.notice.$el() );
                }
            } else {
                toggleElement('notice', false);
            }
        },

        /**
         * Shows or hides spin image during when process in progress.
         *
         * @param action string Should be 'add' or 'remove'
         * @param showLoader bool
         */
        graphicLoader: function (action, showLoader) {
            showLoader = showLoader || true;
            toggleElement('noticeLoader', (action == 'add' && showLoader === true));
        }
    };

    function isProcessExists(name) {
        return (items.map(function(item) {
            return item.name === name;
        }).length > 0);
    }

    /**
     * Shows or hides HTML element.
     * @param {string} name  Element name: [notice, noticeLoader, noticeItem]
     * @param {bool}   state
     */
    function toggleElement(name, state) {
        state === true ? el[name].show() : el[name].hide();
    }

    return ProcessNotice;
});
