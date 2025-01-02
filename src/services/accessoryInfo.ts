import { PlatformAccessory, Service } from "homebridge";
import { cachePromise } from "../decorators";
import { milliseconds } from "../duration";
import { ValetudoTxtKey } from "../types/discovery";
import { HomebridgeContext } from "../types/homebridgeContext";
import { ValetudoClient } from "../valetudoClient";
import { BaseService } from "./base";

export class AccessoryInfoService extends BaseService {
  private readonly info: Service;

  constructor(
    context: HomebridgeContext,
    accessory: PlatformAccessory,
    client: ValetudoClient,
    txt: Record<ValetudoTxtKey, string>
  ) {
    super(context, accessory, client);

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

  @cachePromise(milliseconds({ minutes: 5 }))
  async getFirmwareRevision() {
    const properties = await this.client.getProperties();
    return properties.firmwareVersion;
  }
}
