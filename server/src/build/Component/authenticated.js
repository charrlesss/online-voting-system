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
var votersSchema_1 = __importDefault(require("../Schema/votersSchema"));
var employeeSchema_1 = __importDefault(require("../Schema/employeeSchema"));
var adminSchema_1 = __importDefault(require("../Schema/adminSchema"));
var uuid_1 = require("uuid");
function authenticated(_, __, _a) {
    var req = _a.req;
    return __awaiter(this, void 0, void 0, function () {
        var authentication;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    authentication = function () {
                        return new Promise(function (resolve, reject) {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var _id, urlID, updatedUser, _a, _b, _c, _d, _e, err_1;
                                return __generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0:
                                            _f.trys.push([0, 12, , 13]);
                                            _id = req.userId;
                                            urlID = (0, uuid_1.v4)();
                                            updatedUser = {
                                                authenticated: true,
                                                urlID: urlID
                                            };
                                            return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: _id }, updatedUser, { new: true })];
                                        case 1:
                                            _e = (_f.sent());
                                            if (_e) return [3 /*break*/, 3];
                                            return [4 /*yield*/, employeeSchema_1.default.findOneAndUpdate({ _id: _id }, updatedUser, { new: true })];
                                        case 2:
                                            _e = (_f.sent());
                                            _f.label = 3;
                                        case 3:
                                            _d = _e;
                                            if (_d) return [3 /*break*/, 5];
                                            return [4 /*yield*/, adminSchema_1.default.findOneAndUpdate({ _id: _id }, updatedUser, { new: true })];
                                        case 4:
                                            _d = (_f.sent());
                                            _f.label = 5;
                                        case 5:
                                            _c = _d;
                                            if (_c) return [3 /*break*/, 7];
                                            return [4 /*yield*/, adminSchema_1.default.updateOne({ _id: _id }, {
                                                    $push: {
                                                        log: {
                                                            login: new Date().toLocaleString()
                                                        }
                                                    }
                                                })];
                                        case 6:
                                            _c = (_f.sent());
                                            _f.label = 7;
                                        case 7:
                                            _b = _c;
                                            if (_b) return [3 /*break*/, 9];
                                            return [4 /*yield*/, employeeSchema_1.default.updateOne({ _id: _id }, {
                                                    $push: {
                                                        log: {
                                                            login: new Date().toLocaleString()
                                                        }
                                                    }
                                                })];
                                        case 8:
                                            _b = (_f.sent());
                                            _f.label = 9;
                                        case 9:
                                            _a = _b;
                                            if (_a) return [3 /*break*/, 11];
                                            return [4 /*yield*/, votersSchema_1.default.updateOne({ _id: _id }, {
                                                    $push: {
                                                        log: {
                                                            login: new Date().toLocaleString()
                                                        }
                                                    }
                                                })];
                                        case 10:
                                            _a = (_f.sent());
                                            _f.label = 11;
                                        case 11:
                                            _a;
                                            return [2 /*return*/, resolve({
                                                    message: 'create account successfully.',
                                                    success: true,
                                                    urlID: urlID
                                                })];
                                        case 12:
                                            err_1 = _f.sent();
                                            return [2 /*return*/, reject({
                                                    message: "Server Error ".concat(err_1),
                                                    success: false,
                                                    urlID: ''
                                                })];
                                        case 13: return [2 /*return*/];
                                    }
                                });
                            }); }, 3000);
                        });
                    };
                    return [4 /*yield*/, authentication()];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.default = authenticated;
