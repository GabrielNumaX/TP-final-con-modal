import * as _ from "lodash";

/**
 * Options
 * 
 * @since 1.2.0
 * @author Eduardo Astolfi <eastolfi91@gmail.com>
 * @copyright 2017 Eduardo Astolfi <eastolfi91@gmail.com>
 * @license MIT Licensed
 * 
 * @classdesc Option class ensuring the configuration
 */
class Options {
    public level: number;                          // logging info, warn and error by default
    public hideAllLogs: boolean;
    public hideLevelLog: boolean;
    public throwError: boolean;
    public handledExceptionsLogPath: string;
    
    private __defaultOptions = {
        level: 2,
        hideAllLogs: false,
        hideLevelLog: false,
        throwError: true,
        handledExceptionsLogPath: "/../logs/handledException.log"
    };
    
    constructor(options?: any) {
        if (_.isNil(options)) {
            options = {}
        }
        
        this.level = ((options.level != null) ? options.level : this.__defaultOptions.level);
        this.hideAllLogs = (_.isBoolean(options.hideAllLogs) ? options.hideAllLogs : this.__defaultOptions.hideAllLogs);
        this.hideLevelLog = (_.isBoolean(options.hideLevelLog) ? options.hideLevelLog : this.__defaultOptions.hideLevelLog);
        this.throwError = (_.isBoolean(options.throwError) ? options.throwError : this.__defaultOptions.throwError);
        this.handledExceptionsLogPath = (options.handledExceptionsLogPath ? options.handledExceptionsLogPath : this.__defaultOptions.handledExceptionsLogPath);
    }
}

export { Options };