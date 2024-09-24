export interface RawMapData {
    metaData: RawMapDataMetaData;
    size: {
        x: number;
        y: number;
    };
    pixelSize: number;
    layers: RawMapLayer[];
    entities: RawMapEntity[];
}
export interface RawMapEntity {
    metaData: RawMapEntityMetaData;
    points: number[];
    type: RawMapEntityType;
}
export interface RawMapEntityMetaData {
    angle?: number;
    label?: string;
}
export interface RawMapLayer {
    metaData: RawMapLayerMetaData;
    type: RawMapLayerType;
    pixels: number[];
    compressedPixels?: number[];
    dimensions: {
        x: RawMapLayerDimension;
        y: RawMapLayerDimension;
        pixelCount: number;
    };
}
export interface RawMapLayerDimension {
    min: number;
    max: number;
    mid: number;
    avg: number;
}
export interface RawMapLayerMetaData {
    area: number;
    segmentId?: string;
    name?: string;
    active?: boolean;
}
export declare enum RawMapLayerType {
    Floor = "floor",
    Segment = "segment",
    Wall = "wall"
}
export declare enum RawMapEntityType {
    ChargerLocation = "charger_location",
    RobotPosition = "robot_position",
    GoToTarget = "go_to_target",
    Obstacle = "obstacle",
    Path = "path",
    PredictedPath = "predicted_path",
    VirtualWall = "virtual_wall",
    NoGoArea = "no_go_area",
    NoMopArea = "no_mop_area",
    ActiveZone = "active_zone"
}
export interface RawMapDataMetaData {
    version: number;
    nonce: string;
}
export interface RawRobotState {
    metaData: RawRobotStateMetaData;
    attributes: RobotAttribute[];
    map: RawMapData;
}
export interface RawRobotStateMetaData {
    version: number;
}
export declare enum RobotAttributeClass {
    StatusState = "StatusStateAttribute",
    BatteryState = "BatteryStateAttribute",
    PresetSelectionState = "PresetSelectionStateAttribute",
    AttachmentState = "AttachmentStateAttribute",
    DockStatusState = "DockStatusStateAttribute"
}
export declare enum RobotStatus {
    Error = "error",
    Docked = "docked",
    Idle = "idle",
    Returning = "returning",
    Cleaning = "cleaning",
    Paused = "paused",
    ManualControl = "manual_control",
    Moving = "moving"
}
export declare enum CleaningFlag {
    None = "none",
    Zone = "zone",
    Segment = "segment",
    Spot = "spot",
    Target = "target",
    Resumable = "resumable"
}
export interface StatusState {
    __class: RobotAttributeClass.StatusState;
    metaData: Record<string, never>;
    value: RobotStatus;
    flag: CleaningFlag;
}
export declare enum BatteryStateFlag {
    None = "none",
    Charged = "charged",
    Charging = "charging",
    Discharging = "discharging"
}
export interface BatteryState {
    __class: RobotAttributeClass.BatteryState;
    metaData: Record<string, never>;
    level: number;
    flag: BatteryStateFlag;
}
export declare enum PresetSelectionType {
    FanSpeed = "fan_speed",
    WaterGrade = "water_grade",
    OperationMode = "operation_mode"
}
export declare enum PresetSelectionStateIntensity {
    Off = "off",
    Min = "min",
    Low = "low",
    Medium = "medium",
    High = "high",
    Turbo = "turbo",
    Max = "max"
}
export declare enum PresetSelectionStateMode {
    Custom = "custom",
    Vacuum = "vacuum",
    Mop = "mop",
    VacuumAndMop = "vacuum_and_mop"
}
export interface PresetSelectionState {
    __class: RobotAttributeClass.PresetSelectionState;
    metaData: Record<string, never>;
    type: PresetSelectionType;
    value: PresetSelectionStateIntensity | PresetSelectionStateMode;
    customValue?: number;
}
export declare enum AttachmentStateAttributeType {
    Dustbin = "dustbin",
    Watertank = "watertank",
    Mop = "mop"
}
export interface AttachmentState {
    __class: RobotAttributeClass.AttachmentState;
    type: AttachmentStateAttributeType;
    attached: boolean;
}
export interface DockStatusState {
    __class: RobotAttributeClass.DockStatusState;
    metaData: Record<string, never>;
    value: "error" | "idle" | "pause" | "emptying" | "cleaning" | "drying";
}
export type RobotAttribute = StatusState | BatteryState | PresetSelectionState | AttachmentState | DockStatusState;
export declare enum Capability {
    AutoEmptyDockAutoEmptyControl = "AutoEmptyDockAutoEmptyControlCapability",
    AutoEmptyDockManualTrigger = "AutoEmptyDockManualTriggerCapability",
    BasicControl = "BasicControlCapability",
    CarpetModeControl = "CarpetModeControlCapability",
    CombinedVirtualRestrictions = "CombinedVirtualRestrictionsCapability",
    ConsumableMonitoring = "ConsumableMonitoringCapability",
    CurrentStatistics = "CurrentStatisticsCapability",
    DoNotDisturb = "DoNotDisturbCapability",
    FanSpeedControl = "FanSpeedControlCapability",
    GoToLocation = "GoToLocationCapability",
    KeyLock = "KeyLockCapability",
    Locate = "LocateCapability",
    ManualControl = "ManualControlCapability",
    MapReset = "MapResetCapability",
    MapSegmentEdit = "MapSegmentEditCapability",
    MapSegmentRename = "MapSegmentRenameCapability",
    MapSegmentation = "MapSegmentationCapability",
    MapSnapshot = "MapSnapshotCapability",
    MappingPass = "MappingPassCapability",
    MopDockCleanManualTrigger = "MopDockCleanManualTriggerCapability",
    MopDockDryManualTrigger = "MopDockDryManualTriggerCapability",
    OperationModeControl = "OperationModeControlCapability",
    PersistentMapControl = "PersistentMapControlCapability",
    SpeakerTest = "SpeakerTestCapability",
    SpeakerVolumeControl = "SpeakerVolumeControlCapability",
    TotalStatistics = "TotalStatisticsCapability",
    VoicePackManagement = "VoicePackManagementCapability",
    WaterUsageControl = "WaterUsageControlCapability",
    WifiConfiguration = "WifiConfigurationCapability",
    WifiScan = "WifiScanCapability",
    ZoneCleaning = "ZoneCleaningCapability",
    Quirks = "QuirksCapability"
}
export type Point = {
    x: number;
    y: number;
};
export interface Zone {
    points: {
        pA: Point;
        pB: Point;
        pC: Point;
        pD: Point;
    };
}
export interface ZoneActionRequestParameters {
    zones: Zone[];
    iterations?: number;
}
export interface ZoneProperties {
    zoneCount: {
        min: number;
        max: number;
    };
    iterationCount: {
        min: number;
        max: number;
    };
}
export interface MapSegmentationProperties {
    iterationCount: {
        min: number;
        max: number;
    };
    customOrderSupport: boolean;
}
export interface Segment {
    id: string;
    name?: string;
}
export interface RobotInformation {
    manufacturer: string;
    modelName: string;
    modelDetails: {
        supportedAttachments: Array<AttachmentStateAttributeType>;
    };
    implementation: string;
}
export interface ValetudoInformation {
    embedded: boolean;
    systemId: string;
    welcomeDialogDismissed: boolean;
}
export interface ValetudoVersion {
    release: string;
    commit: string;
}
export interface SystemHostInfo {
    hostname: string;
    arch: string;
    mem: {
        total: number;
        free: number;
        valetudo_current: number;
        valetudo_max: number;
    };
    uptime: number;
    load: {
        1: number;
        5: number;
        15: number;
    };
}
export interface SystemRuntimeInfo {
    uptime: number;
    argv: Array<string>;
    execArgv: Array<string>;
    execPath: string;
    uid: number;
    gid: number;
    pid: number;
    versions: Record<string, string>;
    env: Record<string, string>;
}
export interface MapSegmentationActionRequestParameters {
    segment_ids: string[];
    iterations?: number;
    customOrder?: boolean;
}
export interface MapSegmentEditJoinRequestParameters {
    segment_a_id: string;
    segment_b_id: string;
}
export interface MapSegmentEditSplitRequestParameters {
    segment_id: string;
    pA: Point;
    pB: Point;
}
export interface MapSegmentRenameRequestParameters {
    segment_id: string;
    name: string;
}
export declare enum ConsumableType {
    Filter = "filter",
    Brush = "brush",
    Sensor = "sensor",
    Mop = "mop",
    Detergent = "detergent",
    Bin = "bin"
}
export declare enum ConsumableSubType {
    None = "none",
    All = "all",
    Main = "main",
    Secondary = "secondary",
    Left = "side_left",
    Right = "side_right",
    Dock = "dock"
}
export declare enum ConsumableUnit {
    Minutes = "minutes",
    Percent = "percent"
}
export interface ConsumableState {
    type: ConsumableType;
    subType?: ConsumableSubType;
    remaining: {
        value: number;
        unit: ConsumableUnit;
    };
}
export interface ConsumableId {
    type: ConsumableType;
    subType?: ConsumableSubType;
}
export interface ConsumableMeta {
    type: ConsumableType;
    subType: ConsumableSubType;
    unit: ConsumableUnit;
    maxValue?: number;
}
export interface ConsumableProperties {
    availableConsumables: Array<ConsumableMeta>;
}
export interface Timer {
    id: string;
    enabled: boolean;
    dow: Array<number>;
    hour: number;
    minute: number;
    action: {
        type: string;
        params: Record<string, unknown>;
    };
}
export interface TimerInformation {
    [id: string]: Timer;
}
export interface TimerProperties {
    supportedActions: Array<string>;
}
export interface MQTTConfiguration {
    enabled: boolean;
    connection: {
        host: string;
        port: number;
        tls: {
            enabled: boolean;
            ca: string;
            ignoreCertificateErrors: boolean;
        };
        authentication: {
            credentials: {
                enabled: boolean;
                username: string;
                password: string;
            };
            clientCertificate: {
                enabled: boolean;
                certificate: string;
                key: string;
            };
        };
    };
    identity: {
        identifier: string;
    };
    customizations: {
        topicPrefix: string;
        provideMapData: boolean;
    };
    interfaces: {
        homie: {
            enabled: boolean;
            addICBINVMapProperty: boolean;
            cleanAttributesOnShutdown: boolean;
        };
        homeassistant: {
            enabled: boolean;
            cleanAutoconfOnShutdown: boolean;
        };
    };
    optionalExposedCapabilities: Array<string>;
}
export interface MQTTStatus {
    state: "init" | "ready" | "disconnected" | "lost" | "alert";
    stats: {
        messages: {
            count: {
                received: number;
                sent: number;
            };
            bytes: {
                received: number;
                sent: number;
            };
        };
        connection: {
            connects: number;
            disconnects: number;
            reconnects: number;
            errors: number;
        };
    };
}
export interface MQTTProperties {
    defaults: {
        identity: {
            identifier: string;
        };
        customizations: {
            topicPrefix: string;
        };
    };
    optionalExposableCapabilities: Array<string>;
}
export interface HTTPBasicAuthConfiguration {
    enabled: boolean;
    username: string;
    password: string;
}
export interface NetworkAdvertisementConfiguration {
    enabled: boolean;
}
export interface NetworkAdvertisementProperties {
    port: number;
    zeroconfHostname: string;
}
export interface NTPClientState {
    __class: "ValetudoNTPClientDisabledState" | "ValetudoNTPClientEnabledState" | "ValetudoNTPClientErrorState" | "ValetudoNTPClientSyncedState";
    timestamp: string;
    type?: "unknown" | "transient" | "name_resolution" | "connection" | "persisting";
    message?: string;
    offset?: number;
}
export interface NTPClientConfiguration {
    enabled: boolean;
    server: string;
    port: number;
    interval: number;
    timeout: number;
}
export interface ValetudoEvent {
    __class: string;
    id: string;
    timestamp: string;
    processed: boolean;
    type?: string;
    subType?: string;
    message?: string;
}
export interface ValetudoEventInteraction {
    interaction: "ok" | "yes" | "no" | "reset";
}
export interface ValetudoEventInteractionContext {
    id: string;
    interaction: ValetudoEventInteraction;
}
export declare enum LogLevel {
    trace = "trace",
    debug = "debug",
    info = "info",
    warn = "warn",
    error = "error"
}
export interface LogLevelResponse {
    current: string;
    presets: Array<LogLevel>;
}
export interface SetLogLevelRequest {
    level: LogLevel;
}
export interface LogLine {
    timestamp: Date;
    level: LogLevel;
    content: string;
}
export interface SimpleToggleState {
    enabled: boolean;
}
export interface SpeakerVolumeState {
    volume: number;
}
export interface VoicePackManagementStatus {
    currentLanguage: string;
    operationStatus: {
        type: "idle" | "downloading" | "installing" | "error";
        progress?: number;
    };
}
export interface VoicePackManagementCommand {
    action: "download";
    url: string;
    language: string;
    hash: string;
}
export interface DoNotDisturbTime {
    hour: number;
    minute: number;
}
export interface DoNotDisturbConfiguration {
    enabled: boolean;
    start: DoNotDisturbTime;
    end: DoNotDisturbTime;
}
export interface WifiConfiguration {
    ssid: string;
    credentials: {
        type: "wpa2_psk";
        typeSpecificSettings: {
            password: string;
        };
    };
}
export interface WifiStatus {
    state: "connected" | "not_connected" | "unknown";
    details: {
        ssid?: string;
        downspeed?: number;
        upspeed?: number;
        signal?: number;
        ips?: string[];
        frequency?: "2.4ghz" | "5ghz";
    };
}
export interface WifiConfigurationProperties {
    provisionedReconfigurationSupported: boolean;
}
export interface ValetudoWifiNetwork {
    bssid: string;
    details: {
        ssid?: string;
        signal?: number;
    };
}
export declare enum BasicControlAction {
    Start = "start",
    Stop = "stop",
    Pause = "pause",
    Home = "home"
}
export type ManualControlAction = "enable" | "disable" | "move";
export type ManualControlCommand = "forward" | "backward" | "rotate_clockwise" | "rotate_counterclockwise";
export interface ManualControlProperties {
    supportedMovementCommands: Array<ManualControlCommand>;
}
export interface ManualControlInteraction {
    action: ManualControlAction;
    movementCommand?: ManualControlCommand;
}
export declare enum ValetudoRestrictedZoneType {
    Regular = "regular",
    Mop = "mop"
}
export interface ValetudoRestrictedZone {
    type: ValetudoRestrictedZoneType;
    points: {
        pA: Point;
        pB: Point;
        pC: Point;
        pD: Point;
    };
}
export interface CombinedVirtualRestrictionsUpdateRequestParameters {
    virtualWalls: Array<{
        points: {
            pA: Point;
            pB: Point;
        };
    }>;
    restrictedZones: Array<ValetudoRestrictedZone>;
}
export interface CombinedVirtualRestrictionsProperties {
    supportedRestrictedZoneTypes: Array<ValetudoRestrictedZoneType>;
}
export interface UpdaterConfiguration {
    updateProvider: "github" | "github_nightly";
}
export interface UpdaterStateMetaData {
    progress: number | undefined;
}
export interface UpdaterState {
    __class: "ValetudoUpdaterIdleState" | "ValetudoUpdaterErrorState" | "ValetudoUpdaterApprovalPendingState" | "ValetudoUpdaterDownloadingState" | "ValetudoUpdaterApplyPendingState" | "ValetudoUpdaterDisabledState" | "ValetudoUpdaterNoUpdateRequiredState";
    timestamp: string;
    metaData: UpdaterStateMetaData;
    busy: boolean;
    type?: "unknown" | "not_embedded" | "not_docked" | "not_writable" | "not_enough_space" | "download_failed" | "no_matching_binary" | "missing_manifest" | "invalid_manifest" | "invalid_checksum";
    message?: string;
    currentVersion?: string;
    version?: string;
    releaseTimestamp?: string;
    changelog?: string;
    downloadUrl?: string;
    expectedHash?: string;
    downloadPath?: string;
}
export type ValetudoDataPointType = "count" | "time" | "area";
export interface ValetudoDataPoint {
    timestamp: string;
    type: ValetudoDataPointType;
    value: number;
}
export interface StatisticsProperties {
    availableStatistics: Array<ValetudoDataPointType>;
}
export interface Quirk {
    id: string;
    options: Array<string>;
    title: string;
    description: string;
    value: string;
}
export interface SetQuirkValueCommand {
    id: string;
    value: string;
}
export interface RobotProperties {
    firmwareVersion: string;
}
export interface ValetudoCustomizations {
    friendlyName: string;
}
export declare const isAttribute: <C extends RobotAttributeClass>(clazz: C) => (attribute: RobotAttribute) => attribute is Extract<StatusState, {
    __class: C;
}> | Extract<BatteryState, {
    __class: C;
}> | Extract<PresetSelectionState, {
    __class: C;
}> | Extract<AttachmentState, {
    __class: C;
}> | Extract<DockStatusState, {
    __class: C;
}>;
//# sourceMappingURL=valetudo.d.ts.map