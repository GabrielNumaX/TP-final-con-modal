import { JSWLogger } from "./JSW-Logger";

function LogMethod(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    let logger = JSWLogger.instance;
    
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        logger.debug(`Within ${this.constructor.name}#${propertyKey}`);
        
        return originalMethod.apply(this, args);
    };
}

export { LogMethod }