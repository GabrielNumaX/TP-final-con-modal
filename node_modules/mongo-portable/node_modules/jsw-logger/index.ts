import { JSWLogger } from "./src/JSW-Logger";
import { LogMethod } from "./src/decorators";

try {
    if (window) {
        window["JSWLogger"] = JSWLogger;
    }
} catch(e) { /* window not found -> not a browser environment */ }

export { JSWLogger, LogMethod };