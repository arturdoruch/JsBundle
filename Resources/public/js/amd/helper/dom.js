/**
 * Created by Artur on 2014-12-30.
 */

define([], function() {

    return {
        getTextNodes: function (node) {
            var textNodes = [];

            for (var i = 0; i < node.childNodes.length; i++) {
                if (node.childNodes[i].nodeName === "#text") {
                    textNodes.push(node.childNodes[i]);
                } else if ($.inArray(node.childNodes[i].nodeName, ['B', 'STRONG', 'I', 'EM', 'U']) !== -1) {
                    textNodes[textNodes.length - 1].textContent += ' ' + node.childNodes[i].textContent;
                }
            }
            return textNodes;
        },

        getSelectedValueByName: function (element, name) {
            var options = element.getElementsByTagName('option'),
                value;

            for (var i = 1; i < options.length; i++) {
                if (options[i].textContent.toLowerCase() == name.toLowerCase()) {
                    value = options[i].value;
                    return (isNaN(value)) ? value.trim() : parseInt(value.value);
                }
            }
            return false;
        },

        isTagSelfClosing: function (tagName) {
            var tags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr',
                'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

            for (var i in tags) {
                if (tagName.toLowerCase() == tags[i]) {
                    return true;
                }
            }
            return false;
        },

        /**
         * @param obj
         * @returns {boolean} True if object is a DOM element.
         */
        isHTMLElement: function (obj) {
            return (
                typeof HTMLElement === "object" ? obj instanceof HTMLElement : //DOM2
                obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
            );
        },

        /**
         * Returns true if object is a DOM node.
         */
        isNode: function (obj) {
            return (
                typeof Node === "object" ? obj instanceof Node :
                obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string"
            );
        },

        clearContent: function (element) {
            if (!(element instanceof HTMLElement)) {
                return;
            }

            if (element.nodeName == 'TEXTAREA' || element.nodeName == 'INPUT') {
                element.value = '';
            } else {
                element.innerHTML = '';
            }
        },

        /**
         * Returns Image object with src attribute filled by css property "background-image".
         *
         * @param {jQuery|HTMLElement} element
         * @returns {Image}
         */
        getBackgroundImage: function (element) {
            var img = new Image();

            if (element instanceof jQuery) {
                element = element[0];
            }
            img.src = window.getComputedStyle(element).backgroundImage.replace(/url\(|\)$|"|'/ig, '');

            return img;
        }
    };

});