/**
 * Created by Artur on 2014-12-22.
 */

define(['./processNotice'], function(ProcessNotice) {

    // Process instance
    var processNotice;

    function init(noticeElem, noticeLoaderElem, config) {
        processNotice = new ProcessNotice(noticeElem, noticeLoaderElem, config);
    }

    /**
     * Sets and shows notice.
     * @param {string} noticeText Text to show.
     * @param {bool}   showLoader Shows graphic loader.
     * @returns {*|Notice}
     */
    function set(noticeText, showLoader) {
        if (processNotice && noticeText) {
            var notice = processNotice.add(noticeText);
            processNotice.show(showLoader);

            return notice;
        }

        return null;
    }

    /**
     * Removes notice.
     * @param {Notice} notice
     */
    function remove(notice) {
        if (processNotice && notice) {
            processNotice.remove(notice);
        }
    }

    return {
        init: init,
        set: set,
        remove: remove
    }
});
