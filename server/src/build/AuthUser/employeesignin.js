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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var employeeSchema_1 = __importDefault(require("../Schema/employeeSchema"));
var authenticateUser_1 = __importDefault(require("./authenticateUser"));
var generateToken_1 = __importStar(require("../JWT/generateToken"));
function employeesignin(_, _a, _b) {
    var email = _a.email, password = _a.password;
    var res = _b.res;
    return __awaiter(this, void 0, void 0, function () {
        var login;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, authenticateUser_1.default)(function () { return __awaiter(_this, void 0, void 0, function () {
                        var emloyee;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, employeeSchema_1.default.find({ "securedDetails.email": email })];
                                case 1:
                                    emloyee = _a.sent();
                                    return [2 /*return*/, emloyee];
                            }
                        });
                    }); }, password, function (err, user, message) { return __awaiter(_this, void 0, void 0, function () {
                        var ACCESS_TOKEN, REFRESH_TOKEN, secure, updateUser, upadate;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        return [2 /*return*/, {
                                                message: "ERRORR ".concat(err),
                                                success: false,
                                            }];
                                    }
                                    if (!user) {
                                        return [2 /*return*/, {
                                                message: message ? message.message : '',
                                                success: false,
                                            }];
                                    }
                                    ACCESS_TOKEN = (0, generateToken_1.default)({ _id: user._id, email: user.securedDetails[0].email });
                                    REFRESH_TOKEN = (0, generateToken_1.generateRefreshToken)({ _id: user._id, email: user.securedDetails[0].email });
                                    secure = user.securedDetails[0];
                                    updateUser = __assign(__assign({}, secure), { refreshToken: [REFRESH_TOKEN] });
                                    upadate = {
                                        "redirect": false,
                                        "authenticated": false,
                                        "urlID": '',
                                        securedDetails: [updateUser],
                                        log: [{ login: new Date().toLocaleString() }]
                                    };
                                    return [4 /*yield*/, employeeSchema_1.default.findOneAndUpdate({ _id: user._id }, upadate, { new: true })];
                                case 1:
                                    _a.sent();
                                    res.cookie("ACCESS_TOKEN", ACCESS_TOKEN);
                                    res.cookie("REFRESH_TOKEN", REFRESH_TOKEN);
                                    return [2 /*return*/, {
                                            message: 'Successfully Login',
                                            success: true,
                                        }];
                            }
                        });
                    }); })];
                case 1:
                    login = _c.sent();
                    return [2 /*return*/, login];
            }
        });
    });
}
exports.default = employeesignin;
