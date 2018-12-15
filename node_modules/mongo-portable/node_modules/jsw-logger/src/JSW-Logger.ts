"use strict";

import * as _ from "lodash";
import * as Symbol from "es6-symbol";
import { Options } from "./Options";
    
const TRANSPORT_PREFIX = "EAMP_LOGGER";

// Singleton instance
const singleton = Symbol();
const singletonEnforcer = Symbol();

const LEVELS = {
    "silly":    6,
    "debug":    5,
    "verbose":  4,
    "log":      3,
    "info":     2,
    "warn":     1,
    "error":    0
};

const LEVELS_STR = ["ERROR", "WARN", "INFO", "LOG", "VERBOSE", "DEBUG", "SILLY"];

function interpolate(string, values) {
    var str = string;
    var i = 0;
    
    while (str.match(/%./)) {
        var match = str.match(/%./)[0];
    
        if (match.toLowerCase() === "%s") {
            str = str.replace(match, "" + values[i]);
        } else if (match.toLowerCase() === "%d") {
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
class JSWLogger {
    private options: Options = new Options();
    
    constructor(enforcer:Symbol, options:Object = {}) {
        if(enforcer !== singletonEnforcer) throw new Error("Cannot construct singleton");
        
        // super({
        //     transports: [
        //         new winston.transports.Console({
        //             name: `${TRANSPORT_PREFIX}_debug-console`,
        //             level: "error"
        //         })
        //     ]
        // });
        
        //this.options = _.assign({}, this.options, options);
        this.options = new Options(options);
        
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
    
    private __log(level, message:string, options:Array<string|number> = []) {
        if (_.isNil(level) || _.isNil(message)) {
            throw new Error("Call not allowed: Missing parameters");
        }
        
        if (_.isNaN(_.toNumber(level))) {
            level = _.isNil(LEVELS[level]) ? LEVELS.log : LEVELS[level];
        } else {
            level = +level;
        }
        
        if (options.length > 0) {
            message = interpolate(message, options);
        }
        
        let logMethod = console.log;
        
        // If level is lower than 0, that means we dont log anything
        if (level >= 0) {
            if (level === 0) {          // Error
                if (console.error) logMethod = console.error;
            } else if (level === 1) {   // Warning
                if (console.warn) logMethod = console.warn;
            } else if (level === 2) {   // Information
                if (console.info) logMethod = console.info;
            }
        }
        
        if (this.options.hideLevelLog) {
            message = `${message}`;
        } else {
            message = `${LEVELS_STR[level]}: ${message}`;
        }
        
        if (level <= this.options.level) {
            if (!this.options.hideAllLogs) {
                logMethod(message);
            }
            
            return message;
        } else {
            return false;
        }
    }
    
    silly(message:string, ...options:Array<string|number>) {
        return this.__log(LEVELS.silly, message || "", options);
    }
    debug(message:string, ...options:Array<string|number>) {
        return this.__log(LEVELS.debug, message || "", options);
    }
    verbose(message:string, ...options:Array<string|number>) {
        return this.__log(LEVELS.verbose, message || "", options);
    }
    log(message:string, ...options:Array<string|number>) {
        return this.__log(LEVELS.log, message || "", options);
    }
    info(message:string, ...options:Array<string|number>) {
        return this.__log(LEVELS.info, message || "", options);
    }
    inform(message:string, ...options:Array<string|number>) {
        return this.__log(LEVELS.info, message || "", options);
    }
    information(message:string, ...options:Array<string|number>) {
        return this.__log(LEVELS.info, message || "", options);
    }
    warn(message:string, ...options:Array<string|number>) {
        return this.__log(LEVELS.warn, message || "", options);
    }
    warning(message:string, ...options:Array<string|number>) {
        return this.__log(LEVELS.warn, message || "", options);
    }
    error(message:string, ...options:Array<string|number>) {
        return this.__log(LEVELS.error, message || "", options);
    }
    print(level:string|number, message:string, ...options:Array<string|number>) {
        if (_.isNil(message) || _.isArray(message)) {
            options = <any[]>(message || []);
            message = <string>level;
            level = <number>LEVELS.log;
        }
        
        return this.__log(level, message || "", options);
    }
    
    /**
     * Method to throw a controlled exception, logging it to a log file.
     * 
     * @method JSWLogger#throw
     * 
     * @param {Error|string} error - The exception or message to be thrown.
     * @param {Boolean} [throwError=true] - Same as JSWLogger->options->throwError
     */
    throw(error:Error|string, ...options:Array<string|number>) {
        
        if (_.isString(error)) {
            let message = interpolate(<string>error, options);
            
            error = new Error(message);
        }
        
        if (this.options.throwError) {
            throw error;
        } else {
            return this.error((<Error>error).message);
        }
    }
    
    /**
     * Retrieves the current singleton instance, creating a new one if needed.
     * 
     * @static
     * 
     * @returns {JSWLogger} this - The singleton Instance
     */
    static get instance():JSWLogger {
        if (_.isNil(this[singleton])) {
            this[singleton] = new JSWLogger(singletonEnforcer);
        }
        
        return this[singleton];
        
    }
    
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
    static getInstance(options:Object):JSWLogger {
        if (_.isNil(this[singleton])) {
            this[singleton] = new JSWLogger(singletonEnforcer, options);
        } else {
            JSWLogger.instance.error("Singleton already instanciated. Ignoring options and retrieving current instance.");
        }
        
        return JSWLogger.instance;
    }
    
    /**
     * Destroy the current singleton instance
     * 
     * @static
     */
    static __dropInstance():void {
        delete this[singleton];
    }
}

export { JSWLogger };

// module.exports = Logger;
// export = Logger;