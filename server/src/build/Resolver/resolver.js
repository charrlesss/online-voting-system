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
var createAccount_1 = __importDefault(require("./../AuthUser/createAccount"));
var votersSchema_1 = __importDefault(require("../Schema/votersSchema"));
var adminSchema_1 = __importDefault(require("../Schema/adminSchema"));
var employeeSchema_1 = __importDefault(require("../Schema/employeeSchema"));
var votersignin_1 = __importDefault(require("../AuthUser/votersignin"));
var employeesignin_1 = __importDefault(require("../AuthUser/employeesignin"));
var adminsignin_1 = __importDefault(require("../AuthUser/adminsignin"));
var Contact_1 = __importDefault(require("../Component/Contact"));
var VerifyVoters_1 = __importDefault(require("../Component/VerifyVoters"));
var ResendCode_1 = __importDefault(require("../Component/ResendCode"));
var RemoveNotVerifyAccount_1 = __importDefault(require("../Component/RemoveNotVerifyAccount"));
var graphql_upload_1 = require("graphql-upload");
var Uploadfile_1 = __importDefault(require("../Component/Uploadfile"));
var BasicDetails_1 = __importDefault(require("../Component/BasicDetails"));
var Authenticated_1 = __importDefault(require("../Component/Authenticated"));
var Logout_1 = __importDefault(require("../Component/Logout"));
var VerifySecret_1 = __importDefault(require("../Component/VerifySecret"));
var GetBasicDetails_1 = __importDefault(require("../Component/GetBasicDetails"));
var CaptureImage_1 = __importDefault(require("../Component/CaptureImage"));
var VerifyVotersToValidVoters_1 = __importDefault(require("../Component/VerifyVotersToValidVoters"));
var fetchCandidates_1 = __importDefault(require("../Component/fetchCandidates"));
var Voting_1 = __importDefault(require("../Component/Voting"));
var FetchVote_1 = __importDefault(require("../Component/FetchVote"));
var updateFileUpload_1 = __importDefault(require("../Component/updateFileUpload"));
var UpdateData_1 = __importDefault(require("../Component/UpdateData"));
var fetchSecuredDetails_1 = __importDefault(require("../Component/fetchSecuredDetails"));
var EnterPassword_1 = __importDefault(require("../Component/EnterPassword"));
var defaultValue = {
    gender: "",
    authenticated: false,
    credential: false,
    registered: false,
    fullname: "",
    verifyCode: false,
    secret: false,
    redirect: false,
    verify: false,
    waitingVerified: false,
    urlID: "",
    title: "",
    _id: "",
    voted: false,
};
var resolvers = {
    Upload: graphql_upload_1.GraphQLUpload,
    Query: {
        user: function (_, __, _a) {
            var req = _a.req;
            return __awaiter(void 0, void 0, void 0, function () {
                var userFound, _b, _c, myArray;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, votersSchema_1.default.findById(req.userId)];
                        case 1:
                            _c = (_d.sent());
                            if (_c) return [3 /*break*/, 3];
                            return [4 /*yield*/, adminSchema_1.default.findById(req.userId)];
                        case 2:
                            _c = (_d.sent());
                            _d.label = 3;
                        case 3:
                            _b = _c;
                            if (_b) return [3 /*break*/, 5];
                            return [4 /*yield*/, employeeSchema_1.default.findById(req.userId)];
                        case 4:
                            _b = (_d.sent());
                            _d.label = 5;
                        case 5:
                            userFound = [
                                _b
                            ];
                            if (req.userId) {
                                myArray = __spreadArray([], userFound, true);
                                if (userFound[0].waitingVerified === undefined) {
                                    return [2 /*return*/, [__assign(__assign({}, myArray[0]._doc), { waitingVerified: false })]];
                                }
                                return [2 /*return*/, userFound];
                            }
                            return [2 /*return*/, [defaultValue]];
                    }
                });
            });
        },
        resend: ResendCode_1.default,
        removeNotVerifyAccount: RemoveNotVerifyAccount_1.default,
        authenticated: Authenticated_1.default,
        fetchBasicDetails: GetBasicDetails_1.default,
        logout: Logout_1.default,
        fetchCandidates: fetchCandidates_1.default,
        fetchVote: FetchVote_1.default,
        fetchSecuredDetails: fetchSecuredDetails_1.default,
    },
    Mutation: {
        createAccount: createAccount_1.default,
        votersignin: votersignin_1.default,
        employeesignin: employeesignin_1.default,
        adminsignin: adminsignin_1.default,
        contact: Contact_1.default,
        verifyVoters: VerifyVoters_1.default,
        UploadFile: Uploadfile_1.default,
        basicDetails: BasicDetails_1.default,
        verifySecret: VerifySecret_1.default,
        CaptureImage: CaptureImage_1.default,
        verifyVotersToValidVoters: VerifyVotersToValidVoters_1.default,
        voting: Voting_1.default,
        UpdateUploadFile: updateFileUpload_1.default,
        UpdateData: UpdateData_1.default,
        enterPassword: EnterPassword_1.default
    },
};
exports.default = resolvers;
