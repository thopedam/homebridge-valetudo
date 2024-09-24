import { API, Characteristic, Logger, PlatformConfig, Service } from "homebridge";
export interface HomebridgeContext {
    readonly logger: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    readonly service: typeof Service;
    readonly characteristic: typeof Characteristic;
}
//# sourceMappingURL=homebridgeContext.d.ts.map