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
var sampleRegisteredVoters_1 = __importDefault(require("../Schema/sampleRegisteredVoters"));
var waitingToVerify_1 = __importDefault(require("../Schema/waitingToVerify"));
var votersSchema_1 = __importDefault(require("../Schema/votersSchema"));
var sendEmail_1 = require("../CustomFunction/sendEmail");
var socket_1 = require("../CustomFunction/socket");
var activity_1 = __importDefault(require("../Schema/activity"));
function verifyVotersToValidVoters(_, args, _a) {
    var req = _a.req;
    return __awaiter(this, void 0, void 0, function () {
        var VerifyVotersProcess;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    VerifyVotersProcess = function () {
                        return new Promise(function (resolve, reject) {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var verifyVotersFullname, verifyVotersPrecinct, verifyVotersIDNumber, verifyVotersIdPicture, verifyVotersPicture, findUser, userVerify, voters_1, userVerify, userVerify, userVerify, voters, err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 19, , 20]);
                                            verifyVotersFullname = args.verifyVotersFullname, verifyVotersPrecinct = args.verifyVotersPrecinct, verifyVotersIDNumber = args.verifyVotersIDNumber, verifyVotersIdPicture = args.verifyVotersIdPicture, verifyVotersPicture = args.verifyVotersPicture;
                                            findUser = [];
                                            if (!(verifyVotersFullname && !verifyVotersPrecinct && !verifyVotersIDNumber)) return [3 /*break*/, 6];
                                            return [4 /*yield*/, sampleRegisteredVoters_1.default.find({ firstName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[1].toLocaleLowerCase() })
                                                    .where({ lastName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[0].toLocaleLowerCase() })
                                                    .where({ middleName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[2].toLocaleLowerCase() })];
                                        case 1:
                                            userVerify = _a.sent();
                                            if (userVerify.length === 0) {
                                                return [2 /*return*/, resolve({
                                                        message: 'Any person qualified to vote shall register ',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].isVoted) {
                                                return [2 /*return*/, resolve({
                                                        message: 'Oppss this voter is already vote.',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].waiting) {
                                                return [2 /*return*/, resolve({
                                                        message: 'This voter is attemp to verified her/his account and waiting for response',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].verifiedVoters) {
                                                return [2 /*return*/, resolve({
                                                        message: 'This voter is attemp to verified her/his account and the accoount is already verified',
                                                        success: false
                                                    })];
                                            }
                                            return [4 /*yield*/, (0, sendEmail_1.verifyAccountToVotedWaiting)(req.userEmail, 'Your Account is Under Review , You will recieve  an email once verification is complete')];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: req.userId }, { waitingVerified: true })];
                                        case 3:
                                            voters_1 = _a.sent();
                                            return [4 /*yield*/, sampleRegisteredVoters_1.default.findOneAndUpdate({ _id: userVerify[0]._id }, { waiting: true, userId: req.userId })];
                                        case 4:
                                            _a.sent();
                                            new waitingToVerify_1.default({
                                                ovsId: userVerify[0]._id.toString(),
                                                firstName: userVerify[0].firstName,
                                                lastName: userVerify[0].lastName,
                                                middleName: userVerify[0].middleName,
                                                votersIdPicture: verifyVotersIdPicture,
                                                votersPicture: verifyVotersPicture
                                            }).save();
                                            return [4 /*yield*/, messagesVerifyNotif("".concat(voters_1.fullname, " is waiting to verified account."))];
                                        case 5:
                                            _a.sent();
                                            return [2 /*return*/, resolve({
                                                    message: 'Your Account is Under Review , You will recieve  an email once verification is complete',
                                                    success: true
                                                })];
                                        case 6:
                                            if (!(verifyVotersFullname && verifyVotersPrecinct && !verifyVotersIDNumber)) return [3 /*break*/, 9];
                                            return [4 /*yield*/, sampleRegisteredVoters_1.default.find({ firstName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[1].toLocaleLowerCase() })
                                                    .where({ lastName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[0].toLocaleLowerCase() })
                                                    .where({ middleName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[2].toLocaleLowerCase() })
                                                    .where({ precinct: verifyVotersPrecinct })];
                                        case 7:
                                            userVerify = _a.sent();
                                            if (userVerify.length === 0) {
                                                return [2 /*return*/, resolve({
                                                        message: 'Any person qualified to vote shall register ',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].isVoted) {
                                                return [2 /*return*/, resolve({
                                                        message: 'Oppss this voter is already vote.',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].waiting) {
                                                return [2 /*return*/, resolve({
                                                        message: 'This voter is attemp to verified her/his account and waiting for response',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].verifiedVoters) {
                                                return [2 /*return*/, resolve({
                                                        message: 'This voter is attemp to verified her/his account and the accoount is already verified',
                                                        success: false
                                                    })];
                                            }
                                            return [4 /*yield*/, sampleRegisteredVoters_1.default.findOneAndUpdate({ _id: userVerify[0]._id }, { verifiedVoters: true, userId: req.userId })];
                                        case 8:
                                            _a.sent();
                                            findUser.push(userVerify);
                                            _a.label = 9;
                                        case 9:
                                            if (!(verifyVotersFullname && !verifyVotersPrecinct && verifyVotersIDNumber)) return [3 /*break*/, 12];
                                            return [4 /*yield*/, sampleRegisteredVoters_1.default.find({ firstName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[1].toLocaleLowerCase() })
                                                    .where({ lastName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[0].toLocaleLowerCase() })
                                                    .where({ middleName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[2].toLocaleLowerCase() })
                                                    .where({ votersIdNumber: verifyVotersIDNumber })];
                                        case 10:
                                            userVerify = _a.sent();
                                            if (userVerify.length === 0) {
                                                return [2 /*return*/, resolve({
                                                        message: 'Any person qualified to vote shall register ',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].isVoted) {
                                                return [2 /*return*/, resolve({
                                                        message: 'Oppss this voter is already vote.',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].waiting) {
                                                return [2 /*return*/, resolve({
                                                        message: 'This voter is attemp to verified her/his account and waiting for response',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].verifiedVoters) {
                                                return [2 /*return*/, resolve({
                                                        message: 'This voter is attemp to verified her/his account and the accoount is already verified',
                                                        success: false
                                                    })];
                                            }
                                            return [4 /*yield*/, sampleRegisteredVoters_1.default.findOneAndUpdate({ _id: userVerify[0]._id }, { verifiedVoters: true, userId: req.userId })];
                                        case 11:
                                            _a.sent();
                                            findUser.push(userVerify);
                                            _a.label = 12;
                                        case 12:
                                            if (!(verifyVotersFullname && verifyVotersPrecinct && verifyVotersIDNumber)) return [3 /*break*/, 15];
                                            return [4 /*yield*/, sampleRegisteredVoters_1.default.find({ firstName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[1].toLocaleLowerCase() })
                                                    .where({ lastName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[0].toLocaleLowerCase() })
                                                    .where({ middleName: verifyVotersFullname === null || verifyVotersFullname === void 0 ? void 0 : verifyVotersFullname.split(',')[2].toLocaleLowerCase() })
                                                    .where({ votersIdNumber: verifyVotersIDNumber })
                                                    .where({ precinct: verifyVotersPrecinct })];
                                        case 13:
                                            userVerify = _a.sent();
                                            if (userVerify.length === 0) {
                                                return [2 /*return*/, resolve({
                                                        message: 'Any person qualified to vote shall register ',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].isVoted) {
                                                return [2 /*return*/, resolve({
                                                        message: 'Oppss this voter is already vote.',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].waiting) {
                                                return [2 /*return*/, resolve({
                                                        message: 'This voter is attemp to verified her/his account and waiting for response',
                                                        success: false
                                                    })];
                                            }
                                            if (userVerify[0].verifiedVoters) {
                                                return [2 /*return*/, resolve({
                                                        message: 'This voter is attemp to verified her/his account and the accoount is already verified',
                                                        success: false
                                                    })];
                                            }
                                            return [4 /*yield*/, sampleRegisteredVoters_1.default.findOneAndUpdate({ _id: userVerify[0]._id }, { verifiedVoters: true, userId: req.userId })];
                                        case 14:
                                            _a.sent();
                                            findUser.push(userVerify);
                                            _a.label = 15;
                                        case 15: return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: req.userId }, { verify: true })];
                                        case 16:
                                            voters = _a.sent();
                                            return [4 /*yield*/, (0, sendEmail_1.verifyAccountToVotedSuccess)(req.userEmail, 'Thank you, your email has been verified. your account is now active. Please use the link below to login to your account')];
                                        case 17:
                                            _a.sent();
                                            return [4 /*yield*/, messagesVerifyNotif("".concat(voters.fullname, " is successfully verified account."))];
                                        case 18:
                                            _a.sent();
                                            return [2 /*return*/, resolve({
                                                    message: "Your Barangay Online Voting account has been verified.",
                                                    success: true
                                                })];
                                        case 19:
                                            err_1 = _a.sent();
                                            return [2 /*return*/, reject({
                                                    message: "theres some error ".concat(err_1),
                                                    success: false
                                                })];
                                        case 20: return [2 /*return*/];
                                    }
                                });
                            }); }, 5000);
                        });
                    };
                    return [4 /*yield*/, VerifyVotersProcess()];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.default = verifyVotersToValidVoters;
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
