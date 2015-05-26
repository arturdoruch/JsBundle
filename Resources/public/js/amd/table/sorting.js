/**
 * Created by Artur on 2014-11-17.
 */

define([
    '../router/helper'
], function(RouterHelper) {

    var sortingData = {},
        lastSortField;

    function init($tableContainer, Event) {
        var $sortingItems = $($tableContainer).find('table th .sort-table');

        updateSortingTabs($sortingItems);
        Event.addEvents(events($sortingItems), this);
    }

    function events($sortingItems) {
        return [
            ['click', $sortingItems, sorting]
        ];
    }

    function sorting($el) {
        var data = $el.dataset,
            queryParams = {};

        if (data.orderDir && data.orderField) {
            var orderDir = (sortingData[data.orderField]) ? sortingData[data.orderField] : data.orderDir;

            queryParams.orderField = data.orderField;
            queryParams.orderDir = orderDir;

            sortingData[data.orderField] = (orderDir == 'asc') ? 'desc' : 'asc';
            lastSortField = data.orderField;

            $.publish('table/getTableList', [queryParams, RouterHelper.getCurrentUrl()]);
        }
    }

    function updateSortingTabs($sortingItems) {
        $sortingItems.each(function() {
            if (lastSortField == this.dataset.orderField) {
                this.dataset.orderDir = sortingData[this.dataset.orderField];
                $(this).addClass('is-clicked');
            }
        });
    }

    return {
        init: init
    }

});