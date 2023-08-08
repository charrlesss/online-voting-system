"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var voters = new mongoose_1.default.Schema({
    username: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now()).toLocaleString(),
    },
    authenticated: {
        type: Boolean,
        default: false
    },
    registered: {
        type: Boolean,
        default: false
    },
    verify: {
        type: Boolean,
        default: false
    },
    crendential: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: "client",
    },
    verifyCode: {
        type: Boolean,
        default: false
    },
    log: {
        type: Array,
        default: []
    },
    securedDetails: {
        type: Array,
        default: [{
                email: String,
                password: String,
                code: String,
                refreshToken: [],
                votersID: String,
                votersIDFile: String,
            }]
    },
    basicDetails: {
        type: Array,
        default: [{
                profile: String,
                municipality: String,
                zipcode: String,
                birthday: String
            }]
    }
}, { versionKey: false });
var VotersModel = mongoose_1.default.model("VotersModel", voters);
exports.default = VotersModel;
