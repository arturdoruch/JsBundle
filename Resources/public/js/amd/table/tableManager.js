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
        _paginationCntrCallback,
        _updateTableConfig = {
            callback: function() {},
            processName: 'Getting table items',
            showLoader: true
        },
        queryParams = {},
        _events = [];

    /**
     * @param {object} $table Table container
     *
     * @param {object} [updateTableConfig] Config to initialize the TableManager with
     * @param {callback} [updateTableConfig.callback] Callback function that will be called, when table will be updated.
     * @param {string}   [updateTableConfig.processName = 'Getting table items']
     * @param {bool}     [updateTableConfig.showLoader = true]
     *
     * @param {function} [paginationCntrCallback] Callback function that must returns pagination container.
     * @constructor
     */
    var TableManager = function($table, updateTableConfig, paginationCntrCallback) {
        $_table = $table;
        $.extend(_updateTableConfig, updateTableConfig);
        _paginationCntrCallback = paginationCntrCallback;

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
            Pagination.init(_paginationCntrCallback.apply(), getTableList);
        } catch(err) {}

        Sorting.init($_table, Event);

        Event.attachEvents(_events);
    }

    function subscriptions() {
        $.subscribe('table/getTableList', function(e, params, url) {
            addQueryParams(params);
            getTableList(url);
        });
    }

    function addQueryParams(params) {
        $.extend(queryParams, params);
    }

    function getTableList(url) {
        Ajax.send({
            url: url,
            data: queryParams
        }, _updateTableConfig.processName, _updateTableConfig.showLoader)
            .success(function(html) {
                historyManager.pushState(html, url);
                updateTable(html);
            });
    }

    function updateTable(html) {
        $_table.html(html).show();
        setEvents();
        _updateTableConfig.callback.apply();
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

        getTableList: function(url) {
            getTableList(url);
        },

        updateTable: function(html) {
            updateTable(html);
        },

        getTableRows: function() {
            return $_table.find('tbody').find('tr');
        },

        addQueryParams: function(params) {
            addQueryParams(params);
        }
    };

    return TableManager;
});