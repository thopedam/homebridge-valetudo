"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValetudoPlatformPlugin = void 0;
const dnssd_1 = require("dnssd");
const duration_1 = require("./duration");
const settings_1 = require("./settings");
const valetudoDevice_1 = require("./valetudoDevice");
/**
 * ValetudoPlatformPlugin
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
class ValetudoPlatformPlugin {
    constructor(logger, config, api) {
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: logger
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: config
        });
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: api
        });
        Object.defineProperty(this, "service", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.api.hap.Service
        });
        Object.defineProperty(this, "characteristic", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.api.hap.Characteristic
        });
        Object.defineProperty(this, "initedDevices", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "cachedAccessories", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        this.logger.debug("Finished initializing platform:", this.config.name);
        // When this event is fired it means Homebridge has restored all cached accessories from disk.
        // Dynamic Platform plugins should only register new accessories after this event was fired,
        // in order to ensure they weren't added to homebridge already. This event can also be used
        // to start discovery of new accessories.
        this.api.on("didFinishLaunching" /* APIEvent.DID_FINISH_LAUNCHING */, () => {
            this.logger.debug("Starting service discovery");
            new dnssd_1.Browser((0, dnssd_1.tcp)("valetudo"))
                .on("serviceUp", this.handleServiceUp.bind(this))
                .start();
            // Remove all cached devices accessories that's not found after 5 minutes.
            setTimeout(() => {
                for (const [uuid, accessory] of this.cachedAccessories) {
                    if (!this.initedDevices.has(uuid)) {
                        this.logger.info("Removing existing accessory from cache:", accessory.displayName);
                        this.cachedAccessories.delete(uuid);
                        this.api.unregisterPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [
                            accessory,
                        ]);
                    }
                }
            }, (0, duration_1.milliseconds)({ minutes: 5 }));
        });
    }
    /**
     * This function is invoked when homebridge restores cached accessories from disk at startup.
     * It should be used to setup event handlers for characteristics and update respective values.
     */
    configureAccessory(accessory) {
        this.logger.info("Loading accessory from cache:", accessory.displayName, accessory.UUID);
        // add the restored accessory to the accessories cache so we can track if it has already been registered
        this.cachedAccessories.set(accessory.UUID, accessory);
    }
    handleServiceUp(service) {
        let name = service.txt.id;
        if (this.config['displayName']) {
            name = `${this.config['displayName']}`;
        }
        const uuid = this.api.hap.uuid.generate(name);
        const cachedAccessory = this.cachedAccessories.get(uuid);
        if (cachedAccessory) {
            this.logger.info("Restoring cached accessory:", cachedAccessory.displayName);
            const device = new valetudoDevice_1.ValetudoDevice(this, cachedAccessory, service);
            device.init();
            this.initedDevices.set(uuid, device);
        }
        else {
            // the accessory does not yet exist, so we need to create it
            this.logger.info("Adding new accessory:", name);
            const accessory = new this.api.platformAccessory(name, uuid);
            const device = new valetudoDevice_1.ValetudoDevice(this, accessory, service);
            device.init();
            this.initedDevices.set(uuid, device);
            this.api.registerPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [
                accessory,
            ]);
        }
    }
}
exports.ValetudoPlatformPlugin = ValetudoPlatformPlugin;
//# sourceMappingURL=platform.js.map