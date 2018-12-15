"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Symbol = require("es6-symbol");
var Options_1 = require("./Options");
var TRANSPORT_PREFIX = "EAMP_LOGGER";
// Singleton instance
var singleton = Symbol();
var singletonEnforcer = Symbol();
var LEVELS = {
    "silly": 6,
    "debug": 5,
    "verbose": 4,
    "log": 3,
    "info": 2,
    "warn": 1,
    "error": 0
};
var LEVELS_STR = ["ERROR", "WARN", "INFO", "LOG", "VERBOSE", "DEBUG", "SILLY"];
function interpolate(string, values) {
    var str = string;
    var i = 0;
    while (str.match(/%./)) {
        var match = str.match(/%./)[0];
        if (match.toLowerCase() === "%s") {
            str = str.replace(match, "" + values[i]);
        }
        else if (match.toLowerCase() === "%d") {
            str = str.replace(match, +values[i]);
        }
        i++;
    }
    return str;
}
// function ensureFile(file, cb) {
//     fs.exists(file, exists => {
//         if (!exists) {
//             fs.writeFile(file, "", err => {
//                 cb(err);
//             });
//         } else {
//             cb(null);
//         }
//     });
// }
/**
 * JSWLogger
 *
 * @module JSWLogger
 * @since 0.0.1
 * @author Eduardo Astolfi <eastolfi91@gmail.com>
 * @copyright 2016 Eduardo Astolfi <eastolfi91@gmail.com>
 * @license MIT Licensed
 *
 * @classdesc Logging module singleton which writes in the console all warnings and erros
 */
var JSWLogger = (function () {
    function JSWLogger(enforcer, options) {
        if (options === void 0) { options = {}; }
        this.options = new Options_1.Options();
        if (enforcer !== singletonEnforcer)
            throw new Error("Cannot construct singleton");
        // super({
        //     transports: [
        //         new winston.transports.Console({
        //             name: `${TRANSPORT_PREFIX}_debug-console`,
        //             level: "error"
        //         })
        //     ]
        // });
        //this.options = _.assign({}, this.options, options);
        this.options = new Options_1.Options(options);
        // Ensuring that the log file exists
        // let handledExceptionsLogPath = path.resolve(__dirname + defaultOptions.handledExceptionsLogPath);
        // ensureFile(handledExceptionsLogPath, error => {
        //     if (error) throw new Error(error);
        //     this.logger = new winston.Logger({
        //         transports: [
        //             new winston.transports.File({
        //                 name: `${TRANSPORT_PREFIX}_exception-file`,
        //                 filename: handledExceptionsLogPath,
        //                 level: "error",
        //                 json: false,
        //                 colorize: true
        //             })
        //         ]
        //     });
        //     if (options.hideAllLogs) {
        //         this.remove(`${TRANSPORT_PREFIX}_debug-console`);
        //         this.logger.remove(`${TRANSPORT_PREFIX}_exception-file`);
        //     }
        // });
    }
    JSWLogger.prototype.__log = function (level, message, options) {
        if (options === void 0) { options = []; }
        if (_.isNil(level) || _.isNil(message)) {
            throw new Error("Call not allowed: Missing parameters");
        }
        if (_.isNaN(_.toNumber(level))) {
            level = _.isNil(LEVELS[level]) ? LEVELS.log : LEVELS[level];
        }
        else {
            level = +level;
        }
        if (options.length > 0) {
            message = interpolate(message, options);
        }
        var logMethod = console.log;
        // If level is lower than 0, that means we dont log anything
        if (level >= 0) {
            if (level === 0) {
                if (console.error)
                    logMethod = console.error;
            }
            else if (level === 1) {
                if (console.warn)
                    logMethod = console.warn;
            }
            else if (level === 2) {
                if (console.info)
                    logMethod = console.info;
            }
        }
        if (this.options.hideLevelLog) {
            message = "" + message;
        }
        else {
            message = LEVELS_STR[level] + ": " + message;
        }
        if (level <= this.options.level) {
            if (!this.options.hideAllLogs) {
                logMethod(message);
            }
            return message;
        }
        else {
            return false;
        }
    };
    JSWLogger.prototype.silly = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.__log(LEVELS.silly, message || "", options);
    };
    JSWLogger.prototype.debug = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.__log(LEVELS.debug, message || "", options);
    };
    JSWLogger.prototype.verbose = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.__log(LEVELS.verbose, message || "", options);
    };
    JSWLogger.prototype.log = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.__log(LEVELS.log, message || "", options);
    };
    JSWLogger.prototype.info = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.__log(LEVELS.info, message || "", options);
    };
    JSWLogger.prototype.inform = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.__log(LEVELS.info, message || "", options);
    };
    JSWLogger.prototype.information = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.__log(LEVELS.info, message || "", options);
    };
    JSWLogger.prototype.warn = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.__log(LEVELS.warn, message || "", options);
    };
    JSWLogger.prototype.warning = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.__log(LEVELS.warn, message || "", options);
    };
    JSWLogger.prototype.error = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.__log(LEVELS.error, message || "", options);
    };
    JSWLogger.prototype.print = function (level, message) {
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
        if (_.isNil(message) || _.isArray(message)) {
            options = (message || []);
            message = level;
            level = LEVELS.log;
        }
        return this.__log(level, message || "", options);
    };
    /**
     * Method to throw a controlled exception, logging it to a log file.
     *
     * @method JSWLogger#throw
     *
     * @param {Error|string} error - The exception or message to be thrown.
     * @param {Boolean} [throwError=true] - Same as JSWLogger->options->throwError
     */
    JSWLogger.prototype.throw = function (error) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        if (_.isString(error)) {
            var message = interpolate(error, options);
            error = new Error(message);
        }
        if (this.options.throwError) {
            throw error;
        }
        else {
            return this.error(error.message);
        }
    };
    Object.defineProperty(JSWLogger, "instance", {
        /**
         * Retrieves the current singleton instance, creating a new one if needed.
         *
         * @static
         *
         * @returns {JSWLogger} this - The singleton Instance
         */
        get: function () {
            if (_.isNil(this[singleton])) {
                this[singleton] = new JSWLogger(singletonEnforcer);
            }
            return this[singleton];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the current singleton instance, creating a new one if needed.
     * It allows, when creating the first time, a set of options. Otherwise, it will return the singleton instance
     *
     * @static
     *
     * @param {Object} [options] - Additional options. See {@link JSWLogger#constructor}
     *
     * @returns {JSWLogger} this - The singleton Instance
     */
    JSWLogger.getInstance = function (options) {
        if (_.isNil(this[singleton])) {
            this[singleton] = new JSWLogger(singletonEnforcer, options);
        }
        else {
            JSWLogger.instance.error("Singleton already instanciated. Ignoring options and retrieving current instance.");
        }
        return JSWLogger.instance;
    };
    /**
     * Destroy the current singleton instance
     *
     * @static
     */
    JSWLogger.__dropInstance = function () {
        delete this[singleton];
    };
    return JSWLogger;
}());
exports.JSWLogger = JSWLogger;

//# sourceMappingURL=JSW-Logger.js.map
