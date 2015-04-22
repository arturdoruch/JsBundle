/**
 * Created by Artur on 2015-01-07.
 */

define(['./helper/object'], function(HelperObject) {

    /**
     * @param {string|HTMLElement|jQuery} element Tag name or existence HTML or jQuery element.
     * @param {object} attr     HTML element attributes.
     * @param {object} css      HTML element css styles.
     * @constructor
     */
    function DomElement(element, attr, css) {
        this._element = validateElement(element);
        this._attr = {};
        this._css = {};
        this._cache = undefined;

        var attributes = getElementAttributes(this._element);

        $.extend(this._attr, attributes.attr, attr);
        $.extend(this._css, attributes.css, css);

        setAttr(this._element, this._attr);
        setCss(this._element, this._css);
    }

    DomElement.prototype = {
        /**
         * Gets HTML Element.
         * @returns {HTMLElement}
         */
        el: function() {
            return this._element;
        },

        /**
         * Gets jQuery object.
         * @returns {jQuery}
         */
        $el: function() {
            if (this._cache === undefined) {
                this._cache = $(this.el());
            }

            return this._cache;
        },

        /**
         * Sets attribute for HTML element. If attribute already exists then will be overwrite by new value.
         * @param {string|object} name      Attribute name or object with "attrName: value" items.
         * @param {string|}       [value]   If "name" is object this parameters will be omitted.
         * @param {bool}          [overwrite]
         * @returns {DomElement}
         */
        setAttr: function(name, value, overwrite) {
            extend(this._attr, name, value, overwrite);
            setAttr(this._element, this._attr);
            return this;
        },

        setDefaultAttr: function(name, value) {
            return this.setAttr(name, value, false);
        },

        /**
         * Sets css styles.
         * @param {string|object} attr
         * @param {string}        [value]
         * @param {bool}          [overwrite]
         * @returns {DomElement}
         */
        setCss: function(attr, value, overwrite) {
            extend(this._css, attr, value, overwrite);
            setCss(this._element, this._css);
            return this;
        },

        setDefaultCss: function(attr, value) {
            return this.setCss(attr, value, false);
        },

        /**
         * Appends element to "parent" element.
         * @param {body|HTMLElement|jQuery} [parent="body"]
         */
        appendTo: function(parent) {
            if (parent instanceof DomElement) {
                parent.el().appendChild(this.el());
            } else if (parent instanceof jQuery || parent instanceof HTMLElement) {
                parent.appendChild(this.el());
            } else {
                document.body.appendChild(this.el());
            }

            return this;
        },

        /**
         * Appends this element into "parent" only if element is not appended to HTML tree.
         * @param {body|HTMLElement|jQuery} [parent="body"]
         */
        appendToIfNot: function(parent) {
            var isExists = document.body.contains(this.el());
            if (!isExists) {
                this.appendTo(parent);
            }
            return this;
        },

        /**
         * Removes element from DOM object.
         */
        remove: function() {
            this.$el().remove();
        },

        empty: function() {
            this.$el().empty();
        },

        hide: function() {
            this.el().style.display = 'none';
            return this;
        },

        /**
         * Sets css "display" property to different then "none".
         * If in css configuration is set property "display" then will be used.
         * Otherwise will be used empty value.
         * @returns {DomElement}
         */
        show: function() {
            this.el().style.display = this._css.display || '';
            return this;
        }

    };

    /**
     * @param element
     * @returns {*}
     */
    function validateElement(element) {
        if (HelperObject.is('String', element) && element.length >= 1) {
            return document.createElement(element);
        } else if (element instanceof jQuery) {
            return element[0];
        } else if (element instanceof HTMLElement) {
            return element;
        }

        return document.createElement('div');
        //throw new TypeError('"tag" must be a type of "string", "HTMLElement" or "jQuery"');
    }

    /**
     * @param {HTMLElement} element
     * @param {object}      attributes
     */
    function setAttr(element, attributes) {
        for (var attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
    }

    function setCss(element, css) {
        for (var attr in css) {
            element.style[formatCssProperty(attr)] = css[attr];
        }
    }

    /**
     * Extends attr and css objects configuration.
     * @param {object}        object Object for extends.
     * @param {string|object} name
     * @param {string}        [value]
     * @param {bool}          [override=true] If true adds new attribute only if not set yet.
     *                                        If false always adds new attribute or override  them if already exists.
     */
    function extend(object, name, value, override) {
        if (HelperObject.is('Object', name)) {
            if (override === false) {
                for (var attr in name) {
                    if (!object.hasOwnProperty(attr)) {
                        object[attr] = name[attr];
                    }
                }
            } else {
                $.extend(object, name);
            }
        } else if (HelperObject.is('String', name)) {
            if (override === false) {
                if (!object.hasOwnProperty(name)) {
                    object[name] = value;
                }
            } else {
                object[name] = value;
            }
        }
    }

    /**
     * Replaces css property name to format used by JavaScript. "background-color" --> "backgroundColor"
     * @param {string} property CSS property name
     * @returns {string}
     */
    function formatCssProperty(property) {
        return property.replace(/-([a-z])/g, function(match) {
            return match[1].toUpperCase();
        });
    }

    /**
     * Gets current attributes from HTML Element, and apply them into DomElement dedicated objects.
     * @param {HTMLElement} element
     * @returns {object}
     */
    function getElementAttributes(element) {
        var attr = element.attributes,
            object = {
                attr: {},
                css: {}
            },
            node,
            cssList,
            css;

        for (var i = 0; i < attr.length; i++) {
            node = attr[i];
            if (node.nodeName == 'style') {
                cssList = node.nodeValue.split(';');
                for (var j in cssList) {
                    css = cssList[j].split(':').map(function(item) {
                        return item.trim();
                    });
                    object.css[formatCssProperty(css[0])] = css[1];
                }
            } else {
                object.attr[node.nodeName] = node.nodeValue;
            }
        }

        return object;
    }

    return DomElement;
});