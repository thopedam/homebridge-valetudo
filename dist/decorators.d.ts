import { LogLevel, Logger } from "homebridge";
interface ClassWithLogger {
    logger?: Logger;
}
interface LogOptions {
    level: LogLevel;
    skipArgs?: boolean;
    skipResult?: boolean;
}
export declare function logMethod<This extends ClassWithLogger, Args extends any[]>(options?: LogOptions): (target: (this: This, ...args: Args) => any, context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => any>) => (this: This, ...args: Args) => any;
export declare function cachePromise<This extends ClassWithLogger, Result>(ttl: number): (target: (this: This) => Promise<Result>, context: ClassMethodDecoratorContext<This, (this: This) => Promise<Result>>) => (this: This) => Promise<Result>;
export {};
//# sourceMappingURL=decorators.d.ts.map