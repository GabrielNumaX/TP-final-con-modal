"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSW_Logger_1 = require("./JSW-Logger");
function LogMethod(target, propertyKey, descriptor) {
    var logger = JSW_Logger_1.JSWLogger.instance;
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        logger.debug("Within " + this.constructor.name + "#" + propertyKey);
        return originalMethod.apply(this, args);
    };
}
exports.LogMethod = LogMethod;

//# sourceMappingURL=decorators.js.map
