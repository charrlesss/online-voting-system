"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var position = new mongoose_1.default.Schema({
    mayor: {
        type: Array,
        default: []
    },
    vicemayor: {
        type: Array,
        default: []
    },
    msp: {
        type: Array,
        default: []
    }
}, { versionKey: false });
var Position = mongoose_1.default.model('position', position);
exports.default = Position;
