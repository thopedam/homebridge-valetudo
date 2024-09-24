import { Characteristic, PlatformAccessory, Service, WithUUID } from "homebridge";
import { ValetudoClient } from "../valetudoClient";
import { HomebridgeContext } from "../types/homebridgeContext";
export declare abstract class BaseService {
    protected readonly context: HomebridgeContext;
    protected readonly accessory: PlatformAccessory;
    protected readonly client: ValetudoClient;
    protected characteristics: Characteristic[];
    protected constructor(context: HomebridgeContext, accessory: PlatformAccessory, client: ValetudoClient);
    get service(): typeof Service;
    get characteristic(): typeof Characteristic;
    get logger(): import("homebridge").Logger;
    protected getOrAddService(service: WithUUID<typeof Service>): Service;
    protected getOrAddNamedService(service: WithUUID<typeof Service>, name: string, subType: string): Service;
    dispose(): void;
}
//# sourceMappingURL=base.d.ts.map