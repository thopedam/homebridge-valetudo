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
exports.AccessoryInfoService = void 0;
const decorators_1 = require("../decorators");
const duration_1 = require("../duration");
const base_1 = require("./base");
exports.AccessoryInfoService = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _getFirmwareRevision_decorators;
    return _a = class AccessoryInfoService extends base_1.BaseService {
            constructor(context, accessory, client, txt) {
                super(context, accessory, client);
                Object.defineProperty(this, "info", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _instanceExtraInitializers), void 0)
                });
                this.info = this.getOrAddService(this.service.AccessoryInformation);
                this.info
                    .setCharacteristic(this.characteristic.Manufacturer, txt.manufacturer)
                    .setCharacteristic(this.characteristic.Model, txt.model)
                    .setCharacteristic(this.characteristic.SerialNumber, txt.id)
                    .setCharacteristic(this.characteristic.SoftwareRevision, txt.version);
                this.characteristics = [
                    this.info
                        .getCharacteristic(this.characteristic.FirmwareRevision)
                        .onGet(this.getFirmwareRevision.bind(this)),
                ];
            }
            async getFirmwareRevision() {
                const properties = await this.client.getProperties();
                return properties.firmwareVersion;
            }
        },
        (() => {
            _getFirmwareRevision_decorators = [(0, decorators_1.cachePromise)((0, duration_1.milliseconds)({ minutes: 5 }))];
            __esDecorate(_a, null, _getFirmwareRevision_decorators, { kind: "method", name: "getFirmwareRevision", static: false, private: false, access: { has: obj => "getFirmwareRevision" in obj, get: obj => obj.getFirmwareRevision } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();
//# sourceMappingURL=accessoryInfo.js.map