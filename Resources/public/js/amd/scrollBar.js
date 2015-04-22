/**
 * Created by Artur on 2014-11-19.
 */

define([], function() {

    var bodyMarginLeftTmp = 0,
        loadState = true,
        correctPositionState = false;

    /**
     * Loads and unloads browser scroll bars.
     *
     * @param state string
     * @param moveBody bool
     * @private
     */
    function _load(state, moveBody) {
        if (document.documentElement) {
            document.documentElement.style.overflow = (state == 'load') ? 'auto' : 'hidden'; // firefox, chrome
        } else {
            document.body.scroll = (state == 'load') ? 'yes' : 'no'; // old ie only
        }

        loadState = (state == 'load');

        if (moveBody == true) {
            correctBodyPosition();
        }
    }

    /**
     * Gets scroll bar width
     * @returns {number}
     */
    function getWidth() {
        var outer = document.createElement("div"),
            inner,
            widthNoScroll,
            widthWithScroll;

        outer.style.backgroundColor = "black";
        outer.style.width = "100px";
        document.body.appendChild(outer);

        widthNoScroll = outer.offsetWidth;
        // Force scroll bars
        outer.style.overflow = "scroll";
        // add inner div
        inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }

    /*function getWidthJQuery() {
        var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
            widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();

        $outer.remove();

        return 100 - widthWithScroll;
    }*/

    function correctBodyPosition() {
        if (loadState == false && correctPositionState == false) {
            bodyMarginLeftTmp = document.body.style.marginLeft.replace('px', '') || 0;
            document.body.style.marginLeft = (bodyMarginLeftTmp - getWidth()) + 'px';
            correctPositionState = true;
        } else if (loadState == true) {
            document.body.style.marginLeft = (bodyMarginLeftTmp == 0) ? '' : bodyMarginLeftTmp + 'px';
            correctPositionState = false;
        }
    }

    return {
        load: function(moveBody) {
            _load('load', moveBody);
        },
        unload: function(moveBody) {
            _load('unload', moveBody);
        },
        getWidth: getWidth
    }
});
