import { PlatformAccessory } from "homebridge";
import { ValetudoClient } from "../valetudoClient";
import { RobotAttribute } from "../types/valetudo";
import { BaseService } from "./base";
import { HomebridgeContext } from "../types/homebridgeContext";
export declare class BatteryService extends BaseService {
    private readonly battery;
    private state;
    constructor(context: HomebridgeContext, accessory: PlatformAccessory, client: ValetudoClient, attributes: RobotAttribute[]);
    private handleAttributeUpdate;
    private getBatteryLevel;
    private getChargingState;
    private getStatusLowBattery;
}
//# sourceMappingURL=battery.d.ts.map