"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachePromise = exports.logMethod = void 0;
function logMethod(options = { level: "debug" /* LogLevel.DEBUG */ }) {
    return function decorator(target, context) {
        function replacementMethod(...args) {
            var _a, _b, _c;
            const methodName = `${this.constructor.name}.${String(context.name)}`;
            const argString = options.skipArgs
                ? "skipped"
                : args.map((a) => JSON.stringify(a)).join(", ");
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log(options.level, `${methodName}(${argString})`);
            try {
                const result = target.call(this, ...args);
                if (result instanceof Promise) {
                    result
                        .then((value) => {
                        var _a;
                        const resultString = options.skipResult
                            ? "skipped"
                            : JSON.stringify(value);
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log(options.level, `${methodName} async => ${resultString}`);
                        return value;
                    })
                        .catch((error) => {
                        var _a;
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error(`${methodName} async => ${error}`);
                        throw error;
                    });
                }
                else {
                    const resultString = options.skipResult
                        ? "skipped"
                        : JSON.stringify(result);
                    (_b = this.logger) === null || _b === void 0 ? void 0 : _b.log(options.level, `${methodName} => ${resultString}`);
                }
                return result;
            }
            catch (error) {
                (_c = this.logger) === null || _c === void 0 ? void 0 : _c.error(`${methodName} => ${error}`);
                throw error;
            }
        }
        return replacementMethod;
    };
}
exports.logMethod = logMethod;
function cachePromise(ttl) {
    let cache = undefined;
    return function decorator(target, context) {
        function replacementMethod() {
            var _a, _b;
            const methodName = `${this.constructor.name}.${String(context.name)}`;
            if (cache) {
                if (!cache.done || cache.timestamp + ttl < Date.now()) {
                    (_a = this.logger) === null || _a === void 0 ? void 0 : _a.debug(`${methodName} cache hit`);
                    return cache.promise;
                }
            }
            (_b = this.logger) === null || _b === void 0 ? void 0 : _b.debug(`${methodName} cache miss`);
            const timestamp = Date.now();
            const promise = target.call(this).then((result) => {
                cache = {
                    promise,
                    done: true,
                    timestamp,
                };
                return result;
            });
            cache = {
                promise,
                done: false,
                timestamp,
            };
            return promise;
        }
        return replacementMethod;
    };
}
exports.cachePromise = cachePromise;
//# sourceMappingURL=decorators.js.map