"use strict";
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
exports.sendMessages = exports.GLOBAL_SOCKET = void 0;
var activity_1 = __importDefault(require("../Schema/activity"));
var candidates_1 = __importDefault(require("../Schema/candidates"));
var votersSchema_1 = __importDefault(require("../Schema/votersSchema"));
var sampleRegisteredVoters_1 = __importDefault(require("../Schema/sampleRegisteredVoters"));
function sokcetMidlleware(io, socket, next) {
    return __awaiter(this, void 0, void 0, function () {
        var allUser, findVoted, findNotVoted, findVeriedUser, findNotVeriedUser, candidatesAndPositon, sampleRegisterVoter, _a, _b, _c;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, votersSchema_1.default.find({})];
                case 1:
                    allUser = _d.sent();
                    findVoted = allUser.filter(function (data) { return data.voted !== false; });
                    findNotVoted = allUser.filter(function (data) { return data.voted !== true; });
                    findVeriedUser = allUser.filter(function (data) { return data.verify !== false; });
                    findNotVeriedUser = allUser.filter(function (data) { return data.verify !== true; });
                    return [4 /*yield*/, candidates_1.default.find({})];
                case 2:
                    candidatesAndPositon = _d.sent();
                    return [4 /*yield*/, sampleRegisteredVoters_1.default.find({})];
                case 3:
                    sampleRegisterVoter = _d.sent();
                    socket.emit('verifiedVoters', {
                        notVoted: findNotVoted.length,
                        verified: findVeriedUser.length,
                        notverified: findNotVeriedUser.length,
                        voted: findVoted.length,
                        voters: allUser.length,
                        sampleRegisterVoter: sampleRegisterVoter.length,
                    });
                    socket.emit('connectedUser', io.engine.clientsCount);
                    socket.broadcast.emit('connectedUser', io.engine.clientsCount);
                    socket.emit('candidatesAndPosition', candidatesAndPositon);
                    return [4 /*yield*/, sendMessages(socket)];
                case 4:
                    _d.sent();
                    socket.on('disconnectUser', function (user) { return __awaiter(_this, void 0, void 0, function () {
                        var activity, _a, _b, _c, _d, _e, _f, err_1;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    _g.trys.push([0, 4, , 5]);
                                    socket.broadcast.emit('connectedUser', io.engine.clientsCount - 1);
                                    return [4 /*yield*/, new activity_1.default({
                                            activityLog: "".concat(user.fullname, " is Logout"),
                                            userID: socket.handshake.auth.token,
                                        })];
                                case 1:
                                    activity = _g.sent();
                                    activity.save();
                                    _b = (_a = socket).emit;
                                    _c = ['fetchMessages'];
                                    return [4 /*yield*/, activity_1.default.find({})];
                                case 2:
                                    _b.apply(_a, _c.concat([_g.sent()]));
                                    _e = (_d = socket.broadcast).emit;
                                    _f = ['server-recieve-message', "".concat(user.fullname, " is Logout")];
                                    return [4 /*yield*/, activity_1.default.find({})];
                                case 3:
                                    _e.apply(_d, _f.concat([_g.sent()]));
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_1 = _g.sent();
                                    next(new Error('SOCKET ERROR' + err_1));
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    _b = (_a = socket).emit;
                    _c = ['fetchMessages'];
                    return [4 /*yield*/, activity_1.default.find({})];
                case 5:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    exports.GLOBAL_SOCKET = socket;
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = sokcetMidlleware;
function sendMessages(socket, customMessages) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            socket.on('message', function (message, cb) { return __awaiter(_this, void 0, void 0, function () {
                var user, activity, _a, _b, _c, _d, _e, _f, _g, err_2;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            _h.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, votersSchema_1.default.findById(socket.handshake.auth.token)];
                        case 1:
                            user = _h.sent();
                            return [4 /*yield*/, new activity_1.default({
                                    activityLog: message || customMessages,
                                    userID: socket.handshake.auth.token,
                                    isVoted: user.voted,
                                    isVerify: user.verify
                                })];
                        case 2:
                            activity = _h.sent();
                            activity.save();
                            _b = (_a = socket).emit;
                            _c = ['fetchMessages'];
                            return [4 /*yield*/, activity_1.default.find({})];
                        case 3:
                            _b.apply(_a, _c.concat([_h.sent()]));
                            _d = cb;
                            return [4 /*yield*/, activity_1.default.find({})];
                        case 4:
                            _d.apply(void 0, [_h.sent()]);
                            _f = (_e = socket.broadcast).emit;
                            _g = ['server-recieve-message-connected', message];
                            return [4 /*yield*/, activity_1.default.find({})];
                        case 5:
                            _f.apply(_e, _g.concat([_h.sent()]));
                            return [3 /*break*/, 7];
                        case 6:
                            err_2 = _h.sent();
                            new Error('SOCKET ERROR' + err_2);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.sendMessages = sendMessages;
