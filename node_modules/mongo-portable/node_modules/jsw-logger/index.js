"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSW_Logger_1 = require("./src/JSW-Logger");
exports.JSWLogger = JSW_Logger_1.JSWLogger;
var decorators_1 = require("./src/decorators");
exports.LogMethod = decorators_1.LogMethod;
try {
    if (window) {
        window["JSWLogger"] = JSW_Logger_1.JSWLogger;
    }
}
catch (e) { }

//# sourceMappingURL=index.js.map
