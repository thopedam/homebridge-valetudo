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
exports.SpeakerVolumeService = void 0;
const base_1 = require("./base");
const decorators_1 = require("../decorators");
const duration_1 = require("../duration");
// Require SpeakerVolumeControlCapability
exports.SpeakerVolumeService = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _getVolume_decorators;
    return _a = class SpeakerVolumeService extends base_1.BaseService {
            constructor(context, accessory, client) {
                super(context, accessory, client);
                Object.defineProperty(this, "volume", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _instanceExtraInitializers), void 0)
                });
                this.volume = this.getOrAddService(this.service.Speaker);
                this.characteristics = [
                    this.volume
                        .getCharacteristic(this.characteristic.Mute)
                        .onGet(this.getMute.bind(this))
                        .onSet(this.setMute.bind(this)),
                    this.volume
                        .getCharacteristic(this.characteristic.Volume)
                        .onGet(this.getVolume.bind(this))
                        .onSet(this.setVolume.bind(this)),
                ];
            }
            getVolume() {
                return this.client.getSpeakerVolume();
            }
            async getMute() {
                const volume = await this.getVolume();
                return volume === 0;
            }
            async setMute(value) {
                const isMuted = value;
                await this.client.putSpeakerVolume(isMuted ? 0 : 100);
            }
            async setVolume(value) {
                const volume = value;
                await this.client.putSpeakerVolume(volume);
            }
        },
        (() => {
            _getVolume_decorators = [(0, decorators_1.cachePromise)((0, duration_1.milliseconds)({ seconds: 0.5 }))];
            __esDecorate(_a, null, _getVolume_decorators, { kind: "method", name: "getVolume", static: false, private: false, access: { has: obj => "getVolume" in obj, get: obj => obj.getVolume } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();
//# sourceMappingURL=speakerVolume.js.map