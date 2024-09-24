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
exports.BatteryService = void 0;
const valetudo_1 = require("../types/valetudo");
const base_1 = require("./base");
const decorators_1 = require("../decorators");
function getBatteryState(attributes) {
    return (attributes.find((0, valetudo_1.isAttribute)(valetudo_1.RobotAttributeClass.BatteryState)) || {
        __class: valetudo_1.RobotAttributeClass.BatteryState,
        metaData: {},
        level: 0,
        flag: valetudo_1.BatteryStateFlag.None,
    });
}
exports.BatteryService = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _handleAttributeUpdate_decorators;
    return _a = class BatteryService extends base_1.BaseService {
            constructor(context, accessory, client, attributes) {
                super(context, accessory, client);
                Object.defineProperty(this, "battery", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _instanceExtraInitializers), void 0)
                });
                Object.defineProperty(this, "state", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                this.state = getBatteryState(attributes);
                this.battery = this.getOrAddService(this.service.Battery);
                this.characteristics = [
                    this.battery
                        .getCharacteristic(this.characteristic.BatteryLevel)
                        .onGet(this.getBatteryLevel.bind(this)),
                    this.battery
                        .getCharacteristic(this.characteristic.ChargingState)
                        .onGet(this.getChargingState.bind(this)),
                    this.battery
                        .getCharacteristic(this.characteristic.StatusLowBattery)
                        .onGet(this.getStatusLowBattery.bind(this)),
                ];
                this.client.onStateAttributesUpdated(this.handleAttributeUpdate.bind(this));
            }
            handleAttributeUpdate(attribute) {
                this.state = getBatteryState(attribute);
                this.battery
                    .getCharacteristic(this.characteristic.BatteryLevel)
                    .updateValue(this.getBatteryLevel());
                this.battery
                    .getCharacteristic(this.characteristic.ChargingState)
                    .updateValue(this.getChargingState());
                this.battery
                    .getCharacteristic(this.characteristic.StatusLowBattery)
                    .updateValue(this.getStatusLowBattery());
            }
            getBatteryLevel() {
                return this.state.level || 0;
            }
            getChargingState() {
                switch (this.state.flag) {
                    case valetudo_1.BatteryStateFlag.None:
                        return this.characteristic.ChargingState.NOT_CHARGEABLE;
                    case valetudo_1.BatteryStateFlag.Charged:
                    case valetudo_1.BatteryStateFlag.Discharging:
                        return this.characteristic.ChargingState.NOT_CHARGING;
                    case valetudo_1.BatteryStateFlag.Charging:
                        return this.characteristic.ChargingState.CHARGING;
                }
            }
            getStatusLowBattery() {
                if (this.state.level < 20) {
                    this.characteristic.StatusLowBattery.BATTERY_LEVEL_LOW;
                }
                return this.characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL;
            }
        },
        (() => {
            _handleAttributeUpdate_decorators = [(0, decorators_1.logMethod)({ level: "debug" /* LogLevel.DEBUG */, skipArgs: true, skipResult: true })];
            __esDecorate(_a, null, _handleAttributeUpdate_decorators, { kind: "method", name: "handleAttributeUpdate", static: false, private: false, access: { has: obj => "handleAttributeUpdate" in obj, get: obj => obj.handleAttributeUpdate } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();
//# sourceMappingURL=battery.js.map