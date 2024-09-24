import { PlatformAccessory } from "homebridge";
import { ValetudoClient } from "../valetudoClient";
import { BaseService } from "./base";
import { HomebridgeContext } from "../types/homebridgeContext";
export declare class SpeakerVolumeService extends BaseService {
    private readonly volume;
    constructor(context: HomebridgeContext, accessory: PlatformAccessory, client: ValetudoClient);
    private getVolume;
    private getMute;
    private setMute;
    private setVolume;
}
//# sourceMappingURL=speakerVolume.d.ts.map