import { PlatformAccessory } from "homebridge";
import { ValetudoTxtKey } from "../types/discovery";
import { HomebridgeContext } from "../types/homebridgeContext";
import { ValetudoClient } from "../valetudoClient";
import { BaseService } from "./base";
export declare class AccessoryInfoService extends BaseService {
    private readonly info;
    constructor(context: HomebridgeContext, accessory: PlatformAccessory, client: ValetudoClient, txt: Record<ValetudoTxtKey, string>);
    getFirmwareRevision(): Promise<string>;
}
//# sourceMappingURL=accessoryInfo.d.ts.map