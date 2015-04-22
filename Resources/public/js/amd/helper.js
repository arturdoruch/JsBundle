/**
 * Created by Artur on 2015-01-04.
 */

define([
    './helper/browser',
    './helper/date',
    './helper/dom',
    './helper/object',
    './helper/position',
    './helper/string'
], function(browser, date, dom, object, position, string) {

    return {
        browser: browser,
        date: date,
        dom: dom,
        object: object,
        position: position,
        string: string
    }
});