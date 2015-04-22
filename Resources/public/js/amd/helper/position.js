/**
 * Created by Artur on 2014-12-30.
 */

define(['../scrollBar'], function(ScrollBar) {

    return {
        /**
         * Gets screen viewport width
         * @returns {Number}
         */
        getWidth: function () {
            return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
        },

        /**
         * Gets screen viewport height
         * @returns {Number}
         */
        getHeight: function () {
            return window.innerHeight != null ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null ? document.body.clientHeight : null;
        },

        getPageYOffset: function () {
            return window.pageYOffset || document.documentElement.scrollTop;
        },

        getPageXOffset: function () {
            return window.pageXOffset || document.documentElement.scrollLeft;
        },

        /**
         * Sets HTMLElement position on the screen. By default element is positioned centrally on the screen.
         * @param {HTMLElement|jQuery} element               Element to positioned.
         * @param {string}             [vertical="center"]   Vertical directions [top, center bottom]
         * @param {string}             [horizontal="center"] Horizontal directions [left, center, right]
         */
        setPosition: function (element, vertical, horizontal) {
            if (element instanceof jQuery) {
                element = element[0];
            }
            if (!(element instanceof HTMLElement)) {
                throw new Error('"element" is not exists or has invalid type. ' +
                    'He must be a type of HTMLElement or jQuery object.');
            }

            var style = element.style,
                wasHidden = false;

            style.margin = 0;
            if (style.position !== 'absolute' && style.position !== 'fixed') {
                style.position = 'fixed';
            }
            if (style.display == 'none') {
                style.display = '';
                wasHidden = true;
            }

            if (!vertical || vertical == 'center') {
                style.top = ((this.getHeight() - element.offsetHeight) / 2) + 'px';
            } else if (vertical == 'top') {
                style.top = 0;
                style.bottom = 'auto';
            } else if (vertical == 'bottom') {
                style.top = 'auto';
                style.bottom = 0;
            }

            if (!horizontal || horizontal == 'center') {
                style.left = ((this.getWidth() - element.offsetWidth - ScrollBar.getWidth()) / 2) + 'px';
            } else if (horizontal == 'left') {
                style.left = 0;
                style.right = 'auto';
            } else if (horizontal == 'right') {
                style.left = 'auto';
                style.right = 0;
            }

            if (wasHidden === true) {
                style.display = 'none';
            }
        },

        /**
         * Scrolls page to top.
         *
         * @param {jQuery} $trigger               Trigger that scrolling page to top.
         * @param {object} [options]
         * @param {Number} options.triggerShowPos Position (counting from viewport top) in pixels, when $trigger should be appear.
         * @param {Number} options.scrollSpeed
         */
        scrollToTop: function ($trigger, options) {
            var _options = {
                triggerShowPos: 100,
                scrollSpeed: 800
            };

            options = $.extend(_options, options);
            $trigger.hide();
            $trigger.css({
                position: 'fixed',
                zIndex: 2,
                cursor: 'pointer'
            });

            $(window).on('scroll', function () {
                if ($(this).scrollTop() > options.triggerShowPos) {
                    $trigger.fadeIn();
                } else {
                    $trigger.fadeOut();
                }
            });

            $trigger.on('click', function (e) {
                e.preventDefault();
                $('body, html').animate({scrollTop: 0}, options.scrollSpeed);
            });
        }
    }
});

