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
        while (_) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var votersSchema_1 = __importDefault(require("../Schema/votersSchema"));
var adminSchema_1 = __importDefault(require("../Schema/adminSchema"));
var employeeSchema_1 = __importDefault(require("../Schema/employeeSchema"));
var authenticateUser_1 = __importDefault(require("./authenticateUser"));
var generateToken_1 = __importDefault(require("../JWT/generateToken"));
function signin(_, _a, _b) {
    var email = _a.email, password = _a.password;
    var res = _b.res;
    return __awaiter(this, void 0, void 0, function () {
        var login;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log(" asdasdas: " + email + " " + password);
                    return [4 /*yield*/, (0, authenticateUser_1.default)(function () { return __awaiter(_this, void 0, void 0, function () {
                            var client, emloyee, admin;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, votersSchema_1.default.find({ "securedDetails.email": email })];
                                    case 1:
                                        client = _a.sent();
                                        return [4 /*yield*/, employeeSchema_1.default.find({ "securedDetails.email": email })];
                                    case 2:
                                        emloyee = _a.sent();
                                        return [4 /*yield*/, adminSchema_1.default.find({ "securedDetails.email": email })];
                                    case 3:
                                        admin = _a.sent();
                                        return [2 /*return*/, __spreadArray(__spreadArray(__spreadArray([], client, true), emloyee, true), admin, true)];
                                }
                            });
                        }); }, password, function (err, user, message) { return __awaiter(_this, void 0, void 0, function () {
                            var ACCESS_TOKEN;
                            return __generator(this, function (_a) {
                                if (err) {
                                    return [2 /*return*/, {
                                            message: "ERRORR ".concat(err),
                                            success: false
                                        }];
                                }
                                if (!user) {
                                    return [2 /*return*/, {
                                            message: message ? message.message : '',
                                            success: false,
                                        }];
                                }
                                ACCESS_TOKEN = (0, generateToken_1.default)({ _id: user._id, email: user.securedDetails[0].email });
                                res.cookie("ACCESS_TOKEN", ACCESS_TOKEN);
                                return [2 /*return*/, {
                                        message: 'Successfully Login',
                                        success: true
                                    }];
                            });
                        }); })];
                case 1:
                    login = _c.sent();
                    return [2 /*return*/, login];
            }
        });
    });
}
exports.default = signin;
