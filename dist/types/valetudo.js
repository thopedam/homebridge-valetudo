"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAttribute = exports.ValetudoRestrictedZoneType = exports.BasicControlAction = exports.LogLevel = exports.ConsumableUnit = exports.ConsumableSubType = exports.ConsumableType = exports.Capability = exports.AttachmentStateAttributeType = exports.PresetSelectionStateMode = exports.PresetSelectionStateIntensity = exports.PresetSelectionType = exports.BatteryStateFlag = exports.CleaningFlag = exports.RobotStatus = exports.RobotAttributeClass = exports.RawMapEntityType = exports.RawMapLayerType = void 0;
var RawMapLayerType;
(function (RawMapLayerType) {
    RawMapLayerType["Floor"] = "floor";
    RawMapLayerType["Segment"] = "segment";
    RawMapLayerType["Wall"] = "wall";
})(RawMapLayerType = exports.RawMapLayerType || (exports.RawMapLayerType = {}));
var RawMapEntityType;
(function (RawMapEntityType) {
    RawMapEntityType["ChargerLocation"] = "charger_location";
    RawMapEntityType["RobotPosition"] = "robot_position";
    RawMapEntityType["GoToTarget"] = "go_to_target";
    RawMapEntityType["Obstacle"] = "obstacle";
    RawMapEntityType["Path"] = "path";
    RawMapEntityType["PredictedPath"] = "predicted_path";
    RawMapEntityType["VirtualWall"] = "virtual_wall";
    RawMapEntityType["NoGoArea"] = "no_go_area";
    RawMapEntityType["NoMopArea"] = "no_mop_area";
    RawMapEntityType["ActiveZone"] = "active_zone";
})(RawMapEntityType = exports.RawMapEntityType || (exports.RawMapEntityType = {}));
var RobotAttributeClass;
(function (RobotAttributeClass) {
    RobotAttributeClass["StatusState"] = "StatusStateAttribute";
    RobotAttributeClass["BatteryState"] = "BatteryStateAttribute";
    RobotAttributeClass["PresetSelectionState"] = "PresetSelectionStateAttribute";
    RobotAttributeClass["AttachmentState"] = "AttachmentStateAttribute";
    RobotAttributeClass["DockStatusState"] = "DockStatusStateAttribute";
})(RobotAttributeClass = exports.RobotAttributeClass || (exports.RobotAttributeClass = {}));
var RobotStatus;
(function (RobotStatus) {
    RobotStatus["Error"] = "error";
    RobotStatus["Docked"] = "docked";
    RobotStatus["Idle"] = "idle";
    RobotStatus["Returning"] = "returning";
    RobotStatus["Cleaning"] = "cleaning";
    RobotStatus["Paused"] = "paused";
    RobotStatus["ManualControl"] = "manual_control";
    RobotStatus["Moving"] = "moving";
})(RobotStatus = exports.RobotStatus || (exports.RobotStatus = {}));
var CleaningFlag;
(function (CleaningFlag) {
    CleaningFlag["None"] = "none";
    CleaningFlag["Zone"] = "zone";
    CleaningFlag["Segment"] = "segment";
    CleaningFlag["Spot"] = "spot";
    CleaningFlag["Target"] = "target";
    CleaningFlag["Resumable"] = "resumable";
})(CleaningFlag = exports.CleaningFlag || (exports.CleaningFlag = {}));
var BatteryStateFlag;
(function (BatteryStateFlag) {
    BatteryStateFlag["None"] = "none";
    BatteryStateFlag["Charged"] = "charged";
    BatteryStateFlag["Charging"] = "charging";
    BatteryStateFlag["Discharging"] = "discharging";
})(BatteryStateFlag = exports.BatteryStateFlag || (exports.BatteryStateFlag = {}));
var PresetSelectionType;
(function (PresetSelectionType) {
    PresetSelectionType["FanSpeed"] = "fan_speed";
    PresetSelectionType["WaterGrade"] = "water_grade";
    PresetSelectionType["OperationMode"] = "operation_mode";
})(PresetSelectionType = exports.PresetSelectionType || (exports.PresetSelectionType = {}));
var PresetSelectionStateIntensity;
(function (PresetSelectionStateIntensity) {
    PresetSelectionStateIntensity["Off"] = "off";
    PresetSelectionStateIntensity["Min"] = "min";
    PresetSelectionStateIntensity["Low"] = "low";
    PresetSelectionStateIntensity["Medium"] = "medium";
    PresetSelectionStateIntensity["High"] = "high";
    PresetSelectionStateIntensity["Turbo"] = "turbo";
    PresetSelectionStateIntensity["Max"] = "max";
})(PresetSelectionStateIntensity = exports.PresetSelectionStateIntensity || (exports.PresetSelectionStateIntensity = {}));
var PresetSelectionStateMode;
(function (PresetSelectionStateMode) {
    PresetSelectionStateMode["Custom"] = "custom";
    PresetSelectionStateMode["Vacuum"] = "vacuum";
    PresetSelectionStateMode["Mop"] = "mop";
    PresetSelectionStateMode["VacuumAndMop"] = "vacuum_and_mop";
})(PresetSelectionStateMode = exports.PresetSelectionStateMode || (exports.PresetSelectionStateMode = {}));
var AttachmentStateAttributeType;
(function (AttachmentStateAttributeType) {
    AttachmentStateAttributeType["Dustbin"] = "dustbin";
    AttachmentStateAttributeType["Watertank"] = "watertank";
    AttachmentStateAttributeType["Mop"] = "mop";
})(AttachmentStateAttributeType = exports.AttachmentStateAttributeType || (exports.AttachmentStateAttributeType = {}));
var Capability;
(function (Capability) {
    Capability["AutoEmptyDockAutoEmptyControl"] = "AutoEmptyDockAutoEmptyControlCapability";
    Capability["AutoEmptyDockManualTrigger"] = "AutoEmptyDockManualTriggerCapability";
    Capability["BasicControl"] = "BasicControlCapability";
    Capability["CarpetModeControl"] = "CarpetModeControlCapability";
    Capability["CombinedVirtualRestrictions"] = "CombinedVirtualRestrictionsCapability";
    Capability["ConsumableMonitoring"] = "ConsumableMonitoringCapability";
    Capability["CurrentStatistics"] = "CurrentStatisticsCapability";
    Capability["DoNotDisturb"] = "DoNotDisturbCapability";
    Capability["FanSpeedControl"] = "FanSpeedControlCapability";
    Capability["GoToLocation"] = "GoToLocationCapability";
    Capability["KeyLock"] = "KeyLockCapability";
    Capability["Locate"] = "LocateCapability";
    Capability["ManualControl"] = "ManualControlCapability";
    Capability["MapReset"] = "MapResetCapability";
    Capability["MapSegmentEdit"] = "MapSegmentEditCapability";
    Capability["MapSegmentRename"] = "MapSegmentRenameCapability";
    Capability["MapSegmentation"] = "MapSegmentationCapability";
    Capability["MapSnapshot"] = "MapSnapshotCapability";
    Capability["MappingPass"] = "MappingPassCapability";
    Capability["MopDockCleanManualTrigger"] = "MopDockCleanManualTriggerCapability";
    Capability["MopDockDryManualTrigger"] = "MopDockDryManualTriggerCapability";
    Capability["OperationModeControl"] = "OperationModeControlCapability";
    Capability["PersistentMapControl"] = "PersistentMapControlCapability";
    Capability["SpeakerTest"] = "SpeakerTestCapability";
    Capability["SpeakerVolumeControl"] = "SpeakerVolumeControlCapability";
    Capability["TotalStatistics"] = "TotalStatisticsCapability";
    Capability["VoicePackManagement"] = "VoicePackManagementCapability";
    Capability["WaterUsageControl"] = "WaterUsageControlCapability";
    Capability["WifiConfiguration"] = "WifiConfigurationCapability";
    Capability["WifiScan"] = "WifiScanCapability";
    Capability["ZoneCleaning"] = "ZoneCleaningCapability";
    Capability["Quirks"] = "QuirksCapability";
})(Capability = exports.Capability || (exports.Capability = {}));
var ConsumableType;
(function (ConsumableType) {
    ConsumableType["Filter"] = "filter";
    ConsumableType["Brush"] = "brush";
    ConsumableType["Sensor"] = "sensor";
    ConsumableType["Mop"] = "mop";
    ConsumableType["Detergent"] = "detergent";
    ConsumableType["Bin"] = "bin";
})(ConsumableType = exports.ConsumableType || (exports.ConsumableType = {}));
var ConsumableSubType;
(function (ConsumableSubType) {
    ConsumableSubType["None"] = "none";
    ConsumableSubType["All"] = "all";
    ConsumableSubType["Main"] = "main";
    ConsumableSubType["Secondary"] = "secondary";
    ConsumableSubType["Left"] = "side_left";
    ConsumableSubType["Right"] = "side_right";
    ConsumableSubType["Dock"] = "dock";
})(ConsumableSubType = exports.ConsumableSubType || (exports.ConsumableSubType = {}));
var ConsumableUnit;
(function (ConsumableUnit) {
    ConsumableUnit["Minutes"] = "minutes";
    ConsumableUnit["Percent"] = "percent";
})(ConsumableUnit = exports.ConsumableUnit || (exports.ConsumableUnit = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel["trace"] = "trace";
    LogLevel["debug"] = "debug";
    LogLevel["info"] = "info";
    LogLevel["warn"] = "warn";
    LogLevel["error"] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var BasicControlAction;
(function (BasicControlAction) {
    BasicControlAction["Start"] = "start";
    BasicControlAction["Stop"] = "stop";
    BasicControlAction["Pause"] = "pause";
    BasicControlAction["Home"] = "home";
})(BasicControlAction = exports.BasicControlAction || (exports.BasicControlAction = {}));
var ValetudoRestrictedZoneType;
(function (ValetudoRestrictedZoneType) {
    ValetudoRestrictedZoneType["Regular"] = "regular";
    ValetudoRestrictedZoneType["Mop"] = "mop";
})(ValetudoRestrictedZoneType = exports.ValetudoRestrictedZoneType || (exports.ValetudoRestrictedZoneType = {}));
const isAttribute = (clazz) => {
    return (attribute) => {
        return attribute.__class === clazz;
    };
};
exports.isAttribute = isAttribute;
//# sourceMappingURL=valetudo.js.map