import { PlatformAccessory } from "homebridge";
import { BaseService } from "./base";
import { ValetudoClient } from "../valetudoClient";
import { PresetSelectionStateIntensity, RobotAttribute } from "../types/valetudo";
import { HomebridgeContext } from "../types/homebridgeContext";
export declare class FanService extends BaseService {
    private readonly fanPresets;
    private readonly fan;
    private status;
    private fanPresetSelection;
    constructor(platform: HomebridgeContext, accessory: PlatformAccessory, client: ValetudoClient, attributes: RobotAttribute[], fanPresets: PresetSelectionStateIntensity[]);
    private handleAttributeUpdate;
    private getActive;
    private setActive;
    private getRotationSpeed;
    private setRotationSpeed;
}
//# sourceMappingURL=fan.d.ts.map