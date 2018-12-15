var expect = null,
    _JSWLogger = null,
    _LogMethod = null;

var browser = false;

try {
    if (window) browser = true;
} catch (e) { /* window not found -> not a browser environment */ }

if (browser) {
    expect = window.chai.expect;
    _JSWLogger = window.JSWLogger;
} else {
    expect = require("chai").expect;

    if (process.env.test_coverage) {
        _JSWLogger = require("../../test/coverage/lib/JSW-Logger.js").JSWLogger;
    } else {
        _JSWLogger = require("../../index.js").JSWLogger;
        _LogMethod = require("../../").LogMethod;
    }
}

describe("Logger" + (browser ? "- Web" : ""), function() {
    describe("#Constructor", function() {
        it("should have the dependencies ready", function() {
            expect(_JSWLogger).to.exist;
        });
    });
        
    describe("#Instance", function() {
        it("should be work only as a singleton", function() {
            var thrown = false;
            
            try {
                new _JSWLogger();
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                
                thrown = true;
            } finally {
                expect(thrown).to.be.true;
            }
            
            thrown = false;
            try {
                _JSWLogger();
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                
                thrown = true;
            } finally {
                expect(thrown).to.be.true;
            }
        });
        
        it("should be able to create a first instance with options", function() {
            var logger = _JSWLogger.getInstance({ testing: true, hideAllLogs: true });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty("options");
            expect(logger.options).to.not.have.ownProperty("testing");
            expect(logger.options).to.have.ownProperty("hideAllLogs", true);
        });
        
        it("should be able to retrieve the instance", function() {
            var logger = _JSWLogger.instance;
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty("options");
            expect(logger.options).to.not.have.ownProperty("testing");
            expect(logger.options).to.have.ownProperty("hideAllLogs", true);
        });
        
        it("should fail when re-instanciating with options", function() {
            var logger = _JSWLogger.getInstance({ hideAllLogs: false });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty("options");
            expect(logger.options).to.not.have.ownProperty("testing");
            expect(logger.options).to.have.ownProperty("hideAllLogs", true);
        });
        
        it("should be able to drop the instance", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ hideLevelLog: true });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty("options");
            expect(logger.options).to.not.have.ownProperty("testing");
            expect(logger.options).to.have.ownProperty("hideAllLogs", false);
            expect(logger.options).to.have.ownProperty("hideLevelLog", true);
        });
        
        it("should be able to create a first instance without options", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.instance;
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty("options");
            expect(logger.options).to.not.have.ownProperty("testing");
        });
    });
    
    describe("#Logging", function() {
        it("should work even with no arguments", function() {
            _JSWLogger.__dropInstance();
            
            // Log up to info only
            var logger = _JSWLogger.getInstance({ level: 9, hideLevelLog: true });
            
            var result = logger.silly();
            
            expect(result).to.be.equal("");
        });
        
        it("should output up to \"info\" by default", function() {
            _JSWLogger.__dropInstance();
            
            // Log up to info only
            var logger = _JSWLogger.getInstance({ hideAllLogs: true });
            
            var result = logger.silly("test info 1");
            
            expect(result).to.be.false;
            
            result = logger.info("test info 2");
            
            expect(result).to.be.equal("INFO: test info 2");
        });
        
        it("should not output if level is too low", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 2, hideAllLogs: true });
            
            var result = logger.silly("test silly 1");
            
            expect(result).to.be.false;
        });
        
        it("should output a \"silly\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.silly("test silly 1");
            
            expect(result).to.be.equal("SILLY: test silly 1");
            
            result = logger.print("silly", "test silly 2");
            
            expect(result).to.be.equal("SILLY: test silly 2");
            
            result = logger.print("6", "test silly 3");
            
            expect(result).to.be.equal("SILLY: test silly 3");
            
            result = logger.print(6, "test silly 4");
            
            expect(result).to.be.equal("SILLY: test silly 4");
        });
        
        it("should output a \"debug\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.debug("test debug 1");
            
            expect(result).to.be.equal("DEBUG: test debug 1");
            
            result = logger.print("debug", "test debug 2");
            
            expect(result).to.be.equal("DEBUG: test debug 2");
        });
        
        it("should output a \"verbose\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.verbose("test verbose 1");
            
            expect(result).to.be.equal("VERBOSE: test verbose 1");
            
            result = logger.print("verbose", "test verbose 2");
            
            expect(result).to.be.equal("VERBOSE: test verbose 2");
        });
        
        it("should output a \"log\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.log("test log 1");
            
            expect(result).to.be.equal("LOG: test log 1");
            
            result = logger.print("log", "test log 2");
            
            expect(result).to.be.equal("LOG: test log 2");
            
            result = logger.print("test log 3");
            
            expect(result).to.be.equal("LOG: test log 3");
        });
        
        it("should output a \"info\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.info("test info 1");
            
            expect(result).to.be.equal("INFO: test info 1");
            
            result = logger.inform("test info 2");
            
            expect(result).to.be.equal("INFO: test info 2");
            
            result = logger.information("test info 3");
            
            expect(result).to.be.equal("INFO: test info 3");
            
            result = logger.print("info", "test info 4");
            
            expect(result).to.be.equal("INFO: test info 4");
        });
        
        it("should output a \"warn\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.warn("test warn 1");
            
            expect(result).to.be.equal("WARN: test warn 1");
            
            result = logger.warning("test warn 2");
            
            expect(result).to.be.equal("WARN: test warn 2");
            
            result = logger.print("warn", "test warn 3");
            
            expect(result).to.be.equal("WARN: test warn 3");
        });
        
        it("should output a \"error\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.error("error debug 1");
            
            expect(result).to.be.equal("ERROR: error debug 1");
            
            result = logger.print("error", "error debug 2");
            
            expect(result).to.be.equal("ERROR: error debug 2");
        });
        
        it("should throw an error and exit", function() {
            var logger = _JSWLogger.instance;
            
            var thrown = false;
            
            try {
                logger.throw("TEST");
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                expect(error.message).to.be.equal("TEST");
                
                thrown = true;
            } finally {
                expect(thrown).to.be.true;
            }
        });
        
        it("should throw an error without exiting", function() {
            var logger = _JSWLogger.instance;
            logger.options.throwError = false;
            
            var thrown = false;
            var result = "";
            
            try {
                result = logger.throw("TEST");
            } catch (error) {
                thrown = true;
            } finally {
                expect(thrown).to.be.false;
                expect(result).to.be.equal("ERROR: TEST");
            }
        });
    });
    
    describe("#Interpolation", function() {
        it("should interpolate a \"silly\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.silly("Hello %s Nº %d!", "World", 1);
            
            expect(result).to.be.equal("SILLY: Hello World Nº 1!");
            
            result = logger.print("silly", "Hello %s Nº %d!", "World", 2);
            
            expect(result).to.be.equal("SILLY: Hello World Nº 2!");
        });
        
        it("should interpolate a \"debug\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.debug("Hello %s Nº %d!", "World", 1);
            
            expect(result).to.be.equal("DEBUG: Hello World Nº 1!");
            
            result = logger.print("debug", "Hello %s Nº %d!", "World", 2);
            
            expect(result).to.be.equal("DEBUG: Hello World Nº 2!");
        });
        
        it("should interpolate a \"verbose\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.verbose("Hello %s Nº %d!", "World", 1);
            
            expect(result).to.be.equal("VERBOSE: Hello World Nº 1!");
            
            result = logger.print("verbose", "Hello %s Nº %d!", "World", 2);
            
            expect(result).to.be.equal("VERBOSE: Hello World Nº 2!");
        });
        
        it("should interpolate a \"log\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.log("Hello %s Nº %d!", "World", 1);
            
            expect(result).to.be.equal("LOG: Hello World Nº 1!");
            
            result = logger.print("log", "Hello %s Nº %d!", "World", 2);
            
            expect(result).to.be.equal("LOG: Hello World Nº 2!");
        });
        
        it("should interpolate a \"info\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.info("Hello %s Nº %d!", "World", 1);
            
            expect(result).to.be.equal("INFO: Hello World Nº 1!");
            
            result = logger.inform("Hello %s Nº %d!", "World", 2);
            
            expect(result).to.be.equal("INFO: Hello World Nº 2!");
            
            result = logger.information("Hello %s Nº %d!", "World", 3);
            
            expect(result).to.be.equal("INFO: Hello World Nº 3!");
            
            result = logger.print("info", "Hello %s Nº %d!", "World", 2);
            
            expect(result).to.be.equal("INFO: Hello World Nº 2!");
        });
        
        it("should interpolate a \"warn\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.warn("Hello %s Nº %d!", "World", 1);
            
            expect(result).to.be.equal("WARN: Hello World Nº 1!");
            
            result = logger.warning("Hello %s Nº %d!", "World", 2);
            
            expect(result).to.be.equal("WARN: Hello World Nº 2!");
            
            result = logger.print("warn", "Hello %s Nº %d!", "World", 2);
            
            expect(result).to.be.equal("WARN: Hello World Nº 2!");
        });
        
        it("should interpolate an \"error\" log", function() {
            _JSWLogger.__dropInstance();
            
            var logger = _JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.error("Hello %s Nº %d!", "World", 1);
            
            expect(result).to.be.equal("ERROR: Hello World Nº 1!");
            
            result = logger.print("error", "Hello %s Nº %d!", "World", 2);
            
            expect(result).to.be.equal("ERROR: Hello World Nº 2!");
        });
        
        it("should interpolate and throw an error", function() {
            var logger = _JSWLogger.instance;
            logger.options.throwError = true;
            
            var thrown = false;
            var result = "";
            
            try {
                result = logger.throw("Error Nº %d", 1);
            } catch (error) {
                thrown = true;
                
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                expect(error.message).to.be.equal("Error Nº 1");
            } finally {
                expect(thrown).to.be.true;
                expect(result).to.be.equal("");
            }
            
            logger.options.throwError = false;
            
            thrown = false;
            result = "";
            
            try {
                result = logger.throw("Error Nº %s", "unknown");
            } catch (error) {
                thrown = true;
            } finally {
                expect(thrown).to.be.false;
                expect(result).to.be.equal("ERROR: Error Nº unknown");
            }
        });
    });
    
    describe("# Not Allowed", function() {
        it("should not call \"__log\" without level or message", function() {
            var logger = _JSWLogger.instance;
            
            var thrown = false;
            
            try {
                logger.__log("TEST");
            } catch (error) {
                thrown = true;
            } finally {
                expect(thrown).to.be.true;
            }
        });
    });
});

if (!browser) {
    describe("Decorators", function() {
        describe("#LogMethod", function() {
            it("should be imported", function() {
                expect(_LogMethod).to.exist;
                expect(_LogMethod).to.be.a("function");
            });
            
            it("should work", function() {
                // Method copied
                var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
                    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                    return c > 3 && r && Object.defineProperty(target, key, r), r;
                };
                
                var MyClass = function() { };
                MyClass.prototype.decoratorMethod = function() { return 1; };
                
                __decorate([
                    _LogMethod
                ], MyClass.prototype, "decoratorMethod", null);
                
                var c = new MyClass();
                expect(c.decoratorMethod()).to.be.equal(1);
            });
        });
    });
}