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
exports.createCandidates = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var candidates = new mongoose_1.default.Schema({
    FullName: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: ''
    },
    votes: {
        type: Number,
        default: 0
    },
    profile: {
        type: String,
        default: "icon-profile.jpg"
    },
    voterReceiptId: {
        type: Array,
        default: []
    },
    backout: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });
var Candidates = mongoose_1.default.model('candidates', candidates);
exports.default = Candidates;
function createCandidates() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Candidates({ FullName: 'Malapitan, Along', position: 'mayor' }).save()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Domasig, Roman Jr', position: 'mayor ' }).save()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Anquilan, Jun', position: 'mayor' }).save()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Bayoh-on Ruffy', position: 'mayor' }).save()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Erice , Egay', position: 'mayor' }).save()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Malunes , Toto', position: 'mayor' }).save()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Malonzo, pj', position: 'vicemayor' }).save()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Nubla, Alou', position: 'vicemayor ' }).save()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Timbol Joseph', position: 'vicemayor' }).save()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Adalem, Topet', position: 'msp' }).save()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Aquino, Roberto jr', position: 'msp' }).save()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Assitio, Tonton', position: 'msp' }).save()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Bacolod, Leah', position: 'msp' }).save()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Caralde, Kap Alex', position: 'msp' }).save()];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'De Leon, Tyrone', position: 'msp' }).save()];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Hernandez, Vince', position: 'msp' }).save()];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Malapitan, Enteng', position: 'msp' }).save()];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Maniago, Rodolfo', position: 'msp' }).save()];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Mayor, Cenon', position: 'msp' }).save()];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Nubla, Kaye', position: 'msp' }).save()];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Repollo, Nick', position: 'msp' }).save()];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Rivera, Romy', position: 'msp' }).save()];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Trinidad, Inar', position: 'msp' }).save()];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Uy, Mila', position: 'msp' }).save()];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, new Candidates({ FullName: 'Viray, Gerry', position: 'msp' }).save()];
                case 25:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createCandidates = createCandidates;
