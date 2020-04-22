/*!
 * (c) 2020 Artur Doruch <arturdoruch@interia.pl>
 */

/**
 * Manages items of the Symfony form collection https://symfony.com/doc/current/form/form_collections.html.
 */
define([
    '../component/eventManager'
], function (em) {

    var collectionSelector = '*[data-form-collection]',
        $collections,
        collections = {};

    setCollectionsData();
    setEvents();

    function setCollectionsData() {
        $collections = $(collectionSelector);
        $collections.each(function (index, container) {
            var data = container.dataset,
                $list = $(container).find('ul').first();

            collections[data.formCollection] = {
                template: data.template,
                totalItems: $list.find('li').length,
                $list: $list
            };
        });
    }

    function setEvents() {
        em.on('click', $collections.find('*[data-add-item]'), addItem);
        em.on('click', $collections.find('*[data-remove-item]'), removeItem, [true]);
    }

    /**
     * Adds item ("li" element) to the form collection.
     *
     * @param e
     */
    function addItem(e) {
        var $collection = getCollectionElement(e.currentTarget);

        if ($collection.length === 0) {
            return;
        }

        var collectionName = $collection.data('form-collection'),
            data = collections[collectionName],
            index = data.totalItems++,
            formTemplate = data.template
                .replace(/__name__label__/g, index)
                .replace(/__name__/g, index),
            $li = $('<li>').append(formTemplate);

        data.$list.append($li);

        em.on('click', $li.find('*[data-remove-item]'), removeItem);
        //removeCollectionErrorMessage($collection);
    }

    /**
     * Removes item ("li" element) from the form collection.
     *
     * @todo Restore element.
     */
    function removeItem(e, confirmRequired) {
        var $li = $(e.target).closest('li');
        var value = $li.find('*[name]').val();

        if (value && confirmRequired && !confirm('Are you sure you want to delete this item?')) {
            return;
        }

        //removeCollectionErrorMessage(getCollectionElement($li));
        $li.remove();
    }

    /**
     * @param {string} target
     * @return {*|jQuery}
     */
    function getCollectionElement(target) {
        return $(target).closest(collectionSelector);
    }


    /*function removeCollectionErrorMessage($collection) {
        $collection.parent().find('> span.help-block').first().remove();
    }*/
});