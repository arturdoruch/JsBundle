/**
 * Created by Artur on 2014-11-15.
 */

define([
    '../event',
    '../ajax',
    './pagination',
    './sorting',
    './filter'
], function(Event, Ajax, Pagination, Sorting, Filter) {

    var $_table,
        $pagination,
        _paginationCallback,
        updateTableCallback = function() {},
        _updateTableConfig = {
            processName: 'Getting table items',
            showLoader: true
        },
        queryParams = {},
        _events = [],
        timeout;

    /**
     * @param {object} $table Table container
     *
     * @param {object} [updateTableConfig] Config to initialize the TableManager with
     * @param {string} [updateTableConfig.processName = 'Getting table items'] Message showing while table is updated.
     * @param {bool}   [updateTableConfig.showLoader = true] Did image loader should be displayed while table is updated.
     *
     * @param {function} [paginationCallback] Callback function that must returns pagination container.
     * @constructor
     */
    var TableManager = function($table, updateTableConfig, paginationCallback) {
        $_table = $table;
        $.extend(_updateTableConfig, updateTableConfig);
        _paginationCallback = paginationCallback;

        subscriptions();
        Filter.init();
        Filter.filter();

        setEvents();
        if (Filter.getFormElement().length == 0) {
            $table.show();
        }
    };

    function setEvents() {
        // Attach events
        try {
            Pagination.init(_paginationCallback.apply(), loadTable);
        } catch(err) {}

        Sorting.init($_table, Event);

        Event.attachEvents(_events);
    }

    function subscriptions() {
        $.subscribe('table/getTableList', function(e, params, url) {
            addQueryParams(params);
            loadTable(url);
        });
    }

    function addQueryParams(params) {
        $.extend(queryParams, params);
    }

    function loadTable(url, pushState) {
        getTableList(url)
            .success(function(html) {
                if (pushState !== false) {
                    historyManager.pushState(html, url);
                }
                updateTable(html, url);
            });
    }

    function getTableList(url) {
        return Ajax.send({
            url: url,
            data: queryParams
        }, _updateTableConfig.processName, _updateTableConfig.showLoader)
    }

    function updateTable(html, url) {
        $_table.html(html).show();
        setEvents();
        updateTableCallback.call(null, url);
    }

    TableManager.prototype = {
        /**
         * @param {array} events
         */
        addEvents: function(events) {
            for (var i in events) {
                _events.push(events[i]);
            }
        },

        /**
         * Loads table content. Makes ajax request and update table with returned data.
         *
         * @param {string} url Url to table content resource, is uses for ajax request.
         * @param {bool}   [pushState]
         */
        loadTable: function(url, pushState) {
            loadTable(url);
        },

        /**
         * Updates, fills table with given html.
         *
         * @param {string} html
         * @param {string} url Url to current route.
         */
        updateTable: function(html, url) {
            updateTable(html, url);
        },

        getTableRows: function() {
            return $_table.find('tbody').find('tr');
        },

        /**
         * @param {object} params
         */
        addQueryParams: function(params) {
            addQueryParams(params);
        },

        /**
         * Registers callback function that will be called, when table will be updated.
         *
         * @param {function} callback
         */
        setUpdateTabelCallback: function(callback) {
            updateTableCallback = callback;
        }
    };

    return TableManager;
});