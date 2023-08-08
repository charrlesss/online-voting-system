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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
function authenticateUsers(getUserByEmail, password, done) {
    return __awaiter(this, void 0, void 0, function () {
        var user, findUser, checker, i, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    return [4 /*yield*/, getUserByEmail()];
                case 1:
                    user = _a.sent();
                    findUser = [];
                    checker = false;
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < user.length)) return [3 /*break*/, 5];
                    checker = true;
                    return [4 /*yield*/, bcryptjs_1.default.compare(password, user[i].securedDetails[0].password)];
                case 3:
                    if (_a.sent()) {
                        findUser.push(user[i]);
                        return [3 /*break*/, 5];
                    }
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    if (!(user.length === 0 && !checker)) return [3 /*break*/, 7];
                    return [4 /*yield*/, done(null, null, { message: "No username found!" })];
                case 6: return [2 /*return*/, _a.sent()];
                case 7:
                    if (!(findUser.length === 0 && checker)) return [3 /*break*/, 9];
                    return [4 /*yield*/, done(null, null, { message: "Password incorrect!" })];
                case 8: return [2 /*return*/, _a.sent()];
                case 9: return [4 /*yield*/, done(null, findUser[0])];
                case 10: return [2 /*return*/, _a.sent()];
                case 11:
                    err_1 = _a.sent();
                    return [2 /*return*/, done(err_1)];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.default = authenticateUsers;
