"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var pendingVerified = new mongoose_1.default.Schema({
    ovsId: {
        type: String,
        default: ''
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    middleName: {
        type: String,
        default: ''
    },
    votersIdPicture: {
        type: String,
        default: ''
    },
    votersPicture: {
        type: String,
        default: ''
    }
}, { versionKey: false });
var WaitingToVerify = mongoose_1.default.model('PendingVerified', pendingVerified);
exports.default = WaitingToVerify;
