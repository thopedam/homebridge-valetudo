import {
  API,
  APIEvent,
  DynamicPlatformPlugin,
  Logger,
  PlatformAccessory,
  PlatformConfig,
} from "homebridge";

import { Browser, tcp } from "dnssd";
import { milliseconds } from "./duration";
import { PLATFORM_NAME, PLUGIN_NAME } from "./settings";
import { ValetudoService, ValetudoTxtKey } from "./types/discovery";
import { HomebridgeContext } from "./types/homebridgeContext";
import { ValetudoDevice } from "./valetudoDevice";

/**
 * ValetudoPlatformPlugin
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */
export class ValetudoPlatformPlugin
  implements DynamicPlatformPlugin, HomebridgeContext {
  public readonly service = this.api.hap.Service;
  public readonly characteristic = this.api.hap.Characteristic;

  public readonly initedDevices = new Map<string, ValetudoDevice>();
  public readonly cachedAccessories = new Map<string, PlatformAccessory>();

  constructor(
    public readonly logger: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API
  ) {
    this.logger.debug("Finished initializing platform:", this.config.name);

    // When this event is fired it means Homebridge has restored all cached accessories from disk.
    // Dynamic Platform plugins should only register new accessories after this event was fired,
    // in order to ensure they weren't added to homebridge already. This event can also be used
    // to start discovery of new accessories.
    this.api.on(APIEvent.DID_FINISH_LAUNCHING, () => {
      this.logger.debug("Starting service discovery");
      new Browser<ValetudoTxtKey>(tcp("valetudo"))
        .on("serviceUp", this.handleServiceUp.bind(this))
        .start();

      // Remove all cached devices accessories that's not found after 5 minutes.
      setTimeout(() => {
        for (const [uuid, accessory] of this.cachedAccessories) {
          if (!this.initedDevices.has(uuid)) {
            this.logger.info(
              "Removing existing accessory from cache:",
              accessory.displayName
            );
            this.cachedAccessories.delete(uuid);
            this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [
              accessory,
            ]);
          }
        }
      }, milliseconds({ minutes: 5 }));
    });
  }

  /**
   * This function is invoked when homebridge restores cached accessories from disk at startup.
   * It should be used to setup event handlers for characteristics and update respective values.
   */
  configureAccessory(accessory: PlatformAccessory) {
    this.logger.info(
      "Loading accessory from cache:",
      accessory.displayName,
      accessory.UUID
    );
    // add the restored accessory to the accessories cache so we can track if it has already been registered
    this.cachedAccessories.set(accessory.UUID, accessory);
  }

  private handleServiceUp(service: ValetudoService) {
    let name = service.txt.id;
    if (this.config['displayName']) {
      name = `${this.config['displayName']}`;
    }
    const uuid = this.api.hap.uuid.generate(name);
    const cachedAccessory = this.cachedAccessories.get(uuid);
    if (cachedAccessory) {
      this.logger.info(
        "Restoring cached accessory:",
        cachedAccessory.displayName
      );
      const device = new ValetudoDevice(this, cachedAccessory, service);
      device.init();
      this.initedDevices.set(uuid, device);
    } else {
      // the accessory does not yet exist, so we need to create it
      this.logger.info("Adding new accessory:", name);
      const accessory = new this.api.platformAccessory(name, uuid);
      const device = new ValetudoDevice(this, accessory, service);
      device.init();
      this.initedDevices.set(uuid, device);

      this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [
        accessory,
      ]);
    }
  }
}
