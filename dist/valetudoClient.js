"use strict";
// A file which contains the client for the Valetudo API.
//
// An alternative is to generate a client from https://github.com/Hypfer/Valetudo/blob/104ec641d96f240e2515eec9800ac0176680110b/util/build_openapi_schema.mjs#L106
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValetudoClient = void 0;
const axios_1 = __importDefault(require("axios"));
const valetudo_1 = require("./types/valetudo");
const reconnecting_eventsource_1 = __importDefault(require("reconnecting-eventsource"));
const eventsource_1 = __importDefault(require("eventsource"));
const events_1 = __importDefault(require("events"));
const url_1 = require("url");
const decorators_1 = require("./decorators");
var ValetudoEventKey;
(function (ValetudoEventKey) {
    ValetudoEventKey["StateAttributes"] = "StateAttributesUpdated";
})(ValetudoEventKey || (ValetudoEventKey = {}));
const presetOrder = [
    valetudo_1.PresetSelectionStateIntensity.Off,
    valetudo_1.PresetSelectionStateIntensity.Min,
    valetudo_1.PresetSelectionStateIntensity.Low,
    valetudo_1.PresetSelectionStateIntensity.Medium,
    valetudo_1.PresetSelectionStateIntensity.High,
    valetudo_1.PresetSelectionStateIntensity.Max,
    valetudo_1.PresetSelectionStateIntensity.Turbo,
    valetudo_1.PresetSelectionStateMode.Vacuum,
    valetudo_1.PresetSelectionStateMode.VacuumAndMop,
    valetudo_1.PresetSelectionStateMode.Mop,
];
function sortPresets(presets) {
    return presets.sort((a, b) => {
        return presetOrder.indexOf(a) - presetOrder.indexOf(b);
    });
}
exports.ValetudoClient = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _getCapabilities_decorators;
    let _getInfo_decorators;
    let _getProperties_decorators;
    let _getStateAttributes_decorators;
    let _getPresetSelections_decorators;
    let _putPresetSelection_decorators;
    let _getConsumableStates_decorators;
    let _getConsumableProperties_decorators;
    let _putResetConsumable_decorators;
    let _putBasicControlAction_decorators;
    let _getSpeakerVolume_decorators;
    let _putSpeakerVolume_decorators;
    let _dispose_decorators;
    return _a = class ValetudoClient {
            constructor(host, port, logger) {
                Object.defineProperty(this, "logger", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _instanceExtraInitializers), void 0)
                });
                Object.defineProperty(this, "client", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "emitter", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "eventSources", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                this.logger = logger;
                this.client = axios_1.default.create({ baseURL: `http://${host}:${port}/api/v2/` });
                this.emitter = new events_1.default();
                this.eventSources = new Map();
            }
            getCapabilities() {
                return this.client
                    .get("robot/capabilities")
                    .then((res) => new Set(res.data));
            }
            getInfo() {
                return this.client.get("robot").then((res) => res.data);
            }
            getProperties() {
                return this.client.get("robot/properties").then((res) => {
                    return res.data;
                });
            }
            getStateAttributes() {
                return this.client
                    .get("robot/state/attributes")
                    .then((res) => res.data);
            }
            onStateAttributesUpdated(callback) {
                if (!this.eventSources.has(ValetudoEventKey.StateAttributes)) {
                    const url = new url_1.URL("robot/state/attributes/sse", this.client.defaults.baseURL);
                    const eventSource = new reconnecting_eventsource_1.default(url.href, {
                        max_retry_time: 3000,
                        eventSourceClass: eventsource_1.default,
                    });
                    this.eventSources.set(ValetudoEventKey.StateAttributes, eventSource);
                    eventSource.addEventListener(ValetudoEventKey.StateAttributes, (event) => {
                        this.emitter.emit(ValetudoEventKey.StateAttributes, JSON.parse(event.data));
                    });
                }
                this.emitter.on(ValetudoEventKey.StateAttributes, callback);
            }
            getPresetSelections(capability) {
                return this.client
                    .get(`/robot/capabilities/${capability}/presets`)
                    .then((res) => sortPresets(res.data));
            }
            putPresetSelection(capability, level) {
                return this.client
                    .put(`robot/capabilities/${capability}/preset`, {
                    name: level,
                })
                    .then((res) => res.data);
            }
            getConsumableStates() {
                return this.client
                    .get(`robot/capabilities/${valetudo_1.Capability.ConsumableMonitoring}`)
                    .then((res) => res.data);
            }
            getConsumableProperties() {
                return this.client
                    .get(`robot/capabilities/${valetudo_1.Capability.ConsumableMonitoring}/properties`)
                    .then((res) => res.data);
            }
            putResetConsumable(id) {
                let url = `robot/capabilities/${valetudo_1.Capability.ConsumableMonitoring}/${id.type}}`;
                if (id.subType) {
                    url = `${url}/${id.subType}`;
                }
                return this.client.put(url, { action: "reset" }).then((res) => res.data);
            }
            putBasicControlAction(action) {
                return this.client
                    .put(`robot/capabilities/${valetudo_1.Capability.BasicControl}`, {
                    action,
                })
                    .then((res) => res.data);
            }
            getSpeakerVolume() {
                return this.client
                    .get(`robot/capabilities/${valetudo_1.Capability.SpeakerVolumeControl}`)
                    .then((res) => res.data.volume);
            }
            putSpeakerVolume(volume) {
                return this.client
                    .put(`robot/capabilities/${valetudo_1.Capability.SpeakerVolumeControl}`, {
                    action: "set_volume",
                    value: volume,
                })
                    .then((res) => res.data);
            }
            dispose() {
                this.emitter.removeAllListeners();
                for (const [_, eventSource] of this.eventSources) {
                    eventSource.close();
                }
                this.eventSources.clear();
            }
        },
        (() => {
            _getCapabilities_decorators = [(0, decorators_1.logMethod)()];
            _getInfo_decorators = [(0, decorators_1.logMethod)()];
            _getProperties_decorators = [(0, decorators_1.logMethod)()];
            _getStateAttributes_decorators = [(0, decorators_1.logMethod)()];
            _getPresetSelections_decorators = [(0, decorators_1.logMethod)()];
            _putPresetSelection_decorators = [(0, decorators_1.logMethod)()];
            _getConsumableStates_decorators = [(0, decorators_1.logMethod)()];
            _getConsumableProperties_decorators = [(0, decorators_1.logMethod)()];
            _putResetConsumable_decorators = [(0, decorators_1.logMethod)()];
            _putBasicControlAction_decorators = [(0, decorators_1.logMethod)()];
            _getSpeakerVolume_decorators = [(0, decorators_1.logMethod)()];
            _putSpeakerVolume_decorators = [(0, decorators_1.logMethod)()];
            _dispose_decorators = [(0, decorators_1.logMethod)()];
            __esDecorate(_a, null, _getCapabilities_decorators, { kind: "method", name: "getCapabilities", static: false, private: false, access: { has: obj => "getCapabilities" in obj, get: obj => obj.getCapabilities } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getInfo_decorators, { kind: "method", name: "getInfo", static: false, private: false, access: { has: obj => "getInfo" in obj, get: obj => obj.getInfo } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getProperties_decorators, { kind: "method", name: "getProperties", static: false, private: false, access: { has: obj => "getProperties" in obj, get: obj => obj.getProperties } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getStateAttributes_decorators, { kind: "method", name: "getStateAttributes", static: false, private: false, access: { has: obj => "getStateAttributes" in obj, get: obj => obj.getStateAttributes } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getPresetSelections_decorators, { kind: "method", name: "getPresetSelections", static: false, private: false, access: { has: obj => "getPresetSelections" in obj, get: obj => obj.getPresetSelections } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _putPresetSelection_decorators, { kind: "method", name: "putPresetSelection", static: false, private: false, access: { has: obj => "putPresetSelection" in obj, get: obj => obj.putPresetSelection } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getConsumableStates_decorators, { kind: "method", name: "getConsumableStates", static: false, private: false, access: { has: obj => "getConsumableStates" in obj, get: obj => obj.getConsumableStates } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getConsumableProperties_decorators, { kind: "method", name: "getConsumableProperties", static: false, private: false, access: { has: obj => "getConsumableProperties" in obj, get: obj => obj.getConsumableProperties } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _putResetConsumable_decorators, { kind: "method", name: "putResetConsumable", static: false, private: false, access: { has: obj => "putResetConsumable" in obj, get: obj => obj.putResetConsumable } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _putBasicControlAction_decorators, { kind: "method", name: "putBasicControlAction", static: false, private: false, access: { has: obj => "putBasicControlAction" in obj, get: obj => obj.putBasicControlAction } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getSpeakerVolume_decorators, { kind: "method", name: "getSpeakerVolume", static: false, private: false, access: { has: obj => "getSpeakerVolume" in obj, get: obj => obj.getSpeakerVolume } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _putSpeakerVolume_decorators, { kind: "method", name: "putSpeakerVolume", static: false, private: false, access: { has: obj => "putSpeakerVolume" in obj, get: obj => obj.putSpeakerVolume } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _dispose_decorators, { kind: "method", name: "dispose", static: false, private: false, access: { has: obj => "dispose" in obj, get: obj => obj.dispose } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();
//# sourceMappingURL=valetudoClient.js.map