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
var votersSchema_1 = __importDefault(require("../Schema/votersSchema"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var generateToken_1 = __importStar(require("../JWT/generateToken"));
var generateCode_1 = __importDefault(require("../CustomFunction/generateCode"));
var sendEmail_1 = require("../CustomFunction/sendEmail");
function createAccount(__, args, _a) {
    var res = _a.res;
    return __awaiter(this, void 0, void 0, function () {
        var fullname, gender, email, password, user, code, securePassword, newUser, REFRESH_TOKEN, ACCESS_TOKEN, secure, updateUser, user_1, newUser, REFRESH_TOKEN, ACCESS_TOKEN, secure, updateUser, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 12, , 13]);
                    delete args.confirmPassword;
                    fullname = args.fullname, gender = args.gender, email = args.email, password = args.password;
                    return [4 /*yield*/, votersSchema_1.default.find({})];
                case 1:
                    user = _b.sent();
                    code = (0, generateCode_1.default)();
                    return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                case 2:
                    securePassword = _b.sent();
                    if (!(user.length === 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, new votersSchema_1.default({
                            fullname: fullname,
                            gender: gender,
                            registered: true,
                            securedDetails: [
                                {
                                    email: email,
                                    password: securePassword,
                                    code: code,
                                    refreshToken: [],
                                },
                            ],
                        }).save()];
                case 3:
                    newUser = _b.sent();
                    return [4 /*yield*/, (0, sendEmail_1.verifyAccountFromEmail)(newUser.securedDetails[0].email, code)];
                case 4:
                    _b.sent();
                    REFRESH_TOKEN = (0, generateToken_1.generateRefreshToken)({
                        _id: newUser._id,
                        email: newUser.securedDetails[0].email,
                    });
                    ACCESS_TOKEN = (0, generateToken_1.default)({
                        _id: newUser._id,
                        email: newUser.securedDetails[0].email,
                    });
                    secure = newUser.securedDetails[0];
                    updateUser = __assign(__assign({}, secure), { refreshToken: [REFRESH_TOKEN] });
                    return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: newUser._id }, { securedDetails: [updateUser] })];
                case 5:
                    _b.sent();
                    res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, {
                        httpOnly: true,
                        secure: true,
                    });
                    res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, {
                        httpOnly: true,
                        secure: true,
                    });
                    return [2 /*return*/, {
                            message: "successfull create account",
                            success: true,
                        }];
                case 6: return [4 /*yield*/, votersSchema_1.default.find({
                        "securedDetails.email": email,
                    })];
                case 7:
                    user_1 = _b.sent();
                    if (user_1.length !== 0) {
                        return [2 /*return*/, {
                                message: "This email is already used!",
                                success: false,
                            }];
                    }
                    return [4 /*yield*/, new votersSchema_1.default({
                            fullname: fullname,
                            gender: gender,
                            registered: true,
                            securedDetails: [
                                {
                                    email: email,
                                    password: securePassword,
                                    refreshToken: [],
                                    code: code,
                                },
                            ],
                        }).save()];
                case 8:
                    newUser = _b.sent();
                    REFRESH_TOKEN = (0, generateToken_1.generateRefreshToken)({
                        _id: newUser._id,
                        email: newUser.securedDetails[0].email,
                    });
                    ACCESS_TOKEN = (0, generateToken_1.default)({
                        _id: newUser._id,
                        email: newUser.securedDetails[0].email,
                    });
                    return [4 /*yield*/, (0, sendEmail_1.verifyAccountFromEmail)(newUser.securedDetails[0].email, code)];
                case 9:
                    _b.sent();
                    secure = newUser.securedDetails[0];
                    updateUser = __assign(__assign({}, secure), { refreshToken: [REFRESH_TOKEN] });
                    return [4 /*yield*/, votersSchema_1.default.findOneAndUpdate({ _id: newUser._id }, { securedDetails: [updateUser] })];
                case 10:
                    _b.sent();
                    res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, {
                        httpOnly: true,
                        secure: true,
                    });
                    res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, {
                        httpOnly: true,
                        secure: true,
                    });
                    return [2 /*return*/, {
                            message: "successfull create account",
                            success: true,
                        }];
                case 11: return [3 /*break*/, 13];
                case 12:
                    err_1 = _b.sent();
                    return [2 /*return*/, {
                            message: "".concat(err_1),
                            success: false,
                        }];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.default = createAccount;
