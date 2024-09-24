import { PlatformAccessory } from "homebridge";
import { ValetudoClient } from "../valetudoClient";
import { ConsumableProperties } from "../types/valetudo";
import { BaseService } from "./base";
import { HomebridgeContext } from "../types/homebridgeContext";
export declare class ConsumableService extends BaseService {
    constructor(context: HomebridgeContext, accessory: PlatformAccessory, client: ValetudoClient, properties: ConsumableProperties);
    private getConsumableStates;
    private getConsumableStateByMeta;
    private getFilterChangeIndication;
    private getFilterLifeLevel;
    private resetFilterIndication;
}
//# sourceMappingURL=consumable.d.ts.map