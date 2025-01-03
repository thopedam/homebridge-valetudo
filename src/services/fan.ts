import {
  CharacteristicValue,
  LogLevel,
  PlatformAccessory,
  Service,
} from "homebridge";
import { logMethod } from "../decorators";
import { HomebridgeContext } from "../types/homebridgeContext";
import {
  BasicControlAction,
  Capability,
  PresetSelectionState,
  PresetSelectionStateIntensity,
  PresetSelectionType,
  RobotAttribute,
  RobotAttributeClass,
  RobotStatus,
  StatusState,
  isAttribute,
} from "../types/valetudo";
import { ValetudoClient } from "../valetudoClient";
import { BaseService } from "./base";

function getStatus(attributes: RobotAttribute[]) {
  const status = attributes.find(isAttribute(RobotAttributeClass.StatusState));
  if (!status) {
    throw new Error("No status found in robot attribute");
  }
  return status;
}

function getFanPresetSelection(attributes: RobotAttribute[]) {
  const selection = attributes
    .filter(isAttribute(RobotAttributeClass.PresetSelectionState))
    .find((a) => a.type === PresetSelectionType.FanSpeed);
  if (!selection) {
    throw new Error("No fan speed selection found in robot attribute");
  }
  return selection;
}

// Requires BasicControlCapability and FanSpeedControlCapability
export class FanService extends BaseService {
  private readonly fan: Service;

  private status: StatusState;
  private fanPresetSelection: PresetSelectionState;

  constructor(
    platform: HomebridgeContext,
    accessory: PlatformAccessory,
    client: ValetudoClient,
    attributes: RobotAttribute[],
    private readonly fanPresets: PresetSelectionStateIntensity[]
  ) {
    super(platform, accessory, client);

    this.status = getStatus(attributes);
    this.fanPresetSelection = getFanPresetSelection(attributes);

    this.fan = this.getOrAddNamedService(
      this.service.Fanv2,
      "Vacuum",
      "Vacuum"
    );

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

  @logMethod({ level: LogLevel.DEBUG, skipArgs: true, skipResult: true })
  private handleAttributeUpdate(attribute: RobotAttribute[]) {
    this.status = getStatus(attribute);
    this.fanPresetSelection = getFanPresetSelection(attribute);

    this.fan
      .getCharacteristic(this.characteristic.Active)
      .updateValue(this.getActive());
    this.fan
      .getCharacteristic(this.characteristic.RotationSpeed)
      .updateValue(this.getRotationSpeed());
  }

  private getActive() {
    return [
      RobotStatus.Returning,
      RobotStatus.Cleaning,
      RobotStatus.ManualControl,
      RobotStatus.Moving,
    ].includes(this.status.value)
      ? this.characteristic.Active.ACTIVE
      : this.characteristic.Active.INACTIVE;
  }

  private async setActive(value: CharacteristicValue) {
    const active = value as boolean;
    await this.client.putBasicControlAction(
      active ? BasicControlAction.Start : BasicControlAction.Home
    );
  }

  private getRotationSpeed() {
    const index = this.fanPresets.indexOf(
      this.fanPresetSelection.value as PresetSelectionStateIntensity
    );
    if (index === -1) {
      return null;
    }

    return (index / (this.fanPresets.length - 1)) * 100;
  }

  private async setRotationSpeed(value: CharacteristicValue) {
    const speed = value as number;
    const index = Math.floor((speed / 100) * (this.fanPresets.length - 1));
    const preset = this.fanPresets[index];
    await this.client.putPresetSelection(Capability.FanSpeedControl, preset);
  }
}
