"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const decorators_1 = require("../decorators");
exports.BaseService = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _dispose_decorators;
    return _a = class BaseService {
            constructor(context, accessory, client) {
                Object.defineProperty(this, "context", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _instanceExtraInitializers), context)
                });
                Object.defineProperty(this, "accessory", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: accessory
                });
                Object.defineProperty(this, "client", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: client
                });
                Object.defineProperty(this, "characteristics", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: []
                });
                this.logger.debug(`Creating ${this.constructor.name}`);
            }
            get service() {
                return this.context.service;
            }
            get characteristic() {
                return this.context.characteristic;
            }
            get logger() {
                return this.context.logger;
            }
            getOrAddService(service) {
                return (this.accessory.getService(service) ||
                    this.accessory.addService(service));
            }
            getOrAddNamedService(service, name, subType) {
                return (this.accessory.getService(name) ||
                    this.accessory.addService(service, name, subType));
            }
            dispose() {
                for (const c of this.characteristics) {
                    c.removeOnGet();
                    c.removeOnSet();
                    c.removeAllListeners();
                }
            }
        },
        (() => {
            _dispose_decorators = [(0, decorators_1.logMethod)()];
            __esDecorate(_a, null, _dispose_decorators, { kind: "method", name: "dispose", static: false, private: false, access: { has: obj => "dispose" in obj, get: obj => obj.dispose } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();
//# sourceMappingURL=base.js.map