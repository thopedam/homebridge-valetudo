"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValetudoDevice = void 0;
const valetudo_1 = require("./types/valetudo");
const accessoryInfo_1 = require("./services/accessoryInfo");
const battery_1 = require("./services/battery");
const speakerVolume_1 = require("./services/speakerVolume");
const fan_1 = require("./services/fan");
const valetudoClient_1 = require("./valetudoClient");
const consumable_1 = require("./services/consumable");
/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
class ValetudoDevice {
    constructor(context, accessory, dnsService) {
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: context
        });
        Object.defineProperty(this, "accessory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: accessory
        });
        Object.defineProperty(this, "dnsService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dnsService
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "services", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = new valetudoClient_1.ValetudoClient(dnsService.addresses[0], dnsService.port, context.logger);
        this.services = [];
    }
    async init() {
        const [attributes, capabilities] = await Promise.all([
            this.client.getStateAttributes(),
            this.client.getCapabilities(),
        ]);
        this.services.push(new accessoryInfo_1.AccessoryInfoService(this.context, this.accessory, this.client, this.dnsService.txt));
        this.services.push(new battery_1.BatteryService(this.context, this.accessory, this.client, attributes));
        if (capabilities.has(valetudo_1.Capability.BasicControl) &&
            capabilities.has(valetudo_1.Capability.FanSpeedControl)) {
            const fanPresets = await this.client.getPresetSelections(valetudo_1.Capability.FanSpeedControl);
            this.services.push(new fan_1.FanService(this.context, this.accessory, this.client, attributes, fanPresets));
        }
        if (capabilities.has(valetudo_1.Capability.SpeakerVolumeControl)) {
            this.services.push(new speakerVolume_1.SpeakerVolumeService(this.context, this.accessory, this.client));
        }
        if (capabilities.has(valetudo_1.Capability.ConsumableMonitoring)) {
            const properties = await this.client.getConsumableProperties();
            this.services.push(new consumable_1.ConsumableService(this.context, this.accessory, this.client, properties));
        }
    }
    dispose() {
        for (const service of this.services) {
            service.dispose();
        }
        this.client.dispose();
    }
}
exports.ValetudoDevice = ValetudoDevice;
//# sourceMappingURL=valetudoDevice.js.map