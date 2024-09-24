import { PlatformAccessory } from "homebridge";
import { ValetudoService } from "./types/discovery";
import { HomebridgeContext } from "./types/homebridgeContext";
/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export declare class ValetudoDevice {
    private readonly context;
    readonly accessory: PlatformAccessory;
    private readonly dnsService;
    private readonly client;
    private readonly services;
    constructor(context: HomebridgeContext, accessory: PlatformAccessory, dnsService: ValetudoService);
    init(): Promise<void>;
    dispose(): void;
}
//# sourceMappingURL=valetudoDevice.d.ts.map