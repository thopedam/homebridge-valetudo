import { AxiosInstance } from "axios";
import { BasicControlAction, Capability, ConsumableId, ConsumableProperties, ConsumableState, PresetSelectionState, PresetSelectionStateIntensity, PresetSelectionStateMode, RobotAttribute, RobotInformation, RobotProperties } from "./types/valetudo";
import ReconnectingEventSource from "reconnecting-eventsource";
import TypedEmitter from "typed-emitter";
import { Logger } from "homebridge";
type PresetSelectionCapacity = Capability.FanSpeedControl | Capability.WaterUsageControl | Capability.OperationModeControl;
type PresetSelectionValue<T extends PresetSelectionCapacity> = T extends Capability.OperationModeControl ? PresetSelectionStateMode : PresetSelectionStateIntensity;
declare enum ValetudoEventKey {
    StateAttributes = "StateAttributesUpdated"
}
type ValetudoEvent = {
    [ValetudoEventKey.StateAttributes]: (attributes: RobotAttribute[]) => void;
};
export declare class ValetudoClient {
    logger?: Logger;
    client: AxiosInstance;
    emitter: TypedEmitter<ValetudoEvent>;
    eventSources: Map<ValetudoEventKey, ReconnectingEventSource>;
    constructor(host: string, port: number, logger?: Logger);
    getCapabilities(): Promise<Set<Capability>>;
    getInfo(): Promise<RobotInformation>;
    getProperties(): Promise<RobotProperties>;
    getStateAttributes(): Promise<RobotAttribute[]>;
    onStateAttributesUpdated(callback: (attributes: RobotAttribute[]) => void): void;
    getPresetSelections<T extends PresetSelectionCapacity>(capability: T): Promise<PresetSelectionValue<T>[]>;
    putPresetSelection(capability: Capability.FanSpeedControl | Capability.WaterUsageControl | Capability.OperationModeControl, level: PresetSelectionState["value"]): Promise<any>;
    getConsumableStates(): Promise<ConsumableState[]>;
    getConsumableProperties(): Promise<ConsumableProperties>;
    putResetConsumable(id: ConsumableId): Promise<any>;
    putBasicControlAction(action: BasicControlAction): Promise<any>;
    getSpeakerVolume(): Promise<number>;
    putSpeakerVolume(volume: number): Promise<any>;
    dispose(): void;
}
export {};
//# sourceMappingURL=valetudoClient.d.ts.map