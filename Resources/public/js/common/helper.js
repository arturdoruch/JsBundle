/**
 * Created by Artur on 2015-01-04.
 */

/**
 * Counts code time execution.
 */
function TimeExecute() {
    this.startTime = new Date().getTime();
    this.get = function() {
        return new Date().getTime() - this.startTime;
    }
}

(function(document, $, undefined) {

    var helper = {};
    /*
     * Browser helpers
     * ***********************************************************************************************
     */
    helper.browser = {
        /**
         * @link http://stackoverflow.com/a/11381730/989439
         */
        mobileCheck: function() {
            var check = false;

            (function(a) {
                if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
                    check = true;
                }
            })(navigator.userAgent||navigator.vendor||window.opera);

            return check;
        },

        /**
         * Gets user browser name.
         * @returns {string}
         */
        getName: function() {
            var nav = navigator.appName,
                userAgent = navigator.userAgent,
                temp,
                match = userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

            if (match && (temp = userAgent.match(/version\/([\.\d]+)/i))!= null) {
                match[2] = temp[1];
            }
            match = match ? [match[1], match[2]] : [nav, navigator.appVersion, '-?'];

            return match[0].toLowerCase();
        }
    };

    /*
     * Date helpers
     * ***********************************************************************************************
     */

    /**
     * @returns {string} Date in database format "YYYY-MM-DD".
     */
    Date.prototype.toDate = function() {
        return this.getFullYear() + '-' + date.padZero(this.getMonth()+1) + '-' +  date.padZero(this.getDate());
    };

    /**
     * @returns {string} UTC date in database format "YYYY-MM-DD".
     */
    Date.prototype.toUTCDate = function() {
        return this.getUTCFullYear() + '-' + date.padZero(this.getUTCMonth()+1) + '-' + date.padZero(this.getUTCDate());
    };

    /**
     * @returns {string} Datetime in database format "YYYY-MM-DD HH:MI:SS"
     */
    Date.prototype.toDateTime = function() {
        var hour = date.padZero(this.getHours()),
            min = date.padZero(this.getMinutes()),
            sec = date.padZero(this.getSeconds());

        return this.toDate() + ' '+ hour + ':' + min + ':' + sec;
    };

    /**
     * @returns {string} UTC Datetime in database format "YYYY-MM-DD HH:MI:SS"
     */
    Date.prototype.toUTCDateTime = function() {
        var hour = date.padZero(this.getUTCHours()),
            min = date.padZero(this.getUTCMinutes()),
            sec = date.padZero(this.getUTCSeconds());

        return this.toUTCDate() + ' '+ hour + ':' + min + ':' + sec;
    };

    /**
     * @returns {string} Returns a local date as a string value in ISO format.
     */
    Date.prototype.toIso = function() {
        return this.toDate()
        + 'T' + date.padZero(this.getHours())
        + ':' + date.padZero(this.getMinutes())
        + ':' + date.padZero(this.getSeconds())
        + '.' + this.getMilliseconds();
    };

    /**
     * Increases or decreases Date object date on a specified amount days.
     * @param {number} days
     * @returns {Date}
     */
    Date.prototype.moveDays = function(days) {
        this.setDate(this.getDate() + days);
        return this;
    };

    var monthFormat = {
        number: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        short:  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        long:   ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };

    helper.date = {

        /** Gets the difference in minutes between the time on the local computer and Universal Coordinated Time (UTC). */
        getTimezoneOffset: function() {
            return new Date().getTimezoneOffset();
        },

        /** Gets server timezone. */
        getLocalTimezone: function() {
            return (this.getTimezoneOffset() / 60) * -1;
        },

        /*
         * @param {number} timestamp
         * @param {number} zone Time zone from range -12 to +13.
         * @returns {number} GMT timezone
         */
        /*setTimezone: function(timestamp, zone) {
         return timestamp - zone*60*60;
         },*/

        /**
         * Pads zero "0" before number smaller then 10.
         *
         * @param {Number} number
         * @returns {string}
         */
        padZero: function(number) {
            // ("0" + number.toString()).slice(-2)
            return number < 10 ? "0" + number.toString() : number;
        },

        /**
         * Gets formatted current date.
         * @param {string} format Date format. Possible values: date, dateTime, UTCDate, UTCDateTime
         * @param {number} [moveDays=0]
         * @returns {string}
         */
        getCurrentDate: function(format, moveDays) {
            var date = new Date().moveDays(moveDays || 0);

            switch (format) {
                case "date":		return date.toDate();
                case "dateTime":	return date.toDateTime();
                case "UTCDate":		return date.toUTCDate();
                case "UTCDateTime":	return date.toUTCDateTime();
                default:            return date.toDateTime();
            }
        },

        timestampToDate: function(timestamp) {
            return new Date(timestamp*1000).toDate();
        },

        timestampToUTCDate: function(timestamp) {
            return new Date(timestamp*1000).toUTCDate();
        },

        timestampToDatetime: function(timestamp) {
            return new Date(timestamp*1000).toDateTime();
        },

        timestampToUTCDatetime: function(timestamp) {
            return new Date(timestamp*1000).toUTCDateTime();
        },

        /**
         * Gets unix timestamp date without time.
         * @param {number} timestamp Unix time in seconds.
         * @returns {number}
         */
        getTime: function(timestamp) {
            var time = new Date(timestamp * 1000),
                date = time.getFullYear()+', '+(time.getMonth()+1)+', '+time.getDate();

            return new Date(date).getTime() / 1000;
        },

        /**
         * Gets unix timestamp date without time in Coordinated Universal Time standard.
         * @param {number} timestamp Unix time in seconds.
         * @returns {number}
         */
        getUTCTime: function(timestamp) {
            var time = new Date(timestamp * 1000),
                date = time.getUTCFullYear()+', '+(time.getUTCMonth()+1)+', '+time.getUTCDate();

            return new Date(date).getTime() / 1000;
        },

        /**
         * Converts datetime to timestamp in milliseconds.
         * @param {string} time              Datetime in sql format "YYYY-MM-DD HH:MI:SS"
         * @param {bool} [milliSecond=false] Describes returned timestamp precision. If true timestamp will be
         *                                   in milliseconds, otherwise in seconds.
         * @returns {number}                 Timestamp
         */
        sqlToTimestamp: function(time, milliSecond) {
            if (!time) {
                throw new Error('Missing "time" parameter value.');
            }
            var date = Date.parse( time.replace(/(-)/g, ',') );

            return milliSecond === true ? date : date / 1000;
        },

        /**
         * Converts sql dateTime format into Date object
         * @param {string} dateTime SQL date time like '2015-01-20 01:01:03'
         * @returns {Date}
         */
        sqlToDate: function(dateTime) {
            dateTime = dateTime.trim().replace(/(-)/g, ',');
            return new Date(dateTime);
        },

        /**
         * Converts string month into number representation.
         * @param {string} month Proper month value in short "Jan" or long "January" format.
         * @returns {number}
         */
        monthStringToNumber: function(month) {
            var i, length = monthFormat.short.length;

            for (i = 0; length; i++) {
                if (month.indexOf(monthFormat.short[i]) === 0) {
                    return monthFormat.number[i];
                }
            }

            throw new Error('Invalid "month" value');
        },

        /**
         * Converts number month into string representation.
         * @param {Number} month Proper month value in number representation.
         * @param {string} [format=short] Month format. Possible values: long, short.
         * @returns {string}
         */
        monthNumberToString: function(month, format) {
            var i, length = monthFormat.number.length;

            month = this.padZero(month);
            for (i = 0; length; i++) {
                if (month == monthFormat.number[i]) {
                    return (format === 'long') ? monthFormat.long[i] : monthFormat.short[i];
                }
            }

            throw new Error('Invalid "month" value');
        },

        /**
         * Gets Date objects collection from given range time.
         * @param {number|Date} startTime      Start range time in milliseconds timestamp or Date object.
         * @param {number|Date} endTime        End range time in milliseconds timestamp or Date object.
         * @param {string} [direction="asc"]   Direction sorting of returning array. Allowed values [asc, desc].
         * @param {string|number} [step="day"] Dates collection steps. Possible values:
         *                                     "[digit] day[s]", "[digit] hour[s]" or number of minutes.
         *
         * @returns {Date[]}                   Date objects array collection.
         */
        getTimeRange: function(startTime, endTime, direction, step) {
            var dates = [],
                parseStep = function(step) {
                    var number = null;

                    if (step && !isNaN(step)) {
                        return 60 * step;
                    }
                    if (number = /^([\d]*) ?hours?$/.exec(step)) {
                        return 60 * 60 * parseInt(number[1]);
                    }
                    if (number = /^([\d]*) ?days?$/.exec(step)) {
                        return 60 * 60 * 24 * parseInt(number[1]);
                    }

                    return 60 * 60 * 24;
                };

            step = parseStep(step) * 1000;

            if (startTime instanceof Date) {
                startTime = startTime.getTime();
            }
            if (endTime instanceof Date) {
                endTime = endTime.getTime();
            }

            while (startTime <= endTime) {
                dates.push(new Date(startTime));
                startTime += step;
            }

            if (direction === 'desc') {
                dates.reverse();
            }

            return dates;
        }
    };

    /*
     * Dom helpers
     * ***********************************************************************************************
     */
    helper.dom = {
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

    /*
     * Object helpers
     * ***********************************************************************************************
     */
    helper.object = {

        /**
         * Checks if object is of expected type.
         *
         * @param {string} type
         * @param {*}      obj
         * @returns {boolean}
         */
        is: function(type, obj) {
            var cls = Object.prototype.toString.call(obj).slice(8, -1);
            return obj !== undefined && obj !== null && cls === type;
        },

        /**
         * Executes function from nested object.
         *
         * @param {string} functionName         Full path to nested object function.
         *                                      Example: "object.subObj.subSubObj", "object.subObj.subSubObj(string, true)"
         *                                      If you want to set arguments with type like: true, false or number, as string
         *                                      put this argument into double quotes "".
         * @param {object} context
         * @param {array}  [args]               Calling function arguments.
         * @param {string} [execMethod="apply"] Name of method that calls function. [call, apply]
         *
         * @returns {*}
         */
        execFunctionByName: function (functionName, context, args, execMethod) {
            var that = this;
            if (functionName instanceof Object) {
                return functionName.call();
            }

            functionName.replace(/^ *([\w\.]+)\((.*)\) *$/g, function(match, _func, _args) {
                functionName = _func;
                _args = _args.split(',').map(function(arg) {
                    arg = arg.trim();
                    if (arg === 'true') {
                        return true;
                    } else if (arg === 'false') {
                        return false;
                    } else if (!isNaN(arg)) {
                        return parseInt(arg);
                    } else if (arg = /^"(.*)"$/.exec(arg)) {
                        return arg[1];
                    }
                    return arg;
                });
                args = that.extend(args || [], _args);
            });

            //var args = Array.prototype.slice.call(arguments, 2),
            var namespaces = functionName.split("."),
                func = namespaces.pop();

            for (var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
                if (!context) {
                    return false;
                }
            }

            return context[func][execMethod || 'apply'](context, args);
        },

        extend: function(destination, source) {
            for (var i in source) {
                if (destination[i] && (typeof(destination[i]) == 'object')
                    && (destination[i].toString() == '[object Object]') && source[i]
                ) {
                    extend(destination[i], source[i])
                } else {
                    destination[i] = source[i];
                }
            }
            return destination;
        },

        /**
         * Filters object with matches key regexp.
         * @param {object} object
         * @param {RegExp} regexp Searching key as regexp.
         */
        filterByKey: function(object, regexp) {
            for (var key in object) {
                if (!regexp.test(key)) {
                    delete object[key];
                }
            }
        },

        /**
         * Searches object for key that matches with given regexp.
         * @param {object} object
         * @param {RegExp} regexp Searching key as regexp.
         * @returns {boolean}
         */
        isExistsKey: function(object, regexp) {
            for (var key in object) {
                if (regexp.test(key)) {
                    return true;
                }
            }
            return false;
        },

        destroy: function(obj) {
            obj = null;
            for (var i in obj) {
                delete obj[i];
            }
            return obj;
        },

        // Array
        removeItemFromArray: function(array, value) {
            var index = array.indexOf(value);
            if (index > -1) {
                array.splice(index, 1);
            }
            return array;
        },

        arraySortCompare: function(property) {
            var sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }

            return function(a, b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

                return result * sortOrder;
            }
        }
    };

    /*
     * Position helpers
     * ***********************************************************************************************
     */
    helper.position = {
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
                throw new Error('"element" is not exist or has invalid type. ' +
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
    };

    /*
     * String helpers
     * ***********************************************************************************************
     */
    helper.string = {
        /**
         * Repeats string count times
         *
         * @param pattern {string}
         * @param count {int}
         * @returns {string}
         */
        strRepeat: function(pattern, count) {
            if (count < 1) return '';
            var result = '';

            while (count > 0) {
                if (count >= 1) {
                    result += pattern;
                }
                count--;
            }

            return result;
        },

        /**
         * Translates a string with underscores into camel case (e.g. first_name -> firstName)
         *
         * @param string {string}             String in underscore format
         * @param capitaliseFirstChar {bool}  If true, capitalise the first char in string
         * @returns {string}
         */
        camelize: function(string, capitaliseFirstChar) {
            //string = string.toLowerCase();
            var firstChar = (capitaliseFirstChar === true) ? string.charAt(0).toUpperCase() : string.charAt(0).toLowerCase();
            string = firstChar + string.slice(1);

            return string.replace(/[\-_]([a-z])/g, function(match) {
                return match[1].toUpperCase();
            });
        },

        /**
         * Translates a string in camel case style into plain text (camelCase --> Camel case).
         *
         * @param {string} string
         * @returns {string}
         */
        camelCaseToString: function(string) {
            if (!string) {
                return null;
            }
            string = string.replace(/([A-Z])/g, function(match) {
                return match[0] = ' ' + match[0].toLowerCase();
            });

            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    };

    this.helper = helper;

    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        define(function() {
            return helper;
        });
    }

})(document, $);
