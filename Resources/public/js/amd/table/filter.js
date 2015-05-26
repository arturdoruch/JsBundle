/**
 * Created by Artur on 2014-11-17.
 */

define([
    '../event',
    '../router/helper',
    '../storage'
], function(Event, RouterHelper, Storage) {

    var $filterForm = $('form[name="filter_table"]');

    function init() {
        if ($filterForm.length == 0) {
            return;
        }

        loadParameters();
        Event.attachEvents(events(), this);
    }

    function events() {
        $filterForm.on('keypress', function(e) {
            if (e.keyCode == '13') {
                e.preventDefault();
                filter(this);
            }
        });

        return [
            ['change', $filterForm.find('select'), filter],
            ['change', $filterForm.find('input[name="radio"]'), filter],
            ['change', $filterForm.find('input[name="checkbox"]'), filter],
            ['click', $('#filter_table_filter'), filter],
            ['click', $('#filter_table_reset'), reset]
        ]
    }

    function getFormElement() {
        return $filterForm;
    }

    function filter(el) {
        if (!$filterForm) {
            return;
        }

        var formData = $filterForm.serializeArray(),
            name,
            value,
            queryParams = {},
            params = {};

        formData.map(function(i) {
            name = i.name.replace(/[^\[]*\[(.+)\].*/, '$1');
            value = i.value.trim();

            queryParams[name] = value;
            if (name.indexOf('_', 0) == -1) {
                params[i.name] = value;
            }
        });

        Storage.local.set(getParamsKey(), params);

        $.publish('table/getTableList', [queryParams, RouterHelper.getCurrentUrl(true)]);
    }

    function reset() {
        var formElements = $filterForm[0].elements,
            elem;

        for (var i=0; i < formElements.length; i++) {
            elem = formElements[i];

            if (elem.name !== 'filter_table[limit]' && elem.name !== 'filter_table[_token]') {
                elem.value = '';
                if (elem.nodeName == 'SELECT') {
                    elem.selectedIndex = 0;
                }
            }
        }

        filter();
    }

    function getParamsKey() {
        return 'filterTable' + RouterHelper.getCurrentRoute(true);
    }

    /**
     * Injects parameters from localStorage into filter form elements.
     */
    function loadParameters() {
        var params = Storage.local.get(getParamsKey()),
            formElements = $filterForm[0].elements,
            elem;

        if (!params) {
            return;
        }

        for (var i=0; i<formElements.length; i++) {
            elem = formElements[i];
            if (params[elem.name]) {
                elem.value = params[elem.name];
            }
        }
    }

    return {
        init: init,
        filter: filter,
        getFormElement: getFormElement
    }
});