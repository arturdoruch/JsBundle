/**
 * Created by Artur on 2015-01-08.
 */

define(['./domElement', './helper/object'], function(DomElement, HelperObj) {

    function DomElementBuilder() {
        this._collection = {};
    }

    DomElementBuilder.prototype = {
        /**
         * Adds new DomElement into collection.
         * @param {string}          name
         * @param {DomElement|null} element  DomElement defined by user.
         * @param {object|string}   [attr]   Default attributes for element.
         *                                   If is type of "string" then will be considered as "tag" parameter.
         * @param {object|string}   [css]    Default css style.
         *                                   If is type of "string" then will be considered as "tag" parameter.
         * @param {string}          [tag]    Default tag name.
         * @returns {DomElementBuilder}
         */
        add: function(name, element, attr, css, tag) {
            if (HelperObj.isString(attr)) {
                tag = attr;
                attr = {};
                css = {};
            } else if (HelperObj.isString(css)) {
                tag = css;
                css = {};
            }

            if (!element || !element instanceof DomElement) {
                element = new DomElement(tag);
            }

            element.setDefaultAttr(attr).setDefaultCss(css);
            this._collection[name] = element;
            return this;
        },

        /**
         * Gets all collection object, which contain DomElement objects.
         * @returns {object}
         */
        all: function() {
            return this._collection;
        },

        /**
         * @param {string} name
         * @returns {DomElement|null}
         */
        get: function(name) {
            if (this.isExists(name)) {
                return this._collection[name];
            }
            return null;
        },

        isExists: function(name) {
            return this._collection.hasOwnProperty(name);
        },

        /**
         * Removes DomElement form collection.
         * @param {string} name
         * @returns {DomElementBuilder}
         */
        remove: function(name) {
            if (this.isExists(name)) {
                this._collection[name] = null;
                delete this._collection[name];
            }
            return this;
        }
    };

    return new DomElementBuilder();
});