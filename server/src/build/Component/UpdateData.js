"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = require("bcryptjs");
var socket_1 = require("../CustomFunction/socket");
var activity_1 = __importDefault(require("../Schema/activity"));
var votersSchema_1 = __importDefault(require("../Schema/votersSchema"));
function UpdateData(_, _a, _b) {
    var data = _a.data;
    var req = _b.req;
    return __awaiter(this, void 0, void 0, function () {
        var myData;
        return __generator(this, function (_c) {
            try {
                myData = JSON.parse(data);
                Object.entries(myData).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    filterData(key, value, req.userId);
                });
                return [2 /*return*/, {
                        success: true,
                        message: "Update Success."
                    }];
            }
            catch (err) {
                return [2 /*return*/, {
                        success: false,
                        message: "UpdateData Error : ".concat(err)
                    }];
            }
            return [2 /*return*/];
        });
    });
}
exports.default = UpdateData;
function filterData(key, value, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var voters, gender, basicDetails, basicDetails, basicDetails, basicDetails, securedDetails, securedDetails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, votersSchema_1.default.findById(userId)];
                case 1:
                    voters = _a.sent();
                    gender = (voters.gender === "male" || voters.gender === "Male") ? "his" : "her";
                    if (!(key === "fullname")) return [3 /*break*/, 4];
                    return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: userId }, { fullname: value })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, messagesVerifyNotif("".concat(voters.fullname, " is update ").concat(gender, " fullname to ").concat(value))];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
                case 4:
                    if (!(key === "birthdate")) return [3 /*break*/, 7];
                    basicDetails = [__assign(__assign({}, voters.basicDetails[0]), { birthdate: value })];
                    return [4 /*yield*/, messagesVerifyNotif("".concat(voters.fullname, " is update ").concat(gender, " birthdate to ").concat(value))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: userId }, { basicDetails: basicDetails })];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
                case 7:
                    if (!(key === "gender")) return [3 /*break*/, 10];
                    return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: userId }, { gender: value })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, messagesVerifyNotif("".concat(voters.fullname, " is update ").concat(gender, " gender to ").concat(value))];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
                case 10:
                    if (!(key === "municipality")) return [3 /*break*/, 13];
                    basicDetails = [__assign(__assign({}, voters.basicDetails[0]), { municipality: value })];
                    return [4 /*yield*/, messagesVerifyNotif("".concat(voters.fullname, " is update ").concat(gender, " municipality to ").concat(value))];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: userId }, { basicDetails: basicDetails })];
                case 12:
                    _a.sent();
                    return [2 /*return*/];
                case 13:
                    if (!(key === "zipcode")) return [3 /*break*/, 16];
                    basicDetails = [__assign(__assign({}, voters.basicDetails[0]), { zipcode: value })];
                    return [4 /*yield*/, messagesVerifyNotif("".concat(voters.fullname, " is update ").concat(gender, " zipcode to ").concat(value))];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: userId }, { basicDetails: basicDetails })];
                case 15:
                    _a.sent();
                    return [2 /*return*/];
                case 16:
                    if (!(key === "address")) return [3 /*break*/, 19];
                    basicDetails = [__assign(__assign({}, voters.basicDetails[0]), { address: value })];
                    return [4 /*yield*/, messagesVerifyNotif("".concat(voters.fullname, " is update ").concat(gender, " address to ").concat(value))];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: userId }, { basicDetails: basicDetails })];
                case 18:
                    _a.sent();
                    return [2 /*return*/];
                case 19:
                    if (!(key === "email")) return [3 /*break*/, 22];
                    securedDetails = [__assign(__assign({}, voters.securedDetails[0]), { email: value })];
                    return [4 /*yield*/, messagesVerifyNotif("".concat(voters.fullname, " is update ").concat(gender, " email to ").concat(value))];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: userId }, { securedDetails: securedDetails })];
                case 21:
                    _a.sent();
                    return [2 /*return*/];
                case 22:
                    if (!(key === "password")) return [3 /*break*/, 25];
                    securedDetails = [__assign(__assign({}, voters.securedDetails[0]), { password: (0, bcryptjs_1.hashSync)(value, 10) })];
                    return [4 /*yield*/, messagesVerifyNotif("".concat(voters.fullname, " is update ").concat(gender, " password."))];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: userId }, { securedDetails: securedDetails })];
                case 24:
                    _a.sent();
                    return [2 /*return*/];
                case 25: return [2 /*return*/];
            }
        });
    });
}
function messagesVerifyNotif(messages) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    socket_1.GLOBAL_SOCKET.emit("verify-messages", "".concat(messages));
                    return [4 /*yield*/, votersSchema_1.default.findById(socket_1.GLOBAL_SOCKET.handshake.auth.token)];
                case 1:
                    user = _d.sent();
                    return [4 /*yield*/, new activity_1.default({
                            activityLog: messages,
                            userID: socket_1.GLOBAL_SOCKET.handshake.auth.token,
                            isVoted: user.voted,
                            isVerify: user.verify
                        }).save()];
                case 2:
                    _d.sent();
                    _b = (_a = socket_1.GLOBAL_SOCKET.broadcast).emit;
                    _c = ['server-recieve-message-connected', messages];
                    return [4 /*yield*/, activity_1.default.find({})];
                case 3:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
