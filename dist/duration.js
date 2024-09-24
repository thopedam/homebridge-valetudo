"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.milliseconds = void 0;
const millisecondsPerSecond = 1000;
const secondsPerMinute = 60;
const minutesPerHour = 60;
const millisecondsPerMinute = millisecondsPerSecond * secondsPerMinute;
const millisecondsPerHour = millisecondsPerMinute * minutesPerHour;
function milliseconds(duration) {
    var _a, _b, _c, _d;
    return (((_a = duration === null || duration === void 0 ? void 0 : duration.hours) !== null && _a !== void 0 ? _a : 0) * millisecondsPerHour +
        ((_b = duration.minutes) !== null && _b !== void 0 ? _b : 0) * millisecondsPerMinute +
        ((_c = duration.seconds) !== null && _c !== void 0 ? _c : 0) * millisecondsPerSecond +
        ((_d = duration.milliseconds) !== null && _d !== void 0 ? _d : 0));
}
exports.milliseconds = milliseconds;
//# sourceMappingURL=duration.js.map