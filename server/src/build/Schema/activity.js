"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var activity = new mongoose_1.default.Schema({
    activityLog: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: new Date().toLocaleDateString()
    },
    userID: {
        type: String,
        default: ''
    },
    isVoted: {
        type: Boolean,
        default: false
    },
    isVerify: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });
var Activity = mongoose_1.default.model('Activities', activity);
exports.default = Activity;
