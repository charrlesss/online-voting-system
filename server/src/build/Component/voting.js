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
var candidates_1 = __importDefault(require("../Schema/candidates"));
var votersSchema_1 = __importDefault(require("../Schema/votersSchema"));
var socket_1 = require("../CustomFunction/socket");
var uuid_1 = require("uuid");
var sendEmail_1 = require("../CustomFunction/sendEmail");
var activity_1 = __importDefault(require("../Schema/activity"));
var sampleRegisteredVoters_1 = __importDefault(require("../Schema/sampleRegisteredVoters"));
function voting(_, voted, _a) {
    var req = _a.req;
    return __awaiter(this, void 0, void 0, function () {
        var votingProcess;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    votingProcess = function () { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var mayor, vicemayor, msp, receiptNumber_1, voteList, candidatesAndPositon_1, messaage, err_1;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 9, , 10]);
                                                    mayor = voted.mayor, vicemayor = voted.vicemayor, msp = voted.msp;
                                                    receiptNumber_1 = (0, uuid_1.v4)();
                                                    voteList = [
                                                        __assign({ receiptNumber: receiptNumber_1, timeAttempt: new Date().toLocaleString() }, voted),
                                                    ];
                                                    return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: req.userId }, { voteList: voteList, voted: true }, { new: true })];
                                                case 1:
                                                    _a.sent();
                                                    return [4 /*yield*/, candidates_1.default.findOneAndUpdate({ FullName: voteList[0].mayor[0] }, {
                                                            $push: {
                                                                voterReceiptId: receiptNumber_1,
                                                            },
                                                        }, { new: true })];
                                                case 2:
                                                    _a.sent();
                                                    return [4 /*yield*/, candidates_1.default.findOneAndUpdate({ FullName: voteList[0].vicemayor[0] }, {
                                                            $push: {
                                                                voterReceiptId: receiptNumber_1,
                                                            },
                                                        }, { new: true })];
                                                case 3:
                                                    _a.sent();
                                                    voteList[0].msp.forEach(function (vote) { return __awaiter(_this, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, candidates_1.default.findOneAndUpdate({ FullName: vote }, {
                                                                        $push: {
                                                                            voterReceiptId: receiptNumber_1,
                                                                        },
                                                                    }, { new: true })];
                                                                case 1:
                                                                    _a.sent();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); });
                                                    return [4 /*yield*/, candidates_1.default.find({})];
                                                case 4:
                                                    candidatesAndPositon_1 = _a.sent();
                                                    voteList.forEach(function (vote) {
                                                        vote.msp.forEach(function (mspVotes) {
                                                            candidatesAndPositon_1.forEach(function (candidates) { return __awaiter(_this, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            if (!(candidates.FullName === vote.mayor[0] ||
                                                                                candidates.FullName === vote.vicemayor[0] ||
                                                                                candidates.FullName === mspVotes)) return [3 /*break*/, 2];
                                                                            return [4 /*yield*/, candidates_1.default.findOneAndUpdate({ FullName: candidates.FullName }, { votes: candidates.votes + 1 }, { new: true })];
                                                                        case 1:
                                                                            _a.sent();
                                                                            _a.label = 2;
                                                                        case 2: return [2 /*return*/];
                                                                    }
                                                                });
                                                            }); });
                                                        });
                                                    });
                                                    messaage = "\n          <h3  style='color:#2196f3;'>Mayor</h3> \n           <strong  style='color: #263238;'>".concat(mayor[0], " </strong>\n           <h3 style='color:#2196f3;'>Vice Mayor</h3> \n            <strong style='color: #263238;'>").concat(vicemayor[0], " </strong>\n            <h3 style='color:#2196f3;'>MSP</h3> \n            <strong  style='color: #263238;'>").concat(msp[0], " </strong><br>\n            <strong  style='color: #263238;'>").concat(msp[1], " </strong><br>\n            <strong  style='color: #263238;'>").concat(msp[2], " </strong><br>\n            <strong  style='color: #263238;'>").concat(msp[3], " </strong><br>\n            <strong  style='color: #263238;'>").concat(msp[4], " </strong><br>\n            <strong  style='color: #263238;'>").concat(msp[5], " </strong>\n            ");
                                                    return [4 /*yield*/, (0, sendEmail_1.sendMessagesForVoted)(req.userEmail, messaage)];
                                                case 5:
                                                    _a.sent();
                                                    return [4 /*yield*/, sendNotif()];
                                                case 6:
                                                    _a.sent();
                                                    return [4 /*yield*/, update()];
                                                case 7:
                                                    _a.sent();
                                                    return [4 /*yield*/, sampleRegisteredVoters_1.default.findOneAndUpdate({ userId: req.userId }, { isVoted: true }, { new: true })];
                                                case 8:
                                                    _a.sent();
                                                    return [2 /*return*/, resolve({
                                                            success: true,
                                                            message: "Successfully vote.",
                                                        })];
                                                case 9:
                                                    err_1 = _a.sent();
                                                    return [2 /*return*/, reject({
                                                            success: false,
                                                            message: "Error to voted".concat(err_1),
                                                        })];
                                                case 10: return [2 /*return*/];
                                            }
                                        });
                                    }); }, 5000);
                                })];
                        });
                    }); };
                    return [4 /*yield*/, votingProcess()];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.default = voting;
function update() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = socket_1.GLOBAL_SOCKET.broadcast).emit;
                    _c = ["candidatesAndPosition"];
                    return [4 /*yield*/, candidates_1.default.find({})];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
function sendNotif() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            socket_1.GLOBAL_SOCKET.on("vote-notify", function (messages) { return __awaiter(_this, void 0, void 0, function () {
                var user, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, votersSchema_1.default.findById(socket_1.GLOBAL_SOCKET.handshake.auth.token)];
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
            }); });
            return [2 /*return*/];
        });
    });
}
