/**
 * Created by Artur on 2015-04-16.
 */

define(['./storage', './helper/object'], function(Storage, ObjectHelper) {

    /**
     *
     * @param {jQuery|DomElement} form
     * @constructor
     */
    var Form = function(form) {
        this.$form = $(form);
        this.formName = this.$form.attr('name');
        this.key = this.formName + '_23key';
    };

    Form.prototype = {

        /**
         * @param {bool} [saveData = true] If true, before sending form,
         * form data will be storing into local storage.
         */
        submit: function(saveData) {
            if (saveData !== false) {
                this.saveData();
            }
            this.$form.submit();
        },

        /**
         * Saves form data into local storage.
         */
        saveData: function() {
            var data = this.$form.serializeObject();

            // Remove Symfony framework form token.
            if (data[this.formName]['_token']) {
                delete data[this.formName]['_token'];
            }

            Storage.local.set(this.key, data);
        },

        /**
         * Fills form fields with values from data, from local storage.
         */
        loadData: function() {
            var data = this.getData(),
                form = this.$form[0];

            for (var item in data) {
                loadFieldData(form, item, data[item]);
            }
        },

        /**
         * Clears form values.
         */
        clearData: function() {
            Storage.local.remove(this.key);
            this.clearFields();
        },

        /**
         * Gets form data from local storage.
         *
         * @returns {*}
         */
        getData: function() {
            var data = Storage.local.get(this.key);
            if (!data) {
                this.saveData();
                data = Storage.local.get(this.key);
            }

            return data;
        },

        /**
         * @param {[]|null} [fields]
         * @param {bool} [includeButtonsAndHidden = false]
         */
        clearFields: function(fields, includeButtonsAndHidden) {
            var elements = this.$form[0].elements,
                element,
                i = 0;

            if (fields) {
                for (i; i < elements.length; i++) {
                    element = elements[i];

                    if ($.inArray(element.name, fields) !== -1) {
                        clearField(element, true);
                    }
                }
            } else {
                for (i; i < elements.length; i++) {
                    clearField(elements[i], includeButtonsAndHidden);
                }
            }
        }
    };

    /**
     *
     * @param {HTMLFormElement} element
     * @param {bool} [includeButtonsAndHidden = false]
     */
    function clearField(element, includeButtonsAndHidden) {
        var type = element.type;

        if (includeButtonsAndHidden === true || $.inArray(type, ['hidden', 'submit', 'button', 'reset']) === -1) {
            if (type === 'radio' || type === 'checkbox') {
                element.checked = false;
            } else if (type === 'select-multiple') {
                $(element).find('option').attr('selected', false);
            } else {
                element.value = '';
            }
        }
    }

    /**
     *
     * @param {HTMLFormElement} form
     * @param {string} preName
     * @param {*} value
     */
    function loadFieldData(form, preName, value) {
        var name,
            isArray,
            element;

        if (ObjectHelper.is('Object', value)) {
            for (var nestedName in value) {
                name = preName + '[' + nestedName + ']';
                loadFieldData(form, name, value[nestedName]);
            }
        } else {
            isArray = ObjectHelper.is('Array', value);

            name = isArray === true ? preName + '[]' : preName;
            element = form[name];

            if (element) {
                if (isArray) {
                    // Multiple
                    if (element.type === undefined) {
                        if (element[0].type === 'checkbox') {
                            $(element).val(value);
                        }
                    } else if (element.type == 'select-multiple') {
                        $(element).find('option').each(function() {
                            this.selected = value.indexOf(this.value) !== -1;
                        });
                    }
                } else {
                    if (element.type == 'checkbox') {
                        element.checked = true;
                    } else {
                        element.value = value;
                    }
                }
            }
        }
    }

    return Form;

});
