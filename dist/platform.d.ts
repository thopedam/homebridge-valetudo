import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig } from "homebridge";
import { HomebridgeContext } from "./types/homebridgeContext";
import { ValetudoDevice } from "./valetudoDevice";
/**
 * ValetudoPlatformPlugin
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
export declare class ValetudoPlatformPlugin implements DynamicPlatformPlugin, HomebridgeContext {
    readonly logger: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    readonly service: typeof import("homebridge").Service;
    readonly characteristic: typeof import("homebridge").Characteristic;
    readonly initedDevices: Map<string, ValetudoDevice>;
    readonly cachedAccessories: Map<string, PlatformAccessory<import("homebridge").UnknownContext>>;
    constructor(logger: Logger, config: PlatformConfig, api: API);
    /**
     * This function is invoked when homebridge restores cached accessories from disk at startup.
     * It should be used to setup event handlers for characteristics and update respective values.
     */
    configureAccessory(accessory: PlatformAccessory): void;
    private handleServiceUp;
}
//# sourceMappingURL=platform.d.ts.map