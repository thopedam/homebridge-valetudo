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
exports.FanService = void 0;
const base_1 = require("./base");
const valetudo_1 = require("../types/valetudo");
const valetudo_2 = require("../types/valetudo");
const decorators_1 = require("../decorators");
function getStatus(attributes) {
    const status = attributes.find((0, valetudo_1.isAttribute)(valetudo_1.RobotAttributeClass.StatusState));
    if (!status) {
        throw new Error("No status found in robot attribute");
    }
    return status;
}
function getFanPresetSelection(attributes) {
    const selection = attributes
        .filter((0, valetudo_1.isAttribute)(valetudo_1.RobotAttributeClass.PresetSelectionState))
        .find((a) => a.type === valetudo_1.PresetSelectionType.FanSpeed);
    if (!selection) {
        throw new Error("No fan speed selection found in robot attribute");
    }
    return selection;
}
// Requires BasicControlCapability and FanSpeedControlCapability
exports.FanService = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _handleAttributeUpdate_decorators;
    return _a = class FanService extends base_1.BaseService {
            constructor(platform, accessory, client, attributes, fanPresets) {
                super(platform, accessory, client);
                Object.defineProperty(this, "fanPresets", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _instanceExtraInitializers), fanPresets)
                });
                Object.defineProperty(this, "fan", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "status", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "fanPresetSelection", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                this.status = getStatus(attributes);
                this.fanPresetSelection = getFanPresetSelection(attributes);
                this.fan = this.getOrAddNamedService(this.service.Fanv2, "Vacuum", "Vacuum");
                this.characteristics = [
                    this.fan
                        .getCharacteristic(this.characteristic.Active)
                        .onGet(this.getActive.bind(this))
                        .onSet(this.setActive.bind(this)),
                    this.fan
                        .getCharacteristic(this.characteristic.RotationSpeed)
                        .setProps({
                        minStep: 100 / fanPresets.length,
                    })
                        .onGet(this.getRotationSpeed.bind(this))
                        .onSet(this.setRotationSpeed.bind(this)),
                ];
                this.client.onStateAttributesUpdated(this.handleAttributeUpdate.bind(this));
            }
            handleAttributeUpdate(attribute) {
                this.status = getStatus(attribute);
                this.fanPresetSelection = getFanPresetSelection(attribute);
                this.fan
                    .getCharacteristic(this.characteristic.Active)
                    .updateValue(this.getActive());
                this.fan
                    .getCharacteristic(this.characteristic.RotationSpeed)
                    .updateValue(this.getRotationSpeed());
            }
            getActive() {
                return [
                    valetudo_1.RobotStatus.Returning,
                    valetudo_1.RobotStatus.Cleaning,
                    valetudo_1.RobotStatus.ManualControl,
                    valetudo_1.RobotStatus.Moving,
                ].includes(this.status.value)
                    ? this.characteristic.Active.ACTIVE
                    : this.characteristic.Active.INACTIVE;
            }
            async setActive(value) {
                const active = value;
                await this.client.putBasicControlAction(active ? valetudo_1.BasicControlAction.Start : valetudo_1.BasicControlAction.Pause);
            }
            getRotationSpeed() {
                const index = this.fanPresets.indexOf(this.fanPresetSelection.value);
                if (index === -1) {
                    return null;
                }
                return (index / (this.fanPresets.length - 1)) * 100;
            }
            async setRotationSpeed(value) {
                const speed = value;
                const index = Math.floor((speed / 100) * (this.fanPresets.length - 1));
                const preset = this.fanPresets[index];
                await this.client.putPresetSelection(valetudo_2.Capability.FanSpeedControl, preset);
            }
        },
        (() => {
            _handleAttributeUpdate_decorators = [(0, decorators_1.logMethod)({ level: "debug" /* LogLevel.DEBUG */, skipArgs: true, skipResult: true })];
            __esDecorate(_a, null, _handleAttributeUpdate_decorators, { kind: "method", name: "handleAttributeUpdate", static: false, private: false, access: { has: obj => "handleAttributeUpdate" in obj, get: obj => obj.handleAttributeUpdate } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();
//# sourceMappingURL=fan.js.map