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
exports.ConsumableService = void 0;
const valetudo_1 = require("../types/valetudo");
const base_1 = require("./base");
const decorators_1 = require("../decorators");
const duration_1 = require("../duration");
function getEnumName(enumType, enumValue) {
    const keys = Object.keys(enumType);
    for (const key of keys) {
        if (enumType[key] === enumValue) {
            return key;
        }
    }
    return undefined;
}
function getConsumableName(consumable) {
    var _a, _b, _c;
    const subType = (_a = consumable.subType) !== null && _a !== void 0 ? _a : valetudo_1.ConsumableSubType.None;
    const typeName = (_b = getEnumName(valetudo_1.ConsumableType, consumable.type)) !== null && _b !== void 0 ? _b : consumable.type;
    const subTypeName = (_c = getEnumName(valetudo_1.ConsumableSubType, subType)) !== null && _c !== void 0 ? _c : subType;
    return `${typeName} (${subTypeName})`;
}
function getConsumableId(consumable) {
    var _a;
    return `${consumable.type}-${(_a = consumable.subType) !== null && _a !== void 0 ? _a : valetudo_1.ConsumableSubType.None}`;
}
function isMainFilter(meta) {
    return (meta.type === valetudo_1.ConsumableType.Filter &&
        meta.subType === valetudo_1.ConsumableSubType.Main);
}
exports.ConsumableService = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _getConsumableStates_decorators;
    return _a = class ConsumableService extends base_1.BaseService {
            constructor(context, accessory, client, properties) {
                super(context, accessory, client);
                __runInitializers(this, _instanceExtraInitializers);
                // Support only main filter for now. Generally the name is not shown in other home apps if there are multiple filter indicators.
                const meta = properties.availableConsumables.find(isMainFilter);
                if (meta) {
                    const id = getConsumableId(meta);
                    const name = getConsumableName(meta);
                    const service = this.getOrAddNamedService(this.service.FilterMaintenance, id, id);
                    service.setCharacteristic(this.characteristic.Name, name);
                    this.characteristics.push(service
                        .getCharacteristic(this.characteristic.FilterChangeIndication)
                        .onGet(this.getFilterChangeIndication.bind(this, meta)), service
                        .getCharacteristic(this.characteristic.FilterLifeLevel)
                        .onGet(this.getFilterLifeLevel.bind(this, meta)), service
                        .getCharacteristic(this.characteristic.ResetFilterIndication)
                        .onSet(this.resetFilterIndication.bind(this, meta)));
                }
            }
            getConsumableStates() {
                return this.client.getConsumableStates();
            }
            async getConsumableStateByMeta(meta) {
                const states = await this.getConsumableStates();
                const state = states.find((state) => {
                    var _a;
                    return state.type === meta.type &&
                        ((_a = state.subType) !== null && _a !== void 0 ? _a : valetudo_1.ConsumableSubType.None) === meta.subType;
                });
                if (!state) {
                    throw new Error(`State for consumable ${getConsumableName(meta)} is not found`);
                }
                return state;
            }
            async getFilterChangeIndication(meta) {
                const state = await this.getConsumableStateByMeta(meta);
                return state.remaining.value > 0
                    ? this.characteristic.FilterChangeIndication.FILTER_OK
                    : this.characteristic.FilterChangeIndication.CHANGE_FILTER;
            }
            async getFilterLifeLevel(meta) {
                var _a;
                const state = await this.getConsumableStateByMeta(meta);
                const level = (state.remaining.value / ((_a = meta.maxValue) !== null && _a !== void 0 ? _a : 100)) * 100;
                return Math.min(Math.max(Math.round(level), 0), 100);
            }
            async resetFilterIndication(meta, value) {
                if (value === 1) {
                    return this.client.putResetConsumable(meta);
                }
            }
        },
        (() => {
            _getConsumableStates_decorators = [(0, decorators_1.cachePromise)((0, duration_1.milliseconds)({ minutes: 5 }))];
            __esDecorate(_a, null, _getConsumableStates_decorators, { kind: "method", name: "getConsumableStates", static: false, private: false, access: { has: obj => "getConsumableStates" in obj, get: obj => obj.getConsumableStates } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();
//# sourceMappingURL=consumable.js.map